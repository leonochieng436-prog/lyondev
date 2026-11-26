import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { db } from "@/lib/db";
import { absoluteUrl, COMPANY_DESCRIPTION, metaDescription, socialMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function industryDescription(name: string, summary: string | null) {
  const context = summary?.trim() || "Plan websites, custom software and integrations around your organization's needs.";
  return metaDescription(
    `Explore digital solutions for ${name} in Nairobi and across Kenya. ${context} Contact LYONDEV about your project.`,
  );
}

async function getIndustry(slug: string) {
  return db.industry.findUnique({
    where: { slug },
    include: { projects: { where: { status: "PUBLISHED", demo: false } } },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = await getIndustry((await params).slug);
  if (!industry) return {};

  return {
    title: { absolute: `${industry.name} Solutions in Nairobi & Kenya | LYONDEV` },
    description: industryDescription(industry.name, industry.summary),
    alternates: { canonical: `/solutions/${industry.slug}` },
    ...socialMetadata(`/solutions/${industry.slug}`),
  };
}

export default async function Solution({ params }: Props) {
  const industry = await getIndustry((await params).slug);
  if (!industry) notFound();

  const services = await db.service.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, title: true },
    orderBy: { sortOrder: "asc" },
  });
  const pageUrl = absoluteUrl(`/solutions/${industry.slug}`);
  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Solutions", item: absoluteUrl("/solutions") },
    { name: industry.name, item: pageUrl },
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
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.item} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link
                  href={index === 0 ? "/" : "/solutions"}
                  className="hover:text-brand"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="text-4xl font-extrabold text-white">
        Technology Solutions for {industry.name} in Nairobi and Kenya
      </h1>
      <span className="mt-4 block h-1 w-14 bg-brand" aria-hidden="true" />
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
        {industry.summary || COMPANY_DESCRIPTION}
      </p>
      <p className="mt-4 max-w-3xl leading-7 text-muted">
        LYONDEV plans websites, custom software and integrations around each organization's
        requirements, users and operational context. Project scope is agreed after understanding
        the problem and the systems involved.
      </p>

      {industry.projects.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">Related projects</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {industry.projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="block rounded-lg border border-white/10 bg-card p-5 text-brand hover:border-brand"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {services.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white">Explore our services</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-muted hover:border-brand hover:text-brand"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/request-quote"
        className="mt-10 inline-flex min-h-11 items-center rounded-lg bg-brand px-6 py-3 font-semibold text-black hover:bg-yellow-400"
      >
        Discuss your project
      </Link>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: `${industry.name} technology solutions in Nairobi and Kenya`,
          description: industryDescription(industry.name, industry.summary),
          inLanguage: "en",
        }}
      />
    </main>
  );
}
