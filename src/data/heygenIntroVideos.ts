export type HeyGenIntroVideo = {
  route: string;
  speaker: string;
  label: string;
  embedUrl: string;
  title: string;
};

export const heygenIntroVideos: HeyGenIntroVideo[] = [
  {
    route: "/apex-advisor/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/coaching/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/lo-mastery-coaching/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/loan-factory-alliance/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/member-area/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/apex-member-area/",
    speaker: "Edward",
    label: "Watch Edward's Coaching Intro",
    embedUrl: "https://app.heygen.com/embeds/e3b29b2422d04793b478aaab5d13e7c3",
    title: "Edward - Coaching Intro",
  },
  {
    route: "/sales-training/",
    speaker: "Jeremy",
    label: "Watch Jeremy's Training Intro",
    embedUrl: "https://app.heygen.com/embeds/495b155fa8a54ebf89f6d688bef29804",
    title: "Jeremy - Sales & Marketing",
  },
  {
    route: "/101-foundation/",
    speaker: "Jeremy",
    label: "Watch Jeremy's Training Intro",
    embedUrl: "https://app.heygen.com/embeds/495b155fa8a54ebf89f6d688bef29804",
    title: "Jeremy - Sales & Marketing",
  },
  {
    route: "/ai-training/",
    speaker: "Jeremy",
    label: "Watch Jeremy's AI Advantage Intro",
    embedUrl: "https://app.heygen.com/embeds/bf6b437acb60464fbe08f6efc73b0335",
    title: "Jeremy - AI Advantage",
  },
  {
    route: "/creator-network/",
    speaker: "Thuan",
    label: "Watch Thuan's FaceGram Intro",
    embedUrl: "https://app.heygen.com/embeds/6e86d933511c4c35901a798b74b09598",
    title: "Thuan - FaceGram",
  },
  {
    route: "/creator-network/groups/",
    speaker: "Thuan",
    label: "Watch Thuan's FaceGram Intro",
    embedUrl: "https://app.heygen.com/embeds/6e86d933511c4c35901a798b74b09598",
    title: "Thuan - FaceGram",
  },
  {
    route: "/facegram/",
    speaker: "Thuan",
    label: "Watch Thuan's FaceGram Intro",
    embedUrl: "https://app.heygen.com/embeds/6e86d933511c4c35901a798b74b09598",
    title: "Thuan - FaceGram",
  },
  {
    route: "/facegram/groups/",
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
  const exactMatch = heygenIntroVideos.find(
    (video) => video.route === normalizedPath,
  );

  if (exactMatch) {
    return exactMatch;
  }

  return [...heygenIntroVideos]
    .filter((video) => video.route !== "/" && normalizedPath.startsWith(video.route))
    .sort((a, b) => b.route.length - a.route.length)[0];
}
