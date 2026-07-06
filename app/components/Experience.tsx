"use client";

import React from 'react';

const experiences = [
  {
    role: "Machine Learning Engineer",
    company: "TechNova Systems",
    duration: "2023 — Present",
    description: "Architecting autonomous agents for enterprise workflows. Designed a multi-agent orchestrator that reduced hallucination rates by 22% while increasing task completion speed. Led a team of 3 engineers to productionize the pipeline on AWS."
  },
  {
    role: "AI Researcher",
    company: "Quantum Labs",
    duration: "2022 — 2023",
    description: "Conducted research on multimodal perception models for autonomous robotics. Published findings on efficient attention mechanisms in low-resource environments at CVPR."
  },
  {
    role: "Software Engineering Intern",
    company: "Wipro",
    duration: "Summer 2021",
    description: "Built scalable data ingestion microservices processing over 10TB of telemetry data daily. Migrated legacy monolith to Go microservices, improving throughput by 3x."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Experience</span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-24">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-ash-gray uppercase tracking-widest">{exp.duration}</span>
                <h3 className="text-[28px] md:text-[32px] text-off-black leading-[1.2]">{exp.role}</h3>
                <span className="text-[16px] text-steel-gray">— {exp.company}</span>
              </div>
              <p className="text-[16px] md:text-[18px] text-steel-gray leading-[1.6] max-w-2xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
