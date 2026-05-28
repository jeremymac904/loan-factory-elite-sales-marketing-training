# Role-Based Access Model

**Status:** Role-based access system implemented with expanded roles, multi-role support, and full user seeds.
**Owner:** Jeremy McDonald, with Andre and Edward to confirm scopes.
**Last updated:** 2026-05-27

## Overview

The LO Development Platform uses a role-based access system backed by Supabase.
Users sign in with their `@loanfactory.com` Google Workspace email. On sign-in,
the auth callback checks the `approved_users` table and creates/updates a
`profiles` row with the matching role and status.

**Beta reminder:** Public landing/resource pages remain reviewable. Protected beta surfaces use Supabase role checks. TERA remains separate; this app does not read from or write to TERA.

---

## Roles

| Role | DB Key | Access Level | Primary Audience |
|------|--------|-------------|-----------------|
| Master Admin | `master_admin` | Full platform + user management | Jeremy McDonald |
| Admin | `admin` | Full operational access | Senior internal admins (Thuan) |
| LO Development Lead | `lo_development_lead` | Admin-lite + LO Dev leadership | Andre King |
| LO Development Member | `lo_development_member` | LO Dev resources + coaching | LO Dev contributors |
| Loan Officer Support | `loan_officer_support` | Support routing + lender escalation | LO Support team |
| Corporate Coach | `corporate_coach` | Coaching areas + FaceGram moderation | Corporate coaches |
| Marketing | `marketing` | Marketing review + FaceGram content | Marketing team |
| Team Leader | `team_leader` | 1+1+1=5 + team resources | Team leaders |
| LO Mastery Coaching | `coaching_member_level_1` | $249 coaching member resources | Coaching members |
| Loan Factory Alliance | `coaching_member_level_2` | $449 alliance member resources | Alliance members |
| Loan Officer | `loan_officer` | Standard beta platform | Approved LOs |
| Vendor Partner (Future) | `vendor_partner_future` | Reserved — not enabled in beta | Future FaceGram/vendor |

---

## Multi-Role Support

The `user_roles` table is a join table mapping `user_email` to multiple roles.
The `approved_users.role` field remains the primary/display role.

Current multi-role users:
- **Jeremy McDonald:** `master_admin` + `team_leader`
- **Benjamin Huynh:** `lo_development_member` + `loan_officer_support`

---

## Permission Matrix

The `role_permissions` table maps each role to boolean permission flags:

| Permission | master_admin | admin | lo_dev_lead | lo_dev_member | lo_support | coach | marketing | team_leader | coaching_1 | coaching_2 | loan_officer |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| can_access_admin | Y | Y | Y | - | - | - | - | - | - | - | - |
| can_access_coaching | Y | Y | Y | Y | - | Y | - | Y | Y | Y | - |
| can_access_facegram | Y | Y | Y | Y | - | Y | Y | Y | Y | Y | Y |
| can_access_ai_assistants | Y | Y | Y | Y | - | Y | Y | Y | Y | Y | Y |
| can_access_resources | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| can_moderate_facegram | Y | Y | Y | - | - | Y | Y | - | - | - | - |
| can_review_marketing | Y | Y | - | - | - | - | Y | - | - | - | - |
| can_access_lo_development | Y | Y | Y | Y | - | - | - | - | - | - | - |
| can_access_support | Y | Y | Y | - | Y | - | - | - | - | - | - |
| can_access_team_leader | Y | Y | - | - | - | - | - | Y | - | - | - |
| can_manage_users | Y | Y | - | - | - | - | - | - | - | - | - |

---

## Auth Flow

1. User clicks "Sign In" on `/login/`
2. Google OAuth via Supabase Auth (`/auth/google/`)
3. Callback at `/auth/callback/` exchanges code for session
4. `syncApprovedProfile()` checks `approved_users` table
5. If approved: profile upserted with role + status `approved`, user redirected to app
6. If not approved: profile created with status `pending`, user redirected to `/access-pending/`

---

## App-Side Access Checks

- `getBetaUserSession()` in `src/lib/supabase/session.ts` — returns session with profile and permissions
- `isAdminRole(role)` — checks for `master_admin`, `admin`, or `lo_development_lead`
- `canAccessGate(gate, profile, permissions)` — checks gated surfaces
- RLS policies on Supabase enforce row-level security server-side

---

## Seeded Users

See `src/data/approvedUsers.ts` for the full list of 35 approved beta users.
See `supabase/migrations/20260527000000_role_access_system.sql` for the SQL seed.

---

## Open Items

- Andre: confirm LO Development team member access scopes
- Edward: confirm coach privacy rules for session notes
- Both: confirm whether team leaders can see Coach Hub data for their team members
