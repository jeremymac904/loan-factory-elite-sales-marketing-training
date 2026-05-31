# Duplicate Filename Report

> Duplicate filenames, slugs, ids, and category keys across the cutdown asset directories, the long-form folder, and the manifests.
>
> Generated 2026-05-31 by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via `node docs/video-library/inventory/_generate-inventory.js`.

| Scope | Duplicates found |
|---|---|
| Cutdown videos dir | none |
| Cutdown thumbnails dir | none |
| Cutdown captions dir | none |
| Cutdown markdown dir | none |
| Long-form folder | none |
| Manifest slugs | none |
| Manifest ids | none |
| category_index.json top-level keys (17 total, 17 distinct) | none |

**Result: No duplicate filenames, slugs, ids, or category keys anywhere. Safe to use id/slug as the unique key for routing, Drive uploads, and YouTube draft titles.**

Note: identical filename _stems_ across the four cutdown directories (same `<category>__<topic>__<source>` as .mp4/.jpg/.srt/.md) are intentional 1:1 asset families, not duplicates. Likewise each long-form recording has a paired .mp4 + .md of the same base name.
