"use client";

import { useSyncExternalStore } from "react";
import { findProduct, isSize, type Size } from "./products";
import type { ShippingMethodId } from "./pricing";

type Listener = () => void;

type Store<T> = {
  readonly subscribe: (listener: Listener) => () => void;
  readonly get: () => T;
  readonly getServer: () => T;
  readonly set: (update: (previous: T) => T) => void;
};

function createStore<T>(initial: T, persistence?: { key: string; parse: (raw: unknown) => T | undefined }): Store<T> {
  const listeners = new Set<Listener>();
  let value = initial;
  let loaded = !persistence;

  const load = () => {
    if (loaded || !persistence || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw: unknown = JSON.parse(window.localStorage.getItem(persistence.key) ?? "null");
      value = persistence.parse(raw) ?? initial;
    } catch {
      value = initial;
    }
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (event: StorageEvent) => {
        if (persistence && event.key === persistence.key) {
          loaded = false;
          load();
          listener();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    get() {
      load();
      return value;
    },
    getServer: () => initial,
    set(update) {
      load();
      value = update(value);
      if (persistence) window.localStorage.setItem(persistence.key, JSON.stringify(value));
      listeners.forEach((listener) => listener());
    },
  };
}

function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

/* ---------- Bag ---------- */

export type BagLine = { readonly slug: string; readonly size: Size; readonly quantity: number };
export const MAX_QUANTITY = 9;

function parseBag(raw: unknown): readonly BagLine[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  return raw.flatMap((item: unknown): BagLine[] => {
    if (!isRecord(item)) return [];
    const { slug, size, quantity } = item;
    if (typeof slug !== "string" || !findProduct(slug) || typeof size !== "string" || !isSize(size) || typeof quantity !== "number") return [];
    return [{ slug, size, quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity))) }];
  });
}

const EMPTY_BAG: readonly BagLine[] = [];
const bagStore = createStore<readonly BagLine[]>(EMPTY_BAG, { key: "erke.bag", parse: parseBag });

export const useBag = () => useStore(bagStore);

export function addToBag(slug: string, size: Size, quantity = 1) {
  bagStore.set((lines) => {
    const existing = lines.find((line) => line.slug === slug && line.size === size);
    if (!existing) return [...lines, { slug, size, quantity }];
    return lines.map((line) => (line === existing ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + quantity) } : line));
  });
}

export function setLineQuantity(slug: string, size: Size, quantity: number) {
  bagStore.set((lines) =>
    quantity < 1
      ? lines.filter((line) => !(line.slug === slug && line.size === size))
      : lines.map((line) => (line.slug === slug && line.size === size ? { ...line, quantity: Math.min(MAX_QUANTITY, quantity) } : line)),
  );
}

export const clearBag = () => bagStore.set(() => EMPTY_BAG);

export function bagSubtotalUsd(lines: readonly BagLine[]): number {
  return lines.reduce((sum, line) => sum + (findProduct(line.slug)?.priceUsd ?? 0) * line.quantity, 0);
}

export const bagItemCount = (lines: readonly BagLine[]) => lines.reduce((sum, line) => sum + line.quantity, 0);

/* ---------- Wishlist ---------- */

const EMPTY_WISHLIST: readonly string[] = [];
const wishlistStore = createStore<readonly string[]>(EMPTY_WISHLIST, {
  key: "erke.wishlist",
  parse: (raw) => (Array.isArray(raw) ? raw.filter((slug): slug is string => typeof slug === "string" && !!findProduct(slug)) : undefined),
});

export const useWishlist = () => useStore(wishlistStore);

export function toggleWishlist(slug: string) {
  wishlistStore.set((slugs) => (slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug]));
}

/* ---------- Account (front-end only: no password is stored or sent) ---------- */

export type Account = { readonly name: string; readonly email: string };

const accountStore = createStore<Account | null>(null, {
  key: "erke.account",
  parse: (raw) => (isRecord(raw) && typeof raw.name === "string" && typeof raw.email === "string" ? { name: raw.name, email: raw.email } : undefined),
});

export const useAccount = () => useStore(accountStore);
export const signIn = (account: Account) => accountStore.set(() => account);
export const signOut = () => accountStore.set(() => null);

/* ---------- Orders ---------- */

export type OrderLine = {
  readonly slug: string;
  readonly name: string;
  readonly colour: string;
  readonly size: Size;
  readonly quantity: number;
  readonly priceUsd: number;
};

export type Order = {
  readonly id: string;
  readonly createdIso: string;
  readonly email: string;
  readonly shipTo: { readonly name: string; readonly address: string; readonly city: string; readonly postcode: string; readonly country: string };
  readonly shippingMethod: ShippingMethodId;
  readonly lines: readonly OrderLine[];
  readonly subtotalUsd: number;
  readonly shippingUsd: number;
  readonly totalUsd: number;
};

const isOrder = (value: unknown): value is Order =>
  isRecord(value) && typeof value.id === "string" && typeof value.createdIso === "string" && Array.isArray(value.lines) && typeof value.totalUsd === "number" && isRecord(value.shipTo);

const EMPTY_ORDERS: readonly Order[] = [];
const ordersStore = createStore<readonly Order[]>(EMPTY_ORDERS, {
  key: "erke.orders",
  parse: (raw) => (Array.isArray(raw) ? raw.filter(isOrder) : undefined),
});

export const useOrders = () => useStore(ordersStore);
export const saveOrder = (order: Order) => ordersStore.set((orders) => [order, ...orders]);

/* ---------- UI: bag drawer + toast (not persisted) ---------- */

const drawerStore = createStore(false);
export const useBagDrawerOpen = () => useStore(drawerStore);
export const setBagDrawerOpen = (open: boolean) => drawerStore.set(() => open);

export type Toast = { readonly id: number; readonly message: string; readonly action?: "open-bag" };
const toastStore = createStore<Toast | null>(null);
export const useToast = () => useStore(toastStore);

let toastTimer: ReturnType<typeof setTimeout> | undefined;
export function showToast(message: string, action?: Toast["action"]) {
  toastStore.set(() => ({ id: Date.now(), message, action }));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastStore.set(() => null), 4000);
}
export const dismissToast = () => toastStore.set(() => null);

/* ---------- Hydration ---------- */

const noopSubscribe = () => () => {};
/** False during server render and hydration, true once browser storage can be read. */
export const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false);
