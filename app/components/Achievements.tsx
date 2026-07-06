"use client";

import React from 'react';

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Distinctions</span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-[12px] text-ash-gray uppercase tracking-widest">2023</span>
            <h3 className="text-[24px] md:text-[28px] text-off-black leading-[1.2]">NeurIPS AutoRL Challenge</h3>
            <p className="text-[16px] text-steel-gray leading-[1.6] max-w-2xl">1st Place. Developed an automated reinforcement learning pipeline that outperformed 200+ global teams.</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[12px] text-ash-gray uppercase tracking-widest">2022</span>
            <h3 className="text-[24px] md:text-[28px] text-off-black leading-[1.2]">IEEE CVPR Spotlight</h3>
            <p className="text-[16px] text-steel-gray leading-[1.6] max-w-2xl">Published Author. &quot;Efficient Multi-modal Attention for Edge Devices&quot; accepted as a spotlight paper.</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[12px] text-ash-gray uppercase tracking-widest">2021-23</span>
            <h3 className="text-[24px] md:text-[28px] text-off-black leading-[1.2]">Open Source Core Contributor</h3>
            <p className="text-[16px] text-steel-gray leading-[1.6] max-w-2xl">Merged multiple PRs into PyTorch and HuggingFace Transformers, optimizing specific CUDA kernels for lower latency.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
