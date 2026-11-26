import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { serviceWaLink } from "@/lib/settings";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Web & Software Services in Nairobi | LYONDEV" },
  description:
    "Explore LYONDEV web development, eCommerce, custom software and digital services for businesses in Nairobi and across Kenya.",
  alternates: { canonical: "/services" },
  ...socialMetadata("/services"),
};
export default async function Services() {
  const list = await db.service.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } });
  return <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Web Development &amp; Software Services in Nairobi, Kenya</h1>
    <span className="mt-4 block h-1 w-14 bg-brand" aria-hidden="true" />
    <p className="mt-5 max-w-3xl leading-7 text-muted">Explore LYONDEV services for businesses in Nairobi and across Kenya, from professional websites and eCommerce to custom software and system integration.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">{list.map((s) => <article key={s.id} className="flex min-h-52 flex-col rounded-xl border border-white/10 bg-card p-6 transition-colors hover:border-brand">
      <Link href={`/services/${s.slug}`} className="group">
        <h2 className="font-semibold text-white transition-colors group-hover:text-brand">{s.title}</h2>
        <p className="mt-2 text-sm text-muted">{s.summary}</p>
      </Link>
      <a href={serviceWaLink(s.title)} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand hover:text-cyan">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />Enquire on WhatsApp
      </a>
    </article>)}</div></main>;
}
