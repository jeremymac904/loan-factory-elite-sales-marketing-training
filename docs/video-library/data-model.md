# LO Development Video Library — Data Model

This document describes the **unified, manifest-driven video data model** that powers the
LO Development Platform video library, how it is generated, and the contracts other
parts of the codebase rely on.

- **Generated file (source of truth for the app):** `src/data/loDevelopmentVideoLibrary.ts`
- **Generator (codegen):** `scripts/build-video-library.mjs`
- **Inputs (read-only manifests):** `.video-source/manifests/`
- **Editorial layer (separate file, keyed by `LoVideo.id`):** `src/data/loDevelopmentVideoContent.ts` (owned by PA7)

> `src/data/loDevelopmentVideoLibrary.ts` is **auto-generated — do not edit by hand.**
> Change the manifests or the generator and re-run the codegen.

---

## Regeneration

```bash
node scripts/build-video-library.mjs
```

The script is **re-runnable and idempotent**: it reads the manifests, rebuilds all 98
entries, runs internal safety guards, and overwrites `src/data/loDevelopmentVideoLibrary.ts`.
It writes **only** that one file. It never uploads anything, never modifies any source
video/thumbnail/caption/markdown, and never invents Google Drive or YouTube URLs.

After regenerating, run the normal project validation (lint + typecheck + build).

---

## Inputs

The generator reads three files from `.video-source/manifests/` (staged read-only copies
of the cutdown library manifests):

| File | Used for |
| --- | --- |
| `master_clip_manifest.json` | The 91 clips (id, title, slug, category, priority, description, source recording, and the `/Users` absolute paths that get rewritten to basenames). |
| `youtube_upload_manifest_ready.csv` | Per-clip `upload_status` (joined by `row_id` → clip number, e.g. `001` → `lo-dev-001`). |
| `build_summary.json` | The 7 long-form recordings (`source_files_matched`, in order → `lo-longform-01`..`lo-longform-07`). |

### Verified current state (sprint snapshot, 2026-05-31)

Per `handoff_validation_summary.json`: **no YouTube upload happened, no n8n trigger
happened, source mp4s were not modified**, and the Drive/YouTube columns in the youtube
manifest are empty. Therefore every emitted entry uses `hostingStatus:
"google_drive_ready"` with `googleDriveUrl`, `youtubeVideoId`, and `youtubeEmbedUrl` all
`null`. The clip `upload_status` in the youtube manifest is currently `"youtube_hold"`
for all 91 clips; that real value is carried through verbatim (it is **not** invented).

---

## Output shape

```ts
export type VideoHostingStatus =
  | "local_only"
  | "google_drive_ready"
  | "google_drive_live"
  | "youtube_pending"
  | "youtube_live"
  | "youtube_failed"
  | "needs_review";

export type VideoSourceType = "long_form" | "clip";

export type LoVideo = {
  id: string;                       // "lo-dev-001".."lo-dev-091" | "lo-longform-01".."lo-longform-07"
  title: string;
  description: string;
  category: string;                 // clip: platform_category; long_form: "Training Long Form"
  module: string | null;            // always null (clips are not 101-601 modules)
  sourceType: VideoSourceType;
  localFileName: string;            // mp4 basename (never a /Users path)
  thumbnailPath: string | null;     // basename | null
  captionPath: string | null;       // basename | null
  markdownPath: string | null;      // basename | null
  googleDriveUrl: string | null;    // null until a real upload happens
  youtubeVideoId: string | null;    // null until a real upload happens
  youtubeEmbedUrl: string | null;   // null until a real upload happens
  hostingStatus: VideoHostingStatus;// "google_drive_ready" for every entry today
  uploadStatus: string;             // clip: youtube manifest upload_status (empty -> "pending"); long_form: "pending"
  priority: "High" | "Medium" | "Low";
  routeSlug: string;                // clip: manifest slug; long_form: kebab of cleaned recording name
  relatedTrainingModule: string | null; // always null today
  relatedLongFormSource: string | null; // the source recording mp4 name
  lastCheckedDate: string;          // "2026-05-31"
};

export const loDevelopmentVideoLibrary: LoVideo[];   // 91 clips + 7 long_form = 98 entries
export function getLoVideoBySlug(slug: string): LoVideo | undefined;
export const loVideoLibraryStats: {
  total: number;
  clips: number;
  longForm: number;
  byHostingStatus: Record<string, number>;
  byCategory: Record<string, number>;
};
```

---

## Field mapping

### Clips (91 → `lo-dev-001`..`lo-dev-091`)

| `LoVideo` field | Source |
| --- | --- |
| `id` | manifest `id` |
| `title` | manifest `title` |
| `description` | manifest `description` (empty string if missing) |
| `category` | manifest `platform_category` |
| `module` | `null` |
| `sourceType` | `"clip"` |
| `localFileName` | `basename(video_path)` |
| `thumbnailPath` | `basename(thumbnail_path)` |
| `captionPath` | `basename(caption_path)` |
| `markdownPath` | `basename(markdown_path)` |
| `googleDriveUrl` / `youtubeVideoId` / `youtubeEmbedUrl` | `null` |
| `hostingStatus` | `"google_drive_ready"` |
| `uploadStatus` | youtube manifest `upload_status` for matching `row_id` (empty → `"pending"`) |
| `priority` | manifest `priority` |
| `routeSlug` | manifest `slug` |
| `relatedTrainingModule` | `null` |
| `relatedLongFormSource` | manifest `source_recording` |
| `lastCheckedDate` | `"2026-05-31"` |

### Long-form (7 → `lo-longform-01`..`lo-longform-07`)

Derived from `build_summary.json.source_files_matched`, **in source order**:

| seq | `id` | `source_key` | recording mp4 |
| --- | --- | --- | --- |
| 01 | `lo-longform-01` | `1003-mistakes` | `LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4` |
| 02 | `lo-longform-02` | `lo-kickoff` | `LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.mp4` |
| 03 | `lo-longform-03` | `compensation-fees` | `LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4` |
| 04 | `lo-longform-04` | `leads-marketing` | `LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.mp4` |
| 05 | `lo-longform-05` | `loans-onboarding` | `LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.mp4` |
| 06 | `lo-longform-06` | `loans-qa` | `Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4` |
| 07 | `lo-longform-07` | `pricing-qa` | `Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.mp4` |

Long-form mapping rules:

- `title` = recording name cleaned (drop `.mp4`, drop trailing ` - <date> ... - Recording`,
  turn `Series_ ` into `Series: `). e.g. `LO Onboarding Series: Compensation & Fees`.
- `category` = `"Training Long Form"`.
- `localFileName` / `markdownPath` = mp4 / md basenames.
- `thumbnailPath` / `captionPath` = `null` (the cutdown library does not render thumbnails
  or captions for the full recordings).
- `routeSlug` = kebab-case of the cleaned title (`&` → `and`).
- `uploadStatus` = `"pending"` (long-form recordings are not part of the youtube clip manifest).

---

## Safety guards in the generator

The script aborts (non-zero exit, no write) if any of these fail:

- **No `/Users` leak** — any `localFileName`/`thumbnailPath`/`captionPath`/`markdownPath`
  containing `/Users`, and a final check that the entire emitted source contains no
  `/Users` substring.
- **Unique `routeSlug`** across all 98 entries.
- **Counts** — exactly 91 clips, exactly 7 long-form, exactly 98 total.

String fields are serialized with `JSON.stringify`, so quotes/newlines are always escaped
correctly and the emitted file is valid TypeScript by construction.

---

## Cross-agent contract

Other agents/pages import from `src/data/loDevelopmentVideoLibrary.ts`:

- `loDevelopmentVideoLibrary: LoVideo[]` — the 98 entries.
- `getLoVideoBySlug(slug): LoVideo | undefined` — slug → entry lookup for dynamic routes.
- `loVideoLibraryStats` — totals + breakdowns for dashboards/summaries.
- Types `LoVideo`, `VideoHostingStatus`, `VideoSourceType`.

The editorial layer `src/data/loDevelopmentVideoContent.ts` (PA7) is keyed by the same
`LoVideo.id` values (`lo-dev-001`..`lo-dev-091`, `lo-longform-01`..`lo-longform-07`), so
the two files join 1:1 on `id`.

> Do not edit the older `src/data/loDevelopmentClipLibrary.ts`. This data model is a new
> parallel source of truth and intentionally does not modify it.

---

## Approval gates (NOT done this sprint)

These require Jeremy's explicit approval before anyone acts on them. The data model
deliberately encodes the "nothing live yet" state so the UI cannot imply otherwise:

- **Google Drive upload** of the 7.7 GB source video set (needs Google-account confirmation).
- **YouTube draft upload** — must be `privacy=unlisted`, `notify_subscribers=false`.
- **Activating any n8n workflow** — drafts only, kept inactive.

When real uploads eventually happen, update the manifests (Drive/YouTube columns), then
re-run `node scripts/build-video-library.mjs`; the generator will then carry real
`googleDriveUrl`/`youtubeVideoId`/`youtubeEmbedUrl` values and the appropriate
`hostingStatus`.
