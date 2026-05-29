# AI for Loan Officers — Research Framework

**Purpose:** Map the public AI-for-LO landscape so we can (a) keep AI Advantage video library and AI Twin sharper than competitors, (b) catalog public Custom GPT / Gem / Project patterns we should be aware of, (c) lock in our **internal-only safety posture** as a clear differentiator, and (d) feed the Prompts library with paraphrased, Loan-Factory-tuned patterns.

**Verification source:** Web search run 2026-05-28 (`AI tools for loan officers mortgage 2026 Aidium Bonzo HomeBot`).

**Internal-only safety posture (non-negotiable):**
- Loan Factory AI Twin is **internal-only**, never a public-facing chatbot.
- Outputs are **drafts only** — every borrower-facing message gets human LO review before send.
- No PII pasted into general-purpose models; AI Twin is sandboxed per role.
- Compliance disclaimer pattern lives in the persona system prompt, not bolted on at the end.

---

## Research Buckets

### Bucket A — AI Twin patterns from public Gems / Custom GPTs

What to look for:
- How public creators structure persona system prompts for sales personas.
- Where they place disclaimers (top vs. bottom; pinned vs. inline).
- How they separate "persona context" from "per-conversation context."
- Whether they expose the assistant publicly (most do; **we never will**).

What we adapt:
- Persona scaffolding pattern (paraphrased).
- Disclaimer placement pattern (we use top-of-prompt + pinned in every reply).
- Role-segmentation logic (LO vs. Team Leader vs. Recruiter vs. Marketing reviewer).

### Bucket B — Prompt engineering for sales follow-up

What to look for:
- Multi-step follow-up sequence prompts (24h / 72h / 7d / 14d / 30d).
- "Re-engagement after silence" prompts.
- Birthday / anniversary / rate-watch triggers.
- Tone calibration (warm vs. urgent vs. educational).

What we adapt:
- Sequence skeleton (paraphrased into our Prompts library).
- Tone calibration vocabulary aligned to Loan Factory voice.
- Compliance-aware re-engagement wording.

### Bucket C — AI safety / disclaimer language

What to look for:
- How public creators handle "this is not financial advice" framing.
- How they handle borrower-facing AI disclosure.
- Where they fail (e.g., AI hallucinating rate quotes, AI giving APR claims without backup).

What we adapt:
- Strict draft-only posture in every AI Advantage micro-lesson.
- Pinned compliance disclaimer pattern.
- "If unsure, stop and escalate" pattern in AI Twin system prompts.

### Bucket D — Draft-only patterns we should mirror

What to look for:
- Creators who explicitly position AI output as a draft for human review.
- Creators who teach a "review then send" ritual.

What we adapt:
- Reinforce in every AI Advantage video: AI Twin drafts, LO reviews, LO sends.
- Build "review checklist" overlay into UI where AI Twin output is presented.

### Bucket E — AI persona tone patterns

What to look for:
- Persona prompts that hold tone across long conversations.
- Persona prompts that fail (drift, break character, leak system prompt).
- How creators handle "switch personas" within a single project.

What we adapt:
- Tone-stability test suite for AI Twin (run quarterly).
- Anti-leak system prompt patterns.

---

## Creators / Sources to Monitor (10+)

### Tools/platforms (monitor product blogs + YouTube channels)

1. **Homebot** — `https://homebot.ai/blog` and YouTube. Watch for "AI for lenders," behavioral alerts, and homeowner-engagement framing. Their pitch overlaps with our retention AI Twin angle.
2. **Aidium** — `https://www.thinkaidium.com/` blog + LinkedIn. Watch their AI Propensity Modeling positioning; informs how we describe AI Twin's pipeline-prioritization use cases.
3. **Bonzo / MMI / ChatMMI** — Watch their conversational AI launch coverage in HousingWire. Map how they frame "AI interface for mortgage LOs" vs. our AI Twin role-based positioning.
4. **Sales Boomerang / Mortgage Coach** — Watch for borrower-intent alert framing.
5. **Surefire (Top of Mind)** — Watch for AI content generation positioning inside CRMs.

### Public AI creators (monitor for patterns, not for copying)

6. **OpenAI official YouTube channel** — Custom GPT + Projects walkthroughs, release notes.
7. **Google for Developers YouTube** — Gemini Gems + Workspace integration patterns.
8. **Anthropic YouTube + blog** — Claude Projects, Artifacts, long-context patterns; especially relevant since LF's AI Twin can use Claude as a backend.
9. **AI for sales / AI for B2B creator channels** — Search query: `AI sales follow up prompt 2026`. Capture sequence patterns, paraphrase into Prompts library.
10. **Custom GPT showcase channels** — Search query: `best custom GPT for sales 2026`. Capture persona scaffolding patterns.

### News + analyst sources

11. **HousingWire AI coverage** — Track conversational-AI launches in mortgage space monthly.
12. **National Mortgage Professional Magazine** — Track AI tool reviews and LO adoption stories.
13. **OnCourse Learning + Zeitro blogs** — They publish "top AI tools for LOs" lists periodically. Useful baseline of what every LO has heard of.

---

## Capture Targets

- For each tool/platform target: 1 row in `competitor_intel_capture_template.csv` AND 1 row in `platform_feature_comparison_template.csv` covering their AI feature.
- For each public AI creator: 3 evergreen videos in `youtube_research_capture_template.csv` per quarter.
- For each news source: 1 monthly digest entry summarizing what changed in the AI-for-mortgage space.

## Differentiation Anchors (use these in every AI capture's "where_LF_differentiates" field)

- Internal-only AI Twin, never public chatbot.
- Per-role AI Twin (LO / Team Leader / Recruiter / Marketing reviewer).
- AI Twin sits **inside** the integrated Loan Factory platform alongside training, coaching, FaceGram community, and lender escalation — not a standalone bolt-on.
- AI outputs are drafts; LO is the human in the loop on every borrower-facing message.
- Member tier ladder ($249 LO Mastery -> $449 Alliance) bundles AI Twin with coaching cadence — not a separate AI SKU.
