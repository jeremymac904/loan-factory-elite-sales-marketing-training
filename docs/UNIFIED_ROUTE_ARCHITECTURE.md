# Unified Route Architecture

**Status:** Draft. Auth gating is "none" in prototype; production gating pending TERA/Ally SSO decision.
**Last updated:** 2026-05-21

This is the proposed final route structure for the Loan Factory LO Development Platform. It unifies the existing LO Mastery surfaces, the Sales and Marketing 101-601 curriculum, the AI Assistant Hub, the 1+1=5 Team Growth Platform, the Training Library, Team Leader OS, Corporate Coach Hub, and the supporting LO Support & Development Routing under a single navigation shell.

---

## Route tree

```
/                                  # Home — platform overview
/coaching                      # LO Mastery landing (paid coaching)
/sales-training                # 101–601 training track inside LO Mastery
/loan-factory-alliance                  # Pro tier ($449/mo)
/member-area/certifications               # Certification catalog and progress
/member-area/calendar                     # LO Mastery-specific calendar
/member-area/leaderboards                 # LO Mastery leaderboards
/member-area/mastermind                   # Mastermind sessions
/member-area                  # coaching member area (gated)

/sales-training                    # Sales and Marketing 101-601 hub
/sales-training/101                #   Foundation
/sales-training/201                #   Borrower conversion
/sales-training/301                #   Referral partner growth
/sales-training/401                #   Content and marketing
/sales-training/501                #   Pipeline and sales systems
/sales-training/601                #   Elite execution

/ai-assistants                     # AI Assistant Hub overview
/ai-assistants/coaching            #   AI Coaching Assistant
/ai-assistants/sales               #   Sales assistant
/ai-assistants/marketing           #   Marketing assistant
/ai-assistants/team-leader         #   Team Leader assistant
/ai-assistants/compliance          #   Compliance precheck assistant
/ai-assistants/prompt-library      #   Prompt library

/team-leader-os                    # Team Leader OS hub
/team-leader-os/scorecards
/team-leader-os/meetings
/team-leader-os/new-lo-ramp
/team-leader-os/recruiting

/corporate-coach-hub               # Corporate Coach Hub
/corporate-coach-hub/playbooks
/corporate-coach-hub/members
/corporate-coach-hub/sessions

/one-plus-one-five                 # 1+1=5 Team Growth Platform
/one-plus-one-five/campaigns
/one-plus-one-five/recruiting
/one-plus-one-five/content-kits

/training-library                  # Training Library hub
/training-library/audio
/training-library/scripts
/training-library/roleplays
/training-library/trackers
/training-library/flashcards

/calendar                          # Unified platform calendar
/member-area                       # Gated — all authenticated LOs
/recommended-channels              # Curated learning channels
/personality-workshop              # Personality self-assessment

/owner-preview                     # Prototype admin view — Jeremy only
                                   # No real auth; obscurity-only in prototype
/admin                             # Future real admin — pending auth decision
```

---

## Per-top-level-route notes

| Route | Audience | Auth gating (prototype) | Auth gating (production) | Data source |
|-------|----------|-------------------------|--------------------------|-------------|
| `/` | All visitors | None | None (logged-in landing or public marketing depending on Victoria/leadership decision) | Static copy in `src/app/page.tsx` |
| `/coaching` | LO Mastery Tier 1+ | None | SSO + coaching membership check | `src/data/coaching.ts` |
| `/sales-training` | LO Mastery Tier 1+ | None | SSO + coaching membership | `src/data/coaching.ts`, training-path data |
| `/loan-factory-alliance` | LO Mastery Tier 2 | None | SSO + LO Mastery Pro subscription | `src/data/coaching.ts` |
| `/member-area/certifications` | coaching members | None | SSO + coaching membership | coaching data + completion records (production) |
| `/member-area/calendar` | coaching members | None | SSO + coaching membership | Calendar data (static today; live source TBD) |
| `/member-area/leaderboards` | coaching members | None | SSO + coaching membership | Placeholder data in prototype; real source TBD |
| `/member-area/mastermind` | coaching members | None | SSO + coaching membership | coaching data |
| `/member-area` | coaching members | None | SSO + coaching membership | coaching data |
| `/sales-training` | All LOs | None | SSO | Curriculum data (existing 101–601 routes) |
| `/sales-training/101..601` | All LOs | None | SSO | Existing per-level data |
| `/ai-assistants` | All LOs | None | SSO | Static catalog of assistants (no live AI in prototype) |
| `/ai-assistants/coaching` | All LOs | None | SSO | Static description + Gemini Gem AI Twin reference |
| `/ai-assistants/sales` | All LOs | None | SSO | Static description + linkouts |
| `/ai-assistants/marketing` | All LOs | None | SSO | Static description + linkouts |
| `/ai-assistants/team-leader` | Team leaders | None | SSO + Team Leader role | Static description |
| `/ai-assistants/compliance` | All LOs | None | SSO | Static description; compliance review required for any live integration |
| `/ai-assistants/prompt-library` | All LOs | None | SSO | Existing `src/app/prompts/` data, restructured under hub |
| `/team-leader-os` | Team leaders, Andre, leadership | None | SSO + Team Leader role | Static config |
| `/team-leader-os/scorecards` | Team leaders | None | SSO + Team Leader role | Static templates in prototype |
| `/team-leader-os/meetings` | Team leaders | None | SSO + Team Leader role | Static templates |
| `/team-leader-os/new-lo-ramp` | Team leaders | None | SSO + Team Leader role | Static ramp plan |
| `/team-leader-os/recruiting` | Team leaders | None | SSO + Team Leader role | Static tracker templates |
| `/corporate-coach-hub` | Corporate coaches, Edward | None | SSO + Coach role | Static; needs Edward's source content |
| `/corporate-coach-hub/playbooks` | Corporate coaches | None | SSO + Coach role | Static playbooks |
| `/corporate-coach-hub/members` | Corporate coaches | None | SSO + Coach role | Production: member roster from TERA |
| `/corporate-coach-hub/sessions` | Corporate coaches | None | SSO + Coach role | Production: session notes (private to coach + member) |
| `/one-plus-one-five` | Team leaders | None | SSO + Team Leader role | Static |
| `/one-plus-one-five/campaigns` | Team leaders | None | SSO + Team Leader role | Static campaign kits |
| `/one-plus-one-five/recruiting` | Team leaders | None | SSO + Team Leader role | Static recruiting kits |
| `/one-plus-one-five/content-kits` | Team leaders | None | SSO + Team Leader role | Static content kits + Drive links |
| `/training-library` | All LOs | None | SSO | Aggregated catalog over scripts, roleplays, trackers, audio, recordings |
| `/training-library/audio` | All LOs | None | SSO | `src/app/audio-training/` + Drive |
| `/training-library/scripts` | All LOs | None | SSO | `src/app/scripts/` |
| `/training-library/roleplays` | All LOs | None | SSO | `src/app/roleplays/` |
| `/training-library/trackers` | All LOs | None | SSO | `src/app/tracker/` |
| `/training-library/flashcards` | All LOs | None | SSO | Static (prototype) |
| `/calendar` | All LOs | None | SSO | Unified calendar (placeholder data in prototype) |
| `/member-area` | All authenticated LOs | None | SSO | Personalized landing |
| `/recommended-channels` | All visitors | None | SSO | Existing data |
| `/personality-workshop` | All LOs | None | SSO | Existing data |
| `/owner-preview` | Jeremy | None (route obscurity only; do not link from public nav) | Not deployed in production — replaced by `/admin` | Static admin overview |
| `/admin` | Owner / Admin roles | Not present in prototype | SSO + Admin role | Production-only |

---

## Aliases and redirects

To avoid breaking existing surfaces or external links during migration, the following top-level routes should be retained as redirects to their new home under `/sales-training`:

| Existing route | Redirect to |
|----------------|-------------|
| `/101-foundation` | `/sales-training/101` |
| `/201-borrower-conversion` | `/sales-training/201` |
| `/301-referral-partner-growth` | `/sales-training/301` |
| `/401-content-and-marketing` | `/sales-training/401` |
| `/501-pipeline-and-sales-systems` | `/sales-training/501` |
| `/601-elite-execution` | `/sales-training/601` |

Likewise, the standalone tool routes can either stay top-level (current) or move under `/training-library`. Recommended: keep them top-level for backwards compatibility AND surface them inside `/training-library` as catalog entries. No breakage either way.

| Existing route | Catalog entry |
|----------------|---------------|
| `/scripts` | also surfaced at `/training-library/scripts` |
| `/roleplays` | also surfaced at `/training-library/roleplays` |
| `/tracker` | also surfaced at `/training-library/trackers` |
| `/audio-training` | also surfaced at `/training-library/audio` |
| `/recordings` | linked from `/training-library` |
| `/prompts` | also surfaced at `/ai-assistants/prompt-library` |

See [`MIGRATION_AND_MERGE_PLAN.md`](./MIGRATION_AND_MERGE_PLAN.md) for the merge sequencing.

---

## Navigation grouping (proposed for `SiteHeader`)

Top-level nav (left to right):

1. **Home** → `/`
2. **Sales Training** → `/sales-training`
3. **LO Mastery** → `/coaching`
4. **AI Assistants** → `/ai-assistants`
5. **1+1=5** → `/one-plus-one-five`
6. **Team Leader OS** → `/team-leader-os`
7. **Coach Hub** → `/corporate-coach-hub`
8. **Library** → `/training-library`
9. **Calendar** → `/calendar`

Secondary nav (utility, right side): Member Area, Recommended Channels, Owner Preview (Jeremy only, prototype).
