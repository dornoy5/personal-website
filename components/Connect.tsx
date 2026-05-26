"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";

const contacts = [
  { icon: FiLinkedin, label: "LinkedIn", value: "/in/dor-noy",        href: "https://www.linkedin.com/in/dor-noy-2314362b4", gradient: "from-blue-500/15 to-blue-700/5",   border: "hover:border-blue-500/40",   color: "text-blue-400"   },
  { icon: FiMail,     label: "Email",    value: "dornoy5@gmail.com",   href: "mailto:dornoy5@gmail.com",                      gradient: "from-cyan-500/15 to-cyan-700/5",   border: "hover:border-cyan-500/40",   color: "text-cyan-400"   },
  { icon: FiGithub,   label: "GitHub",   value: "github.com/dornoy5",  href: "https://github.com/dornoy5",                    gradient: "from-violet-500/15 to-violet-700/5", border: "hover:border-violet-500/40", color: "text-violet-400" },
];

export default function Connect() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/70 to-[#030014]/90" />
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-6">Ready to talk?</p>
          <h2 className="font-black tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.05 }}>
            Let&apos;s <span className="gradient-text">Work</span><br />Together
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Whether you need a developer, a sales-minded builder, or someone who can do both — I&apos;m one message away.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }} className="grid md:grid-cols-3 gap-4 mt-8">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a key={c.label} href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`glass rounded-2xl p-6 bg-gradient-to-b ${c.gradient} border border-white/[0.08] ${c.border} transition-all duration-300 hover:-translate-y-1.5 group text-left`}>
                <div className={`${c.color} mb-4 flex justify-between items-center`}>
                  <Icon size={23} />
                  <ArrowUpRight size={15} className="text-gray-600 group-hover:text-current transition-colors" />
                </div>
                <p className="text-gray-600 text-xs uppercase tracking-widest font-mono mb-1.5">{c.label}</p>
                <p className="text-white font-medium text-sm">{c.value}</p>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-10 pt-6 border-t border-white/[0.05] text-gray-700 text-xs tracking-wide">
          © 2026 Dor Noy &nbsp;·&nbsp; Built with Next.js & Vercel
        </motion.div>
      </div>
    </section>
  );
}
