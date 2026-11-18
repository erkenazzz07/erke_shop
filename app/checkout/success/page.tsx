import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/OrderConfirmation";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="success"><p className="lede">Loading your order…</p></div>}>
      <OrderConfirmation />
    </Suspense>
  );
}
