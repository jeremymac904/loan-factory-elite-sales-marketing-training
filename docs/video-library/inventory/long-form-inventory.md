# Long-Form Source Inventory

> The 7 training recordings (real .mp4 masters) + their transcript/notes markdown, with verified on-disk state and clip yield.
>
> Generated 2026-05-31 by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via `node docs/video-library/inventory/_generate-inventory.js`.

Long-form ids follow the shared contract `lo-longform-01`..`lo-longform-07`, derived from build_summary `source_files_matched` order. The manifest's `source_key` field is the join from each clip back to its recording.

## Recordings

| long-form id | source_key | recording file (.mp4) | .mp4 on disk | size | transcript (.md) | .md on disk | clips cut |
|---|---|---|:---:|---:|---|:---:|---:|
| lo-longform-01 | 1003-mistakes | LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4 | yes | 793.4 MiB | LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.md | yes | 10 |
| lo-longform-02 | lo-kickoff | LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.mp4 | yes | 763.6 MiB | LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.md | yes | 14 |
| lo-longform-03 | compensation-fees | LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4 | yes | 723.8 MiB | LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.md | yes | 13 |
| lo-longform-04 | leads-marketing | LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.mp4 | yes | 929.4 MiB | LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.md | yes | 17 |
| lo-longform-05 | loans-onboarding | LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.mp4 | yes | 586.4 MiB | LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.md | yes | 12 |
| lo-longform-06 | loans-qa | Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4 | yes | 783.2 MiB | Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.md | yes | 14 |
| lo-longform-07 | pricing-qa | Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.mp4 | yes | 699.8 MiB | Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.md | yes | 11 |

Total clips cut across the 7 recordings: **91** (matches 91). Recording masters present: **7/7**. Paired transcripts present: **7/7**.

## On-disk reality vs. build_summary

- build_summary.json `source_files_matched_count` = 7; `source_files_found_count` = 15; `total_clips_rendered` = 91.
- All 7 matched recordings exist on disk as real `.mp4` masters (586.4 MiB-929.4 MiB each, 5.16 GiB total). No placeholders, no missing masters.
- Each recording has a paired transcript `.md` of the same base name. One supplementary markdown is not tied to a recording: `LO Support Research Analysis.md`.
- The long-form folder does NOT use a "Gemini Report NN" naming scheme; the `.md` files are recording-name transcripts/notes. The `.video-source/manifests/` staged copies do not include long-form transcripts; use this source folder.

## Long-form .md files present on disk

- `LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.md` (7.8 KiB)
- `LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.md` (7.3 KiB)
- `LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.md` (6.8 KiB)
- `LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.md` (7.5 KiB)
- `LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.md` (6.9 KiB)
- `LO Support Research Analysis.md` (39.0 KiB)
- `Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.md` (8.4 KiB)
- `Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.md` (6.1 KiB)
