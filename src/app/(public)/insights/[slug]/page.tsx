import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { db } from "@/lib/db";
import { absoluteUrl, metaDescription, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const getPost = async (slug: string) =>
  db.blogPost.findFirst({
    where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
  });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};

  const title = post.seoTitle?.trim() || `${post.title} | LYONDEV`;
  const description = metaDescription(post.seoDescription || post.excerpt);
  const canonical = absoluteUrl(`/insights/${post.slug}`);
  const image = post.coverUrl || absoluteUrl("/opengraph-image");

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: "LYONDEV",
      title,
      description,
      url: canonical,
      images: [image],
      ...(post.publishedAt ? { publishedTime: post.publishedAt.toISOString() } : {}),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function Post({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const related = await db.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
      id: { not: post.id },
      ...(post.categoryId ? { categoryId: post.categoryId } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
  const pageUrl = absoluteUrl(`/insights/${post.slug}`);
  const breadcrumbs = [
    { name: "Home", item: absoluteUrl("/") },
    { name: "Insights", item: absoluteUrl("/insights") },
    { name: post.title, item: pageUrl },
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
          "@type": "Article",
          headline: post.title,
          description: metaDescription(post.seoDescription || post.excerpt),
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en",
          ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
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
                  href={index === 0 ? "/" : "/insights"}
                  className="hover:text-brand"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="text-4xl font-extrabold text-white">{post.title}</h1>
      {post.publishedAt && (
        <time dateTime={post.publishedAt.toISOString()} className="mt-3 block text-sm text-muted">
          Published {post.publishedAt.toLocaleDateString("en-KE", { dateStyle: "long" })}
        </time>
      )}
      {post.coverUrl && <img src={post.coverUrl} alt={post.title} className="mt-6 rounded-xl" />}
      <div className="mt-6 max-w-3xl space-y-4 leading-7">
        {post.content.split(/\n{2,}/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {related.length > 0 && (
        <aside className="mt-12">
          <h2 className="font-bold text-white">Related articles</h2>
          <ul className="mt-2 space-y-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link href={`/insights/${item.slug}`} className="text-brand">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}
