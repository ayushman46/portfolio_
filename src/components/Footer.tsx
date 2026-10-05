import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="page-col mt-10 pb-8 pt-4 border-t border-[var(--border-color)] text-[var(--text-muted)]">
      <div className="flex flex-col gap-3">
        {/* Monogram / Brand Icon */}
        

        <div className="flex flex-col gap-1 text-xs">
          <span>
            Designed & Made by Ayushman
          </span>
          <span className="text-[var(--text-subtle)]">
            © 2026 Ayushman Chakraborty. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
