# Role aliases — Loan Factory LO Development Platform

This documents intentional duplicate / legacy role keys in the app-layer role
model so future edits do not "clean up" a key that a Supabase migration still
depends on.

Source of truth for labels and dashboard routes:
`src/lib/supabase/auth.ts` (`roleLabels`, `roleDashboardHrefs`, `BetaRole`).

## LO Development role keys

There are three LO Development role keys. Two are canonical, one is a legacy
alias. **Keep all three** — removing the alias would break existing seeded rows.

| Role key | Label | Status | Notes |
|---|---|---|---|
| `lo_development_lead` | LO Development Lead | Canonical | Admin-level LO Development owner (in `ADMIN_ROLES`). |
| `lo_development_member` | LO Development Member | Canonical | LO Development staff. This is the **canonical** non-lead key going forward and the only LO Development entry surfaced in the View-as dropdown. |
| `lo_development` | LO Development | Legacy alias | **Do not delete.** A Supabase migration (`supabase/migrations/20260527000000_role_access_system.sql`) and earlier seeds reference `lo_development`. Treat any row with this role exactly the same as `lo_development_member`. |

### Alias rule

> `lo_development` is a **legacy alias**. Treat it the same as
> `lo_development_member`. The canonical role keys going forward are
> `lo_development_lead` (lead/admin) and `lo_development_member` (staff).

Practical implications:

- **Labels:** `lo_development_member` renders as **"LO Development Member"**;
  `lo_development` (legacy) renders as **"LO Development"**. Both point at the
  `/lo-development/` dashboard.
- **Gating:** `canAccessGate()` in `src/lib/supabase/auth.ts` (owned by PA1)
  already lists `lo_development`, `lo_development_lead`, and
  `lo_development_member` together in the `lo-development` and
  `team-leader-guide` gates, so the alias and canonical keys grant the same
  access.
- **New code:** prefer `lo_development_member` for new assignments. Only emit
  `lo_development` when interoperating with the legacy migration data.
- **View-as:** the admin **View as role** dropdown
  (`src/data/adminViewAsRoles.ts`) lists `lo_development_member`, not the legacy
  `lo_development`, because previewing the canonical member role exercises the
  same surfaces.

## Why keep the duplicate at all?

Backward compatibility. The `20260527000000_role_access_system.sql` migration
already assigned `lo_development` to real rows in the live database
(Supabase ref `ajitnzvbplyjrlzwzmwe`). Renaming or dropping the key in the app
layer without a coordinated data migration would orphan those users (their role
would fall through to the `pending`/profile fallback). No schema, RLS, or seed
changes are made here — this is purely an app-layer labeling + documentation
decision.
