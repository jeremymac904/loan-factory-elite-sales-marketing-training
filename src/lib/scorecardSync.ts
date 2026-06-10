import {
  allianceScorecardMetrics,
  scorecardMetrics,
  type ProgramKey,
} from "@/data/coachingPlatform";

/**
 * Today is the single place a member enters daily numbers. When a Today day is
 * saved or submitted, any field that maps to a weekly scorecard metric is
 * written into that day's scorecard column so the scorecard never asks for the
 * same number twice.
 *
 * The storage key mirrors WeeklyScorecardForm's derivation from its title.
 */
const SCORECARD_KEY: Record<ProgramKey, string> = {
  mastery: "lf-scorecard-lo-mastery-weekly-scorecard",
  alliance: "lf-scorecard-loan-factory-alliance-weekly-scorecard",
};

const DAY_INDEX: Record<string, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

// Today field label -> scorecard metric name (numeric daily values).
const FIELD_TO_METRIC: Record<string, Record<string, string>> = {
  tuesday: {
    "Realtors followed up": "Realtor conversations",
    "Past clients touched": "Past client touches",
  },
  wednesday: {
    "Realtors contacted": "Realtor conversations",
  },
  friday: {
    "Total real conversations": "Real conversations",
    "Realtor conversations": "Realtor conversations",
    "Past client touches": "Past client touches",
    "Referrals requested": "Referrals requested",
    "Applications taken": "Applications taken",
    "Pre approvals issued": "Pre approvals issued",
    "Contracts received": "Contracts received",
  },
};

// Friday reflection fields -> scorecard text boxes.
const FIELD_TO_TEXT: Record<string, "worked" | "stuck" | "focus"> = {
  "Biggest win": "worked",
  "Biggest stuck point": "stuck",
  "Next week focus": "focus",
};

type ScorecardStore = {
  values?: Record<string, number[]>;
  worked?: string;
  stuck?: string;
  focus?: string;
  status?: string;
  history?: string[];
};

export function scorecardHref(program: ProgramKey) {
  return program === "alliance"
    ? "/member-area/alliance-scorecard/"
    : "/member-area/scorecards/";
}

/**
 * Write mapped Today entries into the program's weekly scorecard store.
 * Returns the metric names that were synced (empty when nothing mapped).
 */
export function syncTodayToScorecard(
  program: ProgramKey,
  dayKey: string,
  entries: Record<string, string>,
): string[] {
  if (typeof window === "undefined") return [];
  const dayIndex = DAY_INDEX[dayKey];
  const fieldMap = FIELD_TO_METRIC[dayKey];
  const isFriday = dayKey === "friday";
  if (dayIndex === undefined || (!fieldMap && !isFriday)) return [];

  const validMetrics = new Set(
    (program === "alliance" ? allianceScorecardMetrics : scorecardMetrics).map(
      (metric) => metric.metric,
    ),
  );

  const key = SCORECARD_KEY[program];
  let store: ScorecardStore = {};
  try {
    store = JSON.parse(window.localStorage.getItem(key) ?? "{}") as ScorecardStore;
  } catch {
    store = {};
  }
  const values: Record<string, number[]> = { ...(store.values ?? {}) };
  const synced: string[] = [];

  Object.entries(fieldMap ?? {}).forEach(([fieldLabel, metricName]) => {
    if (!validMetrics.has(metricName)) return;
    const raw = (entries[fieldLabel] ?? "").trim();
    if (!raw) return;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    const row = [...(values[metricName] ?? [0, 0, 0, 0, 0])];
    row[dayIndex] = parsed;
    values[metricName] = row;
    synced.push(metricName);
  });

  const next: ScorecardStore = { ...store, values };

  if (isFriday) {
    Object.entries(FIELD_TO_TEXT).forEach(([fieldLabel, textKey]) => {
      const raw = (entries[fieldLabel] ?? "").trim();
      if (raw) {
        next[textKey] = raw;
        synced.push(textKey);
      }
    });
  }

  if (synced.length === 0) return [];

  try {
    window.localStorage.setItem(key, JSON.stringify(next));
  } catch {
    return [];
  }
  return synced;
}
