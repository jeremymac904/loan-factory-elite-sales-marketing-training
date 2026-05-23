import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import { teamLaneAssignments } from "@/data/personaIntelligence";

export const metadata = { title: "Team Leader Playbook" };

export default function TeamLeaderPlaybookPage() {
  return (
    <PersonaShell
      title="Team Leader Playbook"
      description="Use personas to assign simple weekly lanes so the team creates more useful conversations without everyone doing the same thing."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <TextBlock title="How Team Leaders use personas">
            <p>
              Start with one community and one audience. Choose what that
              audience cares about, then assign each LO one lane for the week.
              The goal is clearer execution, not more meetings.
            </p>
          </TextBlock>
          <ListBlock
            title="What to do this week"
            items={[
              "Pick one community.",
              "Choose buyer, Realtor, or recruiting audience.",
              "Assign one LO to one lane.",
              "Review all public-facing ideas before use.",
              "Score the work on Friday.",
            ]}
          />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamLaneAssignments.map((lane) => (
            <TextBlock key={lane.lane} title={lane.lane}>
              <p>
                <strong>{lane.owner}</strong> owns this lane for the week.
              </p>
              <p>{lane.weeklyAction}</p>
            </TextBlock>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock
            title="Weekly execution rhythm"
            items={[
              "Monday: choose community, audience, and team lanes.",
              "Tuesday: draft internal assets and outreach topics.",
              "Wednesday: review localization and compliance sensitivity.",
              "Thursday: practice outreach and prepare event/funnel notes.",
              "Friday: review scorecard and decide next week.",
            ]}
          />
          <ListBlock
            title="How to assign LO lanes"
            items={[
              "Match lane to LO strength.",
              "Keep one clear owner per lane.",
              "Avoid duplicate content assignments.",
              "Use scorecards to see what worked.",
            ]}
          />
          <TextBlock title="Team Leader rule">
            <p>
              Do not turn persona planning into public copy without review. The
              Team Leader owns clarity, lane assignment, and weekly review.
            </p>
          </TextBlock>
        </div>

        <div className="mt-8">
          <ReadOnlyCallout>
            Lane assignments shown here are examples only. They do not save to a
            database or update any scorecard yet.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
