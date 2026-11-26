import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Web & Software Development Portfolio | LYONDEV Kenya" },
  description:
    "Explore selected LYONDEV web development and custom software projects for businesses in Nairobi and across Kenya.",
  alternates: { canonical: "/portfolio" },
  ...socialMetadata("/portfolio"),
};
const CATS = ["Websites", "eCommerce", "Business systems", "Mobile applications", "Enterprise software", "Automation"];
export default async function Portfolio({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const list = await db.portfolioProject.findMany({ where: { status: "PUBLISHED", ...(category && CATS.includes(category) ? { category } : {}) }, orderBy: { createdAt: "desc" } });
  return <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Web &amp; Software Development Portfolio</h1><p className="mt-4 max-w-3xl leading-7 text-muted">Explore selected website, eCommerce and software projects delivered by LYONDEV for organizations in Nairobi and across Kenya.</p>
    <nav className="mt-6 flex flex-wrap gap-2">{["All", ...CATS].map((c) => <Link key={c} href={c === "All" ? "/portfolio" : `/portfolio?category=${encodeURIComponent(c)}`} className={`rounded-full border px-4 py-1.5 text-sm ${(category ?? "All") === c ? "bg-navy text-white" : ""}`}>{c}</Link>)}</nav>
    {list.length === 0 && <p className="mt-8 text-muted">No projects in this category yet.</p>}
    <div className="mt-8 grid gap-5 md:grid-cols-3">{list.map((p) => <Link key={p.id} href={`/portfolio/${p.slug}`} className="overflow-hidden rounded-xl border hover:border-brand">{p.coverUrl && <img src={p.coverUrl} alt={p.name} loading="lazy" className="h-40 w-full object-cover" />}<div className="p-5"><p className="text-xs text-muted">{p.category}{p.demo && " · Demonstration project"}</p><h2 className="mt-1 font-semibold text-navy">{p.name}</h2><p className="mt-2 text-sm text-muted">{p.summary}</p><p className="mt-2 text-xs text-brand">{p.technologies.join(", ")}</p></div></Link>)}</div></main>;
}
