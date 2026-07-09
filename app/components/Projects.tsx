"use client";

import React from 'react';

const projects = [
  {
    title: "Codebase Intelligence System",
    type: "May 2026",
    description: "Built an AI agent that searches through files, traces imports, and identifies function ownership across six programming languages, achieving 84% accuracy in locating relevant functions.",
    architecture: "Used tree-sitter to parse and split code by functions and classes, enabling structured analysis of entire repositories. Built with Python, FastAPI, FAISS, BM25, LangChain, Groq, and Gemini.",
    link: "#",
    repo: "https://github.com"
  },
  {
    title: "InterviewAI",
    type: "Jun 2026",
    description: "A voice-based technical interview platform that scores candidates on technical skills and communication, generating automated performance reports for feedback.",
    architecture: "A real-time system built using WebSockets to stream audio and generate adaptive follow-up questions. Stack includes FastAPI, Next.js, Groq Whisper, Gemini API, and SQLAlchemy.",
    link: "https://entrevista1.vercel.app/",
    repo: "https://github.com"
  },
  {
    title: "Multimodal Document Intelligence Engine",
    type: "Feb 2026",
    description: "A document analysis and question-answering tool that achieved 86% accuracy on a document question-answering benchmark, complete with a Streamlit dashboard for testing.",
    architecture: "Designed a flexible FastAPI backend architecture supporting swappable search strategies, including Optical Character Recognition (OCR) and vector search (FAISS, BM25).",
    link: "#",
    repo: "https://github.com"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-20">
          <span className="text-[15px] uppercase tracking-[0.2em] text-[#888888] font-[500] font-ultrabold">
            Case Studies
          </span>
        </div>

        <div className="flex flex-col gap-32 items-center w-full max-w-[1000px]">
          {projects.map((project, idx) => (
            <div key={idx} className="flex flex-col gap-12 items-center group w-full">
              <div className="flex flex-col gap-4 items-center text-center">
                <h3 className="text-[28px] md:text-[56px] text-[#111111] leading-[1.1] font-[500] tracking-[-0.03em]">{project.title}</h3>
                <span className="text-[13px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">{project.type}</span>
              </div>

              {/* Minimalist Image Area without Borders */}
              <div className="w-full max-w-[900px] aspect-[16/9] bg-[rgba(0,0,0,0.02)] flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                <span className="text-[13px] text-[#888888] uppercase tracking-[0.2em] opacity-50 font-[500]">Visualization</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-[900px]">
                <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                  <span className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500]">Context</span>
                  <p className="text-[16px] md:text-[18px] text-[#555555] leading-[1.7] font-[400]">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                  <span className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500]">Architecture</span>
                  <p className="text-[16px] md:text-[18px] text-[#555555] leading-[1.7] font-[400]">
                    {project.architecture}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-4">
                <a href={project.link} className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
                  Live project link
                  <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </a>
                <a href={project.repo} className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
                  View Repository
                  <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
