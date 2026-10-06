import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Orbit,
  Heart,
  BookOpen,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CelestialWheel } from "@/components/wheel";
import { signs, articles } from "@/lib/knowledge";
import { skyAt } from "@/lib/astrology";
export const revalidate = 3600;
export default function Home() {
  const sky = skyAt(new Date());
  const moon = sky.placements.find((x) => x.name === "Moon")!;
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow enter">
            <span className="tiny-star">✦</span> YOUR CORNER OF THE COSMOS
          </div>
          <h1 className="enter">
            Written in the stars.
            <br />
            <em>Discovered by you.</em>
          </h1>
          <p className="hero-description enter">
            A thoughtful space to explore your birth chart, follow the rhythms
            of the sky, and understand yourself a little better.
          </p>
          <div className="hero-actions enter">
            <Button asChild size="lg">
              <Link href="/chart">
                Discover your birth chart
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/learn">
                Explore astrology
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="hero-trust enter">
            <span>
              <Check size={14} />
              Always free
            </span>
            <span>
              <Check size={14} />
              Made for everyone
            </span>
            <span>
              <Check size={14} />
              No chart experience needed
            </span>
          </div>
        </div>
        <div className="hero-visual enter">
          <CelestialWheel hero />
          <div className="sky-note">
            <span className="sky-note-icon">☽</span>
            <div>
              <span className="eyebrow">IN THE SKY TODAY</span>
              <p>
                Moon in {moon.sign} <span>· {sky.phaseName}</span>
              </p>
            </div>
            <Link href="/sky" aria-label="Explore today’s sky">
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>A GUIDE, NOT A DESTINATION.</span>
          <a href="#discover">
            KEEP EXPLORING <span>↓</span>
          </a>
          <span>EST. 2026 · OPEN TO ALL</span>
        </div>
      </section>
      <div className="zodiac-ribbon" aria-hidden="true">
        {signs.map((s) => (
          <span key={s.name}>
            {s.symbol}
            <small>{s.name}</small>
            <i>·</i>
          </span>
        ))}
      </div>
      <section id="discover" className="container section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              THE UNIVERSE, A LITTLE MORE PERSONAL
            </span>
            <h2>
              Find your own way
              <br />
              <em>into the stars.</em>
            </h2>
          </div>
          <p>
            Start with a question. Follow your curiosity.
            <br />
            There’s no right way to begin.
          </p>
        </div>
        <div className="feature-grid">
          {[
            {
              n: "01",
              icon: Compass,
              title: "Your celestial blueprint",
              text: "Go beyond your sun sign. Discover the planets, houses, and patterns that make your chart yours.",
              href: "/chart",
              link: "Create your birth chart",
            },
            {
              n: "02",
              icon: Orbit,
              title: "A moment with the sky",
              text: "Follow the Moon, planetary movements, and daily themes. Find a rhythm that feels like you.",
              href: "/horoscopes",
              link: "Read your daily horoscope",
            },
            {
              n: "03",
              icon: Heart,
              title: "The space between us",
              text: "Explore how different energies connect. A new lens for understanding, never a verdict on love.",
              href: "/compatibility",
              link: "Explore compatibility",
            },
            {
              n: "04",
              icon: BookOpen,
              title: "Curiosity looks good on you",
              text: "From your very first chart to the finer details. An open library for a lifetime of discovering.",
              href: "/learn",
              link: "Step into the library",
            },
          ].map((f) => (
            <Link href={f.href} key={f.n} className="feature-card" data-reveal>
              <div className="feature-top">
                <f.icon strokeWidth={1} />
                <span>{f.n}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <span className="text-link">
                {f.link}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="philosophy-section">
        <div className="container philosophy-inner">
          <div className="philosophy-art" data-reveal>
            <svg viewBox="0 0 360 360" fill="none" aria-hidden="true">
              <circle
                cx="180"
                cy="180"
                r="135"
                stroke="currentColor"
                strokeWidth=".7"
              />
              <circle
                cx="180"
                cy="180"
                r="106"
                stroke="currentColor"
                strokeWidth=".5"
                strokeDasharray="2 7"
              />
              <ellipse
                cx="180"
                cy="180"
                rx="63"
                ry="148"
                transform="rotate(-35 180 180)"
                stroke="currentColor"
                strokeWidth=".8"
              />
              <path
                d="M180 104L195 165L256 180L195 195L180 256L165 195L104 180L165 165Z"
                fill="currentColor"
              />
              <circle
                cx="94"
                cy="68"
                r="8"
                fill="var(--background)"
                stroke="currentColor"
              />
              <path d="M280 267v20m-10-10h20" stroke="currentColor" />
            </svg>
            <span>
              THE SKY IS A MIRROR.
              <br />
              YOU ARE THE STORY.
            </span>
          </div>
          <div className="philosophy-copy" data-reveal>
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2>
              Less fortune-telling.
              <br />
              <em>More self-discovery.</em>
            </h2>
            <p>
              We believe astrology is at its best when it opens a
              conversation—with the world, with each other, and with yourself.
            </p>
            <p>
              Asteria is a place for possibility, not certainty. Thoughtful
              interpretations. Real sky calculations. Room to be your own
              person.
            </p>
            <Link className="text-link" href="/about">
              Get to know Asteria
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              TWELVE SIGNS. ENDLESS POSSIBILITIES.
            </span>
            <h2>
              A whole world
              <br />
              <em>in every sign.</em>
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/zodiac">
              Meet all the signs
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <div className="sign-preview-grid">
          {[signs[0], signs[3], signs[6], signs[9]].map((s) => (
            <Link
              className="sign-preview"
              key={s.name}
              href={`/zodiac/${s.name.toLowerCase()}`}
              data-reveal
            >
              <span className="sign-symbol">{s.symbol}</span>
              <div>
                <span className="eyebrow">
                  {s.element} · {s.modality}
                </span>
                <h3>{s.name}</h3>
                <p>{s.archetype}</p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
      <section className="container library-section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">A GOOD PLACE TO START</span>
            <h2>
              A little knowledge.
              <br />
              <em>A wider universe.</em>
            </h2>
          </div>
          <Link href="/learn" className="text-link">
            Visit the library
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="article-preview-grid">
          {articles.slice(0, 3).map((a, i) => (
            <Link
              href={`/learn/${a.slug}`}
              key={a.slug}
              className="article-preview"
              data-reveal
            >
              <div className={`article-art art-${i}`}>
                <span>{["☉", "✦", "☽"][i]}</span>
                <div className="art-orbit" />
              </div>
              <div className="article-preview-body">
                <Badge variant="secondary">{a.category}</Badge>
                <h3>{a.title}</h3>
                <p>{a.intro}</p>
                <span className="article-read">
                  {a.minutes} MIN READ
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="container faq-section">
        <div data-reveal>
          <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
          <h2>
            Let’s clear
            <br />
            <em>a little space.</em>
          </h2>
        </div>
        <Accordion type="single" collapsible data-reveal>
          {[
            [
              "Is Asteria really free?",
              "Yes. Public charts, the learning library, daily readings, compatibility, and your personal dashboard are free. There are no premium readings or subscriptions. Hosting and email use free service tiers with usage limits.",
            ],
            [
              "Do I need to know my birth time?",
              "You can explore planetary placements without it. Select “I don’t know my birth time” and we’ll omit your rising sign and houses. The Moon and placements near sign boundaries may also be uncertain.",
            ],
            [
              "Is astrology a science?",
              "Astrology is a symbolic and cultural practice, not a scientifically validated way to predict your life. We calculate astronomical positions and clearly distinguish those measurements from reflective interpretations.",
            ],
            [
              "Can I use Asteria on my phone?",
              "Absolutely. Asteria is responsive and installable as a progressive web app. Add it to your home screen, and access a small offline guide when you’re disconnected. Personal account features require an internet connection.",
            ],
          ].map(([q, a], i) => (
            <AccordionItem value={`q${i}`} key={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="cta-section" data-reveal>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS WITH CURIOSITY</span>
        <h2>
          The universe is vast.
          <br />
          <em>Start with you.</em>
        </h2>
        <p>Your chart. Your reflections. Your own little constellation.</p>
        <Button asChild size="lg">
          <Link href="/signup">
            Create your free account
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
        <span className="cta-footnote">
          NO PAYWALLS. NO PRESSURE. JUST POSSIBILITY.
        </span>
        <Plus className="cta-star" strokeWidth={0.7} />
      </section>
    </main>
  );
}
