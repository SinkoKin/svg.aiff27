"use client";

import { artist, navItems } from "@/lib/data/artist";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUpRight, Instagram, SoundCloud } from "@/components/ui/Icons";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();
  // Static build-time value: cacheComponents disallows reading the clock during prerender.
  const year = 2026;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__identity">
            <span className="footer__wordmark">
              SVG<sup>®</sup>
            </span>
            <span className="mono footer__tag">Scalable vector groove</span>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mono"
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(`#${item.id}`);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer__social">
            <a
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} />
              Instagram
              <ArrowUpRight size={12} />
            </a>
            <a
              href={artist.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SoundCloud size={16} />
              SoundCloud
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="footer__wordmark-wrap" aria-hidden="true">
          <span className="footer__wordmark-giant">SVG</span>
          <svg
            className="footer__wave"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            role="presentation"
          >
            <path
              d="M0 40 C 60 40, 60 8, 120 8 S 180 72, 240 72 S 300 12, 360 12 S 420 68, 480 68 S 540 18, 600 18 S 660 62, 720 62 S 780 22, 840 22 S 900 58, 960 58 S 1020 28, 1080 28 S 1140 52, 1200 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              data-draw
            />
          </svg>
        </div>

        <div className="footer__bottom mono">
          <span>© {year} SVG Music</span>
          <span>
            {artist.city}, {artist.country}
          </span>
          <span>{artist.coordinates}</span>
          <span>
            Created by{" "}
            <a
              className="footer__credit"
              href="https://www.instagram.com/yovsses"
              target="_blank"
              rel="noopener noreferrer"
            >
              @yovsses
              <ArrowUpRight size={11} />
            </a>
          </span>
          <span className="footer__end">
            <i className="dot" aria-hidden="true" />
            Signal ends / 06
          </span>
        </div>
      </div>
    </footer>
  );
}
