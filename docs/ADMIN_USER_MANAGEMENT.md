# Admin User Management

**Last updated:** 2026-05-27

## Overview

The admin user management page at `/admin/users` shows all approved beta users
with their roles, departments, titles, and multi-role assignments.

## Access

Only users with admin-level roles can access `/admin/users`:
- `master_admin`
- `admin`
- `lo_development_lead`

Beta preview mode also shows the page for internal UI review.

## Current Capabilities (Beta)

- **View** all approved users in a sortable table
- **See** role badges and multi-role indicators
- **See** department and title assignments
- **See** active status for each user

## Planned Post-Beta Features

- In-app user creation (add approved users without SQL)
- Role change UI (change roles from the admin page)
- User deactivation UI
- Last sign-in tracking
- Activity/audit log per user
- Bulk user import

## How It Works

During beta, the admin/users page reads from `src/data/approvedUsers.ts` — a
static seed file that mirrors the Supabase `approved_users` table. This ensures
the admin page works even when Supabase is not connected (e.g., local development,
preview deployments).

When Supabase is fully connected, the page will query the `approved_users` and
`profiles` tables directly for live data.
