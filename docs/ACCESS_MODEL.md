# Access Model — PERMANENT PROJECT RULE

> **This is an internal Loan Factory platform on a Loan Factory subdomain, NOT a public marketing website and NOT an app that forces login on every page.**
>
> **THE RULE:** *General internal platform pages must remain accessible without an additional app login. Authentication is required only for private dashboards, role-specific tools, saved user data, admin functions, coaching records, support submissions, AI workspaces, and external connected actions.*

Future agents: **do not re-gate the public overview pages below.** If you are adding a gate to a page, it must hold private/role/user data — otherwise leave it public. A normal Loan Factory loan officer is already inside the Loan Factory ecosystem and must be able to browse the informational/training-discovery layer without a second login.

---

## Two layers

### 1. PUBLIC internal layer — viewable WITHOUT an extra app login
These are informational / program-discovery / training-overview pages. They render **no private user data**. Keep them ungated.

| Page | Route |
|---|---|
| Home | `/` |
| LO Development overview | `/lo-development/` *(LO-facing fallback for non-staff; never a hard sign-in wall)* |
| Training overview | `/training-library/` |
| Sales and Marketing overview (free 101-601) | `/sales-training/` |
| AI Advantage overview | `/ai-training/` |
| Coaching overview | `/coaching/` |
| LO Mastery overview | `/lo-mastery-coaching/` |
| Loan Factory Alliance overview | `/loan-factory-alliance/` |
| Performance Alliance overview | `/performance-alliance/` |
| Inner Circle overview | `/inner-circle/` |
| Corporate Coaching overview | `/corporate-coaching/` |
| Team Leader Coaching overview | `/team-leader-coaching/` |
| FaceGram overview | `/facegram/` *(signed-out shows `FaceGramOverview` — what it is + sign-in CTA, no feed/posts)* |
| Support overview | `/support-routing/` |
| Resources overview | `/resources/` |

### 2. PROTECTED layer — REQUIRES sign-in (identity / role / private data)
Anything tied to identity, role, private records, admin control, saved data, or personalized workflows.

- Admin tools, User management, View as role, Platform status controls (`/admin/*`)
- Role dashboards: `/normal-lo/` (Loan Officer), and the staff command centers behind `/lo-development/`, `/training-academy/`, `/marketing/`
- Coach dashboards: `/coach-command-center/*` (Corporate Coach, Corporate Coach Supervisor, LO Mastery Coach, Loan Factory Alliance Coach, Team Leader)
- Paid coaching member dashboards: `/member-area/*` (LO Mastery, Loan Factory Alliance)
- Private scorecards, coaching notes, progress tracking, submitted forms
- AI assistants tied to a user, AI Twin workspaces
- FaceGram **workspace actions** (the live feed/posting — the overview stays public)
- Support **routing submissions** (the overview stays public)
- Private resource downloads
- Draft email / Gmail / Google Chat / Calendar / any connected workflow tool
- Any page that shows user data, coaching data, or department-specific private data

---

## How it is enforced in code
- **Navigation** (`src/components/nav/primaryNav.ts` + `src/components/SiteHeader.tsx`): a signed-out visitor gets `getLoggedOutNav()` — the informational nav (Training, Sales & Marketing, AI Advantage, **Coaching**, FaceGram, Support, Resources). Signed-in users get `getNavForRole(effectiveRole)` (view-as aware).
- **Public overview pages**: no `RoleGate`, no session-gated branch that returns a "Sign in required" card.
- **Protected pages**: `RoleGate`, `getBetaUserSession`/`getEffectiveAccess` + `resolveProtectedAccess`, `AccessNotice`, `LoFallbackGate`, or `getCoachingAccess`/`getCoachAccess`.
- **Effective role**: gate on the *effective* role (`getEffectiveAccess`) so admin "View as role" is honored (view-as only ever restricts).

## Anti-patterns (do NOT do these)
- ❌ Wrapping an informational overview page in `RoleGate`.
- ❌ Returning a "Sign in required" card from a general overview page for signed-out users.
- ❌ Pointing the signed-out top nav at protected dashboards.
- ❌ Removing "Coaching" / "LO Mastery" / "Loan Factory Alliance" discovery from the public layer.
- ❌ Treating "internal platform" as "must log in on every page." Internal ≠ per-page app login.

## QA — test on every release
**Logged-out / unauthenticated, confirm these load as normal overview pages (no sign-in wall):**
`/` · `/lo-development/` · `/training-library/` · `/sales-training/` · `/ai-training/` · `/coaching/` · `/lo-mastery-coaching/` · `/loan-factory-alliance/` · `/performance-alliance/` · `/inner-circle/` · `/corporate-coaching/` · `/team-leader-coaching/` · `/facegram/` · `/support-routing/` · `/resources/`

**Logged-out, confirm these still gate (show access notice/fallback, NOT private data):**
`/admin/` · `/admin/view-as/` · role dashboards (`/normal-lo/`, staff dashboards) · `/coach-command-center/` · `/member-area/lo-mastery/` · `/member-area/alliance/` · scorecards · coaching notes · FaceGram workspace · support submission · AI assistants/AI Twin · connected comm tools

**Confirm:** no `/Users/` or `/Volumes/` path leaks; no private user/coaching data on any logged-out page.
