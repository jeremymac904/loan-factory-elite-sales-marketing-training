# Google OAuth Consent + Supabase Auth Branding

## Problem this fixes

During Google sign-in, the consent screen and the redirect chooser show:

> "to continue to **ajitnzvbplyjrlzwzmwe.supabase.co**"

That host string is rendered by **Google's OAuth consent screen** and the
**Supabase auth host** — it is NOT produced by this Next.js app and cannot be
changed in app code. The fixes below are all done in the Google Cloud Console
and the Supabase Dashboard. The only way to remove the `supabase.co` host
entirely is a paid Supabase Custom Auth Domain (see the last section).

These are manual one-time console steps. No app code changes are required and
none of this is wired through the repo.

---

## 1. Google Cloud Console — OAuth consent screen / Branding

Path: **Google Cloud Console → APIs & Services → OAuth consent screen**
(newer console: **APIs & Services → OAuth consent screen → Branding**).

Set the following fields:

| Field | Value |
| --- | --- |
| **App name** | `Loan Factory LO Development Platform` |
| **User support email** | a monitored Loan Factory address (e.g. the LO Development / admin mailbox) |
| **App logo** | upload the Loan Factory logo (square PNG, <= 1 MB). After upload Google may require brand verification before the logo shows publicly. |
| **App home page** | `https://<your-production-domain>/` |
| **Application privacy policy link** | `https://<your-production-domain>/privacy` (or the canonical Loan Factory privacy URL) |
| **Application terms of service link** | optional; `https://<your-production-domain>/terms` if one exists |
| **Authorized domains** | add `loanfactory.com` **and** `supabase.co` |
| **Developer contact information** | a monitored Loan Factory address |

The **App name** you set here is exactly what replaces the generic text on the
consent screen. The `supabase.co` host still appears next to it because the
OAuth client lives on the Supabase auth host (removable only via Custom Auth
Domain — see below).

### Audience (publishing status)

Path: **OAuth consent screen → Audience**.

- If **every** user is `@loanfactory.com` (this platform is internal-only),
  set **Audience = Internal**. This restricts sign-in to the Google Workspace
  org, removes the "unverified app" warning, and skips Google's external
  verification/brand-review queue.
- Only use **External** if non-`@loanfactory.com` Google accounts must sign in
  (not the case for this platform per the access rules).

---

## 2. Google Cloud Console — OAuth 2.0 Client ID redirect URIs

Path: **APIs & Services → Credentials → OAuth 2.0 Client IDs → (the Web client
used by Supabase) → Authorized redirect URIs**.

Add exactly:

```
https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback
```

This is the Supabase callback Google posts back to. If it is missing or
mistyped, sign-in fails with `redirect_uri_mismatch`. Leave any existing valid
entries in place.

(Optional, only if you also expose a Supabase Custom Auth Domain — section 5 —
add that domain's `/auth/v1/callback` here as well.)

---

## 3. Supabase Dashboard — Authentication → URL Configuration

Path: **Supabase Dashboard → Authentication → URL Configuration**.

| Field | Value |
| --- | --- |
| **Site URL** | `https://<your-production-domain>/` (the live deployed app URL) |
| **Redirect URLs** | add each app return path used by the sign-in flow, e.g. `https://<your-production-domain>/auth/browser-callback` and `https://<your-production-domain>/auth/callback`. Include the local dev URLs (e.g. `http://localhost:3000/auth/browser-callback`) only if developers sign in locally. |

The app initiates OAuth with `redirectTo = <origin>/auth/browser-callback`
(see `src/components/GoogleSignInButton.tsx`), so that path **must** be present
in the Redirect URLs allowlist or Supabase rejects the return redirect.

---

## 4. Supabase Dashboard — Authentication → Providers → Google

Path: **Supabase Dashboard → Authentication → Providers → Google**.

- **Enabled**: on.
- **Client ID** / **Client Secret**: paste from the Google OAuth 2.0 Client ID
  created in section 2. (Do not commit these to the repo; they live only in the
  Supabase project config / environment.)
- Confirm the callback shown by Supabase matches the redirect URI added in
  section 2 (`https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`).

---

## 5. Removing the `supabase.co` host from the chooser (paid upgrade path)

Setting the App name (section 1) changes the consent-screen title, but the
host line will still read `...supabase.co` because the OAuth client is hosted
on the Supabase auth domain.

The **only** way to remove `supabase.co` from the consent screen / chooser
entirely is a **Supabase Custom Auth Domain** (a paid add-on; requires a paid
Supabase plan):

1. **Supabase Dashboard → Authentication → URL Configuration → Custom Domain**
   (or **Project Settings → Custom Domains**). Add an auth subdomain you
   control, e.g. `auth.loanfactory.com`.
2. Create the DNS records Supabase provides (CNAME / TXT) at the
   `loanfactory.com` DNS host and wait for verification.
3. Once the custom auth domain is active, the auth host becomes
   `https://auth.loanfactory.com`. Update **section 2** to add
   `https://auth.loanfactory.com/auth/v1/callback` as an Authorized redirect
   URI, and update the Google provider config accordingly.
4. After this, the consent screen reads "to continue to **auth.loanfactory.com**"
   instead of the `supabase.co` host.

This is the exact, and only, upgrade path to fully brand the host string. If
the paid Custom Auth Domain is not pursued, sections 1–4 still give the correct
**App name**, logo, and support email on the consent screen, which is the
primary trust improvement.

---

## Quick checklist

- [ ] OAuth consent screen App name = `Loan Factory LO Development Platform`
- [ ] User support email + developer contact set to a monitored Loan Factory mailbox
- [ ] App logo uploaded
- [ ] Authorized domains include `loanfactory.com` and `supabase.co`
- [ ] App home / privacy links set
- [ ] Audience = Internal (all users are `@loanfactory.com`)
- [ ] Authorized redirect URI = `https://ajitnzvbplyjrlzwzmwe.supabase.co/auth/v1/callback`
- [ ] Supabase Site URL + Redirect URLs include `/auth/browser-callback` and `/auth/callback`
- [ ] Supabase Google provider enabled with the matching Client ID / Secret
- [ ] (Optional, paid) Custom Auth Domain to remove the `supabase.co` host
