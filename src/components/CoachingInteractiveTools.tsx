"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  CommunityPost,
  PlaybookResource,
  ScorecardMetric,
  ScriptResource,
  TrackerDefinition,
} from "@/data/coachingPlatform";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

type ScorecardStore = {
  values?: Record<string, number[]>;
  worked?: string;
  stuck?: string;
  focus?: string;
  status?: string;
  history?: string[];
};

function readScorecardStore(storageKey: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as ScorecardStore;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

function readTrackerStore() {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem("lf-tracker-workspace");
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as Record<string, string[][]>;
  } catch {
    window.localStorage.removeItem("lf-tracker-workspace");
    return null;
  }
}

export function WeeklyScorecardForm({
  metrics,
  title = "Weekly Scorecard",
  programLabel = "LO Mastery",
}: {
  metrics: ScorecardMetric[];
  title?: string;
  programLabel?: string;
}) {
  const storageKey = `lf-scorecard-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const defaultScorecardState = useMemo(
    () => ({
      values: Object.fromEntries(metrics.map((metric) => [metric.metric, metric.values])) as Record<string, number[]>,
      worked: "Booked two Realtor conversations from the Wednesday list.",
      stuck: "Follow-up slipped when appointments ran long.",
      focus: "Finish every follow-up before opening reactive work.",
      status: "Draft not saved",
      history: [] as string[],
      hydrated: false,
    }),
    [metrics],
  );
  const [scorecardState, setScorecardState] = useState(defaultScorecardState);
  const [copyState, setCopyState] = useState("Copy review summary");
  const { values, worked, stuck, focus, status, history, hydrated } = scorecardState;

  useEffect(() => {
    const saved = readScorecardStore(storageKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setScorecardState({
      ...defaultScorecardState,
      values: saved?.values ?? defaultScorecardState.values,
      worked: saved?.worked ?? defaultScorecardState.worked,
      stuck: saved?.stuck ?? defaultScorecardState.stuck,
      focus: saved?.focus ?? defaultScorecardState.focus,
      status: saved?.status ?? defaultScorecardState.status,
      history: saved?.history ?? defaultScorecardState.history,
      hydrated: true,
    });
  }, [defaultScorecardState, storageKey]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ values, worked, stuck, focus, status, history }),
    );
  }, [focus, history, hydrated, status, storageKey, stuck, values, worked]);

  const totals = useMemo(
    () =>
      metrics.map((metric) => {
        const total = values[metric.metric]?.reduce((sum, value) => sum + value, 0) ?? 0;
        const percent = metric.goal > 0 ? Math.round((total / metric.goal) * 100) : 0;
        return { ...metric, total, percent };
      }),
    [metrics, values],
  );

  const overall = useMemo(() => {
    const totalPercent = totals.reduce((sum, metric) => sum + Math.min(metric.percent, 100), 0);
    return Math.round(totalPercent / totals.length);
  }, [totals]);

  function updateMetric(metric: string, dayIndex: number, nextValue: string) {
    const parsed = Number(nextValue);
    setScorecardState((current) => {
      const row = [...(current.values[metric] ?? [0, 0, 0, 0, 0])];
      row[dayIndex] = Number.isFinite(parsed) ? parsed : 0;
      return { ...current, values: { ...current.values, [metric]: row } };
    });
  }

  async function copySummary() {
    const lines = [
      title,
      `Overall activity score: ${overall}%`,
      ...totals.map((metric) => `${metric.metric}: ${metric.total}/${metric.goal} (${metric.percent}%)`),
      `Biggest win: ${worked}`,
      `Biggest stuck point: ${stuck}`,
      `Next week commitment: ${focus}`,
    ];

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy review summary"), 1400);
    }
  }

  function saveDraft() {
    const stamp = new Date().toLocaleString();
    setScorecardState((current) => ({
      ...current,
      status: `Draft saved ${stamp}`,
      history: [`Draft saved ${stamp}`, ...current.history].slice(0, 5),
    }));
  }

  function submitToCoach() {
    const stamp = new Date().toLocaleString();
    setScorecardState((current) => ({
      ...current,
      status: `Submitted to coach ${stamp}`,
      history: [`Submitted to coach ${stamp}`, ...current.history].slice(0, 5),
    }));
  }

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="grid gap-4 border-b border-lf-line p-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Native tool
          </p>
          <h2 className="h-display mt-2 text-2xl">{title}</h2>
          <p className="prose-lf mt-2 text-sm text-lf-slate">
            Fill daily, save the draft, and submit the weekly review to the coach.
          </p>
        </div>
        <div className="bg-lf-navy p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Week pace
          </p>
          <p className="mt-2 text-4xl font-black">{overall}%</p>
          <p className="mt-1 text-xs text-white/65">Average capped at goal</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[790px] border-collapse text-left text-sm">
          <thead className="bg-lf-mist text-xs uppercase tracking-wide text-lf-slate">
            <tr>
              <th className="px-3 py-3">Metric</th>
              <th className="px-3 py-3">Goal</th>
              {days.map((day) => (
                <th key={day} className="px-3 py-3">
                  {day}
                </th>
              ))}
              <th className="px-3 py-3">Total</th>
              <th className="px-3 py-3">Pace</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((metric) => (
              <tr key={metric.metric} className="border-t border-lf-line">
                <td className="px-3 py-3 font-semibold text-lf-navy">{metric.metric}</td>
                <td className="px-3 py-3 text-lf-slate">{metric.goal}</td>
                {days.map((day, dayIndex) => (
                  <td key={`${metric.metric}-${day}`} className="px-3 py-3">
                    <input
                      aria-label={`${metric.metric} ${day}`}
                      type="number"
                      min="0"
                      value={values[metric.metric]?.[dayIndex] ?? 0}
                      onChange={(event) => updateMetric(metric.metric, dayIndex, event.target.value)}
                      className="h-10 w-14 rounded-lg border border-lf-line bg-white px-2 text-sm font-semibold text-lf-navy outline-none focus:border-lf-orange"
                    />
                  </td>
                ))}
                <td className="px-3 py-3 font-bold text-lf-navy">{metric.total}</td>
                <td className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-lf-orange">
                  {metric.percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 border-t border-lf-line p-5 lg:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-lf-navy">
          Biggest win
          <textarea
            aria-label="Biggest win"
            value={worked}
            onChange={(event) => setScorecardState((current) => ({ ...current, worked: event.target.value }))}
            className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-lf-navy">
          Biggest stuck point
          <textarea
            aria-label="Biggest stuck point"
            value={stuck}
            onChange={(event) => setScorecardState((current) => ({ ...current, stuck: event.target.value }))}
            className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-lf-navy">
          Next week commitment
          <textarea
            aria-label="Next week commitment"
            value={focus}
            onChange={(event) => setScorecardState((current) => ({ ...current, focus: event.target.value }))}
            className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
          />
        </label>
      </div>

      <div className="grid gap-5 border-t border-lf-line p-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="text-sm font-semibold text-lf-navy">{programLabel} submission status</p>
          <p className="mt-2 text-sm text-lf-slate">{status}</p>
          <p className="mt-2 text-sm text-lf-slate">Coach review status: waiting for coach review after submission.</p>
          {history.length > 0 && (
            <div className="mt-4 border-l-2 border-lf-orange pl-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Prior submissions</p>
              <ul className="mt-2 grid gap-1 text-sm text-lf-slate">
                {history.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button type="button" onClick={saveDraft} className="btn-secondary">
            Save draft
          </button>
          <button type="button" onClick={submitToCoach} className="btn-primary">
            Submit to coach
          </button>
          <button type="button" onClick={copySummary} className="btn-secondary">
            {copyState}
          </button>
        </div>
      </div>
    </section>
  );
}

export function TrackerWorkspace({ trackers }: { trackers: TrackerDefinition[] }) {
  const [activeSlug, setActiveSlug] = useState(trackers[0]?.slug ?? "");
  const defaultRowsByTracker = useMemo(
    () => Object.fromEntries(trackers.map((tracker) => [tracker.slug, tracker.rows])) as Record<string, string[][]>,
    [trackers],
  );
  const [trackerState, setTrackerState] = useState({
    rowsByTracker: defaultRowsByTracker,
    hydrated: false,
  });
  const [copyState, setCopyState] = useState("Copy tracker snapshot");
  const [saveState, setSaveState] = useState("Autosaved locally");
  const { rowsByTracker, hydrated } = trackerState;
  const active = trackers.find((tracker) => tracker.slug === activeSlug) ?? trackers[0];
  const rows = rowsByTracker[active.slug] ?? [];
  const filledCells = rows.flat().filter((cell) => cell.trim().length > 0).length;
  const totalCells = Math.max(rows.flat().length, 1);
  const readiness = Math.round((filledCells / totalCells) * 100);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setTrackerState({
      rowsByTracker: readTrackerStore() ?? defaultRowsByTracker,
      hydrated: true,
    });
  }, [defaultRowsByTracker]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem("lf-tracker-workspace", JSON.stringify(rowsByTracker));
  }, [hydrated, rowsByTracker]);

  function updateCell(rowIndex: number, columnIndex: number, value: string) {
    setSaveState("Unsaved changes");
    setTrackerState((current) => {
      const nextRows = (current.rowsByTracker[active.slug] ?? []).map((row) => [...row]);
      nextRows[rowIndex][columnIndex] = value;
      return {
        ...current,
        rowsByTracker: { ...current.rowsByTracker, [active.slug]: nextRows },
      };
    });
  }

  async function copyTracker() {
    const lines = [
      active.title,
      active.columns.join(" | "),
      ...rows.map((row) => row.join(" | ")),
    ];

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy tracker snapshot"), 1400);
    }
  }

  function saveTracker() {
    const stamp = new Date().toLocaleString();
    window.localStorage.setItem("lf-tracker-workspace", JSON.stringify(rowsByTracker));
    setSaveState(`Saved ${stamp}`);
  }

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="border-b border-lf-line p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Native tools
        </p>
        <h2 className="h-display mt-2 text-2xl">Execution Trackers</h2>
        <p className="prose-lf mt-2 text-sm text-lf-slate">
          Move between daily execution, relationships, deal flow, theme days, time blocks, and greatness tracking.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav className="border-b border-lf-line bg-lf-mist p-3 lg:border-b-0 lg:border-r">
          <div className="grid gap-2">
            {trackers.map((tracker) => (
              <button
                key={tracker.slug}
                type="button"
                onClick={() => setActiveSlug(tracker.slug)}
                className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                  tracker.slug === active.slug
                    ? "bg-lf-orange text-white shadow-card"
                    : "bg-white text-lf-charcoal hover:bg-lf-orangeSoft hover:text-lf-orange"
                }`}
              >
                {tracker.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0 p-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="h-display text-xl">{active.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{active.description}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={saveTracker} className="btn-primary">
                Save tracker
              </button>
              <button type="button" onClick={copyTracker} className="btn-secondary">
                {copyState}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-lf-line">
            <table className="w-full min-w-[840px] border-collapse text-left text-sm">
              <thead className="bg-lf-navy text-xs uppercase tracking-wide text-white/74">
                <tr>
                  {active.columns.map((column) => (
                    <th key={column} className="px-3 py-3">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={`${active.slug}-${rowIndex}`} className="border-t border-lf-line">
                    {row.map((cell, columnIndex) => (
                      <td key={`${active.slug}-${rowIndex}-${active.columns[columnIndex]}`} className="px-3 py-3 align-top">
                        <input
                          aria-label={`${active.title} ${rowIndex + 1} ${active.columns[columnIndex]}`}
                          value={cell}
                          onChange={(event) => updateCell(rowIndex, columnIndex, event.target.value)}
                          className="min-h-10 w-full min-w-28 rounded-lg border border-lf-line bg-white px-2 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-4 border-t border-lf-line pt-5 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Local save</p>
              <p className="mt-2 text-sm font-semibold text-lf-charcoal">{saveState}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Summary</p>
              <p className="mt-2 text-sm font-semibold text-lf-charcoal">{filledCells} of {totalCells} fields filled</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Coach review readiness</p>
              <p className="mt-2 text-sm font-semibold text-lf-charcoal">{readiness}% ready for review</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function youtubeIdFromUrl(rawUrl: string) {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  const patterns = [
    /youtu\.be\/([\w-]{6,})/i,
    /youtube\.com\/watch\?v=([\w-]{6,})/i,
    /youtube\.com\/embed\/([\w-]{6,})/i,
    /youtube\.com\/shorts\/([\w-]{6,})/i,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

function extractYoutubeId(body: string) {
  const lines = body.split("\n");
  for (const line of lines) {
    if (line.startsWith("YouTube link:")) {
      const id = youtubeIdFromUrl(line.replace("YouTube link:", "").trim());
      if (id) return id;
    }
  }
  return null;
}

function stripYoutubeLinkLine(body: string) {
  return body
    .split("\n")
    .filter((line) => !line.startsWith("YouTube link:"))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function CommunityExperience({
  posts,
  leaderboard,
}: {
  posts: CommunityPost[];
  leaderboard: string[][];
}) {
  const categories = ["All", "Pinned", "Wins", "Questions", "Scripts"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [localPosts, setLocalPosts] = useState(posts);
  const [composer, setComposer] = useState("");
  const [composerCategory, setComposerCategory] = useState("Questions");
  const [composerTitle, setComposerTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [pollPrompt, setPollPrompt] = useState("");
  const [draftState, setDraftState] = useState("Draft ready");
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const visiblePosts = localPosts.filter(
    (post) =>
      activeCategory === "All" ||
      (activeCategory === "Pinned" ? post.pinned : post.category === activeCategory),
  );

  function addPost() {
    const trimmed = composer.trim();
    if (!trimmed) {
      return;
    }

    const title =
      composerTitle.trim() || trimmed.split("\n")[0].slice(0, 80) || "Member update";
    const newPost: CommunityPost = {
      author: "You",
      role: "Member",
      category: composerCategory,
      title,
      body: [
        trimmed,
        youtubeUrl ? `YouTube link: ${youtubeUrl}` : "",
        imageCaption ? `Image caption: ${imageCaption}` : "",
        pollPrompt ? `Poll prompt: ${pollPrompt}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
      comments: [],
    };

    setLocalPosts((current) => [newPost, ...current]);
    setComposer("");
    setComposerTitle("");
    setYoutubeUrl("");
    setImageCaption("");
    setPollPrompt("");
    setDraftState("Posted locally");
  }

  function addComment(postKey: string) {
    const draft = (commentDraft[postKey] ?? "").trim();
    if (!draft) {
      return;
    }

    setLocalPosts((current) =>
      current.map((post, index) => {
        const key = `${post.title}-${index}`;
        if (key !== postKey) {
          return post;
        }
        return {
          ...post,
          comments: [...post.comments, `You: ${draft}`],
        };
      }),
    );
    setCommentDraft((current) => ({ ...current, [postKey]: "" }));
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
      <aside className="rounded-2xl border border-lf-line bg-white p-4 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Categories
        </p>
        <nav className="mt-4 grid gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                activeCategory === category
                  ? "bg-lf-orange text-white"
                  : "bg-lf-mist text-lf-charcoal hover:bg-lf-orangeSoft hover:text-lf-orange"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
        <div className="mt-5 rounded-xl bg-lf-navy p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Weekly prompt
          </p>
          <p className="mt-2 text-sm leading-6 text-white/78">
            What follow-up needs a next action before the day ends?
          </p>
        </div>
      </aside>

      <main className="grid gap-5">
        <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Post title
                <input
                  aria-label="Post title"
                  value={composerTitle}
                  onChange={(event) => {
                    setComposerTitle(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  placeholder="Short, specific, useful"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Category
                <select
                  value={composerCategory}
                  onChange={(event) => {
                    setComposerCategory(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                >
                  {["Wins", "Questions", "Scripts"].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-3 text-sm font-semibold text-lf-navy">
              Share a win, question, script example, or stuck point
              <textarea
                aria-label="Share a win, question, script example, or stuck point"
                value={composer}
                onChange={(event) => {
                  setComposer(event.target.value);
                  setDraftState("Draft saved locally");
                }}
                className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                placeholder="Write the coaching conversation you want help with..."
              />
            </label>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                YouTube link
                <input
                  aria-label="YouTube link"
                  value={youtubeUrl}
                  onChange={(event) => {
                    setYoutubeUrl(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  placeholder="Paste link"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Image caption
                <input
                  aria-label="Image caption"
                  value={imageCaption}
                  onChange={(event) => {
                    setImageCaption(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  placeholder="Describe the screenshot or chart"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Poll prompt
                <input
                  aria-label="Poll prompt"
                  value={pollPrompt}
                  onChange={(event) => {
                    setPollPrompt(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  placeholder="Optional poll question"
                />
              </label>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
            <p className="mr-auto self-center text-sm font-semibold text-lf-slate">{draftState}</p>
            <button type="button" onClick={addPost} className="btn-primary">
              Add to feed
            </button>
          </div>
        </div>

        {visiblePosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-lf-line bg-white p-8 text-center text-sm text-lf-slate">
            No posts in this category yet. Be the first to share.
          </div>
        )}

        {visiblePosts.map((post, index) => {
          const postKey = `${post.title}-${index}`;
          const youtubeId = extractYoutubeId(post.body);
          const bodyText = stripYoutubeLinkLine(post.body);
          return (
            <article
              key={postKey}
              className={`rounded-2xl border bg-white shadow-card ${
                post.pinned
                  ? "border-lf-orange/60 ring-1 ring-lf-orange/30"
                  : "border-lf-line"
              }`}
            >
              <div className="flex flex-col gap-3 border-b border-lf-line p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                    {post.pinned ? "Pinned coach post" : post.category}
                  </p>
                  <h2 className="h-display mt-3 text-2xl">{post.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-lf-slate">
                    {post.author} · {post.role}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenComments((current) => ({
                        ...current,
                        [postKey]: !(current[postKey] ?? true),
                      }))
                    }
                    className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
                  >
                    {post.comments.length} comments
                  </button>
                </div>
              </div>
              {youtubeId && (
                <div className="border-b border-lf-line bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${post.title} video`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              <div className="p-5">
                <p className="prose-lf whitespace-pre-line text-lf-charcoal">{bodyText}</p>
                <div className="mt-5 grid gap-3">
                  {(openComments[postKey] ?? true) && post.comments.length > 0 && (
                    <div className="grid gap-2">
                      {post.comments.map((comment) => (
                        <p
                          key={`${postKey}-${comment}`}
                          className="rounded-xl bg-lf-mist px-3 py-2 text-sm text-lf-slate"
                        >
                          {comment}
                        </p>
                      ))}
                    </div>
                  )}
                  {(openComments[postKey] ?? true) && (
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                      <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                        Add a comment
                        <input
                          aria-label="Add a comment"
                          value={commentDraft[postKey] ?? ""}
                          onChange={(event) =>
                            setCommentDraft((current) => ({
                              ...current,
                              [postKey]: event.target.value,
                            }))
                          }
                          className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                          placeholder="Short, specific, useful"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => addComment(postKey)}
                        className="btn-secondary"
                      >
                        Post comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      <aside className="grid gap-5">
        <div className="rounded-2xl border border-lf-line bg-white p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Member sidebar
          </p>
          <ul className="mt-4 grid gap-2">
            {["Scorecard due Friday", "Partner thread Wednesday", "Script practice open", "Coach notes ready"].map((item) => (
              <li key={item} className="border-l-2 border-lf-line pl-3 text-sm font-semibold text-lf-charcoal">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-lf-line bg-white p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Leaderboard preview
          </p>
          <div className="mt-4 grid gap-3">
            {leaderboard.map((row, index) => (
              <div key={row[0]} className="rounded-xl border border-lf-line p-3">
                <p className="text-sm font-black text-lf-navy">
                  {index + 1}. {row[0]}
                </p>
                <p className="mt-1 text-xs text-lf-slate">{row.slice(1).join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

export function ScriptLibraryWorkspace({
  scripts,
}: {
  scripts: ScriptResource[];
}) {
  const [copyState, setCopyState] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openScript, setOpenScript] = useState<string | null>(null);

  const categories = Array.from(new Set(scripts.map((script) => script.category)));
  const filtered = scripts.filter((script) => {
    const q = query.trim().toLowerCase();
    if (activeCategory !== "All" && script.category !== activeCategory) {
      return false;
    }
    if (!q) return true;
    return (
      script.title.toLowerCase().includes(q) ||
      script.category.toLowerCase().includes(q) ||
      script.useWhen.toLowerCase().includes(q) ||
      script.goal.toLowerCase().includes(q) ||
      script.script.some((line) => line.toLowerCase().includes(q))
    );
  });

  async function copyScript(script: ScriptResource) {
    const text = [
      script.title,
      `Use when: ${script.useWhen}`,
      `Goal: ${script.goal}`,
      "",
      ...script.script,
      "",
      `Practice: ${script.practicePrompt ?? "Practice one live rep before using it in the field."}`,
    ].join("\n");

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopyState((current) => ({ ...current, [script.title]: "Copied" }));
      window.setTimeout(() => {
        setCopyState((current) => ({ ...current, [script.title]: "Copy script" }));
      }, 1400);
    }
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Search scripts
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, situation, goal, or line"
              className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <div className="rounded-xl bg-lf-navy p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Library</p>
            <p className="mt-2 text-2xl font-black">{filtered.length}</p>
            <p className="text-xs text-white/72">of {scripts.length} scripts shown</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All", ...categories].map((category) => {
            const isActive = activeCategory === category;
            const count = category === "All"
              ? scripts.length
              : scripts.filter((s) => s.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-lf-orange bg-lf-orange text-white"
                    : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                }`}
              >
                {category}
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-lf-mist text-lf-slate"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-lf-line bg-white p-8 text-center text-sm text-lf-slate">
          No scripts match that search.
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {filtered.map((script) => {
          const isOpen = openScript === script.title;
          return (
            <article key={script.title} className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">{script.category}</p>
                  <h2 className="h-display mt-2 text-2xl">{script.title}</h2>
                  <div className="mt-4 grid gap-2 text-sm text-lf-charcoal">
                    <p><strong className="text-lf-navy">Use when:</strong> {script.useWhen}</p>
                    <p><strong className="text-lf-navy">Goal:</strong> {script.goal}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => copyScript(script)} className="btn-primary shrink-0">
                    {copyState[script.title] ?? "Copy script"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenScript(isOpen ? null : script.title)}
                    className="btn-secondary shrink-0"
                  >
                    {isOpen ? "Hide script" : "Open script"}
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="mt-4 grid gap-2 bg-lf-mist p-4 text-sm leading-6 text-lf-charcoal">
                  {script.script.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              )}
              <div className="mt-4 border-l-2 border-lf-orange pl-4">
                <p className="text-sm font-semibold text-lf-navy">Practice prompt</p>
                <p className="mt-1 text-sm leading-6 text-lf-slate">
                  {script.practicePrompt ?? "Practice one clean rep and bring the stuck point to coaching."}
                </p>
              </div>
              {script.coachNote && (
                <p className="mt-4 text-sm leading-6 text-lf-slate">
                  <strong className="text-lf-navy">Usage note:</strong> {script.coachNote}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}



export function PlaybookWorkspace({
  playbooks,
}: {
  playbooks: PlaybookResource[];
}) {
  const [completed, setCompleted] = useState<Record<string, boolean[]>>(() =>
    Object.fromEntries(playbooks.map((playbook) => [playbook.title, playbook.steps.map(() => false)])),
  );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openPlaybook, setOpenPlaybook] = useState<string | null>(null);

  const categories = Array.from(new Set(playbooks.map((p) => p.category)));
  const filtered = playbooks.filter((p) => {
    const q = query.trim().toLowerCase();
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.purpose.toLowerCase().includes(q) ||
      p.steps.some((s) => s.toLowerCase().includes(q))
    );
  });

  function toggleStep(title: string, index: number) {
    setCompleted((current) => {
      const next = [...(current[title] ?? [])];
      next[index] = !next[index];
      return { ...current, [title]: next };
    });
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Search playbooks
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, category, step, or purpose"
              className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <div className="rounded-xl bg-lf-navy p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Library</p>
            <p className="mt-2 text-2xl font-black">{filtered.length}</p>
            <p className="text-xs text-white/72">of {playbooks.length} playbooks shown</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["All", ...categories].map((category) => {
            const isActive = activeCategory === category;
            const count = category === "All"
              ? playbooks.length
              : playbooks.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "border-lf-orange bg-lf-orange text-white"
                    : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                }`}
              >
                {category}
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-lf-mist text-lf-slate"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-lf-line bg-white p-8 text-center text-sm text-lf-slate">
          No playbooks match that search.
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        {filtered.map((playbook) => {
          const steps = completed[playbook.title] ?? [];
          const doneCount = steps.filter(Boolean).length;
          const isOpen = openPlaybook === playbook.title;
          return (
            <article key={playbook.title} className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">{playbook.category}</p>
                  <h2 className="h-display mt-2 text-2xl">{playbook.title}</h2>
                </div>
                <p className="text-sm font-semibold text-lf-slate">{doneCount} of {playbook.steps.length} steps complete</p>
              </div>
              <p className="prose-lf mt-3 text-sm text-lf-slate">{playbook.purpose}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setOpenPlaybook(isOpen ? null : playbook.title)}
                  className="btn-primary"
                >
                  {isOpen ? "Close" : "Open"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCompleted((current) => ({
                      ...current,
                      [playbook.title]: playbook.steps.map(() => false),
                    }));
                  }}
                  className="btn-secondary"
                >
                  Reset
                </button>
              </div>
              {isOpen && (
                <>
                  <div className="mt-5 grid gap-3">
                    {playbook.steps.map((step, index) => (
                      <label key={step} className="flex items-start gap-3 border-l-2 border-lf-orange bg-lf-mist p-3">
                        <input
                          type="checkbox"
                          checked={steps[index] ?? false}
                          onChange={() => toggleStep(playbook.title, index)}
                          className="mt-1 h-4 w-4 accent-lf-orange"
                        />
                        <span className={`text-sm leading-6 text-lf-charcoal ${steps[index] ? "line-through text-lf-slate" : ""}`}>{step}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-lf-line pt-4">
                    <p className="text-sm font-semibold text-lf-navy">Practice prompt</p>
                    <p className="mt-1 text-sm leading-6 text-lf-slate">{playbook.practicePrompt}</p>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}



export function CoachNotesWorkspace({
  notes,
  members,
}: {
  notes: { member: string; date: string; note: string; nextAction: string }[];
  members: string[];
}) {
  const [selectedMember, setSelectedMember] = useState(members[0] ?? "");
  const [note, setNote] = useState("Current obstacle: inconsistent follow-up after appointments.");
  const [nextAction, setNextAction] = useState("Use the follow-up tracker before the day ends.");
  const [localNotes, setLocalNotes] = useState(notes);

  function addNote() {
    setLocalNotes((current) => [
      {
        member: selectedMember,
        date: "Draft note",
        note,
        nextAction,
      },
      ...current,
    ]);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Coach notes
        </p>
        <h2 className="h-display mt-2 text-2xl">Call Prep Note</h2>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Member
            <select
              value={selectedMember}
              onChange={(event) => setSelectedMember(event.target.value)}
              className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
            >
              {members.map((member) => (
                <option key={member}>{member}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Current reality
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Next action
            <textarea
              value={nextAction}
              onChange={(event) => setNextAction(event.target.value)}
              className="min-h-24 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <button type="button" onClick={addNote} className="btn-primary">
            Add local note
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {localNotes.map((item, index) => (
          <article key={`${item.member}-${item.date}-${index}`} className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {item.date}
            </p>
            <h3 className="h-display mt-2 text-xl">{item.member}</h3>
            <p className="prose-lf mt-3 text-lf-charcoal">{item.note}</p>
            <p className="mt-4 rounded-xl bg-lf-orangeSoft p-3 text-sm font-semibold text-lf-orange">
              Next action: {item.nextAction}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
