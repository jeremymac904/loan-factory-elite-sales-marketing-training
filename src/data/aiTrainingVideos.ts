export type AiTrainingSegment = {
  id: string;
  title: string;
  start: string;
  end: string;
  duration: string;
  clipType: string;
  whatJeremyCovers: string;
  whatAppearsOnScreen: string;
  bestStandaloneClipTitle: string;
  suggestedClipFilename: string;
  keep: boolean;
  reason: string;
};

export type AiTrainingClipPriority = {
  segmentId: string;
  clipTitle: string;
  start: string;
  end: string;
  suggestedOutputFilename: string;
  priority: string;
  whyItMatters: string;
};

export type AiTrainingVideo = {
  id: string;
  title: string;
  sourceVideoFileName: string;
  duplicateSourceVideoFileNames?: string[];
  date: string;
  duration: string;
  speaker: string;
  topic: string;
  recommendedUse: string;
  category: string;
  status: string;
  sourceMarkdownFile: string;
  duplicateMarkdownFiles?: string[];
  sourceVideoLocalPath: string;
  sourceMarkdownLocalPath: string;
  driveStatus: string;
  tags: string[];
  segments: AiTrainingSegment[];
  bestClipsToCutFirst: AiTrainingClipPriority[];
  clipsToAvoidOrMerge: string[];
  suggestedMicroLessonTitles: string[];
};

export type AiTrainingPath = {
  title: string;
  description: string;
  tags: string[];
  anchor: string;
};

export const aiTrainingStartHere = [
  "Why Every Loan Officer Needs an AI Twin",
  "Getting Started with Google AI Studio",
  "Intro to Loan Factory Enterprise AI & Security",
  "Prompting Gemini for a 30-Day Local Marketing Calendar",
  "How to Set Up Google Business Profile as a Remote LO"
];

export const aiTrainingPaths = [
  {
    "title": "Gemini AI Twin",
    "description": "Create a private Gemini Gem that understands your voice, local market, and daily communication rhythm.",
    "tags": [
      "Gemini",
      "AI Twin",
      "persona training"
    ],
    "anchor": "gemini-ai-twin"
  },
  {
    "title": "Google AI Studio",
    "description": "Learn how to prototype AI apps, iterate with suggestions, and understand when an AI tool belongs in your LO workflow.",
    "tags": [
      "AI Studio",
      "AI apps",
      "vibe coding"
    ],
    "anchor": "google-ai-studio"
  },
  {
    "title": "NotebookLM",
    "description": "Turn approved notes, pipeline references, and market research into searchable study and coaching material.",
    "tags": [
      "NotebookLM",
      "research",
      "audio overview"
    ],
    "anchor": "notebooklm"
  },
  {
    "title": "Gmail + Workspace Studio",
    "description": "Use Google Workspace tools to draft email, sort lender guides, and turn action items into organized follow-up.",
    "tags": [
      "Gmail",
      "Workspace Studio",
      "automation"
    ],
    "anchor": "gmail-workspace"
  },
  {
    "title": "Google Business Profile + Local SEO",
    "description": "Build local presence, organize profile strategy, and prepare content that is reviewed before external use.",
    "tags": [
      "GBP",
      "local SEO",
      "reviews"
    ],
    "anchor": "google-business-profile"
  },
  {
    "title": "Social Content + Realtor Marketing",
    "description": "Create social concepts, realtor newsletter drafts, and marketing examples with clear review steps.",
    "tags": [
      "social content",
      "realtor marketing",
      "review"
    ],
    "anchor": "social-realtor-marketing"
  },
  {
    "title": "Custom GPTs + AI Tools",
    "description": "Understand when a custom GPT, Gemini Gem, or internal assistant is the right tool for the job.",
    "tags": [
      "Custom GPTs",
      "tool selection",
      "AI assistant"
    ],
    "anchor": "custom-gpts"
  },
  {
    "title": "HeyGen / AI Video",
    "description": "Use AI avatar and video ideas as training and content support without adding large video files to GitHub.",
    "tags": [
      "HeyGen",
      "AI video",
      "avatar"
    ],
    "anchor": "heygen-ai-video"
  },
  {
    "title": "AI Safety + Review Guardrails",
    "description": "Keep borrower data, marketing claims, and scenario content inside human-reviewed training workflows.",
    "tags": [
      "security",
      "review",
      "guardrails"
    ],
    "anchor": "ai-safety"
  }
] satisfies AiTrainingPath[];

export const duplicateAiTrainingMarkdownFiles = [
  {
    "duplicate": "Gemini Export May 22, 2026 at 2_50_48 PM UTC-4.md",
    "canonical": "Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md"
  }
];

export const aiTrainingVideos = [
  {
    "id": "ai-marketplace-2026-02-11",
    "title": "AI in the Marketplace - 2026/02/11 13:27 PST - Recording",
    "sourceVideoFileName": "AI in the Marketplace - 2026_02_11 13_27 PST - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-02-11",
    "duration": "01:19:10",
    "speaker": "Jeremy McDonald",
    "topic": "Setting up and using a Gemini AI Twin for loan officer productivity, marketing, and communication.",
    "recommendedUse": "Core Create Your Gemini AI Twin training path.",
    "category": "Gemini AI Twin",
    "status": "Ready for Editing Queue",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_53_43 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI in the Marketplace - 2026_02_11 13_27 PST - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_53_43 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "Gemini",
      "AI Twin",
      "Gmail",
      "social content",
      "local market training"
    ],
    "segments": [
      {
        "id": "ai-marketplace-2026-02-11-01",
        "title": "Introduction to the AI Twin",
        "start": "00:00",
        "end": "01:40",
        "duration": "01:40",
        "clipType": "Explanation",
        "whatJeremyCovers": "Concept of an AI twin trained on your specific voice, persona, and standards to cut email and organization time by 60-70%.",
        "whatAppearsOnScreen": "Jeremy speaking to the camera.",
        "bestStandaloneClipTitle": "Why Every Loan Officer Needs an AI Twin",
        "suggestedClipFilename": "ai-twin-concept-intro.mp4",
        "keep": true,
        "reason": "Sets the stage for the value proposition of the training."
      },
      {
        "id": "ai-marketplace-2026-02-11-02",
        "title": "What is a Gemini Gem?",
        "start": "01:41",
        "end": "03:17",
        "duration": "01:36",
        "clipType": "Explanation",
        "whatJeremyCovers": "Definition of a Gemini \"Gem\" (custom AI chat agent) and why it’s better than generic ChatGPT outputs for maintaining professional consistency.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "Gemini Gems vs. Generic AI",
        "suggestedClipFilename": "gemini-gems-vs-generic-ai.mp4",
        "keep": true,
        "reason": "Important distinction for users who might be skeptical of AI quality."
      },
      {
        "id": "ai-marketplace-2026-02-11-03",
        "title": "Launching the AI Twin Creator",
        "start": "03:18",
        "end": "05:10",
        "duration": "01:52",
        "clipType": "Setup step",
        "whatJeremyCovers": "Starting the process by opening Gemini in a separate tab and using the custom Loan Factory AI Twin Creator link.",
        "whatAppearsOnScreen": "Browser window showing the Loan Factory AI Twin Creator interface.",
        "bestStandaloneClipTitle": "Starting the AI Twin Setup",
        "suggestedClipFilename": "starting-ai-twin-setup.mp4",
        "keep": true,
        "reason": "Practical first step of the workflow."
      },
      {
        "id": "ai-marketplace-2026-02-11-04",
        "title": "Training the Twin with Personal Data",
        "start": "05:11",
        "end": "07:35",
        "duration": "02:24",
        "clipType": "Setup step",
        "whatJeremyCovers": "Conversing with the creator tool, providing an email signature for compliance, and defining \"danger zones\" and persona.",
        "whatAppearsOnScreen": "Split screen: Creator tool on the left, Gemini account on the right.",
        "bestStandaloneClipTitle": "Training Your AI on Your Persona",
        "suggestedClipFilename": "training-ai-persona-setup.mp4",
        "keep": true,
        "reason": "Shows the interactive process of tailoring the AI."
      },
      {
        "id": "ai-marketplace-2026-02-11-05",
        "title": "Creating the New Gem in Gemini",
        "start": "07:36",
        "end": "09:07",
        "duration": "01:31",
        "clipType": "Setup step",
        "whatJeremyCovers": "Copying instructions from the creator tool into the \"New Gem\" setup in Gemini and selecting the \"No default tool\" option for deep research.",
        "whatAppearsOnScreen": "Gemini \"New Gem\" interface with instructions being pasted.",
        "bestStandaloneClipTitle": "Finalizing Your Gemini Gem Setup",
        "suggestedClipFilename": "finalizing-gem-setup.mp4",
        "keep": true,
        "reason": "Critical technical step for creating the bot."
      },
      {
        "id": "ai-marketplace-2026-02-11-06",
        "title": "Demo: Generating Social Content",
        "start": "09:08",
        "end": "11:36",
        "duration": "02:28",
        "clipType": "Demo",
        "whatJeremyCovers": "Using the twin to write a Florida credit hack Facebook post and then instantly turning it into a 30-second Reels script.",
        "whatAppearsOnScreen": "Gemini interface generating a long-form post and a script.",
        "bestStandaloneClipTitle": "Rapid Content Creation with AI Twin",
        "suggestedClipFilename": "social-media-content-demo.mp4",
        "keep": true,
        "reason": "Shows high-value practical application for marketing."
      },
      {
        "id": "ai-marketplace-2026-02-11-07",
        "title": "Using AI Twins for Different Languages",
        "start": "12:00",
        "end": "14:05",
        "duration": "02:05",
        "clipType": "Demo",
        "whatJeremyCovers": "How to instruct the twin to rewrite content in specific dialects, such as Cuban Spanish, to serve local markets.",
        "whatAppearsOnScreen": "Gemini interface translating the credit hack post into Spanish.",
        "bestStandaloneClipTitle": "Multi-Language Content Strategy",
        "suggestedClipFilename": "translate-content-cuban-spanish.mp4",
        "keep": true,
        "reason": "High value for bilingual agents or those in diverse markets."
      },
      {
        "id": "ai-marketplace-2026-02-11-08",
        "title": "Fine-Tuning Tone via Knowledge Documents",
        "start": "14:06",
        "end": "16:50",
        "duration": "02:44",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Using ChatGPT to draft a biography/knowledge document to feed into the Gemini Gem for better tone matching.",
        "whatAppearsOnScreen": "Jeremy speaking to the group.",
        "bestStandaloneClipTitle": "Improving AI Tone with Bio Docs",
        "suggestedClipFilename": "fine-tuning-ai-tone.mp4",
        "keep": true,
        "reason": "Expert tip for getting more \"human-sounding\" results."
      },
      {
        "id": "ai-marketplace-2026-02-11-09",
        "title": "Security and Privacy Benefits (Gemini Pro)",
        "start": "17:58",
        "end": "19:17",
        "duration": "01:19",
        "clipType": "Warning / guardrail",
        "whatJeremyCovers": "Why approved Loan Factory AI tools are different from personal AI accounts, and why borrower documents still need the current company-approved handling rules.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "AI Data Security for Loan Officers",
        "suggestedClipFilename": "ai-data-security-compliance.mp4",
        "keep": true,
        "reason": "Essential compliance and safety information."
      },
      {
        "id": "ai-marketplace-2026-02-11-10",
        "title": "Training the Twin on Local Markets",
        "start": "38:52",
        "end": "41:00",
        "duration": "02:08",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Why generic content fails and how to train your AI on specific neighborhood data to improve local SEO and Google Business rankings.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "Dominating Your Local Market with AI",
        "suggestedClipFilename": "local-market-ai-training.mp4",
        "keep": true,
        "reason": "High-level strategy for lead generation."
      },
      {
        "id": "ai-marketplace-2026-02-11-11",
        "title": "Gemini Integration in Gmail",
        "start": "43:40",
        "end": "45:45",
        "duration": "02:05",
        "clipType": "Demo",
        "whatJeremyCovers": "Accessing the AI twin directly inside Gmail to draft professional conditional approval updates.",
        "whatAppearsOnScreen": "Gmail interface with the Gemini sidebar active.",
        "bestStandaloneClipTitle": "Drafting Client Emails in Gmail",
        "suggestedClipFilename": "gmail-gemini-integration.mp4",
        "keep": true,
        "reason": "Practical daily workflow demonstration."
      },
      {
        "id": "ai-marketplace-2026-02-11-12",
        "title": "Automating Morning Content Research",
        "start": "51:44",
        "end": "53:05",
        "duration": "01:21",
        "clipType": "Setup step",
        "whatJeremyCovers": "Creating a recurring prompt for the AI to search for market news (Fed meetings, jobs data) and generate content every morning at 8:00 AM.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "Automating Your Daily Market Updates",
        "suggestedClipFilename": "morning-content-automation-prompt.mp4",
        "keep": true,
        "reason": "Powerful automation tip for busy officers."
      },
      {
        "id": "ai-marketplace-2026-02-11-13",
        "title": "Context-Aware Updates in Loan Portal",
        "start": "56:45",
        "end": "58:25",
        "duration": "01:40",
        "clipType": "Demo",
        "whatJeremyCovers": "How Gemini reads the \"current tab\" in the loan portal to write specific, accurate emails based on real-time loan notes.",
        "whatAppearsOnScreen": "Loan Factory portal with Gemini sidebar.",
        "bestStandaloneClipTitle": "AI-Powered Loan Status Updates",
        "suggestedClipFilename": "portal-context-aware-updates.mp4",
        "keep": true,
        "reason": "Specific to the Loan Factory software ecosystem."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-marketplace-2026-02-11-01",
        "clipTitle": "Why Every Loan Officer Needs an AI Twin",
        "start": "00:00",
        "end": "01:40",
        "suggestedOutputFilename": "ai-twin-concept-intro.mp4",
        "priority": "High",
        "whyItMatters": "Sets the stage for the value proposition of the training."
      },
      {
        "segmentId": "ai-marketplace-2026-02-11-03",
        "clipTitle": "Starting the AI Twin Setup",
        "start": "03:18",
        "end": "05:10",
        "suggestedOutputFilename": "starting-ai-twin-setup.mp4",
        "priority": "High",
        "whyItMatters": "Practical first step of the workflow."
      },
      {
        "segmentId": "ai-marketplace-2026-02-11-04",
        "clipTitle": "Training Your AI on Your Persona",
        "start": "05:11",
        "end": "07:35",
        "suggestedOutputFilename": "training-ai-persona-setup.mp4",
        "priority": "High",
        "whyItMatters": "Shows the interactive process of tailoring the AI."
      },
      {
        "segmentId": "ai-marketplace-2026-02-11-11",
        "clipTitle": "Drafting Client Emails in Gmail",
        "start": "43:40",
        "end": "45:45",
        "suggestedOutputFilename": "gmail-gemini-integration.mp4",
        "priority": "High",
        "whyItMatters": "Practical daily workflow demonstration."
      },
      {
        "segmentId": "ai-marketplace-2026-02-11-12",
        "clipTitle": "Automating Your Daily Market Updates",
        "start": "51:44",
        "end": "53:05",
        "suggestedOutputFilename": "morning-content-automation-prompt.mp4",
        "priority": "High",
        "whyItMatters": "Powerful automation tip for busy officers."
      }
    ],
    "clipsToAvoidOrMerge": [
      "05:30 - 06:10: Briefly off-topic regarding email login issues; can be trimmed for a smoother setup flow.",
      "12:20 - 12:55: Dead air while Jeremy looks for files.",
      "19:20 - 20:30: Repetitive mention of recording and handouts; merge with earlier setup or cut.",
      "1:07:30 - 1:08:15: Discussion about Quantum Computing; too off-topic for a \"practical\" micro-lesson, though interesting."
    ],
    "suggestedMicroLessonTitles": [
      "Why Every Loan Officer Needs an AI Twin",
      "Starting the AI Twin Setup",
      "Training Your AI on Your Persona",
      "Drafting Client Emails in Gmail",
      "Automating Your Daily Market Updates"
    ]
  },
  {
    "id": "ai-training-2026-03-03",
    "title": "AI Training - 2026/03/03 13:48 PST - Recording",
    "sourceVideoFileName": "AI Training - 2026_03_03 13_48 PST - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-03-03",
    "duration": "15:11",
    "speaker": "Jeremy McDonald",
    "topic": "Introduction to AI training, NotebookLM for marketing, and AI video cloning tools.",
    "recommendedUse": "Intro and overview clips only; avoid off-topic global AI discussion.",
    "category": "Intro + HeyGen",
    "status": "Selective Clips Only",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_53_06 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_03 13_48 PST - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_53_06 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "NotebookLM",
      "AI Twin",
      "HeyGen",
      "overview"
    ],
    "segments": [
      {
        "id": "ai-training-2026-03-03-01",
        "title": "AI Ethics and Global Impact",
        "start": "01:15",
        "end": "05:25",
        "duration": "04:10",
        "clipType": "Explanation",
        "whatJeremyCovers": "Jeremy discusses the dangers of autonomous AI in warfare and surveillance, the potential for AI to \"fact-check\" corrupt politicians in real-time, and compares the AI development motivations of the US and China.",
        "whatAppearsOnScreen": "Video call interface showing participants.",
        "bestStandaloneClipTitle": "The Ethics and Future Impact of AI",
        "suggestedClipFilename": "ai-ethics-global-impact-discussion.mp4",
        "keep": false,
        "reason": "While interesting, it is largely off-topic for practical loan officer training."
      },
      {
        "id": "ai-training-2026-03-03-02",
        "title": "Stale internal platform discussion",
        "start": "07:32",
        "end": "09:32",
        "duration": "02:00",
        "clipType": "Explanation",
        "whatJeremyCovers": "Stale internal platform discussion from the source recording. Keep out of standalone AI Training lessons.",
        "whatAppearsOnScreen": "Video call interface showing participants.",
        "bestStandaloneClipTitle": "Internal system discussion - do not use as standalone AI Training clip",
        "suggestedClipFilename": "loan-factory-mos-platform-update.mp4",
        "keep": false,
        "reason": "Internal platform discussion is stale or system-specific; avoid as a standalone AI Training clip."
      },
      {
        "id": "ai-training-2026-03-03-03",
        "title": "Training Overview: NotebookLM & AI Twin",
        "start": "09:33",
        "end": "11:00 (approximate)",
        "duration": "01:27",
        "clipType": "Recap",
        "whatJeremyCovers": "Sets the agenda for the training session, focusing on using NotebookLM for marketing and becoming a market expert. Jeremy also mentions available multilingual walkthroughs for setting up an \"AI Twin\" and connecting Google Drive to Gemini.",
        "whatAppearsOnScreen": "Video call interface showing participants.",
        "bestStandaloneClipTitle": "Overview: Marketing with NotebookLM and AI Twins",
        "suggestedClipFilename": "notebooklm-ai-twin-training-overview.mp4",
        "keep": true,
        "reason": "Excellent introductory clip for the training series."
      },
      {
        "id": "ai-training-2026-03-03-04",
        "title": "Demo: AI Video Cloning with HeyGen",
        "start": "12:48",
        "end": "14:40 (approximate)",
        "duration": "01:52",
        "clipType": "Demo",
        "whatJeremyCovers": "Jeremy recommends \"HeyGen\" for creating video clones of oneself and demonstrates a high-quality AI-generated video of himself discussing the 2026 Florida housing market.",
        "whatAppearsOnScreen": "Jeremy's YouTube channel/Facebook showing a video titled \"Buying your first home in Florida in 2026.\"",
        "bestStandaloneClipTitle": "Creating Video Content with HeyGen AI Clones",
        "suggestedClipFilename": "heygen-ai-video-cloning-demo.mp4",
        "keep": true,
        "reason": "Practical demonstration of a tool loan officers can use for social media content."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-03-03-03",
        "clipTitle": "Overview: Marketing with NotebookLM and AI Twins",
        "start": "09:33",
        "end": "11:00 (approximate)",
        "suggestedOutputFilename": "notebooklm-ai-twin-training-overview.mp4",
        "priority": "High",
        "whyItMatters": "Excellent introductory clip for the training series."
      },
      {
        "segmentId": "ai-training-2026-03-03-04",
        "clipTitle": "Creating Video Content with HeyGen AI Clones",
        "start": "12:48",
        "end": "14:40 (approximate)",
        "suggestedOutputFilename": "heygen-ai-video-cloning-demo.mp4",
        "priority": "High",
        "whyItMatters": "Practical demonstration of a tool loan officers can use for social media content."
      }
    ],
    "clipsToAvoidOrMerge": [
      "01:15-05:25: AI Ethics and Global Impact - While interesting, it is largely off-topic for practical loan officer training.",
      "07:32-09:32: Stale internal platform discussion - avoid as a standalone AI Training clip.",
      "00:00 - 01:15: General banter and initial \"dead air\" while waiting for participants to join.",
      "01:15 - 05:25: The political and ethical discussion on AI warfare is too off-topic for a professional training module.",
      "05:26 - 07:31: Discussion regarding China's economy, EVs, and US tariffs is not relevant to loan officer training."
    ],
    "suggestedMicroLessonTitles": [
      "Overview: Marketing with NotebookLM and AI Twins",
      "Creating Video Content with HeyGen AI Clones"
    ]
  },
  {
    "id": "ai-training-2026-03-17",
    "title": "AI Training - 2026/03/17 14:45 PDT - Recording",
    "sourceVideoFileName": "AI Training - 2026_03_17 14_45 PDT - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-03-17",
    "duration": "01:09:11",
    "speaker": "Jeremy McDonald",
    "topic": "Building AI Apps in Google AI Studio and using Loan Factory Ally",
    "recommendedUse": "AI Studio plus Ally training module.",
    "category": "Google AI Studio + Ally",
    "status": "Ready for Editing Queue",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_52_42 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_17 14_45 PDT - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_52_42 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "Google AI Studio",
      "Loan Factory Ally",
      "AI apps",
      "vibe coding",
      "HeyGen"
    ],
    "segments": [
      {
        "id": "ai-training-2026-03-17-01",
        "title": "Introduction to Google AI Studio",
        "start": "00:00",
        "end": "01:00",
        "duration": "01:00",
        "clipType": "Setup step",
        "whatJeremyCovers": "Logging into Google AI Studio using a Loan Factory email and an overview of the platform as a free app builder.",
        "whatAppearsOnScreen": "Google AI Studio login screen and the URL (aistudio.google.com).",
        "bestStandaloneClipTitle": "Getting Started with Google AI Studio",
        "suggestedClipFilename": "google-ai-studio-setup-intro.mp4",
        "keep": true,
        "reason": "Essential first step for accessing the tools discussed in the video."
      },
      {
        "id": "ai-training-2026-03-17-02",
        "title": "Three AI Tools for Loan Officers",
        "start": "01:01",
        "end": "03:20",
        "duration": "02:19",
        "clipType": "Explanation",
        "whatJeremyCovers": "Overview of three apps to build: a refinance comparison tool, a virtual staging tool for real estate partners, and a marketing image generator.",
        "whatAppearsOnScreen": "Jeremy navigating tabs in AI Studio.",
        "bestStandaloneClipTitle": "3 Essential AI Apps for Loan Officers",
        "suggestedClipFilename": "ai-apps-overview-for-lo.mp4",
        "keep": true,
        "reason": "Sets the roadmap for the tutorial and explains the value proposition of each tool."
      },
      {
        "id": "ai-training-2026-03-17-03",
        "title": "\\[REMOVED - Setup Delay\\]",
        "start": "03:21",
        "end": "06:40",
        "duration": "03:19",
        "clipType": "Setup step",
        "whatJeremyCovers": "",
        "whatAppearsOnScreen": "",
        "bestStandaloneClipTitle": "\\[REMOVED - Setup Delay\\]",
        "suggestedClipFilename": "removed-setup-delay.mp4",
        "keep": false,
        "reason": "Long delay waiting for builds and addressing a YouTube thumbnail tool that doesn't fully load."
      },
      {
        "id": "ai-training-2026-03-17-04",
        "title": "Using the Refinance Comparison Tool",
        "start": "06:41",
        "end": "08:39",
        "duration": "01:58",
        "clipType": "Demo",
        "whatJeremyCovers": "Demonstrating how the tool compares mortgage balances, interest rates, and monthly savings.",
        "whatAppearsOnScreen": "Refinance Comparison Pro app interface with data entry fields.",
        "bestStandaloneClipTitle": "Demo: Refinance Comparison AI Tool",
        "suggestedClipFilename": "refi-comparison-tool-demo.mp4",
        "keep": true,
        "reason": "Core tutorial piece showing the actual functionality of a built app."
      },
      {
        "id": "ai-training-2026-03-17-05",
        "title": "Iterating with AI Suggestions",
        "start": "08:40",
        "end": "11:41",
        "duration": "03:01",
        "clipType": "Tutorial",
        "whatJeremyCovers": "How to use \"suggestions\" in AI Studio to add features like cash-out details and explaining what a YouTube thumbnail is.",
        "whatAppearsOnScreen": "AI Studio suggestion buttons and chat interface.",
        "bestStandaloneClipTitle": "Improving Your AI App with Suggestions",
        "suggestedClipFilename": "ai-studio-suggestions-iteration.mp4",
        "keep": true,
        "reason": "Teaches the \"vibe coding\" process of iterative development."
      },
      {
        "id": "ai-training-2026-03-17-06",
        "title": "Strategic Use of AI Tools",
        "start": "11:42",
        "end": "13:39",
        "duration": "01:57",
        "clipType": "Explanation",
        "whatJeremyCovers": "Advice on when to build tools (after hours) and when to use them with prospects versus during the application process.",
        "whatAppearsOnScreen": "Discussion between Jeremy and participants.",
        "bestStandaloneClipTitle": "When to Use AI Tools in Your Workflow",
        "suggestedClipFilename": "lo-workflow-ai-strategy.mp4",
        "keep": true,
        "reason": "Provides practical business context beyond just the technical build."
      },
      {
        "id": "ai-training-2026-03-17-07",
        "title": "Vibe Coding and Advanced Prompting",
        "start": "13:40",
        "end": "16:59",
        "duration": "03:19",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Explaining \"vibe coding,\" using speech-to-text for prompts, and using LLMs like Gemini to write prompts for AI Studio.",
        "whatAppearsOnScreen": "Jeremy discussing advanced techniques.",
        "bestStandaloneClipTitle": "Advanced AI App Building: Vibe Coding",
        "suggestedClipFilename": "advanced-vibe-coding-prompts.mp4",
        "keep": true,
        "reason": "High-value instruction on the future of low-code development."
      },
      {
        "id": "ai-training-2026-03-17-08",
        "title": "Uploading Skills and PDF Analysis",
        "start": "17:00",
        "end": "21:15",
        "duration": "04:15",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Creating \"skills\" via markdown files and the ability to upload PDFs for AI analysis to avoid manual data entry.",
        "whatAppearsOnScreen": "AI Studio file upload area.",
        "bestStandaloneClipTitle": "Using AI to Analyze PDFs and Loan Files",
        "suggestedClipFilename": "ai-studio-pdf-analysis-skills.mp4",
        "keep": true,
        "reason": "Essential for efficiency-shows how to automate the data entry process."
      },
      {
        "id": "ai-training-2026-03-17-09",
        "title": "\\[REMOVED - Technical Issues\\]",
        "start": "21:16",
        "end": "27:53",
        "duration": "06:37",
        "clipType": "Setup step",
        "whatJeremyCovers": "",
        "whatAppearsOnScreen": "",
        "bestStandaloneClipTitle": "\\[REMOVED - Technical Issues\\]",
        "suggestedClipFilename": "removed-technical-issues.mp4",
        "keep": false,
        "reason": "Repetitive attempts to fix errors and internet connectivity problems."
      },
      {
        "id": "ai-training-2026-03-17-10",
        "title": "Social Media Automation with Loan Factory Ally",
        "start": "27:54",
        "end": "32:20",
        "duration": "04:26",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Accessing Ally, connecting Facebook, and scheduling a month's worth of content.",
        "whatAppearsOnScreen": "ally.loanfactory.com interface and post scheduling calendar.",
        "bestStandaloneClipTitle": "Automating Social Media with Loan Factory Ally",
        "suggestedClipFilename": "loan-factory-ally-tutorial.mp4",
        "keep": true,
        "reason": "Highly practical tool for every Loan Factory officer."
      },
      {
        "id": "ai-training-2026-03-17-11",
        "title": "Personal vs. Business Page Strategy",
        "start": "32:21",
        "end": "34:40",
        "duration": "02:19",
        "clipType": "Warning / guardrail",
        "whatJeremyCovers": "Why you must post on your personal page instead of just your business page and the dangers of just \"sharing\" posts.",
        "whatAppearsOnScreen": "Jeremy speaking to the group.",
        "bestStandaloneClipTitle": "The Secret to Facebook Reach: Personal Pages",
        "suggestedClipFilename": "facebook-strategy-personal-vs-business.mp4",
        "keep": true,
        "reason": "Critical marketing advice that prevents users from wasting time on low-reach tactics."
      },
      {
        "id": "ai-training-2026-03-17-12",
        "title": "\\[REMOVED - Troubleshooting\\]",
        "start": "34:41",
        "end": "52:45",
        "duration": "18:04",
        "clipType": "Setup step",
        "whatJeremyCovers": "",
        "whatAppearsOnScreen": "",
        "bestStandaloneClipTitle": "\\[REMOVED - Troubleshooting\\]",
        "suggestedClipFilename": "removed-troubleshooting.mp4",
        "keep": false,
        "reason": "Contains troubleshooting login issues for another user and extended dead air."
      },
      {
        "id": "ai-training-2026-03-17-13",
        "title": "AI Influencers and HeyGen",
        "start": "52:46",
        "end": "55:10",
        "duration": "02:24",
        "clipType": "Demo",
        "whatJeremyCovers": "Using HeyGen to create an AI avatar \"twin\" for multilingual marketing in Spanish.",
        "whatAppearsOnScreen": "HeyGen interface showing a Spanish-speaking AI video.",
        "bestStandaloneClipTitle": "Creating an AI Twin for Multilingual Marketing",
        "suggestedClipFilename": "heygen-ai-twin-spanish-marketing.mp4",
        "keep": true,
        "reason": "Advanced demo of cutting-edge video AI."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-03-17-01",
        "clipTitle": "Getting Started with Google AI Studio",
        "start": "00:00",
        "end": "01:00",
        "suggestedOutputFilename": "google-ai-studio-setup-intro.mp4",
        "priority": "High",
        "whyItMatters": "Essential first step for accessing the tools discussed in the video."
      },
      {
        "segmentId": "ai-training-2026-03-17-02",
        "clipTitle": "3 Essential AI Apps for Loan Officers",
        "start": "01:01",
        "end": "03:20",
        "suggestedOutputFilename": "ai-apps-overview-for-lo.mp4",
        "priority": "High",
        "whyItMatters": "Sets the roadmap for the tutorial and explains the value proposition of each tool."
      },
      {
        "segmentId": "ai-training-2026-03-17-05",
        "clipTitle": "Improving Your AI App with Suggestions",
        "start": "08:40",
        "end": "11:41",
        "suggestedOutputFilename": "ai-studio-suggestions-iteration.mp4",
        "priority": "High",
        "whyItMatters": "Teaches the \"vibe coding\" process of iterative development."
      },
      {
        "segmentId": "ai-training-2026-03-17-10",
        "clipTitle": "Automating Social Media with Loan Factory Ally",
        "start": "27:54",
        "end": "32:20",
        "suggestedOutputFilename": "loan-factory-ally-tutorial.mp4",
        "priority": "High",
        "whyItMatters": "Highly practical tool for every Loan Factory officer."
      },
      {
        "segmentId": "ai-training-2026-03-17-13",
        "clipTitle": "Creating an AI Twin for Multilingual Marketing",
        "start": "52:46",
        "end": "55:10",
        "suggestedOutputFilename": "heygen-ai-twin-spanish-marketing.mp4",
        "priority": "High",
        "whyItMatters": "Advanced demo of cutting-edge video AI."
      }
    ],
    "clipsToAvoidOrMerge": [
      "03:21-06:40: \\[REMOVED - Setup Delay\\] - Long delay waiting for builds and addressing a YouTube thumbnail tool that doesn't fully load.",
      "21:16-27:53: \\[REMOVED - Technical Issues\\] - Repetitive attempts to fix errors and internet connectivity problems.",
      "34:41-52:45: \\[REMOVED - Troubleshooting\\] - Contains troubleshooting login issues for another user and extended dead air.",
      "Avoid 21:16–27:53: This section is almost entirely troubleshooting a \"websocket connection error\" due to internet issues.",
      "Avoid 34:41–52:45: This long section involves helping a specific user log in and does not provide general training value for most viewers."
    ],
    "suggestedMicroLessonTitles": [
      "Getting Started with Google AI Studio",
      "3 Essential AI Apps for Loan Officers",
      "Improving Your AI App with Suggestions",
      "Automating Social Media with Loan Factory Ally",
      "Creating an AI Twin for Multilingual Marketing"
    ]
  },
  {
    "id": "ai-training-2026-03-31",
    "title": "AI Training - 2026/03/31 14:52 PDT - Recording",
    "sourceVideoFileName": "AI Training - 2026_03_31 14_52 PDT - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-03-31",
    "duration": "57:07",
    "speaker": "Jeremy McDonald",
    "topic": "Enterprise AI tools for loan officers, specifically NotebookLM, Gemini for Workspace, and Gemini Core, focusing on pipeline management and automated marketing",
    "recommendedUse": "AI safety plus NotebookLM/Gemini productivity module.",
    "category": "AI Safety + NotebookLM",
    "status": "Ready for Editing Queue",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_52_12 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_03_31 14_52 PDT - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_52_12 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "enterprise AI",
      "NotebookLM",
      "Gemini",
      "pipeline",
      "local SEO"
    ],
    "segments": [
      {
        "id": "ai-training-2026-03-31-01",
        "title": "Introduction to Enterprise AI and Data Security",
        "start": "02:24",
        "end": "03:25",
        "duration": "01:01",
        "clipType": "Setup step",
        "whatJeremyCovers": "Introduction to Google's enterprise AI tools (NotebookLM, Gemini for Workspace, Gemini Core) and a critical warning about data security, emphasizing that only enterprise platforms are safe for sensitive client information.",
        "whatAppearsOnScreen": "Gemini Core home screen.",
        "bestStandaloneClipTitle": "Intro to Loan Factory Enterprise AI & Security",
        "suggestedClipFilename": "intro-enterprise-ai-security.mp4",
        "keep": true,
        "reason": "Sets the foundation for the training and establishes necessary security guardrails for handling PII."
      },
      {
        "id": "ai-training-2026-03-31-02",
        "title": "Using NotebookLM for Pipeline & Underwriting Management",
        "start": "03:31",
        "end": "05:14",
        "duration": "01:43",
        "clipType": "Tutorial",
        "whatJeremyCovers": "How to use NotebookLM as a \"brain\" or \"storage vault\" by uploading pipeline spreadsheets (as CSVs) and underwriting guidelines to create a centralized, searchable resource.",
        "whatAppearsOnScreen": "NotebookLM interface showing source uploads and notebook creation.",
        "bestStandaloneClipTitle": "Building an AI Mortgage Pipeline & Guideline Vault",
        "suggestedClipFilename": "notebooklm-pipeline-vault-setup.mp4",
        "keep": true,
        "reason": "Provides a high-value, practical use case for organizing complex mortgage data."
      },
      {
        "id": "ai-training-2026-03-31-03",
        "title": "Audio Overviews & Interactive AI Podcasts",
        "start": "05:20",
        "end": "09:21",
        "duration": "04:01",
        "clipType": "Demo",
        "whatJeremyCovers": "Demonstration of NotebookLM's \"Audio Overview\" feature, which turns dense underwriting guidelines into interactive, podcast-style audio that loan officers can listen to or even \"join\" to ask questions.",
        "whatAppearsOnScreen": "NotebookLM audio overview interface and the \"Join\" interaction feature.",
        "bestStandaloneClipTitle": "Transforming Underwriting Guidelines into Interactive Podcasts",
        "suggestedClipFilename": "notebooklm-audio-overview-demo.mp4",
        "keep": true,
        "reason": "Shows a unique, modern way for loan officers to consume complex industry updates while on the go."
      },
      {
        "id": "ai-training-2026-03-31-04",
        "title": "Automated Pipeline Status & Email Drafting",
        "start": "10:20",
        "end": "13:02",
        "duration": "02:42",
        "clipType": "Tutorial",
        "whatJeremyCovers": "How to prompt Gemini to analyze an uploaded pipeline spreadsheet to identify closing dates and missing documents, then instantly draft follow-up emails directly into Gmail.",
        "whatAppearsOnScreen": "Gemini chat analyzing dummy pipeline data and the \"Draft in Gmail\" feature.",
        "bestStandaloneClipTitle": "Automating Pipeline Follow-ups with Gemini",
        "suggestedClipFilename": "gemini-pipeline-email-automation.mp4",
        "keep": true,
        "reason": "Direct \"time-saver\" application that integrates AI with daily email workflows."
      },
      {
        "id": "ai-training-2026-03-31-05",
        "title": "Generating AI Social Media Content & Images",
        "start": "13:05",
        "end": "15:07",
        "duration": "02:02",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Using a custom \"AI Twin\" Gem to generate a content calendar, Facebook descriptions, and image prompts that maintain the loan officer's physical identity in the generated graphics.",
        "whatAppearsOnScreen": "Gemini Gem generating social media posts and AI-generated images of the speaker.",
        "bestStandaloneClipTitle": "Creating Branded Social Content with your AI Twin",
        "suggestedClipFilename": "ai-twin-social-media-content.mp4",
        "keep": true,
        "reason": "High engagement topic showing how to maintain a personal brand using AI."
      },
      {
        "id": "ai-training-2026-03-31-06",
        "title": "Creating Realistic AI B-Roll Footage",
        "start": "15:08",
        "end": "16:02",
        "duration": "00:54",
        "clipType": "Demo",
        "whatJeremyCovers": "A brief look at generating high-quality B-roll video footage for reels, stories, and long-form content using AI prompts.",
        "whatAppearsOnScreen": "AI-generated video of a man in an office setting.",
        "bestStandaloneClipTitle": "Generating AI B-Roll for Social Media",
        "suggestedClipFilename": "ai-video-b-roll-generation.mp4",
        "keep": true,
        "reason": "Useful for loan officers looking to enhance their video marketing without filming everything themselves."
      },
      {
        "id": "ai-training-2026-03-31-07",
        "title": "The Importance of Localized Marketing (SEO/GEO)",
        "start": "16:03",
        "end": "20:24",
        "duration": "04:21",
        "clipType": "Explanation",
        "whatJeremyCovers": "Why generic marketing fails and the necessity of focusing on specific local markets (GEO/SEO) to get recommended by AI search engines like ChatGPT and Gemini.",
        "whatAppearsOnScreen": "Gemini interface and Google Business Profile discussion.",
        "bestStandaloneClipTitle": "Why Local SEO is the Key to Free AI Leads",
        "suggestedClipFilename": "local-seo-geo-marketing-strategy.mp4",
        "keep": true,
        "reason": "Critical strategy segment that explains how to actually get ROI from AI content."
      },
      {
        "id": "ai-training-2026-03-31-08",
        "title": "Using Gemini Canvas for Market Intelligence Docs",
        "start": "23:51",
        "end": "26:17",
        "duration": "02:26",
        "clipType": "Tutorial",
        "whatJeremyCovers": "How to use the Gemini \"Canvas\" feature to create structured market intelligence documents and export them to your AI Twin's knowledge base.",
        "whatAppearsOnScreen": "Gemini Canvas creating a \"San Diego Market Intelligence\" document.",
        "bestStandaloneClipTitle": "Building a Knowledge Base with Gemini Canvas",
        "suggestedClipFilename": "gemini-canvas-knowledge-base.mp4",
        "keep": true,
        "reason": "Shows how to \"train\" your own AI to become a local market expert."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-03-31-01",
        "clipTitle": "Intro to Loan Factory Enterprise AI & Security",
        "start": "02:24",
        "end": "03:25",
        "suggestedOutputFilename": "intro-enterprise-ai-security.mp4",
        "priority": "High",
        "whyItMatters": "Sets the foundation for the training and establishes necessary security guardrails for handling PII."
      },
      {
        "segmentId": "ai-training-2026-03-31-02",
        "clipTitle": "Building an AI Mortgage Pipeline & Guideline Vault",
        "start": "03:31",
        "end": "05:14",
        "suggestedOutputFilename": "notebooklm-pipeline-vault-setup.mp4",
        "priority": "High",
        "whyItMatters": "Provides a high-value, practical use case for organizing complex mortgage data."
      },
      {
        "segmentId": "ai-training-2026-03-31-04",
        "clipTitle": "Automating Pipeline Follow-ups with Gemini",
        "start": "10:20",
        "end": "13:02",
        "suggestedOutputFilename": "gemini-pipeline-email-automation.mp4",
        "priority": "High",
        "whyItMatters": "Direct \"time-saver\" application that integrates AI with daily email workflows."
      },
      {
        "segmentId": "ai-training-2026-03-31-08",
        "clipTitle": "Building a Knowledge Base with Gemini Canvas",
        "start": "23:51",
        "end": "26:17",
        "suggestedOutputFilename": "gemini-canvas-knowledge-base.mp4",
        "priority": "High",
        "whyItMatters": "Shows how to \"train\" your own AI to become a local market expert."
      }
    ],
    "clipsToAvoidOrMerge": [
      "00:00 - 02:23: This section is mostly introductory filler about internet issues and links being dropped in a chat; it should be avoided as a standalone clip.",
      "20:25 - 23:50: This is mostly Q&A with some technical troubleshooting (muted microphone); it can be merged with later segments or avoided if a clean tutorial is needed.",
      "30:10 - 32:00: Technical discussion about website coding that the speaker admits is \"not beginner friendly\" and \"not clean\"; likely too complex for the general LO audience."
    ],
    "suggestedMicroLessonTitles": [
      "Intro to Loan Factory Enterprise AI & Security",
      "Building an AI Mortgage Pipeline & Guideline Vault",
      "Automating Pipeline Follow-ups with Gemini",
      "Building a Knowledge Base with Gemini Canvas"
    ]
  },
  {
    "id": "ai-training-2026-04-14",
    "title": "AI Training - 2026/04/14 14:43 PDT - Recording",
    "sourceVideoFileName": "AI Training - 2026_04_14 14_43 PDT - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-04-14",
    "duration": "58:04",
    "speaker": "Jeremy McDonald",
    "topic": "Automating social media content with an AI Twin, utilizing NotebookLM for market research, and implementing Gmail automations via Workspace Studio.",
    "recommendedUse": "AI content automation module.",
    "category": "Content Automation",
    "status": "Ready for Editing Queue",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_51_16 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_04_14 14_43 PDT - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_51_16 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "Gemini",
      "NotebookLM",
      "Gmail automation",
      "Workspace Studio",
      "content calendar"
    ],
    "segments": [
      {
        "id": "ai-training-2026-04-14-01",
        "title": "Introduction and Objectives",
        "start": "00:00",
        "end": "00:55",
        "duration": "0:55",
        "clipType": "Recap",
        "whatJeremyCovers": "Outlines the three main goals: setting up 30 days of social media content, creating a dynamic NotebookLM for specific market research, and implementing Gmail automation.",
        "whatAppearsOnScreen": "Speaker talking directly to the camera.",
        "bestStandaloneClipTitle": "AI Training Overview: Content, Research, and Automation",
        "suggestedClipFilename": "ai-training-overview-objectives.mp4",
        "keep": true,
        "reason": "Provides a clear roadmap for the entire training session."
      },
      {
        "id": "ai-training-2026-04-14-02",
        "title": "Generating a 30-Day Content Calendar",
        "start": "00:56",
        "end": "02:40",
        "duration": "1:44",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Demonstrates the exact prompt to use in Gemini (with \"Thinking\" and \"Canvas\" modes) to create a multi-platform content calendar focused on a specific local market.",
        "whatAppearsOnScreen": "Google Gemini interface, \"Thinking\" mode enabled, prompt being entered, and the resulting 30-day calendar.",
        "bestStandaloneClipTitle": "Prompting Gemini for a 30-Day Local Marketing Calendar",
        "suggestedClipFilename": "gemini-30-day-content-calendar-prompt.mp4",
        "keep": true,
        "reason": "This is a high-value, practical \"how-to\" for immediate implementation."
      },
      {
        "id": "ai-training-2026-04-14-03",
        "title": "Exporting and Preparing for NotebookLM",
        "start": "02:41",
        "end": "03:51",
        "duration": "1:10",
        "clipType": "Setup step",
        "whatJeremyCovers": "Explains how to download the calendar as a PDF and request a \"deep research\" prompt from Gemini to better inform NotebookLM about the local market.",
        "whatAppearsOnScreen": "Gemini screen showing download options (PDF) and the follow-up prompt for deep research.",
        "bestStandaloneClipTitle": "Exporting Content for AI Deep Research",
        "suggestedClipFilename": "export-gemini-content-for-notebooklm.mp4",
        "keep": true,
        "reason": "Essential bridge between the content generation and the research automation phase."
      },
      {
        "id": "ai-training-2026-04-14-04",
        "title": "Powering Up NotebookLM",
        "start": "03:52",
        "end": "04:32",
        "duration": "0:40",
        "clipType": "Demo",
        "whatJeremyCovers": "Shows the process of dragging the PDF into NotebookLM to create a focused source for market information.",
        "whatAppearsOnScreen": "NotebookLM interface with the content calendar PDF uploaded.",
        "bestStandaloneClipTitle": "Setting Up Your Market-Specific NotebookLM",
        "suggestedClipFilename": "notebooklm-setup-market-research.mp4",
        "keep": true,
        "reason": "Briefly demonstrates the simplicity of adding local context to an AI research tool."
      },
      {
        "id": "ai-training-2026-04-14-05",
        "title": "Gmail Automation: Lender Guides to Drive",
        "start": "04:33",
        "end": "07:12",
        "duration": "2:39",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Uses Workspace Studio \"Flows\" to automatically move emails with lender guidelines or matrices into a specific Google Drive folder.",
        "whatAppearsOnScreen": "Gmail interface, Workspace Studio sidebar, \"Flows\" setup screen, and folder creation in Google Drive.",
        "bestStandaloneClipTitle": "Automatically Organizing Lender Guides in Google Drive",
        "suggestedClipFilename": "gmail-automation-lender-guides-drive.mp4",
        "keep": true,
        "reason": "Directly solves a common administrative pain point for loan officers."
      },
      {
        "id": "ai-training-2026-04-14-06",
        "title": "Gmail Automation: Action Items to Tasks",
        "start": "07:13",
        "end": "07:44",
        "duration": "0:31",
        "clipType": "Demo",
        "whatJeremyCovers": "Shows how Workspace Studio can identify action items in emails and automatically create tasks.",
        "whatAppearsOnScreen": "Workspace Studio interface configuring \"Action Item\" extraction.",
        "bestStandaloneClipTitle": "Turning Emails into Actionable Tasks Automatically",
        "suggestedClipFilename": "gmail-automation-extract-action-items.mp4",
        "keep": true,
        "reason": "A quick, powerful productivity tip."
      },
      {
        "id": "ai-training-2026-04-14-07",
        "title": "Daily Marketing Content on Autopilot",
        "start": "07:45",
        "end": "09:25",
        "duration": "1:40",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Setting a recurring daily schedule at 8:00 AM for the AI to pull from the NotebookLM and generate tailored social media posts for all major platforms.",
        "whatAppearsOnScreen": "Gemini/Workspace Studio interface showing the scheduling of the daily content generation task.",
        "bestStandaloneClipTitle": "Scheduling Your Daily AI Social Media Delivery",
        "suggestedClipFilename": "schedule-daily-ai-social-content.mp4",
        "keep": true,
        "reason": "This is the \"autopilot\" goal of the entire training."
      },
      {
        "id": "ai-training-2026-04-14-08",
        "title": "Reviewing and Troubleshooting AI Output",
        "start": "09:26",
        "end": "12:02",
        "duration": "2:36",
        "clipType": "Warning / guardrail",
        "whatJeremyCovers": "Reviews the generated content and shows where the AI fails (image generation mistakes), emphasizing the need for manual review of compliance and specific data like APRs.",
        "whatAppearsOnScreen": "Generated interest rate posts and a failed AI-generated image.",
        "bestStandaloneClipTitle": "Why You Must Review AI-Generated Content",
        "suggestedClipFilename": "ai-content-review-and-guardrails.mp4",
        "keep": true,
        "reason": "Crucial for compliance and ensuring the quality of the LO's professional brand."
      },
      {
        "id": "ai-training-2026-04-14-09",
        "title": "Daily Market Rate Updates",
        "start": "12:03",
        "end": "12:48",
        "duration": "0:45",
        "clipType": "Demo",
        "whatJeremyCovers": "Creates a second automation for a daily 9:00 AM market rate update email containing specific talking points.",
        "whatAppearsOnScreen": "Workspace Studio setup for the daily market rate schedule.",
        "bestStandaloneClipTitle": "Getting Daily Market Talking Points Delivered",
        "suggestedClipFilename": "daily-market-rate-update-automation.mp4",
        "keep": true,
        "reason": "Provides the LO with ready-to-use information for client calls and content."
      },
      {
        "id": "ai-training-2026-04-14-10",
        "title": "Q&A: Accessing Workspace Studio",
        "start": "16:50",
        "end": "17:30",
        "duration": "0:40",
        "clipType": "Setup step",
        "whatJeremyCovers": "Clarifies exactly where to find the \"Studio\" icon in Gmail to begin using automations.",
        "whatAppearsOnScreen": "Gmail inbox showing the \"Studio\" icon on the right-hand side and the \"Do more in Studio\" link.",
        "bestStandaloneClipTitle": "Where to Find Google Workspace Studio in Gmail",
        "suggestedClipFilename": "find-workspace-studio-gmail.mp4",
        "keep": true,
        "reason": "Answers a common user question regarding interface navigation."
      },
      {
        "id": "ai-training-2026-04-14-11",
        "title": "Q&A: Top 3 AI Apps for LOs",
        "start": "23:25",
        "end": "26:02",
        "duration": "2:37",
        "clipType": "Explanation",
        "whatJeremyCovers": "Recommends his \"Top 3\" essential tools: Google Gemini (for the AI Twin), Canva (for visual marketing and direct posting), and NotebookLM (for specialized knowledge management).",
        "whatAppearsOnScreen": "Jeremy speaking during the live Q&A.",
        "bestStandaloneClipTitle": "The Top 3 AI Tools Every Loan Officer Needs",
        "suggestedClipFilename": "top-3-ai-apps-for-loan-officers.mp4",
        "keep": true,
        "reason": "Extremely high value for viewers looking for a prioritized starting point."
      },
      {
        "id": "ai-training-2026-04-14-12",
        "title": "Q&A: The Importance of Local Marketing",
        "start": "26:52",
        "end": "28:01",
        "duration": "1:09",
        "clipType": "Explanation",
        "whatJeremyCovers": "Explains why SEO and AI search (GEO) require focus on a specific local market rather than trying to market to an entire state.",
        "whatAppearsOnScreen": "Jeremy speaking during the live Q&A.",
        "bestStandaloneClipTitle": "Why Local SEO Matters More Than State Licensing",
        "suggestedClipFilename": "importance-of-local-market-focus.mp4",
        "keep": true,
        "reason": "A fundamental marketing lesson that prevents LOs from wasting time on broad, ineffective strategies."
      },
      {
        "id": "ai-training-2026-04-14-13",
        "title": "Q&A: AI Video Generators (HeyGen)",
        "start": "13:07 (approximate)",
        "end": "54:03",
        "duration": "1:00",
        "clipType": "Explanation",
        "whatJeremyCovers": "Discusses the difference between organic cell phone video and AI avatars, recommending HeyGen for consistent video content.",
        "whatAppearsOnScreen": "Jeremy speaking during the live Q&A.",
        "bestStandaloneClipTitle": "HeyGen: Using AI Avatars for Consistent Video Content",
        "suggestedClipFilename": "heygen-ai-video-avatar-recommendation.mp4",
        "keep": true,
        "reason": "Addresses the biggest barrier to video marketing: consistency."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-04-14-02",
        "clipTitle": "Prompting Gemini for a 30-Day Local Marketing Calendar",
        "start": "00:56",
        "end": "02:40",
        "suggestedOutputFilename": "gemini-30-day-content-calendar-prompt.mp4",
        "priority": "High",
        "whyItMatters": "This is a high-value, practical \"how-to\" for immediate implementation."
      },
      {
        "segmentId": "ai-training-2026-04-14-04",
        "clipTitle": "Setting Up Your Market-Specific NotebookLM",
        "start": "03:52",
        "end": "04:32",
        "suggestedOutputFilename": "notebooklm-setup-market-research.mp4",
        "priority": "High",
        "whyItMatters": "Briefly demonstrates the simplicity of adding local context to an AI research tool."
      },
      {
        "segmentId": "ai-training-2026-04-14-05",
        "clipTitle": "Automatically Organizing Lender Guides in Google Drive",
        "start": "04:33",
        "end": "07:12",
        "suggestedOutputFilename": "gmail-automation-lender-guides-drive.mp4",
        "priority": "High",
        "whyItMatters": "Directly solves a common administrative pain point for loan officers."
      },
      {
        "segmentId": "ai-training-2026-04-14-08",
        "clipTitle": "Why You Must Review AI-Generated Content",
        "start": "09:26",
        "end": "12:02",
        "suggestedOutputFilename": "ai-content-review-and-guardrails.mp4",
        "priority": "High",
        "whyItMatters": "Crucial for compliance and ensuring the quality of the LO's professional brand."
      }
    ],
    "clipsToAvoidOrMerge": [
      "Segment 10:00 - 11:20: Jeremy's attempt to use AI to generate a specific image with a header fails significantly. This can be skipped or used as a \"blooper\" to show AI limitations.",
      "Segment 14:10 - 15:00: Technical discussion about internet speeds and recording methods can be cut."
    ],
    "suggestedMicroLessonTitles": [
      "Prompting Gemini for a 30-Day Local Marketing Calendar",
      "Setting Up Your Market-Specific NotebookLM",
      "Automatically Organizing Lender Guides in Google Drive",
      "Why You Must Review AI-Generated Content"
    ]
  },
  {
    "id": "ai-training-2026-04-28",
    "title": "AI Training - 2026/04/28 14:51 PDT - Recording",
    "sourceVideoFileName": "AI Training - 2026_04_28 14_51 PDT - Recording.mp4",
    "duplicateSourceVideoFileNames": [],
    "date": "2026-04-28",
    "duration": "01:09:18",
    "speaker": "Jeremy McDonald",
    "topic": "Creating custom ChatGPT tools for loan officers and real estate partners.",
    "recommendedUse": "Custom GPT, AI Twin, and pipeline productivity module.",
    "category": "Custom GPTs + AI Twin",
    "status": "Ready for Editing Queue",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_48_49 PM UTC-4.md",
    "duplicateMarkdownFiles": [],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_04_28 14_51 PDT - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_48_49 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload",
    "tags": [
      "Custom GPTs",
      "AI Twin",
      "Gmail",
      "NotebookLM",
      "Sheets tracker"
    ],
    "segments": [
      {
        "id": "ai-training-2026-04-28-01",
        "title": "Introduction to Custom GPTs for Loan Officers",
        "start": "00:00",
        "end": "01:42",
        "duration": "01:42",
        "clipType": "Recap",
        "whatJeremyCovers": "Where to find recorded trainings in the Loan Factory marketplace and an overview of the two internal AI tools he built for the team: the Loan Factory AI Trainer and the Tech Tools Assistant.",
        "whatAppearsOnScreen": "Loan Factory Marketplace interface, \"Events\" section.",
        "bestStandaloneClipTitle": "Where to Find Loan Factory AI Training Recordings",
        "suggestedClipFilename": "loan-factory-training-location-intro.mp4",
        "keep": true,
        "reason": "Useful for onboarding new users to the training ecosystem."
      },
      {
        "id": "ai-training-2026-04-28-02",
        "title": "The 4 Custom GPTs for Marketing and Referrals",
        "start": "01:43",
        "end": "03:51",
        "duration": "02:08",
        "clipType": "Explanation",
        "whatJeremyCovers": "Introduction to four custom GPTs: the Loan Officer AI Twin, the Realtor AI Twin Generator, the Real Estate Marketing Pro, and the Listing Visual GPT Builder. He explains how these tools help stay top-of-mind with partners.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "4 Custom AI Tools for Growing Your Mortgage Business",
        "suggestedClipFilename": "custom-gpt-marketing-suite-overview.mp4",
        "keep": true,
        "reason": "High-level value proposition for the entire training."
      },
      {
        "id": "ai-training-2026-04-28-03",
        "title": "Critical Tip for Social Media Links",
        "start": "03:52",
        "end": "04:26",
        "duration": "00:34",
        "clipType": "Warning / guardrail",
        "whatJeremyCovers": "Why you should never put outside links in the description of a social media post and should instead put them in the comments to avoid platform reach reduction.",
        "whatAppearsOnScreen": "Jeremy speaking.",
        "bestStandaloneClipTitle": "Social Link Placement Guardrail for Better Reach",
        "suggestedClipFilename": "social-link-placement-guardrail.mp4",
        "keep": true,
        "reason": "Essential practical advice for marketing compliance and effectiveness."
      },
      {
        "id": "ai-training-2026-04-28-04",
        "title": "Step-by-Step: Building the Loan Officer AI Twin",
        "start": "07:37",
        "end": "08:43",
        "duration": "01:06",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Detailed walkthrough of configuring a borrower education assistant draft, including knowledge files, contact info, and shareable assistant setup.",
        "whatAppearsOnScreen": "Pre-recorded walkthrough showing the ChatGPT configuration screen.",
        "bestStandaloneClipTitle": "How to Build Your Public Loan Officer AI Twin",
        "suggestedClipFilename": "build-loan-officer-ai-twin-step-by-step.mp4",
        "keep": true,
        "reason": "Core tutorial content."
      },
      {
        "id": "ai-training-2026-04-28-05",
        "title": "Why Use ChatGPT Over Gemini for Business Growth?",
        "start": "14:38",
        "end": "16:10",
        "duration": "01:32",
        "clipType": "Explanation",
        "whatJeremyCovers": "Explanation of when to use ChatGPT for shareable assistant concepts and Gemini for internal Google ecosystem tasks.",
        "whatAppearsOnScreen": "ChatGPT interface.",
        "bestStandaloneClipTitle": "ChatGPT vs. Gemini: Which Should a Loan Officer Use?",
        "suggestedClipFilename": "chatgpt-vs-gemini-for-mortgage-business.mp4",
        "keep": true,
        "reason": "Clears up common confusion about which AI platform to use and why."
      },
      {
        "id": "ai-training-2026-04-28-06",
        "title": "Customizing a Gemini Gem AI Twin",
        "start": "18:22",
        "end": "19:47",
        "duration": "01:25",
        "clipType": "Demo",
        "whatJeremyCovers": "How to use the microphone feature to \"interview\" yourself to feed data into a Gemini Gem so it learns your voice and brand.",
        "whatAppearsOnScreen": "Google Gemini \"Gems\" interface.",
        "bestStandaloneClipTitle": "Personalizing Your Gemini Twin via Voice Interview",
        "suggestedClipFilename": "personalize-gemini-gem-voice-setup.mp4",
        "keep": true,
        "reason": "Great practical tip for making the AI sound authentic."
      },
      {
        "id": "ai-training-2026-04-28-07",
        "title": "Using Gemini to Sort Daily Emails",
        "start": "19:48",
        "end": "20:47",
        "duration": "00:59",
        "clipType": "Demo",
        "whatJeremyCovers": "Using the @Gmail extension in Gemini to categorize and summarize the last 24 hours of emails.",
        "whatAppearsOnScreen": "Gemini interface with the @Gmail prompt.",
        "bestStandaloneClipTitle": "Automate Your Inbox: Categorizing Emails with Gemini",
        "suggestedClipFilename": "gemini-gmail-inbox-organization.mp4",
        "keep": true,
        "reason": "Immediate productivity win for busy loan officers."
      },
      {
        "id": "ai-training-2026-04-28-08",
        "title": "Using NotebookLM for Pipeline Management",
        "start": "42:33",
        "end": "47:21",
        "duration": "04:48",
        "clipType": "Setup step",
        "whatJeremyCovers": "A workaround for lack of \"projects\" in standard Gemini by using NotebookLM to create individual customer knowledge bases.",
        "whatAppearsOnScreen": "NotebookLM interface.",
        "bestStandaloneClipTitle": "Organizing Loan Pipelines with NotebookLM",
        "suggestedClipFilename": "notebooklm-mortgage-pipeline-organization.mp4",
        "keep": true,
        "reason": "Advanced but highly useful workflow for managing multiple complex files."
      },
      {
        "id": "ai-training-2026-04-28-09",
        "title": "Generating a Pipeline Tracker in Google Sheets",
        "start": "47:22",
        "end": "51:30",
        "duration": "04:08",
        "clipType": "Demo",
        "whatJeremyCovers": "Using Gemini prompts to automatically build and update a Google Sheets pipeline tracker directly from the sidebar.",
        "whatAppearsOnScreen": "Google Sheets with the Gemini sidebar open.",
        "bestStandaloneClipTitle": "Build a Custom Loan Tracker with Gemini and Google Sheets",
        "suggestedClipFilename": "gemini-google-sheets-pipeline-tracker.mp4",
        "keep": true,
        "reason": "Shows the power of Google Workspace integration."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-04-28-02",
        "clipTitle": "4 Custom AI Tools for Growing Your Mortgage Business",
        "start": "01:43",
        "end": "03:51",
        "suggestedOutputFilename": "custom-gpt-marketing-suite-overview.mp4",
        "priority": "High",
        "whyItMatters": "High-level value proposition for the entire training."
      },
      {
        "segmentId": "ai-training-2026-04-28-04",
        "clipTitle": "How to Build Your Public Loan Officer AI Twin",
        "start": "07:37",
        "end": "08:43",
        "suggestedOutputFilename": "build-loan-officer-ai-twin-step-by-step.mp4",
        "priority": "High",
        "whyItMatters": "Core tutorial content."
      },
      {
        "segmentId": "ai-training-2026-04-28-08",
        "clipTitle": "Organizing Loan Pipelines with NotebookLM",
        "start": "42:33",
        "end": "47:21",
        "suggestedOutputFilename": "notebooklm-mortgage-pipeline-organization.mp4",
        "priority": "High",
        "whyItMatters": "Advanced but highly useful workflow for managing multiple complex files."
      },
      {
        "segmentId": "ai-training-2026-04-28-09",
        "clipTitle": "Build a Custom Loan Tracker with Gemini and Google Sheets",
        "start": "47:22",
        "end": "51:30",
        "suggestedOutputFilename": "gemini-google-sheets-pipeline-tracker.mp4",
        "priority": "High",
        "whyItMatters": "Shows the power of Google Workspace integration."
      }
    ],
    "clipsToAvoidOrMerge": [
      "\\[05:30 - 06:15\\] - Setup delay while Jeremy pulls up the video walkthrough. Cut this filler.",
      "\\[11:45 - 12:40\\] - Repeated explanation of the internal trainer; merge with the demo at 12:41.",
      "\\[48:15 - 49:44\\] - Long pause while waiting for Google Sheets to generate. This should be edited down for time."
    ],
    "suggestedMicroLessonTitles": [
      "4 Custom AI Tools for Growing Your Mortgage Business",
      "How to Build Your Public Loan Officer AI Twin",
      "ChatGPT vs. Gemini for Mortgage Business Growth",
      "Organizing Loan Pipelines with NotebookLM",
      "Build a Custom Loan Tracker with Gemini and Google Sheets"
    ]
  },
  {
    "id": "ai-training-2026-05-12",
    "title": "AI Training - 2026/05/12 14:50 PDT - Recording",
    "sourceVideoFileName": "AI Training - 2026_05_12 14_50 PDT - Recording.mp4",
    "duplicateSourceVideoFileNames": [
      "AI Training - 2026_05_12 14_50 PDT - Recording (1).mp4",
      "AI Training - 2026_05_12 14_50 PDT - Recording (2).mp4",
      "AI Training - 2026_05_12 14_50 PDT - Recording.mp4"
    ],
    "date": "2026-05-12",
    "duration": "02:01:52",
    "speaker": "Jeremy McDonald",
    "topic": "Google Business Profile setup, Gemini AI Twin for content creation, and Real Estate Agent marketing strategies.",
    "recommendedUse": "Google Business Profile and Realtor marketing workflow.",
    "category": "Google Business Profile + Realtor Marketing",
    "status": "Source Markdown Ready",
    "sourceMarkdownFile": "Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md",
    "duplicateMarkdownFiles": [
      "Gemini Export May 22, 2026 at 2_50_48 PM UTC-4.md"
    ],
    "sourceVideoLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/AI Training - 2026_05_12 14_50 PDT - Recording.mp4",
    "sourceMarkdownLocalPath": "/Volumes/LegendsOS/Jeremy's_2026_Master_Build_Folder/Loan Factory AI Training Videos/Gemini Export May 22, 2026 at 2_50_07 PM UTC-4.md",
    "driveStatus": "Needs Drive Upload; duplicate local MP4 copies need review",
    "tags": [
      "Google Business Profile",
      "local SEO",
      "Gemini AI Twin",
      "realtor marketing",
      "Model Match"
    ],
    "segments": [
      {
        "id": "ai-training-2026-05-12-01",
        "title": "Introduction to Local SEO and Marketing Strategy",
        "start": "00:00",
        "end": "03:04",
        "duration": "03:04",
        "clipType": "Recap / Explanation",
        "whatJeremyCovers": "The importance of Google Business Profiles for local SEO and buyer visibility. He previews compliant promotional content and weekly realtor newsletters.",
        "whatAppearsOnScreen": "Speaker video only.",
        "bestStandaloneClipTitle": "Why Every LO Needs a Google Business Profile",
        "suggestedClipFilename": "google-business-profile-seo-intro.mp4",
        "keep": true,
        "reason": "Sets the strategic foundation for the entire training."
      },
      {
        "id": "ai-training-2026-05-12-02",
        "title": "Compliance: Marketing Guardrails for Promotional Claims",
        "start": "03:14",
        "end": "04:18",
        "duration": "01:04",
        "clipType": "Warning / Guardrail",
        "whatJeremyCovers": "Compliance-sensitive marketing phrases to review before using promotional content. Use as an internal guardrail clip only.",
        "whatAppearsOnScreen": "Compliance checklist/bullet points on a presentation slide.",
        "bestStandaloneClipTitle": "Marketing Compliance Guardrails for Promotional Claims",
        "suggestedClipFilename": "marketing-compliance-promotional-claims-guardrails.mp4",
        "keep": true,
        "reason": "Essential legal and financial protection for loan officers."
      },
      {
        "id": "ai-training-2026-05-12-03",
        "title": "Setting Up Your Google Business Profile",
        "start": "04:19",
        "end": "12:00",
        "duration": "07:41",
        "clipType": "Tutorial / Setup Step",
        "whatJeremyCovers": "Step-by-step walkthrough of creating a Google Business Profile specifically for remote loan officers. He emphasizes selecting \"service area business\" instead of a physical location and demonstrates how to handle verification through a workstation video.",
        "whatAppearsOnScreen": "Google Business Profile setup wizard, mailing address forms, and service area selection.",
        "bestStandaloneClipTitle": "How to Set Up Google Business Profile as a Remote LO",
        "suggestedClipFilename": "google-business-profile-setup-walkthrough.mp4",
        "keep": true,
        "reason": "Core technical training component."
      },
      {
        "id": "ai-training-2026-05-12-04",
        "title": "Strategic Q&A: Handling Multiple State Licenses",
        "start": "13:06",
        "end": "15:13",
        "duration": "02:07",
        "clipType": "Explanation",
        "whatJeremyCovers": "Addressing how to use Google Business Profiles when licensed in multiple states. He advises creating multiple profiles for local relevance rather than one broad profile that targets an entire state.",
        "whatAppearsOnScreen": "Speaker video and participant list.",
        "bestStandaloneClipTitle": "Managing Google Profiles for Multiple States",
        "suggestedClipFilename": "multi-state-license-google-strategy.mp4",
        "keep": true,
        "reason": "Common pain point for multi-state licensed originators."
      },
      {
        "id": "ai-training-2026-05-12-05",
        "title": "Creating Content with Your Gemini AI Twin",
        "start": "25:32",
        "end": "33:04",
        "duration": "07:32",
        "clipType": "Demo / Tutorial",
        "whatJeremyCovers": "Using a custom Gemini Gem to draft localized marketing content for human review before posting anywhere.",
        "whatAppearsOnScreen": "Gemini interface, custom \"Gems\" menu, Google Business \"Add Update\" screen, and Facebook feed.",
        "bestStandaloneClipTitle": "Draft Google Business Profile Content with Gemini AI",
        "suggestedClipFilename": "gemini-google-business-profile-content-draft.mp4",
        "keep": true,
        "reason": "High-value practical application of AI tools."
      },
      {
        "id": "ai-training-2026-05-12-06",
        "title": "Review Growth Strategy: The Review Link Swap",
        "start": "29:03",
        "end": "30:52",
        "duration": "01:49",
        "clipType": "Strategy / CTA",
        "whatJeremyCovers": "A tactical method to jumpstart reviews by sharing Google Review links among colleagues and asking real estate agents for feedback post-application, rather than waiting for closing.",
        "whatAppearsOnScreen": "Google Business Profile \"Ask for reviews\" link generator.",
        "bestStandaloneClipTitle": "How to Get More Google Reviews Faster",
        "suggestedClipFilename": "google-review-growth-strategy.mp4",
        "keep": true,
        "reason": "Immediately actionable growth hack for new profiles."
      },
      {
        "id": "ai-training-2026-05-12-07",
        "title": "Model Match: Affordable Realtor Data Export",
        "start": "35:21",
        "end": "38:25 (approximate)",
        "duration": "03:04",
        "clipType": "Demo / Setup step",
        "whatJeremyCovers": "Introduction to Model Match as a cost-effective alternative to MMI or Restr for finding realtor data. He shows how to search by production volume and export up to 5,000 agent contacts at once.",
        "whatAppearsOnScreen": "Model Match website, realtor search filters, and export button.",
        "bestStandaloneClipTitle": "Finding 5,000 Realtor Partners with Model Match",
        "suggestedClipFilename": "model-match-realtor-data-export.mp4",
        "keep": true,
        "reason": "Shows the \"where\" for getting the target audience for the newsletters."
      },
      {
        "id": "ai-training-2026-05-12-08",
        "title": "Executing the Realtor Newsletter Workflow",
        "start": "38:48",
        "end": "45:13",
        "duration": "06:25",
        "clipType": "Tutorial",
        "whatJeremyCovers": "Importing agent lists into the Loan Factory marketing system and using Gemini to draft high-converting newsletters. He explains the daily limit of 2,000 emails and the importance of testing through a \"test contact\" folder.",
        "whatAppearsOnScreen": "Loan Factory Dashboard (Marketing \\> Contact List), Gemini prompt for newsletter drafting, and Email Preview screen.",
        "bestStandaloneClipTitle": "Sending High-Volume Realtor Newsletters",
        "suggestedClipFilename": "realtor-newsletter-marketing-workflow.mp4",
        "keep": true,
        "reason": "Completes the end-to-end marketing cycle shown in the video."
      }
    ],
    "bestClipsToCutFirst": [
      {
        "segmentId": "ai-training-2026-05-12-01",
        "clipTitle": "Why Every LO Needs a Google Business Profile",
        "start": "00:00",
        "end": "03:04",
        "suggestedOutputFilename": "google-business-profile-seo-intro.mp4",
        "priority": "High",
        "whyItMatters": "Sets the strategic foundation for the entire training."
      },
      {
        "segmentId": "ai-training-2026-05-12-03",
        "clipTitle": "How to Set Up Google Business Profile as a Remote LO",
        "start": "04:19",
        "end": "12:00",
        "suggestedOutputFilename": "google-business-profile-setup-walkthrough.mp4",
        "priority": "High",
        "whyItMatters": "Core technical training component."
      },
      {
        "segmentId": "ai-training-2026-05-12-04",
        "clipTitle": "Managing Google Profiles for Multiple States",
        "start": "13:06",
        "end": "15:13",
        "suggestedOutputFilename": "multi-state-license-google-strategy.mp4",
        "priority": "High",
        "whyItMatters": "Common pain point for multi-state licensed originators."
      }
    ],
    "clipsToAvoidOrMerge": [
      "12:00 to 13:00: Brief dead air/transition while switching videos; should be cut.",
      "15:13 to 25:31: Extended Q&A on specific individual setup issues (rejected videos, specific address bugs); useful for raw viewing but too fragmented for a standalone micro-lesson.",
      "50:00 to 54:00: Debate regarding specific state (NJ) profile display issues; too localized and potentially confusing for a general audience.",
      "01:12:00 to end: General Q&A covering personal real estate flipping, Wi-Fi issues, and general career advice; merge into a single \"Community Q&A\" block or omit."
    ],
    "suggestedMicroLessonTitles": [
      "Why Every LO Needs a Google Business Profile",
      "How to Set Up Google Business Profile as a Remote LO",
      "Managing Google Profiles for Multiple States",
      "Drafting Google Business Profile Content with Gemini AI",
      "Finding Realtor Partners with Model Match"
    ]
  }
] satisfies AiTrainingVideo[];

export const aiTrainingMicroLessonQueue = aiTrainingVideos
  .flatMap((video) =>
    video.bestClipsToCutFirst.map((clip, index) => ({
      ...clip,
      id: `${video.id}-${clip.segmentId}`,
      sourceVideoId: video.id,
      sourceVideoTitle: video.title,
      sourceVideoFileName: video.sourceVideoFileName,
      category: video.category,
      date: video.date,
      status: index < 2 ? "Cut first" : "Queued",
    })),
  )
  .slice(0, 24);

export function getAiTrainingVideo(id: string) {
  return aiTrainingVideos.find((video) => video.id === id);
}
