# Asset Upload Checklist

Before uploading any media asset to the Loan Factory Elite Sales and Marketing Training Series Drive folder, walk this checklist.

## Per asset

1. The asset has a clear, web safe filename. No spaces. Use snake_case or kebab-case.
2. The asset is placed in the correct numbered folder inside the Drive folder.
3. Sharing is set correctly. Default during the initial migration is `anyone with the link can edit`. After upload is done, the recommended state is `anyone with the link can view`.
4. The asset is not borrower private. Borrower documents and PII never go in this folder.
5. The asset is internal training approved. Do not upload draft borrower facing artifacts until compliance review is done.
6. If the asset is compliance sensitive (a script, a payment number, a rate, a guarantee claim), it is flagged with a compliance note in the matching row in `src/data/driveAssets.ts`.
7. The site data file has been updated. See `docs/DRIVE_ASSET_HOSTING.md` for the exact fields.
8. The site loads cleanly with the Drive link before the local fallback in `public/` is removed.

## After upload

1. Confirm playback or rendering on Mac and on an iPhone.
2. Confirm download from the Drive link.
3. Remove the local fallback in a separate, clearly named commit if the asset is large.
4. Update `assetStatus` to `drive hosted` in `src/data/driveAssets.ts` and `src/data/audioTraining.ts` where applicable.

## Sensitive content

1. Do not upload borrower facing artifacts that have not been reviewed.
2. Do not upload competitor materials.
3. Do not upload financial models containing names, dollar amounts, or APR figures unless leadership approves.

## Permission tightening

After the initial migration:

1. Change general access from `edit` to `view` or `comment`.
2. Give edit access only to Jeremy, approved LO Development users, marketing reviewers, and assigned build collaborators.

Do not change Drive permissions unless Jeremy explicitly asks.
