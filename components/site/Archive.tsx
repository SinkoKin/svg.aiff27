"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gallery } from "@/lib/data/artist";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import SectionHead from "./SectionHead";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from "@/components/ui/Icons";

export default function Archive() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const { stop, start } = useSmoothScroll();

  const openAt = useCallback((next: number, trigger: HTMLElement) => {
    lastFocus.current = trigger;
    setIndex(next);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);

  const step = useCallback((direction: number) => {
    setIndex((current) => {
      if (current === null) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const page = document.querySelector<HTMLElement>(".page");
    stop();
    page?.setAttribute("inert", "");
    document.documentElement.classList.add("is-locked");
    closeRef.current?.focus();

    return () => {
      page?.removeAttribute("inert");
      start();
      document.documentElement.classList.remove("is-locked");
    };
  }, [open, start, stop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Tab") {
        const root = document.querySelector<HTMLElement>(".lightbox");
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  const item = index !== null ? gallery[index] : null;

  const viewer = item ? (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Archive image viewer"
      aria-describedby="lightbox-caption"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="lightbox__bar">
        <span className="mono">
          {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
          {String(gallery.length).padStart(2, "0")}
        </span>
        <span className="mono lightbox__meta">Archive — Marrakech</span>
        <button
          ref={closeRef}
          type="button"
          className="lightbox__close"
          onClick={close}
          aria-label="Close image viewer"
        >
          <Close size={20} />
        </button>
      </div>

      <div className="lightbox__stage">
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={() => step(-1)}
          aria-label="Previous image"
        >
          <ArrowLeft size={22} />
        </button>

        <figure className="lightbox__figure">
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width: 900px) 92vw, 76vw"
            className="lightbox__img"
            priority
          />
          <figcaption id="lightbox-caption" className="lightbox__caption">
            <span>{item.caption}</span>
            <span className="mono">{item.meta}</span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={() => step(1)}
          aria-label="Next image"
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  ) : null;

  return (
    <section
      id="archive"
      data-section
      className="section archive"
      aria-labelledby="archive-title"
    >
      <div className="container">
        <SectionHead index="04" label="Archive" meta="Low light / Selected frames" />

        <div className="archive__head">
          <h2 id="archive-title" className="display archive__title">
            <span data-line>
              <span className="line__inner">Nights in</span>
            </span>
            <span data-line>
              <span className="line__inner">
                low <em>light.</em>
              </span>
            </span>
          </h2>
          <p className="archive__intro" data-reveal>
            Booth studies, dancefloor heat, and the occasional still frame.
            Eight nights from the archive.
          </p>
        </div>

        <div className="archive__grid">
          {gallery.map((entry, entryIndex) => (
            <figure
              className={`archive__item archive__item--${entryIndex + 1}`}
              key={entry.id}
              data-reveal
            >
              <button
                type="button"
                className="archive__button"
                onClick={(event) => openAt(entryIndex, event.currentTarget)}
                aria-label={`Open image: ${entry.alt}`}
              >
                <span className="archive__image">
                  <Image
                    src={entry.src}
                    alt={entry.alt}
                    fill
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 48vw, 40vw"
                    className="archive__img"
                    loading={entryIndex < 2 ? "eager" : "lazy"}
                  />
                </span>
                <span className="archive__hover mono" aria-hidden="true">
                  View frame
                  <ArrowUpRight size={14} />
                </span>
              </button>
              <figcaption className="archive__caption">
                <span>{entry.caption}</span>
                <span className="mono">{entry.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {viewer && typeof document !== "undefined"
        ? createPortal(viewer, document.body)
        : null}
    </section>
  );
}
