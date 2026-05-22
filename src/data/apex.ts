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
      "Full access to the Apex Advisor Track (101 through 601), the resource libraries, and the member area. The simple weekly operating system that turns conversations into closings.",
    bestFor:
      "New and experienced loan officers who want a clear weekly system and the full course library.",
    includes: [
      "Apex Advisor Track (modules 101 through 601)",
      "Script Library, AI Prompt Library, Roleplay Library",
      "Audio Training Library",
      "Weekly Tracker and Personality Workshop",
      "Recommended Channels and study guides",
      "Member area access",
      "Eligible for the Apex Certified Loan Officer (ACLO) certification",
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
      "For loan officers who want live coaching, mastermind access, and advanced TERA workflows. Pro members get the full Apex Advisor curriculum plus monthly coaching calls, the Apex Mastermind community, and access to the annual Apex Summit.",
    bestFor:
      "Producers and team leaders who want live coaching, mastermind access, and accountability.",
    includes: [
      "Everything in Apex Advisor",
      "Monthly live mastermind calls",
      "Direct coaching access",
      "Advanced TERA workflows",
      "Priority content requests",
      "Apex Summit access (live annual event)",
      "Apex Mastermind community",
      "Eligible for all Apex certifications",
    ],
  },
];

export const apexCertifications = [
  {
    id: "aclo",
    name: "Apex Certified Loan Officer (ACLO)",
    requirement: "Complete the Apex Advisor Track (101 through 601).",
    summary:
      "The foundation credential. Shows you have completed every module of the Apex Advisor Track and can run the weekly operating system from start to finish.",
    eligibleTiers: ["Apex Advisor", "Apex Advisor Pro"],
  },
  {
    id: "tera-power-user",
    name: "Apex TERA Power User",
    requirement:
      "Complete the TERA module and pass the TERA workflow assessment.",
    summary:
      "Shows you can use TERA — Loan Factory's loan origination software, point of sale, and CRM platform — to run a clean pipeline, structured borrower journeys, and partner workflows.",
    eligibleTiers: ["Apex Advisor", "Apex Advisor Pro"],
  },
  {
    id: "marketing-pro",
    name: "Apex Marketing Pro",
    requirement:
      "Complete the marketing modules and submit a campaign sample for review.",
    summary:
      "Shows you can plan, build, and ship a compliant marketing campaign end to end. Includes content, follow up, and a partner play.",
    eligibleTiers: ["Apex Advisor", "Apex Advisor Pro"],
  },
  {
    id: "pro-graduate",
    name: "Apex Advisor Pro Graduate",
    requirement: "Complete the Pro coaching curriculum.",
    summary:
      "The capstone Pro credential. Shows you have completed the live coaching curriculum and mastermind track.",
    eligibleTiers: ["Apex Advisor Pro"],
  },
];

export const apexCertificationCompliance =
  "Certifications recognize completion of training and assessments. They are not a guarantee of production, income, or business results.";
