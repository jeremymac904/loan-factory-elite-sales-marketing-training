# Proof-of-Concept Run Log — 2026-06-12

Environment: Claude Code remote container (Linux, node 22, python 3.11, ffmpeg 6.1.1).

## Sample episode

No MP3 existed in `podcast/inbox/`, so the POC used a real published NotebookLM
episode from the site: `public/audio/how_to_explain_the_two_thousand_dollar_best_price_guarantee.m4a`
(17 m 23 s, two-host podcast), converted to MP3:

```bash
ffmpeg -i public/audio/how_to_explain_the_two_thousand_dollar_best_price_guarantee.m4a \
  -c:a libmp3lame -q:a 3 podcast/inbox/how_to_explain_the_2000_dollar_best_price_guarantee.mp3
```

## Commands run (all succeeded)

```bash
node scripts/podcast/scan-podcast-folder.mjs
node scripts/podcast/create-podcast-manifest.mjs \
  podcast/inbox/how_to_explain_the_2000_dollar_best_price_guarantee.mp3 \
  --title "How to Explain the $2,000 Best Price Guarantee" \
  --topic-lane sales-marketing --source-notebook "notebooklm:sales-marketing-501" \
  --episode 1 --speakers 2
node scripts/podcast/transcribe-podcast.mjs how_to_explain_the_2000_dollar_best_price_guarantee --placeholder
node scripts/podcast/create-video-plan.mjs how_to_explain_the_2000_dollar_best_price_guarantee
node scripts/podcast/render-waveform-fallback.mjs how_to_explain_the_2000_dollar_best_price_guarantee --max-duration 90
```

`--placeholder` was required because this container cannot reach huggingface.co to
download Whisper weights (network egress allowlist). On a normal machine, drop the
flag for a real transcript: `pip install faster-whisper` is already proven to work.

## Artifacts produced

| Artifact | Path |
|---|---|
| Manifest | `podcast/manifests/how_to_explain_the_2000_dollar_best_price_guarantee.json` |
| Transcript (placeholder, alternating A/B) | `podcast/transcripts/how_to_explain_the_2000_dollar_best_price_guarantee.{json,md,srt}` |
| Video plan (split_2, 35 turns, Jeremy+Edward) | `podcast/manifests/how_to_explain_the_2000_dollar_best_price_guarantee.videoplan.json` |
| Sample branded video (90 s preview) | `podcast/video_outputs/how_to_explain_the_2000_dollar_best_price_guarantee__waveform_90s_preview.mp4` |

## Failure paths verified

- `render-avatar-video-local.mjs check` → correctly reports no Black Frame AI /
  SadTalker / Wav2Lip / MuseTalk / LivePortrait, points to HeyGen.
- `render-avatar-video-heygen.mjs check` → exits 1 with exact HEYGEN_API_KEY setup
  steps and the Zapier MCP alternative.
- `assemble-roundtable-video.mjs <slug>` → exits 1 listing the 35 missing clips and
  the three ways to produce them.

## To re-run on Jeremy's machine

See "Quick start" in `podcast/docs/README.md`. The only differences from this
container: real Whisper transcription works (internet available), and a full-length
render is just the same waveform command without `--max-duration`.
