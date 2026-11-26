import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { db } from "@/lib/db";
import { absoluteUrl, metaDescription, socialMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const getProject = async (slug: string) => {
  const project = await db.portfolioProject.findUnique({ where: { slug } });
  return project?.status === "PUBLISHED" ? project : null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};

  return {
    title: { absolute: `${project.name} | LYONDEV Portfolio` },
    description: metaDescription(project.summary),
    alternates: { canonical: `/portfolio/${project.slug}` },
    ...socialMetadata(`/portfolio/${project.slug}`),
    ...(project.demo ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Project({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const pageUrl = absoluteUrl(`/portfolio/${project.slug}`);
  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Portfolio", item: absoluteUrl("/portfolio") },
    { name: project.name, item: pageUrl },
  ];
  const Section = ({ title, content }: { title: string; content: string | null }) =>
    content ? (
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-2 whitespace-pre-line text-muted">{content}</p>
      </section>
    ) : null;

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
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary,
          url: pageUrl,
          ...(project.coverUrl ? { image: project.coverUrl } : {}),
          inLanguage: "en",
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
                  href={index === 0 ? "/" : "/portfolio"}
                  className="hover:text-brand"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="text-sm text-muted">
        {project.category}
        {project.demo && " · Demonstration project"}
      </p>
      <h1 className="mt-2 text-4xl font-extrabold text-white">{project.name}</h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>
      {project.coverUrl && (
        <img src={project.coverUrl} alt={project.name} className="mt-6 rounded-xl" />
      )}
      <Section title="Challenge" content={project.challenge} />
      <Section title="Solution" content={project.solution} />
      {!project.demo && <Section title="Results" content={project.results} />}
      <p className="mt-6 text-sm text-brand">{project.technologies.join(" · ")}</p>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          rel="noopener noreferrer"
          target="_blank"
          className="mt-4 inline-block font-semibold text-brand"
        >
          Visit project
        </a>
      )}
      <div>
        <Link
          href="/request-quote"
          className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-black"
        >
          Start a similar project
        </Link>
      </div>
    </main>
  );
}
