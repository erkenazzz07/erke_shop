"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, GENDERS, PRODUCTS, type Product } from "@/lib/products";
import { ProductGrid } from "./ProductCard";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const isSortId = (value: string | null): value is SortId => SORTS.some((sort) => sort.id === value);

function sortProducts(products: readonly Product[], sort: SortId): readonly Product[] {
  switch (sort) {
    case "new": return [...products].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "price-asc": return [...products].sort((a, b) => a.priceUsd - b.priceUsd);
    case "price-desc": return [...products].sort((a, b) => b.priceUsd - a.priceUsd);
    case "featured": return products;
  }
}

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const gender = params.get("g");
  const category = params.get("cat");
  const onlyNew = params.get("new") === "1";
  const sortParam = params.get("sort");
  const sort: SortId = isSortId(sortParam) ? sortParam : "featured";

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key); else next.set(key, value);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filtered = sortProducts(
    PRODUCTS.filter((p) => (!gender || p.gender === gender) && (!category || p.category === category) && (!onlyNew || p.isNew)),
    sort,
  );

  return (
    <>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by wearer">
          <button className="chip" aria-pressed={!gender} onClick={() => setParam("g", null)}>All</button>
          {GENDERS.map((g) => <button key={g} className="chip" aria-pressed={gender === g} onClick={() => setParam("g", gender === g ? null : g)}>{g}</button>)}
        </div>
        <div className="chips" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => <button key={c} className="chip" aria-pressed={category === c} onClick={() => setParam("cat", category === c ? null : c)}>{c}</button>)}
          <button className="chip" aria-pressed={onlyNew} onClick={() => setParam("new", onlyNew ? null : "1")}>New</button>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span className="toolbar__count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</span>
          <label className="sr-only" htmlFor="sort">Sort by</label>
          <select id="sort" className="select" value={sort} onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty">
          <p className="h3">Nothing matches those filters.</p>
          <button className="btn btn--ghost" onClick={() => router.replace(pathname, { scroll: false })}>Clear filters</button>
        </div>
      ) : (
        <div className="section" style={{ paddingTop: 48 }}><ProductGrid products={filtered} stagger /></div>
      )}
    </>
  );
}
