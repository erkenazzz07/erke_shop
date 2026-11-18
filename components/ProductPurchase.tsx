"use client";

import Link from "next/link";
import { useState } from "react";
import { SIZES, type Product, type Size } from "@/lib/products";
import { addToBag, setBagDrawerOpen } from "@/lib/store";
import { WishlistButton } from "./WishlistButton";

export type Colourway = Pick<Product, "slug" | "colour" | "swatch">;

export function ProductPurchase({ product, colourways }: { readonly product: Product; readonly colourways: readonly Colourway[] }) {
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState("");
  const label = `${product.name} in ${product.colour}`;

  return (
    <div>
      <div className="buy__label"><span>Colour</span><span className="muted" style={{ fontWeight: 400 }}>{product.colour}</span></div>
      <div className="colours" role="list">
        {colourways.map((c) => (
          <Link key={c.slug} role="listitem" className="colour" href={`/shop/${c.slug}`} aria-current={c.slug === product.slug} aria-label={c.colour} title={c.colour} replace scroll={false}>
            <span style={{ background: c.swatch }} />
          </Link>
        ))}
      </div>

      <div className="buy__label"><span id="size-label">Size</span><Link className="muted" style={{ fontWeight: 400, textDecoration: "underline" }} href="/journal/how-it-should-fit">Fit notes</Link></div>
      <div className="sizes" role="group" aria-labelledby="size-label">
        {SIZES.map((s) => (
          <button key={s} type="button" aria-pressed={size === s} onClick={() => { setSize(s); setError(""); }}>{s}</button>
        ))}
      </div>

      <div className="buy__actions">
        <button
          type="button"
          className="btn"
          onClick={() => {
            if (!size) { setError("Please choose a size."); return; }
            addToBag(product.slug, size);
            setBagDrawerOpen(true);
          }}
        >
          Add to bag
        </button>
        <WishlistButton slug={product.slug} label={label} />
      </div>
      <p className="hint" role="alert">{error}</p>
    </div>
  );
}
