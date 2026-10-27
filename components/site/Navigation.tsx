"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, artist } from "@/lib/data/artist";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUpRight, Close } from "@/components/ui/Icons";

function MarrakechClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Casablanca",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime("");
      }
    };
    format();
    const id = window.setInterval(format, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="nav__clock mono" aria-label="Current time in Marrakech">
      MA <time suppressHydrationWarning>{time || "--:--"}</time>
    </span>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo, stop, start } = useSmoothScroll();
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "hero" ? "" : entry.target.id);
          }
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const page = document.querySelector<HTMLElement>(".page");
    const menu = document.getElementById("site-menu");
    const burger = burgerRef.current;
    page?.setAttribute("inert", "");
    stop();

    const focusables = () =>
      Array.from(
        menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!menu?.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      page?.removeAttribute("inert");
      start();
      // The header button sits inside the now-interactive page. Restore focus
      // after the attribute is gone so the browser accepts it.
      window.requestAnimationFrame(() => burger?.focus());
    };
  }, [open, stop, start]);

  const go = useCallback(
    (id: string) => {
      setOpen(false);
      window.setTimeout(() => scrollTo(`#${id}`), 60);
    },
    [scrollTo],
  );

  const bookMail =
    "mailto:Ilyass.svg@hotmail.com?subject=Booking%20inquiry%20%E2%80%94%20DJ%20SVG";

  const menu = (
    <div
      id="site-menu"
      className={`menu${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal={open ? true : undefined}
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="menu__top">
        <span className="mono">MENU / 06</span>
        <button
          ref={closeRef}
          type="button"
          className="menu__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <Close size={22} />
        </button>
      </div>

      <nav className="menu__nav" aria-label="Mobile">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="menu__link"
            onClick={() => go(item.id)}
          >
            <span className="mono">{item.index}</span>
            <span>{item.label}</span>
            <ArrowUpRight size={26} />
          </button>
        ))}
      </nav>

      <div className="menu__foot">
        <div>
          <span className="mono">BOOKING</span>
          <a href={`mailto:${artist.email}`}>{artist.email}</a>
        </div>
        <div className="menu__socials">
          <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={artist.soundcloud} target="_blank" rel="noopener noreferrer">
            SoundCloud
          </a>
        </div>
        <span className="mono menu__coords">{artist.coordinates}</span>
      </div>
    </div>
  );

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav__inner">
          <a
            className="nav__brand"
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("#hero");
            }}
            aria-label="DJ SVG — back to top"
          >
            <span className="nav__monogram" aria-hidden="true">
              SVG
            </span>
            <span className="nav__brand-meta mono">
              DJ / {artist.city.toUpperCase()}
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav__link${active === item.id ? " is-active" : ""}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(`#${item.id}`);
                }}
              >
                <span className="nav__link-index mono">{item.index}</span>
                {item.label}
                <span className="nav__link-dot" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <MarrakechClock />
            <a className="btn btn--nav" href={bookMail}>
              Book
              <ArrowUpRight size={14} />
            </a>
            <button
              ref={burgerRef}
              type="button"
              className={`nav__burger${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true">
          <ScrollProgress />
        </div>
      </header>

      {typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </>
  );
}

function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${value})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <span className="nav__progress-fill" ref={ref} />;
}
