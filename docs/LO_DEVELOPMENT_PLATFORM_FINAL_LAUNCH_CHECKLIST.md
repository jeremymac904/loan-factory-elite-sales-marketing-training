# LO Development Platform Final Launch Checklist

Date: 2026-05-31

## Canonical Repo

- Active repo: `/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/loan-factory-live`
- Branch: `main`
- Product: Loan Factory LO Development Platform
- Execution layer: AionUI/Codex/Claude/etc. are operating tools, not the product
- Deploy target: Netlify config exists in `netlify.toml`; production deploy requires Jeremy approval

## Product Names

- Use: Loan Factory LO Development Platform
- Use: Sales and Marketing 101-601
- Use: LO Mastery ($249/mo)
- Use: Loan Factory Alliance ($449/mo)
- Do not use deprecated paid-coaching names in launch-facing copy

## Role Dashboard Coverage

- Master Admin: `/admin/`
- LO Development: `/lo-development/`
- Training Academy: `/training-academy/`
- Loan Officer Support: `/loan-officer-support/`
- Corporate Coach: `/coach-command-center/`
- Marketing: `/marketing/`
- LO Mastery member: `/member-area/lo-mastery/`
- Loan Factory Alliance member: `/member-area/alliance/`
- Normal LO: `/normal-lo/`

## Local Validation

Run before any handoff:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected limits:

- No unit test runner is currently configured.
- Auth, Google OAuth, Supabase writes, and production data flows require sandbox credentials and approved test identities.
- Do not inspect or print `.env` values while validating.

## Manual View-As QA

Use `/admin/view-as/` to walk these roles:

- `master_admin`
- `admin`
- `lo_development_lead`
- `lo_development_member`
- `training_academy`
- `loan_officer_support`
- `corporate_coach`
- `marketing`
- `team_leader`
- `coaching_member_level_1`
- `coaching_member_level_2`
- `loan_officer`

Confirm:

- Header role button lands on the correct dashboard.
- Each dashboard has a clear next action.
- Support, department routing, content skills, and training library are reachable.
- Legacy routes redirect instead of showing stale paid-coaching copy.

## External Action Lock

Blocked unless Jeremy explicitly approves:

- GitHub push, merge, release, or PR merge.
- Netlify production deploy.
- Supabase migration against production.
- n8n activation, webhook execution, or scheduled job.
- Google Workspace mutation.
- Borrower-visible, partner-visible, public, or outbound sends.

## Supabase / RLS

- RLS must remain enabled.
- Role changes must be additive and least-privilege.
- Training Academy is a first-class role via migration `20260531000000_training_academy_role.sql`.
- No production migration should be run without approval.

## Content Readiness

Use `/training-library/` and `/content-skills/` to verify:

- Training paths are visible.
- Video and clip gaps are labeled for review.
- Missing uploads remain visible.
- Content skill rules are discoverable.
- Compliance-safe language appears in coaching and certification areas.
