import {
  ComplianceNotice,
  ListBlock,
  PersonaShell,
  ReadOnlyCallout,
  TextBlock,
} from "@/components/persona-intelligence/PersonaModule";
import {
  PersonaAudience,
  campaignGoals,
  personaCommunities,
  sampleCampaignRecommendation,
  teamLaneAssignments,
} from "@/data/personaIntelligence";

export const metadata = { title: "Campaign Builder Preview" };

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

const audiences: PersonaAudience[] = ["buyer", "realtor", "recruiting"];

function firstParam(value: SearchParams[string]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CampaignBuilderPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const selectedCommunity =
    personaCommunities.find(
      (community) => community.slug === firstParam(params.community),
    ) ?? personaCommunities[0];
  const selectedAudience =
    audiences.find((audience) => audience === firstParam(params.audience)) ??
    "buyer";
  const selectedGoal =
    campaignGoals.find((goal) => goal === firstParam(params.goal)) ??
    campaignGoals[0];

  return (
    <PersonaShell
      title="Campaign Builder Preview"
      description="Select a community, audience, and goal to preview a read-only Team Leader campaign plan. Nothing saves or generates live AI output."
    >
      <section className="container-page py-14">
        <form method="get" className="card grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Community
            <select
              name="community"
              defaultValue={selectedCommunity.slug}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            >
              {personaCommunities.map((community) => (
                <option key={community.slug} value={community.slug}>
                  {community.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Audience
            <select
              name="audience"
              defaultValue={selectedAudience}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            >
              <option value="buyer">Buyer</option>
              <option value="realtor">Realtor</option>
              <option value="recruiting">Recruiting</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-lf-navy">
            Goal
            <select
              name="goal"
              defaultValue={selectedGoal}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            >
              {campaignGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">
              Preview plan
            </button>
          </div>
        </form>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <TextBlock title="Sample campaign output">
            <p>
              <strong>Community:</strong> {selectedCommunity.name}
            </p>
            <p>
              <strong>Audience:</strong> {selectedAudience}
            </p>
            <p>
              <strong>Goal:</strong> {selectedGoal}
            </p>
            <p>{sampleCampaignRecommendation.campaignSummary}</p>
          </TextBlock>
          <ListBlock
            title="CTA examples"
            items={selectedCommunity.ctaExamples.slice(0, 4)}
          />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamLaneAssignments.map((lane) => (
            <TextBlock key={lane.lane} title={lane.lane}>
              <p>
                <strong>{lane.owner}:</strong> {lane.weeklyAction}
              </p>
            </TextBlock>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ListBlock
            title="Next-step checklist"
            items={sampleCampaignRecommendation.nextSteps}
          />
          <ListBlock
            title="Campaign lanes from source package"
            items={sampleCampaignRecommendation.lanes.map(
              (lane) => `${lane.owner}: ${lane.action}`,
            )}
          />
        </div>

        <div className="mt-8">
          <ReadOnlyCallout>
            This preview does not save campaigns, call AI, create ads, post to
            Google Business Profile, or send emails.
          </ReadOnlyCallout>
        </div>
        <div className="mt-6">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
