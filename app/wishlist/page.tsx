import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <>
      <header className="shop-hero">
        <span className="eyebrow">Saved for later</span>
        <h1 className="display">Your <i>wishlist</i></h1>
      </header>
      <WishlistView />
    </>
  );
}
