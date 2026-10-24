import Link from "next/link";
import { featuredProducts } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const featured = featuredProducts();
  return (
    <>
      <section className="hero" aria-label="Campaign">
        <img
          src="/media/hero.jpg"
          alt="Placeholder campaign still. Not a Valoir product photograph."
        />
        <div className="hero-copy">
          <h1>Cut for the week.</h1>
          <p>Men’s kurtas. Cloth, cut, and a house that does not shout.</p>
          <Link className="cta" href="/shop">
            Discover the collection
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">The week</p>
          <h2>Four sets</h2>
          <div className="grid-4" style={{ marginTop: 32 }}>
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap chapter">
          <img
            src="/media/campaign.jpg"
            alt="Placeholder editorial still. Not a Valoir product photograph."
          />
          <div>
            <p className="kicker">Philosophy</p>
            <h2>Arrive as you are needed.</h2>
            <p>
              We cut for men who keep their word in a room. Dignity without costume.
              Integrity in the cloth and in the price. Confidence that does not need a crest.
            </p>
            <p>
              <Link href="/philosophy">The house</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Materials</p>
          <h2>Facts, when we have them.</h2>
          <p className="muted" style={{ maxWidth: "52ch" }}>
            Fabric mill, weave, and finish will be published only after they are true.
            Until then this section is a labelled placeholder — not a craft claim.
          </p>
          <p>
            <Link href="/materials">Materials</Link>
          </p>
        </div>
      </section>
    </>
  );
}
