import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/executive-reporting", "/sample-report", "/how-it-works", "/healthcare", "/about", "/contact", "/services", "/privacy"].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
