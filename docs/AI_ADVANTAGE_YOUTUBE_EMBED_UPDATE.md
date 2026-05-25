# AI Advantage YouTube Embed Update

**Date:** 2026-05-25
**Status:** 23 videos embedded, 40 pending

The AI Advantage video library now uses the 23 verified unlisted YouTube
micro-lessons confirmed as uploaded and embeddable. The platform embeds only
these supplied YouTube URLs. No MP4 files were committed, no new uploads were
triggered, and no additional video URLs were invented.

## Uploaded Videos (23)

| rowId | Title | YouTube ID |
| --- | --- | --- |
| AIADV-001 | AI Training Overview, Content Research and Automation | `c8zULkTrwGU` |
| AIADV-002 | AI Data Security for Loan Officers | `ozTujCSxaqE` |
| AIADV-003 | AI Powered Loan Status Updates | `5BPKlTxCJPU` |
| AIADV-004 | Automating your Daily Market Updates | `ti-AwZl14vk` |
| AIADV-005 | Dominating your Local Market with AI | `dynRVCanBGA` |
| AIADV-006 | Drafting Client Emails in Gmail | `GBfe2N9Du64` |
| AIADV-007 | Finalizing your Gemini Gem Setup | `Saz-qFxCu1Y` |
| AIADV-008 | Gemini Gems vs Generic AI | `3LzjDAMkk04` |
| AIADV-009 | Improving AI Tone with Bio Docs | `L_FBdXpkYG0` |
| AIADV-010 | Multi Language Content Strategy | `uBSDv9RVgaQ` |
| AIADV-011 | Rapid Content Creation with AI Twin | `q3aN611Kv3w` |
| AIADV-012 | Starting the AI Twin Setup | `zNwOFHZ2XbM` |
| AIADV-013 | Training Your AI on Your Persona | `92ziHhq7vzQ` |
| AIADV-014 | Why Every Loan Officer Needs an AI Twin | `BS9JBfg5XIw` |
| AIADV-015 | Creating Video Content with HeyGen AI Clones | `AC-jBgffnHc` |
| AIADV-016 | Overview Marketing with NotebookLM and AI Twins | `Jou4jrGFKsg` |
| AIADV-017 | Upcoming Updates to Loan Factory's MOS Platform | `wN3AIyOLFEU` |
| AIADV-018 | 3 Essential AI Apps for Loan Officers | `t5YVs8Ry7jU` |
| AIADV-019 | Advanced AI App Building / Vibe Coding | `hBFNvV8hueE` |
| AIADV-020 | Automating Social Media with Loan Factory Ally | `S6qXWfcryMI` |
| AIADV-021 | Creating an AI Twin for Multilingual Marketing | `A2XyhL3S7vQ` |
| AIADV-052 | How to Build your Public Loan Officer AI Twin | `kH9VDBwwuh0` |
| AIADV-056 | Automate your Social Posts with Gemini AI | `AFPffFdcmQo` |

## Newly Added in this Batch (8)

- AIADV-011 Rapid Content Creation with AI Twin
- AIADV-013 Training Your AI on Your Persona
- AIADV-014 Why Every Loan Officer Needs an AI Twin
- AIADV-017 Upcoming Updates to Loan Factory's MOS Platform
- AIADV-018 3 Essential AI Apps for Loan Officers
- AIADV-019 Advanced AI App Building / Vibe Coding
- AIADV-020 Automating Social Media with Loan Factory Ally
- AIADV-021 Creating an AI Twin for Multilingual Marketing

## Pending Videos (40)

`AIADV-022` through `AIADV-051`, `AIADV-053`, `AIADV-054`, `AIADV-055`,
`AIADV-057` through `AIADV-063`.

Not yet uploaded due to YouTube daily rate limits. They are not marked as
published and are not shown as user-facing video cards. They will be embedded
once a future upload session returns real YouTube IDs.

## Routes

- `/ai-training/`
- `/ai-training/video-library/`
- `/ai-training/video-library/[slug]/` (one page per uploaded video)
- AI Advantage path pages show matching published lessons via `pathSlug`.

## Notes

- All embedded videos are unlisted, not public.
- No MP4 files were committed to the repo.
- No Google Drive links are exposed in user-facing pages.
- Pending videos are hidden from the user-facing UI.
- Next batch: provide YouTube IDs from the next upload session and they will be
  added to `src/data/aiAdvantagePublishedVideos.ts` using the same `AIADV-XXX` /
  `aiadv-xxx` slug pattern.

## Media Policy

- GitHub stores data, docs, and code only.
- Video playback uses unlisted YouTube embeds.
- No MP4 files belong in the app repo.
- No private Google Drive links are exposed in the AI Advantage user interface.

## Safety Notes

AI Advantage videos are training material only. AI output remains draft-only and
requires human review before external use. Do not paste borrower PII into AI
tools. Do not make rate, APR, fee, approval, underwriting, or compliance
approval claims.
