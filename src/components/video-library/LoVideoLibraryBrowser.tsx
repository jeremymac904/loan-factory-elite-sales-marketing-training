"use client";

import { useMemo, useState } from "react";
import LoVideoCard, { type LoVideoCardModel } from "./LoVideoCard";
import { getHostBadge, sourceTypeLabel } from "./hostBadge";

type SourceFilter = "All" | "long_form" | "clip";

type Props = {
  videos: LoVideoCardModel[];
};

const ALL = "All";

export default function LoVideoLibraryBrowser({ videos }: Props) {
  const [query, setQuery] = useState("");
  const [sourceType, setSourceType] = useState<SourceFilter>("All");
  const [category, setCategory] = useState<string>(ALL);
  const [hostBadge, setHostBadge] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => v.category && set.add(v.category));
    return [ALL, ...Array.from(set).sort()];
  }, [videos]);

  const hostBadgeOptions = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) =>
      set.add(
        getHostBadge({
          hostingStatus: v.hostingStatus,
          youtubeEmbedUrl: v.youtubeEmbedUrl,
          googleDriveUrl: v.googleDriveUrl,
        }).label,
      ),
    );
    return [ALL, ...Array.from(set).sort()];
  }, [videos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      const matchesQuery =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
      const matchesSource = sourceType === "All" || v.sourceType === sourceType;
      const matchesCategory = category === ALL || v.category === category;
      const matchesHost =
        hostBadge === ALL ||
        getHostBadge({
          hostingStatus: v.hostingStatus,
          youtubeEmbedUrl: v.youtubeEmbedUrl,
          googleDriveUrl: v.googleDriveUrl,
        }).label === hostBadge;
      return matchesQuery && matchesSource && matchesCategory && matchesHost;
    });
  }, [videos, query, sourceType, category, hostBadge]);

  // Browse-by-category grouping of the filtered result set.
  const grouped = useMemo(() => {
    const map = new Map<string, LoVideoCardModel[]>();
    filtered.forEach((v) => {
      const arr = map.get(v.category) ?? [];
      arr.push(v);
      map.set(v.category, arr);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const longFormCount = videos.filter((v) => v.sourceType === "long_form").length;
  const clipCount = videos.filter((v) => v.sourceType === "clip").length;

  const hasFilters = query.trim() || sourceType !== "All" || category !== ALL || hostBadge !== ALL;

  function reset() {
    setQuery("");
    setSourceType("All");
    setCategory(ALL);
    setHostBadge(ALL);
  }

  return (
    <div className="container-page section-y">
      {/* Filter bar */}
      <div className="card-compact">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-slate">Search</span>
            <input
              className="lf-select w-full"
              type="search"
              placeholder="Search by title, topic, or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-slate">Format</span>
            <select
              className="lf-select"
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as SourceFilter)}
            >
              <option value="All">All formats</option>
              <option value="long_form">{sourceTypeLabel("long_form")}</option>
              <option value="clip">{sourceTypeLabel("clip")}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-slate">Category</span>
            <select className="lf-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === ALL ? "All categories" : c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-slate">Hosting</span>
            <select className="lf-select" value={hostBadge} onChange={(e) => setHostBadge(e.target.value)}>
              {hostBadgeOptions.map((h) => (
                <option key={h} value={h}>
                  {h === ALL ? "All hosting" : h}
                </option>
              ))}
            </select>
          </label>

          {hasFilters ? (
            <button type="button" className="btn-secondary" onClick={reset}>
              Reset
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-lf-slate">
          <span className="pill">{videos.length} total</span>
          <span className="pill">{longFormCount} long form</span>
          <span className="pill">{clipCount} clips</span>
          <span className="pill">
            {filtered.length} {filtered.length === 1 ? "match" : "matches"}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card mt-6 text-center">
          <p className="text-sm font-semibold text-lf-navy">No videos match these filters.</p>
          <p className="mt-1 text-sm text-lf-slate">Try clearing the search or choosing a different category.</p>
          {hasFilters ? (
            <button type="button" className="btn-primary mt-4" onClick={reset}>
              Reset filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {grouped.map(([cat, items]) => (
            <section key={cat}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="h-display text-lg text-lf-navy">{cat}</h2>
                <span className="lf-chip">{items.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((v) => (
                  <LoVideoCard key={v.id} video={v} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
