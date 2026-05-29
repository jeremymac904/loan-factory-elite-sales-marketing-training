# Do Not Do — Guardrails

Hard rules every integrator must respect.

## Branch and push
- **Do not push** this `support/groove-staging-packages` branch to origin without Jeremy's explicit OK
- **Do not merge** this branch to main without Jeremy's explicit OK
- **Do not delete** the staging worktree at `~/LoanFactoryProjects/lo-dev-groove-staging` until everything is migrated
- **Do not force-push** anything to main
- **Do not rebase** main onto this branch

## Supabase
- **Do not run** destructive Supabase ops (drop table, delete rows, reset)
- **Do not delete** users from `profiles` or `approved_users`
- **Do not change** role check constraints without going through a migration that explicitly lists every new role
- **Do not apply** any new migration without testing in a Supabase branch first
- **Do not modify** RLS policies on `profiles`, `approved_users`, `user_roles`, `role_permissions`, `ai_twins`, `facegram_*` without reviewing the admin-access flow first

## Email and external sends
- **Do not send real emails** automatically
- **Do not enable bulk send** under any circumstance
- **Do not activate** any n8n blueprint without Jeremy's written approval
- **Do not trigger n8n** from this staging branch
- **Do not upload** YouTube videos from automation
- **Do not post** to Google Chat from automation without dry-run + approval

## Content rules
- **Do not use** "public beta", "public users", "public build", "Vercel", "MOSO", "ELO" anywhere
- **Do not add** compliance flags or hidden review queues for internal training clips
- **Do not** treat internal training clips as restricted unless Jeremy specifically marks a clip restricted
- **Do not** show real borrower data in any walkthrough recording, FaceGram post, or AI Twin draft
- **Do not** publish ContentForge copy externally — internal Loan Factory only

## AI Twin and Google scopes
- **Do not** enable Gmail send for any user without the per-user safety confirmation flow
- **Do not** scope Drive write or Calendar write by default — read-only or compose-only first
- **Do not** read other users' Gmail, Drive, or Calendar — per-user OAuth, isolated by user
- **Do not** expose AI provider API keys in client code

## TERA
- **Do not** read from or write to TERA — TERA stays separate

## Secrets
- **Do not** commit `.env`, `.env.local`, service role keys, or AI provider keys
- **Do not** print secrets to logs
- **Do not** include actual secret values in any blueprint or doc

## When in doubt
- Read the file you're about to integrate
- Check `INTEGRATION_PRIORITY.md`
- Check `NEXT_PLATFORM_TASKS_FOR_GROOVE.md`
- Ask Jeremy before any push, send, or activation
