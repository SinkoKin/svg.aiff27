"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-motion";

const items = [
  "HOUSE",
  "TECHNO",
  "DEEP HOUSE",
  "EDM",
  "HIP HOP",
  "EVENT PRODUCTION",
  "SOUND ENGINEERING",
  "MUSIC PRODUCTION",
];

export default function Marquee() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const track = scope.current?.querySelector(".marquee__track");
      if (!track) return;

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      const skew = gsap.quickTo(track, "skewX", {
        duration: 0.5,
        ease: "power3.out",
      });

      const trigger = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              skew(gsap.utils.clamp(-6, 6, velocity / -420));
            },
          },
        },
      );

      return () => {
        loop.kill();
        trigger.kill();
      };
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div className="marquee" ref={scope} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {items.map((item) => (
              <span className="marquee__item" key={`${copy}-${item}`}>
                {item}
                <i className="marquee__star">✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
