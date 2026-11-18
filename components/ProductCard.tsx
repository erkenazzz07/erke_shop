import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatUsd } from "@/lib/pricing";
import { WishlistButton } from "./WishlistButton";

const CARD_SIZES = "(max-width: 860px) 50vw, 30vw";

export function ProductCard({ product, preload = false }: { readonly product: Product; readonly preload?: boolean }) {
  const [main, alt] = product.images;
  const label = `${product.name} in ${product.colour}`;
  return (
    <article className="card">
      <div className="card__img">
        {product.isNew ? <span className="card__flag">New</span> : null}
        <Image src={main} alt={label} fill sizes={CARD_SIZES} preload={preload} />
        {alt ? <Image className="card__alt" src={alt} alt="" fill sizes={CARD_SIZES} /> : null}
      </div>
      <WishlistButton slug={product.slug} label={label} />
      <div className="card__meta">
        <Link className="card__name" href={`/shop/${product.slug}`}>{product.name}</Link>
        <span>{formatUsd(product.priceUsd)}</span>
      </div>
      <span className="card__sub"><span className="swatch" style={{ background: product.swatch }} aria-hidden="true" />{product.colour}</span>
    </article>
  );
}

export function ProductGrid({ products, stagger = false, four = false }: { readonly products: readonly Product[]; readonly stagger?: boolean; readonly four?: boolean }) {
  return (
    <div className={["grid", stagger && "grid--stagger", four && "grid--four"].filter(Boolean).join(" ")}>
      {products.map((product, index) => <ProductCard key={product.slug} product={product} preload={index < 3} />)}
    </div>
  );
}
