"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Work",     href: "#projects" },
  { label: "CV",       href: "#cv"       },
  { label: "Contact",  href: "#contact"  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030014]/80 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <a href="#home" className="text-xl font-black gradient-text tracking-widest">DN</a>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className="text-gray-400 text-xs font-medium transition-colors duration-200 hover:text-cyan-400">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
