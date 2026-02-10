export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  status: "completed" | "unlocked" | "locked";
}

export interface Module {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  lessons: Lesson[];
  quizId?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  passingScore: number;
  duration: string;
  status: "completed" | "unlocked" | "locked";
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "cheatsheet" | "template" | "tool" | "link";
  url?: string;
}

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  bgImage: string;
  modules: Module[];
  quizzes?: Quiz[];
  resources?: Resource[];
}

export const courses: Course[] = [
  {
    id: "soc-fundamentals",
    title: "Blue Team & SOC Fundamentals",
    shortTitle: "SOC Level 1",
    description: "Build your foundation as a Level 1 SOC analyst and step into the world of cybersecurity defense. This course covers the essential skills, tools, and workflows you need to detect and respond to threats effectively.",
    difficulty: "easy",
    duration: "12 hours",
    bgImage: "soc-course-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Introduction to Security Operations",
        quizId: "q1",
        lessons: [
          { 
            id: "1.1", 
            title: "Welcome to the SOC", 
            description: "Understand what a Security Operations Center is, its mission, and how it fits into an organization's security posture.",
            duration: "15 min",
            status: "completed" 
          },
          { 
            id: "1.2", 
            title: "SOC Team Roles & Responsibilities", 
            description: "Learn about different SOC roles from L1 Analyst to SOC Manager and their daily responsibilities.",
            duration: "20 min",
            status: "unlocked" 
          },
          { 
            id: "1.3", 
            title: "SOC Tools & Technologies Overview", 
            description: "Introduction to SIEM, EDR, IDS/IPS, and other essential SOC tools.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "1.4", 
            title: "SOC Workflows & Shift Handover", 
            description: "Understanding ticketing systems, escalation procedures, and shift management.",
            duration: "20 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "2",
        title: "Cyber Threat Landscape",
        quizId: "q2",
        lessons: [
          { 
            id: "2.1", 
            title: "Understanding Threat Actors", 
            description: "Learn about different threat actors: nation-states, cybercriminals, hacktivists, and insiders.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "2.2", 
            title: "Common Attack Vectors", 
            description: "Explore phishing, malware delivery, exploitation, and social engineering techniques.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "2.3", 
            title: "Malware Categories & Behavior", 
            description: "Overview of viruses, worms, trojans, ransomware, rootkits, and their characteristics.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "2.4", 
            title: "Introduction to MITRE ATT&CK", 
            description: "Understanding the ATT&CK framework and how it maps adversary behavior.",
            duration: "30 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "3",
        title: "Log Analysis Fundamentals",
        quizId: "q3",
        lessons: [
          { 
            id: "3.1", 
            title: "Why Logs Matter in Security", 
            description: "The importance of logging for detection, investigation, and compliance.",
            duration: "15 min",
            status: "locked" 
          },
          { 
            id: "3.2", 
            title: "Windows Event Log Essentials", 
            description: "Key Windows Event IDs: 4624, 4625, 4688, 4720, 4732, and their significance.",
            duration: "40 min",
            status: "locked" 
          },
          { 
            id: "3.3", 
            title: "Linux Log Analysis Basics", 
            description: "Understanding auth.log, syslog, and secure logs for threat detection.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "3.4", 
            title: "Network Device Logs", 
            description: "Analyzing firewall, proxy, and DNS logs for suspicious activity.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "3.5", 
            title: "Hands-On: Log Analysis Challenge", 
            description: "Practice identifying malicious activity in sample log files.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "4",
        title: "SIEM Fundamentals",
        lessons: [
          { 
            id: "4.1", 
            title: "What is a SIEM?", 
            description: "Understanding SIEM architecture, data flow, and core capabilities.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "4.2", 
            title: "SIEM Navigation & Interface", 
            description: "Learning to navigate dashboards, search interfaces, and alert queues.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "4.3", 
            title: "Basic Search Queries", 
            description: "Writing simple queries to find specific events and patterns.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "4.4", 
            title: "Correlation Rules & Alerts", 
            description: "How SIEM correlates events and generates security alerts.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "4.5", 
            title: "Hands-On: SIEM Investigation Lab", 
            description: "Practice investigating alerts using a SIEM platform.",
            duration: "50 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "5",
        title: "Alert Triage & Analysis",
        quizId: "q4",
        lessons: [
          { 
            id: "5.1", 
            title: "Understanding Security Alerts", 
            description: "Alert anatomy, severity levels, and initial assessment techniques.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "5.2", 
            title: "The Triage Process", 
            description: "Step-by-step methodology for efficient alert triage.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "5.3", 
            title: "True Positive vs False Positive", 
            description: "Techniques to distinguish real threats from noise.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "5.4", 
            title: "Enrichment & Context Gathering", 
            description: "Using threat intel, reputation services, and context to validate alerts.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "5.5", 
            title: "Documentation & Escalation", 
            description: "Proper alert documentation and when/how to escalate.",
            duration: "25 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "6",
        title: "Threat Intelligence Basics",
        lessons: [
          { 
            id: "6.1", 
            title: "Introduction to Threat Intelligence", 
            description: "What is threat intel and how SOC analysts use it.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "6.2", 
            title: "IOC Types & Usage", 
            description: "Understanding IPs, domains, hashes, URLs, and how to leverage them.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "6.3", 
            title: "OSINT for SOC Analysts", 
            description: "Free tools and techniques for threat research.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "6.4", 
            title: "Threat Intel Platforms", 
            description: "Overview of VirusTotal, AbuseIPDB, Shodan, and other resources.",
            duration: "25 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "7",
        title: "Incident Response Introduction",
        quizId: "q5",
        lessons: [
          { 
            id: "7.1", 
            title: "Incident Response Lifecycle", 
            description: "NIST framework: Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "7.2", 
            title: "Incident Classification & Severity", 
            description: "How to classify incidents and determine priority.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "7.3", 
            title: "Initial Containment Actions", 
            description: "First response actions for common incident types.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "7.4", 
            title: "Incident Documentation", 
            description: "Creating effective incident tickets and reports.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "7.5", 
            title: "Hands-On: Phishing Incident Response", 
            description: "Walk through a complete phishing incident from detection to resolution.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "8",
        title: "Endpoint Detection & Response",
        lessons: [
          { 
            id: "8.1", 
            title: "What is EDR?", 
            description: "Understanding endpoint detection and response technology.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "8.2", 
            title: "EDR Alerts & Telemetry", 
            description: "Types of EDR alerts and endpoint telemetry data.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "8.3", 
            title: "Process Analysis Basics", 
            description: "Understanding process trees, parent-child relationships, and suspicious behavior.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "8.4", 
            title: "Hands-On: EDR Investigation", 
            description: "Practice investigating EDR alerts in a simulated environment.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "9",
        title: "Network Security Monitoring",
        lessons: [
          { 
            id: "9.1", 
            title: "Network Security Fundamentals", 
            description: "OSI model, TCP/IP, and network security concepts for SOC analysts.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "9.2", 
            title: "IDS/IPS Basics", 
            description: "Understanding intrusion detection and prevention systems.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "9.3", 
            title: "Network Traffic Analysis", 
            description: "Basics of analyzing network flows and packet captures.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "9.4", 
            title: "Common Network Attacks", 
            description: "Recognizing port scans, C2 traffic, data exfiltration, and lateral movement.",
            duration: "30 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "10",
        title: "SOC Analyst Best Practices",
        quizId: "q6",
        lessons: [
          { 
            id: "10.1", 
            title: "Building Investigation Skills", 
            description: "Developing critical thinking and analytical mindset.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "10.2", 
            title: "Avoiding Analyst Burnout", 
            description: "Mental health, work-life balance, and career sustainability.",
            duration: "15 min",
            status: "locked" 
          },
          { 
            id: "10.3", 
            title: "Continuous Learning Path", 
            description: "Certifications, communities, and resources for career growth.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "10.4", 
            title: "Course Summary & Next Steps", 
            description: "Review key concepts and prepare for advanced training.",
            duration: "15 min",
            status: "locked" 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: "q1",
        title: "SOC Fundamentals Quiz",
        description: "Test your understanding of SOC operations, team roles, and basic workflows.",
        questionCount: 15,
        passingScore: 70,
        duration: "20 min",
        status: "unlocked",
      },
      {
        id: "q2",
        title: "Threat Landscape Assessment",
        description: "Evaluate your knowledge of threat actors, attack vectors, and MITRE ATT&CK.",
        questionCount: 20,
        passingScore: 75,
        duration: "25 min",
        status: "locked",
      },
      {
        id: "q3",
        title: "Log Analysis Challenge",
        description: "Practical quiz on Windows, Linux, and network log analysis.",
        questionCount: 15,
        passingScore: 70,
        duration: "30 min",
        status: "locked",
      },
      {
        id: "q4",
        title: "SIEM & Alert Triage Quiz",
        description: "Test your SIEM knowledge and alert triage methodology.",
        questionCount: 20,
        passingScore: 75,
        duration: "25 min",
        status: "locked",
      },
      {
        id: "q5",
        title: "Incident Response Basics",
        description: "Assess your understanding of the IR lifecycle and containment procedures.",
        questionCount: 15,
        passingScore: 70,
        duration: "20 min",
        status: "locked",
      },
      {
        id: "q6",
        title: "Final Certification Exam",
        description: "Comprehensive exam covering all course modules. Required for certification.",
        questionCount: 50,
        passingScore: 80,
        duration: "60 min",
        status: "locked",
      },
    ],
    resources: [
      {
        id: "r1",
        title: "SOC Analyst Cheat Sheet",
        description: "Quick reference guide for common SOC tasks, commands, and procedures.",
        type: "cheatsheet",
      },
      {
        id: "r2",
        title: "Windows Event ID Reference",
        description: "Comprehensive list of critical Windows Security Event IDs for threat detection.",
        type: "pdf",
      },
      {
        id: "r3",
        title: "Linux Log Analysis Guide",
        description: "Reference guide for analyzing Linux system and authentication logs.",
        type: "pdf",
      },
      {
        id: "r4",
        title: "Alert Triage Workflow Template",
        description: "Step-by-step template for consistent alert triage and documentation.",
        type: "template",
      },
      {
        id: "r5",
        title: "Incident Response Runbook",
        description: "Playbook template for common incident types including phishing and malware.",
        type: "template",
      },
      {
        id: "r6",
        title: "MITRE ATT&CK Navigator",
        description: "Interactive tool for exploring and mapping adversary techniques.",
        type: "link",
        url: "https://mitre-attack.github.io/attack-navigator/",
      },
      {
        id: "r7",
        title: "VirusTotal",
        description: "Free service for analyzing files, URLs, and IP addresses for threats.",
        type: "link",
        url: "https://www.virustotal.com/",
      },
      {
        id: "r8",
        title: "AbuseIPDB",
        description: "IP address threat intelligence and reputation checking.",
        type: "link",
        url: "https://www.abuseipdb.com/",
      },
      {
        id: "r9",
        title: "Threat Intel Tools List",
        description: "Curated list of free OSINT and threat intelligence tools for analysts.",
        type: "pdf",
      },
      {
        id: "r10",
        title: "SOC Metrics & KPIs Guide",
        description: "Understanding MTTD, MTTR, and other key SOC performance metrics.",
        type: "pdf",
      },
    ],
  },
  {
    id: "log-analysis",
    title: "Log Analysis for Beginners",
    shortTitle: "Log Analysis",
    description: "Start your journey into log analysis. Learn to read, parse, and understand security logs from various sources including Windows, Linux, and network devices.",
    difficulty: "easy",
    duration: "8 hours",
    bgImage: "courses/log-analysis-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Introduction to Security Logs",
        quizId: "la-q1",
        lessons: [
          { 
            id: "1.1", 
            title: "What are Security Logs?",
            description: "Understanding what logs are, why they matter for security, and how they help detect threats.",
            duration: "15 min",
            status: "completed" 
          },
          { 
            id: "1.2", 
            title: "Common Log Formats", 
            description: "Learn about Syslog, CEF, JSON, CSV, and other standard log formats used in security.",
            duration: "20 min",
            status: "unlocked" 
          },
          { 
            id: "1.3", 
            title: "Log Sources Overview", 
            description: "Explore different log sources: endpoints, servers, network devices, applications, and cloud services.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "1.4", 
            title: "Log Collection & Centralization", 
            description: "How logs are collected, forwarded, and centralized for analysis in a SIEM.",
            duration: "20 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "2",
        title: "Windows Event Logs",
        quizId: "la-q2",
        lessons: [
          { 
            id: "2.1", 
            title: "Windows Event Log Architecture", 
            description: "Understanding Windows Event Log structure, channels, and the Event Viewer tool.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "2.2", 
            title: "Critical Security Event IDs", 
            description: "Deep dive into Event IDs 4624, 4625, 4688, 4720, 4732, 4768, 4769, and more.",
            duration: "40 min",
            status: "locked" 
          },
          { 
            id: "2.3", 
            title: "Authentication & Logon Analysis", 
            description: "Analyzing logon types, authentication protocols, and detecting suspicious login patterns.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "2.4", 
            title: "Process & Command Line Logging", 
            description: "Understanding Event ID 4688, Sysmon, and command-line auditing for threat detection.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "2.5", 
            title: "PowerShell Logging", 
            description: "Module, Script Block, and Transcription logging for detecting malicious PowerShell.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "2.6", 
            title: "Hands-On: Windows Log Investigation", 
            description: "Practice identifying suspicious activity in Windows event logs.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "3",
        title: "Linux System Logs",
        quizId: "la-q3",
        lessons: [
          { 
            id: "3.1", 
            title: "Linux Logging Architecture", 
            description: "Understanding syslog, rsyslog, journald, and the /var/log directory structure.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "3.2", 
            title: "Authentication Logs (auth.log/secure)", 
            description: "Analyzing SSH logins, sudo usage, PAM events, and failed authentication attempts.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "3.3", 
            title: "System & Application Logs", 
            description: "Working with syslog, kern.log, daemon.log, and application-specific logs.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "3.4", 
            title: "Web Server Logs (Apache/Nginx)", 
            description: "Parsing access and error logs, detecting web attacks and suspicious requests.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "3.5", 
            title: "Hands-On: Linux Log Analysis Challenge", 
            description: "Investigate a simulated breach using only Linux log files.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "4",
        title: "Network Device Logs",
        quizId: "la-q4",
        lessons: [
          { 
            id: "4.1", 
            title: "Firewall Log Analysis", 
            description: "Understanding firewall log formats, allow/deny decisions, and traffic patterns.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "4.2", 
            title: "Proxy & Web Gateway Logs", 
            description: "Analyzing HTTP/HTTPS traffic, user agents, and detecting C2 communications.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "4.3", 
            title: "DNS Query Logs", 
            description: "Detecting DNS tunneling, DGA domains, and suspicious DNS queries.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "4.4", 
            title: "VPN & Remote Access Logs", 
            description: "Monitoring VPN connections, geographic anomalies, and unauthorized access.",
            duration: "25 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "5",
        title: "Log Analysis Techniques",
        lessons: [
          { 
            id: "5.1", 
            title: "Pattern Recognition & Baseline", 
            description: "Establishing normal baselines and identifying deviations.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "5.2", 
            title: "Timeline Reconstruction", 
            description: "Building chronological timelines from multiple log sources.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "5.3", 
            title: "Correlation Across Sources", 
            description: "Connecting events from different logs to see the full picture.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "5.4", 
            title: "Command Line Tools for Logs", 
            description: "Using grep, awk, sed, cut, and other CLI tools for log analysis.",
            duration: "40 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "6",
        title: "Practical Log Analysis",
        quizId: "la-q5",
        lessons: [
          { 
            id: "6.1", 
            title: "Detecting Brute Force Attacks", 
            description: "Identifying password spraying and brute force patterns in logs.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "6.2", 
            title: "Detecting Lateral Movement", 
            description: "Finding signs of attackers moving through the network.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "6.3", 
            title: "Detecting Data Exfiltration", 
            description: "Identifying unusual data transfers and potential data theft.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "6.4", 
            title: "Final Practical Challenge", 
            description: "Complete investigation scenario using all log analysis skills.",
            duration: "60 min",
            status: "locked" 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: "la-q1",
        title: "Log Fundamentals Quiz",
        description: "Test your understanding of log formats, sources, and basic concepts.",
        questionCount: 15,
        passingScore: 70,
        duration: "15 min",
        status: "unlocked",
      },
      {
        id: "la-q2",
        title: "Windows Event Log Mastery",
        description: "Assess your knowledge of Windows Event IDs and log analysis.",
        questionCount: 20,
        passingScore: 75,
        duration: "25 min",
        status: "locked",
      },
      {
        id: "la-q3",
        title: "Linux Log Analysis Challenge",
        description: "Practical quiz on Linux system and authentication logs.",
        questionCount: 15,
        passingScore: 70,
        duration: "20 min",
        status: "locked",
      },
      {
        id: "la-q4",
        title: "Network Log Analysis",
        description: "Test your skills on firewall, proxy, and DNS log analysis.",
        questionCount: 15,
        passingScore: 70,
        duration: "20 min",
        status: "locked",
      },
      {
        id: "la-q5",
        title: "Final Certification Exam",
        description: "Comprehensive exam covering all log analysis modules. Required for certification.",
        questionCount: 40,
        passingScore: 80,
        duration: "45 min",
        status: "locked",
      },
    ],
    resources: [
      {
        id: "la-r1",
        title: "Windows Event ID Cheat Sheet",
        description: "Quick reference for critical Windows Security Event IDs and their meanings.",
        type: "cheatsheet",
      },
      {
        id: "la-r2",
        title: "Linux Log Files Reference",
        description: "Comprehensive guide to Linux log file locations and their purposes.",
        type: "pdf",
      },
      {
        id: "la-r3",
        title: "Log Analysis CLI Commands",
        description: "Collection of grep, awk, sed, and other CLI commands for log parsing.",
        type: "cheatsheet",
      },
      {
        id: "la-r4",
        title: "Common Attack Patterns in Logs",
        description: "Reference guide showing how different attacks appear in various log sources.",
        type: "pdf",
      },
      {
        id: "la-r5",
        title: "Sysmon Configuration Guide",
        description: "Best practices for configuring Sysmon for enhanced Windows logging.",
        type: "template",
      },
      {
        id: "la-r6",
        title: "Log Parsing Regex Patterns",
        description: "Regular expressions for extracting data from common log formats.",
        type: "cheatsheet",
      },
      {
        id: "la-r7",
        title: "CyberChef",
        description: "Web-based tool for decoding, parsing, and analyzing data from logs.",
        type: "link",
        url: "https://gchq.github.io/CyberChef/",
      },
      {
        id: "la-r8",
        title: "Windows Event Log Encyclopedia",
        description: "Ultimate Windows Security reference for all event IDs.",
        type: "link",
        url: "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/",
      },
    ],
  },
  {
    id: "siem-fundamentals",
    title: "SIEM Fundamentals",
    shortTitle: "SIEM Basics",
    description: "Master Security Information and Event Management basics. Learn to navigate and understand modern SIEM platforms, create queries, build dashboards, and respond to alerts effectively.",
    difficulty: "easy",
    duration: "10 hours",
    bgImage: "courses/siem-fundamentals-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Introduction to SIEM",
        quizId: "siem-q1",
        lessons: [
          { 
            id: "1.1", 
            title: "What is SIEM?",
            description: "Understanding SIEM technology, its purpose, and how it fits into modern security operations.",
            duration: "20 min",
            status: "unlocked" 
          },
          { 
            id: "1.2", 
            title: "SIEM Architecture & Components", 
            description: "Learn about data collectors, indexers, search heads, and the data flow in SIEM platforms.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "1.3", 
            title: "Popular SIEM Platforms Overview", 
            description: "Compare Splunk, Microsoft Sentinel, Elastic SIEM, QRadar, and other major platforms.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "1.4", 
            title: "SIEM Use Cases in Security", 
            description: "Real-world applications: threat detection, compliance, incident response, and forensics.",
            duration: "20 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "2",
        title: "Data Ingestion & Management",
        quizId: "siem-q2",
        lessons: [
          { 
            id: "2.1", 
            title: "Log Collection Methods", 
            description: "Agent-based vs agentless collection, syslog, API integrations, and forwarders.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "2.2", 
            title: "Data Normalization & Parsing", 
            description: "Converting raw logs into structured, searchable data with field extraction.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "2.3", 
            title: "Data Sources & Indexing", 
            description: "Understanding indexes, source types, and how data is organized for efficient searching.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "2.4", 
            title: "Data Retention & Storage", 
            description: "Managing data lifecycle, hot/warm/cold storage tiers, and compliance requirements.",
            duration: "20 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "3",
        title: "Search & Query Fundamentals",
        lessons: [
          { 
            id: "3.1", 
            title: "Basic Search Syntax", 
            description: "Writing your first SIEM queries, using keywords, and understanding search modes.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "3.2", 
            title: "Filtering & Field Extraction", 
            description: "Narrowing results with filters, boolean operators, and extracting specific fields.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "3.3", 
            title: "Time Range & Wildcards", 
            description: "Searching across time periods, using wildcards, and optimizing search performance.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "3.4", 
            title: "Hands-On: Basic Search Lab", 
            description: "Practice writing queries to find specific security events in sample data.",
            duration: "40 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "4",
        title: "Advanced Query Techniques",
        quizId: "siem-q3",
        lessons: [
          { 
            id: "4.1", 
            title: "Aggregation & Statistics", 
            description: "Using stats, count, sum, avg, and other aggregation commands for analysis.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "4.2", 
            title: "Joins & Lookups", 
            description: "Combining data from multiple sources and enriching events with lookup tables.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "4.3", 
            title: "Subsearches & Transactions", 
            description: "Building complex queries with nested searches and grouping related events.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "4.4", 
            title: "Hands-On: Advanced Query Lab", 
            description: "Create complex queries to investigate a simulated security incident.",
            duration: "45 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "5",
        title: "Dashboards & Visualization",
        lessons: [
          { 
            id: "5.1", 
            title: "Dashboard Fundamentals", 
            description: "Creating effective security dashboards with charts, tables, and single value panels.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "5.2", 
            title: "Visualization Types", 
            description: "Choosing the right chart: line, bar, pie, heatmaps, and geographic maps.",
            duration: "25 min",
            status: "locked" 
          },
          { 
            id: "5.3", 
            title: "Interactive Dashboards", 
            description: "Adding drill-downs, filters, time pickers, and dynamic inputs to dashboards.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "5.4", 
            title: "Hands-On: Build a SOC Dashboard", 
            description: "Create a functional security operations dashboard from scratch.",
            duration: "50 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "6",
        title: "Alerts & Correlation Rules",
        quizId: "siem-q4",
        lessons: [
          { 
            id: "6.1", 
            title: "Understanding SIEM Alerts", 
            description: "How alerts are generated, severity levels, and alert fatigue management.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "6.2", 
            title: "Creating Detection Rules", 
            description: "Building correlation rules to detect suspicious patterns and behaviors.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "6.3", 
            title: "Alert Tuning & Optimization", 
            description: "Reducing false positives and improving detection accuracy over time.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "6.4", 
            title: "Alert Response Actions", 
            description: "Configuring notifications, automated responses, and escalation workflows.",
            duration: "25 min",
            status: "locked" 
          },
        ],
      },
      {
        id: "7",
        title: "Practical SIEM Operations",
        quizId: "siem-q5",
        lessons: [
          { 
            id: "7.1", 
            title: "Alert Triage Workflow", 
            description: "Step-by-step process for investigating and responding to SIEM alerts.",
            duration: "30 min",
            status: "locked" 
          },
          { 
            id: "7.2", 
            title: "Investigation Techniques", 
            description: "Using SIEM to pivot, correlate, and build investigation timelines.",
            duration: "35 min",
            status: "locked" 
          },
          { 
            id: "7.3", 
            title: "SIEM Best Practices", 
            description: "Tips for effective SIEM usage, query optimization, and daily operations.",
            duration: "20 min",
            status: "locked" 
          },
          { 
            id: "7.4", 
            title: "Final Practical Challenge", 
            description: "Complete a full investigation scenario using all learned SIEM skills.",
            duration: "60 min",
            status: "locked" 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: "siem-q1",
        title: "SIEM Fundamentals Quiz",
        description: "Test your understanding of SIEM architecture, components, and basic concepts.",
        questionCount: 15,
        passingScore: 70,
        duration: "15 min",
        status: "unlocked",
      },
      {
        id: "siem-q2",
        title: "Data Ingestion Assessment",
        description: "Evaluate your knowledge of log collection, normalization, and data management.",
        questionCount: 15,
        passingScore: 70,
        duration: "15 min",
        status: "locked",
      },
      {
        id: "siem-q3",
        title: "Search & Query Mastery",
        description: "Practical quiz on writing SIEM queries and search techniques.",
        questionCount: 20,
        passingScore: 75,
        duration: "25 min",
        status: "locked",
      },
      {
        id: "siem-q4",
        title: "Dashboards & Alerts Quiz",
        description: "Test your skills on visualization, dashboards, and alert configuration.",
        questionCount: 15,
        passingScore: 70,
        duration: "15 min",
        status: "locked",
      },
      {
        id: "siem-q5",
        title: "Final Certification Exam",
        description: "Comprehensive exam covering all SIEM fundamentals modules. Required for certification.",
        questionCount: 40,
        passingScore: 80,
        duration: "45 min",
        status: "locked",
      },
    ],
    resources: [
      {
        id: "siem-r1",
        title: "SIEM Query Cheat Sheet",
        description: "Quick reference for common SIEM search commands and syntax patterns.",
        type: "cheatsheet",
      },
      {
        id: "siem-r2",
        title: "SPL (Splunk) Quick Reference",
        description: "Essential Splunk Processing Language commands for security analysts.",
        type: "cheatsheet",
      },
      {
        id: "siem-r3",
        title: "KQL (Sentinel) Quick Reference",
        description: "Kusto Query Language basics for Microsoft Sentinel users.",
        type: "cheatsheet",
      },
      {
        id: "siem-r4",
        title: "SIEM Dashboard Templates",
        description: "Pre-built dashboard templates for common SOC monitoring use cases.",
        type: "template",
      },
      {
        id: "siem-r5",
        title: "Alert Tuning Guide",
        description: "Best practices for reducing false positives and optimizing detection rules.",
        type: "pdf",
      },
      {
        id: "siem-r6",
        title: "SIEM Platform Comparison",
        description: "Feature comparison of major SIEM platforms for informed decision-making.",
        type: "pdf",
      },
      {
        id: "siem-r7",
        title: "Splunk Documentation",
        description: "Official Splunk documentation and training resources.",
        type: "link",
        url: "https://docs.splunk.com/",
      },
      {
        id: "siem-r8",
        title: "Microsoft Sentinel Docs",
        description: "Official Microsoft Sentinel documentation and learning paths.",
        type: "link",
        url: "https://learn.microsoft.com/en-us/azure/sentinel/",
      },
    ],
  },
  {
    id: "network-security-monitoring",
    title: "Network Security Monitoring",
    shortTitle: "NSM",
    description: "Master deep packet inspection, network-based threat detection, and traffic analysis. Learn to use tools like Zeek, Suricata, and Wireshark to identify malicious activity on the wire.",
    difficulty: "medium",
    duration: "14 hours",
    bgImage: "courses/soc-analyst-practical-bg.jpg",
    modules: [
      {
        id: "1",
        title: "NSM Foundations",
        lessons: [
          { id: "1.1", title: "What is Network Security Monitoring?", description: "Understanding NSM philosophy, goals, and how it complements endpoint detection.", status: "unlocked" },
          { id: "1.2", title: "Network Protocols Deep Dive", description: "TCP/IP, UDP, DNS, HTTP/S, and other protocols from a security perspective.", status: "locked" },
          { id: "1.3", title: "The OSI Model for Defenders", description: "How each OSI layer exposes different attack surfaces and detection opportunities.", status: "locked" },
          { id: "1.4", title: "NSM Architecture & Sensor Placement", description: "Designing network tap points, SPAN ports, and sensor deployment strategies.", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Packet Capture & Analysis",
        lessons: [
          { id: "2.1", title: "Introduction to Wireshark", description: "Navigating the Wireshark interface, capture filters, and display filters.", status: "locked" },
          { id: "2.2", title: "TCP Stream Analysis", description: "Following TCP conversations, identifying retransmissions, and session reconstruction.", status: "locked" },
          { id: "2.3", title: "DNS Traffic Analysis", description: "Detecting DNS tunneling, DGA domains, and suspicious query patterns.", status: "locked" },
          { id: "2.4", title: "HTTP/HTTPS Traffic Inspection", description: "Analyzing web traffic, extracting files, and identifying malicious payloads.", status: "locked" },
          { id: "2.5", title: "Hands-On: PCAP Analysis Lab", description: "Investigate real-world attack PCAPs to identify malicious activity.", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Intrusion Detection with Suricata",
        lessons: [
          { id: "3.1", title: "Suricata Architecture & Setup", description: "Installing and configuring Suricata as an IDS/IPS engine.", status: "locked" },
          { id: "3.2", title: "Writing Suricata Rules", description: "Rule syntax, content matching, flow keywords, and protocol-specific options.", status: "locked" },
          { id: "3.3", title: "Alert Management & Tuning", description: "Managing alert output, suppressing false positives, and threshold configuration.", status: "locked" },
          { id: "3.4", title: "Hands-On: Custom Detection Rules", description: "Write and test Suricata rules to detect specific attack patterns.", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Network Metadata with Zeek",
        lessons: [
          { id: "4.1", title: "Introduction to Zeek", description: "Understanding Zeek's role in NSM and its log-based approach to network analysis.", status: "locked" },
          { id: "4.2", title: "Zeek Log Types", description: "Exploring conn.log, dns.log, http.log, ssl.log, files.log, and other key logs.", status: "locked" },
          { id: "4.3", title: "Threat Hunting with Zeek Logs", description: "Using Zeek metadata to detect C2 beacons, lateral movement, and exfiltration.", status: "locked" },
          { id: "4.4", title: "Zeek Scripting Basics", description: "Writing simple Zeek scripts to create custom detections and log enrichments.", status: "locked" },
        ],
      },
      {
        id: "5",
        title: "Network Attack Detection",
        lessons: [
          { id: "5.1", title: "Detecting Reconnaissance", description: "Identifying port scans, service enumeration, and network mapping attempts.", status: "locked" },
          { id: "5.2", title: "Detecting Command & Control", description: "Recognizing C2 beaconing patterns, encrypted channels, and covert communications.", status: "locked" },
          { id: "5.3", title: "Detecting Lateral Movement", description: "Spotting SMB abuse, RDP pivoting, PsExec, and pass-the-hash on the network.", status: "locked" },
          { id: "5.4", title: "Detecting Data Exfiltration", description: "Identifying large transfers, DNS exfil, steganography, and protocol tunneling.", status: "locked" },
        ],
      },
      {
        id: "6",
        title: "Practical NSM Operations",
        lessons: [
          { id: "6.1", title: "Building an NSM Workflow", description: "Integrating Zeek, Suricata, and SIEM for a complete monitoring pipeline.", status: "locked" },
          { id: "6.2", title: "Network Forensics Basics", description: "Evidence preservation, timeline construction, and reporting from network data.", status: "locked" },
          { id: "6.3", title: "NSM Best Practices", description: "Sensor maintenance, rule updates, and operational efficiency tips.", status: "locked" },
          { id: "6.4", title: "Final Practical Challenge", description: "Investigate a multi-stage network intrusion using all NSM tools and techniques.", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "incident-response",
    title: "Incident Response Fundamentals",
    shortTitle: "Incident Response",
    description: "Learn the complete incident response lifecycle. Master containment, eradication, recovery, and post-incident analysis procedures used by IR professionals.",
    difficulty: "medium",
    duration: "10 hours",
    bgImage: "courses/incident-response-bg.jpg",
    modules: [
      {
        id: "1",
        title: "IR Framework",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "NIST IR Framework", description: "Understanding the incident response lifecycle.", status: "unlocked" },
          { id: "1.2", title: "IR Team Structure", status: "locked" },
          { id: "1.3", title: "Communication Plans", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Containment Strategies",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "Network Isolation", status: "locked" },
          { id: "2.2", title: "Account Lockdown", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Eradication & Recovery",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Malware Removal", status: "locked" },
          { id: "3.2", title: "System Restoration", status: "locked" },
          { id: "3.3", title: "Validation Testing", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Post-Incident Activities",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "4.1", title: "Lessons Learned", status: "locked" },
          { id: "4.2", title: "Report Writing", status: "locked" },
          { id: "4.3", title: "Module Quiz", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "threat-hunting",
    title: "Threat Hunting Fundamentals",
    shortTitle: "Threat Hunting",
    description: "Proactively search for threats in your environment. Learn hypothesis-driven hunting, IOC analysis, and threat intelligence integration techniques.",
    difficulty: "hard",
    duration: "14 hours",
    bgImage: "courses/threat-hunting-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Hunting Methodology",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "Proactive vs Reactive", description: "Understanding the threat hunting mindset.", status: "unlocked" },
          { id: "1.2", title: "Hypothesis Development", status: "locked" },
          { id: "1.3", title: "Data Sources for Hunting", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Threat Intelligence",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "TI Platforms", status: "locked" },
          { id: "2.2", title: "IOC Types and Usage", status: "locked" },
          { id: "2.3", title: "MITRE ATT&CK Framework", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Hunting Techniques",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Behavioral Analysis", status: "locked" },
          { id: "3.2", title: "Anomaly Detection", status: "locked" },
          { id: "3.3", title: "Living Off the Land", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "detection-engineering",
    title: "Detection Engineering Basics",
    shortTitle: "Detection Engineering",
    description: "Build custom detection rules and analytics. Master SIGMA rules, YARA signatures, and detection-as-code methodologies for modern SOC environments.",
    difficulty: "hard",
    duration: "16 hours",
    bgImage: "courses/detection-engineering-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Detection Fundamentals",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "Detection Philosophy", description: "Building effective detection strategies.", status: "unlocked" },
          { id: "1.2", title: "Detection Coverage", status: "locked" },
          { id: "1.3", title: "False Positive Management", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "SIGMA Rules",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "SIGMA Syntax", status: "locked" },
          { id: "2.2", title: "Writing Custom Rules", status: "locked" },
          { id: "2.3", title: "Rule Conversion", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "YARA Signatures",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "YARA Basics", status: "locked" },
          { id: "3.2", title: "Pattern Matching", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Detection as Code",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "4.1", title: "Version Control for Detections", status: "locked" },
          { id: "4.2", title: "CI/CD Pipelines", status: "locked" },
          { id: "4.3", title: "Final Assessment", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "malware-analysis",
    title: "Malware Analysis Fundamentals",
    shortTitle: "Malware Analysis",
    description: "Analyze malicious software safely. Learn static and dynamic analysis, sandboxing, and reverse engineering basics for security professionals.",
    difficulty: "hard",
    duration: "18 hours",
    bgImage: "courses/malware-analysis-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Malware Overview",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "Malware Types", description: "Classification of malicious software.", status: "unlocked" },
          { id: "1.2", title: "Analysis Environment Setup", status: "locked" },
          { id: "1.3", title: "Safety Precautions", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Static Analysis",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "File Identification", status: "locked" },
          { id: "2.2", title: "String Analysis", status: "locked" },
          { id: "2.3", title: "PE Header Analysis", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Dynamic Analysis",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Sandbox Environments", status: "locked" },
          { id: "3.2", title: "Behavioral Monitoring", status: "locked" },
          { id: "3.3", title: "Network Traffic Analysis", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Reverse Engineering Intro",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "4.1", title: "Disassembly Basics", status: "locked" },
          { id: "4.2", title: "Code Analysis", status: "locked" },
          { id: "4.3", title: "Final Assessment", status: "locked" },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCourseCardData = () => {
  return courses.map(course => ({
    courseId: course.id,
    title: course.title,
    description: course.description,
    difficulty: course.difficulty,
    thumbnail: course.bgImage,
  }));
};
