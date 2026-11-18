"use client";

import Image from "next/image";
import Link from "next/link";
import { findProduct } from "@/lib/products";
import { formatUsd } from "@/lib/pricing";
import { MAX_QUANTITY, setLineQuantity, type BagLine } from "@/lib/store";

export function BagLines({ lines, onNavigate }: { readonly lines: readonly BagLine[]; readonly onNavigate?: () => void }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {lines.map((line) => {
        const product = findProduct(line.slug);
        if (!product) return null;
        return (
          <li key={`${line.slug}-${line.size}`} className="cart-line">
            <Link className="cart-line__img" href={`/shop/${product.slug}`} onClick={onNavigate} tabIndex={-1} aria-hidden="true">
              <Image src={product.images[0]} alt="" fill sizes="110px" />
            </Link>
            <div>
              <Link className="cart-line__name" href={`/shop/${product.slug}`} onClick={onNavigate}>{product.name}</Link>
              <p className="muted" style={{ fontSize: 14 }}>{product.colour} · Size {line.size}</p>
              <div className="qty" role="group" aria-label={`Quantity of ${product.name}`}>
                <button type="button" aria-label="Decrease quantity" onClick={() => setLineQuantity(line.slug, line.size, line.quantity - 1)}>−</button>
                <span aria-live="polite">{line.quantity}</span>
                <button type="button" aria-label="Increase quantity" disabled={line.quantity >= MAX_QUANTITY} onClick={() => setLineQuantity(line.slug, line.size, line.quantity + 1)}>+</button>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>{formatUsd(product.priceUsd * line.quantity)}</p>
              <button type="button" className="text-btn" onClick={() => setLineQuantity(line.slug, line.size, 0)} aria-label={`Remove ${product.name}, size ${line.size}`}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
