# AI Assistant Hub Plan — LO Development Platform

**Status:** Sandbox backend wired for beta testing. OpenRouter chat and Groq Whisper transcription require server-only Netlify env vars.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-22
**Companion docs:** [`LO_DEVELOPMENT_PLATFORM_VISION.md`](./LO_DEVELOPMENT_PLATFORM_VISION.md), [`AI_ASSISTANT_BACKEND_SANDBOX.md`](./AI_ASSISTANT_BACKEND_SANDBOX.md)

The AI Assistant Hub is the catalog of **internal support tools** for LOs, team leaders, coaches, and admins. These are not customer-facing tools. They draft, coach, structure, and route — they never auto-send to borrowers or Realtors, and they never make final decisions.

---

## Platform-wide guardrails (apply to every assistant)

These guardrails govern every assistant on the platform. They are visible in the UI on every assistant page. If a request would violate any of these, the assistant routes the request to a human.

- **Internal support tools only.** No direct borrower-facing or Realtor-facing output without human review. Anything generated is a draft for an LO to edit and send.
- **Source-grounded.** Every assistant uses approved training docs, scripts, prompts, and compliance notes as its source material. No invented facts, no off-source claims.
- **No direct TERA access or writes.** Assistants describe TERA workflows; they do not call TERA, read TERA, or write to TERA. There is no public Loan Factory API.
- **No final underwriting decisions.** Underwriting assistants help structure scenarios, build documentation checklists, and draft common condition responses. Final decisions are always human.
- **No pricing, rate, fee, or approval claims** without verified source AND mandatory human review. Default: refuse to quote any number.
- **Route low-confidence or sensitive answers to human review.** When an assistant's confidence is low or the topic is compliance-sensitive, it produces a draft labeled "human review required" and routes it to the appropriate queue.
- **All compliance-sensitive output is draft-only and flagged for review.** No assistant can send, post, or publish compliance-sensitive content without an LO and reviewer signing off.
- **No claim that Loan Factory has an open API.**
- **No claim of "free processing," "daily companywide training," or production guarantees.**
- **Never use "ELO" — use "LO" or "loan officer."** Never use "MOSO."
- **AI provider governance.** The beta sandbox uses OpenRouter for chat completions and Groq Whisper for transcription. Production approval, model routing expansion, persistence, and external-send workflows remain out of scope.

---

## The 14 assistants

### 1. Marketing Assistant

- **Audience:** LO, Team Leader, Admin
- **Use cases:**
  - Draft a social post campaign from an approved training topic
  - Generate email copy variations from an approved source (newsletter, drip campaign)
  - Rewrite an LO's draft post in the approved brand voice
  - Repurpose a recorded webinar into multi-channel snippets
  - Build a content calendar from approved themes
- **Source materials:** Approved campaign templates in `/one-plus-one-five/content-kits/`, brand voice guide, prior posts marked "approved," Loan Factory style guide
- **Output type:** Draft copy (multi-format), suggested image briefs, suggested CTAs — all marked "draft, marketing review required"
- **Guardrails (in addition to platform-wide):**
  - No rate, APR, or fee mentions
  - No regulated claims (no "lowest rates," "guaranteed approval," etc.)
  - Recruiting-themed output is routed to Victoria for review before publication

---

### 2. Sales Coaching Assistant

- **Audience:** LO
- **Use cases:**
  - Coach an LO through a script segment from 101–601
  - Practice objection handling against a chosen objection from the script library
  - Give written feedback on a roleplay submission
  - Suggest a next-best-step after a real call (described by the LO in their own words)
  - Build a personalized practice plan
- **Source materials:** 101–601 scripts (`src/app/scripts/`), roleplay library (`src/app/roleplays/`), objection library, Apex Advisor curriculum
- **Output type:** Coaching feedback (paragraph), structured rubric scoring, practice plan checklist
- **Guardrails:**
  - Cannot generate scripts that violate compliance rules
  - Cannot coach an LO on misleading or non-compliant talk tracks
  - Cannot make claims about specific borrower scenarios it has no source for

---

### 3. Referral Partner Assistant

- **Audience:** LO, Team Leader
- **Use cases:**
  - Draft Realtor outreach emails from approved templates
  - Build co-branded campaign briefs (LO + Realtor)
  - Suggest follow-up sequences for a Realtor relationship
  - Help structure a Realtor lunch-and-learn agenda
  - Pull from 301 (Referral Partner Growth) module content
- **Source materials:** 301 module (`src/app/301-referral-partner-growth/`), 1+1+1=5 campaign kits, approved Realtor templates
- **Output type:** Draft email copy, draft campaign brief, draft agenda — all marked "draft, marketing review required for co-branded materials"
- **Guardrails:**
  - RESPA-sensitive output (anything involving things of value to Realtors) is flagged for compliance review
  - No mention of rates, points, or specific fee structures

---

### 4. Borrower Conversation Assistant

- **Audience:** LO
- **Use cases:**
  - Help an LO structure a discovery call
  - Suggest pre-qualification conversation flow
  - Coach an LO on explaining loan options at a high level
  - Suggest questions to ask in a borrower consultation
  - Suggest next-step framing after a call
- **Source materials:** 201 module (`src/app/201-borrower-conversion/`), approved consultation guides, compliance notes
- **Output type:** Conversation outline, question list, next-step framing — all draft, never auto-sent
- **Guardrails:**
  - No rate, APR, or fee claims
  - No approval claims
  - No representations the LO is not authorized to make
  - Never generates content that the LO is supposed to read verbatim to a borrower without the LO's review

---

### 5. Underwriting Support AI

- **Audience:** LO, Team Leader
- **Use cases:**
  - Structure a complex scenario (e.g., self-employed + recent move + DPA)
  - Build a documentation checklist for a scenario
  - Draft a response to a common condition (e.g., letter of explanation skeleton)
  - Walk through high-level guideline references
  - Suggest scenarios to escalate to a human underwriter
- **Source materials:** Approved scenario library, common condition response templates, public guideline summaries
- **Output type:** Scenario structure, documentation checklist, draft condition response, escalation recommendation — all draft, never final
- **Guardrails:**
  - **Never produces a final underwriting decision**
  - Never says "this loan will be approved" or "this loan will be denied"
  - All scenario walkthroughs end with "verify with underwriting"
  - No specific investor guideline quotes without source citation
  - Flags any scenario it cannot ground in source as "escalate to human"

---

### 6. Scenario Structuring Assistant

- **Audience:** LO, Team Leader
- **Use cases:**
  - Help an LO think through an unusual loan scenario using known guidelines
  - Surface relevant scenario examples from the training library
  - Suggest questions to ask the borrower to clarify the scenario
  - Suggest documentation needed to support the scenario
  - Identify when a scenario should go to a senior LO or underwriter
- **Source materials:** Scenario library, 501 module (Pipeline and Sales Systems), 601 module (Elite Execution)
- **Output type:** Scenario decomposition, clarifying question list, documentation suggestion, escalation note
- **Guardrails:**
  - No approval claims
  - No rate or fee quotes
  - Cites source examples; refuses to invent precedent

---

### 7. TERA Workflow Helper

- **Audience:** LO, Team Leader, Admin
- **Use cases:**
  - Step-by-step walkthrough of a TERA task (e.g., "how do I enter a new lead")
  - Explain a TERA screen or field
  - Help a new LO orient to TERA's structure
  - Surface the right training video or doc for a TERA task
  - Suggest a TERA workflow for a common scenario (description only, no execution)
- **Source materials:** Approved TERA training docs, screen captures (in Drive), workflow checklists
- **Output type:** Step-by-step instructions, screenshot references, training-video links
- **Guardrails:**
  - **No direct TERA access. No reads. No writes. No API calls.**
  - Never claims to "do" anything in TERA on the LO's behalf
  - Always points the LO at the actual TERA screen and lets the LO act
  - No claim that Loan Factory has an open API

---

### 8. AI Training Coach

- **Audience:** LO, Team Leader
- **Use cases:**
  - Guide an LO through the AI Training module (`/ai-training`)
  - Explain the Gemini Gem AI Twin and the AI Coaching Assistant
  - Teach prompt engineering basics in plain English
  - Suggest which assistant to use for a given task
  - Help an LO build their own working prompt library
- **Source materials:** AI Training module content, prompt library (`/prompts`), Gemini Gem AI Twin documentation
- **Output type:** Tutorial walkthroughs, prompt examples, "which assistant should I use" routing
- **Guardrails:**
  - No claims about AI capabilities not actually present in the approved assistants
  - Honest about limitations
  - Never recommends an external AI tool that hasn't been vetted

---

### 9. Content Repurposing Assistant

- **Audience:** LO, Team Leader, Admin
- **Use cases:**
  - Take a training video transcript and draft 5 social posts
  - Take a script and draft an email
  - Take a doc and draft an audio brief outline
  - Take a roleplay and extract teaching points
  - Re-cut long-form content into module-aligned snippets
- **Source materials:** Approved long-form content (videos, scripts, docs, recordings), brand voice guide
- **Output type:** Multi-format drafts (social, email, audio outline) — all marked draft
- **Guardrails:**
  - Source must be marked "approved for repurposing"
  - Marketing review required for any public-facing output
  - Cannot repurpose customer or borrower content (PII protection)

---

### 10. Team Leader Assistant

- **Audience:** Team Leader
- **Use cases:**
  - Draft a weekly 1:1 agenda for a team member based on their progress
  - Help a Team Leader plan a new LO's 30/60/90 ramp
  - Suggest team coaching notes from observed patterns
  - Draft a team scorecard summary
  - Suggest topics for the next team meeting
- **Source materials:** Team Leader OS playbooks, scorecard templates, ramp plans, recruiting tracker templates
- **Output type:** Meeting agenda, ramp plan, coaching note draft, scorecard summary — all draft
- **Guardrails:**
  - Coaching notes about specific LOs are private to the Team Leader and the LO Development chain
  - No public sharing
  - No personnel decisions (hiring, firing, promotion) — that's human only

---

### 11. Compliance / Risk Review Assistant

- **Audience:** LO, Team Leader, Admin, Compliance reviewer
- **Use cases:**
  - Flag potential compliance issues in LO-written marketing content
  - Flag potential RESPA issues in Realtor-facing content
  - Flag potential UDAAP issues in borrower-facing language
  - Suggest revisions to bring content closer to compliance
  - Route flagged content to the compliance reviewer
- **Source materials:** Approved compliance notes, prior reviewer feedback, common-issue library, state-specific rules library
- **Output type:** Issue list with severity, suggested revisions — **advisory only, never final**
- **Guardrails:**
  - **Never the final compliance decision** — always advisory
  - Always recommends human review for flagged items
  - Cannot approve content for publication
  - Flags ambiguous content for human review rather than guessing

---

### 12. Apex Advisor Coach

- **Audience:** LO (Apex Tier 1 + Tier 2)
- **Use cases:**
  - Guide an Apex member through the current week's curriculum
  - Help an Apex member prep for Power Hour or Breakfast Club
  - Suggest accountability prompts between coaching sessions
  - Help an Apex member review their certification progress
  - Surface relevant Apex resources for a stated goal
- **Source materials:** Apex Advisor curriculum (`src/data/apex.ts`), Apex member materials, certification rubrics
- **Output type:** Curriculum walkthrough, session prep notes, accountability prompts, certification progress summary
- **Guardrails:**
  - Cannot grant certifications (human review only)
  - Cannot change member tier or billing
  - Apex coaching content is gated to Apex members in production

---

### 13. Elite Sales & Marketing Coach

- **Audience:** LO
- **Use cases:**
  - Guide an LO through a specific 101–601 module
  - Suggest practice activities for the LO's current module
  - Quiz the LO on a chapter
  - Connect 101–601 content to the LO's stated goal
  - Recommend the next module
- **Source materials:** 101–601 module content, quizzes, flashcards
- **Output type:** Module walkthrough, practice plan, quiz, next-module recommendation
- **Guardrails:**
  - Source-grounded only
  - Cannot grant module completion (human or automated test only)

---

### 14. 1+1+1=5 Growth Assistant

- **Audience:** Team Leader, LO (with team leader scope)
- **Use cases:**
  - Suggest team growth tactics from approved 1+1+1=5 plays
  - Help structure a Realtor partnership plan
  - Draft co-branded campaign briefs
  - Suggest recruiting outreach to a target candidate (no PII storage)
  - Surface 1+1+1=5 content kits relevant to a stated growth goal
- **Source materials:** 1+1+1=5 module content, content kits, recruiting kits, Realtor partnership plays
- **Output type:** Growth plan, partnership brief, draft campaign brief, draft recruiting outreach
- **Guardrails:**
  - Marketing review required for any external-facing materials
  - Recruiting content (which often touches sensitive areas) is always routed to Victoria for review
  - No PII stored about candidates

---

## Implementation approach

**Phase 1 — Prototype (now):**
- Static `/ai-assistants` hub page with one AssistantCard per assistant
- Static sub-page per assistant: name, audience, use cases, source materials, output type, guardrails
- No live AI calls. No model wiring. No request handling.
- Every assistant page shows the platform-wide guardrails prominently
- Every CTA on every assistant page reads "Coming soon — describe how you'd use this" and links to a feedback form (no auto-email)

**Phase 2 — Live wiring (after TERA/Ally alignment + AI provider governance):**
- Wire Claude API (or Gemini, per AI provider decision) per assistant
- Each assistant has a source-grounded system prompt that cites only its approved source materials
- All outputs are draft-only, never auto-published, never auto-sent
- Compliance-sensitive output triggers a "human review required" badge
- Logging: every assistant call is logged for audit (no PII in logs)

**Phase 3 — Human review routing (after Phase 2 stabilizes):**
- Sensitive output (marketing, recruiting, compliance, borrower-facing) routes to a human review queue (n8n or GHL workflow)
- Reviewer (Victoria for marketing/recruiting, compliance reviewer for compliance) signs off in the queue
- Approved outputs return to the LO with a "review complete" badge
- Nothing ever auto-sends to borrowers or Realtors

---

## What this Hub is NOT

- Not a borrower chatbot
- Not a Realtor chatbot
- Not a TERA replacement
- Not a final-decision system (no auto-approvals, no auto-denials)
- Not a publishing tool (no auto-send, no auto-post)
- Not a compliance authority (advisory only)
- Not an AI tool catalog for the public — these are internal Loan Factory tools only

See [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md) for the full exclusion list.

---

## Update: Content Coach (Assistant #15) + Audience Quality Panel (Pass 3)

### Content Coach — Assistant #15

- **Audience:** all roles (LO, Team Leader, Corporate Coach, Marketing Reviewer, Admin).
- **Lives in:** both the AI Assistant Hub and the Creator Network module.
- **Use case:** repurpose internal Creator Network posts into external-ready drafts that the LO can review, edit, and send.
- **9 output types:**
  1. LinkedIn draft
  2. Instagram caption draft
  3. Short video script
  4. Realtor email draft
  5. Text message draft
  6. Flyer copy
  7. Open house follow-up draft
  8. Team leader training example
  9. AI prompt template
- **Source materials:** internal `creator_posts` and approved training docs only. No outside content. No invented facts.
- **Labeling:** every output is labeled `Draft only. Review before external use.`
- **Guardrails:**
  - No auto-send to borrowers or partners.
  - No rate, fee, or approval claims.
  - Draft-only output; human review required before any external use.
  - Inherits all platform-wide guardrails listed at the top of this doc.

### Audience Quality Panel — Internal QA Tool

The Audience Quality Panel is available as a standalone AI tool inside the AI Assistant Hub. It is an **internal QA tool only** — it does not approve compliance, publish externally, or contact anyone outside Loan Factory.

- **Flow:**
  1. LO or other user submits content (text, script, caption, email, etc.).
  2. User selects which panels to run: **Borrower**, **Referral Partner**, **Compliance/Risk**, **Marketing Performance**, **LO Peer**.
  3. User receives a scored panel report (0–100 per panel) including:
     - Simulated audience reaction
     - What works
     - What does not work
     - Risk flags
     - Rewrite recommendation
     - Approval status
- **Boundaries:**
  - Internal QA only.
  - Does **not** make final compliance approvals — Marketing Reviewer / Compliance still required.
  - Does **not** publish externally.
  - Does **not** contact borrowers, Realtors, or partners.
- **Model routing:** configurable per panel via OpenRouter. Low-cost models preferred for individual panels; a stronger model can be used for the synthesis pass. No hard-coded model names — all configurable from a single settings surface.

See also: [`LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md`](./LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md), [`LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md`](./LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md), [`LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md`](./LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md), [`LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md`](./LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md).
