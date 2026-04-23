"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Enterprise LLM Pipeline",
    context: "Wipro Limited Internship",
    description:
      "Built an automated pipeline converting 30+ internal technical videos into publish-ready blog posts. End to end processing from audio transcription to structured content generation using large language models.",
    tags: ["LLM", "NLP", "Pipeline Automation", "Enterprise"],
    year: "2024",
  },
  {
    number: "02",
    title: "Cricket Biomechanics & 3D Pose Estimation",
    context: "Real time Sports Analytics",
    description:
      "Reconstructs 3D pose and SMPL body mesh via SPIN. Features integrated multi-object player tracking evaluation for comprehensive match video analysis, enabling data-driven performance insights.",
    tags: ["Computer Vision", "3D Reconstruction", "SPIN", "Tracking"],
    year: "2024",
  },
  {
    number: "03",
    title: "Autonomous GUI Agent",
    context: "Multimodal AI Engineering",
    description:
      "An AI agent controlling a computer environment via GUI automation, utilizing vision, reasoning, and Playwright. Capable of understanding screenshots, planning actions, and executing complex multi-step workflows.",
    tags: ["Multimodal AI", "Agents", "Playwright", "Vision"],
    year: "2025",
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Section label — fixed in position */}
      <div className="absolute top-10 left-0 section-padding z-10">
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/25">
          04 — Selected Work
        </span>
      </div>

      <div
        ref={trackRef}
        className="horizontal-scroll-container items-center h-full pl-[5vw] pr-[5vw] pt-20"
      >
        {/* Opening card with section title */}
        <div className="flex-shrink-0 w-[40vw] min-w-[350px] flex flex-col justify-center h-full pr-12 relative">
          <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-indigo-500/10 blur-[100px] -translate-y-1/2 pointer-events-none rounded-full" />
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1] mb-6">
            Case<br />Studies.
          </h2>
          <p className="text-white/30 text-sm md:text-base max-w-xs leading-relaxed font-light">
            A selection of engineering work spanning ML pipelines, computer vision, and autonomous agents.
          </p>
        </div>

        {/* Project cards */}
        {projects.map((project, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[75vw] md:w-[50vw] lg:w-[45vw] h-[75vh] max-h-[600px] px-4"
          >
            <div 
              className="glass-card h-full p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-700 cursor-none"
              data-cursor-hover
            >
              {/* Massive background number bleeding off the card */}
              <span className="absolute -top-12 -right-12 text-[14rem] md:text-[20rem] font-serif italic text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-700 leading-none select-none pointer-events-none">
                {project.number}
              </span>

              {/* Fluid Glow Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-xs font-mono text-indigo-400/50">
                    {project.number}
                  </span>
                  <div className="h-[1px] w-12 bg-white/10 group-hover:w-24 transition-all duration-700" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">{project.year}</span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight text-white/80 group-hover:text-white transition-colors duration-500">
                  {project.title}
                </h3>

                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/30 mb-8 border-l border-white/10 pl-4">
                  {project.context}
                </p>

                <p className="text-sm md:text-lg text-white/40 leading-relaxed max-w-lg group-hover:text-white/60 transition-colors duration-500 font-light">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-8 border-t border-white/[0.05] pt-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-[11px] uppercase tracking-[0.1em] text-white/40 group-hover:bg-white/[0.05] group-hover:text-white/80 transition-colors duration-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-[15vw]" />
      </div>
    </section>
  );
}
