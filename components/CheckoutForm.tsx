"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { COUNTRIES, formatCardNumber, formatExpiry, validateCheckout, type CheckoutErrors, type CheckoutField, type CheckoutValues } from "@/lib/checkout-validation";
import { findProduct } from "@/lib/products";
import { SHIPPING_METHODS, formatUsd, shippingCostUsd, type ShippingMethodId } from "@/lib/pricing";
import { bagSubtotalUsd, clearBag, saveOrder, useAccount, useBag, useHydrated, type OrderLine } from "@/lib/store";
import { StoragePending } from "./StoragePending";

type FieldProps = {
  readonly id: CheckoutField;
  readonly label: string;
  readonly values: CheckoutValues;
  readonly errors: CheckoutErrors;
  readonly onChange: (id: CheckoutField, value: string) => void;
  readonly autoComplete: string;
  readonly inputMode?: "numeric" | "email" | "text";
  readonly placeholder?: string;
  readonly full?: boolean;
  readonly format?: (value: string) => string;
};

function Field({ id, label, values, errors, onChange, autoComplete, inputMode, placeholder, full, format }: FieldProps) {
  const error = errors[id];
  return (
    <div className={full ? "field full" : "field"}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        className="input"
        value={values[id]}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(id, format ? format(e.target.value) : e.target.value)}
      />
      <span id={`${id}-error`} className="field__error">{error}</span>
    </div>
  );
}

const newOrderId = () => `ERK-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export function CheckoutForm() {
  const lines = useBag();
  const account = useAccount();
  const router = useRouter();
  const [edits, setEdits] = useState<Partial<CheckoutValues>>({});
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [method, setMethod] = useState<ShippingMethodId>("standard");
  const [placing, setPlacing] = useState(false);
  const hydrated = useHydrated();

  const current: CheckoutValues = {
    email: account?.email ?? "", name: account?.name ?? "", address: "", city: "", postcode: "", country: "United States", cardNumber: "", cardExpiry: "", cardCvc: "",
    ...edits,
  };

  const subtotalUsd = bagSubtotalUsd(lines);
  const shippingUsd = shippingCostUsd(subtotalUsd, method);
  const totalUsd = subtotalUsd + shippingUsd;

  const onChange = (id: CheckoutField, value: string) => {
    setEdits((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  };
  const fieldProps = { values: current, errors, onChange };

  if (!hydrated) return <StoragePending />;

  if (lines.length === 0 && !placing) {
    return (
      <div className="empty">
        <p className="h3">Your bag is empty, so there&apos;s nothing to check out.</p>
        <Link className="btn" href="/shop">Shop the issue</Link>
      </div>
    );
  }

  const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateCheckout(current);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setPlacing(true);
    const orderLines: OrderLine[] = lines.flatMap((line) => {
      const product = findProduct(line.slug);
      return product ? [{ slug: line.slug, name: product.name, colour: product.colour, size: line.size, quantity: line.quantity, priceUsd: product.priceUsd }] : [];
    });
    const id = newOrderId();
    // Card details are validated for the demo but never stored or sent anywhere.
    saveOrder({
      id,
      createdIso: new Date().toISOString(),
      email: current.email.trim(),
      shipTo: { name: current.name.trim(), address: current.address.trim(), city: current.city.trim(), postcode: current.postcode.trim(), country: current.country },
      shippingMethod: method,
      lines: orderLines,
      subtotalUsd,
      shippingUsd,
      totalUsd,
    });
    clearBag();
    router.push(`/checkout/success?order=${id}`);
  };

  return (
    <div className="checkout">
      <form onSubmit={placeOrder} noValidate aria-label="Checkout">
        <fieldset>
          <h2>Contact</h2>
          {account ? <p className="muted" style={{ fontSize: 14 }}>Signed in as {account.name}.</p> : <p className="muted" style={{ fontSize: 14 }}>Have an account? <Link href="/account" style={{ textDecoration: "underline" }}>Sign in</Link></p>}
          <Field id="email" label="Email" autoComplete="email" inputMode="email" placeholder="you@example.com" full {...fieldProps} />
        </fieldset>

        <fieldset className="form-grid">
          <h2 className="full">Delivery</h2>
          <Field id="name" label="Full name" autoComplete="name" full {...fieldProps} />
          <Field id="address" label="Street address" autoComplete="street-address" full {...fieldProps} />
          <Field id="city" label="City" autoComplete="address-level2" {...fieldProps} />
          <Field id="postcode" label="Postal code" autoComplete="postal-code" {...fieldProps} />
          <div className="field full">
            <label htmlFor="country">Country</label>
            <select id="country" className="input" value={current.country} autoComplete="country-name" onChange={(e) => onChange("country", e.target.value)}>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <span className="field__error">{errors.country}</span>
          </div>
        </fieldset>

        <fieldset>
          <legend className="sr-only">Shipping method</legend>
          <h2 aria-hidden="true">Shipping method</h2>
          {SHIPPING_METHODS.map((option) => {
            const cost = shippingCostUsd(subtotalUsd, option.id);
            return (
              <label key={option.id} className="radio-card">
                <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input type="radio" name="shipping" value={option.id} checked={method === option.id} onChange={() => setMethod(option.id)} />
                  <span><b>{option.label}</b><br /><span className="muted" style={{ fontSize: 14 }}>{option.eta}</span></span>
                </span>
                <b>{cost === 0 ? "Free" : formatUsd(cost)}</b>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="form-grid">
          <h2 className="full">Payment</h2>
          <p className="notice full"><b>Demo checkout.</b> Payments aren&apos;t connected yet, so no card is charged and card details are never saved or sent.</p>
          <Field id="cardNumber" label="Card number" autoComplete="cc-number" inputMode="numeric" placeholder="1234 5678 9012 3456" full format={formatCardNumber} {...fieldProps} />
          <Field id="cardExpiry" label="Expiry (MM/YY)" autoComplete="cc-exp" inputMode="numeric" placeholder="MM/YY" format={formatExpiry} {...fieldProps} />
          <Field id="cardCvc" label="Security code" autoComplete="cc-csc" inputMode="numeric" placeholder="123" format={(v) => v.replace(/\D/g, "").slice(0, 4)} {...fieldProps} />
        </fieldset>

        <button className="btn btn--block" type="submit" disabled={placing} style={{ minHeight: 60 }}>
          {placing ? "Placing order…" : `Place order · ${formatUsd(totalUsd)}`}
        </button>
      </form>

      <aside className="summary" aria-label="Order summary">
        <h2 className="h3">In your bag</h2>
        {lines.map((line) => {
          const product = findProduct(line.slug);
          if (!product) return null;
          return (
            <div key={`${line.slug}-${line.size}`} className="summary-line">
              <div className="summary-line__img"><Image src={product.images[0]} alt="" fill sizes="56px" /></div>
              <div><b>{product.name}</b><br /><span className="muted">{product.colour} · {line.size} · ×{line.quantity}</span></div>
              <span>{formatUsd(product.priceUsd * line.quantity)}</span>
            </div>
          );
        })}
        <div className="summary__row" style={{ borderTop: "1px solid var(--sand-deep)", paddingTop: 14 }}><span>Subtotal</span><span>{formatUsd(subtotalUsd)}</span></div>
        <div className="summary__row"><span>Shipping</span><span>{shippingUsd === 0 ? "Free" : formatUsd(shippingUsd)}</span></div>
        <div className="summary__total"><span>Total</span><span>{formatUsd(totalUsd)}</span></div>
        <Link className="text-btn" href="/cart">Edit bag</Link>
      </aside>
    </div>
  );
}
