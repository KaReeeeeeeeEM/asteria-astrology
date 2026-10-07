import { LocalizedDate } from "@/components/localized-date";

import { Text } from "@/components/language";
import { upcomingEvents } from "@/lib/sky-events";
import { PageHeading } from "@/components/page-heading";
import { skyAt, degreeText } from "@/lib/astrology";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/app-link";
export const revalidate = 3600;
export const metadata = { title: "Today’s sky — planets & lunar phases" };
export default function Sky() {
  const now = new Date();
  const sky = skyAt(now);
  const events = upcomingEvents(now);
  const moon = sky.placements.find((p) => p.name === "Moon")!;
  return (
    <section className="dashboard-tool-content">
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
          <span className="eyebrow">
            <Text>{"THE LUNAR MOMENT"}</Text>
          </span>
          <h2>
            <Text>{sky.phaseName}</Text>
          </h2>
          <p>
            <Text>{"Moon in "}</Text>
            <Text>{moon.sign}</Text> ·{" "}
            <Text>{Math.round(sky.illumination * 100)}</Text>
            <Text>{"% illuminated"}</Text>
          </p>
          <span className="small muted">
            <Text>{"Calculated "}</Text>
            {now.toISOString().slice(0, 16).replace("T", " ")}
            <Text>{"UTC"}</Text>
          </span>
          <Link href="/learn/moon-phases" className="text-link">
            <Text>{"Understand the cycle"}</Text>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      <div className="sky-layout">
        <section>
          <h2>
            <Text>{"Planetary positions"}</Text>
          </h2>
          <div className="placement-list">
            {sky.placements.map((p) => (
              <div className="placement-row" key={p.name}>
                <span className="planet-glyph">
                  <Text>{p.symbol}</Text>
                </span>
                <div>
                  <strong>
                    <Text>{p.name}</Text>
                  </strong>
                  <span>
                    <Text>{p.theme}</Text>
                  </span>
                </div>
                <span>
                  <Text>{p.signSymbol}</Text> <Text>{p.sign}</Text>
                </span>
                <span className="degree">
                  <Text>{degreeText(p.degree)}</Text>
                </span>
                {p.retrograde && (
                  <Badge variant="secondary">
                    <Text>{"Rx"}</Text>
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="phase-calendar">
          <span className="eyebrow">
            <Text>{"COMING AROUND"}</Text>
          </span>
          <h2>
            <Text>{"The next lunar chapters."}</Text>
          </h2>
          {sky.next.map((p, i) => (
            <div className="phase-item" key={p.name}>
              <span>
                <Text>{["◑", "◯", "◐", "●"][i]}</Text>
              </span>
              <div>
                <h3>
                  <Text>{p.name}</Text>
                </h3>
                <p>
                  <Text>
                    <LocalizedDate
                      value={new Date(p.date)}
                      dateStyle="medium"
                      timeStyle="short"
                    />
                  </Text>
                  <Text> </Text>
                  <Text>{"UTC"}</Text>
                </p>
              </div>
            </div>
          ))}
          <p className="small muted">
            <Text>
              {"Times use UTC so everyone shares the same astronomical moment."}
            </Text>
          </p>
        </section>
      </div>
      <section className="event-section">
        <span className="eyebrow">
          <Text>{"YOUR CELESTIAL CALENDAR"}</Text>
        </span>
        <h2>
          <Text>{"Up next in the universe."}</Text>
        </h2>
        <p>
          <Text>
            {
              "Fourteen days of lunar phases, sign changes, and stations, plus the next global eclipses."
            }
          </Text>
        </p>
        <div className="event-grid">
          {events.map((e) => (
            <article className="event-card" key={e.name + e.date}>
              <Badge variant="secondary">
                <Text>{e.kind}</Text>
              </Badge>
              <h3>
                <Text>{e.name}</Text>
              </h3>
              <time dateTime={e.date}>
                <Text>
                  <LocalizedDate
                    value={new Date(e.date)}
                    dateStyle="medium"
                    timeStyle="short"
                  />
                </Text>
                <Text>{"UTC"}</Text>
              </time>
              <p>
                <Text>{e.description}</Text>
              </p>
            </article>
          ))}
        </div>
      </section>
      <p className="method-note">
        <Text>
          {
            "Tropical, geocentric ecliptic longitudes from Astronomy Engine. Rx indicates apparent retrograde motion, estimated across a 24-hour window. Display refreshes hourly."
          }
        </Text>
      </p>
    </section>
  );
}
