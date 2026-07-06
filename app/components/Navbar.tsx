"use client";

import React from 'react';


export default function Navbar() {
  return (
    <div className="fixed top-[40px] left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
      <nav className="pointer-events-auto flex items-center gap-10 mix-blend-difference text-pure-white">
        {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[12px] md:text-[13px] uppercase tracking-widest hover:opacity-50 transition-opacity duration-500 relative group"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
