# Coaching Activity Tracking

**Principle:** Manual tracking for now. Automation can be connected later. The
Coach Command Center does **not** fake automated metrics — trackable numbers
render as "—" until a coach logs them or an integration is connected.

## What coaches track (manual today)
Logged with the LO during coaching sessions, or via the weekly scorecard:
- Real conversations, Realtor conversations, past-client touches
- Applications, prequals, referrals requested
- Follow-ups completed, training completed, videos watched, AI prompts used
- Wins, stuck points, next-week commitment

Stored in `coaching_activity_logs` + `coaching_scorecards` (jsonb `fields`) once
the migration is applied; rendered from `src/data/coachCommandCenter.ts` until then.

## Scorecards
- **LO Mastery ($249):** simple weekly execution scorecard (`loMasteryScorecardFields`).
- **Loan Factory Alliance ($449):** expanded scorecard (`allianceScorecardFields`)
  adding market activity, campaign activity, leadership activity, mastermind
  participation, advanced certification progress.

## Coaching status (not compliance)
Each member shows a coaching **activity** indicator: **active / needs nudge /
stuck / inactive**. This describes engagement, not compliance — there is no
compliance-risk labeling anywhere in the Coach Command Center.

## What automation could connect later (none active now)
- Activity could be derived from FaceGram participation, clip views, AI Twin
  usage, and quiz/scorecard submissions once those signals are wired.
- Until then, the snapshot is honest: manual entry, with the note shown on the
  Activity page. No automated tracking is implied.
