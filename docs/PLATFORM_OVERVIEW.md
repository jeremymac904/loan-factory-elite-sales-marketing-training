# Loan Factory LO Development Platform Overview

This document is the canonical product map for the current implementation.
It is internal and is not borrower-facing.

## Product Definition

- Product: Loan Factory LO Development Platform.
- Foundation curriculum: Sales and Marketing 101-601.
- Paid coaching: LO Mastery ($249/mo) and Loan Factory Alliance ($449/mo).
- Execution layer: AionUI/Codex/Claude/etc. are operating tools, not the product.
- Active implementation: this repo.

## Primary Role Dashboards

| Role | Dashboard |
| --- | --- |
| Master Admin | `/admin/` |
| LO Development | `/lo-development/` |
| Training Academy | `/training-academy/` |
| Loan Officer Support | `/loan-officer-support/` |
| Corporate Coach | `/coach-command-center/` |
| Marketing | `/marketing/` |
| LO Mastery member | `/member-area/lo-mastery/` |
| Loan Factory Alliance member | `/member-area/alliance/` |
| Normal LO | `/normal-lo/` |

## Core Platform Pages

| Route | Purpose |
| --- | --- |
| `/coaching/` | Coaching overview for LO Mastery and Loan Factory Alliance. |
| `/lo-mastery-coaching/` | Public/program page for the $249 LO Mastery tier. |
| `/loan-factory-alliance/` | Public/program page for the $449 Alliance tier. |
| `/member-area/` | Coaching member entry. |
| `/member-area/certifications/` | Coaching certification requirements and display guardrails. |
| `/member-area/leaderboards/` | Accountability and recognition model for controllable work. |
| `/member-area/mastermind/` | Alliance mastermind prep and follow-through. |
| `/sales-training/` | Sales and Marketing 101-601 curriculum hub. |
| `/training-library/` | Scripts, prompts, roleplays, clips, recordings, audio, and asset readiness. |
| `/content-skills/` | Registry of content-generation rule files. |
| `/department-routing/` | Ownership map across LO Development, Support, Training Academy, Coaches, Marketing, and Admin. |
| `/support-routing/` | Human support routing and escalation lanes. |
| `/admin/qa-checklist/` | Local launch validation checklist. |

## Compatibility Routes

Legacy paid-coaching route directories remain only as redirects so old links do
not break. Do not create new copy or features using those old route names.

## Compliance Ground Rules

- No unsupported production, income, approval, rate, or business-result guarantees.
- No hype, manifestation framing, or "borrow money to join" framing.
- Borrower-facing, Realtor-facing, recruiting, marketing, or public assets require Loan Factory review before use.
- Certifications recognize completion of training and assessments only.
- RLS must remain enabled.
- Production actions require Jeremy approval.

## Source Files

- Coaching tier data: `src/data/coaching.ts`
- Role dashboard map: `src/data/roleDashboards.ts`
- Role labels and dashboard destinations: `src/lib/supabase/auth.ts`
- Approved-user seed data: `src/data/approvedUsers.ts`
- Supabase migrations: `supabase/migrations/`
- Content skill rules: `loan-factory-content-skills/`
