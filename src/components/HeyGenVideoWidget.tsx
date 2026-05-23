"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { findHeyGenIntroVideo } from "@/data/heygenIntroVideos";

export default function HeyGenVideoWidget() {
  const pathname = usePathname();
  const [state, setState] = useState({
    pathname: "",
    open: true,
    loaded: false,
  });
  const video = findHeyGenIntroVideo(pathname);
  const open = state.pathname === pathname ? state.open : true;
  const loaded = state.pathname === pathname ? state.loaded : false;

  if (!video) return null;

  return (
    <aside
      className="fixed bottom-20 left-3 z-40 max-w-[calc(100vw-1.5rem)] sm:bottom-5 sm:left-5"
      aria-label={`${video.speaker} intro video`}
    >
      {open ? (
        <div className="w-[min(440px,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-white/10 bg-[#080808] text-white shadow-2xl ring-1 ring-black/50">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {video.speaker}
              </p>
              <h2 className="mt-0.5 text-sm font-semibold leading-5 text-white">
                {video.label}
              </h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/85 transition hover:border-lf-orange hover:text-lf-orange"
              onClick={() => setState({ pathname, open: false, loaded })}
              aria-label="Minimize intro video"
            >
              Minimize
            </button>
          </div>
          <div className="bg-black p-2">
            <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
              {loaded ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  allow="encrypted-media; fullscreen;"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_35%_30%,rgba(242,106,31,0.24),transparent_34%),linear-gradient(135deg,#111,#050505)] p-6 text-center"
                  onClick={() => setState({ pathname, open: true, loaded: true })}
                  aria-label={`Play ${video.label}`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lf-orange text-sm font-bold uppercase tracking-wide text-white shadow-lg">
                    Play
                  </span>
                  <span className="max-w-xs text-sm font-semibold leading-6 text-white/90">
                    Click play to load the intro video.
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#080808] p-0 text-left text-white shadow-2xl ring-1 ring-black/50 transition hover:-translate-y-0.5 hover:border-lf-orange sm:h-auto sm:w-auto sm:max-w-[min(330px,calc(100vw-1.5rem))] sm:justify-start sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3"
          onClick={() => setState({ pathname, open: true, loaded })}
          aria-label={video.label}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lf-orange text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Play
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {video.speaker}
            </span>
            <span className="block truncate text-sm font-semibold">
              {video.label}
            </span>
          </span>
        </button>
      )}
    </aside>
  );
}
