import { notFound, redirect } from "next/navigation";
import {
  aiAdvantageYoutubeEmbeds,
  getAiAdvantageYoutubeEmbedByLessonPath,
} from "@/data/aiAdvantageYoutubeEmbeds";

type Props = {
  params: Promise<{ slug: string[] }> | { slug: string[] };
};

export default async function AiAdvantageLegacyLessonPathPage({ params }: Props) {
  const { slug } = await params;
  const legacyPath = `/lo-development/ai-advantage/${slug.join("/")}`;
  const video = getAiAdvantageYoutubeEmbedByLessonPath(legacyPath);

  if (!video) notFound();

  redirect(video.lessonViewerPath);
}

export function generateStaticParams() {
  return aiAdvantageYoutubeEmbeds.map((video) => ({
    slug: video.suggestedLessonPath
      .replace(/^\/lo-development\/ai-advantage\//, "")
      .split("/"),
  }));
}
