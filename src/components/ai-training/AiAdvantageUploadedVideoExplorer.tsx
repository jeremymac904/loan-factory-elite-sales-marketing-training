"use client";

import { useMemo, useState } from "react";
import AiAdvantageUploadedVideoCard from "@/components/ai-training/AiAdvantageUploadedVideoCard";
import {
  aiAdvantageYoutubeEmbedValidation,
  groupAiAdvantageYoutubeEmbedsByModule,
  type AiAdvantageYoutubeEmbedRecord,
} from "@/data/aiAdvantageYoutubeEmbeds";

type Props = {
  videos: AiAdvantageYoutubeEmbedRecord[];
  className?: string;
};

const allValue = "all";

const sourceStatusLabels: Record<string, string> = {
  uploaded: "Uploaded",
  ready: "Ready",
  skipped: "Skipped",
  unknown: "Unknown",
  "source issue": "Source issue",
};

export default function AiAdvantageUploadedVideoExplorer({
  videos,
  className = "",
}: Props) {
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState(allValue);
  const [sourceStatusFilter, setSourceStatusFilter] = useState(allValue);

  const stats = useMemo(
    () => getStats(videos),
    [videos],
  );

  const moduleGroups = useMemo(
    () => groupAiAdvantageYoutubeEmbedsByModule(videos),
    [videos],
  );

  const sourceStatuses = useMemo(
    () => unique(videos.map((video) => video.sourceStatus)),
    [videos],
  );

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          video.rowId,
          video.title,
          video.module,
          video.suggestedLessonSlug,
          video.suggestedLessonPath,
          video.youtubeVideoId,
          video.youtubeVideoUrl,
          video.youtubeEmbedUrl,
          video.sourceFileName,
          video.notes,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        matches(moduleFilter, video.module) &&
        matches(sourceStatusFilter, video.sourceStatus)
      );
    });
  }, [moduleFilter, query, sourceStatusFilter, videos]);

  const filteredGroups = useMemo(
    () => groupAiAdvantageYoutubeEmbedsByModule(filteredVideos),
    [filteredVideos],
  );

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Uploaded clips" value={stats.uploaded} />
        <StatCard label="Modules" value={stats.modules} />
        <StatCard label="Embeddable" value={stats.embeddable} />
        <StatCard label="Source issues" value={stats.sourceIssues} />
      </div>

      <div className="mt-6 rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_repeat(2,minmax(0,1fr))]">
          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal lg:col-span-3">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="rounded-xl border border-lf-line px-3 py-2 text-base font-normal outline-none transition focus:border-lf-orange"
              aria-label="Search AI Advantage video title, module, lesson path, source file, or note"
              placeholder="Search title, module, lesson slug, source file, or note"
            />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Source status
            <select
              value={sourceStatusFilter}
              onChange={(event) => setSourceStatusFilter(event.target.value)}
              className="rounded-xl border border-lf-line bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-lf-orange"
            >
              <option value={allValue}>All</option>
              {sourceStatuses.map((status) => (
                <option key={status} value={status}>
                  {sourceStatusLabels[status] ?? status}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setModuleFilter(allValue);
                setSourceStatusFilter(allValue);
              }}
              className="btn-secondary w-full justify-center"
            >
              Reset filters
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill
              label="All modules"
              active={moduleFilter === allValue}
              onClick={() => setModuleFilter(allValue)}
            />
            {moduleGroups.map((group) => (
              <FilterPill
                key={group.module}
                label={`${group.module} (${group.count})`}
                active={moduleFilter === group.module}
                onClick={() => setModuleFilter(group.module)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <section key={group.module} id={group.moduleSlug}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Module
                  </p>
                  <h2 className="h-display mt-1 text-2xl">{group.module}</h2>
                </div>
                <p className="text-sm font-semibold text-lf-slate">
                  {group.count} clip{group.count === 1 ? "" : "s"}
                </p>
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {group.videos.map((video) => (
                  <AiAdvantageUploadedVideoCard key={video.rowId} video={video} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-2xl border border-lf-line bg-white p-6 shadow-card">
            <p className="text-sm font-semibold text-lf-charcoal">
              No AI Advantage videos match the current filters.
            </p>
            <p className="mt-2 text-sm leading-6 text-lf-slate">
              Clear the search or reset the source/module filters to show all
              uploaded clips again.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
        Safety note: these AI Advantage clips are unlisted. Use the embed URL
        for the player, never publish them public, and never enable subscriber
        notifications.
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-lf-navy">{value}</p>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active
          ? "border-lf-orange bg-lf-orangeSoft text-lf-orangeDark"
          : "border-lf-line bg-white text-lf-slate hover:border-lf-orange/50 hover:text-lf-orangeDark"
      }`}
    >
      {label}
    </button>
  );
}

function unique(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function matches(filterValue: string, candidate: string) {
  return filterValue === allValue || candidate === filterValue;
}

function getStats(videos: AiAdvantageYoutubeEmbedRecord[]) {
  return {
    uploaded: videos.length,
    modules: unique(videos.map((video) => video.module)).length,
    embeddable: videos.filter((video) => video.renderStatus === "embeddable")
      .length,
    sourceIssues: videos.filter((video) => video.renderStatus !== "embeddable")
      .length,
  };
}

export function getAiAdvantageEmbedValidationSummary() {
  return aiAdvantageYoutubeEmbedValidation;
}
