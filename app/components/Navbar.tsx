"use client";

import React from 'react';


export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none pt-[24px] gap-3">
      
      {/* Top Row: Asterisk and Nav Pill */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button className="w-10 h-10 rounded-[12px] bg-[#F2F2F2] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
          </svg>
        </button>
        
        <nav className="h-10 px-6 rounded-[12px] bg-[#F2F2F2] flex items-center gap-8">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] text-[#111111] font-[400] transition-opacity hover:opacity-50"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>



    </div>
  );
}
