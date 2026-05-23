import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import { boardroomReviewCategories } from "@/data/personaIntelligence";

export const metadata = { title: "AI Boardroom Review" };

export default function AIBoardroomPage() {
  return (
    <PersonaShell
      title="AI Boardroom Review"
      description="A read-only preview of what AI Boardroom will eventually review before campaigns move from planning into approval."
    >
      <section className="container-page py-14">
        <ReadOnlyCallout>
          AI Boardroom is not connected here. This page shows review categories,
          prompts, and flow only.
        </ReadOnlyCallout>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock
            title="What AI Boardroom will review"
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
              Future score that checks whether the community, audience,
              campaign goal, channel, and LO lane make sense together.
            </p>
          </TextBlock>
          <TextBlock title="Compliance sensitivity score">
            <p>
              Future score that flags fair lending, protected-class targeting,
              rate/APR/fee/payment language, eligibility language, and public
              claims that require review.
            </p>
          </TextBlock>
          <TextBlock title="Localization risk score">
            <p>
              Future score that checks whether translation, tone, community
              context, channel choice, and CTA language need local review.
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
          <TextBlock title="What is blocked for beta">
            <p>
              No AI scoring, no campaign saving, no public publishing, no n8n
              workflow, and no database writes are wired on this page.
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
