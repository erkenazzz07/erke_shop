import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <header className="shop-hero"><span className="eyebrow">Almost yours</span><h1 className="display">Checkout</h1></header>
      <CheckoutForm />
    </>
  );
}
