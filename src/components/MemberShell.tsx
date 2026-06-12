"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The member app frame: on desktop the shell is pinned to the viewport
 * (measured below the header and any review banner), the left sidebar stays
 * stationary, and ONLY the center content column scrolls — like Slack or
 * Skool. On mobile everything flows and the page scrolls normally.
 */
export default function MemberShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    function fit() {
      if (!frame) return;
      if (window.innerWidth < 1024) {
        frame.style.height = "";
        return;
      }
      const top = frame.getBoundingClientRect().top + window.scrollY;
      frame.style.height = `${Math.max(window.innerHeight - top, 480)}px`;
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      ref={frameRef}
      className="grid w-full grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)] lg:overflow-hidden"
    >
      {sidebar}
      <div className="min-w-0 p-4 md:p-6 lg:overflow-y-auto xl:p-8">{children}</div>
    </div>
  );
}
