"use client";

import React from 'react';


export default function About() {
  return (
    <section id="about" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-6">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500]">
            About
          </span>
        </div>

        <h2 className="text-[40px] md:text-[56px] lg:text-[64px] text-[#111111] leading-[1.1] font-[500] max-w-[800px] mb-12 tracking-[-0.03em]">
          Turning complex data into reliable, everyday applications.
        </h2>

        <div className="flex flex-col gap-6 max-w-[680px] text-[18px] md:text-[20px] text-[#555555] leading-[1.7] font-[400] tracking-[-0.01em]">
          <p>
            I am an AI Engineer focused on the intersection of deep learning and elegant product design. My work centers on translating complex academic research into robust, scalable software architectures.
          </p>
          <p>
            Whether I&apos;m fine-tuning a transformer model, designing a distributed inference pipeline, or crafting the UX for an agent, I aim for flawless execution. I believe the best AI applications solve hard problems without exposing the user to the friction of the underlying systems.
          </p>
        </div>

      </div>
    </section>
  );
}
