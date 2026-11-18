"use client";

import { showToast, toggleWishlist, useWishlist } from "@/lib/store";
import { HeartIcon } from "./icons";

export function WishlistButton({ slug, label }: { readonly slug: string; readonly label: string }) {
  const saved = useWishlist().includes(slug);
  return (
    <button
      type="button"
      className="wish"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label} to wishlist`}
      onClick={() => {
        toggleWishlist(slug);
        showToast(saved ? `${label} removed from your wishlist.` : `${label} saved to your wishlist.`);
      }}
    >
      <HeartIcon />
    </button>
  );
}
