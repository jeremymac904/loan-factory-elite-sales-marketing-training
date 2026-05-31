export type MarketingAssetStatus =
  | "Asset available"
  | "Asset pending upload"
  | "Recording needed"
  | "PDF ready"
  | "Source missing";

export type MarketingTrainingAsset = {
  id: string;
  title: string;
  category: string;
  audience: string;
  estimatedTime: string;
  description: string;
  summary: string;
  tags: string[];
  topics: string[];
  sourceType: string;
  module: "401" | "501" | "601";
  track: string;
  seriesMapping: string;
  relatedResources: string[];
  relatedLessons: string[];
  nextAction: string;
  buttonText: string;
  missingAssetWarning: string;
  assetStatuses: MarketingAssetStatus[];
  pdfHref: string;
  markdownHref: string;
  thumbnailHref: string;
  aiAdvantageTieIn: {
    title: string;
    useCase: string;
    promptStarter: string;
  };
  walkthroughScript: {
    title: string;
    hook: string;
    steps: string;
    warning: string;
    close: string;
  };
  quiz: { question: string; answer: string }[];
  successChecklist: string[];
  commonMistakes: string[];
  contactGuidance: string;
  complianceCaution?: string;
};

const BASE = "/training-assets/marketing";
const defaultStatuses: MarketingAssetStatus[] = [
  "Asset available",
  "PDF ready",
  "Asset pending upload",
  "Recording needed",
];

export const marketingTrainingAssets: MarketingTrainingAsset[] = [
  {
    id: "facebook-ads-setup",
    title: "Facebook Ads Setup",
    category: "Paid Ads Setup",
    audience: "Loan Factory loan officers ready to connect a Facebook Business Page and launch a first ad.",
    estimatedTime: "20-30 minutes",
    description:
      "Connect a Facebook Business Page to the Loan Factory Facebook Ads tool, choose an ad template, set a starter budget and audience, and confirm leads flow into the pipeline.",
    summary:
      "Connect a Facebook Business Page to Loan Factory, authorize Meta access, select the ad account and default Loan Officer, launch a first ad from a template, and verify leads in the pipeline.",
    tags: ["Facebook Ads", "Meta", "Business Page", "Lead Ads", "Paid Leads", "Pipeline"],
    topics: [
      "Confirm the Facebook Business Page requirement",
      "Connect Facebook inside Loan Factory",
      "Grant Page permissions",
      "Select ad account and Default Loan Officer",
      "Launch a starter ad and verify pipeline leads",
    ],
    sourceType: "Downloaded package: Markdown guide, PDF, and annotated screenshot.",
    module: "401",
    track: "Sales and Marketing 401 - Content and Marketing",
    seriesMapping: "Supports 401 Content and Marketing in the free 101-601 series.",
    relatedResources: ["Google Ads and GA4 Setup", "Lead Funnels and Widgets", "Google Website Visitor Audiences"],
    relatedLessons: ["401 Content and Marketing", "501 Pipeline and Sales Systems"],
    nextAction: "Confirm the LO has a Facebook Business Page with full admin access.",
    buttonText: "Review setup",
    missingAssetWarning:
      "PDF and screenshot are available in the source package. No platform-hosted video is embedded yet; a 90 second recording is still needed.",
    assetStatuses: defaultStatuses,
    pdfHref: `${BASE}/pdf/01_Facebook_Ads_Setup_Training_Guide.pdf`,
    markdownHref: `${BASE}/markdown/01_Facebook_Ads_Setup_Training_Guide.md`,
    thumbnailHref: `${BASE}/thumbnails/01_facebook_ads.png`,
    aiAdvantageTieIn: {
      title: "Facebook Ads copy and audience planning",
      useCase: "Use AI to draft compliant ad copy options, compare audiences, and create a follow-up plan before spending budget.",
      promptStarter:
        "Draft three Facebook lead ad concepts for [market/persona]. No rates, payments, guarantees, or approval claims. Include audience notes, CTA, and first follow-up text.",
    },
    walkthroughScript: {
      title: "90 second screen recording: Facebook Ads setup",
      hook: "Before you spend money on Facebook, make sure your Business Page is connected correctly to Loan Factory.",
      steps:
        "Open Marketing Features, then Facebook Ads. Connect with Facebook, continue through Meta, select the Business Page, grant permissions, choose the ad account, confirm the Default Loan Officer, and submit. Create a first ad from a template, set a small starter budget, choose the audience, and confirm the ad appears in the dashboard.",
      warning: "A personal Facebook profile is not enough. The connecting account needs full admin access to the Business Page.",
      close: "After launch, check the Facebook Ads dashboard and the Loan Factory leads pipeline before increasing budget.",
    },
    quiz: [
      { question: "What Facebook asset must exist first?", answer: "A Facebook Business Page with full admin access." },
      { question: "Where do you start setup inside Loan Factory?", answer: "Marketing Features > Facebook Ads." },
      { question: "What must be selected after Meta authorization?", answer: "The ad account and Default Loan Officer." },
      { question: "What confirms the ad is live?", answer: "The campaign appears with an Active status." },
      { question: "Where should leads appear?", answer: "In the Loan Factory leads pipeline." },
    ],
    successChecklist: [
      "Facebook Business Page exists.",
      "Connecting account has full admin access.",
      "Loan Factory Facebook Ads config is connected.",
      "Ad account and Default Loan Officer are selected.",
      "Starter ad appears in the dashboard.",
      "Lead source can be checked in the pipeline.",
    ],
    commonMistakes: [
      "Connecting a personal profile without a Business Page.",
      "Using an account without full Page admin access.",
      "Skipping the Default Loan Officer selection.",
      "Increasing budget before lead routing is confirmed.",
      "Closing the browser before ad submission confirms.",
    ],
    contactGuidance:
      "Contact LO Support if the Facebook connection error persists. Contact Marketing for ad template, copy, targeting, or performance review before scaling spend.",
  },
  {
    id: "google-ads-ga4-setup",
    title: "Google Ads and GA4 Setup",
    category: "Tracking and Paid Search Setup",
    audience: "Loan Factory loan officers preparing to track website traffic or run Google Ads.",
    estimatedTime: "30-45 minutes",
    description:
      "Create GA4, create Google Ads in Expert Mode, link Ads to Analytics, and install the Google tag in Loan Factory Website Settings custom scripts.",
    summary:
      "Build the tracking foundation for paid search by creating GA4, creating Google Ads in Expert Mode, linking the products, and installing the Google tag in Loan Factory Website Settings.",
    tags: ["Google Ads", "GA4", "Tracking", "Google Tag", "Expert Mode", "Website Settings"],
    topics: [
      "Create a GA4 property and web stream",
      "Create Google Ads in Expert Mode",
      "Link Ads and Analytics",
      "Install the Google tag",
      "Verify GA4 Realtime activity",
    ],
    sourceType: "Downloaded package: Markdown guide, PDF, and annotated screenshot.",
    module: "401",
    track: "Sales and Marketing 401 - Content and Marketing",
    seriesMapping: "Supports 401 Content and Marketing in the free 101-601 series.",
    relatedResources: ["Google Website Visitor Audiences", "Website Settings and QM Pricer", "Facebook Ads Setup"],
    relatedLessons: ["401 Content and Marketing", "AI Advantage"],
    nextAction: "Use a business Google account and create GA4 before installing the tag.",
    buttonText: "Set up tracking",
    missingAssetWarning:
      "PDF and screenshot are available in the source package. No platform-hosted video is embedded yet; a 90 second recording is still needed.",
    assetStatuses: defaultStatuses,
    pdfHref: `${BASE}/pdf/02_Google_Ads_GA4_Tracking_Setup_Training_Guide.pdf`,
    markdownHref: `${BASE}/markdown/02_Google_Ads_GA4_Tracking_Training_Guide.md`,
    thumbnailHref: `${BASE}/thumbnails/02_google_ads_ga4.png`,
    aiAdvantageTieIn: {
      title: "Google Ads copy and retargeting strategy",
      useCase: "Use AI to plan search ad angles, landing page expectations, and retargeting follow-up while keeping human review in the loop.",
      promptStarter:
        "Build a Google Ads starter plan for [market/persona]. Include compliant search ad themes, GA4 events to watch, and a retargeting follow-up sequence.",
    },
    walkthroughScript: {
      title: "90 second screen recording: Google Ads and GA4 setup",
      hook: "Set up tracking before you spend a dollar. Otherwise you cannot tell what your marketing is doing.",
      steps:
        "Open Google Analytics, create a GA4 account and web stream, and copy the Measurement ID or tag. Open Google Ads and switch to Expert Mode before creating campaigns. Link Google Ads from GA4 Admin under Product Links. Open Loan Factory Website Settings, add the custom Google tag script, save it, and check GA4 Realtime.",
      warning: "Do not stack multiple Google tags without knowing why. One clean tag is easier to verify and support.",
      close: "Visit the public website and confirm GA4 Realtime activity before building campaigns.",
    },
    quiz: [
      { question: "Which Analytics version is used?", answer: "Google Analytics 4, or GA4." },
      { question: "Which Google Ads mode should the LO use?", answer: "Expert Mode." },
      { question: "Where is Google Ads linked inside GA4?", answer: "Admin > Product Links > Google Ads Links." },
      { question: "Where is the Google tag installed inside Loan Factory?", answer: "Website Settings > Add Custom Scripts." },
      { question: "How can the LO verify the tag?", answer: "Visit the website and check GA4 Realtime reports." },
    ],
    successChecklist: [
      "Business Google account is used.",
      "GA4 property and web stream are created.",
      "Measurement ID or Google tag is captured.",
      "Google Ads account is created in Expert Mode.",
      "Google Ads and GA4 are linked.",
      "Google tag is saved in Loan Factory Website Settings.",
      "GA4 Realtime shows test activity.",
    ],
    commonMistakes: [
      "Using a personal Gmail that is hard to transfer later.",
      "Starting in Google Ads Smart Mode.",
      "Choosing the wrong GA4 time zone.",
      "Copying only part of the Google tag.",
      "Adding duplicate tracking scripts.",
    ],
    contactGuidance:
      "Contact LO Support if Custom Scripts is missing or the tag will not fire after 24 hours. Contact Marketing before launching campaigns or spending budget.",
  },
  {
    id: "google-website-visitor-audiences",
    title: "Google Website Visitor Audiences",
    category: "Retargeting Audience Setup",
    audience: "Loan Factory loan officers who have tracking installed and want to build remarketing audiences.",
    estimatedTime: "10-15 minutes",
    description:
      "Create a Google Ads website visitor segment from Audience Manager so site visitors can be retargeted and followed up with a cleaner strategy.",
    summary:
      "Create a Google Ads website visitor audience from Audience Manager, name it clearly, set membership rules and duration, prefill when available, and verify the segment.",
    tags: ["Google Ads", "Website Visitors", "Audience Manager", "Retargeting", "Remarketing"],
    topics: [
      "Open Audience Manager",
      "Create a Website Visitors segment",
      "Name the audience clearly",
      "Set URL and membership rules",
      "Verify the segment configuration",
    ],
    sourceType: "Downloaded package: Markdown guide, PDF, and annotated screenshot.",
    module: "501",
    track: "Sales and Marketing 501 - Pipeline and Sales Systems",
    seriesMapping: "Supports 501 Pipeline and Sales Systems in the free 101-601 series.",
    relatedResources: ["Google Ads and GA4 Setup", "Lead Funnels and Widgets", "Website Settings and QM Pricer"],
    relatedLessons: ["501 Pipeline and Sales Systems", "601 Advanced Execution"],
    nextAction: "Confirm the Google tag is installed before creating the audience.",
    buttonText: "Build audience",
    missingAssetWarning:
      "PDF and screenshot are available in the source package. No platform-hosted video is embedded yet; a 90 second recording is still needed.",
    assetStatuses: defaultStatuses,
    pdfHref: `${BASE}/pdf/03_Google_Ads_Website_Visitor_Audience_Setup_Training_Guide.pdf`,
    markdownHref: `${BASE}/markdown/03_Google_Ads_Website_Visitor_Audience_Training_Guide.md`,
    thumbnailHref: `${BASE}/thumbnails/03_visitor_audience.png`,
    aiAdvantageTieIn: {
      title: "Website visitor audience naming and follow-up strategy",
      useCase: "Use AI to create a clear audience naming convention and practical follow-up plan for visitors by page or funnel.",
      promptStarter:
        "Create a naming convention and follow-up strategy for Google Ads website visitor audiences. Pages: [paste URLs]. Include audience names, intent level, nurture message, and review cautions.",
    },
    walkthroughScript: {
      title: "90 second screen recording: Website Visitor Audiences",
      hook: "If someone visits your site but does not raise their hand, a visitor audience helps you keep follow-up organized.",
      steps:
        "Open Google Ads, go to Tools, Shared Library, then Audience Manager. Click plus, select Website Visitors, name the segment, choose Visitors of Web Pages, select All Customers, set the membership duration, refine by URL, prefill the past 30 days if available, and create the segment. Reopen it to verify settings.",
      warning: "Retargeting only works when tracking is installed and policies are followed. Keep audience names clear and avoid sensitive labels.",
      close: "Use the audience as part of a follow-up system, not as a standalone marketing plan.",
    },
    quiz: [
      { question: "Where do you create website visitor audiences?", answer: "Tools > Shared Library > Audience Manager." },
      { question: "What segment type is used?", answer: "Website Visitors." },
      { question: "What should the segment name include?", answer: "A clear reference to the website or page being tracked." },
      { question: "Why prefill when available?", answer: "To include eligible visitors from the past 30 days." },
      { question: "What should be verified after creation?", answer: "Audience settings, URL rule, and membership duration." },
    ],
    successChecklist: [
      "Google tag is installed and verified.",
      "Audience Manager is open.",
      "Website Visitors segment is selected.",
      "Segment name is clear and non-sensitive.",
      "URL rule is correct.",
      "Membership duration is intentional.",
      "Segment settings are reopened and verified.",
    ],
    commonMistakes: [
      "Creating an audience before tracking is installed.",
      "Using vague audience names.",
      "Targeting the wrong URL.",
      "Forgetting to prefill when available.",
      "Treating retargeting as a substitute for follow-up.",
    ],
    contactGuidance:
      "Contact Marketing for audience naming, page targeting, or follow-up strategy. Contact LO Support for tracking or access issues.",
  },
  {
    id: "lead-funnels-and-widgets",
    title: "Lead Funnels and Widgets",
    category: "Lead Capture and Website Widgets",
    audience: "Loan Factory loan officers with an external website, landing page, blog, or partner page.",
    estimatedTime: "10-15 minutes",
    description:
      "Create and embed Loan Factory lead widgets on external websites so visitors can request information, pricing, or an application path.",
    summary:
      "Create a widget record in Lead funnels and Widgets, choose the widget type, enter the URL and lead source, copy the generated script, and test the public page.",
    tags: ["Lead Funnels", "Widgets", "External Website", "Lead Source", "Quote Form", "SDK Script"],
    topics: [
      "Open Lead funnels and Widgets",
      "Review the SDK script",
      "Create a widget record",
      "Choose the widget type",
      "Copy the script and test the public page",
    ],
    sourceType: "Downloaded package: Markdown guide, PDF, and annotated screenshots.",
    module: "501",
    track: "Sales and Marketing 501 - Pipeline and Sales Systems",
    seriesMapping: "Supports 501 Pipeline and Sales Systems in the free 101-601 series.",
    relatedResources: ["Website Settings and QM Pricer", "Google Ads and GA4 Setup", "Google Website Visitor Audiences"],
    relatedLessons: ["501 Pipeline and Sales Systems", "401 Content and Marketing"],
    nextAction: "Choose the landing page goal first, then create the widget.",
    buttonText: "Create widget",
    missingAssetWarning:
      "PDF and screenshots are available in the source package. No platform-hosted video is embedded yet; a 90 second recording is still needed.",
    assetStatuses: defaultStatuses,
    pdfHref: `${BASE}/pdf/04_Lead_Funnels_And_Widgets_Setup_Training_Guide.pdf`,
    markdownHref: `${BASE}/markdown/04_Lead_Funnels_And_Widgets_Training_Guide.md`,
    thumbnailHref: `${BASE}/thumbnails/04_lead_funnels.png`,
    aiAdvantageTieIn: {
      title: "Lead funnel follow-up messaging",
      useCase: "Use AI to map each widget type to a follow-up message, lead source label, and next-step cadence.",
      promptStarter:
        "Build follow-up messaging for a Loan Factory website widget. Widget type: [quote form/long form/rate table/1003/basic form]. Include first text, first email, and pipeline next step. No rates, payments, guarantees, or approval claims.",
    },
    walkthroughScript: {
      title: "90 second screen recording: Lead Funnels and Widgets",
      hook: "Do not send traffic to a page with no clear next step. Add a Loan Factory widget so visitors can raise their hand.",
      steps:
        "Open Marketing Features, then Lead funnels and Widgets. Go to Widgets - External websites. Review the SDK script, click Add, enter the external website URL, add a description, choose the widget type, enter a lead source, customize if needed, copy the generated script, and submit.",
      warning: "The SDK script has to be installed correctly. If someone else manages the site, send them the URL, widget purpose, and generated script together.",
      close: "After embedding, test the public page and confirm the lead source shows where the lead came from.",
    },
    quiz: [
      { question: "Where do you create an external website widget?", answer: "Marketing Features > Lead funnels and Widgets." },
      { question: "What script belongs in the external website head?", answer: "The Loan Factory SDK script." },
      { question: "Why should you use a lead source?", answer: "To track where the lead came from." },
      { question: "Name two widget types from the source asset.", answer: "Examples include Quote form, Rate table, Long form, 1003 Application Widget, and Qualification Mortgage Calculator." },
      { question: "What should you do after embedding the widget?", answer: "Test the public page and confirm lead tracking." },
    ],
    successChecklist: [
      "External website URL is known.",
      "Widget purpose is clear.",
      "SDK script is accounted for.",
      "Widget type matches the page goal.",
      "Lead source is entered.",
      "Generated script is copied.",
      "Public page is tested after embed.",
    ],
    commonMistakes: [
      "Skipping the SDK script.",
      "Choosing a widget before defining the page goal.",
      "Leaving lead source blank.",
      "Sending a developer a script without context.",
      "Assuming the widget is live without testing.",
    ],
    contactGuidance:
      "Contact LO Support if the widget does not load or the script is unclear. Contact Marketing for widget type, page copy, and follow-up strategy.",
  },
  {
    id: "website-settings-and-qm-pricer",
    title: "Website Settings and QM Pricer",
    category: "Website Setup and Quote Flow",
    audience: "Loan Factory loan officers configuring their Loan Factory website and quote/pricer experience.",
    estimatedTime: "20-30 minutes",
    description:
      "Review website visibility, profile content, custom scripts, and QM Pricer settings so the online experience supports traffic, quote requests, and follow-up.",
    summary:
      "Configure Loan Factory website settings and QM Pricer display settings, including profile content, visibility, custom scripts, disclaimers, quote defaults, lender display, buttons, and loan terms.",
    tags: ["Website Settings", "QM Pricer", "Quote Flow", "Custom Scripts", "Rate Display", "Lead Conversion"],
    topics: [
      "Review website URL and visibility",
      "Update profile, image, video, and bio",
      "Handle custom scripts carefully",
      "Review QM Pricer disclaimers and defaults",
      "Test the public quote flow",
    ],
    sourceType: "Downloaded package: Markdown guide, PDF, and annotated screenshots.",
    module: "501",
    track: "Sales and Marketing 501 - Pipeline and Sales Systems",
    seriesMapping: "Supports 501 Pipeline and Sales Systems in the free 101-601 series.",
    relatedResources: ["Lead Funnels and Widgets", "Google Ads and GA4 Setup", "Google Website Visitor Audiences"],
    relatedLessons: ["501 Pipeline and Sales Systems", "401 Content and Marketing"],
    nextAction: "Review public website settings first, then verify QM Pricer settings and disclaimers.",
    buttonText: "Set up website",
    missingAssetWarning:
      "PDF and screenshots are available in the source package. No platform-hosted video is embedded yet; a 90 second recording is still needed.",
    assetStatuses: defaultStatuses,
    pdfHref: `${BASE}/pdf/05_Website_Settings_And_QM_Pricer_Setup_Training_Guide.pdf`,
    markdownHref: `${BASE}/markdown/05_Website_Settings_And_QM_Pricer_Training_Guide.md`,
    thumbnailHref: `${BASE}/thumbnails/05_website_qm_pricer.png`,
    aiAdvantageTieIn: {
      title: "QM Pricer explanation and borrower friendly scripts",
      useCase: "Use AI to translate QM Pricer settings and quote flow into plain English scripts for borrowers, with compliance review.",
      promptStarter:
        "Draft a borrower-friendly explanation of how to use my Loan Factory website quote flow. No rates, payments, fees, approvals, or guarantees. Include a follow-up text after someone requests a quote.",
    },
    walkthroughScript: {
      title: "90 second screen recording: QM Pricer setup",
      hook: "Your Loan Factory website is not just a business card. It is where a visitor decides whether to take the next step.",
      steps:
        "Open Website Settings. Review the URL, visibility settings, Best Price Guarantee setting if approved, email and phone display, website video, images, thumbnail logo, bio, custom scripts, schedule, and header menu. Then open QM Pricer settings and review contact requirements, disclaimers, default quote values, lender display, compensation-related settings, buttons, and loan terms.",
      warning:
        "Do not blindly copy compensation settings from screenshots. Verify lender-paid setup and company guidance before changing compensation or pricing display.",
      close: "After saving, open the public website and test the quote flow like a borrower would.",
    },
    quiz: [
      { question: "Where do you update website settings?", answer: "Website Settings." },
      { question: "What tab controls pricer display and quote defaults?", answer: "QM Pricer settings." },
      { question: "Why handle custom scripts carefully?", answer: "They affect website tracking and behavior." },
      { question: "What must be verified before copying compensation settings?", answer: "Company policy and leadership guidance." },
      { question: "What should happen after saving changes?", answer: "Test the public website and quote flow." },
    ],
    successChecklist: [
      "Website URL and visibility settings are reviewed.",
      "Email, phone, image, preview logo, and bio are current.",
      "Custom scripts are intentional and documented.",
      "QM Pricer disclaimers are reviewed.",
      "Default quote values are checked.",
      "Lender display and button settings are intentional.",
      "Public website and quote flow are tested.",
    ],
    commonMistakes: [
      "Leaving the website bio outdated.",
      "Adding tracking scripts without knowing what they do.",
      "Showing pricing buttons without a follow-up plan.",
      "Copying compensation settings without checking policy.",
      "Displaying too many terms and confusing consumers.",
    ],
    contactGuidance:
      "Contact LO Support for access, website, or script issues. Contact Marketing or leadership before changing pricing display, compensation-related settings, public claims, or borrower-facing copy.",
    complianceCaution:
      "Jeremy's source package notes lender-paid compensation as the standard setup. Do not copy borrower-paid compensation settings from screenshots without explicit approval.",
  },
];

export function getMarketingAssetsForModule(module: string): MarketingTrainingAsset[] {
  return marketingTrainingAssets.filter((asset) => asset.module === module);
}

