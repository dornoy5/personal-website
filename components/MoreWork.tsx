"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Images, Play, X } from "lucide-react";
import PhotoViewer from "@/components/PhotoViewer";
import Portal from "@/components/Portal";
import { galleryItems, photoUrls, type Category, type GalleryItem } from "@/components/galleryData";

const filters: { key: Category | "all"; label: string; color: string }[] = [
  { key: "all",           label: "All",            color: "cyan"   },
  { key: "property-film", label: "Property films", color: "pink"   },
  { key: "website",       label: "Websites",       color: "cyan"   },
  { key: "ad",            label: "Ads",            color: "violet" },
  { key: "other",         label: "Other",          color: "amber"  },
];

const chipColor: Record<string, string> = {
  cyan:   "text-cyan-300 border-cyan-400/50 bg-cyan-400/[0.12]",
  pink:   "text-pink-300 border-pink-400/50 bg-pink-400/[0.12]",
  violet: "text-violet-300 border-violet-400/50 bg-violet-400/[0.12]",
  amber:  "text-amber-300 border-amber-400/50 bg-amber-400/[0.12]",
};

const categoryLabel: Record<Category, string> = {
  "property-film": "AI property film",
  website: "Website",
  ad: "AI video ad",
  other: "Made with AI",
};

const aspectClass = (a: GalleryItem["aspect"]) => (a === "9:16" ? "aspect-[9/16]" : a === "4:5" ? "aspect-[4/5]" : "aspect-video");
const videoUrl = (slug: string) => `/work/gallery/videos/${slug}.mp4`;
const posterUrl = (slug: string) => `/work/gallery/posters/${slug}.jpg`;

function Tile({ item, onOpen, onPhotos }: { item: GalleryItem; onOpen: () => void; onPhotos: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const play = () => vid.current?.play().catch(() => {});
  const stop = () => { const v = vid.current; if (v) { v.pause(); v.currentTime = 0; } };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-cyan-400/40 transition-colors break-inside-avoid mb-4"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <button onClick={onOpen} className="relative block w-full text-left" aria-label={`Watch ${item.title}`}>
        <div className={`relative ${aspectClass(item.aspect)} bg-black/40`}>
          <video
            ref={vid}
            src={videoUrl(item.slug)}
            poster={posterUrl(item.slug)}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 via-transparent to-transparent" />
          <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#030014]/60 backdrop-blur border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-[#030014] transition-colors">
            <Play size={15} fill="currentColor" />
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-300 mb-1">{categoryLabel[item.category]}</p>
            <h3 className="text-white font-black text-lg leading-tight">{item.title}</h3>
          </div>
        </div>
      </button>
      {item.photos > 0 && (
        <button
          onClick={onPhotos}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-wider uppercase text-pink-300 border-t border-white/10 hover:bg-pink-400/[0.08] transition-colors"
        >
          <Images size={14} /> See the {item.photos} photos
        </button>
      )}
    </motion.article>
  );
}

function Player({ item, onClose, onPhotos }: { item: GalleryItem; onClose: () => void; onPhotos: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [onClose]);

  return (
    <Portal>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-[#030014]/90 backdrop-blur-xl flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl glass border border-white/10 grid md:grid-cols-[auto_1fr] gap-6 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Close" autoFocus
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full border border-white/15 bg-[#030014]/70 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors">
          <X size={20} />
        </button>
        <video
          src={videoUrl(item.slug)}
          poster={posterUrl(item.slug)}
          autoPlay
          muted
          loop
          playsInline
          controls
          className={`${aspectClass(item.aspect)} max-h-[70vh] w-full md:w-auto mx-auto rounded-2xl border border-white/10 bg-black object-cover`}
        />
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyan-300 mb-2">{categoryLabel[item.category]}</p>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-3">{item.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-4">{item.what}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {item.tools.map((t) => (
              <span key={t} className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border text-violet-300 border-violet-400/30 bg-violet-400/[0.06]">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {item.photos > 0 && (
              <button onClick={onPhotos} className="btn-primary"><Images size={17} /> See the {item.photos} photos</button>
            )}
            {item.liveUrl && (
              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary"><ArrowUpRight size={17} /> View Live</a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
    </Portal>
  );
}

export default function MoreWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const [photosOf, setPhotosOf] = useState<GalleryItem | null>(null);
  const shown = galleryItems.filter((i) => filter === "all" || i.category === filter);
  const counts = (k: Category | "all") => (k === "all" ? galleryItems.length : galleryItems.filter((i) => i.category === k).length);

  return (
    <section id="more-work" className="py-12 relative">
      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-8">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Everything Else I Made</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            More <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">Hover to play, click to watch. Every apartment film comes with the photos it was made from.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Filter the work">
          {filters.filter((f) => counts(f.key) > 0).map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full border text-xs font-bold tracking-[0.15em] uppercase transition-all ${
                filter === f.key ? chipColor[f.color] + " shadow-[0_0_24px_rgba(34,211,238,0.15)]" : "text-gray-400 border-white/10 hover:border-white/30"
              }`}
            >
              {f.label} <span className="opacity-60 ml-1">{counts(f.key)}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="columns-2 md:columns-3 xl:columns-4 gap-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <Tile key={item.slug} item={item} onOpen={() => setOpen(item)} onPhotos={() => setPhotosOf(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && !photosOf && <Player key="player" item={open} onClose={() => setOpen(null)} onPhotos={() => setPhotosOf(open)} />}
      </AnimatePresence>
      <AnimatePresence>
        {photosOf && (
          <PhotoViewer key="photos" title={photosOf.title} photos={photoUrls(photosOf.slug, photosOf.photos)} onClose={() => setPhotosOf(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
