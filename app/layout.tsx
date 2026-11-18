import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { BagDrawer } from "@/components/BagDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/Toaster";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: { default: "erke — Earth, worn loud", template: "%s · erke" },
  description: "Warm-toned streetwear for everyone. Bouclé, brushed fleece and loose track cuts in clay, cocoa and ember.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BagDrawer />
        <Toaster />
      </body>
    </html>
  );
}
