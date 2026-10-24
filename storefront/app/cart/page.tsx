"use client";

import Link from "next/link";
import { getProduct } from "@/lib/catalogue";
import { formatInr } from "@/lib/format";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { lines, setQty, remove, subtotalPaise } = useCart();

  if (lines.length === 0) {
    return (
      <section className="section">
        <div className="wrap">
          <h2>Bag</h2>
          <p className="muted">Your bag is empty. Sets wait on the collection page.</p>
          <p>
            <Link href="/shop">The collection</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <h2>Bag</h2>
        <ul className="bag-list">
          {lines.map((line) => {
            const p = getProduct(line.slug);
            if (!p) return null;
            return (
              <li key={`${line.slug}-${line.size}`}>
                <img src={p.image} alt={p.alt} />
                <div>
                  <Link href={`/shop/${p.slug}`}>{p.name}</Link>
                  <p className="muted">Size {line.size}</p>
                  <div className="qty">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(line.slug, line.size, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty(line.slug, line.size, line.qty + 1)}>
                      +
                    </button>
                    <button type="button" onClick={() => remove(line.slug, line.size)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div>{formatInr(p.pricePaise * line.qty)}</div>
              </li>
            );
          })}
        </ul>
        <div className="total">
          <span>Subtotal</span>
          <span>{formatInr(subtotalPaise)}</span>
        </div>
        <p className="muted">Shipping calculated when checkout is live. India, prepaid, INR.</p>
        <p>
          <Link className="add" href="/checkout" style={{ display: "inline-block", lineHeight: "48px" }}>
            Checkout
          </Link>
        </p>
      </div>
    </section>
  );
}
