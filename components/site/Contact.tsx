"use client";

import { useRef, useState, type FormEvent } from "react";
import { artist } from "@/lib/data/artist";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import SectionHead from "./SectionHead";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Instagram,
  Mail,
  Phone,
  Pin,
  SoundCloud,
} from "@/components/ui/Icons";

type Fields = {
  name: string;
  email: string;
  eventType: string;
  date: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = {
  name: "",
  email: "",
  eventType: "",
  date: "",
  message: "",
};

const eventTypes = [
  "Club night",
  "Festival",
  "Private event",
  "Brand / corporate",
  "Other",
];

export default function Contact() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "draft">("idle");
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollTo } = useSmoothScroll();

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    if (status === "draft") {
      setStatus("idle");
      setDraftHref(null);
    }
  };

  const validate = () => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!fields.eventType) next.eventType = "Choose an event type.";
    if (fields.message.trim().length < 10) {
      next.message = "Add a little detail — at least 10 characters.";
    }
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const keys = Object.keys(next) as Array<keyof Fields>;
    if (keys.length) {
      setStatus("idle");
      setDraftHref(null);
      const target = formRef.current?.querySelector<HTMLElement>(
        `[name="${keys[0]}"]`,
      );
      target?.focus();
      return;
    }

    const subject = `Booking inquiry — ${fields.eventType}`;
    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Event type: ${fields.eventType}`,
      `Date: ${fields.date || "Not confirmed"}`,
      "",
      fields.message,
    ].join("\n");

    const mailto = `mailto:${artist.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setDraftHref(mailto);
    window.location.href = mailto;
    setStatus("draft");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(artist.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${artist.email}`;
    }
  };

  return (
    <section
      id="booking"
      data-section
      className="section booking"
      aria-labelledby="booking-title"
    >
      <div className="container">
        <SectionHead index="06" label="Booking" meta="Worldwide / Direct" />

        <div className="booking__head">
          <h2 id="booking-title" className="display booking__title">
            <span data-line>
              <span className="line__inner">Make some</span>
            </span>
            <span data-line>
              <span className="line__inner">
                <em>noise.</em>
              </span>
            </span>
          </h2>
          <p className="booking__lede" data-reveal>
            Tell me the room, the date and the crowd. Bookings, collaborations
            and everything in between — straight to the inbox.
          </p>
        </div>

        <div className="booking__grid">
          <noscript>
            <p className="booking__noscript mono">
              The interactive form needs JavaScript. Email{" "}
              <a href={`mailto:${artist.email}`}>{artist.email}</a> or call{" "}
              <a href={artist.phoneHref}>{artist.phone}</a> directly.
            </p>
          </noscript>

          <form
            ref={formRef}
            className="booking__form"
            onSubmit={submit}
            noValidate
            aria-label="Booking inquiry"
          >
            <div className="field">
              <label htmlFor="booking-name" className="mono">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                autoComplete="name"
                value={fields.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "error-name" : undefined}
                placeholder="Your name"
                required
              />
              {errors.name ? (
                <span className="field__error" id="error-name">
                  {errors.name}
                </span>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="booking-email" className="mono">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "error-email" : undefined}
                placeholder="you@venue.com"
                required
              />
              {errors.email ? (
                <span className="field__error" id="error-email">
                  {errors.email}
                </span>
              ) : null}
            </div>

            <div className="field field--row">
              <div>
                <label htmlFor="booking-type" className="mono">
                  Event type <span aria-hidden="true">*</span>
                </label>
                <select
                  id="booking-type"
                  name="eventType"
                  value={fields.eventType}
                  onChange={(event) => update("eventType", event.target.value)}
                  aria-invalid={Boolean(errors.eventType)}
                  aria-describedby={
                    errors.eventType ? "error-eventType" : undefined
                  }
                  required
                >
                  <option value="">Select one</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.eventType ? (
                  <span className="field__error" id="error-eventType">
                    {errors.eventType}
                  </span>
                ) : null}
              </div>

              <div>
                <label htmlFor="booking-date" className="mono">
                  Date <span className="field__optional">(optional)</span>
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  value={fields.date}
                  onChange={(event) => update("date", event.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="booking-message" className="mono">
                Brief <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="booking-message"
                name="message"
                rows={4}
                value={fields.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "error-message" : undefined
                }
                placeholder="Venue, city, set length, sound system…"
                required
              />
              {errors.message ? (
                <span className="field__error" id="error-message">
                  {errors.message}
                </span>
              ) : null}
            </div>

            <div className="booking__actions">
              <button type="submit" className="btn btn--primary">
                Open email draft
                <ArrowRight size={17} />
              </button>
              <p className="mono booking__form-note">
                This form opens your email app. Nothing is stored or sent by
                this site.
              </p>
            </div>

            {status === "draft" && draftHref ? (
              <p className="booking__status" role="status">
                Your email app should open with the details ready. If it
                doesn&apos;t, write to{" "}
                <a href={draftHref}>{artist.email}</a>.
              </p>
            ) : null}
          </form>

          <aside className="booking__details" aria-label="Contact details">
            <div className="booking__detail">
              <span className="mono">Email</span>
              <a href={`mailto:${artist.email}`} className="booking__detail-main">
                {artist.email}
                <ArrowUpRight size={16} />
              </a>
              <button type="button" className="booking__copy mono" onClick={copyEmail}>
                <Copy size={13} />
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>

            <div className="booking__detail">
              <span className="mono">Phone</span>
              <a href={artist.phoneHref} className="booking__detail-main">
                {artist.phone}
                <Phone size={15} />
              </a>
            </div>

            <div className="booking__detail">
              <span className="mono">Based in</span>
              <p className="booking__detail-main">
                {artist.city}, {artist.country}
                <Pin size={15} />
              </p>
              <p className="mono booking__detail-note">
                {artist.coordinates} — available worldwide
              </p>
            </div>

            <div className="booking__socials">
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={16} />
                Instagram
                <ArrowUpRight size={13} />
              </a>
              <a
                href={artist.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SoundCloud size={16} />
                SoundCloud
                <ArrowUpRight size={13} />
              </a>
              <button
                type="button"
                className="booking__backtop"
                onClick={() => scrollTo("#hero")}
              >
                <ArrowRight size={15} />
                Back to top
              </button>
            </div>

            <div className="booking__vcard">
              <Mail size={16} />
              <p>
                Prefer a reference? Send a link to a recent mix in the email —
                a set that shows where you want the night to go.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
