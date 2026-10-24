"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/materials", label: "Materials" },
];

export function Header() {
  const { count } = useCart();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
        Valoir
      </Link>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={path === l.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="header-end">
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <Link href="/cart" aria-label={`Bag, ${count} items`}>
          Bag{count ? ` (${count})` : ""}
        </Link>
      </div>
    </header>
  );
}
