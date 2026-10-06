import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { signs } from "@/lib/knowledge";
import { Button } from "@/components/ui/button";
export function generateStaticParams() {
  return signs.map((s) => ({ sign: s.name.toLowerCase() }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const { sign } = await params;
  return { title: signs.find((s) => s.name.toLowerCase() === sign)?.name };
}
export default async function SignPage({
  params,
}: {
  params: Promise<{ sign: string }>;
}) {
  const { sign } = await params;
  const s = signs.find((s) => s.name.toLowerCase() === sign);
  if (!s) notFound();
  return (
    <main className="container public-main">
      <Link href="/zodiac" className="text-link">
        <ArrowLeft size={16} />
        All zodiac signs
      </Link>
      <div className="sign-detail enter">
        <div>
          <span className="eyebrow">{s.dates} · THE TROPICAL ZODIAC</span>
          <h1>
            {s.name}
            <em>{s.archetype}</em>
          </h1>
          <p>{s.description}</p>
          <Button asChild>
            <Link href={`/horoscopes?sign=${s.name.toLowerCase()}`}>
              Your daily reading
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className={`sign-detail-art element-${s.element.toLowerCase()}`}>
          <span>{s.symbol}</span>
          <i />
        </div>
      </div>
      <div className="sign-facts">
        {[
          ["Element", s.element],
          ["Modality", s.modality],
          ["Ruler", s.ruler],
          ["A natural gift", s.gift],
          ["Room to grow", s.growth],
        ].map(([k, v]) => (
          <div key={k}>
            <span className="eyebrow">{k}</span>
            <h3>{v}</h3>
          </div>
        ))}
      </div>
      <section className="narrow-section">
        <h2>More than a sun sign.</h2>
        <p>
          You carry all twelve signs in your birth chart. {s.name} takes on a
          different meaning depending on whether it describes your Sun, Moon,
          rising sign, or another planet. A placement is a starting point for
          reflection, never the whole story of a person.
        </p>
        <Link href="/chart" className="text-link">
          Explore your full chart
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
