import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LOOKS } from "@/lib/lookbook";
import { findProduct, type Product } from "@/lib/products";
import { formatUsd } from "@/lib/pricing";

export const metadata: Metadata = { title: "Lookbook", description: "Issue 03: eight looks shot on one street at six in the evening." };

const pad = (n: number) => String(n).padStart(2, "0");

export default function LookbookPage() {
  return (
    <>
      <header className="shop-hero">
        <span className="eyebrow">Lookbook · Issue 03</span>
        <h1 className="display">Eight looks,<br /><i>one</i> street.</h1>
        <p className="lede" style={{ marginTop: 20 }}>Shot over one week, always at six in the evening. Every piece is shoppable.</p>
      </header>
      <div className="section lb-page">
        {LOOKS.map((look, index) => {
          const pieces = look.productSlugs.map(findProduct).filter((p): p is Product => !!p);
          const [hero] = pieces;
          if (!hero) return null;
          return (
            <article key={look.title} id={`look-${index + 1}`} className="lb-look" style={{ scrollMarginTop: 24 }}>
              <div className="lb-look__img">
                <Image src={hero.images[0]} alt={`Look ${index + 1}, ${look.title}: ${hero.name} in ${hero.colour}`} fill sizes="(max-width: 860px) 100vw, 50vw" preload={index === 0} />
              </div>
              <div>
                <span className="lb-look__num">{pad(index + 1)}</span>
                <h2 className="h2">{look.title}</h2>
                <p className="lede" style={{ marginTop: 12 }}>{look.note}</p>
                <div className="lb-look__pieces">
                  <span className="eyebrow">In this look</span>
                  {pieces.map((piece) => (
                    <Link key={piece.slug} className="mini" href={`/shop/${piece.slug}`}>
                      <div className="mini__img"><Image src={piece.images[0]} alt="" fill sizes="72px" /></div>
                      <div><b>{piece.name}</b><br /><span className="muted" style={{ fontSize: 14 }}>{piece.colour}</span></div>
                      <span>{formatUsd(piece.priceUsd)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
