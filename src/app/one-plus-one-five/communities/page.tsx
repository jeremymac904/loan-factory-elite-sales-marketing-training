import {
  CommunityCard,
  ComplianceNotice,
  PersonaShell,
  ReadOnlyCallout,
} from "@/components/persona-intelligence/PersonaModule";
import { personaCommunities } from "@/data/personaIntelligence";

export const metadata = { title: "Community Intelligence" };

export default function CommunitiesPage() {
  return (
    <PersonaShell
      title="Community Intelligence"
      description="Review all 29 community planning profiles. Use them as starting points, then validate locally before any public use."
    >
      <section className="container-page py-14">
        <ReadOnlyCallout>
          These profiles are planning hypotheses for Team Leaders. They are not
          borrower targeting rules and should never be used to include or
          exclude people.
        </ReadOnlyCallout>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {personaCommunities.map((community) => (
            <CommunityCard key={community.slug} community={community} />
          ))}
        </div>
        <div className="mt-8">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
