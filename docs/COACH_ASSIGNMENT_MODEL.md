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
flags LOs that are stuck/inactive as "needs attention" (coaching language).
Assignment editing UI writes to the tables above once connected; until then,
assignments are seeded/sample and managed by LO Development.
