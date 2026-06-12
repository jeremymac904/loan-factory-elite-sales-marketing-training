# Podcast → Video Automation System

Turns Open Notebook / NotebookLM podcast MP3s into multi-avatar video podcasts for the
LO Development coaching platform, community feed, daily emails, YouTube, and the
training library.

**Status:** local-first proof of concept. Nothing here is deployed; nothing publishes
automatically yet.

## The pipeline

```
Open Notebook / NotebookLM            (creates podcast MP3 + optionally a transcript)
        │
        ▼  drop MP3 into podcast/inbox/
1. scan-podcast-folder.mjs            what's in the inbox, what state is each episode in
2. create-podcast-manifest.mjs        one manifest JSON per episode (title, lane, speakers…)
3. transcribe-podcast.mjs             faster-whisper transcript + speaker turns
4. create-video-plan.mjs              avatars assigned, layout chosen, turns → render spec
        │
        ├─ 5a. render-avatar-video-local.mjs    Black Frame AI / SadTalker / Wav2Lip clips
        ├─ 5b. render-avatar-video-heygen.mjs   HeyGen clips from UPLOADED AUDIO per turn
        └─ 5c. render-waveform-fallback.mjs     branded waveform video (always works)
        │
        ▼  (5a/5b only)
6. assemble-roundtable-video.mjs      ffmpeg split-screen / roundtable / grid + intro/outro
        │
        ▼
podcast/video_outputs/<slug>__<layout>.mp4   → publish step (see DAILY_AUTOMATION_PLAN.md)
```

## Quick start — first test

```bash
# 0. one-time: make sure tools exist
ffmpeg -version                  # brew install ffmpeg / apt-get install -y ffmpeg
pip install faster-whisper       # local transcription (models cache on first run)

# 1. drop an episode in the inbox
cp ~/Downloads/my_episode.mp3 podcast/inbox/

# 2. run the pipeline
node scripts/podcast/scan-podcast-folder.mjs
node scripts/podcast/create-podcast-manifest.mjs podcast/inbox/my_episode.mp3 \
  --title "My Episode" --topic-lane sales-marketing --speakers 2
node scripts/podcast/transcribe-podcast.mjs my_episode
node scripts/podcast/create-video-plan.mjs my_episode

# 3a. guaranteed render (ffmpeg only):
node scripts/podcast/render-waveform-fallback.mjs my_episode

# 3b. avatar render via HeyGen (needs HEYGEN_API_KEY + avatar IDs filled in):
node scripts/podcast/render-avatar-video-heygen.mjs check
node scripts/podcast/render-avatar-video-heygen.mjs generate my_episode
node scripts/podcast/render-avatar-video-heygen.mjs status my_episode   # repeat until downloaded
node scripts/podcast/assemble-roundtable-video.mjs my_episode
```

Every script fails loudly with exact instructions when a tool or key is missing.

## Folder map

| Path | Purpose |
|---|---|
| `podcast/inbox/` | Drop new MP3/M4A/WAV episodes here |
| `podcast/processed/<slug>/` | Per-turn audio segments, HeyGen job state, assembly temp |
| `podcast/transcripts/` | `<slug>.json` (segments+turns), `.md` (readable), `.srt` (subtitles) |
| `podcast/manifests/` | `<slug>.json` episode manifest + `<slug>.videoplan.json` render plan |
| `podcast/video_outputs/` | Final MP4s and per-turn avatar clips (`<slug>/clips/`) |
| `podcast/avatar_sources/` | `avatars.json` config + per-coach source images/videos for local lip-sync |
| `podcast/workflows/` | Pipeline notes and the POC run log |
| `podcast/docs/` | These docs |

Media files (MP3/MP4) are **never committed** — see `podcast/.gitignore`. That matches
the existing repo rule in `docs/OPEN_NOTEBOOK_AUDIO_COMPANION_HANDOFF.md`.

## Manifest fields

Each `podcast/manifests/<slug>.json` tracks: `id`, `title`, `topicLane`, `language`,
`sourceNotebook`, `episodeNumber`, `filePath`, `durationSeconds`, `status`,
`transcriptPath`, `speakerCount`, `assignedAvatars`, `videoPlanPath`,
`videoOutputPath`, `platformDestinations`, `createdAt`, `updatedAt`.

Status flow: `new → transcribed (or transcribed_placeholder) → planned →
heygen_rendering / clips_rendered_* → rendered (or rendered_waveform) → published`.

## Video styles

See `VIDEO_STYLE_GUIDE.md`. Auto-selected from speaker count: 1 → `single`,
2 → `split_2`, 3 → `roundtable_3`, 4 → `grid_4`; `waveform` always available.

## Speaker detection

True diarization is not bundled. `transcribe-podcast.mjs` uses the documented
fallback: speaker changes on pause gaps (`--gap`, default 0.6 s), alternating
Speaker A/B (or A–D). For NotebookLM-style two-host podcasts this is usually close.

**Upgrading speaker detection:** install `pyannote.audio` (needs a Hugging Face token
and the `pyannote/speaker-diarization-3.1` gated model), run diarization, and merge
its speaker labels into `podcast/transcripts/<slug>.json` — the rest of the pipeline
only reads the `turns` array, so nothing else changes.

## Where things stand (2026-06-12 environment audit)

- ✓ ffmpeg works (required, installable everywhere)
- ✓ faster-whisper installs; model download needs internet to huggingface.co
  (blocked in the Claude remote container — works on a normal machine)
- ✗ No local lip-sync tool found (Black Frame AI, SadTalker, Wav2Lip, MuseTalk) —
  HeyGen is the realistic avatar path today
- ✓ HeyGen confirmed to support per-scene **uploaded audio** with an existing avatar
  (`voice.type="audio"`), which is exactly what this pipeline needs
- ✗ No HEYGEN_API_KEY in the repo or environment yet — see `API_KEYS_NEEDED.md`
