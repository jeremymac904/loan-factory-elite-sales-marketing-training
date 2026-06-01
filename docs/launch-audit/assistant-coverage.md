# Universal Assistant Coverage (P4) — Verification

Status: **VERIFIED, SHIPPED at HEAD e387187.** Read-only audit. No source changes made by this audit.

Scope: the ONE global right-side slide-out assistant (`RoleAssistantPanel`) mounted once via `RoleAssistantMount` in `src/app/layout.tsx:46`. Draft-only. Role-aware, page-aware, View-as aware.

Files audited:
- `src/data/roleAssistant.ts` (action registry, per-role lists, `getRoleAssistantActionIds`, `getAssistantConfig`)
- `src/components/assistant/RoleAssistantPanel.tsx` (the panel UI)
- `src/components/assistant/RoleAssistantMount.tsx` (server wrapper, effective-role resolver)
- `src/app/layout.tsx:9,46` (global mount)
- `src/lib/supabase/auth.ts:65-85` (`roleLabels`), `src/lib/viewAs.ts:25` (`getViewAsState`)

---

## 1. Role → action-list coverage matrix (all 15 required roles)

`roleActionMap` lives at `src/data/roleAssistant.ts:283-302`; `getRoleAssistantActionIds()` at `:304-309` returns `roleActionMap[role] ?? DEFAULT_ACTIONS`. A role is "covered" when it has an **explicit** mapping (does NOT fall through to `DEFAULT_ACTIONS` at `:273-279`).

| # | Required role key | Mapped? (line) | Action list constant | # actions | Falls to DEFAULT? |
|---|---|---|---|---|---|
| 1 | `master_admin` | yes (`:284`) | `ADMIN_ACTIONS` (`:162`) | 11 | No |
| 2 | `admin` | yes (`:285`) | `ADMIN_ACTIONS` | 11 | No |
| 3 | `lo_development_lead` | yes (`:286`) | `LO_DEVELOPMENT_ACTIONS` (`:176`) | 12 | No |
| 4 | `lo_development_member` | yes (`:287`) | `LO_DEVELOPMENT_ACTIONS` | 12 | No |
| 5 | `training_academy` | yes (`:289`) | `TRAINING_ACADEMY_ACTIONS` (`:191`) | 9 | No |
| 6 | `loan_officer_support` | yes (`:290`) | `SUPPORT_ACTIONS` (`:203`) | 7 | No |
| 7 | `marketing` | yes (`:291`) | `MARKETING_ACTIONS` (`:213`) | 8 | No |
| 8 | `corporate_coach` | yes (`:293`) | `COACH_ACTIONS` (`:224`) | 13 | No |
| 9 | `corporate_coach_supervisor` | yes (`:294`) | `COACH_ACTIONS` | 13 | No |
| 10 | `lo_mastery_coach` | yes (`:295`) | `COACH_ACTIONS` | 13 | No |
| 11 | `loan_factory_alliance_coach` | yes (`:296`) | `COACH_ACTIONS` | 13 | No |
| 12 | `team_leader` | yes (`:298`) | `TEAM_LEADER_ACTIONS` (`:240`) | 11 | No |
| 13 | `coaching_member_level_1` | yes (`:299`) | `MEMBER_ACTIONS` (`:254`) | 7 | No |
| 14 | `coaching_member_level_2` | yes (`:300`) | `MEMBER_ACTIONS` | 7 | No |
| 15 | `loan_officer` | yes (`:301`) | `LOAN_OFFICER_ACTIONS` (`:264`) | 6 | No |

**Result: 15/15 required roles map to a tailored action list. ZERO required roles fall through to `DEFAULT_ACTIONS`.**

Bonus roles also mapped (not in the 15 but present and correct):
- `lo_development` (`:288`) → `LO_DEVELOPMENT_ACTIONS` — the triple-label legacy key; covered.
- `support_staff` (`:292`) → `SUPPORT_ACTIONS` — covered.
- `coaching_director` (`:297`) → `COACH_ACTIONS` — covered.

Roles that DO fall to `DEFAULT_ACTIONS` (acceptable — none are in the required 15, and `DEFAULT_ACTIONS` is a sensible self-directed subset, not empty):
- `vendor_partner_future` (exists in `roleLabels` `:84`, intentionally unmapped — future role).
- Any unknown/legacy role string. The fallback is `DEFAULT_ACTIONS` (5 actions), never empty, so the panel still renders usefully. `null`/`undefined` role also returns `DEFAULT_ACTIONS` (`:307`).

No gap found. Every action id referenced in every list exists in `roleAssistantActionRegistry` (`:52-146`) — `getAssistantConfig` maps ids via `getRoleAssistantAction` (`:367`), which would throw on a bad id; all lists use only the 15 registered ids, so TS + runtime are consistent.

---

## 2. Mount behavior — required properties (all confirmed)

| Requirement | Confirmed? | Evidence |
|---|---|---|
| Mounted ONCE globally | Yes | `RoleAssistantMount` imported `src/app/layout.tsx:9`, rendered `:46` (single site-wide mount). |
| Role-aware | Yes | `RoleAssistantPanel` takes `role`/`roleLabel`; `getAssistantConfig(role, roleLabel, pathname)` drives the action list (`RoleAssistantPanel.tsx:47-50`). |
| Page-aware (`usePathname`) | Yes | `const pathname = usePathname()` (`RoleAssistantPanel.tsx:39`); fed to `getAssistantConfig` → `pageContextLabel()` (`roleAssistant.ts:317-344`). Panel shows "On: {pageContext}" (`:212-214`). |
| View-as aware | Yes | `RoleAssistantMount.tsx:16-25` resolves `effectiveRole = viewAs?.role \|\| session.profile.role` from `getViewAsState()` (`src/lib/viewAs.ts:25`). View-as wins; label via `getRoleLabel(effectiveRole)` (`:28`). Panel re-syncs the selected action when the role/page list changes (`RoleAssistantPanel.tsx:57-63`). |
| Draft-only / nothing sent | Yes | Header pill "Draft-only · nothing is sent" (`:203-205`); integration actions show "Draft only — nothing is sent. Integration required before this can actually send." (`:252-257`); save = `localStorage` only (`saveLocal` `:135-159`), copy = clipboard only (`copyDraft` `:124-133`). `INTEGRATION_NOTICE` baked into draft bodies for Gmail/Chat/Calendar (`roleAssistant.ts:375-376,404,407,410`). No fetch/server-action/external call anywhere in the component. |
| Right-side slide-out | Yes | `<aside class="fixed inset-y-0 right-0 ... w-[min(28rem,100vw)] ... translate-x-0/translate-x-full">` (`:192-200`). Slide transition, backdrop (`:182-189`), Escape closes + restores focus (`:71-81`). |
| Suppressed on `/coach-command-center` (no double panel) | Yes | Hard early-return: `if ((pathname ?? "").startsWith("/coach-command-center")) return null;` (`RoleAssistantPanel.tsx:163`). The roster-aware `CoachAssistantPanel` is mounted by `src/app/coach-command-center/layout.tsx:47-50` instead. No overlap. |
| Does not cover key controls (bottom-positioned, z-index) | Yes | Toggle button is `fixed bottom-20 right-4 z-40 ... sm:bottom-[5.5rem]` (`:177`) — explicitly comments it "Sits ABOVE the Send Feedback button (bottom-4 right-4) so neither covers the other." Backdrop `z-40` (`:187`), panel `z-50` (`:197`). Toggle and Send Feedback do not collide. Panel does not lengthen page (it is `fixed`, off-canvas until opened). |
| Only for approved users | Yes | `RoleAssistantMount.tsx:22`: `if (session.status !== "approved") return null;` and `:26-27` returns null when no effective role. Reuses the cache()-wrapped `getBetaUserSession()` (`:1,16`) — no second auth pattern, no cache unwrap. |
| Connects to dashboard chat via `lf:open-assistant` | Yes | Panel listens: `window.addEventListener("lf:open-assistant", onOpen)` (`:101-109`) → `openPanel()`. Chat dispatches the same event (see command-center-chat.md). |

---

## 3. Findings / gaps

- **No coverage gap.** All 15 required roles map to a non-default, role-appropriate action list (matrix above).
- **No security regression.** Mount reuses the cache()-wrapped session resolver, gates on `status === "approved"`, and honors View-as without exposing admin-only actions to non-admins (only `master_admin`/`admin` get `ADMIN_ACTIONS`). No RLS/auth touched.
- **Naming is clean** throughout `roleAssistant.ts`: "LO Mastery ($249)", "Loan Factory Alliance ($449)", "Sales and Marketing 101-601" (free internal, never "Elite"), "AI Advantage", "FaceGram", "View as role" (never "personate"), "Thuan" not referenced but no "Tuan" present, no "Apex Advisor". Confirmed in the file header comment (`:15-18`) and draft templates (`:398,422`).
- **Member/loan-officer least-privilege is correct**: `MEMBER_ACTIONS` and `LOAN_OFFICER_ACTIONS` exclude escalation/task-authoring (no `create_support_escalation_draft`, no `create_lo_development_task_draft`, no comms-integration drafts) — self-directed subset only, matching the documented intent at `:155-160`.

No fixes required for P4. Verified-no-change.
