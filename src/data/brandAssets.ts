export type BrandAsset = {
  id: "elite" | "loan-factory";
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
};

export const brandHierarchyRule =
  "On this internal training site, the Elite Sales and Marketing Training logo always reads larger than the Loan Factory logo. Loan Factory is the supporting brand, not the primary brand for this property.";
