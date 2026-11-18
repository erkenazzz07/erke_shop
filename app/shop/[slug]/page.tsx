import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { FREE_SHIPPING_THRESHOLD_USD, formatUsd } from "@/lib/pricing";
import { PRODUCTS, colourways, findProduct, relatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return product ? { title: `${product.name} — ${product.colour}`, description: product.description } : {};
}

export default function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<section className="pdp" aria-busy="true"><div className="gallery__main" /><div /></section>}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { readonly params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();

  const variants = colourways(product).map(({ slug, colour, swatch }) => ({ slug, colour, swatch }));

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link><span aria-hidden="true">/</span>
        <Link href={`/shop?g=${product.gender}`}>{product.gender}</Link><span aria-hidden="true">/</span>
        <Link href={`/shop?cat=${product.category}`}>{product.category}</Link>
      </nav>
      <section className="pdp">
        <ProductGallery key={product.slug} images={product.images} label={`${product.name} in ${product.colour}`} />
        <div className="buy">
          {product.isNew ? <span className="eyebrow">New this issue</span> : <span className="eyebrow">{product.category}</span>}
          <h1>{product.name}</h1>
          <div className="buy__row"><span className="muted">{product.gender}</span><span className="buy__price">{formatUsd(product.priceUsd)}</span></div>
          <p className="lede">{product.description}</p>
          <ProductPurchase product={product} colourways={variants} />
          <div className="notes">
            <details open>
              <summary>Details</summary>
              <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
            <details>
              <summary>Fit</summary>
              <p>Cut with room. Take your usual size for the intended fit, or size down for a closer look. See our <Link href="/journal/how-it-should-fit" style={{ textDecoration: "underline" }}>fit notes</Link>.</p>
            </details>
            <details>
              <summary>Shipping &amp; returns</summary>
              <p>Free standard shipping over {formatUsd(FREE_SHIPPING_THRESHOLD_USD)}. Express delivery in 1–2 business days. Free returns within 30 days, unworn with tags.</p>
            </details>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="related-title">
        <div className="section-head"><h2 id="related-title" className="h2">Styled <i>with</i></h2></div>
        <ProductGrid products={relatedProducts(product)} four />
      </section>
    </>
  );
}
