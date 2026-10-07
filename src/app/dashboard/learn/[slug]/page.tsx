import { localizedMetadata } from "@/i18n/server";

import { Text } from "@/components/language";
import Link from "@/components/app-link";
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
  return localizedMetadata({ title: a?.title, description: a?.intro });
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
    <section className="container article-page">
      <Link href="/learn" className="text-link">
        <ArrowLeft size={16} />
        <Text>{"Back to the library"}</Text>
      </Link>
      <div className="article-heading enter">
        <Badge variant="secondary">
          <Text>{a.category}</Text>
        </Badge>
        <h1>
          <Text>{a.title}</Text>
        </h1>
        <p>
          <Text>{a.intro}</Text>
        </p>
        <div className="article-meta">
          <span>
            <Text>{a.minutes}</Text>
            <Text>{"MIN READ · ASTERIA EDITORIAL"}</Text>
          </span>
          <BookmarkButton slug={slug} />
        </div>
      </div>
      <div className="article-layout">
        <aside className="article-toc">
          <span className="eyebrow">
            <Text>{"IN THIS ARTICLE"}</Text>
          </span>
          {a.sections.map((s, i) => (
            <a href={`#section-${i}`} key={s.title}>
              <Text>{s.title}</Text>
            </a>
          ))}
          <p className="small muted">
            <Text>{"A symbolic lens."}</Text>
            <br />
            <Text>{"Your choices remain yours."}</Text>
          </p>
        </aside>
        <article className="article-prose">
          {a.sections.map((s, i) => (
            <section id={`section-${i}`} key={s.title}>
              <h2>
                <Text>{s.title}</Text>
              </h2>
              <p>
                <Text>{s.text}</Text>
              </p>
            </section>
          ))}
          <div className="article-sources">
            <h3>
              <Text>{"Keep exploring"}</Text>
            </h3>
            {a.sources ? (
              <>
                <p>
                  <Text>
                    {
                      "Original Asteria editorial lessons. These references explain the tradition and provide further study."
                    }
                  </Text>
                </p>
                <ul>
                  {a.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        <Text>{source.title}</Text>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>
                <Text>{"Study the vocabulary and traditions in the"}</Text>
                <Text> </Text>
                <a
                  href="https://www.astro.com/astrowiki/en/Main_Page"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text>{"AstroWiki reference"}</Text>
                </a>
                <Text>{". Astronomical calculations use"}</Text>
                <Text> </Text>
                <a
                  href="https://github.com/cosinekitty/astronomy"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text>{"Astronomy Engine"}</Text>
                </a>
                <Text>
                  {
                    ". Interpretations are original Asteria editorial content and are not scientific predictions."
                  }
                </Text>
              </p>
            )}
          </div>
          <ButtonLink numerology={a.slug === "numerology-readers-handbook"} />
        </article>
      </div>
      {related.length > 0 && (
        <section className="related-articles">
          <h2>
            <Text>{"Follow your curiosity."}</Text>
          </h2>
          {related.map((x) => (
            <Link
              href={`/learn/${x.slug}`}
              className="related-link"
              key={x.slug}
            >
              <Text>{x.title}</Text>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </section>
      )}
    </section>
  );
}
function ButtonLink({ numerology = false }: { numerology?: boolean }) {
  return (
    <Link href={numerology ? "/numerology" : "/chart"} className="text-link">
      <Text>
        {numerology
          ? "Practice with your own numerology reading"
          : "See the symbolism in your own chart"}
      </Text>
      <ArrowUpRight size={17} />
    </Link>
  );
}
