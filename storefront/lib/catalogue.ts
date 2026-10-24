export type Size = "S" | "M" | "L" | "XL";

export type Product = {
  slug: string;
  name: string;
  pricePaise: number;
  colour: string;
  fabric: string;
  fabricNote: string;
  cut: string;
  care: string;
  fit: string;
  image: string;
  alt: string;
  featured: boolean;
  sizes: Size[];
  sample: true;
};

export const SIZES: Size[] = ["S", "M", "L", "XL"];

/** Sample catalogue. Not inventory. Prices are the planned band, not live offers. */
export const products: Product[] = [
  {
    slug: "undyed-week",
    name: "Undyed Week",
    pricePaise: 720000,
    colour: "Undyed",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, relaxed shoulder, side vents.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-undyed.jpg",
    alt: "Placeholder still for Undyed Week. Not a Valoir product photograph.",
    featured: true,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "soot",
    name: "Soot",
    pricePaise: 780000,
    colour: "Soot",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, clean placket.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-soot.jpg",
    alt: "Placeholder still for Soot. Not a Valoir product photograph.",
    featured: true,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "indigo",
    name: "Indigo",
    pricePaise: 840000,
    colour: "Indigo",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, slightly longer hem.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-indigo.jpg",
    alt: "Placeholder still for Indigo. Not a Valoir product photograph.",
    featured: true,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "laterite",
    name: "Laterite",
    pricePaise: 800000,
    colour: "Laterite",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, open collar.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-laterite.jpg",
    alt: "Placeholder still for Laterite. Not a Valoir product photograph.",
    featured: true,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "atelier-bundi",
    name: "Atelier Bundi",
    pricePaise: 960000,
    colour: "Soot",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Nehru bundi over a straight kurta. Two-piece set.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-bundi.jpg",
    alt: "Placeholder still for Atelier Bundi. Not a Valoir product photograph.",
    featured: false,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "lamppost-grey",
    name: "Lamppost Grey",
    pricePaise: 760000,
    colour: "Grey",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, narrow placket.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-lamppost.jpg",
    alt: "Placeholder still for Lamppost Grey. Not a Valoir product photograph.",
    featured: false,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "grove",
    name: "Grove",
    pricePaise: 740000,
    colour: "Grove",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, soft shoulder.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-grove.jpg",
    alt: "Placeholder still for Grove. Not a Valoir product photograph.",
    featured: false,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
  {
    slug: "noon-soot",
    name: "Noon Soot",
    pricePaise: 820000,
    colour: "Soot",
    fabric: "Cotton",
    fabricNote: "Composition and mill to be confirmed. Do not treat this as a product claim.",
    cut: "Straight kurta, daylight weight.",
    care: "Care copy pending. Placeholder only.",
    fit: "Model measurements pending. Size chart is a draft.",
    image: "/media/p-noon.jpg",
    alt: "Placeholder still for Noon Soot. Not a Valoir product photograph.",
    featured: false,
    sizes: ["S", "M", "L", "XL"],
    sample: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function uniqueColours() {
  return Array.from(new Set(products.map((p) => p.colour)));
}
