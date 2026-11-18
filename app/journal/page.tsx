import type { Metadata } from "next";
import { JournalCard } from "@/components/JournalCard";
import { JOURNAL } from "@/lib/journal";

export const metadata: Metadata = { title: "Journal", description: "Stories on colour, fit and fabric from the erke studio." };

export default function JournalPage() {
  const [lead, ...rest] = JOURNAL;
  return (
    <>
      <header className="shop-hero">
        <span className="eyebrow">Journal</span>
        <h1 className="display">Notes from <i>the studio</i></h1>
      </header>
      <div className="section journal-list">
        {lead ? <JournalCard entry={lead} feature /> : null}
        {rest.map((entry) => <JournalCard key={entry.slug} entry={entry} />)}
      </div>
    </>
  );
}
