import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: absoluteSitemapUrl(SITE_URL),
  };
}

function absoluteSitemapUrl(siteUrl: string) {
  return new URL("/sitemap.xml", siteUrl).toString();
}
