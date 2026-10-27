import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata = { title: "Signal lost — DJ SVG" };

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="container notfound__grid">
        <div className="notfound__bar notfound__bar--top mono">
          <span>SVG / Error</span>
          <span>MARRAKECH — 31.6295° N</span>
        </div>

        <div className="notfound__body">
          <p className="mono notfound__eyebrow">
            <i className="dot" aria-hidden="true" />
            No signal
          </p>
          <h1 className="display notfound__title">
            Dead <em>air.</em>
          </h1>
          <p className="notfound__copy">
            This frequency doesn&apos;t exist. Take the route back to the
            signal.
          </p>
          <Link className="btn btn--primary" href="/">
            Back to the signal
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="notfound__bar notfound__bar--bottom mono">
          <span>Error 404</span>
          <span>Transmissions 01—06</span>
        </div>
      </div>
    </main>
  );
}
