import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Recommended Channels" };

type Channel = {
  name: string;
  category: string;
  description: string;
};

type ChannelSection = {
  id: string;
  title: string;
  description: string;
  channels: Channel[];
};

const sections: ChannelSection[] = [
  {
    id: "ai-tech",
    title: "AI and Technology (for mortgage pros)",
    description:
      "Voices to follow if you want to stay current on the AI tools shaping mortgage and sales workflows.",
    channels: [
      {
        name: "Matt Wolfe",
        category: "AI tools",
        description: "AI tool roundups and tutorials.",
      },
      {
        name: "Wes Roth",
        category: "AI research",
        description: "Deep AI research explainers.",
      },
      {
        name: "Sam Altman OpenAI",
        category: "AI leadership",
        description: "Industry leadership perspective.",
      },
      {
        name: "Andrej Karpathy",
        category: "AI fundamentals",
        description: "Technical AI foundations.",
      },
      {
        name: "AI Explained",
        category: "AI explainers",
        description: "Accessible AI breakdowns.",
      },
    ],
  },
  {
    id: "mortgage-finance",
    title: "Mortgage, Real Estate, and Finance",
    description:
      "Industry coaches, market analysts, and sales voices worth studying for mortgage perspective.",
    channels: [
      {
        name: "Barry Habib",
        category: "Market commentary",
        description: "MBS Highway market commentary.",
      },
      {
        name: "Logan Mohtashami",
        category: "Housing data",
        description: "Housing data and economic analysis.",
      },
      {
        name: "Tom Ferry",
        category: "Real estate coaching",
        description: "Real estate sales coaching.",
      },
      {
        name: "Brian Buffini",
        category: "Relationship sales",
        description: "Relationship based sales.",
      },
      {
        name: "Gary Vaynerchuk",
        category: "Entrepreneurship",
        description: "Entrepreneurial mindset.",
      },
      {
        name: "Grant Cardone",
        category: "Sales mindset",
        description: "Sales intensity and mindset.",
      },
    ],
  },
  {
    id: "personal-development",
    title: "Personal Development and Performance",
    description:
      "Voices to sharpen mindset, discipline, and performance habits over the long run.",
    channels: [
      {
        name: "Tony Robbins",
        category: "Peak performance",
        description: "Peak performance and mindset.",
      },
      {
        name: "David Goggins",
        category: "Mental toughness",
        description: "Mental toughness.",
      },
      {
        name: "Jocko Willink",
        category: "Leadership",
        description: "Discipline and leadership.",
      },
      {
        name: "Ed Mylett",
        category: "Success",
        description: "Success principles.",
      },
      {
        name: "Lewis Howes",
        category: "Greatness",
        description: "School of Greatness.",
      },
    ],
  },
];

function youtubeSearchUrl(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`;
}

export default function RecommendedChannelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Outside Voices Worth Studying"
        title="Recommended Channels."
        body={
          <p>
            Short, curated list of outside voices for AI and technology,
            mortgage and real estate, and personal performance. Use as study
            material, not policy.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page pt-10">
        <ComplianceCallout title="Read this first" variant="default">
          <p>
            These channels are shared for educational purposes only. Loan
            Factory does not officially endorse or have an affiliation with any
            of the creators listed. Always verify information with your
            compliance team before applying to your business.
          </p>
        </ComplianceCallout>
      </section>

      <section className="container-page py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="pill hover:border-lf-navy hover:text-lf-navy"
            >
              {s.title}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="h-display text-2xl md:text-3xl">{section.title}</h2>
              <p className="prose-lf mt-2 max-w-2xl text-sm text-lf-slate">
                {section.description}
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {section.channels.map((ch) => (
                  <article key={ch.name} className="card flex h-full flex-col gap-3">
                    <div>
                      <h3 className="h-display text-lg">{ch.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                        {ch.category}
                      </p>
                    </div>
                    <p className="prose-lf text-sm text-lf-slate">
                      {ch.description}
                    </p>
                    <a
                      href={youtubeSearchUrl(ch.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto btn-secondary"
                    >
                      View Channel
                      <span aria-hidden className="ml-1">&#8599;</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Apex Advisor lists these channels for training reference only. Any
            borrower facing, Realtor facing, or public content you create from
            material on these channels must be reviewed by Loan Factory
            compliance before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
