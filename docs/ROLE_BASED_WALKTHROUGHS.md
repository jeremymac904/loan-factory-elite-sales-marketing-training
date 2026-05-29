# Role-Based Walkthroughs

Step-by-step click paths for recording onboarding and training walkthroughs of the Loan Factory LO Development Platform, one per role.

## What this is

A production script for screen-recorded onboarding walkthroughs. Each section is a self-contained walkthrough for one role: a goal, the exact starting route, a clickable step-by-step path using real platform routes, what success looks like, common mistakes to call out, and recording notes for the person producing the video.

The platform is the internal Loan Factory LO Development Platform, built on Next.js 16 and deployed on Netlify from `main`. Live URL: `https://loan-factory-elite-sales-marketing-tr.netlify.app`. Roles and permissions are backed by Supabase (`role_permissions`, 15 rows). The AI engine referenced throughout is TERA.

## Who it's for

Approved Loan Factory users (loan officers and employees) being onboarded by role, and the internal team producing their onboarding videos. This is an internal, wholesale-focused platform. It is not a public consumer site, and nothing here is borrower-facing.

## How to use this doc

1. Pick the role you are onboarding or recording for.
2. Sign in as that role, or use Admin View-As (`/admin/view-as/`) to preview the platform exactly as that role sees it without switching Google accounts. Jeremy (master_admin) and other admins can drive every walkthrough below from one account this way.
3. Follow the steps in order. Every route is real. Read the "Recording notes" before you hit record so the capture is clean.
4. When a walkthrough needs a fact that is not yet confirmed (a price, a lender detail, a count), the script says `SOURCE NEEDED:` rather than inventing one. Fill it before publishing the video.

A note on automation: do not demonstrate live n8n runs, live email sends, or YouTube uploads in any recording. Where the platform shows draft or manual-first surfaces (for example AI email drafts), narrate them as manual-first and stop at the draft. Keep all destructive or outbound actions out of the capture.

---

## 1. Master Admin (`master_admin`)

**Goal.** Show a master admin how to run the platform end to end: review users, preview any role for training, and reach the admin AI assistant controls. This is the only role that can manage users (`can_manage_users`).

**Starting route.** `/admin/`

**Step-by-step path.**

1. Sign in at `/login/` with your `@loanfactory.com` Google Workspace account. You land authenticated as master_admin.
2. Go to `/admin/`. This is the admin home. Confirm the admin navigation is visible (User Management, View-As, AI Assistants).
3. Open `/admin/users`. Walk the user table: role badges, multi-role indicators, department, title, and active status. Point out that in the current build this reads the approved-users seed so the page works even when Supabase is not connected. Note that role changes and user creation are still done in Supabase, not yet in this UI.
4. Open `/admin/view-as/`. Pick a role (for example `loan_officer`) or a specific seeded user. The orange View-As banner appears on every page.
5. With View-As active, navigate to `/coaching` and `/facegram` to show how that role sees gated surfaces. Then click "Exit View-As" in the banner to return to your real master_admin session.
6. Open `/admin/ai-assistants` to review the admin-side AI assistant configuration surface.
7. Visit `/profile` and `/profile/edit` to show your own profile, then `/settings/google` to show the Google connection settings surface.

**Success looks like.** You viewed the full user table, entered and cleanly exited View-As as at least one other role, and reached the admin AI assistant controls, all from one signed-in master_admin account.

**Common mistakes.**
- Recording while still inside View-As and forgetting to exit. The orange banner stays up until you click "Exit View-As." Always exit before ending the recording.
- Expecting to change a user's role from `/admin/users`. Role changes happen in Supabase today; the UI is view-first.
- Treating View-As as a separate login. You stay signed in as your real account the entire time; real writes still go through your real account.

**Recording notes.**
- Capture the View-As banner appearing and disappearing. That transition is the single most important visual for this role.
- Blur or scroll past any real personal emails in `/admin/users` if the video will be shared widely.
- Keep the user table sort/scroll slow so role badges are readable on playback.

---

## 2. Loan Officer (`loan_officer`)

**Goal.** Get a standard approved LO oriented to their day-one surfaces: the sales training curriculum, resources, the AI assistant hub, the AI Twin, and FaceGram.

**Starting route.** `/` (Home)

**Step-by-step path.**

1. Sign in at `/login/` with your approved `@loanfactory.com` account. You land on `/` as a loan_officer.
2. On `/`, use the "Choose Your Starting Point" path selector to orient. Then go to `/sales-training` to see the six-module curriculum overview.
3. Open `/101-foundation`. This is the fully built starter module. Walk the agenda, the scripts, the assignment, and the "Do This Today" block. Set the expectation: finish the week with 25+ logged conversations.
4. Continue the sequence as preview: `/201-borrower-conversion`, `/301-referral-partner-growth`, `/401-content-marketing`, `/501-pipeline-sales-systems`, `/601-elite-execution`. Click into one or two so the LO sees the consistent module layout.
5. Open `/resources` to show the shared resource library.
6. Open `/ai-assistants` (the AI assistant hub), then `/ai-assistants/my-ai-twin` to introduce the LO's personal AI Twin powered by TERA.
7. Open `/facegram` for the internal community feed. Show that an LO can read, post text, comment, react, and save. Note that group creation and sponsored posts are not LO capabilities.
8. Finish on `/profile` and `/profile/edit` so the LO completes their profile.

**Success looks like.** The LO can find the sales training path, open 101, reach their AI Twin, post once in FaceGram, and complete their profile, without admin help.

**Common mistakes.**
- Jumping to 601 first. 601 is built for producers, team leaders, and coaches. Start at 101.
- Trying to create a FaceGram group. Group creation is restricted in the current build; LOs read, post, comment, react, and save.
- Treating the AI assistant as a borrower-facing tool. It is an internal coaching and productivity aid. No borrower-facing claims.

**Recording notes.**
- Record the path selector on `/` choosing a beginner path, then landing in 101. That is the core onboarding arc.
- In FaceGram, demonstrate a single text post and a save, then stop. Do not demonstrate publishing externally.
- Keep TERA naming consistent on screen and in narration.

---

## 3. LO Development (`lo_development` / `lo_development_lead` / `lo_development_member`)

**Goal.** Show the LO Development team where they review and shape platform content, run AI training, and support FaceGram moderation. Lead and member differ on admin reach; the content surfaces are shared.

**Starting route.** `/admin/` (lead) or `/` then `/ai-training` (member)

**Step-by-step path.**

1. Sign in at `/login/`. A `lo_development_lead` lands with admin-lite reach; a `lo_development_member` lands on the standard app with LO Dev surfaces.
2. Lead only: open `/admin/` and `/admin/users` to review users (lead has `can_access_admin`). Members do not have admin access; skip this step for member recordings.
3. Open `/ai-training` to reach the AI training hub. Walk the module list.
4. Open `/ai-training/video-library` to review the AI training video library that LO Dev curates.
5. Open `/training-library` and `/training-library/clips` to review the broader training library and clip cutdowns LO Dev maintains.
6. Open `/ai-assistants` to review the assistant hub LO Dev helps shape, then `/admin/ai-assistants` (lead only) for the admin-side configuration view.
7. Open `/facegram`, then `/facegram/groups`. LO Development runs official and training groups and provides moderation support. Show featured/official group context.
8. Finish on `/resources` to confirm the resource set LO Dev contributes to.

**Success looks like.** The LO Dev user can reach the AI training hub and video library, the training library and clips, and the FaceGram groups they help run. A lead additionally confirms admin and user-management reach.

**Common mistakes.**
- Recording a member walkthrough that opens `/admin/`. Members do not have admin access; only the lead does. Record the two variants separately.
- Conflating LO Development with Corporate Coach. LO Dev owns training content and AI training; coaches own coaching areas. Keep the lanes distinct.
- Describing FaceGram moderation as full control. LO Dev provides moderation support; full moderation and review queues sit with Admin and Marketing/Admin.

**Recording notes.**
- Record the lead and member variants as two clips, or use View-As to switch between `lo_development_lead` and `lo_development_member` so the access difference is visible.
- On `/ai-training/video-library`, do not demonstrate uploading to YouTube or triggering any publish workflow. Show the library as it stands.

---

## 4. Corporate Coach (`corporate_coach`)

**Goal.** Show a coach their coaching surfaces, the member areas they support, the AI assistant tools, and their FaceGram moderation role for coaching groups.

**Starting route.** `/coaching`

**Step-by-step path.**

1. Sign in at `/login/`. You land as `corporate_coach` with `can_access_coaching`.
2. Open `/coaching` to reach the coaching home.
3. Open `/member-area` to see the member experience coaches support, then `/member-area/lo-mastery` (the $249 LO Mastery area) and `/member-area/alliance` (the $449 Alliance area). Coaches should know both areas because they support members in each tier.
4. Open `/ai-assistants` to review the assistant hub, then `/ai-assistants/my-ai-twin` so the coach understands the AI Twin members will reference.
5. Open `/facegram`, then `/facegram/groups`. A coach runs coaching groups and can create coaching groups. Show coaching-group context.
6. Open `/facegram/notifications` and `/facegram/messages` so the coach can field member questions inside the community.
7. Finish on `/resources` for shared coaching resources.

**Success looks like.** The coach can open the coaching home, navigate both member areas, reach the AI Twin, and find their coaching groups and messages in FaceGram.

**Common mistakes.**
- Trying to approve sponsored posts. Sponsored content approval belongs to Marketing/Admin, not coaches. Coaches moderate coaching posts and leave moderation notes.
- Skipping the Alliance member area because the coach mostly works LO Mastery. Coaches should be fluent in both tiers since they support members across both.
- Sharing session-note privacy details on camera. Coach privacy rules for session notes are still being confirmed (`SOURCE NEEDED: confirmed coach session-note privacy rules`). Do not narrate specifics until confirmed.

**Recording notes.**
- Show the difference between `/member-area/lo-mastery` and `/member-area/alliance` side by side so the coach internalizes the two tiers.
- In FaceGram, demonstrate opening a coaching group and a message thread, not creating sponsored content.

---

## 5. Marketing (`marketing`)

**Goal.** Show the Marketing team their review surfaces: marketing content review, FaceGram sponsored-content and resource-group review, and the AI assistant tools they use to draft.

**Starting route.** `/facegram`

**Step-by-step path.**

1. Sign in at `/login/`. You land as `marketing` with `can_review_marketing`, `can_access_facegram`, and `can_moderate_facegram`.
2. Open `/facegram` for the community feed, then `/facegram/groups` to reach marketing and resource groups Marketing owns.
3. From the feed and groups, walk the sponsored-content review responsibility: Marketing/Admin owns sponsored review, resource approval, and compliance-sensitive moderation. Approval controls internal FaceGram visibility only, never external publication.
4. Open `/resources` to review the resource library Marketing approves into.
5. Open `/ai-assistants` for the assistant hub used for drafting. If the AI email-draft surface is shown, narrate it as manual-first: the role drafts and reviews, nothing sends. Stop at the draft.
6. Open `/facegram/notifications` to monitor flagged or queued content.
7. Finish on `/profile` and `/profile/edit`.

**Success looks like.** The Marketing user can reach FaceGram groups and the feed, explain that sponsored/resource approval is internal-visibility only, and open the AI draft tools without triggering any send.

**Common mistakes.**
- Implying that approving content publishes it externally. Marketing/Admin approval only controls internal FaceGram visibility. No external publish, no email send in the recording.
- Making rate, fee, APR, or program claims while reviewing content. None of these are confirmed here; flag anything that needs review as `SOURCE NEEDED:`. No "lowest," "best," or "guaranteed" claims, and nothing borrower-facing.
- Confusing Marketing's moderation scope with Admin's. Marketing handles sponsored review and compliance-sensitive moderation; full platform control stays with Admin.

**Recording notes.**
- Capture the review/approval surface clearly, but keep any draft email visibly unsent.
- If a real vendor or sponsored example appears, confirm it is approved for internal display before recording.

---

## 6. Loan Officer Support (`loan_officer_support`)

**Goal.** Show the LO Support team their two core surfaces: support routing and lender escalation, plus the shared resources they pull answers from.

**Starting route.** `/support-routing`

**Step-by-step path.**

1. Sign in at `/login/`. You land as `loan_officer_support` with `can_access_support` and `can_access_resources`.
2. Open `/support-routing`. This is the support team's home. Walk how incoming questions are categorized and routed.
3. Walk the lender-escalation path the support routing surface points to, for handing off questions that need a lender answer. Note that specific lender facts are not stated here; escalate rather than guess. `SOURCE NEEDED: current lender escalation contacts and SLAs`.
4. Open `/resources` to show the shared library support uses to answer common questions without escalating.
5. Confirm scope: support does not have coaching, admin, or FaceGram-moderation access. Support's lanes are routing, escalation, and resources.
6. Finish on `/profile`.

**Success looks like.** The support user can open support routing, describe when to resolve from resources versus escalate to a lender, and reach the resource library.

**Common mistakes.**
- Quoting a rate, fee, or program detail to close a ticket. Support routes and escalates; it does not invent lender facts. Anything not confirmed is `SOURCE NEEDED:`.
- Trying to open `/coaching`, `/admin`, or FaceGram moderation queues. Support does not have those. Keep the walkthrough to routing, escalation, and resources.
- Framing escalation as borrower-facing. This is internal LO support; nothing here goes to borrowers.

**Recording notes.**
- Capture the routing decision flow as the centerpiece: question in, categorized, resolved from resources or escalated.
- Do not show real ticket content with borrower personal data on camera.

---

## 7. LO Mastery Coaching Member ($249, `coaching_member_level_1`)

**Goal.** Onboard a paid LO Mastery member into their member area, their LO Mastery AI assistant, the community, and the coaching cadence they are paying for.

**Starting route.** `/member-area/lo-mastery`

**Step-by-step path.**

1. Sign in at `/login/`. You land as `coaching_member_level_1` with `can_access_coaching`.
2. Open `/member-area` for the member home, then go straight to `/member-area/lo-mastery`, your tier's area.
3. In the LO Mastery area, orient the member to what their tier includes: Daily Power Hour, biweekly group coaching, the daily coaching email, the Certified Mortgage Advisor track, scripts, trackers, the resource library, the leaderboard, and the LO Mastery Coaching AI assistant. (`SOURCE NEEDED: confirmed current $249 LO Mastery price and any change for the recording`.)
4. Open `/coaching` to reach the coaching home and find the live coaching cadence.
5. Open `/ai-assistants` and then `/ai-assistants/my-ai-twin` to set up and use the member's AI Twin powered by TERA.
6. Open `/facegram` and `/facegram/groups` so the member joins the community and any coaching group they are invited to.
7. Finish on `/profile` and `/profile/edit` so the member completes their profile, which surfaces in FaceGram.

**Success looks like.** The LO Mastery member reaches `/member-area/lo-mastery`, knows what their tier includes, opens their AI Twin, and joins the community, all in one session.

**Common mistakes.**
- Landing on `/member-area/alliance` instead of `/member-area/lo-mastery`. Alliance is the $449 tier; LO Mastery members belong in the LO Mastery area.
- Expecting Alliance-only benefits (Breakfast Club, weekly coaching, Mastermind sessions, advanced certifications). Those are the $449 tier. Set the upgrade expectation honestly, without inventing pricing.
- Treating the AI assistant or coaching as borrower-facing. It is for the member's own development.

**Recording notes.**
- Center the recording on `/member-area/lo-mastery` and the tier benefits list, then the AI Twin setup.
- Show the AI Twin as the member's own coaching aid; do not demonstrate any outbound automation.
- Keep prices accurate; if unconfirmed at record time, narrate "your LO Mastery plan" rather than stating a number.

---

## 8. Loan Factory Alliance Member ($449, `coaching_member_level_2`)

**Goal.** Onboard a premium Alliance member into their Alliance area, the mastermind cadence (including the biweekly Mastermind Meetings), the Alliance AI Coaching Assistant, and everything they also inherit from LO Mastery.

**Starting route.** `/member-area/alliance`

**Step-by-step path.**

1. Sign in at `/login/`. You land as `coaching_member_level_2` with `can_access_coaching`.
2. Open `/member-area`, then go to `/member-area/alliance`, your premium tier's area.
3. In the Alliance area, orient the member to the premium/mastermind benefits on top of everything in LO Mastery: Daily Breakfast Club, weekly coaching, the biweekly Mastermind Meetings, advanced certifications, priority coaching, the Leadership / Team Builder track, mastermind resources, and the Alliance AI Coaching Assistant. (`SOURCE NEEDED: confirmed current $449 Alliance price for the recording`.)
4. Point out that Alliance includes everything in LO Mastery. If useful, open `/member-area/lo-mastery` to show the inherited LO Mastery surfaces, then return to the Alliance area.
5. Open `/coaching` for the live coaching and mastermind cadence.
6. Open `/ai-assistants` and `/ai-assistants/my-ai-twin` to set up the Alliance AI Coaching Assistant and AI Twin powered by TERA.
7. Open `/facegram` and `/facegram/groups` for the community and the mastermind/leadership groups.
8. Finish on `/profile` and `/profile/edit`.

**Success looks like.** The Alliance member reaches `/member-area/alliance`, can name the premium benefits (especially the biweekly Mastermind Meetings) and that they inherit LO Mastery, opens their Alliance AI assistant, and joins the community.

**Common mistakes.**
- Stopping at the LO Mastery area and missing the premium Alliance benefits the member is paying the higher tier for. Land them in `/member-area/alliance`.
- Forgetting to mention the biweekly Mastermind Meetings. That cadence is a defining Alliance benefit; make it explicit.
- Stating a price or benefit detail that is not confirmed. Use `SOURCE NEEDED:` and narrate "your Alliance plan" until the number is confirmed.

**Recording notes.**
- Lead with the Alliance-specific benefits, then show the inherited LO Mastery surfaces so the value of the upgrade is obvious on camera.
- Capture the biweekly Mastermind Meetings cadence explicitly in narration.
- Keep the AI assistant framed as the member's own coaching aid; no outbound automation, no borrower-facing use.

---

## Cross-role recording checklist

Use this before publishing any walkthrough video:

- Exited View-As (no orange banner) if you used it to record.
- Said TERA, never MOSO. Said LO / loan officer, never ELO. Said "approved Loan Factory users," never "public/beta users." Said Netlify, never Vercel.
- No "coming soon," "not wired," or "placeholder" language in the narration.
- No invented rates, APRs, fees, or lender/program facts. Every unconfirmed fact left as `SOURCE NEEDED:` and resolved before publish.
- No borrower-facing claims; no "lowest," "best," or "guaranteed."
- Wholesale-only framing maintained; no correspondent-lending suggestions.
- No live n8n runs, live email sends, or YouTube uploads shown. Draft/automation surfaces narrated as manual-first.
- No real borrower personal data or unredacted user emails left on screen.

## Open items to confirm before publishing

- `SOURCE NEEDED:` confirmed current $249 LO Mastery and $449 Alliance prices at record time.
- `SOURCE NEEDED:` confirmed coach session-note privacy rules (still being confirmed by the coaching owner).
- `SOURCE NEEDED:` current lender escalation contacts and SLAs for the Loan Officer Support walkthrough.
- Confirm whether the LO Development member variant should ever show any admin surface, or strictly the non-admin path recorded here.
