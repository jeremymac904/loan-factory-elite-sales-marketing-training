# Role Model — Loan Factory LO Development Platform

Single source of truth for the app-layer role model: every role's display label,
its dashboard landing route, whether it can coach, whether it sees all coaching
coverage org-wide, and a one-line purpose.

Source files:

- Labels + dashboard routes: `src/lib/supabase/auth.ts`
  (`roleLabels`, `roleDashboardHrefs`, `BetaRole`, `isAdminRole`).
- Coach entitlement + scope: `src/lib/coachAccess.ts`
  (`COACH_ROLES`, `SEE_ALL_ROLES`, `getCoachAccess`, `roleCanCoach`).
- Coaching tier entitlement: `src/lib/coachingAccess.ts`.
- View-as preview list: `src/data/adminViewAsRoles.ts` (`adminViewAsRoles`).
- Coverage / supervisor sample data: `src/data/coachCommandCenter.ts`.

Definitions:

- **Can coach?** — role may open the Coach Command Center
  (`roleCanCoach` / `COACH_ROLES` in `coachAccess.ts`, admin roles included).
- **Sees all?** — role gets the org-wide coverage view (scope `all`)
  via `SEE_ALL_ROLES` / admin in `coachAccess.ts`. "Roster only" means the role
  sees just its own assigned people.

## Role matrix

| Role key | Label | Dashboard route | Can coach? | Sees all? | Purpose (one line) |
|---|---|---|---|---|---|
| `master_admin` | Master Admin | `/admin/` | Yes (admin) | Yes | Full platform owner; all access, all coverage, View-as role. |
| `admin` | Admin | `/admin/` | Yes (admin) | Yes | Platform administration and approvals; org-wide coaching visibility. |
| `lo_development_lead` | LO Development Lead | `/lo-development/` | Yes (admin) | Yes | Runs LO Development; admin-level access and org-wide coverage. |
| `lo_development_member` | LO Development | `/lo-development/` | Yes | No (LO Development scope) | LO Development staff; corporate onboarding + paid coaching members. |
| `lo_development` | LO Development | `/lo-development/` | Yes (gates) | No | Legacy/alias LO Development access used by gate checks. |
| `training_academy` | Training Academy | `/training-academy/` | Yes | No (LO Development scope) | Owns Sales and Marketing 101-601 free internal training + academy content. |
| `loan_officer_support` | Loan Officer Support | `/loan-officer-support/` | No | No | Supports loan officers; lender escalations and operational help. |
| `corporate_coach` | Corporate Coach | `/coach-command-center/` | Yes | No (own roster) | Coaches new LOs through corporate onboarding; sees only assigned LOs. |
| `corporate_coach_supervisor` | Corporate Coach Supervisor | `/coach-command-center/` | Yes | Yes | Oversight role above all coaches + team leaders; org-wide coaching coverage. |
| `lo_mastery_coach` | LO Mastery Coach | `/coach-command-center/` | Yes | Yes | Coaches LO Mastery ($249) members; coaching-leadership coverage. |
| `loan_factory_alliance_coach` | Loan Factory Alliance Coach | `/coach-command-center/` | Yes | Yes | Coaches Loan Factory Alliance ($449) members; coaching-leadership coverage. |
| `coaching_director` | Coaching Director | `/coach-command-center/` | Yes | Yes | Directs the coaching program; org-wide coaching coverage. |
| `marketing` | Marketing | `/marketing/` | No | No | Marketing dashboard, content review, and campaign work. |
| `team_leader` | Team Leader | `/team-leader-guide/` | Yes | No (own team) | Leads a team of LOs; day-to-day coaching and accountability for own team. |
| `coaching_member_level_1` | LO Mastery Member | `/member-area/lo-mastery/` | No | No | Paying LO Mastery ($249) coaching member. |
| `coaching_member_level_2` | Loan Factory Alliance Member | `/member-area/alliance/` | No | No | Paying Loan Factory Alliance ($449) coaching member. |
| `loan_officer` | Loan Officer | `/normal-lo/` | No | No | Standard loan officer; free training and self-serve resources. |
| `support_staff` | Support Staff | `/loan-officer-support/` | No | No | Internal support staff (maps to loan officer support surfaces). |
| `vendor_partner_future` | Vendor Partner (Future) | `/access-pending/` | No | No | Reserved future vendor/partner role; access pending. |

### View-as preview coverage

The admin **View as role** dropdown (`adminViewAsRoles` in
`src/data/adminViewAsRoles.ts`, consumed by `src/app/admin/view-as/page.tsx` and
the `src/components/admin/AdminConsole.tsx` console) lists every operational
role so an admin can preview each surface:

`master_admin`, `admin`, `lo_development_lead`, `lo_development_member`,
`training_academy`, `loan_officer_support`, `corporate_coach`,
`corporate_coach_supervisor`, `lo_mastery_coach`, `loan_factory_alliance_coach`,
`coaching_director`, `team_leader`, `marketing`, `coaching_member_level_1`,
`coaching_member_level_2`, `loan_officer`.

(The `lo_development`, `support_staff`, and `vendor_partner_future` keys exist in
the role model for gate compatibility and future use but are intentionally not
surfaced as separate View-as preview entries — `lo_development_member` is the
preview entry for LO Development, and loan officer support is previewable via
`loan_officer_support`.)

## Edward Arvizo = Corporate Coach Supervisor

Edward Arvizo is the **Corporate Coach Supervisor** — the oversight role that
sits above the corporate coaches, LO Mastery coaches, Loan Factory Alliance
coaches, and team leaders.

App-layer representation (no Supabase seed/migration changes were made):

- Role key `corporate_coach_supervisor`, label **Corporate Coach Supervisor**
  (`roleLabels` in `src/lib/supabase/auth.ts`).
- In `src/lib/coachAccess.ts` he is in `COACH_ROLES` and `SEE_ALL_ROLES`, so the
  role resolves to `seesAll = true` and `scope = "all"` — org-wide coverage.
- In `src/data/coachCommandCenter.ts`:
  - `CORPORATE_COACH_SUPERVISOR_NAME = "Edward Arvizo"` and
    `CORPORATE_COACH_SUPERVISOR_ROLE = "corporate_coach_supervisor"`.
  - `COACH_COVERAGE_LEAD_NAME = "Edward Arvizo"` allows the named supervisor
    persona to see coverage even while previewing (belt-and-suspenders alongside
    the role-based `seesAll`).
  - `coachCoverage` includes Edward Arvizo as an `lo_mastery_coach`-type
    coverage row (he directly carries the sample LO Mastery / Alliance members),
    plus Kevin Truong (corporate coach) and Jeremy McDonald (team leader).

## Corporate Coach Supervisor — oversight surface

When a supervisor (or any `seesAll` role) opens
`src/app/coach-command-center/page.tsx`, the **Coaching coverage (supervisor
view)** section renders, surfacing oversight across:

- Corporate coaches, LO Mastery coaches, Loan Factory Alliance coaches, team
  leaders (coach type per row).
- Assigned LOs and coaching coverage status per coach (on track / watch /
  at risk).
- Scorecard trends (up / flat / down) and submitted-vs-missing counts.
- Member progress (accountability), training completion, and follow-up activity.
- An org-wide rollup: coaches, team leaders, assigned LOs, need-attention,
  coverage-at-risk.

Data grounding: assigned/scorecard counts are **derived** from the shared
`assignedPeople` sample roster (so per-coach and supervisor totals stay
consistent). Coverage cadence, scorecard trend, training completion, and
follow-up activity are **clearly-labeled sample/placeholder** signals — not live
metrics. They become live once the coaching activity tables are populated.
