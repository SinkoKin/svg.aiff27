"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { artist } from "@/lib/data/artist";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/lib/use-motion";
import { ArrowRight, ArrowUpRight, SoundCloud } from "@/components/ui/Icons";

const LETTERS = ["S", "V", "G"];

export default function Hero({ ready }: { ready: boolean }) {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const letters = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".hero__letter-inner"),
      );
      const fade = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-hero-fade]"),
      );
      const rule = root.querySelector<HTMLElement>(".hero__ruler-line");

      if (reduced) {
        gsap.set([...letters, ...fade], { clearProps: "all" });
        if (rule) gsap.set(rule, { scaleX: 1 });
        return;
      }

      gsap.set(letters, { yPercent: 118, rotate: 2 });
      gsap.set(fade, { autoAlpha: 0, y: 20 });
      if (rule) gsap.set(rule, { scaleX: 0 });

      if (!ready) return;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.12,
      });

      tl.to(letters, {
        yPercent: 0,
        rotate: 0,
        duration: 1.25,
        stagger: 0.085,
      })
        .to(
          fade,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.85",
        )
        .to(
          rule,
          { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
          "-=0.9",
        );
    },
    { scope, dependencies: [ready, reduced], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (reduced) return;
      const root = scope.current;
      if (!root) return;
      gsap.to(root.querySelector(".hero__content"), {
        yPercent: -11,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="hero"
      data-section
      className="hero"
      ref={scope}
      aria-labelledby="hero-title"
    >
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__eyebrow" data-hero-fade>
            <span className="mono">
              {artist.city.toUpperCase()}, {artist.country.toUpperCase()} —{" "}
              {artist.coordinates}
            </span>
            <span className="mono hero__eyebrow-right">
              <i className="dot" aria-hidden="true" />
              SIGNAL / 001
            </span>
          </div>

          <div className="hero__body">
            <div className="hero__main">
              <div className="hero__djline" data-hero-fade>
                <span className="hero__dj">DJ</span>
                <span className="mono">EST. {artist.since}</span>
              </div>

              <h1 id="hero-title" className="hero__title" aria-label="DJ SVG">
                {LETTERS.map((letter) => (
                  <span className="hero__letter" key={letter} aria-hidden="true">
                    <span className="hero__letter-inner">{letter}</span>
                  </span>
                ))}
                <span className="hero__registered" aria-hidden="true">
                  ®
                </span>
              </h1>

              <p className="hero__tagline" data-hero-fade>
                Eight years in the booth.
                <br />
                One continuous <em>signal.</em>
              </p>

              <div className="hero__cta" data-hero-fade>
                <a
                  className="btn btn--primary"
                  href="#booking"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo("#booking");
                  }}
                >
                  Book a set
                  <ArrowRight size={17} />
                </a>
                <a
                  className="btn btn--ghost"
                  href={artist.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SoundCloud size={17} />
                  Listen on SoundCloud
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <aside className="hero__side" data-hero-fade>
              <span className="mono hero__side-label">
                Available for worldwide bookings
              </span>
              <ul className="hero__facts">
                <li>
                  <span className="mono">Base</span>
                  <span>
                    {artist.city}, {artist.country}
                  </span>
                </li>
                <li>
                  <span className="mono">Years</span>
                  <span>{artist.years} behind the decks</span>
                </li>
                <li>
                  <span className="mono">Range</span>
                  <span>House — Techno — Deep house</span>
                </li>
              </ul>
              <p className="hero__side-note">
                {artist.heroLine}
              </p>
              <a
                className="hero__side-link mono"
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram {artist.instagramHandle}
                <ArrowUpRight size={13} />
              </a>
            </aside>
          </div>

          <div className="hero__foot" data-hero-fade>
            <div className="hero__meta mono">
              <span>HOUSE</span>
              <span>TECHNO</span>
              <span>DEEP HOUSE</span>
              <span>EDM</span>
              <span>HIP HOP</span>
            </div>
            <a
              className="scroll-cue mono"
              href="#artist"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#artist");
              }}
            >
              <span>Scroll to tune in</span>
              <span className="scroll-cue__line" aria-hidden="true">
                <i />
              </span>
            </a>
          </div>
        </div>

        <div className="hero__ruler" aria-hidden="true">
          <span className="mono">31.6295° N</span>
          <div className="hero__ruler-ticks">
            {Array.from({ length: 28 }).map((_, index) => (
              <i key={index} className={index % 7 === 0 ? "is-major" : ""} />
            ))}
            <span className="hero__ruler-line" />
          </div>
          <span className="mono">7.9811° W</span>
        </div>
      </div>
    </section>
  );
}
