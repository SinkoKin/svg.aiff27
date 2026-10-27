import SectionHead from "./SectionHead";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function Live() {
  return (
    <section
      id="live"
      data-section
      className="section live"
      aria-labelledby="live-title"
    >
      <div className="container">
        <SectionHead
          index="05"
          label="Upcoming event"
          meta="Details / Instagram"
        />

        <div className="live__grid">
          <div className="live__head">
            <h2 id="live-title" className="display live__title">
              <span data-line>
                <span className="line__inner">On the</span>
              </span>
              <span data-line>
                <span className="line__inner">
                  <em className="live__serif">horizon.</em>
                </span>
              </span>
            </h2>
            <p className="live__intro" data-reveal>
              A new gathering is on the way. Follow Subschematic Collective
              for event details and announcements.
            </p>
          </div>

          <div className="live__event-wrap">
            <article className="live__event" data-reveal>
              <span className="mono live__event-label">
                Upcoming / Event
              </span>
              <h3 className="live__event-name">Subschematic Collective</h3>
              <p className="live__event-note">
                Follow the collective for event details and updates.
              </p>
              <a
                className="live__event-link"
                href="https://www.instagram.com/subschematic.collective?cplk=MWE3MTljNHIyNWVrZA=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Instagram
                <ArrowUpRight size={17} />
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
