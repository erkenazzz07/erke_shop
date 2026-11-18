import Image from "next/image";
import Link from "next/link";
import { JournalCard } from "@/components/JournalCard";
import { LookbookScroller } from "@/components/LookbookScroller";
import { ProductGrid } from "@/components/ProductCard";
import { JOURNAL } from "@/lib/journal";
import { PRODUCTS, findProduct, type Product } from "@/lib/products";

const CATEGORY_TILES = [
  { label: "Women", href: "/shop?g=Women", product: "loop-crew-ember" },
  { label: "Men", href: "/shop?g=Men", product: "boxy-polo-crew-umber" },
  { label: "Unisex", href: "/shop?g=Unisex", product: "heavy-oversized-hoodie-black" },
] as const;

function mustFind(slug: string): Product {
  const product = findProduct(slug);
  if (!product) throw new Error(`Unknown product slug: ${slug}`);
  return product;
}

export default function HomePage() {
  const coverMain = mustFind("night-club-jacket-umber");
  const coverSmall = mustFind("loop-crew-ember");
  const newArrivals = PRODUCTS.filter((product) => product.isNew).slice(0, 6);

  return (
    <>
      <div className="issue"><span>Issue 03</span><span>Fall / Winter 2026</span><span>Unisex</span></div>

      <section className="cover">
        <div>
          <span className="eyebrow">The warm-tone edit</span>
          <h1 className="display">Earth, <i>worn</i><br />loud.</h1>
          <p className="lede">Bouclé, brushed fleece and loose track cuts in clay, cocoa and ember. Streetwear that runs warm.</p>
          <div className="cover__actions">
            <Link className="btn" href="/shop">Shop the issue</Link>
            <Link className="link" href="/lookbook">See the lookbook →</Link>
          </div>
        </div>
        <div className="cover__img">
          <figure><Image src={coverMain.images[0]} alt={`${coverMain.name} in ${coverMain.colour}`} fill sizes="(max-width: 860px) 80vw, 45vw" preload loading="eager" /></figure>
          <figure><Image src={coverSmall.images[0]} alt={`${coverSmall.name} in ${coverSmall.colour}`} fill sizes="(max-width: 860px) 40vw, 20vw" /></figure>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="cats-title">
        <div className="section-head"><h2 id="cats-title" className="h2">Shop by <i>wearer</i></h2><Link className="link" href="/shop">Everything →</Link></div>
        <div className="cats">
          {CATEGORY_TILES.map((tile) => {
            const product = mustFind(tile.product);
            return (
              <Link key={tile.label} className="cat" href={tile.href}>
                <Image src={product.images[0]} alt="" fill sizes="(max-width: 860px) 50vw, 33vw" />
                <span>{tile.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <LookbookScroller />

      <section className="section story" aria-label="From the journal">
        <span className="eyebrow">Journal</span>
        <div>
          <blockquote>“We dye in the colours of the city at <i>six in the evening</i> — brick, rust, the last light on concrete.”</blockquote>
          <Link className="link" href="/journal/six-in-the-evening" style={{ marginTop: 24 }}>Read the story →</Link>
        </div>
      </section>

      <section className="section" aria-labelledby="new-title">
        <div className="section-head">
          <div><span className="eyebrow">Just landed</span><h2 id="new-title" className="h2">New this issue</h2></div>
          <Link className="link" href="/shop?new=1">Shop new →</Link>
        </div>
        <ProductGrid products={newArrivals} stagger />
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="values-title">
        <h2 id="values-title" className="sr-only">Why erke</h2>
        <div className="values">
          <div><b className="h3">Garment-dyed</b><p>Every piece is dyed after sewing, so no two come out the same shade.</p></div>
          <div><b className="h3">Cut with room</b><p>Relaxed, boxy and loose by design. Our fit notes tell you when to size up.</p></div>
          <div><b className="h3">Free returns</b><p>Free shipping over $150 and 30 days to change your mind.</p></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="journal-title">
        <div className="section-head"><h2 id="journal-title" className="h2">From the journal</h2><Link className="link" href="/journal">All stories →</Link></div>
        <div className="journal-list">
          {JOURNAL.map((entry) => <JournalCard key={entry.slug} entry={entry} />)}
        </div>
      </section>
    </>
  );
}
