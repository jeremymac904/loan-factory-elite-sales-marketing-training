export type ModuleStatus = "full" | "summary" | "coming-soon";

export const moduleStatusLabel: Record<ModuleStatus, string> = {
  full: "Fully built",
  summary: "Staged",
  "coming-soon": "Coming soon",
};

export type SkillLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Team Leader"
  | "Coach"
  | "Compliance Review";

export const skillLevelStyles: Record<SkillLevel, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-sky-50 text-sky-700 border-sky-200",
  Advanced: "bg-violet-50 text-violet-700 border-violet-200",
  "Team Leader": "bg-amber-50 text-amber-700 border-amber-200",
  Coach: "bg-rose-50 text-rose-700 border-rose-200",
  "Compliance Review": "bg-orange-50 text-orange-700 border-orange-200",
};

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
