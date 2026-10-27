"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scene } from "@/lib/scene-state";
import { useReducedMotion } from "@/lib/use-motion";
import SectionHead from "./SectionHead";

const W = 1200;
const H = 340;
const MID = 170;
const SAMPLES = 160;
const AMPLITUDE = 112;

type Shape = "sine" | "square" | "saw";

function buildWave(shape: Shape) {
  const points: string[] = [];
  for (let index = 0; index <= SAMPLES; index += 1) {
    const t = index / SAMPLES;
    const phase = t * Math.PI * 6;
    let value = 0;

    if (shape === "sine") {
      value = Math.sin(phase + 0.4);
    } else if (shape === "square") {
      value = Math.tanh(Math.sin(phase) * 7);
    } else {
      value = 2 * ((t * 3) % 1) - 1;
    }

    const taper = Math.pow(Math.sin(Math.PI * t), 0.3);
    const x = t * W;
    const y = MID - value * AMPLITUDE * taper;
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M ${points.join(" L ")}`;
}

const paths: Record<Shape, string> = {
  sine: buildWave("sine"),
  square: buildWave("square"),
  saw: buildWave("saw"),
};

const stages: Array<{ shape: Shape; label: string; note: string }> = [
  { shape: "sine", label: "SINE", note: "Open room" },
  { shape: "square", label: "SQUARE", note: "Peak hour" },
  { shape: "saw", label: "SAW", note: "After hours" },
];

export default function Signal() {
  const scope = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();
  const [amplitude, setAmplitude] = useState(58);

  useGSAP(
    () => {
      if (reduced) return;
      const section = scope.current;
      if (!section) return;

      const labels = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".signal__stage"),
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const path = pathRef.current;
        const glow = glowRef.current;
        const line = lineRef.current;
        const dot = dotRef.current;
        if (!path || !glow || !line || !dot) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=240%",
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scene.boost = self.progress;
            },
            onLeave: () => {
              scene.boost = 0;
            },
            onLeaveBack: () => {
              scene.boost = 0;
            },
          },
        });

        tl.to([path, glow], { attr: { d: paths.square }, duration: 0.55 }, 0.15)
          .to([path, glow], { attr: { d: paths.saw }, duration: 0.55 }, 1.15)
          .to(line, { attr: { x1: W, x2: W }, duration: 2 }, 0)
          .to(dot, { attr: { cx: W }, duration: 2 }, 0);

        if (labels[1] && labels[2] && labels[0]) {
          tl.to(labels[0], { autoAlpha: 0, y: -10, duration: 0.12 }, 0.35)
            .to(labels[1], { autoAlpha: 1, y: 0, duration: 0.12 }, 0.38)
            .to(labels[1], { autoAlpha: 0, y: -10, duration: 0.12 }, 1.4)
            .to(labels[2], { autoAlpha: 1, y: 0, duration: 0.12 }, 1.43);
        }

        return () => {
          scene.boost = 0;
          gsap.set([line, dot], { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="signal"
      data-section
      className="signal"
      ref={scope}
      aria-labelledby="signal-title"
    >
      <div className="signal__inner">
        <span className="signal__ghost" aria-hidden="true">
          SIGNAL
        </span>

        <div className="container signal__content">
          <SectionHead
            index="03"
            label="Signal"
            meta="Oscilloscope / Live vector"
          />

          <div className="signal__head">
            <h2 id="signal-title" className="display signal__title">
              Scalable
              <br />
              <em>vector</em> groove.
            </h2>
            <p className="signal__intro">
              Every set is a waveform — built live, never repeated. Here it is
              in three shapes. Move the amplitude. Read the signal.
            </p>
          </div>

          <div className="signal__scope">
            <div className="signal__scope-meta mono">
              <span>OSC 01</span>
              <span>0.00 — 1.00</span>
              <span>AMP / PHASE</span>
            </div>

            <svg
              className="signal__wave"
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              role="img"
              aria-label="A lime waveform inside a vector oscilloscope. On desktop it morphs through sine, square and sawtooth shapes as the page scrolls; the amplitude slider scales it."
            >
              <g className="signal__grid" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <line
                    key={`v-${index}`}
                    x1={(index / 8) * W}
                    y1={0}
                    x2={(index / 8) * W}
                    y2={H}
                  />
                ))}
                {[0, 1, 2, 3, 4].map((index) => (
                  <line
                    key={`h-${index}`}
                    x1={0}
                    y1={(index / 4) * H}
                    x2={W}
                    y2={(index / 4) * H}
                  />
                ))}
                <line x1={0} y1={MID} x2={W} y2={MID} className="is-axis" />
              </g>

              <g
                className="signal__wave-group"
                style={{ transform: `scaleY(${0.35 + amplitude / 100})` }}
              >
                <path
                  ref={glowRef}
                  d={paths.sine}
                  className="signal__path signal__path--glow"
                  aria-hidden="true"
                />
                <path
                  ref={pathRef}
                  d={paths.sine}
                  className="signal__path"
                />
              </g>

              <g className="signal__anchors" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <circle
                    key={index}
                    cx={(index / 8) * W}
                    cy={MID}
                    r={2.2}
                  />
                ))}
              </g>

              <line
                ref={lineRef}
                x1={0}
                y1={0}
                x2={0}
                y2={H}
                className="signal__playhead"
                aria-hidden="true"
              />
              <circle
                ref={dotRef}
                cx={0}
                cy={MID}
                r={4}
                className="signal__playhead-dot"
                aria-hidden="true"
              />
            </svg>

            <div className="signal__axis-labels mono" aria-hidden="true">
              <span>+1.0</span>
              <span>0.0</span>
              <span>−1.0</span>
              <span className="signal__axis-time">TIME →</span>
            </div>

            <div className="signal__stages" aria-hidden="true">
              {stages.map((stage, index) => (
                <div
                  key={stage.shape}
                  className={`signal__stage${index === 0 ? " is-first" : ""}`}
                >
                  <span className="mono">{stage.label}</span>
                  <strong>{stage.note}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="signal__controls">
            <label className="signal__amp" htmlFor="signal-amplitude">
              <span className="mono">Amplitude</span>
              <input
                id="signal-amplitude"
                type="range"
                min={0}
                max={100}
                value={amplitude}
                onChange={(event) => setAmplitude(Number(event.target.value))}
                aria-valuetext={`${amplitude} percent`}
              />
              <span className="mono signal__amp-value">{amplitude}</span>
            </label>

            <div className="signal__legend mono">
              <span>
                <i className="dot" aria-hidden="true" /> Vector waveform
              </span>
              <span>Node spacing / 160</span>
              <span>Marrakech — MA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
