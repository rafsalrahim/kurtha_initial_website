"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Size } from "@/lib/catalogue";
import { useCart } from "@/lib/cart";

export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [size, setSize] = useState<Size | null>(null);
  const [err, setErr] = useState("");

  function onAdd() {
    if (!size) {
      setErr("Select a size.");
      return;
    }
    add(product.slug, size);
    router.push("/cart");
  }

  return (
    <div>
      <p className="kicker" style={{ marginBottom: 8 }}>
        Size
      </p>
      <div className="sizes" role="group" aria-label="Size">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={size === s}
            onClick={() => {
              setSize(s);
              setErr("");
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="err" role="status">
        {err}
      </p>
      <button className="add" type="button" onClick={onAdd}>
        Add to bag
      </button>
    </div>
  );
}
