import Link from "next/link";
import AudioCompanionCard from "@/components/audio/AudioCompanionCard";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import {
  audioCompanions,
  bonusAudioCompanions,
  coreAudioCompanions,
  getAudioStatusLabel,
} from "@/data/audioCompanions";

export const metadata = { title: "Audio Training Library" };

function statusCount(label: string) {
  return audioCompanions.filter(
    (companion) => getAudioStatusLabel(companion.status) === label,
  ).length;
}

export default function AudioTrainingPage() {
  return (
    <>
      <PageHero
        title="Audio Training Library"
        body={
          <p>
            Audio companions help loan officers review Sales & Marketing
            lessons while driving, walking, or preparing for the next coaching
            conversation.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.68}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/audio-training/#core-audio" className="btn-primary">
            Start with 101-601 audio
          </Link>
          <Link
            href="/audio-training/#bonus-audio"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            View bonus audio
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {["Audio version under review", "Published"].map((label) => (
            <article key={label} className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {label}
              </p>
              <p className="mt-2 h-display text-3xl">{statusCount(label)}</p>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                {label === "Published"
                  ? "Audio is approved and plays inside the platform."
                  : "Audio script is finished. The player appears here once review is complete."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="core-audio" className="container-page py-10 scroll-mt-24">
        <SectionHeading
          title="Core 101-601 audio companions"
          description="Each Sales & Marketing lesson has one matching audio companion. Approved audio appears automatically after review."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {coreAudioCompanions.map((companion) => (
            <AudioCompanionCard key={companion.id} companion={companion} />
          ))}
        </div>
      </section>

      <section id="bonus-audio" className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            title="Bonus sales and marketing audio"
            description="These are extra review episodes for follow-up, Realtor relationships, AI Advantage, objection handling, and turning training into weekly action."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {bonusAudioCompanions.map((companion) => (
              <AudioCompanionCard key={companion.id} companion={companion} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/25 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
          These are internal training companions. Review every generated audio
          file before publishing it, and do not upload borrower/private loan
          content.
        </div>
      </section>
    </>
  );
}
