# AI Advantage Transcript Audit Index

## Scope
This local QA audit verifies the 15 approved AI Advantage YouTube embeds against the YouTube handoff files and downloaded transcript captions. It does not upload videos, publish videos, call paid APIs, trigger n8n, or modify YouTube.

## Source Files
- Handoff JSON: `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/YouTubeVideoFiles/youtube-embed-handoff-for-codex.json`
- Handoff CSV: `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/YouTubeVideoFiles/youtube-embed-handoff-for-codex.csv`
- Handoff notes: `/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/YouTubeVideoFiles/CODEX_YOUTUBE_EMBED_UPDATE_HANDOFF.md`
- App metadata checked: `src/data/aiAdvantagePublishedVideos.ts`

## Tool Results
- yt-dlp: found and used for captions
- ffmpeg: found, but not needed because captions existed for every video
- Local Whisper tools: not found; not needed because no audio fallback was required
- Captions downloaded: 15 of 15
- Local audio downloads: 0
- Local transcriptions generated: 0

## Audit Result
- Videos audited: 15
- Placement OK: 13
- Minor copy/risk mismatch: 2
- Needs fix: 0
- Wrong placement: 0
- Placement changes required: 0
- Copy fixes applied: 1 (`AIA-052`)

## Video Review Table
| Row ID | Handoff Title | Current Site Section | Recommended Section | Mismatch | Transcript | Review |
|---|---|---|---|---|---|---|
| TEST-001 | AI Advantage: AI Training Overview, Content Research and Automation | Foundations | Foundations | OK | [Transcript](transcripts/TEST-001.md) | [Review](transcript-reviews/TEST-001-review.md) |
| AIA-002 | AI Advantage: AI Data Security for Loan Officers | Foundations | Foundations | MINOR | [Transcript](transcripts/AIA-002.md) | [Review](transcript-reviews/AIA-002-review.md) |
| AIA-003 | AI Advantage: AI Powered Loan Status Updates | Client Communication | Client Communication | OK | [Transcript](transcripts/AIA-003.md) | [Review](transcript-reviews/AIA-003-review.md) |
| AIA-004 | AI Advantage: Automating your Daily Market Updates | Marketing & Content | Marketing & Content | OK | [Transcript](transcripts/AIA-004.md) | [Review](transcript-reviews/AIA-004-review.md) |
| AIA-005 | AI Advantage: Dominating your Local Market with AI | Marketing & Content | Google Business Profile / Local SEO under Marketing & Content | OK | [Transcript](transcripts/AIA-005.md) | [Review](transcript-reviews/AIA-005-review.md) |
| AIA-006 | AI Advantage: Drafting Client Emails in Gmail | Client Communication | Client Communication | OK | [Transcript](transcripts/AIA-006.md) | [Review](transcript-reviews/AIA-006-review.md) |
| AIA-007 | AI Advantage: Finalizing your Gemini Gem Setup | AI Twin Setup | AI Twin Setup | OK | [Transcript](transcripts/AIA-007.md) | [Review](transcript-reviews/AIA-007-review.md) |
| AIA-008 | AI Advantage: Gemini Gems vs Generic AI | AI Twin Setup | AI Twin Setup | OK | [Transcript](transcripts/AIA-008.md) | [Review](transcript-reviews/AIA-008-review.md) |
| AIA-009 | AI Advantage: Improving AI Tone with Bio Docs | AI Twin Setup | AI Twin Setup | OK | [Transcript](transcripts/AIA-009.md) | [Review](transcript-reviews/AIA-009-review.md) |
| AIA-010 | AI Advantage: Multi Language Content Strategy | Marketing & Content | Marketing & Content | OK | [Transcript](transcripts/AIA-010.md) | [Review](transcript-reviews/AIA-010-review.md) |
| AIA-012 | AI Advantage: Starting the AI Twin Setup | AI Twin Setup | AI Twin Setup | OK | [Transcript](transcripts/AIA-012.md) | [Review](transcript-reviews/AIA-012-review.md) |
| AIA-015 | AI Advantage: Creating Video Content with HeyGen AI Clones | Content Creation | Content Creation | OK | [Transcript](transcripts/AIA-015.md) | [Review](transcript-reviews/AIA-015-review.md) |
| AIA-016 | AI Advantage: Overview Marketing with NotebookLM and AI Twins | Marketing & Content | NotebookLM / Open Notebook under Marketing & Content | OK | [Transcript](transcripts/AIA-016.md) | [Review](transcript-reviews/AIA-016-review.md) |
| AIA-052 | AI Advantage: How to Build your Public Loan Officer AI Twin | AI Twin Setup | AI Twin Setup | MINOR | [Transcript](transcripts/AIA-052.md) | [Review](transcript-reviews/AIA-052-review.md) |
| AIA-056 | AI Advantage: Automate your Social Posts with Gemini AI | Marketing & Content | Marketing & Content | OK | [Transcript](transcripts/AIA-056.md) | [Review](transcript-reviews/AIA-056-review.md) |

## Notes
The remaining 48 queued clips were not audited here because they are not part of the approved uploaded YouTube set and should remain hidden from normal users until upload and review are complete.
