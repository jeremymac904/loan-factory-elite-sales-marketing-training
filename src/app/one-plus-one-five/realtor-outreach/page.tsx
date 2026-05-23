import {
  ComplianceNotice,
  ListBlock,
  PersonaCard,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import {
  personaTemplates,
  realtorOutreachAngles,
} from "@/data/personaIntelligence";

export const metadata = { title: "Realtor Outreach" };

export default function RealtorOutreachPage() {
  const realtorPersonas = personaTemplates.filter(
    (persona) => persona.type === "realtor",
  );

  return (
    <PersonaShell
      title="Realtor Outreach"
      description="Plan Realtor education, value assets, event ideas, and follow-up without sending anything publicly from this page."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {realtorPersonas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock title="Outreach angles" items={realtorOutreachAngles} />
          <ListBlock
            title="Scripts and topics"
            items={[
              "Buyer-readiness checklist conversation.",
              "Office training invitation.",
              "Local event co-host idea.",
              "Listing-agent update rhythm.",
              "Post-event follow-up plan.",
            ]}
          />
          <ListBlock
            title="Value propositions"
            items={[
              "Prepared buyers make better showings.",
              "Clear status updates reduce confusion.",
              "Education assets help Realtors serve their own database.",
              "Local workshops create useful conversations.",
            ]}
          />
          <ListBlock
            title="Event ideas"
            items={[
              "Buyer readiness lunch-and-learn.",
              "First-time buyer Q&A.",
              "Document prep workshop.",
              "Realtor office training session.",
            ]}
          />
          <ListBlock
            title="Follow-up strategy"
            items={[
              "Send one reviewed value asset.",
              "Ask for one real objection heard this week.",
              "Book one short partner review.",
              "Log every partner touch.",
            ]}
          />
          <TextBlock title="What to avoid">
            <p>
              Avoid public claims about rates, fees, payment, approval,
              underwriting, eligibility, or product availability. Do not offer
              things of value for referrals.
            </p>
          </TextBlock>
        </div>
        <div className="mt-8">
          <ReadOnlyCallout>
            Outreach scripts here are topics and planning notes only. Human and
            compliance review are required before public or partner-facing use.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
