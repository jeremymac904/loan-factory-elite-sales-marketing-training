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
AI_ASSISTANT_TIMEOUT_MS=20000

AI_PRIMARY_PROVIDER=deepseek
AI_DEFAULT_CHAT_MODEL=deepseek-chat
AI_ASSISTANT_MODEL=<exact DeepSeek Flash v4 Chat model id>
AI_REASONING_MODEL=deepseek-chat
AI_TRANSCRIPTION_MODEL=whisper-large-v3-turbo
AI_VISION_MODEL=
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=<exact DeepSeek API base URL>
DEEPSEEK_MODEL=<exact DeepSeek Flash v4 Chat model id>

OPENROUTER_API_KEY=
OPENROUTER_BASE_URL=
OPENROUTER_MODEL=openrouter/free

GROQ_API_KEY=
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
```

Scopes:

- Use the same values for Production deploys.
- Add Preview/Branch scopes if testing deploy previews.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code or in public logs.
- Never expose `DEEPSEEK_API_KEY` or `GROQ_API_KEY` in client code or in public logs.
- Do not prefix AI provider keys with `NEXT_PUBLIC_`.
- `AI_DEFAULT_CHAT_MODEL` must never be `openrouter/auto`. Use `deepseek-chat` or remove it.
- `DEEPSEEK_BASE_URL`, `DEEPSEEK_MODEL`, `AI_PRIMARY_PROVIDER`, and `AI_ASSISTANT_MODEL` must be set explicitly for the DeepSeek path.
- `AI_REASONING_MODEL` should match the same DeepSeek reasoning model you want to audit in admin.
- `AI_TRANSCRIPTION_MODEL` should point at the Groq Whisper model used for transcription.
- `OPENROUTER_*` values are audit-only in this build. OpenRouter auto is blocked and paid OpenRouter fallback is disabled.
- `GROQ_BASE_URL` and `GROQ_WHISPER_MODEL` are supported for transcription; the
  route falls back to Groq's standard base URL if `GROQ_BASE_URL` is omitted.
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
