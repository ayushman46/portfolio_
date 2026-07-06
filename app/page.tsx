"use client";

import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ResumeEducation from "./components/ResumeEducation";
import Achievements from "./components/Achievements";
import ContactFooter from "./components/ContactFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative z-0 overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ResumeEducation />
        <Achievements />
      </main>
      <ContactFooter />
    </SmoothScroll>
  );
}
