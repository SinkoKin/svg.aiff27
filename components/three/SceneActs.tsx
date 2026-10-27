"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { actPresets, scene, type ActName } from "@/lib/scene-state";
import { useReducedMotion } from "@/lib/use-motion";

const sectionActs: Array<{ id: string; act: ActName }> = [
  { id: "artist", act: "artist" },
  { id: "sound", act: "sound" },
  { id: "signal", act: "signal" },
  { id: "archive", act: "archive" },
  { id: "live", act: "live" },
  { id: "booking", act: "booking" },
];

export default function SceneActs({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ready) return;

    const applyAct = (act: ActName) => {
      if (act !== "signal") scene.boost = 0;
      gsap.to(scene, {
        ...actPresets[act],
        duration: reduced ? 0 : 1.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    if (reduced) {
      Object.assign(scene, actPresets.hero);
    } else {
      applyAct("hero");
    }

    const triggers: ScrollTrigger[] = [];

    for (const section of sectionActs) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => applyAct(section.act),
          onEnterBack: () => applyAct(section.act),
        }),
      );
    }

    const hero = document.getElementById("hero");
    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom 40%",
          onEnterBack: () => applyAct("hero"),
        }),
      );
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [ready, reduced]);

  return null;
}
