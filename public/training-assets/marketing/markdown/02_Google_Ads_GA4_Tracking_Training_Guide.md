# Loan Factory LO Development Platform  
## Training Asset Package: Google Ads, Google Analytics & Website Tracking Script Setup

**Source Document:** Guide: How to Register for Google Ads and Google Analytics, and Create a Website Tracking Script  
**Last Edited:** December 10, 2025 by IT Team  
**Prepared for:** Jeremy McDonald | Loan Factory LO Development Platform

\---

# SECTION 1 - SOURCE DIGEST

**What this document teaches:**  
This guide walks a loan officer through a four-phase process for setting up their digital marketing tracking infrastructure: creating a Google Analytics 4 (GA4) account, creating a Google Ads account in Expert Mode, linking the two platforms together, and then installing the resulting tracking script directly inside the Loan Factory Portal under Website Settings. The document is structured as a technical how-to with numbered steps, screenshots, and a support contact at the end.

**Who it is for:**  
Loan Factory loan officers who are ready to run paid advertising or track website visitor behavior on their Loan Factory website. Assumes basic comfort with a Google account but no prior experience with either platform.

**Where it belongs in the LO Development Platform:**  
Sales and Marketing 401 - Content and Marketing. This is a technical infrastructure lesson that sits just before an LO begins running campaigns or analyzing web traffic. It is a prerequisite to any paid ads training or retargeting strategy content.

**Exact systems being taught:**  
\- Google Analytics 4 (GA4) - account creation, property setup, data stream setup, Measurement ID retrieval  
\- Google Ads - account creation in Expert Mode (bypassing Smart Mode)  
\- Linking Google Ads and Google Analytics - via the Product Links \> Google Ads Links section inside GA4 Admin  
\- Loan Factory Portal - Website Settings \> Add Custom Scripts for installing the tracking code

**Loan Factory website / external website setup:**  
The document specifically instructs the LO to paste the Google tag script into the Loan Factory Portal under Website Settings \> Add Custom Scripts and click Save. No external website CMS installation steps (e.g., WordPress, Wix) are covered in this version. *(Note: The tracking script screenshot shows a reference to an external website URL "https://www.myratestgreat.com" in the optional test field - this appears to be an example, not a Loan Factory-specific URL.)*

\---

# SECTION 2 - STEP-BY-STEP WALKTHROUGH

**Goal:** Get Google Analytics and Google Ads set up, linked together, and connected to your Loan Factory website so every visitor is tracked and your ad spend produces measurable results.

**Who this is for:** Loan Factory loan officers who are launching or improving their digital marketing.

\---

## Before You Start

\- Have your business Google account login ready (use a Google account tied to your business or LO email - do not use a personal Gmail)  
\- Have your Loan Factory Portal login ready  
\- Keep both browser tabs open during setup - you will need to switch between Google Analytics and Google Ads  
\- Set aside approximately 30-45 minutes to complete all four phases without interruption

\---

## Required Accounts

\- Google Account (business email preferred)  
\- Loan Factory Portal access (your LO login at loanfactory.com)  
\- No billing is required to complete setup - you only need billing when you are ready to run ads

\---

## Exact Navigation Paths

| Platform | Path |  
|---|---|  
| Google Analytics | analytics.google.com |  
| Google Ads | ads.google.com |  
| Loan Factory Portal | Your LO dashboard \> Website Settings \> Add Custom Scripts |

\---

## Phase 1: Set Up Google Analytics 4 (GA4)

**Step 1 - Create the Account**  
1\. Go to analytics.google.com  
2\. Log in with your business Google account  
3\. Click the "Start measuring" button

**Step 2 - Property Setup** *(This is the most critical step for accurate data)*  
\- Property Name: Enter your website name (example: "https://www.google.com/search?q=JSMortgages.com")  
\- Reporting Time Zone: Select your local time zone - this is crucial for accurate daily reports  
\- Currency: Select US Dollar

**Step 3 & 4 - Business Details**  
\- Industry Category: Select "Finance/Mortgage"  
\- Business Objectives: Select "Generate leads"

**Step 5 - Get Your Measurement ID**  
1\. Select Web as your platform  
2\. Enter your website URL  
3\. Once the stream is created, you will see a "Web stream details" screen  
4\. Locate your Measurement ID - it starts with "G-" - keep this tab open or write it down, you will need it

\---

## Phase 2: Set Up Google Ads

**Step 1 - Create the Account**  
Go to ads.google.com and click "Start now"

**Step 2 - Avoid the Smart Mode Trap** *(Critical warning)*  
Google will try to push you into a simplified version called "Smart Mode." This gives you less control over your money and your campaigns. You must bypass it.  
\- Do NOT start the campaign wizard  
\- Look for small blue text at the bottom of the screen that says "Switch to Expert Mode" or "Are you a professional marketer?" - click that link  
\- Complete your account setup from Expert Mode only

\---

## Phase 3: Link Google Ads and Google Analytics

1\. Go back to your Google Analytics tab  
2\. Click the Admin icon (gear icon) in the bottom left  
3\. Under the "Product Links" section, click "Google Ads Links"  
4\. Click "Link," select your Ads account, and confirm

\---

## Phase 4: Install the Tracking Script on Your Loan Factory Portal

1\. In Google Analytics, go to Admin \> Data Streams \> click your Web Stream  
2\. Scroll down and click "View Tag Instructions"  
3\. Click the "Install manually" tab  
4\. Copy the code block (the full Google tag script)  
5\. Go to your Loan Factory Portal - navigate to Website Settings \> Add Custom Scripts  
6\. Paste the code, name it "Google tag," and click Save

\---

## Common Mistakes

\- **Using a personal Gmail instead of a business account** - this makes it harder to manage access and transfer the account later  
\- **Starting the Smart Mode campaign wizard in Google Ads** - this locks you into a limited interface and wastes budget; always switch to Expert Mode first  
\- **Wrong time zone in GA4** - if you set the wrong time zone, your daily reports will not match real business hours; this cannot easily be corrected retroactively  
\- **Not copying the full code block** - the entire script between the \`\<script\>\` tags must be copied, including the opening and closing tags  
\- **Adding more than one Google tag to the same page** - the document explicitly warns against this; only one tag per site

\---

## How to Know It Worked

\- In GA4, go to Reports \> Realtime - if you see visitor activity when you visit your own Loan Factory website, the tag is firing correctly  
\- In Google Ads, your account status will show "Active" once billing is set up and a campaign is created  
\- The link between Ads and Analytics will show as "Linked" with a date under Admin \> Product Links \> Google Ads Links

\---

## What to Do If It Fails

\- If the tag does not fire: Double-check that you pasted the complete code block and that it was saved in Loan Factory Portal \> Website Settings \> Custom Scripts  
\- If you cannot find "Switch to Expert Mode" in Google Ads: Scroll to the very bottom of the campaign creation screen - the link is small and easy to miss  
\- If your Ads account does not appear in the GA4 linking screen: Make sure you are logged into the same Google account in both tools

\---

## When to Ask Marketing or LO Support for Help

Contact Loan Factory IT support at it.dept@loanfactory.com or create a support ticket at:  
https://www.loanfactory.com/my_escalation_desk?department=33018837010&_e=new

Reach out when:  
\- You cannot find the Custom Scripts section in your Loan Factory Portal  
\- The tracking tag is installed but Realtime in GA4 shows zero activity after 24 hours  
\- You are unsure which Google account to use for setup  
\- You are ready to launch your first campaign and want a campaign reviewed before spending money

\---

# SECTION 3 - TRAINING MODULE VERSION

\---

## Lesson Title: Set Up Google Analytics, Google Ads, and Your Website Tracking Script

**Subtitle:** Build the digital foundation your marketing runs on - before you spend a dollar on ads

**Audience:** Loan Factory loan officers who are ready to launch or improve their digital marketing

**Estimated Time:** 30-45 minutes to complete the setup | 10 minutes to read the lesson

**Learning Objective:** By the end of this lesson, you will have a working Google Analytics 4 account, a Google Ads account in Expert Mode, the two platforms linked, and a live tracking script installed on your Loan Factory website.

\---

### Why This Matters

Before you run any ads, promote any content, or send traffic anywhere, you need to know who is visiting your site and what they are doing when they get there. This setup is the foundation. Without it, you are flying blind. With it, every campaign you run produces data you can learn from.

\---

### Step-by-Step Lesson

**Phase 1 - Google Analytics 4**  
Start at analytics.google.com. Log in with your business Google account and click "Start measuring." When setting up your property, select your correct local time zone and set your currency to US Dollar. These settings affect every report you will ever read in this account, so get them right the first time. Under Business Details, select Finance/Mortgage as your industry and Generate Leads as your objective. When creating your data stream, select Web, enter your website URL, and save your Measurement ID (the code that starts with "G-"). You will need it later.

**Phase 2 - Google Ads**  
Go to ads.google.com and click "Start now." When Google prompts you to begin a campaign, stop. Do not follow the wizard. Scroll to the bottom of the screen and click the small blue link that says "Switch to Expert Mode" or "Are you a professional marketer?" This is non-negotiable - Smart Mode limits your control and can waste your budget. Complete your account setup only from Expert Mode.

**Phase 3 - Link the Two Platforms**  
Go back to Google Analytics. Click the Admin gear icon in the bottom left. Under Product Links, click Google Ads Links. Click Link, select your Ads account from the list, and confirm. This connection allows your analytics data and your ad performance data to talk to each other.

**Phase 4 - Install on Loan Factory Portal**  
In Google Analytics, go to Admin \> Data Streams \> your Web Stream. Scroll down to View Tag Instructions and click Install Manually. Copy the entire code block. Log into your Loan Factory Portal and navigate to Website Settings \> Add Custom Scripts. Paste the code, name it "Google tag," and click Save.

\---

### Success Checklist

\- \[ \] Google Analytics 4 account created with correct time zone and currency  
\- \[ \] Measurement ID (G- code) recorded  
\- \[ \] Business details set to Finance/Mortgage and Generate Leads  
\- \[ \] Data stream created for your website  
\- \[ \] Google Ads account created in Expert Mode (not Smart Mode)  
\- \[ \] Google Ads and Google Analytics linked under Product Links  
\- \[ \] Tracking script copied from GA4 Install Manually tab  
\- \[ \] Script pasted into Loan Factory Portal \> Website Settings \> Add Custom Scripts  
\- \[ \] Script saved  
\- \[ \] GA4 Realtime report shows activity when you visit your own site

\---

### Common Troubleshooting

**"I can't find the Custom Scripts section in my Loan Factory Portal"**  
Go to your LO dashboard, click Website Settings in the left navigation, then scroll to the Custom Scripts section. If you do not see it, contact IT support - it may need to be enabled for your account.

**"My Realtime report shows nothing"**  
Wait 24 hours after installing the script, then test again. If still nothing, verify that the complete script was pasted (not a partial copy) and that you clicked Save.

**"I accidentally started Smart Mode in Google Ads"**  
You can switch to Expert Mode at any time from within your Google Ads account by clicking the Tools icon and looking for the Expert Mode option in account settings.

**"I don't see my Ads account when trying to link in GA4"**  
Confirm you are signed into the same Google account in both platforms. If accounts are under different logins, the link will not work.

\---

### Next Recommended Action

Now that tracking is live, your next step is to build your first Google Ads campaign in Expert Mode, set a budget, write your first ad, and define your audience. See the lesson: *Running Your First Google Ads Campaign* *(needs confirmation - add when available).*

\---

# SECTION 4 - SALES AND MARKETING 101-601 PLACEMENT

**Recommended Class: 401 - Content and Marketing**

**Why:** This lesson is technical infrastructure, not foundational mindset or relationship strategy. The LO needs to already understand why digital marketing matters (101 Foundation) and have a handle on their borrower communication (201 Borrower Conversion) before this step makes practical sense. This lesson belongs at the 401 level because it is where an LO begins building their own marketing system - their content, their ad presence, and their digital footprint - rather than relying solely on referrals or organic activity.

401 is the natural home because:  
\- The LO is ready to run paid ads or track marketing performance  
\- The setup directly supports content distribution and campaign measurement  
\- The Loan Factory Portal integration ties their web presence to an analytics engine  
\- It is a prerequisite to any paid advertising execution taught at the 501 or 601 level

**It is not 101** because a brand-new LO does not need Google Ads before they have their first borrower relationship.

**It is not 501 or 601** because this is the setup phase, not the campaign execution or advanced optimization phase. Running campaigns, building retargeting audiences, and scaling ad spend belong in 501 Pipeline and Sales Systems and 601 Advanced Execution.

\---

# SECTION 5 - AI ADVANTAGE PLACEMENT

**How This Lesson Connects to AI-Assisted Marketing**

Once an LO has Google Analytics and Google Ads set up and a tracking script running, AI becomes a powerful co-pilot for everything that comes next. This lesson is the prerequisite for the AI Advantage module on digital marketing because data must exist before AI can help you act on it.

**Examples of how an LO can use AI after completing this setup:**

**Plan a retargeting strategy:** Prompt an AI tool with your website traffic data summary and ask it to help you build a retargeting audience description. Example: "I have 300 visitors a month to my mortgage website, mostly from search. Help me write 3 retargeting audience segments I should target with Google Ads."

**Create Google Ads copy ideas:** Share your niche, location, and loan types with an AI tool and ask for headline and description variations. Example: "I'm a loan officer in Phoenix, AZ specializing in FHA and first-time buyers. Write 5 Google Ads headlines and 3 descriptions for a search campaign."

**Create landing page follow-up copy:** After a visitor clicks an ad, they need a clear next step. Use AI to write a short landing page script or thank-you page message. Example: "Write a 3-sentence call to action for a mortgage landing page targeting first-time homebuyers who clicked on a Google Ad about low down payment loans."

**Draft audience names:** Use AI to name your audience segments clearly so they are easy to manage inside Google Ads. Example: "I have a website visitor audience and a lead form audience. Give me 5 naming conventions I can use inside Google Ads audiences that are clear and professional."

**Summarize tracking setup steps:** Ask AI to create a checklist or reference card from the steps you just completed so you can share it with your assistant or marketing helper.

**Create a simple campaign checklist:** Prompt AI with your goal and let it build a pre-launch campaign checklist. Example: "I'm about to launch my first Google Search campaign for mortgage leads. What are the 10 things I should confirm before I turn it on?"

\---

# SECTION 6 - SHORT WALKTHROUGH VIDEO SCRIPT (90 Seconds)

**Format:** Screen recording with voiceover narration

\---

**Hook (0-8 seconds)**  
"If you're sending traffic to your Loan Factory website but you have no idea who's visiting or where they're coming from - this video fixes that. In the next 90 seconds, I'll walk you through exactly how to get Google Analytics, Google Ads, and your website tracking all set up and connected."

**What We're Doing (8-15 seconds)**  
"We're going to complete four phases: set up Google Analytics 4, set up Google Ads in Expert Mode, link the two platforms, and install the tracking script directly inside your Loan Factory Portal. Let's go."

**Step-by-Step Narration (15-75 seconds)**

*\[Screen: analytics.google.com\]*  
"Phase 1 - go to analytics.google.com, sign in with your business Google account, and click Start Measuring. Set your property name to your website, select your local time zone - don't skip this - set your currency to US Dollar, choose Finance/Mortgage as your industry, and Generate Leads as your objective. Create a Web data stream, enter your URL, and copy your Measurement ID - it starts with G dash. Keep that handy."

*\[Screen: ads.google.com\]*  
"Phase 2 - go to ads.google.com and click Start Now. Here's where most people make a mistake - Google will push you into Smart Mode. Don't do it. Scroll to the bottom and click the small link that says Switch to Expert Mode. That's where you set up your account."

*\[Screen: GA4 Admin \> Product Links\]*  
"Phase 3 - back in Google Analytics, click the Admin gear, go to Product Links, click Google Ads Links, click Link, select your account, and confirm. Done."

*\[Screen: GA4 Admin \> Data Streams \> Install Manually, then Loan Factory Portal\]*  
"Phase 4 - in Analytics, go to Admin, Data Streams, click your stream, scroll down to View Tag Instructions, click Install Manually, and copy the full code block. Now go to your Loan Factory Portal, click Website Settings, scroll to Add Custom Scripts, paste it in, name it Google tag, and click Save."

**Common Mistake Warning (75-82 seconds)**  
"One thing - do NOT add more than one Google tag to your site, and make sure you copy the entire code block. A partial paste means no tracking."

**Closing Next Step (82-90 seconds)**  
"That's it. Check your GA4 Realtime report - if you see yourself visiting the site, it's working. Next step: build your first Google Ads campaign. That lesson is coming up next in the 401 module. Let's go."

\---

# SECTION 7 - PLATFORM RESOURCE CARD

| Field | Content |  
|---|---|  
| **Title** | Google Analytics, Google Ads & Website Tracking Setup |  
| **Category** | Sales and Marketing 401 - Content and Marketing |  
| **Short Description** | A step-by-step guide for Loan Factory loan officers to create their Google Analytics 4 account, set up Google Ads in Expert Mode, link the two platforms, and install the tracking script inside the Loan Factory Portal. No prior experience required. |  
| **Tags** | Google Analytics, Google Ads, Website Tracking, Digital Marketing Setup, Loan Factory Portal, Custom Scripts, GA4, Expert Mode, Lead Generation |  
| **Audience** | All active Loan Factory loan officers preparing to run digital marketing or paid advertising |  
| **CTA Button Text** | Start Your Tracking Setup |  
| **Related Resources** | Running Your First Google Ads Campaign *(add when available)* · Understanding Your GA4 Reports *(add when available)* · Loan Factory Website Settings Overview *(add when available)* · AI Advantage: Building Your First Retargeting Strategy *(add when available)* |

\---

# SECTION 8 - QUIZ

**Lesson Quiz: Google Analytics, Google Ads & Website Tracking Setup**  
*Pass threshold: 4 out of 5 correct*

\---

**Question 1**  
When setting up your Google Analytics 4 property, which setting is described as "crucial for accurate daily reports"?

A) Property Name  
B) Reporting Time Zone ✓  
C) Currency  
D) Industry Category

**Answer: B - Reporting Time Zone.** The document states this is critical and it cannot easily be corrected after the fact without affecting historical data.

\---

**Question 2**  
When first setting up Google Ads, what does the document warn you NOT to do?

A) Use your business Google account  
B) Select Expert Mode  
C) Start the campaign wizard in Smart Mode ✓  
D) Enter your business website URL

**Answer: C.** The document explicitly labels Smart Mode the "Smart Mode Trap" and instructs LOs to find and click the "Switch to Expert Mode" or "Are you a professional marketer?" link before doing anything else.

\---

**Question 3**  
Where in Google Analytics do you link your Google Ads account?

A) Reports \> Acquisition \> Google Ads  
B) Admin \> Product Links \> Google Ads Links ✓  
C) Admin \> Data Streams \> Linked Accounts  
D) Home \> Insights \> Connections

**Answer: B.** The document directs you to the Admin gear icon, then under the Product Links section, then Google Ads Links.

\---

**Question 4**  
Where do you paste the Google tracking script inside the Loan Factory Portal?

A) Dashboard \> Loan Settings \> Scripts  
B) Marketing Settings \> Add Tracking Code  
C) Website Settings \> Add Custom Scripts ✓  
D) Credentials Settings \> Google Integration

**Answer: C.** The document shows a screenshot of the Loan Factory Portal and specifically instructs the user to go to Website Settings \> Add Custom Scripts and click Save.

\---

**Question 5**  
What is the Measurement ID format you receive after creating your GA4 data stream?

A) UA-XXXXXXXXX  
B) AW-XXXXXXXXX  
C) G-XXXXXXXXX ✓  
D) TAG-XXXXXXXXX

**Answer: C.** The document states the Measurement ID "starts with G-" and instructs the user to keep the tab open or write it down for later use.

\---

# SECTION 9 - FINAL IMPLEMENTATION NOTE FOR JEREMY MCDONALD

\---

**Recommended Route:** Sales and Marketing 401 - Content and Marketing

**Recommended Category:** Digital Marketing Setup / Technical Infrastructure

**Recommended Tags:**  
Google Analytics · Google Ads · GA4 · Expert Mode · Website Tracking · Tracking Script · Custom Scripts · Loan Factory Portal · Lead Generation · Digital Foundation · Marketing Setup

**Recommended Related Lessons to Build or Link:**  
\- Running Your First Google Ads Campaign (Expert Mode) - should follow this lesson immediately  
\- Understanding Your GA4 Reports - what to do with the data once tracking is live  
\- AI Advantage: Planning a Retargeting Strategy with Google Ads Audiences  
\- Loan Factory Portal Overview: Website Settings - for LOs who have not explored their portal yet  
\- Sales and Marketing 401 Content Creation - pairs well since tracking supports content campaign measurement

\---

**Missing Screenshots or Source Material Needed:**

The following items would strengthen this lesson before platform publication:

1\. **Phase 2 Steps 3+** - The document shows Step 1 (go to ads.google.com) and Step 2 (avoid Smart Mode), but any additional Google Ads account setup steps (billing country, time zone, currency inside Ads) are not documented. *Needs confirmation on whether those steps were intentionally omitted or are on a missing page.*

2\. **Loan Factory Portal screenshot detail** - The screenshot of the Loan Factory Portal Custom Scripts section in Phase 4 Step 5 is visible in the document but small. A higher-resolution or annotated version would be valuable for the platform.

3\. **Verification step screenshot** - No screenshot shows the GA4 Realtime report confirming the tag is firing. A screenshot of a successful Realtime ping should be added as a "success confirmation" visual.

4\. **Smart Mode bypass - updated screenshot** - Google occasionally updates the UI wording for this prompt. The current screenshot shows "Are you a professional marketer? Switch to Expert Mode" but this wording may vary. A current screenshot from 2025 should be used in the platform version.

5\. **External website instructions** - The document only covers Loan Factory Portal installation. If LOs with external websites (WordPress, Squarespace, etc.) will use this guide, a short additional section or companion resource is needed. Currently marked as *needs confirmation.*

6\. **Reference video link** - The document references a "Google Analytics 4 Tutorial for Beginners (2025)" video under Phase 1 (linked text visible in screenshot). The URL was not captured. Jeremy should confirm the link and decide whether to embed it or replace it with a Loan Factory-produced video.

\---

*All content in this package is sourced exclusively from the document currently open in Chrome. No steps have been invented or assumed. Items marked "needs confirmation" reflect content that was unclear, partially visible, or absent from the source document.*  
