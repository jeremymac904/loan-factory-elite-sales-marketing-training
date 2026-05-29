# AI Twin Rollout Copy

**Owner:** Jeremy McDonald
**Status:** Drafts only — Jeremy approves before any internal placement
**Voice:** Internal Loan Factory — direct, practical, safety-first

This file contains every piece of paste-ready copy for the AI Twin rollout: in-app banner, setup callout, safety line, in-app card, per-role rollout notes, and FAQ.

---

## In-App Banner

**Placement:** Top of dashboard for all approved Loan Factory users with AI Twin access, dismissible after first read.

**Headline:**
```
Your AI Twin is live.
```

**Subhead:**
```
Drafts in your voice. You send. Set yours up in 5 steps — about 10 minutes.
```

**CTA button:** `Set up my Twin →` (links to `/ai-assistants/setup`)

---

## 5-Step Setup Callout

**Placement:** `/ai-assistants/setup` — top of page, mirrors the actual setup flow.

```
Set up your AI Twin in 5 steps:

1. Pick a starter voice profile that matches your role
   (Loan officer, team leader, coach, marketing — we have starters for each.)

2. Connect Google (optional)
   Go to /settings/google if you want your Twin to read context from your own
   Docs or Calendar. Per-user only. You approve every scope.

3. Paste in 3 sample notes you've actually written
   Real emails, real recap notes, real follow-ups. The more honest the samples,
   the better the drafts.

4. Train it
   Click "Train Twin" and give it 30 seconds.

5. Run your first draft
   Pick a draft type, give it the context, and read what comes back.
   Edit it. Send it. You're in.
```

---

## Safety Line (use everywhere we mention AI Twin)

```
Drafts only. Per-user scopes. No bulk send.
```

**Long form (use on the setup page and in the FAQ):**

```
Your AI Twin writes drafts — you send. It is scoped to one user (you), and it
can only see what your role already sees inside the platform. It does not send
emails. It does not auto-reply. It does not bulk-send to your contacts. It does
not act for anyone else.
```

---

## In-App Card Copy (for `/ai-assistants`)

**Card title:**
```
AI Twin
```

**Card body:**
```
Your personal writing assistant — trained on your voice, scoped to your role.
Drafts follow-up emails, FaceGram posts, internal updates, and coaching recaps.
You review every draft. You send.
```

**Card footer:**
```
Drafts only · Per-user scopes · No bulk send
```

**Primary action:** `Open my Twin →`
**Secondary action:** `Set up / re-train →`

---

## Per-Role Rollout Notes

Use these for the rollout email segment-by-role and for in-app role-specific tooltips. One paragraph each.

### `master_admin` (Jeremy)
```
You get the full Twin plus the ability to View-As any user and see how their
Twin behaves under their scope. Use this when a user reports their Twin is
producing off-voice drafts — you can reproduce it in their view without
touching their data.
```

### `admin`
```
You have full Twin access for your own use. You can also see Twin usage stats
in /admin so you can flag any user who hasn't completed setup after 7 days.
You cannot read another user's Twin drafts.
```

### `lo_development_lead` (Andre)
```
Your Twin is tuned to coach voice and training recap drafts. Use it for daily
coaching email drafts, Power Hour recap notes, and training library card
descriptions. You can also help LO Development members set up their Twins —
walk them through the 5 steps in a 10-minute share if they ask.
```

### `lo_development_member`
```
Your Twin is set up for training facilitation. Use it for session recap drafts,
attendee follow-up notes, and adapting national content to your audience. If
you're hosting Power Hour, your Twin can draft the daily reminder for you —
edit it before you post.
```

### `corporate_coach`
```
Your Twin is the Coaching Assistant version — it understands the coaching
frameworks (LO Mastery and Alliance) and drafts in coach voice. Use it for
session recap drafts, between-session check-in messages, and adapting
mastermind notes for the member you're coaching. Always send drafts as
yourself — not as the platform.
```

### `marketing`
```
Your Twin is tuned for marketing-approved adaptations only. It can draft
internal social examples, FaceGram resource shares, and training library copy.
It will not draft anything that makes a rate, APR, or approval claim — those
are blocked at the prompt level. If you need to adapt anything externally
facing, run it through your normal compliance channel first.
```

### `team_leader`
```
Your Twin is set up for team-leader voice — daily stand-up prompts, recap
notes for your team, and 1:1 prep notes. You can also use it to draft internal
updates to your team in your voice. It cannot send to your team automatically
— every message goes out from you.
```

### `coaching_member_level_1` ($249 LO Mastery)
```
You have access to the LO Mastery Coaching Assistant — the AI Twin tuned to
LO Mastery frameworks. Use it for daily Power Hour prep, follow-up drafts on
warm leads, and adapting the daily coaching email to your pipeline. It does
not replace your coach — it helps you show up sharper to your next session.
```

### `coaching_member_level_2` ($449 Alliance)
```
You have access to the Alliance Coaching Assistant — tuned for leadership
and team builder work, in addition to everything in LO Mastery. Use it for
mastermind prep, team builder scripts, and adapting Breakfast Club takeaways
into action notes for your team. Same rule: it drafts, you send.
```

---

## FAQ

### Will it send emails?
```
No. Your AI Twin writes drafts. You review every draft and you send it
yourself from your normal email tool. There is no auto-send, no scheduled
send, and no bulk send anywhere in the Twin flow.
```

### Can it read my Gmail?
```
Only if you connect Google in /settings/google and explicitly approve the
read scope. Even then, it is per-user — your Twin reads context from your
own Gmail and Docs only when you ask it to draft something that needs that
context. It does not sweep your inbox. It does not retain Gmail content
between draft sessions. Disconnect any time at /settings/google.
```

### Is it on for everyone?
```
AI Twin is on for approved Loan Factory users on the platform — that's the
35 seeded users at launch. Within that group, each user has to complete the
5-step setup before their Twin produces drafts. Your Twin is scoped to your
role and your data — you cannot see anyone else's Twin and they cannot see
yours.
```

---

## Send Checklist

- [ ] Banner copy approved by Jeremy
- [ ] Setup callout matches the actual `/ai-assistants/setup` flow exactly
- [ ] Per-role notes pasted into the correct role tooltips
- [ ] Safety line appears on every surface that mentions AI Twin
- [ ] FAQ is linked from the in-app card and the rollout email
- [ ] No rate, APR, or approval claims
- [ ] No consumer marketing language
