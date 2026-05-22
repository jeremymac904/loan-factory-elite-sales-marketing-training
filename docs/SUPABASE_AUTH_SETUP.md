# Supabase Auth Setup

This app uses Supabase for beta Google Auth, Postgres data, role-based access,
and Row Level Security. It does not use Firebase and does not connect to TERA.
TERA remains the LOS/CRM system of record.

## Required Environment Variables

Set these in Netlify and local `.env.local` when testing locally:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://loan-factory-elite-sales-marketing-tr.netlify.app
```

Do not commit `.env.local`. Do not expose `SUPABASE_SERVICE_ROLE_KEY` in browser
code. The app only reads it in the server-side OAuth callback to sync approved
users into `profiles`.

## Supabase Auth URLs

In Supabase Auth settings:

- Site URL: `https://loan-factory-elite-sales-marketing-tr.netlify.app`
- Redirect URL: `https://loan-factory-elite-sales-marketing-tr.netlify.app/auth/callback`
- Optional local redirect URL: `http://localhost:3000/auth/callback`
- Optional main deploy redirect URL: `https://main--loan-factory-elite-sales-marketing-tr.netlify.app/auth/callback`

## Google OAuth Provider

1. In Google Cloud, create or select the OAuth client for the beta platform.
2. Add the Supabase provider callback URL from the Supabase Google provider
   screen. It has this shape: `https://<PROJECT_REF>.supabase.co/auth/v1/callback`.
3. In Supabase, open Authentication > Providers > Google.
4. Enable Google and paste the Google client ID and client secret.
5. Keep the app redirect URLs above in Supabase Authentication > URL
   Configuration.

## Login Flow

1. User opens `/login/`.
2. User clicks Sign in with Google.
3. Supabase redirects to Google.
4. Google redirects back to `/auth/callback`.
5. The callback verifies the email ends in `@loanfactory.com`.
6. The callback checks `approved_users` with the server-only service role key.
7. Approved users get a synced `profiles` row with status `approved`.
8. Unapproved users land on `/access-pending/`.

## Profile Sync Fix

If Google Auth succeeds but the user lands on
`/access-pending/?reason=profile-sync`, run the SQL in
`docs/SUPABASE_PROFILE_SYNC_FIX.sql`.

The fix explicitly grants PostgREST/Data API access to the beta tables for
`authenticated` and `service_role` while keeping Row Level Security enabled.
This is required for newer Supabase projects where SQL-created public tables
are no longer exposed to the Data API automatically.

## Testing

Use `/auth/status/` after signing in. It compares server session state and
browser session state without printing token values or API keys.
