# Open Notebook → Podcast Pipeline Handoff

How podcast audio gets from Open Notebook (or NotebookLM) into this pipeline.

## Audit result (2026-06-12)

Open Notebook is **not inside this repo** — it is a separate local tool on Jeremy's
machine. What the repo does contain:

- `docs/OPEN_NOTEBOOK_AUDIO_COMPANION_HANDOFF.md` — Open Notebook is the preferred
  private generation engine; NotebookLM is the manual fallback.
- `docs/OPEN_NOTEBOOK_TO_AUDIO_COMPANIONS.md` — existing audio-companion flow and the
  "no media files in git" rule.
- `docs/notebooklm-audio-companions/` — prompts, status, and `audio-companions.json`.
- 8 published NotebookLM episodes in `public/audio/*.m4a` (two-host podcast style) and
  pending transcripts in `docs/audio-transcripts/`.

## Handoff contract

Open Notebook's job ends when it produces, per episode:

1. **Audio file** — MP3 preferred (M4A/WAV also accepted) → drop into `podcast/inbox/`.
   Filename becomes the slug: lowercase, underscores, descriptive
   (e.g. `realtor_trust_through_closing_certainty.mp3`).
2. **Optional: speaker-line script/transcript** — if Open Notebook generated the
   dialogue script, keep it; it is *better* than Whisper + heuristics because speaker
   attribution is exact.

Then in this repo:

```bash
node scripts/podcast/create-podcast-manifest.mjs podcast/inbox/<file>.mp3 \
  --title "…" --topic-lane sales-marketing \
  --source-notebook "open-notebook:lo-development-sales-marketing" \
  --speakers 2
node scripts/podcast/transcribe-podcast.mjs <slug>
```

## Using Open Notebook's own script instead of Whisper (recommended when available)

If Open Notebook produced the speaker-line script, skip Whisper entirely: convert the
script into `podcast/transcripts/<slug>.json` with this shape and set
`transcriptPath` + `status: "transcribed"` in the manifest:

```jsonc
{
  "episodeId": "<slug>",
  "method": "open-notebook-script",
  "speakerCount": 2,
  "speakers": ["Speaker A", "Speaker B"],
  "turns": [
    { "start": 0.0,  "end": 14.2, "speaker": "Speaker A", "text": "…" },
    { "start": 14.2, "end": 31.0, "speaker": "Speaker B", "text": "…" }
  ],
  "segments": [ /* same objects, finer-grained if available */ ]
}
```

Timestamps don't need to be perfect — `create-video-plan.mjs` only needs turn
boundaries good enough to cut audio segments. If the script has no timestamps, run
`transcribe-podcast.mjs` for timing and keep the script's speaker labels by matching
text (manual or future helper).

## Topic lanes

Use the platform's existing lanes for `--topic-lane` so downstream publishing can
route correctly: `sales-marketing`, `lo-mastery`, `alliance`, `ai-advantage`,
`facegram`, `resources`, `general`.

## Mapping to coaches

Two-host Open Notebook/NotebookLM audio defaults to **Jeremy + Edward**
(`defaults.podcastPair` in `podcast/avatar_sources/avatars.json`). Override per
episode: `--avatars thuan,andre` on `create-podcast-manifest.mjs` or
`create-video-plan.mjs`.

## Compliance reminder (from the existing audio-companion docs)

Review scripts/audio before publishing: no borrower PII; no rate/APR/fee/approval
claims; one clear practical lesson per episode. The same checklist in
`docs/OPEN_NOTEBOOK_TO_AUDIO_COMPANIONS.md` applies to video versions.
