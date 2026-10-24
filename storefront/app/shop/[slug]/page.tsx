import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/catalogue";
import { formatInr } from "@/lib/format";
import { AddToBag } from "@/components/AddToBag";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = getProduct(slug);
    if (!p) return { title: "Set" };
    return { title: p.name, description: `${p.name}. Sample. ${formatInr(p.pricePaise)}.` };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article className="wrap pdp">
      <div className="gallery">
        <img src={product.image} alt={product.alt} />
      </div>
      <div>
        <p className="kicker">Kurta set · sample</p>
        <h1>{product.name}</h1>
        <p className="price">{formatInr(product.pricePaise)}</p>
        <AddToBag product={product} />
        <dl className="facts">
          <dt>Cloth</dt>
          <dd>{product.fabricNote}</dd>
          <dt>Cut</dt>
          <dd>{product.cut}</dd>
          <dt>Fit</dt>
          <dd>
            {product.fit}{" "}
            <Link href="/policies/size-fit">Size guide (draft)</Link>
          </dd>
          <dt>Care</dt>
          <dd>
            {product.care} <Link href="/policies/care">Care (draft)</Link>
          </dd>
        </dl>
      </div>
    </article>
  );
}
