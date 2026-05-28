# Beta User Setup Guide

**Last updated:** 2026-05-27

## How Beta Access Works

1. A user must have a `@loanfactory.com` Google Workspace email
2. Their email must exist in the `approved_users` table in Supabase with `active = true`
3. When they sign in via Google OAuth, the auth callback checks `approved_users`
4. If found and active, a `profiles` row is created/updated with status `approved`
5. If not found, their profile is created with status `pending` and they see `/access-pending/`

## Adding a New Beta User

### Option A: Supabase SQL Editor

```sql
insert into public.approved_users (email, role, full_name, department, title, active)
values (
  'firstname.lastname@loanfactory.com',
  'loan_officer',           -- see role list below
  'First Last',
  'Department Name',
  null,                      -- title (optional)
  true
)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  title = excluded.title,
  active = excluded.active;
```

### Option B: Supabase Table Editor

1. Open Supabase Dashboard > Table Editor > `approved_users`
2. Click "Insert row"
3. Fill in: email, role, full_name, department, active = true
4. Save

### After Adding

The user can sign in immediately. On first sign-in, their profile is created
automatically from the approved_users data.

## Changing a User's Role

```sql
update public.approved_users
set role = 'new_role'
where email = 'user@loanfactory.com';

update public.profiles
set role = 'new_role'
where email = 'user@loanfactory.com';
```

## Deactivating a User

```sql
update public.approved_users
set active = false
where email = 'user@loanfactory.com';

update public.profiles
set status = 'deactivated'
where email = 'user@loanfactory.com';
```

## Available Roles

| Role Key | Display Name | Use For |
|----------|-------------|---------|
| `master_admin` | Master Admin | Jeremy only |
| `admin` | Admin | Senior internal admins |
| `lo_development_lead` | LO Development Lead | Andre |
| `lo_development_member` | LO Development | LO Dev team members |
| `loan_officer_support` | Loan Officer Support | Support team |
| `corporate_coach` | Corporate Coach | Certified coaches |
| `marketing` | Marketing | Marketing team |
| `team_leader` | Team Leader | Team leaders |
| `coaching_member_level_1` | LO Mastery Coaching | $249 members |
| `coaching_member_level_2` | Loan Factory Alliance | $449 members |
| `loan_officer` | Loan Officer | Standard LOs |

## Multi-Role Users

Some users need access across multiple lanes. Add entries to `user_roles`:

```sql
insert into public.user_roles (user_email, role, granted_by)
values ('user@loanfactory.com', 'additional_role', 'admin_name')
on conflict (user_email, role) do nothing;
```

## Current Seed Count

35 users are seeded across 7 departments. See `src/data/approvedUsers.ts` for the full list.
