import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JournalCard } from "@/components/JournalCard";
import { ProductGrid } from "@/components/ProductCard";
import { JOURNAL, findEntry, formatDate, type JournalBlock } from "@/lib/journal";
import { findProduct, type Product } from "@/lib/products";

export function generateStaticParams() {
  return JOURNAL.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const entry = findEntry((await params).slug);
  return entry ? { title: entry.title, description: entry.excerpt } : {};
}

function Block({ block }: { readonly block: JournalBlock }) {
  switch (block.kind) {
    case "paragraph": return <p>{block.text}</p>;
    case "heading": return <h2>{block.text}</h2>;
    case "quote": return <blockquote>{block.text}</blockquote>;
  }
}

export default function JournalEntryPage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<article className="article" aria-busy="true"><div className="article__cover" /></article>}>
      <JournalEntry params={params} />
    </Suspense>
  );
}

async function JournalEntry({ params }: { readonly params: Promise<{ slug: string }> }) {
  const entry = findEntry((await params).slug);
  if (!entry) notFound();

  const cover = findProduct(entry.coverProduct);
  const featured = entry.featuredProducts.map(findProduct).filter((p): p is Product => !!p);
  const more = JOURNAL.filter((other) => other.slug !== entry.slug);

  return (
    <>
      <article className="article">
        <Link className="eyebrow" href="/journal">← Journal</Link>
        <div className="entry__meta" style={{ marginTop: 24 }}><span className="eyebrow">{entry.kicker}</span><span>{formatDate(entry.dateIso)}</span><span>{entry.readMinutes} min read</span></div>
        <h1 className="display">{entry.title}</h1>
        <p className="lede" style={{ marginTop: 16 }}>{entry.excerpt}</p>
        {cover ? (
          <div className="article__cover"><Image src={cover.images[0]} alt={`${cover.name} in ${cover.colour}`} fill sizes="(max-width: 860px) 100vw, 760px" preload /></div>
        ) : null}
        <div className="prose">{entry.body.map((block, index) => <Block key={index} block={block} />)}</div>
      </article>
      <section className="section" aria-labelledby="shop-story">
        <div className="section-head"><h2 id="shop-story" className="h2">Shop the <i>story</i></h2></div>
        <ProductGrid products={featured} />
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="more-stories">
        <div className="section-head"><h2 id="more-stories" className="h2">More stories</h2></div>
        <div className="journal-list">{more.map((other) => <JournalCard key={other.slug} entry={other} />)}</div>
      </section>
    </>
  );
}
