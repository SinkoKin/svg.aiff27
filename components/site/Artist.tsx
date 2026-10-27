"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { artist } from "@/lib/data/artist";
import { useReducedMotion } from "@/lib/use-motion";
import SectionHead from "./SectionHead";

export default function Artist() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const image = scope.current?.querySelector(".artist__portrait-img");
      if (!image) return;
      gsap.fromTo(
        image,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest("figure"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="artist"
      data-section
      className="section artist"
      ref={scope}
      aria-labelledby="artist-title"
    >
      <div className="container">
        <SectionHead index="01" label="Artist" meta="Ilyas Naim / Marrakech" />

        <div className="artist__grid">
          <div className="artist__heading">
            <h2 id="artist-title" className="display artist__title">
              <span data-line>
                <span className="line__inner">A sound</span>
              </span>
              <span data-line>
                <span className="line__inner">built in</span>
              </span>
              <span data-line>
                <span className="line__inner">
                  the <em>dark.</em>
                </span>
              </span>
            </h2>
          </div>

          <figure className="artist__portrait" data-reveal>
            <div className="artist__portrait-frame">
              <Image
                src="/media/portrait.webp"
                alt="DJ SVG in a dark green bomber jacket and sunglasses, photographed against a painted wall."
                fill
                sizes="(max-width: 900px) 92vw, 34vw"
                className="artist__portrait-img"
                priority={false}
              />
              <span className="artist__portrait-corner artist__portrait-corner--tl" />
              <span className="artist__portrait-corner artist__portrait-corner--br" />
              <span className="artist__portrait-ref mono">PLATE 01</span>
            </div>
            <figcaption className="artist__caption">
              <span>Ilyas Naim</span>
              <span className="mono">{artist.coordinates}</span>
            </figcaption>
          </figure>

          <div className="artist__lede" data-reveal>
            <span className="mono artist__kicker">The short version</span>
            <p>
              Eight years of reading rooms. House at the core, techno when it
              needs teeth, hip hop in the transitions. One continuous set,
              built for the night in front of him.
            </p>
          </div>

          <div className="artist__bio">
            {artist.bio.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                className={index === 0 ? "artist__bio-first" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="artist__facts" aria-label="Artist facts">
            <dl>
              <div data-reveal>
                <dt className="mono">Since</dt>
                <dd>{artist.since}</dd>
              </div>
              <div data-reveal>
                <dt className="mono">Based in</dt>
                <dd>
                  {artist.city}
                  <span>, {artist.country}</span>
                </dd>
              </div>
              <div data-reveal>
                <dt className="mono">Experience</dt>
                <dd>
                  {artist.years} years<span> behind the decks</span>
                </dd>
              </div>
              <div data-reveal>
                <dt className="mono">Bookings</dt>
                <dd>
                  Worldwide<span> — enquiry for availability</span>
                </dd>
              </div>
            </dl>
            <p className="artist__facts-note mono">
              Genres, not boundaries.
            </p>
          </aside>

          <ul className="artist__tags" aria-label="Genres">
            {artist.genres.map((genre, index) => (
              <li key={genre} data-reveal>
                <span className="mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
