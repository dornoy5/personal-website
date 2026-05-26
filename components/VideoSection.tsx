"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

type Cue = { start: number; end: number; text: string };

function parseTime(s: string): number {
  const parts = s.trim().split(":");
  if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
  }
  return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
}

function parseVTT(text: string): Cue[] {
  const cues: Cue[] = [];
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\n+/);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const timeLineIdx = lines.findIndex((l) => l.includes("-->"));
    if (timeLineIdx === -1) continue;
    const [start, end] = lines[timeLineIdx].split("-->").map((s) => parseTime(s));
    const txt = lines.slice(timeLineIdx + 1).join("\n").trim();
    if (txt) cues.push({ start, end, text: txt });
  }
  return cues;
}

export default function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [cues, setCues] = useState<Cue[]>([]);
  const [activeCue, setActiveCue] = useState("");

  const playIntro = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.ended) v.currentTime = 0;
    v.muted = false;
    v.volume = 0.2;
    v.play().catch(() => {});
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = 0.2;
    const handler = () => playIntro();
    window.addEventListener("play-intro-video", handler);
    return () => window.removeEventListener("play-intro-video", handler);
  }, []);

  useEffect(() => {
    fetch(`/dor-noy-intro.vtt?v=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((text) => setCues(parseVTT(text)))
      .catch(() => {});
  }, []);

  return (
    <section id="video" className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/60 to-transparent" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-8 sm:mb-10">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3 sm:mb-4">Welcome</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3 sm:mb-4">
            Hi, I&apos;m <span className="gradient-text">Dor</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-xl max-w-2xl mx-auto px-2">
            Watch this short intro to get to know who I am and what I bring to the table.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[3/4] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/10 bg-gradient-to-b from-violet-900/10 via-[#030014]/30 to-cyan-900/10">

          <div className="absolute inset-x-0 top-0 bottom-[80px] sm:bottom-[110px] flex items-center justify-center px-3 sm:px-10 pt-3 sm:pt-8">
            <div className="relative h-full inline-block">
              <video
                ref={videoRef}
                src="/dor-noy-intro.mp4"
                playsInline
                controls
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => { setIsPlaying(false); setActiveCue(""); }}
                onTimeUpdate={(e) => {
                  const t = e.currentTarget.currentTime;
                  const active = cues.find((c) => t >= c.start && t <= c.end);
                  setActiveCue(active?.text ?? "");
                }}
                className="h-full w-auto rounded-xl sm:rounded-2xl object-cover bg-black shadow-2xl"
              />

              {!isPlaying && (
                <button
                  onClick={playIntro}
                  aria-label="Play intro video"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 shadow-[0_8px_40px_rgba(79,70,229,0.55)] bg-gradient-to-br from-indigo-600 to-violet-600"
                >
                  <Play className="w-6 h-6 sm:w-9 sm:h-9 ml-1 sm:ml-2 text-white" fill="white" />
                </button>
              )}
            </div>
          </div>

          {activeCue && (
            <motion.div
              key={activeCue}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 sm:bottom-6 inset-x-0 z-20 pointer-events-none flex justify-center px-2 sm:px-8"
            >
              <div className="px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#030014]/85 backdrop-blur-md border border-cyan-400/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] max-w-2xl">
                <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug text-center whitespace-pre-line">
                  {activeCue}
                </p>
              </div>
            </motion.div>
          )}

          {["top-3 left-3 sm:top-4 sm:left-4 border-t-2 border-l-2 rounded-tl-lg","top-3 right-3 sm:top-4 sm:right-4 border-t-2 border-r-2 rounded-tr-lg","bottom-3 left-3 sm:bottom-4 sm:left-4 border-b-2 border-l-2 rounded-bl-lg","bottom-3 right-3 sm:bottom-4 sm:right-4 border-b-2 border-r-2 rounded-br-lg"].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 sm:w-8 sm:h-8 border-cyan-400/25 pointer-events-none ${cls}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
