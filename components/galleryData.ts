// Everything else Dor has made, shown in the More Work gallery.
// Files live in public/work/gallery/{videos,posters,photos/<slug>}.

export type Category = "property-film" | "website" | "ad" | "other";

export type GalleryItem = {
  slug: string;
  title: string;
  category: Category;
  aspect: "9:16" | "4:5" | "16:9";
  what: string;
  tools: string[];
  liveUrl: string | null;
  photos: number;
};

export const galleryItems: GalleryItem[] = [
  {
    "slug": "garden-villa",
    "title": "Garden Villa",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A modern villa walk: the pool, the glass wall, the floating stairs, the fire. Stock photos, every move made with AI.",
    "tools": [
      "Veo 3.1 Fast",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 6
  },
  {
    "slug": "teak-and-jungle",
    "title": "Teak and Jungle",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A made-up villa in the jungle, built from stock photos. The music, the voice and the captions are AI too.",
    "tools": [
      "Seedance",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 5
  },
  {
    "slug": "timberline",
    "title": "Timberline",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A cabin in the pines, from the roof to the wood stove. Stock photos, moved with AI, with a short story on top.",
    "tools": [
      "Seedance",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 6
  },
  {
    "slug": "bay-window-classic",
    "title": "Bay Window Classic",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A classic cream apartment, 13 stock photos turned into one walk. Watch the camera turn at the table to look into the living room.",
    "tools": [
      "Veo 3.1 Fast",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 13
  },
  {
    "slug": "nine-photos",
    "title": "Nine Photos",
    "category": "property-film",
    "aspect": "9:16",
    "what": "Nine stock photos of one flat, shown first as a phone gallery, then as the walkthrough I made from them.",
    "tools": [
      "Veo 3.1 Fast",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 9
  },
  {
    "slug": "aegean-white",
    "title": "Aegean White",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A white island house by the sea, told as a short story. Every shot moved with AI from stock photos.",
    "tools": [
      "Seedance",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 5
  },
  {
    "slug": "glass-house",
    "title": "Glass House",
    "category": "property-film",
    "aspect": "9:16",
    "what": "A dream house put together from stock photos of a few different places. A mood piece, not one real home.",
    "tools": [
      "Veo 3.1 Fast",
      "Seedance",
      "ElevenLabs",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 5
  },
  {
    "slug": "roni-owner-panel",
    "title": "Roni's site, changed from her phone",
    "category": "website",
    "aspect": "9:16",
    "what": "The owner opens her panel, types a new line, presses save, and it's live. Filmed on a test copy, so nothing real was touched.",
    "tools": [
      "Claude Code",
      "Next.js",
      "Cloudflare Workers",
      "headless Edge",
      "ffmpeg"
    ],
    "liveUrl": "https://ronipaz.com",
    "photos": 0
  },
  {
    "slug": "my-jewelry-site",
    "title": "A jewelry shop, made with AI",
    "category": "website",
    "aspect": "4:5",
    "what": "A jewelry shop I built with AI, every ring turning in 3D right on the page. The brand is made up and every product photo is AI.",
    "tools": [
      "Claude Code",
      "Nano Banana 2",
      "3D ring in code",
      "headless Edge",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 0
  },
  {
    "slug": "coffee-ad-made-twice",
    "title": "Same coffee ad, made twice",
    "category": "ad",
    "aspect": "4:5",
    "what": "The same coffee ad twice: on top the usual way, below with four tips I picked up in LinkedIn comments. The brand is made up and every shot is AI.",
    "tools": [
      "Nano Banana 2",
      "Veo 3.1 Fast",
      "Claude Code",
      "Python",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 0
  },
  {
    "slug": "tip-test-rule",
    "title": "Tip. Test. Rule.",
    "category": "other",
    "aspect": "4:5",
    "what": "How a tip I hear becomes a rule my AI follows: heard, tested, then written into a skill. A film written in code, no editor.",
    "tools": [
      "Claude Code",
      "HTML film recorded frame by frame",
      "headless Edge",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 0
  },
  {
    "slug": "room-before-after",
    "title": "Same room, before and after",
    "category": "other",
    "aspect": "4:5",
    "what": "The same room twice: empty the day you get the keys, then lived in. Both made with AI to look like phone photos.",
    "tools": [
      "GPT Image 2.5",
      "ffmpeg"
    ],
    "liveUrl": null,
    "photos": 0
  }
];

export const photoUrls = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/work/gallery/photos/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);
