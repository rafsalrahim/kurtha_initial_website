import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="wrap policy">
        <span className="draft">Placeholder</span>
        <h1>Contact</h1>
        <p>
          Customer support email is not configured. Do not send orders here. When the house
          mailbox exists it will replace this page.
        </p>
      </div>
    </section>
  );
}
