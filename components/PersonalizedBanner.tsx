"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PersonalizedBanner() {
  const params = useSearchParams();
  const company = params.get("for");
  const [dismissed, setDismissed] = useState(false);

  if (!company || dismissed) return null;

  const name = decodeURIComponent(company);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="relative flex items-center justify-center px-6 py-3 text-sm font-medium text-white overflow-hidden"
          style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed, #0ea5e9, #7c3aed, #4f46e5)", backgroundSize: "300% 100%", animation: "shimmer 4s linear infinite" }}>
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
          <span className="relative z-10 text-center">
            👋 Hey <span className="font-black text-white">{name}</span> — Dor put this page together especially for you.
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="relative z-10 ml-4 text-white/60 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
