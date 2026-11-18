"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { bagItemCount, setBagDrawerOpen, useBag, useWishlist } from "@/lib/store";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, UserIcon } from "./icons";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
] as const;

function MainNavLinks() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return NAV.map((item) => (
    <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>
  ));
}

export function Header() {
  const bagCount = bagItemCount(useBag());
  const wishCount = useWishlist().length;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <p className="announce">Free shipping over $150 · Free returns within 30 days</p>
      <header className="header">
        <button className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(true)}>
          <MenuIcon />
        </button>
        <nav className="header__nav" aria-label="Main">
          <Suspense fallback={NAV.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}>
            <MainNavLinks />
          </Suspense>
        </nav>
        <Link className="logo" href="/" aria-label="erke home">erke</Link>
        <div className="header__tools">
          <Link className="icon-btn" href="/account" aria-label="Account"><UserIcon /></Link>
          <Link className="icon-btn" href="/wishlist" aria-label={`Wishlist, ${wishCount} items`}>
            <HeartIcon />
            {wishCount > 0 ? <span className="badge" aria-hidden="true">{wishCount}</span> : null}
          </Link>
          <button className="icon-btn" aria-label={`Bag, ${bagCount} items`} onClick={() => setBagDrawerOpen(true)}>
            <BagIcon />
            {bagCount > 0 ? <span className="badge" aria-hidden="true">{bagCount}</span> : null}
          </button>
        </div>
      </header>
      <nav id="mobile-nav" className="mobile-nav" data-open={menuOpen} aria-label="Mobile" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-nav__head">
          <span className="logo">erke</span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}><CloseIcon /></button>
        </div>
        {[{ href: "/", label: "Home" }, ...NAV, { href: "/wishlist", label: "Wishlist" }, { href: "/account", label: "Account" }].map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
        ))}
      </nav>
    </>
  );
}
