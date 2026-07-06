"use client";

import React from 'react';

export default function ResumeEducation() {
  return (
    <section className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Education</span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-[12px] text-ash-gray uppercase tracking-widest">2021 — 2023</span>
            <h3 className="text-[24px] md:text-[28px] text-off-black leading-[1.2]">Stanford University</h3>
            <span className="text-[16px] text-off-black">M.S. in Artificial Intelligence</span>
            <p className="text-[16px] text-steel-gray leading-[1.6] max-w-2xl">
              Coursework: Deep Learning, Probabilistic Graphical Models, Convex Optimization.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-[12px] text-ash-gray uppercase tracking-widest">2017 — 2021</span>
            <h3 className="text-[24px] md:text-[28px] text-off-black leading-[1.2]">University of Washington</h3>
            <span className="text-[16px] text-off-black">B.S. in Computer Science</span>
            <p className="text-[16px] text-steel-gray leading-[1.6] max-w-2xl">
              Graduated with Honors. Focus on embedded systems and high-performance computing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
