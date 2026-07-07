"use client";

import React from 'react';

export default function ContactFooter() {
  return (
    <>
      <section id="contact" className="py-[12vh] md:py-[18vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center">
          
          <div className="mb-12">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#888888] font-[500]">
              Contact
            </span>
          </div>
          
          <h2 className="text-[40px] md:text-[64px] lg:text-[80px] text-[#111111] leading-[1.1] font-[500] max-w-[800px] mb-12 tracking-[-0.03em]">
            Let&apos;s build something exceptional.
          </h2>
          
          <div className="flex flex-col items-center gap-8 mt-4">
            <a href="mailto:ayushman.mitblr@gmail.com" className="text-[18px] md:text-[20px] text-[#111111] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
              ayushman.mitblr@gmail.com
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
            
            <a href="/Ayushman_Chakrabortyresume.pdf" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-[0.2em] text-[#111111] font-[500] px-8 py-4 border border-[#111111]/20 rounded-full hover:bg-[#111111] hover:text-white transition-colors duration-300">
              Download Resume
            </a>
          </div>

        </div>
      </section>

      <footer className="w-full pb-[60px] px-[clamp(22px,5vw,69px)]">
        <div className="max-w-page mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <span className="text-[13px] text-[#888888] uppercase tracking-[0.2em] font-[500]">
            © {new Date().getFullYear()} Ayushman Chakraborty
          </span>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <a href="https://github.com" className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
              GitHub
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
            <a href="https://linkedin.com" className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
              LinkedIn
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
            <a href="https://twitter.com" className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
              Twitter
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
            <a href="/Ayushman_Chakrabortyresume.pdf" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#111111] uppercase tracking-[0.2em] font-[500] transition-opacity duration-300 hover:opacity-50 relative group/link">
              Resume
              <span className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#111111] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </a>
          </div>
          
        </div>
      </footer>
    </>
  );
}
