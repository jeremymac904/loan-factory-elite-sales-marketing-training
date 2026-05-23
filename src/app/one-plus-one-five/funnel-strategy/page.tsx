import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import { funnelStages } from "@/data/personaIntelligence";

export const metadata = { title: "Funnel Strategy" };

export default function FunnelStrategyPage() {
  return (
    <PersonaShell
      title="Funnel Strategy"
      description="See simple funnel recommendations by audience, from awareness to follow-up, without saving leads or launching automation."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-4">
          {funnelStages.map((stage) => (
            <article key={stage.stage} className="card">
              <h2 className="h-display text-xl">{stage.stage}</h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-lf-slate">
                <p>
                  <strong className="text-lf-navy">Buyer:</strong> {stage.buyer}
                </p>
                <p>
                  <strong className="text-lf-navy">Realtor:</strong> {stage.realtor}
                </p>
                <p>
                  <strong className="text-lf-navy">Recruiting:</strong>{" "}
                  {stage.recruiting}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock
            title="Social content ideas"
            items={[
              "Short education video",
              "Local workshop invitation",
              "Realtor Q&A clip",
              "Checklist reminder",
              "Community event recap",
            ]}
          />
          <ListBlock
            title="Landing page ideas"
            items={[
              "Buyer readiness checklist",
              "Payment comfort roadmap",
              "Realtor partner toolkit",
              "Recruiting growth-system review",
            ]}
          />
          <ListBlock
            title="Lead routing notes"
            items={[
              "Route by audience and campaign lane.",
              "Keep borrower details out of public planning notes.",
              "Assign follow-up owner before launch.",
              "Review compliance sensitivity before use.",
            ]}
          />
          <ListBlock
            title="Follow-up cadence concepts"
            items={[
              "Same-day reply",
              "Three-day reminder",
              "Seven-day check-in",
              "Friday Team Leader review",
            ]}
          />
          <TextBlock title="How to measure">
            <p>
              Track conversations, Realtor meetings, event attendance, checklist
              requests, and follow-up completion. Do not measure success by
              unreviewed claims or public copy volume.
            </p>
          </TextBlock>
          <ReadOnlyCallout>
            Funnel routing is planning-only. No CRM, TERA, email, n8n, or
            database writes are connected.
          </ReadOnlyCallout>
        </div>
        <div className="mt-8">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
