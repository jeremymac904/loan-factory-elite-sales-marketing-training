# LO Development Video Content Map

## Source Truth
- Long-form source videos confirmed: **7**
- Support research notes: **1**
- Cutdown clips: **91**
- Manual-review clips: **56**
- Skipped clips: **0**

## What Is In Scope
- Seven long-form source recordings from the Gemini timestamp reports.
- One support research document that is **not** a video source.
- Ninety-one rendered cutdown clips, all currently held from YouTube publication.

## Source Rules
- Use the JSON manifests as the primary inventory source for clips.
- Use the long-form markdown reports as the human source of truth for the seven recordings.
- Do **not** invent Google Drive URLs for clip-level assets; they are not present in the source bundle.
- Keep every clip on `youtube_hold` until Lead approves any later hosting change.
- The long-form reports are the only source files that contain Drive fallback links.

## Platform Placement
- `LO Development Resources`: the seven long-form source recordings plus the support research note.
- `Training Library`: the 91 cutdown clips surfaced by category and route.
- `LO Development Resources` is the source-truth section; clip placement remains in the section maps below.

## Manual Review Logic
- Clips flagged in the manifest keep `manual_review_flag: true`.
- Those clips are treated as **manual review needed**, **possible screen share sensitivity**, **do not publish externally until approved**, and **internal Loan Factory viewing only until cleared**.
- Manual review does **not** block internal staging.
- Manual review **does** block public publishing.
- The global logs also state that no automated OCR or PII detection was performed.

## Builder Handoff
- Long-form recordings should display as source trainings with the report markdown, Drive fallback link, and source-only language.
- Clips should display `youtube_hold` as the status, `unlisted` as the suggested privacy, and `Google Drive fallback pending` when no clip URL exists.
- The content model needs these fields for every record: title, source file name, report file, route, platform section, module, summary, audience, key topics, watch time, source status, YouTube recommendation/status, manual review flag, PII review flag, platform status, tags, related resources, next action, and review warning.
- Captions and markdown notes should remain visible as companion files even while YouTube is pending.
- The long-form reports already contain the source Drive links; clips do not.

## Validation Sources
- `master_clip_manifest.json`
- `platform_clip_routing_handoff.json`
- `build_summary.json`
- `category_index.json`
- `platform_resource_index.md`
- `logs/manual_review_needed.md`
- `logs/validation_results.md`
- `logs/skipped_clips.md`

## Builder Notes
- Keep `Thuan` as the spelling used in product copy.
- Do not introduce Apex Advisor.
- Do not treat Elite as a paid coaching tier.
- Keep Sales and Marketing 101 through 601 free internal training.
- Keep AI Advantage separate from paid coaching.

