# Login Handoff For Jeremy And Thuan

Date: 2026-05-31

This document is intentionally no-secrets. Do not paste Supabase keys, Google
OAuth secrets, service-role keys, or `.env` values into this file.

## Purpose

Use this handoff to verify local and preview login for the Loan Factory LO
Development Platform after credentials are configured by Jeremy or Thuan.

## Required Roles

The app expects approved users and role permissions for:

- `master_admin`
- `admin`
- `lo_development_lead`
- `lo_development_member`
- `training_academy`
- `loan_officer_support`
- `corporate_coach`
- `marketing`
- `team_leader`
- `coaching_member_level_1`
- `coaching_member_level_2`
- `loan_officer`
- `support_staff`

## Safe Setup Sequence

1. Confirm the local `.env` file exists without asking an agent to print it.
2. Confirm Supabase URL and anon key are configured for the intended sandbox or preview project.
3. Confirm service-role credentials remain server-only.
4. Confirm Google OAuth redirect URLs include the local and preview callback URLs.
5. Apply migrations only in the approved sandbox or preview Supabase project.
6. Seed approved users through the approved SQL/migration path.
7. Sign in with an approved `@loanfactory.com` test identity.
8. Open `/auth/status/`, `/profile/`, and the role dashboard returned in the header.
9. Use `/admin/view-as/` for role walkthroughs.

## Dashboard Destinations

- `master_admin`, `admin`: `/admin/`
- `lo_development_lead`, `lo_development_member`: `/lo-development/`
- `training_academy`: `/training-academy/`
- `loan_officer_support`, `support_staff`: `/loan-officer-support/`
- `corporate_coach`: `/coach-command-center/`
- `marketing`: `/marketing/`
- `coaching_member_level_1`: `/member-area/lo-mastery/`
- `coaching_member_level_2`: `/member-area/alliance/`
- `loan_officer`: `/normal-lo/`

## Verification Notes

- Do not weaken RLS to make a login pass.
- Do not run production migrations without approval.
- Do not create live scheduled jobs during login QA.
- Use preview mode only for UI review; real authorization still comes from Supabase profile and permissions.
