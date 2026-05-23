# Audio Production Status Report — NotebookLM Audio Companions

**Date:** 2026-05-23
**Workspace:** `loan-factory-product-starter-kit/apps/loan-factory-elite-sales-marketing-training`
**Source notebook:** [(Sales & Marketing Masterclass) — YouTube](https://notebooklm.google.com/notebook/9c5cbd35-e6d9-4158-a45b-2e761a34531e)

---

## What was generated

- ✅ Six polished NotebookLM custom audio prompts for the core 101–601 series (in `NOTEBOOKLM_AUDIO_PROMPTS_101_601.md`)
- ✅ Eight bonus podcast-style audio prompts (in `BONUS_SALES_MARKETING_AUDIO_PROMPTS.md`)
- ✅ `AUDIO_COMPANION_MASTER_INDEX.md` — every companion, status, page placement, Drive folder
- ✅ `AUDIO_WEBSITE_PLACEMENT_MAP.md` — exact website page each audio renders on
- ✅ `AUDIO_DRIVE_UPLOAD_PLAN.md` — file naming, Drive folder structure, upload checklist
- ✅ `audio-companions.json` — machine-readable metadata for all 14 audio companions

## What failed / blockers

### NotebookLM CLI authentication blocked

The local NotebookLM CLI (`notebooklm-py` v0.3.4, installed at `~/bin/notebooklm`) reports two separate failure modes:

1. **`notebooklm auth check`** — reports "Authentication is valid" because cookies are still present in `~/.notebooklm/storage_state.json` from a prior session.
2. **`notebooklm list`** — fails with "Authentication expired or invalid" because Google has invalidated the session server-side.

**Root cause:** The session captured in a prior run has aged out. A fresh `login` is required.

**Sub-blocker on re-login:** The first `login` attempt during this task crashed because Playwright Chromium wasn't installed in the venv. After installing it, a re-launch was attempted but the script silently exited again because Playwright's `launch_persistent_context` requires the user data dir to NOT be locked by another browser instance — and the `~/.notebooklm/browser_profile` dir was still locked from the prior crashed process. A clean reset (`rm -rf ~/.notebooklm/browser_profile`) plus re-launch should resolve it but it requires user interaction (signing into Google in the spawned browser), which the agent cannot do unattended.

**Net effect on this task:** No audio was generated programmatically. All 14 audio prompts are documented, paste-ready, and pre-validated for compliance language. Generation runs as a manual NotebookLM Studio session by Jeremy.

### What still needs manual NotebookLM action

For each of the 14 audio companions:

1. Open the source notebook in NotebookLM:
   https://notebooklm.google.com/notebook/9c5cbd35-e6d9-4158-a45b-2e761a34531e
2. Open Studio panel → Audio Overview → Customize
3. Paste the matching prompt block from `NOTEBOOKLM_AUDIO_PROMPTS_101_601.md` or `BONUS_SALES_MARKETING_AUDIO_PROMPTS.md`
4. Click Generate
5. When complete: preview at 1.5x speed, then download the MP3
6. Follow the upload checklist in `AUDIO_DRIVE_UPLOAD_PLAN.md`
7. Update `audio-companions.json` for that item with `status: "downloaded"` or `"published"`, `audioFileName`, `driveFileId`, `duration`

Production-order recommendation (highest team ROI first) is documented at the end of `BONUS_SALES_MARKETING_AUDIO_PROMPTS.md`.

## What is ready for Codex to add to the website

When at least one audio file is published in Drive:

1. **New shared component** `src/components/audio/AudioCompanionCard.tsx` that reads from `audio-companions.json` and renders a player + title + session badge + duration + transcript link. Render guard: only show entries with `status === "published"`.
2. **New route** `/audio-training` rendering the catalog grid from `audio-companions.json` in the order from `BONUS_SALES_MARKETING_AUDIO_PROMPTS.md` production-order recommendation.
3. **Per-session pages** (`/101-foundation`, `/201-borrower-conversion`, etc.) embed the `AudioCompanionCard` for their matching audio.
4. **Library route** (`/training-library` if it exists, else add the audio block to `/training`) — show all audio companions filterable by session.

Until at least one audio is `status: "published"`, every consumer should render an empty-state card ("Audio companion coming soon — listen in NotebookLM Studio meanwhile").

## Compliance review baked into prompts

Every prompt enforces the floor:
- No rate, APR, fee, payment, approval, underwriting, or compliance-decision claims
- Always TERA, never MOSO
- Always LO or loan officer, never ELO
- No claim of a Loan Factory public API
- No "free processing" / "lowest rate" / "guaranteed approval" / "daily companywide training"

After NotebookLM generates each audio, the audio still must be **listened to at 1.5x** before publishing. NotebookLM's two-host generator occasionally drifts off the prompt's constraints; the human is the final compliance gate.

## Files / folders created by this task

```
docs/notebooklm-audio-companions/
  ├─ AUDIO_COMPANION_MASTER_INDEX.md
  ├─ NOTEBOOKLM_AUDIO_PROMPTS_101_601.md
  ├─ BONUS_SALES_MARKETING_AUDIO_PROMPTS.md
  ├─ AUDIO_WEBSITE_PLACEMENT_MAP.md
  ├─ AUDIO_DRIVE_UPLOAD_PLAN.md
  ├─ AUDIO_PRODUCTION_STATUS_REPORT.md  (this file)
  └─ audio-companions.json

_staging/elite-sales-marketing-notebooklm-audio/   (empty; ready to receive downloaded MP3s)
```

## Brand QA spot checks

- "TERA" appears in every prompt; "MOSO" does not appear in any user-facing prompt or doc. ✓
- "LO" / "loan officer" used throughout; "ELO" does not appear. ✓
- No prompt asks the audio host to quote rate, APR, fee, payment, or approval. ✓
- No prompt mentions a Loan Factory public API. ✓
- All bonus prompts include explicit constraint blocks. ✓
- All audio companions reinforce: "AI drafts, the LO publishes." ✓

## Production safety

- No app code modified
- No commits, no push, no PR
- No Netlify trigger, no deploy
- No n8n triggers, no email/social/calendar sends
- No paid AI API calls outside NotebookLM's web UI
- No large audio in GitHub repo (staging folder is outside the repo)
- No `.env` writes
- No secrets exposed
- No TERA writes
- No existing training assets overwritten
- Legends-MTG-Support-Pro untouched

## Next step recommended

1. Jeremy clears the NotebookLM CLI session lock once and re-authenticates (or just uses NotebookLM Studio in the browser directly — both work).
2. Generate the six core audio companions in production-order, starting with 101 Foundation and 501 Pipeline (foundation + highest weekly-utility).
3. Upload to Drive, set sharing.
4. Update `audio-companions.json` and this file's status table.
5. Hand off to Codex for the `AudioCompanionCard` component + `/audio-training` route + per-session embeds.
