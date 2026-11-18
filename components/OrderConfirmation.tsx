"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SHIPPING_METHODS, formatUsd } from "@/lib/pricing";
import { useAccount, useHydrated, useOrders } from "@/lib/store";
import { StoragePending } from "./StoragePending";

export function OrderConfirmation() {
  const orderId = useSearchParams().get("order");
  const order = useOrders().find((o) => o.id === orderId);
  const account = useAccount();
  const hydrated = useHydrated();

  if (!hydrated) return <StoragePending />;

  if (!order) {
    return (
      <div className="success">
        <h1 className="display">Order not found</h1>
        <p className="lede">We couldn&apos;t find that order on this device.</p>
        <Link className="btn" href="/account">See your orders</Link>
      </div>
    );
  }

  const method = SHIPPING_METHODS.find((m) => m.id === order.shippingMethod);

  return (
    <div className="success">
      <span className="eyebrow">Order {order.id}</span>
      <h1 className="display">Thank you, <i>{order.shipTo.name.split(" ")[0]}</i>.</h1>
      <p className="lede">Your order is confirmed. We&apos;ll email {order.email} when it ships{method ? ` (${method.label.toLowerCase()}, ${method.eta})` : ""}.</p>
      <p className="notice">Demo order: nothing was charged and nothing will ship.</p>
      <div className="summary" style={{ position: "static" }}>
        {order.lines.map((line) => (
          <div key={`${line.slug}-${line.size}`} className="summary__row">
            <span>{line.name} · {line.colour} · {line.size} × {line.quantity}</span>
            <span>{formatUsd(line.priceUsd * line.quantity)}</span>
          </div>
        ))}
        <div className="summary__row" style={{ borderTop: "1px solid var(--sand-deep)", paddingTop: 14 }}><span>Shipping</span><span>{order.shippingUsd === 0 ? "Free" : formatUsd(order.shippingUsd)}</span></div>
        <div className="summary__total"><span>Total</span><span>{formatUsd(order.totalUsd)}</span></div>
        <p className="muted" style={{ fontSize: 14 }}>Shipping to {order.shipTo.address}, {order.shipTo.city} {order.shipTo.postcode}, {order.shipTo.country}</p>
      </div>
      <div className="cover__actions">
        <Link className="btn" href="/shop">Keep shopping</Link>
        <Link className="link" href="/account">{account ? "View your orders →" : "Create an account to track orders →"}</Link>
      </div>
    </div>
  );
}
