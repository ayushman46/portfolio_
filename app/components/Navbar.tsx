"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation (Unchanged, hidden on mobile) */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-[100] flex-col items-center pointer-events-none pt-[24px] gap-3">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button className="w-10 h-10 rounded-[12px] bg-[#F2F2F2] flex items-center justify-center hover:bg-[#E5E5E5] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
              <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
            </svg>
          </button>
          
          <nav className="h-10 px-6 rounded-[12px] bg-[#F2F2F2] flex items-center gap-8">
            {navItems.map((item) => (
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

      {/* Mobile Sticky Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 pointer-events-auto bg-white/80 backdrop-blur-md border-b border-black/5">
        <button className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
          </svg>
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 rounded-full bg-[#111111] flex flex-col items-center justify-center gap-[4px] active:scale-95 transition-transform"
        >
          <span className="w-4 h-[2px] bg-white rounded-full" />
          <span className="w-4 h-[2px] bg-white rounded-full" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-[200] bg-[#FAFAFA] flex flex-col pointer-events-auto h-[100dvh]"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white">
              <button className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1L19.1 4.9" />
                </svg>
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col px-8 py-12 gap-8 overflow-y-auto flex-1">
              <span className="text-[12px] text-[#AAAAAA] uppercase tracking-[0.2em] font-[500]">Menu</span>
              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[36px] text-[#111111] font-[500] tracking-[-0.03em] active:opacity-50 transition-opacity border-b border-black/5 pb-6"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
