export type ApexTier = {
  id: "advisor" | "pro";
  name: string;
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
    name: "Apex Advisor",
    price: "$249",
    priceSuffix: "per month",
    tagline: "The foundation tier for serious loan officers.",
    href: "/apex-advisor/",
    ctaLabel: "Join Apex Advisor",
    ctaHref: "/apex-launch-call/",
    description:
      "A paid coaching membership with biweekly group coaching, the daily Power Hour Smile and Dial call, daily motivational coaching email, member resources, recordings, scripts, documents, handouts, trackers, scorecards, and leaderboard access.",
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
      "Apex Advisor leaderboard",
      "Favorite YouTube channel library",
    ],
  },
  {
    id: "pro",
    name: "Apex Advisor Pro",
    price: "$449",
    priceSuffix: "per month",
    tagline: "Everything in Apex Advisor plus live coaching and community.",
    href: "/apex-advisor-pro/",
    ctaLabel: "Go Pro with Apex Advisor Pro",
    ctaHref: "/apex-launch-call/",
    description:
      "Everything in Apex Advisor plus weekly coaching calls, the daily Breakfast Club call, a more specific daily coaching email, advanced certifications, priority accountability, the Pro leaderboard, and deeper mastermind access.",
    bestFor:
      "Loan officers who want a tighter coaching cadence, stronger accountability, and advanced specialty-track development.",
    includes: [
      "Everything in Apex Advisor",
      "Weekly coaching calls",
      "Daily Breakfast Club call",
      "More specific daily coaching email",
      "Advanced certifications",
      "Military Housing Specialist",
      "Investor Specialist",
      "Future specialty tracks (planned)",
      "Priority accountability",
      "Apex Advisor Pro leaderboard",
      "Advanced mastermind access",
      "Deeper coaching rhythm",
    ],
  },
];

export const apexCertifications = [
  {
    id: "aclo",
    name: "Certified Mortgage Advisor",
    requirement: "Complete the Apex Advisor certification requirements.",
    summary:
      "The core Apex Advisor designation for members who complete the required training and assessment work.",
    eligibleTiers: ["Apex Advisor", "Apex Advisor Pro"],
  },
  {
    id: "military-housing-specialist",
    name: "Military Housing Specialist",
    requirement:
      "Complete the approved Military Housing Specialist requirements.",
    summary:
      "Advanced Pro specialty track for serving military housing scenarios after the track is approved.",
    eligibleTiers: ["Apex Advisor Pro"],
  },
  {
    id: "investor-specialist",
    name: "Investor Specialist",
    requirement:
      "Complete the approved Investor Specialist requirements.",
    summary:
      "Advanced Pro specialty track for investor-focused scenarios after the track is approved.",
    eligibleTiers: ["Apex Advisor Pro"],
  },
  {
    id: "future-specialty-tracks",
    name: "Future Specialty Tracks",
    requirement: "Planned. Jeremy approval required before launch.",
    summary:
      "Future Pro specialty tracks can be added after the content, review process, and approval language are confirmed.",
    eligibleTiers: ["Apex Advisor Pro"],
  },
];

export const apexCertificationCompliance =
  "Certifications recognize completion of training and assessments. They are not a guarantee of production, income, or business results.";
