"use client";
import { useEffect, useRef } from "react";
/** WebGL is progressively enhanced; a CSS planet remains when unavailable. */
export function ThreeUniverse({ ambient = false }: { ambient?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};
    import("three")
      .then((T) => {
        if (disposed) return;
        let renderer: InstanceType<typeof T.WebGLRenderer>;
        try {
          renderer = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);
        el.dataset.ready = "true";
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.z = 8;
        const group = new T.Group();
        scene.add(group);
        const sphereGeo = new T.IcosahedronGeometry(1.3, 2);
        const material = new T.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.65,
          roughness: 0.28,
          flatShading: true,
        });
        const planet = new T.Mesh(sphereGeo, material);
        group.add(planet);
        const ringGeo = new T.TorusGeometry(2, 0.015, 8, 120);
        const ringMat = new T.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.7,
        });
        for (let i = 0; i < 3; i++) {
          const ring = new T.Mesh(ringGeo, ringMat);
          ring.rotation.x = 0.8 + i * 0.5;
          ring.rotation.y = i * 0.8;
          group.add(ring);
        }
        const beadGeo = new T.SphereGeometry(0.13, 12, 12);
        const beads = Array.from({ length: 9 }, () => {
          const bead = new T.Mesh(beadGeo, material);
          group.add(bead);
          return bead;
        });
        const starGeo = new T.BufferGeometry();
        const positions = new Float32Array(240 * 3);
        for (let i = 0; i < 240; i++) {
          const a = i * 2.399963;
          const d = 3 + (i % 11) * 0.6;
          positions[i * 3] = Math.cos(a) * d;
          positions[i * 3 + 1] = Math.sin(a) * d;
          positions[i * 3 + 2] = -2 - (i % 13) * 0.4;
        }
        starGeo.setAttribute("position", new T.BufferAttribute(positions, 3));
        const starMat = new T.PointsMaterial({
          color: 0xffffff,
          size: 0.027,
          transparent: true,
          opacity: 0.75,
        });
        scene.add(new T.Points(starGeo, starMat));
        scene.add(new T.AmbientLight(0xffffff, 1.5));
        const light = new T.DirectionalLight(0xffffff, 4);
        light.position.set(-3, 4, 5);
        scene.add(light);
        let targetX = 0,
          targetY = 0,
          progress = 0,
          visible = true,
          frame = 0,
          last = 0;
        const theme = () => {
          const dark = document.documentElement.classList.contains("dark");
          material.color.set(dark ? 0xffffff : 0x333333);
          ringMat.color.set(dark ? 0xffffff : 0x000000);
          starMat.color.set(dark ? 0xffffff : 0x000000);
        };
        theme();
        const themeObserver = new MutationObserver(theme);
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
        const resize = () => {
          const { width, height } = el.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(1, height);
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();
        const pointer = (e: PointerEvent) => {
          targetX = (e.clientX / innerWidth - 0.5) * 0.35;
          targetY = (e.clientY / innerHeight - 0.5) * 0.25;
        };
        const scroll = () => {
          const story = el.closest(".scroll-story");
          if (story) {
            const r = story.getBoundingClientRect();
            progress = Math.max(
              0,
              Math.min(1, -r.top / Math.max(1, r.height - innerHeight)),
            );
          } else
            progress =
              scrollY /
              Math.max(1, document.documentElement.scrollHeight - innerHeight);
        };
        const draw = (time: number) => {
          frame = requestAnimationFrame(draw);
          if (!visible || document.hidden || time - last < 32) return;
          last = time;
          const seconds = time * 0.0003;
          group.rotation.y +=
            (targetX + progress * 4 - group.rotation.y) * 0.04;
          group.rotation.x +=
            (targetY + progress * 0.6 - group.rotation.x) * 0.04;
          planet.rotation.z = seconds * 0.2;
          group.position.x = ambient
            ? 2.5
            : Math.sin(progress * Math.PI * 2) * 0.35;
          const size = ambient ? 0.55 : 1 + progress * 0.25;
          group.scale.setScalar(size);
          beads.forEach((bead, i) => {
            const a = seconds + (i * Math.PI * 2) / 9;
            bead.position.set(
              Math.cos(a) * 2.2,
              Math.sin(a) * 1.4,
              Math.sin(a + i) * 1.2,
            );
          });
          renderer.render(scene, camera);
        };
        const io = new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
        });
        io.observe(el);
        addEventListener("pointermove", pointer, { passive: true });
        addEventListener("scroll", scroll, { passive: true });
        scroll();
        frame = requestAnimationFrame(draw);
        cleanup = () => {
          cancelAnimationFrame(frame);
          ro.disconnect();
          io.disconnect();
          themeObserver.disconnect();
          removeEventListener("pointermove", pointer);
          removeEventListener("scroll", scroll);
          [sphereGeo, ringGeo, beadGeo, starGeo].forEach((g) => g.dispose());
          [material, ringMat, starMat].forEach((m) => m.dispose());
          renderer.dispose();
          renderer.domElement.remove();
          delete el.dataset.ready;
        };
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup();
    };
  }, [ambient]);
  return (
    <div
      className={ambient ? "three-universe ambient-universe" : "three-universe"}
      ref={host}
      aria-hidden="true"
    >
      <div className="three-fallback">
        <i />
        <i />
        <span>✦</span>
      </div>
    </div>
  );
}
