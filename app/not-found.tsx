import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404</span>
      <h1 className="display">This street <i>ends</i> here.</h1>
      <p className="lede">The page you&apos;re looking for has moved or never existed.</p>
      <div className="cover__actions">
        <Link className="btn" href="/shop">Shop the issue</Link>
        <Link className="link" href="/">Back home →</Link>
      </div>
    </section>
  );
}
