# LO Development Platform — AI Panel Scoring Rubric

> Scoring rubric and rewrite/flag formats for the Audience Quality Panel.
> Status: Planning document. Not built. Not deployed. Not LegendsOS.

---

## 1. Score Range

All scores are **0–100** per panel.

The composite score is the **average of all panels run** (or the panels the user selected). Composite scores are advisory and never used as the sole basis for any external-use decision.

---

## 2. Score Bands

| Band | Range | Meaning |
|---|---|---|
| **Ready for Internal Use** | 85–100 | Strong content. Minor edits optional. Safe for internal review and adaptation. |
| **Needs Edits** | 70–84 | Clear issues identified. Rewrite recommended before moving forward. |
| **Needs Human Review** | 50–69 | Multiple flags. Not ready for wider distribution. Marketing Reviewer should review before any external adaptation. |
| **Not Suitable** | 0–49 | Significant problems. Do not use in current form. Rewrite from scratch or discard. |

Band labels are surfaced in the UI alongside a color cue (green / yellow / orange / red — exact tokens defined in design system, not this doc).

A panel's `approval_status` is derived directly from its score band, **unless** the panel's own logic overrides it. For example, the Compliance Panel can set `approval_status: "Not Suitable"` regardless of score if an auto-block flag fires.

---

## 3. Per-Panel Scoring Criteria

### 3.1 Borrower / Consumer Panel (100 pts)

| Criterion | Points |
|---|---|
| Clarity (could a borrower with no mortgage background follow it?) | 25 |
| Trust and warmth (does it feel honest, helpful, safe?) | 20 |
| Absence of confusing jargon | 20 |
| Absence of high-pressure / pushy language | 15 |
| Usefulness / actionability (does the borrower learn something useful?) | 10 |
| Clear next step (does the borrower know what to do?) | 10 |
| **Total** | **100** |

### 3.2 Referral Partner Panel (100 pts)

| Criterion | Points |
|---|---|
| Realtor value (does it help their business?) | 25 |
| Shareability (would they put their name next to it?) | 20 |
| Credibility and professionalism | 20 |
| Partnership tone (peer, not lead) | 15 |
| Business usefulness (listings, buyers, open houses, closings) | 15 |
| Non-generic feel | 5 |
| **Total** | **100** |

### 3.3 Compliance / Risk Panel (Flag-Based Scoring)

The Compliance Panel uses a **flag-based** scoring model rather than weighted criteria.

**Flag types:**
- Rate / fee / APR / payment claim — flag
- Guaranteed approval language — flag (**auto-block**)
- Free processing / "no cost" claim — flag (**auto-block**)
- Unsupported competitor claim or disparagement — flag
- Borrower PII — flag (**auto-block**)
- TERA Ally capability overclaim — flag
- Confusing or misleading disclaimer — flag
- Anything requiring a disclosure to be compliant — flag

**Scoring:**
- 0 flags → **100 pts**
- Each flag → **−20 pts** (minimum 0)
- Any **auto-block** flag (PII, guaranteed approval, free processing) → **score = 0**, workflow gated, override required

**Approval status:**
- 0 flags and no auto-block → `Ready for Internal Use`
- 1 flag and no auto-block → `Needs Edits`
- 2+ flags and no auto-block → `Needs Human Review`
- Any auto-block flag → `Not Suitable` (workflow blocked, Marketing Reviewer override required)

### 3.4 Marketing Performance Panel (100 pts)

| Criterion | Points |
|---|---|
| Hook strength (first 2 seconds / first line / first frame) | 25 |
| CTA clarity and strength | 20 |
| Platform fit (length, format for the intended channel) | 15 |
| Emotional pull | 20 |
| Overall clarity | 10 |
| Content usefulness | 10 |
| **Total** | **100** |

### 3.5 LO Peer Panel (100 pts)

| Criterion | Points |
|---|---|
| Would I actually use this in a real conversation? | 30 |
| Does it fit how LOs actually talk? | 25 |
| Would it help me get an appointment or referral? | 25 |
| Authenticity (does it sound like a human LO, not a corporate marketer?) | 20 |
| **Total** | **100** |

---

## 4. Composite Score

Composite score = **average of the scores of all panels that ran**.

- If only a subset of panels ran (e.g., Compliance + Borrower only), the composite is computed only across those panels.
- The composite is shown alongside per-panel scores, never instead of them.
- The composite **never** overrides a Compliance auto-block. If Compliance fires an auto-block flag, the workflow is gated regardless of how high the composite is.

Composite approval status is the **worst-of** across panels, with this priority order (highest priority first):
1. `Not Suitable`
2. `Needs Human Review`
3. `Needs Edits`
4. `Ready for Internal Use`

---

## 5. Rewrite Recommendation Format

Every panel that returns `Needs Edits`, `Needs Human Review`, or `Not Suitable` must include at least one rewrite recommendation. Format:

```
<Panel Name> → <Issue Identified> → <Specific Rewrite Suggestion (1–3 sentences)>
```

**Example:**
```
Borrower / Consumer Panel
→ The phrase "we'll get you locked in fast" feels pushy and unclear.
→ Rewrite as: "When you're ready, I can walk you through how a rate lock works
   and help you decide if it's the right time for you."
```

The unified panel report aggregates all rewrite recommendations into a single deduplicated list, sorted by severity and panel.

---

## 6. Risk Flags Format

Every flag returned by any panel uses this structure:

```json
{
  "type": "<flag_type>",
  "severity": "High" | "Medium" | "Low",
  "human_review_required": true | false,
  "quoted_text": "<exact snippet from content, when applicable>",
  "explanation": "<1-2 sentence reason this was flagged>"
}
```

**Severity guidance:**
- **High** → blocks `Approved for External Adaptation`. Always requires human review. Always logged.
- **Medium** → recommended human review. Does not auto-block, but the Marketing Reviewer is notified.
- **Low** → advisory only. LO can address inline. No human review required.

**`human_review_required: true`** automatically routes the panel report to the Marketing Reviewer queue (see `LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md` §5).

---

## 7. Model Routing Note

Each panel call uses a **configurable OpenRouter model**. The rubric in this document is independent of the model used — the same scoring criteria apply regardless of whether the panel is running on a low-cost or a frontier model.

Guidance:
- **Low-cost OpenRouter models** for individual audience panels (Borrower, Referral Partner, Marketing Performance, LO Peer)
- **Stronger OpenRouter models** optional for:
  - Compliance / Risk panel
  - Final synthesis / composite report generation
- **No hard-coded model names in v1 code.** Model identifiers live in platform configuration.
- A fallback model is configured per panel in case the primary is unavailable or rate-limited.

This decoupling lets the team tune cost vs. quality per panel without touching code, and avoids vendor lock-in to any specific model name as the OpenRouter catalog changes.

---

## 8. Related Documents

- `LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md` — Plan, scope, panel definitions
- `LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md` — Persona prompts
- `LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md` — Triggering and gating logic

---

*This document is part of the Loan Factory LO Development Platform planning set. It does not describe LegendsOS.*
