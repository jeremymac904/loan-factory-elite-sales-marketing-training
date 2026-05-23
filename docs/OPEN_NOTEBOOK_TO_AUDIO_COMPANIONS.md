# Open Notebook to Audio Companions

This document explains how Open Notebook connects to the existing LO Development audio companion website support.

## Current Website Support

The website already reads audio companion metadata from:

`docs/notebooklm-audio-companions/audio-companions.json`

The React data helper is:

`src/data/audioCompanions.ts`

The reusable card is:

`src/components/audio/AudioCompanionCard.tsx`

The card shows an empty state while audio is not published. It shows a Drive-backed audio player only when the companion is marked `published` and has a Drive file ID.

## Preferred Generation Engine

Open Notebook should be used as the preferred local/private engine for:

- training summaries
- audio companion scripts
- podcast speaker-line scripts
- timestamp breakdowns
- micro-lesson drafts
- YouTube metadata
- platform handoff JSON

NotebookLM remains an optional manual fallback if Jeremy wants to use it for a specific source or comparison.

## Production Flow

1. Select an existing audio companion ID from `audio-companions.json`.
2. Add approved source docs or transcripts to the local Open Notebook workspace.
3. Generate a summary and audio companion script.
4. Review the script for clarity, usefulness, and safety.
5. Generate audio only after approval.
6. Review the final audio file.
7. Upload the approved MP3 or M4A to Google Drive.
8. Update `audio-companions.json` with:
   - `status: "published"`
   - `driveFileId`
   - `audioFileName`
   - `duration`
9. Run validation and deploy the site.

## Status Values

- `prompt-ready`: Prompt or script plan exists, but audio is not ready.
- `generated`: Audio was generated locally and needs review.
- `downloaded`: Audio file exists locally and needs Drive upload.
- `needs-drive-upload`: Approved audio is ready for Drive.
- `published`: Drive file is ready and the website can show the player.

## Audio Storage Rule

Do not commit audio files to GitHub.

Store approved audio in Google Drive under the LO Development audio training folder. Keep GitHub limited to metadata, docs, code, prompts, and examples.

## Review Checklist

- The audio teaches one clear practical lesson.
- The copy is simple enough for non-technical loan officers.
- The content helps with conversations, follow-up, realtor relationships, marketing, AI use, coaching, or support.
- There is no borrower PII.
- There are no rate, APR, fee, payment, approval, underwriting, or compliance-decision claims.
- The file has been reviewed before `status` becomes `published`.
