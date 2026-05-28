# Admin View-As Mode

**Last updated:** 2026-05-27

## What it does

Lets master admins preview the platform as any seeded user or role for
training walkthrough recording, without switching Google accounts.

## How it works

1. Sign in as a real master admin (e.g. Jeremy)
2. Navigate to `/admin/view-as/`
3. Pick a role or pick a specific seeded user
4. The site sets a `lf_view_as` cookie containing the chosen role/user
5. The orange `ViewAsBanner` appears on every page until exit
6. Navigation and gated surfaces appear as that role would see them
7. Click "Exit View-As" in the banner to return to your real session

## Safety

- You stay signed in as your real account
- Real data writes still go through your real account
- Destructive actions stay tied to your real role and account
- Use this strictly for visual preview / training video recording

## API

- `POST /api/view-as` with `{ role, email?, name? }` — sets cookie
- `DELETE /api/view-as` — clears cookie
- Both require an authenticated admin-role caller

## Files

- `src/app/admin/view-as/page.tsx`
- `src/app/api/view-as/route.ts`
- `src/components/ViewAsBanner.tsx`
- `src/components/ViewAsExitButton.tsx`
- `src/components/ViewAsControls.tsx`
- `src/lib/viewAs.ts`
