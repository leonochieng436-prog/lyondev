import Link from "next/link";
import { ArrowUp, MessageCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { CookieConsentProvider, CookieSettingsButton } from "@/components/legal/CookieConsent";
import NewsletterForm from "@/components/legal/NewsletterForm";
import { db } from "@/lib/db";
import { getSettings, LYONDEV_WHATSAPP_DISPLAY, waLink } from "@/lib/settings";
import { COMPANY_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { LEGAL_DOCUMENTS } from "@/lib/legal";
import { SiteNav, UtilityBar } from "@/components/public/PublicSite";

const FOOTER_LINKS = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Solutions", "/solutions"],
  ["Portfolio", "/portfolio"],
  ["Pricing", "/pricing"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
  ["Request a quote", "/request-quote"],
  ["Book a consultation", "/book-consultation"],
];

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, services, solutions] = await Promise.all([
    getSettings(),
    db.service.findMany({
      where: { status: "PUBLISHED" },
      select: { title: true, slug: true },
      orderBy: { sortOrder: "asc" },
      take: 10,
    }),
    db.industry.findMany({
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
      take: 8,
    }),
  ]);
  const whatsapp = waLink(settings.whatsapp);
  const sameAs = ["facebook", "twitter", "linkedin"].flatMap((key) => {
    const value = settings[key];
    return typeof value === "string" && /^https:\/\//i.test(value.trim()) ? [value.trim()] : [];
  });
  const gaId =
    typeof settings.gaId === "string" && /^G-[A-Z0-9]+$/i.test(settings.gaId.trim())
      ? settings.gaId.trim()
      : null;
  const publicAddress =
    typeof settings.addressPubliclyVerified === "string" &&
    settings.addressPubliclyVerified.trim().toLowerCase() === "true" &&
    typeof settings.address === "string"
      ? settings.address.trim()
      : "";

  return (
    <CookieConsentProvider gaId={gaId}>
    <div id="top" className="public-shell min-h-screen bg-ink text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "LYONDEV",
          url: SITE_URL,
          description: COMPANY_DESCRIPTION,
          email: settings.email,
          areaServed: [
            {
              "@type": "City",
              name: "Nairobi",
              containedInPlace: { "@type": "Country", name: "Kenya" },
            },
            { "@type": "Country", name: "Kenya" },
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: settings.email,
          },
          ...(sameAs.length ? { sameAs } : {}),
        }}
      />
      <AnalyticsEvents />
      <header className="sticky top-0 z-40">
        <UtilityBar settings={settings} />
        <SiteNav services={services} solutions={solutions} />
      </header>

      {children}

      <footer className="border-t border-brand/50 bg-ink py-14 text-sm text-slate-300">
        <div className="container-custom grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="font-head text-lg font-extrabold text-white">
              {settings.companyName ?? "LYONDEV"}
            </Link>
            
            <p className="mt-2 text-xs font-semibold tracking-wide text-brand">{settings.tagline ?? "Technology. Innovation. Growth."}</p>
            <a className="mt-4 block break-all hover:text-brand" href={`mailto:${settings.email}`}>{settings.email}</a>
            {settings.phone && <a className="mt-1 block hover:text-white" href={`tel:${String(settings.phone).replace(/[^\d+]/g, "")}`}>{settings.phone}</a>}
            {publicAddress && <p className="mt-3">{publicAddress}</p>}
            {whatsapp && (
              <a
                className="mt-3 inline-flex items-center gap-2 font-semibold text-brand hover:text-cyan"
                href={waLink(settings.whatsapp, "Hello LYONDEV, I would like to make an enquiry about your services.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp: {LYONDEV_WHATSAPP_DISPLAY}
              </a>
            )}
          </div>
          <nav aria-label="Footer company links">
            <h2 className="mb-3 font-semibold text-white">Explore</h2>
            {FOOTER_LINKS.slice(0, 5).map(([label, href]) => (
              <Link key={href} href={href} className="block py-1.5 hover:text-cyan">{label}</Link>
            ))}
          </nav>
          <nav aria-label="Footer resources">
            <h2 className="mb-3 font-semibold text-white">Resources</h2>
            {FOOTER_LINKS.slice(5).map(([label, href]) => (
              <Link key={href} href={href} className="block py-1.5 hover:text-cyan">{label}</Link>
            ))}
          </nav>
          <nav aria-label="Footer services">
            <h2 className="mb-3 font-semibold text-white">Services</h2>
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="block py-1.5 hover:text-brand">{service.title}</Link>
            ))}
            <Link href="/services" className="mt-2 inline-flex items-center gap-1 font-semibold text-brand hover:text-cyan">
              All services <span aria-hidden="true">→</span>
            </Link>
          </nav>
          <div>
            <h2 className="font-semibold text-white">Get updates</h2>
            <p className="mt-2 leading-6">Occasional insights on digital products and technology.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="container-custom mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {settings.companyName ?? "LYONDEV"}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {LEGAL_DOCUMENTS.map((document) => (
              <Link key={document.slug} href={`/legal/${document.slug}`} className="hover:text-brand">
                {document.title}
              </Link>
            ))}
            <Link href="/privacy-request" className="hover:text-brand">Privacy request</Link>
            <CookieSettingsButton className="text-left hover:text-brand" />
            {[
              ["facebook", "Facebook"],
              ["twitter", "X"],
              ["linkedin", "LinkedIn"],
            ].map(([key, label]) => {
              const href = settings[key];
              return typeof href === "string" && href.trim() ? (
                <a key={key} href={href} target="_blank" rel="noreferrer" className="hover:text-white">{label}</a>
              ) : null;
            })}
            <a href="#top" className="inline-flex items-center gap-1 text-slate-300 hover:text-brand">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> Back to top
            </a>
          </div>
        </div>
      </footer>
      {whatsapp && (
        <a
          href={waLink(settings.whatsapp, "Hello LYONDEV, I would like to make an enquiry about your services.")}
          aria-label="Chat with LYONDEV on WhatsApp"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-30 inline-flex min-h-12 items-center gap-2 border border-brand/70 bg-brand px-4 py-3 text-sm font-bold text-black shadow-lg shadow-black/40 transition-colors hover:bg-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
        </a>
      )}
    </div>
    </CookieConsentProvider>
  );
}
