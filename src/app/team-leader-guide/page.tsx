import SectionHeading from "@/components/SectionHeading";
import RoleGate from "@/components/RoleGate";

export const dynamic = "force-dynamic";
export const metadata = { title: "Team Leader Guide" };

export default function TeamLeaderGuidePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/dark-hero-background.png"
        >
          <source src="/media/team-leader-website-builder.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />
        <div className="relative container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            For team leaders
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Team Leader Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            How to use the series as the backbone of the team. Monday kickoff,
            Wednesday roleplay, Friday production review. Protect the cadence.
            Coach individually, not in the room.
          </p>
        </div>
      </section>

      <RoleGate gate="team-leader-guide">
      <section className="container-page py-12 space-y-12">
        <div>
          <SectionHeading
            eyebrow="Cadence"
            title="The team week."
          />
          <ul className="prose-lf mt-4 list-disc space-y-1 pl-5 text-base">
            <li>Monday 10 minutes: kickoff. State the one behavior for the week.</li>
            <li>Wednesday 30 minutes: live roleplay block from the Roleplay Library.</li>
            <li>Friday 15 minutes per LO: production review and one specific change.</li>
            <li>End of week: pull the team tracker. Identify the bottom 20% on each category.</li>
          </ul>
        </div>

        <div>
          <SectionHeading
            eyebrow="Team meeting questions"
            title="Use the same five questions every Monday."
          />
          <ol className="prose-lf mt-4 list-decimal space-y-2 pl-5 text-base">
            <li>What is one specific borrower question we can turn into content this week?</li>
            <li>Who is our priority partner this week?</li>
            <li>Whose pipeline is at risk?</li>
            <li>What does the tracker say about our biggest gap?</li>
            <li>What does one LO want help with this week?</li>
          </ol>
        </div>

        <div>
          <SectionHeading
            eyebrow="Tracker review"
            title="Pull the team scorecard every Friday."
            description="Identify the bottom 20% on each category. Coach individually, not in the team room."
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Accountability"
            title="Own the weekly review."
            description="Team leaders own the weekly LO review. Roll up team metrics to corporate. Pull two recorded calls per LO per week and partner with coaches on review."
          />
        </div>
      </section>
      </RoleGate>
    </>
  );
}
