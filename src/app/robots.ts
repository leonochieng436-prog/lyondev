import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    ...(siteUrl ? { sitemap: absoluteSitemapUrl(siteUrl) } : {}),
  };
}

function absoluteSitemapUrl(siteUrl: string) {
  return new URL("/sitemap.xml", siteUrl).toString();
}
