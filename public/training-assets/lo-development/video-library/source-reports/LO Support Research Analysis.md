# **Pain Points Q1: LO Support** 

## **Executive Summary**

The Loan Officer Support Department has completed a significant transition from a historically reactive helpdesk model to a highly disciplined, proactive performance-management and compliance-driven operational hub. Operational audits conducted during the first quarter of 2026 indicate that while the department successfully stabilized its core efficiency indicators—boasting an average ticket turnaround time of 0.43 hours in February and resolving 2,128 escalation tickets—it continues to face substantial pressure from repetitive technical, navigational, and process-related bottlenecks.  
These operational friction points are driven by complex system integration parameters across the proprietary TERA platform, Encompass, nCino n-Cryption frameworks, the Figure portal pipelines, and the newly integrated Zoom Phone Hotline. A rigorous review of internal escalations, emails, system feedback repositories, and daily performance logs shows that a high percentage of incoming support requests do not stem from outright system errors.1 Instead, they represent usability failures where the interface design and automated process gates fail to intuitively guide the Loan Officer to the next logical step.1  
To protect compliance margins, alleviate support specialist burnout, and optimize pipeline velocity, this report provides a comprehensive evaluation of recurring Loan Officer pain points, a root cause analysis, and a structured roadmap of quick-win, medium-priority, and long-term strategic recommendations.

## **Top Questions Asked by Loan Officers**

Loan Officer inquiries and complaints have been normalized and ranked according to their operational frequency and downstream impact on the pipeline. Many of these recurring inquiries center on regulatory compliance thresholds, licensing parameters, and administrative policies that directly affect individual transaction processing and commission calculations.

### **Triggered Applications and TRID Day 3 Compliance**

Under the Truth in Lending Act and Real Estate Settlement Procedures Act Integrated Disclosure rules, a loan application date is triggered immediately when a Loan Officer collects six specific pieces of consumer information: the borrower’s name, income, social security number, property address, estimated property value, and the loan amount.2 Support data indicates frequent confusion regarding the strict three-day TRID disclosure deadline once this threshold is crossed.2 Loan Officers regularly ask how to proceed if the borrower is not prepared to move forward immediately after a trigger occurs.2 The standard operational protocol dictates that the file must either be disclosed and put on hold, or withdrawn and cloned back into the prospect pipeline as a "Pre-Approval" to halt the compliance clock.2

### **State Licensing Rules and Employee Status**

A common structural inquiry relates to the mandatory classification differences between W2 employee status and 1099 independent contractor status.2 While Loan Officers are permitted to choose their status in select states, licensing guidelines mandate that any Loan Officer licensed in one or more of twelve specific states must operate strictly under W2 employment.2 These states include Georgia, Illinois, Maine, Maryland, Massachusetts, Mississippi, Montana, Nevada, New Jersey, North Carolina, Rhode Island, South Carolina, and Vermont.2 Mixed-status models are completely prohibited, meaning a single license in a W2-mandated state forces the individual’s entire licensing profile to W2 status, resulting in a transition to a bi-weekly commission pay cycle.2

### **Compensation Splits and Override Adjustments**

Field personnel frequently request clarification on commission structures and split adjustments.2 Standard splits are determined by production experience, with new hires receiving an 80% split.2 Experienced personnel receive a 100% split as 1099 contractors or a 90% split under W2 employment.2 These splits are calculated only after deducting a flat $595 administrative fee and a $500 processing fee.2 Furthermore, a company-wide commission cap of $20,000 applies to standard transactions, with overages subject to structured surcharges and requiring specific exceptions submitted through the "Lender Changes & Exceptions" department.2 Additionally, all corporate payments are issued strictly to individual names matching personal W-9 and banking details; payouts to corporate entities or LLCs are prohibited.2

### **Credit Pull Authorizations and Joint Reports**

Loan Officers regularly contact support to verify credit pull parameters and spouse linking requirements.2 Corporate policy does not require a formal signed credit authorization form; a text message or email screenshot confirming borrower consent is legally sufficient.2 However, system-level issues arise when pulling joint reports.2 Married couples can be pulled on a single joint report by checking the "Is the spouse of" box, whereas unmarried co-borrowers require separate applications and individual reports.2 All credit reports remain valid for exactly 120 days from the pull date.2

### **Pricing and Program Differences (LPC vs. BPC)**

Navigating Lender-Paid Compensation (LPC) versus Borrower-Paid Compensation (BPC) is a source of repeated inquiries.2 When LPC pricing proves too high to secure a deal, Loan Officers frequently ask how to transition to BPC to reduce consumer fees.2 Support staff must repeatedly clarify that BPC cannot exceed the lender’s corporate LPC percentage and must, at a minimum, cover the $1,095 corporate administrative fees.2 Furthermore, certain lenders completely restrict BPC variations, necessitating direct support intervention.2

### **Lead Assignment and Channel Notification Logic**

The support desk handles constant inquiries from Loan Officers trying to locate and secure company-provided leads.3 The operational logic governs assignments through two separate pathways.4 Inbound Company and Facebook leads are routed strictly via mobile application push notifications, which require high responsiveness to claim them.3 Conversely, pre-scrubbed Rocket leads are dispatched via direct email notifications.4 Loan Officers frequently mistake the communication channel, resulting in missed lead allocations.3

### **Minimum Production Compliance and Referral Credits**

Under corporate policy, Loan Officers must close a minimum of one transaction within six months of their onboarding date to maintain active sponsorship.6 Personnel frequently request that simple client referrals count toward this metric.6 However, guidelines confirm that standard referrals do not count.7 To receive a 0.5 loan credit toward minimum production requirements, the referring individual must be officially listed as the Additional Loan Officer on the file, which requires active participation in the file's setup and proper licensing in the state where the subject property is located.6

| Rank | Question Category | Normalized Loan Officer Query | Technical Cause / Trigger | Downstream Operational Impact |
| :---- | :---- | :---- | :---- | :---- |
| **1** | Triggered TRID Deadlines | "How do I pause a triggered loan if the buyer isn't ready to disclose?" | Collection of 6 pieces of borrower info under TRID.2 | Creates high compliance risk of missing 3-day disclosure windows.2 |
| **2** | State W2 Mandates | "Why can't I remain a 1099 contractor if I'm licensed in Illinois?" | Single state license in any of 12 mandated states.2 | Generates payroll setup errors and registration delays.2 |
| **3** | LPC vs. BPC Setup | "How do I transition a file from LPC to BPC to lower consumer fees?" | Need to reduce origination pricing to win competitive deals.2 | High support volume requesting manual fee structure modifications.2 |
| **4** | Joint Credit Pulls | "Why did my co-borrower credit pull fail to link properly?" | Failure to use "spouse of" box for unmarried co-borrowers.2 | Generates duplicate credit report fees and incorrect liabilities.2 |
| **5** | Lead Notifications | "Where are my Rocket leads? I am not receiving app notifications." | Split distribution logic between mobile app and email channels.4 | Leads to missed business opportunities and friction over distribution.3 |
| **6** | Production Credits | "Does referring a buyer to an in-house team count toward my 6-month minimum?" | Referral of client without ALO and state licensing matching.6 | Administrative overhead during quarterly deactivation reviews.6 |

## **Top Navigation Usability Issues**

Usability assessments conducted on the TERA platform and associated third-party origination portals identify several complex, manual, and non-intuitive navigation paths.1 These navigation hurdles frequently generate support requests due to a lack of visual cues and sequential wizard designs.1

### **eFolder Document Upload and Pair Mapping**

The document upload sequence inside the eFolder lacks direct visibility.1 To upload a file, the Loan Officer must first open the active transaction, scroll down a densely populated left-hand navigation pane to locate the "Documents" folder, and click a small, unlabeled plus sign (+) icon positioned on the far right of the interface.1 Once the upload popup window displays, the user is forced to manually select and map the uploaded document to the corresponding borrower pair using a column dropdown menu.1 The absence of automated matching or clear visual indicators results in mismatched document pairings and critical data entry errors.1

### **Services and Mortgage Insurance Allocation**

Routine ordering of private mortgage insurance requires a multi-tier navigation sequence that causes user fatigue and slow processing speeds.1 The user must navigate to the generic "Services" tab, select "Order Mortgage Insurance," navigate to a separate "All Providers" tab, perform a manual search to locate the specific MI vendor, and manually click "Add to My List".1 This fragmented structure forces the user to continuously toggle between multiple screens and tabs, lacking a consolidated single-screen execution model.1

### **Credit Reissue and FCRA FACT Act Data Entry**

Reissuing an existing credit report is highly manual and lacks sequential, automated guidance.1 To reissue credit, the Loan Officer must navigate to the "Reissue Credit" link under the "Loan Application" menu.1 Rather than executing an automated link, the system requires the manual entry of a credit report reference number, followed by the manual transcription of the Fair Credit Reporting Act (FCRA) FACT Act data.1 This tedious copy-paste sequence increases the frequency of verification failures and generates manual work.1

### **Disclosure Readiness Review Discoverability**

Before submitting a loan package for compliance disclosures, Loan Officers must perform a disclosure readiness review.1 However, the validation tool is completely hidden from the main URLA 1003 input screen.1 To run the review, the user must exit the 1003 interface, navigate to the "Fee Review" directory, and select "Disclosure Readiness Review".1 While this page identifies compilation and missing data failures, it only displays static, non-editable text summaries.1 The interface fails to provide direct, clickable links to resolve the validation errors, forcing the user to manually exit the page, hunt for the field in the 1003 form, and repeat the validation loop.1

### **LMS Onboarding Completion Badge Uploads**

New Loan Officers frequently struggle to find where or how to upload their academy completion badges and certificates once training is finished.4 The submission portal is obscured behind a poorly labeled button inside the Learning Management System (LMS).4 This layout prevents users from completing their mandatory setup tasks, prompting them to bypass the portal and email documents directly to the support inbox, increasing administrative overhead.4

### **Non-Interactive Loan-to-Value (LTV) Visualizations**

While the system successfully supports an interactive breakdown of Debt-to-Income (DTI) calculations by allowing users to click the figures to view backend math, the Loan-to-Value (LTV) and Combined Loan-to-Value (CLTV) fields remain static.4 Loan Officers attempting to identify calculations for complex secondary financing are blocked from viewing the underlying equations, generating repetitive inquiries regarding pricing adjustments and down payment limits.4

| Navigation Path | Intended Objective | UI Usability Barrier | Downstream Support Impact |
| :---- | :---- | :---- | :---- |
| eFolder Documents ![][image1] Right Icon (+) ![][image1] Pair Dropdown 1 | Upload and map borrower-provided files to pairs. | Small, unlabeled icon; manual dropdown selection.1 | Mismatched uploads and lost documents.1 |
| Services ![][image1] Order MI ![][image1] Providers ![][image1] My List 1 | Request and activate mortgage insurance. | Multi-tier tab transitions and manual list additions.1 | High support touchpoints for routine MI ordering.1 |
| Fee Review ![][image1] Disclosure Readiness Review 1 | Validate 1003 data fields for submission. | Completely hidden from 1003; static non-clickable error texts.1 | Extensive delays and manual field hunting.1 |
| Resources ![][image1] Important Company Links 4 | Locate the Notebook QM guidelines. | Crucial reference manual buried in a generic sub-directory list.4 | Elevated volume of basic guideline questions.4 |
| LMS Portal ![][image1] Onboarding Series To-Dos 4 | Upload training completion certificates. | Obscured "I have cleared it" and file upload buttons.4 | Processing backlog; direct emails containing sensitive credentials.4 |

## **Workflow Friction Analysis**

Operational audits have identified several critical, high-friction workflow sequences that represent the largest sources of support desk tickets and processing delays.

### **The "99% Complete" Application Review Gate**

One of the most persistent bottlenecks is the system's intentional "99% Complete" review gate logic.4 When a borrower successfully completes and submits their portion of the loan application through the online portal, the system intentionally caps the visible completion status at 99%.8 This is designed as a control gate to signal that the file is pending final Loan Officer validation before being promoted to the active loan pipeline.8 To push the status from 99% to 100% and unlock the "Convert to Loan" action, the Loan Officer must manually open the application, review the data, and click "Save" from their interface.8  
Because this control gate is not accompanied by any explanatory interface prompts or error messaging, Loan Officers assume the 99% status indicates a system bug or a missing borrower document.8 This lack of guidance drives constant panic inquiries to the support department, where staff must manually instruct the user to execute a "silent save" to bypass the gate.8

### **Prospect-to-Loan Conversion Post-Onboarding Block**

To ensure compliance and system preparedness, senior leadership implemented an automated system lock that blocks Loan Officers from converting prospect files to active loans if their "Post-Onboarding Status" is marked as "Not Completed".10 This block is designed to force incoming personnel to complete their mandatory 1:1 post-onboarding orientation with an assigned Support Specialist.10  
In practice, this rigid parameter created severe operational blockages and compliance issues.10 Experienced Loan Officers who had active clients and needed to convert files immediately to meet strict three-day TRID disclosure deadlines were completely blocked by the system, leading to high frustration and complaints.10 To mitigate this friction, the Support Department is often forced to manually override and update the post-onboarding status to "Completed" to bypass the block, with the intention of scheduling the meeting at a later date.10

### **Figure Portal Referral Loan Closeout Workflow**

The operational workflow for closing out and calculating commissions on referral HELOC transactions is highly manual and presents clear access barriers.12 When an LO requests to close a referral loan, a Support Specialist must log into the external Figure portal, print the Overview screen to serve as the "Final Settlement Statement," and manually extract critical parameters—such as the funded date, interest rate, lock action, and draw amount.12 If no file exists in the internal system, the specialist must guide the LO to manually generate and import a MISMO 3.4 file.12  
This workflow frequently stalls because the support specialists are not consistently provided with active login credentials to the Figure portal.13 As a result, tickets sit unresolved in the queue while specialists manually request access or escalate the files to the Processor Assist team.13

### **Auto-Cloned Prospect File Data Loss**

System updates designed to automatically clone expired prospect files to help Loan Officers recycle lead information suffered from a critical data loss bug.4 While manual cloning effectively carries over all 1003 data, the automated cloning pipeline failed to transfer crucial borrower information, including co-borrower data, detailed employment history, and previously pulled credit reports.4 When an automated clone was executed, the system stripped these details, forcing Support Specialists to spend hours manually copying data from dead files into the new prospects to prevent the LOs from having to re-ask borrowers for their information.4

### **Credit Reissue Automated Notification Spikes**

A critical logic error in the automated notification trigger (notify\_pulling\_credit\_report) caused identical emails to be dispatched to both the borrower and the Loan Officer regardless of whether the system performed a "new credit pull" or a simple "credit reissue". When an internal team member reissued an existing credit report to a file, the system blasted an email alert stating that a fresh credit check had been executed.4 This generated immediate alarm, with borrowers contacting their Loan Officers to complain about unauthorized credit pulls, which in turn flooded the support desk with urgent panic inquiries.9

### **Closing Agent Ticket Inefficiencies**

Automated workflows designed to collect closing agent details suffer from severe design flaws.4 System-generated tickets trigger automatically even when only partial information—such as a single address or company name—is gathered.4 This triggers a prolonged manual follow-up cycle for support specialists.4 Furthermore, once resolved, the contact details fail to link to the corresponding application, forcing Loan Officers to reopen files and select the agent manually.4

### **LMS Onboarding Hard Stops and Opt-Out Constraints**

The corporate policy requiring the completion of all past-due training tasks within 60 to 90 days is enforced by hard system lockouts.16 However, a significant bottleneck occurs with the mandatory "Connect Social Media" task.11 Many Loan Officers do not maintain professional social media pages or express discomfort connecting personal accounts to corporate platforms.11 The absence of an integrated system "opt-out" forces support staff to manually override and mark the task as cleared, creating unnecessary administrative overhead.11

### **MISMO 3.4 Duplicate Ticket Generation**

The system's compliance monitoring framework generates automated support tickets when a Loan Officer exports a MISMO 3.4 file, aiming to prevent self-processing.4 However, the initial logic triggered a new support ticket for every single export event, regardless of whether a ticket was already active on that file.4 This flooded specialist queues with duplicates and caused confusion until a fix restricted generation strictly to cases where the exporter selects "Other" as the export reason.4

## **Root Cause Insights**

An analysis of these recurring usability and operational friction points reveals four underlying root causes.

### **Terminology and Structural Redundancy**

A key driver of post-onboarding disengagement is the terminology used during the onboarding sequence.10 New Loan Officers frequently confuse the initial "Setup Call" conducted by the Onboarding Team with the mandatory "Post-Onboarding Call" conducted by the Support Team.10 Because both sessions share the word "onboarding" and are scheduled closely together, Loan Officers assume they have completed all setup requirements after the first call and ignore subsequent invitations from their assigned Support Specialist.10 Renaming the sessions to clearly distinguish between the technical setup call and the support kickoff meeting is a critical step in resolving this confusion.10

### **Rigid Parameterization Over Assistive Validation**

The system relies on rigid blocks and hard stops rather than helpful, real-time validation to enforce process compliance.1 The system's response to an incomplete task or validation failure is often a generic error message or a hard conversion block, such as the post-onboarding convert block or the Optimal Blue rate lock block.1 These rigid locks fail to provide actionable guidance, preventing Loan Officers from converting active prospects and directly threatening disclosure compliance timelines.10

### **Poor Platform Integration and Siloed Data Pools**

Severe operational hurdles stem from fragmented integrations between the core TERA portal, third-party underwriting portals (such as nCino or Figure), and local Encompass databases.1 For instance, nCino eConsent assignment failures are frequently triggered by missing field IDs within Encompass or inactive nCino logins.1 Similarly, eVault errors on eNotes stem from unconfigured links to transaction platform accounts.1 These integration gaps force support specialists to manually trace errors across siloed databases, resulting in slow resolution times.1

### **Inconsistent and Outdated Process Documentation**

A significant portion of support desk volume is driven by incomplete or outdated standard operating procedures. The core correspondent handbook lacks detailed instructions on how Loan Officers can obtain mandatory training codes from various investors.19 While Rocket requires verbal collection during live sessions, PennyMac sends codes via post-class emails, and SunWest provides them verbally on the phone.19 The lack of structured documentation in the credential settings interface forces users to contact live support for clarification.9

## **Operational Impact**

The persistent technical and process bottlenecks have a direct, measurable impact on the LO Support Department's operational capacity, compliance risk, and workforce stability.

### **Support Specialist Workload and Portfolio Burnout**

During the first quarter of 2026, the support department managed a massive volume of requests, resolving over 2,100 tickets in February alone. An analysis of individual specialist performance reveals a severe workload imbalance. A small group of high-volume specialists, led by Fatima Hayudini (who resolved 553 tickets) and Stephen Tram (who managed 748 total calls), handled the vast majority of the department's ticket volume.  
This high concentration of work on a few key individuals, combined with a department-wide missed call rate of approximately 22%, highlights a clear risk of staff burnout and operational vulnerability if key team members are absent.

Q1 2026 TICKET RESOLUTION VOLUME BY SPECIALIST  
\===================================================  
Fatima Hayudini   \[█████████████████████████\] 553  
Stephen Tram      \[███████████████████\] 426  
Other Specialists \[██████████████████████████████\] 1149  
\===================================================

### **Discretionary Bypass and Compliance Vulnerability**

The system's reliance on rigid blocks during the prospect-to-loan conversion phase creates a direct threat to regulatory disclosure timelines.10 If a Loan Officer is blocked from converting a file due to an incomplete onboarding task or a system validation error, the three-day TRID deadline for delivering the Loan Estimate continues to tick.2 These system blocks force Support Specialists to manually mark pending onboarding tasks as "completed" to bypass the restriction and protect disclosure compliance margins, undermining the effectiveness of the compliance check.10

### **The "Communication Black Hole" and Administrative Penalty Overhead**

In March 2026, leadership implemented a zero-tolerance disciplinary framework to enforce standard operating procedures and reduce skipped tasks. Under this policy, Support Specialists face a strict 50-point penalty deduction from their monthly performance scores for process compliance failures, as well as a 5% score deduction for failing to respond to chats or missed calls within their SLA windows. While designed to improve accountability, this rigorous policy adds significant administrative tracking overhead and contributes to a high-stress work environment.

### **LMS Blockage and Onboarding Drop-Off Rates**

Enforcing mandatory training via account lockouts has a negative impact on onboarding retention.16 When a Loan Officer's account is locked due to past-due tasks, they must contact HR to request an unlock, as the support desk cannot unlock accounts on their behalf.11 This fragmented process creates a "dead-end" workflow.11 Many Loan Officers, particularly experienced producers who have active clients, choose to leave the company rather than navigate this administrative hurdle.11

## **Recommended Improvements**

To resolve these recurring friction points, recommendations have been prioritized based on their ease of implementation and operational impact.

### **Quick Wins (Immediate Implementation)**

* **Rename Post-Onboarding Communications:** Change the name of the "Post-Onboarding Call" to "1:1 Support Call" or "Welcome Call" to reduce confusion with the initial onboarding setup call and improve meeting attendance.10  
* **Implement "99% Complete" Interface Prompts:** Replace the silent 99% progress gate with an explicit on-screen banner reading: "Borrower application received. Please review and click Save to update to 100% and enable conversion".8  
* **Standardize Email CC Actions for Specialists:** Configure the system to automatically CC the assigned Support Specialist on all system-generated reminders sent to pending Loan Officers, ensuring aligned follow-up.4  
* **Grant Team Leaders Description Editing Permissions:** Provide Team Leaders with direct editing permissions for their team descriptions, eliminating unnecessary IT support tickets.4  
* **Establish Onboarding Grace Period Exceptions:** Authorize support specialists to grant standard 7-to-14-day extensions for onboarding tasks if an LO has an active transaction to submit, preventing compliance violations.21

### **Medium-Priority Improvements (Targeted Q2 2026 Rollout)**

* **Embed HELOC and Specialized Loan Guidelines:** Add direct instructional text or a clickable "Notebook" link inside the 1003 conversion tab when a user selects a HELOC, HELOAN, or other specialized loan products.4  
* **Integrate Smartpay Links in the Liabilities Section:** Add a direct "Send Smartpay link to borrower" button in the Liabilities section of the application, allowing Loan Officers to easily configure soft-pull or hard-pull credit requests.4  
* **Improve Zoom Phone Setup Discoverability:** Provide inline, step-by-step visual instructions inside the Zoom Phone setup tab to guide users through activation and reduce technical support volume.4  
* **Elevate Notebook QM Visibility:** Relocate "Notebook QM" from its buried location under Company Links to a prominent spot on the main Marketplace or Loan Factory tab.4  
* **Suppress Misleading Credit Pull Error Popups:** Modify the credit report interface to suppress the generic "No Liability" popup on failed pulls, displaying the true error log immediately.4

### **Long-Term Strategic Improvements (TERA+ Roadmap)**

* **Automate Performance Evaluation and Bonus Calculations:** Eliminate manual, time-consuming Excel and CSV performance sheets by migrating all tracking (including post-onboarding status, GBP connection status, and active files) directly into the LFAI Management Performance Evaluation (MCP) bonus automation system.  
* **Develop a Centralized Hotline Dashboard:** Build a consolidated, round-robin hotline management dashboard within TERA integrated with Zoom Phone to manage inbound support calls, call recordings, and missed call return assignments.23  
* **Replace Conversion Blocks with Task-Driven Alerts:** Replace rigid, hard-stop conversion blocks with automated ticket generation and post-conversion follow-up workflows, allowing transactions to proceed to protect crucial TRID disclosure deadlines.10  
* **Implement an AI-Driven Smart Document Cloning Process:** Design an automated document utility that scans and transfers valid, reusable documents during cloning while flagging and excluding expired files.24

| Tier | Priority Initiative | Required Technical Action | Expected Operational Impact |
| :---- | :---- | :---- | :---- |
| **Quick Win** | Rename Onboarding Calls.10 | Change calendar templates to "Welcome Call".10 | Reduces no-show rates and support queries.10 |
| **Quick Win** | Clear "99% Complete" UI.8 | Add explanatory banner to conversion tab.8 | Eliminates panic tickets on submitted files.8 |
| **Quick Win** | Specialist CC on Emails.4 | Enforce CC rule on PO reminders.4 | Improves visibility and speeds up onboarding.4 |
| **Medium** | Smartpay Liabilities Integration.4 | Add direct Smartpay button inside Liabilities tab.4 | Speeds up credit pulls and reduces password sharing.4 |
| **Medium** | Elevate Notebook QM.4 | Relocate link to the primary navigation bar.4 | Reduces standard guideline queries by \~15%.4 |
| **Strategic** | Bonus & SLA Automation. | Integrate MCP API with the TERA backend. | Eliminates manual sheets and improves tracking. |
| **Strategic** | Centralized Zoom Hotline.23 | Build unified Hotline console in TERA dashboard.23 | Decreases the missed call rate below 10%.23 |

## **Suggested Training Topics**

To sustain these operational improvements, the department should implement targeted training programs and product design enhancements.

### **1003 Mistakes to Avoid and Submission Friction Control**

Conduct weekly instructional sessions led by Corporate Coaches focusing on common 1003 application errors that cause delays or approvals to stall.25 Key topics should include correct data entry for employment history, liabilities mapping, and spouse-linking for credit reports.2 This training aims to improve the quality of applications submitted for processing.25

### **Correspondent Access and Attendance Code Collection**

Develop a training module outlining the specific procedures for gathering compliance codes from PennyMac, Rocket, and SunWest. The session must clearly illustrate how to retrieve and input attendance codes in the credential settings interface, minimizing support tickets.9

### **Figure Portal Referral Loan Closeout Procedures**

Train support specialists on how to navigate the Figure portal, retrieve final settlement packages, extract transaction-specific metrics, and close out referral files without relying on manual escalations.4

### **IAPD Navigation and Authentication Troubleshooting**

Establish training for support specialists and HR personnel on navigating the Illinois Anti-Predatory Lending Database (IAPD).27 Training must cover how to assist Loan Officers with password resets, unlocking accounts, and configuring multi-factor authentication app keys on mobile devices.27

## **Suggested Product/UX Enhancements**

### **AI-Driven Smart Document Cloning**

Develop an intelligent document utility to improve the cloning process.24 When a file is cloned, the utility should analyze document metadata, automatically transfer valid, long-term files, and exclude expired or short-term items (such as old paystubs or bank statements).24 This feature will save significant time for both Loan Officers and support staff.24

### **Interactive Bank Statement Module (Tera+ Integration)**

Replace static qualification pages with an interactive statement summary screen for bank statement loans.28 This module should support several key features:

* A side-by-side view showing the transaction description in the table and highlighting the corresponding line inside the statement PDF.28  
* An underwriter tagging interface to easily categorize transactions (such as Revenue, Large, or NSF/Overdraft).28  
* A side-by-side comparison of system-calculated and AI-calculated income figures, including a feedback button for users to rate accuracy.28

TERA+ BANK STATEMENT INCOME CALCULATOR  
┌──────────────────────────────────────┬──────────────────────────────────────┐  
│  SYSTEM CALCULATION                  │  AI CALCULATION                      │  
│  Gross Deposits:  $124,500.00        │  Gross Deposits:  $124,500.00        │  
│  Excluded Items:   $12,000.00        │  Excluded Items:   $14,500.00        │  
│  Net Income:      $112,500.00        │  Net Income:      $110,000.00        │  
│    │  \[View AI Extraction Methodology\]    │  
├──────────────────────────────────────┴──────────────────────────────────────┤  
│  Underwriter Action:  \[Accept AI\]  Feedback: \[👍\]\[👎\]      │  
└─────────────────────────────────────────────────────────────────────────────┘

### **Floating "To-Dos" Dashboard Button**

Implement a persistent, floating "To-Dos" button on the lower-right corner of the screen, styled to match the standard chat interface.4 The button should feature a numerical badge showing incomplete tasks, keeping outstanding deadlines visible to Loan Officers and preventing compliance-related system locks.4

#### **Works cited**

1. Unused \- Loan Officer Systems Evaluation & Usability Report, [https://drive.google.com/open?id=1XrK0RnaMhcn2q9T4WC\_6aMaMiX83q8M9q0opwlXADcg](https://drive.google.com/open?id=1XrK0RnaMhcn2q9T4WC_6aMaMiX83q8M9q0opwlXADcg)  
2. LO Support FAQs (updated 05/18/2026), [https://drive.google.com/open?id=1Ev9dpvJMAxC6BioSN8XWaEBGaCS6\_A7o\_aian7deqz0](https://drive.google.com/open?id=1Ev9dpvJMAxC6BioSN8XWaEBGaCS6_A7o_aian7deqz0)  
3. Re: Summary of Feedback Collected from 50 Loan Officers, [https://mail.google.com/mail/u/0/\#all/FMfcgzQdzcwJWrplvTNTSvpzQwBmctdD](https://mail.google.com/mail/u/0/#all/FMfcgzQdzcwJWrplvTNTSvpzQwBmctdD)  
4. FEEDBACK SHEET | LO Support, [https://drive.google.com/open?id=15Df411DYox4D8wZo3jhAjC60jP2By8kQI-hQL\_sbf7I](https://drive.google.com/open?id=15Df411DYox4D8wZo3jhAjC60jP2By8kQI-hQL_sbf7I)  
5. Fatima Hayudini, [http://chat.google.com/dm/iHyf\_cAAAAE/iUOCbMUe2Ks/iUOCbMUe2Ks](http://chat.google.com/dm/iHyf_cAAAAE/iUOCbMUe2Ks/iUOCbMUe2Ks)  
6. Miley Dau, [http://chat.google.com/dm/o26E5cAAAAE/240JkpH8u9w/240JkpH8u9w](http://chat.google.com/dm/o26E5cAAAAE/240JkpH8u9w/240JkpH8u9w)  
7. Miley Dau, [http://chat.google.com/dm/o26E5cAAAAE/FUXmk4a5Nlc/FUXmk4a5Nlc](http://chat.google.com/dm/o26E5cAAAAE/FUXmk4a5Nlc/FUXmk4a5Nlc)  
8. Re: Note from the ticket \#: 36858189349, requestor Benjamin Huynh, ID 36817258853, Sieh L Browne, 4895 155th Lane Northwest, Ramsey, MN 55303, [https://mail.google.com/mail/u/0/\#all/FMfcgzQgKvCSZrNLWTrZdMCvzLsCMTMR](https://mail.google.com/mail/u/0/#all/FMfcgzQgKvCSZrNLWTrZdMCvzLsCMTMR)  
9. Problem Solving Report \- January 2026, [https://drive.google.com/open?id=11V3MtCunOE5-QUBJzG3tLFcxUqk3Yp-woWlU6grGDdg](https://drive.google.com/open?id=11V3MtCunOE5-QUBJzG3tLFcxUqk3Yp-woWlU6grGDdg)  
10. Re: Issue with LOS, [https://mail.google.com/mail/u/0/\#all/FMfcgzQgLjVJvSWskQtjZqWDVcWMrvzq](https://mail.google.com/mail/u/0/#all/FMfcgzQgLjVJvSWskQtjZqWDVcWMrvzq)  
11. LO Support, [http://chat.google.com/room/AAAAU4z82hA/9kdVTJV2c6k/9kdVTJV2c6k](http://chat.google.com/room/AAAAU4z82hA/9kdVTJV2c6k/9kdVTJV2c6k)  
12. \[Policies & Procedures\] Roles and Responsibilities \- LO Support, [https://drive.google.com/open?id=1vlUitsN0YMccddAmlRTvxiS49X--ApKQYqhTlWp4PBI](https://drive.google.com/open?id=1vlUitsN0YMccddAmlRTvxiS49X--ApKQYqhTlWp4PBI)  
13. Pablo Bermudez, [http://chat.google.com/dm/ysX6YCAAAAE/5QL7fOzS1Y0/5QL7fOzS1Y0](http://chat.google.com/dm/ysX6YCAAAAE/5QL7fOzS1Y0/5QL7fOzS1Y0)  
14. Pablo Bermudez, [http://chat.google.com/dm/ysX6YCAAAAE/fsH9\_W3EwwY/fsH9\_W3EwwY](http://chat.google.com/dm/ysX6YCAAAAE/fsH9_W3EwwY/fsH9_W3EwwY)  
15. Stephen Tram, [http://chat.google.com/dm/-FOpmUAAAAE/nW2cgBis-oo/nW2cgBis-oo](http://chat.google.com/dm/-FOpmUAAAAE/nW2cgBis-oo/nW2cgBis-oo)  
16. Re: NOTICE: Reassignment of Your Support Specialist, [https://mail.google.com/mail/u/0/\#all/FMfcgzQgLXpdXXFQRgNjLWPgMxgXFHXq](https://mail.google.com/mail/u/0/#all/FMfcgzQgLXpdXXFQRgNjLWPgMxgXFHXq)  
17. Re: I need help please 919 522 0119, [https://mail.google.com/mail/u/0/\#all/FMfcgzQfBZkHRGDJFhffWHWNFPftWxNv](https://mail.google.com/mail/u/0/#all/FMfcgzQfBZkHRGDJFhffWHWNFPftWxNv)  
18. LO Support, [http://chat.google.com/room/AAAAU4z82hA/iRlzBI4-f\_U/iRlzBI4-f\_U](http://chat.google.com/room/AAAAU4z82hA/iRlzBI4-f_U/iRlzBI4-f_U)  
19. Fatima Hayudini, [http://chat.google.com/dm/iHyf\_cAAAAE/ClcXVBMfT\_8/ClcXVBMfT\_8](http://chat.google.com/dm/iHyf_cAAAAE/ClcXVBMfT_8/ClcXVBMfT_8)  
20. Phuong Bui, [http://chat.google.com/dm/7v1eriAAAAE/GfoRaXPZfyc/GfoRaXPZfyc](http://chat.google.com/dm/7v1eriAAAAE/GfoRaXPZfyc/GfoRaXPZfyc)  
21. Katarina Phan, [http://chat.google.com/dm/6mKZQsAAAAE/Hq9vUcxqFmw/Hq9vUcxqFmw](http://chat.google.com/dm/6mKZQsAAAAE/Hq9vUcxqFmw/Hq9vUcxqFmw)  
22. LO Support, [http://chat.google.com/room/AAAAU4z82hA/QzSglnyHrYY/QzSglnyHrYY](http://chat.google.com/room/AAAAU4z82hA/QzSglnyHrYY/QzSglnyHrYY)  
23. Fatima Hayudini, [http://chat.google.com/dm/iHyf\_cAAAAE/s6Fwz3uA2bA/s6Fwz3uA2bA](http://chat.google.com/dm/iHyf_cAAAAE/s6Fwz3uA2bA/s6Fwz3uA2bA)  
24. Re: Note from the ticket \#: 36966797401, requestor Benjamin Huynh, [https://mail.google.com/mail/u/0/\#all/FMfcgzQgLPMRnVJBMNTDDFjstzKRwpDw](https://mail.google.com/mail/u/0/#all/FMfcgzQgLPMRnVJBMNTDDFjstzKRwpDw)  
25. Loan Officers, [http://chat.google.com/room/AAAAwHP2\_Rw/x3UB3VGMghI/x3UB3VGMghI](http://chat.google.com/room/AAAAwHP2_Rw/x3UB3VGMghI/x3UB3VGMghI)  
26. Corporate Coach Group, [http://chat.google.com/room/AAQA-ZPkors/oxagl1N0C8g/oxagl1N0C8g](http://chat.google.com/room/AAQA-ZPkors/oxagl1N0C8g/oxagl1N0C8g)  
27. Dave Hoang, [http://chat.google.com/dm/kG9cICAAAAE/t57nA8POs9M/t57nA8POs9M](http://chat.google.com/dm/kG9cICAAAAE/t57nA8POs9M/t57nA8POs9M)  
28. Re: Need improve, [https://mail.google.com/mail/u/0/\#all/FMfcgzQgKvJDrbVDGFGBHmsCXxvqHRJK](https://mail.google.com/mail/u/0/#all/FMfcgzQgKvJDrbVDGFGBHmsCXxvqHRJK)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAYAAADNX8xBAAAAhUlEQVR4XmNgGAWjgCTAAcRpQMyDLkEqYATiViA2RpcgB4AM6QViFnQJUgHIVQVAHAdlw4EAEEuSiOWAeD4QTwZiPiBm4AbiaiCeRQbeAcRfgbiZgQJgAsSrgVgGXYIUIAzEi4FYHl2CVJAFxBHogqQCUIKcCsTS6BKkAlB080LpUUACAABjSBNDIJEBIwAAAABJRU5ErkJggg==>