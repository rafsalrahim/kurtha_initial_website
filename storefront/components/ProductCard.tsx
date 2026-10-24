import Link from "next/link";
import type { Product } from "@/lib/catalogue";
import { formatInr } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="card" href={`/shop/${product.slug}`}>
      <div className="frame">
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="meta">
        <div className="name">{product.name}</div>
        <div className="price">{formatInr(product.pricePaise)}</div>
      </div>
    </Link>
  );
}
