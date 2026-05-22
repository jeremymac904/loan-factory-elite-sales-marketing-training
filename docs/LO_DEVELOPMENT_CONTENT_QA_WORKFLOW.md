# LO Development Platform — Content QA Workflow

> Triggering, routing, and gating logic for the Audience Quality Panel inside the LO Development Platform.
> Status: Planning document. Not built. Not deployed. Not LegendsOS.

---

## 1. When the QA panel runs

The Audience Quality Panel is invoked in three distinct ways:

### 1.1 Manual Trigger
- An LO (or other internal user) explicitly submits content for review
- Entry points:
  - **AI Assistant Hub → "Run Audience Panel"** tool
  - **Creator Network → "Run Panel"** button on any draft post
  - **Content Coach → "Re-run Panel"** option on any delivered draft
- LO selects which panels to run (or `All Panels`)
- Output is advisory only — no status changes happen automatically

### 1.2 Auto-Trigger (Creator Network)
- Fires when a Creator Network post's status is **moved toward `Approved for External Adaptation`**
- Runs **before** the status change completes
- A **Marketing Reviewer must confirm** after seeing the panel report before the status change is finalized
- If any auto-block flag fires (PII, guaranteed approval, etc.), the status change is **blocked** pending a Marketing Reviewer override

### 1.3 Content Coach Trigger (Always-On Lightweight Pass)
- Before Content Coach delivers any draft to the user, it runs a **lightweight panel check**:
  - **Compliance / Risk Panel** (always)
  - **Borrower / Consumer Panel** (always)
  - Other panels are optional and skipped by default to keep latency and cost down
- The draft is always returned with the label:
  > "Draft only. Review before external use."
- If the Compliance Panel returns a **hard flag**, the draft is **held** and the user is shown the flag report first (with the option to revise the prompt or override and accept the draft for internal-only use).

---

## 2. Input Types Supported

The QA workflow supports any text-based or text-extracted content produced inside the LO Development Platform, including:

- Text social posts (Facebook, Instagram, LinkedIn, X, Threads)
- Short-form **video scripts** (Reels, TikTok, Shorts)
- **Email drafts** (borrower, Realtor, partner)
- **SMS templates** (borrower, Realtor follow-up)
- **Social captions** (paired with image or video)
- **Realtor scripts** (cold outreach, listing presentations, follow-up)
- **Flyer copy** (open house, listing, rate-sheet, just-listed/just-sold)
- **Open house follow-up drafts** (borrower and Realtor versions)
- **Blog posts and long-form educational content**
- **Voicemail / phone scripts**

Future inputs (planned, not in MVP):
- Audio transcripts (LO calls reviewed for objection-handling QA)
- Image alt-text and on-image copy (extracted via OCR)

---

## 3. Workflow Steps

### Step 1 — Submission
User submits content + selects panels:
- `All Panels` (default)
- Custom subset (e.g., `Compliance` + `Borrower` only)
- Panel selection is remembered per content type as a personal default

### Step 2 — Independent Panel Runs
Each selected panel runs **independently** via OpenRouter:
- Each panel uses its own configured model (see `LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md`)
- Panels run in parallel when possible
- Per-panel fallback model is used if the primary is unavailable
- Each panel returns a structured JSON report

### Step 3 — Compilation
Results are compiled into a **unified panel report** with:
- Composite score (average of run panels)
- Per-panel score, reaction, strengths, weaknesses
- Aggregated risk flags (deduplicated and severity-sorted)
- Combined rewrite recommendation list
- Overall approval status (worst-of across panels)

### Step 4 — Display
Report is displayed to the user in the originating surface:
- Score bar per panel (color-coded by band — see `LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md`)
- Audience reaction quoted in each persona's voice
- Risk flags shown prominently with severity badges
- Rewrite recommendations as actionable bullet items
- Approval status per panel + composite

### Step 5 — User Decision
The user (LO or reviewer) decides:
- **Edit and re-run** the panel
- **Submit for human review** (routes to Marketing Reviewer queue)
- **Proceed with internal use** (logged but no external publishing)
- **Discard the draft**

No automatic external action ever occurs. The system never auto-publishes, auto-sends, or auto-approves.

---

## 4. Compliance Gate

The Compliance Gate sits at the Creator Network's `Approved for External Adaptation` status change.

### Gate rules
- If **Compliance / Risk Panel** returns `Needs Human Review` or `Not Suitable`, the status change is **blocked**
- The post stays in its previous status until either:
  - The content is edited and re-runs the panel with no blocking flags, **or**
  - A **Marketing Reviewer manually overrides** the gate with a reason logged
- The override is recorded in the panel run history (who, when, why)
- No LO can override their own Compliance gate. Override authority requires Marketing Reviewer role.

### Auto-Block Flags (Hard Blocks)
The following Compliance flags are **auto-block** — they always block status change and always require Marketing Reviewer override:
- `borrower_pii` (any borrower PII detected)
- `guaranteed_approval_language`
- `free_processing_claim`
- Any flag explicitly tagged `auto_block: true` by the Compliance Panel

---

## 5. Human Review Triggers (Automatic)

Any of the following conditions automatically route the panel report to the **Human Review Queue** for a Marketing Reviewer:

- Any **rate / fee / APR / payment claim** detected
- Any **guaranteed approval** language detected
- Any **competitor disparagement** detected
- Any **borrower PII** detected (auto-block + queue)
- Any **free processing / "no cost"** claim detected
- Any **TERA Ally capability overclaim** detected
- Composite score below **50** with at least one Medium-or-higher Compliance flag

The Marketing Reviewer queue is a separate internal surface (planned, not in MVP). Until that queue exists, human-review-flagged content surfaces as an in-platform notification to the Marketing Reviewer role.

---

## 6. Content Coach QA Integration

Content Coach is the most-used entry point in the platform, so it carries its own embedded QA flow:

- **Always runs:** Compliance / Risk Panel + Borrower / Consumer Panel before delivering a draft
- **Always labels** every delivered draft: `"Draft only. Review before external use."`
- **Hard flag behavior:** if Compliance returns an auto-block flag:
  - Draft is held
  - User is shown the flag report first
  - User can revise prompt OR explicitly accept the draft for internal-only inspection
- **Full Panel option:** users can opt to run the full 5-panel set on any Content Coach draft via "Run Full Panel"
- **No silent suppression:** Content Coach never strips or rewrites the LO's intent without telling them. If a draft can't be safely produced, it says so explicitly.

---

## 7. Data Logged

For every panel run, the platform logs (internal-only data):

| Field | Purpose |
|---|---|
| `panel_run_id` | Unique ID for the run |
| `content_snippet` | The content reviewed (PII-scrubbed before storage) |
| `content_type` | post / script / email / SMS / flyer / etc. |
| `panels_selected` | Which panels ran |
| `panel_scores` | Score per panel |
| `composite_score` | Average of panel scores |
| `risk_flags` | All flags raised |
| `approval_status_per_panel` | Status per panel |
| `composite_approval_status` | Worst-of across panels |
| `model_used_per_panel` | Which OpenRouter model was used |
| `fallback_used` | Whether fallback was triggered, and for which panel |
| `latency_per_panel` | Performance tracking |
| `cost_estimate_per_panel` | For internal cost monitoring |
| `user_id` | Internal user only — for trend analysis |
| `timestamp` | Run time |
| `gate_outcome` | If gated, the decision (allowed, blocked, overridden, override_reason) |

**PII handling:**
- Content snippets are scrubbed for borrower PII **before** storage
- Any flagged borrower PII is replaced with `[REDACTED]` in stored content
- Logs are internal-only and never exposed to borrowers, Realtors, partners, or any external party

---

## 8. What This System Does NOT Do

Restated here for the workflow doc — this list must remain visible in every product surface that exposes the panel.

- **No auto-approval.** Panel reports are advisory; humans approve.
- **No external publishing.** The QA workflow does not push content to any external channel.
- **No content sent to borrowers, Realtors, or partners** by this workflow.
- **No compliance certification.** The Compliance Panel flags risk; it does not certify compliance.
- **No legal review replacement.** Legal-reviewed disclaimers and disclosures remain authoritative.
- **No marketing approval replacement.** Marketing Reviewer role still owns final external-use approvals.
- **No regulatory claims** are made by panel output. The panel is a simulated audience reaction tool, not a compliance authority.

---

## 9. Related Documents

- `LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md` — Plan, scope, panel definitions
- `LO_DEVELOPMENT_MARKET_RESPONSE_PANEL_PERSONAS.md` — Persona prompts
- `LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md` — Scoring rubric
- `LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md` — Hub surface
- `LO_DEVELOPMENT_PLATFORM_VISION.md` — Overall platform vision
- `ROLE_ACCESS_MODEL.md` — Role definitions including Marketing Reviewer

---

*This document is part of the Loan Factory LO Development Platform planning set. It does not describe LegendsOS.*
