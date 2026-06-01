# Role-Visibility Audit — Command Center chat (LO scope) + full 15-role matrix

Power Agent 4 · LO Development Platform role-visibility correction sprint · HEAD `b15516f`.

Scope: (A) verify the dashboard **Command Center chat** (guided help, allowed for
Loan Officers) only points Loan Officers at LO-appropriate surfaces, and (B) a
full 15-role visibility matrix grounded in the real source files, flagging any
inconsistency between `roleHasAssistant`, the runtime gate `canAccessGate`, the
parallel declarative `accessByGate`, and the spec's allowed lists.

This is an audit + a narrow correction to LO guided answers. It does **not** edit
any gate, RLS, migration, `roles.ts`, `auth.ts`, `effectiveAccess.ts`,
`RoleGate.tsx`, or `RoleAssistantMount.tsx`. Findings that touch those files are
reported for the Lead to reconcile.

---

## Source-of-truth map (what actually gates what)

| Surface (route) | Runtime gate authority | Notes |
|---|---|---|
| `/admin/` | `admin/page.tsx` → `can_access_admin \|\| isAdminRole` | Not `<RoleGate>`; admin-only resolver. |
| `/lo-development/` | `<RoleGate gate="lo-development">` → `canAccessGate` (auth.ts) | |
| `/training-academy/` | `<RoleGate gate="training-academy">` → `canAccessGate` | |
| `/marketing/` | `<RoleGate gate="marketing">` → `canAccessGate` | |
| `/coach-command-center/` | `getCoachAccess()` (coachAccess.ts) `isCoach` | Not `<RoleGate>`; roster-aware resolver. |
| `/normal-lo/` | `<RoleGate gate="normal-lo">` → `canAccessGate` | LO dashboard. |
| `/loan-officer-support/` | `<RoleGate gate="loan-officer-support">` | **Staff** support center. |
| `/support-routing/` | `<RoleGate gate="support-routing">` | **LO-facing** support intake (includes `loan_officer`). |
| `/member-area/**` | `member-area/layout.tsx` → `getCoachingAccess()` `isMember \|\| isStaff` | Subtree gate. |
| `/coaching/` | none (ungated overview) | LO-safe; explains the two paid tiers. |
| `/sales-training/`, `/ai-training/`, `/ai-training/video-library/`, `/training-library/`, `/training-library/lo-development-videos/`, `/resources/` | ungated (or `resources` gate = all roles) | LO-safe training/resource surfaces. |
| `/facegram/` | `canAccessFaceGram()` (permission `can_access_facegram` or admin) | LO via permission grant. |
| AI assistant pill | `roleHasAssistant()` (effectiveAccess.ts) via `RoleAssistantMount` | `loan_officer` → hidden. |

**Critical clarification for this audit:** `RoleGate` consumes **`canAccessGate`
(auth.ts)** with string role keys (`loan_officer`, `coaching_member_level_1`, …),
NOT `isAllowed`/`accessByGate` (roles.ts) which uses hyphenated `RoleId`s
(`loan-officer`, …). `accessByGate` is a **parallel declarative map** (used by the
roles directory / preview chooser), so where the two disagree, **`canAccessGate`
is what a real signed-in session experiences.** Divergences are flagged in
Findings.

---

## A. Command Center chat — Loan Officer guided-answer verification

The dashboard `CommandCenterChat` is **guided help** (local templates via
`answerPlatformQuestion`), not the AI assistant pill. Per spec it is allowed for
Loan Officers. It reaches LOs through `/normal-lo/` →
`RoleDashboardPage` → `CommandCenterChatMount` → `CommandCenterChat`
(role = effective role). The LO bucket has **no draft/assistant actions** — the
chat renders guided answers only; actions live on the pill, which the Lead
already hides for `loan_officer`. Verified: no LO action surface was added.

### Every guided answer a `loan_officer` can reach — before vs after

| Intent | Before (LO-reachable links) | LO could open? | After (this audit) |
|---|---|---|---|
| `start` / `next_action` / `fallback` | `/sales-training/`, `/ai-training/`, **`/loan-officer-support/`** | No (staff gate) | `/sales-training/`, `/ai-training/`, **`/support-routing/`** ✅ |
| `coaching` | (else) `/coaching/`, **`/member-area/lo-mastery/`**, **`/member-area/alliance/`** | No (member gate) | new LO branch → `/coaching/`, `/sales-training/` ✅ |
| `scorecard` | (else) **`/member-area/scorecards/`**, **`/member-area/lo-mastery/`** | No (member gate) | new LO branch → `/coaching/`, `/sales-training/` ✅ |
| `sales_training` | `/sales-training/`, `/training-library/` | Yes | unchanged ✅ |
| `ai_advantage` | `/ai-training/`, `/ai-training/video-library/` | Yes | unchanged ✅ |
| `walkthroughs` | `/training-library/lo-development-videos/`, `/ai-training/video-library/`, `/training-library/` | Yes | unchanged ✅ |
| `support` | (else) **`/loan-officer-support/`**, `/resources/`, `/support-routing/` | Partial (1st link staff) | `/support-routing/`, `/resources/` ✅ |
| `facegram` | `/facegram/` | Yes (permission) | unchanged ✅ |
| `resources` | `/resources/`, `/training-library/` | Yes | unchanged ✅ |
| `admin` | (else) **`/loan-officer-support/`**, **`/lo-development/`** | No (both staff) | `/support-routing/`, `/resources/` ✅ |
| `ask_help` | **`/loan-officer-support/`**, `/resources/`, `/support-routing/` | Partial (1st link staff) | `/support-routing/`, `/resources/` ✅ |

**Bug found and fixed:** multiple LO-reachable guided answers linked the Loan
Officer at the **staff** Loan Officer Support command center (`/loan-officer-support/`,
gate `loan-officer-support` — `loan_officer` is **not** in that list →
access-denied), at **member-area** surfaces a plain LO cannot open
(`/member-area/**`, gated by `getCoachingAccess` `isMember`), and at
`/lo-development/` (staff). The fix re-points every LO-reachable answer to the
LO-facing equivalent: **`/support-routing/`** (the LO support intake lane, gate
`support-routing` includes `loan_officer`), the ungated **`/coaching/`** overview
(honestly explains the paid LO Mastery $249 / Loan Factory Alliance $449 tiers),
`/resources/`, and the free `/sales-training/`. Staff/member buckets keep their
deeper links via dedicated role branches — no other role's answers changed, and
no gate was weakened.

All LO-reachable destinations after the fix:
`/sales-training/`, `/ai-training/`, `/ai-training/video-library/`,
`/training-library/`, `/training-library/lo-development-videos/`, `/resources/`,
`/facegram/`, `/support-routing/`, `/coaching/` — every one accessible to a
plain `loan_officer`. (Verified all exist on disk.)

Naming verified in LO answers: Sales and Marketing 101-601 (free internal, never
"Elite"), AI Advantage, FaceGram, LO Mastery $249 / Loan Factory Alliance $449,
"View as role" (no "personate"), no "Apex Advisor". Honest mode preserved:
"nothing is sent."

---

## B. Full 15-role visibility matrix

Columns are grounded as:
- **AI assistant?** = `roleHasAssistant(role)` (`effectiveAccess.ts`).
- **Nav set** = staff vs LO chrome (LO = `loan_officer` only; everyone else is staff/member chrome).
- **/lo-development, /training-academy, /marketing** = `canAccessGate(<gate>, {role,status:"approved"}, null)` (auth.ts — the live RoleGate path; permissions passed null = role-list only, matching the view-as gate path).
- **/coach-command-center** = `getCoachAccess().isCoach` (coachAccess.ts `COACH_ROLES` + admins).
- **/admin** = `isAdminRole(role)` (auth.ts `ADMIN_ROLES`) — the admin page's role check (ignoring per-user `can_access_admin` grants).
- **Dashboard** = `getRoleDashboardHref(role)` (auth.ts `roleDashboardHrefs`).

| # | Role key | AI assistant? | Nav set | /lo-development | /training-academy | /marketing | /coach-command-center | /admin | Dashboard |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `loan_officer` | **No** | LO | No | No | No | No | No | `/normal-lo/` |
| 2 | `coaching_member_level_1` (LO Mastery Member) | Yes | staff/member | No | No | No | No | No | `/member-area/lo-mastery/` |
| 3 | `coaching_member_level_2` (Loan Factory Alliance Member) | Yes | staff/member | No | No | No | No | No | `/member-area/alliance/` |
| 4 | `lo_mastery_coach` | Yes | staff | No | No | No | Yes | No | `/coach-command-center/` |
| 5 | `loan_factory_alliance_coach` | Yes | staff | No | No | No | Yes | No | `/coach-command-center/` |
| 6 | `corporate_coach` | Yes | staff | No | No | No | Yes | No | `/coach-command-center/` |
| 7 | `corporate_coach_supervisor` | Yes | staff | No | No | No | Yes | No | `/coach-command-center/` |
| 8 | `team_leader` | Yes | staff | No | No | No | Yes | No | `/team-leader-guide/` |
| 9 | `marketing` | Yes | staff | No | No | **Yes** | No | No | `/marketing/` |
| 10 | `loan_officer_support` | Yes | staff | **Yes** | No | No | No | No | `/loan-officer-support/` |
| 11 | `training_academy` | Yes | staff | **Yes** | **Yes** | No | **Yes** | No | `/training-academy/` |
| 12 | `lo_development_member` | Yes | staff | **Yes** | **Yes** | **Yes** | **Yes** | No | `/lo-development/` |
| 13 | `lo_development_lead` | Yes | staff | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** | `/lo-development/` |
| 14 | `admin` | Yes | staff | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** | `/admin/` |
| 15 | `master_admin` | Yes | staff | **Yes** | **Yes** | **Yes** | **Yes** | **Yes** | `/admin/` |

Notes on a few cells:
- **`/admin` for `lo_development_lead`:** `isAdminRole` returns `true`
  (`ADMIN_ROLES = ["master_admin","admin","lo_development_lead"]`), so the lead
  passes the admin page check **and** the `canAccessGate` admin short-circuit
  (`isAdminRole` → `true` opens *every* gate for the lead). That is why rows 13
  show "Yes" across `/lo-development`, `/training-academy`, `/marketing`.
- **`/coach-command-center`:** `coachAccess.COACH_ROLES` includes
  `lo_development_member` and `training_academy` (mapped to the `lo_development`
  coach scope), so both are coaches there. `loan_officer_support` is **not** a
  coach role → No.
- **Members (rows 2–3) get the AI assistant** per the Lead's `roleHasAssistant`
  (paid coaching members are included). They are **not** staff and cannot open
  any staff command center; their dashboard is the member area.

---

## Findings — inconsistencies for the Lead to reconcile (no edits made here)

These are reported only. I did **not** touch `roles.ts`, `auth.ts`, or any gate.

### F1 — `accessByGate` (roles.ts) vs `canAccessGate` (auth.ts) diverge on several gates
`RoleGate` uses `canAccessGate`. `accessByGate` (roles.ts, keyed by hyphen
`RoleId`) is a separate map. They disagree, so the roles-directory / preview view
can imply access a real session does not get (or vice-versa):

| Gate | `canAccessGate` (auth.ts, **live**) vs `accessByGate` (roles.ts) |
|---|---|
| `loan-officer-support` / `support` | **Real divergence.** auth.ts allows `loan_officer_support`, `lo_development_lead`, **`lo_development_member`**, `master_admin`, `admin`. roles.ts `support` allows only `admin`, `master-admin`, `lo-development-lead`, `loan-officer-support` — it **omits `lo-development-member`**. A `lo_development_member` is granted the staff support center by the live gate but the roles directory would not show it. |
| `marketing` | auth.ts also allows legacy alias `lo_development`; roles.ts has no `lo-development` alias key (roles.ts predates the alias). Equivalent for canonical roles. |
| `support-routing` | **No divergence** on canonical roles — both include `loan_officer`, `loan_officer_support`, `support_staff`, `lo_development_lead`, `lo_development_member`, admins. auth.ts additionally carries the legacy `lo_development` alias. |
| `lo-development` | auth.ts also allows legacy alias `lo_development`; roles.ts uses `lo-development-member`/`-lead` only. Equivalent for canonical roles. |

**Recommendation:** treat `canAccessGate` (auth.ts) as canonical and bring
`accessByGate` (roles.ts) into line, or generate one from the other, so the role
directory cannot misrepresent live access. (Lead's call — both files are outside
my owned paths.)

### F2 — `roleHasAssistant` includes `loan_officer_support`, but `support_staff` is excluded
`ASSISTANT_ROLES` (effectiveAccess.ts) lists `loan_officer_support` (assistant:
yes) but intentionally excludes `support_staff` and `vendor_partner_future`. This
matches the Lead's documented intent ("only the roles Jeremy enumerated"). Flagged
only so it is a conscious choice: a `support_staff` user gets no pill while
`loan_officer_support` does. No spec conflict — `support_staff` is a legacy/edge
role not in the 15-role list.

### F3 — `roleActionMap` (roleAssistant.ts) still defines `LOAN_OFFICER_ACTIONS`
`roleActionMap.loan_officer` maps to `LOAN_OFFICER_ACTIONS` (6 draft actions).
This is **dormant for the pill** because the Lead's `RoleAssistantMount` hides the
pill entirely for `loan_officer` (gated on `roleHasAssistant` = false), so these
actions never render for an LO. The dashboard `CommandCenterChat` (the LO-allowed
surface) does **not** consume `getRoleAssistantActionIds` at all — it only calls
`answerPlatformQuestion` (guided answers). So the LO sees guided answers only, no
actions, as the spec requires. Left as-is (harmless, and it keeps the map total in
case the pill policy ever changes); flagged for awareness. No action taken since
editing it has no user-visible effect and risks drift from the Lead's pill gate.

### F4 — Members (`coaching_member_level_1/2`) get the AI pill but `MEMBER_ACTIONS` is self-directed
Confirmed consistent: members get the pill (`roleHasAssistant` = yes) and a
self-directed `MEMBER_ACTIONS` set (note/summary/follow-up/scorecard-reminder/
action-items/training-rec/AI-Advantage-prompt) — no escalation or task-authoring.
Matches spec ("members get a self-directed subset"). No issue.

### F5 — `/coaching/` is ungated (intentional, LO-safe) — relied on by this fix
The LO `coaching`/`scorecard` answers now link to `/coaching/`, which has no
`RoleGate` (public overview that explains the two paid tiers and how to join).
This is the correct LO-facing destination; the deep `/member-area/**` links remain
for member/staff buckets only. Flagged so the Lead knows the LO guided path now
depends on `/coaching/` staying an ungated overview.

---

## Build-green statement
- `tsc --noEmit -p tsconfig.json` → **exit 0, zero output** after the edits.
- Only `src/data/roleAssistant.ts` was modified (LO-reachable guided answers).
  No gate, RLS, migration, `roles.ts`, `auth.ts`, `effectiveAccess.ts`,
  `RoleGate.tsx`, or `RoleAssistantMount.tsx` touched.
- No access widened; LO links moved from staff/member surfaces (denied) to
  LO-facing surfaces (allowed). Honesty + naming rules preserved.
