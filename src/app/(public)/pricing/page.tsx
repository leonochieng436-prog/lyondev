import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { priceText } from "@/lib/format";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Website & Software Development Pricing in Kenya | LYONDEV" },
  description:
    "Explore indicative KES pricing for website development, eCommerce, custom software and maintenance. Request a tailored quote from LYONDEV in Nairobi.",
  alternates: { canonical: "/pricing" },
  ...socialMetadata("/pricing"),
};
export const revalidate = 60;
const LABEL: Record<string, string> = { WEBSITE: "Website development", ECOMMERCE: "eCommerce", SOFTWARE: "Custom software (starting prices)", MOBILE: "Mobile applications", CARE: "Monthly maintenance" };
export default async function Pricing() {
  const all = await db.pricingPackage.findMany({ where: { visible: true }, include: { features: true }, orderBy: { sortOrder: "asc" } });
  return (
    <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Pricing</h1>
      {Object.keys(LABEL).map((g) => { const items = all.filter((p) => p.group === g); return items.length === 0 ? null : (
        <section key={g} className="mt-12"><h2 className="text-2xl font-bold text-navy">{LABEL[g]}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">{items.map((p) => <article key={p.id} className={`rounded-xl p-5 ${p.recommended ? "ring-2 ring-brand" : "border"}`}>
            <h3 className="font-semibold text-navy">{p.name}{p.recommended && " · Recommended"}</h3><p className="mt-1 font-bold">{priceText(p)}</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">{p.features.map((f) => <li key={f.id}>{f.text}</li>)}</ul>
            <Link href={`/contact?service=${encodeURIComponent(p.name)}`} className="mt-3 inline-block text-sm font-semibold text-brand">Request a quote</Link></article>)}</div></section>); })}
      <section className="mt-14 rounded-xl bg-slate-50 p-6 text-sm text-muted"><h2 className="font-semibold text-navy">Terms</h2>
        <p className="mt-2">50% deposit before development, 50% before final handover. Quotes are valid for 14 days. Work outside the agreed scope is billed separately. Domains, hosting, third-party subscriptions, ad budgets and payment gateway fees are billed separately. 30-day bug-fix warranty for defects within the agreed scope. Prices are indicative; a final quotation follows a review of your requirements.</p></section>
    </main>
  );
}
