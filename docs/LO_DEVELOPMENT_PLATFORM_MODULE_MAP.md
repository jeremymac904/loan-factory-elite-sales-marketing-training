# LO Development Platform — Module Map

**Status:** Draft for internal review.
**Last updated:** 2026-05-21
**Companion doc:** [`LO_DEVELOPMENT_PLATFORM_VISION.md`](./LO_DEVELOPMENT_PLATFORM_VISION.md)

This map shows the eight modules that compose the Loan Factory LO Development Platform, their current source surface, their future route under the unified platform, and a readiness status.

**Readiness key:**
- **Built** — exists in the current repo and is functional today
- **In Progress** — partially built, missing content or polish
- **Planned** — designed but not yet scaffolded
- **Needs Source Content** — scaffolded UI possible, but source material from Andre, Edward, or stakeholders is required before launch

---

## Module map

| Module | Audience | Purpose | Current Source | Future Route | Readiness Status |
|--------|----------|---------|----------------|--------------|------------------|
| **LO Mastery** | Paid coaching subscribers (Tier 1 $249/mo, Tier 2 $449/mo) | Power Hour, Breakfast Club, certifications, leaderboards, trackers, member area, mastermind, summit — the paid coaching layer on top of the 101–601 curriculum | `src/app/coaching/`, `src/app/sales-training/`, `src/app/loan-factory-alliance/`, `src/app/member-area/certifications/`, `src/app/member-area/calendar/`, `src/app/member-area/leaderboards/`, `src/app/member-area/mastermind/`, `src/app/support-routing/#corporate-coaches/`, `src/app/member-area/`, `src/data/coaching.ts` | `/coaching` (hub) plus `/sales-training`, `/loan-factory-alliance`, `/member-area/certifications`, `/member-area/calendar`, `/member-area/leaderboards`, `/member-area/mastermind`, `/member-area` | **Built** |
| **Sales and Marketing 101-601** | All Loan Factory LOs | The 101–601 curriculum: beginner, intermediate, advanced. Scripts, prompts, roleplays, trackers, recordings, audio briefs | `src/app/101-foundation/`, `src/app/201-borrower-conversion/`, `src/app/301-referral-partner-growth/`, `src/app/401-content-and-marketing/`, `src/app/501-pipeline-and-sales-systems/`, `src/app/601-elite-execution/`, `src/app/scripts/`, `src/app/prompts/`, `src/app/roleplays/`, `src/app/tracker/`, `src/app/recordings/`, `src/app/audio-training/`, `src/app/training-path/` | `/sales-training` (hub) plus `/sales-training/101` through `/sales-training/601` | **Built** (routes will be aliased/redirected from existing top-level paths) |
| **AI Assistant Hub** | All LOs, team leaders, coaches | Gemini Gem AI Twin, AI Coaching Assistant, plus sales / marketing / team leader / compliance precheck assistants and prompt library | `src/app/ai-coaching-assistant/` (partial), `src/app/prompts/`, scattered Gemini Gem materials | `/ai-assistants` (hub) plus `/ai-assistants/coaching`, `/sales`, `/marketing`, `/team-leader`, `/compliance`, `/prompt-library` | **In Progress** |
| **1+1=5 Team Growth Platform** | Team leaders | Team leader marketing, recruiting support, co-branded campaigns, Realtor partner marketing, team growth systems, content kits | Not yet scaffolded; source material lives in Google Drive and Jeremy's working notes | `/one-plus-one-five` (hub) plus `/campaigns`, `/recruiting`, `/content-kits` | **Planned** |
| **Training Library** | All LOs | Searchable catalog of recordings, scripts, roleplays, trackers, flashcards, quizzes, PDFs, Google Docs, slide decks, audio, NotebookLM outputs | Google Drive (master folder), `docs/audio-transcripts/`, `docs/handouts/`, `src/app/scripts/`, `src/app/roleplays/`, `src/app/tracker/`, `src/app/recordings/`, `src/app/audio-training/` | `/training-library` (hub) plus `/audio`, `/scripts`, `/roleplays`, `/trackers`, `/flashcards` | **In Progress** — scaffolded surfaces exist but a unified index is not yet built |
| **Team Leader OS** | Team leaders, Andre, leadership | Scorecards, meeting templates, weekly 1:1s, new LO ramp plans, recruiting tracker, training completion tracking, escalation map | `src/app/team-leader-guide/` (partial reference doc only) | `/team-leader-os` (hub) plus `/scorecards`, `/meetings`, `/new-lo-ramp`, `/recruiting` | **Planned** |
| **Corporate Coach Hub** | Corporate coaches, Edward | Coach playbooks, coaching notes, member progress, call agendas, certification reviews, accountability support | `src/app/coach-guide/` (partial reference doc only) | `/corporate-coach-hub` (hub) plus `/playbooks`, `/members`, `/sessions` | **Planned** (needs Edward's scope confirmation — see [`OPEN_DECISIONS.md`](./OPEN_DECISIONS.md)) |
| **LO Support & Development Routing** | LO Development team (Andre, Tara, Kevin, Benjamin), corporate coaches | Post-onboarding check-ins, lender escalation workflows, support routing, training academy routing, corporate coach routing, feedback/complaint routing | Not yet scaffolded | Embedded inside `/team-leader-os` and `/corporate-coach-hub` workflows; no dedicated top-level route (routing tools live where the routing happens) | **Needs Source Content** — routing playbook from Andre |

---

## Cross-module surfaces (shared, not a module)

These exist across modules and are not standalone modules:

| Surface | Purpose | Current Source | Future Route |
|---------|---------|----------------|--------------|
| Calendar | Unified events: Power Hour, Breakfast Club, training sessions, coaching calls, summit | `src/app/member-area/calendar/` (LO Mastery-only today) | `/calendar` (unified) and `/member-area/calendar` (LO Mastery-only sub-view) |
| Member Area | Gated home for all authenticated LOs (prototype: open) | `src/app/member-area/` (LO Mastery-only today) | `/member-area` (all LOs) and `/member-area` (LO Mastery tier) |
| Recommended Channels | Curated industry channels and learning resources | `src/app/recommended-channels/` | `/recommended-channels` |
| Personality Workshop | Self-assessment workshop | `src/app/personality-workshop/` | `/personality-workshop` |
| Owner Preview | Jeremy-only admin/preview dashboard for prototype | Not yet scaffolded | `/owner-preview` (prototype — no real auth, security through obscurity only) |

---

## Module readiness summary

- **Built (2):** LO Mastery, Sales and Marketing 101-601
- **In Progress (2):** AI Assistant Hub, Training Library
- **Planned (3):** 1+1=5 Team Growth Platform, Team Leader OS, Corporate Coach Hub
- **Needs Source Content (1):** LO Support & Development Routing

Next 48 hours: scaffold static landing pages for the four Planned / Needs Source Content modules so the full platform shape is reviewable. See [`NEXT_48_HOURS_BUILD_PLAN.md`](./NEXT_48_HOURS_BUILD_PLAN.md).
