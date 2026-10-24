import type { Metadata } from "next";

export const metadata: Metadata = { title: "Materials" };

export default function MaterialsPage() {
  return (
    <section className="section">
      <div className="wrap policy">
        <span className="draft">Placeholder</span>
        <h1>Materials</h1>
        <p>
          Premium price has to rest on facts: fibre, weave, cut, stitch, button, care. Those
          facts are not in this repository yet (KUR-007).
        </p>
        <dl className="facts">
          <dt>Fabric</dt>
          <dd>Composition, origin, mill — unpublished. No GI or village claim.</dd>
          <dt>Cut</dt>
          <dd>Straight kurta, relaxed shoulder. Pattern blocks not locked.</dd>
          <dt>Finish</dt>
          <dd>Placket, cuff, hem — to be photographed on the actual garment.</dd>
          <dt>Care</dt>
          <dd>
            Draft only. Do not wash a real set from this page.
          </dd>
        </dl>
      </div>
    </section>
  );
}
