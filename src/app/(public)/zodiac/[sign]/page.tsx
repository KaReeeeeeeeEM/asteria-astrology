import { localizedMetadata } from "@/i18n/server";

import { Text } from "@/components/language";
import { ZodiacMascot } from "@/components/cartoons";
import Link from "@/components/app-link";
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
  return localizedMetadata({
    title: signs.find((s) => s.name.toLowerCase() === sign)?.name,
  });
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
        <Text>{"All zodiac signs"}</Text>
      </Link>
      <div className="sign-detail enter">
        <div>
          <span className="eyebrow">
            <Text>{s.dates}</Text>
            <Text>{"· THE TROPICAL ZODIAC"}</Text>
          </span>
          <h1>
            <Text>{s.name}</Text>
            <em>
              <Text>{s.archetype}</Text>
            </em>
          </h1>
          <p>
            <Text>{s.description}</Text>
          </p>
          <Button asChild>
            <Link href={`/horoscopes?sign=${s.name.toLowerCase()}`}>
              <Text>{"Your daily reading"}</Text>
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className={`sign-detail-art element-${s.element.toLowerCase()}`}>
          <ZodiacMascot sign={s.name} />
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
            <span className="eyebrow">
              <Text>{k}</Text>
            </span>
            <h3>
              <Text>{v}</Text>
            </h3>
          </div>
        ))}
      </div>
      <section className="narrow-section">
        <h2>
          <Text>{"More than a sun sign."}</Text>
        </h2>
        <p>
          <Text>{"You carry all twelve signs in your birth chart. "}</Text>
          <Text>{s.name}</Text>
          <Text>
            {
              "takes on a different meaning depending on whether it describes your Sun, Moon, rising sign, or another planet. A placement is a starting point for reflection, never the whole story of a person."
            }
          </Text>
        </p>
        <Link href="/chart" className="text-link">
          <Text>{"Explore your full chart"}</Text>
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
