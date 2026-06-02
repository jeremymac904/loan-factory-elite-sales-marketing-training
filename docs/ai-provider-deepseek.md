# DeepSeek AI Provider

## Purpose

The LO Development assistant stack now supports DeepSeek Flash v4 Chat as the
primary server-side AI provider. The provider is used only from the server.
No API key is ever exposed to the browser.

## Required Netlify Environment Variables

Add these in Netlify Site configuration > Environment variables:

```txt
DEEPSEEK_API_KEY=<your DeepSeek secret key>
DEEPSEEK_BASE_URL=<your exact DeepSeek API base URL>
DEEPSEEK_MODEL=<your DeepSeek Flash v4 Chat model id>
AI_PRIMARY_PROVIDER=deepseek
AI_DEFAULT_CHAT_MODEL=deepseek-chat
AI_ASSISTANT_MODEL=<same exact DeepSeek Flash v4 Chat model id>
AI_REASONING_MODEL=deepseek-chat
```

Optional but supported:

```txt
AI_ASSISTANT_TIMEOUT_MS=20000
AI_TRANSCRIPTION_MODEL=whisper-large-v3-turbo
GROQ_API_KEY=<your Groq key>
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_WHISPER_MODEL=whisper-large-v3-turbo
```

### Notes

- `DEEPSEEK_BASE_URL` must be the exact base URL from DeepSeek's docs or your
  approved account settings. Do not guess or invent a value.
- `AI_ASSISTANT_MODEL` should match the exact DeepSeek Flash v4 Chat model id
  you want the platform to use.
- `AI_DEFAULT_CHAT_MODEL` must never be `openrouter/auto`.
- `AI_REASONING_MODEL` should match the exact DeepSeek reasoning model you want
  the admin diagnostics to audit.
- Do not prefix these with `NEXT_PUBLIC_`.
- Do not commit these values to source control.

## Verification

After adding env vars in Netlify:

1. Trigger a fresh deploy or restart the site.
2. Open `/admin/` and confirm the master-admin-only provider diagnostics card
   shows DeepSeek as configured and surfaces any blocked OpenRouter env values.
3. Open `/api/ai/status` and confirm the assistant reports the DeepSeek provider
   state without exposing the key.
4. Open `/ai-assistants/` and confirm the assistant hub shows provider-ready
   or guided fallback status.

## Safe Fallback Behavior

- If the DeepSeek key, base URL, or model is missing, the assistant stays in
  guided local mode and shows "DeepSeek not configured".
- If the DeepSeek request fails, the UI falls back to the existing guided
  answer or local draft template instead of crashing.
- The assistant remains draft-only. It does not send emails, Google Chat
  messages, uploads, or external actions.

## OpenRouter / Groq Audit

- `OPENROUTER_MODEL=openrouter/auto` is blocked in this build.
- OpenRouter fallback is disabled for the chat assistant.
- Groq transcription remains wired for audio drafts and is a paid provider call.
- `AI_VISION_MODEL` is currently audit-only and not wired into a live vision
  route.

## Security Rules

- Keep the DeepSeek key server-side only.
- Do not log request headers or response payloads that could contain secrets.
- Do not expose environment variables in browser code.
- Do not enable external sends until Lead explicitly approves that workflow.
