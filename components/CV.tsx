"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, FileText, Briefcase, GraduationCap, X } from "lucide-react";

const highlights = [
  { icon: <Briefcase size={18} />,     label: "Experience", value: "Full Stack & Customer-Facing Roles" },
  { icon: <GraduationCap size={18} />, label: "Focus",      value: "Building & Communicating Value" },
  { icon: <FileText size={18} />,      label: "Status",     value: "Open to New Opportunities" },
];

export default function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    if (!showViewer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowViewer(false); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [showViewer]);

  return (
    <section id="cv" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-10">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">My Resume</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            View My <span className="gradient-text">CV</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {highlights.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest font-mono mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/Dor-Noy-CV.pdf" download className="btn-primary w-full sm:w-auto justify-center">
              <Download size={17} /> Download CV
            </a>
            <button
              type="button"
              onClick={() => setShowViewer(true)}
              className="btn-secondary w-full sm:w-auto justify-center cursor-pointer"
            >
              <FileText size={17} /> View Online
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showViewer && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowViewer(false)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-full max-h-[92vh] bg-[#0a0020] rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#030014]/95 to-transparent">
                <span className="text-gray-400 text-xs font-mono tracking-[0.25em] uppercase">Dor Noy — CV</span>
                <button
                  type="button"
                  onClick={() => setShowViewer(false)}
                  aria-label="Close CV"
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <iframe
                src="/Dor-Noy-CV.pdf#toolbar=0&navpanes=0"
                className="absolute inset-0 w-full h-full"
                title="Dor Noy — CV"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
