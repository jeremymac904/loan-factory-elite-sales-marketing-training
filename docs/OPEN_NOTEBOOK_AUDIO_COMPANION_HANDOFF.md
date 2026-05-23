# Open Notebook Audio Companion Handoff

Open Notebook is the preferred local generation engine for future LO Development audio companion drafts. NotebookLM can still be used as a manual fallback, but new work should start in Open Notebook when possible because it gives Jeremy a private, source-grounded workflow that can feed multiple destinations.

Open Notebook is not part of the LO Development frontend. It is a local content automation tool that prepares summaries, scripts, speaker lines, and metadata for review before anything is published.

## What Open Notebook Replaces

The old manual step was:

1. Generate NotebookLM MP3s.
2. Review each audio file.
3. Upload approved MP3s to Google Drive.
4. Update `docs/notebooklm-audio-companions/audio-companions.json`.
5. Rebuild and deploy the site.

The new preferred flow is:

1. Ingest approved training source material into Open Notebook.
2. Generate a source-grounded audio companion summary and script.
3. Review the script before audio generation.
4. Generate audio through an approved voice path.
5. Review the audio.
6. Upload approved MP3 or M4A files to Google Drive.
7. Update `docs/notebooklm-audio-companions/audio-companions.json`.
8. Rebuild and deploy the site.

## GitHub Rule

GitHub should hold only metadata, docs, code, and small examples. Do not commit MP3, M4A, WAV, MP4, MOV, or other media files.

Approved audio files should live in Google Drive. The website renders a player only after the metadata includes:

- `status: "published"`
- `driveFileId`
- `audioFileName`
- `duration`

## Handoff Fields

Open Notebook outputs should include these fields before a platform update:

```json
{
  "id": "101-foundation-audio-companion",
  "title": "101 Foundation - The Loan Factory Operating System",
  "sourceModule": "Elite Sales & Marketing 101-601",
  "sourceLesson": "101 Foundation",
  "platformSection": "Sales & Marketing",
  "summary": "Plain-English summary for review.",
  "speakers": ["Jeremy McDonald"],
  "scriptPath": "outputs/scripts/101-foundation-audio-companion.md",
  "audioStatus": "review-needed",
  "driveFileId": null,
  "audioFileName": null,
  "duration": null,
  "sourceNotebook": {
    "tool": "Open Notebook",
    "workspace": "lo-development-sales-marketing"
  },
  "sourceDocs": [],
  "youtubeUrl": null,
  "notes": "Review script before audio generation."
}
```

## Metadata Mapping

| Open Notebook field | Platform metadata field |
| --- | --- |
| `id` | `id` |
| `title` | `title` |
| `sourceLesson` | `session` |
| `audioStatus` | `status` |
| `driveFileId` | `driveFileId` |
| `audioFileName` | `audioFileName` |
| `duration` | `duration` |
| `notes` | `notes` |

## Safety Rules

- No borrower PII in sources, scripts, audio, or metadata.
- No credentials in notebooks or handoff files.
- No public publishing by default.
- No paid model or voice generation unless approved.
- No TERA writes.
- No email sends.
- No cross-project source mixing.
- Final platform publishing requires human review.
