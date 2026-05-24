import Link from "next/link";
import AiAdvantageVideoCard from "@/components/AiAdvantageVideoCard";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { aiAdvantagePublishedVideos } from "@/data/aiAdvantagePublishedVideos";

export const metadata = {
  title: "AI Advantage Video Library",
};

export default function AiAdvantageVideoLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Advantage"
        title="Video Lesson Library"
        body={
          <p>
            Watch short AI Advantage lessons that help you draft, organize,
            follow up, create marketing ideas, and review AI work before it is
            used.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.7}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-training/" className="btn-primary">
            Back to AI Advantage
          </Link>
          <Link
            href="/prompts/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open Prompt Library
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="Published YouTube micro-lessons"
          description="These verified unlisted YouTube lessons are ready to watch inside the platform. Pick one lesson, try one practical action, and review every AI draft before use."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {aiAdvantagePublishedVideos.map((video) => (
            <AiAdvantageVideoCard key={video.rowId} video={video} />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
          AI is a draft helper. Do not paste borrower PII, do not make rate,
          APR, fee, approval, underwriting, or compliance approval claims, and
          use human review before anything leaves Loan Factory.
        </div>
      </section>
    </>
  );
}
