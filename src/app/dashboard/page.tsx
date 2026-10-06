import Link from "next/link";
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
            {new Intl.DateTimeFormat("en", {
              dateStyle: "long",
              timeZone: "UTC",
            }).format(now)}{" "}
            · UTC
          </span>
          <h1>
            A little space for you, <em>{u.name}.</em>
          </h1>
          <p>Pause. Look up. Come back to your own orbit.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/charts">
            <Plus data-icon="inline-start" />
            Create a chart
          </Link>
        </Button>
      </div>
      <div className="dashboard-bento">
        <Card className="daily-dashboard-card">
          <CardHeader>
            <div className="card-eyebrow">
              <span className="eyebrow">YOUR DAILY REFLECTION</span>
              <Badge variant="secondary">
                {sun ? `${sun.signSymbol} ${sun.sign}` : "✦ Welcome"}
              </Badge>
            </div>
            <CardTitle>
              {reading?.title || "The best place to begin is you."}
            </CardTitle>
            <CardDescription>
              {reading
                ? "A gentle perspective for today"
                : "A chart can open a new conversation with yourself."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {reading?.text ||
                "Create your first birth chart to explore your Sun, Moon, and rising sign. Your daily dashboard will then bring together sky rhythms, personal transits, and thoughtful prompts."}
            </p>
            <Link
              href={chart ? "/horoscopes" : "/dashboard/charts"}
              className="text-link"
            >
              {chart ? "Read today’s reflection" : "Create your first chart"}
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card className="moon-dashboard-card">
          <CardHeader>
            <span className="eyebrow">THE LUNAR MOMENT</span>
            <CardTitle>{sky.phaseName}</CardTitle>
            <CardDescription>Moon in {sky.placements[1].sign}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="small-moon">☽</div>
            <span>{Math.round(sky.illumination * 100)}% illuminated</span>
            <Link href="/sky" className="text-link">
              Follow the sky
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card className="birth-dashboard-card">
          <CardHeader>
            <span className="eyebrow">YOUR CELESTIAL BLUEPRINT</span>
            <CardTitle>
              {chart
                ? `${chart.input.name}’s chart`
                : "Your story, in the stars."}
            </CardTitle>
            <CardDescription>
              {saved.length} saved {saved.length === 1 ? "chart" : "charts"} ·
              tropical zodiac
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
                {chart ? "Open my charts" : "Start my chart"}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="transit-dashboard-card">
          <CardHeader>
            <span className="eyebrow">MOVING THROUGH YOUR SKY</span>
            <CardTitle>Personal transits</CardTitle>
            <CardDescription>
              Current planets meeting your natal chart · 2° orb
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transits.length ? (
              transits.map((t, i) => (
                <div className="transit-row" key={i}>
                  <span>{t.symbol}</span>
                  <div>
                    <strong>
                      {t.a} {t.name.toLowerCase()} natal {t.b}
                    </strong>
                    <p>
                      {t.tone} · {t.orb.toFixed(1)}° orb
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                {chart
                  ? "No close aspects in the selected 2° orb right now. A quiet sky is also a moment to notice."
                  : "Save your first chart to see calculated current-to-natal aspects here."}
              </p>
            )}
            <p className="small muted">
              Symbolic invitations for reflection, not event forecasts.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <NotebookPen strokeWidth={1} />
            <CardTitle>A question to carry</CardTitle>
            <CardDescription>Your private reflection journal</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {reading?.prompt ||
                "What has been asking for a little more attention lately?"}
            </p>
            <Link href="/dashboard/journal" className="text-link">
              Write a reflection
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <BookOpen strokeWidth={1} />
            <CardTitle>Keep your curiosity open.</CardTitle>
            <CardDescription>Learn at your own pace</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Start with the building blocks: planets, signs, houses, and the
              relationships between them.
            </p>
            <Link href="/learn/reading-your-birth-chart" className="text-link">
              How to read a chart
              <ArrowUpRight size={17} />
            </Link>
          </CardContent>
        </Card>
      </div>
      <section className="recent-reflections">
        <h2>Recent reflections</h2>
        {entries.length ? (
          entries.map((e) => (
            <div className="reflection-preview" key={e.id}>
              <Badge variant="secondary">{e.mood}</Badge>
              <p>
                {e.text.slice(0, 180)}
                {e.text.length > 180 ? "…" : ""}
              </p>
              <span className="small muted">
                {e.createdAt.toISOString().slice(0, 10)}
              </span>
            </div>
          ))
        ) : (
          <div className="inline-cta">
            <p>
              Your first reflection belongs here. One sentence is enough to
              begin.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/journal">
                Open journal
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
