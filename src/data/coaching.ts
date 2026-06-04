export type CoachingTier = {
  id: "lo-mastery" | "alliance";
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

export const coachingTiers: CoachingTier[] = [
  {
    id: "lo-mastery",
    name: "Loan Factory LO Mastery Coaching",
    shortName: "LO Mastery",
    logoAssetId: "lo-mastery",
    price: "$249",
    priceSuffix: "per month",
    tagline: "A simple coaching rhythm for loan officers who want consistency.",
    href: "/lo-mastery-coaching/",
    ctaLabel: "Join LO Mastery",
    ctaHref: "/login/",
    description:
      "A paid coaching membership with weekly calls, daily execution, scorecards, scripts, member resources, and coach follow-up.",
    bestFor:
      "Loan officers who want structure, coaching rhythm, accountability, and a clear member resource area.",
    includes: [
      "12 week path",
      "Daily time blocker",
      "Theme days",
      "Script book",
      "Greatness tracker",
      "Weekly scorecard",
      "Coach calls",
      "Community",
      "Accountability",
      "Resources",
    ],
  },
  {
    id: "alliance",
    name: "Loan Factory Alliance",
    shortName: "Loan Factory Alliance",
    logoAssetId: "loan-factory-alliance",
    price: "$449",
    priceSuffix: "per month",
    tagline: "More coaching touchpoints for LOs who want deeper accountability.",
    href: "/loan-factory-alliance/",
    ctaLabel: "Join Loan Factory Alliance",
    ctaHref: "/login/",
    description:
      "Everything in LO Mastery plus advanced business planning, database reactivation, realtor partner growth, content rhythm, production systems, community, and deeper accountability.",
    bestFor:
      "Loan officers who want a tighter coaching cadence, stronger accountability, and advanced business growth support.",
    includes: [
      "Everything in LO Mastery",
      "Weekly coaching calls",
      "Advanced business planning",
      "Database reactivation",
      "Realtor partner growth",
      "Content rhythm",
      "Production systems",
      "Advanced coaching reviews",
      "Priority accountability",
      "Community",
      "Deeper coaching rhythm",
    ],
  },
];

export const coachingTracks = [
  {
    id: "aclo",
    name: "LO Mastery progress track",
    requirement: "Complete the LO Mastery track requirements.",
    summary:
      "The core LO Mastery track for members who complete the required weekly coaching work.",
    eligibleTiers: ["LO Mastery", "Loan Factory Alliance"],
  },
  {
    id: "military-housing-specialist",
    name: "Military housing track",
    requirement: "Complete the approved Military housing track requirements.",
    summary:
      "Advanced Alliance track for serving military housing scenarios after the track is approved.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
  {
    id: "investor-specialist",
    name: "Investor track",
    requirement: "Complete the approved Investor track requirements.",
    summary:
      "Advanced Alliance track for investor-focused scenarios after the track is approved.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
  {
    id: "future-specialty-tracks",
    name: "Approved specialty tracks",
    requirement: "Jeremy approval required before a specialty track is added.",
    summary:
      "Alliance specialty tracks are added only after content, review process, and approval language are confirmed.",
    eligibleTiers: ["Loan Factory Alliance"],
  },
];

export const coachingTrackCompliance =
  "Coaching tracks recognize completion of weekly work and assessments. They are not a guarantee of production, income, or business results.";
