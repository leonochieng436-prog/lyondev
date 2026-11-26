import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Industry Technology Solutions in Nairobi & Kenya | LYONDEV" },
  description:
    "Explore digital services for business sectors in Nairobi and Kenya. LYONDEV plans websites, software and integrations around your workflows.",
  alternates: { canonical: "/solutions" },
  ...socialMetadata("/solutions"),
};
export default async function Solutions() {
  const list = await db.industry.findMany({ orderBy: { name: "asc" } });
  return <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Technology Solutions by Industry</h1><p className="mt-4 max-w-3xl leading-7 text-muted">Explore digital services for business sectors in Nairobi and across Kenya. LYONDEV plans websites, custom software and integrations around each organization's workflows.</p>{list.length === 0 && <p className="mt-6 text-muted">No solutions published yet.</p>}
    <div className="mt-8 grid gap-5 md:grid-cols-3">{list.map((i) => <Link key={i.id} href={`/solutions/${i.slug}`} className="rounded-xl border p-6 hover:border-brand"><h2 className="font-semibold text-navy">{i.name}</h2><p className="mt-2 text-sm text-muted">{i.summary}</p></Link>)}</div></main>;
}
