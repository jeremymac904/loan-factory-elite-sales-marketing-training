# Coach Assignment Model

How the Coach Command Center decides which LOs a coach/team leader sees.

## Three relationship types
1. **Team Leader** (`team_leader_assignments`) — a team leader sees LOs on their team.
2. **Corporate Coach** (`coach_assignments`, relationship `corporate_coach`) — a corporate coach sees LOs assigned to them for coaching/support (e.g. new-LO / First File).
3. **Paid Coaching** (`coaching_member_assignments`) — a paid coach sees LOs enrolled in LO Mastery ($249, tier `lo_mastery`) or Loan Factory Alliance ($449, tier `alliance`).

Master Admin / Admin / LO Development Lead see **all** groups and relationships.

## Scope resolution (`src/lib/coachAccess.ts`)
`getCoachAccess()` resolves an effective role (View-As aware) → `scope`:

| Effective role | scope | People shown |
|---|---|---|
| master_admin / admin / lo_development_lead | `all` | everyone |
| lo_development_member | `lo_development` | corporate_coach + paid_coaching LOs |
| corporate_coach | `corporate_coach` | their corporate-coaching LOs |
| team_leader | `team_leader` | their team LOs |
| everyone else | `none` | none (no command center) |

`peopleForScope(scope)` in `src/data/coachCommandCenter.ts` applies this filter to
the assignment set. With the migration applied, the same filtering runs against
the live relationship tables keyed on the coach's email.

## Tables (migration `20260528130000_coach_command_center.sql`)
`coach_assignments`, `team_leader_assignments`, `coaching_member_assignments`,
plus `coaching_activity_logs`, `coaching_notes`, `coaching_tasks`,
`coaching_scorecards`, `coaching_messages`, `coaching_email_drafts`,
`coaching_calendar_events`, `coaching_member_progress`. All RLS-enabled:
approved users read coaching data; admins get full access; sensitive coach text
(notes/messages/drafts) is limited to the involved coach/LO or admins.

## Managing assignments
`/admin/coach-assignments` shows coaching coverage grouped by relationship and
flags LOs that are stuck/inactive as "needs attention" (coaching language). It
also reads the live `coaching_assignments` table (count) read-only. Until the
reconciliation below is done, assignments shown are sample data managed by LO
Development.

## Live persistence status & reconciliation (exact blocker + path)
**Finding (2026-05-28):** the production database already has a
`public.coaching_assignments` table (RLS-enabled, 0 rows) with columns
`id, coach_user_id (uuid), member_user_id (uuid), coaching_tier (text), status,
assigned_at`. This is a **paid-coaching, user-ID-based** design. It pre-dates the
Coach Command Center migration.

**Why the CCC migration was NOT auto-applied to prod:**
1. The CCC migration (`20260528130000_coach_command_center.sql`) creates
   `coach_assignments` (singular, email-based) which would be a confusing
   **duplicate** of the existing `coaching_assignments`.
2. The existing table keys on Supabase `user_id`s, but only ~2 `profiles` rows
   exist today (most approved LOs in `approved_users` have not signed in, so they
   have no `user_id` yet). Email→user_id resolution would fail for most LOs, so
   writing assignments now would create incomplete/bad data.
Writing guessed data to a production auth-linked table is not safe, so the write
UI is intentionally deferred (no fake "saved").

**Exact path to enable live assignment editing (additive, non-destructive):**
1. Standardize on the existing `public.coaching_assignments` table (do NOT add
   the duplicate `coach_assignments`). Add a `relationship text default
   'paid_coaching'` column (additive) to support team_leader / corporate_coach /
   paid_coaching in one table — apply via Supabase MCP `apply_migration` or the
   Supabase SQL editor / CLI (no manual paste required from Jeremy).
2. Decide the member key: either (a) populate `profiles` for approved LOs on
   first sign-in (already happens) and resolve email→user_id at assign time, or
   (b) add nullable `coach_email` / `member_email` columns so assignments can be
   created before an LO signs in, backfilling `*_user_id` on first sign-in.
3. Build the admin-gated write API (`POST /api/coach-assignments`) using the
   service-role admin client, validating relationship + tier, upsert-only.
4. Wire the `/admin/coach-assignments` form to that API; flip the page from
   sample to live.
The genuinely-new CCC tables (activity logs, notes, tasks, scorecards, messages,
email drafts, calendar, member progress) in the migration are non-duplicative and
can be applied as-is when their write features are built.
