# HeyGen Workflow (Avatar Fallback Path)

HeyGen is the realistic avatar path until a local lip-sync stack exists. This doc
records what HeyGen can and cannot do for podcast video, verified against the
HeyGen v2 API schema (via the Zapier MCP HeyGen actions, 2026-06-12) and the
existing `scripts/sync-heygen-videos.mjs` integration.

## Capability checklist (the questions, answered)

| Can HeyGen…? | Answer |
|---|---|
| create video from an **existing avatar** | **Yes** — `video_inputs[].character = { type: "avatar", avatar_id }` (custom avatars included). Talking-photo characters also work: `{ type: "talking_photo", talking_photo_id }`. |
| use a **voice clone** | **Yes** — `voice = { type: "text", voice_id }` where `voice_id` is a cloned voice on the account. |
| use **uploaded audio** | **Yes** — `voice = { type: "audio", audio_asset_id }` (or `audio_url`). Upload first via `POST https://upload.heygen.com/v1/asset` (MP3/WAV). This is the key feature for podcast audio. |
| use **script text** | **Yes** — `voice = { type: "text", input_text, voice_id }`. Auto-captions only work in this mode. |
| do a **true multi-speaker podcast video** | **No, not natively.** A video accepts up to **10 scenes**, but scenes play **sequentially** — one avatar on screen at a time. There is no split-screen/multi-avatar canvas in the generate API. |
| **batch generation** | Yes in practice — submit many `/v2/video/generate` jobs and poll `/v1/video_status.get`. Watch plan rate/credit limits. `test: true` renders watermarked previews without credits. |

**Conclusion:** generate **separate avatar clips per speaker turn** with uploaded
audio, then assemble the split-screen/roundtable locally with ffmpeg. That is what
`render-avatar-video-heygen.mjs` + `assemble-roundtable-video.mjs` do.

## Exact API fields used

```jsonc
// POST https://upload.heygen.com/v1/asset   (raw bytes, Content-Type: audio/mpeg)
// → { data: { id: "<audio_asset_id>" } }

// POST https://api.heygen.com/v2/video/generate
{
  "test": false,                       // true = watermark, no credits
  "title": "ep001 turn_004 jeremy",
  "dimension": { "width": 1280, "height": 720 },
  "video_inputs": [                    // 1 scene per request in our pipeline
    {
      "character": { "type": "avatar", "avatar_id": "<heygenAvatarId>", "avatar_style": "normal" },
      "voice":     { "type": "audio", "audio_asset_id": "<audio_asset_id>" },
      "background":{ "type": "color", "value": "#0B1220" }
    }
  ]
}
// → { data: { video_id } }

// GET https://api.heygen.com/v1/video_status.get?video_id=…
// → status: pending|processing|completed|failed, video_url (signed, expires in days)
```

Why one scene per request instead of 10-scene batches: each turn must map 1:1 to a
downloadable clip so the assembler can place it in the correct panel. 10-scene videos
come back as a single concatenated MP4.

## Running it

```bash
# 1. verify key + discover avatar/voice IDs
node scripts/podcast/render-avatar-video-heygen.mjs check
#    → paste IDs into podcast/avatar_sources/avatars.json (heygenAvatarId / heygenVoiceId)

# 2. submit jobs (use --test for a watermarked dry run)
node scripts/podcast/render-avatar-video-heygen.mjs generate <slug> --test

# 3. poll + download clips (repeat until all downloaded)
node scripts/podcast/render-avatar-video-heygen.mjs status <slug>

# 4. assemble the podcast layout locally
node scripts/podcast/assemble-roundtable-video.mjs <slug>
```

Job state lives in `podcast/processed/<slug>/heygen_jobs.json`, so polling is resumable.

## Cost control

- A 17-minute 2-host episode ≈ 30–40 turns ≈ 30–40 short clips; total avatar minutes
  ≈ episode length. Check plan credits before batch runs.
- Use `--test` first. Always.
- Consider rendering only the **first 2–3 minutes** as avatar video and switching to
  the waveform style for the rest (hybrid), if credits are a concern.

## Zapier MCP path (no API key on the machine)

The Claude session's Zapier MCP already has HeyGen connected. Equivalent actions:
- `heygen_upload_an_asset` → audio asset
- `heygen_create_an_avatar_video_scene` → scene config (confirms the `voice_type:
  audio` + `audio_asset_id` fields)
- `heygen_create_an_avatar_video_generate` → submit (max 10 scenes)
- `heygen_retrieve_a_video_status` → poll, get `video_url`

Useful for one-off renders driven from a Claude session; the script path is better
for batch work.

## Existing account facts (from this repo)

- Working custom avatars exist for **Jeremy, Edward, Thuan, Andre** (intro embeds in
  `src/data/heygenIntroVideos.ts`) and daily/weekly videos reference **John and
  Craig** too — all six coaches have presence in the HeyGen account.
- `scripts/sync-heygen-videos.mjs` already lists/fetches videos via the `heygen` CLI;
  the podcast scripts are consistent with that account but use the REST API + key.
