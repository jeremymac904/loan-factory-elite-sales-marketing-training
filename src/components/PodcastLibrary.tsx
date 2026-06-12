"use client";

import { useState } from "react";
import {
  PODCAST_CATEGORIES,
  podcastAudioUrl,
  podcastEpisodes,
  type PodcastCategory,
} from "@/data/podcasts";
import transcripts from "@/data/podcastTranscripts.generated.json";

const transcriptReady = new Set(transcripts.ready as string[]);

type Filter = PodcastCategory | "All";

/**
 * Resources > Podcast: the coaching podcast library. Audio is served from
 * /podcasts/ (local symlink to the Audio Podcast folder); transcript and
 * cover-art status come from generated metadata.
 */
export default function PodcastLibrary() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All"
      ? podcastEpisodes
      : podcastEpisodes.filter((e) => e.category === filter);

  const usedCategories = PODCAST_CATEGORIES.filter((c) =>
    podcastEpisodes.some((e) => e.category === c),
  );

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-lf-line bg-white p-4 shadow-card">
        <p className="text-sm font-semibold text-lf-slate">
          {visible.length} of {podcastEpisodes.length} episodes · audio coaching for drive time and call-block warmups
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...usedCategories] as Filter[]).map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`inline-flex items-center rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-lf-orange bg-lf-orange text-white"
                    : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((episode) => {
          const base = episode.file.replace(/\.m4a$/, "");
          const hasTranscript = transcriptReady.has(base);
          return (
            <article
              key={episode.slug}
              className="overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card"
            >
              <div className="grid gap-0 sm:grid-cols-[12rem_1fr]">
                {/* Full square artwork, never cropped: fixed tile, contain fit. */}
                <div className="flex items-start justify-center bg-[#101820] p-4 sm:p-5">
                  <img
                    src={episode.cover}
                    alt={`${episode.title} cover art`}
                    className="aspect-square w-40 max-w-full rounded-xl object-contain sm:sticky sm:top-4 sm:w-full"
                  />
                </div>
                <div className="grid gap-3 p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                      {episode.category}
                    </p>
                    <h2 className="h-display mt-1.5 text-xl">{episode.title}</h2>
                    <p className="mt-1 text-sm text-lf-charcoal">{episode.summary}</p>
                  </div>

                  <div className="grid gap-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-navy">
                      Key takeaways
                    </p>
                    <ul className="grid gap-0.5 text-sm text-lf-charcoal">
                      {episode.takeaways.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-lf-orange">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="rounded-lg border border-lf-orange/40 bg-lf-orangeSoft/40 px-3 py-2 text-sm text-lf-navy">
                    <strong>Do this:</strong> {episode.action}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <audio
                      controls
                      preload="none"
                      src={podcastAudioUrl(episode.file)}
                      className="h-10 w-full max-w-md"
                    >
                      Your browser does not support audio playback.
                    </audio>
                    {hasTranscript && (
                      <a
                        href={`/podcast-transcripts/${encodeURIComponent(base)}.srt`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-lf-orange hover:underline"
                      >
                        Read transcript
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
