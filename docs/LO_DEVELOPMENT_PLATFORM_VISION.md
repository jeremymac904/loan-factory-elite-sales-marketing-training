# Loan Factory LO Development Platform — Vision

**Status:** Draft for internal review. Pending TERA/Ally stack alignment and Loan Factory leadership approval of platform name and subdomain.
**Owner:** Jeremy McDonald (build, AI workflows, training systems, platform support)
**Sponsor:** Andre (LO Development)
**Coaching Lead:** Edward (corporate coaching direction)
**Last updated:** 2026-05-21

---

## 1. What is the LO Development Platform?

The **Loan Factory LO Development Platform** is the unified internal home for everything that supports a loan officer's career path inside Loan Factory — from first-day onboarding through elite producer status, team leadership, and corporate coaching.

It is not a product for borrowers. It is not a public marketing site. It is the internal operating system for **LO development, sales training, AI enablement, coaching, and team growth.**

Today, those programs live in scattered surfaces — a separate Elite Sales & Marketing Training site, a separate Apex Advisor paid coaching experience, scattered AI assistant work, an emerging 1+1=5 team growth playbook, and a growing library of recordings, scripts, and decks across Google Drive and NotebookLM. This document defines the parent platform that brings them under one roof.

---

## 2. Who it serves

| Audience | What they get from the platform |
|----------|----------------------------------|
| New loan officers | Structured onboarding path, 101–601 training, AI coaching assistant, scripts and roleplays |
| Producing loan officers | Apex Advisor coaching, advanced training, leaderboards, accountability tools |
| Team leaders | Team Leader OS, 1+1=5 growth campaigns, recruiting kits, scorecards, meeting templates |
| Corporate coaches | Coach Hub, member progress, session notes, certification reviews |
| LO Development team (Andre, Tara, Kevin, Benjamin) | Routing tools, member tracking, escalation workflows |
| Leadership (read-only) | Progress metrics, completion dashboards, high-level activity |
| Marketing reviewer (Victoria) | Review queue for recruiting/marketing content before publishing |

---

## 3. How the eight modules fit together

The platform is composed of eight modules that share one identity model, one navigation shell, and one design system. Each module owns a domain; together they form the LO career path.

```
                Loan Factory LO Development Platform
                              |
   ----------------------------------------------------------------
   |          |          |          |          |          |       |
 Elite      Apex        AI       1+1=5     Training   Team       Corp
 Sales &    Advisor     Assistant Team     Library    Leader     Coach
 Marketing  (paid       Hub       Growth              OS         Hub
 Training   coaching)
   |          |          |          |          |          |       |
   +----------+----------+----------+----------+----------+-------+
                              |
                  LO Support & Development Routing
                  (post-onboarding, escalations, feedback)
```

- **Elite Sales & Marketing Training (101–601)** is the foundational curriculum every LO progresses through.
- **Apex Advisor** is the paid coaching layer on top of the curriculum (Tier 1 $249/mo, Tier 2 $449/mo).
- **AI Assistant Hub** surfaces the Gemini Gem AI Twin and the AI Coaching Assistant alongside specialized sales, marketing, team leader, and compliance precheck assistants and a prompt library.
- **1+1=5 Team Growth Platform** is the team leader's marketing, recruiting, and co-branded campaign system.
- **Training Library** is the searchable catalog of recordings, scripts, roleplays, trackers, flashcards, quizzes, and Google Drive media.
- **Team Leader OS** is the scorecard, meeting cadence, ramp plan, and recruiting tracker for team leaders.
- **Corporate Coach Hub** is the coach-facing surface for playbooks, notes, member progress, and call agendas.
- **LO Support & Development Routing** is the connective tissue: post-onboarding check-ins, lender escalation paths, training academy routing, corporate coach routing, and feedback/complaint routing.

---

## 4. Why this platform exists

1. **Career path support.** Every LO should have one front door from day one to elite producer to team leader to coach. Today that path is fragmented across tools.
2. **Sales performance.** Real, measurable lift in production — scripts that work, roleplays that build muscle memory, accountability that compounds.
3. **AI enablement.** Loan Factory's first-class AI workflow is the Gemini Gem AI Twin and the AI Coaching Assistant. The platform is where LOs use them safely and consistently.
4. **Team growth.** 1+1=5 is the team leader operating philosophy: scalable growth through partnership marketing, co-branded campaigns, recruiting, and team systems.
5. **Operational leverage.** A single platform reduces tool sprawl, lets Jeremy ship improvements once, and gives Andre and Edward shared visibility into the same data.

---

## 5. Who owns what

| Domain | Owner |
|--------|-------|
| Platform build, architecture, frontend, AI workflow design, training system design, day-to-day platform support | Jeremy |
| LO Development organization, team structure, member assignments, member ramp | Andre |
| Corporate coaching direction, Coach Hub design, coaching standards | Edward |
| LO Development execution (member contact, routing, follow-up) | Tara, Kevin, Benjamin |
| Marketing review for recruiting and public-facing content | Victoria |
| Stack, integration, and infrastructure standards | TERA/Ally team |

This is a working RACI, not a final org chart. Andre and Edward should confirm or amend before the platform launches.

---

## 6. Future subdomain

Pending Loan Factory IT/DNS approval, the production home for this platform is:

**`lodevelopment.loanfactory.com`**

During prototype, the platform lives on a Netlify preview URL. No public `lodevelopment.loanfactory.com` DNS until the TERA/Ally team confirms hosting alignment and Loan Factory IT approves the subdomain.

---

## 7. Stack alignment intent

This platform will share the same identity model, hosting posture, and integration standards as TERA and Ally — **pending TERA/Ally team review.** The intent is:

- One sign-on experience for LOs who already use TERA
- Shared user/role model so LO Development team membership is sourced, not duplicated
- Hosting on the same infrastructure family the rest of Loan Factory uses
- Integration patterns that match how TERA exposes data (specifics to be confirmed)

The platform is being built on Next.js + TypeScript for the prototype, with stack decisions formalized after TERA/Ally review. See [`TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`](./TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md).

---

## 8. Asset storage model

- **Google Drive** holds large media: MP4 recordings, M4A audio briefs, PDF handouts, PowerPoint decks, NotebookLM outputs, HeyGen videos, screen recordings.
  Master Drive folder: <https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD>
- **GitHub** holds source code, typed data files (TypeScript module configs, route data, copy), markdown docs, and small images/logos only.
- Drive assets are embedded into the platform via Drive share links, not copied into the repo.

This split keeps the repo small and fast, keeps media in a system the team already uses, and avoids checking large binaries into Git.

---

## 9. Visual direction

A premium, internal Loan Factory platform. Dark surfaces, premium feel, calm density.

**Approved palette:**
- Loan Factory orange (accent, CTAs, highlights)
- Black, dark charcoal (primary backgrounds)
- Silver, white, light gray (text, dividers, secondary surfaces)

**Not used:** blue, green, purple, pastels, or any color outside the approved palette.

Typography, spacing, and component standards align with the existing Elite Sales & Marketing Training shell.

---

## 10. What this platform is NOT

To keep scope clean:

- Not a borrower-facing site
- Not a public marketing site
- Not a TERA replacement
- Not a payments platform (Apex Advisor billing happens outside the platform)
- Not a CRM (TERA owns CRM)
- Not an LOS (TERA is the LOS)
- Not a place that claims free processing, daily companywide training, or production guarantees
- Not a place that displays rates, fees, or borrower-facing pricing
- Not built on a public Loan Factory API (no such public API exists today)

---

## 11. Next steps

1. Andre and Edward review and confirm or amend Section 5 (ownership) and Section 3 (module scope).
2. TERA/Ally team works through [`TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`](./TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md).
3. Victoria reviews any public-facing or recruiting copy before it ships.
4. Jeremy executes [`NEXT_48_HOURS_BUILD_PLAN.md`](./NEXT_48_HOURS_BUILD_PLAN.md) for a reviewable prototype.
5. Open decisions tracked in [`OPEN_DECISIONS.md`](./OPEN_DECISIONS.md).

---

## Update: Creator Network as 10th Module (Pass 3)

- **Creator Network is the 10th module** of the LO Development Platform.
- **Role:** the internal momentum engine — where platform ideas, wins, and strategies circulate and compound across the team.
- **Access:** employee-only in v1. No public access. No external publishing.
- **Connections to every other module:**
  - **Elite Sales & Marketing** lessons link to Creator Network posts.
  - **Apex Advisor** coaching connects to wins shared in the Creator Network.
  - **Training Library** pulls top posts after review and promotion.
  - **Team Leader OS** tracks engagement and contributions.
  - **AI Assistant Hub** powers the **Content Coach** (Assistant #15) and the **Audience Quality Panel** internal QA tool.
  - **Coach Hub** surfaces the best contributions in coaching sessions.

**Full platform module list (updated):**

1. Apex Advisor
2. Elite Sales & Marketing Training (101–601)
3. AI Training & Assistant Hub
4. 1+1+1=5 Team Growth
5. Training Library
6. Team Leader OS
7. Corporate Coach Hub
8. LO Support Routing
9. (future) Loan Factory Academy / LO Onboarding
10. Creator Network
