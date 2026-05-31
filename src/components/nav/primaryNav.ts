/**
 * Single source of truth for the global top navigation.
 *
 * Labels follow the hard naming rules for the LO Development Platform:
 * - "Sales & Marketing" is the FREE internal 101-601 training (never mixed
 *   with paid coaching, never called "Elite").
 * - "AI Advantage" is the AI training track.
 * - Admin / coach tooling is intentionally NOT in this global nav — those
 *   live in the role-aware account dropdown rendered by HeaderAuthStatus.
 *
 * Keep this list short and clean. Every entry must point at a real route.
 */
export type PrimaryNavItem = {
  label: string;
  href: string;
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Dashboard", href: "/normal-lo/" },
  { label: "LO Dev", href: "/lo-development/" },
  { label: "Training", href: "/training-academy/" },
  { label: "Coaching", href: "/coaching/" },
  { label: "Sales & Marketing", href: "/sales-training/" },
  { label: "AI Advantage", href: "/ai-training/" },
  { label: "FaceGram", href: "/facegram/" },
  { label: "Support", href: "/loan-officer-support/" },
  { label: "Resources", href: "/resources/" },
];
