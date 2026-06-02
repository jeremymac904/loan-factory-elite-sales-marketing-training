# AI Assistant Backend Sandbox

## Status

The AI Assistant Hub has a sandbox backend for beta testing:

- Chat completions route through DeepSeek Flash v4 Chat when the DeepSeek env vars are configured.
- The chat model must be set explicitly with `AI_ASSISTANT_MODEL` or `DEEPSEEK_MODEL`; the app does not fall back to `openrouter/auto` or any paid OpenRouter route.
- `AI_DEFAULT_CHAT_MODEL` is audit-only in this build and must never be `openrouter/auto`.
- `AI_REASONING_MODEL` is audit-only in this build and should match the DeepSeek reasoning model you want to track.
- Audio transcription routes through Groq Whisper and is a paid provider call.
- `AI_TRANSCRIPTION_MODEL` is the canonical transcription env var; `GROQ_WHISPER_MODEL` remains as a legacy alias.
- `AI_VISION_MODEL` is audit-only for now and is not wired into a live vision route.
- No external sends, publishing, webhooks, n8n calls, Google Workspace actions, CRM actions, LOS actions, or TERA actions are wired.

## Server Routes

- `GET /api/ai/status`
- `POST /api/ai/assistant`
- `POST /api/ai/transcribe`

The status route requires approved AI Assistant access before returning
booleans/model names. It does not return API keys.

## Netlify Environment Variables

Add these in Netlify Site configuration > Environment variables:

```txt
AI_ASSISTANTS_SANDBOX_ENABLED=true
AI_ASSISTANTS_REQUIRE_AUTH=true
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

Do not add these as `NEXT_PUBLIC_` variables. They must remain server-only.

## Auth Boundary

AI Assistant credit access requires Supabase auth:

- Status, chat, and transcription routes all check Supabase access before
  returning provider configuration or touching DeepSeek/Groq.
- Approved users can use AI Assistants unless their role permission explicitly disables `can_access_ai_assistants`.
- Pending users are blocked until beta approval is active.
- Signed-out users are blocked.
- Missing or false role permissions fail closed for non-admin users.

## Sandbox Guardrails

Every assistant call includes a server-side system prompt that enforces:

- Draft-only output.
- Human review before external use.
- No external sends or publishing.
- No n8n/webhook actions.
- No Google Workspace actions.
- No CRM/LOS actions.
- No TERA reads/writes/API claims.
- No final underwriting, compliance, pricing, rate, APR, fee, approval, denial, credit, legal, or eligibility decisions.
- Use `LO` or `loan officer`; do not use `ELO` or `MOSO`.

## Provider References

- DeepSeek Flash v4 Chat: use the exact provider docs and base URL from your
  approved DeepSeek account.
- Groq speech-to-text: https://console.groq.com/docs/speech-to-text
- Groq transcription API reference: https://console.groq.com/docs/api-reference

## Testing

1. Sign in as an approved beta user with AI Assistant access.
2. Open `/api/ai/status` and confirm:
- `sandboxEnabled` is `true`.
- `primaryProvider` is `deepseek`.
- `primaryProviderConfigured` is `true` after adding the DeepSeek env vars.
- `deepseekConfigured` is `true` after adding `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL`, and `DEEPSEEK_MODEL`.
- `groqConfigured` is `true` after adding `GROQ_API_KEY`, `GROQ_BASE_URL`, and a valid Whisper transcription model.
- `blockedEnvWarnings` stays empty. If `AI_DEFAULT_CHAT_MODEL=openrouter/auto` or another blocked OpenRouter value is present, the admin diagnostics card will surface it and the assistant stays draft-only.
- `externalActionsEnabled` is `false`.
3. Open `/admin/` as master admin and confirm the DeepSeek diagnostics card shows the provider state without exposing the key.
4. Open `/ai-assistants/`.
5. Send a short prompt and confirm the response is draft-only.
6. Attach an audio file and use `Transcribe audio`.

Do not test with borrower PII, production TERA data, or external-send workflows.
