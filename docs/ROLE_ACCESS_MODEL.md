# Role Access Model

**Status:** Beta auth foundation added. Supabase Google Auth, `approved_users`, `profiles`, `role_permissions`, and RLS now provide the beta access model. Future production SSO/TERA alignment remains a separate decision.
**Owner:** Jeremy McDonald, with Andre and Edward to confirm scopes.
**Last updated:** 2026-05-22

This document defines twelve roles that the LO Development Platform must support, the access scope for each, and what is explicitly out of scope for that role.

**Beta reminder:** Public landing/resource pages remain reviewable. Protected beta surfaces use Supabase role checks. TERA remains separate; this app does not read from or write to TERA.

---

## 1. Jeremy McDonald — Owner Admin

**Who they are:** Platform architect, builder, and owner of AI workflow, training system, and day-to-day platform support.

**Can see / access:** Everything. Every module, every record, every admin tool, every audit log, every billing reference. Owner Preview, `/admin`, all gated content.

**Can edit / manage:** Platform configuration, content, data files, deployments, integrations, role assignments. May change any setting.

**Cannot access:** Nothing inside the platform. (External: not the LOS — TERA owns LOS data. Not corporate finance systems. Not HR systems.)

---

## 2. Andre — LO Development Owner (Leadership)

**Who they are:** Owner of LO Development at Loan Factory. Owns the LO Development team (Tara, Kevin, Benjamin), member assignments, ramp standards.

**Can see / access:** Full read across every module. LO Development ops dashboards, team progress, member rosters, escalation queues, Coach Hub read-only, Apex member status, training completion data, 1+1=5 program status.

**Can edit / manage:** LO Development operational data (assignments, routing rules, ramp plans). May flag any content for review. May approve module priorities and rollout sequencing.

**Cannot access:** Owner Admin platform configuration (deployments, integrations, secrets). May request changes; cannot make them.

---

## 3. Edward — Corporate Coaching Lead

**Who they are:** Owns and leads corporate coaching direction. Sets coaching standards, certification standards, and Coach Hub design.

**Can see / access:** Full access to Corporate Coach Hub, all coaching playbooks, all coach session notes (subject to coach/member privacy rules to be confirmed), member coaching progress, certification reviews.

**Can edit / manage:** Coach Hub playbooks, certification standards, coaching session templates, member assignments to coaches.

**Cannot access:** Apex Advisor billing or paid coaching subscription management (handled outside the platform). Owner Admin platform configuration. LO Development team operational routing (Andre's domain).

---

## 4. Tara — LO Development team member

**Who they are:** LO Development team member supporting Andre. Member-facing operations.

**Can see / access:** LO Development content, assigned LO progress, routing tools, escalation map, training completion for assigned LOs, post-onboarding check-in queue.

**Can edit / manage:** Member-facing routing actions, check-in notes for assigned LOs, escalation handoffs.

**Cannot access:** Other LO Development team members' assigned-LO records (unless reassigned). Coach session notes (Edward's domain). Owner Admin configuration. Apex billing.

---

## 5. Kevin — LO Development team member

Same scope as Tara. Distinct LO assignments.

---

## 6. Benjamin — LO Development team member

Same scope as Tara. Distinct LO assignments.

---

## 7. Corporate Coach

**Who they are:** A certified corporate coach delivering coaching sessions to assigned members.

**Can see / access:** Coach Hub, their assigned members, session notes for their assigned members, call agendas, certification progress for their members.

**Can edit / manage:** Session notes for their own assigned members, call agendas, certification reviews they conduct.

**Cannot access:** Other coaches' members or session notes. LO Development operational routing. Owner Admin. Apex billing. Other coaches' playbook drafts (unless shared).

---

## 8. Team Leader

**Who they are:** Leads a team of LOs. Owns recruiting, ramp, and performance for their team.

**Can see / access:** Team Leader OS, their team's progress, content kits, leaderboard for their team, 1+1=5 campaigns, recruiting kits, their team's scorecards.

**Can edit / manage:** Their team's scorecards, their team's meeting agendas, their team's recruiting tracker, their team's 1+1=5 campaign customizations.

**Cannot access:** Other teams' data. Coach session notes. LO Development routing tools (read-only at most). Owner Admin. Apex billing.

---

## 9. Loan Officer

**Who they are:** A producing or new LO at Loan Factory.

**Can see / access:** Their assigned training path, their own Apex Advisor tier content (if subscribed), Training Library, AI Assistant Hub, Recommended Channels, Personality Workshop, their own member area landing.

**Can edit / manage:** Their own progress, their own roleplay submissions, their own tracker entries, their own personality workshop results.

**Cannot access:** Other LOs' data. Team Leader OS (unless they are a team leader). Corporate Coach Hub. LO Development routing tools. Apex content not in their tier. Owner Admin.

---

## 10. Marketing Reviewer — Victoria

**Who they are:** Marketing reviewer responsible for approving recruiting and public-facing content.

**Can see / access:** Read and review access to all marketing, recruiting, and public-facing content across the platform — 1+1=5 content kits, recruiting kits, Apex Advisor landing copy, sales training landing copy, anything that mentions Loan Factory externally.

**Can edit / manage:** Approval status on review items. May leave review comments. May block publication.

**Cannot access:** Internal coaching notes, LO-private progress data, Apex billing, Owner Admin configuration, LO Development routing internals.

---

## 11. Training Academy (Loan Factory)

**Who they are:** Loan Factory's Training Academy team, responsible for the broader training content lifecycle.

**Can see / access:** Training Library content management, quiz and flashcard management, recording catalog, audio brief catalog, NotebookLM output catalog.

**Can edit / manage:** Training Library catalog metadata, quiz banks, flashcard sets, content categorization.

**Cannot access:** Apex billing, Coach session notes, LO-private progress beyond Training Library completion data, Owner Admin configuration, 1+1=5 team-leader-private campaign customizations.

---

## 12. Read Only Leadership

**Who they are:** Senior Loan Factory leadership not in LO Development or Coaching day-to-day, but who need visibility.

**Can see / access:** Dashboard view with high-level progress metrics — training completion rates, Apex membership counts, leaderboard summaries, recruiting pipeline summaries, coaching engagement summaries.

**Can edit / manage:** Nothing. Read-only.

**Cannot access:** Individual LO records, coach session notes, recruiting candidate details, billing, Owner Admin configuration, content editing.

---

## Role-to-route summary matrix

| Route family | Owner | Andre | Edward | LO Dev team | Coach | Team Leader | LO | Victoria | Training Academy | Read-only Leadership |
|--------------|-------|-------|--------|-------------|-------|-------------|----|----|------------------|----------------------|
| `/apex-*` | Full | Read | Read | Read | — | — | Tier-gated | Marketing-only | — | Summary |
| `/sales-training/*` | Full | Read | Read | Read | — | Read | Read | Marketing-only | Manage | Summary |
| `/ai-assistants/*` | Full | Read | Read | Read | Read | Read | Read | Marketing-only | — | Summary |
| `/team-leader-os/*` | Full | Read | — | Read | — | Manage own team | — | Marketing-only | — | Summary |
| `/corporate-coach-hub/*` | Full | Read | Manage | — | Manage own members | — | — | — | — | Summary |
| `/one-plus-one-five/*` | Full | Read | — | Read | — | Manage own team | — | Marketing approval required | — | Summary |
| `/training-library/*` | Full | Read | Read | Read | Read | Read | Read | Marketing-only | Manage | Summary |
| `/owner-preview` | Full | — | — | — | — | — | — | — | — | — |
| `/admin` (production) | Full | Audit-read | — | — | — | — | — | — | — | — |

"—" means no access. "Read" means read-only. "Manage" means read + edit. "Summary" means aggregated, non-individual metrics only.

---

## Open items for Andre and Edward

- Andre: confirm LO Development team member access scopes (Section 4 / 5 / 6). Should team members see each other's assigned LOs, or strictly their own?
- Edward: confirm coach privacy rules for Section 7. Are session notes shared across coaches by default, or private to the coach + member?
- Both: confirm whether team leaders can see Coach Hub data for their team members, or whether that boundary is strict.
- Confirm where Victoria sits in the approval workflow — gating publication, or post-hoc review?
