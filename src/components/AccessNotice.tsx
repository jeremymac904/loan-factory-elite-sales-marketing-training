import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";

/**
 * AccessNotice — a small, branded card for gated-page states.
 *
 * Use this instead of ad-hoc "you don't have access" text so every gated page
 * shows the same clean, on-brand card with a clear title, message, a primary
 * action, and a secondary "Back to home" link.
 *
 * It is a pure presentational component (no auth logic, no client JS), so it
 * can be rendered from any Server Component. The calling page decides which
 * state to show based on the session it already loaded.
 *
 * Typical usage in a gated page:
 *
 *   if (session.status === "pending") {
 *     return <AccessNotice variant="pending" />;
 *   }
 *   if (session.status !== "approved" && !previewEnabled) {
 *     return <AccessNotice variant="signin" resource="Coaching" />;
 *   }
 */

export type AccessNoticeVariant = "signin" | "denied" | "pending";

type PrimaryAction = {
  label: string;
  href: string;
};

type Props = {
  /** Preset state. Drives the default title / message / primary action. */
  variant?: AccessNoticeVariant;
  /**
   * Optional resource name (e.g. "Coaching", "the Coach Command Center").
   * Folded into the default title/message for context.
   */
  resource?: string;
  /** Override the eyebrow label above the title. */
  eyebrow?: string;
  /** Override the heading text. */
  title?: string;
  /** Override the body copy. */
  message?: string;
  /**
   * Override the primary action. Pass `null` to hide it entirely
   * (e.g. the "pending" state has nothing actionable).
   */
  primaryAction?: PrimaryAction | null;
  /** Override the secondary action. Defaults to "Back to home" -> "/". */
  secondaryAction?: PrimaryAction | null;
  /**
   * When true, render only the card (no <main> / vertical padding wrapper) so
   * it can be embedded inside a page that already provides layout chrome.
   */
  bare?: boolean;
};

type Preset = {
  eyebrow: string;
  title: (resource?: string) => string;
  message: (resource?: string) => string;
  primaryAction: PrimaryAction | null;
};

const presets: Record<AccessNoticeVariant, Preset> = {
  signin: {
    eyebrow: "Access",
    title: (resource) =>
      resource ? `Sign in to view ${resource}` : "Sign in to continue",
    message: () =>
      "This area is for approved Loan Factory members. Please sign in or request access to continue.",
    primaryAction: { label: "Sign In", href: "/login/" },
  },
  denied: {
    eyebrow: "Access",
    title: (resource) =>
      resource ? `You don't have access to ${resource}` : "Access restricted",
    message: () =>
      "Your account doesn't have access to this area yet. If you think this is a mistake, contact your Loan Factory administrator.",
    primaryAction: { label: "Go to my dashboard", href: "/normal-lo/" },
  },
  pending: {
    eyebrow: "Pending approval",
    title: () => "Your access is pending",
    message: () =>
      "Your account is awaiting approval from a Loan Factory administrator. You'll get full access as soon as it's approved.",
    primaryAction: { label: "View my profile", href: "/profile/" },
  },
};

const defaultSecondary: PrimaryAction = {
  label: "Back to home",
  href: "/",
};

export default function AccessNotice({
  variant = "signin",
  resource,
  eyebrow,
  title,
  message,
  primaryAction,
  secondaryAction,
  bare = false,
}: Props) {
  const preset = presets[variant];

  const resolvedEyebrow = eyebrow ?? preset.eyebrow;
  const resolvedTitle = title ?? preset.title(resource);
  const resolvedMessage = message ?? preset.message(resource);

  // `undefined` falls back to the preset; explicit `null` hides the action.
  const resolvedPrimary =
    primaryAction === undefined ? preset.primaryAction : primaryAction;
  const resolvedSecondary =
    secondaryAction === undefined ? defaultSecondary : secondaryAction;

  const card = (
    <div className="mx-auto max-w-xl card text-center">
      <div className="flex justify-center">
        <BrandImage asset={brandAssets["loan-factory"]} heightClass="h-9" />
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-lf-orange">
        {resolvedEyebrow}
      </p>
      <h1 className="mt-2 h-display">{resolvedTitle}</h1>
      <p className="mt-3 prose-lf">{resolvedMessage}</p>
      {(resolvedPrimary || resolvedSecondary) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {resolvedPrimary && (
            <Link href={resolvedPrimary.href} className="btn-primary">
              {resolvedPrimary.label}
            </Link>
          )}
          {resolvedSecondary && (
            <Link href={resolvedSecondary.href} className="btn-secondary">
              {resolvedSecondary.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );

  if (bare) {
    return card;
  }

  return <main className="container-page py-16">{card}</main>;
}
