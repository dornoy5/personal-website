"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isPlaying, setIsPlaying] = useState(false);

  const playIntro = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.ended) v.currentTime = 0;
    v.muted = false;
    v.volume = 0.7;
    v.play().catch(() => {});
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = 0.7;
    const handler = () => playIntro();
    window.addEventListener("play-intro-video", handler);
    return () => window.removeEventListener("play-intro-video", handler);
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
            45 seconds on what I build. Made with AI, even me.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[3/4] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/10 bg-gradient-to-b from-violet-900/10 via-[#030014]/30 to-cyan-900/10">

          <div className="absolute inset-x-0 top-0 bottom-[80px] sm:bottom-[110px] flex items-center justify-center px-3 sm:px-10 pt-3 sm:pt-8">
            <div className="relative h-full inline-block">
              <video
                ref={videoRef}
                src="/work/dor-intro.mp4"
                poster="/work/dor-intro-poster.jpg"
                playsInline
                controls
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
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


          {["top-3 left-3 sm:top-4 sm:left-4 border-t-2 border-l-2 rounded-tl-lg","top-3 right-3 sm:top-4 sm:right-4 border-t-2 border-r-2 rounded-tr-lg","bottom-3 left-3 sm:bottom-4 sm:left-4 border-b-2 border-l-2 rounded-bl-lg","bottom-3 right-3 sm:bottom-4 sm:right-4 border-b-2 border-r-2 rounded-br-lg"].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 sm:w-8 sm:h-8 border-cyan-400/25 pointer-events-none ${cls}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
