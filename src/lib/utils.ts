export type ModuleStatus = "full" | "summary" | "coming-soon";

/**
 * Public-facing label per status. `summary` means a usable beta outline with
 * working Do This Today, prompts, and assignment, but the full library is
 * still being filled in. `coming-soon` means the page exists but is intentionally
 * not yet teachable.
 */
export const moduleStatusLabel: Record<ModuleStatus, string> = {
  full: "Live",
  summary: "Beta outline",
  "coming-soon": "Coming Soon",
};

export type SkillLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Team Leader"
  | "Coach"
  | "Compliance Review";

/**
 * Brand palette only. Allowed: orange, black, charcoal, silver, white, light
 * gray. No blue, green, or purple anywhere on UI chips.
 *
 * Tag system:
 *   Beginner       white card with charcoal text. Lightest weight.
 *   Intermediate   light gray with charcoal text. Mid weight.
 *   Advanced       charcoal with white text. Heavy weight.
 *   Team Leader    orange with white text.
 *   Coach          orange outline on white.
 *   Compliance     orange-tinted background, dark orange text. Reads as a warn.
 */
export const skillLevelStyles: Record<SkillLevel, string> = {
  Beginner: "bg-white text-lf-charcoal border-lf-line",
  Intermediate: "bg-lf-mist text-lf-charcoal border-lf-line",
  Advanced: "bg-lf-charcoal text-white border-lf-charcoal",
  "Team Leader": "bg-lf-orange text-white border-lf-orange",
  Coach: "bg-white text-lf-orange border-lf-orange",
  "Compliance Review": "bg-lf-orangeSoft text-lf-orangeDark border-lf-orange/40",
};

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
