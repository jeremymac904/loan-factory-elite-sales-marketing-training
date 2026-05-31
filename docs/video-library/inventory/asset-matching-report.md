# Asset Matching Report

> Per-asset verification that each manifest-referenced video / thumbnail / caption / markdown file actually exists on disk.
>
> Generated 2026-05-31 by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via `node docs/video-library/inventory/_generate-inventory.js`.

## Summary vs handoff_validation_summary.json

handoff_validation_summary.json reports all_91_mp4_exist=true, all_91_markdown_exist=true, all_91_thumbnails_exist=true, all_91_srt_exist=true, source_mp4s_modified=false, youtube_upload_happened=false, n8n_trigger_happened=false. Independently verified below against the actual file listing.

| Asset | Manifest rows | Files on disk | Manifest refs missing on disk | Disk files not referenced | Verdict |
|---|---:|---:|---:|---:|:---:|
| video (.mp4) | 91 | 91 | 0 | 0 | MATCH |
| thumbnail (.jpg) | 91 | 91 | 0 | 0 | MATCH |
| caption (.srt) | 91 | 91 | 0 | 0 | MATCH |
| markdown (.md) | 91 | 91 | 0 | 0 | MATCH |

**Overall: 91 / 91 / 91 / 91 CONFIRMED — every clip has a real video, thumbnail, caption, and markdown file on disk, with no orphan files. handoff_validation_summary.json is accurate.**


## Caption quality note (from manifest)

Every clip's `caption_status` is "approximate summary captions generated; no word-level transcript available in markdown report" — the .srt files are summary-level, not verbatim. Flag for editorial if word-level captions are required before publish.

## Path-rewrite note for downstream agents

Manifest `video_path` / `thumbnail_path` / `caption_path` / `markdown_path` are absolute `/Users/jeremymcdonald/Desktop/...` paths from the original authoring machine. Any agent copying assets into `public/` must rewrite them to the basename (`<category>__<topic>__<source>.<ext>`), never ship the absolute path.
