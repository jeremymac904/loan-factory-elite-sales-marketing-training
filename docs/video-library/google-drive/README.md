# Google Drive Staging — LO Development Platform Video Library

Power Agent 3 deliverables. **Plan/runbook only — nothing has been uploaded.**

## Files here

| File | What it is |
| ---- | ---------- |
| `drive-folder-plan.md` | The restricted Drive folder tree and per-folder file counts |
| `upload-runbook.md` | Ordered, gated procedure to stage the library (Step 0 gates) |
| `share-permission-plan.md` | Restricted, link-not-public sharing policy |
| `local-to-drive-mapping.csv` | Row-by-row local file → planned Drive folder mapping |

Generators / guarded executor live in `scripts/drive-upload/`:

| Script | What it does |
| ------ | ------------ |
| `build-drive-manifest.mjs` | Reads the manifests, writes the full 387-row `local-to-drive-mapping.csv` |
| `upload-to-drive.mjs` | Guarded uploader: DRY RUN by default; fails closed on every gate |

## The mapping CSV (387 rows, generated)

`local-to-drive-mapping.csv` holds the complete, fully source-grounded file list,
produced by `build-drive-manifest.mjs` from `master_clip_manifest.json` +
`build_summary.json` + `youtube_upload_manifest_ready.csv`:

- 7 long-form videos (`lo-longform-01..07`)
- 7 long-form Gemini notes (`lo-longform-0N-notes`)
- 91 clip videos + 91 thumbnails + 91 captions + 91 clip markdown (`lo-dev-001..091`)
- 9 planning manifests

= **387 rows** (plus a header). No `id ↔ filename` pairing was hand-written; every
clip row comes deterministically from the manifest. All `drive_file_id` /
`drive_file_url` columns are emitted **empty** — they are filled only after a real,
approved upload.

Regenerate any time (idempotent — overwrites the CSV in place):

```bash
node scripts/drive-upload/build-drive-manifest.mjs
```

## Account status (read first)

The read-only Drive identity check found the connected account is
**`jeremy@mcdonald-mtg.com`** (personal), NOT the Loan Factory account
(`jeremy.mcdonald@loanfactory.com`). **Upload is blocked until this is corrected or
explicitly confirmed by Jeremy.** See `upload-runbook.md` Step 0 / Step 1.
