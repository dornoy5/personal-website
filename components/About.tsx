"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clapperboard, Code2, TrendingUp, Workflow } from "lucide-react";

const traits = [
  { icon: <Code2 size={21} />,        title: "Websites, Live",       desc: "From idea to a live site the owner runs from her phone. Built with Claude Code, checked by me." },
  { icon: <Clapperboard size={21} />, title: "AI Video",             desc: "Property films and video ads made from photos. Veo for the camera moves, an ffmpeg pipeline for the cut." },
  { icon: <Workflow size={21} />,     title: "Automations & Agents", desc: "A multi-agent Claude Code setup that runs my projects, with written rules for every repeated job." },
  { icon: <TrendingUp size={21} />,   title: "Sales Background",     desc: "I come from sales, so I start with the person who will use it and what makes them say yes." },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-10">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Who I Am</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}>
            <blockquote className="text-2xl md:text-3xl font-bold leading-snug mb-8 text-gray-100">
              &ldquo;AI does the heavy lifting.{" "}
              <span className="gradient-text">I decide what gets built and check what comes back.</span>&rdquo;
            </blockquote>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              I&apos;m Dor. I build with AI from start to finish: the website, the video, and the system that keeps the work moving.
              Before this I was in sales, so I know how to explain what a thing is worth to the person paying for it.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              If you&apos;re looking for someone who can both{" "}
              <span className="text-cyan-400 font-medium">build</span> and{" "}
              <span className="text-violet-400 font-medium">connect</span> — let&apos;s talk.
            </p>
          </motion.div>

          <div className="space-y-4">
            {traits.map((t, i) => (
              <motion.div key={t.title}
                initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
                className="glass rounded-2xl p-6 flex gap-5 items-start hover:border-cyan-400/20 transition-colors duration-300 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-200">
                  {t.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{t.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
