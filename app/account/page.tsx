import type { Metadata } from "next";
import { AccountView } from "@/components/AccountView";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <header className="shop-hero"><span className="eyebrow">erke</span><h1 className="display">Your <i>account</i></h1></header>
      <AccountView />
    </>
  );
}
