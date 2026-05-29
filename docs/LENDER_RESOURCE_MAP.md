# Lender & Program Resource Map

## What this is

An internal architecture map that defines **where** lender, program, DPA (down payment assistance), AE (Account Executive) contact, and escalation resources should live inside the Loan Factory LO Development Platform. It ties those resource types to the **real, already-deployed routes** (`/resources`, `/support-routing`, `/lender-escalation`) and proposes a clean structure for a future lender directory.

This is a resource **architecture** document. It does **not** contain lender facts, program guidelines, rates, fees, APRs, or DPA program details. Everywhere a real fact belongs, this doc inserts a `SOURCE NEEDED:` marker for Jeremy to fill. Nothing here invents a lender, program, or number.

**Framing:** Loan Factory is **wholesale-only** for Jeremy / Legends. Every lender relationship described here is a **wholesale lender / broker channel** relationship. This doc never references or implies correspondent lending.

## Who it's for

Approved Loan Factory users — primarily:
- **Loan officers** and **loan_officer_support** who need to find the right lender contact, program reference, or escalation path fast.
- **lo_development**, **lo_development_lead**, and **lo_development_member** who own the resource content and review escalations.
- **master_admin / admin** (Jeremy, Thuan) who maintain the lender directory data and the routes it renders on.

It is **not** a borrower-facing document. No content here should be copied into borrower or Realtor materials without compliance review (see `/compliance`).

## How to use this doc

1. Read **Resource Type → Home Route** to learn where each kind of lender resource belongs.
2. Use **Route-by-Route Plan** when editing a specific page (`/resources`, `/support-routing`, `/lender-escalation`).
3. When you are ready to build the searchable lender directory, follow **Recommended Lender Directory Structure**.
4. Before publishing any lender/program/DPA fact, resolve the matching item in **Data we still need from Jeremy** — never guess.

---

## Existing routes this map builds on

These routes already exist in the deployed app (verified in `src/app/`). This map assigns lender resources to them rather than inventing new routes.

| Route | Current purpose (as built) | Lender-resource role in this map |
|---|---|---|
| `/resources` | Hub linking to channels, compliance, recordings, clip library, support team, feedback, lender escalation | Top-level entry point and index to all lender/program resources |
| `/support-routing` | "Find the right support person" — LO Development, Corporate Coaches, Marketing, plus `SupportTeamDirectory` | Home for **AE / lender support contacts** and the "which lane" router |
| `/lender-escalation` | Structured escalation intake via `LenderEscalationForm`; "Use this when a lender issue needs LO Development review" | Home for **escalation workflow** (issue, urgency, requested help) |
| `/compliance` | Language reminders before borrower/Realtor/public use | Guardrail referenced by every lender resource; not a lender data store |

Supporting components already in the codebase: `src/components/LenderEscalationForm.tsx`, `src/components/SupportTeamDirectory.tsx`.

---

## Resource type → home route

| Resource type | Lives at | Why here |
|---|---|---|
| Lender directory (who we broker to, wholesale) | **Future** `/resources/lenders` (index), linked from `/resources` | Needs its own browsable surface; `/resources` is the natural parent index |
| Program reference (per-lender wholesale programs) | **Future** `/resources/lenders/[lender]` detail pages | Program facts belong with the lender that offers them, not in a flat list |
| DPA (down payment assistance) reference | **Future** `/resources/dpa` (cross-lender index) | DPA spans multiple lenders/agencies; deserves its own filterable view |
| AE (Account Executive) contacts | `/support-routing` (AE/lender support lane) + cross-linked on each lender detail page | AEs are a **support contact**; the existing `SupportTeamDirectory` pattern fits |
| Escalation (something is stuck/wrong) | `/lender-escalation` | Already built for exactly this: structured intake → LO Development review |
| "Which lane do I need?" router | `/support-routing` | Already the front door for choosing the right internal contact |

> Routes marked **Future** do not exist yet. Do not link to them from navigation until they are built. Until then, lender/program/DPA references live as content blocks on `/resources` and contacts live in `SupportTeamDirectory` on `/support-routing`.

---

## Route-by-route plan

### `/resources` — the index

`/resources` stays the hub. Add (or confirm) a lender-focused cluster of cards that point to the right destination:

- **Lender Directory** → `/resources/lenders` (once built) — "Find wholesale lender contacts, program references, and AE assignments for approved Loan Factory users."
- **DPA Reference** → `/resources/dpa` (once built) — "Look up down payment assistance options by lender and state."
- **AE / Lender Support Contacts** → `/support-routing/#lender-support` — reuse the existing `#lo-development-support-team` anchor pattern.
- **Lender Escalation** → `/lender-escalation` — already present in the `resources` array; keep it.

Card copy must stay generic ("find," "look up," "request review"). The actual lender names/programs render on the destination pages from directory data, not in the card copy.

`SOURCE NEEDED:` Jeremy confirms which lender-resource cards should appear on `/resources` and their display order.

### `/support-routing` — AE & lender support contacts

This page already routes to LO Development, Corporate Coaches, and Marketing via `supportSections` and renders `SupportTeamDirectory`. Add a fourth lane for lender/AE support so an LO who is mid-scenario knows who to ping.

Proposed new lane (mirrors the existing `supportSections` shape):

- **title:** "Lender / AE Support"
- **description:** "Wholesale lender questions, AE assignments, scenario routing, and program eligibility questions. Reach the right Account Executive before you escalate."
- **href:** `/support-routing/#lender-support`
- **cta:** "View lender & AE contacts"

The `#lender-support` section then lists contacts. Two options for the underlying data:
1. **Near-term:** add a lender/AE block inside `SupportTeamDirectory` (internal contacts only).
2. **Once the directory exists:** render AE rows from the shared lender directory data source so AE info is maintained in one place.

Internal contacts (loan_officer_support, lo_development) belong here. **Lender-side AE contact details are facts** and must come from Jeremy:

- `SOURCE NEEDED:` For each wholesale lender — AE name(s), Loan Factory–facing contact method (email/phone/portal), coverage (states/regions), and "use this AE for X" routing notes.
- `SOURCE NEEDED:` Whether AE contact details are safe to show to all approved LOs or should be gated to specific roles.

### `/lender-escalation` — the escalation workflow

Keep this page as the single front door for "a lender issue needs LO Development review." It already captures people, issue, urgency, and requested help via `LenderEscalationForm`, with a "Back to Resources" link and a "What happens next" section.

What this map adds — clarify the escalation **path and triage**, without inventing process Jeremy hasn't confirmed:

- **When to escalate vs. contact an AE first:** The page should remind LOs to try the assigned AE (via `/support-routing`) before escalating, then escalate here if it is stuck, time-sensitive, or needs LO Development to intervene.
- **Where escalations go:** `SOURCE NEEDED:` Confirm the destination of a submitted escalation (e.g., which LO Development inbox/table/owner receives it and the expected response window). The current page says "LO Development can review the issue and decide the right next step" — keep that wording until Jeremy confirms specifics.
- **Urgency definitions:** `SOURCE NEEDED:` Plain-language definitions for each urgency level the form offers, so LOs pick consistently.
- **Manual-first:** Submissions stay manual / reviewed by a person. Do not wire this to an automated outbound workflow (no auto-emails, no n8n trigger) until Jeremy explicitly approves.

### `/compliance` — the guardrail (not a data store)

Every lender/program/DPA surface links to `/compliance` for language reminders. No "lowest," "best," or "guaranteed" claims; no borrower-facing promises. Lender directory pages are internal references for approved Loan Factory users only.

---

## Recommended lender directory structure (future build)

A future, searchable lender directory should be **data-driven** so facts live in one typed source and render across routes. This follows the existing pattern where structured content lives in `src/data/*` (e.g., `src/data/approvedUsers.ts`).

### Routes

```
/resources/lenders            → index: searchable/filterable list of wholesale lenders
/resources/lenders/[lender]   → detail: one lender's wholesale programs + AE contacts
/resources/dpa                → cross-lender DPA index, filterable by state/program type
```

### Data source

Proposed file: `src/data/lenders.ts` (typed, internal). Sketch of the shape — **field names only, no real values invented**:

```ts
// src/data/lenders.ts  (PROPOSED — structure only, no facts)
export type WholesaleLender = {
  slug: string;              // url segment, e.g. "example-wholesale"
  name: string;              // SOURCE NEEDED: lender display name
  channel: "wholesale";      // wholesale-only; never "correspondent"
  status: "active" | "paused" | "archived"; // SOURCE NEEDED per lender
  coverageStates: string[];  // SOURCE NEEDED: states where Loan Factory brokers this lender
  portalUrl?: string;        // SOURCE NEEDED: lender portal/broker login (internal use)
  programs: LenderProgram[];
  aeContacts: AEContact[];
  notes?: string;            // internal routing notes; no borrower-facing claims
};

export type LenderProgram = {
  name: string;              // SOURCE NEEDED: program name
  category: string;          // SOURCE NEEDED: e.g. conventional / govt / non-QM (confirm taxonomy)
  summary: string;           // SOURCE NEEDED: 1-2 line internal description, no rates/APRs
  guidelinesRef?: string;    // SOURCE NEEDED: link/reference to official lender guideline doc
  // NOTE: do NOT store rates, APRs, fees, or eligibility math here.
  // Always point to the lender's official, current guideline as the source of truth.
};

export type DPAProgram = {
  name: string;              // SOURCE NEEDED: DPA program name
  offeredVia: string;        // SOURCE NEEDED: which wholesale lender / agency offers it
  states: string[];          // SOURCE NEEDED: eligible states
  summary: string;           // SOURCE NEEDED: internal one-liner, no dollar amounts/terms
  officialSourceUrl?: string;// SOURCE NEEDED: agency/lender official program page
};

export type AEContact = {
  name: string;              // SOURCE NEEDED: AE name
  role: "account_executive";
  contact: string;           // SOURCE NEEDED: LF-facing email/phone/portal
  coverage?: string;         // SOURCE NEEDED: states/regions or scenario lane
  preferredFor?: string;     // SOURCE NEEDED: "use for X" routing note
};
```

### Rendering rules

- Lender **detail** pages render programs and AE contacts from `lenders.ts`.
- `/resources/dpa` renders `DPAProgram[]` filtered by state/category.
- AE rows on `/support-routing#lender-support` read from the same `aeContacts` data — one source, no duplication.
- Program/DPA summaries are **internal reference + a link to the lender's official, current guideline**. The platform never restates rates/fees/eligibility as fact; the lender's live guideline is always the source of truth.

### Access / gating

- Default: visible to all approved Loan Factory users (matches `can_access_resources` = Y for all active roles in `ROLE_ACCESS_MODEL.md`).
- If any AE detail or portal link is sensitive: gate behind `loan_officer_support` / `lo_development` via the existing `canAccessGate` pattern.
- `SOURCE NEEDED:` Jeremy confirms whether the lender directory is all-users or partially gated.

### Maintenance

- One owner edits `src/data/lenders.ts`; changes ship via the normal main → Netlify deploy.
- `SOURCE NEEDED:` Jeremy names the owner of lender directory data and a review cadence (so program references stay current).

---

## Data we still need from Jeremy (checklist)

Nothing below should be filled in by anyone but Jeremy / Legends. Until each is provided, the corresponding surface stays a structure-only placeholder with no invented facts.

**Lender directory (wholesale)**
- [ ] Full list of wholesale lenders Loan Factory brokers to (names + active/paused/archived status)
- [ ] Coverage: which states/regions per lender
- [ ] Broker portal / login URL per lender (internal use)
- [ ] Whether the directory is visible to all approved LOs or gated by role

**Programs**
- [ ] Program names per lender and the program category taxonomy to use (e.g., conventional / government / non-QM — confirm labels)
- [ ] One-line internal summary per program (no rates/APRs/fees)
- [ ] Official current-guideline link/reference per program (the source of truth we point to instead of restating numbers)

**DPA (down payment assistance)**
- [ ] List of DPA programs and which wholesale lender/agency offers each
- [ ] Eligible states per DPA program
- [ ] Official agency/lender program page link per DPA program
- [ ] Confirmation of which DPA facts (if any) are safe to summarize internally vs. link-only

**AE / lender support contacts**
- [ ] AE name(s) per lender and LF-facing contact method (email/phone/portal)
- [ ] AE coverage (states/regions) and "use this AE for X" routing notes
- [ ] Whether AE details are all-users or role-gated

**Escalation workflow (`/lender-escalation`)**
- [ ] Destination of a submitted escalation (owner/inbox/table) and expected response window
- [ ] Plain-language definitions for each urgency level on the form
- [ ] Confirmation that escalations stay manual-first (no automated send) until approved
- [ ] The "try your AE first, then escalate" rule wording, if Jeremy wants it surfaced

**Index & ownership**
- [ ] Which lender-resource cards appear on `/resources` and their order
- [ ] Owner of the lender directory data and the review cadence

---

## Guardrails recap

- **Wholesale-only.** Every lender relationship is a wholesale/broker-channel relationship. Never reference or imply correspondent lending.
- **No invented facts.** No lender names, programs, DPA terms, rates, APRs, or fees unless they come from Jeremy via the checklist above.
- **Source of truth = the lender's live guideline.** The platform references and links; it does not restate numbers as fact.
- **Internal audience only.** These resources serve approved Loan Factory users (LOs + employees). No borrower-facing claims; no "lowest/best/guaranteed."
- **Manual-first.** Escalation intake is reviewed by a person; no automated outbound until explicitly approved.
- **Compliance link.** Every lender/program/DPA surface links to `/compliance`.
