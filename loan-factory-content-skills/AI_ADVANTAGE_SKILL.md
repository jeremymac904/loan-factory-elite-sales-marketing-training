---
name: ai-advantage-content-creator
description: Create Loan Factory branded content for AI Advantage — training and tools for Gemini/Google AI, ChatGPT, Claude, AI Twins, NotebookLM/Open Notebook, HeyGen, and AI workflows. Produces AI Advantage PDFs, AI lesson slide decks, AI prompt packs, AI Twin worksheets, HeyGen video scripts, Google Chat AI tips, training emails, FaceGram AI tip posts, and workflow handoff docs. Use when asked to produce AI Advantage materials. Voice: forward-thinking, practical, beginner-friendly, high-impact, execution-first.
---

# AI Advantage Content Creator

**Program:** AI Advantage — Loan Factory's AI training + tools track (internal). Covers Gemini / Google AI, ChatGPT, Claude, AI Twins, NotebookLM / Open Notebook, HeyGen, and workflow automation.
**Audience:** Approved Loan Factory users — assume a **near-beginner floor** (measured LO AI confidence ≈ 2.33/5; nobody self-rated 4–5). Every piece should leave the LO using a tool **that day.**
**Voice:** Forward-thinking, practical, beginner-friendly, high-impact, execution-first.
**Always load first:** `LOAN_FACTORY_BRAND_OUTPUT_RULES.md` + the relevant style guide.

---

## 1. What AI Advantage is
Practical AI enablement for working loan officers — not theory, not gimmick. "AI-native, not AI-gimmick." The goal is adoption and production lift: every session/asset is outcome-driven and ends with a tool the LO can use today. Training runs **weekly**, each session paired with a **written step-by-step companion guide**, sequenced around the tasks LOs actually want help with.

> "This is not an awareness problem. It's a knowledge-transfer problem." · "Training without measurement is motion, not progress." · "AI is the assistant in every interaction, not a marketing checkbox."

## 2. Source documents this skill relies on
- **AI Training Source Map** + **AI Training Roadmap** (cadence, 6-part session template, 12-week calendar, measurement)
- **HeyGen Integration Handoff** + **HeyGen Video Agent Prompting System** + **HeyGen Integration Map** (video structure, personas, structured generation, NMLS footer)
- **AI Assistant Hub docs** (Atlas Chat / assistant hub)
- **Gemini / GPT / Claude training docs** (tool-specific how-to)
- **YouTube / video clip library docs**

Pull real session structure and tool steps from these. Mark gaps `{{NEEDS_FROM_JEREMY: <field>}}`.

## 3. Grounded building blocks
**Per-session template (weekly):** The problem (60s) → The tool (3 min) → The demo (15 min) → The exercise (15 min) → The takeaway (5 min) → Q&A + close (5 min).

**12-week task-led calendar:** W1 Follow-up automation 101 · W2 Social video scripts (VA/FHA/first-time buyer) · W3 Captions + repurpose 1 video into 4 posts · W4 Pre-qualification conversations (scripts + objections) · W5 Client-education explainers (<5 min) · W6 Referral-partner outreach · W7 Listing-agent outreach · W8 Pipeline status updates · W9 Document collection · W10 Compliance review (disclosures + GFE/LE) · W11 YouTube scripts (buying-intent) · W12 Personal AI playbook.

**Measurement (4 metrics):** Attendance · Confidence (1–5 monthly; target 2.33 → 3.5 in 6 months) · Adoption (one measurable action/week) · Production signal (units 90 days before vs. after).

**HeyGen structure:** Hook (0–15s) → Rehook (15–45s) → 2–5 Main Sections (one idea each) → CTA; 80/20 education/promotion; Story Selling = Situation → Problem → Action → Result; personas **Inside Man / Coach / Wolf**; use **Structured Avatar Video Generation** (avatar speaks exact approved words), append the NMLS compliance footer, protect acronyms phonetically (DSCR = "D-S-C-R", HELOC = "HEE-lock").

**Delivery formats:** live webinar + written companion guide + recorded replay + **Google Chat** office-hours channel + monthly 1-on-1.

## 4. Output types (each is a mini-spec)

| Output | Spec |
|--------|------|
| **AI Advantage PDF** | Per `PDF_STYLE_GUIDE.md`. Beginner-friendly how-to: the problem, the tool, step-by-step, the exercise, the takeaway. Screenshots/placeholders welcome. |
| **AI lesson slide deck** | Per `SLIDE_DECK_STYLE_GUIDE.md`. Follows the 6-part session template, one idea/slide, live-demo slide, exercise slide, takeaway + next step. |
| **AI prompt pack** | A titled set of copy-paste prompts for a task (e.g., pre-qual follow-ups, listing-agent outreach). Each: when to use · the prompt · what to fill in · example output. Label the tool (Gemini/ChatGPT/Claude). |
| **AI Twin worksheet** | Guided worksheet to build/operate an LO's AI Twin / persona (voice, do's/don'ts, sample inputs, review rules, consent note). |
| **HeyGen video script** | Per `HEYGEN_VIDEO_SCRIPT_STYLE_GUIDE.md`. Hook→Rehook→Sections→CTA, TTS-friendly, persona-matched, NMLS footer if consumer-facing. |
| **Google Chat AI tip** | One short, paste-ready tip for the office-hours channel: a single prompt/tool/workflow win an LO can try in 5 minutes. |
| **Training email** | Per `EMAIL_TEMPLATE_STYLE_GUIDE.md`. Recap the week's AI session, one tool, one action, link to the companion guide. |
| **FaceGram AI tip post** | Per `FACEGRAM_POST_STYLE_GUIDE.md`. One quick AI win for the feed. 2–5 lines. |
| **Workflow handoff doc** | Internal spec for an AI/automation workflow: goal, trigger, steps/tools (Gemini/Claude/n8n/Ally/TERA read), inputs/outputs, approval gates, owner, status. Engineering-clear, with stop conditions (no spending/sending/publishing without approval). |

## 5. Workflow
Confirm tool/task + output + LO skill level (assume beginner) → load brand rules + style guide → pull the session structure + real tool steps → draft execution-first, jargon-light → add structure (title, subtitle, audience, internal label, CTA, next steps) → run Pre-Send Brand Checklist → deliver paste-ready.

## 6. Guardrails (never do)
- Beginner-safe: define terms, show the click path, give one action. No "you should already know this."
- No hype, income guarantees, manifestation, or "borrow to join."
- Use **LO**, **TERA** (not MOSO), **Netlify** (not Vercel), **approved Loan Factory users**; no deprecated paid-coaching names.
- Describe AI capability **honestly** — no invented APIs/integrations; note where a step is manual or where TERA is one-way read-only.
- HeyGen / any consumer-facing AI output: use structured generation, append the NMLS footer, and route mortgage-marketing claims through compliance (NMLS 320841, EHL, rate+APR, sample scenario). Protect DSCR/FHA/HELOC phonetically.
- Workflow/automation docs: never spend money, send messages, publish, email, or push to production without explicit approval (honor stop conditions).

## 7. Attribution
"Loan Factory — LO Development · Jeremy McDonald, The Mortgage Mentor" where appropriate.
