# n8n YouTube Upload Automation Scaffold

This is a draft-only workflow plan for the 91 cutdown clips.
It is intentionally not activated.

## Purpose

- Upload cutdown clips gradually.
- Run once daily at 8:00 AM America/New_York.
- Limit the daily batch size to avoid limits.
- Skip clips that already have a real YouTube ID.
- Keep privacy unlisted.
- Keep subscriber notifications disabled.
- Attach thumbnails when available.
- Use captions when available.
- Use markdown notes when available.
- Update the queue manifest after each successful upload.

## Safety rules

- Never make a clip public.
- Never enable subscriber notifications.
- Never activate the workflow without Jeremy’s approval.
- Never call YouTube APIs from this scaffold until approval is explicit.

## Recommended draft nodes

- Cron Trigger
- Read Queue File
- Filter Pending Clips
- Split In Batches
- Build Metadata Payload
- Upload Video
- Upload Thumbnail
- Upload Caption
- Write Back Queue Status
- Generate Report

## Local draft files

- `youtube-upload-queue.json`
- `youtube-metadata-template.md`
- `activation-checklist.md`
- `n8n-youtube-upload-workflow.draft.json`

## Operational note

Use the local queue as the source of truth. The draft only becomes real after
Jeremy approves the batch process and the authenticated account is confirmed.
