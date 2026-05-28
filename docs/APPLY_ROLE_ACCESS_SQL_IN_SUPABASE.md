# Apply Role Access SQL in Supabase

**Last updated:** 2026-05-27

## Migration Order

Apply these migrations in order in the Supabase SQL Editor:

1. `20260522000000_beta_auth_foundation.sql` — already applied (tables, RLS, functions)
2. `20260522220737_beta_auth_grants_and_seed.sql` — already applied (grants, initial seeds)
3. `20260526000000_lender_escalations.sql` — apply if not yet applied
4. **`20260527000000_role_access_system.sql`** — NEW: expanded roles, user_roles, seeds

## How to Apply

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open a new query
4. Copy the entire contents of the migration file
5. Paste into the SQL editor
6. Click **Run**
7. Verify no errors in the output

## Migration 3: Lender Escalations

If not yet applied, copy and run the contents of:

```
supabase/migrations/20260526000000_lender_escalations.sql
```

## Migration 4: Role Access System (NEW)

Copy and run the contents of:

```
supabase/migrations/20260527000000_role_access_system.sql
```

This migration:
- Adds new columns to `profiles` (phone, secondary_phone, profile_url, team_brand, notes, primary_role, last_sign_in_at)
- Creates the `user_roles` table for multi-role support
- Adds new permission columns to `role_permissions` (can_access_lo_development, can_access_support, can_access_team_leader, can_manage_users)
- Seeds all 12 role permission rows
- Seeds 35 approved users across 7 departments
- Seeds multi-role entries for Jeremy McDonald and Benjamin Huynh

## Verification

After applying, verify with:

```sql
-- Check approved users count
select count(*) from public.approved_users where active = true;
-- Expected: 35

-- Check role permissions
select role from public.role_permissions order by role;
-- Expected: 12 rows

-- Check user_roles
select * from public.user_roles order by user_email;
-- Expected: 37 rows (35 primary + 2 additional)

-- Check new profile columns exist
select column_name from information_schema.columns
where table_name = 'profiles' and column_name in ('phone', 'profile_url', 'team_brand', 'primary_role');
-- Expected: 4 rows
```

## Rollback

If needed, the migration is safe to re-run (all inserts use `on conflict`).
To remove the new tables/columns:

```sql
-- Remove user_roles table
drop table if exists public.user_roles;

-- Remove new profile columns
alter table public.profiles
  drop column if exists phone,
  drop column if exists secondary_phone,
  drop column if exists profile_url,
  drop column if exists team_brand,
  drop column if exists notes,
  drop column if exists primary_role,
  drop column if exists last_sign_in_at;

-- Remove new permission columns
alter table public.role_permissions
  drop column if exists can_access_lo_development,
  drop column if exists can_access_support,
  drop column if exists can_access_team_leader,
  drop column if exists can_manage_users;
```
