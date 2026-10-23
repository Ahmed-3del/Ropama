import type { MetadataRoute } from "next";
import { nav, site } from "@/config/site";

const base = site.url ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map(({ href }) => ({
    url: `${base}${href === "/" ? "" : href}`,
    changeFrequency: "weekly" as const,
    priority: href === "/" ? 1 : 0.8,
  }));
}
