import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/knowledge";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title, description: a?.intro };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = articles
    .filter((x) => x.category === a.category && x.slug !== a.slug)
    .slice(0, 3);
  return (
    <main className="container article-page">
      <Link href="/learn" className="text-link">
        <ArrowLeft size={16} />
        Back to the library
      </Link>
      <div className="article-heading enter">
        <Badge variant="secondary">{a.category}</Badge>
        <h1>{a.title}</h1>
        <p>{a.intro}</p>
        <div className="article-meta">
          <span>{a.minutes} MIN READ · ASTERIA EDITORIAL</span>
          <BookmarkButton slug={slug} />
        </div>
      </div>
      <div className="article-layout">
        <aside className="article-toc">
          <span className="eyebrow">IN THIS ARTICLE</span>
          {a.sections.map((s, i) => (
            <a href={`#section-${i}`} key={s.title}>
              {s.title}
            </a>
          ))}
          <p className="small muted">
            A symbolic lens.
            <br />
            Your choices remain yours.
          </p>
        </aside>
        <article className="article-prose">
          {a.sections.map((s, i) => (
            <section id={`section-${i}`} key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <div className="article-sources">
            <h3>Keep exploring</h3>
            <p>
              Study the vocabulary and traditions in the{" "}
              <a
                href="https://www.astro.com/astrowiki/en/Main_Page"
                target="_blank"
                rel="noreferrer"
              >
                AstroWiki reference
              </a>
              . Astronomical calculations use{" "}
              <a
                href="https://github.com/cosinekitty/astronomy"
                target="_blank"
                rel="noreferrer"
              >
                Astronomy Engine
              </a>
              . Interpretations are original Asteria editorial content and are
              not scientific predictions.
            </p>
          </div>
          <ButtonLink />
        </article>
      </div>
      {related.length > 0 && (
        <section className="related-articles">
          <h2>Follow your curiosity.</h2>
          {related.map((x) => (
            <Link
              href={`/learn/${x.slug}`}
              className="related-link"
              key={x.slug}
            >
              {x.title}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
function ButtonLink() {
  return (
    <Link href="/chart" className="text-link">
      See the symbolism in your own chart
      <ArrowUpRight size={17} />
    </Link>
  );
}
