import { ZodiacMascot } from "@/components/cartoons";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { signs } from "@/lib/knowledge";
export const metadata = { title: "The twelve zodiac signs" };
export default function Zodiac() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="THE CELESTIAL ATLAS"
        title="Twelve ways to meet the world."
        description="Every sign is part of your chart. Explore their elements, rhythms, and the possibilities they represent."
      />
      <div className="zodiac-grid">
        {signs.map((s, i) => (
          <Link
            href={`/zodiac/${s.name.toLowerCase()}`}
            key={s.name}
            className={`zodiac-card element-${s.element.toLowerCase()}`}
            data-reveal
          >
            <div className="zodiac-card-top">
              <span className="small">{String(i + 1).padStart(2, "0")}</span>
              <ArrowUpRight size={18} />
            </div>
            <ZodiacMascot sign={s.name}/>
            <span className="eyebrow">
              {s.element} · {s.modality}
            </span>
            <h2>{s.name}</h2>
            <p>{s.dates}</p>
            <span className="sign-archetype">{s.archetype}</span>
          </Link>
        ))}
      </div>
      <p className="method-note">
        Date ranges are approximate tropical sun-sign boundaries. Use the birth
        chart calculator for a time-specific Sun placement.
      </p>
    </main>
  );
}
