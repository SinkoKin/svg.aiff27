"use client";

import { artist, tracks } from "@/lib/data/artist";
import SectionHead from "./SectionHead";
import { ArrowUpRight, Play } from "@/components/ui/Icons";

export default function Sound() {
  return (
    <section
      id="sound"
      data-section
      className="section sound"
      aria-labelledby="sound-title"
    >
      <div className="container">
        <SectionHead index="02" label="Sound" meta="Two transmissions / SoundCloud" />

        <div className="sound__grid">
          <div className="sound__intro">
            <h2 id="sound-title" className="display sound__title">
              <span data-line>
                <span className="line__inner">No fixed</span>
              </span>
              <span data-line>
                <span className="line__inner">
                  <em>frequency.</em>
                </span>
              </span>
            </h2>

            <p className="sound__lede" data-reveal>
              House grooves, techno pressure, hip hop cadence and deep house
              air. The set moves — the room follows. Two transmissions are
              live on SoundCloud.
            </p>

            <a
              className="btn btn--ghost sound__cta"
              href={artist.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
            >
              <Play size={15} />
              All tracks on SoundCloud
              <ArrowUpRight size={14} />
            </a>

            <div className="sound__services" data-reveal>
              <span className="mono sound__services-label">
                Also available for
              </span>
              <ul>
                {artist.services.map((service, index) => (
                  <li key={service.label}>
                    <span className="mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="sound__service-name">{service.label}</span>
                    <span className="sound__service-note">{service.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sound__tracks" aria-label="Selected tracks">
            {tracks.map((track, index) => (
              <article className="track" key={track.id} data-reveal>
                <div className="track__top">
                  <span className="mono track__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="track__id">
                    <h3 className="track__title" lang={index === 0 ? "ar" : undefined}>
                      {track.title}
                    </h3>
                    <p className="mono track__meta">
                      {track.latin}
                      <span> — {track.credit}</span>
                    </p>
                  </div>
                  <a
                    className="track__link"
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${track.title} on SoundCloud`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className="track__player">
                  <span className="track__player-label mono">
                    Player {String(index + 1).padStart(2, "0")} / SoundCloud
                  </span>
                  <iframe
                    title={`${track.latin} by SVG — SoundCloud player`}
                    width="100%"
                    height={120}
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    src={track.embedUrl}
                    className="track__iframe"
                  />
                  <span className="track__corner track__corner--tl" aria-hidden="true" />
                  <span className="track__corner track__corner--tr" aria-hidden="true" />
                  <span className="track__corner track__corner--bl" aria-hidden="true" />
                  <span className="track__corner track__corner--br" aria-hidden="true" />
                </div>
              </article>
            ))}

            <p className="sound__note mono" data-reveal>
              Playback is handled by SoundCloud. No autoplay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
