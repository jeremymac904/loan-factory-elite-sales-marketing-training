"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { findHeyGenIntroVideo } from "@/data/heygenIntroVideos";

export default function HeyGenVideoWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const video = findHeyGenIntroVideo(pathname);

  if (!video) return null;

  return (
    <aside
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)]"
      aria-label={`${video.speaker} intro video`}
    >
      {open ? (
        <div className="w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-lf-navy text-white shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-black/30 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {video.speaker}
              </p>
              <h2 className="mt-0.5 text-sm font-semibold leading-5">
                {video.label}
              </h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-lf-orange hover:text-lf-orange"
              onClick={() => setOpen(false)}
              aria-label="Minimize intro video"
            >
              Minimize
            </button>
          </div>
          <div className="bg-black p-2">
            <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="h-full w-full"
                allow="encrypted-media; fullscreen;"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="group flex max-w-[min(330px,calc(100vw-2rem))] items-center gap-3 rounded-2xl border border-white/10 bg-lf-navy px-4 py-3 text-left text-white shadow-2xl transition hover:-translate-y-0.5 hover:border-lf-orange"
          onClick={() => setOpen(true)}
          aria-label={video.label}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lf-orange text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Play
          </span>
          <span className="min-w-0">
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
