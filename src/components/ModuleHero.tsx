import { ModuleStatus, SkillLevel } from "@/lib/utils";

type Props = {
  level: string;
  title: string;
  promise: string;
  audience: string;
  status: ModuleStatus;
  outcomes: string[];
  levels?: SkillLevel[];
  backgroundImage?: string;
  backgroundVideo?: string;
};

export default function ModuleHero({
  level,
  title,
  promise,
  audience,
  outcomes,
  backgroundImage,
  backgroundVideo,
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
      <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />

      <div className="relative container-page py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {level}
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/85">{promise}</p>
        <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
          Best for: {audience}
        </p>
        {outcomes.length > 0 && (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {outcomes.map((o) => (
              <div
                key={o}
                className="rounded-xl border border-white/15 bg-lf-navyDark/40 p-4 text-sm leading-6 text-white/90 backdrop-blur"
              >
                <span className="mr-2 font-semibold text-lf-orange">&#10003;</span>
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
