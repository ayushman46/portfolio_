"use client";

import React from 'react';

const experiences = [
  {
    role: "Software Engineering & Generative AI Intern",
    company: "Wipro Limited",
    duration: "Jun 2025 — Jul 2025",
    description: "Built AutoBlog, an AI tool that automatically converts technical videos into written blog posts with code snippets. Created a backend system using Python and Azure OpenAI to extract audio and code from videos across 30 corporate sources. Designed a modular testing layer that improved processing speed by 40% and achieved 98% consistent outputs."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-16">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500]">
            Experience
          </span>
        </div>

        <div className="flex flex-col gap-24 items-center w-full max-w-[800px]">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col gap-6 items-center w-full">
              <div className="flex flex-col gap-3 items-center text-center">
                <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">{exp.duration}</span>
                <h3 className="text-[32px] md:text-[48px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">{exp.role}</h3>
                <span className="text-[18px] text-[#555555] font-[400] tracking-[-0.01em]">{exp.company}</span>
              </div>
              <p className="text-[18px] md:text-[20px] text-[#555555] leading-[1.7] max-w-[680px] font-[400]">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
