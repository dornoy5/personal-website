"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";

type Project = {
  name: string;
  description: string;
  liveUrl: string | null;
  githubUrl: string;
  tech: string[];
};

// Add new projects here — auto-rotates through them.
const projects: Project[] = [
  {
    name: "Personal Website",
    description:
      "This site. Next.js 14 portfolio with an animated starfield background, intro video with custom-rendered subtitles, project showcase carousel, and AI-tools skill section. Built iteratively with Claude Code.",
    liveUrl: "https://personal-website-ten-ochre-37.vercel.app",
    githubUrl: "https://github.com/dornoy5/personal-website",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    name: "Poker Night Manager",
    description:
      "Mobile-first React app to manage poker home games — buy-ins, rebuys, chips & auto-settlement.",
    liveUrl: "https://poker-night-manager-ten.vercel.app",
    githubUrl: "https://github.com/dornoy5/poker-night-manager",
    tech: ["React", "JavaScript", "Vercel"],
  },
];

const screenshotUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&waitForTimeout=2500&viewport.width=1280&viewport.height=800&embed=screenshot.url`;

const ROTATE_MS = 6000;

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [index, setIndex] = useState(0);
  const project = projects[index];

  useEffect(() => {
    if (projects.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % projects.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Live Work</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            Projects <span className="gradient-text">in the Wild</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[16/10] rounded-3xl overflow-hidden glass border border-white/10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {project.liveUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={screenshotUrl(project.liveUrl)}
                  alt={`${project.name} screenshot`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/30 via-[#030014]/60 to-cyan-900/20">
                  <span className="text-gray-600 font-mono text-xs tracking-widest uppercase">Code-only</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/95 via-[#030014]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-2 text-white">{project.name}</h3>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <ArrowUpRight size={17} /> View Live
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <FiGithub size={17} /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {projects.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous project"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#030014]/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#030014]/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-cyan-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
