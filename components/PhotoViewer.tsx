"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Portal from "@/components/Portal";

type Props = {
  title: string;
  photos: string[];
  onClose: () => void;
};

// Full-screen viewer for the photos a film was made from.
export default function PhotoViewer({ title, photos, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, next, prev]);

  return (
    <Portal>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030014]/95 backdrop-blur-xl flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${title}: the photos`}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">The photos it was made from</p>
          <h3 className="text-white font-black text-lg sm:text-2xl truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 font-mono text-xs">{index + 1} / {photos.length}</span>
          <button
            onClick={onClose}
            aria-label="Close photos"
            autoFocus
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={photos[index]}
            src={photos[index]}
            alt={`${title}, photo ${index + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-full max-w-full rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </AnimatePresence>
        {photos.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo"
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#030014]/70 border border-white/15 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} aria-label="Next photo"
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#030014]/70 border border-white/15 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors">
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 sm:px-8 py-4 justify-start sm:justify-center" onClick={(e) => e.stopPropagation()}>
        {photos.map((p, i) => (
          <button key={p} onClick={() => setIndex(i)} aria-label={`Show photo ${i + 1}`}
            className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-colors ${
              i === index ? "border-cyan-400" : "border-transparent opacity-60 hover:opacity-100"
            }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
    </Portal>
  );
}
