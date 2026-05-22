# Netlify Environment Setup

Add these variables in Netlify Site configuration > Environment variables:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://loan-factory-elite-sales-marketing-tr.netlify.app

AI_ASSISTANTS_SANDBOX_ENABLED=true
AI_ASSISTANTS_REQUIRE_AUTH=true
AI_ASSISTANTS_ALLOW_UNSIGNED_SANDBOX=false
AI_ASSISTANTS_MAX_INPUT_CHARS=6000

OPENROUTER_API_KEY=
OPENROUTER_MODEL=deepseek/deepseek-chat
OPENROUTER_SITE_URL=https://loan-factory-elite-sales-marketing-tr.netlify.app
OPENROUTER_APP_TITLE=Loan Factory LO Development

GROQ_API_KEY=
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
```

Scopes:

- Use the same values for Production deploys.
- Add Preview/Branch scopes if testing deploy previews.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code or in public logs.
- Never expose `OPENROUTER_API_KEY` or `GROQ_API_KEY` in client code or in public logs.
- Do not prefix AI provider keys with `NEXT_PUBLIC_`.
- The AI backend remains sandbox-only. `externalActionsEnabled` is hard-coded `false`.

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
6. Open `/api/ai/status` and confirm AI provider configuration booleans without exposing secret values.
7. Open `/ai-assistants/` and confirm chat requests return draft-only responses when signed in.
