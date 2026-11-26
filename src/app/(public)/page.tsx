import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { kes, priceText } from "@/lib/format";
import { getSettings, waLink } from "@/lib/settings";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import OffersTabs from "@/components/public/OffersTabs";
import QuickRequestCard from "@/components/public/QuickRequestCard";
import { HOME_FAQ_CATEGORIES, HOME_FAQS, type HomeFaq } from "@/lib/faqs";
import {
  Button,
  CornerMarker,
  FeatureGrid,
  HeroFrame,
  OutlineFrameImage,
  Section,
  SpecializationsSplit,
  StatTile,
  TechStrip,
} from "@/components/public/PublicSite";

export const revalidate = 60;
export const metadata: Metadata = {
  title: { absolute: "Web Development Company in Nairobi, Kenya | LYONDEV" },
  description:
    "LYONDEV develops websites, custom software and eCommerce platforms for businesses in Nairobi and across Kenya.",
  alternates: { canonical: "/" },
};

const STEPS = [
  "Discovery and consultation",
  "Requirements analysis",
  "Planning and UI/UX design",
  "Development and integration",
  "Testing and quality assurance",
  "Deployment and ongoing support",
];

export default async function Home() {
  const settings = await getSettings();
  const [services, packages, projects, testimonials, industries, heroProject, aboutImage] =
    await Promise.all([
      db.service.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      }),
      db.pricingPackage.findMany({
        where: { visible: true },
        include: { features: true },
        orderBy: { priceFromKes: "asc" },
      }),
      db.portfolioProject.findMany({
        where: { status: "PUBLISHED", featured: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      db.testimonial.findMany({
        where: { status: "PUBLISHED" },
        take: 3,
      }),
      db.industry.findMany({
        orderBy: { name: "asc" },
        take: 8,
      }),
      db.portfolioProject.findFirst({
        where: { status: "PUBLISHED", featured: true, coverUrl: { not: null } },
        orderBy: { updatedAt: "desc" },
        select: { coverUrl: true },
      }),
      db.mediaAsset.findFirst({
        where: { mimeType: { startsWith: "image/" } },
        orderBy: { createdAt: "desc" },
        select: { url: true },
      }),
    ]);

  const startingPackages = packages.some((item) => item.group !== "CARE")
    ? packages.filter((item) => item.group !== "CARE")
    : packages;
  const lowestPrice = startingPackages.reduce<number | null>(
    (lowest, item) => (lowest === null || item.priceFromKes < lowest ? item.priceFromKes : lowest),
    null,
  );
  const configuredFaq: HomeFaq[] = Array.isArray(settings.faq)
    ? settings.faq.filter(
        (item): item is HomeFaq =>
          typeof item === "object" &&
          item !== null &&
          typeof item.q === "string" &&
          typeof item.a === "string",
      )
    : [];
  const faqByQuestion = new Map<string, HomeFaq>();
  const normalizeQuestion = (question: string) =>
    question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  HOME_FAQS.forEach((item) => faqByQuestion.set(normalizeQuestion(item.q), item));
  configuredFaq.forEach((item) => {
    const key = normalizeQuestion(item.q);
    const centralized = faqByQuestion.get(key);
    if (!centralized) {
      faqByQuestion.set(key, { ...item, category: item.category || "Other" });
      return;
    }
    const isSeedAnswer =
      item.a.includes("2 to 4 weeks") ||
      item.a.includes("integrate M-Pesa Daraja") ||
      item.a.includes("through monthly care packages");
    faqByQuestion.set(
      key,
      isSeedAnswer ? centralized : { ...centralized, ...item, category: centralized.category || item.category || "Other" },
    );
  });
  const faq = Array.from(faqByQuestion.values());
  const faqCategories = HOME_FAQ_CATEGORIES.map((category) => ({
    category,
    items: faq.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
  const summary = typeof settings.aboutSummary === "string" ? settings.aboutSummary : "";
  const whatsApp = waLink(settings.whatsapp);
  const offers = packages
    .filter((item) => ["WEBSITE", "ECOMMERCE", "SOFTWARE", "MOBILE", "CARE"].includes(item.group))
    .map((item) => ({
      id: item.id,
      group: item.group as "WEBSITE" | "ECOMMERCE" | "SOFTWARE" | "MOBILE" | "CARE",
      name: item.name,
      price: priceText({ ...item, startingFrom: true }),
    }));

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "LYONDEV",
          description:
            "Web development, custom software and digital solutions for businesses in Nairobi and across Kenya.",
          publisher: {
            "@id": `${SITE_URL}/#organization`,
          },
          inLanguage: "en",
        }}
      />
      <HeroFrame image={heroProject?.coverUrl}>
        <div className="relative z-10">
          <div className="frame-corners max-w-3xl px-5 py-4 sm:px-9 sm:py-10">
            <p className="mb-3 text-sm font-medium text-brand sm:mb-4">Technology. Innovation. Growth.</p>
            <h1 className="max-w-3xl font-head text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-5xl">
              Professional <span className="text-brand">Web Development</span> &amp;{" "}
              <span className="text-brand">Custom Software</span> Solutions in Nairobi, Kenya.
            </h1>
            
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <Button href="/request-quote" analyticsEvent="start_project_click">Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
              <Button href="/services" variant="outline" analyticsEvent="explore_services_click">Explore our services</Button>
              {whatsApp && <Button href={whatsApp} target="_blank" rel="noreferrer" variant="outline" analyticsEvent="whatsapp_cta_click"><MessageCircle className="h-4 w-4" aria-hidden="true" />Chat with us on WhatsApp</Button>}
            </div>
            <div className="hero-stats mt-5 grid max-w-xl grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
              <StatTile
                value={lowestPrice === null ? "Get a quote" : `From ${kes(lowestPrice)}`}
                label="Published starting prices"
              />
              <StatTile value={`${services.length} service areas`} label="Published services" />
              <StatTile value="30-day" label="Post-launch warranty" />
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full md:max-w-md md:justify-self-end">
          <QuickRequestCard />
        </div>
      </HeroFrame>

      <section className="section-padding bg-ink">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <CornerMarker />
            <h2 className="max-w-xl font-head text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              We work for you
            </h2>
            <p className="mt-5 max-w-xl border-l-2 border-brand pl-5 text-base leading-7 text-slate-300">
              {summary}
            </p>
            <FeatureGrid features={services.slice(0, 6).map((service) => service.title)} />
            <Button href="/about" variant="outline" className="mt-8">More about LyonDev</Button>
          </div>
          <OutlineFrameImage
            src={aboutImage?.url}
            alt="A LyonDev project workspace"
            className="order-1 mr-3 sm:mr-5 lg:order-2"
          />
        </div>
      </section>

      <TechStrip />

      <SpecializationsSplit
        services={services.map(({ id, title, summary: serviceSummary }) => ({
          id,
          title,
          summary: serviceSummary,
        }))}
        image={aboutImage?.url}
      />

      <Section title="Offers" eyebrow="Clear starting points" className="bg-ink">
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="max-w-md text-base leading-7 text-slate-300">
              Explore packages by service area. Final pricing depends on your
              requirements and is confirmed in a project quote.
            </p>
            <Button href="/pricing" variant="outline" className="mt-6">View pricing details</Button>
          </div>
          <OffersTabs offers={offers} />
        </div>
      </Section>

      {industries.length > 0 && (
        <Section title="Solutions for your industry" eyebrow="Business-focused technology" className="bg-navy">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/solutions/${industry.slug}`}
                className="border border-white/10 bg-card p-5 transition-colors hover:border-brand"
              >
                <h3 className="font-semibold text-white">{industry.name}</h3>
                {industry.summary && <p className="mt-2 text-sm leading-6 text-slate-300">{industry.summary}</p>}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section title="Selected work" eyebrow="Portfolio" className="bg-ink">
        {projects.length ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group border border-white/10 bg-card transition-colors hover:border-brand"
              >
                {project.coverUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.coverUrl}
                      alt={project.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-slate-400">{project.category}{project.demo && " · Demonstration project"}</p>
                  <h3 className="mt-2 font-semibold text-white">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-slate-300">Projects will appear here once published.</p>
        )}
        <Button href="/portfolio" variant="outline" className="mt-8">View portfolio</Button>
      </Section>

      <Section title="A clear path from idea to launch" eyebrow="How we work" className="bg-navy">
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step} className="border border-white/10 bg-card p-5">
              <span className="font-head text-sm font-bold text-cyan">0{index + 1}</span>
              <h3 className="mt-3 font-semibold text-white">{step}</h3>
            </li>
          ))}
        </ol>
      </Section>

      {testimonials.length > 0 && (
        <Section title="Client feedback" eyebrow="Testimonials" className="bg-ink">
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.id} className="border border-white/10 bg-card p-6">
                <blockquote className="leading-7 text-slate-200">{testimonial.quote}</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-400">
                  {testimonial.clientName}, {testimonial.business}
                  {testimonial.rating ? ` · ${testimonial.rating}/5` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {faq.length > 0 && (
        <section className="light-section section-padding">
          <div className="container-custom">
            <CornerMarker />
            <h2 className="font-head text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently Asked Questions About Web Development in Kenya
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-600">
              Learn about LYONDEV&apos;s website, eCommerce and custom software services, project process, pricing approach and support in Nairobi and across Kenya.
            </p>
            <div className="mt-10 space-y-10">
              {faqCategories.map(({ category, items }) => (
                <section key={category} aria-labelledby={`faq-${category.replace(/\W+/g, "-").toLowerCase()}`}>
                  <h3
                    id={`faq-${category.replace(/\W+/g, "-").toLowerCase()}`}
                    className="border-b border-brand/50 pb-3 text-xl font-bold text-white"
                  >
                    {category}
                  </h3>
                  <div className="divide-y divide-slate-700">
                    {items.map((item) => (
                      <details key={item.q} className="faq-item">
                        <summary>
                          <span>{item.q}</span>
                          <span className="faq-indicator" aria-hidden="true">+</span>
                        </summary>
                        <p className="faq-answer">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            {whatsApp && (
              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
                <p className="mr-1 font-semibold text-white">Have a question about your project?</p>
                <Button href="/request-quote" analyticsEvent="faq_quote_click">Request a quotation</Button>
                <Button href={whatsApp} target="_blank" rel="noreferrer" variant="outline" analyticsEvent="faq_whatsapp_click">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />Ask on WhatsApp
                </Button>
              </div>
            )}
            <nav aria-label="Related LYONDEV services" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link className="text-brand underline underline-offset-4" href="/services">Explore web development and software services</Link>
              <Link className="text-brand underline underline-offset-4" href="/pricing">View website and software pricing</Link>
            </nav>
          </div>
        </section>
      )}

      <section className="section-padding border-t border-brand/40 bg-navy text-center">
        <div className="container-custom">
          <p className="text-sm font-medium text-brand">Have a project in mind?</p>
          <h2 className="mt-3 font-head text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let&apos;s build something great together.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/request-quote" analyticsEvent="quote_cta_click">Get a quote</Button>
            <Button href="/book-consultation" variant="outline" analyticsEvent="consultation_cta_click">Book a consultation</Button>
            {whatsApp && <Button href={whatsApp} target="_blank" rel="noreferrer" variant="outline" analyticsEvent="whatsapp_cta_click">Chat on WhatsApp</Button>}
            <Button href={`mailto:${settings.email}?subject=${encodeURIComponent("Project enquiry for LYONDEV")}`} variant="outline" analyticsEvent="email_cta_click"><Mail className="h-4 w-4" aria-hidden="true" />Email us</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
