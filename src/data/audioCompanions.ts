import audioCompanionPackage from "../../docs/notebooklm-audio-companions/audio-companions.json";

export type AudioCompanionStatus =
  | "prompt-ready"
  | "generating"
  | "generated"
  | "downloaded"
  | "needs-drive-upload"
  | "published";

export type AudioCompanionTrack = "core" | "bonus";

export type AudioCompanion = {
  id: string;
  title: string;
  session: string | null;
  track: AudioCompanionTrack;
  route: string;
  type: string;
  sourceNotebookUrl?: string;
  sourceNotebookTitle?: string;
  customPromptFile?: string;
  status: AudioCompanionStatus;
  audioFileName: string | null;
  localAudioPath: string | null;
  driveTargetFolder: string;
  driveFileId: string | null;
  duration: string | null;
  websitePlacement: string[];
  notes?: string;
};

type AudioCompanionPackage = {
  audioCompanions: AudioCompanion[];
};

export const audioCompanions = (
  audioCompanionPackage as AudioCompanionPackage
).audioCompanions;

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
  "social-media-starts-conversations",
  "high-trust-realtor-relationships",
  "turning-training-into-closings",
];

export const productionOrderAudioCompanions = productionOrderIds
  .map((id) => audioCompanions.find((companion) => companion.id === id))
  .filter((companion): companion is AudioCompanion => Boolean(companion));

export function getDriveAudioUrl(companion: AudioCompanion) {
  if (!companion.driveFileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=download&id=${companion.driveFileId}`;
}

export function getAudioStatusLabel(status: AudioCompanionStatus) {
  if (status === "published") return "Published";
  if (status === "generating") return "In Production";
  if (
    status === "downloaded" ||
    status === "generated" ||
    status === "needs-drive-upload"
  ) {
    return "In Review";
  }
  return "Planned";
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
