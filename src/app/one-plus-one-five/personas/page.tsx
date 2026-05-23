import Link from "next/link";
import {
  ComplianceNotice,
  PersonaCard,
  PersonaShell,
  ReadOnlyCallout,
} from "@/components/persona-intelligence/PersonaModule";
import {
  PersonaAudience,
  personaCommunities,
  personaTemplates,
} from "@/data/personaIntelligence";

export const metadata = { title: "Persona Library" };

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function normalizeAudience(value: SearchParams[string]): PersonaAudience | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "buyer" || raw === "realtor" || raw === "recruiting") return raw;
  return undefined;
}

export default async function PersonaLibraryPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const audience = normalizeAudience(params.audience);
  const communitySlug = Array.isArray(params.community)
    ? params.community[0]
    : params.community;
  const selectedCommunity = personaCommunities.find(
    (community) => community.slug === communitySlug,
  );
  const personas = audience
    ? personaTemplates.filter((persona) => persona.type === audience)
    : personaTemplates;

  return (
    <PersonaShell
      title="Persona Library"
      description="Choose buyer, Realtor, or recruiting templates before the team plans content, outreach, funnels, and follow-up."
    >
      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h2 className="h-display text-2xl">Pick an audience</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/one-plus-one-five/personas/" className="btn-secondary">
                All
              </Link>
              {(["buyer", "realtor", "recruiting"] as PersonaAudience[]).map(
                (item) => (
                  <Link
                    key={item}
                    href={`/one-plus-one-five/personas/?audience=${item}`}
                    className={audience === item ? "btn-primary" : "btn-secondary"}
                  >
                    {item === "realtor" ? "Realtor" : item}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-lf-line bg-lf-mist p-4">
            <h3 className="h-display text-lg">Community filter</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Use this to preview which community the templates should be
              localized for. It does not create public copy.
            </p>
            <div className="mt-3 grid gap-2">
              {personaCommunities.slice(0, 6).map((community) => (
                <Link
                  key={community.slug}
                  href={`/one-plus-one-five/personas/?${new URLSearchParams({
                    ...(audience ? { audience } : {}),
                    community: community.slug,
                  }).toString()}`}
                  className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal hover:text-lf-orange"
                >
                  {community.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {selectedCommunity && (
          <ReadOnlyCallout>
            Showing templates through the lens of {selectedCommunity.name}.
            Validate language, tone, and local context before any public use.
          </ReadOnlyCallout>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <PersonaCard key={persona.id} persona={persona} />
          ))}
        </div>

        <div className="mt-8">
          <ComplianceNotice />
        </div>
      </section>
    </PersonaShell>
  );
}
