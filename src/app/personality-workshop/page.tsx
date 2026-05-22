import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Personality Workshop" };

const formatBlocks = [
  {
    title: "Self paced",
    body: "Work through the personality and selling style modules on your own time. Reflection prompts, short exercises, and an integration worksheet.",
  },
  {
    title: "Live debrief (optional)",
    body: "Join a quarterly live debrief to apply your results to your real pipeline. Bring a deal, a partner, or a script and run it through your style.",
  },
];

const frameworks = [
  {
    name: "DISC style",
    body: "A communication style framework. Helps you read borrower and partner cues quickly and adjust your pace, your tone, and your level of detail.",
  },
  {
    name: "StrengthsFinder style",
    body: "A strengths framework. Helps you double down on what you do naturally well, instead of grinding to fix the wrong gaps.",
  },
];

const outcomes = [
  "Know how you naturally communicate and where it costs you.",
  "Recognize buyer and partner styles in the first two minutes of a call.",
  "Adjust your borrower discovery questions to the person in front of you.",
  "Pick the partner outreach style that fits the Realtor, not your default.",
  "Build a content rhythm that matches your strengths, not someone else's playbook.",
];

export default function PersonalityWorkshopPage() {
  return (
    <>
      <PageHero
        eyebrow="Personality Workshop"
        title="Know Your Strengths, Close More Loans."
        body={
          <p>
            Understanding your communication and selling style is the fastest
            way to upgrade your conversations. The Personality Workshop helps
            you see how you sell, how you communicate, and how to flex to the
            borrower or partner in front of you.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/apex-launch-call/" className="btn-primary">
            Join the Workshop
          </Link>
          <Link
            href="/apex-advisor/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            See Apex tiers
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="What you will get"
          title="Five outcomes you can use Monday."
        />
        <ul className="prose-lf mt-6 grid list-disc gap-2 pl-5 text-sm md:grid-cols-2">
          {outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Format"
            title="Self paced first. Live debrief if you want it."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {formatBlocks.map((b) => (
              <div key={b.title} className="card">
                <h3 className="h-display text-lg">{b.title}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Frameworks referenced"
          title="Borrowed from the best of the field."
          description="The workshop references two well known frameworks at a high level. We do not certify in either framework, and we do not reproduce their proprietary assessments. We use the patterns and language to make you a better communicator."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {frameworks.map((f) => (
            <div key={f.name} className="card">
              <h3 className="h-display text-lg">{f.name}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Who it is for"
            title="Every Apex Advisor member."
            description="The Personality Workshop is included with both Apex tiers. New loan officers use it to build a foundation. Experienced producers use it to sharpen partner work and content."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apex-launch-call/" className="btn-primary">
              Join the Workshop
            </Link>
            <Link href="/apex-advisor-track/" className="btn-secondary">
              See the Apex Track
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 pt-10">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            The Personality Workshop is a training tool. It is not a clinical
            assessment, not a hiring tool, and not a guarantee of production or
            income. References to DISC and StrengthsFinder are descriptive
            only. Loan Factory is not affiliated with the owners of those
            frameworks.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
