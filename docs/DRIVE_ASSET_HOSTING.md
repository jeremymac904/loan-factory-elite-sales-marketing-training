# Drive Asset Hosting

The static site is code first. Large media should never become part of the GitHub repo for long. This document describes where each asset type belongs, the recommended Drive folder layout, and how to migrate today's local audio to Drive when ready.

## Folder

Loan Factory Elite Sales and Marketing Training Series asset folder:

https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD?usp=sharing

The folder URL is the source of truth and is also stored in `src/lib/externalLinks.ts` as `driveAssetFolder` and in `src/data/driveAssets.ts` as `driveFolderUrl`.

## What belongs where

### GitHub

1. Source code in TypeScript and TSX.
2. Tailwind config, Next.js config, ESLint config.
3. Typed data files under `src/data/`.
4. Markdown docs under `docs/`.
5. Small images and SVG logos under `public/images/` (kilobytes, not megabytes).
6. Markdown handouts under `public/downloads/` until a Drive equivalent is in place.

### Google Drive

1. MP4 videos.
2. M4A audio files.
3. PDF handouts.
4. PowerPoint files.
5. Google Docs ready files and Google Slides decks.
6. Large screenshots and screen recordings.
7. Final downloads intended for borrower facing distribution after compliance review.

## Recommended Drive folder structure

Create these folders inside the linked Drive folder. The numbers keep them sorted in the right order.

1. `01 Course Videos`
2. `02 Audio Training`
3. `03 PDF Handouts`
4. `04 Slide Decks`
5. `05 Screenshots and Walkthroughs`
6. `06 Logos and Brand Assets`
7. `07 NotebookLM Outputs`
8. `08 HeyGen Avatar Videos`
9. `09 Source Research`
10. `10 Archive`

This same structure is encoded in `src/data/driveAssets.ts` as `driveFolderStructure` so future tooling can reference it.

## How to add a new asset

1. Save the file with a clean snake_case or kebab-case filename. No spaces.
2. Open the Drive folder linked above.
3. Drop the file into the matching numbered folder.
4. Right click the file. Choose `Share`. Set link sharing to `Anyone with the link` (or to the internal group if Jeremy has tightened access).
5. Copy the share link.
6. Add an entry to `src/data/driveAssets.ts` with `driveUrl` set to the copy.
7. If the asset is audio used in the Audio Training Library, also update the matching entry in `src/data/audioTraining.ts` and set:
   - `driveUrl` to the Drive link.
   - `downloadUrl` if you have a direct download URL.
   - `hostedLocation` to `drive`.
   - `assetStatus` to `drive hosted`.
8. Test the site locally. Once confirmed, the local fallback under `public/audio/` can be removed in a follow up commit.

## How to copy the right share link

Use the standard Drive share dialog. Do not paste the `?usp=drivesdk` link. Use the `Copy link` button after sharing is enabled.

## How to update the site data files

The two files to edit:

1. `src/data/driveAssets.ts` is the master registry. Every Drive hosted asset should have a row.
2. `src/data/audioTraining.ts` references audio assets. Add `driveUrl` and set `hostedLocation` and `assetStatus`. Keep `filePath` until the local file is removed.

## Warning

Large media files in GitHub bloat the repo, slow down `git clone`, and trigger GitHub's 100 MB per file hard limit fast. Treat GitHub as the code and content registry. Treat Drive as the asset store.

## Security and access

The folder is currently shared `anyone with the link can edit` to make the initial upload easy.

After the initial upload is done, recommend tightening to:

1. General access set to `view` or `comment`.
2. Edit access for Jeremy, approved LO Development users, marketing reviewers, and assigned build collaborators.

Do not change Drive permissions unless Jeremy explicitly approves.
