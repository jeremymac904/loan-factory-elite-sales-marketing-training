import type { VideoHostingStatus } from "@/data/loDevelopmentVideoLibrary";

/**
 * Maps an LoVideo's hosting state to a single user-facing host badge.
 *
 * HONESTY CONTRACT (launch hardening P6):
 * The badge is grounded in the ACTUAL URLs present, never in the status string
 * alone, so it can never over-claim that a video is playable when it is not.
 *   - real youtubeEmbedUrl / youtubeVideoId  => "YouTube live"  (only state that
 *     implies an embeddable player)
 *   - real googleDriveUrl (no YouTube yet)   => "Google Drive"  (an external link,
 *     not an embed)
 *   - status flags a manual review           => "Manual review needed"
 *   - no YouTube + status is a YouTube state  => "YouTube upload pending"
 *   - no playable URL at all (the current state of every clip in the manifest)
 *     => "Google Drive staging pending"
 *
 * Today 91 clips have no Drive/YouTube URL (status google_drive_ready) and 7
 * long-form recordings have a real Drive URL. So clips render "Google Drive
 * staging pending" and the 7 long-form render "Google Drive". Nothing claims a
 * playable YouTube embed until a real embed URL is populated by the upload
 * pipeline.
 */
export type HostBadgeTone = "live" | "drive" | "pending" | "review";

export type HostBadgeLabel =
  | "YouTube live"
  | "Google Drive"
  | "YouTube upload pending"
  | "Google Drive staging pending"
  | "Manual review needed";

export type HostBadge = {
  label: HostBadgeLabel;
  tone: HostBadgeTone;
  /** Tailwind classes scoped to brand palette; safe to spread onto a span. */
  className: string;
  /**
   * True only when a real, playable/openable destination exists for this video
   * (an embeddable YouTube URL or an external Google Drive URL). When false the
   * UI must NOT render a player or a link — only an honest "pending" notice.
   */
  isPlayable: boolean;
};

const TONE_CLASS: Record<HostBadgeTone, string> = {
  live: "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark",
  drive: "border-lf-line bg-white text-lf-slate",
  pending: "border-lf-line bg-lf-mist text-lf-slate",
  review: "border-lf-line bg-lf-mist text-lf-charcoal",
};

function badge(label: HostBadgeLabel, tone: HostBadgeTone, isPlayable: boolean): HostBadge {
  return { label, tone, className: TONE_CLASS[tone], isPlayable };
}

export function getHostBadge(input: {
  hostingStatus: VideoHostingStatus;
  youtubeEmbedUrl: string | null;
  googleDriveUrl: string | null;
  /** Optional — present on the full LoVideo; lets a clip-only id imply an embed. */
  youtubeVideoId?: string | null;
}): HostBadge {
  const { hostingStatus, youtubeEmbedUrl, googleDriveUrl, youtubeVideoId } = input;

  const hasYouTube = Boolean(youtubeEmbedUrl || youtubeVideoId);
  const hasDrive = Boolean(googleDriveUrl);

  // A real, embeddable YouTube destination always wins — and is the ONLY state
  // that implies a playable in-page player.
  if (hasYouTube) return badge("YouTube live", "live", true);

  // A real Google Drive URL is an honest external destination (a link, not an
  // embed). Surface it as "Google Drive" so the UI can offer "Open in Drive".
  if (hasDrive) return badge("Google Drive", "drive", true);

  // No playable/openable URL exists. Pick the most honest pending state from the
  // manifest status — never imply the asset is reachable.
  switch (hostingStatus) {
    case "needs_review":
    case "youtube_failed":
      return badge("Manual review needed", "review", false);
    case "youtube_pending":
    case "youtube_live":
      // Status references YouTube but no embed URL has landed yet.
      return badge("YouTube upload pending", "pending", false);
    case "google_drive_live":
    case "google_drive_ready":
    case "local_only":
    default:
      // Catalogued but not yet staged to a reachable destination.
      return badge("Google Drive staging pending", "pending", false);
  }
}

/** Human label for sourceType, used by cards and filters. */
export function sourceTypeLabel(sourceType: "long_form" | "clip"): string {
  return sourceType === "long_form" ? "Long form" : "Clip";
}
