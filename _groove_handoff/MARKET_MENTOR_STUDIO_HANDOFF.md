# Market Mentor Studio — Groove Handoff

**Branch:** `support/market-mentor-studio`
**Worktree:** `~/LoanFactoryProjects/market-mentor-staging`
**Base:** `origin/main` @ `e5385eb`
**Status:** Staged. Not merged. PR will be opened after validation passes.

## What was built

11 routes, 10 components, 4 data files, 5 docs, 1 handoff. Real Next.js app code that compiles and runs — gated and disabled where external integrations aren't connected.

## Routes added

- `/market-mentor` — hub
- `/market-mentor/market-update`
- `/market-mentor/rate-explainer`
- `/market-mentor/cost-of-waiting`
- `/market-mentor/buy-vs-rent`
- `/market-mentor/debt-consolidation`
- `/market-mentor/realtor-update`
- `/market-mentor/roleplay`
- `/market-mentor/video-studio`
- `/market-mentor/templates`
- `/market-mentor/certification`

## Data files

- `src/data/marketMentor.ts` — tool catalog, access roles, certification steps, audience/tone enums
- `src/data/marketMentorPrompts.ts` — 14 AI prompt cards across 8 categories
- `src/data/marketMentorRoleplays.ts` — 10 roleplay scenarios (8 Mastery + 2 Alliance)
- `src/data/marketMentorTemplates.ts` — 10 market objections (full genome), 8 video templates, 7 script templates

## Components

In `src/components/market-mentor/`:
- `MarketMentorHero`
- `MarketMentorCard`
- `MarketMentorToolGrid`
- `MarketScenarioBuilder`
- `MarketPromptCard`
- `MarketRoleplayCard`
- `MarketVideoTemplateCard`
- `MarketCertificationProgress`
- `MarketMentorAccessGate` (server component)
- `MarketUpdateInterpreter` (Market Update Interpreter form)

## Docs

- `docs/MARKET_MENTOR_STUDIO.md`
- `docs/MARKET_MENTOR_ACCESS_MODEL.md`
- `docs/MARKET_MENTOR_AI_PROMPTS.md`
- `docs/AI_AVATAR_VIDEO_STUDIO_HEYGEN_ARCHITECTURE.md`
- `docs/MARKET_MENTOR_TO_HEYGEN_WORKFLOW.md`

## Access rules

| Role | Hub | Tools | Alliance |
|---|---|---|---|
| master_admin, admin, lo_development_lead, corporate_coach, coaching_member_level_2 | yes | yes | yes |
| lo_development_member, marketing, team_leader, coaching_member_level_1 | yes | yes | no |
| loan_officer | preview only | no | no |
| signed-out | sign in required | no | no |

Enforced by `MarketMentorAccessGate` (server component). Reads `getBetaUserSession()` and `isBetaPreviewEnabled()`. Beta preview cookie passes through for internal review.

## Where Groove should integrate links

After merge, link Market Mentor Studio from:
1. `/member-area/lo-mastery/` — add a card for "Market Mentor Studio (LO Mastery)"
2. `/member-area/alliance/` — add a card for "Market Mentor Studio (full Alliance)"
3. `/coaching/` — add as a featured paid coaching tool
4. `/ai-assistants/` — link as a related tool (Market Mentor prompts can flow into AI Twin)
5. `/training-library/` — link as advanced advisory training
6. Consider adding to primary nav once Jeremy approves placement

## What is functional now

- All 11 routes render
- Access gate enforces tier and role correctly
- Scenario builders accept inputs and reveal example outputs (static, labeled as example)
- Prompt cards support copy-to-clipboard
- Roleplay cards reveal starter prompts and support copy-to-clipboard
- Video template cards render with disabled generate button (HeyGen not connected)
- Certification progress tracker uses localStorage
- Template Library page renders full library + objection genome
- Market Update Interpreter form accepts headline + audience + tone, shows 5 example outputs

## What is staged / status-only

- Market Update Interpreter outputs are static example templates (AI provider not connected)
- Scenario builders show static template outputs (AI provider not connected)
- Roleplay launch reveals starter prompt (no live AI roleplay call)
- AI Avatar Video Studio "Generate" buttons are disabled (HeyGen not connected)
- Certification progress is localStorage-only (no Supabase `training_progress` write yet)

## HeyGen connection requirements

See `docs/AI_AVATAR_VIDEO_STUDIO_HEYGEN_ARCHITECTURE.md`. Two paths supported:
- HeyGen MCP architecture (preferred)
- Direct HeyGen API (alternate)

Until connection state is wired, the Video Studio page shows clear setup UX. No live API call is made.

## External credentials NOT used

This package does not require or read:
- HeyGen API key
- Anthropic / OpenAI API key
- Google service account
- n8n credentials
- YouTube API key
- Gmail credentials
- Supabase service role key for runtime calls (data is read via existing session helpers)

The package imports existing session/auth helpers (`getBetaUserSession`, `isBetaPreviewEnabled`) — does not introduce new auth.

## What was NOT triggered

- No n8n workflows
- No YouTube uploads
- No HeyGen API calls
- No emails sent
- No Supabase migrations
- No destructive Supabase ops
- No external webhook calls
- No data writes to runtime tables

## Forbidden language audit

- No "MBS Highway", "MBS Highway Mastery", or "powered by MBS Highway"
- No "Vercel" (uses Netlify references)
- No "public beta", "public users", "public build"
- No "MOSO", "ELO"
- No compliance flags applied to internal training clips
- All references use "approved Loan Factory users", "Netlify", "LO", "TERA"

## Validation status

To be confirmed when validation runs in the final phase:
- npm install
- npm run lint
- npm run typecheck
- npm run build
- git diff --check

## Recommended integration order

1. Open the PR and review the 11 routes
2. Test the hub at `/market-mentor` for tier badge behavior
3. Merge if validation is clean
4. Add nav entry points (see "Where Groove should integrate links" above)
5. Wire scenario builders to AI Twin / coaching assistant for real outputs
6. Wire Roleplay Arena to live AI roleplay flow
7. Wire Certification progress to Supabase `training_progress`
8. Wire HeyGen connection state (pick MCP or direct API path)
