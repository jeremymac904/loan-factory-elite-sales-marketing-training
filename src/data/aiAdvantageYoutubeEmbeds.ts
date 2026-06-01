import manifest from "./aiAdvantageYoutubeEmbeds.json";

type RawAiAdvantageYoutubeEmbedRow = {
  row_id: string;
  title: string;
  module: string;
  suggested_lesson_slug: string;
  suggested_lesson_path: string;
  youtube_video_id: string;
  youtube_video_url: string;
  youtube_embed_url: string;
  source_file_name: string;
  uploaded_at: string;
  privacy: string;
  embeddable: boolean;
  notes: string;
  status?: string;
  upload_status?: string;
  notify_subscribers?: string;
};

type RawAiAdvantageYoutubeEmbedManifest = {
  generated_at: string;
  source_of_truth: string;
  intended_path: string;
  youtube_channel: string;
  totals: {
    total_manifest_rows: number;
    uploaded: number;
    still_ready: number;
    failed_last_attempt: number;
    skipped: number;
  };
  safety: Record<string, string>;
  rules_for_codex: string[];
  videos: RawAiAdvantageYoutubeEmbedRow[];
};

export type AiAdvantageYoutubeEmbedSourceStatus =
  | "uploaded"
  | "ready"
  | "skipped"
  | "unknown";

export type AiAdvantageYoutubeEmbedRecord = {
  rowId: string;
  title: string;
  module: string;
  moduleSlug: string;
  suggestedLessonSlug: string;
  suggestedLessonPath: string;
  lessonViewerPath: string;
  youtubeVideoId: string;
  youtubeVideoUrl: string;
  youtubeEmbedUrl: string;
  sourceFileName: string;
  uploadedAt: string;
  privacy: string;
  embeddable: boolean;
  notes: string;
  status: string;
  uploadStatus: string;
  notifySubscribers: string;
  sourceStatus: AiAdvantageYoutubeEmbedSourceStatus;
  renderStatus: "embeddable" | "source issue";
  sourceIssue?: string;
};

export type AiAdvantageYoutubeEmbedModuleGroup = {
  module: string;
  moduleSlug: string;
  count: number;
  videos: AiAdvantageYoutubeEmbedRecord[];
};

export type AiAdvantageYoutubeEmbedValidation = {
  totalManifestRows: number;
  loadedRows: number;
  embeddableRows: number;
  withVideoId: number;
  withEmbedUrl: number;
  sourceIssueRows: number;
  readyRowsEmbedded: number;
  publicVideos: number;
  subscriberNotifications: number;
};

const rawManifest = manifest as RawAiAdvantageYoutubeEmbedManifest;

function normalizeModuleSlug(module: string) {
  return module
    .toLowerCase()
    .replace(/^\s*(\d+)\s*-\s*/, "$1-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSourceStatus(
  status?: string,
): AiAdvantageYoutubeEmbedSourceStatus {
  const normalized = status?.trim().toUpperCase();
  if (normalized === "UPLOADED") return "uploaded";
  if (normalized === "READY") return "ready";
  if (normalized === "SKIPPED") return "skipped";
  return "unknown";
}

function buildSourceIssue(row: RawAiAdvantageYoutubeEmbedRow) {
  const issues: string[] = [];

  if (!row.youtube_video_id) issues.push("Missing youtube_video_id");
  if (!row.youtube_embed_url) issues.push("Missing youtube_embed_url");
  if (!row.embeddable) issues.push("Row is not embeddable");
  if (row.privacy !== "unlisted") issues.push(`Privacy is ${row.privacy}`);
  if (row.notify_subscribers === "YES") {
    issues.push("Subscriber notifications are enabled");
  }
  if (normalizeSourceStatus(row.status) === "ready") {
    issues.push("Row is still READY");
  }

  return issues.join("; ");
}

function mapRow(row: RawAiAdvantageYoutubeEmbedRow): AiAdvantageYoutubeEmbedRecord {
  const sourceStatus = normalizeSourceStatus(row.status);
  const sourceIssue = buildSourceIssue(row);

  return {
    rowId: row.row_id,
    title: row.title,
    module: row.module,
    moduleSlug: normalizeModuleSlug(row.module),
    suggestedLessonSlug: row.suggested_lesson_slug,
    suggestedLessonPath: row.suggested_lesson_path,
    lessonViewerPath: `/ai-training/video-library/${row.suggested_lesson_slug}/`,
    youtubeVideoId: row.youtube_video_id,
    youtubeVideoUrl: row.youtube_video_url,
    youtubeEmbedUrl: row.youtube_embed_url,
    sourceFileName: row.source_file_name,
    uploadedAt: row.uploaded_at,
    privacy: row.privacy,
    embeddable: row.embeddable,
    notes: row.notes,
    status: row.status ?? "",
    uploadStatus: row.upload_status ?? "",
    notifySubscribers: row.notify_subscribers ?? "",
    sourceStatus,
    renderStatus: sourceIssue ? "source issue" : "embeddable",
    sourceIssue: sourceIssue || undefined,
  };
}

export const aiAdvantageYoutubeEmbedsManifest = rawManifest;

export const aiAdvantageYoutubeEmbedRows = rawManifest.videos.map(mapRow);

export const aiAdvantageYoutubeEmbeds = aiAdvantageYoutubeEmbedRows.filter(
  (row) => row.renderStatus === "embeddable",
);

export const aiAdvantageYoutubeEmbedSourceIssues =
  aiAdvantageYoutubeEmbedRows.filter((row) => row.renderStatus !== "embeddable");

export const aiAdvantageYoutubeEmbedValidation: AiAdvantageYoutubeEmbedValidation =
  {
    totalManifestRows: rawManifest.totals.total_manifest_rows,
    loadedRows: aiAdvantageYoutubeEmbedRows.length,
    embeddableRows: aiAdvantageYoutubeEmbeds.length,
    withVideoId: aiAdvantageYoutubeEmbedRows.filter((row) => row.youtubeVideoId)
      .length,
    withEmbedUrl: aiAdvantageYoutubeEmbedRows.filter((row) => row.youtubeEmbedUrl)
      .length,
    sourceIssueRows: aiAdvantageYoutubeEmbedSourceIssues.length,
    readyRowsEmbedded: aiAdvantageYoutubeEmbedRows.filter(
      (row) => row.sourceStatus === "ready" && row.renderStatus === "embeddable",
    ).length,
    publicVideos: aiAdvantageYoutubeEmbedRows.filter(
      (row) => row.privacy === "public",
    ).length,
    subscriberNotifications: aiAdvantageYoutubeEmbedRows.filter(
      (row) => row.notifySubscribers === "YES",
    ).length,
  };

export const aiAdvantageYoutubeEmbedModuleGroups: AiAdvantageYoutubeEmbedModuleGroup[] =
  buildModuleGroups(aiAdvantageYoutubeEmbeds);

const rowByLessonSlug = new Map(
  aiAdvantageYoutubeEmbedRows.map((row) => [row.suggestedLessonSlug, row]),
);

const rowByLessonPath = new Map(
  aiAdvantageYoutubeEmbedRows.map((row) => [row.suggestedLessonPath, row]),
);

export function getAiAdvantageYoutubeEmbedByLessonSlug(slug: string) {
  return rowByLessonSlug.get(slug);
}

export function getAiAdvantageYoutubeEmbedByLessonPath(path: string) {
  return rowByLessonPath.get(path);
}

export function getAiAdvantageYoutubeEmbedModuleGroups() {
  return aiAdvantageYoutubeEmbedModuleGroups;
}

export function getAiAdvantageYoutubeEmbedStats() {
  return aiAdvantageYoutubeEmbedValidation;
}

export function groupAiAdvantageYoutubeEmbedsByModule(
  videos: AiAdvantageYoutubeEmbedRecord[],
) {
  return buildModuleGroups(videos);
}

function buildModuleGroups(videos: AiAdvantageYoutubeEmbedRecord[]) {
  const groups = new Map<string, AiAdvantageYoutubeEmbedModuleGroup>();

  videos.forEach((video) => {
    const existing = groups.get(video.module);
    if (existing) {
      existing.videos.push(video);
      existing.count += 1;
      return;
    }

    groups.set(video.module, {
      module: video.module,
      moduleSlug: video.moduleSlug,
      count: 1,
      videos: [video],
    });
  });

  return [...groups.values()].sort((a, b) => sortModuleLabels(a.module, b.module));
}

function sortModuleLabels(a: string, b: string) {
  const aRank = moduleRank(a);
  const bRank = moduleRank(b);

  if (aRank !== bRank) return aRank - bRank;
  return a.localeCompare(b);
}

function moduleRank(module: string) {
  const leading = Number.parseInt(module, 10);
  return Number.isFinite(leading) ? leading : Number.MAX_SAFE_INTEGER;
}
