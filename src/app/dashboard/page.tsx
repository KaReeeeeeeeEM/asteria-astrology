import { LocalizedDate } from "@/components/localized-date";

import { Text } from "@/components/language";
import Link from "@/components/app-link";
import { ArrowUpRight, Plus, NotebookPen, BookOpen } from "lucide-react";
import { sessionUser } from "@/lib/api";
import { db } from "@/db";
import { charts, journal } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  calculateChart,
  dailyReading,
  skyAt,
  aspectsBetween,
} from "@/lib/astrology";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CelestialWheel } from "@/components/wheel";
export default async function Dashboard() {
  const u = (await sessionUser())!;
  const [saved, entries] = await Promise.all([
    db()
      .select()
      .from(charts)
      .where(eq(charts.userId, u.id))
      .orderBy(desc(charts.createdAt)),
    db()
      .select()
      .from(journal)
      .where(eq(journal.userId, u.id))
      .orderBy(desc(journal.createdAt))
      .limit(3),
  ]);
  const now = new Date();
  const sky = skyAt(now);
  const chart = saved[0] ? calculateChart(saved[0].input) : null;
  const sun = chart?.placements[0];
  const reading = sun ? dailyReading(sun.sign, now) : null;
  const transits = chart
    ? aspectsBetween(sky.placements, chart.placements, 2).slice(0, 4)
    : [];
  return (
    <>
      <div className="dashboard-heading enter">
        <div>
          <span className="eyebrow">
            <Text>
              <LocalizedDate value={now} dateStyle="long" />
            </Text>
            <Text> </Text>
            <Text>{"· UTC"}</Text>
          </span>
          <h1>
            <Text>{"A little space for you, "}</Text>
            <em>{u.name}.</em>
          </h1>
          <p>
            <Text>{"Pause. Look up. Come back to your own orbit."}</Text>
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/charts">
            <Plus data-icon="inline-start" />
            <Text>{"Create a chart"}</Text>
          </Link>
        </Button>
      </div>
      <div className="dashboard-bento">
        <Card className="daily-dashboard-card">
          <CardHeader>
            <div className="card-eyebrow">
              <span className="eyebrow">
                <Text>{"YOUR DAILY REFLECTION"}</Text>
              </span>
              <Badge variant="secondary">
                <Text>
                  {sun ? `${sun.signSymbol} ${sun.sign}` : "✦ Welcome"}
                </Text>
              </Badge>
            </div>
            <CardTitle>
              <Text>{reading?.title || "The best place to begin is you."}</Text>
            </CardTitle>
            <CardDescription>
              <Text>
                {reading
                  ? "A gentle perspective for today"
                  : "A chart can open a new conversation with yourself."}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <Text>
                {reading?.text ||
                  "Create your first birth chart to explore your Sun, Moon, and rising sign. Your daily dashboard will then bring together sky rhythms, personal transits, and thoughtful prompts."}
              </Text>
            </p>
            <Link
              href={chart ? "/horoscopes" : "/dashboard/charts"}
              className="text-link"
            >
              <Text>
                {chart ? "Read today’s reflection" : "Create your first chart"}
              </Text>
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card className="moon-dashboard-card">
          <CardHeader>
            <span className="eyebrow">
              <Text>{"THE LUNAR MOMENT"}</Text>
            </span>
            <CardTitle>
              <Text>{sky.phaseName}</Text>
            </CardTitle>
            <CardDescription>
              <Text>{"Moon in "}</Text>
              <Text>{sky.placements[1].sign}</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="small-moon">☽</div>
            <span>
              <Text>{Math.round(sky.illumination * 100)}</Text>
              <Text>{"% illuminated"}</Text>
            </span>
            <Link href="/sky" className="text-link">
              <Text>{"Follow the sky"}</Text>
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card className="birth-dashboard-card">
          <CardHeader>
            <span className="eyebrow">
              <Text>{"YOUR CELESTIAL BLUEPRINT"}</Text>
            </span>
            <CardTitle>
              {chart ? (
                <>
                  <Text>Chart for</Text> {chart.input.name}
                </>
              ) : (
                <Text>Your story, in the stars.</Text>
              )}
            </CardTitle>
            <CardDescription>
              <Text>Saved charts:</Text> {saved.length}{" "}
              <Text>· tropical zodiac</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CelestialWheel
              placements={chart?.placements}
              aspects={chart?.aspects}
              hero={!chart}
            />
            <Button asChild variant="outline">
              <Link href="/dashboard/charts">
                <Text>{chart ? "Open my charts" : "Start my chart"}</Text>
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="transit-dashboard-card">
          <CardHeader>
            <span className="eyebrow">
              <Text>{"MOVING THROUGH YOUR SKY"}</Text>
            </span>
            <CardTitle>
              <Text>{"Personal transits"}</Text>
            </CardTitle>
            <CardDescription>
              <Text>{"Current planets meeting your natal chart · 2° orb"}</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transits.length ? (
              transits.map((t, i) => (
                <div className="transit-row" key={i}>
                  <span>
                    <Text>{t.symbol}</Text>
                  </span>
                  <div>
                    <strong>
                      <Text>{t.a}</Text> <Text>{t.name.toLowerCase()}</Text>
                      <Text>{"natal "}</Text>
                      <Text>{t.b}</Text>
                    </strong>
                    <p>
                      <Text>{t.tone}</Text> · <Text>{t.orb.toFixed(1)}</Text>
                      <Text>{"° orb"}</Text>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                <Text>
                  {chart
                    ? "No close aspects in the selected 2° orb right now. A quiet sky is also a moment to notice."
                    : "Save your first chart to see calculated current-to-natal aspects here."}
                </Text>
              </p>
            )}
            <p className="small muted">
              <Text>
                {"Symbolic invitations for reflection, not event forecasts."}
              </Text>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <NotebookPen strokeWidth={1} />
            <CardTitle>
              <Text>{"A question to carry"}</Text>
            </CardTitle>
            <CardDescription>
              <Text>{"Your private reflection journal"}</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <Text>
                {reading?.prompt ||
                  "What has been asking for a little more attention lately?"}
              </Text>
            </p>
            <Link href="/dashboard/journal" className="text-link">
              <Text>{"Write a reflection"}</Text>
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BookOpen strokeWidth={1} />
            <CardTitle>
              <Text>{"Keep your curiosity open."}</Text>
            </CardTitle>
            <CardDescription>
              <Text>{"Learn at your own pace"}</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <Text>
                {
                  "Start with the building blocks: planets, signs, houses, and the relationships between them."
                }
              </Text>
            </p>
            <Link href="/learn/reading-your-birth-chart" className="text-link">
              <Text>{"How to read a chart"}</Text>
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
      </div>
      <section className="recent-reflections">
        <h2>
          <Text>{"Recent reflections"}</Text>
        </h2>
        {entries.length ? (
          entries.map((e) => (
            <div className="reflection-preview" key={e.id}>
              <Badge variant="secondary">
                <Text>{e.mood}</Text>
              </Badge>
              <p>
                {e.text.slice(0, 180)}
                <Text>{e.text.length > 180 ? "…" : ""}</Text>
              </p>
              <span className="small muted">
                {e.createdAt.toISOString().slice(0, 10)}
              </span>
            </div>
          ))
        ) : (
          <div className="inline-cta">
            <p>
              <Text>
                {
                  "Your first reflection belongs here. One sentence is enough to begin."
                }
              </Text>
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/journal">
                <Text>{"Open journal"}</Text>
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
