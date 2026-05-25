"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3,
  SiNextdotjs, SiTailwindcss, SiFramer, SiAngular, SiSass, SiRedux,
  SiNodedotjs, SiPython, SiDjango, SiExpress, SiPostgresql, SiMongodb,
  SiFirebase, SiSupabase,
  SiDocker, SiGit, SiGithub, SiVisualstudiocode, SiVercel, SiNpm, SiPnpm,
  SiPostman, SiFigma, SiLinux,
  SiOpenai,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Sparkles, Bot, MousePointer2, Triangle, Search, Mic, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AnyIcon = IconType | LucideIcon;
type Skill = { name: string; icon: AnyIcon; color: string };
type Category = { label: string; gradient: string; accent: string; skills: Skill[] };

const categories: Category[] = [
  {
    label: "Frontend",
    gradient: "from-cyan-500/10 to-blue-600/5", accent: "border-cyan-500/20",
    skills: [
      { name: "React",         icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",       icon: SiNextdotjs,   color: "#FFFFFF" },
      { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6" },
      { name: "JavaScript",    icon: SiJavascript,  color: "#F7DF1E" },
      { name: "Tailwind CSS",  icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer,      color: "#FFFFFF" },
      { name: "Angular",       icon: SiAngular,     color: "#DD0031" },
      { name: "Redux",         icon: SiRedux,       color: "#764ABC" },
      { name: "Sass",          icon: SiSass,        color: "#CC6699" },
      { name: "HTML",          icon: SiHtml5,       color: "#E34F26" },
      { name: "CSS",           icon: SiCss3,        color: "#264DE4" },
    ],
  },
  {
    label: "Backend",
    gradient: "from-violet-500/10 to-purple-600/5", accent: "border-violet-500/20",
    skills: [
      { name: "Node.js",    icon: SiNodedotjs,  color: "#339933" },
      { name: "Express",    icon: SiExpress,    color: "#FFFFFF" },
      { name: "Python",     icon: SiPython,     color: "#3776AB" },
      { name: "Django",     icon: SiDjango,     color: "#44B78B" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB",    icon: SiMongodb,    color: "#47A248" },
      { name: "Firebase",   icon: SiFirebase,   color: "#FFCA28" },
      { name: "Supabase",   icon: SiSupabase,   color: "#3ECF8E" },
      { name: "REST APIs",  icon: Globe,        color: "#22D3EE" },
    ],
  },
  {
    label: "Tools & DevOps",
    gradient: "from-pink-500/10 to-rose-600/5", accent: "border-pink-500/20",
    skills: [
      { name: "Git",     icon: SiGit,              color: "#F05032" },
      { name: "GitHub",  icon: SiGithub,           color: "#E5E7EB" },
      { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
      { name: "Vercel",  icon: SiVercel,           color: "#FFFFFF" },
      { name: "Docker",  icon: SiDocker,           color: "#2496ED" },
      { name: "npm",     icon: SiNpm,              color: "#CB3837" },
      { name: "pnpm",    icon: SiPnpm,             color: "#F69220" },
      { name: "Postman", icon: SiPostman,          color: "#FF6C37" },
      { name: "Figma",   icon: SiFigma,            color: "#F24E1E" },
      { name: "Linux",   icon: SiLinux,            color: "#FCC624" },
    ],
  },
  {
    label: "AI Tools",
    gradient: "from-amber-500/10 to-orange-600/5", accent: "border-amber-500/20",
    skills: [
      { name: "Claude / Claude Code", icon: Sparkles,      color: "#D97757" },
      { name: "ChatGPT",              icon: SiOpenai,      color: "#10A37F" },
      { name: "GitHub Copilot",       icon: Bot,           color: "#E5E7EB" },
      { name: "Cursor",               icon: MousePointer2, color: "#67E8F9" },
      { name: "v0.dev",               icon: Triangle,      color: "#FFFFFF" },
      { name: "Perplexity",           icon: Search,        color: "#20B8CD" },
      { name: "Whisper",              icon: Mic,           color: "#A78BFA" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-10">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">What I Work With</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {categories.map((cat, ci) => (
            <motion.div key={cat.label}
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12 }}
              className={`glass rounded-3xl p-8 bg-gradient-to-r ${cat.gradient} border ${cat.accent}`}>
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-gray-600 mb-6">{cat.label}</p>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.35, delay: ci * 0.12 + si * 0.045 }}
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200 group cursor-default">
                      <Icon size={20} style={{ color: skill.color }} className="group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
