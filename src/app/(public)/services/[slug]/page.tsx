import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { db } from "@/lib/db";
import { getSettings, serviceWaLink } from "@/lib/settings";
import { absoluteUrl, metaDescription, serviceLandingContent, SITE_URL, socialMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const get = async (slug: string) => {
  const service = await db.service.findUnique({
    where: { slug },
    include: { features: { orderBy: { sortOrder: "asc" } } },
  });
  return service?.status === "PUBLISHED" ? service : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await get((await params).slug);
  if (!service) return {};

  const landing = serviceLandingContent(service.slug, service.title, service.summary);
  return {
    title: { absolute: landing.title },
    description: metaDescription(landing.description),
    alternates: { canonical: `/services/${service.slug}` },
    ...socialMetadata(`/services/${service.slug}`),
  };
}

export default async function ServicePage({ params }: Props) {
  const service = await get((await params).slug);
  if (!service) notFound();

  const landing = serviceLandingContent(service.slug, service.title, service.summary);
  const [settings, relatedCandidates] = await Promise.all([
    getSettings(),
    landing.related.length
      ? db.service.findMany({
          where: { slug: { in: landing.related }, status: "PUBLISHED", id: { not: service.id } },
          select: { slug: true, title: true, summary: true },
        })
      : Promise.resolve([]),
  ]);
  const relatedBySlug = new Map(relatedCandidates.map((related) => [related.slug, related]));
  const relatedServices = landing.related
    .map((slug) => relatedBySlug.get(slug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));
  const whatsappHref = serviceWaLink(service.title);
  const emailHref = `mailto:${settings.email}?subject=${encodeURIComponent(`Enquiry about ${service.title}`)}`;
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Services", item: absoluteUrl("/services") },
    { name: service.title, item: serviceUrl },
  ];

  return (
    <main className="page-container">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.item,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: landing.description,
          serviceType: service.title,
          url: serviceUrl,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: [
            { "@type": "City", name: "Nairobi" },
            { "@type": "Country", name: "Kenya" },
          ],
        }}
      />
      {landing.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: landing.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      )}

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.item} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={index === 0 ? "/" : "/services"} className="hover:text-brand">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="max-w-4xl text-4xl font-extrabold text-white sm:text-5xl">
        {landing.heading}
      </h1>
      <span className="mt-5 block h-1 w-14 bg-brand" aria-hidden="true" />
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{landing.introduction}</p>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{service.summary}</p>
      {service.body && <p className="mt-4 max-w-3xl whitespace-pre-line leading-7">{service.body}</p>}

      {landing.deliverables.length > 0 && (
        <section className="mt-10 max-w-4xl">
          <h2 className="text-2xl font-bold text-white">What this service can include</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {landing.deliverables.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-card p-4 text-muted">
                <span className="mr-2 text-brand" aria-hidden="true">—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 max-w-4xl border-l-2 border-brand pl-5">
        <h2 className="text-xl font-bold text-white">Who this is for</h2>
        <p className="mt-2 leading-7 text-muted">{landing.bestFor}</p>
      </section>

      {service.features.length > 0 && (
        <section className="mt-10 max-w-4xl">
          <h2 className="text-2xl font-bold text-white">Service features</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature.id} className="rounded-lg border border-white/10 bg-card p-4">
                {feature.text}
              </li>
            ))}
          </ul>
        </section>
      )}

      {landing.faqs.length > 0 && (
        <section className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-white/10">
            {landing.faqs.map((faq) => (
              <article key={faq.question} className="py-5">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white">Related services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="rounded-lg border border-white/10 bg-card p-5 transition-colors hover:border-brand"
              >
                <h3 className="font-semibold text-white">{related.title}</h3>
                <p className="mt-2 text-sm text-muted">{related.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-xl border border-brand/40 bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white">Discuss your project with LYONDEV</h2>
        <p className="mt-2 text-muted">
          Tell us what you are looking to build or improve. We will discuss your requirements and
          the next steps.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-400"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Enquire on WhatsApp
          </Link>
          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white hover:border-brand hover:text-brand"
          >
            Request a Quote
          </Link>
          <Link
            href={emailHref}
            className="inline-flex min-h-11 items-center gap-2 px-4 py-3 font-semibold text-brand hover:text-yellow-400"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email us
          </Link>
        </div>
      </section>
    </main>
  );
}
