"use client";

import React from 'react';

export default function Skills() {
  return (
    <section id="skills" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center bg-[#FAFAFA]">
      <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
        
        <div className="mb-12">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500] font-extrabold">
            Arsenal
          </span>
        </div>

        <div className="max-w-[800px]">
          <p className="text-[20px] md:text-[40px] text-[#111111] leading-[1.4] font-[500] tracking-[-0.02em]">
            Python, SQL, JavaScript, Next.js, FastAPI, Docker, LangChain, Multi RAG Pipelines, Agentic Workflows (n8n), FAISS, PyTorch, XGBoost, pandas, NumPy, React, Node.js, MLflow, LangGraph.
          </p>
        </div>

      </div>
    </section>
  );
}
