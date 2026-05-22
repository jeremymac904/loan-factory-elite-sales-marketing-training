# Migration and Merge Plan

**Status:** Draft. Additive-only changes recommended until full TERA/Ally alignment.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21

This plan describes how to merge the new modules (AI Assistant Hub, 1+1=5 Team Growth Platform, Team Leader OS, Corporate Coach Hub, LO Support & Development Routing) into the existing repository — which already contains the Elite Sales & Marketing Training site AND the Apex Advisor build — without breaking anything that exists today.

---

## 1. Current repo state

The repo already contains both the Elite Sales & Marketing Training surfaces (101–601) AND the Apex Advisor build. From `src/app/`:

**Apex Advisor (built):**
- `apex-advisor/`
- `apex-advisor-track/`
- `apex-advisor-pro/`
- `apex-certifications/`
- `apex-calendar/`
- `apex-leaderboards/`
- `apex-mastermind/`
- `apex-launch-call/`
- `apex-member-area/`

**Elite Sales & Marketing Training (built):**
- `101-foundation/`
- `201-borrower-conversion/`
- `301-referral-partner-growth/`
- `401-content-and-marketing/`
- `501-pipeline-and-sales-systems/`
- `601-elite-execution/`
- `training-path/`
- `scripts/`
- `prompts/`
- `roleplays/`
- `tracker/`
- `recordings/`
- `audio-training/`

**Shared surfaces (built):**
- `page.tsx` (home)
- `recommended-channels/`
- `personality-workshop/`
- `login/`
- `brand-preview/`
- `coach-guide/` (partial reference)
- `team-leader-guide/` (partial reference)
- `compliance/`
- `paths/`

**Data (built):**
- `src/data/apex.ts`
- (and any other data files in `src/data/`)

**Docs (built):**
- `docs/apex-launch/`
- `docs/audio-transcripts/`
- `docs/handouts/`
- `docs/gamma/`
- Existing `docs/*.md` overview files

**Modified but uncommitted:**
- `README.md`
- `src/app/page.tsx`
- `src/app/recommended-channels/page.tsx`
- `src/components/SiteHeader.tsx`

---

## 2. What is new (to be added)

The five new modules to add to the platform shell:

1. **AI Assistant Hub** — `/ai-assistants` + sub-routes
2. **1+1=5 Team Growth Platform** — `/one-plus-one-five` + sub-routes
3. **Team Leader OS** — `/team-leader-os` + sub-routes
4. **Corporate Coach Hub** — `/corporate-coach-hub` + sub-routes
5. **LO Support & Development Routing** — embedded inside Team Leader OS and Coach Hub workflows; no new top-level route

Plus three unifying surfaces:

6. **Training Library hub** — `/training-library` + sub-routes (aggregates existing scripts / roleplays / trackers / audio)
7. **Sales Training hub** — `/sales-training` + `/sales-training/[level]` (aliases or alongside existing 101–601 top-level routes)
8. **Owner Preview** — `/owner-preview` (Jeremy-only prototype admin shell)

---

## 3. Migration principles

**Additive only.** Do not rename, move, or delete any existing route until the new structure is reviewed and approved. Existing top-level training routes (`/101-foundation` etc.) stay live; new `/sales-training/[level]` routes are added alongside them and link to the same content. Once approved, the originals can become redirects.

**One PR per module.** Each new module ships as a separate, reviewable change. No big-bang merge.

**No data migrations.** All new modules use static, typed config files in `src/data/`. No database changes, no schema migrations, no auth changes.

**Navigation changes are additive.** `SiteHeader.tsx` already has uncommitted modifications. Add new module entries to the existing nav structure; do not restructure existing entries.

---

## 4. Migration steps (sequenced)

**Step 1 — Inventory (no changes)**
- Confirm current routes by running `find src/app -type d -maxdepth 2 | sort`
- Confirm current data files by listing `src/data/`
- Confirm `tsc --noEmit` passes on the current branch before any new work
- Note: do NOT touch the four files currently modified-but-uncommitted (`README.md`, `src/app/page.tsx`, `src/app/recommended-channels/page.tsx`, `src/components/SiteHeader.tsx`) without confirming with Jeremy

**Step 2 — Scaffold new module landing pages (additive)**
- Create `src/app/ai-assistants/page.tsx`
- Create `src/app/one-plus-one-five/page.tsx`
- Create `src/app/team-leader-os/page.tsx`
- Create `src/app/corporate-coach-hub/page.tsx`
- Create `src/app/training-library/page.tsx`
- Create `src/app/sales-training/page.tsx`
- Create `src/app/owner-preview/page.tsx`
- Each page is a static landing with hero, module summary, and CTA pointing to sub-routes that don't yet exist (or to existing surfaces, e.g. `/sales-training` links to `/101-foundation` etc.)

**Step 3 — Scaffold sub-routes (additive)**
- `src/app/ai-assistants/coaching/page.tsx`, `sales/`, `marketing/`, `team-leader/`, `compliance/`, `prompt-library/`
- `src/app/one-plus-one-five/campaigns/`, `recruiting/`, `content-kits/`
- `src/app/team-leader-os/scorecards/`, `meetings/`, `new-lo-ramp/`, `recruiting/`
- `src/app/corporate-coach-hub/playbooks/`, `members/`, `sessions/`
- `src/app/training-library/audio/`, `scripts/`, `roleplays/`, `trackers/`, `flashcards/`
- `src/app/sales-training/101/`, `201/`, `301/`, `401/`, `501/`, `601/` (each links to or re-uses the existing top-level page content)

**Step 4 — Extend data layer (additive)**
- Add `src/data/aiAssistants.ts`, `src/data/onePlusOneFive.ts`, `src/data/teamLeaderOs.ts`, `src/data/corporateCoachHub.ts`, `src/data/trainingLibrary.ts`
- Each is a typed module config: title, description, sub-route catalog, CTA links, Drive links where applicable
- Do not modify `src/data/apex.ts` unless the change is strictly additive

**Step 5 — Update navigation (additive)**
- Open `src/components/SiteHeader.tsx` (already modified — coordinate with Jeremy first)
- Add new top-level entries to the nav: AI Assistants, 1+1=5, Team Leader OS, Coach Hub, Library
- Do NOT remove or rename existing nav entries
- Test mobile menu

**Step 6 — Update home page (coordinated)**
- `src/app/page.tsx` is already modified
- Coordinate with Jeremy before adding module tiles to the home page
- New module tiles should follow existing visual style (Loan Factory orange, dark charcoal)

**Step 7 — Build Owner Preview (additive)**
- `src/app/owner-preview/page.tsx` is a static admin dashboard listing every route, every module, and readiness status
- No links to it from public nav — Jeremy navigates manually
- Annotate clearly at the top of the page: "Prototype admin — not real auth. Do not share this URL."

**Step 8 — QA gate**
- Run `npx tsc --noEmit`
- Run lint
- Scan for banned terminology (ELO, MOSO, "free processing", "daily companywide training", "production guarantee", "Loan Factory API" as a public claim)
- Open every new route locally; confirm no console errors
- Mobile width check at 360px

**Step 9 — Write release-candidate notes**
- Author `docs/RELEASE_CANDIDATE_NOTES.md` summarizing what was added, what was not touched, and what reviewers should check

---

## 5. File and folder structure changes

New directories under `src/app/`:
```
ai-assistants/
ai-assistants/coaching/
ai-assistants/sales/
ai-assistants/marketing/
ai-assistants/team-leader/
ai-assistants/compliance/
ai-assistants/prompt-library/
one-plus-one-five/
one-plus-one-five/campaigns/
one-plus-one-five/recruiting/
one-plus-one-five/content-kits/
team-leader-os/
team-leader-os/scorecards/
team-leader-os/meetings/
team-leader-os/new-lo-ramp/
team-leader-os/recruiting/
corporate-coach-hub/
corporate-coach-hub/playbooks/
corporate-coach-hub/members/
corporate-coach-hub/sessions/
training-library/
training-library/audio/
training-library/scripts/
training-library/roleplays/
training-library/trackers/
training-library/flashcards/
sales-training/
sales-training/101/
sales-training/201/
sales-training/301/
sales-training/401/
sales-training/501/
sales-training/601/
calendar/
member-area/
owner-preview/
```

New files under `src/data/`:
```
aiAssistants.ts
onePlusOneFive.ts
teamLeaderOs.ts
corporateCoachHub.ts
trainingLibrary.ts
unifiedCalendar.ts
```

No deletions. No renames.

---

## 6. Navigation changes

The existing `SiteHeader.tsx` already has uncommitted modifications from the prior UI/UX pass. **Any further nav changes should be additive only:**

- Add new top-level entries for the 4–5 new modules and the Library hub
- Preserve existing entries unchanged
- Mobile menu: same additive principle
- Coordinate the actual edit with Jeremy because of the uncommitted state

Proposed final top-level nav order (subject to Jeremy's call):
1. Home
2. Sales Training
3. Apex Advisor
4. AI Assistants
5. 1+1=5
6. Team Leader OS
7. Coach Hub
8. Library
9. Calendar

Owner Preview is intentionally NOT in the public nav.

---

## 7. Risk areas

- **`SiteHeader.tsx` is already modified.** Any nav work risks colliding with Jeremy's in-progress edits. **Confirm before editing.**
- **`src/app/page.tsx` is already modified.** Same caution — home-page module tiles should be designed but not edited without coordination.
- **Existing top-level training routes (`/101-foundation`, etc.) cannot be removed yet.** They may be aliased to `/sales-training/101` later, but removal would break any external links and bookmarks.
- **Prompt library lives in `/prompts/` today.** Surfacing it under `/ai-assistants/prompt-library` should link or re-export — not duplicate or move content.
- **`coach-guide/` and `team-leader-guide/` already exist as partial pages.** They should be linked from the new Coach Hub and Team Leader OS landings, not deleted, until Edward and Andre confirm their final form.
- **No deletion of any file.** Per safety rules.

---

## 8. Master workspace migration note

**Final target workspace:**

`/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/loan-factory-product-starter-kit/apps/loan-factory-elite-sales-marketing-training/`

**Migration approach (when ready, not part of this plan's scope):**
- The repo is moved (or symlinked) into the Master Build Folder as one app inside the `loan-factory-product-starter-kit` monorepo
- The repo name may evolve to reflect the unified platform (e.g. `loan-factory-lo-development-platform`), pending Loan Factory leadership approval of the platform name
- Large media stays in Google Drive; only source code and small assets move
- This migration is a separate workstream — do not attempt during the new-module merge

---

## 9. What this plan does NOT do

- Does NOT introduce auth
- Does NOT introduce a database
- Does NOT introduce live AI calls
- Does NOT introduce payments
- Does NOT modify Apex Advisor functionality
- Does NOT modify the 101–601 curriculum content
- Does NOT push to GitHub
- Does NOT deploy
- Does NOT touch the four uncommitted-modified files without explicit coordination

See [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md) for the full exclusion list.
