"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { findProduct } from "@/lib/products";
import { formatUsd } from "@/lib/pricing";
import { showToast, signIn, signOut, useAccount, useHydrated, useOrders, useWishlist } from "@/lib/store";
import { StoragePending } from "./StoragePending";

type Mode = "signin" | "register";
type FormErrors = { name?: string; email?: string; password?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: FormErrors = {};
    if (mode === "register" && name.trim().length < 2) found.name = "Enter your name.";
    if (!EMAIL_PATTERN.test(email.trim())) found.email = "Enter a valid email.";
    if (password.length < 8) found.password = "Use at least 8 characters.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Front-end only: the password is checked for length and then discarded.
    const displayName = mode === "register" ? name.trim() : email.trim().split("@")[0];
    signIn({ name: displayName, email: email.trim() });
    setPassword("");
    showToast(mode === "register" ? `Welcome to erke, ${displayName}.` : `Welcome back, ${displayName}.`);
  };

  const tab = (id: Mode, label: string) => (
    <button type="button" role="tab" id={`tab-${id}`} aria-selected={mode === id} aria-controls="auth-panel" onClick={() => { setMode(id); setErrors({}); }}>{label}</button>
  );

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Account">{tab("signin", "Sign in")}{tab("register", "Create account")}</div>
      <form id="auth-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} onSubmit={submit} noValidate style={{ display: "grid", gap: 16 }}>
        {mode === "register" ? (
          <div className="field">
            <label htmlFor="acc-name">Name</label>
            <input id="acc-name" className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="acc-name-err" />
            <span id="acc-name-err" className="field__error">{errors.name}</span>
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="acc-email">Email</label>
          <input id="acc-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby="acc-email-err" />
          <span id="acc-email-err" className="field__error">{errors.email}</span>
        </div>
        <div className="field">
          <label htmlFor="acc-password">Password</label>
          <input id="acc-password" className="input" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} aria-describedby="acc-password-err acc-password-help" />
          <span id="acc-password-help" className="field__help">At least 8 characters.</span>
          <span id="acc-password-err" className="field__error">{errors.password}</span>
        </div>
        <button className="btn btn--block" type="submit">{mode === "register" ? "Create account" : "Sign in"}</button>
        <p className="notice">Preview only: accounts are kept on this device and no password is stored.</p>
      </form>
    </div>
  );
}

function OrderHistory() {
  const orders = useOrders();
  if (orders.length === 0) {
    return <p className="muted">No orders yet. <Link href="/shop" style={{ textDecoration: "underline" }}>Start with the new issue.</Link></p>;
  }
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <div className="summary__row"><b>{order.id}</b><b>{formatUsd(order.totalUsd)}</b></div>
          <span className="muted" style={{ fontSize: 14 }}>
            {new Date(order.createdIso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {order.lines.reduce((n, l) => n + l.quantity, 0)} items · Processing
          </span>
          <div className="order__thumbs">
            {order.lines.map((line) => {
              const product = findProduct(line.slug);
              return product ? <div key={`${line.slug}-${line.size}`}><Image src={product.images[0]} alt={`${line.name}, ${line.colour}`} fill sizes="48px" /></div> : null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AccountView() {
  const account = useAccount();
  const wishCount = useWishlist().length;
  const hydrated = useHydrated();

  if (!hydrated) return <StoragePending />;

  if (!account) {
    return (
      <div className="account">
        <AuthForm />
        <div>
          <h2 className="h3">Why have an account?</h2>
          <ul className="muted" style={{ marginTop: 16, paddingLeft: 18, display: "grid", gap: 8 }}>
            <li>Track orders and returns in one place</li>
            <li>Faster checkout with your details filled in</li>
            <li>Early access to new issues</li>
          </ul>
          <h2 className="h3" style={{ marginTop: 40 }}>Orders on this device</h2>
          <div style={{ marginTop: 16 }}><OrderHistory /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="account">
      <div>
        <span className="eyebrow">Signed in</span>
        <h2 className="h2" style={{ margin: "8px 0 4px" }}>Hi, <i>{account.name}</i></h2>
        <p className="muted">{account.email}</p>
        <div className="cover__actions" style={{ marginTop: 28 }}>
          <Link className="btn btn--ghost" href="/wishlist">Wishlist ({wishCount})</Link>
          <button className="text-btn" type="button" onClick={() => { signOut(); showToast("You're signed out."); }}>Sign out</button>
        </div>
      </div>
      <section aria-labelledby="orders-title">
        <h2 id="orders-title" className="h3" style={{ marginBottom: 16 }}>Your orders</h2>
        <OrderHistory />
      </section>
    </div>
  );
}
