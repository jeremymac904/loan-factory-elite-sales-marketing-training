# Daily Video Embed Replacement Workflow

This workflow runs locally at 8:00 AM and should remain draft-only until the
lead approves the automation path.

## Goal

- Read the latest YouTube upload status.
- Find clips that now have a real YouTube ID.
- Update the platform video data source.
- Replace Google Drive fallback links with YouTube embeds.
- Run lint, typecheck, and build.
- Generate a local report.
- Create a local commit only after the review step.
- Do not push unless approved.

## Local scripts

- `scripts/check-youtube-embed-status.js`
- `scripts/update-video-hosting-status.js`
- `scripts/replace-drive-with-youtube.mjs`
- `video-hosting-status-report.md`

## Safety rules

- Never invent YouTube IDs.
- Never invent Google Drive URLs.
- Never activate n8n from this workflow.
- Never send emails or external notifications.
- Never weaken auth or RLS.

## Suggested sequence

1. Check the queue and manifest files.
2. Verify which clips now have a real YouTube ID.
3. Update the local manifest snapshot.
4. Replace Drive fallback links with YouTube embeds in the library data.
5. Run `npm run lint`.
6. Run `npm run typecheck`.
7. Run `npm run build`.
8. Generate `video-hosting-status-report.md`.
9. Review locally and decide whether to commit.
