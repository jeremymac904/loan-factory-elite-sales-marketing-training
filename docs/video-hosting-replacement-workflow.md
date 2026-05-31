# Video Hosting Replacement Workflow — Drive → YouTube (Daily 08:00)

**Owner:** Power Agent 6 (Scheduled Drive→YouTube Replacement)
**Product:** Loan Factory LO Development Platform (Next.js 16 App Router + Supabase + Tailwind)
**Status of this sprint:** Design + guarded script + report template. **No uploads, no `--apply`, no push.**

---

## 1. Problem this solves

The LO Development Platform video library (91 clips + 7 long-form recordings = 98 entries) ships today with
**Google Drive as the fallback host** because nothing has been uploaded to YouTube yet. In the source-of-truth
manifest `youtube_upload_manifest_ready.csv`, every `drive_file_link`, `youtube_video_url`, `youtube_embed_url`,
and `youtube_video_id` column is **empty** — verified current state: no YouTube upload happened, no n8n trigger
happened, source mp4s were not modified.

Once clips are uploaded to YouTube (a separate, Jeremy-approved step — 7.7 GB across a Google account), the
platform should **automatically replace the Google Drive fallback with the YouTube embed**, one clip at a time,
as each upload's `youtube_video_id` lands in the status manifest. This document designs that replacement loop and
the guarded script that performs it.

This workflow is the **consumer side** of uploads — it does not upload anything. It reads upload status and
flips the platform's data layer from "Drive ready" to "YouTube live" for clips that actually have a real video id.

---

## 2. Where this fits in the agent pipeline

```
PA2  ──>  src/data/loDevelopmentVideoLibrary.ts   (the LoVideo[] data layer the UI renders)
PA4  ──>  docs/video-library/youtube/upload-queue-manifest.json   (the per-clip upload status queue)
PA6  ──>  scripts/replace-drive-with-youtube.mjs   (THIS: reads PA4 status, updates PA2 data)
              + docs/video-hosting-replacement-workflow.md (this doc)
              + automation/replacement/daily-report-template.md
```

- **Consumes (read-only):** PA2's data file and PA4's queue manifest (or, if the queue manifest is absent,
  the staged `.video-source/manifests/youtube_upload_manifest_ready.csv`).
- **Produces (write, guarded behind `--apply`):** targeted updates to PA2's `loDevelopmentVideoLibrary.ts`
  entries — set `youtubeVideoId`, `youtubeEmbedUrl`, `hostingStatus = "youtube_live"`, refresh `lastCheckedDate`.
- **Never invents** a Drive link or a YouTube id. If a manifest row has no real `youtube_video_id`, the clip is
  left exactly as PA2 produced it (`hostingStatus = "google_drive_ready"`).

### Exact contracts PA6 depends on (must match PA2 / PA4 verbatim)

```ts
// from src/data/loDevelopmentVideoLibrary.ts (PA2)
export type VideoHostingStatus =
  | "local_only" | "google_drive_ready" | "google_drive_live"
  | "youtube_pending" | "youtube_live" | "youtube_failed" | "needs_review";
export const loDevelopmentVideoLibrary: LoVideo[];          // 98 entries (91 clips + 7 long_form)
export function getLoVideoBySlug(slug: string): LoVideo | undefined;
export const loVideoLibraryStats: { total; clips; longForm; byHostingStatus; byCategory };
```

`LoVideo` fields the script touches: `id`, `youtubeVideoId`, `youtubeEmbedUrl`, `hostingStatus`, `uploadStatus`,
`lastCheckedDate`. The clip `id` (e.g. `lo-dev-001`) is the join key against the status manifest.

---

## 3. Status manifest contract (input)

The script prefers the JSON queue produced by PA4 and falls back to the CSV:

1. `docs/video-library/youtube/upload-queue-manifest.json` (preferred — structured, easy to diff)
2. `.video-source/manifests/youtube_upload_manifest_ready.csv` (fallback — the staged source manifest)

### CSV columns (verified)

```
drive_file_link, title, description, tags, privacy, notify_subscribers, playlist,
platform_section, publish_at, category, youtube_video_url, youtube_embed_url,
youtube_video_id, upload_status, uploaded_at
```

The CSV does not carry the clip `id` column directly, so the script joins on **slug/title** against PA2's
library (matching `youtube_upload_manifest_ready` row order is also 1:1 with `master_clip_manifest` id order,
which the script uses as a secondary join). If a row cannot be matched to a library `id`, it is reported under
"skipped — no matching library id" and never guessed.

### JSON queue shape (preferred — what PA4 should emit)

```jsonc
{
  "generatedAt": "2026-05-31T08:00:00-05:00",
  "items": [
    {
      "id": "lo-dev-001",            // join key — REQUIRED for a confident match
      "slug": "...",
      "youtubeVideoId": "",          // empty until a real upload lands
      "youtubeEmbedUrl": "",
      "uploadStatus": "pending",     // pending | uploaded | failed | needs_review
      "privacy": "unlisted",
      "notifySubscribers": false,
      "uploadedAt": null
    }
  ]
}
```

### The "real id" rule

A row is eligible for replacement **only if** `youtube_video_id` is a real, non-empty value that matches the
YouTube id shape `^[A-Za-z0-9_-]{11}$`. Anything else (empty string, `null`, `pending`, placeholder text) is
**skipped** — the clip stays on its Google Drive fallback. This is the single most important guard: it makes
the script impossible to use to fabricate a "live" video.

---

## 4. The daily replacement loop (08:00 America/Chicago)

```
08:00  Runner triggers:  node scripts/replace-drive-with-youtube.mjs        (DRY-RUN, default)
  │
  ├─ 1. Load status manifest (JSON queue preferred, else staged CSV).
  ├─ 2. Load src/data/loDevelopmentVideoLibrary.ts (read-only parse / locate per id).
  ├─ 3. For each manifest row:
  │       • no real youtube_video_id  → skip (clip stays google_drive_ready)
  │       • real id + library already youtube_live + same id → no-op (idempotent)
  │       • real id + library entry found → plan: set youtubeVideoId / youtubeEmbedUrl /
  │           hostingStatus="youtube_live" / uploadStatus / lastCheckedDate
  │       • real id but no matching library id → report skip (never guess)
  ├─ 4. Print human summary + machine-readable JSON to stdout.
  ├─ 5. (DRY-RUN) WRITE NOTHING. Exit 0.
  │
  └─ 6. Runner renders automation/replacement/daily-report-template.md → dated report.
        If NEWLY_REPLACED > 0, runner pings Jeremy: "N clips ready to flip — approve --apply".
```

When Jeremy approves, a human (or Jeremy himself) runs the **apply** path:

```
node scripts/replace-drive-with-youtube.mjs --apply
  │
  ├─ Same load + plan as DRY-RUN.
  ├─ Edits ONLY the planned library entries in place (idempotent, per-id, AST-free string edit;
  │    or re-runs PA2's generator if one is detected — see §6).
  ├─ Writes src/data/loDevelopmentVideoLibrary.ts.
  ├─ Prints the same report block, with WROTE=YES.
  └─ STOPS. It does NOT run lint/typecheck/build. It does NOT git add/commit/push/deploy.
```

Validation + local commit are done by the **Lead/human** after `--apply`:

```
rm -rf .next            # ENOTEMPTY quirk noted in repo memory
npm run lint && npm run typecheck && npm run build
git add src/data/loDevelopmentVideoLibrary.ts
git commit -m "chore(video): replace Drive fallback with YouTube embeds for newly uploaded clips"
# DO NOT push/deploy without Jeremy's explicit go-ahead.
```

> The script deliberately stops short of running the build and committing. Keeping the "verify + commit" gate in
> human hands prevents an automated job from ever shipping a broken data file or pushing without review.

---

## 5. Why a local Node script on a scheduled runner (and not n8n-only / not a server cron)

**Decision: a local idempotent Node script (`scripts/replace-drive-with-youtube.mjs`) invoked by a scheduled
AionUI task at 08:00 America/Chicago, with n8n as an optional secondary trigger — both kept disabled/inactive
this sprint.**

Rationale:

| Option | Verdict | Why |
| --- | --- | --- |
| **Local Node script + scheduled AionUI task** | **Chosen** | Runs in the repo working tree where `loDevelopmentVideoLibrary.ts` lives; can edit the file, parse the manifest, and (when a human approves) be committed through normal git review. Zero new infra, no secrets, no network calls. The AionUI scheduler already runs on Jeremy's machine alongside this repo. |
| n8n workflow doing the file edit | Rejected as primary | n8n excels at API orchestration, not at safely editing a TypeScript source file inside a git working tree and gating it behind human `--apply` + local build. Using n8n to mutate repo source would put codegen behind a workflow engine that can't run lint/typecheck/build or `git`. n8n stays an **optional trigger** that shells out to the same Node script — and is left **inactive** this sprint. |
| Server / CI cron | Rejected | The data file must be edited in the developer working tree and validated locally before commit. A CI cron would need write-back to git and could push without the human gate this design insists on. |
| Direct DB / Supabase write | Rejected | The library is a static TS data layer, not a DB table. No Supabase schema/RLS/seed change is in scope. |

**Idempotency** is what makes a daily schedule safe: re-running the script on an already-replaced library is a
no-op (it detects `hostingStatus === "youtube_live"` with the same `youtubeVideoId` and skips). So a missed day,
a double-fire, or a manual re-run never corrupts state.

### Scheduling the runner (reference — not activated this sprint)

- **AionUI scheduled task** (preferred): a daily 08:00 America/Chicago task whose command is
  `node scripts/replace-drive-with-youtube.mjs` (DRY-RUN). It writes the dated report and notifies Jeremy if
  anything is newly replaceable. The `--apply` step is **never** scheduled; it is human-invoked after approval.
- **n8n (optional, disabled):** a Schedule Trigger → Execute Command node running the same Node command in
  DRY-RUN. Must be created **inactive**; do not publish/activate it this sprint.

---

## 6. How the script edits `loDevelopmentVideoLibrary.ts` safely

Two strategies, in priority order:

1. **Re-run PA2's generator (preferred when present).** If a generator script is detected
   (`scripts/build-lo-video-library.mjs`, `scripts/generate-lo-video-library.mjs`, or a
   `scripts/video-library/*.mjs` that emits the data file), the script merges the newly-uploaded
   `youtube_video_id`s into a side-car overrides file and re-invokes the generator so the data file is rebuilt
   deterministically from the manifests. This keeps PA6 from hand-editing generated output.
2. **Guarded per-id, AST-free block edit (fallback, always available).** When no generator is detected, the
   script locates each target entry by its unique `id: "lo-dev-0NN"` (or `id: "lo-longform-0N"`) literal,
   isolates that object's `{ ... }` block by brace matching, and rewrites **only** these fields inside that
   block: `youtubeVideoId`, `youtubeEmbedUrl`, `hostingStatus`, `uploadStatus`, `lastCheckedDate`. It never
   touches any other entry, never reorders entries, and never changes the type definitions or exports.

Both paths are **idempotent** and refuse to write if a planned change would set a field to a fabricated value.

---

## 7. Hard safety guarantees (this script + workflow)

- **Read-only sources.** Never deletes/modifies any video, thumbnail, caption, markdown, or manifest under the
  two source folders. The script opens manifests read-only.
- **No uploads.** Performs zero Google Drive or YouTube uploads. Real uploads (7.7 GB) require Jeremy's explicit
  approval and a Google-account confirmation — out of scope here.
- **Unlisted only.** Any referenced upload must be `privacy = unlisted`, `notify_subscribers = false`. The
  script reports (and refuses to flip) any row that claims a non-unlisted privacy.
- **No public publish.** Flipping a clip to `youtube_live` in the data layer does not publish it on YouTube; it
  only points the platform embed at the existing (unlisted) video id.
- **No n8n activation.** Any n8n trigger is a draft, disabled/inactive.
- **No secrets, no network.** The script reads local files only. It does not read `.env`, call APIs, or hit the
  network.
- **DRY-RUN by default.** `--apply` is required to write. The script never runs `git`, never pushes, never
  deploys, never runs the build.
- **No invented metadata.** Missing fields are left as PA2 produced them. Unmatched rows are reported, not
  guessed.

---

## 8. Naming compliance (enforced in copy and reports)

- `Thuan` (never `Tuan`).
- Paid tiers: `LO Mastery` ($249) and `Loan Factory Alliance` ($449).
- `Sales and Marketing 101-601` is FREE internal training — never paid, never "Elite".
- `AI Advantage` is correct; never `Apex Advisor`.
- Brand orange `#F26A1F`.

---

## 9. Approval gates (Jeremy must approve before any of these)

1. Uploading the 7.7 GB of clips to YouTube (Drive→YouTube source step — not this script).
2. Running this script with `--apply` (the first real flip of the data layer).
3. Activating the AionUI scheduled task or the n8n trigger.
4. `git push` / Netlify deploy of the updated data file.

Until then: DRY-RUN reports only.
