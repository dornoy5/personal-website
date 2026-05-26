"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Play, User, Code2, FolderGit2, FileText, Mail, ChevronLeft } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const navItems = [
  { id: "home",     label: "Home",    icon: Home       },
  { id: "video",    label: "Intro",   icon: Play       },
  { id: "about",    label: "About",   icon: User       },
  { id: "skills",   label: "Skills",  icon: Code2      },
  { id: "projects", label: "Work",    icon: FolderGit2 },
  { id: "cv",       label: "CV",      icon: FileText   },
  { id: "contact",  label: "Contact", icon: Mail       },
];

const HINT_KEY = "introHintDismissed";

const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2 === 0 ? 0 : 0.18);
  const distance = 55 + (i % 5) * 16;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (i % 4) * 0.035,
    size: i % 3 === 0 ? 8 : i % 3 === 1 ? 6 : 4,
  };
});

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [showIntroHint, setShowIntroHint] = useState(false);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    try { localStorage.removeItem(HINT_KEY); } catch {}
    setShowIntroHint(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const dismissHint = useCallback(() => {
    setShowIntroHint(false);
    setBursting(true);
  }, []);

  useEffect(() => {
    if (active === "video" && showIntroHint) dismissHint();
  }, [active, showIntroHint, dismissHint]);

  useEffect(() => {
    if (!bursting) return;
    const t = setTimeout(() => setBursting(false), 900);
    return () => clearTimeout(t);
  }, [bursting]);

  const handleIntroClick = () => {
    if (showIntroHint) dismissHint();
    window.dispatchEvent(new Event("play-intro-video"));
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 z-40 flex-col items-center py-6 bg-[#030014]/70 backdrop-blur-xl border-r border-white/[0.07]">
      <a
        href="#home"
        aria-label="Home"
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
      >
        DN
      </a>

      <nav className="flex-1 flex flex-col items-stretch gap-1 mt-8 w-full px-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          const isHinted = id === "video" && showIntroHint;
          const isBursting = id === "video" && bursting;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={id === "video" ? handleIntroClick : undefined}
              className={`group relative flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 ${
                isActive || isHinted
                  ? "text-cyan-400 bg-cyan-400/[0.08]"
                  : "text-gray-500 hover:text-cyan-400 hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />
              )}

              {isHinted && (
                <motion.span
                  animate={{ boxShadow: ["0 0 0 0 rgba(34,211,238,0.55)", "0 0 0 12px rgba(34,211,238,0)", "0 0 0 0 rgba(34,211,238,0)"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
              )}

              <Icon size={19} />
              <span className="text-[9px] font-mono tracking-widest uppercase">{label}</span>

              <AnimatePresence>
                {isHinted && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.4 } }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 flex items-center gap-2 whitespace-nowrap pointer-events-none origin-left"
                  >
                    <motion.div
                      animate={{
                        x: [-4, 4, -4],
                        filter: [
                          "drop-shadow(0 0 8px rgba(34,211,238,0.5))",
                          "drop-shadow(0 0 18px rgba(34,211,238,1))",
                          "drop-shadow(0 0 8px rgba(34,211,238,0.5))",
                        ],
                      }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      className="text-cyan-400"
                    >
                      <ChevronLeft size={28} strokeWidth={3} />
                    </motion.div>
                    <motion.span
                      animate={{
                        boxShadow: [
                          "0 0 16px rgba(34,211,238,0.4)",
                          "0 0 32px rgba(34,211,238,0.95)",
                          "0 0 16px rgba(34,211,238,0.4)",
                        ],
                      }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      className="px-3 py-1.5 rounded-full bg-cyan-400 text-[#030014] text-[10px] font-bold tracking-[0.2em] uppercase"
                    >
                      Watch My Intro
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {isBursting && (
                <div className="absolute left-full top-1/2 ml-[100px] pointer-events-none z-50">
                  {PARTICLES.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
                      transition={{ duration: 0.75, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute rounded-full bg-cyan-300"
                      style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        boxShadow: "0 0 12px rgba(34,211,238,0.95), 0 0 24px rgba(34,211,238,0.5)",
                      }}
                    />
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/[0.07] w-12 flex-shrink-0">
        <a
          href="https://www.linkedin.com/in/dor-noy-2314362b4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
        >
          <FiLinkedin size={17} />
        </a>
        <a
          href="https://github.com/dornoy5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
        >
          <FiGithub size={17} />
        </a>
        <a
          href="mailto:dornoy5@gmail.com"
          aria-label="Email"
          className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
        >
          <Mail size={17} />
        </a>
      </div>
    </aside>
  );
}
