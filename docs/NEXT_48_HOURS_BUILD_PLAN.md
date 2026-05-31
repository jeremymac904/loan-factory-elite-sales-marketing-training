# Next 48 Hours — Build Plan

**Status:** Reviewable prototype, not production.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21
**Goal:** A locally reviewable version of the unified LO Development Platform within 48 working hours, with all 8 modules scaffolded and navigable.

This plan is sequenced by working-hour band. It is NOT 48 calendar hours of nonstop work. It is a 48-hour budget across Jeremy's working sessions. Safety rules apply throughout — no push, no deploy, no real auth, no live integrations, no large media in Git.

---

## Hour 0–2 — Inventory and baseline

- [ ] Read the current state: `find src/app -maxdepth 2 -type d | sort` and `ls src/data/`
- [ ] Confirm `npx tsc --noEmit` passes on `main`
- [ ] Confirm `npx next build` is NOT required and will NOT be run (per safety rules)
- [ ] Read `src/components/SiteHeader.tsx` and `src/app/page.tsx` — both have uncommitted modifications — to understand the diff before adding to them
- [ ] Note any module overlap between current LO Mastery pages and planned new pages
- [ ] Decide which uncommitted changes need to be committed first vs. carried forward

**Output:** Confirmed inventory + a clean baseline understanding.

---

## Hour 2–6 — Scaffold the four new module landing pages

Static pages, no data, no real interactivity. Each is a hero + module summary + sub-route teaser grid + CTA.

- [ ] `src/app/ai-assistants/page.tsx`
- [ ] `src/app/one-plus-one-five/page.tsx`
- [ ] `src/app/team-leader-os/page.tsx`
- [ ] `src/app/corporate-coach-hub/page.tsx`

Apply the existing visual shell (Loan Factory orange / dark charcoal). Reuse hero and card components from the LO Mastery pages where it makes sense — read-only reuse, do not modify LO Mastery components.

**Output:** Four new top-level routes load with cohesive premium styling.

---

## Hour 6–10 — Navigation and route testing

- [ ] Update `src/components/SiteHeader.tsx` ADDITIVELY — new top-level entries for: AI Assistants, 1+1=5, Team Leader OS, Coach Hub, Library
- [ ] Preserve every existing nav entry
- [ ] Mobile menu: same additive treatment
- [ ] Walk every route in dev: confirm no 404s, no console errors, no layout breakage at 360px / 768px / 1280px
- [ ] Confirm hero + footer alignment matches LO Mastery pages

**Output:** All new modules reachable from the top nav on desktop and mobile.

---

## Hour 10–16 — Training Library index

- [ ] Build `src/app/training-library/page.tsx` as the catalog index
- [ ] 3–5 placeholder content cards per category (Audio, Scripts, Roleplays, Trackers, Flashcards)
- [ ] Each card: title, type pill (Audio / Script / Roleplay / Tracker), 1-line description, source (Drive / In-repo), CTA button to existing surface where available
- [ ] Add `src/data/trainingLibrary.ts` with typed catalog entries
- [ ] Link Drive entries to the master Drive folder: `https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD`
- [ ] DO NOT embed large media in the repo

**Output:** A working Training Library index that shows the platform's breadth at a glance.

---

## Hour 16–24 — AI Assistants sub-pages

Static descriptions + CTAs. No live AI calls.

- [ ] `src/app/ai-assistants/coaching/page.tsx` — AI Coaching Assistant overview; reference the Gemini Gem AI Twin
- [ ] `src/app/ai-assistants/sales/page.tsx` — sales assistant
- [ ] `src/app/ai-assistants/marketing/page.tsx` — marketing assistant
- [ ] `src/app/ai-assistants/prompt-library/page.tsx` — reuse or link to existing `/prompts/` content; do not duplicate
- [ ] (Stretch) `src/app/ai-assistants/team-leader/page.tsx`
- [ ] (Stretch) `src/app/ai-assistants/compliance/page.tsx`
- [ ] Add `src/data/aiAssistants.ts` with the catalog
- [ ] Be careful with terminology: use "Gemini Gem AI Twin" and "AI Coaching Assistant" — never invented brand names

**Output:** AI Assistant Hub feels real even though nothing is live.

---

## Hour 24–32 — 1+1=5 and Team Leader OS sub-pages

- [ ] `src/app/one-plus-one-five/campaigns/page.tsx`
- [ ] `src/app/one-plus-one-five/recruiting/page.tsx`
- [ ] `src/app/one-plus-one-five/content-kits/page.tsx`
- [ ] `src/app/team-leader-os/scorecards/page.tsx`
- [ ] `src/app/team-leader-os/meetings/page.tsx`
- [ ] `src/app/team-leader-os/new-lo-ramp/page.tsx`
- [ ] `src/app/team-leader-os/recruiting/page.tsx`
- [ ] Add `src/data/onePlusOneFive.ts` and `src/data/teamLeaderOs.ts`
- [ ] Recruiting and marketing copy: add a small "Marketing review required — Victoria" badge on any public-facing or recruiting content

**Output:** Team leader experience is fully navigable and shows the depth of the offer.

---

## Hour 32–40 — Owner Preview admin dashboard

- [ ] `src/app/owner-preview/page.tsx` — Jeremy-only prototype admin shell
- [ ] No real auth. Add a banner at the top: "Prototype admin. Not real auth. Do not share this URL."
- [ ] Module status grid: 8 modules, color-coded by readiness (Built / In Progress / Planned / Needs Source Content) — reuse statuses from `LO_DEVELOPMENT_PLATFORM_MODULE_MAP.md`
- [ ] Link inventory: full list of routes with status indicators
- [ ] Placeholder team progress section: fake data clearly marked "Placeholder — not real"
- [ ] Do NOT link `/owner-preview` from the public nav

**Output:** Jeremy can run one URL and see the whole platform health at a glance.

---

## Hour 40–46 — QA pass

- [ ] `npx tsc --noEmit` — zero errors
- [ ] Lint — zero new errors
- [ ] Banned-word scan: grep for `ELO`, `MOSO`, `free processing`, `daily companywide`, `production guarantee`, `Loan Factory API`. Any hit must be reviewed and likely removed or rephrased
- [ ] Walk every route at 360px width on a real mobile-emulation viewport
- [ ] Color palette check: no blue, green, purple, or pastel anywhere
- [ ] Drive link check: every Drive link opens
- [ ] `git status` and `git diff --stat` — review what changed

**Output:** Prototype is clean and on-brand.

---

## Hour 46–48 — Release candidate notes and handoff

- [ ] Write `docs/RELEASE_CANDIDATE_NOTES.md` covering:
  - What was added (modules, routes, data files)
  - What was not touched (existing LO Mastery, existing 101–601 content)
  - Known limitations (no auth, no live AI, placeholder data)
  - Reviewer checklist (routes to walk, modules to evaluate)
  - Open items kicked back to stakeholders
- [ ] Send the notes to Jeremy for review (no auto-push, no auto-deploy)
- [ ] Do NOT push to GitHub
- [ ] Do NOT deploy to Netlify

**Output:** Jeremy can review locally, decide what to share with Andre / Edward / Victoria / TERA, and choose when to push or deploy.

---

## Out of scope for the 48-hour build

- Real authentication
- Database
- Live AI calls
- Payments
- Production deployment
- DNS / subdomain setup
- TERA integration
- Any feature listed in [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md)

---

## After the 48-hour prototype

If approved by Jeremy, next milestones (rough sequence — confirm with Andre and Edward):

1. Andre and Edward review the prototype
2. Victoria reviews marketing/recruiting copy
3. TERA/Ally team works through [`TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`](./TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md)
4. Loan Factory leadership approves platform name and subdomain
5. Production architecture lock document drafted
6. Production build begins (auth, database, integrations)

---

## Update: Creator Network + Audience Quality Panel (Pass 3)

**Immediate (today):**

- Scaffold a **static `/creator-network` landing page** — no auth, no real data, internal-only notice prominently displayed.
- Wire **Creator Network** into the main nav as **item #7** (between Training Library and Team Leader OS).

**Soon:**

- Review and commit the **23 untracked docs files** currently in git status — all planning docs from Passes 1–3 plus the Audience Quality Panel docs.

**Next sprint:**

- **Creator Network Phase 2** — Supabase-backed feed (`lo_profiles`, `creator_posts`, `creator_categories`).
- **Audience Quality Panel Phase 1** — manual trigger, all 5 panels, OpenRouter integration with configurable model routing.
