"use client";

import { useEffect, useRef } from "react";

interface Star    { x: number; y: number; r: number; baseAlpha: number; speed: number; phase: number; }
interface Dot     { x: number; y: number; vx: number; vy: number; r: number; }
interface Shooter { x: number; y: number; angle: number; spd: number; len: number; life: number; max: number; }
interface Faller  { x: number; y: number; vy: number; vx: number; len: number; alpha: number; r: number; }

const NEBULAE = [
  { cx: 0.10, cy: 0.25, r: 420, rgb: [99,102,241],  a: 0.13 },
  { cx: 0.88, cy: 0.15, r: 320, rgb: [56,189,248],  a: 0.10 },
  { cx: 0.55, cy: 0.65, r: 380, rgb: [167,139,250], a: 0.11 },
  { cx: 0.93, cy: 0.78, r: 280, rgb: [236,72,153],  a: 0.08 },
  { cx: 0.22, cy: 0.82, r: 300, rgb: [45,212,191],  a: 0.09 },
];

const mkFaller = (w: number): Faller => ({
  x:     Math.random() * w,
  y:     Math.random() * -200 - 10,
  vy:    Math.random() * 1.4 + 0.6,
  vx:    (Math.random() - 0.5) * 0.25,
  len:   Math.random() * 70 + 30,
  alpha: Math.random() * 0.35 + 0.2,
  r:     Math.random() * 1.1 + 0.4,
});

export default function FullPageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mx = -9999, my = -9999;
    let frame = 0;

    const stars:   Star[]    = [];
    const dots:    Dot[]     = [];
    const shooters: Shooter[] = [];
    const fallers: Faller[]  = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      stars.length   = 0;
      dots.length    = 0;
      fallers.length = 0;

      for (let i = 0; i < 340; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          baseAlpha: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.018 + 0.004,
          phase: Math.random() * Math.PI * 2,
        });
      }
      for (let i = 0; i < 55; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.7,
        });
      }
      // Spread fallers across the full height initially so they don't all start from top
      for (let i = 0; i < 22; i++) {
        const f = mkFaller(canvas.width);
        f.y = Math.random() * canvas.height; // start spread across the screen
        fallers.push(f);
      }
    };

    const launchShooter = () => {
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
      shooters.push({
        x: Math.random() * canvas.width * 0.65,
        y: Math.random() * canvas.height * 0.35,
        angle, spd: Math.random() * 9 + 7,
        len: Math.random() * 130 + 80,
        life: 0, max: 55,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 400 === 0) launchShooter();

      // Nebulae
      for (const n of NEBULAE) {
        const x = n.cx * canvas.width, y = n.cy * canvas.height;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, n.r);
        grd.addColorStop(0, `rgba(${n.rgb},${n.a})`);
        grd.addColorStop(1, `rgba(${n.rgb},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(x, y, n.r, 0, Math.PI * 2); ctx.fill();
      }

      // Twinkling stars
      for (const s of stars) {
        const a = Math.max(0.04, Math.min(1, s.baseAlpha + Math.sin(frame * s.speed + s.phase) * 0.28));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
      }

      // Falling stars
      for (const f of fallers) {
        f.x += f.vx; f.y += f.vy;
        if (f.y > canvas.height + 60) {
          const fresh = mkFaller(canvas.width);
          f.x = fresh.x; f.y = fresh.y;
          f.vy = fresh.vy; f.vx = fresh.vx;
          f.len = fresh.len; f.alpha = fresh.alpha; f.r = fresh.r;
        }
        const tx = f.x - f.vx * (f.len / Math.max(f.vy, 0.1));
        const ty = f.y - f.len;
        const grd = ctx.createLinearGradient(tx, ty, f.x, f.y);
        grd.addColorStop(0, "rgba(200,210,255,0)");
        grd.addColorStop(1, `rgba(200,210,255,${f.alpha})`);
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(f.x, f.y);
        ctx.strokeStyle = grd; ctx.lineWidth = f.r; ctx.stroke();
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${f.alpha * 1.2})`; ctx.fill();
      }

      // Constellation dots
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(165,180,252,0.75)"; ctx.fill();
      }

      // Constellation lines + mouse
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(129,140,248,${(1-d/130)*0.22})`; ctx.lineWidth = 1; ctx.stroke();
          }
        }
        const dx = a.x - mx, dy = a.y - my, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 170) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(167,139,250,${(1-d/170)*0.6})`; ctx.lineWidth = 1; ctx.stroke();
        }
      }

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += Math.cos(s.angle) * s.spd; s.y += Math.sin(s.angle) * s.spd; s.life++;
        const prog = s.life / s.max;
        const a = prog < 0.3 ? prog/0.3 : 1-(prog-0.3)/0.7;
        const tx = s.x - Math.cos(s.angle)*s.len, ty = s.y - Math.sin(s.angle)*s.len;
        const grd = ctx.createLinearGradient(tx,ty,s.x,s.y);
        grd.addColorStop(0,"rgba(255,255,255,0)"); grd.addColorStop(1,`rgba(255,255,255,${a*0.95})`);
        ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(s.x,s.y);
        ctx.strokeStyle = grd; ctx.lineWidth = 1.5; ctx.stroke();
        if (s.life >= s.max) shooters.splice(i,1);
      }

      animId = requestAnimationFrame(tick);
    };

    const onMouse  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave  = () => { mx = -9999; my = -9999; };
    const onResize = () => { resize(); spawn(); };

    resize(); spawn(); tick();
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}
