"use client";
import { useEffect, useRef } from "react";
import { ThreeUniverse } from "./three-universe";
import { usePathname } from "next/navigation";
import { animate, createScope, stagger } from "animejs";
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const element = root.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const seen = new WeakSet<Element>();
    const active: ReturnType<typeof animate>[] = [];
    const scope = createScope({ root });
    const defer =
      window.requestIdleCallback ??
      ((fn: IdleRequestCallback) => window.setTimeout(fn, 80));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const start = defer(
      () =>
        scope.add(() => {
          animate(".route-wipe", {
            scaleY: [1, 0],
            duration: 700,
            ease: "inOut(3)",
          });
          animate(".route-content", {
            opacity: [0, 1],
            duration: 650,
            ease: "out(3)",
          });
          if (element.querySelector(".enter"))
            animate(".enter", {
              opacity: [0, 1],
              translateY: [22, 0],
              duration: 850,
              delay: stagger(90),
              ease: "out(3)",
            });
          if (element.querySelector(".orbit-spin"))
            animate(".orbit-spin", {
              rotate: 360,
              duration: 180000,
              loop: true,
              ease: "linear",
            });
          if (element.querySelector(".floating-star"))
            animate(".floating-star", {
              translateY: [-5, 5],
              rotate: [-5, 5],
              alternate: true,
              loop: true,
              duration: 3800,
              ease: "inOutSine",
            });
        }),
      { timeout: 1500 },
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            active.push(
              animate(e.target, {
                opacity: [0.15, 1],
                translateY: [24, 0],
                duration: 750,
                ease: "out(3)",
              }),
            );
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    const discover = () =>
      element
        .querySelectorAll(
          '[data-reveal], .library-card, .zodiac-card, .chart-result, .reading-hero, .saved-chart-card, .journal-entry, .dashboard-bento > [data-slot="card"]',
        )
        .forEach((el) => {
          if (!seen.has(el)) {
            seen.add(el);
            observer.observe(el);
          }
        });
    discover();
    const mutations = new MutationObserver(discover);
    mutations.observe(element, { childList: true, subtree: true });
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest(
        ".feature-card,.library-card,.zodiac-card,.saved-chart-card",
      );
      if (
        target &&
        !(e.relatedTarget instanceof Node && target.contains(e.relatedTarget))
      )
        active.push(
          animate(target, { translateY: -4, duration: 260, ease: "out(3)" }),
        );
    };
    const out = (e: PointerEvent) => {
      const target = (e.target as Element).closest(
        ".feature-card,.library-card,.zodiac-card,.saved-chart-card",
      );
      if (
        target &&
        !(e.relatedTarget instanceof Node && target.contains(e.relatedTarget))
      )
        active.push(
          animate(target, { translateY: 0, duration: 300, ease: "out(3)" }),
        );
    };
    element.addEventListener("pointerover", over);
    element.addEventListener("pointerout", out);
    return () => {
      cancel(start);
      observer.disconnect();
      mutations.disconnect();
      element.removeEventListener("pointerover", over);
      element.removeEventListener("pointerout", out);
      active.forEach((a) => a.cancel());
      scope.revert();
    };
  }, [path]);
  return (
    <div ref={root} className="motion-root">
      <ThreeUniverse ambient />
      <div className="route-wipe" aria-hidden="true" />
      <div className="route-content">{children}</div>
    </div>
  );
}
