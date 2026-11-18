import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { ShopBrowser } from "@/components/ShopBrowser";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = { title: "Shop", description: "The full erke Issue 03 collection: tops, bottoms and outerwear for everyone." };

export default function ShopPage() {
  return (
    <>
      <header className="shop-hero">
        <span className="eyebrow">Issue 03 · Fall / Winter</span>
        <h1 className="display">Shop the <i>issue</i></h1>
      </header>
      <Suspense fallback={<div className="section" style={{ paddingTop: 48 }}><ProductGrid products={PRODUCTS} stagger /></div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}
