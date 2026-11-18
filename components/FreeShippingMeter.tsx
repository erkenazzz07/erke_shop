import { FREE_SHIPPING_THRESHOLD_USD, formatUsd } from "@/lib/pricing";

export function FreeShippingMeter({ subtotalUsd }: { readonly subtotalUsd: number }) {
  const remainingUsd = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotalUsd);
  const percent = Math.min(100, (subtotalUsd / FREE_SHIPPING_THRESHOLD_USD) * 100);
  return (
    <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
      <span>{remainingUsd > 0 ? <>You&apos;re <b>{formatUsd(remainingUsd)}</b> away from free shipping.</> : <b>You&apos;ve got free standard shipping.</b>}</span>
      <div className="progress" role="progressbar" aria-label="Progress to free shipping" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percent)}>
        <div style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
