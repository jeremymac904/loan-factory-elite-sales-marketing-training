import {
  allianceScorecardMetrics,
  scorecardMetrics,
  type ProgramKey,
} from "@/data/coachingPlatform";
import {
  dailyCountFields,
} from "@/data/todaySystem";

/**
 * One source of truth: activity is entered in Today only. Saving a weekday
 * writes every count field straight into that day's scorecard column (labels
 * are the metric names), and Friday's reflections fill the scorecard text
 * boxes. The scorecard page reads the same store and only reviews/submits.
 */
export const SCORECARD_KEY: Record<ProgramKey, string> = {
  mastery: "lf-scorecard-lo-mastery-weekly-scorecard",
  alliance: "lf-scorecard-loan-factory-alliance-weekly-scorecard",
};

export const SUBMISSIONS_KEY: Record<ProgramKey, string> = {
  mastery: "lf-submissions-mastery",
  alliance: "lf-submissions-alliance",
};

const DAY_INDEX: Record<string, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

export type ScorecardStore = {
  values?: Record<string, number[]>;
  worked?: string;
  stuck?: string;
  focus?: string;
  status?: string;
  history?: string[];
  timeBlocks?: Record<string, string>;
};

export type SubmissionRecord = {
  didntWork?: string;
  weekOf: string;
  submittedAt: string;
  totals: Record<string, number>;
  worked: string;
  stuck: string;
  focus: string;
  timeBlocks?: Record<string, string>;
};

export function scorecardHref(program: ProgramKey) {
  return program === "alliance"
    ? "/member-area/alliance-scorecard/"
    : "/member-area/scorecards/";
}

export function readScorecard(program: ProgramKey): ScorecardStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(
      window.localStorage.getItem(SCORECARD_KEY[program]) ?? "{}",
    ) as ScorecardStore;
  } catch {
    return {};
  }
}

export function readSubmissions(program: ProgramKey): SubmissionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SUBMISSIONS_KEY[program]) ?? "[]",
    );
    return Array.isArray(parsed) ? (parsed as SubmissionRecord[]) : [];
  } catch {
    return [];
  }
}

export function appendSubmission(program: ProgramKey, record: SubmissionRecord) {
  if (typeof window === "undefined") return;
  const next = [record, ...readSubmissions(program)].slice(0, 12);
  try {
    window.localStorage.setItem(SUBMISSIONS_KEY[program], JSON.stringify(next));
  } catch {
    // quota — keep working in memory
  }
}

export function syncTodayToScorecard(
  program: ProgramKey,
  dayKey: string,
  entries: Record<string, string>,
): string[] {
  if (typeof window === "undefined") return [];
  const dayIndex = DAY_INDEX[dayKey];
  if (dayIndex === undefined) return [];

  const validMetrics = new Set(
    (program === "alliance" ? allianceScorecardMetrics : scorecardMetrics).map(
      (metric) => metric.metric,
    ),
  );

  const store = readScorecard(program);
  const values: Record<string, number[]> = { ...(store.values ?? {}) };
  const synced: string[] = [];

  dailyCountFields.forEach((metricName) => {
    if (!validMetrics.has(metricName)) return;
    const raw = (entries[metricName] ?? "").trim();
    if (!raw) return;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    const row = [...(values[metricName] ?? [0, 0, 0, 0, 0])];
    row[dayIndex] = parsed;
    values[metricName] = row;
    synced.push(metricName);
  });

  const next: ScorecardStore = { ...store, values };


  if (synced.length === 0) return [];
  try {
    window.localStorage.setItem(SCORECARD_KEY[program], JSON.stringify(next));
  } catch {
    return [];
  }
  return synced;
}

/**
 * Today's saved time block also lands on the weekly scorecard, so the coach
 * sees the planned blocks next to the numbers. One line per day.
 */
export function syncTimeBlockToScorecard(
  program: ProgramKey,
  dayKey: string,
  summary: string,
): boolean {
  if (typeof window === "undefined") return false;
  const key = SCORECARD_KEY[program];
  let store: ScorecardStore = {};
  try {
    store = JSON.parse(window.localStorage.getItem(key) ?? "{}") as ScorecardStore;
  } catch {
    store = {};
  }
  const next: ScorecardStore = {
    ...store,
    timeBlocks: { ...(store.timeBlocks ?? {}), [dayKey]: summary },
  };
  try {
    window.localStorage.setItem(key, JSON.stringify(next));
    return true;
  } catch {
    return false;
  }
}
