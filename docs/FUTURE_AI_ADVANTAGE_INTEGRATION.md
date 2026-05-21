# Future Loan Factory AI Advantage Integration

This document describes how the static portal evolves into a module inside Loan Factory AI Advantage. Nothing in this document assumes an open Loan Factory API. Nothing in this document claims a paid coaching platform is live.

## Why we are building static first

1. We can ship in days, not months.
2. We can pilot 101 to 301 with one team without waiting on platform work.
3. We can iterate on content before we wire it into the larger AI Advantage surface.
4. We protect compliance review time by keeping the system simple.

## What moves into AI Advantage later

### Pages
1. Module pages become structured lessons inside the AI Advantage curriculum tab.
2. Library pages (Script, AI Prompt, Roleplay) become assistant tool surfaces tied to each role.
3. The tracker becomes a built in weekly form that writes into the LO record.
4. Coach and team leader pages become role specific dashboards and review queues.

### Knowledge files
1. Loan Factory broker value proposition reference (240+ wholesale lenders).
2. Compliance reference (Reg Z triggering terms, SAFE Act NMLS, RESPA Section 8, FFIEC social media guidance).
3. Niche playbooks (start with self employed and VA).
4. The Script Library and AI Prompt Library content.

### Resource library
1. PDF handouts per module live in the resource library inside AI Advantage.
2. Replays live in the recordings tab.
3. Tracker exports live in the LO record.

### Tracker forms
1. Weekly LO tracker mapped to the field spec in `src/data/trackerFields.ts`.
2. Roleplay rubric form.
3. First call rubric form.

### Role access (planned)
1. LO. Lessons, scripts, prompts, tracker, certification.
2. Team leader. All of the above plus team scorecard view.
3. Corporate coach. All of the above plus coach review tools.
4. Jeremy owner admin. All dashboards and aggregate rollups.

### Dashboards (planned)
1. LO dashboard. This week's assignment, tracker entry, scorecard.
2. Team leader dashboard. Team scorecard, pipeline at risk view, content output.
3. Coach dashboard. Review queue for recorded calls awaiting score.
4. Owner dashboard. Cross team trends and certification rate.

### AI assistant prompts
The prompts in `src/data/prompts.ts` are the starting library. Inside AI Advantage they are loaded into TERA. The LO finds them pre pinned in their workspace. Every output is a draft and is reviewed by the LO before any borrower or public use.

### Coach view
Coaches see each LO's tracker entries, completed assignments, and uploaded recorded calls. Comments are visible to the LO and the team leader.

### Team leader view
Team leaders see team rollup, identify LOs behind on assignments, and assign roleplay pairings.

### Jeremy owner admin view
Cross org rollups. Certification rates per team. Content compliance flags. AI workflow adoption rate.

## Decisions needed before integration

1. Official certification name and badge design.
2. Standard closing gift framework within RESPA limits.
3. Whether paid coaching platform features are referenced anywhere in 601.
4. Final KPI list for the owner versus coach dashboards.
5. Niche playbooks priority order beyond self employed and VA.

## What is blocked

1. Any feature that depends on an open Loan Factory API.
2. Any feature that depends on a paid coaching platform that has not launched.
3. Daily companywide training claims. The cadence is weekly.
4. Free processing claims. None appear anywhere.
5. Production guarantees. None appear anywhere.

## Migration sequence (suggested)

1. Pilot 101 to 301 with one team using the static portal.
2. Refine the content from pilot feedback.
3. Lift the data files into the AI Advantage curriculum store.
4. Wire the weekly tracker form into the LO record.
5. Build the coach review queue.
6. Build the team leader dashboard.
7. Build the owner admin rollup.
8. Roll out 401 to 601.
