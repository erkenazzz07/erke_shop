"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD_USD, formatUsd, shippingCostUsd } from "@/lib/pricing";
import { bagItemCount, bagSubtotalUsd, useBag, useHydrated } from "@/lib/store";
import { BagLines } from "./BagLines";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { ProductGrid } from "./ProductCard";
import { StoragePending } from "./StoragePending";

export function CartView() {
  const lines = useBag();
  const hydrated = useHydrated();
  const subtotalUsd = bagSubtotalUsd(lines);

  if (!hydrated) return <StoragePending />;

  if (lines.length === 0) {
    return (
      <>
        <div className="empty">
          <p className="h3">Your bag is empty.</p>
          <Link className="btn" href="/shop">Shop the issue</Link>
        </div>
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="picks">
          <div className="section-head"><h2 id="picks" className="h2">Start with these</h2></div>
          <ProductGrid products={PRODUCTS.filter((p) => p.isNew).slice(0, 4)} four />
        </section>
      </>
    );
  }

  const shippingUsd = shippingCostUsd(subtotalUsd, "standard");

  return (
    <div className="cart">
      <section aria-label="Items in your bag">
        <p className="muted">{bagItemCount(lines)} items</p>
        <BagLines lines={lines} />
        <Link className="link" href="/shop" style={{ marginTop: 24 }}>← Keep shopping</Link>
      </section>
      <aside className="summary" aria-label="Order summary">
        <h2 className="h3">Summary</h2>
        <FreeShippingMeter subtotalUsd={subtotalUsd} />
        <div className="summary__row"><span>Subtotal</span><span>{formatUsd(subtotalUsd)}</span></div>
        <div className="summary__row"><span>Standard shipping</span><span>{shippingUsd === 0 ? "Free" : formatUsd(shippingUsd)}</span></div>
        <div className="summary__total"><span>Total</span><span>{formatUsd(subtotalUsd + shippingUsd)}</span></div>
        <Link className="btn btn--block" href="/checkout">Checkout</Link>
        <p className="muted" style={{ fontSize: 13 }}>Free standard shipping over {formatUsd(FREE_SHIPPING_THRESHOLD_USD)}. Taxes included. Free returns within 30 days.</p>
      </aside>
    </div>
  );
}
