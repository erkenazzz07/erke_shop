"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, label }: { readonly images: readonly string[]; readonly label: string }) {
  const [active, setActive] = useState(0);
  const single = images.length < 2;
  return (
    <div className={single ? "gallery gallery--single" : "gallery"}>
      {single ? null : (
        <div className="gallery__thumbs" role="group" aria-label="Product images">
          {images.map((src, index) => (
            <button key={src} type="button" aria-current={index === active} aria-label={`Show image ${index + 1} of ${images.length}`} onClick={() => setActive(index)}>
              <Image src={src} alt="" fill sizes="72px" />
            </button>
          ))}
        </div>
      )}
      <div className="gallery__main">
        <Image src={images[active]} alt={`${label}, view ${active + 1}`} fill sizes="(max-width: 860px) 100vw, 50vw" preload={active === 0} />
      </div>
    </div>
  );
}
