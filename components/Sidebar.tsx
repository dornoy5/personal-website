"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Play, User, Code2, FolderGit2, FileText, Mail, ArrowLeft } from "lucide-react";

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
    <aside className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1 p-1.5 rounded-2xl bg-[#030014]/70 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
      {navItems.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        const isHinted = id === "video" && showIntroHint;
        const isBursting = id === "video" && bursting;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={id === "video" ? handleIntroClick : undefined}
            aria-label={label}
            className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isActive
                ? "text-cyan-400 bg-cyan-400/[0.12]"
                : "text-gray-500 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {isHinted && (
              <motion.span
                animate={{ boxShadow: ["0 0 0 0 rgba(34,211,238,0.45)", "0 0 0 10px rgba(34,211,238,0)", "0 0 0 0 rgba(34,211,238,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-xl pointer-events-none"
              />
            )}
            {isActive && (
              <span className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-cyan-400" />
            )}

            <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />

            {/* Hover tooltip — when not in hint state */}
            {!isHinted && (
              <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#030014]/95 backdrop-blur border border-white/10 text-[11px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity tracking-wide z-50">
                {label}
              </span>
            )}

            {/* Persistent first-visit hint pointing at Intro */}
            <AnimatePresence>
              {isHinted && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.4 } }}
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 flex items-center gap-2 whitespace-nowrap pointer-events-none origin-left"
                >
                  <motion.div
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-cyan-400"
                  >
                    <ArrowLeft size={22} strokeWidth={2.5} />
                  </motion.div>
                  <span className="px-3 py-1.5 rounded-md bg-[#030014]/95 backdrop-blur border border-cyan-400/40 text-cyan-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Watch Intro
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {isBursting && (
              <div className="absolute left-full top-1/2 ml-[80px] pointer-events-none z-50">
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
    </aside>
  );
}
