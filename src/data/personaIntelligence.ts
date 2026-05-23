export const personaComplianceDisclaimer = "This is a marketing and education planning tool. It is not a credit, underwriting, eligibility, pricing, or compliance decision tool. Human review is required before public use.";

export type PersonaAudience = "buyer" | "realtor" | "recruiting";

export type PersonaCommunity = {
  slug: string;
  name: string;
  cluster: string;
  languages: string[];
  sourceFile: string;
  overview: string;
  languageConsiderations: string;
  trustSignals: string[];
  realtorStrategy: string;
  recruitingStrategy: string;
  contentThemes: string[];
  contentToAvoid: string[];
  videoIdeas: string[];
  eventIdeas: string[];
  funnelIdeas: string[];
  gbpIdeas: string[];
  newsletterIdeas: string[];
  socialChannels: string[];
  objections: string[];
  ctaExamples: string[];
  localizationNotes: string;
  complianceCaution: string;
  suggestedCampaigns: string[];
  personaLanes: string[];
  reviewRequired: string[];
};

export type PersonaTemplate = {
  id: string;
  type: PersonaAudience;
  title: string;
  audience: string;
  languageCommunity: string;
  loanProgramTags: string[];
  careAbout: string[];
  trustTriggers: string[];
  campaignIdeas: string[];
  complianceReminder: string;
};

export const personaCommunities = [
  {
    "slug": "mexican-american",
    "name": "Mexican American",
    "cluster": "Latino",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/mexican-american.md",
    "overview": "This page provides community-informed hypotheses for Mexican American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "bilingual education when requested",
      "family-friendly payment clarity",
      "local Realtor endorsement",
      "community workshop consistency"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming Spanish preference",
      "assuming immigration status",
      "generic Latino copy",
      "family stereotypes"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "Instagram",
      "YouTube",
      "Google Business Profile",
      "community events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Payment Comfort Roadmap",
      "FHA/DPA Readiness Night",
      "Family Homebuying Q&A"
    ],
    "personaLanes": [
      "first-time buyer",
      "FHA/DPA buyer",
      "self-employed borrower",
      "multigenerational family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "puerto-rican",
    "name": "Puerto Rican",
    "cluster": "Latino",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/puerto-rican.md",
    "overview": "This page provides community-informed hypotheses for Puerto Rican mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "mainland relocation clarity",
      "plain payment education",
      "local neighborhood orientation",
      "responsive follow-up"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating Puerto Rican buyers as foreign nationals",
      "political assumptions",
      "generic Caribbean copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "Instagram",
      "YouTube",
      "GBP",
      "local events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "New Market Buyer Orientation",
      "First Home Roadmap",
      "Move-Up Equity Review"
    ],
    "personaLanes": [
      "relocation buyer",
      "first-time buyer",
      "move-up buyer",
      "Realtor referral partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "dominican",
    "name": "Dominican",
    "cluster": "Latino Caribbean",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/dominican.md",
    "overview": "This page provides community-informed hypotheses for Dominican mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "family wealth education",
      "multi-family financing clarity",
      "Spanish education where requested",
      "referral proof"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "overgeneralized Caribbean messaging",
      "assuming dialect or language dominance",
      "unsupported income assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Instagram",
      "Facebook",
      "YouTube",
      "WhatsApp where consented",
      "events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Multi-Family Wealth Basics",
      "Family Buyer Night",
      "Self-Employed Document Prep"
    ],
    "personaLanes": [
      "family-focused buyer",
      "multi-family investor",
      "self-employed borrower",
      "community Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "cuban",
    "name": "Cuban",
    "cluster": "Latino Caribbean",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/cuban.md",
    "overview": "This page provides community-informed hypotheses for Cuban mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "private consults",
      "business-owner document expertise",
      "market authority",
      "high-touch Realtor coordination"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "political assumptions",
      "monolithic Cuban identity",
      "immigration assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "LinkedIn",
      "YouTube",
      "Instagram",
      "local business events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Business Owner Mortgage Planning",
      "Private Move-Up Strategy",
      "Investor Scenario Review"
    ],
    "personaLanes": [
      "business owner",
      "luxury move-up buyer",
      "investor",
      "listing agent partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "colombian",
    "name": "Colombian",
    "cluster": "Latino South American",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/colombian.md",
    "overview": "This page provides community-informed hypotheses for Colombian mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "wealth-building education",
      "payment scenario clarity",
      "family-friendly planning",
      "Realtor partner credibility"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "generic South American copy",
      "assuming all buyers want Spanish",
      "unverified demographic claims"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Instagram",
      "YouTube",
      "Facebook",
      "GBP",
      "community events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Family Wealth Homebuying Series",
      "Investor Basics Webinar",
      "Move-Up Payment Review"
    ],
    "personaLanes": [
      "professional move-up buyer",
      "investor",
      "family buyer",
      "bilingual Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "venezuelan",
    "name": "Venezuelan",
    "cluster": "Latino South American",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/venezuelan.md",
    "overview": "This page provides community-informed hypotheses for Venezuelan mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "relocation document roadmap",
      "credit-building clarity",
      "professional private review",
      "bilingual consult availability if true"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "political assumptions",
      "immigration assumptions",
      "documentation assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Instagram",
      "YouTube",
      "Facebook",
      "LinkedIn",
      "events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Buying After Relocation",
      "Credit Readiness Path",
      "Professional Buyer Strategy"
    ],
    "personaLanes": [
      "relocation buyer",
      "professional buyer",
      "self-employed borrower",
      "recruiting persona"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "argentine",
    "name": "Argentine",
    "cluster": "Latino South American",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/argentine.md",
    "overview": "This page provides community-informed hypotheses for Argentine mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "data-driven comparisons",
      "private consults",
      "market math",
      "clear documentation plan"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "generic Latino cultural cues",
      "political assumptions",
      "overly casual translations"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "LinkedIn",
      "YouTube",
      "Instagram",
      "email",
      "private events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Market Math Brief",
      "Private Investor Review",
      "Move-Up Strategy Session"
    ],
    "personaLanes": [
      "professional buyer",
      "investor",
      "luxury buyer",
      "move-up buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "brazilian-portuguese",
    "name": "Brazilian Portuguese",
    "cluster": "Brazilian American",
    "languages": [
      "Portuguese",
      "English"
    ],
    "sourceFile": "communities/brazilian-portuguese.md",
    "overview": "This page provides community-informed hypotheses for Brazilian Portuguese mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Portuguese, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "native Portuguese content when reviewed",
      "business owner document education",
      "payment comfort",
      "community event presence"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "Spanish copy reuse",
      "mixing Spanish and Portuguese",
      "assuming Portuguese preference"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Instagram",
      "YouTube",
      "Facebook",
      "WhatsApp where consented",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Portuguese Buyer Roadmap",
      "Business Owner Document Prep",
      "Rental Scenario Review"
    ],
    "personaLanes": [
      "self-employed borrower",
      "first-time buyer",
      "investor",
      "bilingual Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "peruvian",
    "name": "Peruvian",
    "cluster": "Latino South American",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/peruvian.md",
    "overview": "This page provides community-informed hypotheses for Peruvian mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "clear process education",
      "family referral trust",
      "local market examples",
      "patient follow-up"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "one-size South American copy",
      "unvalidated indigenous language assumptions",
      "income assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "Instagram",
      "YouTube",
      "GBP",
      "community events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "First-Time Buyer Roadmap",
      "Family Payment Workshop",
      "Local Market FAQ"
    ],
    "personaLanes": [
      "first-time buyer",
      "family buyer",
      "move-up buyer",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "salvadoran",
    "name": "Salvadoran",
    "cluster": "Central American",
    "languages": [
      "Spanish",
      "English"
    ],
    "sourceFile": "communities/salvadoran.md",
    "overview": "This page provides community-informed hypotheses for Salvadoran mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "step-by-step education",
      "privacy-forward credit help",
      "consistent follow-up",
      "community workshops"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "legal status assumptions",
      "income assumptions",
      "fear-based messaging"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "Instagram",
      "YouTube",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "DPA Readiness Clinic",
      "Credit Path Workshop",
      "Family Buyer Q&A"
    ],
    "personaLanes": [
      "FHA/DPA buyer",
      "credit readiness buyer",
      "self-employed borrower",
      "family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "guatemalan",
    "name": "Guatemalan",
    "cluster": "Central American",
    "languages": [
      "Spanish",
      "English",
      "Indigenous languages where locally validated"
    ],
    "sourceFile": "communities/guatemalan.md",
    "overview": "This page provides community-informed hypotheses for Guatemalan mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Spanish, English, Indigenous languages where locally validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "plain process maps",
      "privacy reassurance",
      "interpreter-supported events where available",
      "trusted local introductions"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming Spanish is sufficient",
      "documentation assumptions",
      "overly complex copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "community events",
      "GBP",
      "local partner referrals"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Buyer Readiness Roadmap",
      "Private Credit Questions",
      "Community Education Night"
    ],
    "personaLanes": [
      "first-time buyer",
      "credit readiness buyer",
      "DPA buyer",
      "family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "vietnamese-american",
    "name": "Vietnamese American",
    "cluster": "Asian American",
    "languages": [
      "Vietnamese",
      "English"
    ],
    "sourceFile": "communities/vietnamese-american.md",
    "overview": "This page provides community-informed hypotheses for Vietnamese American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Vietnamese, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "detailed process education",
      "privacy",
      "family Q&A",
      "Vietnamese language support when verified"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming all decision makers prefer Vietnamese",
      "machine translation",
      "overgeneralized small business assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "Facebook",
      "local Vietnamese media",
      "GBP",
      "community events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Self-Employed Document Roadmap",
      "Family Buyer Workshop",
      "Payment Comfort Video Series"
    ],
    "personaLanes": [
      "self-employed borrower",
      "family buyer",
      "first-time buyer",
      "community Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "korean-american",
    "name": "Korean American",
    "cluster": "Asian American",
    "languages": [
      "Korean",
      "English"
    ],
    "sourceFile": "communities/korean-american.md",
    "overview": "This page provides community-informed hypotheses for Korean American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Korean, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "reputation",
      "speed",
      "private consultation",
      "business-owner document fluency"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming church networks are universal",
      "machine translation",
      "status stereotypes"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "KakaoTalk where consented",
      "LinkedIn",
      "local events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Business Owner Mortgage Prep",
      "Private Move-Up Strategy",
      "Realtor Partner Lunch"
    ],
    "personaLanes": [
      "self-employed borrower",
      "move-up buyer",
      "luxury buyer",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "chinese-american-mandarin",
    "name": "Chinese American Mandarin",
    "cluster": "Asian American",
    "languages": [
      "Mandarin Chinese",
      "English",
      "Simplified or Traditional Chinese as validated"
    ],
    "sourceFile": "communities/chinese-american-mandarin.md",
    "overview": "This page provides community-informed hypotheses for Chinese American Mandarin mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Mandarin Chinese, English, Simplified or Traditional Chinese as validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "privacy",
      "asset documentation clarity",
      "family decision support",
      "detailed comparison content"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "foreign-national assumptions",
      "Mandarin/Cantonese confusion",
      "political assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "WeChat where consented",
      "YouTube",
      "email",
      "LinkedIn",
      "private events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Family Decision Mortgage Guide",
      "Asset Documentation Review",
      "Private Investor Scenario"
    ],
    "personaLanes": [
      "multilingual family buyer",
      "luxury buyer",
      "investor",
      "professional move-up buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "chinese-american-cantonese",
    "name": "Chinese American Cantonese",
    "cluster": "Asian American",
    "languages": [
      "Cantonese",
      "English",
      "Traditional Chinese where written Chinese is needed"
    ],
    "sourceFile": "communities/chinese-american-cantonese.md",
    "overview": "This page provides community-informed hypotheses for Chinese American Cantonese mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Cantonese, English, Traditional Chinese where written Chinese is needed. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "Cantonese education when reviewed",
      "family meeting support",
      "local Realtor credibility",
      "patient explanation"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "Mandarin content reuse without review",
      "dialect assumptions",
      "foreign-national assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "WeChat where consented",
      "local Chinese media",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Cantonese Family Buyer Q&A",
      "Move-Up Payment Review",
      "Community Realtor Education Night"
    ],
    "personaLanes": [
      "multigenerational family buyer",
      "family decision maker",
      "move-up buyer",
      "community Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "taiwanese-american",
    "name": "Taiwanese American",
    "cluster": "Asian American",
    "languages": [
      "Mandarin",
      "English",
      "Traditional Chinese",
      "Taiwanese Hokkien where validated"
    ],
    "sourceFile": "communities/taiwanese-american.md",
    "overview": "This page provides community-informed hypotheses for Taiwanese American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Mandarin, English, Traditional Chinese, Taiwanese Hokkien where validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "analytical comparison",
      "privacy",
      "detailed documentation roadmap",
      "professional referral credibility"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "identity or political conflation",
      "Mandarin-only assumptions",
      "generic Chinese American copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "LinkedIn",
      "YouTube",
      "email",
      "private events",
      "community associations"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Professional Buyer Strategy Brief",
      "Investor Scenario Review",
      "Family Wealth Planning Webinar"
    ],
    "personaLanes": [
      "professional buyer",
      "luxury buyer",
      "investor",
      "family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "indian-american-hindi",
    "name": "Indian American Hindi",
    "cluster": "South Asian American",
    "languages": [
      "Hindi",
      "English",
      "regional languages where validated"
    ],
    "sourceFile": "communities/indian-american-hindi.md",
    "overview": "This page provides community-informed hypotheses for Indian American Hindi mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Hindi, English, regional languages where validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "scenario modeling",
      "clear numbers",
      "family wealth planning",
      "CPA-aware education"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming all Indian Americans speak Hindi",
      "religious assumptions",
      "generic South Asian copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "LinkedIn",
      "YouTube",
      "WhatsApp where consented",
      "email",
      "professional events"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Professional Buyer Mortgage Math",
      "Family Wealth Property Strategy",
      "Investor Readiness Session"
    ],
    "personaLanes": [
      "professional move-up buyer",
      "luxury buyer",
      "investor",
      "first-time professional"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "indian-american-punjabi",
    "name": "Indian American Punjabi",
    "cluster": "South Asian American",
    "languages": [
      "Punjabi",
      "English",
      "Hindi where relevant"
    ],
    "sourceFile": "communities/indian-american-punjabi.md",
    "overview": "This page provides community-informed hypotheses for Indian American Punjabi mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Punjabi, English, Hindi where relevant. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "business owner documentation",
      "family wealth education",
      "community referrals",
      "private scenario review"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating Punjabi as interchangeable with all Indian American audiences",
      "religious assumptions",
      "income assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "WhatsApp where consented",
      "YouTube",
      "Facebook",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Business Owner Document Prep",
      "Multigenerational Buyer Plan",
      "Investor Property Workshop"
    ],
    "personaLanes": [
      "self-employed borrower",
      "investor",
      "multigenerational family buyer",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "pakistani-american",
    "name": "Pakistani American",
    "cluster": "South Asian American",
    "languages": [
      "Urdu",
      "English",
      "Punjabi or regional languages where validated"
    ],
    "sourceFile": "communities/pakistani-american.md",
    "overview": "This page provides community-informed hypotheses for Pakistani American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Urdu, English, Punjabi or regional languages where validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "privacy",
      "family decision clarity",
      "plain process education",
      "professional referral proof"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "religious assumptions",
      "immigration assumptions",
      "generic South Asian copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "WhatsApp where consented",
      "LinkedIn",
      "community events",
      "email"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Family Buyer Mortgage Roadmap",
      "Self-Employed Prep",
      "Professional First Home Strategy"
    ],
    "personaLanes": [
      "first-time professional",
      "self-employed borrower",
      "family buyer",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "bangladeshi-american",
    "name": "Bangladeshi American",
    "cluster": "South Asian American",
    "languages": [
      "Bengali",
      "English",
      "Sylheti where relevant"
    ],
    "sourceFile": "communities/bangladeshi-american.md",
    "overview": "This page provides community-informed hypotheses for Bangladeshi American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Bengali, English, Sylheti where relevant. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "step-by-step mortgage process education",
      "family-friendly workshops",
      "document checklists",
      "local community partner credibility"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "language assumptions",
      "business type assumptions",
      "documentation assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "WhatsApp where consented",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "First Home Roadmap",
      "Self-Employed Document Checklist",
      "Family Workshop Series"
    ],
    "personaLanes": [
      "first-time buyer",
      "self-employed borrower",
      "family buyer",
      "community Realtor"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "filipino-american",
    "name": "Filipino American",
    "cluster": "Asian American",
    "languages": [
      "Tagalog",
      "English",
      "regional Philippine languages where validated"
    ],
    "sourceFile": "communities/filipino-american.md",
    "overview": "This page provides community-informed hypotheses for Filipino American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Tagalog, English, regional Philippine languages where validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "service-centered education",
      "VA/FHA clarity",
      "family wealth planning",
      "community referrals"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming Tagalog preference",
      "overseas fund assumptions",
      "religious assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "Instagram",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "VA Benefit Education",
      "Healthcare Worker Buyer Roadmap",
      "Family Homebuying Night"
    ],
    "personaLanes": [
      "veteran buyer",
      "healthcare professional buyer",
      "family buyer",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "russian-american",
    "name": "Russian American",
    "cluster": "Eastern European",
    "languages": [
      "Russian",
      "English"
    ],
    "sourceFile": "communities/russian-american.md",
    "overview": "This page provides community-informed hypotheses for Russian American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Russian, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "direct mortgage math",
      "privacy",
      "document clarity",
      "reputation proof"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "political assumptions",
      "nationality conflation",
      "Russian-speaker overgeneralization"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "LinkedIn",
      "email",
      "private events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Private Scenario Review",
      "Investor Mortgage Math",
      "Business Owner Documentation"
    ],
    "personaLanes": [
      "self-employed borrower",
      "investor",
      "luxury buyer",
      "relocation buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "ukrainian-american",
    "name": "Ukrainian American",
    "cluster": "Eastern European",
    "languages": [
      "Ukrainian",
      "English",
      "Russian only where individually preferred"
    ],
    "sourceFile": "communities/ukrainian-american.md",
    "overview": "This page provides community-informed hypotheses for Ukrainian American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Ukrainian, English, Russian only where individually preferred. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "language preference respect",
      "document translation roadmap",
      "local resource partnerships",
      "private consults"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "using Russian by default",
      "political assumptions",
      "displacement assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "community organizations",
      "GBP",
      "email"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "New-to-Market Buyer Plan",
      "Document Readiness Guide",
      "Community Resource Workshop"
    ],
    "personaLanes": [
      "relocation buyer",
      "credit readiness buyer",
      "first-time buyer",
      "community partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "armenian-american",
    "name": "Armenian American",
    "cluster": "Armenian American",
    "languages": [
      "Armenian",
      "English",
      "Russian where relevant"
    ],
    "sourceFile": "communities/armenian-american.md",
    "overview": "This page provides community-informed hypotheses for Armenian American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Armenian, English, Russian where relevant. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "relationship-first consults",
      "business owner expertise",
      "community event credibility",
      "private scenario review"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating Armenian and Russian-speaking segments as interchangeable",
      "political assumptions",
      "religious assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Instagram",
      "YouTube",
      "community events",
      "LinkedIn",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Business Owner Mortgage Strategy",
      "Private Investor Review",
      "Community Realtor Roundtable"
    ],
    "personaLanes": [
      "business owner",
      "luxury buyer",
      "investor",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "persian-american",
    "name": "Persian American",
    "cluster": "Persian American",
    "languages": [
      "Persian/Farsi",
      "English"
    ],
    "sourceFile": "communities/persian-american.md",
    "overview": "This page provides community-informed hypotheses for Persian American mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Persian/Farsi, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "privacy",
      "expertise",
      "complex-income strategy",
      "polished market education"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "political assumptions",
      "religious assumptions",
      "generic Middle Eastern copy"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "LinkedIn",
      "YouTube",
      "Instagram",
      "private events",
      "email"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Private Luxury Mortgage Strategy",
      "Complex Income Planning",
      "Investor Market Brief"
    ],
    "personaLanes": [
      "luxury buyer",
      "business owner",
      "investor",
      "professional move-up buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "arabic-speaking-communities",
    "name": "Arabic-speaking communities",
    "cluster": "MENA and Arabic-speaking",
    "languages": [
      "Arabic",
      "English",
      "dialects by community and market"
    ],
    "sourceFile": "communities/arabic-speaking-communities.md",
    "overview": "This page provides community-informed hypotheses for Arabic-speaking communities mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Arabic, English, dialects by community and market. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "dialect-aware review",
      "privacy",
      "family decision support",
      "clear process education"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating Arabic speakers as one culture",
      "assuming religion",
      "dialect mismatch"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "YouTube",
      "Facebook",
      "WhatsApp where consented",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Family Mortgage Roadmap",
      "Business Owner Document Prep",
      "First-Time Buyer Workshop"
    ],
    "personaLanes": [
      "first-time buyer",
      "professional buyer",
      "business owner",
      "family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "haitian-creole",
    "name": "Haitian Creole",
    "cluster": "Caribbean",
    "languages": [
      "Haitian Creole",
      "French",
      "English"
    ],
    "sourceFile": "communities/haitian-creole.md",
    "overview": "This page provides community-informed hypotheses for Haitian Creole mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: Haitian Creole, French, English. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "Creole explainers where reviewed",
      "trusted seminars",
      "payment education",
      "patient follow-up"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "assuming French preference",
      "literal machine translation",
      "documentation assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "community events",
      "local radio/community media",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Creole Buyer Roadmap",
      "Payment Comfort Workshop",
      "Credit Readiness Q&A"
    ],
    "personaLanes": [
      "first-time buyer",
      "credit readiness buyer",
      "family buyer",
      "community partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "african-immigrant-communities",
    "name": "African immigrant communities",
    "cluster": "African immigrant",
    "languages": [
      "English",
      "French",
      "Amharic",
      "Tigrinya",
      "Oromo",
      "Somali",
      "Yoruba",
      "Igbo",
      "Hausa",
      "Twi",
      "other local languages as validated"
    ],
    "sourceFile": "communities/african-immigrant-communities.md",
    "overview": "This page provides community-informed hypotheses for African immigrant communities mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: English, French, Amharic, Tigrinya, Oromo, Somali, Yoruba, Igbo, Hausa, Twi, other local languages as validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "country-specific validation",
      "community partner introductions",
      "wealth-building education",
      "document clarity"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating African immigrant communities as one audience",
      "language assumptions",
      "religious assumptions",
      "income assumptions"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "YouTube",
      "WhatsApp where consented",
      "community events",
      "LinkedIn"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Country-Specific Buyer Roadmap",
      "Professional Buyer Wealth Series",
      "Community Partner Workshop"
    ],
    "personaLanes": [
      "professional buyer",
      "first-time buyer",
      "self-employed borrower",
      "family buyer"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  },
  {
    "slug": "caribbean-communities",
    "name": "Caribbean communities",
    "cluster": "Caribbean",
    "languages": [
      "English",
      "Spanish",
      "French",
      "Haitian Creole",
      "Dutch",
      "Hindi/Bhojpuri variants where validated"
    ],
    "sourceFile": "communities/caribbean-communities.md",
    "overview": "This page provides community-informed hypotheses for Caribbean communities mortgage education, Realtor partnership, recruiting, and Team Leader campaign planning. It must be localized by city, county, LO team, language preference, and local partner feedback before public use.",
    "languageConsiderations": "Languages to consider: English, Spanish, French, Haitian Creole, Dutch, Hindi/Bhojpuri variants where validated. Confirm individual language preference for each borrower, Realtor, LO recruit, and event attendee. Do not assume language preference from name, accent, ethnicity, or community identity.",
    "trustSignals": [
      "island-to-mainland relocation clarity",
      "family referral trust",
      "investment education",
      "community event credibility"
    ],
    "realtorStrategy": "Prioritize Realtors who already educate this audience, respect language preference, and want practical buyer readiness assets. Offer co-branded education, workshop support, buyer readiness checklists, and clear follow-up expectations.",
    "recruitingStrategy": "Recruit LOs who can serve this market with trust, consistency, and compliance discipline. Position the opportunity as a Team Leader-backed marketing system, not as translation labor or identity-based token recruiting.",
    "contentThemes": [
      "Payment comfort and monthly cost clarity",
      "Document readiness",
      "First-time buyer education",
      "Family or decision-maker Q&A where locally validated",
      "Self-employed or investor education where relevant",
      "Realtor partner education",
      "Local market orientation"
    ],
    "contentToAvoid": [
      "treating Caribbean identity as only Jamaican or Haitian",
      "dialect performance",
      "country conflation"
    ],
    "videoIdeas": [
      "\"What to know before your first mortgage conversation in this market.\"",
      "\"How to think about payment comfort before shopping.\"",
      "\"Documents to organize before a mortgage conversation.\"",
      "\"Questions families should ask before buying together.\"",
      "\"Realtor and LO Q&A for local buyers.\""
    ],
    "eventIdeas": [
      "First-time buyer workshop",
      "Payment comfort night",
      "Self-employed document prep session if relevant",
      "Realtor office training",
      "Community partner education session",
      "Family-friendly mortgage Q&A"
    ],
    "funnelIdeas": [
      "Payment comfort checklist",
      "First-time buyer roadmap",
      "FHA/DPA readiness guide where program review is current",
      "Self-employed document roadmap where relevant",
      "Realtor buyer-readiness referral funnel",
      "Recruiting growth-system review for LOs"
    ],
    "gbpIdeas": [
      "Local buyer FAQ post",
      "Workshop invite",
      "Mortgage term explained in plain English",
      "Payment comfort education",
      "Document checklist post",
      "Language support note only when support is real and reviewed"
    ],
    "newsletterIdeas": [
      "Monthly local buyer readiness brief",
      "Realtor partner toolkit",
      "Community event recap",
      "Five-question mortgage readiness checklist",
      "Market update without rate or approval claims"
    ],
    "socialChannels": [
      "Facebook",
      "Instagram",
      "YouTube",
      "community events",
      "GBP"
    ],
    "objections": [
      "\"I do not know if I am ready.\"",
      "\"I am worried about payment.\"",
      "\"I am not sure what documents count.\"",
      "\"I need my family or Realtor to understand this too.\"",
      "\"I do not want a hard sell.\"",
      "\"I heard a different answer from someone else.\""
    ],
    "ctaExamples": [
      "\"Build your buyer readiness plan.\"",
      "\"Check your payment comfort range.\"",
      "\"Review your document path.\"",
      "\"Join a local buyer education session.\"",
      "\"Plan a Realtor buyer-readiness campaign.\""
    ],
    "localizationNotes": "Validate translations, dialect, tone, terminology, channel preference, and CTA language with local bilingual reviewers and market operators.",
    "complianceCaution": "Do not use this page to include or exclude borrowers. Do not imply different loan treatment, pricing, underwriting, approval, eligibility, or product availability based on protected class. Do not use protected-class characteristics for paid ad targeting. Human compliance review is required before public use.",
    "suggestedCampaigns": [
      "Caribbean Family Buyer Night",
      "Rental Wealth Basics",
      "Relocation Buyer Checklist"
    ],
    "personaLanes": [
      "family buyer",
      "investor",
      "self-employed borrower",
      "Realtor partner"
    ],
    "reviewRequired": [
      "local validation",
      "localization review",
      "compliance review",
      "human approval"
    ]
  }
] satisfies PersonaCommunity[];

export const personaTemplates = [
  {
    "id": "first-time-buyer",
    "type": "buyer",
    "title": "First-Time Buyer",
    "audience": "Buyers who need process clarity before they feel comfortable starting.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "FHA",
      "DPA",
      "Conventional"
    ],
    "careAbout": [
      "Payment comfort",
      "Step-by-step process",
      "Document readiness"
    ],
    "trustTriggers": [
      "plain-English education",
      "clear next steps",
      "local workshop"
    ],
    "campaignIdeas": [
      "Payment Comfort Roadmap",
      "First-Time Buyer Roadmap",
      "Document Prep Checklist"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "fha-dpa-buyer",
    "type": "buyer",
    "title": "FHA/DPA Readiness Buyer",
    "audience": "Buyers who need education on readiness steps and reviewed program paths.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "FHA",
      "DPA"
    ],
    "careAbout": [
      "Readiness checklist",
      "Payment comfort",
      "What documents to gather"
    ],
    "trustTriggers": [
      "simple checklists",
      "Realtor education partners",
      "no-pressure consult"
    ],
    "campaignIdeas": [
      "DPA Readiness Clinic",
      "Buyer Readiness Night",
      "Realtor Buyer Kit"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "self-employed-borrower",
    "type": "buyer",
    "title": "Self-Employed Borrower",
    "audience": "Business owners who need document prep and process clarity.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Self-employed",
      "Non-QM review"
    ],
    "careAbout": [
      "Document confidence",
      "Timeline clarity",
      "Privacy"
    ],
    "trustTriggers": [
      "document roadmap",
      "private planning session",
      "CPA/Realtor education"
    ],
    "campaignIdeas": [
      "Self-Employed Document Roadmap",
      "Business Owner Mortgage Q&A"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "investor-buyer",
    "type": "buyer",
    "title": "Investor Buyer",
    "audience": "Buyers comparing rental, DSCR, and portfolio goals.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "DSCR",
      "Investor"
    ],
    "careAbout": [
      "Scenario education",
      "Speed of document prep",
      "Clear lane ownership"
    ],
    "trustTriggers": [
      "numbers checklist",
      "local investor event",
      "Realtor investor partner"
    ],
    "campaignIdeas": [
      "Investor Deal Review Checklist",
      "Rental Readiness Funnel"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "move-up-buyer",
    "type": "buyer",
    "title": "Move-Up Buyer",
    "audience": "Current homeowners trying to plan a clean move.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Conventional",
      "Jumbo review"
    ],
    "careAbout": [
      "Timing",
      "Equity questions",
      "Contingency planning"
    ],
    "trustTriggers": [
      "timeline map",
      "seller/buyer coordination",
      "Realtor partner plan"
    ],
    "campaignIdeas": [
      "Move-Up Timing Map",
      "Buy-Sell Planning Session"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "va-buyer",
    "type": "buyer",
    "title": "VA Buyer",
    "audience": "Veterans and eligible military-connected buyers who need education and local support.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "VA"
    ],
    "careAbout": [
      "Benefit education",
      "Trust",
      "Clear steps"
    ],
    "trustTriggers": [
      "VA-aware education",
      "service-focused tone",
      "Realtor partner training"
    ],
    "campaignIdeas": [
      "VA Buyer Education Lane",
      "PCS Planning Checklist"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "buyer-agent",
    "type": "realtor",
    "title": "Buyer Agent Partner",
    "audience": "Realtors who need buyers prepared before showings and offers.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Partner education"
    ],
    "careAbout": [
      "Buyer readiness",
      "Communication",
      "Fast clarity"
    ],
    "trustTriggers": [
      "co-branded checklist",
      "office training",
      "consistent follow-up"
    ],
    "campaignIdeas": [
      "Realtor Buyer Readiness Kit",
      "Office Training Lunch"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "listing-agent",
    "type": "realtor",
    "title": "Listing Agent Partner",
    "audience": "Listing agents who care about clean communication and closing certainty.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Partner education"
    ],
    "careAbout": [
      "Status updates",
      "Buyer strength clarity",
      "No surprises"
    ],
    "trustTriggers": [
      "listing agent call plan",
      "weekly update rhythm",
      "calm escalation path"
    ],
    "campaignIdeas": [
      "Listing Agent Confidence Kit",
      "Accepted Offer Update Plan"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "investor-agent",
    "type": "realtor",
    "title": "Investor Realtor Partner",
    "audience": "Agents serving investors who need clear financing education.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "DSCR",
      "Investor"
    ],
    "careAbout": [
      "Deal flow",
      "Scenario clarity",
      "Document readiness"
    ],
    "trustTriggers": [
      "investor checklist",
      "DSCR education",
      "local event"
    ],
    "campaignIdeas": [
      "Investor Agent Education Kit",
      "Rental Deal Checklist"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "new-lo-recruiting",
    "type": "recruiting",
    "title": "New LO Recruiting",
    "audience": "New or early-stage LOs who need structure, coaching, and a clear path.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Recruiting"
    ],
    "careAbout": [
      "Training path",
      "Support",
      "Confidence"
    ],
    "trustTriggers": [
      "101-601 roadmap",
      "team lane assignment",
      "weekly rhythm"
    ],
    "campaignIdeas": [
      "New LO Growth Path",
      "First 30 Days Plan"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "producing-lo-recruiting",
    "type": "recruiting",
    "title": "Producing LO Recruiting",
    "audience": "Experienced LOs who want better systems and less isolation.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Recruiting"
    ],
    "careAbout": [
      "Better support",
      "Marketing help",
      "Team leverage"
    ],
    "trustTriggers": [
      "team growth system",
      "campaign lanes",
      "content support"
    ],
    "campaignIdeas": [
      "Producer Growth Review",
      "Team Support Conversation"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "bilingual-lo-recruiting",
    "type": "recruiting",
    "title": "Bilingual LO Recruiting",
    "audience": "LOs who can serve language-preference needs with trust and review gates.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Recruiting",
      "Localization"
    ],
    "careAbout": [
      "Respectful localization",
      "Support",
      "Reviewed materials"
    ],
    "trustTriggers": [
      "localization support",
      "community validation",
      "reviewed campaigns"
    ],
    "campaignIdeas": [
      "Bilingual LO Growth Lane",
      "Community Education Team"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  },
  {
    "id": "team-leader-candidate",
    "type": "recruiting",
    "title": "Team Leader Candidate",
    "audience": "Potential team leaders who need a system for assigning lanes and coaching execution.",
    "languageCommunity": "Select a community, then validate locally",
    "loanProgramTags": [
      "Team leadership"
    ],
    "careAbout": [
      "Operating rhythm",
      "Scorecards",
      "Lane ownership"
    ],
    "trustTriggers": [
      "team campaign map",
      "weekly review",
      "scorecard preview"
    ],
    "campaignIdeas": [
      "Team Leader Growth Review",
      "Lane Assignment Workshop"
    ],
    "complianceReminder": "Human review required before public use. Do not use protected-class traits for targeting or exclusion."
  }
] satisfies PersonaTemplate[];

export const campaignGoals = [
  "More buyer conversations",
  "More Realtor meetings",
  "Community workshop attendance",
  "Recruiting conversations",
] as const;

export const sampleCampaignRecommendation = {
  name: "Payment Comfort Roadmap",
  audience: "buyer" as PersonaAudience,
  communitySlug: "mexican-american",
  goal: "More buyer conversations",
  campaignSummary: "A read-only sample campaign lane that helps a Team Leader assign useful education content without creating public copy yet.",
  lanes: [
    { owner: "LO 1", lane: "First-time buyer content", action: "Record one short education video and draft one checklist." },
    { owner: "LO 2", lane: "Realtor education", action: "Prepare one buyer-readiness asset for local Realtor partners." },
    { owner: "LO 3", lane: "Spanish language outreach", action: "Review language needs locally before any public copy is used." },
  ],
  ctas: ["Build your buyer readiness plan", "Review your document path", "Join a local buyer education session"],
  nextSteps: ["Pick one community", "Pick one audience", "Assign one LO lane", "Review with compliance before public use", "Track conversations and meetings"],
};

export const funnelStages = [
  { stage: "Awareness", buyer: "Short education videos, community workshop invites, local FAQ posts.", realtor: "Office training invite, buyer-readiness checklist, co-branded education topic.", recruiting: "Team growth story, training path overview, support system conversation." },
  { stage: "Consideration", buyer: "Checklist download, buyer-readiness guide, consultation prep list.", realtor: "Partner toolkit, follow-up cadence, listing-agent update example.", recruiting: "Role fit conversation, team lane options, weekly support rhythm." },
  { stage: "Application", buyer: "Document roadmap and clear next-step checklist after human review.", realtor: "Buyer status communication expectations and meeting recap.", recruiting: "Team Leader review and onboarding path conversation." },
  { stage: "Follow-up", buyer: "Same-week check-in, objection log, Friday review.", realtor: "Weekly value asset and partner touch tracker.", recruiting: "Recruiting conversation notes and next-step scorecard." },
];

export const realtorOutreachAngles = [
  "Buyer readiness education",
  "Office workshop support",
  "Listing-agent communication rhythm",
  "Community event partnership",
  "Post-event follow-up plan",
];

export const recruitingAngles = [
  "New LO growth path",
  "Producing LO support system",
  "Bilingual LO community education lane",
  "Team Leader campaign operating system",
];

export const boardroomReviewCategories = [
  "Campaign fit score",
  "Compliance sensitivity score",
  "Localization risk score",
  "Audience clarity",
  "Team lane assignment",
  "Weekly actionability",
];

export const scorecardItems = [
  "Persona tag",
  "Community tag",
  "Campaign tag",
  "Channel tag",
  "Assigned LO",
  "Review status",
  "Campaign fit score",
  "Localization risk score",
  "Compliance sensitivity score",
];

export const teamLaneAssignments = [
  { lane: "First-time buyer content", owner: "LO 1", weeklyAction: "One education video plus one checklist draft." },
  { lane: "Realtor education", owner: "LO 2", weeklyAction: "One Realtor value asset and five partner touches." },
  { lane: "Investor content", owner: "LO 3", weeklyAction: "One investor FAQ topic and one Realtor partner idea." },
  { lane: "Spanish language outreach", owner: "LO 4", weeklyAction: "Validate language needs locally before any public copy is used." },
  { lane: "VA content", owner: "LO 5", weeklyAction: "One VA education topic with human review before use." },
  { lane: "Recruiting content", owner: "Team Leader", weeklyAction: "One internal recruiting conversation starter and one scorecard review." },
];

export function getPersonaCommunity(slug: string) {
  return personaCommunities.find((community) => community.slug === slug);
}

export function getPersonaTemplatesByType(type?: PersonaAudience) {
  if (!type) return personaTemplates;
  return personaTemplates.filter((persona) => persona.type === type);
}
