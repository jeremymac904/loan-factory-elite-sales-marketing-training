import { notFound } from "next/navigation";
import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import {
  getPersonaCommunity,
  personaCommunities,
} from "@/data/personaIntelligence";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return personaCommunities.map((community) => ({ slug: community.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const community = getPersonaCommunity(slug);
  return {
    title: community ? `${community.name} Community Intelligence` : "Community Intelligence",
  };
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const community = getPersonaCommunity(slug);

  if (!community) {
    notFound();
  }

  return (
    <PersonaShell
      title={`${community.name} Community Intelligence`}
      description="Use this page to plan buyer education, Realtor outreach, recruiting, content lanes, and localization review before any public use."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <TextBlock title="Overview">
            <p>{community.overview}</p>
            <p>{community.languageConsiderations}</p>
          </TextBlock>
          <ListBlock title="Borrower trust signals" items={community.trustSignals} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <TextBlock title="Realtor relationship strategy">
            <p>{community.realtorStrategy}</p>
          </TextBlock>
          <TextBlock title="Recruiting strategy">
            <p>{community.recruitingStrategy}</p>
          </TextBlock>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ListBlock title="Content themes" items={community.contentThemes} />
          <ListBlock title="Content to avoid" items={community.contentToAvoid} />
          <ListBlock title="Video ideas" items={community.videoIdeas} />
          <ListBlock title="Event and partnership ideas" items={community.eventIdeas} />
          <ListBlock title="Funnel ideas" items={community.funnelIdeas} />
          <ListBlock title="Google Business Profile ideas" items={community.gbpIdeas} />
          <ListBlock title="Newsletter ideas" items={community.newsletterIdeas} />
          <ListBlock title="Objection prep" items={community.objections} />
          <ListBlock title="CTA language examples" items={community.ctaExamples} />
          <ListBlock title="Suggested campaigns" items={community.suggestedCampaigns} />
          <ListBlock title="Priority persona lanes" items={community.personaLanes} />
          <ListBlock title="Review required" items={community.reviewRequired} />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <TextBlock title="Localization notes">
            <p>{community.localizationNotes}</p>
          </TextBlock>
          <TextBlock title="Fair lending caution">
            <p>{community.complianceCaution}</p>
          </TextBlock>
        </div>

        <div className="mt-8">
          <ReadOnlyCallout>
            This page is a planning reference only. It does not create public
            copy, launch ads, post to Google Business Profile, or save campaign
            data.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
