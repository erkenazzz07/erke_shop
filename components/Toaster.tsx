"use client";

import { dismissToast, setBagDrawerOpen, useToast } from "@/lib/store";

export function Toaster() {
  const toast = useToast();
  return (
    <div className="toast" data-show={!!toast} role="status" aria-live="polite">
      <span>{toast?.message}</span>
      {toast?.action === "open-bag" ? (
        <button type="button" onClick={() => { dismissToast(); setBagDrawerOpen(true); }}>View bag</button>
      ) : null}
    </div>
  );
}
