"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    title: "Core ML & Agents",
    number: "01",
    description:
      "Building intelligent systems that reason, act, and learn autonomously from vision models to agent orchestration.",
    tags: ["Langchain", "Pytorch", "LLMs", "huggingFaceTransformers"],
  },
  {
    title: "Data & Infrastructure",
    number: "02",
    description:
      "Designing robust data pipelines and backend systems that scale — from relational stores to real-time processing.",
    tags: ["Python", "SQL", "PostgreSQL", "TypeScript"],
  },
  {
    title: "MLOps & Deployment",
    number: "03",
    description:
      "Bridging the gap between experiments and production — containerized, monitored, and ready for real users.",
    tags: ["FastAPI", "Streamlit", "Docker", "AWS", "CI/CD"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const rowVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative py-32 md:py-48 section-padding"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/25 block mb-4">
            03 — Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] gradient-text">
            The Stack
          </h2>
        </div>
        <p className="text-white/40 max-w-sm text-sm md:text-base leading-relaxed">
          A comprehensive toolkit spanning from foundational model training to scalable production deployments.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto flex flex-col"
      >
        {/* Top Border */}
        <div className="w-full h-[1px] bg-white/10" />

        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
            variants={rowVariants}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Hover Background Glow / Fluid Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-700 pointer-events-none -z-10 ${hoveredIndex === i ? "opacity-100" : ""
                }`}
            />

            {/* The Row */}
            <div
              className="flex flex-col md:flex-row md:items-center py-10 md:py-16 gap-6 md:gap-12 cursor-none relative z-10"
              data-cursor-hover
            >
              <span className="text-sm font-mono text-white/20 md:w-16 flex-shrink-0 transition-colors duration-500 group-hover:text-indigo-300/50">
                {skill.number}
              </span>

              <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-white/80 transition-colors duration-500 group-hover:text-white md:w-1/3">
                {skill.title}
              </h3>

              <div className="flex-1 flex flex-col gap-6">
                <p className="text-base text-white/40 leading-relaxed max-w-xl transition-colors duration-500 group-hover:text-white/80">
                  {skill.description}
                </p>

                {/* Tags overflow hidden wrapper for smooth reveal */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] ${hoveredIndex === i ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0 md:max-h-[150px] md:opacity-100"
                    }`}
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="tag-pill bg-white/[0.02] border-white/10 text-white/50 group-hover:bg-white/[0.05] group-hover:text-white group-hover:border-white/20 transition-all duration-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Border */}
            <div className={`w-full h-[1px] transition-colors duration-700 ${hoveredIndex === i ? 'bg-indigo-500/30' : 'bg-white/10'}`} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
