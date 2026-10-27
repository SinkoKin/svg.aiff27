export type Track = {
  id: string;
  title: string;
  latin: string;
  credit: string;
  embedUrl: string;
  url: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  meta: string;
};

export type Transmission = {
  name: string;
  place: string;
  tag: string;
  image: string;
  alt: string;
};

export const artist = {
  name: "DJ SVG",
  realName: "Ilyas Naim",
  city: "Marrakech",
  country: "Morocco",
  coordinates: "31.6295° N / 7.9811° W",
  since: 2017,
  years: 8,
  tagline: "Eight years in the booth. One continuous signal.",
  heroLine: "Creative DJ with 8 years of experience, obsessed with music and art",
  email: "Ilyass.svg@hotmail.com",
  phone: "+212 656-462509",
  phoneHref: "tel:+212656462509",
  instagram: "https://www.instagram.com/_svg.aiff27",
  instagramHandle: "@_svg.aiff27",
  soundcloud: "https://soundcloud.com/ilyas-naim-852221500",
  soundcloudHandle: "soundcloud.com/ilyas-naim-852221500",
  bio: [
    "SVG's musical odyssey began in 2017, when he discovered that music would be an integral part of his life. With a profound passion for house grooves and electronic dance music, he fully committed himself to crafting immersive soundscapes and unforgettable rhythms.",
    "With 8 years of experience behind the decks, DJ SVG (Ilyas Naim) has established himself as a versatile and creative force in the music scene. Passionate about creating unique sonic experiences, he blends various genres seamlessly into his sets, ensuring every performance is unforgettable.",
    "Beyond DJing, SVG is dedicated to pushing the boundaries of music and visual art, constantly exploring new technologies and techniques to enhance the audience experience.",
  ],
  genres: ["Hip Hop", "House", "Techno", "EDM", "Deep House"],
  services: [
    { label: "DJ sets", note: "Clubs, festivals, private events" },
    { label: "Event production", note: "Sound, staging, direction" },
    { label: "Sound engineering", note: "Mix and live sound" },
    { label: "Music production", note: "Original material and edits" },
  ],
};

export const navItems = [
  { id: "artist", label: "Artist", index: "01" },
  { id: "sound", label: "Sound", index: "02" },
  { id: "signal", label: "Signal", index: "03" },
  { id: "archive", label: "Archive", index: "04" },
  { id: "live", label: "Live", index: "05" },
  { id: "booking", label: "Booking", index: "06" },
];

export const tracks: Track[] = [
  {
    id: "track-01",
    title: "المغرب 39-365",
    latin: "Morocco 39-365",
    credit: "SVG",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1888914144&color=%23d9ff3f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true",
    url: "https://soundcloud.com/ilyas-naim-852221500/39-365",
  },
  {
    id: "track-02",
    title: "Audiomancers Imagine",
    latin: "SVG & Xanaks",
    credit: "SVG & Xanaks",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2141299002&color=%23d9ff3f&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=true",
    url: "https://soundcloud.com/ilyas-naim-852221500/audiomancers-imagine-svg",
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "01",
    src: "/media/gallery-01.webp",
    width: 1080,
    height: 1350,
    alt: "DJ SVG in a dark booth, lit by a single warm amber light, wearing glasses and headphones.",
    caption: "After hours",
    meta: "Archive / 001",
  },
  {
    id: "02",
    src: "/media/gallery-02.webp",
    width: 1800,
    height: 2400,
    alt: "DJ SVG in profile behind a Pioneer CDJ setup, braided hair and a beaded necklace.",
    caption: "Booth study",
    meta: "Archive / 002",
  },
  {
    id: "03",
    src: "/media/gallery-03.webp",
    width: 1800,
    height: 2400,
    alt: "Close view of DJ SVG adjusting headphones beside another person at the decks.",
    caption: "Headroom",
    meta: "Archive / 003",
  },
  {
    id: "04",
    src: "/media/gallery-04.webp",
    width: 1067,
    height: 1422,
    alt: "DJ SVG in a black bomber jacket under red club light, one hand raised.",
    caption: "Red room",
    meta: "Archive / 004",
  },
  {
    id: "05",
    src: "/media/gallery-05.webp",
    width: 1067,
    height: 1422,
    alt: "DJ SVG in profile under violet club light, one hand resting on the mixer.",
    caption: "Violet hour",
    meta: "Archive / 005",
  },
  {
    id: "06",
    src: "/media/gallery-06.webp",
    width: 1071,
    height: 1428,
    alt: "Pioneer CDJ decks and a mixer lit by warm orange string lights during a set.",
    caption: "Momento",
    meta: "Archive / 006",
  },
  {
    id: "07",
    src: "/media/gallery-07.webp",
    width: 1080,
    height: 1350,
    alt: "DJ SVG in a patterned bandana and white shirt behind the decks at an outdoor event.",
    caption: "Lkhayal",
    meta: "Archive / 007",
  },
  {
    id: "08",
    src: "/media/gallery-08.webp",
    width: 1080,
    height: 1350,
    alt: "DJ SVG in a leather jacket and sunglasses among a crowd at a night event.",
    caption: "Sobbyss",
    meta: "Archive / 008",
  },
];

export const transmissions: Transmission[] = [
  {
    name: "Momento",
    place: "Marrakech, MA",
    tag: "Archive",
    image: "/media/gallery-06.webp",
    alt: "CDJ decks at Momento, Marrakech.",
  },
  {
    name: "Lkhayal",
    place: "Marrakech, MA",
    tag: "Archive",
    image: "/media/gallery-07.webp",
    alt: "DJ SVG performing at Lkhayal, Marrakech.",
  },
  {
    name: "Sobbyss",
    place: "Marrakech, MA",
    tag: "Archive",
    image: "/media/gallery-08.webp",
    alt: "Crowd and DJ SVG at Sobbyss, Marrakech.",
  },
];
