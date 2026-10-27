# Implementation Plan — DJ SVG / “Scalable Vector Groove”

## 1. Concept

A single-page artist experience built around one idea: **the DJ is a signal**. The name `SVG` is both the artist's initials and the vector format, so the site is art-directed like a vector drawing sheet crossed with a record sleeve:

- technical rulers, coordinates, node marks and mono annotations;
- oversized editorial typography;
- cinematic, low-light photography;
- one continuous WebGL object — a **liquid chrome signal disc** (vinyl record / speaker membrane) — that changes state as the page unfolds.

The disc is the visual identity, not a decoration. Every section changes its geometry, position or light so the page reads as one continuous transmission.

## 2. Stack

- Next.js App Router + React + TypeScript
- Three.js via `@react-three/fiber`, `@react-three/drei`
- GSAP + ScrollTrigger + `@gsap/react`
- Lenis, driven by the GSAP ticker (disabled for reduced motion)
- Hand-authored CSS (tokens, grid, type scale); no component library
- Self-hosted variable fonts

## 3. Design tokens

| Token | Value | Role |
|---|---|---|
| `--ink` | `#060606` | base |
| `--ink-2` | `#0C0C0B` | raised surface |
| `--bone` | `#F2EEE3` | primary type |
| `--ash` | `#928D82` | secondary type |
| `--lime` | `#D9FF3F` | signal accent |
| `--ember` | `#FF4B22` | heat, used sparingly |
| `--line` | `rgba(242,238,227,0.14)` | hairlines |

Type roles:
- **Display:** Anybody variable (wdth 125, wght 800) — wide, mechanical, poster-scale.
- **Editorial contrast:** Instrument Serif Italic — used only for one or two words per section.
- **Body:** Instrument Sans.
- **Data / labels:** Space Mono, uppercase, letterspaced.

Layout: 12-column hairline grid, max width 1680px, fluid gutters, section padding `clamp(88px, 12vw, 180px)`.

Signature elements:
1. The WebGL signal disc.
2. A scroll-scrubbed SVG waveform with visible anchor nodes in the pinned `Signal` section.
3. Coordinate/ruler annotations around the hero and section labels.

## 4. Page architecture

`app/page.tsx` (server) renders `<Site />` (client shell) and metadata.

```
components/
  site/
    Preloader.tsx        wordmark draw, counter, skip, reduced motion
    Navigation.tsx       fixed nav, section observer, mobile overlay, local time
    Hero.tsx             masked title, meta, CTAs, scroll cue
    Marquee.tsx          scroll-velocity ticker
    Artist.tsx           bio, portrait parallax, facts, genres
    Sound.tsx            sound/disciplines, animated waveform link, SoundCloud CTA
    Signal.tsx           pinned SVG waveform laboratory
    Archive.tsx          asymmetric photo grid + accessible lightbox
    Live.tsx             archive transmission list + booking prompt
    Contact.tsx          mailto booking form, details, socials
    Footer.tsx
    Site.tsx             composition + shared section observers
  providers/
    SmoothScrollProvider.tsx  Lenis driven by the GSAP ticker
  three/
    ExperienceCanvas.tsx dynamic, client-only canvas wrapper
    Scene.tsx            camera rig + lights + objects
    SignalDisc.tsx       procedural shader membrane
    Particles.tsx        instanced/shader points
    WebGLBoundary.tsx    error boundary + fallback
    WebGLFallback.tsx    static SVG fallback
lib/
  data/artist.ts         all content in one editable file
  scene-state.ts         mutable animation state + act presets
  use-motion.ts          reduced-motion / media-query hooks
  gsap.ts                plugin registration
```

## 5. 3D direction

**Object:** a large disc built from a 220×220 plane with a circular membrane shader. Vertex displacement combines concentric ripples, directional waves and value noise; normals are derived analytically. Fragment shading fakes a dark chrome environment with two coloured area highlights (lime and ember), Fresnel rim, concentric groove lines, radial centre cap and film grain. Thin lime orbit ring + sparse dust particles complete the scene.

**Acts** (GSAP-tweened plain object → smoothed in `useFrame`):

| Act | Camera | Disc | Motion |
|---|---|---|---|
| hero | close, low | right, tilted | slow idle rotation, low amplitude |
| artist | pulled back | left/up, smaller | calm |
| sound | side | right, more edge-on | stronger ripples |
| signal | frontal, closer | centred, large | maximum deformation, scrubbed by scroll |
| archive | far | pushed off-frame | minimal, low opacity |
| live | pulled back | left edge | medium |
| contact | distant | centre, small | ring resolves |

Each section registers a ScrollTrigger that calls `setAct()`; `Signal` additionally scrubs deformation with its pinned scroll timeline. Pointer parallax is smoothed in `useFrame` with lerp. No React state per frame.

**Quality:** DPR capped at 1.7 (desktop) / 1.35 (mobile), 200 / 96 segments, 620 / 170 particles, no post-processing, no shadows, adaptive DPR if measured FPS is poor. `prefers-reduced-motion` freezes idle motion and removes pinning. WebGL failure → designed SVG/CSS disc fallback with the same composition.

## 6. Motion system

1. Preloader: stroke-draw monogram + 0–100 counter + curtain lift.
2. Hero: mask-reveal lines, staggered metadata, image-free type over the 3D scene, scroll cue pulse.
3. Nav: hide-on-scroll-down, active section dot, mobile overlay transition.
4. Marquee: infinite loop with scroll-velocity skew.
5. Section reveals: `clip-path`/`y` line masks, hairline draw-ins.
6. Artist: portrait parallax, staggered bio lines.
7. Sound: waveform path draw + hover frequency modulation.
8. Signal: pinned 300vh scrub — waveform morph, playhead travel, counter, annotation draw.
9. Archive: image clip reveals, per-item parallax, custom hover caption, lightbox.
10. Live: row stagger + floating image preview on hover.
11. Contact: oversized type reveal; form validation states.
12. Footer: monogram draw, live local time.

All ScrollTriggers are created inside `gsap.context()` and reverted on unmount; `ScrollTrigger.refresh()` after fonts/images settle.

## 7. Content rules

- Reuse only verified copy/contact links from the reference.
- No invented releases, dates, venues, press quotes, or stats.
- Archive events labeled as archive; no future calendar implied.
- Two verified public SoundCloud tracks use the official embed; no autoplay and no invented releases.
- Booking form generates a real prefilled email draft; success message states that plainly.
- Every image has descriptive alt text and documented provenance.

## 8. Responsive strategy

- Mobile-first CSS with breakpoints at 560, 900, 1200, 1600.
- Display type uses `clamp()` with separate mobile compositions (stacked hero, reduced ruler detail).
- Mobile nav: full-screen overlay, focus management, Escape, body scroll lock.
- 3D: fewer segments/particles, smaller disc, reduced pointer influence; pinned Signal becomes a static annotated graphic.
- Gallery becomes a single-column rhythm with no hover dependency; lightbox is swipe-agnostic and keyboard operable.

## 9. Verification

- Playwright: load, preloader exit, hero/canvas presence, nav anchors, mobile menu, lightbox open/close, form validation, reduced-motion emulation, WebGL-failure fallback (blocked canvas context), console/network errors.
- Screenshots at 1440×900, 1280×800, 390×844 and 768×1024.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`, production server smoke test.
- Manual pass for focus order, contrast, keyboard trap avoidance and scroll restoration.
