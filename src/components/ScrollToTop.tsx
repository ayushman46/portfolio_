import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Reset scroll position on route change (BrowserRouter keeps it otherwise),
 * or scroll to the #hash target once the lazily loaded page has rendered.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    let attempts = 0;
    const id = window.setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || attempts++ > 20) {
        window.clearInterval(id);
        el?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
