import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import { boardroomReviewCategories } from "@/data/personaIntelligence";

export const metadata = { title: "AI Boardroom Review" };

export default function AIBoardroomPage() {
  return (
    <PersonaShell
      title="AI Boardroom Review"
      description="Use these review categories before campaigns move from planning into public-facing content."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock
            title="Manual review checklist"
            items={[
              "Community and audience fit.",
              "Campaign lane clarity.",
              "Localization risk.",
              "Compliance sensitivity.",
              "Team Leader weekly actionability.",
              "Scorecard readiness.",
            ]}
          />
          <ListBlock
            title="Strategy scoring categories"
            items={boardroomReviewCategories}
          />
          <ListBlock
            title="Recommended review flow"
            items={[
              "Team Leader drafts internal plan.",
              "Local validation notes are added.",
              "Compliance-sensitive items are flagged.",
              "Marketing or LO Development reviews.",
              "Only approved content moves toward public use.",
            ]}
          />
          <TextBlock title="Campaign fit score">
            <p>
              Check whether the community, audience, campaign goal, channel,
              and LO lane make sense together.
            </p>
          </TextBlock>
          <TextBlock title="Compliance sensitivity score">
            <p>
              Flag fair lending, protected-class targeting, rate/APR/fee/payment
              language, eligibility language, and public claims that require
              review.
            </p>
          </TextBlock>
          <TextBlock title="Localization risk score">
            <p>
              Check whether translation, tone, community context, channel
              choice, and CTA language need local review.
            </p>
          </TextBlock>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ListBlock
            title="Prompts available in source package"
            items={[
              "AI Boardroom review prompt.",
              "Campaign builder prompt.",
              "Community strategy generation prompt.",
              "Buyer persona generation prompt.",
              "Realtor persona generation prompt.",
              "Recruiting persona generation prompt.",
              "Compliance review prompt.",
            ]}
          />
          <TextBlock title="Before public use">
            <p>
              Keep campaign ideas internal until the right human review is
              complete. Do not publish protected-class targeting, pricing,
              approval, eligibility, rate, APR, fee, or underwriting claims.
            </p>
          </TextBlock>
        </div>
        <div className="mt-8">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
