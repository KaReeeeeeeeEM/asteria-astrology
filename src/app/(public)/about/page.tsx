import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { CelestialWheel } from "@/components/wheel";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "About Asteria" };
export default function About() {
  return (
    <main className="container public-main">
      <PageHeading
        eyebrow="OUR PHILOSOPHY"
        title="A little closer to the cosmos."
        description="Asteria began as a place for one curious person to explore astrology. Now it’s open to everyone."
      />
      <div className="about-layout">
        <CelestialWheel hero />
        <article className="article-prose">
          <h2>A guide, not a destination.</h2>
          <p>
            We built Asteria for curiosity: the kind that leads to a better
            question, an honest conversation, or a moment of recognition. Every
            chart and reading is offered freely.
          </p>
          <h2>Real calculations. Thoughtful interpretations.</h2>
          <p>
            Our chart engine calculates planetary positions using the
            open-source Astronomy Engine. Asteria uses a tropical zodiac and
            whole-sign houses. Astrological meanings are original editorial
            interpretations, separate from the astronomical measurements behind
            them.
          </p>
          <h2>Your choices remain yours.</h2>
          <p>
            Astrology is a cultural and symbolic practice. It is not a
            scientifically validated method of predicting your future. We avoid
            deterministic event predictions and numerical relationship scores,
            and encourage you to interpret a chart alongside your own
            experience.
          </p>
          <h2>Open to all.</h2>
          <p>
            No subscriptions. No paid readings. Explore without an account, or
            create one for saved charts, private reflections, and your own
            dashboard. The application is open source, built with Next.js,
            Anime.js, shadcn/ui, Better Auth, and Neon PostgreSQL.
          </p>
          <Link className="text-link" href="/learn/ethical-astrology">
            Read our approach to thoughtful astrology
            <ArrowUpRight size={18} />
          </Link>
        </article>
      </div>
    </main>
  );
}
