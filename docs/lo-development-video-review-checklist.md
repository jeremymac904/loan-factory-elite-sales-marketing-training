# LO Development Video Review Checklist

## Before Builder Uses the Map
- [ ] Confirm the seven long-form source recordings are the only video sources in the long-form folder.
- [ ] Confirm `LO Support Research Analysis.md` is treated as research, not a video.
- [ ] Confirm all 91 clips remain on `youtube_hold`.
- [ ] Confirm no clip-level Google Drive URLs were invented.
- [ ] Confirm manual-review clips stay internal-only until approved.
- [ ] Confirm the source labels use `Thuan`, not `Tuan`.
- [ ] Confirm `Apex Advisor` does not appear in the map or UI copy.
- [ ] Confirm `Elite` is not used as a paid coaching tier.
- [ ] Confirm Sales and Marketing 101 through 601 stays free internal training.
- [ ] Confirm AI Advantage remains separate from paid coaching.

## Long-Form Review
- [ ] Check the report markdown matches the MP4 file name for each source recording.
- [ ] Verify the report Drive link is present for the seven source trainings.
- [ ] Verify the support research note is surfaced as internal research only.
- [ ] Verify long-form summaries are sourced from the recap section, not from generic placeholder copy.

## Clip Review
- [ ] Verify each clip record includes clip ID, title, file name, source recording, source markdown, start time, end time, duration, category, route, tags, audience, and priority.
- [ ] Verify manual-review clips are marked `possible screen share sensitivity`.
- [ ] Verify `PII review flag` is required for manual-review clips.
- [ ] Verify `platform status` is internal / approved for Loan Factory users only.
- [ ] Verify captions and markdown notes remain visible even while YouTube is pending.
- [ ] Verify the platform uses the section map instead of raw manifest order.

## Validation Evidence
- - All rendered clips passed file, duration, audio, thumbnail, markdown, caption, category, and manifest path checks.
- - None

## What To Hand To Builder
- The JSON export in `docs/lo-development-video-training-metadata.json` is the canonical machine-readable inventory.
- The category map in `docs/lo-development-video-category-map.json` is the routing and section lookup.
- The markdown files are the human handoff and should be used for review comments.

