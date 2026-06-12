# Daily Automation Plan

How this becomes a hands-off daily/weekly content machine. The POC covers stages 1–6;
stage 7 (publishing) is designed but intentionally not built yet.

## Recommended production workflow

```
┌ 1. Open Notebook ──────────────────────────────────────────────┐
│ Jeremy generates podcast audio (+ speaker script if possible)  │
│ from approved training sources.                                │
└────────────────────────────────────────────────────────────────┘
┌ 2. Drop ───────────────────────────────────────────────────────┐
│ MP3 → podcast/inbox/                                           │
└────────────────────────────────────────────────────────────────┘
┌ 3. Claude Code / cron ─────────────────────────────────────────┐
│ scan-podcast-folder → create-podcast-manifest →                │
│ transcribe-podcast → create-video-plan                         │
└────────────────────────────────────────────────────────────────┘
┌ 4. Render ─────────────────────────────────────────────────────┐
│ local lip-sync if available → HeyGen otherwise →               │
│ waveform fallback if both fail (episode NEVER ships late)      │
└────────────────────────────────────────────────────────────────┘
┌ 5. Assemble ───────────────────────────────────────────────────┐
│ assemble-roundtable-video → final MP4 + intro/outro/branding   │
└────────────────────────────────────────────────────────────────┘
┌ 6. Review gate (HUMAN) ────────────────────────────────────────┐
│ Jeremy watches the MP4. Compliance checklist from              │
│ OPEN_NOTEBOOK_WORKFLOW.md. Approve → stage 7.                  │
└────────────────────────────────────────────────────────────────┘
┌ 7. Publish (phase 2 — not built) ──────────────────────────────┐
│ publish-podcast-video.mjs reads manifest.platformDestinations: │
│  • community_feed   → Supabase insert (seed-coaching-posts     │
│    pattern; needs SUPABASE_URL + SERVICE_ROLE_KEY)             │
│  • podcast_library  → upload video to Drive/YouTube, update    │
│    audio-companions.json / library data files                  │
│  • daily_email      → copy MP4 + title/summary into the daily  │
│    email asset folder                                          │
│  • youtube_queue    → move into an upload-queue folder with    │
│    title/description/tags JSON sidecar (or wire the Zapier     │
│    MCP youtube_upload_video action)                            │
│ Then: manifest.status = "published".                           │
└────────────────────────────────────────────────────────────────┘
```

## One-command runner (suggested next step)

A thin `run-podcast-pipeline.mjs` that executes stages 3–5 for every `new` inbox
file and stops at the review gate. Cron/launchd daily:

```
0 6 * * *  cd ~/loan-factory-elite-sales-marketing-training && node scripts/podcast/run-podcast-pipeline.mjs
```

Until that exists, the same thing manually:

```bash
node scripts/podcast/create-podcast-manifest.mjs --all
for slug in $(node scripts/podcast/scan-podcast-folder.mjs --json | jq -r '.episodes[].slug'); do
  node scripts/podcast/transcribe-podcast.mjs "$slug" &&
  node scripts/podcast/create-video-plan.mjs "$slug" &&
  node scripts/podcast/render-waveform-fallback.mjs "$slug"
done
```

## Weekly cadence proposal

| Day | Output | Style |
|---|---|---|
| Mon–Fri | daily coach video (existing HeyGen flow) | `single` |
| Tue | podcast episode (Open Notebook) | `split_2` Jeremy+Edward |
| Thu | mastermind / panel episode | `roundtable_3` or `grid_4` |
| Sat | weekend recap audio → waveform video | `waveform` |

## Failure policy

1. Local lip-sync fails → HeyGen.
2. HeyGen fails / out of credits → waveform fallback (publishes on time, looks branded).
3. Transcription fails → `--placeholder` keeps the waveform path alive; avatar paths
   are HARD-BLOCKED on placeholder/empty/heuristic-only transcripts (guard in both
   renderers), and HeyGen generate additionally requires confirming a dry-run cost
   summary — cron can never silently spend credits.
4. Every script exits non-zero with exact fix instructions — safe to wire into cron
   with simple alerting on exit code.

## Housekeeping

- After successful render, move the source MP3 from `inbox/` to `processed/<slug>/`
  (manual for now; the runner should do it).
- Media stays out of git (`podcast/.gitignore`); long-term storage is Drive/YouTube,
  consistent with `docs/DRIVE_ASSET_HOSTING.md`.
