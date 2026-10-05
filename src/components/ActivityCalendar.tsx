import React, { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../context/ThemeContext";

const CalendarSkeleton: React.FC = () => {
  const weeks = 52;
  const days = 7;

  return (
    <div className="relative flex h-[148px] w-full items-center overflow-hidden sm:h-[132px]">
      <div className="w-full overflow-x-auto pb-1 pt-1 scrollbar-none">
        <div className="flex min-w-max justify-center px-2 sm:min-w-0">
          <div className="flex gap-[2px]">
            {Array.from({ length: weeks }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[2px]">
                {Array.from({ length: days }).map((_, dayIdx) => {
                  const opacity = [0.08, 0.15, 0.25, 0.35, 0.5][
                    (weekIdx + dayIdx) % 5
                  ];
                  return (
                    <div
                      key={dayIdx}
                      className="w-[9px] h-[9px] rounded-sm animate-pulse"
                      style={{
                        backgroundColor: `var(--border-color)`,
                        opacity,
                        animationDelay: `${(weekIdx * 7 + dayIdx) * 15}ms`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
  );
};

export const ActivityCalendar: React.FC = () => {
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const { theme } = useTheme();
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = calendarRef.current;
    if (!container || calendarLoaded) return;

    const observer = new MutationObserver(() => {
      // The library renders loading blocks, then 11x11 data blocks.
      // Check if any rect has width/height of 11 (our blockSize).
      const rects = container.querySelectorAll("svg rect");
      if (rects.length === 0) return;

      const hasDataBlocks = Array.from(rects).some(
        (rect) => rect.getAttribute("width") === "11"
      );

      if (hasDataBlocks) {
        setCalendarLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [calendarLoaded]);

  return (
    <div className="box min-h-[148px] sm:min-h-[132px]">
      {!calendarLoaded && <CalendarSkeleton />}
      <div
        ref={calendarRef}
        className={`relative w-full overflow-hidden ${
          calendarLoaded ? "block" : "invisible absolute"
        }`}
      >
        <div className="w-full overflow-x-auto pb-1 pt-1 scrollbar-none">
          <div className="flex min-w-max justify-center px-2 sm:min-w-0">
          <GitHubCalendar
            username="ayushman46"
            year="last"
            blockSize={11}
            blockMargin={3}
            fontSize={11}
            colorScheme={theme === "light" ? "light" : "dark"}
            theme={{
              dark: ["#1C1D1F", "#3F3F46", "#71717A", "#D4D4D8", "#FFFFFF"],
              light: ["#EBEDF0", "#9A9A9A", "#555555", "#333333", "#111111"],
            }}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCalendar;
