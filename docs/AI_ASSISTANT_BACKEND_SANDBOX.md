# AI Assistant Backend Sandbox

## Status

The AI Assistant Hub has a sandbox backend for beta testing:

- Chat completions route through OpenRouter.
- The chat model must be set explicitly with `OPENROUTER_MODEL`; the app does not fall back to a default provider model.
- Audio transcription routes through Groq Whisper.
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

OPENROUTER_API_KEY=
OPENROUTER_MODEL=deepseek/deepseek-chat
OPENROUTER_SITE_URL=https://loan-factory-elite-sales-marketing-tr.netlify.app
OPENROUTER_APP_TITLE=Loan Factory LO Development

GROQ_API_KEY=
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
```

Do not add these as `NEXT_PUBLIC_` variables. They must remain server-only.

## Auth Boundary

AI Assistant credit access requires Supabase auth:

- Status, chat, and transcription routes all check Supabase access before
  returning provider configuration or touching OpenRouter/Groq.
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

- OpenRouter chat completions: https://openrouter.ai/docs/api-reference/chat-completion
- OpenRouter headers/app attribution: https://openrouter.ai/docs/api-reference/overview/
- Groq speech-to-text: https://console.groq.com/docs/speech-to-text
- Groq transcription API reference: https://console.groq.com/docs/api-reference

## Testing

1. Sign in as an approved beta user with AI Assistant access.
2. Open `/api/ai/status` and confirm:
   - `sandboxEnabled` is `true`.
   - `openRouterConfigured` is `true` after adding both `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`.
   - `groqConfigured` is `true` after adding both `GROQ_API_KEY` and `GROQ_WHISPER_MODEL`.
   - `externalActionsEnabled` is `false`.
3. Sign out or use a private browser and confirm `/api/ai/status` returns a
   403 instead of provider model details.
4. Open `/ai-assistants/`.
5. Send a short prompt and confirm the response is draft-only.
6. Attach an audio file and use `Transcribe audio`.

Do not test with borrower PII, production TERA data, or external-send workflows.
