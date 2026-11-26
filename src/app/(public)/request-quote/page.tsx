import { db } from "@/lib/db";
import Wizard from "./Wizard";
import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
export const metadata: Metadata = {
  title: { absolute: "Request a Web or Software Development Quote | LYONDEV" },
  description:
    "Share your project requirements with LYONDEV to receive an indicative quote for website development, custom software or digital services in Kenya.",
  alternates: { canonical: "/request-quote" },
  ...socialMetadata("/request-quote"),
};
export default async function Quote() {
  const [packs, addons] = await Promise.all([db.pricingPackage.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }), db.pricingAddon.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } })]);
  return <main className="page-container"><h1 className="text-4xl font-extrabold text-navy">Request a Quote</h1>
    <Wizard packs={packs.map((p) => ({ id: p.id, group: p.group, name: p.name, from: p.priceFromKes, to: p.priceToKes, unit: p.unit }))} addons={addons.map((a) => ({ id: a.id, name: a.name, from: a.priceFromKes, to: a.priceToKes }))} /></main>;
}
