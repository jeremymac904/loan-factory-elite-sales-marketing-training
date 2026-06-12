# Local Avatar / Lip-Sync Workflow (Black Frame AI & open-source tools)

**Preference order:** local lip-sync first (free, private, unlimited), HeyGen as
fallback when local is unavailable or quality is poor.

## Audit result (2026-06-12)

No local video-generation or lip-sync tooling was found:

- **Black Frame AI**: no folder, binary, server, or reference anywhere in the repo or
  container. If it exists on Jeremy's machine, point `BLACKFRAME_LOCAL_URL` at it.
- **SadTalker / Wav2Lip / MuseTalk / LivePortrait**: no checkouts found.
- **FAL / Kling / Runway / Replicate**: no keys set, no SDKs installed.
- **ffmpeg**: available (installable everywhere) — assembly always works.

So today, `render-avatar-video-local.mjs <slug>` fails with instructions and the
realistic path is HeyGen. The script auto-detects tools, so the moment one is
installed, local rendering starts working with no code changes.

Run the probe anytime:

```bash
node scripts/podcast/render-avatar-video-local.mjs check
```

## Black Frame AI integration contract

If Black Frame AI exposes (or can be wrapped in) a local HTTP server, the pipeline
expects this minimal contract:

```
GET  {BLACKFRAME_LOCAL_URL}/health           → 200 OK
POST {BLACKFRAME_LOCAL_URL}/lipsync          multipart/form-data:
       source_image (PNG/JPG)  – or –  source_video (MP4)
       audio (MP3)
     → 200, body = MP4 bytes of the talking-head clip
```

Set `BLACKFRAME_LOCAL_URL=http://127.0.0.1:PORT` in `.env.local`. If Black Frame's
real API differs, adapt the `blackframe` branch in
`scripts/podcast/render-avatar-video-local.mjs` (one fetch call).

## Open-source alternatives (rough guide)

| Tool | Input | Quality | Speed (GPU) | Notes |
|---|---|---|---|---|
| SadTalker | 1 photo + audio | good head motion | ~1–2× realtime | best photo→talking-head; needs CUDA for sane speed |
| Wav2Lip | video + audio | accurate lips, static head | fast | best when you have a base video of each coach |
| MuseTalk | video + audio | high quality | realtime on good GPU | newer, heavier setup |
| LivePortrait | photo/video driving | expressive | fast | animation, not audio-driven lip-sync by itself |

Recommended local stack if you want to try it: **SadTalker** for photo-only coaches,
**Wav2Lip** when a 30–60 s idle video of each coach exists (record once, reuse
forever). A consumer GPU (RTX 3060+) is effectively required; CPU-only rendering of a
17-minute episode is impractical (many hours).

Install sketch (SadTalker):

```bash
git clone https://github.com/OpenTalker/SadTalker ~/SadTalker
cd ~/SadTalker && pip install -r requirements.txt && bash scripts/download_models.sh
# then: export SADTALKER_DIR=~/SadTalker   (or keep the default ~/SadTalker)
```

## Avatar source material

Local tools need a source face per coach. Drop into `podcast/avatar_sources/<id>/`:

- a clean, well-lit, **front-facing head-and-shoulders photo** (PNG/JPG), and/or
- a 30–60 s **idle/listening video** (MP4) — needed for Wav2Lip/MuseTalk, and also
  improves the dimmed "listening" panels in the assembler.

The folders exist for: `jeremy`, `edward`, `john`, `craig`, `thuan`, `andre` — all
currently empty. A good source: download each coach's HeyGen intro video and extract
a still (`ffmpeg -i intro.mp4 -ss 2 -vframes 1 podcast/avatar_sources/jeremy/jeremy.png`).

## Flow once a tool exists

```bash
node scripts/podcast/render-avatar-video-local.mjs check          # confirm tool + sources
node scripts/podcast/render-avatar-video-local.mjs <slug>         # per-turn clips
node scripts/podcast/assemble-roundtable-video.mjs <slug>         # final video
```

Quality bar: if local clips show lip drift, warped mouths, or dead eyes at 1080p
playback, switch that episode to HeyGen (`render-avatar-video-heygen.mjs`) — the
assembler doesn't care where clips came from.
