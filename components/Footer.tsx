import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__big" aria-hidden="true">erke.</p>
      <div className="footer__cols">
        <div>
          <h2>The letter</h2>
          <p>One email a month: new drops, journal, nothing else.</p>
          <NewsletterForm />
        </div>
        <div>
          <h2>Shop</h2>
          <ul>
            <li><Link href="/shop?g=Women">Women</Link></li>
            <li><Link href="/shop?g=Men">Men</Link></li>
            <li><Link href="/shop?g=Unisex">Unisex</Link></li>
            <li><Link href="/shop?new=1">New in</Link></li>
          </ul>
        </div>
        <div>
          <h2>erke</h2>
          <ul>
            <li><Link href="/lookbook">Lookbook</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/journal/how-it-should-fit">Fit notes</Link></li>
          </ul>
        </div>
        <div>
          <h2>You</h2>
          <ul>
            <li><Link href="/account">Account</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/cart">Bag</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__legal">
        <span>© 2026 erke studio</span>
        <span>Free shipping over $150 · 30-day returns</span>
      </div>
    </footer>
  );
}
