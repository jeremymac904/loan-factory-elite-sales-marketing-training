"use client";

import { useMemo, useState } from "react";
import {
  LoDevelopmentClip,
  loDevelopmentClipLibrary,
} from "@/data/loDevelopmentClipLibrary";

type Filters = {
  section: string;
  category: string;
  audience: string;
  priority: string;
  source: string;
  youtubeStatus: string;
};

const allValue = "all";

const initialFilters: Filters = {
  section: allValue,
  category: allValue,
  audience: allValue,
  priority: allValue,
  source: allValue,
  youtubeStatus: allValue,
};

export default function ClipLibraryExplorer() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const options = useMemo(() => {
    return {
      sections: unique(loDevelopmentClipLibrary.map((clip) => clip.platformSection)),
      categories: unique(loDevelopmentClipLibrary.map((clip) => clip.category)),
      audiences: unique(loDevelopmentClipLibrary.flatMap((clip) => clip.audience)),
      priorities: unique(loDevelopmentClipLibrary.map((clip) => clip.priority)),
      sources: unique(loDevelopmentClipLibrary.map((clip) => clip.sourceTrainingName)),
      youtubeStatuses: unique(
        loDevelopmentClipLibrary.map((clip) => clip.youtubeStatus),
      ),
    };
  }, []);

  const filteredClips = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return loDevelopmentClipLibrary.filter((clip) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          clip.title,
          clip.topicSummary,
          clip.whatTheLoLearns,
          clip.platformSection,
          clip.category,
          clip.sourceTrainingName,
          ...clip.tags,
          ...clip.audience,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        matches(filters.section, clip.platformSection) &&
        matches(filters.category, clip.category) &&
        matches(filters.audience, clip.audience) &&
        matches(filters.priority, clip.priority) &&
        matches(filters.source, clip.sourceTrainingName) &&
        matches(filters.youtubeStatus, clip.youtubeStatus)
      );
    });
  }, [filters, query]);

  return (
    <>
      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Internal training clips" value={loDevelopmentClipLibrary.length} />
          <StatCard label="Approved user access" value={loDevelopmentClipLibrary.length} />
          <StatCard
            label="Video embeds to add"
            value={
              loDevelopmentClipLibrary.filter(
                (clip) => clip.youtubeStatus === "youtube_hold",
              ).length
            }
          />
        </div>
      </section>

      <section className="container-page pb-8">
        <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
            <label className="grid gap-1 text-sm font-semibold text-lf-charcoal lg:col-span-4">
              Search
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="rounded-xl border border-lf-line px-3 py-2 text-base font-normal outline-none transition focus:border-lf-orange"
                aria-label="Search topic, category, source, tag, or audience"
              />
            </label>
            <FilterSelect
              label="Platform section"
              value={filters.section}
              options={options.sections}
              onChange={(value) => setFilters((f) => ({ ...f, section: value }))}
            />
            <FilterSelect
              label="Category"
              value={filters.category}
              options={options.categories}
              onChange={(value) => setFilters((f) => ({ ...f, category: value }))}
            />
            <FilterSelect
              label="Audience"
              value={filters.audience}
              options={options.audiences}
              onChange={(value) => setFilters((f) => ({ ...f, audience: value }))}
            />
            <FilterSelect
              label="Priority"
              value={filters.priority}
              options={options.priorities}
              onChange={(value) => setFilters((f) => ({ ...f, priority: value }))}
            />
            <FilterSelect
              label="Source training"
              value={filters.source}
              options={options.sources}
              onChange={(value) => setFilters((f) => ({ ...f, source: value }))}
            />
            <FilterSelect
              label="YouTube status"
              value={filters.youtubeStatus}
              options={options.youtubeStatuses}
              onChange={(value) =>
                setFilters((f) => ({ ...f, youtubeStatus: value }))
              }
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilters(initialFilters);
                }}
                className="btn-secondary w-full justify-center"
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-lf-slate">
            Showing {filteredClips.length} of {loDevelopmentClipLibrary.length} clips
          </p>
          <p className="text-sm font-semibold text-lf-orangeDark">
            Available inside the LO Development Platform
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredClips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} />
          ))}
        </div>
      </section>
    </>
  );
}

function ClipCard({ clip }: { clip: LoDevelopmentClip }) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-lf-orangeSoft px-3 py-1 text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
          {clip.status}
        </span>
        <span className="rounded-full border border-lf-line px-3 py-1 text-xs font-semibold text-lf-slate">
          {clip.priority}
        </span>
      </div>
      <h2 className="h-display mt-4 text-xl">{clip.title}</h2>
      <p className="prose-lf mt-3 text-sm text-lf-slate">{clip.topicSummary}</p>
      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <Info label="Platform section" value={clip.platformSection} />
        <Info label="Category" value={clip.category} />
        <Info label="Duration" value={clip.duration} />
        <Info label="Video status" value={clip.videoStatus} />
      </div>
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
          What the LO learns
        </p>
        <p className="prose-lf mt-1 text-sm text-lf-charcoal">
          {clip.whatTheLoLearns}
        </p>
      </div>
      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <Info label="Audience" value={clip.audience.join(", ")} />
        <Info label="Source training" value={clip.sourceTrainingName} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {clip.tags.slice(0, 7).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-lf-mist px-2.5 py-1 text-xs font-semibold text-lf-slate"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold text-lf-orangeDark">
        Training clip metadata staged
      </p>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-lf-line bg-white px-3 py-2 text-sm font-normal outline-none transition focus:border-lf-orange"
      >
        <option value={allValue}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {displayValue(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-semibold text-lf-navy">
        {value}
      </p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="mt-1 font-semibold text-lf-charcoal">
        {displayValue(value)}
      </p>
    </div>
  );
}

function matches(filter: string, value: string | string[]) {
  if (filter === allValue) return true;
  return Array.isArray(value) ? value.includes(filter) : value === filter;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function displayValue(value: string) {
  return value.replaceAll("_", " ");
}
