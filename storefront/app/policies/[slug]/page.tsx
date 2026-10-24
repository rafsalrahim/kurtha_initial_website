import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping",
    body: [
      "DRAFT. India-wide prepaid shipping is the working assumption. Carrier, SLA, and rates are not set. No COD.",
      "Delivery estimates will appear on the order only when the backend can support them.",
    ],
  },
  returns: {
    title: "Returns and exchanges",
    body: [
      "DRAFT. There is no customer returns portal in MVP. An operator process will be written in KUR-021.",
      "Do not assume a 30-day window until this page loses the draft mark.",
    ],
  },
  "size-fit": {
    title: "Size and fit",
    body: [
      "DRAFT. Sizes S–XL are sample options so the PDP control is real. They are not a graded chart.",
      "Model measurements will be published with the first shoot.",
    ],
  },
  care: {
    title: "Care",
    body: [
      "DRAFT. Wash and iron instructions wait on actual cloth. This page is a labelled hole, not advice.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "DRAFT. We do not take payment on this storefront. Bag contents live in your browser (localStorage).",
      "A DPDP-ready notice is KUR-024, not this paragraph. No marketing pixels in MVP.",
    ],
  },
  terms: {
    title: "Terms",
    body: [
      "DRAFT. Merchant of record, GSTIN, and sale terms are unset. This site is a sample catalogue.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return { title: page?.title ?? "Policy" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <section className="section">
      <div className="wrap policy">
        <span className="draft">Draft</span>
        <h1>{page.title}</h1>
        {page.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </section>
  );
}
