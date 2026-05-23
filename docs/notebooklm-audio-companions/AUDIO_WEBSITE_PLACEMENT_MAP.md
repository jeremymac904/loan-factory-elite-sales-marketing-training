# Audio Website Placement Map

Where each audio companion should render on the Loan Factory LO Development Platform website.

**Source repo:** `loan-factory-product-starter-kit/apps/loan-factory-elite-sales-marketing-training`
**Audio host:** Google Drive (the website references Drive URLs; large media never lives in GitHub).
**UI pattern:** Each session page gets a single "Audio companion" block. `/audio-training` (or `/training-library`) hosts the full catalog.

---

## Per-session placement

| Audio ID | Primary page | Secondary page(s) |
|---|---|---|
| `101-foundation-audio-companion` | `/101-foundation` | `/audio-training`, `/training-library` |
| `201-borrower-conversion-audio-companion` | `/201-borrower-conversion` | `/audio-training`, `/training-library` |
| `301-referral-partner-growth-audio-companion` | `/301-referral-partner-growth` | `/audio-training`, `/training-library` |
| `401-content-marketing-audio-companion` | `/401-content-and-marketing` | `/audio-training`, `/training-library` |
| `501-pipeline-sales-systems-audio-companion` | `/501-pipeline-and-sales-systems` | `/audio-training`, `/training-library` |
| `601-elite-execution-audio-companion` | `/601-elite-execution` | `/audio-training`, `/training-library` |

## Bonus podcast placement

| Audio ID | Primary page | Secondary page(s) |
|---|---|---|
| `psychological-sales-for-mortgage-los` | `/audio-training` | `/201-borrower-conversion` |
| `high-trust-realtor-relationships` | `/audio-training` | `/301-referral-partner-growth` |
| `ai-advantage-for-loan-officers` | `/audio-training` | `/ai-training` |
| `follow-up-that-does-not-sound-desperate` | `/audio-training` | `/501-pipeline-and-sales-systems` |
| `weekly-sales-operating-system` | `/audio-training` | `/501-pipeline-and-sales-systems`, `/601-elite-execution` |
| `turning-training-into-closings` | `/audio-training` | `/training-library` |
| `social-media-starts-conversations` | `/audio-training` | `/401-content-and-marketing` |
| `objection-handling-not-salesy` | `/audio-training` | `/201-borrower-conversion`, `/601-elite-execution` |

---

## Page component pattern (proposed)

A single shared `AudioCompanionCard` component renders each entry. The component reads from `audio-companions.json` and shows:

- Title + session ID badge (e.g. "201 · Borrower Conversion")
- One-sentence "what you'll get" line (pulled from the prompt's GOAL)
- Audio player (HTML5 `<audio>` with the Drive direct download URL OR a "Listen on Drive" link if direct streaming is blocked)
- Duration chip when known
- "Open transcript" link (when NotebookLM also produces a transcript)
- Compliance footer

The component renders the same way on the session page and on `/audio-training`. The order list on `/audio-training` follows the production-order recommendation in `BONUS_SALES_MARKETING_AUDIO_PROMPTS.md`.

## Drive embed approach

NotebookLM audio downloads land as `.mp3` files. Two patterns work:

**Pattern A (recommended):** Drive "Anyone with the link can view" sharing. Build the streaming URL:
```
https://drive.google.com/uc?export=download&id=<file_id>
```
This serves the MP3 directly. The page uses `<audio controls src="..."></audio>`.

**Pattern B (fallback):** Drive embed iframe:
```
https://drive.google.com/file/d/<file_id>/preview
```
This shows the Drive audio player inside an iframe. Slower but reliable.

`audio-companions.json` records the `driveFileId` per item once available so the website can render either pattern consistently.

## What does NOT live on the website

- Borrower PII or call notes used to produce the audio
- Internal compliance review history
- Anything that references MOSO (the underlying source may still say MOSO; user-facing site says TERA)
- Any rate, APR, fee, payment, approval claim heard in the audio host's loose conversation — **review every generated audio before publishing**

## Publication gate

Before any audio goes live on a page, the gate is:

1. Audio downloaded from NotebookLM and previewed at 1.5x speed for compliance issues.
2. If the hosts say a rate, APR, fee, payment, approval claim, or use "MOSO" / "ELO" / "free processing" / "lowest rate" / "guaranteed approval" — do not publish. Regenerate with prompt reinforced.
3. Drive file shared with the right link permissions (link-view only).
4. `audio-companions.json` updated with `driveFileId`, `audioFileName`, `duration`, `status: "published"`.
5. Owner (Jeremy) signs off on the placement.
