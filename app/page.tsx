import { Suspense } from "react";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CV from "@/components/CV";
import Connect from "@/components/Connect";
import FullPageBackground from "@/components/FullPageBackground";
import PersonalizedBanner from "@/components/PersonalizedBanner";

export default function Home() {
  return (
    <>
      <FullPageBackground />
      <Suspense>
        <PersonalizedBanner />
      </Suspense>
      <Sidebar />
      <main className="relative text-white md:pl-24" style={{ zIndex: 1 }}>
        <Nav />
        <Hero />
        <VideoSection />
        <About />
        <Skills />
        <Projects />
        <CV />
        <Connect />
      </main>
    </>
  );
}
