import type { Metadata } from "next";
import { products, uniqueColours } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ colour?: string }>;
}) {
  return <ShopInner searchParams={searchParams} />;
}

async function ShopInner({
  searchParams,
}: {
  searchParams: Promise<{ colour?: string }>;
}) {
  const { colour } = await searchParams;
  const colours = uniqueColours();
  const list = colour ? products.filter((p) => p.colour === colour) : products;

  return (
    <section className="section">
      <div className="wrap">
        <p className="kicker">Collection</p>
        <h2>The week</h2>
        <nav className="filters" aria-label="Colour">
          <a href="/shop" aria-current={!colour ? "page" : undefined}>
            All
          </a>
          {colours.map((c) => (
            <a
              key={c}
              href={`/shop?colour=${encodeURIComponent(c)}`}
              aria-current={colour === c ? "page" : undefined}
            >
              {c}
            </a>
          ))}
        </nav>
        {list.length === 0 ? (
          <p>No sets in that colour. The sample catalogue is small on purpose.</p>
        ) : (
          <div className="grid-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
