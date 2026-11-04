import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

// Idle glyphs sit at .55 so they read on both themes; hover lifts them to full.
const iconClass = (active: boolean) =>
  `transition-opacity duration-200 ${active ? "opacity-100" : "opacity-[0.55] group-hover:opacity-100"}`;

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: (active) => (
      <svg
        height="18px"
        width="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={iconClass(active)}
      >
        <g fill="currentColor">
          <path
            d="M3.145 6.2L8.395 2.21C8.753 1.938 9.248 1.938 9.605 2.21L14.855 6.2C15.104 6.389 15.25 6.684 15.25 6.996V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.996C2.75 6.683 2.896 6.389 3.145 6.2Z"
            fill="currentColor"
            fillOpacity={active ? "0.35" : "0.2"}
            stroke="none"
          />
          <path
            d="M9 16V12.75"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d="M3.145 6.2L8.395 2.21C8.753 1.938 9.248 1.938 9.605 2.21L14.855 6.2C15.104 6.389 15.25 6.684 15.25 6.996V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25V6.996C2.75 6.683 2.896 6.389 3.145 6.2Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    ),
  },

  {
    name: "Work",
    href: "/work",
    icon: (active) => (
      <svg
        height="18px"
        width="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={iconClass(active)}
      >
        <g fill="currentColor">
          <rect
            x="2.25"
            y="5.25"
            width="13.5"
            height="9.5"
            rx="2"
            fillOpacity={active ? "0.35" : "0.2"}
            stroke="none"
          />
          <rect
            x="2.25"
            y="5.25"
            width="13.5"
            height="9.5"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M6.75 5.25V3.75C6.75 3.198 7.198 2.75 7.75 2.75H10.25C10.802 2.75 11.25 3.198 11.25 3.75V5.25"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path d="M2.25 9.25H15.75" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </g>
      </svg>
    ),
  },

  {
    name: "Projects",
    href: "/projects",
    icon: (active) => (
      <svg
        height="18px"
        width="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={iconClass(active)}
      >
        <g fill="currentColor">
          <path
            d="M9.5 2.75L11.412 7.587L16.25 9.5L11.412 11.413L9.5 16.25L7.587 11.413L2.75 9.5L7.587 7.587L9.5 2.75Z"
            fill="currentColor"
            fillOpacity={active ? "0.35" : "0.2"}
            stroke="none"
          />
          <path
            d="M5.658 2.99L4.395 2.569L3.974 1.306C3.837 0.898 3.162 0.898 3.025 1.306L2.604 2.569L1.341 2.99C1.137 3.058 0.999 3.249 0.999 3.464C0.999 3.679 1.137 3.87 1.341 3.938L2.604 4.359L3.025 5.622C3.093 5.826 3.285 5.964 3.5 5.964C3.715 5.964 3.906 5.826 3.975 5.622L4.396 4.359L5.659 3.938C5.863 3.87 6.001 3.679 6.001 3.464C6.001 3.249 5.862 3.058 5.658 2.99Z"
            fill="currentColor"
            stroke="none"
          />
          <path
            d="M9.5 2.75L11.412 7.587L16.25 9.5L11.412 11.413L9.5 16.25L7.587 11.413L2.75 9.5L7.587 7.587L9.5 2.75Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    ),
  },

  {
    name: "Skills",
    href: "/skills",
    icon: (active) => (
      <svg
        height="18px"
        width="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={iconClass(active)}
      >
        <g fill="currentColor">
          <path
            d="M15.183 2.743C8.178 3.218 4.685 8.779 3.815 11.5C4.499 12.011 6.58 12.906 9.423 12.392C12.266 11.878 12.975 9.748 12.974 8.747C15.128 7.423 14.085 5.376 15.183 2.743Z"
            fill="currentColor"
            fillOpacity={active ? "0.35" : "0.2"}
            stroke="none"
          />
          <path
            d="M12.974 8.731C12.5 12.422 9.25 12.844 6 12.25"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d="M2.75 15.25C2.75 15.25 4.062 3.729 15.25 2.75C14.69 3.726 14.677 5.355 14.304 6.989C13.78 9 11.969 9.25 9.75 9.25"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    ),
  },

  {
    name: "Blog",
    href: "/blogs",
    icon: (active) => (
      <svg
        height="18px"
        width="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={iconClass(active)}
      >
        <g fill="currentColor">
          {/* Document background */}
          <path
            d="M4.75 2.25H11L14 5.25V14.25C14 15.216 13.216 16 12.25 16H4.75C3.784 16 3 15.216 3 14.25V4C3 3.034 3.784 2.25 4.75 2.25Z"
            fill="currentColor"
            fillOpacity={active ? "0.35" : "0.2"}
            stroke="none"
          />
          {/* Document outline */}
          <path
            d="M4.75 2.25H11L14 5.25V14.25C14 15.216 13.216 16 12.25 16H4.75C3.784 16 3 15.216 3 14.25V4C3 3.034 3.784 2.25 4.75 2.25Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          {/* Folded corner */}
          <path
            d="M11 2.5V5.25H13.75"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          {/* Text lines */}
          <path
            d="M6 8H11M6 10.5H11M6 13H9"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    ),
  },
];

// Auto-hide on phones only: hide while reading downwards, come back on any upward scroll.
const PHONE_QUERY = "(max-width: 639px)";
const HIDE_AFTER_Y = 160;
const ALWAYS_SHOW_ABOVE_Y = 120;
const SCROLL_DELTA = 6;
const BOTTOM_ZONE = 160;

// 44px tall hit area for every item (40px wide below 360px, 44px from there). pb-1 lifts the
// glyph + label 2px so the active dot underneath clears descenders (the j in Projects, the g in Blog).
const itemClass =
  "relative group flex h-11 min-w-10 min-[360px]:min-w-11 flex-col items-center justify-center rounded-full px-1 pb-1 min-[360px]:px-1.5 sm:px-2.5";

const labelClass = "mt-1 text-[10px] leading-none tracking-tight sm:text-[11px]";

/** Only devices that really hover get the sliding pill, so a tap on a phone never leaves one stuck. */
const canHover = () => window.matchMedia("(hover: hover)").matches;

const isFocusVisible = (el: Element) => {
  try {
    return el.matches(":focus-visible");
  } catch {
    return false;
  }
};

export const DockNavbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - BOTTOM_ZONE;
      const focusInside = dockRef.current?.contains(document.activeElement) ?? false;

      if (!phone.matches || y < ALWAYS_SHOW_ABOVE_Y || nearBottom || focusInside) {
        lastY = y;
        setHidden(false);
        return;
      }

      // Small jitters accumulate until they cross the threshold.
      const delta = y - lastY;
      if (Math.abs(delta) <= SCROLL_DELTA) return;
      lastY = y;
      setHidden(delta > 0 && y > HIDE_AFTER_Y);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    phone.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      phone.removeEventListener("change", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Always come back on navigation (e.g. one project page to the next).
  useEffect(() => {
    setHidden(false);
  }, [location.pathname]);

  // Mirrored on <html> so the bottom blur can fade out with the dock.
  useEffect(() => {
    document.documentElement.dataset.dock = hidden ? "hidden" : "shown";
  }, [hidden]);

  useEffect(
    () => () => {
      document.documentElement.dataset.dock = "shown";
    },
    [],
  );

  const hoverProps = (key: string) => ({
    onMouseEnter: () => {
      if (canHover()) setHovered(key);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (canHover() || isFocusVisible(e.currentTarget)) setHovered(key);
    },
  });

  // Soft pill that slides between dock items as the cursor moves.
  const hoverPill = (key: string) =>
    hovered === key && (
      <motion.span
        layoutId="dock-hover"
        aria-hidden
        className="absolute inset-0 rounded-full bg-[var(--text-primary)]/[0.08] ring-1 ring-[var(--text-primary)]/[0.06]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 38 }}
      />
    );

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div
      ref={dockRef}
      id="navigation-menu"
      onFocusCapture={() => setHidden(false)}
      className={`
        dock-shell
        fixed
        left-1/2
        -translate-x-1/2
        bottom-[calc(0.75rem+env(safe-area-inset-bottom))]
        sm:bottom-6
        z-[999]
        rounded-full
        border
        border-[var(--dock-border)]
        bg-[var(--dock-bg)]
        backdrop-blur-[12px]
        backdrop-saturate-150
        px-1.5
        py-1
        min-[360px]:px-2
        sm:px-3
        sm:py-1.5
        transition-transform
        duration-300
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${hidden ? "translate-y-[calc(100%+2rem+env(safe-area-inset-bottom))]" : "translate-y-0"}
      `}
    >
      <nav
        aria-label="Primary"
        className="flex items-center gap-0 min-[360px]:gap-0.5 sm:gap-3"
        onMouseLeave={() => setHovered(null)}
        onBlur={() => setHovered(null)}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
              {...hoverProps(item.name)}
              className={itemClass}
            >
              <AnimatePresence>{hoverPill(item.name)}</AnimatePresence>
              <span
                className={`relative z-10 flex flex-col items-center transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                }`}
              >
                {item.icon(isActive)}
                <span className={`${labelClass} ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.name}
                </span>
              </span>

              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  aria-hidden
                  className="absolute bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-strong)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        <div
          aria-hidden
          className="mx-0.5 h-6 w-px shrink-0 bg-[var(--border-color)] min-[360px]:mx-1"
        />

        {/* Light / Dark theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          {...hoverProps("theme")}
          aria-label={`Switch to ${nextTheme} theme`}
          className={`${itemClass} cursor-pointer`}
        >
          <AnimatePresence>{hoverPill("theme")}</AnimatePresence>
          <span className="relative z-10 flex flex-col items-center text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
            {/* initial={false}: the icon is there the moment the dock mounts */}
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.6, opacity: 0, transition: { duration: 0.12 } }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex h-[18px] w-[18px] items-center justify-center"
              >
                {theme === "dark" ? (
                  <FiSun aria-hidden className={`text-[15px] ${iconClass(false)}`} />
                ) : (
                  <FiMoon aria-hidden className={`text-[15px] ${iconClass(false)}`} />
                )}
              </motion.span>
            </AnimatePresence>

            <span className={`${labelClass} font-medium`}>Theme</span>
          </span>
        </button>
      </nav>
    </div>
  );
};

export default DockNavbar;
