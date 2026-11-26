"use client";

import { useState } from "react";
import Link from "next/link";

export type OfferGroup = "WEBSITE" | "ECOMMERCE" | "SOFTWARE" | "MOBILE" | "CARE";
export type OfferPackage = {
  id: string;
  group: OfferGroup;
  name: string;
  price: string;
};

const tabs: { value: OfferGroup; label: string }[] = [
  { value: "WEBSITE", label: "Websites" },
  { value: "ECOMMERCE", label: "eCommerce" },
  { value: "SOFTWARE", label: "Software" },
  { value: "MOBILE", label: "Mobile" },
  { value: "CARE", label: "Care" },
];

export default function OffersTabs({ offers }: { offers: OfferPackage[] }) {
  const [active, setActive] = useState<OfferGroup>("WEBSITE");
  const selected = offers.filter((offer) => offer.group === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-white/10" role="tablist" aria-label="Pricing categories">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            id={`offer-tab-${tab.value}`}
            aria-selected={active === tab.value}
            aria-controls="offer-panel"
            onClick={() => setActive(tab.value)}
            className={`border-b-2 px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan sm:px-4 ${
              active === tab.value
                ? "border-brand text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id="offer-panel"
        role="tabpanel"
        aria-labelledby={`offer-tab-${active}`}
        className="pt-6"
      >
        {selected.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selected.map((offer) => (
              <article key={offer.id} className="flex min-h-48 flex-col border border-white/10 bg-card p-5">
                <h3 className="font-semibold text-white">{offer.name}</h3>
                <p className="mt-4 font-head text-xl font-extrabold text-white">{offer.price}</p>
                <Link
                  href={`/request-quote?service=${encodeURIComponent(offer.name)}`}
                  className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-cyan hover:text-white"
                >
                  Request a quote <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="border border-dashed border-white/15 px-5 py-8 text-sm text-slate-300">
            Pricing options for this category will be available soon.
          </p>
        )}
      </div>
    </div>
  );
}
