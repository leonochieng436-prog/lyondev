import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_DOCUMENTS } from "@/lib/legal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, posts, industries] = await Promise.all([
    db.service.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    db.portfolioProject.findMany({
      where: { status: "PUBLISHED", demo: false },
      select: { slug: true, updatedAt: true },
    }),
    db.blogPost.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
      select: { slug: true, updatedAt: true },
    }),
    db.industry.findMany({ select: { slug: true } }),
  ]);
  const pages = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/portfolio",
    "/pricing",
    "/insights",
    "/contact",
    "/request-quote",
    "/book-consultation",
    "/privacy-request",
    ...LEGAL_DOCUMENTS.map(({ slug }) => `/legal/${slug}`),
  ];

  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`),
      lastModified: project.updatedAt,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/insights/${post.slug}`),
      lastModified: post.updatedAt,
    })),
    ...industries.map((industry) => ({
      url: absoluteUrl(`/solutions/${industry.slug}`),
    })),
  ];
}
