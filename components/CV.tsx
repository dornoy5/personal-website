"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, Briefcase, GraduationCap } from "lucide-react";

const highlights = [
  { icon: <Briefcase size={18} />,     label: "Experience", value: "Full Stack & Sales Development" },
  { icon: <GraduationCap size={18} />, label: "Focus",      value: "Building & Communicating Value" },
  { icon: <FileText size={18} />,      label: "Status",     value: "Open to New Opportunities" },
];

export default function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
          className="glass rounded-3xl p-10 max-w-3xl mx-auto">
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
            <a href="/Dor-Noy-CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto justify-center">
              <FileText size={17} /> View Online
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
