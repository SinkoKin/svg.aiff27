# DJ SVG — Scalable Vector Groove

A single-page portfolio for **DJ SVG** (Ilyas Naim), a house and techno DJ based in Marrakech. The build is a Next.js application with a continuous WebGL scene, scroll-scrubbed motion, an editorial type system, and a designed fallback for devices without dependable WebGL.

The concept is **SVG as a signal**: the artist's initials and the vector format become a technical drawing sheet crossed with a record sleeve. A liquid-chrome “signal disc” — part vinyl, part speaker membrane — is the identity object and changes state as the page moves.

> This repository contains the implementation, not a deployed URL. Set `NEXT_PUBLIC_SITE_URL` (below) before publishing.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4 App Router, React 19.3, TypeScript |
| 3D | Three.js 0.186, `@react-three/fiber` 9, `@react-three/drei` 10 |
| Motion | GSAP 3.15 + ScrollTrigger + `@gsap/react`; Lenis driven by the GSAP ticker |
| Styling | Hand-authored CSS, custom properties, no Tailwind or component library |
| Type | Self-hosted Anybody, Instrument Serif, Instrument Sans, Space Mono (WOFF2) |
| Media | Optimised WebP photography; official SoundCloud embeds |

## Run locally

Requires **Node 20.9+**.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript
npm run build       # production build
npm run start       # serve the production build
```

## Configuration and deployment

The only environment variable is the public origin used for canonical and social metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`metadataBase`, the canonical URL, Open Graph and X/Twitter images all derive from it. On Vercel the build automatically uses the deployment's domain, preferring `VERCEL_PROJECT_PRODUCTION_URL` (the stable production domain) and then `VERCEL_URL`; locally it falls back to `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` when you want to force a custom domain — the value is read at build time, so rebuild after changing it. See `.env.example`.

### Deploying to Vercel

Import the repository and use the default Next.js settings:

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Node.js:** 20.9 or newer
- **Environment:** set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` for a custom domain (optional for the default `*.vercel.app` URL, which is detected automatically)

There are no API routes, databases, or server-side secrets to configure.

The project produces a standard Next.js server build (`next start`) — no static export is configured. It has no API routes, database, or server-side form handler; the SoundCloud embeds require the visitor's network.

## What is on the page

1. **Preloader** — stroke-drawn mark, counter, skip control; remembers the intro for the session and respects reduced motion.
2. **Navigation** — fixed index, active-section tracking, local Marrakech clock, mobile overlay with focus trap and body-scroll lock.
3. **Hero** — the WebGL signal disc, masked “SVG” wordmark, artist positioning, booking and SoundCloud actions.
4. **Artist** — artist-supplied biography, portrait, verified facts, genres and services.
5. **Sound** — two real SoundCloud tracks embedded with the official player (no autoplay), plus a direct profile link.
6. **Signal** — a pinned, scroll-scrubbed SVG oscilloscope: sine → square → saw, playhead, amplitude control, technical annotations.
7. **Archive** — asymmetric photo grid of the artist's supplied images, with hover captions and a keyboard-accessible lightbox (portal + `inert` background).
8. **Live** — the confirmed archive names (Momento, Lkhayal, Sobbyss), explicitly labelled as archive work; no invented future dates.
9. **Booking** — a client-validated form that composes a prefilled `mailto:` draft. The site never stores or sends the message; the copy says so.
10. **Footer** — contact repeats, social links, identity mark.
11. **404** — a branded “Dead air.” page with a direct route home.

## Motion and 3D system

- **One shared canvas.** A fixed, `aria-hidden` WebGL layer sits behind the page. Sections register GSAP ScrollTriggers that tween a single mutable scene object (`lib/scene-state.ts`). `useFrame` smooths the camera, disc position, rotation, scale and deformation. There is no per-frame React state.
- **Acts.** Hero, artist, sound, signal, archive, live and booking each have a camera/disc preset. The Signal section additionally drives the disc's boost/deformation from its pinned scroll timeline, synchronised with the SVG waveform.
- **Signal disc.** A custom vertex/fragment shader on a high-segment plane: concentric ripples, directional waves, value noise, analytic normals, chrome-like highlights, grooves, Fresnel rim and a fine grain. A thin orbit ring and deterministic shader particles complete the scene.
- **Pointer parallax.** A single passive pointer listener updates a shared vector; the render loop lerps toward it. Touch devices skip the listener.
- **Scroll.** Lenis is driven by `gsap.ticker`; ScrollTrigger refreshes after layout/fonts settle. Reduced motion disables Lenis and pinning, freezes idle motion, and leaves content in its final layout.
- **No post-processing.** The look is achieved with shader shading, lights and CSS grain/vignette rather than a post stack.

### Performance and resilience

- Canvas DPR is capped at **1.7 desktop / 1.35 mobile**, with an adaptive drop to **1** if the first 100 frames average slower than ~28 ms.
- Geometry: **200 / 96** disc segments; particles: **620 / 170**; no shadows, no post-processing.
- The 3D scene is dynamically imported with `ssr: false`; the SVG fallback is visible while the canvas initialises and fades out on `onCreated`.
- WebGL is feature-detected before mounting the canvas. Context errors are caught by an error boundary. Both paths render a designed static signal disc, not an empty hole.
- Images are local WebP assets with explicit dimensions; fonts are self-hosted and preloaded; third-party requests are limited to the two SoundCloud iframes.
- `prefers-reduced-motion` is handled at the component level, not only in CSS.
- Without JavaScript, the preloader is hidden by a `<noscript>` rule, all editorial content remains visible, the static SVG hero is shown, and the booking form is replaced by a direct email/phone note.

### Accessibility

Skip link; semantic landmarks and headings; visible focus styles; descriptive alt text; labelled amplitude slider; keyboard-operable lightbox with Escape, focus handling, portaled overlay and `inert` page background; mobile menu focus trap and scroll lock; form labels, `aria-invalid`, inline errors and a status that describes what actually happened; no autoplaying audio.

## Content and asset provenance

Artist facts, tracks, gallery images, archive entries and navigation live in [`lib/data/artist.ts`](lib/data/artist.ts) so factual content can be edited in one place; section-specific editorial copy sits with its component.

- **Verified from the reference site** (`https://svgwav.netlify.app/`): name, real name, Marrakech base, contact email/phone, Instagram and SoundCloud profiles, the three biography paragraphs, genres/services, the “8 years in the booth” claim, and the archive names Momento, Lkhayal and Sobbyss. The site now uses the artist-supplied current Instagram profile, `https://www.instagram.com/_svg.aiff27`.
- **Tracks:** “المغرب 39-365” and “Audiomancers Imagine (SVG & Xanaks)” were verified as public tracks on the artist's SoundCloud profile and are embedded with SoundCloud's official player. No release dates are asserted.
- **Events:** no upcoming dates or unverified venues are presented. The Live section is an archive, not a calendar.
- **Photography:** the ten images in `public/media` were retrieved from the artist's public reference site and optimised locally. They are artist-supplied material; confirm the artist's permission/licence before commercial publication. No external hotlinks are used.
- **Fonts:** Anybody, Instrument Serif, Instrument Sans and Space Mono are self-hosted from their Google Fonts distributions (SIL Open Font License).
- The full audit, confirmed-vs-assumed content and reference limitations are in [`docs/reference-audit.md`](docs/reference-audit.md). The design/implementation rationale is in [`docs/implementation-plan.md`](docs/implementation-plan.md).

## Verification performed

- `npm run lint` — clean.
- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds; `/` and `/icon.svg` are statically generated.
- Production `next start` smoke test — metadata, canonical, OG image, icon, fonts and media return 200; unknown routes render the branded 404 with a 404 status; no failed asset requests.
- Playwright passes at **1440×900, 1280×800, 768×1024 and 390×844**: preloader, hero reveal, canvas readiness, nav anchors, mobile menu open/close/focus lock, archive lightbox and `inert` handling, form validation, and no horizontal overflow.
- Emulated **reduced motion**, **WebGL-unavailable fallback**, and **JavaScript-disabled** rendering all checked visually and in the DOM.
- Console is clean apart from R3F's upstream `THREE.Clock` deprecation warning. Headless SwiftShader can initialise WebGL more slowly than hardware; the static fallback is intentional and remains visible until the canvas is ready.

Screenshots from the audit are in `.qa/` locally and are git-ignored.

## Known limitations / inputs still needed

- Confirm the artist's permission for the reused photography before a public launch.
- Set `NEXT_PUBLIC_SITE_URL` only when deploying to a custom domain; Vercel's own domain is detected automatically.
- The booking flow depends on the visitor's email client; there is no server-side delivery or CRM integration.
- SoundCloud embeds are third-party iframes and may be unavailable or blocked by privacy tooling; direct profile and track links remain.
- The artist's SoundCloud profile also surfaced the handle `svg.wave27`; the site keeps the profile link verified in the reference (`ilyas-naim-852221500`). Confirm the preferred handle if it changes.
- The “eight years” positioning is artist-supplied copy from the reference, not independently verified.
- The footer year is static (2026) because the page is prerendered rather than reading the clock at request time.
- WebGL users get the full scene; fallback users get a static SVG composition without pointer/scroll 3D.

## Project map

```
app/
  layout.tsx        metadata, fonts, JSON-LD, no-JS styles
  page.tsx          static entry
  not-found.tsx     branded 404
  globals.css       design tokens, layout, motion, responsive rules
  icon.svg
components/
  site/             preloader, nav, sections, lightbox, form
  three/            canvas lifecycle, scene, shader disc, particles, fallbacks
  providers/        Lenis + GSAP scroll provider
  ui/Icons.tsx      inline icon set
lib/
  data/artist.ts    all editable content
  scene-state.ts    shared mutable scene state + act presets
  use-motion.ts     reduced-motion / media-query hooks
  gsap.ts           plugin registration
scripts/
  make-og.cjs       regenerates public/og.jpg with sharp (`node scripts/make-og.cjs`)
docs/
  reference-audit.md
  implementation-plan.md
```
