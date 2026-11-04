import React, { createContext, useCallback, useContext, useState } from "react";

const SESSION_KEY = "portfolio_booted";

interface BootContextType {
  /** true once the intro has started exiting (or was never shown) */
  ready: boolean;
  /** whether the intro should play this page load */
  showIntro: boolean;
  finish: () => void;
}

const BootContext = createContext<BootContextType>({ ready: true, showIntro: false, finish: () => {} });

const shouldShowIntro = () => {
  try {
    if (window.location.pathname !== "/") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
};

export const BootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showIntro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!showIntro);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable — intro may replay next load, which is harmless */
    }
    setReady(true);
  }, []);

  return <BootContext.Provider value={{ ready, showIntro, finish }}>{children}</BootContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBoot = () => useContext(BootContext);
