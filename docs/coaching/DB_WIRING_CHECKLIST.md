# Coaching DB Wiring Checklist

Status: planning checklist for Lead review. **No migration is created this
sprint.** Every coaching surface today renders sample data and/or saves to the
browser's `localStorage` — clearly labeled in the UI as "Sample data" or "Saved
locally until the database is connected." This document is the future swap-in
plan to move those surfaces onto Supabase.

The base tables already exist (idempotent, additive) in
`supabase/migrations/20260528130000_coach_command_center.sql`. RLS is already
enabled on every coaching table there. This checklist maps each surface to its
table, the `localStorage` key it replaces, the RLS shape, and the exact code
swap-in point. Where a field is missing from the base table, the additive change
is noted (proposal only — do not apply automatically).

## Ground rules (do not weaken)

- **RLS helpers already in the schema:** `public.can_access_admin()`,
  `public.is_approved_user()`, `public.current_user_email()`. Reuse these — do
  not invent new permission checks.
- **Coverage / "see all" is role-based**, never name-based. The
  `Edward Arvizo` strings in `src/data/coachCommandCenter.ts`
  (`CORPORATE_COACH_SUPERVISOR_NAME`, `COACH_COVERAGE_LEAD_NAME`) are
  **sample display data + a belt-and-suspenders persona allowance**, not an
  auth gate. Live coverage gating must stay on `coachAccess` `seesAll` /
  scope `'all'`.
- **Comms stay draft-only.** `coaching_messages`, `coaching_email_drafts`, and
  `coaching_calendar_events` all default `status = 'draft'`. Wiring persistence
  is allowed; wiring an actual send/create (Gmail / Google Chat / Google
  Calendar) is **out of scope** and must remain a separate, explicit decision.
- **Always lowercase emails** in policies and lookups (the schema indexes use
  `lower(...)`).

## Standard RLS shape

Three recurring policy shapes are already implemented in the base migration —
reuse them rather than authoring new ones:

| Shape | Who can read/write | Used by |
| --- | --- | --- |
| **Non-sensitive coaching tables** | `can_access_admin()` for ALL; `is_approved_user()` for SELECT | assignments, activity logs, tasks, scorecards, calendar events, member progress |
| **Sensitive coach text** | admins + involved coach + involved LO (`coach_email`/`lo_email` = `current_user_email()`) | `coaching_notes` |
| **Two-party drafts** | admins + the two involved parties (`from_email`/`to_email` or `coach_email`) | `coaching_messages`, `coaching_email_drafts` |

The target end-state for a coach roster read is: **a coach sees only their
roster** (rows where `coach_email = current_user_email()` via the assignment
tables), **admins see all**, **members see their own rows**. The base migration
currently grants `is_approved_user()` SELECT on non-sensitive tables; tightening
the SELECT to roster-scoped is the recommended hardening step at wiring time
(see "Roster-scoping hardening" below).

---

## 1. `coaching_notes`

- **Surface:** `src/components/coach/CoachingNotesWorkspace.tsx` (coach 1:1 note
  capture), surfaced by `src/app/coach-command-center/coaching-notes/page.tsx`.
- **localStorage key replaced:** `loan-factory-coaching-notes` (array of saved
  notes, capped at 50).
- **Base table columns (exist):** `id`, `lo_email`, `coach_email`, `note`,
  `stuck_points`, `wins`, `next_action`, `follow_up_date`, `private`,
  `created_at`, `updated_at`.
- **Additive columns needed (proposal — see
  `docs/COACHING_NOTES_SCHEMA_PROPOSAL.md`):** `note_type text`,
  `tags text[] default '{}'`, `action_items jsonb default '[]'`.
- **RLS shape:** sensitive coach text — admins + involved coach + involved LO.
  Already implemented (`coaching_notes_admin_all`). Keep it; do not add a broad
  approved-user read.
- **Swap-in point:** replace `readStoredNotes()` / `localStorage.setItem` in
  `CoachingNotesWorkspace.tsx` (`handleSubmit`, `deleteNote`) with
  server-action reads/writes keyed on `coach_email = current_user_email()` and
  the selected `lo_email`. Map form fields → columns: `note`→`note`,
  `noteType`→`note_type`, `tags`→`tags`, `actionItems`→`action_items`,
  `followUpDate`→`follow_up_date`.

## 2. `coaching_scorecards`

- **Surfaces:** member submit — `src/components/coach/MemberScorecardForm.tsx`
  (via `src/app/member-area/scorecards/page.tsx`); coach review —
  `src/app/coach-command-center/scorecards/page.tsx` (reads sample
  `scorecardReviews`).
- **localStorage key replaced:** `loan-factory-member-scorecard` (single latest
  scorecard object: `tier`, `weekOf`, `values`, `savedAt`).
- **Base table columns (exist):** `id`, `lo_email`, `week_of`, `tier`,
  `fields jsonb`, `created_at`.
- **Additive columns to consider:** `status text default 'submitted'` (so the
  coach review queue can distinguish submitted vs draft vs missing), and an
  `updated_at` if drafts are editable in place.
- **RLS shape:** non-sensitive — admins ALL, `is_approved_user()` SELECT.
  Recommended hardening: members write/read **their own** row
  (`lo_email = current_user_email()`); coaches read their roster
  (join `coaching_member_assignments` / `coach_assignments`).
- **Swap-in points:**
  - Member: replace `readSavedScorecard()` / `persist()` in
    `MemberScorecardForm.tsx`; the `values` record maps directly into the
    `fields` jsonb. Keep "draft" vs "submitted" using a `status` column.
  - Coach: replace the sample `scorecardReviews` import in
    `scorecards/page.tsx` with a roster-scoped read; the Submitted / Missing /
    Up-trends / Coach-actions counts and the review queue become live (remove
    the "(sample)" labels and the "Sample data" banner at that time).

## 3. `coaching_member_progress`

- **Surface:** `src/app/coach-command-center/member-progress/page.tsx` (reads
  sample `memberProgress`).
- **localStorage key replaced:** none (server-rendered sample data only).
- **Base table columns (exist):** `id`, `member_email` (unique), `tier`,
  `onboarding`, `path`, `certification`, `training_progress`, `ai_twin_status`,
  `next_action`, `status`, `updated_at`.
- **Field-mapping note:** the sample UI shows `coachingAttendance`,
  `weeklyCommitments`, `activityTracker`, `accountabilityScore`, `coachNotes`,
  `resourceCompletion`. Some of these aren't 1:1 columns yet — at wiring time
  either add columns (`coaching_attendance text`, `weekly_commitments text`,
  `activity_tracker text`, `accountability_score int`, `resource_completion
  text`) or derive them from `coaching_activity_logs` + `coaching_scorecards`.
  Decide derive-vs-store before the migration.
- **RLS shape:** non-sensitive — admins ALL, `is_approved_user()` SELECT.
  Recommended: members read their own (`member_email = current_user_email()`),
  coaches read their roster, admins all. Keep paid-coaching progress separate
  from free Sales and Marketing 101–601 completion (UI already enforces this
  separation — do not merge them in the query).
- **Swap-in point:** replace the `memberProgress` import in
  `member-progress/page.tsx` with a roster-scoped read; remove the
  "Sample data" banner and footnote when live.

## 4. `coach_assignments` (+ `team_leader_assignments`, `coaching_member_assignments`)

- **Surface:** the roster everything else scopes against —
  `assignedPeople` / `peopleForScope()` in `src/data/coachCommandCenter.ts`,
  consumed by My People, Activity Snapshot, Coaching Notes, and the assistant.
- **localStorage key replaced:** none (server-rendered sample roster).
- **Base table columns (exist):**
  - `coach_assignments`: `coach_email`, `lo_email`, `relationship`
    (`corporate_coach | paid_coaching | team_leader`), `active`, `created_at`.
  - `team_leader_assignments`: `team_leader_email`, `lo_email`, `team_name`,
    `active`.
  - `coaching_member_assignments`: `coach_email`, `member_email`, `tier`
    (`lo_mastery | alliance`), `active`.
- **RLS shape:** non-sensitive — admins ALL, `is_approved_user()` SELECT.
  This is the table that defines "a coach's roster," so it's the join target
  for roster-scoping every other read.
- **Swap-in point:** add a `getRosterForCurrentCoach()` data helper that reads
  these three tables filtered by `lower(coach_email|team_leader_email) =
  current_user_email()` and maps rows → `AssignedPerson`. Then change
  `peopleForScope(scope)` callers to use the live roster when the tables are
  populated, falling back to sample data otherwise. `coachAccess` `scope`
  still decides `all` vs own-roster.

## 5. `coaching_email_drafts` (assistant drafts — email)

- **Surface:** assistant draft actions (`draft_gmail_message`,
  `draft_meeting_agenda`, etc.) in `src/components/coach/CoachAssistantPanel.tsx`
  and the universal `src/components/assistant/RoleAssistantPanel.tsx`.
- **localStorage keys replaced:** `loan-factory-coach-assistant-drafts` and
  `loan-factory-role-assistant-drafts` (saved draft arrays). These hold ALL
  assistant draft types today; only the email-style drafts migrate here.
- **Base table columns (exist):** `id`, `lo_email`, `coach_email`, `subject`,
  `body`, `status` (`'draft'` only — sending is never automated), `created_at`.
- **RLS shape:** two-party draft — admins + involved coach
  (`coaching_email_drafts_involved`). Already implemented.
- **Swap-in point:** the "Save as local draft" handler in the assistant panels.
  Persist email-type drafts to this table with `status='draft'`. **Do not** wire
  Gmail send; the draft-only contract stays. UI copy ("nothing is sent") is
  unchanged.

## 6. `coaching_calendar_events` (assistant drafts — calendar)

- **Surface:** `draft_calendar_event` assistant action +
  `src/app/coach-command-center/calendar/` workflow (draft-only today).
- **localStorage keys replaced:** same assistant draft arrays
  (`loan-factory-coach-assistant-drafts` / `loan-factory-role-assistant-drafts`)
  for the calendar-type drafts.
- **Base table columns (exist):** `id`, `coach_email`, `event_type`, `title`,
  `starts_at`, `duration_min`, `attendees jsonb`, `status` (`'draft'` until
  Google Calendar is connected), `created_at`.
- **RLS shape:** non-sensitive — admins ALL, `is_approved_user()` SELECT.
  Recommended hardening: scope to `coach_email = current_user_email()` for
  write, since these are the coach's own drafts.
- **Swap-in point:** persist calendar-type assistant drafts here with
  `status='draft'`. Creating a real Google Calendar event / Meet link stays a
  separate, explicit integration — **out of scope for DB wiring.**

## 7. `coaching_messages` (assistant drafts — chat / nudge)

- **Surface:** `draft_google_chat_message` / nudge actions in the assistant
  panels + `src/app/coach-command-center/messages/` workflow (draft-only today).
- **localStorage keys replaced:** same assistant draft arrays for the
  message/chat-type drafts.
- **Base table columns (exist):** `id`, `from_email`, `to_email`, `body`,
  `status` (`draft | sent` — only ever set to `'draft'` by this app),
  `created_at`.
- **RLS shape:** two-party — admins + `from_email`/`to_email` =
  `current_user_email()` (`coaching_messages_involved`). Already implemented.
- **Swap-in point:** persist message/chat-type assistant drafts here with
  `status='draft'`. **Do not** wire Google Chat posting; draft-only contract
  stays.

---

## Roster-scoping hardening (recommended at wiring time)

The base migration grants `is_approved_user()` SELECT on non-sensitive coaching
tables for convenience while everything is sample/manual. When tables are
populated with real members, tighten SELECT so a coach only sees their roster:

```sql
-- Example shape (proposal — Lead reviews before applying):
-- replace the broad approved-user select on coaching_scorecards with a
-- roster-scoped read that joins the assignment tables.
using (
  public.can_access_admin()
  or lower(lo_email) = public.current_user_email()            -- the member's own rows
  or exists (                                                  -- the member's coach
    select 1 from public.coach_assignments ca
    where lower(ca.lo_email) = lower(coaching_scorecards.lo_email)
      and lower(ca.coach_email) = public.current_user_email()
      and ca.active
  )
)
```

Apply the same pattern to `coaching_member_progress`, `coaching_activity_logs`,
`coaching_tasks`, and `coaching_calendar_events`. The "see all" supervisor /
admin path stays on `can_access_admin()` plus the role-based `coachAccess`
`seesAll` scope — never a name match.

## Swap-in sequencing

1. Apply the additive `coaching_notes` columns (`note_type`, `tags`,
   `action_items`) — see `docs/COACHING_NOTES_SCHEMA_PROPOSAL.md`.
2. Add the `getRosterForCurrentCoach()` data helper over the assignment tables
   (#4); keep sample fallback.
3. Wire reads first (scorecards review, member progress, activity) and remove
   the "Sample data" / "(sample)" labels per surface as each goes live.
4. Wire writes (member scorecard submit, coaching notes) and switch the
   "Saved locally until the database is connected" copy to a real saved state.
5. Wire draft persistence (#5–#7) — **persistence only; no real sends.**
6. Apply the roster-scoping RLS hardening once real members exist.

No automated migration is created by this checklist. Lead applies schema and
RLS changes deliberately.
