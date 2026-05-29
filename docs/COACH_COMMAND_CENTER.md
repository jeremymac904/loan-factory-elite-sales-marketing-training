# Coach Command Center

**Date:** 2026-05-28 · Internal Loan Factory platform (approved Loan Factory users only).

## What this is
A coaching operations dashboard for the people responsible for developing LOs:
corporate coaches, LO Development leadership + members, paid coaches (LO Mastery
$249 and Loan Factory Alliance $449), team leaders, and master_admin/admin. It
shows the people they're responsible for, tracks daily/weekly activity,
communicates with them, schedules trainings, and monitors coaching progress.

It is **not a fake dashboard** — every clickable element routes somewhere real,
performs a safe action (copy/draft), or links to the connection setup. Where a
real integration isn't connected yet, the page is built with safe status and a
clear setup path; nothing pretends to be automated.

## Routes
| Route | Purpose |
|---|---|
| `/coach-command-center` | Overview: My People preview, Today's Command Center, activity snapshot, quick tools |
| `/coach-command-center/team` | My People — full list of assigned LOs + quick actions |
| `/coach-command-center/activity` | Activity snapshot (manual entry) |
| `/coach-command-center/scorecards` | LO Mastery + Alliance weekly scorecards |
| `/coach-command-center/member-progress` | Per-member progress + coaching status |
| `/coach-command-center/coaching-notes` | Per-LO coaching notes + AI prompt panel |
| `/coach-command-center/training-plan` | Assign lessons/clips/scripts as coaching tasks |
| `/coach-command-center/messages` | Internal message / nudge / announcement drafts |
| `/coach-command-center/email-center` | Email drafts (copy / Gmail draft) |
| `/coach-command-center/calendar` | Training scheduler (copy invite / connect Google Calendar) |
| `/admin/coach-assignments` | Admin: coaching coverage + assignments across all relationships |

## Access (View-As aware)
Gated by `src/lib/coachAccess.ts` (`getCoachAccess()`), which honors the
admin-only `lf_view_as` cookie so admins can record each role's view. The
`/coach-command-center` subtree is gated by `layout.tsx`; `/admin/coach-assignments`
uses the standard admin gate.

| Role | Sees |
|---|---|
| master_admin, admin, lo_development_lead | All coaches, team leaders, assignments, members (`scope: all`) |
| lo_development_member | Coaching + paid-coaching LOs (`scope: lo_development`) |
| corporate_coach | Their assigned coaching/support LOs (`scope: corporate_coach`) |
| team_leader | Their team's LOs (`scope: team_leader`) |
| normal LO | No access (unless also a coach/team leader/admin) |

## Data
- Live model: migration `20260528130000_coach_command_center.sql` (relationship +
  activity + notes + tasks + scorecards + messages + email drafts + calendar +
  member progress tables, RLS-protected). See [COACH_ASSIGNMENT_MODEL.md](COACH_ASSIGNMENT_MODEL.md).
- Today the pages render `src/data/coachCommandCenter.ts` sample data + manual
  coaching entry. See [COACHING_ACTIVITY_TRACKING.md](COACHING_ACTIVITY_TRACKING.md).
- Communication + scheduling follow draft/copy flows — see
  [GOOGLE_CALENDAR_AND_GMAIL_COACHING_WORKFLOWS.md](GOOGLE_CALENDAR_AND_GMAIL_COACHING_WORKFLOWS.md).

## Safety
No auto-send email, no auto-post to FaceGram, no auto-created calendar events, no
n8n triggers. External actions stay draft/copy until Google is connected and the
user explicitly clicks create. Coaching status uses coaching language (active /
needs nudge / stuck / inactive) — never compliance-risk language.
