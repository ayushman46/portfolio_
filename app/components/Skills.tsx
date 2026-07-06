"use client";

import React from 'react';

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Arsenal</span>
        </div>

        <div className="md:col-span-8">
          <p className="text-[24px] md:text-[32px] text-off-black leading-[1.6] max-w-4xl font-[300]">
            Python, PyTorch, CUDA, LangGraph, LangChain, FastAPI, React, TypeScript, Next.js, Node.js, PostgreSQL, AWS, Docker, Kubernetes, C++, Go, Rust.
          </p>
        </div>

      </div>
    </section>
  );
}
