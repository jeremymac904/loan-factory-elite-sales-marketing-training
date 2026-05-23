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
    name: "Elite Sales and Marketing Training",
    alt: "Elite Sales and Marketing Training 101 through 601 logo",
    filePath: "/images/brand/elite-sales-marketing-training-logo.svg",
    fallbackPath: "/images/brand/elite-sales-marketing-training-logo.png",
    usage:
      "Primary brand for this training portal. SVG is preferred for crisp scaling. PNG fallback exists at /images/brand/elite-sales-marketing-training-logo.png. Use in the site header lockup, hero brand band, footer, and premium handouts. Always keep at least 24 pixels of clear space around the mark.",
    background: "both",
  },
  "loan-factory": {
    id: "loan-factory",
    name: "Loan Factory",
    alt: "Loan Factory logo",
    filePath: "/images/brand/loan-factory-logo-transparent.png",
    usage:
      "Supporting company brand. Use smaller than the Elite training logo on every shared surface. Pair in hero and footer to make the company sponsorship clear without overpowering the training brand.",
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
  "On this internal training site, the Elite Sales and Marketing Training logo always reads larger than the Loan Factory logo. Loan Factory is the supporting brand, not the primary brand for this property.";
