# Google Drive Upload Runbook — LO Development Platform Video Library

> **DO NOT RUN A REAL UPLOAD UNTIL EVERY GATE IN STEP 0 IS GREEN.**
> Nothing has been uploaded. The 387-file payload (98 videos + thumbnails +
> captions + markdown + manifests, documented at ~7.7 GB of media) requires
> Jeremy's explicit approval and a **verified Loan Factory Google account.**

This runbook is the exact, ordered procedure to stage the library into one
restricted Google Drive folder tree. It pairs with:

- `drive-folder-plan.md` — the folder tree
- `local-to-drive-mapping.csv` — every file and its destination (generated)
- `share-permission-plan.md` — restricted sharing policy
- `scripts/drive-upload/upload-to-drive.mjs` — the guarded uploader (dry-run by default)
- `scripts/drive-upload/build-drive-manifest.mjs` — the manifest-driven CSV generator

---

## Step 0 — Approval & account gates (ALL must be green)

| Gate | Requirement | Current status |
| ---- | ----------- | -------------- |
| G1 | Jeremy explicitly approves uploading ~7.7 GB to Google Drive | NOT given |
| G2 | The connected Google account is **Jeremy's Loan Factory account** (`jeremy.mcdonald@loanfactory.com`) | **FAILS** — connected account is `jeremy@mcdonald-mtg.com` (personal), per the read-only identity check |
| G3 | The real ~7.7 GB media is mounted (NOT the 0-byte staging stubs in this environment) | NOT confirmed |
| G4 | A reviewer has wired an authenticated Drive client into `performUpload()` | NOT done — intentionally unwired |

> The read-only identity check (`list_recent_files`) returned files owned by
> **`jeremy@mcdonald-mtg.com`** — the personal account, NOT the Loan Factory
> account. So **G2 fails today.** STOP: do not upload to a personal account.
> Reconnect Drive as the Loan Factory account (or get Jeremy's explicit written
> decision that the personal account is the intended destination) before proceeding.

**You may not proceed past Step 0 until G1–G4 are all satisfied.**

---

## Step 1 — Verify / correct the connected account (read-only)

1. Confirm the Drive integration is authenticated as the **Loan Factory** Google
   account (`jeremy.mcdonald@loanfactory.com`). Use a read-only check
   (`list_recent_files`) and confirm the owner email — today it shows
   `jeremy@mcdonald-mtg.com`, which is wrong for this library.
2. If it is anyone other than the confirmed Loan Factory account: **STOP.** Record
   the actual account, disconnect it, reconnect as the Loan Factory account, and
   re-verify before continuing.

---

## Step 2 — Verify the local payload (read-only)

1. Confirm the real media is present and non-zero:

   ```bash
   node scripts/drive-upload/upload-to-drive.mjs
   ```

   This DRY RUN prints every file, whether it exists locally, and its size. In the
   staging environment files show as **0-BYTE STUB** — expected here and a STOP
   condition for a real upload. On the machine with the real media, every row must
   show a real size and the total should be on the order of the documented ~7.7 GB.
2. Confirm counts: **7** long-form videos, **91** clip videos, **91** thumbnails,
   **91** captions, **98** markdown files (91 clip + 7 long-form notes), **9**
   manifests = **387** files.

---

## Step 3 — Create the folder tree (manual, restricted)

Create, in the Loan Factory Drive, the tree from `drive-folder-plan.md`:

```
Loan Factory LO Development Platform Videos   (root)
├── Long Form Training Videos
├── Cutdown Clip Library
├── Thumbnails
├── Captions
├── Markdown Notes
└── Manifests
```

- Create the **root as Restricted** (default). Do not add any sharing yet.
- Sharing/permissions are applied only after upload, per `share-permission-plan.md`.

---

## Step 4 — Generate & confirm the mapping

```bash
node scripts/drive-upload/build-drive-manifest.mjs   # writes local-to-drive-mapping.csv
node scripts/drive-upload/upload-to-drive.mjs         # dry run; prints plan + local check
```

- The generator parses `master_clip_manifest.json` + `build_summary.json` +
  `youtube_upload_manifest_ready.csv` and writes 387 rows.
- Spot-check 5–10 rows of `local-to-drive-mapping.csv`: local filename → planned
  Drive folder. `drive_file_id` / `drive_file_url` must be **empty** (filled after
  upload).

---

## Step 5 — Guarded real upload (only after Step 0 is fully green)

The uploader fails closed. A real upload requires **all** of:

```bash
DRIVE_UPLOAD_ACCOUNT="jeremy.mcdonald@loanfactory.com" \
LO_DEV_DRIVE_UPLOAD_APPROVED="yes" \
node scripts/drive-upload/upload-to-drive.mjs \
  --confirm \
  --account "jeremy.mcdonald@loanfactory.com"
```

- Missing/incorrect flags or env → the script **refuses** (exit 2) and uploads
  nothing.
- Even with all gates satisfied, `performUpload()` is **intentionally not wired**
  and throws (exit 1). A reviewer must explicitly wire an authenticated Drive
  client there. This prevents any accidental upload.
- When wiring: upload each file into its `planned_drive_folder`, capture the
  returned Drive file id + webViewLink, and write them back into the
  `drive_file_id` / `drive_file_url` columns of `local-to-drive-mapping.csv`.

---

## Step 6 — Verify & record (post-upload)

1. Confirm 387 files landed in the correct subfolders.
2. Confirm **no file is publicly shared** (each should be Restricted; see
   `share-permission-plan.md`).
3. Fill `drive_file_id` / `drive_file_url` for every row in
   `local-to-drive-mapping.csv`. These real Drive links become the source for
   `LoVideo.googleDriveUrl` in `src/data/loDevelopmentVideoLibrary.ts` (PA2) — and
   only then may a clip's `hostingStatus` move from `google_drive_ready` to
   `google_drive_live`.

---

## Safety summary (non-negotiable)

- **Account:** Loan Factory Google account only. Verify before and after. (Currently
  connected account is `jeremy@mcdonald-mtg.com` — must be corrected first.)
- **Privacy:** Restricted everywhere. No public links, no "anyone with link", no
  domain sharing.
- **Scope:** Drive only. No YouTube upload, no n8n activation, no email/Chat, no
  Supabase/seed changes as part of this runbook.
- **Source:** read-only. Drive gets copies; originals are never moved or deleted.
- **Fail closed:** the script never uploads by default and refuses on any unmet gate.
