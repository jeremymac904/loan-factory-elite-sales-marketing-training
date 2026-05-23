import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Loan Factory LO Development",
    short_name: "LO Development",
    description:
      "Internal Loan Factory training, coaching, AI Advantage, FaceGram, and resources.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d1b2a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
