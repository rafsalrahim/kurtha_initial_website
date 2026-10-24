import type { MetadataRoute } from "next";
import { products } from "@/lib/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";
  const paths = ["", "/shop", "/philosophy", "/materials", "/cart", ...products.map((p) => `/shop/${p.slug}`)];
  return paths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.6 }));
}
