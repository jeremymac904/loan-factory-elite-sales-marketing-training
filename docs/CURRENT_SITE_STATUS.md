# Current Site Status

## Status

Built into a unified Loan Factory LO Development Platform shell with a Supabase Google Auth beta foundation and a sandbox AI Assistant backend. Public routes render, protected beta surfaces use request-time Supabase checks, and AI model calls remain server-side and sandbox-only.

## Canonical Local Working Path

`/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/loan-factory-product-starter-kit/apps/loan-factory-elite-sales-marketing-training`

## Current Git State

- Branch: `main`
- Remote: `https://github.com/jeremymac904/loan-factory-elite-sales-marketing-training.git`
- Working tree: clean after the latest committed/pushed build.

## Current Product Direction

The site now positions the app as the Loan Factory LO Development Platform, with visible routes for:

- Loan Factory LO Mastery Coaching / Loan Factory Alliance
- Elite Sales & Marketing 101-601
- AI Training
- 1+1+1=5
- Training Library
- FaceGram
- AI Assistants
- Audience Quality Panel
- Calendar
- Trackers
- Resources
- Support Routing

## Safety State

- Supabase Google Auth, Postgres schema, and RLS are wired for beta.
- AI Assistant chat is wired through server-side OpenRouter only when sandbox env vars, provider key, and explicit model are enabled.
- AI Assistant audio transcription is wired through server-side Groq Whisper only when sandbox env vars, provider key, and explicit model are enabled.
- No n8n, Google Workspace, TERA reads/writes, social publishing, or external sends are wired.
- FaceGram is internal-only; posting requires sign-in in the beta UI.
- Audience Quality Panel is static and does not replace Loan Factory marketing, compliance, legal, or leadership review.
- AI Assistant outputs are labeled draft-only and require review before external use.
- Large media remains a follow-up cleanup item; no new large media was added.

## Local Validation

- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run build` passed with static public routes and dynamic auth/admin/gated routes.
- Browser QA passed on `/`, `/apex-advisor/`, `/ai-training/`, `/creator-network/`, `/sales-training/`, `/resources/`, `/login/`, `/access-pending/`, and `/admin/`.
- Browser console check reported no errors on tested routes after adding the favicon.

## Read Before Building

- `docs/OPEN_DECISIONS.md`
- `docs/LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md`
- `docs/LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md`
- `docs/TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`
