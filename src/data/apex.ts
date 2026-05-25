export type ApexTier = {
  id: "advisor" | "pro";
  name: string;
  shortName: string;
  logoAssetId: "lo-mastery" | "loan-factory-alliance";
  price: string;
  priceSuffix: string;
  tagline: string;
  href: string;
  ctaLabel: string;
  ctaHref: string;
  description: string;
  bestFor: string;
  includes: string[];
};

export const apexTiers: ApexTier[] = [
  {
    id: "advisor",
    name: "Loan Factory LO Mastery Coaching",
    shortName: "LO Mastery",
    logoAssetId: "lo-mastery",
    price: "$249",
    priceSuffix: "per month",
    tagline: "A simple coaching rhythm for loan officers who want consistency.",
    href: "/apex-advisor/",
    ctaLabel: "Join LO Mastery",
    ctaHref: "/apex-launch-call/",
    description:
      "A paid coaching membership with group coaching, Power Hour, coaching email, member resources, recordings, scripts, handouts, trackers, scorecards, and leaderboard access.",
    bestFor:
      "Loan officers who want structure, coaching rhythm, accountability, and a clear member resource area.",
    includes: [
      "Biweekly group coaching calls",
      "Daily Power Hour Smile and Dial lunch-themed call",
      "Daily motivational coaching email",
      "Certified Mortgage Advisor designation",
      "Member area access",
      "Past training recordings",
      "Scripts, documents, and PDF handouts",
      "Greatness Tracker, Deal Flow Tracker, and Referral Partner Tracker",
      "Advisor Scorecard",
      "LO Mastery leaderboard",
      "Favorite YouTube channel library",
    ],
  },
  {
    id: "pro",
    name: "Loan Factory Alliance",
    shortName: "Loan Factory Alliance",
    logoAssetId: "loan-factory-alliance",
    price: "$449",
    priceSuffix: "per month",
    tagline: "More coaching touchpoints for LOs who want deeper accountability.",
    href: "/apex-advisor-pro/",
    ctaLabel: "Join Loan Factory Alliance",
    ctaHref: "/apex-launch-call/",
    description:
      "Everything in LO Mastery plus weekly coaching calls, Breakfast Club, more specific coaching emails, advanced certifications, priority accountability, the Alliance leaderboard, and advanced group coaching access.",
    bestFor:
      "Loan officers who want a tighter coaching cadence, stronger accountability, and advanced specialty-track development.",
    includes: [
      "Everything in LO Mastery",
      "Weekly coaching calls",
      "Daily Breakfast Club call",
      "More specific daily coaching email",
      "Advanced certifications",
      "Military Housing Specialist",
      "Investor Specialist",
      "Approved specialty tracks",
      "Priority accountability",
      "Loan Factory Alliance leaderboard",
      "Advanced group coaching access",
      "Deeper coaching rhythm",
    ],
  },
];

export const apexCertifications = [
  {
    id: "aclo",
    name: "Certified Mortgage Advisor",
    requirement: "Complete the LO Mastery certification requirements.",
    summary:
      "The core LO Mastery designation for members who complete the required training and assessment work.",
    eligibleTiers: ["LO Mastery", "Loan Factory Alliance"],
  },
  {
    id: "military-housing-specialist",
    name: "Military Housing Specialist",
    requirement:
      "Complete the approved Military Housing Specialist requirements.",
    summary:
      "Advanced Alliance specialty track for serving military housing scenarios after the track is approved.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
  {
    id: "investor-specialist",
    name: "Investor Specialist",
    requirement:
      "Complete the approved Investor Specialist requirements.",
    summary:
      "Advanced Alliance specialty track for investor-focused scenarios after the track is approved.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
  {
    id: "future-specialty-tracks",
    name: "Approved Specialty Tracks",
    requirement: "Jeremy approval required before a specialty track is added.",
    summary:
      "Alliance specialty tracks are added only after content, review process, and approval language are confirmed.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
];

export const apexCertificationCompliance =
  "Certifications recognize completion of training and assessments. They are not a guarantee of production, income, or business results.";
