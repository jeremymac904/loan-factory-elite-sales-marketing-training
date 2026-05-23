import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  children?: ReactNode;
  /** Path to a background image (PNG). */
  backgroundImage?: string;
  /** Path to a background video (MP4). Plays muted, looped, autoplay. */
  backgroundVideo?: string;
  /** Optional poster image for the video. */
  videoPoster?: string;
  /** Override the dark overlay opacity. 0 to 1. Defaults to 0.55. */
  overlayOpacity?: number;
};

/**
 * Dark hero band with optional background image or video and a dark overlay.
 * Text always sits over a charcoal scrim so headlines stay readable.
 */
export default function PageHero({
  eyebrow,
  title,
  body,
  children,
  backgroundImage,
  backgroundVideo,
  videoPoster,
  overlayOpacity = 0.55,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-lf-navy text-white">
      {backgroundVideo && (
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={videoPoster}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      {!backgroundVideo && backgroundImage && (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-lf-navyDark"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative container-page py-16 md:py-20">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {body && (
          <div className="mt-4 max-w-2xl text-lg text-white/85">{body}</div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
