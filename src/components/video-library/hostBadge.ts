import type { VideoHostingStatus } from "@/data/loDevelopmentVideoLibrary";

/**
 * Maps an LoVideo's hosting state to a single user-facing host badge.
 *
 * Source of truth is hostingStatus, but we cross-check youtubeEmbedUrl /
 * googleDriveUrl so the badge never over-claims: a clip is only "YouTube live"
 * when a real embed URL exists. Today no uploads have happened, so the manifest
 * state is google_drive_ready with empty URLs => "Google Drive fallback".
 */
export type HostBadgeTone = "live" | "pending" | "fallback" | "missing";

export type HostBadge = {
  label: "YouTube live" | "YouTube pending" | "Google Drive fallback" | "Recording needed";
  tone: HostBadgeTone;
  /** Tailwind classes scoped to brand palette; safe to spread onto a span. */
  className: string;
};

const TONE_CLASS: Record<HostBadgeTone, string> = {
  live: "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark",
  pending: "border-lf-line bg-lf-mist text-lf-slate",
  fallback: "border-lf-line bg-white text-lf-slate",
  missing: "border-lf-line bg-lf-mist text-lf-charcoal",
};

function badge(label: HostBadge["label"], tone: HostBadgeTone): HostBadge {
  return { label, tone, className: TONE_CLASS[tone] };
}

export function getHostBadge(input: {
  hostingStatus: VideoHostingStatus;
  youtubeEmbedUrl: string | null;
  googleDriveUrl: string | null;
}): HostBadge {
  const { hostingStatus, youtubeEmbedUrl, googleDriveUrl } = input;

  // A real YouTube embed always wins, regardless of status string.
  if (youtubeEmbedUrl) return badge("YouTube live", "live");

  switch (hostingStatus) {
    case "youtube_live":
      // Status claims live but no embed URL yet — treat as pending, never fabricate.
      return badge("YouTube pending", "pending");
    case "youtube_pending":
      return badge("YouTube pending", "pending");
    case "youtube_failed":
    case "needs_review":
      return badge("Recording needed", "missing");
    case "google_drive_live":
    case "google_drive_ready":
      return badge("Google Drive fallback", "fallback");
    case "local_only":
    default:
      // local-only with a drive link is still a drive fallback; otherwise pending recording.
      return googleDriveUrl
        ? badge("Google Drive fallback", "fallback")
        : badge("Recording needed", "missing");
  }
}

/** Human label for sourceType, used by cards and filters. */
export function sourceTypeLabel(sourceType: "long_form" | "clip"): string {
  return sourceType === "long_form" ? "Long form" : "Clip";
}
