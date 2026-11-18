export const FREE_SHIPPING_THRESHOLD_USD = 150;

export const SHIPPING_METHODS = [
  { id: "standard", label: "Standard", eta: "3–5 business days", priceUsd: 8 },
  { id: "express", label: "Express", eta: "1–2 business days", priceUsd: 18 },
] as const;
export type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

export function formatUsd(amountUsd: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: amountUsd % 1 === 0 ? 0 : 2 }).format(amountUsd);
}

export function shippingCostUsd(subtotalUsd: number, method: ShippingMethodId): number {
  const option = SHIPPING_METHODS.find((m) => m.id === method) ?? SHIPPING_METHODS[0];
  if (option.id === "standard" && subtotalUsd >= FREE_SHIPPING_THRESHOLD_USD) return 0;
  return option.priceUsd;
}
