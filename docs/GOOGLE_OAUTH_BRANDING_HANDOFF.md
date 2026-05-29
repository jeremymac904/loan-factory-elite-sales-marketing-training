# Google OAuth Branding — Admin Handoff

**Date:** 2026-05-28
**Issue:** The Google sign-in screen says *"to continue to ajitnzvbplyjrlzwzmwe.supabase.co"* instead of a branded name.
**Goal:** Show **Loan Factory LO Development Platform** (or a Loan Factory domain) on the Google sign-in screen.

## Why this happens (root cause)
When a user clicks Sign In, the app calls Supabase's `signInWithOAuth({ provider: "google" })`. Supabase sends Google a **redirect_uri on its own domain**: `https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`. Google's screen shows **"to continue to {App name}"** from the **OAuth consent screen** — but when the consent screen App name isn't branded (or the app isn't Internal/verified), Google falls back to showing the **redirect-URI host** (`ajitnzvbplyjrlzwzmwe.supabase.co`).

The app's own `redirectTo` (the Netlify URL) only controls where Supabase sends the user *after* Google — it does **not** change Google's screen. So **this is not fixable in code**; it is configured in Google Cloud Console + the Supabase dashboard.

Reference: https://supabase.com/docs/guides/auth/social-login/auth-google

## Known values
- Supabase project ref: `ajitnzvbplyjrlzwzmwe`
- **Supabase OAuth callback (the Google redirect URI):** `https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`
- Live app: `https://loan-factory-elite-sales-marketing-tr.netlify.app`
- Required App name: **Loan Factory LO Development Platform**

---

## Recommended fix (cleanest, if everyone uses @loanfactory.com Google Workspace)

Set the OAuth consent screen **User Type = Internal** with a branded **App name**. Internal apps publish instantly, skip Google verification, and reliably show the App name. This is the likely setup behind Loan Factory's normal branded portal.

### A. Google Cloud Console — OAuth consent screen
Use the Google Cloud project that owns the OAuth client currently in Supabase (its Client ID is visible in Supabase → Auth → Providers → Google), or the Loan Factory Workspace project for a dedicated branded app.

1. **APIs & Services → OAuth consent screen**
   - User Type: **Internal** (if all sign-ins are @loanfactory.com Workspace) — otherwise External.
   - App name: **Loan Factory LO Development Platform**
   - User support email: a Loan Factory address
   - App logo: Loan Factory logo (optional — appears on the screen)
   - Application home page: `https://loan-factory-elite-sales-marketing-tr.netlify.app`
   - **Authorized domains:** add `supabase.co` (required — the callback is on it) and `netlify.app`; add `loanfactory.com` if you adopt a custom domain.
   - Developer contact email.
   - **Save.** (Internal = live immediately. External may require verification before the name shows for everyone.)

### B. Google Cloud Console — OAuth client (Credentials)
2. **APIs & Services → Credentials →** the OAuth 2.0 **Web application** client used by Supabase (or create a new one named "Loan Factory LO Development Platform").
   - Authorized JavaScript origins: `https://loan-factory-elite-sales-marketing-tr.netlify.app`
   - **Authorized redirect URIs:** `https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`
   - **Save.** Copy the **Client ID** and **Client Secret**.

### C. Supabase dashboard — Google provider
3. **Authentication → Providers → Google:** ensure Enabled, paste the **Client ID** and **Client Secret** from step B. Save.
4. **Authentication → URL Configuration:**
   - Site URL: `https://loan-factory-elite-sales-marketing-tr.netlify.app`
   - Redirect URLs: add `https://loan-factory-elite-sales-marketing-tr.netlify.app/**` (and `http://localhost:3000/**` for local).

---

## Strongest branding (optional) — Supabase custom auth domain
If you want the screen to show a **Loan Factory domain** instead of any supabase.co host:
5. Add a Supabase **Custom Domain** (Project Settings → add-on), e.g. `auth.loanfactory.com`, and point DNS as Supabase instructs.
6. The callback becomes `https://auth.loanfactory.com/auth/v1/callback` — update the Google client's **Authorized redirect URI** to match. Now Google shows `auth.loanfactory.com`, and the supabase.co host is gone entirely.

---

## Do-not-break-login guardrails
- If editing the **existing** OAuth client: only **add** consent-screen branding and confirm the supabase callback is still in the redirect URIs — do **not** remove existing redirect URIs.
- If creating a **new** client: paste the new Client ID/Secret into Supabase in a single save, then test immediately. Keep the old client until the new one is verified working.
- Never paste the Client Secret anywhere except the Supabase provider field. Do not commit it to the repo or `.env` in git.

## Validation steps
1. Open an **incognito** window → `https://loan-factory-elite-sales-marketing-tr.netlify.app` → Sign In → Google.
2. Confirm the screen reads **"Loan Factory LO Development Platform"** (or `auth.loanfactory.com`), not `ajitnzvbplyjrlzwzmwe.supabase.co`.
3. Confirm an **@loanfactory.com** account still completes sign-in and lands approved (no login regression).

## What can / can't be done in code
- **Cannot** (branding is owned by Google's consent screen + the OAuth client + Supabase provider config).
- Code already does the right thing: `redirectTo` points at the branded Netlify `/auth/callback`, and Site URL is read from `NEXT_PUBLIC_SITE_URL`. Only **verify** `NEXT_PUBLIC_SITE_URL` on Netlify equals the live URL (no code change needed).
