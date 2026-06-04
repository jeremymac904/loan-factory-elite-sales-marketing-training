import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CoachingScriptLibrary from "@/components/coaching/CoachingScriptLibrary";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Script Library · Member Area" };

export default async function MemberAreaScriptsPage() {
  const access = await getCoachingAccess();

  return (
    <>
      <PageHero
        eyebrow="Paid coaching tools"
        title="Script library"
        body={
          <p>
            Coaching-first scripts for the weekly rhythm, follow-up, and the
            conversations that keep members moving.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        {access.viewingAsLabel && (
          <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            Viewing as: {access.viewingAsLabel}
          </p>
        )}
      </PageHero>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="How to use it"
          title="Copy, personalize, and keep it coaching focused."
          description="These are draft starters for members, coaches, and coaching managers. Use the script that fits the conversation, then adjust it to the member and the week."
        />
      </section>

      <section className="container-page pb-14">
        <CoachingScriptLibrary access={access} />
      </section>
    </>
  );
}
