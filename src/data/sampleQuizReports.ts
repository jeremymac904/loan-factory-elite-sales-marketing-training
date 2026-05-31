/**
 * Sample completed reports used in the Coach Reports preview and Admin Quiz
 * Review pages. All data is fictional. Local UI only — no database writes.
 */

import type { ProfileId, NewLoReadinessId } from "./coachingProfiles";

export type SampleStatus = "needs-review" | "reviewed" | "in-coaching";

export type SamplePersonalityReport = {
  id: string;
  kind: "personality";
  loName: string;
  team: string;
  submittedAt: string;
  status: SampleStatus;
  primaryProfile: ProfileId;
  secondaryProfile?: ProfileId;
  coachNote: string;
};

export type SampleNewLoReport = {
  id: string;
  kind: "new-lo";
  loName: string;
  team: string;
  submittedAt: string;
  status: SampleStatus;
  readinessProfile: NewLoReadinessId;
  readinessScore: number;
  personalityLean?: ProfileId;
  coachNote: string;
};

export type SampleReport = SamplePersonalityReport | SampleNewLoReport;

export const sampleReports: SampleReport[] = [
  {
    id: "rep-001",
    kind: "personality",
    loName: "Alex Rivera",
    team: "LO Mastery Producers",
    submittedAt: "2026-05-12",
    status: "needs-review",
    primaryProfile: "driver",
    secondaryProfile: "conscientious",
    coachNote:
      "Driver + Conscientious blend. Push 201 + 501 pipeline rigor; pair with an Influencer for partner events.",
  },
  {
    id: "rep-002",
    kind: "personality",
    loName: "Priya Shah",
    team: "Loan Factory Alliance",
    submittedAt: "2026-05-10",
    status: "reviewed",
    primaryProfile: "influencer",
    coachNote:
      "Energy is high, follow-through is the gap. Coach to a daily CRM cleanup block.",
  },
  {
    id: "rep-003",
    kind: "new-lo",
    loName: "Marcus Chen",
    team: "New LO Cohort May",
    submittedAt: "2026-05-15",
    status: "in-coaching",
    readinessProfile: "coachable-climber",
    readinessScore: 1.65,
    personalityLean: "steady",
    coachNote:
      "Steady lean — go heavy on 1:1 reps, light on public roleplays for the first 30 days.",
  },
  {
    id: "rep-004",
    kind: "new-lo",
    loName: "Jordan Lee",
    team: "New LO Cohort May",
    submittedAt: "2026-05-14",
    status: "needs-review",
    readinessProfile: "foundation-builder",
    readinessScore: 0.85,
    personalityLean: "conscientious",
    coachNote:
      "Brand new. Lock 101 path. Use AI Twin reps before any live outbound block.",
  },
  {
    id: "rep-005",
    kind: "personality",
    loName: "Sam O'Neil",
    team: "Alliance Mastermind",
    submittedAt: "2026-04-30",
    status: "reviewed",
    primaryProfile: "steady",
    coachNote:
      "Loyal partner base. Coach toward neutral price/structure language and content rhythm.",
  },
  {
    id: "rep-006",
    kind: "new-lo",
    loName: "Dani Park",
    team: "New LO Cohort April",
    submittedAt: "2026-04-28",
    status: "reviewed",
    readinessProfile: "ready-producer",
    readinessScore: 2.55,
    personalityLean: "driver",
    coachNote:
      "Ready to scale. Move to 301 partner depth and a weekly content commitment.",
  },
];

export const statusLabel: Record<SampleStatus, string> = {
  "needs-review": "Needs review",
  reviewed: "Reviewed",
  "in-coaching": "In coaching",
};

export const statusToneClass: Record<SampleStatus, string> = {
  "needs-review": "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark",
  reviewed: "border-lf-line bg-lf-mist text-lf-charcoal",
  "in-coaching": "border-lf-orange/40 bg-lf-orange text-white",
};
