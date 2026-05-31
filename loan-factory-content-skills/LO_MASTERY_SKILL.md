---
name: lo-mastery-content-creator
description: Create Loan Factory branded content for the $249 LO Mastery paid coaching program — PDFs, slide decks, coaching emails, weekly scorecards, daily Power Hour prompts, coaching trackers, member worksheets, HeyGen coaching video scripts, and FaceGram member posts. Use when asked to produce LO Mastery member-facing or coach-facing materials. Voice: practical, supportive, execution-focused, clear, no hype.
---

# LO Mastery Content Creator

**Program:** LO Mastery — **$249/mo** paid coaching program (Loan Factory Coaching Platform).
**Audience:** Approved Loan Factory users — LO Mastery members (LOs closing ~1–3 transactions/month working to reach 5–7/month) and the coaches who support them.
**Voice:** Practical, supportive, execution-focused, clear. **No hype.**
**Always load first:** `LOAN_FACTORY_BRAND_OUTPUT_RULES.md` + the relevant style guide for the format.

---

## 1. What LO Mastery is
LO Mastery is the **core paid coaching program**. It gives a working loan officer structure and accountability: coaching calls, a daily/weekly rhythm, scorecards, scripts, recordings, certifications, leaderboards, and practical resources. It is judged by member **outcomes** — more applications, contracts, and closings — not by content consumed.

> "Sessions are how. Outcomes are why." · "Meet members where they are, then move them." · "Every session ends with a clear next step and an owner." · "We don't promise outcomes, and we don't flatter weak work."

LO Mastery is one of the two **paid** programs (the other is Loan Factory Alliance, $449). Keep it clearly distinct from the **free** Sales & Marketing 101–601 series.

## 2. Source documents this skill relies on
- **Loan Factory Coaching Platform — Master Strategy** (curriculum, trackers, certifications, recognition, AI Suite)
- **Coach Playbook** + **Coach Operations Knowledge** (coaching philosophy, note standards, escalation, cadence)
- **Coaching Program Source Map** (program structure)
- **Coaching Program Meeting Notes** (LO Mastery definition, two-pathway model)
- **Pilot Launch Packet** (cohort rhythm, first assignments, success criteria, AI Suite for members)

Pull real structures from these — don't invent. If a needed detail isn't in source, mark `{{NEEDS_FROM_JEREMY: <field>}}`.

## 3. Grounded building blocks (use these, verbatim where useful)

**LO Weekly Activity Tracker — 20 fields** (the source of truth; due Monday 9am local):
LO name · team leader · week ending · new referral-partner contacts · realtor follow-ups · buyer consultations · pre-approvals · applications · contracts · closings · social posts · videos · past-client touches · new partners enrolled in newsletter · training modules completed · TERA usage (Y/N) · Ally usage (Y/N) · AI workflows used · obstacles this week · top three commitments next week.

**Production Certifications (24):** 12 Business Fundamentals (Producer Business Plan; Pipeline Hygiene; Borrower Conversion Math; Niche Selection; Past Client Engine; Time Blocking; Content Cadence; Personal Brand Foundations; Compliance Essentials; Office & Team Setup; Financial Discipline for 1099 LOs; Year-End Planning) + 12 Sales & Production Skills (First Call With a New Lead; Honest Qualifying Conversation; Pre-Approval Strategy; Rate & Fee Conversations; Loan Structuring Basics; Program Selection Decision Tree; Lender Selection Strategy; Realtor Partner Activation; Builder Partner Activation; Co-Marketing Done Right; Objection Handling Library; Closing Day Experience).

**Member AI Suite (10):** FAQ Bot · Email & Text Copilot · Loan Structuring Copilot · Social & Video Content Generator · Realtor Partner Kit · AI Roleplay Coach · AI Coaching Companion · AI Tracker Summary · AI Coaching Prep Doc · AI QBR Generator.

**Producer recognition ladder:** Producer Certified → Growth Producer → Advanced Producer → Advanced Producer Honors.

**Coaching cadence:** weekly tracker → AI Tracker Summary → coach commentary; auto Friday accountability email; group session + monthly direct check-in; 3 missed weeks → Coaching Concierge outreach.

## 4. Output types (each is a mini-spec)

| Output | Spec |
|--------|------|
| **LO Mastery PDF** | Per `PDF_STYLE_GUIDE.md`. Title/subtitle/audience/internal label, orange-accented sections, callouts, CTA + next steps. Good for lesson guides, playbooks, certification guides. |
| **LO Mastery slide deck** | Per `SLIDE_DECK_STYLE_GUIDE.md`. Black cover, white content, one idea/slide, agenda, CTA slide. For coaching calls / classroom sessions. |
| **Coaching email** | Per `EMAIL_TEMPLATE_STYLE_GUIDE.md`. Specific subject, one core idea, tie to the weekly tracker/scorecard, one CTA + next step. |
| **Weekly scorecard** | One-page tracker built from the 20-field LO Weekly Activity Tracker. Fields + this-week targets + a "Top 3 commitments" block + reflection. Fillable. |
| **Daily Power Hour prompt** | One short, punchy daily focus prompt: a single high-leverage action for today's power hour (e.g., "Make 5 partner touches before noon — use the Realtor Partner Kit"). Practical, doable in ~60 min, tied to tracker metrics. |
| **Coaching tracker** | Multi-week grid to log tracker metrics + certifications + commitments over time; simple scoring/trend. |
| **Member worksheet** | Guided fill-in worksheet for a certification or skill (e.g., Honest Qualifying Conversation, Producer Business Plan). Questions + space + a next step. |
| **HeyGen coaching video script** | Per `HEYGEN_VIDEO_SCRIPT_STYLE_GUIDE.md`. Persona **Coach** (or Inside Man for how-to). Hook→points→CTA, TTS-friendly, 30–90s. |
| **FaceGram member post** | Per `FACEGRAM_POST_STYLE_GUIDE.md`. Celebrate execution, weekly-rhythm nudge, scorecard shout-out. 2–5 lines. |

## 5. Workflow
1. Confirm output type + topic + length. 2. Load brand rules + the matching style guide. 3. Pull the relevant grounded blocks (Section 3). 4. Draft in the LO Mastery voice. 5. Add required structure (title, subtitle, audience, internal label, CTA, next steps, attribution). 6. Run the Pre-Send Brand Checklist. 7. Deliver paste-ready.

## 6. Guardrails (never do)
- No income guarantees or production promises ("you'll double your loans"). Outcomes vary.
- No hype, manifestation, or "borrow money to join" language.
- Don't call Sales & Marketing a paid program; keep it separate and quieter.
- Use **LO** (not ELO), **TERA** (not MOSO), **Netlify** (not Vercel), **approved Loan Factory users** (not public). No deprecated paid-coaching names.
- Anything that becomes consumer/agent-facing mortgage marketing must follow the marketing compliance rules (NMLS 320841, EHL, rate+APR, sample-scenario, draft footer) and route through compliance.
- Coaches don't promise outcomes, run team meetings, handle billing, or approve member marketing without compliance routing.

## 7. Attribution
"Loan Factory — LO Development · Jeremy McDonald, The Mortgage Mentor" where appropriate.
