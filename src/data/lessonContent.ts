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
