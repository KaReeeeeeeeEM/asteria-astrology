import { Text } from "@/components/language";
import Link from "@/components/app-link";
import { PageHeading } from "@/components/page-heading";
import { CelestialWheel } from "@/components/wheel";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "About Asteria" };
export default function About() {
  return (
    <section className="dashboard-tool-content">
      <PageHeading
        eyebrow="OUR PHILOSOPHY"
        title="A little closer to the cosmos."
        description="Asteria began as a place for one curious person to explore astrology. Now it’s open to everyone."
      />
      <div className="about-layout">
        <CelestialWheel hero />
        <article className="article-prose">
          <h2>
            <Text>{"A guide, not a destination."}</Text>
          </h2>
          <p>
            <Text>
              {
                "We built Asteria for curiosity: the kind that leads to a better question, an honest conversation, or a moment of recognition. Every chart and reading is offered freely."
              }
            </Text>
          </p>
          <h2>
            <Text>{"Real calculations. Thoughtful interpretations."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Our chart engine calculates planetary positions using the open-source Astronomy Engine. Asteria uses a tropical zodiac and whole-sign houses. Astrological meanings are original editorial interpretations, separate from the astronomical measurements behind them."
              }
            </Text>
          </p>
          <h2>
            <Text>{"Your choices remain yours."}</Text>
          </h2>
          <p>
            <Text>
              {
                "Astrology is a cultural and symbolic practice. It is not a scientifically validated method of predicting your future. We avoid deterministic event predictions and numerical relationship scores, and encourage you to interpret a chart alongside your own experience."
              }
            </Text>
          </p>
          <h2>
            <Text>{"Open to all."}</Text>
          </h2>
          <p>
            <Text>
              {
                "No subscriptions. No paid readings. Explore without an account, or create one for saved charts, private reflections, and your own dashboard. The application is open source, built with Next.js, Anime.js, shadcn/ui, Better Auth, and Neon PostgreSQL."
              }
            </Text>
          </p>
          <Link className="text-link" href="/learn/ethical-astrology">
            <Text>{"Read our approach to thoughtful astrology"}</Text>
            <ArrowUpRight size={18} />
          </Link>
        </article>
      </div>
    </section>
  );
}
