# LO Development Platform — Navigation Plan

**Status:** Draft for internal review.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21
**Companion docs:** [`LO_DEVELOPMENT_PLATFORM_VISION.md`](./LO_DEVELOPMENT_PLATFORM_VISION.md), [`UNIFIED_ROUTE_ARCHITECTURE.md`](./UNIFIED_ROUTE_ARCHITECTURE.md), [`LO_DEVELOPMENT_PLATFORM_MODULE_MAP.md`](./LO_DEVELOPMENT_PLATFORM_MODULE_MAP.md)

This document defines the navigation model for the unified Loan Factory LO Development Platform: how every module is reached, how every landing page is structured, and how the modules relate to each other so the user experiences one platform — not eight mini-sites.

---

## 1. Primary nav areas (in order)

The sticky top nav exposes 13 areas. Order matters — left-to-right is how an LO experiences priority and progression through the platform.

1. **Home** — `/`
2. **Apex Advisor** — `/apex-advisor`
3. **Elite Sales & Marketing** — `/sales-training`
4. **AI Training** — `/ai-training`
5. **1+1+1=5** — `/one-plus-one-five`
6. **Training Library** — `/training-library`
7. **Team Leader OS** — `/team-leader-os`
8. **Coach Hub** — `/corporate-coach-hub`
9. **AI Assistants** — `/ai-assistants`
10. **Calendar** — `/calendar`
11. **Trackers** — `/trackers`
12. **Resources** — `/resources` (Recommended Channels, Personality Workshop, brand assets)
13. **Support Routing** — `/support-routing`

---

## 2. Navigation model

**Shell:** Sticky top nav across every route on the platform. Loan Factory logo top-left, primary nav center, utility nav (Member Area, Owner Preview for Jeremy only) top-right.

**Dropdowns per section:** Each primary nav item is a button. Hover (desktop) or tap (mobile) opens a dropdown of that module's sub-routes. Dropdowns are keyboard-accessible and close on outside click.

**Mobile:** Hamburger menu top-right at <768px. The hamburger reveals an accordion of all 13 areas. Each area expands to show its sub-routes. Single-tap to navigate.

**Consistency:** The same SiteHeader renders on every route. No module has its own bespoke nav. No module hides the nav. The Footer is also consistent across all routes.

**Active state:** The current top-level nav item is highlighted in Loan Factory orange. The current sub-route (when in a dropdown) is highlighted with an orange left border.

**Performance:** Nav is server-rendered with the layout; no client-side fetching to render the menu.

---

## 3. Module landing page model

Every major section has a landing page that answers the same seven questions in the same order. This consistency means an LO who has visited one module landing knows how to read every other module landing.

Sections (top to bottom):

1. **What it does** — one-paragraph summary of the module's purpose
2. **Who it's for** — audience cards (LO, Team Leader, Coach, Admin, etc.)
3. **What tools/resources are inside** — feature/benefit grid
4. **What the LO can do there** — action-oriented bullets ("draft a campaign," "complete a roleplay," "review a scorecard")
5. **What content is available** — content catalog preview (cards or list)
6. **What's coming next** — roadmap teaser
7. **How it connects to the rest of the platform** — 2–3 cross-module callouts

A standardized React template renders this structure. See [`LO_DEVELOPMENT_MODULE_LANDING_PAGE_TEMPLATE.md`](./LO_DEVELOPMENT_MODULE_LANDING_PAGE_TEMPLATE.md).

---

## 4. Module relationship map

The platform is **one product** with eight modules. The modules link to each other constantly. This map shows the primary connections so the build never accidentally turns into separate silos.

```
                        Home (platform overview)
                                  |
   ----------------------------------------------------------------
   |              |             |             |              |
 Apex          Elite Sales   AI Training   1+1+1=5       Training
 Advisor       & Marketing                 Team Growth   Library
   |              |             |             |              |
   |              |             |             |              |
   +---- Training Library <----+-------------+--------------+
   |              |             |             |
   |              |             |             |
 Coach Hub <----- Coaching <--- AI Assistants ---> Team Leader OS
                  curriculum    (14 internal      (scorecards,
                  shared by     support tools)    meetings, ramp)
                  Apex + Elite
                                  |
                          Support Routing
                          (post-onboarding,
                           escalation,
                           feedback)
```

**Key relationships:**

- **Elite Sales & Marketing (101–601)** is the foundational curriculum. **Apex Advisor** is the paid coaching layer on top of it; many Apex modules link back into the corresponding 101–601 content. **AI Training** teaches LOs how to use the AI tools that show up across the rest of the platform.
- **1+1+1=5** is the team growth playbook. It links into **Team Leader OS** (the operating tools for team leaders) and into **AI Assistants** (specifically the 1+1+1=5 Growth Assistant and Referral Partner Assistant).
- **Training Library** is the unified content catalog. It surfaces content owned by Apex, Elite Sales & Marketing, AI Training, and 1+1+1=5 — without duplicating it.
- **Coach Hub** is the coach-facing surface. It pulls member progress from every module and feeds back into coaching sessions.
- **AI Assistants** (the hub of 14 internal support tools) is reachable from anywhere; specific assistants are deep-linked from the module they support (e.g., the Sales Coaching Assistant is linked from inside `/sales-training/201`).
- **Support Routing** is the connective tissue: post-onboarding check-ins, lender escalation paths, training academy routing, corporate coach routing, feedback/complaint routing. It is reachable from the top nav and is also embedded inside Team Leader OS and Coach Hub workflows.

The user never has to know about this map. They just experience one platform. The map exists so the build stays unified.

---

## 5. Proposed SiteHeader changes

The existing `src/components/SiteHeader.tsx` already has uncommitted modifications from prior UI/UX work. Changes here are **additive only**:

- Add new top-level entries for every nav area listed in Section 1
- Convert each top-level entry into a dropdown button (where it has sub-routes)
- Mobile menu becomes accordion-based (one row per area, tap to expand)
- No existing nav entry is removed or renamed
- Active state styling (Loan Factory orange) preserved

**Order of nav entries in SiteHeader (left to right):**

```
[Logo]  Home  Apex Advisor▾  Elite Sales & Marketing▾  AI Training▾  1+1+1=5▾  Training Library▾  Team Leader OS▾  Coach Hub▾  AI Assistants▾  Calendar  Trackers▾  Resources▾  Support Routing   [Member Area]  [Owner Preview*]
```

\* Owner Preview is only visible when an `?owner=jeremy` query param or local-storage flag is set — prototype only, never linked publicly.

If the nav becomes too crowded for the viewport, the rightmost items collapse into a "More ▾" overflow menu (Calendar / Trackers / Resources / Support Routing first to overflow).

---

## 6. Route-to-nav mapping

| Nav area | Top route | Sub-routes (dropdown) |
|----------|-----------|-----------------------|
| Home | `/` | — |
| Apex Advisor | `/apex-advisor` | `/apex-advisor-track`, `/apex-advisor-pro`, `/apex-certifications`, `/apex-calendar`, `/apex-leaderboards`, `/apex-mastermind`, `/apex-member-area` |
| Elite Sales & Marketing | `/sales-training` | `/sales-training/101`, `/201`, `/301`, `/401`, `/501`, `/601` |
| AI Training | `/ai-training` | `/ai-training/foundations`, `/prompt-techniques`, `/gemini-gem-ai-twin`, `/ai-coaching-assistant-walkthrough` |
| 1+1+1=5 | `/one-plus-one-five` | `/one-plus-one-five/campaigns`, `/recruiting`, `/content-kits`, `/realtor-partnerships` |
| Training Library | `/training-library` | `/training-library/audio`, `/scripts`, `/roleplays`, `/trackers`, `/flashcards`, `/quizzes`, `/pdfs` |
| Team Leader OS | `/team-leader-os` | `/team-leader-os/scorecards`, `/meetings`, `/new-lo-ramp`, `/recruiting` |
| Coach Hub | `/corporate-coach-hub` | `/corporate-coach-hub/playbooks`, `/members`, `/sessions` |
| AI Assistants | `/ai-assistants` | `/ai-assistants/marketing`, `/sales-coaching`, `/referral-partner`, `/borrower-conversation`, `/underwriting-support`, `/scenario-structuring`, `/tera-workflow-helper`, `/ai-training-coach`, `/content-repurposing`, `/team-leader`, `/compliance-risk-review`, `/apex-advisor-coach`, `/elite-sales-marketing-coach`, `/one-plus-one-five-growth` |
| Calendar | `/calendar` | — |
| Trackers | `/trackers` | `/trackers/pipeline`, `/production`, `/recruiting`, `/training-completion` |
| Resources | `/resources` | `/recommended-channels`, `/personality-workshop`, `/brand-preview` |
| Support Routing | `/support-routing` | — (single-page flowchart) |

**Notes:**

- Existing top-level training routes (`/101-foundation`, `/201-borrower-conversion`, etc.) remain live for backward compatibility. They are aliased to `/sales-training/[level]` later, per [`MIGRATION_AND_MERGE_PLAN.md`](./MIGRATION_AND_MERGE_PLAN.md).
- Existing top-level tool routes (`/scripts`, `/roleplays`, `/tracker`, `/audio-training`, `/recordings`, `/prompts`) remain live. They are surfaced inside `/training-library/*` and `/ai-assistants/prompt-library` as catalog entries — no duplication, just links.
- `/owner-preview` is intentionally NOT in the public nav.

---

## 7. Out of scope for this nav plan

- Real auth-driven nav visibility (production only)
- Personalized nav based on role (production only)
- In-nav search (future iteration)
- In-nav notifications (future iteration)

See [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md).

---

## Update: Creator Network Added to Nav (Pass 3)

- Creator Network is now the 7th item in the 14-area platform nav, between Training Library and Team Leader OS.
- Updated nav order: Home, Apex Advisor, Elite Sales & Marketing, AI Training, 1+1+1=5, Training Library, **Creator Network**, Team Leader OS, Coach Hub, AI Assistants, Calendar, Trackers, Resources, Support Routing.
- Creator Network nav dropdown: Feed, Post, Categories, Leaderboard.
- Creator Network routes:
  - `/creator-network`
  - `/creator-network/feed`
  - `/creator-network/create`
  - `/creator-network/categories`
  - `/creator-network/leaderboard`
  - `/creator-network/review-queue`

**Module relationship map update (Pass 3):**

Creator Network connects to:

- **Elite Sales & Marketing** — posts link to relevant 101–601 lessons; lesson examples can cite Creator Network posts.
- **Apex Advisor** — coaching wins surface as featured Creator Network posts; Apex members are heavy contributors.
- **Training Library** — top-performing internal posts are promoted into Training Library resources after review.
- **Team Leader OS** — engagement and contribution data feed into Team Leader OS scorecards.
- **AI Assistant Hub** — powers the Content Coach (Assistant #15) and the Audience Quality Panel internal QA tool.
- **Coach Hub** — featured/best posts surface inside Coach Hub for use in sessions and playbooks.
