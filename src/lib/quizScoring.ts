/**
 * Pure scoring functions for the Coaching Personality Quiz and the
 * New LO Aptitude & Personality Quiz. Server-safe — no DOM, no fetches.
 *
 * NOT a clinical, employment, licensing, or underwriting tool. Coaching and
 * development only.
 */

import {
  coachingProfiles,
  newLoReadinessProfiles,
  profileOrder,
  type CoachingProfile,
  type NewLoReadinessId,
  type NewLoReadinessProfile,
  type ProfileId,
} from "@/data/coachingProfiles";
import {
  personalityQuiz,
  personalityQuizQuestions,
  personalityQuizCategories,
  type QuizCategoryId,
  type QuizQuestion,
} from "@/data/personalityQuiz";
import {
  aptitudeQuestions,
  aptitudeCategories,
  aptitudeReadinessBands,
  newLoAptitudeQuiz,
  type AptitudeCategoryId,
  type AptitudeQuestion,
} from "@/data/newLoAptitudeQuiz";

/* -------------------------------------------------- */
/* Shared answer shape                                */
/* -------------------------------------------------- */

export type QuizAnswerMap = Record<string, string>;
// questionId -> optionId

/* -------------------------------------------------- */
/* Coaching Personality Quiz                          */
/* -------------------------------------------------- */

export type PersonalityResult = {
  primary: CoachingProfile;
  secondary: CoachingProfile | null;
  profileScores: Record<ProfileId, number>;
  /** Per-category leading profile (used in the breakdown table). */
  categoryLeads: Record<QuizCategoryId, ProfileId>;
  answeredCount: number;
  totalQuestions: number;
  /** True if there is essentially a tie between top 2 (within 10% margin). */
  isBlended: boolean;
};

export function scorePersonalityQuiz(answers: QuizAnswerMap): PersonalityResult {
  const profileScores: Record<ProfileId, number> = {
    driver: 0,
    influencer: 0,
    steady: 0,
    conscientious: 0,
  };

  // Per-category running totals
  const categoryTotals: Record<
    QuizCategoryId,
    Record<ProfileId, number>
  > = {} as Record<QuizCategoryId, Record<ProfileId, number>>;

  for (const cat of personalityQuizCategories) {
    categoryTotals[cat.id] = { driver: 0, influencer: 0, steady: 0, conscientious: 0 };
  }

  let answered = 0;
  for (const question of personalityQuizQuestions) {
    const selected = answers[question.id];
    if (!selected) continue;
    const opt = question.options.find((o) => o.id === selected);
    if (!opt) continue;
    answered += 1;
    for (const id of profileOrder) {
      profileScores[id] += opt.weights[id];
      categoryTotals[question.category][id] += opt.weights[id];
    }
  }

  const sortedProfiles = [...profileOrder].sort(
    (a, b) => profileScores[b] - profileScores[a],
  );
  const primaryId = sortedProfiles[0];
  const secondaryId = sortedProfiles[1];

  const top = profileScores[primaryId];
  const second = profileScores[secondaryId];
  const isBlended = top > 0 && (top - second) / top <= 0.1;

  const categoryLeads = {} as Record<QuizCategoryId, ProfileId>;
  for (const cat of personalityQuizCategories) {
    const totals = categoryTotals[cat.id];
    categoryLeads[cat.id] = [...profileOrder].sort(
      (a, b) => totals[b] - totals[a],
    )[0];
  }

  return {
    primary: coachingProfiles[primaryId],
    secondary: isBlended ? coachingProfiles[secondaryId] : null,
    profileScores,
    categoryLeads,
    answeredCount: answered,
    totalQuestions: personalityQuizQuestions.length,
    isBlended,
  };
}

/* -------------------------------------------------- */
/* New LO Aptitude & Personality Quiz                 */
/* -------------------------------------------------- */

export type NewLoResult = {
  readinessAverage: number;
  readinessProfile: NewLoReadinessProfile;
  /** Personality lean carried from category leans where present. */
  personalityLean: CoachingProfile | null;
  /** Category-level readiness scores (0-3) for the breakdown table. */
  categoryAverages: Record<AptitudeCategoryId, number>;
  answeredCount: number;
  totalQuestions: number;
};

export function scoreNewLoAptitudeQuiz(answers: QuizAnswerMap): NewLoResult {
  const categoryReadinessTotals: Record<
    AptitudeCategoryId,
    { sum: number; count: number }
  > = {} as Record<AptitudeCategoryId, { sum: number; count: number }>;
  for (const cat of aptitudeCategories) {
    categoryReadinessTotals[cat.id] = { sum: 0, count: 0 };
  }

  const personalityCounts: Record<ProfileId, number> = {
    driver: 0,
    influencer: 0,
    steady: 0,
    conscientious: 0,
  };

  let readinessSum = 0;
  let answered = 0;

  for (const question of aptitudeQuestions) {
    const selected = answers[question.id];
    if (!selected) continue;
    const opt = question.options.find((o) => o.id === selected);
    if (!opt) continue;
    answered += 1;
    readinessSum += opt.readiness;
    categoryReadinessTotals[question.category].sum += opt.readiness;
    categoryReadinessTotals[question.category].count += 1;
    if (opt.personalityLean) {
      personalityCounts[opt.personalityLean] += 1;
    }
  }

  const readinessAverage = answered > 0 ? readinessSum / answered : 0;

  const band = aptitudeReadinessBands.find(
    (b) => readinessAverage >= b.min && readinessAverage <= b.max,
  );
  const readinessProfile =
    newLoReadinessProfiles[(band?.profileId ?? "foundation-builder") as NewLoReadinessId];

  const categoryAverages = {} as Record<AptitudeCategoryId, number>;
  for (const cat of aptitudeCategories) {
    const t = categoryReadinessTotals[cat.id];
    categoryAverages[cat.id] = t.count > 0 ? t.sum / t.count : 0;
  }

  const sortedLeans = (Object.keys(personalityCounts) as ProfileId[]).sort(
    (a, b) => personalityCounts[b] - personalityCounts[a],
  );
  const topLean = sortedLeans[0];
  const topLeanCount = personalityCounts[topLean];
  const personalityLean =
    topLeanCount > 0 ? coachingProfiles[topLean] : null;

  return {
    readinessAverage,
    readinessProfile,
    personalityLean,
    categoryAverages,
    answeredCount: answered,
    totalQuestions: aptitudeQuestions.length,
  };
}

/* -------------------------------------------------- */
/* Reports — flat text for copy/print/download        */
/* -------------------------------------------------- */

const DISCLAIMER =
  "This is a coaching and development tool, not a clinical, employment, underwriting, compliance, or licensing assessment.";

export function buildPersonalityReport(result: PersonalityResult): string {
  const lines: string[] = [];
  lines.push("Loan Factory Coaching Personality Quiz — Coaching Report");
  lines.push("");
  lines.push(`Primary Coaching Profile: ${result.primary.name}`);
  if (result.secondary) {
    lines.push(`Secondary Coaching Profile: ${result.secondary.name}`);
  }
  lines.push("");
  lines.push("Summary");
  lines.push(result.primary.summary);
  lines.push("");
  lines.push("Strengths");
  result.primary.strengths.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Blind spots");
  result.primary.blindSpots.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Coaching recommendations");
  result.primary.coachingRecommendations.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Best training path");
  lines.push(result.primary.bestTrainingPath);
  lines.push("");
  lines.push("Best communication style from your coach");
  lines.push(result.primary.bestCommunicationStyle);
  lines.push("");
  lines.push("Suggested resources");
  result.primary.suggestedResources.forEach((r) => lines.push(`- ${r.label} (${r.href})`));
  lines.push("");
  lines.push("Team leader notes");
  result.primary.teamLeaderNotes.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Disclaimer");
  lines.push(DISCLAIMER);
  return lines.join("\n");
}

export function buildNewLoReport(result: NewLoResult): string {
  const lines: string[] = [];
  lines.push("Loan Factory New LO Aptitude & Personality Quiz — Coaching Report");
  lines.push("");
  lines.push(`Development Stage Profile: ${result.readinessProfile.name}`);
  lines.push(`Development Stage: ${result.readinessProfile.developmentStage}`);
  if (result.personalityLean) {
    lines.push(`Personality lean: ${result.personalityLean.name}`);
  }
  lines.push("");
  lines.push("Summary");
  lines.push(result.readinessProfile.summary);
  lines.push("");
  lines.push("First 30-day coaching focus");
  result.readinessProfile.thirtyDayFocus.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("First scripts to practice");
  result.readinessProfile.firstScripts.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("AI Training recommendations");
  result.readinessProfile.aiTrainingRecommendations.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Support routing");
  result.readinessProfile.supportRouting.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Team leader notes");
  result.readinessProfile.teamLeaderNotes.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  lines.push("Disclaimer");
  lines.push(DISCLAIMER);
  return lines.join("\n");
}

/* -------------------------------------------------- */
/* Convenience — used by results pages and review     */
/* -------------------------------------------------- */

export const quizDisclaimer = DISCLAIMER;
export { personalityQuiz, newLoAptitudeQuiz };

/** Format a 0-3 readiness score as a friendly label. */
export function readinessLabel(score: number): string {
  if (score >= 2.35) return "Strong";
  if (score >= 1.75) return "On track";
  if (score >= 1) return "Building";
  return "Early";
}

/** Convert results into a storable encoded string for share or session-handoff. */
export type StoredResult =
  | { kind: "personality"; answers: QuizAnswerMap; submittedAt: string }
  | { kind: "new-lo"; answers: QuizAnswerMap; submittedAt: string };
