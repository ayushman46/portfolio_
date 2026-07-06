"use client";

import React from 'react';

const projects = [
  {
    title: "NeuroVision Core",
    type: "Open Source Research",
    description: "A hardware-accelerated computer vision framework designed for edge devices. Capable of running complex object detection models with minimal latency using custom CUDA kernels.",
    architecture: "The system is built on a modular C++ backbone with PyTorch bindings. Critical bottleneck operations like matrix multiplications and attention mechanisms are offloaded to custom-written CUDA kernels. Communication between the vision pipeline and the user application is handled via a low-latency gRPC interface.",
    link: "#",
    repo: "#"
  },
  {
    title: "Agentic Trading System",
    type: "Production System",
    description: "An autonomous multi-agent system that analyzes financial documents, market sentiment, and historical data to propose quantitative trading strategies using a mixture-of-experts approach.",
    architecture: "Built using Python and LangChain. A fleet of specialized LLM agents debate trading decisions. A RAG pipeline continuously ingests SEC filings and news into a Pinecone vector database. The orchestrator maintains context windows and executes simulated trades.",
    link: "#",
    repo: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[120px]">
        
        <div className="md:col-span-4 flex flex-col items-start pt-2">
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">Case Studies</span>
        </div>

        <div className="md:col-span-8 flex flex-col gap-32">
          {projects.map((project, idx) => (
            <div key={idx} className="flex flex-col gap-12 group">
              <div className="flex flex-col gap-4">
                <h3 className="text-[32px] md:text-[48px] text-off-black leading-[1.1] font-[300]">{project.title}</h3>
                <span className="text-[12px] text-ash-gray uppercase tracking-widest">{project.type}</span>
              </div>

              {/* Minimalist Image Area without Borders */}
              <div className="w-full aspect-[16/9] bg-[rgba(0,0,0,0.02)] flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <span className="text-[12px] text-ash-gray uppercase tracking-widest opacity-50">Visualization</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <div className="flex flex-col gap-4">
                  <span className="text-[12px] text-off-black uppercase tracking-widest">Context</span>
                  <p className="text-[14px] md:text-[16px] text-steel-gray leading-[1.6]">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[12px] text-off-black uppercase tracking-widest">Architecture</span>
                  <p className="text-[14px] md:text-[16px] text-steel-gray leading-[1.6]">
                    {project.architecture}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <a href={project.link} className="text-[12px] text-off-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                  View Case Study
                </a>
                <a href={project.repo} className="text-[12px] text-off-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                  View Repository
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
