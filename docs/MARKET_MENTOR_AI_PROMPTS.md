# Market Mentor AI Prompts

**Last updated:** 2026-05-28

## What's in the prompt library

`src/data/marketMentorPrompts.ts` ships 14 starter prompts across 8 categories. Each prompt has a slug, title, category, target audience, body, and tags.

| Category | Count |
|---|---|
| market_update | 2 |
| rate_explainer | 2 |
| cost_of_waiting | 1 |
| buy_vs_rent | 1 |
| debt_consolidation | 1 |
| realtor | 2 |
| objection | 2 |
| video | 3 |

## Where prompts surface in the UI

- `/market-mentor/rate-explainer` — rate_explainer prompts
- `/market-mentor/cost-of-waiting` — cost_of_waiting prompts
- `/market-mentor/buy-vs-rent` — buy_vs_rent prompts
- `/market-mentor/debt-consolidation` — debt_consolidation prompts
- `/market-mentor/realtor-update` — realtor prompts
- `/market-mentor/templates` — all prompts in one library view, plus full objection genome

## Prompt design rules

Every prompt body follows these rules:
- Plain English
- No rate predictions
- No promises of appreciation, savings, or specific outcomes
- Audience explicitly named
- Specific number of sentences / length cap so output is recordable / postable
- Ends with one clear next step
- Safe defaults for placeholders (`[PASTE HEADLINE]`, `[NAME]`, `[X]`)

## How users use prompts

- Open the relevant Market Mentor page
- Pick a prompt card
- Click "Copy prompt" (uses `navigator.clipboard.writeText`)
- Paste into their AI Twin, coaching assistant, or any LLM they're approved to use
- Always review output before sending externally

## Where prompts come from in code

Imports from `@/data/marketMentorPrompts`:
- `marketMentorPrompts` — full list
- `MarketPrompt` — type
- `MarketPromptCategory` — union
- `getPromptsByCategory(category)` — helper

## Adding more prompts

1. Add to `marketMentorPrompts` array in `src/data/marketMentorPrompts.ts`
2. Use the `MarketPromptCategory` union — extend the union if needed
3. Surface in the page that maps to the category
4. Keep body under ~120 words for compose-and-go usability
