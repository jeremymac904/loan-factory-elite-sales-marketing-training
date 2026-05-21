export type ComplianceRule = {
  id: string;
  title: string;
  category:
    | "Reg Z"
    | "SAFE Act"
    | "RESPA"
    | "FFIEC Social Media"
    | "Loan Factory Policy";
  summary: string;
  rule: string;
  whatThisLooksLike: string[];
};

export const complianceRules: ComplianceRule[] = [
  {
    id: "reg-z-triggering-terms",
    title: "Reg Z triggering terms in advertising.",
    category: "Reg Z",
    summary:
      "When a public message includes a specific down payment, a payment period, a specific payment amount, or a specific finance charge, full disclosures are required.",
    rule:
      "Regulation Z broadly defines advertisements as commercial messages provided in any medium that promote a credit transaction. When any triggering term appears, the message must also disclose the amount or percentage of any down payment, the terms of repayment over the full term including any balloon, and the APR using that term. The interest rate may be listed but not more conspicuously than the APR.",
    whatThisLooksLike: [
      "A reel saying Get a 5.99% rate, only 1500 dollars down, payments as low as 2100 a month is a Reg Z advertisement and needs full disclosures.",
      "A flyer with monthly payment 1850 over 30 years is a Reg Z advertisement.",
      "A live conversation with a borrower has more flexibility, but rewriting a public message is required.",
    ],
  },
  {
    id: "nmls-display",
    title: "NMLS ID display.",
    category: "SAFE Act",
    summary:
      "Every licensed MLO must prominently display their NMLS ID on advertising and public communications, including social profiles and posts that promote credit.",
    rule:
      "The SAFE Act and state implementing rules require NMLS ID display on advertising materials and public communications.",
    whatThisLooksLike: [
      "Add the NMLS ID to your LinkedIn headline, your social bios, and the end of credit promoting posts.",
      "Add NMLS to your email signature and your text signature.",
      "Add Loan Factory NMLS 320841 where required.",
    ],
  },
  {
    id: "respa-section-8",
    title: "RESPA Section 8. No things of value for referrals.",
    category: "RESPA",
    summary:
      "Anything of value exchanged for a settlement service referral can be a RESPA Section 8 violation.",
    rule:
      "Marketing services agreements can be unlawful if the facts and circumstances show an agreement to pay for referrals, or payments in excess of fair market value. Co marketing is permissible only when both parties pay pro rata for any joint advertising and no thing of value is exchanged for referrals.",
    whatThisLooksLike: [
      "No gift cards to a Realtor with thank you for the referral.",
      "No paying for an agent's MLS subscription or CRM.",
      "No free event tickets in exchange for referrals.",
      "Joint flyers and joint open house signage are fine when both parties pay pro rata and the value is documented.",
      "Any new MSA structure requires corporate approval.",
    ],
  },
  {
    id: "ffiec-social-media",
    title: "FFIEC social media guidance applies.",
    category: "FFIEC Social Media",
    summary:
      "Consumer protection and compliance laws apply to social media just as they apply to other channels.",
    rule:
      "Per the FFIEC interagency social media guidance, existing consumer protection and compliance laws and regulations apply to activities conducted by financial institutions through social media as they would to activities conducted through other channels.",
    whatThisLooksLike: [
      "A TikTok or Reel is an advertisement when it promotes credit.",
      "A DM that quotes a specific rate is regulated like any other advertisement.",
      "Captions and on screen text are part of the advertisement, not just the spoken audio.",
    ],
  },
  {
    id: "no-teaser-rates",
    title: "No teaser rates in any borrower facing artifact.",
    category: "Loan Factory Policy",
    summary:
      "We do not lead with headline rates the borrower will not actually receive.",
    rule:
      "Loan Factory rule: anchor on the borrower's plan and total monthly comfort. Show real options on the real file, not a headline rate.",
    whatThisLooksLike: [
      "Do not post the lowest rate of the day on social.",
      "Redirect rate questions in conversation, then build real options on the borrower's file.",
      "Show numbers on the Loan Estimate, not in a marketing piece.",
    ],
  },
  {
    id: "no-production-guarantees",
    title: "No production guarantees.",
    category: "Loan Factory Policy",
    summary:
      "Training and coaching never promise a specific number of loans, applications, or commission.",
    rule:
      "Loan Factory training does not promise production outcomes. Behavior change is the promise.",
    whatThisLooksLike: [
      "Do not promise 10 loans a month.",
      "Do not promise certified equals more pipeline.",
      "Promise the system. Promise the discipline. Outcomes follow behavior.",
    ],
  },
  {
    id: "no-competitor-claims",
    title: "No invented competitor facts.",
    category: "Loan Factory Policy",
    summary: "We do not bash competitors and we do not invent facts about them.",
    rule:
      "Lead with what Loan Factory does, not what a competitor does not do. If a competitor is named in any artifact, the claim must be sourced and accurate.",
    whatThisLooksLike: [
      "No claims about a competitor's rates, fees, or service unless sourced and accurate.",
      "Lead with broker access to 240+ wholesale lenders and the actual borrower benefit.",
    ],
  },
];

export const safeContentDecisionTree = [
  {
    step: 1,
    question:
      "Does this contain a specific rate, payment, finance charge, down payment dollar amount, or term in months?",
    ifYes:
      "Treat as a Reg Z advertisement. Add full disclosures or rewrite.",
  },
  {
    step: 2,
    question: "Is the NMLS ID present?",
    ifYes: "Confirm position and visibility on all formats.",
    ifNo: "Add NMLS ID before publishing.",
  },
  {
    step: 3,
    question: "Is the Equal Housing logo present where required?",
    ifYes: "Confirm format.",
    ifNo: "Add the Equal Housing logo where required.",
  },
  {
    step: 4,
    question:
      "Are there any superlatives (best rate, guaranteed approval, lowest in town)?",
    ifYes: "Rewrite. Remove the superlative.",
  },
  {
    step: 5,
    question:
      "Are there any direct comparisons to a named competitor with unverified facts?",
    ifYes: "Rewrite. Remove the comparison or source the claim.",
  },
];

export const bannedTermsForContent = [
  "guaranteed approval",
  "lowest rate in town",
  "lowest fees in town",
  "free processing",
  "no closing costs ever",
  "the only lender that",
];
