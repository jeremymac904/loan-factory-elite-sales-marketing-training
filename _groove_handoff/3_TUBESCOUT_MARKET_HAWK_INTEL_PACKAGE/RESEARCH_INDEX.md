# TubeScout + Market Hawk Intel Package — Research Index

**Package owner:** Loan Factory internal strategy
**Audience:** Approved Loan Factory users (training, coaching, content, product teams)
**Date prepared:** 2026-05-28
**Reviewer:** Jeremy McDonald (jeremy@mcdonald-mtg.com)
**Status:** Frameworks shipped. Live research collection in progress (see status per file below).

---

## Purpose

This package contains two parallel research tracks:

1. **TubeScout** — YouTube intelligence framework for sourcing, capturing, and recycling public mortgage / coaching / AI / mindset content into AI Advantage micro-lessons, FaceGram seeds, scripts library entries, prompts library entries, and coaching session material.
2. **Market Hawk** — Competitor / category intelligence framework for retail lenders, broker brokerages, mortgage coaching platforms, AI-for-LO platforms, and recruiting/training competitors.

All sourcing is **public-only**. No scraping behind logins, no copying scripts verbatim, no screenshots of internal CRMs, no private comp data. Cite source URL + `date_checked` on every captured row. When advertised pricing is incomplete (APR / points / fees / terms missing), flag "incomplete advertised pricing."

---

## Forbidden Language Reminder (apply to every deliverable in this package)

Do NOT use: "public beta", "public users", "Vercel", "MOSO", "ELO".
Use instead: "approved Loan Factory users", "Netlify", "LO".

---

## File Manifest (9 + this index = 10 total)

| # | Filename | What it covers | Web research status | First-wave priority | Owner |
|---|----------|----------------|---------------------|---------------------|-------|
| 1 | `RESEARCH_INDEX.md` | Master index, rules, ownership, status (this file) | Framework only | P0 — read first | Strategy lead |
| 2 | `youtube_research_queries.md` | Query bank organized by 9 themes (mortgage training, mortgage coaching, real estate coaching, motivation, AI for LOs, Gemini, ChatGPT, Claude, content marketing) | Framework only | P1 — fuels Files 3-6 | TubeScout researcher |
| 3 | `youtube_research_capture_template.csv` | Standardized CSV row schema for every video reviewed | Framework only (3 example rows) | P1 — required before any capture | TubeScout researcher |
| 4 | `mortgage_coaching_channels_to_research.md` | 10+ named mortgage-coaching YouTube channels, what to harvest from each | Partially collected (channels verified via web search) | P1 — primary signal for $249 LO Mastery + $449 Alliance | TubeScout researcher + Coaching lead |
| 5 | `motivation_mindset_channels_to_research.md` | 10+ producer/sales mindset channels, identity-level voices | Partially collected | P2 — secondary signal for FaceGram daily seeds | TubeScout researcher + FaceGram editor |
| 6 | `ai_for_loan_officers_research.md` | AI/LO-specific YouTube + creators, prompt patterns, AI Twin patterns, safety language | Partially collected | P1 — primary signal for AI Advantage + AI Twin upgrades | TubeScout researcher + AI product lead |
| 7 | `competitor_research_targets.md` | 15+ competitor targets across 5 segments | Partially collected (NEXA, MMA verified) | P1 — primary input for recruiting deck | Market Hawk researcher |
| 8 | `competitor_intel_capture_template.csv` | Standardized CSV row schema for each competitor | Framework only (3 example rows) | P1 — required before any capture | Market Hawk researcher |
| 9 | `platform_feature_comparison_template.csv` | Feature-by-feature grid template for head-to-head comparisons | Framework only (3 example rows) | P2 — fuels recruiting / sales differentiation deck | Market Hawk researcher + Product lead |
| 10 | `first_wave_research_priorities.md` | Top 5 lists across YouTube channels, competitors, coaching offers, AI tools; 3 quick-win one-pager deliverables; research rules | Framework only | P0 — assigns the first sprint | Strategy lead |

---

## Status Legend

- **Collected** — Live data has been pulled into the file and cited with URL + date_checked.
- **Partially collected** — At least one bucket has live data; remaining buckets are framework with named targets.
- **Framework only** — Structure + named targets in place; live capture pending researcher sprint.
- **Pending live collection** — Identified as needed but not yet attempted (e.g., web search returned nothing useful, or behind login).

---

## Recommended First-Wave Sequence

1. Strategy lead reads `RESEARCH_INDEX.md` + `first_wave_research_priorities.md` (P0).
2. TubeScout researcher works `youtube_research_queries.md` against `mortgage_coaching_channels_to_research.md` and `ai_for_loan_officers_research.md`, capturing rows into the YouTube CSV template (P1).
3. Market Hawk researcher works `competitor_research_targets.md`, capturing rows into the competitor CSV + the platform feature CSV (P1).
4. FaceGram editor + Coaching lead pull "evergreen_y_n = Y" + "priority_1" rows weekly to seed AI Advantage micro-lessons and coaching session prep.
5. All deliverables route back through the strategy lead for "where LF differentiates" sign-off before any external use.

---

## Loan Factory Differentiation Anchors (use these in every capture's `where_LF_differentiates` field)

- Integrated platform: training + coaching + AI + community + lender escalation, all in one place
- AI Twin per role (LO, Team Leader, recruiter, marketing) tuned to Loan Factory tone + compliance posture
- Internal-only safety posture — never an external chatbot, never a public-facing AI
- Member tier ladder: free baseline -> $249 LO Mastery -> $449 Alliance
- Broker channel reach (wholesale lender library) combined with retail-style training depth
- FaceGram internal community as a closed-loop feedback channel for AI Advantage and coaching

---

## Rules (apply to every file in this package)

- Public sources only.
- Never copy scripts verbatim — paraphrase, then mark "adapt_to" target.
- Cite source URL + date_checked on every captured row.
- If rates/offers are partially advertised, flag "incomplete advertised pricing."
- Internal strategy use only — do not republish externally.
- No screenshots of internal CRMs, no private comp data, no scraping behind logins.
