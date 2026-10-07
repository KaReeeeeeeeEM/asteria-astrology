"use client";
import { Text, LocalizedElement } from "@/components/language";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import Link from "@/components/app-link";
import { ThreeUniverse } from "./three-universe";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Typewriter } from "./typewriter";
import { ArrowUpRight } from "lucide-react";
const chapters = [
  {
    label: "01 / A little wonder",
    title: "Big universe.\nMeet little you.",
    text: "A world of curiosity, waiting for your first question.",
    href: "/chart",
    action: "Meet your birth chart",
  },
  {
    label: "02 / A little connection",
    title: "Some sparks\njust click.",
    text: "Meet your zodiac match. Explore what makes you different.",
    href: "/compatibility",
    action: "Find your cosmic connection",
  },
  {
    label: "03 / A little number magic",
    title: "You have\na number story.",
    text: "One birthday. Three numbers. A fresh way to reflect.",
    href: "/numerology",
    action: "Discover your numbers",
  },
];
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const panels = [...el.querySelectorAll<HTMLElement>(".story-chapter")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panels.forEach((panel) => {
        panel.hidden = false;
        panel.inert = false;
      });
      return;
    }
    const animations = panels.map((panel) =>
      animate(panel, {
        opacity: [0, 1],
        translateY: [35, 0],
        scale: [0.95, 1],
        duration: 1000,
        autoplay: false,
        ease: "out(3)",
      }),
    );
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.max(
        0,
        Math.min(1, -r.top / Math.max(1, r.height - innerHeight)),
      );
      const active = Math.min(2, Math.floor(p * 3));
      el.dataset.chapter = String(active);
      panels.forEach((panel, i) => {
        const current = i === active;
        panel.hidden = !current;
        panel.inert = !current;
        animations[i].seek(
          current ? Math.min(1000, 200 + (p * 3 - i) * 1800) : 0,
        );
      });
      const bar = el.querySelector<HTMLElement>(
        '[data-slot="progress-indicator"]',
      );
      el.querySelector('[data-slot="progress"]')?.setAttribute(
        "aria-valuenow",
        String(Math.round(p * 100)),
      );
      if (bar) bar.style.transform = `translateX(-${100 - p * 100}%)`;
    };
    const scroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    update();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      animations.forEach((a) => a.revert());
    };
  }, []);
  return (
    <LocalizedElement
      as="section"
      className="scroll-story"
      ref={ref}
      aria-label="An interactive journey through Asteria"
    >
      <div className="story-sticky">
        <ThreeUniverse />
        <div className="story-copy">
          {chapters.map((c, i) => (
            <div className="story-chapter" key={c.label} hidden={i !== 0}>
              <Badge variant="outline">
                <Text>{c.label}</Text>
              </Badge>
              <h2>
                <Text>{c.title}</Text>
              </h2>
              <p>
                <Text>{c.text}</Text>
              </p>
              <Button asChild>
                <Link href={c.href}>
                  <Text>{c.action}</Text>
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="story-bottom">
          <Typewriter text="Keep scrolling. There’s a little magic ahead." />
          <Progress value={0} aria-label="Cosmic journey scroll progress" />
        </div>
      </div>
    </LocalizedElement>
  );
}
