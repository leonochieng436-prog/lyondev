import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Web Development & Digital Technology Insights | LYONDEV" },
  description:
    "Read practical guidance on website development, software and digital growth for businesses in Nairobi and across Kenya.",
  alternates: { canonical: "/insights" },
  ...socialMetadata("/insights"),
};
const PER = 6;
export default async function Insights({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams; const pg = Math.max(1, Number(page) || 1);
  const where = { status: "PUBLISHED" as const, publishedAt: { lte: new Date() }, ...(q ? { OR: [{ title: { contains: q, mode: "insensitive" as const } }, { excerpt: { contains: q, mode: "insensitive" as const } }] } : {}) };
  const [posts, total] = await Promise.all([db.blogPost.findMany({ where, orderBy: { publishedAt: "desc" }, skip: (pg - 1) * PER, take: PER }), db.blogPost.count({ where })]);
  const qs = (n: number) => `/insights?page=${n}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
  return <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Insights</h1>
    <form className="mt-6"><input name="q" defaultValue={q} placeholder="Search articles" aria-label="Search articles" className="w-full rounded-lg border p-2" /></form>
    {posts.length === 0 && <p className="mt-8 text-muted">No articles found.</p>}
    <div className="mt-8 space-y-6">{posts.map((p) => <article key={p.id}><Link href={`/insights/${p.slug}`} className="text-xl font-semibold text-navy hover:text-brand">{p.title}</Link><p className="mt-1 text-sm text-muted">{p.excerpt}</p></article>)}</div>
    <div className="mt-10 flex gap-4 text-sm">{pg > 1 && <Link href={qs(pg - 1)}>Previous</Link>}{pg * PER < total && <Link href={qs(pg + 1)}>Next</Link>}</div></main>;
}
