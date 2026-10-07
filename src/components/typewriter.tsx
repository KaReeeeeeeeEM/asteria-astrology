"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "./language";
import { animate } from "animejs";
export function Typewriter({
  text: sourceText,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { t } = useLanguage();
  const text = t(sourceText);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animation: ReturnType<typeof animate> | undefined;
    const state = { letters: 0 };
    const visible = el.querySelector("[aria-hidden]")!;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observer.disconnect();
        visible.textContent = "";
        animation = animate(state, {
          letters: [0, text.length],
          duration: Math.min(2400, text.length * 35),
          ease: "linear",
          onUpdate: () => {
            visible.textContent = text.slice(0, Math.round(state.letters));
          },
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [text]);
  return (
    <span ref={ref} className={`typewriter ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text}</span>
      <i aria-hidden="true" />
    </span>
  );
}
