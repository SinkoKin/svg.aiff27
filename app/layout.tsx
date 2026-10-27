import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteDescription =
  "DJ SVG — Ilyas Naim — is a house and techno DJ based in Marrakech, Morocco. Eight years behind the decks, available for worldwide bookings.";

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normalizeSiteUrl(explicit);

  // Vercel exposes its deployment domains at build time. Prefer the stable
  // production domain, then the deployment URL, before falling back locally.
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelUrl) return normalizeSiteUrl(vercelUrl);

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DJ SVG — Scalable Vector Groove",
  description: siteDescription,
  applicationName: "DJ SVG",
  authors: [{ name: "DJ SVG" }],
  keywords: [
    "DJ SVG",
    "Ilyas Naim",
    "Marrakech DJ",
    "house",
    "techno",
    "deep house",
    "Morocco",
    "booking",
  ],
  openGraph: {
    title: "DJ SVG — Scalable Vector Groove",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "DJ SVG",
    url: "/",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DJ SVG — Marrakech-based house and techno DJ, lit in amber.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ SVG — Scalable Vector Groove",
    description: siteDescription,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DJ SVG",
  alternateName: "Ilyas Naim",
  jobTitle: "DJ and music producer",
  description: siteDescription,
  email: "Ilyass.svg@hotmail.com",
  telephone: "+212656462509",
  url: siteUrl,
  image: new URL("/og.jpg", siteUrl).toString(),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  knowsAbout: [
    "House music",
    "Techno",
    "Deep house",
    "Electronic dance music",
    "Hip hop",
    "Event production",
    "Sound engineering",
    "Music production",
  ],
  sameAs: [
    "https://www.instagram.com/_svg.aiff27",
    "https://soundcloud.com/ilyas-naim-852221500",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/anybody-1.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-sans-2.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/space-mono-1.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <noscript>
          <style>{`.preloader{display:none!important}html.is-loading{overflow:auto!important}.booking__form{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Verified artist details only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
