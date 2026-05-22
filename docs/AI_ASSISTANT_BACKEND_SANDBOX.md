# AI Assistant Backend Sandbox

## Status

The AI Assistant Hub has a sandbox backend for beta testing:

- Chat completions route through OpenRouter.
- The default chat model is configurable and currently defaults to `deepseek/deepseek-chat`.
- Audio transcription routes through Groq Whisper.
- No external sends, publishing, webhooks, n8n calls, Google Workspace actions, CRM actions, LOS actions, or TERA actions are wired.

## Server Routes

- `GET /api/ai/status`
- `POST /api/ai/assistant`
- `POST /api/ai/transcribe`

The status route returns only booleans/model names. It does not return API keys.

## Netlify Environment Variables

Add these in Netlify Site configuration > Environment variables:

```txt
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

Do not add these as `NEXT_PUBLIC_` variables. They must remain server-only.

## Auth Boundary

Default behavior requires Supabase auth:

- Approved users can use AI Assistants unless their role permission explicitly disables `can_access_ai_assistants`.
- Pending signed-in `@loanfactory.com` users can use the sandbox while beta profile sync is being addressed.
- Signed-out users are blocked unless `AI_ASSISTANTS_ALLOW_UNSIGNED_SANDBOX=true`.

Use unsigned sandbox access only for temporary local/demo testing.

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

1. Open `/api/ai/status` and confirm:
   - `sandboxEnabled` is `true`.
   - `openRouterConfigured` is `true` after adding `OPENROUTER_API_KEY`.
   - `groqConfigured` is `true` after adding `GROQ_API_KEY`.
   - `externalActionsEnabled` is `false`.
2. Open `/ai-assistants/`.
3. Sign in with a Loan Factory Google account if auth is required.
4. Send a short prompt and confirm the response is draft-only.
5. Attach an audio file and use `Transcribe audio`.

Do not test with borrower PII, production TERA data, or external-send workflows.
