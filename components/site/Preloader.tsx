"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-motion";

const TICKS = 44;

type TimelineLike = {
  progress: (value?: number) => number | void;
  kill: () => void;
};

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [hidden, setHidden] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<TimelineLike | null>(null);
  const finished = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    let repeat = false;
    try {
      repeat = window.sessionStorage.getItem("svg-intro-seen") === "1";
    } catch {
      repeat = false;
    }

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      try {
        window.sessionStorage.setItem("svg-intro-seen", "1");
      } catch {
        /* storage unavailable */
      }
      setHidden(true);
      document.documentElement.classList.remove("is-loading");
      // Hand the hero its cue as the curtain starts moving, not after it has
      // fully left. The reveal then happens behind the lift instead of
      // stacking a second wait on top of it.
      window.setTimeout(() => onComplete(), reduced ? 20 : 220);
    };

    if (reduced) {
      if (counterRef.current) counterRef.current.textContent = "100";
      if (barRef.current) barRef.current.style.width = "100%";
      finish();
    } else {
      const progress = { value: 0 };
      const tl = gsap.timeline({
        delay: repeat ? 0.08 : 0.18,
        onComplete: finish,
      });
      timelineRef.current = tl;

      tl.to(progress, {
        value: 100,
        duration: repeat ? 0.4 : 1.35,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.round(progress.value),
            ).padStart(3, "0");
          }
          if (barRef.current) {
            barRef.current.style.width = `${progress.value}%`;
          }
        },
      }).to({}, { duration: repeat ? 0.1 : 0.22 });
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && timelineRef.current) {
        timelineRef.current.progress(1);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timelineRef.current?.kill();
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("is-loading");
    };
  }, [onComplete, reduced]);

  const skip = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    } else if (!finished.current) {
      finished.current = true;
      setHidden(true);
      document.documentElement.classList.remove("is-loading");
      onComplete();
    }
  };

  return (
    <div
      className={`preloader${hidden ? " is-done" : ""}`}
      aria-hidden={hidden}
      data-testid="preloader"
    >
      <div className="preloader__frame">
        <div className="preloader__top">
          <span className="mono">SVG / AUDIO—VISUAL</span>
          <span className="mono">MARRAKECH — 31.6295° N</span>
        </div>

        <div className="preloader__center">
          <div className="preloader__mark" aria-hidden="true">
            <span>S</span>
            <span>V</span>
            <span>G</span>
            <sup>®</sup>
          </div>

          <div className="preloader__ticks" aria-hidden="true">
            {Array.from({ length: TICKS }).map((_, index) => (
              <i key={index} />
            ))}
          </div>

          <div className="preloader__bar" aria-hidden="true">
            <div className="preloader__bar-fill" ref={barRef} />
          </div>

          <div className="preloader__readout">
            <span>Loading signal</span>
            <span>
              <span ref={counterRef}>000</span>%
            </span>
          </div>
        </div>

        <div className="preloader__bottom">
          <span className="mono">SCALABLE VECTOR GROOVE</span>
          <button type="button" className="preloader__skip mono" onClick={skip}>
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
