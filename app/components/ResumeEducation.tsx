"use client";

import React from 'react';

export default function ResumeEducation() {
  return (
    <section className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-16">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500]">
            Education
          </span>
        </div>

        <div className="flex flex-col gap-20 items-center w-full max-w-[800px]">
          <div className="flex flex-col gap-4 items-center text-center">
            <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">2023 — 2027</span>
            <h3 className="text-[32px] md:text-[48px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">Manipal Institute of Technology</h3>
            <span className="text-[18px] text-[#555555] font-[400] tracking-[-0.01em]">B.Tech in Computer Science & Engineering (Data Science)</span>
            <p className="text-[18px] md:text-[20px] text-[#555555] leading-[1.7] max-w-[600px] font-[400] mt-2">
              CGPA: 7.5/10. Coursework: Data Structures and Algorithms, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
