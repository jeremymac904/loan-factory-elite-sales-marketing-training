# Market Mentor → HeyGen Workflow

**Last updated:** 2026-05-28

End-to-end workflow for taking a market topic from "I want to make a video" to "I have a HeyGen draft" inside Market Mentor Studio.

## Step 1 — Pick a starting point

Three entry points:
1. `/market-mentor/market-update/` — Market Update Interpreter (you have a headline)
2. `/market-mentor/realtor-update/` — Realtor Market Expert Kit (you want a Realtor-facing update)
3. `/market-mentor/templates/` — Template Library (you know the template you want)

## Step 2 — Build the script

- The page renders a starter script appropriate to the entry point
- For Market Update Interpreter: the AI Twin (when connected) turns your input into 5 output variants — borrower, Realtor, social, video script, email outline
- For Realtor Market Expert Kit: pick one of the script template channels (text, email, social, FaceGram, video)
- For Templates: copy any video template structure directly

## Step 3 — Move to Video Studio

Click "AI Avatar Video Studio" or go directly to `/market-mentor/video-studio/`.

## Step 4 — Pick a video template

Templates available:
- Weekly Market Update (60s, borrower)
- Realtor Weekly Update (75s, Realtor)
- Coaching Recap (90s, coaching member)
- Training Nugget (45s, broad internal)
- Buyer Education (60s, borrower)
- Bilingual Market Update EN + ES (90s, borrower, Alliance)
- Team Leader Market Briefing (120s, team leader, Alliance)
- Mastermind Discussion Prompt (60s, coaching member, Alliance)

## Step 5 — Paste your script

(Future: the AI Twin will pre-fill the template with your script. Today the script lives in your clipboard from Step 2.)

## Step 6 — Generate (when HeyGen is connected)

- If HeyGen is not connected: generate button disabled, "HeyGen setup needed" badge
- If HeyGen is connected: click Generate, draft created in HeyGen Studio
- Loan Factory records the draft in `heygen_video_drafts` (planned table)
- Status updates: queued → generating → ready → failed

## Step 7 — Review

Review the HeyGen draft for:
- Voice clarity
- Avatar quality
- Pronunciation (especially for bilingual)
- No accidental rate predictions
- Compliance with responsible-language reminders

## Step 8 — Decide what to do with it

Options:
- Keep as personal draft (default)
- Share internally in FaceGram
- Send for Marketing review (for public-facing use)
- Cross-post to YouTube (manual, via Marketing approval path — not automated)
- Embed in Coaching recap or Mastermind prep

## Hard rules

- No auto-publish
- No YouTube upload from automation
- No external email of generated videos from the AI Twin
- All bilingual videos must include the Spanish-language educational disclaimer
- Marketing review for any borrower- or Realtor-facing public video

## What's already in place

- All 8 video templates defined in `src/data/marketMentorTemplates.ts`
- Video Studio UI at `/market-mentor/video-studio/` with connection checklist
- Per-template card with disabled generate button + tier badge

## What's not in place

- No HeyGen API call yet
- No `heygen_video_drafts` table yet
- No HeyGen webhook handler yet
- No auto-fill of script from upstream Market Mentor page yet
- No bilingual rendering pipeline yet
