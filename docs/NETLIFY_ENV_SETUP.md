# Netlify Environment Setup

Add these variables in Netlify Site configuration > Environment variables:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://loan-factory-elite-sales-marketing-tr.netlify.app
```

Scopes:

- Use the same values for Production deploys.
- Add Preview/Branch scopes if testing deploy previews.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code or in public logs.

## Build Settings

- Build command: `npm run build`
- The app now needs server-capable Next.js output for Supabase OAuth callback
  routes and session cookies.
- Do not re-enable static export while Google Auth is active.

## After Adding Env Vars

1. Trigger a fresh Netlify deploy.
2. Confirm the deploy succeeds.
3. Confirm Netlify secret scan passes.
4. Open `/login/` and sign in with an approved Loan Factory Google account.
5. Confirm `/admin/` opens for admin users.
