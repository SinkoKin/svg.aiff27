# Reference Audit — svgwav.netlify.app

Audit date: 2026-10-21
Method: rendered inspection with Playwright (desktop 1440×900, mobile 390×844), bundled CSS/JS inspection, and direct retrieval of public media assets listed below. The reference is a client-rendered React SPA, so all copy was extracted from the rendered page and cross-checked against the minified bundle.

---

## 1. Confirmed content

### Identity
- Site title: `DJ SVG | Portfolio`
- Meta description: `DJ SVG - Creative DJ with 8 years of experience`
- Manifest: `DJ SVG Portfolio`; theme/background `#121212`
- Artist name: **DJ SVG** — real name **Ilyas Naim**
- Base: **Marrakech, Morocco**
- Experience: **8 years behind the decks**; musical journey began **2017**
- Booking positioning: **Available for worldwide bookings**
- Hero tagline: “Creative DJ with 8 years of experience, obsessed with music and art”

### Contact (verified on reference)
- Email: `Ilyass.svg@hotmail.com`
- Phone: `+212 656-462509`
- Location: `Marrakech, Morocco`
- Instagram (artist): `https://www.instagram.com/_svg.27/` — the reference's link at audit time. Current public profile supplied for the site: `https://www.instagram.com/_svg.aiff27`.
- SoundCloud: `https://soundcloud.com/ilyas-naim-852221500`
- Site credit: “Created by @yovsses” → `https://www.instagram.com/yovsses/`
- Footer: `© 2025 Copyright SVG Music`

### Biography (verbatim from reference)
> SVG's musical odyssey began in 2017, when he discovered that music would be an integral part of his life. With a profound passion for house grooves and electronic dance music, he fully committed himself to crafting immersive soundscapes and unforgettable rhythms.

> With 8 years of experience behind the decks, DJ SVG (Ilyas Naim) has established himself as a versatile and creative force in the music scene. Passionate about creating unique sonic experiences, he blends various genres seamlessly into his sets, ensuring every performance is unforgettable.

> Beyond DJing, SVG is dedicated to pushing the boundaries of music and visual art, constantly exploring new technologies and techniques to enhance the audience experience.

### Genres / disciplines (verbatim tags)
Hip Hop · House · Techno · EDM · Deep House · Event Production · Sound Engineering · Music Production

### Calls to action
- “Book Now” (scrolls to contact / opens `mailto:Ilyass.svg@hotmail.com?subject=Booking Inquiry`)
- “Listen on SoundCloud”
- “Follow on Social Media”

### Gallery
Section title “Media Gallery”, tabs “Photos” / “Performance Videos”. Four video entries were present with the following titles (some descriptions reference unverifiable venues — see Content issues):
- “Echoes of Abys — Epic Festival Performance”
- “After Hours — Club Mix”
- “Sunrise Sessions — Live Set”
- “Urban Beats — Live Event”

Photo alt text confirms event names **Momento**, **Lkhayal**, and **Sobbyss**, plus generic performance/portrait shots.

---

## 2. Page structure

Confirmed order of the single-page site:

1. Fixed navigation — logo `DJ SVG`, links Home / About / Gallery / Contact
2. Hero — name, tagline, Book Now, Listen on SoundCloud, three social icons, “Scroll down”
3. About — three-paragraph biography, portrait, eight genre/service tags
4. Media Gallery — Photos and Performance Videos, four video entries
5. Contact — email, phone, location, “Book Now”, “Follow on Social Media”
6. Footer — copyright and credit

There is **no dedicated Music/Releases section and no Events section** on the reference, despite the artist being a DJ. This is the largest content gap and is addressed in the new build with honest, non-fabricated content.

---

## 3. Visual design system (confirmed)

| Token | Reference value |
|---|---|
| Page background | `#050505` (body override), `#121212` app background |
| Primary type | Montserrat 300–700 (Google Fonts) |
| Accent gradient | `#ff4d4d` → `#f9cb28` (red-orange to amber) |
| Accent flat | `#ff4d4d` |
| Text | White; secondary `rgba(255,255,255,.7)` |
| Icon set | Font Awesome 6.4 (CDN) |
| Shape language | Fully rounded pills, circular social buttons, large circular 3D forms |
| Imagery | Starfield background, floating glossy blobs, dark red speaker-cone close-up, DJ photography |
| Motion | Framer Motion entrances (opacity/y), hover scale, a Three.js scene with floating 3D objects and star particles |
| Layout | Centered, single column; very wide empty space; minimal grid discipline |

Responsive: custom root-font-size media queries per device class, hamburger menu below desktop, `44px` minimum touch targets, video grid collapses to a single column.

---

## 4. Animation references

- Full-viewport Three.js starfield with floating low-poly glossy shapes.
- Hero content fades/translates in; primary pill has a warm gradient.
- “Book Now” smooth-scrolls to contact.
- Section headings use Framer Motion `opacity/y` entrances.
- Social buttons lift on hover; cards scale slightly.
- Video items open an in-page player.
- No scroll-scrubbed storytelling, no pinned sequences, no reduced-motion handling was observed.

---

## 5. Asset inventory (retrieved from public build)

Photography:
- `dj profile picture` (portrait, outdoor)
- `picture 1` — DJ booth, braids, profile
- `picture2` — portrait, dark green bomber, sunglasses
- `picture3` — headphones / booth, editorial
- `picture4` — orange-lit DJ performance (cinematic)
- `image1`, `image2` — red/purple club performance
- `momento_disco` — Pioneer CDJ performance
- `lkhayal` — outdoor event/portrait
- `image_sobbyss` — event crowd/portrait

Video:
- `Echoes of Abys` (699 KB)
- `afterx` (3.1 MB)
- `video32` (475 KB)
- `event2` (18.4 MB)

All were published openly by the site. The new build reuses the photography as supplied artist material, optimized locally. No external hotlinks.

---

## 6. Content issues in the reference

These are documented so the new build does **not** reproduce them as fact:

- Video descriptions reference “Club X”, “Paradise Beach”, and “downtown's most exclusive venue” with no corroborating public information. These are treated as placeholder copy and are not reused.
- No track titles, release dates, or playable audio were found on the site; only a SoundCloud profile link. No audio player is therefore claimed in the new build.
- No event dates or venues were verified. The new site lists **archive event names only** (Momento, Lkhayal, Sobbyss) with the confirmed city, and clearly labels them as archive.
- Copyright is hardcoded to 2025; the new build uses a static 2026 because the page is prerendered and does not read the clock at runtime.

---

## 7. Technical observations

- Create React App build; JS bundle ~1.26 MB minified, plus Font Awesome CSS and Google Fonts.
- Three.js scene runs on a full-viewport canvas with `min-height: 100vh`, continuously.
- Social icon SVGs are inline; brand icons come from Font Awesome.
- No Open Graph/Twitter metadata, no canonical URL, no structured data.
- Generic alt text on most gallery images; several controls rely on icon-only buttons without labels.
- Heavy animation stack (Framer Motion + Three.js + react-three-fiber + drei) with no visible adaptive-quality strategy.

---

## 8. Opportunities taken in the new build

1. **Give the music a real home** — a sound/disciplines section and a large SoundCloud exit, without inventing releases.
2. **Make the 3D object mean something** — a single liquid-chrome “signal disc” (vinyl + speaker membrane) that deforms with scroll, replacing decorative floating blobs.
3. **Editorial art direction** — asymmetric grid, oversized type, hairline rules, technical annotations, film grain.
4. **One canvas, purposeful scenes** — camera/object presets change per section, no duplicate WebGL contexts.
5. **Honest event content** — an archive of confirmed event names, a booking CTA, no fake dates.
6. **Real accessibility and fallbacks** — semantic landmarks, focus states, reduced-motion, WebGL fallback, keyboard-operable gallery viewer.
7. **Performance discipline** — self-hosted fonts, optimized images, capped DPR, reduced geometry/particles on mobile, dynamic 3D import.

---

## 9. Limitations

- The reference does not expose individual track IDs in its HTML. Two public SoundCloud tracks were later verified on the artist's profile and are embedded with the official player: “المغرب 39-365” and “Audiomancers Imagine (SVG & Xanaks)”. No other release claims are made.
- No verified upcoming events or releases exist in the reference, so none are presented as real.
- The reference's photography is reused as artist-supplied material. If any image is not licensed for the new deployment, replace the files in `public/media` before publishing.
