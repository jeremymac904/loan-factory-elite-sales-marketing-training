import Link from "next/link";
import AiAdvantageVideoCard from "@/components/AiAdvantageVideoCard";
import AiAdvantageUploadedVideoExplorer from "@/components/ai-training/AiAdvantageUploadedVideoExplorer";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Tabs from "@/components/ui/Tabs";
import {
  aiAdvantageVideoSectionOrder,
  getAiAdvantagePublishedVideosForSection,
} from "@/data/aiAdvantagePublishedVideos";
import {
  aiAdvantageYoutubeEmbeds,
  aiAdvantageYoutubeEmbedModuleGroups,
  aiAdvantageYoutubeEmbedValidation,
} from "@/data/aiAdvantageYoutubeEmbeds";

export const metadata = {
  title: "AI Advantage Video Library",
};

export default function AiAdvantageVideoLibraryPage() {
  const tabs = [
    {
      id: "uploaded",
      label: "Uploaded clips",
      content: (
        <section className="space-y-8">
          <SectionHeading
            eyebrow="AI Advantage clips"
            title="Uploaded module browser"
            description="These 63 clips are all uploaded, unlisted, and safe to embed with youtube_embed_url. Browse by module, open the suggested lesson path, or open the viewer directly."
          />
          <AiAdvantageUploadedVideoExplorer videos={aiAdvantageYoutubeEmbeds} />
        </section>
      ),
    },
    {
      id: "published",
      label: "Published micro-lessons",
      content: (
        <section className="space-y-10">
          <SectionHeading
            eyebrow="Published micro-lessons"
            title="Approved YouTube lessons"
            description="These are the published AI Advantage micro-lessons already in the library. Use them as the companion track to the uploaded module browser."
          />
          <div className="space-y-12">
            {aiAdvantageVideoSectionOrder.map((section) => {
              const videos = getAiAdvantagePublishedVideosForSection(section);

              if (!videos.length) return null;

              return (
                <div key={section}>
                  <h2 className="h-display text-2xl">{section}</h2>
                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    {videos.map((video) => (
                      <AiAdvantageVideoCard key={video.rowId} video={video} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="AI Advantage"
        title="Video Library"
        body={
          <p>
            Browse the published micro-lessons and the new uploaded module
            browser in one place. The uploaded clips are unlisted, embeddable,
            and safe to route through the internal lesson viewer.
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Uploaded clips"
            value={aiAdvantageYoutubeEmbedValidation.embeddableRows}
          />
          <SummaryCard
            label="Modules"
            value={aiAdvantageYoutubeEmbedModuleGroups.length}
          />
          <SummaryCard
            label="Published lessons"
            value={aiAdvantageVideoSectionOrder.reduce(
              (count, section) =>
                count + getAiAdvantagePublishedVideosForSection(section).length,
              0,
            )}
          />
          <SummaryCard
            label="Source issues"
            value={aiAdvantageYoutubeEmbedValidation.sourceIssueRows}
          />
        </div>
      </section>

      <section className="container-page pb-4">
        <Tabs tabs={tabs} defaultTabId="uploaded" />
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
          Safety note: all uploaded AI Advantage clips are unlisted. Use the
          embed URL for the player, do not publish them public, and do not
          enable subscriber notifications.
        </div>
      </section>
    </>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-lf-navy">{value}</p>
    </div>
  );
}
