# API Keys & Environment Variables

Audited 2026-06-12. The repo has **no `.env` / `.env.local` files** and the remote
container exposes **none** of the keys below. Scripts read both `process.env` and a
gitignored `.env.local` at the repo root — put keys there.

## Required for the avatar video path

| Variable | Needed by | Status | How to get it |
|---|---|---|---|
| `HEYGEN_API_KEY` | `render-avatar-video-heygen.mjs` | **MISSING** | HeyGen → Settings → Subscriptions & API. Note: `scripts/sync-heygen-videos.mjs` uses the authenticated `heygen` CLI instead — same account, but the podcast scripts call the REST API directly. |

Also required (not env vars): `heygenAvatarId` and `heygenVoiceId` per coach in
`podcast/avatar_sources/avatars.json`. Run `render-avatar-video-heygen.mjs check`
once the key is set — it lists account avatars and suggests matches.

## Required only for specific options

| Variable | Needed by | Status | Notes |
|---|---|---|---|
| `BLACKFRAME_LOCAL_URL` | `render-avatar-video-local.mjs` | MISSING | Base URL of a local Black Frame AI lip-sync server, if/when it exists. No Black Frame tooling was found in this repo or container. |
| `SADTALKER_DIR` / `WAV2LIP_DIR` / `MUSETALK_DIR` / `LIVEPORTRAIT_DIR` | `render-avatar-video-local.mjs` | MISSING | Paths to local checkouts; auto-probed at `~/SadTalker` etc. |
| `FAL_KEY` | future hosted lip-sync option | MISSING | Only if we choose FAL-hosted SadTalker/lip-sync instead of HeyGen. Not wired up yet. |
| `REPLICATE_API_TOKEN` | future hosted lip-sync option | MISSING | Same as above, Replicate flavor. Not wired up yet. |
| `ELEVENLABS_API_KEY` | not used | MISSING | Not needed: podcast audio already contains the voices. Only relevant if we later re-voice scripts instead of using Open Notebook audio. |
| `OPENAI_API_KEY` | not used | MISSING | Not needed: transcription is local faster-whisper. Optional alternative if we ever switch to the hosted Whisper API. |

## Publishing step (not built yet — phase 2)

| Variable | Needed by | Status | Notes |
|---|---|---|---|
| `SUPABASE_URL` | future publish script | MISSING from env | The app itself uses `NEXT_PUBLIC_SUPABASE_URL`; project ref `ajitnzvbplyjrlzwzmwe` is in `.mcp.json`, so the URL is `https://ajitnzvbplyjrlzwzmwe.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | future publish script | MISSING | Required to insert community-feed posts server-side (see `scripts/seed-coaching-posts.mjs` pattern). Supabase dashboard → Project Settings → API. |

## What does NOT need a key

- Transcription (`faster-whisper`) — local, free; first run downloads model weights
  from huggingface.co (~150 MB for `base`).
- Waveform fallback rendering — ffmpeg only.
- Final assembly — ffmpeg only.

## Setup

```bash
# repo root, gitignored
cat >> .env.local <<'EOF'
HEYGEN_API_KEY=...
# optional:
# BLACKFRAME_LOCAL_URL=http://127.0.0.1:7860
# SUPABASE_URL=https://ajitnzvbplyjrlzwzmwe.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=...
EOF
```
