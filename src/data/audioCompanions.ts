import audioCompanionPackage from "../../docs/notebooklm-audio-companions/audio-companions.json";

export type AudioCompanionStatus =
  | "prompt-ready"
  | "generating"
  | "generated"
  | "downloaded"
  | "needs-drive-upload"
  | "published";

export type AudioCompanionTrack = "core" | "bonus";

/**
 * Public-facing shape only. Internal NotebookLM identifiers, source notebook
 * URLs, local file paths, Drive target folders, and raw audio filenames are
 * intentionally stripped before this data ships to the client bundle. The full
 * production record lives in `docs/notebooklm-audio-companions/` and the
 * publishing workflow is documented in
 * `docs/AUDIO_COMPANIONS_PUBLISHING_GUIDE.md`.
 */
export type AudioCompanion = {
  id: string;
  title: string;
  session: string | null;
  track: AudioCompanionTrack;
  route: string;
  type: string;
  status: AudioCompanionStatus;
  driveFileId: string | null;
  duration: string | null;
  websitePlacement: string[];
  notes?: string;
};

type RawAudioCompanion = AudioCompanion & {
  sourceNotebookUrl?: string;
  sourceNotebookTitle?: string;
  customPromptFile?: string;
  audioFileName?: string | null;
  localAudioPath?: string | null;
  driveTargetFolder?: string;
  notebooklmTaskId?: string;
  notebooklmArtifactTitle?: string;
  audioByteSize?: number;
  downloadedAt?: string;
  submittedAt?: string;
  generateOptions?: Record<string, unknown>;
};

type AudioCompanionPackage = {
  audioCompanions: RawAudioCompanion[];
};

function toClientSafeAudioCompanion(raw: RawAudioCompanion): AudioCompanion {
  return {
    id: raw.id,
    title: raw.title,
    session: raw.session,
    track: raw.track,
    route: raw.route,
    type: raw.type,
    status: raw.status,
    // A companion only renders a Drive player when it is `published` AND has a
    // confirmed driveFileId. Anything else is `null` so the card falls back to
    // the "Audio version under review" placeholder state.
    driveFileId: raw.status === "published" ? raw.driveFileId ?? null : null,
    duration: raw.duration ?? null,
    websitePlacement: raw.websitePlacement,
    notes: raw.notes,
  };
}

export const audioCompanions: AudioCompanion[] = (
  audioCompanionPackage as AudioCompanionPackage
).audioCompanions.map(toClientSafeAudioCompanion);

export const coreAudioCompanions = audioCompanions.filter(
  (companion) => companion.track === "core",
);

export const bonusAudioCompanions = audioCompanions.filter(
  (companion) => companion.track === "bonus",
);

const productionOrderIds = [
  "101-foundation-audio-companion",
  "501-pipeline-sales-systems-audio-companion",
  "201-borrower-conversion-audio-companion",
  "301-referral-partner-growth-audio-companion",
  "401-content-marketing-audio-companion",
  "601-elite-execution-audio-companion",
  "ai-advantage-for-loan-officers",
  "follow-up-that-does-not-sound-desperate",
  "weekly-sales-operating-system",
  "objection-handling-not-salesy",
  "psychological-sales-for-mortgage-los",
];

export const productionOrderedAudioCompanions = productionOrderIds
  .map((id) => audioCompanions.find((companion) => companion.id === id))
  .filter((companion): companion is AudioCompanion => companion !== undefined);

export function getDriveAudioUrl(companion: AudioCompanion) {
  if (companion.status !== "published" || !companion.driveFileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=download&id=${companion.driveFileId}`;
}

export function getAudioStatusLabel(status: AudioCompanionStatus) {
  if (status === "published") return "Published";
  if (status === "generating") return "Audio version in production";
  return "Audio version under review";
}

export function getAudioCompanionByRoute(route: string) {
  const normalizedRoute = normalizeRoute(route);

  return coreAudioCompanions.find((companion) =>
    companion.websitePlacement.some(
      (placement) => normalizeRoute(placement) === normalizedRoute,
    ),
  );
}

export function getAudioCompanionsByPlacement(route: string) {
  const normalizedRoute = normalizeRoute(route);

  return audioCompanions.filter((companion) =>
    companion.websitePlacement.some(
      (placement) => normalizeRoute(placement) === normalizedRoute,
    ),
  );
}

function normalizeRoute(route: string) {
  if (route === "/") return route;
  return route.replace(/\/+$/, "");
}
