# Screen Recording Checklist

Apply this checklist to every clip in the Walkthrough Director package. The goal is consistent framing, clean URLs, no PII, and a recognizable intro and outro across all eight role walkthroughs.

---

## Before You Hit Record

- [ ] Browser window is at **1920x1080**, full screen.
- [ ] Bookmarks bar is **hidden** (View menu in Chrome or Cmd+Shift+B).
- [ ] Only the platform tab is visible. Close email, Slack, and any tab with a real client name in the title.
- [ ] Browser zoom is **100%**.
- [ ] Notifications are silenced (Do Not Disturb on).
- [ ] Microphone level is tested.
- [ ] You are signed in as Jeremy McDonald (jeremy.mcdonald@loanfactory.com) for every clip.
- [ ] If recording a non-master-admin role, you are on `/admin/view-as` and have selected the target role so the orange View-As banner is visible.
- [ ] For the Master Admin clip only, the orange banner is **not** visible — Exit View-As first if it is.

## URL Bar and Framing

- [ ] The URL bar is visible in every frame so the viewer can see the exact route.
- [ ] The site is the staging Netlify build at `loan-factory-elite-sales-marketing-tr.netlify.app`.
- [ ] No personal browser profile avatar with a real photo is visible. Use a generic profile icon.
- [ ] No browser extensions show notification dots during the clip.

## Banner Visibility Rules

- [ ] Master Admin clip: orange View-As banner is **off**.
- [ ] All seven other role clips: orange View-As banner is **on** for every frame after View-As is engaged, and the **Exit View-As** click is captured at the end.

## Anonymization

- [ ] No real borrower names, loan numbers, addresses, phone numbers, or SSNs on screen.
- [ ] No real LO photos beyond the seeded demo users. Scroll past or blur.
- [ ] Real non-Loan Factory email addresses are not visible in any list.
- [ ] Form submissions are **never** triggered. Lender escalation, profile edit, and similar forms are walked visually only.

## Intro and Outro Consistency

- [ ] Each clip starts on its documented **Starting route** (typically `/` or `/admin/view-as`).
- [ ] Each clip opens with the **Suggested intro script** from its walkthrough markdown.
- [ ] Each clip ends with the **Suggested closing script** from its walkthrough markdown.
- [ ] For non-master roles, the final action on camera is clicking **Exit View-As** in the orange banner so the viewer sees the role tear-down.

## Between Clips

- [ ] Click **Exit View-As** before starting the next role clip.
- [ ] Land back on `/admin/view-as` and select the next target role.
- [ ] Confirm the new role label appears in the orange banner before pressing record.
- [ ] Clear any stale search inputs or open modals from the previous clip.

## After Recording

- [ ] Watch playback at 1x and confirm the URL bar is legible.
- [ ] Confirm the orange banner status matches the rule above.
- [ ] Confirm no PII slipped through.
- [ ] File the clip with the matching walkthrough filename (e.g. `normal_lo_walkthrough.mp4`) so the index pairs cleanly.

---

## Quick Reference: Role to Starting Route

| Walkthrough | Recorded as | Starting route |
| --- | --- | --- |
| Master Admin | Jeremy McDonald (direct) | `/` |
| Normal LO | Jeremy via View-As | `/admin/view-as` then `/` |
| LO Development | Jeremy via View-As | `/admin/view-as` then `/` |
| Corporate Coach | Jeremy via View-As | `/admin/view-as` then `/` |
| Marketing | Jeremy via View-As | `/admin/view-as` then `/` |
| Loan Officer Support | Jeremy via View-As | `/admin/view-as` then `/` |
| LO Mastery 249 | Jeremy via View-As | `/admin/view-as` then `/` |
| Alliance 449 | Jeremy via View-As | `/admin/view-as` then `/` |
