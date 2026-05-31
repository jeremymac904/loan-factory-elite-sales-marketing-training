export type BrandAsset = {
  id:
    | "elite"
    | "loan-factory"
    | "ai-advantage"
    | "facegram"
    | "lo-mastery"
    | "loan-factory-alliance";
  name: string;
  alt: string;
  filePath: string;
  fallbackPath?: string;
  usage: string;
  background: "light" | "dark" | "both";
};

export const brandAssets: Record<BrandAsset["id"], BrandAsset> = {
  elite: {
    id: "elite",
    name: "Sales and Marketing 101-601",
    alt: "Sales and Marketing 101 through 601 logo",
    filePath: "/images/brand/elite-sales-marketing-training-logo.svg",
    fallbackPath: "/images/brand/elite-sales-marketing-training-logo.png",
    usage:
      "Legacy file asset used as the visual mark for the Sales and Marketing 101-601 training path. SVG is preferred for crisp scaling. Use in training handouts and review surfaces only.",
    background: "both",
  },
  "loan-factory": {
    id: "loan-factory",
    name: "Loan Factory",
    alt: "Loan Factory logo",
    filePath: "/images/brand/loan-factory-logo-transparent.png",
    usage:
      "Primary company brand for the LO Development Platform. Use in the site header, hero areas, footer, and platform-level handouts.",
    background: "both",
  },
  "ai-advantage": {
    id: "ai-advantage",
    name: "AI Advantage",
    alt: "AI Advantage logo",
    filePath: "/logos/lo-development/ai-advantage.png",
    usage:
      "Primary mark for the Loan Factory AI Training experience and AI Advantage cards.",
    background: "both",
  },
  facegram: {
    id: "facegram",
    name: "FaceGram",
    alt: "FaceGram logo",
    filePath: "/logos/lo-development/facegram.png",
    usage:
      "Primary user-facing mark for the FaceGram community experience.",
    background: "both",
  },
  "lo-mastery": {
    id: "lo-mastery",
    name: "Loan Factory LO Mastery Coaching",
    alt: "Loan Factory LO Mastery Coaching logo",
    filePath: "/logos/lo-development/lo-mastery.png",
    usage:
      "Level I paid coaching mark. Short display name is LO Mastery.",
    background: "both",
  },
  "loan-factory-alliance": {
    id: "loan-factory-alliance",
    name: "Loan Factory Alliance",
    alt: "Loan Factory Alliance logo",
    filePath: "/logos/lo-development/loan-factory-alliance.png",
    usage: "Level II paid coaching mark.",
    background: "both",
  },
};

export const brandHierarchyRule =
  "Loan Factory is the primary brand for the LO Development Platform. Sales and Marketing 101-601, LO Mastery, Loan Factory Alliance, AI Advantage, and FaceGram are sub-brands inside the platform.";
