# LO Development Platform — Audience Quality Panel / Market Response Panel

> Internal QA workflow plan for the Loan Factory LO Development Platform.
> Status: Planning document. Not built. Not deployed. Not LegendsOS.

---

## 1. Overview

The **Audience Quality Panel** (also called the **Market Response Panel**) is an AI-powered internal quality control layer for the Loan Factory LO Development Platform. Before any marketing content, video script, social caption, SMS template, referral partner message, or borrower-facing draft is finalized inside the platform, it can be run through a set of simulated AI "audience panels" that score, react to, and flag the content from multiple realistic perspectives.

### Why it exists
Loan officers create a lot of content — Reels, scripts, Realtor messages, open-house follow-ups, email drafts, flyers, captions. Most of it goes out without a second set of eyes. The result is:
- Content that confuses borrowers
- Content that bores or insults Realtors
- Content that creates compliance exposure (rate claims, payment claims, guaranteed approval language, free processing claims, competitor claims)
- Content that simply doesn't perform on the platform it was made for
- Content that doesn't sound like how an actual LO would talk in a real conversation

### What problem it solves
The Audience Quality Panel gives every LO a pre-flight check before content leaves the LO Development Platform — so that the version that eventually reaches a human reviewer, a borrower, or a referral partner has already been pressure-tested for clarity, trust, performance, and risk.

It is a **first-pass internal QA layer**, not a publishing system and not a compliance approver.

---

## 2. Internal QA Only — Scope Boundary

This is a hard line and must be reflected in every UI surface, prompt, and report.

The Audience Quality Panel is:
- An **internal QA workflow** inside the LO Development Platform
- A **simulated audience reaction tool** powered by configurable AI models
- A **risk-flagging tool** that highlights issues for human review
- A **content improvement tool** that recommends rewrites

The Audience Quality Panel is **NOT**:
- A compliance approval system
- A legal review system
- A publishing system
- A replacement for human marketing, legal, leadership, or compliance review
- A system that sends content to borrowers, Realtors, referral partners, or any external audience
- A system that auto-approves anything for external use
- A system that makes rate, fee, APR, payment, or approval claims
- A system that authorizes content to be sent to consumers

Every panel report must carry an explicit label:
> "Internal QA only. This is a simulated AI audience panel. It does not replace human compliance, marketing, legal, or leadership review. Do not use the report as approval for external distribution."

---

## 3. The 5 Panels

Each panel is an independent AI persona (or persona set) with its own system prompt, lens, and scoring criteria. Panels run independently and their results are combined into a single panel report.

### 3.1 Borrower / Consumer Panel
**Lens:** A real homebuyer or refinance borrower reading the content for the first time.

**Reviews for:**
- Clarity — could a borrower with no mortgage background follow it?
- Trust — does it feel warm, honest, helpful?
- Emotional reaction — does it feel safe, exciting, scary, confusing, pushy?
- Confusing language — jargon, acronyms, industry shorthand
- Sales pressure — does it feel like a pitch instead of help?
- Usefulness — does the borrower walk away knowing something they didn't?
- Next step — does the borrower know what to do after consuming the content?

### 3.2 Referral Partner Panel
**Lens:** A real estate agent, builder, financial planner, or other referral partner who could co-promote or share the content.

**Reviews for:**
- Realtor value — does it help their business?
- Shareability — would they put their name next to it?
- Credibility — does it make the LO look like a pro?
- Partnership tone — does it treat the agent as a peer, not a lead?
- Usefulness for their business — listings, buyer conversations, open houses, closings
- "Genericness" — does it sound like every other lender email, or does it sound like a real partner?

### 3.3 Compliance / Risk Panel
**Lens:** A mortgage compliance reviewer scanning for risk patterns.

**Flags for human review:**
- Rate claims (specific or implied)
- Payment claims (specific or implied)
- Fee claims (specific or implied)
- APR / cost-of-credit language without disclosures
- "Guaranteed approval" language
- "Free processing" or "no cost" claims
- Unsupported competitor claims
- Disparaging comparisons
- Confusing or misleading disclaimers
- Borrower PII (names, loan numbers, SSNs, account numbers, addresses)
- TERA Ally capability overclaims
- Anything that could require a written disclaimer

The Compliance Panel does **not approve** content. It flags items for a human marketing/compliance reviewer.

### 3.4 Marketing Performance Panel
**Lens:** A digital marketing strategist judging whether the content will actually perform.

**Reviews for:**
- Hook — does it grab attention in the first 2 seconds / first line / first frame?
- CTA — is the call to action specific, clear, and compelling?
- Platform fit — length, format, structure for the intended channel (Reel, Story, Post, Email, SMS, Flyer)
- Length — too long, too short, right
- Clarity — is the core message obvious?
- Emotional pull — does it create curiosity, empathy, urgency, or relief?
- Content usefulness — does it stand alone as something worth consuming?

### 3.5 LO Peer Panel
**Lens:** An experienced loan officer asking, "Would I actually use this?"

**Reviews for:**
- Real-world use — would a working LO actually say this on a call, in a text, in a DM?
- Conversation fit — does it match how real borrower / Realtor conversations sound?
- Pipeline value — would this help generate appointments, referrals, applications, or follow-up?
- Authenticity — does it sound like a human LO or like a corporate marketing department?
- Trust — would the LO put their face and name on it?

---

## 4. Per-Panel Output Structure

Every panel returns a structured report with the following fields:

| Field | Description |
|---|---|
| **Score (0–100)** | Quantitative rating against the panel's rubric |
| **Audience Reaction** | 2–4 sentence "in-character" reaction from the panel persona |
| **What Works** | Bullet list of specific strengths |
| **What Does Not Work** | Bullet list of specific weaknesses |
| **Risk Flags** | Compliance-style flags (severity High/Medium/Low) |
| **Rewrite Recommendation** | 1–3 sentence concrete suggestion for improvement |
| **Approval Status** | One of: `Ready for Internal Use`, `Needs Edits`, `Needs Human Review`, `Not Suitable` |

The unified panel report aggregates all per-panel outputs plus a composite score (see `LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md`).

---

## 5. OpenRouter / Model Strategy

The platform uses **OpenRouter** as the model gateway so that each panel can be routed to the most cost-effective model for its job.

### Principles
- **Low-cost / free OpenRouter models** for individual audience panels (Borrower, Referral Partner, Marketing Performance, LO Peer). These are simulated reactions and do not need frontier-model reasoning.
- **Stronger models** are reserved for:
  - Compliance / Risk panel (higher stakes, more nuance)
  - Final synthesis report (aggregating all panels into a coherent recommendation)
  - Complex or long-form content (full video scripts, multi-page assets)
- **Model routing is configurable** — every panel has a `model` setting in platform configuration. No hard-coded model names in v1 code.
- **Fallback chain** — if a configured model is unavailable or rate-limited, the system falls back to a configured secondary model and logs the fallback.

### What this means in practice
A typical run might use:
- Borrower / Referral Partner / Marketing / LO Peer panels: low-cost or free-tier OpenRouter models
- Compliance / Risk panel: a stronger reasoning model
- Final synthesis: optionally a stronger model, or skipped to keep cost down

All model selections are stored in platform config and can be tuned without code changes.

---

## 6. Where the Panel Lives in the Platform

The Audience Quality Panel is not a standalone product — it threads into existing LO Development Platform surfaces.

### Creator Network
- Runs when a post moves toward the **"Approved for External Adaptation"** status
- Panel report is attached to the post
- If any auto-block flag fires (PII, guaranteed approval), the status change is blocked pending Marketing Reviewer override

### AI Assistant Hub
- Available as a standalone **"Run Audience Panel"** tool
- LO pastes or uploads content, picks panels, gets a report
- Used for ad-hoc QA of content not yet in Creator Network

### Content Coach
- Runs a lightweight panel pass (Compliance + Borrower at minimum) **before** Content Coach delivers a draft to the user
- Drafts are always labeled "Draft only. Review before external use."
- If Compliance Panel returns a hard flag, the Content Coach output is held and the user is shown the flags first

See `LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md` for the full triggering logic.

---

## 7. What the Panel Does NOT Do

This list is restated here intentionally — it must remain visible in every product surface that exposes the panel.

The Audience Quality Panel does **not**:
- Approve content for external use
- Approve content for compliance, legal, or regulatory purposes
- Publish content to any platform
- Send content to borrowers, Realtors, referral partners, or any external audience
- Make rate, fee, APR, payment, or approval claims
- Certify content as compliant
- Replace human marketing, compliance, legal, or leadership review
- Generate disclosures or disclaimers as a substitute for legal-reviewed language

It is an internal QA helper. Humans make the call.

---

## 8. Implementation Phases

### Phase 1 — Manual Trigger (MVP)
- LO opens **"Run Audience Panel"** from AI Assistant Hub
- Pastes or uploads content
- Selects which panels to run (or `All Panels`)
- Receives unified panel report
- No auto-blocking. No status changes. Pure advisory.

### Phase 2 — Creator Network Auto-Trigger
- When a Creator Network post is moved toward **"Approved for External Adaptation"**, the panel runs automatically
- Marketing Reviewer must confirm after seeing the panel report before status completes
- Compliance auto-block flags (PII, guaranteed approval, etc.) block the status change until a Marketing Reviewer overrides

### Phase 3 — Content Coach Integration
- Content Coach runs Compliance + Borrower panels on every draft before delivery
- Draft is labeled "Draft only. Review before external use."
- Hard flags hold the draft until the LO sees the flag report

### Phase 4 — Team Quality Trends (Leaderboard)
- Aggregate panel scores by LO, team, and content type
- Team leaders see trends (improving / regressing)
- Internal-only. Not used for borrower-facing performance claims.
- No public-facing leaderboards. No content quality scores shown to borrowers, Realtors, or partners.

---

## 9. Related Documents

- `LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md` — Persona prompts for each panel
- `LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md` — Triggering, routing, and gating logic
- `LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md` — Scoring criteria and rubric details
- `LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md` — Hub surface that hosts the panel tool
- `LO_DEVELOPMENT_PLATFORM_VISION.md` — Overall platform vision

---

*This document is part of the Loan Factory LO Development Platform planning set. It does not describe LegendsOS, and no part of LegendsOS is affected by it.*
