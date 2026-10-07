import { Text } from "@/components/language";
import { ZodiacMascot } from "@/components/cartoons";
import Link from "@/components/app-link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { signs } from "@/lib/knowledge";
export const metadata = { title: "The twelve zodiac signs" };
export default function Zodiac() {
  return (
    <section className="dashboard-tool-content">
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
              <span className="small">
                <Text>{String(i + 1).padStart(2, "0")}</Text>
              </span>
              <ArrowUpRight size={18} />
            </div>
            <ZodiacMascot sign={s.name} />
            <span className="eyebrow">
              <Text>{s.element}</Text> · <Text>{s.modality}</Text>
            </span>
            <h2>
              <Text>{s.name}</Text>
            </h2>
            <p>
              <Text>{s.dates}</Text>
            </p>
            <span className="sign-archetype">
              <Text>{s.archetype}</Text>
            </span>
          </Link>
        ))}
      </div>
      <p className="method-note">
        <Text>
          {
            "Date ranges are approximate tropical sun-sign boundaries. Use the birth chart calculator for a time-specific Sun placement."
          }
        </Text>
      </p>
    </section>
  );
}
