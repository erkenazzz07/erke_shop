import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Bag" };

export default function CartPage() {
  return (
    <>
      <header className="shop-hero"><h1 className="display">Your <i>bag</i></h1></header>
      <CartView />
    </>
  );
}
