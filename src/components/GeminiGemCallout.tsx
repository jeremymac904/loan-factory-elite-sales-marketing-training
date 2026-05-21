import { externalLinks } from "@/lib/externalLinks";
import YouTubeEmbed from "./YouTubeEmbed";

type Props = {
  /** When true, omit the walkthrough video for tighter contexts. */
  compact?: boolean;
};

export default function GeminiGemCallout({ compact = false }: Props) {
  return (
    <section className="rounded-2xl border border-lf-orange/40 bg-lf-orangeSoft/60 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          AI setup
        </span>
        <span className="text-xs uppercase tracking-wide text-lf-orangeDark">
          Required before scaling AI prompts
        </span>
      </div>
      <h3 className="h-display mt-3 text-xl">
        Create Your Gemini Gem AI Twin
      </h3>
      <p className="prose-lf mt-2 text-base">
        Before using AI prompts at scale, fill out the Gemini Gem AI Twin intake
        form. The automation will send you setup instructions for creating your
        own Gemini Gem.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={externalLinks.geminiGemIntakeForm}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Gemini Gem AI Twin Intake Form
        </a>
        <a
          href={externalLinks.geminiGemWalkthroughYouTube}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Watch on YouTube
        </a>
      </div>

      {!compact && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            Walkthrough video
          </p>
          <div className="mt-2">
            <YouTubeEmbed
              src={externalLinks.geminiGemWalkthroughEmbed}
              title="Gemini Gem AI Twin walkthrough"
            />
          </div>
        </div>
      )}
    </section>
  );
}
