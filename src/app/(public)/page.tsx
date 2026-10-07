import { Text } from "@/components/language";
import Link from "@/components/app-link";
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
import { ScrollStory } from "@/components/scroll-story";
import { CosmicScene } from "@/components/cosmic-scene";
import { LearningFriends, ZodiacMascot } from "@/components/cartoons";
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
            <span className="tiny-star">✦</span>
            <Text>{"YOUR CORNER OF THE COSMOS"}</Text>
          </div>
          <h1 className="enter">
            <Text>{"Your universe,"}</Text>
            <br />
            <em>
              <Text>{"a little closer."}</Text>
            </em>
          </h1>
          <p className="hero-description enter">
            <Text>
              {
                "Meet your celestial side. Explore your birth chart, discover your numbers, and follow the sky with a little more curiosity."
              }
            </Text>
          </p>
          <div className="hero-actions enter">
            <Button asChild size="lg">
              <Link href="/chart">
                <Text>{"Discover your birth chart"}</Text>
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/learn">
                <Text>{"Explore astrology"}</Text>
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="hero-trust enter">
            <span>
              <Check size={14} />
              <Text>{"Always free"}</Text>
            </span>
            <span>
              <Check size={14} />
              <Text>{"Made for everyone"}</Text>
            </span>
            <span>
              <Check size={14} />
              <Text>{"No chart experience needed"}</Text>
            </span>
          </div>
        </div>
        <div className="hero-visual enter">
          <CosmicScene />
          <div className="sky-note">
            <span className="sky-note-icon">☽</span>
            <div>
              <span className="eyebrow">
                <Text>{"IN THE SKY TODAY"}</Text>
              </span>
              <p>
                <Text>{"Moon in "}</Text>
                <Text>{moon.sign}</Text>{" "}
                <span>
                  · <Text>{sky.phaseName}</Text>
                </span>
              </p>
            </div>
            <Link href="/sky" aria-label="Explore today’s sky">
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            <Text>{"A GUIDE, NOT A DESTINATION."}</Text>
          </span>
          <a href="#discover">
            <Text>{"KEEP EXPLORING "}</Text>
            <span>↓</span>
          </a>
          <span>
            <Text>{"EST. 2026 · OPEN TO ALL"}</Text>
          </span>
        </div>
      </section>
      <ScrollStory />
      <section className="container quick-explore" data-reveal>
        <Link href="/numerology">
          <span>
            <Text>{"01 · NUMBER MAGIC"}</Text>
          </span>
          <h3>
            <Text>{"Find your life path"}</Text>
          </h3>
          <p>
            <Text>{"Three numbers. A fresh perspective."}</Text>
          </p>
        </Link>
        <Link href="/compatibility">
          <span>
            <Text>{"02 · COSMIC CONNECTION"}</Text>
          </span>
          <h3>
            <Text>{"Explore your match"}</Text>
          </h3>
          <p>
            <Text>{"A playful percentage, with the method explained."}</Text>
          </p>
        </Link>
        <Link href="/sky">
          <span>
            <Text>{"03 · ALWAYS IN MOTION"}</Text>
          </span>
          <h3>
            <Text>{"See what’s coming"}</Text>
          </h3>
          <p>
            <Text>{"Live positions and your next celestial moments."}</Text>
          </p>
        </Link>
      </section>
      <div className="zodiac-ribbon" aria-hidden="true">
        {signs.map((s) => (
          <span key={s.name}>
            <Text>{s.symbol}</Text>
            <small>
              <Text>{s.name}</Text>
            </small>
            <i>·</i>
          </span>
        ))}
      </div>
      <section id="discover" className="container section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <Text>{"THE UNIVERSE, A LITTLE MORE PERSONAL"}</Text>
            </span>
            <h2>
              <Text>{"Find your own way"}</Text>
              <br />
              <em>
                <Text>{"into the stars."}</Text>
              </em>
            </h2>
          </div>
          <p>
            <Text>{"Start with a question. Follow your curiosity."}</Text>
            <br />
            <Text>{"There’s no right way to begin."}</Text>
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
                <span>
                  <Text>{f.n}</Text>
                </span>
              </div>
              <h3>
                <Text>{f.title}</Text>
              </h3>
              <p>
                <Text>{f.text}</Text>
              </p>
              <span className="text-link">
                <Text>{f.link}</Text>
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="philosophy-section">
        <div className="container philosophy-inner">
          <div className="philosophy-art" data-reveal>
            <LearningFriends />
            <svg
              className="legacy-art"
              viewBox="0 0 360 360"
              fill="none"
              aria-hidden="true"
            >
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
              <Text>{"THE SKY IS A MIRROR."}</Text>
              <br />
              <Text>{"YOU ARE THE STORY."}</Text>
            </span>
          </div>
          <div className="philosophy-copy" data-reveal>
            <span className="eyebrow">
              <Text>{"OUR PHILOSOPHY"}</Text>
            </span>
            <h2>
              <Text>{"Less fortune-telling."}</Text>
              <br />
              <em>
                <Text>{"More self-discovery."}</Text>
              </em>
            </h2>
            <p>
              <Text>
                {
                  "We believe astrology is at its best when it opens a conversation—with the world, with each other, and with yourself."
                }
              </Text>
            </p>
            <p>
              <Text>
                {
                  "Asteria is a place for possibility, not certainty. Thoughtful interpretations. Real sky calculations. Room to be your own person."
                }
              </Text>
            </p>
            <Link className="text-link" href="/about">
              <Text>{"Get to know Asteria"}</Text>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <Text>{"TWELVE SIGNS. ENDLESS POSSIBILITIES."}</Text>
            </span>
            <h2>
              <Text>{"A whole world"}</Text>
              <br />
              <em>
                <Text>{"in every sign."}</Text>
              </em>
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/zodiac">
              <Text>{"Meet all the signs"}</Text>
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
              <ZodiacMascot sign={s.name} />
              <div>
                <span className="eyebrow">
                  <Text>{s.element}</Text> · <Text>{s.modality}</Text>
                </span>
                <h3>
                  <Text>{s.name}</Text>
                </h3>
                <p>
                  <Text>{s.archetype}</Text>
                </p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
      <section className="container library-section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <Text>{"A GOOD PLACE TO START"}</Text>
            </span>
            <h2>
              <Text>{"A little knowledge."}</Text>
              <br />
              <em>
                <Text>{"A wider universe."}</Text>
              </em>
            </h2>
          </div>
          <Link href="/learn" className="text-link">
            <Text>{"Visit the library"}</Text>
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
                <span>
                  <Text>{["☉", "✦", "☽"][i]}</Text>
                </span>
                <div className="art-orbit" />
              </div>
              <div className="article-preview-body">
                <Badge variant="secondary">
                  <Text>{a.category}</Text>
                </Badge>
                <h3>
                  <Text>{a.title}</Text>
                </h3>
                <p>
                  <Text>{a.intro}</Text>
                </p>
                <span className="article-read">
                  <Text>{a.minutes}</Text>
                  <Text>{"MIN READ"}</Text>
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="container faq-section">
        <div data-reveal>
          <span className="eyebrow">
            <Text>{"A FEW THINGS YOU MIGHT BE WONDERING"}</Text>
          </span>
          <h2>
            <Text>{"Let’s clear"}</Text>
            <br />
            <em>
              <Text>{"a little space."}</Text>
            </em>
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
              <AccordionTrigger>
                <Text>{q}</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>{a}</Text>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="cta-section" data-reveal>
        <span className="eyebrow">
          <Text>{"YOUR NEXT CHAPTER STARTS WITH CURIOSITY"}</Text>
        </span>
        <h2>
          <Text>{"The universe is vast."}</Text>
          <br />
          <em>
            <Text>{"Start with you."}</Text>
          </em>
        </h2>
        <p>
          <Text>
            {"Your chart. Your reflections. Your own little constellation."}
          </Text>
        </p>
        <Button asChild size="lg">
          <Link href="/signup">
            <Text>{"Create your free account"}</Text>
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
        <span className="cta-footnote">
          <Text>{"NO PAYWALLS. NO PRESSURE. JUST POSSIBILITY."}</Text>
        </span>
        <Plus className="cta-star" strokeWidth={0.7} />
      </section>
    </main>
  );
}
