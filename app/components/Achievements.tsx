"use client";

import React from 'react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-16">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500]">
            Distinctions
          </span>
        </div>

        <div className="flex flex-col gap-12 md:gap-20 items-center w-full max-w-[800px]">
          <div className="flex flex-col gap-4 items-center text-center">
            <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">Aug 2025</span>
            <h3 className="text-[24px] md:text-[40px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">Hackverse Hackathon</h3>
            <p className="text-[16px] md:text-[20px] text-[#555555] leading-[1.7] max-w-[600px] font-[400]">Top 5 of 50 Teams. Organized by IBM SkillsBuild and AWS.</p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center">
            <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">2026</span>
            <h3 className="text-[24px] md:text-[40px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">LeetCode</h3>
            <p className="text-[16px] md:text-[20px] text-[#555555] leading-[1.7] max-w-[600px] font-[400]">100+ problems solved in Python across Data Structures and Algorithms.</p>
          </div>

          <div className="flex flex-col gap-4 items-center text-center">
            <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">2025</span>
            <h3 className="text-[24px] md:text-[40px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">Certifications</h3>
            <p className="text-[16px] md:text-[20px] text-[#555555] leading-[1.7] max-w-[600px] font-[400]">MLOps: Deployment and Model Life Cycling (DataCamp) • Model Context Protocol (Anthropic).</p>
          </div>
        </div>

      </div>
    </section>
  );
}
