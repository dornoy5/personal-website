"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const roles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Sales Development Rep",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Welcome badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-5"
        >
          <span className="px-5 py-2 rounded-full border border-cyan-400/60 bg-cyan-400/[0.12] text-cyan-300 text-sm font-semibold tracking-[0.15em] uppercase shadow-[0_0_18px_rgba(96,165,250,0.2)]">
            👋 Welcome — I&apos;m happy you&apos;re here
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-5"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              DN
            </div>
            <div className="absolute inset-0 rounded-full blur-xl opacity-50"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-cyan-300 font-bold text-sm tracking-[0.25em] uppercase mb-3"
        >
          Hey there, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-black mb-4 tracking-tighter leading-none"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
        >
          <span className="gradient-text">Dor Noy</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="h-10 flex items-center justify-center mb-5"
        >
          <span className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {displayed}
            <span className="text-cyan-400 animate-pulse ml-0.5">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-gray-300 text-base md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Glad you stopped by.{" "}
          <span className="text-white font-semibold">I build things that work and talk to people that matter.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a href="https://www.linkedin.com/in/dor-noy-2314362b4" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <FiLinkedin size={17} /> Let&apos;s Connect
          </a>
          <a href="https://github.com/dornoy5" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <FiGithub size={17} /> View GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex items-center justify-center gap-7"
        >
          {[
            { icon: <FiGithub size={19} />,   href: "https://github.com/dornoy5" },
            { icon: <FiLinkedin size={19} />, href: "https://www.linkedin.com/in/dor-noy-2314362b4" },
            { icon: <FiMail size={19} />,     href: "mailto:dornoy5@gmail.com" },
          ].map(({ icon, href }, i) => (
            <a key={i} href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-gray-600 hover:text-cyan-400 transition-colors duration-200">
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Mobile: prominent CTA pointing to the intro video (sidebar hint is desktop-only) */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={() => {
          document.getElementById("video")?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new Event("play-intro-video"));
        }}
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        aria-label="Watch intro video"
      >
        <motion.span
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34,211,238,0.45)",
              "0 0 0 14px rgba(34,211,238,0)",
              "0 0 0 0 rgba(34,211,238,0)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="px-5 py-2.5 rounded-full bg-cyan-400/[0.1] border border-cyan-400/60 text-cyan-300 text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2"
        >
          <Play size={12} fill="currentColor" /> Watch My Intro
        </motion.span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="text-cyan-400/80">
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Desktop: subtle chevron (sidebar provides the prominent hint) */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-600 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={26} />
        </motion.div>
      </motion.button>
    </section>
  );
}
