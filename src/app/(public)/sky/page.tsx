import { upcomingEvents } from "@/lib/sky-events";
import { PageHeading } from "@/components/page-heading";
import { skyAt, degreeText } from "@/lib/astrology";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export const revalidate = 3600;
export const metadata = { title: "Today’s sky — planets & lunar phases" };
export default function Sky() {
  const now = new Date();
  const sky = skyAt(now);
  const events = upcomingEvents(now);
  const moon = sky.placements.find((p) => p.name === "Moon")!;
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="THE SKY, RIGHT NOW"
        title="A rhythm larger than us."
        description="Follow the Moon, notice planetary movements, and stay connected to the sky above."
      />
      <div className="sky-hero">
        <div
          className="moon-disc"
          style={
            {
              "--moon-light": `${sky.illumination * 100}%`,
            } as React.CSSProperties
          }
        >
          <div />
        </div>
        <div>
          <span className="eyebrow">THE LUNAR MOMENT</span>
          <h2>{sky.phaseName}</h2>
          <p>
            Moon in {moon.sign} · {Math.round(sky.illumination * 100)}%
            illuminated
          </p>
          <span className="small muted">
            Calculated {now.toISOString().slice(0, 16).replace("T", " ")} UTC
          </span>
          <Link href="/learn/moon-phases" className="text-link">
            Understand the cycle
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="sky-layout">
        <section>
          <h2>Planetary positions</h2>
          <div className="placement-list">
            {sky.placements.map((p) => (
              <div className="placement-row" key={p.name}>
                <span className="planet-glyph">{p.symbol}</span>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.theme}</span>
                </div>
                <span>
                  {p.signSymbol} {p.sign}
                </span>
                <span className="degree">{degreeText(p.degree)}</span>
                {p.retrograde && <Badge variant="secondary">Rx</Badge>}
              </div>
            ))}
          </div>
        </section>
        <section className="phase-calendar">
          <span className="eyebrow">COMING AROUND</span>
          <h2>The next lunar chapters.</h2>
          {sky.next.map((p, i) => (
            <div className="phase-item" key={p.name}>
              <span>{["◑", "◯", "◐", "●"][i]}</span>
              <div>
                <h3>{p.name}</h3>
                <p>
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "UTC",
                  }).format(new Date(p.date))}{" "}
                  UTC
                </p>
              </div>
            </div>
          ))}
          <p className="small muted">
            Times use UTC so everyone shares the same astronomical moment.
          </p>
        </section>
      </div>
      <section className="event-section"><span className="eyebrow">YOUR CELESTIAL CALENDAR</span><h2>Up next in the universe.</h2><p>Fourteen days of lunar phases, sign changes, and stations, plus the next global eclipses.</p><div className="event-grid">{events.map(e=><article className="event-card" key={e.name+e.date}><Badge variant="secondary">{e.kind}</Badge><h3>{e.name}</h3><time dateTime={e.date}>{new Intl.DateTimeFormat("en",{dateStyle:"medium",timeStyle:"short",timeZone:"UTC"}).format(new Date(e.date))} UTC</time><p>{e.description}</p></article>)}</div></section>
      <p className="method-note">
        Tropical, geocentric ecliptic longitudes from Astronomy Engine. Rx
        indicates apparent retrograde motion, estimated across a 24-hour window.
        Display refreshes hourly.
      </p>
    </main>
  );
}
