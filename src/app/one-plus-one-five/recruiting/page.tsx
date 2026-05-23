import {
  ComplianceNotice,
  ListBlock,
  PersonaCard,
  PersonaShell,
  ReadOnlyCallout,
} from "@/components/persona-intelligence/PersonaModule";
import { personaTemplates, recruitingAngles } from "@/data/personaIntelligence";

export const metadata = { title: "Recruiting Strategy" };

export default function RecruitingPage() {
  const recruitingPersonas = personaTemplates.filter(
    (persona) => persona.type === "recruiting",
  );

  return (
    <PersonaShell
      title="Recruiting Strategy"
      description="Use internal recruiting personas and angles to plan conversations with new LOs, producing LOs, team leader candidates, and bilingual LOs."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {recruitingPersonas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock title="Recruiting angles" items={recruitingAngles} />
          <ListBlock
            title="Social content ideas"
            items={[
              "Team growth system overview.",
              "What a new LO gets in week one.",
              "How campaign lanes help producing LOs.",
              "Why reviewed bilingual outreach needs support.",
            ]}
          />
          <ListBlock
            title="Conversation starters"
            items={[
              "What support do you wish you had weekly?",
              "Where are you losing time right now?",
              "Would a reviewed campaign lane help you stay consistent?",
              "What community or partner lane would you own?",
            ]}
          />
          <ListBlock
            title="Internal recruiting notes"
            items={[
              "Keep recruiting claims reviewed.",
              "Do not imply guaranteed production outcomes.",
              "Use support-system language, not hype.",
              "Route final recruiting copy for review.",
            ]}
          />
        </div>
        <div className="mt-8">
          <ReadOnlyCallout>
            This page is for internal recruiting planning. It does not create
            ads, send messages, or publish public recruiting copy.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
