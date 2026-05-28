# AI Training Video Source Map (Internal Only)

This document holds the internal production metadata for the long-form AI
Advantage recordings whose highlights are surfaced on
`/ai-training/recordings/[id]/`. Anything in this file is intentionally **not**
shipped to the client bundle — it lives here, and only here.

The client-safe shape (title, date, duration, speaker, topic, recommendedUse,
category, tags, segments, bestClipsToCutFirst, suggestedMicroLessonTitles)
stays in [`src/data/aiTrainingVideos.ts`](../src/data/aiTrainingVideos.ts).

If you add a new recording, add the public summary to
`src/data/aiTrainingVideos.ts` and add the production metadata here. Do not put
absolute `/Volumes/...` paths, raw source MP4 filenames, NotebookLM/Gemini
export filenames, editing-queue statuses, Drive review statuses, or per-clip
editor output filenames into the TypeScript file.

## Top-level production index

| Recording id | Editing-queue status | Drive review status |
|---|---|---|
| `ai-marketplace-2026-02-11` | Ready for Editing Queue | Requires media review |
| `ai-training-2026-03-03` | Selective Clips Only | Requires media review |
| `ai-training-2026-03-17` | Ready for Editing Queue | Requires media review |
| `ai-training-2026-03-31` | Ready for Editing Queue | Requires media review |
| `ai-training-2026-04-14` | Ready for Editing Queue | Requires media review |
| `ai-training-2026-04-28` | Ready for Editing Queue | Requires media review |
| `ai-training-2026-05-12` | Source Markdown Ready | Requires media review; duplicate local MP4 copies need review |

## Source MP4 + markdown map

| Recording id | Source MP4 filename | Source markdown filename | Source MP4 local path | Source markdown local path |
|---|---|---|---|---|
| `ai-marketplace-2026-02-11` | `AI in the Marketplace - 2026_02_11 13_27 PST - Recording.mp4` | `Gemini Export May 22, 2026 at 2_53_43 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI in the Marketplace - 2026_02_11 13_27 PST - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_53_43 PM UTC-4.md` |
| `ai-training-2026-03-03` | `AI Training - 2026_03_03 13_48 PST - Recording.mp4` | `Gemini Export May 22, 2026 at 2_53_06 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_03 13_48 PST - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_53_06 PM UTC-4.md` |
| `ai-training-2026-03-17` | `AI Training - 2026_03_17 14_45 PDT - Recording.mp4` | `Gemini Export May 22, 2026 at 2_52_42 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_17 14_45 PDT - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_52_42 PM UTC-4.md` |
| `ai-training-2026-03-31` | `AI Training - 2026_03_31 14_52 PDT - Recording.mp4` | `Gemini Export May 22, 2026 at 2_52_12 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_31 14_52 PDT - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_52_12 PM UTC-4.md` |
| `ai-training-2026-04-14` | `AI Training - 2026_04_14 14_43 PDT - Recording.mp4` | `Gemini Export May 22, 2026 at 2_51_16 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_04_14 14_43 PDT - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_51_16 PM UTC-4.md` |
| `ai-training-2026-04-28` | `AI Training - 2026_04_28 14_51 PDT - Recording.mp4` | `Gemini Export May 22, 2026 at 2_48_49 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_04_28 14_51 PDT - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_48_49 PM UTC-4.md` |
| `ai-training-2026-05-12` | `AI Training - 2026_05_12 14_50 PDT - Recording.mp4` | `Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_05_12 14_50 PDT - Recording.mp4` | `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md` |

## Suggested editor output filenames

These are the `.mp4` filenames an editor should produce when slicing each
recording into standalone clips. They are kept here so the TypeScript data
doesn't ship raw filenames to the client bundle.

### ai-marketplace-2026-02-11

- `ai-twin-concept-intro.mp4`
- `gemini-gems-vs-generic-ai.mp4`
- `starting-ai-twin-setup.mp4`
- `training-ai-persona-setup.mp4`
- `finalizing-gem-setup.mp4`
- `social-media-content-demo.mp4`
- `translate-content-cuban-spanish.mp4`
- `fine-tuning-ai-tone.mp4`
- `ai-data-security-compliance.mp4`
- `local-market-ai-training.mp4`
- `gmail-gemini-integration.mp4`
- `morning-content-automation-prompt.mp4`
- `portal-context-aware-updates.mp4`

### ai-training-2026-03-03

- `notebooklm-ai-twin-training-overview.mp4`
- `heygen-ai-video-cloning-demo.mp4`

### ai-training-2026-03-17

- `google-ai-studio-setup-intro.mp4`
- `ai-apps-overview-for-lo.mp4`
- `refi-comparison-tool-demo.mp4`
- `ai-studio-suggestions-iteration.mp4`
- `lo-workflow-ai-strategy.mp4`
- `advanced-vibe-coding-prompts.mp4`
- `ai-studio-pdf-analysis-skills.mp4`
- `loan-factory-ally-tutorial.mp4`
- `facebook-strategy-personal-vs-business.mp4`
- `heygen-ai-twin-spanish-marketing.mp4`

### ai-training-2026-03-31

- `intro-enterprise-ai-security.mp4`
- `notebooklm-pipeline-vault-setup.mp4`
- `notebooklm-audio-overview-demo.mp4`
- `gemini-pipeline-email-automation.mp4`
- `ai-twin-social-media-content.mp4`
- `ai-video-b-roll-generation.mp4`
- `local-seo-geo-marketing-strategy.mp4`
- `gemini-canvas-knowledge-base.mp4`

### ai-training-2026-04-14

- `ai-training-overview-objectives.mp4`
- `gemini-30-day-content-calendar-prompt.mp4`
- `export-gemini-content-for-notebooklm.mp4`
- `notebooklm-setup-market-research.mp4`
- `gmail-automation-lender-guides-drive.mp4`
- `gmail-automation-extract-action-items.mp4`
- `schedule-daily-ai-social-content.mp4`
- `ai-content-review-and-guardrails.mp4`
- `daily-market-rate-update-automation.mp4`
- `find-workspace-studio-gmail.mp4`
- `top-3-ai-apps-for-loan-officers.mp4`
- `importance-of-local-market-focus.mp4`
- `heygen-ai-video-avatar-recommendation.mp4`

### ai-training-2026-04-28

- `loan-factory-training-location-intro.mp4`
- `custom-gpt-marketing-suite-overview.mp4`
- `social-link-placement-guardrail.mp4`
- `build-loan-officer-ai-twin-step-by-step.mp4`
- `chatgpt-vs-gemini-for-mortgage-business.mp4`
- `personalize-gemini-gem-voice-setup.mp4`
- `gemini-gmail-inbox-organization.mp4`
- `notebooklm-mortgage-pipeline-organization.mp4`
- `gemini-google-sheets-pipeline-tracker.mp4`

### ai-training-2026-05-12

- `google-business-profile-seo-intro.mp4`
- `marketing-compliance-promotional-claims-guardrails.mp4`
- `google-business-profile-setup-walkthrough.mp4`
- `multi-state-license-google-strategy.mp4`
- `gemini-google-business-profile-content-draft.mp4`
- `google-review-growth-strategy.mp4`
- `model-match-realtor-data-export.mp4`
- `realtor-newsletter-marketing-workflow.mp4`

## Clips to avoid or merge

### ai-marketplace-2026-02-11

- `05:30 - 06:10` — Briefly off-topic regarding email login issues; can be trimmed for a smoother setup flow.
- `12:20 - 12:55` — Dead air while Jeremy looks for files.
- `19:20 - 20:30` — Repetitive mention of recording and handouts; merge with earlier setup or cut.
- `1:07:30 - 1:08:15` — Discussion about Quantum Computing; too off-topic for a practical micro-lesson.

### ai-training-2026-03-03

- `01:15 - 05:25` — AI ethics / global impact discussion; off-topic for LO training.
- `05:26 - 07:31` — China economy / EV / US tariff discussion; not relevant.
- `07:32 - 09:32` — Stale internal platform discussion; do not use as a standalone clip.
- `00:00 - 01:15` — General banter and dead air before participants join.

### ai-training-2026-03-17

- `03:21 - 06:40` — Setup delay waiting for builds.
- `21:16 - 27:53` — Websocket connection troubleshooting due to internet issues.
- `34:41 - 52:45` — Helping a specific user log in; not generally instructive.

### ai-training-2026-03-31

- `00:00 - 02:23` — Intro filler, dropped chat links.
- `20:25 - 23:50` — Q&A with technical troubleshooting (muted mic); avoid as a standalone clip.
- `30:10 - 32:00` — Website coding discussion the speaker admits is "not beginner friendly"; too complex.

### ai-training-2026-04-14

- `10:00 - 11:20` — AI image generation attempt with a header fails; can be skipped or used as a "blooper".
- `14:10 - 15:00` — Internet speed and recording method discussion; cut.

### ai-training-2026-04-28

- `05:30 - 06:15` — Setup delay while pulling up the video walkthrough.
- `11:45 - 12:40` — Repeated explanation of the internal trainer; merge with the demo at 12:41.
- `48:15 - 49:44` — Long pause waiting for Google Sheets to generate; edit down for time.

### ai-training-2026-05-12

- `12:00 - 13:00` — Brief dead air / transition while switching videos; cut.
- `15:13 - 25:31` — Q&A on specific individual setup issues; too fragmented for a standalone micro-lesson.
- `50:00 - 54:00` — Debate about NJ-specific profile display issues; too localized.
- `01:12:00 - end` — General Q&A covering personal real estate flipping, Wi-Fi issues, and career advice; merge or omit.

## Source folder inventory

### MP4 files

- `AI Training - 2026_03_03 13_48 PST - Recording.mp4`
- `AI Training - 2026_03_17 14_45 PDT - Recording.mp4`
- `AI Training - 2026_03_31 14_52 PDT - Recording.mp4`
- `AI Training - 2026_04_14 14_43 PDT - Recording.mp4`
- `AI Training - 2026_04_28 14_51 PDT - Recording.mp4`
- `AI Training - 2026_05_12 14_50 PDT - Recording (1).mp4`
- `AI Training - 2026_05_12 14_50 PDT - Recording (2).mp4`
- `AI Training - 2026_05_12 14_50 PDT - Recording.mp4`
- `AI in the Marketplace - 2026_02_11 13_27 PST - Recording.mp4`

### Markdown files

- `Gemini Export May 22, 2026 at 2_48_49 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_50_48 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_51_16 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_52_12 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_52_42 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_53_06 PM UTC-4.md`
- `Gemini Export May 22, 2026 at 2_53_43 PM UTC-4.md`

## Duplicates

- Duplicate markdown skipped: `Gemini Export May 22, 2026 at 2_50_48 PM UTC-4.md` -> canonical `Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md`
- Duplicate May 12 MP4 copies found locally: `AI Training - 2026_05_12 14_50 PDT - Recording (1).mp4`, `AI Training - 2026_05_12 14_50 PDT - Recording (2).mp4`, `AI Training - 2026_05_12 14_50 PDT - Recording.mp4`

## Add a new recording (checklist)

1. Add the public-facing record to `src/data/aiTrainingVideos.ts` using only
   the client-safe fields defined in the `AiTrainingVideo` type.
2. Add a row to "Top-level production index" and "Source MP4 + markdown map"
   above with the editing-queue status, Drive review status, source MP4
   filename, source markdown filename, and `/Volumes/...` paths.
3. Add the suggested editor output filenames per kept segment to the
   matching section below.
4. If the recording has duplicate MP4 or markdown copies, list them in
   "Duplicates" so the editor knows which is canonical.
5. Confirm `grep -rn "/Volumes/" src/` returns nothing before committing.
