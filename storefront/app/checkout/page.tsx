import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="wrap policy">
        <span className="draft">Boundary</span>
        <h1>Checkout is not live</h1>
        <p>
          Payment runs through Razorpay on Medusa when test keys exist (KUR-016 / KUR-017).
          This page does not take cards, UPI, or addresses for a charge. We never store PAN or
          CVV.
        </p>
        <p>
          What is missing: Medusa backend on Node 22, Postgres, Razorpay test keys, and a later
          explicit yes for live keys. None of those are configured on this machine.
        </p>
        <p>
          <Link href="/cart">Return to bag</Link>
        </p>
      </div>
    </section>
  );
}
