"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Size } from "./catalogue";

export type Line = { slug: string; size: Size; qty: number };

type CartValue = {
  lines: Line[];
  add: (slug: string, size: Size) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  count: number;
  subtotalPaise: number;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "valoir-bag-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Line[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l.slug && l.size && l.qty > 0));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((slug: string, size: Size) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (i === -1) return [...prev, { slug, size, qty: 1 }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + 1 };
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, size: Size, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => !(l.slug === slug && l.size === size));
      return prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l));
    });
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotalPaise = lines.reduce((n, l) => {
      const p = getProduct(l.slug);
      return n + (p ? p.pricePaise * l.qty : 0);
    }, 0);
    return { lines, add, setQty, remove, count, subtotalPaise };
  }, [lines, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}
