# Loan Factory LO Development Platform — Feature Audit (read-only)

Power Agent 4 — Mission 5. HEAD `d31809e`. Read-only inspection of real code/routes.
Every row is grounded in a file that was opened during this audit. Where a name in
the brief did not exactly match a real route, the actual route is given.

Conventions used below:
- **draft-only** = produces editable text + copy/save-local only; never sends.
- **live** = reads/writes real Supabase rows or performs a real network action.
- **static** = renders curated/manifest/sample data only; no write path.

Forward note on assistants: the brief states a **universal assistant (PA3)** is
being added this sprint. As of the audited HEAD the ONLY shipped slide-out
assistant is `CoachAssistantPanel` (mounted in the coach-command-center layout).
There is no `src/components/assistant/` directory and no generic
`AssistantPanel`/`AssistantLauncher` at this HEAD. All "X assistant" rows below
that are not the coach assistant are therefore marked accordingly with a forward
note: PA3 introduces the universal assistant; today they are either (a) the coach
assistant only, (b) the separate `/ai-assistants` AI-twin product, or (c) not a
present surface.

## Feature matrix

| Feature | Exists | Role visibility | Draft-only or live | Data source | Known limitation | Next action |
|---|---|---|---|---|---|---|
| Coach assistant | yes | Coach Command Center scope (master_admin, admin, lo_development_lead/member, training_academy, corporate_coach[_supervisor], lo_mastery_coach, loan_factory_alliance_coach, coaching_director, team_leader); View-As aware via `getCoachAccess` | draft-only (localStorage key `loan-factory-coach-assistant-drafts`; copy + save-local; integration actions labeled "Integration required before this can actually send") | `src/data/coachCommandCenter.ts` (`coachAssistantActions`, `buildCoachAssistantDraft`, `peopleForScope`) over **sample** `assignedPeople` | Roster is sample data, not live; drafts never persist to DB; calendar/Gmail/Chat actions only emit draft text | PA3: fold into the universal assistant or keep as the coach-scoped instance; wire roster to live coaching tables later |
| LO assistant | partial | n/a as a distinct surface at this HEAD | n/a | — | No dedicated "LO assistant" slide-out exists yet. Closest current surfaces: the AI-twin product at `/ai-assistants` and `/member-area/ai-assistant`. Coach assistant is coach-scoped, not LO-scoped | PA3: add LO-scoped instance of the universal assistant |
| Admin assistant | partial | n/a as a distinct surface | n/a | — | No admin-scoped assistant slide-out at this HEAD. Admin console (`AdminConsole.tsx`) exists but has no assistant | PA3: add admin-scoped instance of the universal assistant |
| LO Development assistant | partial | LO Development already enters Coach Command Center (scope `lo_development`), so it gets the **coach** assistant today | draft-only (same as coach assistant) | `coachCommandCenter.ts` | No LO-Development-specific assistant variant; uses the generic coach assistant | PA3: LO-Development context for the universal assistant |
| Training Academy assistant | partial | `training_academy` role enters Coach Command Center (scope `lo_development`) → gets coach assistant | draft-only | `coachCommandCenter.ts` | No Training-Academy-specific assistant variant | PA3: Training-Academy context for the universal assistant |
| Loan Officer Support assistant | no | `/loan-officer-support` is a role-gated dashboard (`RoleGate gate="loan-officer-support"` + `RoleDashboardPage`), no assistant mounted | n/a | `src/data/roleDashboards.ts` | No assistant on this surface | PA3: mount universal assistant with support context |
| Marketing assistant | partial | `/marketing` (8 lines) renders `RoleDashboardPage` from `getRoleDashboard("marketing")` — a role dashboard, not an assistant. No marketing draft-studio components were found at this HEAD | n/a (dashboard only) | `src/components/RoleDashboardPage.tsx` + `src/data/roleDashboards.ts` | No marketing assistant and no `EmailDraftStudio`/`CalendarDraftStudio`/`SocialDraftStudio` components exist at HEAD d31809e (corrected from an earlier hedge); marketing is a curated dashboard | PA3: add marketing context to the universal assistant |
| Communication Center | yes | Coach Command Center scope; View-As aware | draft-only (composer creates local drafts; banner: "No Gmail, Google Chat, n8n, Zapier, or outbound send is triggered") | `src/app/coach-command-center/messages/page.tsx` + `MessageWorkspace` + `messageTemplates`/`communicationWorkflows` in `coachCommandCenter.ts` | Drafts local only; "Open FaceGram" is the only real destination link | Keep draft-only; wire approved send path later behind approval |
| Email Center draft workflow | yes | Coach Command Center scope | draft-only (`EmailWorkspace`; copy then send yourself from Gmail; page states live Gmail draft creation "is not implemented yet") | `src/app/coach-command-center/email-center/page.tsx` + `emailTemplates` + `WORKSPACE_CONNECTED.gmail`/`workspaceServiceMeta` in `src/data/coachComms.ts` | `WORKSPACE_CONNECTED.gmail` is a static flag, not a live OAuth state; no "Connect Gmail" button by design | Keep draft-only; gate any future Gmail draft creation behind approval |
| Calendar draft workflow | yes | Coach Command Center scope | draft-only (`CalendarWorkspace`; "nothing is added to any calendar here"; create event yourself) | `src/app/coach-command-center/calendar/page.tsx` (route titled "Training Scheduler") + `calendarEventTypes` + `WORKSPACE_CONNECTED.calendar` | Connection badge is a static flag; no real calendar write | Keep draft-only; future event creation must stay behind approval |
| Google Meet draft workflow | yes (bundled) | Coach Command Center scope, inside the Calendar/Training Scheduler page | draft-only (calendar page copy: "Build a Google Calendar event draft and a Google Meet training draft"); `draft_calendar_event` action text says "create a real Google Calendar event or Meet link" requires integration | Same calendar page + `CalendarWorkspace`; Meet draft is part of the event draft | Not a standalone surface; no real Meet link is generated | Keep draft-only; standalone Meet draft optional in PA3 |
| Scorecard submission for LOs | partial | LO surface at `/member-area/scorecards` (46 lines); renders `MemberScorecardForm` (`initialTier="lo_mastery"`) | draft-only / local (page comment line 9: "Saved locally this sprint (no DB write yet)"; copy reads "save a draft any time, then submit when your week is complete") | `MemberScorecardForm` + `scorecardSectionsForTier`/`loMasteryScorecardFields`/`allianceScorecardFields` in `coachCommandCenter.ts` | The LO can fill + "submit", but submission saves locally and does NOT write a `scorecards` Supabase row yet; coach review queue is separate sample data so an LO submit does not flow to the coach view | Wire `MemberScorecardForm` submit to Supabase (LO-owned rows + RLS); connect to coach review queue |
| Scorecard review for coaches | yes (view) | Coach Command Center scope; View-As aware | static (renders review queue + trends) | `src/app/coach-command-center/scorecards/page.tsx` over **sample** `scorecardReviews` in `coachCommandCenter.ts` | Review queue is sample data; coach cannot persist a review action (status/notes) from this page | Wire review queue to live scorecard rows + a coach-review write path |
| Coaching notes | partial | Coach Command Center scope; View-As aware | draft-only / local (`CoachingNotesWorkspace`; page states it "saves locally for now"; existing schema columns named but writes not wired) | `src/app/coach-command-center/coaching-notes/page.tsx` + `peopleForScope` sample roster; references `coaching_notes` table + `docs/COACHING_NOTES_SCHEMA_PROPOSAL.md` | Notes do not persist to Supabase yet; note type/tags/action-items absent from current schema | Apply additive migration (Lead review) then wire writes; keep coaching, not compliance language |
| My People | yes (view) | Coach Command Center scope (route `/coach-command-center/team`); View-As aware | static | `peopleForScope(access.scope)` over sample `assignedPeople` | Sample roster, not live assignments | Read live assignments once coaching tables populated |
| Member Progress | yes (view) | Coach Command Center scope; View-As aware | static | `src/app/coach-command-center/member-progress/page.tsx` over sample `memberProgress` | Sample data; intentionally excludes free 101-601 from paid coaching progress (correct) | Wire to live member progress data |
| Training Library | yes | `/training-library` (218 lines) + subroutes `clips`, `lo-development-videos`, `marketing-assets` | static (curated catalog) | `src/data/loDevelopmentClipLibrary.ts`, `marketingTrainingAssets.ts`, video manifest data | Catalog content is static curated data | Keep static; optional progress tracking later |
| AI Advantage video library | yes | `/ai-training/video-library` (NOT `/ai-advantage/video-library`); also `/lo-development/ai-advantage/[...slug]` | static (manifest/embeds) | `src/data/aiTrainingVideos.ts`, `aiAdvantagePublishedVideos.ts`, `aiAdvantageYoutubeEmbeds.(ts|json)` | Embeds depend on external YouTube hosting status; some entries are placeholders pending hosting | Do not touch video upload automation (per brief); leave staged video docs/scripts as-is |
| LO Development video library | yes | `/lo-development/video-library`; also `/training-library/lo-development-videos` | static (manifest-driven) | `src/data/loDevelopmentVideoLibrary.ts`, `loDevelopmentVideoContent.ts`, `platformVideoLibrary.ts` + `VideoLibraryGrid` | Manifest-driven; hosting/replacement handled by runbooks, not in-app | Do not touch video automation; leave runbook docs/scripts staged |
| FaceGram | yes | `/facegram` (45 lines) + subroutes `groups`, `messages`, `notifications`, `profile`, `saved` | static feed at this HEAD (see dead-ends note about composer/post write path) | `src/data/facegram.ts` + `FaceGramFeed` | Feed renders sample posts; real post creation write path not confirmed live | Wire posting to Supabase with RLS later; for now treat as internal social preview |
| Support routing | yes | `/support` (58 lines) is access-gated and `redirect()`s approved users (and preview) to `/loan-officer-support/`. `/support-routing` (169 lines) is a public-within-app static directory | static (no write path). `/support` only does auth + redirect; `/support-routing` renders curated support sections, request lanes, a `ClipLibraryRail`, and `SupportTeamDirectory`; email links open the user's mail app | `/support/page.tsx` (`getBetaUserSession`/`canAccessGate`/`redirect`), `/support-routing/page.tsx` (inline section/lane data) + `SupportTeamDirectory` + `ClipLibraryRail` | Routing is informational; there is NO ticket-submit form and NO `/api/support` POST invoked from these pages (correctly avoids external send) | Keep static directory; optional in-app ticket creation later if desired |
| Department routing | yes | `/department-routing` (131 lines) | static routing directory | `src/lib/departments.ts` | Directory/routing reference; routing is informational, not an automated dispatch | Keep static reference; optional ticket creation later |
| Admin View as role | yes | admin/master_admin (and preview); set at `/admin/view-as` via `ViewAsPicker` → `POST /api/view-as`; banner `ViewAsBanner` + `ViewAsExitButton` (DELETE then full reload to /admin/) | live (sets/clears `viewAs` cookie; consumed by `getViewAsState`/`viewAsCookie`) | `src/components/admin/ViewAsPicker.tsx`, `src/app/api/view-as/route.ts`, `adminViewAsRoles` in `AdminConsole.tsx`/`src/data/adminViewAsRoles.ts`, `src/lib/viewAs.ts` | The `<details>` account menu in `HeaderAuthStatus` does NOT close on role change/navigation (known bug, called out in brief) | PA3/Lead: close account-menu `<details>` on role change + navigation; keep prefetch={false} |
| Platform status | yes | `/admin/platform-status` (237 lines), admin-gated (`previewEnabled` OR `can_access_admin`/`isAdminRole`) | partly live: integration badges read real config — `getPublicAiSandboxStatus()` (OpenRouter/Groq), `hasSupabaseAdminConfig()`; counts derived from `approvedUserSeeds`; explicitly shows "External sends / uploads: Disabled (draft-only)" | `src/lib/ai/config.ts`, `src/lib/supabase/admin.ts`, `src/data/approvedUsers.ts` | Status reflects config presence (configured/connected flags) not live health probes; user counts are from seed data | Keep config-driven; optional live health probes later |
| Feedback button | yes | global (mounted in `src/app/layout.tsx` as `SuggestionModal`, label "Send Feedback", fixed bottom-right z-40); admin review at `/admin/feedback` (211 lines), admin-gated | live: submissions land in the Supabase `suggestions` table; `/admin/feedback` reads them back via `createSupabaseAdminClient().from("suggestions").select(...)` (id/user_id/anonymous/category/message/status/created_at). Page copy: "nothing auto-replies" | `src/app/layout.tsx` (`SuggestionModal`), `src/app/admin/feedback/page.tsx` (`createSupabaseAdminClient`, `suggestions` table) | Two bottom-right fixed buttons collide: global "Send Feedback" (`layout.tsx`, z-40) and the coach assistant toggle (`CoachAssistantPanel`, z-40) on `/coach-command-center/*` — same corner + same z-index | De-conflict bottom-right stacking with coach assistant toggle (and PA3's universal-assistant toggle) |

## Cross-cutting findings

1. **Naming in brief vs. real routes.** Several brief feature names do not match
   real routes: AI Advantage video library is at `/ai-training/video-library`
   (not `/ai-advantage/...`); FaceGram is `/facegram` (not `/face-gram`); the
   "Calendar draft workflow" page is titled **Training Scheduler**; "Communication
   Center" is `/coach-command-center/messages`. Audit rows use the real paths.

2. **The only shipped assistant is the coach assistant.** `CoachAssistantPanel`
   is mounted ONLY in `src/app/coach-command-center/layout.tsx`. There is no
   universal assistant, no `src/components/assistant/`, no `/api/ai/draft`, and no
   `assistantActions` data file at this HEAD — those are PA3's deliverables this
   sprint. Assistant rows are marked partial/forward accordingly.

3. **Draft-only discipline is consistently honored** across coach
   Communication Center, Email Center, and Calendar/Training Scheduler. Each page
   states explicitly that nothing is sent and integration actions are labeled
   "Integration required …". `WORKSPACE_CONNECTED` flags are static, not live
   OAuth — good (no fake "connected" state that could send).

4. **Most "feature" surfaces are static/sample-data views**, not live read/write:
   My People, Member Progress, Scorecard review, Training/AI Advantage/LO
   Development libraries, Department routing, Support routing. They are real,
   useful, branded pages but read curated/sample/manifest data. The genuinely
   live data paths confirmed by direct read are: **View-as** (sets/clears the
   `viewAs` cookie via `ViewAsPicker`), **Feedback** (writes to the Supabase
   `suggestions` table, read back at `/admin/feedback`), and **Platform status**
   (reads real integration config). Coach Communication/Email/Calendar, Coaching
   notes, and LO scorecard submission are draft-only/local (no DB write yet).
   Support routing does NOT invoke any send endpoint (correct).

5. **Separate AI-twin product** lives under `/ai-assistants/*` and `/ai-twins/*`
   (setup, persona, knowledge, connections, tasks, email-drafts, my-ai-twin) plus
   `/admin/ai-assistants/*` and API at `/api/ai/assistant`, `/api/ai/status`,
   `/api/ai/transcribe`, with `src/lib/ai/{access,config,guardrails}.ts`. This is
   distinct from the coach assistant and from PA3's universal assistant. Not
   itemized per-row above because it is its own vertical, but noted so the
   universal assistant does not collide with it.

## Verification status

Every row in this matrix is grounded in a file read in full during this audit.
A tool-channel hiccup mid-session was recovered, and all of the following were
then re-opened and confirmed line-by-line: `src/app/marketing/page.tsx`,
`src/app/support/page.tsx`, `src/app/support-routing/page.tsx`,
`src/app/department-routing/page.tsx`, `src/app/admin/platform-status/page.tsx`,
`src/app/admin/feedback/page.tsx`, `src/app/admin/view-as/page.tsx`,
`src/app/member-area/scorecards/page.tsx`, `src/app/facegram/page.tsx`,
`src/app/training-library/page.tsx`, plus the coach-command-center pages,
`CoachAssistantPanel.tsx`, `coachAccess.ts`, `data/coachCommandCenter.ts`, and
the AI Advantage / LO Development video-library pages.

Corrections made after that full re-read (earlier hedges resolved):
- LO scorecard submission is draft-only/local via `MemberScorecardForm` (not a
  static field reference, and not a dead-end button).
- Support routing has NO submit/`/api/support` path — `/support` redirects to
  `/loan-officer-support/` and `/support-routing` is a static directory.
- Feedback is genuinely live (Supabase `suggestions` table).
- Platform status reads real integration config (OpenRouter/Groq/Supabase).
- No marketing draft-studio components (`EmailDraftStudio` etc.) exist at HEAD.

The only remaining unverified-live item is **FaceGram posting**: the feed
(`FaceGramExperience`) renders from `src/data/facegram.ts`; whether the composer
writes to Supabase was not confirmed and is flagged in dead-ends.md.
