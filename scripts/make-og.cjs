const sharp = require("sharp");
const path = require("path");

const out = path.join(__dirname, "..", "public", "og.jpg");
const source = path.join(__dirname, "..", "public", "media", "gallery-01.webp");

const overlay = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#060606" stop-opacity="0.97"/>
      <stop offset="0.48" stop-color="#060606" stop-opacity="0.82"/>
      <stop offset="0.78" stop-color="#060606" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#060606" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.55" stop-color="#060606" stop-opacity="0"/>
      <stop offset="1" stop-color="#060606" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <line x1="64" y1="92" x2="1136" y2="92" stroke="#f2eee3" stroke-opacity="0.22"/>
  <text x="64" y="74" fill="#f2eee3" font-family="Arial, sans-serif" font-size="15" letter-spacing="3">MARRAKECH, MOROCCO — 31.6295° N / 7.9811° W</text>
  <text x="64" y="330" fill="#f2eee3" font-family="Arial Black, Arial, sans-serif" font-size="176" letter-spacing="-8">DJ SVG</text>
  <text x="70" y="386" fill="#d9ff3f" font-family="Arial, sans-serif" font-size="21" letter-spacing="7">SCALABLE VECTOR GROOVE</text>
  <text x="70" y="470" fill="#f2eee3" font-family="Arial, sans-serif" font-size="24" letter-spacing="0.2">House. Techno. Deep house. Eight years in the booth.</text>
  <text x="70" y="506" fill="#928d82" font-family="Arial, sans-serif" font-size="18" letter-spacing="1">Available for worldwide bookings.</text>
  <line x1="64" y1="556" x2="1136" y2="556" stroke="#f2eee3" stroke-opacity="0.22"/>
  <text x="64" y="590" fill="#928d82" font-family="Arial, sans-serif" font-size="14" letter-spacing="2">DJ / ARTIST — ILYAS NAIM</text>
  <text x="1136" y="590" fill="#928d82" font-family="Arial, sans-serif" font-size="14" letter-spacing="2" text-anchor="end">SOUNDCLOUD / INSTAGRAM</text>
  <rect x="1112" y="300" width="10" height="10" fill="#d9ff3f"/>
</svg>`;

(async () => {
  const base = await sharp(source)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.8, brightness: 0.75 })
    .toBuffer();

  await sharp(base)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  console.log("OG written to", out);
})();
