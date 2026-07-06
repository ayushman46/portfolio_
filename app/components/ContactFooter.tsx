"use client";

import React from 'react';

export default function ContactFooter() {
  return (
    <>
      <section id="contact" className="section-padding">
        <div className="max-w-page mx-auto px-[clamp(22px,5vw,69px)] flex flex-col items-center text-center">
          
          <span className="text-[12px] text-ash-gray uppercase tracking-widest mb-12">Contact</span>
          
          <h2 className="text-[48px] md:text-[80px] text-off-black leading-[1.1] font-[300] max-w-4xl mb-12">
            Let&apos;s build something exceptional.
          </h2>
          
          <a href="mailto:hello@example.com" className="text-[16px] md:text-[18px] text-off-black hover:opacity-50 transition-opacity">
            hello@example.com
          </a>

        </div>
      </section>

      <footer className="w-full pb-[40px] px-[clamp(22px,5vw,69px)]">
        <div className="max-w-page mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <span className="text-[12px] text-ash-gray uppercase tracking-widest">
            © {new Date().getFullYear()} Ayushman Chakraborty
          </span>

          <div className="flex items-center gap-8">
            <a href="https://github.com" className="text-[12px] text-ash-gray uppercase tracking-widest hover:text-off-black transition-colors">GitHub</a>
            <a href="https://linkedin.com" className="text-[12px] text-ash-gray uppercase tracking-widest hover:text-off-black transition-colors">LinkedIn</a>
            <a href="https://twitter.com" className="text-[12px] text-ash-gray uppercase tracking-widest hover:text-off-black transition-colors">Twitter</a>
            <a href="/resume.pdf" className="text-[12px] text-ash-gray uppercase tracking-widest hover:text-off-black transition-colors">Resume</a>
          </div>
          
        </div>
      </footer>
    </>
  );
}
