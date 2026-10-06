"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, createScope, stagger } from "animejs";
export function CosmicScene() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const loops: ReturnType<typeof animate>[] = [];
    const scope = createScope({ root }).add(() => {
      loops.push(
        animate(".cosmic-ring", {
          rotateZ: [0, 360],
          duration: 36000,
          loop: true,
          ease: "linear",
          delay: stagger(1200),
        }),
      );
      loops.push(
        animate(".cosmic-orb", {
          translateZ: 85,
          translateY: [-14, 14],
          rotateZ: [-8, 8],
          duration: 4400,
          alternate: true,
          loop: true,
          ease: "inOutSine",
          delay: stagger(450),
        }),
      );
      loops.push(
        animate(".cosmic-art", {
          translateZ: 50,
          translateY: [-9, 9],
          duration: 5200,
          alternate: true,
          loop: true,
          ease: "inOutSine",
        }),
      );
      loops.push(
        animate(".cosmic-spark", {
          translateZ: 95,
          scale: [0.6, 1.3],
          opacity: [0.3, 0.9],
          duration: 1800,
          alternate: true,
          loop: true,
          delay: stagger(170),
        }),
      );
    });
    let tilt: ReturnType<typeof animate> | undefined;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      tilt?.cancel();
      tilt = animate(el.querySelector(".cosmic-stage")!, {
        rotateY: ((e.clientX - r.left) / r.width - 0.5) * 22,
        rotateX: -((e.clientY - r.top) / r.height - 0.5) * 18,
        duration: 650,
        ease: "out(3)",
      });
    };
    const leave = () => {
      tilt?.cancel();
      tilt = animate(el.querySelector(".cosmic-stage")!, {
        rotateX: 0,
        rotateY: 0,
        duration: 850,
        ease: "out(3)",
      });
    };
    const io = new IntersectionObserver(([entry]) => {
      loops.forEach((a) => (entry.isIntersecting ? a.resume() : a.pause()));
    });
    io.observe(el);
    // Pause long-running loops when the tab is hidden; all transforms are reverted on unmount.
    const visibility = () => {
      loops.forEach((a) => (document.hidden ? a.pause() : a.resume()));
    };
    document.addEventListener("visibilitychange", visibility);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect();
      tilt?.cancel();
      scope.revert();
      document.removeEventListener("visibilitychange", visibility);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="cosmic-scene" ref={root}>
      <div className="cosmic-stage">
        <div className="cosmic-halo" />
        <div className="ring-plane ring-plane-one">
          <div className="cosmic-ring">
            <span className="orbital-bead" />
          </div>
        </div>
        <div className="ring-plane ring-plane-two">
          <div className="cosmic-ring">
            <span className="orbital-bead" />
          </div>
        </div>
        <div className="cosmic-art">
          <Image
            src="/art/cosmic-friends.png"
            width={1280}
            height={1280}
            alt="Friendly cartoon Sun, Moon, comet, and planet exploring the cosmos"
            priority
            sizes="(max-width: 700px) 90vw, 550px"
          />
        </div>
        <span className="cosmic-orb orb-one" />
        <span className="cosmic-orb orb-two" />
        <span className="cosmic-orb orb-three" />
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="cosmic-spark"
            style={{
              left: `${[12, 78, 85, 8, 65, 30, 92, 46][i]}%`,
              top: `${[20, 12, 68, 78, 88, 6, 36, 95][i]}%`,
            }}
          >
            ✦
          </span>
        ))}
      </div>
      <span className="cosmic-caption">A LITTLE WONDER. A WHOLE UNIVERSE.</span>
    </div>
  );
}
