export type HeyGenIntroVideo = {
  route: string;
  speaker: string;
  label: string;
  embedUrl: string;
  title: string;
};

export const heygenIntroVideos: HeyGenIntroVideo[] = [
  {
    route: "/",
    speaker: "Andre",
    label: "Watch Andre's Welcome",
    embedUrl: "https://app.heygen.com/embeds/034992427fe44831a39a5f2afe65b371",
    title: "Andre King - LO Development Portal Intro",
  },
  {
    route: "/apex-advisor/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Platform",
  },
  {
    route: "/sales-training/",
    speaker: "Jeremy",
    label: "Watch Jeremy's Training Intro",
    embedUrl: "https://app.heygen.com/embeds/495b155fa8a54ebf89f6d688bef29804",
    title: "Jeremy - Sales & Marketing",
  },
  {
    route: "/ai-training/",
    speaker: "Jeremy",
    label: "Watch Jeremy's AI Training Intro",
    embedUrl: "https://app.heygen.com/embeds/bf6b437acb60464fbe08f6efc73b0335",
    title: "Jeremy - AI Training",
  },
  {
    route: "/creator-network/",
    speaker: "Thuan",
    label: "Watch Thuan's FaceGram Intro",
    embedUrl: "https://app.heygen.com/embeds/6e86d933511c4c35901a798b74b09598",
    title: "Thuan - FaceGram",
  },
  {
    route: "/ai-assistants/",
    speaker: "Jeremy",
    label: "Watch Jeremy's Assistant Intro",
    embedUrl: "https://app.heygen.com/embeds/4bf3ceed2bb04dd094173e7c42a66c0c",
    title: "Jeremy - AI assistants",
  },
  {
    route: "/resources/",
    speaker: "Andre",
    label: "Watch Andre's Resource Intro",
    embedUrl: "https://app.heygen.com/embeds/2a89afffe5ae47b8bcac6d41854f5be1",
    title: "Andre King - Support Page",
  },
  {
    route: "/support-routing/",
    speaker: "Andre",
    label: "Watch Andre's Resource Intro",
    embedUrl: "https://app.heygen.com/embeds/2a89afffe5ae47b8bcac6d41854f5be1",
    title: "Andre King - Support Page",
  },
];

export function findHeyGenIntroVideo(pathname: string) {
  const normalizedPath =
    pathname === "/" ? pathname : pathname.endsWith("/") ? pathname : `${pathname}/`;

  return heygenIntroVideos.find((video) => video.route === normalizedPath);
}
