# Google OAuth Branding Fix

## Current issue
The Google sign-in screen says **"to continue to ajitnzvbplyjrlzwzmwe.supabase.co"**
instead of a Loan Factory name.

## Root cause
The app calls Supabase's `signInWithOAuth({ provider: "google" })`. Supabase
hands Google a redirect URI on its own host
(`https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`). Google's screen
shows the OAuth **consent screen "App name"**; when that App name isn't branded
(or the app isn't Internal/verified), Google falls back to showing the
redirect-URI host (`ajitnzvbplyjrlzwzmwe.supabase.co`). The app's own
`redirectTo` (the Netlify URL) only controls where Supabase sends the user
**after** Google — it cannot change Google's text. **This is not fixable in
code**; it is configured in Google Cloud Console + the Supabase dashboard.

## Exact app name to use
**Loan Factory LO Development Platform**

## Authorized domain
Add `supabase.co` (required — the callback is on it) and `netlify.app`. Add
`loanfactory.com` if a custom auth domain is adopted later.

## Supabase callback URL
`https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`

## Live site URL
`https://loan-factory-elite-sales-marketing-tr.netlify.app`

## What Jeremy must click/change (no SQL, no code)
1. **Google Cloud Console → APIs & Services → OAuth consent screen**
   - User type: **Internal** (recommended — all @loanfactory.com Workspace
     sign-ins; publishes instantly, no verification, reliably shows the name).
   - App name: **Loan Factory LO Development Platform**
   - User support email + developer contact email; logo (optional).
   - Authorized domains: `supabase.co`, `netlify.app`.
   - App home page: the live site URL above. **Save.**
2. **Google Cloud Console → Credentials → the OAuth 2.0 Web client used by
   Supabase** (or create one named "Loan Factory LO Development Platform")
   - Authorized JavaScript origin: the live site URL.
   - Authorized redirect URI: the Supabase callback URL above. **Save**, then
     copy the **Client ID** and **Client Secret**.
3. **Supabase → Authentication → Providers → Google:** paste that Client ID +
   Client Secret. **Save.**
4. **Supabase → Authentication → URL Configuration:** Site URL = the live site
   URL; add it to Redirect URLs.
5. **(Optional, strongest)** Add a Supabase **Custom Domain** (e.g.
   `auth.loanfactory.com`); update the OAuth client's redirect URI to the custom
   callback. Then Google shows the Loan Factory domain and the supabase.co host
   disappears entirely.

## Do not break login
- If editing the existing OAuth client, only **add** consent-screen branding and
  keep the existing redirect URI. If creating a new client, paste the new Client
  ID/Secret into Supabase in one save and test immediately; keep the old client
  until verified.
- Never paste the Client Secret into the repo, `.env` in git, or any page.

## Validation
Incognito → live site → Sign In → Google → confirm the screen reads "Loan Factory
LO Development Platform" (or `auth.loanfactory.com`), not the supabase.co host,
and that an @loanfactory.com account still completes sign-in.

> Full step-by-step with guardrails is also in
> [GOOGLE_OAUTH_BRANDING_HANDOFF.md](GOOGLE_OAUTH_BRANDING_HANDOFF.md).
