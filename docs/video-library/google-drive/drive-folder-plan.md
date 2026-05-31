# Google Drive Folder Plan — LO Development Platform Video Library

> **Status:** PLAN ONLY. Nothing has been uploaded. No Google Drive folders have
> been created. Real uploads require Jeremy's explicit approval and a **verified
> Loan Factory Google account** (see `upload-runbook.md`).

This plan defines the exact folder tree that will hold all **98 videos**
(91 cutdown clips + 7 long-form training recordings) plus their thumbnails,
captions, markdown notes, and planning manifests for the Loan Factory **LO
Development Platform**.

The file list is generated, not hand-typed: it comes from
`scripts/drive-upload/build-drive-manifest.mjs`, which reads the read-only
cutdown/long-form manifests. The companion mapping (`local-to-drive-mapping.csv`)
is the row-by-row record of every file and its destination folder; regenerate it
with `node scripts/drive-upload/build-drive-manifest.mjs`.

---

## Connected-account check (read-only, done before planning) — ACTION REQUIRED

A read-only Google Drive identity check was run via the Drive list/search tools
(`list_recent_files`). Result:

> The connected Google Drive account is **`jeremy@mcdonald-mtg.com`** (owner of the
> most recent Drive files, e.g. `youtube-embed-handoff-for-codex.json`).

This is **NOT** the Loan Factory account. Per project records Jeremy's Loan
Factory / LIVE-platform account is **`jeremy.mcdonald@loanfactory.com`**. Because
the connected account is the personal `mcdonald-mtg.com` account, **the upload plan
is HELD.** No file may be uploaded until either:

- the Drive integration is reconnected as the Loan Factory account, **or**
- Jeremy explicitly decides the `mcdonald-mtg.com` account is the correct
  destination for this library and confirms it in writing.

This is recorded as the first item in the sprint's `jeremyMustApprove` list and in
`upload-runbook.md` Step 0 (gate G2).

> Side note from the same check: a separate, already-completed **AI Advantage**
> YouTube effort exists in that Drive (63 unlisted clips, channel "Jeremy McDonald
> - The Mortgage Mentor"). That is a different library from these 91 LO Development
> cutdown clips + 7 long-form recordings and is out of scope here. It does confirm
> the unlisted/no-notify posture this plan also requires.

---

## Folder tree

```
Loan Factory LO Development Platform Videos        (ROOT — restricted)
├── Long Form Training Videos                      (7 long-form .mp4 recordings)
├── Cutdown Clip Library                           (91 cutdown clip .mp4 files)
├── Thumbnails                                     (91 clip thumbnail .jpg files)
├── Captions                                       (91 clip caption .srt files)
├── Markdown Notes                                 (91 clip .md + 7 long-form Gemini reports)
└── Manifests                                      (9 planning manifests — reference copies)
```

### Why this structure

- **One restricted root** keeps the entire library under a single shareable parent
  so a single permission policy governs everything (see `share-permission-plan.md`).
- **Asset-type subfolders** (videos vs thumbnails vs captions vs markdown) match the
  source cutdown library layout exactly, so the local→Drive mapping is 1:1 and
  auditable.
- **Long form is separated from clips** because the 7 recordings are the source
  masters (large files) and the 91 clips are the published library; downstream the
  clips, not the masters, are what get embedded.
- **Manifests folder** preserves the planning record (master manifest, category
  index, build summary, FAQ/automation maps, YouTube upload manifest) alongside the
  media so the library is self-documenting.

---

## File counts per folder (from the manifests)

| Drive folder                 | File kind                              | Count |
| ---------------------------- | -------------------------------------- | ----: |
| Long Form Training Videos    | long-form `.mp4`                       |     7 |
| Cutdown Clip Library         | clip `.mp4`                            |    91 |
| Thumbnails                   | clip `.jpg`                            |    91 |
| Captions                     | clip `.srt`                            |    91 |
| Markdown Notes               | clip `.md` (91) + long-form notes (7)  |    98 |
| Manifests                    | planning manifests `.csv/.json/.md`    |     9 |
| **Total file objects**       |                                        | **387** |

> "98 videos" = 91 clips + 7 long-form. The 387 figure is the **total file objects**
> to upload (videos + every supporting asset + manifests). Source counts confirmed
> in `build_summary.json`: 91 clips rendered, 91 captions, 91 thumbnails, 91 markdown
> pages, and 7 matched long-form recordings (each with an mp4 + a Gemini `.md`).

---

## Source → Drive mapping (where each folder's files come from)

| Drive folder              | Source folder (read-only)                                                              |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Long Form Training Videos | `…/LO Development/Training Long Form Videos & Time Stamp Gemini Reports/*.mp4`         |
| Cutdown Clip Library      | `…/LO Development Platform Cutdown Library/videos/<category>__<slug>__<source-key>.mp4`|
| Thumbnails                | `…/LO Development Platform Cutdown Library/thumbnails/…__….jpg`                         |
| Captions                  | `…/LO Development Platform Cutdown Library/captions/…__….srt`                           |
| Markdown Notes            | `…/markdown/…__….md` + long-form `…- Recording.md` Gemini reports                       |
| Manifests                 | `…/LO Development Platform Cutdown Library/manifests/*`                                  |

> The manifest stores absolute `/Users/.../Desktop/...` paths. The generator rewrites
> every path to its **basename** under the staged-relative source folders above — no
> `/Users` absolute paths are emitted. The exhaustive, row-by-row list (all 387
> entries) is in `local-to-drive-mapping.csv`. Regenerate any time with:

```bash
node scripts/drive-upload/build-drive-manifest.mjs
```

---

## The 7 long-form recordings (from build_summary.json)

| id              | source_key          | recording file                                                                  |
| --------------- | ------------------- | ------------------------------------------------------------------------------- |
| lo-longform-01  | 1003-mistakes       | LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4 |
| lo-longform-02  | lo-kickoff          | LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.mp4                            |
| lo-longform-03  | compensation-fees   | LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4  |
| lo-longform-04  | leads-marketing     | LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.mp4    |
| lo-longform-05  | loans-onboarding    | LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.mp4 |
| lo-longform-06  | loans-qa            | Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4           |
| lo-longform-07  | pricing-qa          | Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.mp4         |

Each recording also has a matching Gemini `.md` report (same basename, `.md`) that
goes to **Markdown Notes** as `lo-longform-0N-notes`.

---

## Hard constraints baked into this plan

- **Restricted, never public.** Root and all subfolders restricted. No "anyone with
  the link", no public sharing, no domain-wide sharing. Sharing applied manually
  later per `share-permission-plan.md`.
- **No YouTube, no n8n, no email** as part of Drive staging. This plan only organizes
  Drive folders.
- **Source is read-only.** Nothing in the two source folders is moved, renamed, or
  deleted. Drive receives copies.
- **Account first.** Upload only after the connected account is verified as the Loan
  Factory account (currently it is `jeremy@mcdonald-mtg.com` — must be fixed first).
- **Long-form media are large.** The 7 recordings dominate the documented ~7.7 GB
  payload. (Re-measure against the mounted media before upload — see runbook.)
