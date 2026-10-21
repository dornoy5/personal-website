"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Globe, Clapperboard, Sparkles, Workflow } from "lucide-react";
import { FiGithub } from "react-icons/fi";

type Accent = { text: string; border: string; glow: string; chip: string };

const accents: Record<string, Accent> = {
  cyan:   { text: "text-cyan-300",   border: "hover:border-cyan-400/50",   glow: "from-cyan-500/20 via-blue-600/5 to-transparent",    chip: "text-cyan-300 border-cyan-400/30 bg-cyan-400/[0.06]" },
  pink:   { text: "text-pink-300",   border: "hover:border-pink-400/50",   glow: "from-pink-500/20 via-rose-600/5 to-transparent",    chip: "text-pink-300 border-pink-400/30 bg-pink-400/[0.06]" },
  amber:  { text: "text-amber-300",  border: "hover:border-amber-400/50",  glow: "from-amber-500/20 via-orange-600/5 to-transparent", chip: "text-amber-300 border-amber-400/30 bg-amber-400/[0.06]" },
  violet: { text: "text-violet-300", border: "hover:border-violet-400/50", glow: "from-violet-500/20 via-purple-600/5 to-transparent", chip: "text-violet-300 border-violet-400/30 bg-violet-400/[0.06]" },
};

// Smaller code projects, shown under the featured work.
const codeProjects = [
  {
    name: "Personal Website",
    description: "This site. Next.js 14, animated starfield, intro video with custom subtitles. Built with Claude Code.",
    liveUrl: "https://dor-noy.com",
    githubUrl: "https://github.com/dornoy5/personal-website",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    name: "Poker Night Manager",
    description: "Mobile-first React app for poker home games: buy-ins, rebuys, chips and auto-settlement.",
    liveUrl: "https://poker-night-manager-ten.vercel.app",
    githubUrl: "https://github.com/dornoy5/poker-night-manager",
    tech: ["React", "JavaScript", "Vercel"],
  },
];

// The agent lanes drawn around Jarvis in the workflow card.
const agentLanes = [
  { label: "Websites",  angle: -90 },
  { label: "AI Videos", angle: -18 },
  { label: "Research",  angle: 54 },
  { label: "Job Prep",  angle: 126 },
  { label: "Planning",  angle: 198 },
];

function LoopVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-10%" });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

function Chips({ tech, accent }: { tech: string[]; accent: Accent }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tech.map((t) => (
        <span key={t} className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${accent.chip}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

function Kicker({ icon, label, accent }: { icon: React.ReactNode; label: string; accent: Accent }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase mb-2 ${accent.text}`}>
      {icon} {label}
    </p>
  );
}

function AgentDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto">
      <svg viewBox="-160 -160 320 320" className="absolute inset-0 w-full h-full" aria-hidden>
        <motion.circle
          r="112" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1" strokeDasharray="4 6"
          animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {agentLanes.map((l, i) => {
          const r = (l.angle * Math.PI) / 180;
          return (
            <motion.line
              key={l.label}
              x1="0" y1="0" x2={Math.cos(r) * 112} y2={Math.sin(r) * 112}
              stroke="rgba(251,191,36,0.55)" strokeWidth="1.5" strokeDasharray="3 5"
              animate={{ strokeDashoffset: [0, -16] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
            />
          );
        })}
      </svg>

      <motion.div
        animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0.45)", "0 0 0 18px rgba(251,191,36,0)", "0 0 0 0 rgba(251,191,36,0)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-amber-400 to-orange-600 text-[#030014]"
      >
        <span className="text-sm font-black leading-none">Jarvis</span>
        <span className="text-[9px] font-mono tracking-widest uppercase mt-1">chief</span>
      </motion.div>

      {agentLanes.map((l, i) => {
        const r = (l.angle * Math.PI) / 180;
        const x = 50 + (Math.cos(r) * 112 * 100) / 320;
        const y = 50 + (Math.sin(r) * 112 * 100) / 320;
        return (
          <motion.span
            key={l.label}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            className="absolute whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0b0820] border border-amber-400/40 text-amber-200"
            style={{ left: `${x}%`, top: `${y}%`, translateX: "-50%", translateY: "-50%" }}
          >
            {l.label}
          </motion.span>
        );
      })}
    </div>
  );
}

const card = "relative rounded-3xl overflow-hidden glass border border-white/10 transition-colors duration-300";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay },
    whileHover: { y: -4 },
  });

  return (
    <section id="projects" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-10">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Built End to End</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            Selected <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Roni Paz: live site */}
          <motion.article {...reveal(0.1)} className={`${card} ${accents.cyan.border} md:col-span-2`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${accents.cyan.glow} pointer-events-none`} />
            <div className="relative grid sm:grid-cols-[0.8fr_1fr] items-center h-full">
            <div className="relative p-4 sm:p-5 sm:pr-0">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <LoopVideo
                  src="/work/ronipaz-site.mp4"
                  poster="/work/ronipaz-poster.jpg"
                  label="ronipaz.com, the site as a short film"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#030014]/70 backdrop-blur text-[10px] font-bold tracking-widest uppercase text-emerald-300 border border-emerald-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              </div>
            </div>
            <div className="relative p-5 sm:p-7">
              <Kicker icon={<Globe size={13} />} label="Live website" accent={accents.cyan} />
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">ronipaz.com</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
                A site for a tattoo artist in Tel Aviv, built with Claude Code. English and Hebrew in one build,
                a small Cloudflare back end, and an owner panel so she changes photos and text from her phone.
                No developer needed after launch.
              </p>
              <Chips tech={["Next.js", "React", "TypeScript", "Tailwind", "Cloudflare Workers"]} accent={accents.cyan} />
              <a href="https://ronipaz.com" target="_blank" rel="noopener noreferrer" className="btn-primary mt-2">
                <ArrowUpRight size={17} /> View Live
              </a>
            </div>
            </div>
          </motion.article>

          {/* Skyline Loft: AI property film */}
          <motion.article {...reveal(0.2)} className={`${card} ${accents.pink.border} md:row-span-2 flex flex-col`}>
            <div className={`absolute inset-0 bg-gradient-to-b ${accents.pink.glow} pointer-events-none`} />
            <div className="relative p-4 pb-0 flex justify-center">
              <div className="w-full max-w-[300px] md:max-w-none aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <LoopVideo
                  src="/work/skyline-loft.mp4"
                  poster="/work/skyline-loft-poster.jpg"
                  label="Skyline Loft, an AI property film"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="relative p-5 sm:p-7 flex-1">
              <Kicker icon={<Clapperboard size={13} />} label="AI property film" accent={accents.pink} />
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">Skyline Loft</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Nine listing photos into a 29 second walkthrough. Each photo becomes a camera move in Veo 3.1,
                the clips are cut in ffmpeg, and every clip is checked against the photo it came from.
                Anything that wasn&apos;t in the photo gets thrown out.
              </p>
              <Chips tech={["Veo 3.1", "ffmpeg", "Python", "Claude Code"]} accent={accents.pink} />
              <p className="text-[11px] text-gray-600">Stock photos, licensed for commercial use.</p>
            </div>
          </motion.article>

          {/* Jarvis: the agent workflow */}
          <motion.article {...reveal(0.3)} className={`${card} ${accents.amber.border} md:col-span-2`}>
            <div className={`absolute inset-0 bg-gradient-to-tr ${accents.amber.glow} pointer-events-none`} />
            <div className="relative grid sm:grid-cols-[1fr_1.15fr] gap-4 items-center h-full p-5 sm:p-7">
              <AgentDiagram />
              <div>
                <Kicker icon={<Workflow size={13} />} label="Automation" accent={accents.amber} />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">Jarvis, my agent setup</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-3">
                  How I run my projects. Several Claude Code sessions, each one owns a single lane with its own
                  inbox and rule book. A chief session, Jarvis, passes my orders to the right lane and sends me
                  back one short summary.
                </p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                  Every repeated job has a skill, a checklist written after a real mistake. Nothing gets
                  published, sent or bought until I press the button myself.
                </p>
                <Chips tech={["Claude Code", "Multi-agent", "Skills", "Hooks"]} accent={accents.amber} />
              </div>
            </div>
          </motion.article>

          {/* Rishon LeZion flat: AI walkthrough from a real listing */}
          <motion.article {...reveal(0.35)} className={`${card} ${accents.pink.border} md:row-span-2 flex flex-col`}>
            <div className={`absolute inset-0 bg-gradient-to-b ${accents.pink.glow} pointer-events-none`} />
            <div className="relative p-4 pb-0 flex justify-center">
              <div className="w-full max-w-[300px] md:max-w-none aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <LoopVideo
                  src="/work/ori-flat.mp4"
                  poster="/work/ori-flat-poster.jpg"
                  label="A flat in Rishon LeZion, an AI walkthrough"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="relative p-5 sm:p-7 flex-1">
              <Kicker icon={<Clapperboard size={13} />} label="AI walkthrough" accent={accents.pink} />
              <h3 className="text-2xl font-black tracking-tight mb-2 text-white">Rishon LeZion Flat</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A real listing, from the agent&apos;s own photos to a walkthrough of the whole flat.
                I drew the floor plan first, so every move goes where a person could really walk.
              </p>
              <Chips tech={["Veo 3.1", "ffmpeg", "Floor plan first"]} accent={accents.pink} />
            </div>
          </motion.article>

          {/* Jewelry ad: same product, made twice */}
          <motion.article {...reveal(0.4)} className={`${card} ${accents.violet.border} md:col-span-2`}>
            <div className={`absolute inset-0 bg-gradient-to-bl ${accents.violet.glow} pointer-events-none`} />
            <div className="relative grid sm:grid-cols-[1fr_0.7fr] items-center h-full">
              <div className="relative p-5 sm:p-7 order-2 sm:order-1">
                <Kicker icon={<Sparkles size={13} />} label="AI video ad" accent={accents.violet} />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">Same Jewelry Ad, Made Twice</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                  A handmade jewelry ad built twice with the same AI tools: once straight, once with four tips
                  from people on LinkedIn. A 3D model holds the camera, every shot adds something new, and the
                  words are set in code, not drawn by the image model. Subtitles in English and Hebrew.
                </p>
                <Chips tech={["Image to video", "Code-set text", "EN / HE subtitles", "Python"]} accent={accents.violet} />
              </div>
              <div className="relative p-4 sm:p-5 sm:pl-0 order-1 sm:order-2">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <LoopVideo
                    src="/work/jewelry-ad.mp4"
                    poster="/work/jewelry-ad-poster.jpg"
                    label="Same jewelry ad, made twice"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Law office site: design only, no client details */}
          <motion.article {...reveal(0.45)} className={`${card} ${accents.cyan.border} md:col-span-2`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${accents.cyan.glow} pointer-events-none`} />
            <div className="relative grid sm:grid-cols-[0.7fr_1fr] items-center h-full">
              <div className="relative p-4 sm:p-5 sm:pr-0">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <LoopVideo
                    src="/work/law-site.mp4"
                    poster="/work/law-site-poster.jpg"
                    label="A website for a law office, the design as a short film"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="relative p-5 sm:p-7">
                <Kicker icon={<Globe size={13} />} label="Client website" accent={accents.cyan} />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">A Law Office Site</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                  A Hebrew, right-to-left site for a law office. Practice areas stack like case folders and the
                  text reads along as you scroll. Names and photos are left out of this film.
                </p>
                <Chips tech={["Next.js", "Hebrew / RTL", "Tailwind", "Claude Code"]} accent={accents.cyan} />
              </div>
            </div>
          </motion.article>

          {/* Code projects */}
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-5">
          {codeProjects.map((p, i) => (
            <motion.article key={p.name} {...reveal(0.5 + i * 0.1)} className={`${card} ${accents.violet.border} p-5 sm:p-6`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${accents.violet.glow} pointer-events-none`} />
              <div className="relative">
                <Chips tech={p.tech} accent={accents.violet} />
                <h3 className="text-xl font-black tracking-tight mb-1.5 text-white">{p.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ArrowUpRight size={17} /> View Live
                  </a>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <FiGithub size={17} /> View Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
