"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-motion";

export default function Reveals({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ready || reduced) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        const inner = line.querySelector<HTMLElement>(".line__inner");
        if (!inner) return;
        gsap.from(inner, {
          yPercent: 112,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          },
        });
      });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: true,
            },
          ),
      });

      const paths = gsap.utils.toArray<SVGPathElement>("[data-draw]");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        if (!length) return;
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: path.closest("svg") ?? path,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const onLoad = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(onLoad).catch(() => undefined);
      }
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { dependencies: [ready, reduced], revertOnUpdate: true },
  );

  return null;
}
