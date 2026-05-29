# Market Mentor Studio

**Status:** Staged on `support/market-mentor-studio` branch. Not merged.
**Last updated:** 2026-05-28

## Overview

Loan Factory's internal market intelligence, borrower advisory, Realtor value, and AI video studio for approved Loan Factory users. Designed for paid coaching members and internal leadership/coaching users.

Built entirely in-house. Not powered by any third-party "mortgage mastery" platform. Uses HeyGen only for AI Avatar Video Studio (per-user, future MCP/API connection).

## Routes

| Route | Purpose | Tier |
|---|---|---|
| `/market-mentor` | Hub | Preview / Mastery / Alliance |
| `/market-mentor/market-update` | Market Update Interpreter | Mastery |
| `/market-mentor/rate-explainer` | Rate Movement Explainer | Mastery |
| `/market-mentor/cost-of-waiting` | Cost of Waiting Builder | Mastery |
| `/market-mentor/buy-vs-rent` | Buy vs Rent Advisory Lab | Mastery |
| `/market-mentor/debt-consolidation` | Debt Consolidation Builder | Mastery |
| `/market-mentor/realtor-update` | Realtor Market Expert Kit | Mastery |
| `/market-mentor/roleplay` | Market Roleplay Arena | Mastery + Alliance roleplays |
| `/market-mentor/video-studio` | AI Avatar Video Studio (HeyGen) | Mastery + Alliance templates |
| `/market-mentor/templates` | Template Library + Objection Genome | Mastery |
| `/market-mentor/certification` | Internal recognition track | Mastery |

## Data files

- `src/data/marketMentor.ts` — tool catalog, access roles, certification steps, audience/tone enums, responsible language reminders
- `src/data/marketMentorPrompts.ts` — AI prompt cards by category
- `src/data/marketMentorRoleplays.ts` — practice scenario cards with starter prompts
- `src/data/marketMentorTemplates.ts` — script templates, video templates, market objection genome

## Components

In `src/components/market-mentor/`:
- `MarketMentorHero` — hero shell with breadcrumb and tier badge
- `MarketMentorCard` — tool / content card (supports locked state)
- `MarketMentorToolGrid` — tool grid with tier gating
- `MarketScenarioBuilder` — reusable scenario form for Cost of Waiting / Buy vs Rent / Debt Consolidation
- `MarketPromptCard` — AI prompt card with copy-to-clipboard
- `MarketRoleplayCard` — roleplay card with starter prompt reveal
- `MarketVideoTemplateCard` — video template card with HeyGen-connection state
- `MarketCertificationProgress` — local-storage progress tracker
- `MarketMentorAccessGate` — server component that gates the tool routes by role
- `MarketUpdateInterpreter` — Market Update Interpreter form

## Tier behavior

### LO Mastery ($249)
- Market Update Interpreter
- Borrower plain-English explanations
- Realtor weekly update builder
- Cost of Waiting Builder
- Basic video script templates
- Basic AI roleplay scenarios (8 mastery scenarios)

### Loan Factory Alliance ($449)
- Everything in LO Mastery
- Advanced market scenarios (leadership briefing, mastermind facilitation roleplays)
- Realtor campaign series builder (via Templates + Realtor Update)
- Leadership/team market briefing builder
- Bilingual market update scripts (video studio template)
- Advanced HeyGen video templates (bilingual, leadership briefing, mastermind prompt)
- Mastermind discussion prompts
- Market objection roleplay scoring

## Responsible language

Every tool reinforces:
- Educational estimate only
- Review before using externally
- Do not predict rates
- Do not promise appreciation
- Do not guarantee savings

These reminders appear inline in scenario builders and at the top of every output preview.

## External integrations

**None active.** All "generate" buttons stay disabled until the per-user connection is approved:
- HeyGen — for AI Avatar Video Studio (future MCP or direct API)
- AI provider — for Market Update Interpreter and roleplay

No live API calls are made from this package.

## Where Groove should link this in

- Member Area cards (LO Mastery and Alliance pages)
- AI Assistants hub as a related tool
- Training Library as an advanced advisory pillar
- Coaching pages as a recommended toolset
- Consider adding to primary nav once Jeremy approves placement

## Next code work after merge

1. Wire scenario builders to AI Twin / coaching assistant for real outputs
2. Wire Roleplay Arena to live AI roleplay flow (or via AI Twin)
3. Wire Certification progress to Supabase `training_progress` per user
4. Wire HeyGen connection state to per-user `google_connections` or `ai_twins.heygen_*` flags
5. Build bilingual rendering for Spanish-language video templates
