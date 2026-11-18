"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { formatUsd } from "@/lib/pricing";
import { bagSubtotalUsd, setBagDrawerOpen, useBag, useBagDrawerOpen } from "@/lib/store";
import { BagLines } from "./BagLines";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { CloseIcon } from "./icons";

function CloseOnNavigate() {
  const pathname = usePathname();
  useEffect(() => {
    setBagDrawerOpen(false);
  }, [pathname]);
  return null;
}

export function BagDrawer() {
  const open = useBagDrawerOpen();
  const lines = useBag();
  const closeRef = useRef<HTMLButtonElement>(null);
  const subtotalUsd = bagSubtotalUsd(lines);
  const close = () => setBagDrawerOpen(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setBagDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Suspense fallback={null}><CloseOnNavigate /></Suspense>
      <div className="scrim" data-open={open} onClick={close} aria-hidden="true" />
      <aside className="drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Your bag" inert={!open}>
        <div className="drawer__head">
          <span>Your bag</span>
          <button ref={closeRef} className="icon-btn" aria-label="Close bag" onClick={close}><CloseIcon /></button>
        </div>
        {lines.length === 0 ? (
          <div className="empty" style={{ padding: "64px 24px" }}>
            <p className="h3">Your bag is empty.</p>
            <Link className="btn" href="/shop" onClick={close}>Shop the issue</Link>
          </div>
        ) : (
          <>
            <div style={{ padding: "16px 24px 0" }}><FreeShippingMeter subtotalUsd={subtotalUsd} /></div>
            <div className="drawer__list"><BagLines lines={lines} onNavigate={close} /></div>
            <div className="drawer__foot">
              <div className="summary__row"><b>Subtotal</b><b>{formatUsd(subtotalUsd)}</b></div>
              <Link className="btn btn--block" href="/checkout" onClick={close}>Checkout</Link>
              <Link className="btn btn--ghost btn--block" href="/cart" onClick={close}>View bag</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
