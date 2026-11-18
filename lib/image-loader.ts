"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

const PLACEHOLDER_CDN = "https://assets.adidas.com/images";

/** Resolves product image paths to sized URLs. Swap this for erke's own CDN when photography is ready. */
export default function erkeImageLoader({ src, width }: LoaderArgs): string {
  if (src.startsWith("/") || src.startsWith("http")) return src;
  return `${PLACEHOLDER_CDN}/w_${width},f_auto,q_auto/${src}`;
}
