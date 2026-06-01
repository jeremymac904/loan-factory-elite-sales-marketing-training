import PageHero from "@/components/PageHero";
import LoVideoLibraryBrowser from "@/components/video-library/LoVideoLibraryBrowser";
import type { LoVideoCardModel } from "@/components/video-library/LoVideoCard";
import { loDevelopmentVideoLibrary } from "@/data/loDevelopmentVideoLibrary";
import { getLoVideoContent } from "@/data/loDevelopmentVideoContent";

export const metadata = {
  title: "LO Development Video Library | Loan Factory",
  description:
    "Internal long-form trainings and short clips for loan officers — Loan Officer Foundations, Sales and Marketing 101-601, Business Development, AI Advantage, Compliance and Operations, and Client Experience.",
};

export default function LoDevelopmentVideoLibraryPage() {
  // Merge the library model (PA2) with the editorial layer (PA7) by id.
  // Guard for any video that has no matching content entry.
  const cards: LoVideoCardModel[] = loDevelopmentVideoLibrary.map((video) => {
    const content = getLoVideoContent(video.id);
    return {
      id: video.id,
      routeSlug: video.routeSlug,
      title: video.title,
      description: content?.summary ?? video.description,
      category: video.category,
      sourceType: video.sourceType,
      hostingStatus: video.hostingStatus,
      youtubeEmbedUrl: video.youtubeEmbedUrl,
      youtubeVideoId: video.youtubeVideoId,
      googleDriveUrl: video.googleDriveUrl,
      thumbnailPath: video.thumbnailPath,
      priority: video.priority,
      watchTime: content?.watchTime ?? null,
    };
  });

  return (
    <div>
      <PageHero
        eyebrow="LO Development"
        title="LO Development Video Library"
        body="The full internal training catalog for loan officers — browse the long-form recordings and the short clips cut from them. Use search and the format, category, and hosting filters to find a lesson fast."
      />
      <LoVideoLibraryBrowser videos={cards} />
    </div>
  );
}
