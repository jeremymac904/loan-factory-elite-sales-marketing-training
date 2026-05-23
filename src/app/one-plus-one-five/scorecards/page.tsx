import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import { scorecardItems } from "@/data/personaIntelligence";

export const metadata = { title: "Scorecards" };

export default function ScorecardsPage() {
  return (
    <PersonaShell
      title="Scorecards"
      description="Use scorecards to tag personas, campaigns, channels, LO assignments, review status, and performance metrics."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock title="Scorecard fields" items={scorecardItems} />
          <ListBlock
            title="Persona tagging"
            items={[
              "Buyer",
              "Realtor",
              "Recruiting",
              "Community",
              "Language preference validated locally",
            ]}
          />
          <ListBlock
            title="Campaign tagging"
            items={[
              "Goal",
              "Channel",
              "Owner",
              "Review status",
              "Weekly action",
            ]}
          />
          <ListBlock
            title="Channel tracking"
            items={[
              "Social/video",
              "Email",
              "Google Business Profile planning",
              "Realtor outreach",
              "Community event",
            ]}
          />
          <ListBlock
            title="Performance metrics"
            items={[
              "Conversations created.",
              "Realtor meetings booked.",
              "Workshop attendance.",
              "Follow-up completed.",
              "Recruiting conversations.",
            ]}
          />
          <TextBlock title="Review scores">
            <p>
              Campaign fit, localization risk, and compliance sensitivity are
              manual review categories for Team Leaders and LO Development.
            </p>
          </TextBlock>
        </div>

        <div className="mt-8">
          <ReadOnlyCallout>
            Use these fields for planning and weekly review. Human review is
            required before public campaign use.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
