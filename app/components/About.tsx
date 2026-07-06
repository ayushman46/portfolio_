"use client";

import React from 'react';


export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Philosophy</span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-12">
          <h2 className="text-[32px] md:text-[48px] text-off-black leading-[1.1] font-[300] max-w-3xl">
            Technology is at its best when it disappears.
          </h2>
          
          <div className="flex flex-col gap-8 max-w-2xl text-[16px] md:text-[18px] text-steel-gray leading-[1.6]">
            <p>
              I am an AI Engineer focused on the intersection of deep learning and elegant product design. My work centers on translating complex academic research into robust, scalable software architectures.
            </p>
            <p>
              Whether I&apos;m fine-tuning a transformer model, designing a distributed inference pipeline, or crafting the UX for an agent, I aim for flawless execution. I believe the best AI applications solve hard problems without exposing the user to the friction of the underlying systems.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
