"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artist, transmissions } from "@/lib/data/artist";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import SectionHead from "./SectionHead";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

export default function Live() {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (hovered === null) return;
    const preview = previewRef.current;
    if (!preview) return;

    gsap.set(preview, { autoAlpha: 1, scale: 1 });
    const moveX = gsap.quickTo(preview, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(preview, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX + 26);
      moveY(event.clientY - 110);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.to(preview, { autoAlpha: 0, scale: 0.96, duration: 0.25 });
    };
  }, [hovered]);

  return (
    <section
      id="live"
      data-section
      className="section live"
      aria-labelledby="live-title"
    >
      <div className="container">
        <SectionHead index="05" label="Live" meta="Archive / No public dates listed" />

        <div className="live__grid">
          <div className="live__head">
            <h2 id="live-title" className="display live__title">
              <span data-line>
                <span className="line__inner">The next</span>
              </span>
              <span data-line>
                <span className="line__inner">
                  <em className="live__serif">transmission</em>
                </span>
              </span>
              <span data-line>
                <span className="line__inner">
                  is <em>yours.</em>
                </span>
              </span>
            </h2>
            <p className="live__intro" data-reveal>
              For current availability, private events and festival slots,
              get in touch. Past transmissions are archived below.
            </p>
            <button
              type="button"
              className="btn btn--primary live__cta"
              onClick={() => scrollTo("#booking")}
              data-reveal
            >
              Request availability
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="live__list-wrap">
            <div className="live__list-head mono" aria-hidden="true">
              <span>Night</span>
              <span>Location</span>
              <span>Status</span>
            </div>
            <ol className="live__list">
              {transmissions.map((transmission, index) => (
                <li
                  key={transmission.name}
                  className="live__row"
                  data-reveal
                  onPointerEnter={(event) => {
                    const preview = previewRef.current;
                    if (preview) {
                      gsap.set(preview, {
                        x: event.clientX + 26,
                        y: event.clientY - 110,
                      });
                    }
                    setHovered(index);
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <span className="mono live__row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="live__row-name">{transmission.name}</h3>
                  <span className="mono live__row-place">
                    {transmission.place}
                  </span>
                  <span className="mono live__row-tag">
                    {transmission.tag}
                  </span>
                  <a
                    className="live__row-link"
                    href={`mailto:${artist.email}?subject=${encodeURIComponent(
                      `Booking inquiry — ${transmission.name}`,
                    )}`}
                    aria-label={`Enquire about a night like ${transmission.name}`}
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </li>
              ))}
            </ol>
            <p className="live__note mono" data-reveal>
              Archive names only. For current dates and availability, get in
              touch.
            </p>
          </div>
        </div>
      </div>

      <div className="live__preview" ref={previewRef} aria-hidden="true">
        {hovered !== null ? (
          <Image
            src={transmissions[hovered].image}
            alt=""
            width={260}
            height={320}
            className="live__preview-img"
          />
        ) : null}
        <span className="live__preview-tag mono">ARCHIVE</span>
      </div>
    </section>
  );
}
