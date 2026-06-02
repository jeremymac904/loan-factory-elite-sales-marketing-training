# Google Drive Video Staging Runbook

This runbook covers the local planning stage for the LO Development video library.
It does not upload anything and it does not contact Google.

## Target folder tree

- `Loan Factory LO Development Platform Videos`
- `Long Form Training Videos`
- `Cutdown Clip Library`
- `Thumbnails`
- `Captions`
- `Markdown Notes`
- `Manifests`

## Permission target

- Anyone with a Loan Factory Google account can view.
- Do not make the folder public to the open internet.
- Do not use a personal Gmail account.

## Local artifacts

- `google-drive-upload-manifest.json`
- `local-to-drive-video-mapping.csv`
- `youtube-upload-queue.json`

## Staging rules

- Do not invent Google Drive file IDs or URLs.
- Leave drive IDs and drive URLs blank until a real upload exists.
- Keep YouTube privacy unlisted.
- Keep subscriber notifications disabled.
- Keep manual review status visible.
- Keep PII review status visible.

## Next step when Drive upload is approved

1. Confirm the authenticated account is an approved Loan Factory Google account.
2. Confirm the target folder tree exists.
3. Upload long-form source videos first only if Jeremy approves that step.
4. Upload cutdown clips in limited batches.
5. Populate the manifest with real Drive IDs and URLs only after upload succeeds.

