"use client";

import Link from "next/link";
import { findProduct, type Product } from "@/lib/products";
import { useHydrated, useWishlist } from "@/lib/store";
import { ProductGrid } from "./ProductCard";
import { StoragePending } from "./StoragePending";

export function WishlistView() {
  const hydrated = useHydrated();
  const saved = useWishlist().map(findProduct).filter((p): p is Product => !!p);

  if (!hydrated) return <StoragePending />;

  if (saved.length === 0) {
    return (
      <div className="empty">
        <p className="h3">Nothing saved yet.</p>
        <p className="muted">Tap the heart on any piece to keep it here.</p>
        <Link className="btn" href="/shop">Browse the issue</Link>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: 48 }}>
      <p className="muted" style={{ marginBottom: 32 }}>{saved.length} saved {saved.length === 1 ? "piece" : "pieces"}. Saved on this device.</p>
      <ProductGrid products={saved} />
    </div>
  );
}
