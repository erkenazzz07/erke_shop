import Image from "next/image";
import Link from "next/link";
import { formatDate, type JournalEntry } from "@/lib/journal";
import { findProduct } from "@/lib/products";

export function JournalCard({ entry, feature = false }: { readonly entry: JournalEntry; readonly feature?: boolean }) {
  const cover = findProduct(entry.coverProduct);
  return (
    <Link className={feature ? "entry feature" : "entry"} href={`/journal/${entry.slug}`}>
      <div className="entry__img">
        {cover ? <Image src={cover.images[0]} alt="" fill sizes={feature ? "(max-width: 860px) 100vw, 55vw" : "(max-width: 860px) 50vw, 30vw"} /> : null}
      </div>
      <div>
        <div className="entry__meta"><span className="eyebrow">{entry.kicker}</span><span>{formatDate(entry.dateIso)}</span><span>{entry.readMinutes} min</span></div>
        <h3 className={feature ? "h2" : "h3"}>{entry.title}</h3>
        <p className="muted" style={{ marginTop: 8 }}>{entry.excerpt}</p>
      </div>
    </Link>
  );
}
