# LO Development Platform — Next Build Plan

**Status:** Active. Supersedes [`NEXT_48_HOURS_BUILD_PLAN.md`](./NEXT_48_HOURS_BUILD_PLAN.md).
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21
**Companion docs:** [`LO_DEVELOPMENT_PLATFORM_VISION.md`](./LO_DEVELOPMENT_PLATFORM_VISION.md), [`LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md`](./LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md), [`LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md`](./LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md), [`LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md`](./LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md), [`LO_DEVELOPMENT_MODULE_LANDING_PAGE_TEMPLATE.md`](./LO_DEVELOPMENT_MODULE_LANDING_PAGE_TEMPLATE.md), [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md)

This plan prepares the current Elite Sales & Marketing Training site (which already includes the Apex Advisor build) to become the full unified **Loan Factory LO Development Platform**. It supersedes the prior 48-hour plan because the scope is now bigger and phased: shell first, then content, then prototype polish, then production-prep after TERA/Ally alignment.

**Safety rules apply throughout:** no push, no deploy, no real auth, no live AI, no payments, no TERA integration, no public claims that violate the terminology rules. See [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md).

---

## Phase 1 — Platform Shell

**Goal:** Stand up the unified shell so every module is reachable, on-brand, and visually consistent. No content depth required yet. Can start immediately with no external approvals.

1. **Extend `SiteHeader.tsx` with all 13 nav areas.** Additive only — preserve every existing entry. Order per [`LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md`](./LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md): Home, Apex Advisor, Elite Sales & Marketing, AI Training, 1+1+1=5, Training Library, Team Leader OS, Coach Hub, AI Assistants, Calendar, Trackers, Resources, Support Routing. Coordinate with Jeremy first because SiteHeader has uncommitted changes.
2. **Build shared components.** `ModuleBanner`, `ModuleCard`, `AssistantCard`, `AudienceCard`, `FeatureGrid`, `ContentListCard`, `CrossModuleCallout`, `ComingNextTimeline`, `CTAFooterBlock`. Drop into `src/components/`. Match the brand unification plan.
3. **Build the four not-yet-built module landing pages** using the module landing page template:
   - `src/app/ai-training/page.tsx`
   - `src/app/one-plus-one-five/page.tsx`
   - `src/app/team-leader-os/page.tsx`
   - `src/app/corporate-coach-hub/page.tsx`
4. **Build `/ai-assistants` hub page.** Render all 14 assistants using `AssistantCard`. Static only — no live AI wiring. Each card links to a sub-page with the assistant's full description (Phase 2 populates these).
5. **Build `/training-library` hub page.** Category cards: Audio, Scripts, Roleplays, Trackers, Flashcards, Quizzes, PDFs. Each card links to the corresponding sub-route.
6. **Build `/support-routing` page.** Static visual routing flowchart: post-onboarding → check-in → escalation/coach/training academy/feedback paths. No live routing.
7. **Update `/recommended-channels`** to match the unified platform style. Use shared components. Note: this file has uncommitted modifications — coordinate with Jeremy first.
8. **Update homepage `/`** to show all modules as a platform overview using `ModuleCard`. Note: this file has uncommitted modifications — coordinate with Jeremy first.

**Phase 1 exit criteria:**
- Every nav area resolves to a real page
- Every page renders with the unified shell, palette, and typography
- `npx tsc --noEmit` passes
- Mobile width 360px looks correct on every new page

---

## Phase 2 — Content Population

**Goal:** Fill the platform with real content depth. Requires Jeremy's input on copy and Victoria's review for any public-facing or recruiting content.

9. **Populate `/training-library`** with real content cards linking to Google Drive assets. Use the Drive master folder: <https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD>. Each card includes title, type pill, source label, CTA.
10. **Populate `/ai-assistants` sub-pages** with the full assistant descriptions from [`LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md`](./LO_DEVELOPMENT_AI_ASSISTANT_HUB_PLAN.md). Show audience, use cases, source materials, output type, guardrails, platform-wide guardrails. Still static — no live AI.
11. **Build `/trackers` hub** with category list: Pipeline, Production, Recruiting, Training Completion. Each sub-route static for now.
12. **Build `/calendar`** with event types (Power Hour, Breakfast Club, Mastermind, training sessions, coaching calls, summit) and placeholder dates. Static only.
13. **Populate each module landing page** with real feature/benefit copy, audience copy, content lists, cross-module callouts, and coming-next items. Tagline + tone per [`LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md`](./LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md). Mark all marketing/recruiting copy "Marketing review required — Victoria."

**Phase 2 exit criteria:**
- No "Lorem ipsum" or empty cards anywhere
- Every public-facing/recruiting block flagged for Victoria's review
- Drive links open from every Training Library card
- Banned-word scan passes (`ELO`, `MOSO`, "free processing," "daily companywide training," "production guarantee," "open API," "Loan Factory API" as a public claim, any rate/APR/fee number)

---

## Phase 3 — Prototype Polish

**Goal:** Make the prototype shareable with Andre, Edward, and Thuan. Still no push, no deploy.

14. **Build `/owner-preview`** admin shell. Static. No real auth. Banner at top: "Prototype admin. Not real auth. Do not share this URL." Includes:
   - Module status grid (8 modules, color-coded by readiness)
   - Full link inventory (every route, status indicator)
   - Placeholder team progress section clearly marked "Placeholder — not real"
15. **QA pass.**
   - `npx tsc --noEmit` — zero errors
   - Lint — zero new errors
   - Banned-word scan (full list above)
   - Walk every route in dev at 360px, 768px, 1280px
   - Color palette check — no off-palette anywhere
   - Drive link check — every link opens
   - Keyboard accessibility — focus visible, tab order sane
16. **Mobile QA** on every new page. Real device or accurate emulator at 360px.
17. **Write `RELEASE_CANDIDATE_NOTES.md`** covering: what was added, what was not touched, known limitations (no auth, no live AI, placeholder data), reviewer checklist, open items kicked back to stakeholders.

**Phase 3 exit criteria:**
- Owner Preview tells the full story in one page
- Banned-word scan clean
- Release candidate notes ready for Jeremy review
- No push, no deploy

---

## Phase 4 — TERA/Ally Alignment

**Goal:** Move from prototype to production-prep. Requires TERA/Ally team input and Loan Factory leadership approvals.

18. **Share [`TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`](./TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md)** with the TERA/Ally team.
19. **Await answers** on SSO, hosting, DNS, database, integration method, AI provider governance, asset storage long-term, CI/CD, observability, security review requirements.
20. **Plan auth, database, and real AI wiring** after alignment decisions. Author the production architecture lock document. Begin Phase 5 only after this is approved by Jeremy + Andre + (where relevant) Loan Factory leadership.

**Phase 4 exit criteria:**
- All seven highest-priority TERA/Ally questions answered
- Loan Factory leadership has approved the platform name and subdomain
- Production architecture lock document drafted and approved

---

## Phase 5 (out of scope for this plan)

After Phase 4 sign-off: real auth, real database, live AI wiring with source-grounded system prompts and draft-only outputs, human-review routing, real calendar integration, real Trackers, eventual deploy to `lodevelopment.loanfactory.com`. Not part of this plan.

---

## What NOT to build yet (reminder)

- Real auth (no Supabase Auth, no Cognito, no OAuth, no SSO)
- Payments (no Stripe, no checkout, no subscription management)
- TERA integration (no API calls, no LO data sync)
- Real database migrations (typed data files only)
- Live AI chat (static descriptions only in prototype)
- Automated emails (no transactional or marketing email)
- Public deployment to `lodevelopment.loanfactory.com`
- Recruiting pages without Victoria's review
- Public claims that violate terminology rules

Full list: [`DO_NOT_BUILD_YET.md`](./DO_NOT_BUILD_YET.md).

---

## Risk areas

- **`SiteHeader.tsx`** is already modified. Coordinate with Jeremy before extending.
- **`src/app/page.tsx`** is already modified. Coordinate before adding module tiles.
- **`src/app/recommended-channels/page.tsx`** is already modified. Coordinate before styling unification pass.
- **`README.md`** is already modified. Leave alone until Jeremy reviews.
- **Existing top-level training routes** (`/101-foundation`, etc.) cannot be removed yet. Add `/sales-training/[level]` alongside, redirect later per the migration plan.
- **Existing prompt routes** (`/prompts`) — surface inside `/ai-assistants/prompt-library` as links; do not duplicate content.

---

## Stakeholder communication after each phase

- **End of Phase 1:** Quick demo to Jeremy. Decision: proceed to Phase 2 or iterate.
- **End of Phase 2:** Demo to Jeremy + Victoria review request for public-facing copy.
- **End of Phase 3:** Share prototype URL (local or Netlify preview at Jeremy's discretion) with Andre, Edward, Thuan. Collect feedback.
- **End of Phase 4:** Production architecture lock review with TERA/Ally team and Loan Factory leadership.

---

## Update: Creator Network + Audience Quality Panel (Pass 3)

The Creator Network module and the Audience Quality Panel internal QA tool are now part of the build plan. They are phased into the existing four-phase plan rather than added as separate phases.

**Phase 1 addition:**

- Scaffold a **static `/creator-network` landing page** — no auth, no real data, no Supabase wiring. Internal-only notice must be prominently displayed.
- Add **Creator Network** to the main SiteHeader nav as item #7 (between Training Library and Team Leader OS). See [`LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md`](./LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md) Pass 3 update.

**Phase 2 addition:**

- Creator Network post creation + feed wired to Supabase, using the tables in [`LO_DEVELOPMENT_CREATOR_NETWORK_DATA_MODEL.md`](./LO_DEVELOPMENT_CREATOR_NETWORK_DATA_MODEL.md): `lo_profiles`, `creator_posts`, `creator_categories` (plus supporting tables).
- Role-aware access per [`LO_DEVELOPMENT_CREATOR_NETWORK_ACCESS_MODEL.md`](./LO_DEVELOPMENT_CREATOR_NETWORK_ACCESS_MODEL.md). Employee-only. No public access.

**Phase 3 addition:**

- Moderation queue, featured posts, compliance flagging.
- "Flagged for Review" workflow per [`LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md`](./LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md).

**Phase 4 additions:**

- **Content Coach** AI assistant integration (Assistant #15 in the AI Assistant Hub).
- **Audience Quality Panel** wired to OpenRouter — all 5 panels configurable.
- **Panel model routing is configurable.** Low-cost models for the individual panels, with a stronger model optional for synthesis. **No hard-coded model names** in code — routed through a configuration surface so panels can be retuned without redeploys.
