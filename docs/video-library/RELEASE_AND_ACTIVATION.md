# LO Development Video Library — Release & Activation Runbook

Owner of this doc: Power Agent 8 (QA & Release Runbook)
Last updated: 2026-05-31
Product: Loan Factory LO Development Platform

This is the **single source of truth** for what Jeremy must approve, and in what order,
to take the LO Development video library from "manifest-prepared drafts" to "live,
embedded, auto-replacing". Nothing here has happened yet. Every step is gated.

It consolidates the PA-authored pipeline pieces:
- Data: `src/data/loDevelopmentVideoLibrary.ts` (PA2) + `src/data/loDevelopmentVideoContent.ts` (PA7); generator `scripts/build-video-library.mjs`; spec `docs/video-library/data-model.md`.
- Drive: `docs/video-library/google-drive/` (`upload-runbook.md`, `drive-folder-plan.md`, `share-permission-plan.md`, `local-to-drive-mapping.csv`) + `scripts/drive-upload/build-drive-manifest.mjs` + `scripts/drive-upload/upload-to-drive.mjs`.
- YouTube: `docs/video-library/youtube/` (`activation-checklist.md`, `upload-queue-manifest.json`, `metadata-template.md`) + `automation/n8n/build-upload-queue.mjs` + `automation/n8n/youtube-upload-workflow.draft.json`.

> CURRENT STATE (verified by QA on 2026-05-31)
> - 91 clips + 7 long-form catalogued (98 entries) in the PA2 library; PA7 content keyed 1:1.
> - **Clips:** `googleDriveUrl` / `youtubeVideoId` / `youtubeEmbedUrl` = `null` (91/91);
>   `hostingStatus = google_drive_ready`; `uploadStatus = youtube_hold`.
> - **Long-form (7):** carry a REAL `googleDriveUrl` extracted by the generator from each
>   long-form Gemini `.md` report (`extractDriveLink`), not invented; `hostingStatus` is
>   still `google_drive_ready` (see Step 0 decision).
> - **Drive draft:** `local-to-drive-mapping.csv` = 387 rows, folders planned, **0**
>   `drive_file_id`/`drive_file_url` populated. Uploader is dry-run-by-default,
>   `--confirm`-gated, fail-closed, and `performUpload()` is intentionally **unwired**.
> - **YouTube draft:** queue manifest 91 clips, all `unlisted`/`notify=false`/null-URLs;
>   n8n workflow ships **`active: false`** with a placeholder OAuth credential.
> - **AI Advantage embeds:** 63 EXISTING channel videos (real 11-char IDs, all unlisted,
>   notify NO) — already-public content being embedded, not new uploads.
> - **0** Google Drive uploads of LO clips, **0** YouTube uploads, **0** n8n triggers.
> - Source files unmodified; 7.7GB not in the repo (`public/` has 0 video files).
>
> KNOWN BLOCKER (caught by PA3): the connected Google account is `jeremy@mcdonald-mtg.com`
> (personal), NOT the Loan Factory account (`jeremy.mcdonald@loanfactory.com`). The Drive
> runbook gate **G2 fails** until this is corrected. See Step 1.

---

## Global safety gates (apply to every step)

1. **No public publishing.** All YouTube uploads MUST be `privacy=unlisted`,
   `notify_subscribers=false`. (Both the YouTube queue and AI Advantage manifest enforce
   this: 91/91 and 63/63.)
2. **No auto-activation.** The n8n workflow stays `active: false` until Step 4 approval.
3. **No upload without `--confirm`.** The Drive uploader is dry-run by default and
   fail-closed; `performUpload()` must be deliberately wired by a reviewer.
4. **Never fabricate URLs.** Drive/YouTube fields stay `null` (clips) until a real upload
   returns a real ID/link. Flip `hostingStatus` to a `*_live` value ONLY when a real URL
   exists.
5. **Source is read-only.** Never modify/delete anything under the two source folders.
   Drive gets copies; originals are never moved or deleted.
6. **Naming is fixed.** Thuan (not Tuan); paid tiers = LO Mastery ($249) + Loan Factory
   Alliance ($449); Sales and Marketing 101-601 = FREE internal training (never paid,
   never "Elite"); "AI Advantage"; never "Apex Advisor".
7. **No emails / Chat / Zapier / paid APIs / Supabase schema changes / deploy** as part of
   this runbook.

Each numbered step below has an explicit **GATE** requiring Jeremy's go-ahead before
running.

---

## Step 0 — Pre-flight (no approval needed; safe to run)

- [ ] Confirm QA is green: `docs/video-library/qa-report.md` shows no FAIL items.
- [ ] Confirm the Lead's authoritative `lint` / `typecheck` / `build` all pass.
- [ ] **Decide the long-form hosting-status policy (QA WARN #21):** the 7 long-form entries
      already have a real `googleDriveUrl` (extracted from the long-form Gemini reports).
      Either keep `google_drive_ready` (because these are the source-report Drive copies, not
      curated platform hosting) and document it, or flip them to `google_drive_live` by
      adjusting the generator if those links are the intended live hosting. Pick one.
- [ ] Acknowledge QA WARN #22 (long-form 8 `.md` vs 7 `.mp4` — the extra `LO Support
      Research Analysis.md` is an analysis doc; agents correctly used 7).

---

## Step 1 — Confirm the Google account  **[GATE: Jeremy]**  **(currently FAILING — G2)**

**Why first:** every later step authenticates against one Google identity. The Drive
runbook already detected the **wrong** account is connected.

- [ ] **Fix G2:** the connected account is `jeremy@mcdonald-mtg.com` (personal). Reconnect
      Drive/YouTube as the Loan Factory account `jeremy.mcdonald@loanfactory.com`, OR get
      Jeremy's explicit written decision that the personal account is the intended
      destination. Re-verify with a read-only `list_recent_files` owner check.
- [ ] Confirm the account has space for ~7.7GB and rights to create unlisted uploads.
- [ ] Confirm the target YouTube channel (the activation checklist asks: personal vs a Loan
      Factory brand account).
- [ ] Confirm the Drive destination tree from `google-drive/drive-folder-plan.md`.

**Do NOT proceed past Step 1 until G2 is green and Jeremy confirms the account + channel.**

---

## Step 2 — Approve the Google Drive upload  **[GATE: Jeremy + `--confirm`]**

Follow `google-drive/upload-runbook.md` (Steps 0–6). The uploader is fail-closed.

- [ ] Generate/refresh the mapping (read-only):
      `node scripts/drive-upload/build-drive-manifest.mjs`
- [ ] Dry run (uploads nothing; prints plan + local file existence/size):
      `node scripts/drive-upload/upload-to-drive.mjs`
      In staging, files show as 0-BYTE STUB — that is a STOP for a real upload; the real
      media must be mounted and show real sizes (~7.7GB total, 387 files).
- [ ] Jeremy reviews the dry-run plan (counts, names, destination, transfer size).
- [ ] **GATE:** Jeremy explicitly approves the real upload.
- [ ] A reviewer wires an authenticated Drive client into `performUpload()` (today it
      throws on purpose). Then run with all gates satisfied:
      ```bash
      DRIVE_UPLOAD_ACCOUNT="jeremy.mcdonald@loanfactory.com" \
      LO_DEV_DRIVE_UPLOAD_APPROVED="yes" \
      node scripts/drive-upload/upload-to-drive.mjs --confirm --account "jeremy.mcdonald@loanfactory.com"
      ```
- [ ] Upload into the planned restricted folders; capture each returned Drive file id +
      webViewLink.

---

## Step 3 — Fill Drive links + flip hostingStatus to `google_drive_live`  **[GATE: real URLs only]**

- [ ] Write `drive_file_id` / `drive_file_url` for every uploaded row in
      `local-to-drive-mapping.csv` and into the upstream manifest the generator reads.
- [ ] Regenerate the library: `node scripts/build-video-library.mjs` (per `data-model.md`:
      idempotent, writes only `src/data/loDevelopmentVideoLibrary.ts`). Each uploaded clip
      then gets a real `googleDriveUrl` and `hostingStatus: "google_drive_live"`.
- [ ] **GATE:** a clip becomes `google_drive_live` ONLY when its `googleDriveUrl` is a real,
      non-null link. Clips still missing a link stay `google_drive_ready`. Never set
      `*_live` with a null URL.
- [ ] Lead re-runs `lint` / `typecheck` / `build`; QA re-checks "no null URL with live
      status".

---

## Step 4 — Approve YouTube upload via n8n (activate the workflow)  **[GATE: Jeremy]**

Use `youtube/upload-queue-manifest.json` + `automation/n8n/youtube-upload-workflow.draft.json`
and follow `youtube/activation-checklist.md` in order. Apply metadata per
`youtube/metadata-template.md`.

- [ ] Complete the checklist's Google Cloud / OAuth setup (YouTube Data API v3, consent,
      `youtube.upload` + `youtube.force-ssl` scopes, 10k/day quota; ≤6 uploads/day).
- [ ] Import the n8n workflow while it stays **inactive**; replace the
      `REPLACE_WITH_JEREMY_YOUTUBE_OAUTH2_CREDENTIAL` placeholder; set instance timezone to
      America/Los_Angeles.
- [ ] Wire the mp4 source (local binary read or Drive download from Step 3 links) and the
      status write-back store (committed JSON / Sheet; NOT Supabase unless separately
      approved).
- [ ] Dry run with pinned/mock data; optionally upload **one** clip and confirm it is
      **unlisted** in YouTube Studio.
- [ ] **GATE:** Jeremy gives final explicit approval. Only then set `active: true` and
      enable. Monitor day 1 (exactly 5 unlisted uploads, correct titles, write-back records
      real video IDs).
- [ ] As real `youtube_video_id` / `youtube_embed_url` come back, write them into the
      manifest, regenerate the library, and flip those clips to `hostingStatus:
      "youtube_live"` — only when a real ID/URL exists. Failed → `youtube_failed`. Never
      invent an ID.
- [ ] Keep videos **unlisted** until Jeremy separately approves making any public. Public
      publishing is out of scope for this runbook.

---

## Step 5 — Enable daily replacement  **[GATE: Jeremy]**

The daily replacement automation (the n8n schedule cron `0 8 * * *`, 5/day) is the **last**
thing to enable.

- [ ] Confirm Steps 2–4 produced real, verified URLs end-to-end for at least a pilot batch.
- [ ] Confirm the library is fully manifest-driven (regeneration is idempotent — it is).
- [ ] **GATE:** Jeremy approves leaving the schedule running.
- [ ] Let it run daily until `pending` = 0; investigate any `needs_review` / `youtube_failed`.
- [ ] Every run preserves all safety gates: unlisted, notify=false, ≤ approved batch, no
      source mutation, no fabricated URLs, naming guard intact.

---

## Rollback / abort

- **Step 2 (Drive):** abort before/while uploading — no source files are touched. Delete any
  partial Drive uploads; clear any `drive_file_id`/`drive_file_url` columns written.
- **Step 4 (YouTube):** set the n8n workflow back to `active: false`. Uploaded drafts are
  unlisted (not publicly visible); delete drafts from the channel if required; clear any
  `youtube_video_id` values written before the abort.
- **Data:** library/content regenerate from manifests — revert by emptying the manifest
  URL/link columns and running `node scripts/build-video-library.mjs` (clips' external URLs
  back to `null`, statuses back to `google_drive_ready`).

---

## What Jeremy must explicitly approve (the gate list)

1. **Step 1** — fix the Google account (G2 currently fails: personal vs Loan Factory) and
   confirm the destination + YouTube channel.
2. **Step 2** — running the `--confirm`-gated Drive uploader for the real ~7.7GB upload
   (after a reviewer wires `performUpload()`).
3. **Step 3** — confirming captured Drive links before flipping any clip to
   `google_drive_live`.
4. **Step 4** — **activating** the n8n YouTube workflow (`active: false` → true); uploads
   stay unlisted, notify=false.
5. **Step 5** — leaving the daily replacement schedule running.

Also decide the Step 0 policy: keep the 7 long-form entries at `google_drive_ready` (they
already carry a real source-manifest Drive URL) or promote them to `google_drive_live`.

Until each gate is approved, the corresponding step stays a draft.
