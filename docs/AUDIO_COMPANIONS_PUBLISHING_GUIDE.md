# Audio Companions Publishing Guide

This guide explains what has to be true before any 101-601 or bonus audio companion
can move from "Audio version under review" to a real, playable, in-platform
audio player.

## Current state (2026-05-26)

- 14 audio companions are tracked in `docs/notebooklm-audio-companions/audio-companions.json`.
- 8 are at status `prompt-ready`.
- 6 are at status `downloaded`.
- 0 are at status `published`.
- Every public lesson page therefore renders the "Audio version under review"
  placeholder state. No Drive download URLs are exposed in the client bundle
  because the client-side `AudioCompanion` type strips `driveFileId` unless
  `status === "published"` (see `src/data/audioCompanions.ts`).

## What must land before a companion is marked `published`

A companion is only publishable when ALL of the following are true. If any
single item is missing, leave the status as `downloaded` or `needs-drive-upload`
so the placeholder card stays in place.

1. **Final approved MP3** exists on Google Drive in the correct folder.
2. **Drive file is set to "Anyone with the link can view"** (required for the
   in-platform `<audio>` element to stream it without auth).
3. **Drive file ID** is captured into `audio-companions.json`
   (`driveFileId: "<id>"`). The download URL is built as
   `https://drive.google.com/uc?export=download&id=<id>`. Do not paste raw
   Drive share URLs.
4. **Duration** is recorded (`duration: "MM:SS"`).
5. **Compliance review of the script and audio is complete** against the
   `complianceFloor` rules at the top of `audio-companions.json`:
   - Loan Factory branding only
   - LO or loan officer, never ELO
   - TERA, never MOSO
   - No rate, APR, fee, payment, approval, underwriting, or
     compliance-decision claims
   - No claim that Loan Factory has a public API
   - No "free processing" / "lowest rate" / "guaranteed approval" /
     "daily companywide training"
6. **Title and notes** in `audio-companions.json` match the approved language
   that should appear on the public card. Internal review notes stay out of
   the public `notes` field.

Once all six items are true, change `status` to `"published"`. The card on
`/audio-training/`, `/training-library/`, and the matching lesson route
(for example `/101-foundation/`) will switch from the placeholder to a real
audio player on the next deploy.

## What never goes in the client-shipped data

The client-facing `AudioCompanion` type in `src/data/audioCompanions.ts`
intentionally drops these fields before the JSON is exported to the UI:

- `sourceNotebookUrl`
- `sourceNotebookTitle`
- `customPromptFile`
- `audioFileName`
- `localAudioPath` (any `/Volumes/...` path)
- `driveTargetFolder`
- `notebooklmTaskId`
- `notebooklmArtifactTitle`
- `audioByteSize`
- `downloadedAt`, `submittedAt`
- `generateOptions`

Those fields stay in `docs/notebooklm-audio-companions/audio-companions.json`
for production tracking only.

## Removing a companion

If a companion needs to be pulled from the site (audio retracted, lesson
re-scoped, etc.), do one of the following:

- Set `status` to `prompt-ready` or `downloaded` to send it back to the
  "Audio version under review" state, OR
- Remove the entry from `audio-companions.json` if the companion is being
  retired permanently.

Never publish an entry whose `driveFileId` is `null`. The client-side guard in
`getDriveAudioUrl` will refuse to build a URL in that case, so the card will
silently fall back to the placeholder, but the cleaner fix is to keep the
`status` accurate.
