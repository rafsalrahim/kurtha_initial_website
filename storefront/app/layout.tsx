import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
});

const ui = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000"),
  title: {
    default: "Valoir — Men's kurtas",
    template: "%s — Valoir",
  },
  description: "A men's kurta house. Cloth, cut, and the week. India, INR. Sample catalogue.",
  openGraph: {
    title: "Valoir — Men's kurtas",
    description: "Cloth, cut, and the week.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${ui.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-ui-loaded), var(--font-ui)",
        }}
      >
        <a className="skip" href="#main">
          Skip to content
        </a>
        <CartProvider>
          <p className="sample">
            Sample catalogue — not for sale. Photographs are licensed stock, not Valoir garments.
          </p>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
