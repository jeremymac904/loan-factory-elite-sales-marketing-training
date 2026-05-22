# Brand Unification Plan — LO Development Platform

**Status:** Draft. Hex values, typography, and per-module taglines pending Loan Factory brand standards confirmation and Victoria's marketing review.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21

This plan defines the visual and brand standards that make every module of the platform look and feel like one Loan Factory product — not eight mini-sites.

---

## 1. Approved palette

**Primary**
- Loan Factory Orange — `#FF6B00` (placeholder; **confirm exact hex against Loan Factory brand standards** before locking)

**Neutrals**
- Black — `#000000`
- Dark Charcoal — `#1A1A1A` (primary surface)
- Medium Charcoal — `#2C2C2C` (card surface)
- Silver — `#A0A0A0` (secondary text, dividers)
- Light Gray — `#F0F0F0` (light surfaces, contrast backgrounds where needed)
- White — `#FFFFFF`

**Accent for badges and status**
- Default badge: white text on Loan Factory orange
- Inverse badge: Loan Factory orange text on dark charcoal
- Neutral badge: silver text on medium charcoal

**Forbidden colors**
- Blue (any shade)
- Green (any shade)
- Purple (any shade)
- Teal (any shade)
- Yellow (any shade except as part of the orange family if Loan Factory's brand allows; default = no)
- Any pastel
- Any neon

If a UI need calls for "another color" (e.g., a status indicator), use shades within the orange/charcoal/silver family. Never reach outside the palette.

---

## 2. Typography

- **Heading family:** Bold, sans-serif. Module names use title case; section headers use title case; small caps acceptable for eyebrow labels.
- **Body family:** Regular weight, readable, not condensed.
- **Monospace:** Reserve for code, tickers, or dense tabular data only.
- **Line height:** Generous (1.5+ for body, 1.2–1.3 for headings).
- **Heading scale:** H1 (module name), H2 (page section), H3 (subsection), H4 (card title), body, small.

**Confirm with Loan Factory brand standards before locking specific typefaces.** Until confirmed, use a system stack:
- Heading: `ui-sans-serif, -apple-system, "Segoe UI", Inter, sans-serif`
- Body: same stack, regular weight

Do not introduce a script, display, or decorative typeface without brand standards approval.

---

## 3. Consistent UI components

These are the shared components that every module page uses. They live under `src/components/` and are imported, not duplicated.

| Component | Purpose | Where used |
|-----------|---------|------------|
| **SiteHeader** | Unified top nav, Loan Factory logo, orange CTAs, dropdown menus per nav area | Every page |
| **Footer** | Platform nav links, compliance/legal note, copyright | Every page |
| **ModuleBanner** | Full-width dark banner with module name, tagline, optional CTA, orange accent stripe | Every module landing page |
| **ModuleCard** | Dark card with icon, title, description, orange CTA button. Used on home page and on cross-module callouts | Home, module landings, "How it connects" callouts |
| **FeatureGrid** | 3- or 4-column grid of feature/benefit cards | Module landings (What You Get section) |
| **PricingBlock** | Tier comparison block (already exists in Apex; generalize) | Apex Advisor; potentially Coach Hub |
| **CalendarBlock** | Event list / schedule (already exists in Apex calendar; generalize) | Apex calendar, unified Calendar |
| **LeaderboardTable** | Ranked-list display (already exists in Apex; generalize) | Apex leaderboards |
| **ContentListCard** | Catalog item card: title, type pill, description, source, CTA | Training Library, Scripts, Roleplays, Trackers |
| **AssistantCard** | Dark card with assistant name, audience pill, description, use-case bullets, "Use This Assistant" CTA, guardrail summary | AI Assistant Hub |
| **AudienceCard** | Small card identifying an audience (LO, Team Leader, Coach, Admin) with icon and short description | Module landings (Who Is This For section) |
| **CrossModuleCallout** | Two- or three-callout block that links to related modules | Module landings (How It Connects section) |
| **ComingNextTimeline** | Card grid or vertical timeline of planned future additions | Module landings (Coming Next section) |
| **CTAFooterBlock** | Bottom-of-page CTA with orange button and support link | Module landings |
| **OwnerPreviewBanner** | Warning banner shown on `/owner-preview` only — "Prototype admin, not real auth" | `/owner-preview` only |

**Component rules:**
- New module pages MUST use the shared components. No bespoke duplicates.
- A new shared component is added only if reused across 2+ pages.
- Components accept props for content; they do not hard-code copy.
- All components are responsive (mobile-first, breakpoints at 640 / 768 / 1024 / 1280).
- All components are accessible (keyboard navigation, focus states, alt text on icons, contrast minimums).

---

## 4. Per-module banner / identity

Each module has a tagline used in its `ModuleBanner`. Taglines are draft and require **Victoria's marketing review** before any public-facing use.

| Module | Banner palette emphasis | Tagline (draft) |
|--------|--------------------------|-----------------|
| Apex Advisor | Orange + subtle gold accent (within orange family) | "Where Top Loan Officers Are Built" |
| Elite Sales & Marketing | Dark charcoal + silver | "Master the Skills. Own the Market." |
| AI Training | Dark + orange | "AI-Powered. Human-Led." |
| 1+1+1=5 | Charcoal + orange | "Build Teams That Multiply." |
| Training Library | Dark gray | "Every Resource You Need." |
| Team Leader OS | Black + silver | "Lead with Systems." |
| Corporate Coach Hub | Dark charcoal + orange | "Coaching That Moves Metrics." |
| AI Assistant Hub | Black + orange | "Smarter Work, Faster Results." |
| Support Routing | Dark gray | "Right Help, Right Now." |

Taglines:
- Use Loan Factory voice
- Never claim production guarantees, "free processing," "daily companywide training," or that Loan Factory has a public API
- Never reference rates, fees, or APRs
- Reviewed by Victoria before any external-facing surface uses them

---

## 5. Layout standards

- **Container width:** Max 1280px, centered, with generous side gutters (24–48px depending on viewport).
- **Vertical rhythm:** 80px between major sections on desktop; 48px on mobile.
- **Card padding:** 24px inner padding on desktop; 16px on mobile.
- **Border radius:** 8–12px on cards and buttons; 0 on full-width banners.
- **Shadow:** Subtle, dark-on-dark; avoid bright glow effects.
- **Imagery:** Dark photography or abstract orange/dark gradient where photography isn't available. No stock photos of money, handshakes, or generic real estate clichés.
- **Icons:** Single-line, monochrome (silver default, orange for active). No multi-color icon sets.

---

## 6. Consistency checklist

Use this checklist on every new module page and every new component:

- [ ] All module pages use `ModuleBanner`
- [ ] All CTAs use orange background, white text (primary) OR orange border + orange text on dark (secondary)
- [ ] No off-palette colors in any new component
- [ ] `SiteHeader` consistent across all routes
- [ ] `Footer` consistent across all routes
- [ ] Mobile-first — every new page is responsive
- [ ] Keyboard accessible — every interactive element is focus-reachable
- [ ] Banned words scan on all new content (`ELO`, `MOSO`, "free processing," "daily companywide training," "production guarantee," "Loan Factory API" as a public claim, any rate or fee number, any APR mention)
- [ ] All marketing/recruiting/public-facing copy flagged for Victoria's review before publication
- [ ] Loan Factory logo appears at the same size, same position on every page
- [ ] All Drive links open
- [ ] No large media in the repo (Drive links only)
- [ ] All shared components imported, not duplicated

---

## 7. Open items for brand alignment

- [ ] Confirm exact Loan Factory Orange hex against brand standards
- [ ] Confirm approved typeface(s) for headings and body
- [ ] Confirm Loan Factory logo lockups (light, dark, mono)
- [ ] Confirm whether gold accent within the orange family is acceptable for Apex
- [ ] Confirm whether photography is allowed at all, and if so what the approved photography library is
- [ ] Victoria's review and approval of the per-module taglines in Section 4
- [ ] Confirm footer compliance/legal copy (with compliance review)

Until these are confirmed, the prototype uses the placeholders above and is marked draft.

---

## Update: Creator Network Module Identity (Pass 3)

- **Creator Network module tagline:** "Where LO Ideas Become Team Playbooks."
- **Creator Network accent:** dark charcoal + orange. Consistent with the existing platform palette — no new colors introduced.
- **4 new shared components added to the consistency checklist:**
  - `FeedCard`
  - `PostComposerCard`
  - `ModeratorBadge`
  - `StatusPill`
- **StatusPill states** (each with a distinct color state within the existing brand palette — orange, charcoal, silver only; no blue, green, or purple):
  - **Draft**
  - **Internal Published**
  - **Flagged for Review**
  - **Approved Internal Resource**
  - **Approved for External Adaptation**
  - **Archived**

All four components must pass the same shared-component checklist as the rest of the platform: typography from the platform stack, palette restricted to the approved palette, focus rings consistent, dark/light parity confirmed.
