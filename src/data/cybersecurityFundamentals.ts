import type { LessonContent } from "./lessonContent";
import type { QuizData, QuizQuestion } from "./quizData";

const courseId = "cybersecurity-fundamentals";

export const cybersecurityFundamentalsLessons: LessonContent[] = [
  {
    id: "cyber-1.1",
    courseId,
    title: "What Cybersecurity Protects",
    content: `# What Cybersecurity Protects

Cybersecurity is the practice of protecting information, devices, services, and the people who depend on them. It is not only a set of products: good security combines people, repeatable processes, and suitable technology.

## Start with assets

An **asset** is something an organization values. Examples include customer records, employee accounts, laptops, payment services, and the ability to keep a business operating. Security decisions begin by understanding which assets matter and what would happen if they were exposed, changed, or unavailable.

## The CIA triad

- **Confidentiality:** only authorized people can see information. Access controls and encryption help protect it.
- **Integrity:** information stays accurate and changes are authorized. Change records, approvals, and validation help preserve it.
- **Availability:** systems and information are usable when needed. Resilient services, tested backups, and recovery plans support it.

One event can affect more than one goal. Ransomware can make files unavailable and threaten their confidentiality if the attacker also copied them. A security team identifies the affected goals before choosing a response.

## Security is a business decision

Controls should reduce meaningful risk without preventing the organization from doing its work. A small clinic may prioritize keeping appointment systems available and protecting patient records. A payment provider may give extra attention to transaction integrity and account abuse. The right priorities depend on the assets and the impact of losing them.

### A simple starting question

For each important asset, ask: what could go wrong, how likely is it, what would the impact be, and which practical control would reduce that risk?`,
    keyTakeaways: [
      "Security protects information, devices, services, and business operations.",
      "Confidentiality, integrity, and availability are the three core security goals.",
      "Controls should be selected according to asset value and business impact.",
    ],
  },
  {
    id: "cyber-1.2",
    courseId,
    title: "Threats, Vulnerabilities, and Risk",
    content: `# Threats, Vulnerabilities, and Risk

Security teams use a few related terms to describe why protection is needed.

- A **threat** is a situation or actor that could cause harm, such as a stolen laptop, a phishing campaign, or a service outage.
- A **vulnerability** is a weakness that could be used or triggered, such as an unpatched application or an account without multi-factor authentication.
- **Risk** is the possibility and business impact of a threat exploiting a weakness.

## Make risk concrete

Instead of writing “the network is risky,” describe a useful scenario: “If an employee account is taken over, an attacker could view payroll data, causing privacy and financial harm.” This connects the threat, weakness, affected asset, and likely impact.

A simple risk review considers **likelihood** and **impact**. A low-likelihood event can still deserve attention if the impact would be severe. Risk ratings help teams prioritize, but they are estimates—not guarantees that an event will or will not occur.

## Choose a response

Organizations can reduce risk with a control, transfer part of it through an agreement or insurance, stop the risky activity, or formally accept the remaining risk. Acceptance should have an accountable owner and a review date. It is not the same as forgetting about the issue.

## Use evidence, not assumptions

Confirm which systems are affected, whether the weakness is present, and what safeguards already exist. A documented, exposed issue may need faster action than a theoretical weakness on an isolated test system. Reassess when systems, suppliers, or business needs change.`,
    keyTakeaways: [
      "Threats can cause harm; vulnerabilities are weaknesses; risk connects them to impact.",
      "Likelihood and impact help prioritize work, but risk ratings are estimates.",
      "Accepted risks need an owner, rationale, and review date.",
    ],
  },
  {
    id: "cyber-1.3",
    courseId,
    title: "Security Controls and Defense in Depth",
    content: `# Security Controls and Defense in Depth

A **security control** is a safeguard that reduces the chance or impact of harm. Controls can be grouped by what they do:

- **Preventive controls** try to stop an event, such as MFA, access restrictions, or secure configuration.
- **Detective controls** help identify an event, such as alerting, access logs, or account review.
- **Corrective and recovery controls** limit damage or restore operations, such as incident procedures and tested backups.

One control rarely covers every failure. **Defense in depth** layers safeguards so another measure can still help if one is bypassed or unavailable. For example, a sensitive cloud folder can use least-privilege access, MFA, encryption, audit logging, and a tested recovery plan.

## Match the control to the risk

Controls have costs and can introduce friction. Choose measures that address the actual risk, have a clear owner, and can be checked. A policy that nobody follows is not an effective control. A backup that has never been restored is not proven recovery.

## Practical exercise: Map a small-business risk

You are helping a small clinic protect its appointment system. A receptionist laptop is used by multiple staff, and patient details are available through the browser.

1. Name the assets and the likely business impact if the laptop is lost.
2. Identify one threat and one weakness in the scenario.
3. Choose one preventive, one detective, and one recovery control.
4. Explain how you would confirm each control is working.

### Check your reasoning

Consider individual staff accounts, automatic screen locking, device encryption, sign-in logs, and a tested way to restore access. Prefer safeguards that reduce shared access without disrupting patient care.

### Lab questions

The questions below are a self-check; explain each answer in your own words.
`,
    keyTakeaways: [
      "Preventive, detective, and recovery controls address different stages of risk.",
      "Defense in depth combines safeguards rather than relying on one barrier.",
      "Controls need owners and evidence that they work in practice.",
    ],
    practicalExercise: {
      title: "Clinic Laptop Risk Review",
      description: "Map a realistic asset risk to layered safeguards and a way to validate them.",
      steps: [
        "List the information and services exposed through the shared laptop.",
        "Record the threat, weakness, and possible impact as one risk statement.",
        "Choose a preventive, detective, and recovery safeguard.",
        "Write down what evidence would show each safeguard is operating.",
      ],
      labScenario: "A clinic laptop is used by several reception staff to access patient appointments. It is often left unlocked at the front desk, and the browser remains signed in.",
      labQuestions: [
        { id: "cyber-1.3-lab-1", question: "Which security goal is most directly affected if an unauthorized visitor reads patient details?", answer: "Confidentiality, because information was viewed by someone who did not have permission.", hint: "Think about who is allowed to see the information." },
        { id: "cyber-1.3-lab-2", question: "Name one preventive control and one detective control for this scenario.", answer: "Automatic screen locking or individual sign-in is preventive; reviewing sign-in or access logs is detective.", hint: "One safeguard should reduce the chance; another should help reveal activity." },
      ],
    },
  },
  {
    id: "cyber-2.1",
    courseId,
    title: "Social Engineering and Phishing",
    content: `# Social Engineering and Phishing

Social engineering uses trust, urgency, authority, or curiosity to influence a person into taking an unsafe action. The message may arrive by email, text, phone, collaboration app, or a copied website.

## Common warning signs

- A request to act immediately, bypass a normal process, or keep the request secret.
- A sender address or web address that is subtly different from the expected one.
- An unexpected attachment, sign-in request, payment change, or request for a verification code.
- A message that does not fit the sender's normal tone or business context.

These signs are clues, not proof. Real messages can be urgent and polished messages can still be fraudulent. Verify unusual requests through a separate trusted channel, such as a known phone number or the organization’s bookmarked portal.

## Safe handling

Do not open an unexpected attachment or enter credentials through a link in a message. Do not forward suspicious content broadly. Use the organization’s reporting process so the security team can inspect the message and look for other recipients. If you already interacted with it, report exactly what happened; prompt, honest reporting helps limit impact.

## Beyond email

Attackers may impersonate a manager, supplier, help desk, or delivery service. A request to change bank details should be verified with an established contact, even if the message appears to come from a familiar account.`,
    keyTakeaways: [
      "Social engineering can arrive through any communication channel.",
      "Verify unusual requests using a separate, trusted contact method.",
      "Report suspected phishing promptly, including any action already taken.",
    ],
  },
  {
    id: "cyber-2.2",
    courseId,
    title: "Malware and Common Attack Paths",
    content: `# Malware and Common Attack Paths

Malware is software or code used to perform unwanted actions. Examples include ransomware that disrupts access to files, credential-stealing software, spyware, and remote-access tools abused by an attacker.

## How incidents may begin

Common paths include a malicious attachment, a fake sign-in page, an exposed or outdated service, a compromised supplier, or misuse of a legitimate account. A single clue rarely proves malware is present. Defenders combine endpoint, account, network, and user-reported evidence to understand what happened.

## Safe first actions

If a device behaves unexpectedly, do not try to investigate by opening suspicious files or running unapproved cleanup tools. Follow the organization’s reporting process. A trained responder may isolate the device using approved tools while preserving evidence. Avoid deleting files or powering off a device unless the response procedure directs it; those actions can remove useful evidence or interfere with recovery.

## Keep defenses layered

Apply supported security updates, use endpoint protection, limit software installation, restrict account privileges, and maintain backups that are protected from routine access. Security awareness is useful, but it should be backed by technical controls rather than relying on users to recognize every attack.`,
    keyTakeaways: [
      "Malware has different goals, and early clues require validation from multiple sources.",
      "Report suspected device compromise through the approved process.",
      "Layered controls reduce reliance on any single user or product.",
    ],
  },
  {
    id: "cyber-2.3",
    courseId,
    title: "Building Safe Security Habits",
    content: `# Building Safe Security Habits

Reliable security habits make safe actions easier to repeat. They include locking screens, checking recipients before sharing, using approved storage, installing updates promptly, and reporting mistakes without delay.

## Make reporting easy

People should know where to report a suspicious message, lost device, accidental disclosure, or unexpected sign-in prompt. A helpful report includes when it happened, which account or device was involved, what was clicked or shared, and any visible message or alert. Do not guess or hide a mistake—the response team needs accurate details.

## Verify identity and requests

Use established processes for payments, password resets, and sensitive data requests. A caller claiming to be IT should not receive a password or one-time code. Contact the help desk using a known directory entry rather than a number supplied by the caller.

## Practical exercise: Respond to a suspicious request

An employee receives an email from a familiar supplier asking for an urgent change to payment details. The display name looks right, but the reply-to address is unfamiliar.

1. Identify the warning signs without deciding from the display name alone.
2. Choose a safe way to verify the request.
3. Record the correct reporting channel and details to preserve.
4. Describe what to do if someone already replied or sent payment information.

The goal is not to investigate the sender yourself. The goal is to stop an unsafe action, verify through a trusted channel, and report useful facts.
`,
    keyTakeaways: [
      "Make safe actions repeatable through simple routines and clear reporting paths.",
      "Never share passwords or one-time codes with an unexpected caller or message.",
      "Report mistakes promptly and factually so responders can act.",
    ],
    practicalExercise: {
      title: "Supplier Payment Change Verification",
      description: "Practice verifying a high-impact request without relying on the message itself.",
      steps: [
        "Pause the payment change and note the sender, reply-to address, and requested action.",
        "Contact the supplier using the number already stored in the approved directory.",
        "Report the suspicious message using the organization’s security channel.",
        "If information was already shared, state exactly what was sent and when.",
      ],
      labScenario: "A supplier email asks for an immediate bank-account change. The display name is familiar, but the reply-to address is not. The finance team has not yet updated the vendor record.",
      labQuestions: [
        { id: "cyber-2.3-lab-1", question: "What is the safest way to verify the payment change?", answer: "Call the supplier using a previously verified phone number or contact channel, not the details in the email.", hint: "Do not use the channel that may be controlled by the sender." },
        { id: "cyber-2.3-lab-2", question: "What should the employee do with the message?", answer: "Report it through the approved security channel and include the unusual reply-to address and requested change.", hint: "Preserve useful context and avoid forwarding it widely." },
      ],
    },
  },
  {
    id: "cyber-3.1",
    courseId,
    title: "Identity, Authentication, and Authorization",
    content: `# Identity, Authentication, and Authorization

An identity represents a person, service, or device. Three concepts help explain access decisions:

- **Identification:** claiming an identity, such as entering a username.
- **Authentication:** proving that claim, such as using a password and a security key.
- **Authorization:** deciding what the verified identity is allowed to do.

Authentication does not automatically mean someone should have access to every resource. Authorization should be limited to the work that identity needs to perform.

## Use unique accounts

Individual accounts make it possible to attribute actions, review access, and remove access when a person changes roles or leaves. Shared accounts obscure who performed an action and make it harder to revoke one person’s access safely.

## Service and device identities

Applications and devices may also need identities. These should be managed deliberately, with only required permissions and a named owner. Secrets used by services should be stored in approved secure systems rather than in notes, source files, or shared chat.

## Common access failure

If an account is compromised, the attacker receives the permissions granted to that account. Limiting those permissions reduces the potential impact and supports a better investigation.`,
    keyTakeaways: [
      "Authentication proves identity; authorization determines permitted actions.",
      "Individual accounts improve accountability and make access removal safer.",
      "Service accounts need owners, limited permissions, and secure secret handling.",
    ],
  },
  {
    id: "cyber-3.2",
    courseId,
    title: "Passwords, MFA, and Account Protection",
    content: `# Passwords, MFA, and Account Protection

Passwords are easier to defend when they are long, unique, and stored in an approved password manager. Reusing one password across services allows a password exposed at one service to put other accounts at risk.

## Add another factor

Multi-factor authentication (MFA) asks for proof from more than one category, such as something you know, something you have, or something you are. MFA makes a stolen password less useful, though it does not make an account invulnerable. Unexpected approval prompts should be denied and reported; repeated prompts may indicate someone is trying to sign in.

Where available, phishing-resistant options such as passkeys or hardware security keys provide stronger protection against fake sign-in pages. Use the method approved for the organization.

## Recovery matters

Account recovery methods can bypass normal sign-in protection if they are weak. Keep recovery codes private, store them securely, and use official recovery steps. Never share a one-time code with someone who contacts you unexpectedly, even if they claim to be support staff.`,
    keyTakeaways: [
      "Use unique passwords and an approved password manager.",
      "MFA reduces risk; deny and report sign-in prompts you did not initiate.",
      "Protect recovery methods and never disclose one-time codes to callers.",
    ],
  },
  {
    id: "cyber-3.3",
    courseId,
    title: "Least Privilege and Access Reviews",
    content: `# Least Privilege and Access Reviews

The **principle of least privilege** gives each identity only the access needed for its current responsibilities. It limits accidental changes and reduces what an attacker can do after taking over an account.

## Use roles and time limits

Role-based access groups people with similar job needs, making permissions easier to manage consistently. Elevated access should be separate from everyday work where practical and granted only for an approved task and time period.

## Review the full lifecycle

Access should be requested, approved, granted, reviewed, changed, and removed through a defined process. When an employee changes teams, old permissions should be checked rather than simply adding more. When a contractor or employee leaves, access should be removed promptly and consistently across relevant services.

## Practical exercise: Review a new intern’s access

An intern joining the marketing team requests access to the company-wide finance folder because a colleague shared the link. The intern only needs to prepare campaign material.

1. Identify the least-access option that supports the assigned work.
2. Name who should approve access to sensitive folders.
3. Set a review or expiry point for any temporary access.
4. Describe how to remove access when the placement ends.

Prefer a specific project folder with an owner and expiry date over broad access to an entire department.
`,
    keyTakeaways: [
      "Least privilege reduces both accidental exposure and the impact of account compromise.",
      "Role changes and departures should trigger access review and removal.",
      "Temporary elevated access should be approved, time-limited, and auditable.",
    ],
    practicalExercise: {
      title: "Intern Access Review",
      description: "Choose a minimal, reviewable access grant for a short-term role.",
      steps: [
        "Write down the intern’s actual campaign tasks and required files.",
        "Identify the folder owner who can approve access.",
        "Grant access only to the required project material and set an expiry date.",
        "Add an offboarding check to confirm that access is removed at the end of the placement.",
      ],
      labScenario: "A marketing intern needs campaign images and draft copy. A colleague offers access to a shared folder containing finance and HR documents as well.",
      labQuestions: [
        { id: "cyber-3.3-lab-1", question: "What access should the intern receive?", answer: "Only the campaign files or project folder needed for the assigned work, approved by its owner.", hint: "Apply least privilege rather than accepting a broad shared folder." },
        { id: "cyber-3.3-lab-2", question: "What should happen when the placement ends?", answer: "The owner or access process should remove the intern’s access and verify that it is no longer active.", hint: "Think about the full identity lifecycle, not just the initial grant." },
      ],
    },
  },
  {
    id: "cyber-4.1",
    courseId,
    title: "Updates and Secure Configuration",
    content: `# Updates and Secure Configuration

Software updates repair known issues, improve reliability, and may close security weaknesses. Delaying updates can leave devices exposed, but updates should be tested and deployed through the organization’s approved process so essential services remain reliable.

## Know what you manage

Teams need an accurate inventory of devices, applications, and owners to identify what needs updates. Unsupported software should be replaced or isolated according to a documented plan. Unknown assets are difficult to protect and easy to overlook.

## Secure configuration

Secure configuration means using approved settings that reduce unnecessary exposure. Examples include removing unused services, enabling device encryption, using supported security settings, and limiting local administrator rights. Standard baselines make it easier to detect configuration drift.

## Prioritize updates

Consider severity, evidence of active exploitation, exposure, and business impact. A public-facing system with a known actively exploited issue may need a faster response than an isolated test device. Record exceptions, compensating controls, owners, and dates for review.`,
    keyTakeaways: [
      "Accurate asset inventory makes patching and ownership possible.",
      "Use supported software and approved configuration baselines.",
      "Prioritize updates by exposure, threat evidence, and business impact.",
    ],
  },
  {
    id: "cyber-4.2",
    courseId,
    title: "Endpoint Protection and Safe Device Use",
    content: `# Endpoint Protection and Safe Device Use

An endpoint is a device used to access an organization’s systems, such as a laptop, workstation, or mobile phone. Endpoints are common targets because they handle user activity and connect to business services.

## Build a baseline

Use organization-managed devices where possible, enable approved endpoint protection, encrypt sensitive device storage, and keep operating systems supported. Users should not disable security software or install unapproved tools to work around a warning.

## Treat alerts carefully

An endpoint alert is a signal for investigation, not automatic proof of an incident. Preserve the alert details and report them through the normal channel. If the organization’s response process directs isolation, use the approved method and note the time and actions taken. Avoid deleting files or attempting personal cleanup before responders can assess the device.

## Reduce everyday exposure

Lock unattended screens, use approved removable media, and report lost devices promptly. Mobile devices should use a screen lock and organization-approved management. A short delay in reporting a loss can make remote lock or data-protection steps less effective.`,
    keyTakeaways: [
      "Endpoints need supported software, encryption, protection, and secure settings.",
      "Treat security alerts as evidence to report, not an invitation to improvise cleanup.",
      "Promptly report lost devices and preserve alert details.",
    ],
  },
  {
    id: "cyber-4.3",
    courseId,
    title: "Network Basics and Segmentation",
    content: `# Network Basics and Segmentation

A network connects devices so they can communicate. Security teams use boundaries and rules to control which systems can communicate and for what purpose.

## Reduce unnecessary paths

If every device can reach every other device, one compromised device may create a larger incident. **Network segmentation** separates systems into zones and permits only required communication between them. For example, guest Wi-Fi should not provide a path to internal business services.

## Protect remote access

Remote access should use an approved, protected service with MFA and access limited to the users and systems that need it. Avoid connecting to sensitive work through unknown public networks unless the organization has an approved secure method.

## Observe the connections

Firewalls and network monitoring can record or control traffic. A connection that is unusual for a user or device may merit review, but context matters: business workflows, maintenance, and approved services can all create uncommon traffic. Document expected paths and owners to improve investigations.`,
    keyTakeaways: [
      "Segmentation limits unnecessary communication and can contain incidents.",
      "Remote access should be approved, protected, and limited to business need.",
      "Network alerts require context and validation before conclusions are drawn.",
    ],
  },
  {
    id: "cyber-5.1",
    courseId,
    title: "Data Classification and Safe Handling",
    content: `# Data Classification and Safe Handling

Data classification describes how sensitive information is and which safeguards apply. A simple scheme might distinguish public, internal, confidential, and restricted information. The organization’s own policy defines labels and handling rules.

## Follow the information lifecycle

Consider data when it is created, stored, shared, retained, and disposed of. Use approved locations, limit access to people with a business need, and verify recipients before sharing. Avoid sending sensitive data to personal email or unapproved file-sharing services.

## Protect copies and exports

Downloads, screenshots, spreadsheets, and printed copies can contain the same sensitive information as the original system. Apply the same handling rules to them. Remove data that is no longer needed using approved disposal methods, and retain records according to policy and legal obligations.

## Encryption helps but is not access control

Encryption can protect information if storage or transmission is exposed, but authorized users still need appropriate access limits. Protect encryption keys and use approved sharing methods. If information is sent to the wrong person, report the event quickly rather than trying to hide or independently delete evidence.`,
    keyTakeaways: [
      "Classification labels guide access, sharing, storage, and disposal safeguards.",
      "Exports and copies need the same protection as the original information.",
      "Encryption complements—not replaces—appropriate access control.",
    ],
  },
  {
    id: "cyber-5.2",
    courseId,
    title: "Web, Email, and Secure Communication",
    content: `# Web, Email, and Secure Communication

Websites and email are essential to work, but they can carry fraudulent requests, malicious attachments, and links to imitation sign-in pages. Safe communication combines technical safeguards with careful handling.

## Check the destination

Before signing in, check that the web address is the expected service and use a bookmark or known portal for important accounts. A padlock or encrypted connection helps protect traffic in transit, but it does not prove a website is legitimate.

## Share information deliberately

Use approved tools to send confidential files. Confirm recipient names and permissions, especially when using shared links. Set an expiry or limit access when the tool allows it. Do not put passwords or access codes in the same message as a protected file.

## Report suspicious activity

Unexpected MFA prompts, unusual browser warnings, or requests to install software should be reported. Do not bypass a security warning simply because a page looks familiar. If a work task appears blocked, contact support through the normal channel and describe the warning.`,
    keyTakeaways: [
      "Encrypted connections do not prove that a website or sender is trustworthy.",
      "Confirm recipients and permissions before sharing sensitive files.",
      "Report unexpected prompts and do not bypass security warnings.",
    ],
  },
  {
    id: "cyber-5.3",
    courseId,
    title: "Cloud Security and Backups",
    content: `# Cloud Security and Backups

Cloud services are operated on shared infrastructure, but customers still have security responsibilities. The exact split depends on the service. A provider may manage the physical data center while the customer remains responsible for user access, data sharing, and service configuration.

## Secure the customer-controlled settings

Use MFA, least privilege, approved sharing settings, and audit logging. Review public links and external collaborators regularly. Assign an owner to each service so settings, access, and incident contacts do not become unclear.

## Backups and recovery

Backups support recovery from accidental deletion, hardware failure, and malicious activity. A backup is useful only if it is protected from unauthorized changes and can be restored. Define what must be recovered first, how much recent data can be lost, and how quickly the service must return.

## Practical exercise: Protect a shared cloud folder

A project folder contains internal drafts and one restricted customer document. The team uses a cloud service that supports link sharing and access history.

1. Choose who should have access to the restricted document.
2. Replace broad link sharing with a narrower, approved method.
3. Name one setting or record to review for unexpected access.
4. Describe how the team would confirm its backup can be restored.

Do not assume that a provider’s availability or backup feature automatically meets the organization’s recovery needs; confirm the configured service and test it.
`,
    keyTakeaways: [
      "Cloud security responsibilities vary by service, but customers retain important access and data duties.",
      "Review sharing settings and external access regularly.",
      "Backups must be protected and restoration must be tested.",
    ],
    practicalExercise: {
      title: "Cloud Folder Access and Recovery Review",
      description: "Check who can view sensitive files and how the team would recover them.",
      steps: [
        "Classify the customer document and identify its owner.",
        "Replace broad link access with named, least-privilege access.",
        "Review access history and external collaborators for unexpected activity.",
        "Restore a test copy using the approved recovery process and record the result.",
      ],
      labScenario: "A cloud folder is shared with anyone who has the link. It contains internal drafts and a restricted customer document. The team believes the provider keeps backups but has never tested a restore.",
      labQuestions: [
        { id: "cyber-5.3-lab-1", question: "What is the first sharing change to make?", answer: "Remove broad link access and grant named access only to people with an approved business need.", hint: "Apply classification and least privilege to the sensitive file." },
        { id: "cyber-5.3-lab-2", question: "How can the team gain confidence in recovery?", answer: "Run an approved restore test on a non-production copy, verify the result, and document the process and outcome.", hint: "A backup feature is not proof that restoration works." },
      ],
    },
  },
  {
    id: "cyber-6.1",
    courseId,
    title: "Logging and Monitoring Basics",
    content: `# Logging and Monitoring Basics

Logs record events such as sign-ins, file access, configuration changes, and security alerts. They help teams understand what happened and when, but only when important systems produce useful records and those records are protected.

## Make records useful

Useful logs identify the time, system, account, and event. Consistent time settings help investigators compare activity across services. Collect only what is appropriate, restrict access to logs, and keep them for a period that supports security and business needs.

## Monitoring is more than collecting

Monitoring turns events into signals that people or systems can review. A high number of alerts is not automatically good coverage. Rules need context, ownership, and tuning so important activity is visible without overwhelming responders.

## Investigate carefully

Correlate multiple sources before deciding what occurred. A failed sign-in may be a mistyped password; repeated failures followed by a successful sign-in from an unfamiliar location may deserve closer review. Record facts separately from assumptions and preserve relevant evidence according to policy.`,
    keyTakeaways: [
      "Logs support investigations when they are complete, time-aligned, and protected.",
      "Monitoring should produce actionable signals, not simply more alerts.",
      "Use multiple sources and distinguish verified facts from hypotheses.",
    ],
  },
  {
    id: "cyber-6.2",
    courseId,
    title: "Incident Response: First Steps",
    content: `# Incident Response: First Steps

An incident is an event that threatens the confidentiality, integrity, or availability of systems or information. A response process helps people act quickly without losing coordination or evidence.

## A practical response flow

1. **Report and assess:** capture what is known, when it began, and which users or systems are involved.
2. **Contain:** limit further harm using an approved action and the right authority.
3. **Preserve and investigate:** protect relevant evidence and determine scope.
4. **Eradicate and recover:** remove the cause, restore trusted services, and monitor for recurrence.
5. **Learn:** document decisions, impact, and improvements.

The order and details vary by incident. A lost laptop, suspected account takeover, and service outage do not require identical actions. Follow the organization’s procedures and escalate when the impact or uncertainty exceeds your role.

## Communicate with care

Use the designated incident channel. Share verified information only with people who need it. Do not post incident details publicly or contact suspected attackers. Record actions and times so the response can be reviewed later.`,
    keyTakeaways: [
      "Report promptly and use the organization’s incident process.",
      "Containment should be authorized and appropriate to the situation.",
      "Document actions and preserve evidence while keeping communication controlled.",
    ],
  },
  {
    id: "cyber-6.3",
    courseId,
    title: "Recovery, Continuity, and Lessons Learned",
    content: `# Recovery, Continuity, and Lessons Learned

Recovery returns services to a trustworthy state. It is more than turning systems back on: teams verify that the cause has been addressed, data is consistent, access is safe, and monitoring is ready.

## Plan for business needs

Business continuity planning identifies essential activities and workable alternatives during disruption. Recovery priorities should be agreed before an incident. Two useful measures are the **recovery time objective** (how long a service can be unavailable) and **recovery point objective** (how much recent data the organization can tolerate losing).

## Restore and validate

Use trusted backups and documented procedures. Restore in a controlled order, verify the result with service owners, and watch for signs of renewed activity. Communicate status in terms that users and decision-makers can act on.

## Practical exercise: Incident tabletop

At 09:10, a finance employee reports that shared files have become unreadable. The team has a recent alert about unusual access from the same account. No one has confirmed the cause.

1. Identify who should coordinate and who must be notified.
2. Record the first facts to collect without altering the affected files.
3. Select a containment action that follows the organization’s authority and procedure.
4. List the checks required before restoring access from backup.
5. After recovery, name one improvement to the process or control.

Avoid assuming every unreadable file is ransomware. Verify the facts, contain safely, and protect evidence while responders determine scope.
`,
    keyTakeaways: [
      "Recovery requires validation of service integrity, access, and monitoring.",
      "Recovery time and recovery point objectives help set business priorities.",
      "A post-incident review should produce specific owners and follow-up actions.",
    ],
    practicalExercise: {
      title: "Shared Files Incident Tabletop",
      description: "Practice coordinated, evidence-aware response decisions for a suspected incident.",
      steps: [
        "Record the reporter, time, affected account, service, and observed impact.",
        "Notify the designated incident coordinator and relevant service owner.",
        "Use approved containment authority and preserve relevant logs and files.",
        "Confirm the cause is addressed, restore a verified backup, and validate business access.",
        "Document lessons, owners, and dates for corrective actions.",
      ],
      labScenario: "A finance employee reports unreadable shared files at 09:10. An alert shows unusual access by the employee’s account earlier that morning, but the cause and scope are not yet confirmed.",
      labQuestions: [
        { id: "cyber-6.3-lab-1", question: "What should be recorded before response actions begin?", answer: "The report time, affected user and service, exact symptoms, relevant alerts, and actions taken so far.", hint: "Build a factual timeline before drawing conclusions." },
        { id: "cyber-6.3-lab-2", question: "What must be confirmed before restoring files?", answer: "The response team should address the cause, use a trusted backup, verify restored data and access, and monitor for recurrence.", hint: "Recovery is not complete until the service is trustworthy and checked." },
      ],
    },
  },
];

const makeQuestion = (
  id: string,
  scenario: string,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation: string,
  tags: string[],
  difficulty: QuizQuestion["difficulty"] = "easy",
): QuizQuestion => ({ id, scenario, question, options, correctAnswer, explanation, tags, difficulty });

const moduleQuizzes: QuizData[] = [
  {
    quizId: "cyber-q1", courseId, title: "Security Foundations Quiz",
    description: "Apply the CIA triad, risk language, and layered-control concepts to everyday decisions.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q1-1", "A booking service is unavailable for two hours after a power failure. Customer records were not exposed or changed.", "Which security goal was most directly affected?", ["Confidentiality", "Integrity", "Availability", "Authentication"], 2, "Availability concerns whether information and services are usable when needed.", ["CIA Triad"]),
      makeQuestion("cyber-q1-2", "A staff member finds that a shared spreadsheet's approved totals were altered without authorization.", "Which security goal is directly at risk?", ["Integrity", "Availability", "Confidentiality", "Non-repudiation"], 0, "Integrity is about accuracy and authorized changes to information.", ["CIA Triad"]),
      makeQuestion("cyber-q1-3", "A public-facing server runs an unsupported version of an application. The application has a known security weakness.", "Which statement best separates the terms?", ["The server is the threat and the attacker is the vulnerability", "The attacker or event is a threat; the software weakness is a vulnerability", "The risk is the software vendor", "There is no risk until an outage occurs"], 1, "A threat could exploit the vulnerability; risk describes the likelihood and impact for the organization.", ["Risk Basics"], "medium"),
      makeQuestion("cyber-q1-4", "A team has MFA, access reviews, audit logs, and tested backups protecting a finance service.", "What principle does this combination best demonstrate?", ["Defense in depth", "Single sign-on", "Risk acceptance", "Data minimization"], 0, "Layered preventive, detective, and recovery measures reduce reliance on one control.", ["Controls"]),
    ],
  },
  {
    quizId: "cyber-q2", courseId, title: "People and Threats Quiz",
    description: "Recognize social engineering cues and choose safe reporting and verification actions.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q2-1", "An email from a familiar supplier requests an urgent bank-detail change and asks the recipient not to call.", "What is the safest next step?", ["Reply to ask if the request is real", "Verify using a known supplier phone number and report the message", "Approve the change because the display name is familiar", "Forward the email to the whole finance team"], 1, "A separate, previously verified channel avoids relying on a potentially controlled email thread.", ["Phishing"]),
      makeQuestion("cyber-q2-2", "A user receives repeated MFA approval prompts that they did not initiate.", "What should the user do?", ["Approve one to stop the prompts", "Deny them and report the unexpected prompts", "Share the newest code with the help desk caller", "Disable MFA temporarily"], 1, "Unexpected prompts can signal an attempted sign-in; deny and report them through the approved channel.", ["Account Safety"]),
      makeQuestion("cyber-q2-3", "A user opened an unexpected attachment and then noticed unusual device behavior.", "What is the best first action?", ["Delete the attachment and continue working", "Report what happened through the incident process and follow responder direction", "Install a cleanup tool found online", "Post the file in a public forum for analysis"], 1, "Prompt reporting preserves facts and lets trained responders choose safe containment steps.", ["Incident Reporting"], "medium"),
      makeQuestion("cyber-q2-4", "A caller claiming to be IT asks for a one-time sign-in code to fix an account.", "What should the employee do?", ["Provide the code if the caller knows their name", "Refuse to share it and contact support using the official directory", "Send the code by email instead", "Ask the caller to repeat the code"], 1, "One-time codes should not be disclosed to unexpected callers; verify support using a known channel.", ["Social Engineering"]),
    ],
  },
  {
    quizId: "cyber-q3", courseId, title: "Identity and Access Quiz",
    description: "Check authentication, MFA, least privilege, and account lifecycle decisions.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q3-1", "An employee signs in with a password and a hardware security key. The system then checks whether the employee may edit payroll.", "Which term describes the permission check?", ["Identification", "Authentication", "Authorization", "Encryption"], 2, "Authorization determines what a verified identity is allowed to do.", ["Identity"]),
      makeQuestion("cyber-q3-2", "A contractor needs one project folder for three weeks, but a colleague offers access to the entire shared drive.", "Which access choice follows least privilege?", ["Grant full-drive access indefinitely", "Grant the project folder for the approved period and review or expire it", "Use a coworker's account", "Create a shared password for the team"], 1, "Scope and duration should match the contractor's actual work need.", ["Least Privilege"]),
      makeQuestion("cyber-q3-3", "A staff member moves from finance to marketing but still has access to finance systems.", "What should the access owner do?", ["Keep all existing access to avoid disruption", "Review the old role's permissions and remove what is no longer needed", "Share the account with the replacement", "Wait until the next annual audit"], 1, "Role changes should trigger timely review of permissions that no longer match job needs.", ["Access Review"], "medium"),
      makeQuestion("cyber-q3-4", "A service account has broad administrator access and no documented owner.", "What is the strongest first improvement?", ["Document an accountable owner and reduce permissions to the required tasks", "Make the password easier to remember", "Share the account with the service team", "Turn off logging to reduce noise"], 0, "A named owner and least-required permissions improve accountability and limit compromise impact.", ["Service Accounts"], "medium"),
    ],
  },
  {
    quizId: "cyber-q4", courseId, title: "Device and Network Protection Quiz",
    description: "Apply patching, endpoint, and network segmentation concepts to common scenarios.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q4-1", "An internet-facing business application has an actively exploited security issue. A test laptop also has an old update pending.", "Which should the team prioritize first?", ["The test laptop because it is easiest", "The exposed application, based on threat evidence and business impact", "Neither until the next annual review", "Both only after users report an attack"], 1, "Exposure, active threat evidence, and business impact guide update prioritization.", ["Patching"], "medium"),
      makeQuestion("cyber-q4-2", "An endpoint protection alert appears after a user opens an unexpected file.", "What should the user do?", ["Delete the alert and keep working", "Report the alert and follow the approved response instructions", "Download an unrelated cleanup utility", "Turn off endpoint protection"], 1, "The alert needs investigation; approved responders choose containment while preserving useful evidence.", ["Endpoint Protection"]),
      makeQuestion("cyber-q4-3", "Visitors use the same Wi-Fi network as internal accounting workstations.", "Which control most directly reduces unnecessary access between them?", ["Network segmentation with limited permitted paths", "A longer guest Wi-Fi password only", "Removing all system logs", "Allowing every device to communicate"], 0, "Segmentation limits communication between zones to required business paths.", ["Network Security"]),
      makeQuestion("cyber-q4-4", "An inventory review finds several devices with no assigned owner or supported software status.", "Why is this a security concern?", ["Unknown assets are harder to patch, monitor, and protect", "It improves confidentiality automatically", "It means the devices are safe if they are quiet", "Only cloud systems need an owner"], 0, "Asset ownership and support status are necessary for reliable security maintenance.", ["Asset Management"]),
    ],
  },
  {
    quizId: "cyber-q5", courseId, title: "Data and Cloud Security Quiz",
    description: "Assess data handling, secure communication, cloud responsibilities, and recovery basics.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q5-1", "A confidential customer export is saved to an employee's personal file-sharing account for convenience.", "What should happen?", ["Leave it there if the link is private", "Move it to an approved location, limit access, and report any exposure per policy", "Rename the file so it is harder to find", "Email the link to more coworkers"], 1, "Sensitive data belongs in approved storage with access matched to business need.", ["Data Handling"]),
      makeQuestion("cyber-q5-2", "A browser shows an encrypted connection to a sign-in page reached from an unexpected email.", "What does the encrypted connection prove?", ["The sender is legitimate", "The website is approved by the employer", "The connection is encrypted, but the destination still needs verification", "The account cannot be compromised"], 2, "Encryption protects traffic in transit but does not prove a site is trustworthy.", ["Web Safety"]),
      makeQuestion("cyber-q5-3", "A cloud provider secures its data center; the customer controls who can access a shared folder.", "Who is responsible for setting appropriate folder access?", ["Only the provider", "The customer organization", "The internet service provider", "No one if the folder is encrypted"], 1, "Shared responsibility varies by service, but customers generally remain responsible for their identities, data, and sharing settings.", ["Cloud Security"]),
      makeQuestion("cyber-q5-4", "A team relies on cloud backups but has never tried restoring a file.", "What is the main gap?", ["The restore process has not been tested", "Backups remove the need for access control", "The provider must disclose all customer passwords", "A backup is useful only if it is public"], 0, "A restore test confirms that protected backups can meet recovery needs.", ["Recovery"], "medium"),
    ],
  },
  {
    quizId: "cyber-q6", courseId, title: "Monitoring and Response Quiz",
    description: "Practice log interpretation, incident reporting, evidence care, and recovery decisions.", passingScore: 70, timeLimit: 12,
    questions: [
      makeQuestion("cyber-q6-1", "A log review shows several failed sign-ins followed by a success for the same account from an unfamiliar location.", "What is the best interpretation?", ["It proves the account was compromised", "It is a signal to validate with other evidence and the account owner or process", "It can be ignored because one sign-in succeeded", "The logs should be deleted"], 1, "Logs provide evidence for investigation but one pattern alone may not prove compromise.", ["Monitoring"], "medium"),
      makeQuestion("cyber-q6-2", "A finance user reports that shared files are unreadable and an alert shows unusual account activity.", "What should the user do first?", ["Report through the designated incident channel and preserve details", "Restore files from a personal USB drive", "Delete the account's activity logs", "Contact the suspected attacker"], 0, "Prompt reporting and evidence preservation let the response team coordinate safe containment.", ["Incident Response"]),
      makeQuestion("cyber-q6-3", "A responder wants to restore service after removing the suspected cause.", "Which check is essential before declaring recovery complete?", ["Confirm the trusted restore, validate access and data, and monitor for recurrence", "Assume the system is safe once it starts", "Remove all monitoring to avoid alerts", "Allow all users administrator access"], 0, "Recovery includes validation of system integrity, access, and ongoing monitoring.", ["Recovery"]),
      makeQuestion("cyber-q6-4", "Two logs show events three hours apart even though the team believes they happened moments apart.", "What should be checked?", ["Time synchronization and time zone settings", "Whether the usernames are capitalized", "The color of the alert dashboard", "Whether logs can be turned off"], 0, "Consistent time settings are necessary to build accurate event timelines.", ["Logs"]),
    ],
  },
];

const finalExamQuestions: QuizQuestion[] = [
  makeQuestion("cyber-q7-1", "A payroll portal is offline, but investigators find no evidence that records were changed or viewed.", "Which CIA goal is directly affected?", ["Confidentiality", "Integrity", "Availability", "Authorization"], 2, "The portal is unavailable to authorized users, so availability is affected.", ["CIA Triad"]),
  makeQuestion("cyber-q7-2", "A user discovers that an unauthorized person read a restricted customer file.", "Which goal was directly violated?", ["Confidentiality", "Availability", "Integrity", "Recovery"], 0, "Confidentiality requires information to be visible only to authorized people.", ["CIA Triad"]),
  makeQuestion("cyber-q7-3", "A company documents that a weak remote-access setting could expose a sensitive service and estimates potential business impact.", "What is the team assessing?", ["Risk", "Only availability", "Authentication", "Data classification"], 0, "Risk connects a potential threat and weakness to likelihood and business impact.", ["Risk Basics"]),
  makeQuestion("cyber-q7-4", "One safeguard can fail, so the organization uses MFA, sign-in monitoring, access review, and tested recovery.", "What is this layered approach called?", ["Defense in depth", "Risk transfer", "Data minimization", "Single sign-on"], 0, "Multiple complementary controls reduce dependence on any one measure.", ["Controls"]),
  makeQuestion("cyber-q7-5", "A known supplier requests an immediate payment-detail update and says normal verification is unnecessary.", "What is the safest response?", ["Verify through the supplier contact already on file and report the request", "Update the record because the display name is known", "Reply to the email address and wait", "Send the request to all employees"], 0, "A separate verified channel avoids trusting potentially compromised message details.", ["Social Engineering"]),
  makeQuestion("cyber-q7-6", "An employee receives a one-time sign-in code after denying an unexpected MFA prompt.", "What should they do with the code?", ["Share it with the caller who claims to be IT", "Keep it private and report the unexpected prompt", "Post it in the team chat", "Use it to approve the pending sign-in"], 1, "Codes are secrets; unexpected prompts should be denied and reported.", ["MFA"]),
  makeQuestion("cyber-q7-7", "A user clicked a suspicious link but did not enter information and is unsure what loaded.", "What action best supports response?", ["Report the event promptly with the link and what happened", "Delete browser history and say nothing", "Forward the link to coworkers for review", "Install a tool found through a search"], 0, "Prompt, factual reporting helps responders validate the event and identify other exposure.", ["Incident Reporting"]),
  makeQuestion("cyber-q7-8", "An employee changes roles and no longer needs access to a finance application.", "What should the application owner do?", ["Review and remove unneeded access", "Keep all permissions forever", "Transfer the employee's account to a colleague", "Disable audit records"], 0, "Role changes should trigger access reviews and removal of permissions no longer required.", ["Access Review"]),
  makeQuestion("cyber-q7-9", "A temporary worker needs a single folder for a short project.", "Which grant is most appropriate?", ["A named, time-limited folder permission approved by its owner", "Full administrative access to every team drive", "A coworker's shared password", "An indefinite public link"], 0, "Least privilege and an expiry date align access with the work and timeframe.", ["Least Privilege"]),
  makeQuestion("cyber-q7-10", "A service account has no owner and can change organization-wide settings.", "Which improvement best reduces risk?", ["Assign an accountable owner and restrict the account to required tasks", "Share its secret in a group chat", "Turn off sign-in monitoring", "Rename it to look like a person"], 0, "Ownership and scoped permissions improve accountability and limit the impact of misuse.", ["Service Accounts"], "medium"),
  makeQuestion("cyber-q7-11", "An internet-facing service has a critical issue with evidence of active exploitation; a test device has a routine update pending.", "Which remediation should be prioritized?", ["The exposed service, based on exploit evidence and business impact", "The test device because it is simpler", "Neither before the annual review", "Only the system whose user complains"], 0, "Exposure, threat activity, and impact help prioritize remediation.", ["Patching"], "medium"),
  makeQuestion("cyber-q7-12", "An employee sees an endpoint protection alert for a file they did not expect.", "What should they do?", ["Report the alert and follow approved responder direction", "Disable protection and reopen the file", "Delete system logs", "Download an unapproved cleanup tool"], 0, "Approved reporting supports safe investigation and evidence preservation.", ["Endpoint Protection"]),
  makeQuestion("cyber-q7-13", "Guest devices can reach internal HR workstations without a business need.", "Which safeguard most directly limits that path?", ["Network segmentation and narrowly allowed connections", "A public website banner", "Longer log retention only", "Giving guests internal accounts"], 0, "Segmentation limits unnecessary paths between network zones.", ["Network Security"]),
  makeQuestion("cyber-q7-14", "A device list includes unassigned laptops with unknown patch status.", "What should the team do first?", ["Identify an owner and confirm support and update status", "Assume no owner means no data", "Remove them from monitoring", "Wait until they generate an alert"], 0, "Inventory and ownership are prerequisites for patching and monitoring.", ["Asset Management"]),
  makeQuestion("cyber-q7-15", "A confidential file is downloaded from a business system to a personal cloud account.", "What is the right response?", ["Move it to approved storage, restrict access, and report according to policy", "Keep it if the link is unlisted", "Rename it and share the link", "Delete the original business record"], 0, "Sensitive data should use approved storage and access rules; exposure should be reported.", ["Data Handling"]),
  makeQuestion("cyber-q7-16", "A sign-in link uses an encrypted connection but came from an unexpected email.", "What should the recipient conclude?", ["Encryption protects the connection but does not prove the site is legitimate", "The site is verified because it is encrypted", "The account is protected from all attacks", "The email sender has been authenticated"], 0, "Transport encryption does not establish the destination's trustworthiness.", ["Web Safety"]),
  makeQuestion("cyber-q7-17", "A customer controls the identities and sharing settings for a cloud folder while the provider manages its data center.", "Who should set the folder's least-privilege access?", ["The customer organization", "Only the facility landlord", "The user's home internet provider", "No one if a backup exists"], 0, "Customers retain responsibility for their data and access configuration in most cloud models.", ["Cloud Security"]),
  makeQuestion("cyber-q7-18", "A team has cloud backups but has never verified a restore.", "What is the best next step?", ["Run an approved restore test and document the result", "Assume the provider guarantees recovery", "Make the backup public", "Disable access reviews"], 0, "Testing validates that a backup can meet recovery requirements.", ["Backups"]),
  makeQuestion("cyber-q7-19", "A security log records a sign-in but omits the time zone and device identity.", "What would most improve its investigative value?", ["Consistent timestamps and enough context to identify the event source", "More decorative charts", "Removing access restrictions", "Shortening all log retention to one day"], 0, "Time alignment and relevant context make records easier to correlate.", ["Logging"]),
  makeQuestion("cyber-q7-20", "A monitoring rule produces hundreds of alerts but rarely identifies actionable activity.", "What should the security team do?", ["Review context, tune the rule, and assign an owner", "Disable all monitoring", "Send every alert to all employees", "Treat each alert as a confirmed incident"], 0, "Monitoring needs context and tuning to create useful, manageable signals.", ["Monitoring"], "medium"),
  makeQuestion("cyber-q7-21", "A user reports that shared files are unreadable and a related unusual-access alert is available.", "What is a strong first response?", ["Notify the designated incident channel and preserve details for responders", "Restore from an unknown USB drive", "Delete the account logs", "Publish the alert publicly"], 0, "Prompt reporting and preservation let the incident team coordinate containment and investigation.", ["Incident Response"]),
  makeQuestion("cyber-q7-22", "A responder is considering isolating a business system during a suspected incident.", "What should guide the action?", ["The approved response procedure, authority, and potential business impact", "A guess from an unrelated online post", "The desire to remove all evidence", "A user request to disable logging"], 0, "Containment should follow authority and response plans while accounting for impact.", ["Containment"], "medium"),
  makeQuestion("cyber-q7-23", "Two systems report related activity with timestamps that differ by several hours.", "What should responders check?", ["Clock synchronization and time-zone configuration", "Whether the systems have matching wallpapers", "Whether the logs can be erased", "The length of the device names"], 0, "Consistent clocks help create an accurate event timeline.", ["Incident Investigation"]),
  makeQuestion("cyber-q7-24", "A service was restored from a backup after an incident.", "What should happen before closing the recovery effort?", ["Validate data, access, and service behavior, then monitor for recurrence", "Assume service startup proves integrity", "Remove monitoring to reduce noise", "Grant broad access to all staff"], 0, "A trusted recovery includes validation and continued monitoring.", ["Recovery"]),
  makeQuestion("cyber-q7-25", "A business owner says the customer portal can be unavailable for no more than four hours.", "Which planning measure does this describe?", ["Recovery time objective", "Recovery point objective", "Data classification", "Risk acceptance"], 0, "The recovery time objective describes the target time to restore a service.", ["Continuity"]),
  makeQuestion("cyber-q7-26", "A business can tolerate losing no more than thirty minutes of recent transaction data.", "Which planning measure describes this limit?", ["Recovery point objective", "Recovery time objective", "Mean time to detect", "Access review interval"], 0, "The recovery point objective expresses the acceptable amount of data loss measured in time.", ["Continuity"]),
  makeQuestion("cyber-q7-27", "A team has completed a response but has not recorded decisions, timelines, or improvements.", "What is the most useful next step?", ["Conduct a documented lessons-learned review with owners and follow-up dates", "Delete the incident record", "Avoid discussing the event", "Blame the first person who reported it"], 0, "A constructive review turns response experience into specific improvements.", ["Lessons Learned"]),
  makeQuestion("cyber-q7-28", "An employee accidentally shares a restricted file with the wrong recipient.", "What should the employee do?", ["Report it promptly with the recipient, file, and time", "Hide the message and wait", "Send more files to clarify", "Delete the audit trail"], 0, "Fast and factual reporting gives the organization a chance to limit exposure and assess impact.", ["Data Incident"]),
  makeQuestion("cyber-q7-29", "A team wants one control to protect a critical service, but no single product addresses all its risks.", "Which strategy is most appropriate?", ["Combine suitable preventive, detective, and recovery controls", "Rely on an untested backup alone", "Remove monitoring to simplify operations", "Give all users administrator access"], 0, "Layered controls reduce risk across prevention, detection, and recovery.", ["Defense in Depth"]),
  makeQuestion("cyber-q7-30", "A manager accepts a medium risk because a change cannot be made this month.", "What should make the decision accountable?", ["Record the rationale, owner, compensating controls, and review date", "Leave it undocumented", "Assume it is permanently resolved", "Remove the asset from inventory"], 0, "Risk acceptance is a managed decision that needs accountability and a future review.", ["Risk Management"], "medium"),
];

export const cybersecurityFundamentalsQuizzes: QuizData[] = [
  ...moduleQuizzes,
  {
    quizId: "cyber-q7",
    courseId,
    title: "Cybersecurity Fundamentals Certification Exam",
    description: "A scenario-based final assessment covering all six course modules.",
    questions: finalExamQuestions,
    passingScore: 80,
    timeLimit: 60,
  },
];