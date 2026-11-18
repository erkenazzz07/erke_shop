"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LOOKS } from "@/lib/lookbook";
import { findProduct } from "@/lib/products";
import { formatUsd } from "@/lib/pricing";

const pad = (n: number) => String(n).padStart(2, "0");

/** Pins while the page scrolls vertically and slides the looks horizontally by the same distance. */
export function LookbookScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track || !bar || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const overflowPx = () => Math.max(1, track.scrollWidth - window.innerWidth);
    const resize = () => { section.style.height = `${window.innerHeight + overflowPx()}px`; };
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / overflowPx()));
      track.style.transform = `translateX(${-progress * overflowPx()}px)`;
      bar.style.width = `${progress * 100}%`;
      setCurrent(Math.min(LOOKS.length, Math.floor(progress * LOOKS.length) + 1));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onResize = () => { resize(); update(); };

    resize();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
    };
  }, []);

  return (
    <section ref={sectionRef} className="lookbook" aria-labelledby="lookbook-title">
      <div className="lookbook__sticky">
        <div className="lookbook__head">
          <div>
            <span className="eyebrow">Lookbook — scroll to walk through</span>
            <h2 id="lookbook-title" className="h2">Eight looks, one street.</h2>
          </div>
          <div className="lookbook__count" aria-hidden="true">{pad(current)} / {pad(LOOKS.length)}</div>
        </div>
        <div ref={trackRef} className="lookbook__track">
          {LOOKS.map((look, index) => {
            const hero = findProduct(look.productSlugs[0]);
            if (!hero) return null;
            const total = look.productSlugs.reduce((sum, slug) => sum + (findProduct(slug)?.priceUsd ?? 0), 0);
            return (
              <Link key={look.title} className="look" href={`/lookbook#look-${index + 1}`}>
                <figure>
                  <Image src={hero.images[0]} alt={`Look ${index + 1}, ${look.title}: ${hero.name} in ${hero.colour}`} fill sizes="(max-width: 860px) 70vw, 30vw" loading="eager" />
                </figure>
                <figcaption><i>Look {pad(index + 1)}</i><span>{look.title} · {formatUsd(total)}</span></figcaption>
              </Link>
            );
          })}
        </div>
        <div className="lookbook__progress" aria-hidden="true"><div ref={barRef} /></div>
      </div>
    </section>
  );
}
