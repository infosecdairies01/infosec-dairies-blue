export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  quizId: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export const quizzes: QuizData[] = [
  {
    quizId: "q1",
    courseId: "soc-fundamentals",
    title: "SOC Fundamentals Quiz",
    description: "Test your understanding of SOC operations, team roles, and basic workflows.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "q1-1",
        question: "What is the primary mission of a Security Operations Center (SOC)?",
        options: [
          "To develop new software applications",
          "To detect, analyze, and respond to cybersecurity incidents",
          "To manage the company's IT infrastructure",
          "To train employees on computer basics"
        ],
        correctAnswer: 1,
        explanation: "The SOC's primary mission is to detect, analyze, and respond to cybersecurity incidents using technology and defined processes."
      },
      {
        id: "q1-2",
        question: "What does MTTD stand for in SOC metrics?",
        options: [
          "Maximum Time To Deploy",
          "Mean Time To Detect",
          "Minimum Time To Destroy",
          "Mean Time To Document"
        ],
        correctAnswer: 1,
        explanation: "MTTD stands for Mean Time To Detect - the average time it takes to identify a security threat after it enters the environment."
      },
      {
        id: "q1-3",
        question: "Which SOC tier is responsible for initial alert triage?",
        options: [
          "Tier 3 - Senior Analyst",
          "Tier 2 - Incident Responder",
          "Tier 1 - SOC Analyst",
          "SOC Manager"
        ],
        correctAnswer: 2,
        explanation: "Tier 1 SOC Analysts are on the front lines, responsible for monitoring alerts and performing initial triage."
      },
      {
        id: "q1-4",
        question: "What is SIEM an acronym for?",
        options: [
          "Security Information and Event Management",
          "System Integration and Event Monitoring",
          "Secure Internet and Email Management",
          "Server Infrastructure and Endpoint Monitoring"
        ],
        correctAnswer: 0,
        explanation: "SIEM stands for Security Information and Event Management - the central platform for log aggregation and security alerting."
      },
      {
        id: "q1-5",
        question: "Which of the following is NOT a core function of a SOC?",
        options: [
          "Continuous Monitoring",
          "Software Development",
          "Incident Response",
          "Threat Intelligence"
        ],
        correctAnswer: 1,
        explanation: "Software Development is not a core SOC function. The SOC focuses on monitoring, detection, response, and threat intelligence."
      },
      {
        id: "q1-6",
        question: "What type of SOC model combines internal staff with external managed services?",
        options: [
          "Internal SOC",
          "Virtual SOC",
          "Hybrid SOC",
          "Managed SOC"
        ],
        correctAnswer: 2,
        explanation: "A Hybrid SOC combines an internal team with external MSSP services, often used for 24/7 coverage."
      },
      {
        id: "q1-7",
        question: "What is EDR?",
        options: [
          "Email Detection and Response",
          "Endpoint Detection and Response",
          "External Data Repository",
          "Event Driven Reporting"
        ],
        correctAnswer: 1,
        explanation: "EDR stands for Endpoint Detection and Response - technology that provides visibility and response capabilities on endpoints."
      },
      {
        id: "q1-8",
        question: "Which characteristic is essential for a SOC analyst?",
        options: [
          "Ability to work in isolation",
          "Curiosity and attention to detail",
          "Preference for routine tasks only",
          "Avoidance of documentation"
        ],
        correctAnswer: 1,
        explanation: "Successful SOC analysts need curiosity (always asking why) and attention to detail (small anomalies can indicate big threats)."
      },
      {
        id: "q1-9",
        question: "What is the purpose of a shift handover in SOC operations?",
        options: [
          "To assign blame for incidents",
          "To ensure continuity and prevent dropped incidents",
          "To reduce the number of analysts",
          "To delete old alerts"
        ],
        correctAnswer: 1,
        explanation: "Shift handovers ensure smooth transitions and continuity of operations, preventing incidents from being dropped between shifts."
      },
      {
        id: "q1-10",
        question: "What does SOAR stand for?",
        options: [
          "Security Operations and Reporting",
          "System Orchestration and Response",
          "Security Orchestration, Automation, and Response",
          "Secure Operations and Risk"
        ],
        correctAnswer: 2,
        explanation: "SOAR stands for Security Orchestration, Automation, and Response - platforms that automate repetitive security tasks."
      },
      {
        id: "q1-11",
        question: "When should a Tier 1 analyst immediately escalate an alert?",
        options: [
          "When they're unsure about any alert",
          "Only at the end of their shift",
          "When confirmed malware execution or active data exfiltration is detected",
          "Never - Tier 1 should handle everything"
        ],
        correctAnswer: 2,
        explanation: "Immediate escalation is required for confirmed malware execution, active data exfiltration, ransomware, or compromised privileged accounts."
      },
      {
        id: "q1-12",
        question: "What is a TIP in the context of SOC tools?",
        options: [
          "Threat Intelligence Platform",
          "Technical Integration Point",
          "Triage Information Protocol",
          "Targeted Intrusion Prevention"
        ],
        correctAnswer: 0,
        explanation: "TIP stands for Threat Intelligence Platform - tools that aggregate and operationalize threat intelligence for SOC use."
      },
      {
        id: "q1-13",
        question: "Which document should an analyst create when handing over their shift?",
        options: [
          "Performance review",
          "Shift handover summary with active incidents and pending items",
          "Company newsletter",
          "Training certificate"
        ],
        correctAnswer: 1,
        explanation: "A proper shift handover summary includes statistics, active incidents, pending items, and situational awareness notes."
      },
      {
        id: "q1-14",
        question: "What is the role of a Tier 2 analyst?",
        options: [
          "Only monitoring dashboards",
          "Deep-dive investigation of escalated alerts and containment",
          "Managing the SOC budget",
          "Writing company policies"
        ],
        correctAnswer: 1,
        explanation: "Tier 2 analysts perform deeper investigation of escalated alerts, including containment actions and incident documentation."
      },
      {
        id: "q1-15",
        question: "What is MTTR in SOC metrics?",
        options: [
          "Maximum Time To Report",
          "Mean Time To Respond",
          "Minimum Time To Recover",
          "Mean Time To Review"
        ],
        correctAnswer: 1,
        explanation: "MTTR stands for Mean Time To Respond - the average time taken to respond to and begin addressing a security incident."
      }
    ]
  },
  {
    quizId: "q2",
    courseId: "soc-fundamentals",
    title: "Threat Landscape Assessment",
    description: "Evaluate your knowledge of threat actors, attack vectors, and MITRE ATT&CK.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q2-1",
        question: "Which type of threat actor is typically state-sponsored and highly sophisticated?",
        options: [
          "Script Kiddies",
          "Hacktivists",
          "Nation-State Actors (APT)",
          "Insider Threats"
        ],
        correctAnswer: 2,
        explanation: "Nation-State Actors (APTs) are state-sponsored, extremely well-resourced, and use highly sophisticated techniques."
      },
      {
        id: "q2-2",
        question: "What percentage of successful cyber attacks start with phishing?",
        options: [
          "About 25%",
          "About 50%",
          "About 75%",
          "Over 90%"
        ],
        correctAnswer: 3,
        explanation: "Over 90% of successful cyber attacks begin with phishing, making it the most common initial access vector."
      },
      {
        id: "q2-3",
        question: "What is the primary motivation of cybercriminal groups?",
        options: [
          "Political ideology",
          "Financial gain",
          "Recognition and fame",
          "Environmental activism"
        ],
        correctAnswer: 1,
        explanation: "Cybercriminals are primarily financially motivated, conducting activities like ransomware attacks, BEC, and credential theft."
      },
      {
        id: "q2-4",
        question: "Which attack involves targeting a third-party vendor to reach the ultimate target?",
        options: [
          "Phishing attack",
          "Brute force attack",
          "Supply chain attack",
          "DDoS attack"
        ],
        correctAnswer: 2,
        explanation: "Supply chain attacks target trusted vendors or software providers to compromise their customers (e.g., SolarWinds)."
      },
      {
        id: "q2-5",
        question: "What is 'spear phishing'?",
        options: [
          "Mass email spam",
          "Targeted phishing at specific individuals",
          "Phone-based phishing",
          "USB-based attacks"
        ],
        correctAnswer: 1,
        explanation: "Spear phishing is targeted phishing aimed at specific individuals, using personalized information to appear legitimate."
      },
      {
        id: "q2-6",
        question: "What is a 'watering hole' attack?",
        options: [
          "Attacking water treatment facilities",
          "Compromising websites frequently visited by targets",
          "Flooding a network with traffic",
          "Poisoning DNS records"
        ],
        correctAnswer: 1,
        explanation: "A watering hole attack compromises websites that the target group frequently visits, infecting visitors with malware."
      },
      {
        id: "q2-7",
        question: "Which type of insider threat is most dangerous due to legitimate access?",
        options: [
          "External hackers",
          "Malicious insiders with authorized access",
          "Script kiddies",
          "Hacktivists"
        ],
        correctAnswer: 1,
        explanation: "Malicious insiders are dangerous because they have legitimate access, knowledge of systems, and are trusted by security controls."
      },
      {
        id: "q2-8",
        question: "What does RCE stand for in vulnerability types?",
        options: [
          "Remote Control Environment",
          "Remote Code Execution",
          "Risk Control Evaluation",
          "Rapid Containment Effort"
        ],
        correctAnswer: 1,
        explanation: "RCE stands for Remote Code Execution - the most dangerous vulnerability type that allows attackers to run code on remote systems."
      },
      {
        id: "q2-9",
        question: "What is 'credential stuffing'?",
        options: [
          "Creating fake credentials",
          "Using leaked credentials to exploit password reuse",
          "Deleting user accounts",
          "Encrypting credentials"
        ],
        correctAnswer: 1,
        explanation: "Credential stuffing uses leaked username/password pairs from breaches to try logging into other services, exploiting password reuse."
      },
      {
        id: "q2-10",
        question: "Which threat actor group is typically motivated by ideology and seeks publicity?",
        options: [
          "Nation-State Actors",
          "Cybercriminals",
          "Hacktivists",
          "Insider Threats"
        ],
        correctAnswer: 2,
        explanation: "Hacktivists are ideologically motivated and often seek publicity for their causes through attacks like website defacement and data leaks."
      },
      {
        id: "q2-11",
        question: "What is 'password spraying'?",
        options: [
          "Trying all possible password combinations",
          "Trying a few common passwords against many accounts",
          "Stealing passwords from memory",
          "Encrypting passwords"
        ],
        correctAnswer: 1,
        explanation: "Password spraying tries a small number of common passwords against many accounts to avoid lockouts while still finding weak passwords."
      },
      {
        id: "q2-12",
        question: "What framework maps adversary tactics, techniques, and procedures?",
        options: [
          "NIST Framework",
          "OWASP Top 10",
          "MITRE ATT&CK",
          "ISO 27001"
        ],
        correctAnswer: 2,
        explanation: "MITRE ATT&CK is a framework that maps adversary behavior into tactics, techniques, and procedures (TTPs) for threat analysis."
      },
      {
        id: "q2-13",
        question: "What is 'vishing'?",
        options: [
          "Video-based phishing",
          "Voice/phone-based phishing",
          "Virtual reality phishing",
          "Verified phishing"
        ],
        correctAnswer: 1,
        explanation: "Vishing is voice phishing - phone-based social engineering attacks where attackers impersonate legitimate entities."
      },
      {
        id: "q2-14",
        question: "Which malware type encrypts files and demands payment?",
        options: [
          "Trojan",
          "Worm",
          "Ransomware",
          "Rootkit"
        ],
        correctAnswer: 2,
        explanation: "Ransomware encrypts victim files and demands payment (usually cryptocurrency) for the decryption key."
      },
      {
        id: "q2-15",
        question: "What is a common indicator of a compromised insider?",
        options: [
          "Normal working hours",
          "Accessing only needed resources",
          "Unusual access patterns and large data downloads",
          "Regular vacation requests"
        ],
        correctAnswer: 2,
        explanation: "Warning signs of insider threats include unusual access patterns, large data downloads, after-hours activity, and accessing unneeded resources."
      },
      {
        id: "q2-16",
        question: "What is 'smishing'?",
        options: [
          "Social media phishing",
          "SMS-based phishing",
          "Smart device phishing",
          "Smoke and mirrors phishing"
        ],
        correctAnswer: 1,
        explanation: "Smishing is SMS-based phishing - sending malicious text messages to trick users into clicking links or revealing information."
      },
      {
        id: "q2-17",
        question: "What type of attack floods a target with traffic to make it unavailable?",
        options: [
          "Phishing",
          "SQL Injection",
          "DDoS",
          "Man-in-the-middle"
        ],
        correctAnswer: 2,
        explanation: "DDoS (Distributed Denial of Service) attacks flood a target with traffic from multiple sources to overwhelm and disable it."
      },
      {
        id: "q2-18",
        question: "What is 'typosquatting' in phishing attacks?",
        options: [
          "Making typos in emails",
          "Registering domains similar to legitimate ones (e.g., g00gle.com)",
          "Typing too fast",
          "Correcting spelling errors"
        ],
        correctAnswer: 1,
        explanation: "Typosquatting registers domain names similar to legitimate ones (using typos or look-alike characters) to deceive users."
      },
      {
        id: "q2-19",
        question: "Which APT group is attributed to North Korea?",
        options: [
          "APT29 (Cozy Bear)",
          "APT41",
          "Lazarus Group",
          "APT33"
        ],
        correctAnswer: 2,
        explanation: "Lazarus Group is attributed to North Korea and is known for targeting financial institutions and cryptocurrency."
      },
      {
        id: "q2-20",
        question: "What is 'Business Email Compromise' (BEC)?",
        options: [
          "Email server failure",
          "Fraud using compromised or spoofed business email accounts",
          "Legitimate business communication",
          "Email backup process"
        ],
        correctAnswer: 1,
        explanation: "BEC is a sophisticated scam targeting businesses using compromised or spoofed email accounts, often for wire transfer fraud."
      }
    ]
  },
  {
    quizId: "q3",
    courseId: "soc-fundamentals",
    title: "Log Analysis Challenge",
    description: "Practical quiz on Windows, Linux, and network log analysis.",
    passingScore: 70,
    timeLimit: 30,
    questions: [
      {
        id: "q3-1",
        question: "Which Windows Event ID indicates a successful logon?",
        options: [
          "4624",
          "4625",
          "4688",
          "4720"
        ],
        correctAnswer: 0,
        explanation: "Event ID 4624 indicates a successful account logon in Windows Security logs."
      },
      {
        id: "q3-2",
        question: "Which Windows Event ID indicates a failed logon attempt?",
        options: [
          "4624",
          "4625",
          "4634",
          "4648"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4625 indicates a failed logon attempt, useful for detecting brute force attacks."
      },
      {
        id: "q3-3",
        question: "What does Windows Event ID 4688 record?",
        options: [
          "User logon",
          "Account lockout",
          "New process creation",
          "File deletion"
        ],
        correctAnswer: 2,
        explanation: "Event ID 4688 records new process creation, essential for tracking executed commands and programs."
      },
      {
        id: "q3-4",
        question: "Which Linux log file contains authentication events?",
        options: [
          "/var/log/messages",
          "/var/log/auth.log",
          "/var/log/apache2/access.log",
          "/var/log/boot.log"
        ],
        correctAnswer: 1,
        explanation: "The auth.log file (or secure on RHEL/CentOS) contains authentication-related events including SSH logins."
      },
      {
        id: "q3-5",
        question: "What is syslog used for in Linux systems?",
        options: [
          "Compiling code",
          "Centralized logging and log management",
          "User interface design",
          "Network routing"
        ],
        correctAnswer: 1,
        explanation: "Syslog is a standard for computer message logging, providing centralized logging capabilities in Linux/Unix systems."
      },
      {
        id: "q3-6",
        question: "Which Windows Event ID indicates a user account was created?",
        options: [
          "4720",
          "4624",
          "4688",
          "4634"
        ],
        correctAnswer: 0,
        explanation: "Event ID 4720 indicates a new user account was created, important for detecting unauthorized account creation."
      },
      {
        id: "q3-7",
        question: "What type of information do firewall logs typically contain?",
        options: [
          "User passwords",
          "Source/destination IPs and allow/deny decisions",
          "Application source code",
          "Employee schedules"
        ],
        correctAnswer: 1,
        explanation: "Firewall logs record network traffic decisions including source/destination IPs, ports, and allow/deny actions."
      },
      {
        id: "q3-8",
        question: "What does 'Logon Type 10' indicate in Windows Event 4624?",
        options: [
          "Local console logon",
          "Network logon",
          "Remote Desktop (RDP) logon",
          "Service account logon"
        ],
        correctAnswer: 2,
        explanation: "Logon Type 10 indicates a Remote Desktop (RDP) session, which could indicate lateral movement if unexpected."
      },
      {
        id: "q3-9",
        question: "Which Linux log would you check for cron job execution?",
        options: [
          "/var/log/auth.log",
          "/var/log/cron or /var/log/syslog",
          "/var/log/apache2/error.log",
          "/var/log/boot.log"
        ],
        correctAnswer: 1,
        explanation: "Cron job execution is logged in /var/log/cron (RHEL) or /var/log/syslog (Debian/Ubuntu)."
      },
      {
        id: "q3-10",
        question: "What information can DNS logs reveal about potential threats?",
        options: [
          "Only legitimate website visits",
          "Command and control (C2) communication and DGA domains",
          "User passwords",
          "Hardware specifications"
        ],
        correctAnswer: 1,
        explanation: "DNS logs can reveal C2 communications, domain generation algorithm (DGA) activity, and data exfiltration via DNS tunneling."
      },
      {
        id: "q3-11",
        question: "Which Windows Event ID indicates a member was added to a security-enabled global group?",
        options: [
          "4624",
          "4732",
          "4688",
          "4625"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4732 indicates a member was added to a security-enabled local group, important for privilege escalation detection."
      },
      {
        id: "q3-12",
        question: "What is the significance of 'Logon Type 3' in Windows logs?",
        options: [
          "Interactive local logon",
          "Network logon (accessing shared resources)",
          "Batch job logon",
          "Remote desktop logon"
        ],
        correctAnswer: 1,
        explanation: "Logon Type 3 indicates a network logon, commonly seen when accessing network shares or resources."
      },
      {
        id: "q3-13",
        question: "What would multiple 4625 events from the same source IP indicate?",
        options: [
          "Normal user activity",
          "Successful authentication",
          "Potential brute force attack",
          "System maintenance"
        ],
        correctAnswer: 2,
        explanation: "Multiple failed logon attempts (4625) from the same source IP is a strong indicator of a brute force attack."
      },
      {
        id: "q3-14",
        question: "Which proxy log field is most useful for identifying malicious downloads?",
        options: [
          "Source IP only",
          "URL and content type",
          "User agent only",
          "Timestamp only"
        ],
        correctAnswer: 1,
        explanation: "URL and content type fields help identify malicious downloads by revealing the actual resources accessed and their file types."
      },
      {
        id: "q3-15",
        question: "What Linux command shows the last logged-in users?",
        options: [
          "ls -la",
          "last",
          "top",
          "grep"
        ],
        correctAnswer: 1,
        explanation: "The 'last' command shows a list of last logged-in users by reading /var/log/wtmp."
      }
    ]
  },
  {
    quizId: "q4",
    courseId: "soc-fundamentals",
    title: "SIEM & Alert Triage Quiz",
    description: "Test your knowledge of SIEM operations, search queries, and alert triage processes.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "q4-1",
        question: "What is the primary purpose of a SIEM?",
        options: [
          "To replace antivirus software",
          "To aggregate logs and provide centralized security monitoring",
          "To block network traffic",
          "To manage employee passwords"
        ],
        correctAnswer: 1,
        explanation: "SIEM aggregates logs from multiple sources, correlates events, and provides centralized security monitoring and alerting."
      },
      {
        id: "q4-2",
        question: "What is a correlation rule in SIEM?",
        options: [
          "A rule that deletes old logs",
          "Logic that identifies patterns across multiple events to detect threats",
          "A rule for password complexity",
          "A backup procedure"
        ],
        correctAnswer: 1,
        explanation: "Correlation rules analyze multiple events together to identify attack patterns that single events wouldn't reveal."
      },
      {
        id: "q4-3",
        question: "What is the first step in the alert triage process?",
        options: [
          "Immediately escalate to management",
          "Delete the alert",
          "Understand what triggered the alert",
          "Reset user passwords"
        ],
        correctAnswer: 2,
        explanation: "The first step is to understand what triggered the alert by reading the alert details, checking the detection rule, and gathering initial context."
      },
      {
        id: "q4-4",
        question: "What does a 'false positive' mean in alert triage?",
        options: [
          "A missed attack",
          "An alert triggered by benign activity",
          "A confirmed security incident",
          "A system malfunction"
        ],
        correctAnswer: 1,
        explanation: "A false positive is an alert that fired on benign activity - it looks suspicious but is actually legitimate behavior."
      },
      {
        id: "q4-5",
        question: "What should you do after determining an alert is a true positive?",
        options: [
          "Close the ticket immediately",
          "Document findings and initiate response/escalation",
          "Delete the logs",
          "Ignore it until the next shift"
        ],
        correctAnswer: 1,
        explanation: "After confirming a true positive, document your findings thoroughly and initiate the appropriate response or escalation."
      },
      {
        id: "q4-6",
        question: "Which SIEM search operator is used to filter results?",
        options: [
          "DELETE",
          "WHERE or search filters",
          "BACKUP",
          "RESTART"
        ],
        correctAnswer: 1,
        explanation: "WHERE clauses and search filters are used to narrow down results to specific criteria in SIEM queries."
      },
      {
        id: "q4-7",
        question: "What is 'enrichment' in the context of alert triage?",
        options: [
          "Deleting unnecessary data",
          "Adding context and intelligence to alerts for better decision-making",
          "Compressing log files",
          "Creating backup copies"
        ],
        correctAnswer: 1,
        explanation: "Enrichment adds context like threat intelligence, asset information, and user details to help analysts make better decisions."
      },
      {
        id: "q4-8",
        question: "When should you immediately escalate an alert?",
        options: [
          "For every alert received",
          "Only on Mondays",
          "When you detect active malware, ransomware, or data exfiltration",
          "Never - handle everything yourself"
        ],
        correctAnswer: 2,
        explanation: "Immediate escalation is required for confirmed active threats like ransomware, data exfiltration, or compromised privileged accounts."
      },
      {
        id: "q4-9",
        question: "What is alert fatigue?",
        options: [
          "Physical tiredness from work",
          "Decreased vigilance due to overwhelming volume of alerts",
          "A type of malware",
          "Network congestion"
        ],
        correctAnswer: 1,
        explanation: "Alert fatigue occurs when analysts become desensitized due to high volumes of alerts, potentially causing them to miss real threats."
      },
      {
        id: "q4-10",
        question: "What information should be included in alert documentation?",
        options: [
          "Only the alert title",
          "Analyst's personal opinions only",
          "Timeline, findings, evidence, verdict, and actions taken",
          "Just the date and time"
        ],
        correctAnswer: 2,
        explanation: "Complete documentation includes timeline, investigation steps, findings, evidence collected, verdict, and actions taken."
      }
    ]
  },
  {
    quizId: "q5",
    courseId: "soc-fundamentals",
    title: "Threat Intelligence Quiz",
    description: "Evaluate your understanding of threat intelligence, IOCs, and OSINT techniques.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "q5-1",
        question: "What are the four types of threat intelligence?",
        options: [
          "Red, Blue, Green, Yellow",
          "Strategic, Tactical, Operational, Technical",
          "Primary, Secondary, Tertiary, Quaternary",
          "Internal, External, Public, Private"
        ],
        correctAnswer: 1,
        explanation: "The four types are Strategic (high-level trends), Tactical (TTPs), Operational (campaign details), and Technical (IOCs)."
      },
      {
        id: "q5-2",
        question: "What does IOC stand for?",
        options: [
          "Internal Operations Center",
          "Indicator of Compromise",
          "Internet of Computers",
          "Intrusion of Command"
        ],
        correctAnswer: 1,
        explanation: "IOC stands for Indicator of Compromise - forensic artifacts that identify potentially malicious activity."
      },
      {
        id: "q5-3",
        question: "According to the Pyramid of Pain, which IOC type is hardest for attackers to change?",
        options: [
          "Hash values",
          "IP addresses",
          "TTPs (Tactics, Techniques, Procedures)",
          "Domain names"
        ],
        correctAnswer: 2,
        explanation: "TTPs are at the top of the Pyramid of Pain - they represent how attackers operate and are hardest to change."
      },
      {
        id: "q5-4",
        question: "What is OSINT?",
        options: [
          "Operating System Intelligence",
          "Open Source Intelligence - publicly available information",
          "Offensive Security Integration",
          "Online System Integration"
        ],
        correctAnswer: 1,
        explanation: "OSINT (Open Source Intelligence) refers to intelligence gathered from publicly available sources."
      },
      {
        id: "q5-5",
        question: "Which platform is commonly used for file hash and URL analysis?",
        options: [
          "Microsoft Word",
          "VirusTotal",
          "Photoshop",
          "Excel"
        ],
        correctAnswer: 1,
        explanation: "VirusTotal is a widely used platform for analyzing files, URLs, IPs, and domains against multiple security engines."
      },
      {
        id: "q5-6",
        question: "What is a TIP (Threat Intelligence Platform)?",
        options: [
          "A gratuity calculator",
          "A platform that aggregates and operationalizes threat data",
          "A typing improvement program",
          "A network scanner"
        ],
        correctAnswer: 1,
        explanation: "A TIP aggregates, normalizes, enriches, and helps operationalize threat intelligence from multiple sources."
      },
      {
        id: "q5-7",
        question: "What is a red flag when analyzing a domain?",
        options: [
          "It's been registered for 10 years",
          "It was recently registered and uses privacy protection",
          "It has valid SSL certificates",
          "It's hosted by a major cloud provider"
        ],
        correctAnswer: 1,
        explanation: "Recently registered domains with privacy protection are often suspicious, especially if they mimic legitimate brands."
      },
      {
        id: "q5-8",
        question: "What hash algorithm is the current standard for file identification?",
        options: [
          "MD5",
          "SHA1",
          "SHA256",
          "CRC32"
        ],
        correctAnswer: 2,
        explanation: "SHA256 is the current standard - MD5 and SHA1 are being phased out due to collision vulnerabilities."
      },
      {
        id: "q5-9",
        question: "What is pivoting in threat intelligence?",
        options: [
          "Rotating your chair",
          "Moving from one indicator to discover related indicators",
          "Deleting old data",
          "Changing passwords"
        ],
        correctAnswer: 1,
        explanation: "Pivoting means using one indicator (like an IP) to find related indicators (domains, hashes) and uncover the full threat picture."
      },
      {
        id: "q5-10",
        question: "What is AbuseIPDB used for?",
        options: [
          "Managing IP addresses",
          "Checking IP reputation and abuse reports",
          "Assigning IP addresses",
          "Creating VPNs"
        ],
        correctAnswer: 1,
        explanation: "AbuseIPDB is a community-driven database for checking and reporting malicious IP addresses."
      },
      {
        id: "q5-11",
        question: "Which type of threat intelligence is consumed by executives?",
        options: [
          "Technical",
          "Tactical",
          "Strategic",
          "Operational"
        ],
        correctAnswer: 2,
        explanation: "Strategic intelligence provides high-level trends and risk assessments intended for executive and management consumption."
      },
      {
        id: "q5-12",
        question: "What is a DGA (Domain Generation Algorithm)?",
        options: [
          "A method to create legitimate websites",
          "Malware technique that generates random domain names for C2",
          "A domain registration service",
          "A security certification"
        ],
        correctAnswer: 1,
        explanation: "DGA is used by malware to generate random-looking domain names for command and control, making blocking difficult."
      }
    ]
  },
  {
    quizId: "q6",
    courseId: "soc-fundamentals",
    title: "Incident Response Quiz",
    description: "Test your knowledge of the incident response lifecycle, containment, and documentation.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "q6-1",
        question: "What are the four phases of the NIST Incident Response lifecycle?",
        options: [
          "Plan, Do, Check, Act",
          "Preparation, Detection & Analysis, Containment/Eradication/Recovery, Post-Incident",
          "Alert, Investigate, Close, Report",
          "Identify, Protect, Detect, Respond"
        ],
        correctAnswer: 1,
        explanation: "NIST defines four phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity."
      },
      {
        id: "q6-2",
        question: "What is the purpose of the containment phase?",
        options: [
          "To delete all evidence",
          "To stop the attack from spreading while preserving evidence",
          "To notify the press",
          "To ignore the incident"
        ],
        correctAnswer: 1,
        explanation: "Containment stops the attack from spreading to other systems while preserving evidence for investigation."
      },
      {
        id: "q6-3",
        question: "Which severity level requires immediate response for active ransomware?",
        options: [
          "Low",
          "Medium",
          "High",
          "Critical"
        ],
        correctAnswer: 3,
        explanation: "Active ransomware encryption is a Critical (Severity 1) incident requiring immediate, all-hands response."
      },
      {
        id: "q6-4",
        question: "What is the first containment action for a compromised user account?",
        options: [
          "Delete the account",
          "Reset password and terminate active sessions",
          "Send an email to the user",
          "Wait for management approval"
        ],
        correctAnswer: 1,
        explanation: "For account compromise, immediately reset the password and terminate all active sessions to prevent further unauthorized access."
      },
      {
        id: "q6-5",
        question: "What should you NOT do when ransomware is detected?",
        options: [
          "Isolate affected systems immediately",
          "Immediately reboot the infected machine",
          "Preserve ransom notes and file samples",
          "Alert the IR team"
        ],
        correctAnswer: 1,
        explanation: "Don't reboot - it may trigger more encryption or destroy volatile evidence. Focus on isolation and preservation first."
      },
      {
        id: "q6-6",
        question: "What is the purpose of a post-incident review?",
        options: [
          "To assign blame",
          "To learn and improve processes for future incidents",
          "To delete incident records",
          "To award bonuses"
        ],
        correctAnswer: 1,
        explanation: "Post-incident reviews focus on lessons learned and process improvement, not blame, to prevent similar incidents."
      },
      {
        id: "q6-7",
        question: "What is an incident playbook?",
        options: [
          "A children's game",
          "A standardized procedure for responding to specific incident types",
          "A list of employee contacts",
          "A software application"
        ],
        correctAnswer: 1,
        explanation: "Playbooks provide standardized, step-by-step procedures for responding to common incident types like phishing or malware."
      },
      {
        id: "q6-8",
        question: "What should be included in incident documentation?",
        options: [
          "Only the incident title",
          "Timeline, affected systems, actions taken, and evidence collected",
          "Personal opinions about the attacker",
          "Just the close date"
        ],
        correctAnswer: 1,
        explanation: "Documentation should include timeline, affected systems/users, all actions taken, evidence collected, and findings."
      },
      {
        id: "q6-9",
        question: "When responding to phishing with credential entry, what must you check for?",
        options: [
          "Only reset the password",
          "Email forwarding rules and account activity since compromise",
          "The user's vacation schedule",
          "Nothing else is needed"
        ],
        correctAnswer: 1,
        explanation: "Always check for malicious email forwarding rules and review all account activity since the compromise occurred."
      },
      {
        id: "q6-10",
        question: "What is 'eradication' in incident response?",
        options: [
          "Deleting all company data",
          "Removing malware, patching vulnerabilities, and resetting credentials",
          "Firing employees",
          "Shutting down the company"
        ],
        correctAnswer: 1,
        explanation: "Eradication involves removing malware, patching vulnerabilities, resetting compromised credentials, and cleaning affected systems."
      },
      {
        id: "q6-11",
        question: "What is the 'chain of custody' in incident response?",
        options: [
          "The order of incident responders",
          "Documentation tracking who handled evidence and when",
          "The management hierarchy",
          "A type of malware"
        ],
        correctAnswer: 1,
        explanation: "Chain of custody documents who collected, handled, and stored evidence, ensuring its integrity for potential legal proceedings."
      },
      {
        id: "q6-12",
        question: "How should severity be adjusted based on affected systems?",
        options: [
          "All systems are equal",
          "Increase severity for critical assets like domain controllers",
          "Decrease severity for servers",
          "Severity is never changed"
        ],
        correctAnswer: 1,
        explanation: "Critical assets like domain controllers, databases with sensitive data, and executive systems warrant increased severity."
      }
    ]
  },
  {
    quizId: "q7",
    courseId: "soc-fundamentals",
    title: "EDR & Endpoint Security Quiz",
    description: "Test your understanding of EDR technology, alerts, and process analysis.",
    passingScore: 75,
    timeLimit: 20,
    questions: [
      {
        id: "q7-1",
        question: "What is the main advantage of EDR over traditional antivirus?",
        options: [
          "It's cheaper",
          "Behavioral detection and rich telemetry for investigation",
          "It doesn't require installation",
          "It only works on Macs"
        ],
        correctAnswer: 1,
        explanation: "EDR provides behavioral detection (not just signatures) and rich telemetry including process, file, network, and registry data."
      },
      {
        id: "q7-2",
        question: "What does a process tree show in EDR?",
        options: [
          "A list of files",
          "Parent-child relationships between processes",
          "Network topology",
          "User permissions"
        ],
        correctAnswer: 1,
        explanation: "Process trees show parent-child relationships, revealing how processes spawned each other - essential for understanding attack chains."
      },
      {
        id: "q7-3",
        question: "Which scenario is suspicious in a process tree?",
        options: [
          "Chrome spawning Chrome processes",
          "Word or Excel spawning PowerShell or cmd.exe",
          "Explorer launching Notepad",
          "Services.exe starting a Windows service"
        ],
        correctAnswer: 1,
        explanation: "Office applications (Word, Excel) spawning scripting engines (PowerShell, cmd) is a classic malware delivery indicator."
      },
      {
        id: "q7-4",
        question: "What type of EDR response action isolates a host?",
        options: [
          "Process termination",
          "Network containment/isolation",
          "File deletion",
          "User logout"
        ],
        correctAnswer: 1,
        explanation: "Network containment/isolation blocks all network traffic except EDR communication, containing the threat."
      },
      {
        id: "q7-5",
        question: "What does T1059.001 represent in MITRE ATT&CK?",
        options: [
          "A ticket number",
          "PowerShell execution technique",
          "A user account",
          "A file hash"
        ],
        correctAnswer: 1,
        explanation: "T1059.001 is the MITRE ATT&CK technique ID for PowerShell execution under the Command and Scripting Interpreter tactic."
      },
      {
        id: "q7-6",
        question: "What should you check when analyzing a suspicious process?",
        options: [
          "Only the process name",
          "Command line arguments, parent process, file location, and network connections",
          "Just the timestamp",
          "The user's email"
        ],
        correctAnswer: 1,
        explanation: "Analyze command line arguments, parent process legitimacy, file location, digital signature, and network connections."
      },
      {
        id: "q7-7",
        question: "What is a LOLBAS/LOLBIN?",
        options: [
          "A type of malware",
          "Legitimate system binaries abused for malicious purposes",
          "A security certification",
          "A logging format"
        ],
        correctAnswer: 1,
        explanation: "LOLBAS (Living Off The Land Binaries and Scripts) are legitimate system tools like certutil or mshta abused by attackers."
      },
      {
        id: "q7-8",
        question: "Which PowerShell flag combination is commonly used for evasion?",
        options: [
          "-Help",
          "-NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass",
          "-Version",
          "-Update"
        ],
        correctAnswer: 1,
        explanation: "These flags hide the window, bypass security policies, and avoid loading profiles - classic evasion techniques."
      },
      {
        id: "q7-9",
        question: "What does LSASS access typically indicate?",
        options: [
          "Normal Windows operation only",
          "Potential credential dumping attack",
          "Antivirus update",
          "System shutdown"
        ],
        correctAnswer: 1,
        explanation: "Unusual access to LSASS (Local Security Authority Subsystem Service) often indicates credential dumping like Mimikatz."
      },
      {
        id: "q7-10",
        question: "What telemetry type shows registry persistence?",
        options: [
          "Network telemetry",
          "Registry telemetry",
          "File telemetry only",
          "User telemetry"
        ],
        correctAnswer: 1,
        explanation: "Registry telemetry captures modifications to registry keys, including those used for persistence like Run keys."
      },
      {
        id: "q7-11",
        question: "What is the purpose of the EDR confidence score?",
        options: [
          "User satisfaction rating",
          "How likely the detection represents actual malicious activity",
          "Network speed measurement",
          "Storage capacity"
        ],
        correctAnswer: 1,
        explanation: "Confidence score indicates how likely the detection represents actual malicious activity based on the detection logic."
      },
      {
        id: "q7-12",
        question: "After containing a threat via EDR, what should you do?",
        options: [
          "Delete all logs",
          "Collect evidence and document the investigation",
          "Immediately reimage the system",
          "Nothing - job is done"
        ],
        correctAnswer: 1,
        explanation: "After containment, collect evidence (memory, files, logs), document your investigation, and coordinate further response."
      }
    ]
  },
  {
    quizId: "q8",
    courseId: "soc-fundamentals",
    title: "Network Security Quiz",
    description: "Test your knowledge of network security monitoring, IDS/IPS, and traffic analysis.",
    passingScore: 70,
    timeLimit: 25,
    questions: [
      {
        id: "q8-1",
        question: "What is the difference between IDS and IPS?",
        options: [
          "They are the same thing",
          "IDS only alerts; IPS can block traffic",
          "IPS only alerts; IDS can block traffic",
          "Neither can detect threats"
        ],
        correctAnswer: 1,
        explanation: "IDS (Detection System) monitors and alerts passively; IPS (Prevention System) sits inline and can actively block traffic."
      },
      {
        id: "q8-2",
        question: "What port does SMB use?",
        options: [
          "80",
          "443",
          "445",
          "22"
        ],
        correctAnswer: 2,
        explanation: "SMB (Server Message Block) uses port 445 and is commonly used in lateral movement attacks."
      },
      {
        id: "q8-3",
        question: "What is beaconing in network traffic?",
        options: [
          "Normal web browsing",
          "Regular-interval callbacks from malware to C2 servers",
          "Email sending",
          "File downloads"
        ],
        correctAnswer: 1,
        explanation: "Beaconing is regular-interval communication from infected hosts to command and control servers, a key malware indicator."
      },
      {
        id: "q8-4",
        question: "What is DNS tunneling used for?",
        options: [
          "Faster DNS resolution",
          "Data exfiltration or C2 communication via DNS queries",
          "Improving network speed",
          "Email delivery"
        ],
        correctAnswer: 1,
        explanation: "DNS tunneling encodes data in DNS queries/responses to bypass security controls for exfiltration or C2 communication."
      },
      {
        id: "q8-5",
        question: "What does a high volume of NXDomain responses indicate?",
        options: [
          "Normal DNS activity",
          "Potential DGA (Domain Generation Algorithm) malware",
          "Excellent network health",
          "Fast internet connection"
        ],
        correctAnswer: 1,
        explanation: "High NXDomain (non-existent domain) responses may indicate DGA malware trying to reach algorithmically generated domains."
      },
      {
        id: "q8-6",
        question: "What is NetFlow used for?",
        options: [
          "Replacing firewalls",
          "Capturing connection metadata for traffic analysis",
          "Blocking malware",
          "Managing users"
        ],
        correctAnswer: 1,
        explanation: "NetFlow captures connection metadata (IPs, ports, bytes, timing) for traffic analysis without storing full packet content."
      },
      {
        id: "q8-7",
        question: "What network pattern indicates port scanning?",
        options: [
          "Normal web traffic",
          "Single source connecting to many destinations on multiple ports",
          "Large file downloads",
          "Email traffic"
        ],
        correctAnswer: 1,
        explanation: "Port scanning shows a single source systematically connecting to many targets across multiple ports for reconnaissance."
      },
      {
        id: "q8-8",
        question: "What is the purpose of network segmentation?",
        options: [
          "To slow down the network",
          "To limit lateral movement between zones",
          "To increase attack surface",
          "To remove firewalls"
        ],
        correctAnswer: 1,
        explanation: "Network segmentation limits lateral movement by separating network zones with access controls between them."
      },
      {
        id: "q8-9",
        question: "Which protocol is commonly abused for C2 because it's rarely blocked?",
        options: [
          "FTP",
          "DNS or HTTPS",
          "Telnet",
          "SMTP"
        ],
        correctAnswer: 1,
        explanation: "DNS and HTTPS are commonly abused for C2 because they're rarely blocked and can blend with legitimate traffic."
      },
      {
        id: "q8-10",
        question: "What does a SYN flood attack target?",
        options: [
          "User passwords",
          "Server resources by sending many SYN packets without completing handshakes",
          "DNS records",
          "Email servers only"
        ],
        correctAnswer: 1,
        explanation: "SYN flood attacks exhaust server resources by sending many SYN packets without completing TCP handshakes."
      },
      {
        id: "q8-11",
        question: "What is signature-based detection's main limitation?",
        options: [
          "It's too accurate",
          "It cannot detect unknown or new attacks",
          "It works too fast",
          "It's too cheap"
        ],
        correctAnswer: 1,
        explanation: "Signature-based detection only identifies known attacks with existing signatures; it cannot detect zero-day or novel attacks."
      },
      {
        id: "q8-12",
        question: "What should you check when investigating a suspicious external connection?",
        options: [
          "Only the destination IP",
          "IP reputation, domain age, traffic patterns, and related alerts",
          "Just the timestamp",
          "The user's lunch schedule"
        ],
        correctAnswer: 1,
        explanation: "Investigate IP/domain reputation, when it was registered, traffic patterns, related alerts, and whether it's expected behavior."
      },
      {
        id: "q8-13",
        question: "What is WMI commonly used for in lateral movement?",
        options: [
          "Web browsing",
          "Remote process execution on Windows systems",
          "Email delivery",
          "File compression"
        ],
        correctAnswer: 1,
        explanation: "WMI (Windows Management Instrumentation) is commonly abused for remote process execution during lateral movement."
      },
      {
        id: "q8-14",
        question: "Which port is used for RDP?",
        options: [
          "22",
          "443",
          "3389",
          "8080"
        ],
        correctAnswer: 2,
        explanation: "RDP (Remote Desktop Protocol) uses port 3389 and is frequently targeted for unauthorized remote access."
      },
      {
        id: "q8-15",
        question: "What indicates potential data exfiltration in network traffic?",
        options: [
          "Normal browsing patterns",
          "Large outbound transfers to unknown destinations, especially after hours",
          "Inbound email traffic",
          "Software updates"
        ],
        correctAnswer: 1,
        explanation: "Large outbound data transfers to unknown destinations, especially outside business hours, may indicate data exfiltration."
      }
    ]
  },
  {
    quizId: "q9",
    courseId: "soc-fundamentals",
    title: "SOC Best Practices Quiz",
    description: "Final assessment covering investigation skills, career development, and analyst wellness.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "q9-1",
        question: "What is the recommended investigation approach?",
        options: [
          "Jump to conclusions immediately",
          "Observe, hypothesize, test, and conclude",
          "Guess and move on",
          "Only escalate everything"
        ],
        correctAnswer: 1,
        explanation: "A systematic approach: observe the evidence, form hypotheses, test them with additional data, then conclude based on findings."
      },
      {
        id: "q9-2",
        question: "What is 'confirmation bias' in investigations?",
        options: [
          "Confirming alerts correctly",
          "Seeking only evidence that supports your initial theory",
          "Good documentation practice",
          "A type of malware"
        ],
        correctAnswer: 1,
        explanation: "Confirmation bias is seeking only evidence supporting your initial theory. Counter it by actively looking for contradicting data."
      },
      {
        id: "q9-3",
        question: "What is alert fatigue?",
        options: [
          "Being tired at work",
          "Decreased vigilance due to overwhelming alert volume",
          "A type of attack",
          "Slow network connections"
        ],
        correctAnswer: 1,
        explanation: "Alert fatigue occurs when analysts become desensitized to alerts due to high volumes, potentially missing real threats."
      },
      {
        id: "q9-4",
        question: "What is a key sign of analyst burnout?",
        options: [
          "Excitement about work",
          "Chronic fatigue, cynicism, and decreased performance",
          "Asking many questions",
          "Taking notes"
        ],
        correctAnswer: 1,
        explanation: "Burnout signs include chronic fatigue, cynicism about work, feeling ineffective, and decreased performance."
      },
      {
        id: "q9-5",
        question: "What is 'pivoting' in an investigation?",
        options: [
          "Changing careers",
          "Moving from one indicator to discover related indicators",
          "Rotating your chair",
          "Closing tickets"
        ],
        correctAnswer: 1,
        explanation: "Pivoting means using one indicator to find related ones - like finding domains that resolve to a suspicious IP."
      },
      {
        id: "q9-6",
        question: "What is the recommended certification for entry-level SOC analysts?",
        options: [
          "CISSP",
          "CompTIA Security+ or BTL1",
          "PhD in Computer Science",
          "No certification needed"
        ],
        correctAnswer: 1,
        explanation: "CompTIA Security+ or Blue Team Level 1 (BTL1) are excellent entry-level certifications for aspiring SOC analysts."
      },
      {
        id: "q9-7",
        question: "What should you do during work breaks?",
        options: [
          "Continue monitoring alerts",
          "Step away from screens and take actual breaks",
          "Skip breaks to handle more alerts",
          "Work on personal projects"
        ],
        correctAnswer: 1,
        explanation: "Taking actual breaks away from screens is essential for preventing burnout and maintaining effectiveness."
      },
      {
        id: "q9-8",
        question: "What makes good investigation notes?",
        options: [
          "Brief with no details",
          "Timestamped entries with observations, actions, and reasoning",
          "Only the final conclusion",
          "Personal opinions only"
        ],
        correctAnswer: 1,
        explanation: "Good notes include timestamps, detailed observations, actions taken, reasoning, and evidence references."
      },
      {
        id: "q9-9",
        question: "What is the typical L1 to L2 analyst progression timeline?",
        options: [
          "1 week",
          "2-4 years",
          "10+ years",
          "Never possible"
        ],
        correctAnswer: 1,
        explanation: "Typically, analysts progress from L1 to L2 over 2-4 years as they develop deeper investigation and response skills."
      },
      {
        id: "q9-10",
        question: "What is essential for continuous learning in cybersecurity?",
        options: [
          "Only formal training",
          "Combination of hands-on practice, certifications, and staying current with threats",
          "Just reading news",
          "Nothing - skills don't change"
        ],
        correctAnswer: 1,
        explanation: "Continuous learning requires hands-on practice, certifications, reading threat intel, and staying current with evolving threats."
      },
      {
        id: "q9-11",
        question: "Which platform provides free SOC analyst practice labs?",
        options: [
          "Microsoft Word",
          "TryHackMe or LetsDefend",
          "Facebook",
          "YouTube only"
        ],
        correctAnswer: 1,
        explanation: "TryHackMe and LetsDefend offer free (and paid) SOC analyst training paths with hands-on labs and challenges."
      },
      {
        id: "q9-12",
        question: "What should you do if you're experiencing burnout symptoms?",
        options: [
          "Ignore them and work harder",
          "Seek support from EAP, mental health professionals, or trusted colleagues",
          "Quit immediately",
          "Hide the symptoms"
        ],
        correctAnswer: 1,
        explanation: "Seeking support is a sign of strength. Use EAP programs, mental health resources, or trusted colleagues when needed."
      }
    ]
  },
  // Log Analysis Course Quizzes
  {
    quizId: "la-q1",
    courseId: "log-analysis",
    title: "Log Fundamentals Quiz",
    description: "Test your understanding of log basics, formats, and importance in security.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "la-q1-1",
        question: "What is the primary purpose of log files in IT systems?",
        options: [
          "To slow down system performance",
          "To record events, activities, and system states for analysis",
          "To store user passwords securely",
          "To replace backup systems"
        ],
        correctAnswer: 1,
        explanation: "Log files record events, activities, and system states, providing crucial information for troubleshooting, security analysis, and compliance."
      },
      {
        id: "la-q1-2",
        question: "Which log format uses key=value pairs for structured data?",
        options: [
          "JSON",
          "XML",
          "Key-Value (KV)",
          "CSV"
        ],
        correctAnswer: 2,
        explanation: "Key-Value format uses key=value pairs (e.g., user=admin action=login) making it easy to parse and search."
      },
      {
        id: "la-q1-3",
        question: "What does the term 'log rotation' refer to?",
        options: [
          "Spinning hard drives that store logs",
          "Automatically archiving old logs and creating new ones to manage disk space",
          "Rotating between different log formats",
          "Changing log file permissions"
        ],
        correctAnswer: 1,
        explanation: "Log rotation automatically archives old log files and creates new ones to prevent disk space exhaustion and maintain manageability."
      },
      {
        id: "la-q1-4",
        question: "Which timestamp format is considered the international standard for log files?",
        options: [
          "MM/DD/YYYY",
          "DD-MM-YYYY",
          "ISO 8601 (YYYY-MM-DDTHH:MM:SS)",
          "Unix epoch only"
        ],
        correctAnswer: 2,
        explanation: "ISO 8601 (YYYY-MM-DDTHH:MM:SS) is the international standard that provides unambiguous, sortable timestamps."
      },
      {
        id: "la-q1-5",
        question: "What is centralized log management?",
        options: [
          "Storing logs only on local machines",
          "Collecting logs from multiple sources into a single location for analysis",
          "Deleting logs after 24 hours",
          "Encrypting all log files"
        ],
        correctAnswer: 1,
        explanation: "Centralized log management collects logs from multiple sources into a single location, enabling correlation, analysis, and long-term retention."
      },
      {
        id: "la-q1-6",
        question: "Which log level indicates a serious problem that needs immediate attention?",
        options: [
          "DEBUG",
          "INFO",
          "WARNING",
          "ERROR/CRITICAL"
        ],
        correctAnswer: 3,
        explanation: "ERROR and CRITICAL levels indicate serious problems requiring immediate attention, while DEBUG and INFO are for routine information."
      },
      {
        id: "la-q1-7",
        question: "What is the main advantage of JSON-formatted logs?",
        options: [
          "They are smaller in size",
          "They are human-readable only",
          "They are structured and easily parsed by machines",
          "They cannot contain nested data"
        ],
        correctAnswer: 2,
        explanation: "JSON logs are structured, machine-parseable, and can contain nested data, making them ideal for automated analysis."
      },
      {
        id: "la-q1-8",
        question: "Why is consistent timestamping important in log analysis?",
        options: [
          "It makes logs look professional",
          "It enables accurate event correlation across multiple systems",
          "It reduces storage requirements",
          "It's required by all operating systems"
        ],
        correctAnswer: 1,
        explanation: "Consistent timestamps enable accurate event correlation across multiple systems, critical for incident investigation and timeline reconstruction."
      },
      {
        id: "la-q1-9",
        question: "What is a log aggregator?",
        options: [
          "A tool that deletes logs",
          "A tool that collects and consolidates logs from multiple sources",
          "A type of malware",
          "A log encryption tool"
        ],
        correctAnswer: 1,
        explanation: "A log aggregator collects and consolidates logs from multiple sources, making centralized analysis and searching possible."
      },
      {
        id: "la-q1-10",
        question: "Which of the following is NOT a common log source in enterprise environments?",
        options: [
          "Firewalls and IDS/IPS",
          "Web servers and applications",
          "User personal diaries",
          "Authentication systems"
        ],
        correctAnswer: 2,
        explanation: "Common enterprise log sources include firewalls, IDS/IPS, web servers, applications, and authentication systems - not personal documents."
      }
    ]
  },
  {
    quizId: "la-q2",
    courseId: "log-analysis",
    title: "Windows Log Analysis",
    description: "Master Windows Event Log analysis including Security, System, and Application logs.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "la-q2-1",
        question: "Which Windows Event ID indicates a successful user logon?",
        options: [
          "4625",
          "4624",
          "4634",
          "4648"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4624 records successful logon events. 4625 is failed logon, 4634 is logoff, and 4648 is explicit credential logon."
      },
      {
        id: "la-q2-2",
        question: "What does Windows Event ID 4625 indicate?",
        options: [
          "Successful logon",
          "Failed logon attempt",
          "Account lockout",
          "Password change"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4625 indicates a failed logon attempt, critical for detecting brute force attacks and unauthorized access attempts."
      },
      {
        id: "la-q2-3",
        question: "Which logon type value (in Event 4624) indicates interactive logon at the console?",
        options: [
          "Type 2",
          "Type 3",
          "Type 10",
          "Type 7"
        ],
        correctAnswer: 0,
        explanation: "Logon Type 2 is interactive logon at the console. Type 3 is network, Type 10 is RemoteInteractive (RDP), Type 7 is unlock."
      },
      {
        id: "la-q2-4",
        question: "What Windows Event ID should you monitor for new user account creation?",
        options: [
          "4624",
          "4720",
          "4688",
          "4672"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4720 indicates a new user account was created. This is important for detecting unauthorized account creation."
      },
      {
        id: "la-q2-5",
        question: "Which Event ID indicates a process was created (process tracking)?",
        options: [
          "4624",
          "4625",
          "4688",
          "4720"
        ],
        correctAnswer: 2,
        explanation: "Event ID 4688 records process creation events, essential for tracking what programs are executed on a system."
      },
      {
        id: "la-q2-6",
        question: "What does Event ID 4672 indicate?",
        options: [
          "User logoff",
          "Special privileges assigned to new logon",
          "Account disabled",
          "Password reset"
        ],
        correctAnswer: 1,
        explanation: "Event ID 4672 indicates special privileges (like admin rights) were assigned to a new logon session."
      },
      {
        id: "la-q2-7",
        question: "Which Windows log stores security-related events like logons and audit events?",
        options: [
          "Application Log",
          "System Log",
          "Security Log",
          "Setup Log"
        ],
        correctAnswer: 2,
        explanation: "The Security Log stores security-related events including logons, logoffs, policy changes, and audit events."
      },
      {
        id: "la-q2-8",
        question: "What is the significance of multiple 4625 events followed by a 4624 from the same source?",
        options: [
          "System error",
          "Possible successful brute force attack",
          "Normal user behavior",
          "Log corruption"
        ],
        correctAnswer: 1,
        explanation: "Multiple failed logons (4625) followed by a successful logon (4624) from the same source may indicate a successful brute force attack."
      },
      {
        id: "la-q2-9",
        question: "Which Event ID indicates an account was added to a security-enabled group?",
        options: [
          "4728",
          "4720",
          "4624",
          "4625"
        ],
        correctAnswer: 0,
        explanation: "Event ID 4728 indicates a member was added to a security-enabled global group, important for privilege escalation detection."
      },
      {
        id: "la-q2-10",
        question: "What tool is commonly used to view Windows Event Logs?",
        options: [
          "Task Manager",
          "Event Viewer",
          "Registry Editor",
          "Device Manager"
        ],
        correctAnswer: 1,
        explanation: "Event Viewer (eventvwr.msc) is the built-in Windows tool for viewing and analyzing Windows Event Logs."
      },
      {
        id: "la-q2-11",
        question: "What does Logon Type 3 indicate in Windows Event 4624?",
        options: [
          "Local console logon",
          "Network logon (accessing shared folders)",
          "Remote Desktop logon",
          "Service account logon"
        ],
        correctAnswer: 1,
        explanation: "Logon Type 3 indicates network logon, typically when accessing shared folders, printers, or other network resources."
      },
      {
        id: "la-q2-12",
        question: "Which Event ID indicates Windows Defender detected malware?",
        options: [
          "1116",
          "4624",
          "7045",
          "4688"
        ],
        correctAnswer: 0,
        explanation: "Event ID 1116 in Microsoft-Windows-Windows Defender/Operational log indicates malware detection."
      }
    ]
  },
  {
    quizId: "la-q3",
    courseId: "log-analysis",
    title: "Linux & Network Log Analysis",
    description: "Analyze Linux system logs and network traffic patterns for security events.",
    passingScore: 70,
    timeLimit: 25,
    questions: [
      {
        id: "la-q3-1",
        question: "Where are authentication logs typically stored on Linux systems?",
        options: [
          "/var/log/messages",
          "/var/log/auth.log or /var/log/secure",
          "/var/log/syslog",
          "/var/log/kern.log"
        ],
        correctAnswer: 1,
        explanation: "Authentication logs are stored in /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS)."
      },
      {
        id: "la-q3-2",
        question: "Which Linux command displays the last logged in users?",
        options: [
          "who",
          "last",
          "top",
          "ps"
        ],
        correctAnswer: 1,
        explanation: "The 'last' command shows a list of last logged in users by reading from /var/log/wtmp."
      },
      {
        id: "la-q3-3",
        question: "What does the Linux log message 'Failed password for invalid user admin' indicate?",
        options: [
          "Successful admin login",
          "Login attempt for a non-existent user called 'admin'",
          "Password policy violation",
          "System error"
        ],
        correctAnswer: 1,
        explanation: "This message indicates someone tried to log in with username 'admin' which doesn't exist on the system - a common brute force indicator."
      },
      {
        id: "la-q3-4",
        question: "Which facility in syslog handles authentication messages?",
        options: [
          "kern",
          "mail",
          "auth/authpriv",
          "daemon"
        ],
        correctAnswer: 2,
        explanation: "The auth and authpriv facilities handle authentication and security-related messages in syslog."
      },
      {
        id: "la-q3-5",
        question: "What information is typically found in Apache access logs?",
        options: [
          "Only error messages",
          "Client IP, timestamp, request method, URL, status code, user agent",
          "Server configuration",
          "Database queries"
        ],
        correctAnswer: 1,
        explanation: "Apache access logs contain client IP, timestamp, HTTP method, requested URL, status code, size, and user agent."
      },
      {
        id: "la-q3-6",
        question: "Which HTTP status code in web logs indicates a successful request?",
        options: [
          "404",
          "500",
          "200",
          "403"
        ],
        correctAnswer: 2,
        explanation: "HTTP 200 indicates success. 404 is not found, 500 is server error, and 403 is forbidden."
      },
      {
        id: "la-q3-7",
        question: "What could multiple HTTP 404 errors from the same IP suggest?",
        options: [
          "Normal browsing",
          "Directory enumeration or scanning activity",
          "Successful file downloads",
          "Server overload"
        ],
        correctAnswer: 1,
        explanation: "Multiple 404 errors from one IP may indicate directory enumeration, vulnerability scanning, or reconnaissance activity."
      },
      {
        id: "la-q3-8",
        question: "In firewall logs, what does 'DENY' or 'DROP' indicate?",
        options: [
          "Traffic was allowed",
          "Traffic was blocked by firewall rules",
          "Firewall is offline",
          "Connection was successful"
        ],
        correctAnswer: 1,
        explanation: "DENY or DROP in firewall logs indicates the traffic was blocked according to firewall rules."
      },
      {
        id: "la-q3-9",
        question: "Which command would you use to follow a Linux log file in real-time?",
        options: [
          "cat /var/log/auth.log",
          "tail -f /var/log/auth.log",
          "head /var/log/auth.log",
          "less /var/log/auth.log"
        ],
        correctAnswer: 1,
        explanation: "The 'tail -f' command follows a file in real-time, showing new entries as they're written."
      },
      {
        id: "la-q3-10",
        question: "What does a sudden spike in DNS queries to unusual domains suggest?",
        options: [
          "Normal network activity",
          "Possible malware communication or data exfiltration",
          "DNS server upgrade",
          "Improved network performance"
        ],
        correctAnswer: 1,
        explanation: "Unusual DNS query patterns may indicate malware C2 communication, DNS tunneling, or data exfiltration attempts."
      },
      {
        id: "la-q3-11",
        question: "Which Linux log file contains kernel messages?",
        options: [
          "/var/log/auth.log",
          "/var/log/kern.log or dmesg",
          "/var/log/apache2/access.log",
          "/var/log/mail.log"
        ],
        correctAnswer: 1,
        explanation: "Kernel messages are stored in /var/log/kern.log and can be viewed with the 'dmesg' command."
      },
      {
        id: "la-q3-12",
        question: "What would you investigate if you see 'Accepted publickey for root' in auth.log?",
        options: [
          "Nothing, this is normal",
          "Verify the SSH key is authorized and the source IP is legitimate",
          "Disable SSH immediately",
          "Increase logging verbosity"
        ],
        correctAnswer: 1,
        explanation: "Root SSH access via public key should be verified - ensure the key is authorized and the source IP is expected and legitimate."
      }
    ]
  },
  {
    quizId: "la-q4",
    courseId: "log-analysis",
    title: "Attack Pattern Recognition",
    description: "Identify and analyze common attack patterns in log data.",
    passingScore: 75,
    timeLimit: 30,
    questions: [
      {
        id: "la-q4-1",
        question: "What log pattern indicates a potential brute force attack?",
        options: [
          "Single failed login followed by success",
          "Multiple failed login attempts from the same source in rapid succession",
          "Successful logins from multiple locations",
          "Regular password changes"
        ],
        correctAnswer: 1,
        explanation: "Brute force attacks show multiple rapid failed login attempts from the same source, often targeting the same or multiple accounts."
      },
      {
        id: "la-q4-2",
        question: "Which web log pattern might indicate SQL injection attempts?",
        options: [
          "Normal page requests",
          "Requests containing 'SELECT', 'UNION', 'OR 1=1', or encoded SQL syntax",
          "Static file requests",
          "Empty user-agent strings"
        ],
        correctAnswer: 1,
        explanation: "SQL injection attempts often contain SQL keywords like SELECT, UNION, OR 1=1, and encoded variations in URL parameters."
      },
      {
        id: "la-q4-3",
        question: "What does 'password spraying' look like in logs?",
        options: [
          "Millions of attempts on one account",
          "Few common passwords tried across many accounts",
          "Normal authentication patterns",
          "Account lockouts on all accounts"
        ],
        correctAnswer: 1,
        explanation: "Password spraying shows few attempts per account but across many accounts, often avoiding lockout thresholds."
      },
      {
        id: "la-q4-4",
        question: "Which pattern suggests directory traversal attack attempts?",
        options: [
          "Normal file paths",
          "Paths containing '../' or '..\\' sequences",
          "HTTPS requests",
          "Large file uploads"
        ],
        correctAnswer: 1,
        explanation: "Directory traversal attempts contain '../' or '..\\' sequences trying to access files outside the web root."
      },
      {
        id: "la-q4-5",
        question: "What might multiple 'net user' commands in Windows logs indicate?",
        options: [
          "Normal IT operations",
          "User enumeration or reconnaissance by an attacker",
          "System updates",
          "Antivirus activity"
        ],
        correctAnswer: 1,
        explanation: "Multiple 'net user' commands might indicate an attacker enumerating users for privilege escalation or lateral movement."
      },
      {
        id: "la-q4-6",
        question: "Which log entry pattern suggests potential data exfiltration?",
        options: [
          "Normal web browsing",
          "Large outbound data transfers, especially to unusual destinations",
          "Inbound email traffic",
          "Software updates"
        ],
        correctAnswer: 1,
        explanation: "Data exfiltration often shows as large outbound transfers to unusual IPs, cloud storage, or during off-hours."
      },
      {
        id: "la-q4-7",
        question: "What does a 'golden ticket' attack look like in Kerberos logs?",
        options: [
          "Normal ticket requests",
          "TGS requests without corresponding TGT requests, or tickets with very long lifetimes",
          "Password reset requests",
          "Account lockouts"
        ],
        correctAnswer: 1,
        explanation: "Golden ticket attacks may show TGS requests without AS-REQ, unusual ticket lifetimes, or tickets for non-existent users."
      },
      {
        id: "la-q4-8",
        question: "Which pattern indicates potential web shell activity?",
        options: [
          "Regular web page requests",
          "POST requests to unusual files with command-like parameters",
          "Image file requests",
          "CSS file requests"
        ],
        correctAnswer: 1,
        explanation: "Web shells often show as POST requests to unusual file paths (like .php files in unexpected locations) with command parameters."
      },
      {
        id: "la-q4-9",
        question: "What might 'scheduled task created' events combined with persistence mechanisms indicate?",
        options: [
          "Normal system administration",
          "Potential malware establishing persistence",
          "Routine maintenance",
          "User preference changes"
        ],
        correctAnswer: 1,
        explanation: "Attackers often create scheduled tasks for persistence. Combined with suspicious executables, this indicates compromise."
      },
      {
        id: "la-q4-10",
        question: "Which log pattern suggests Pass-the-Hash attacks?",
        options: [
          "Normal interactive logons",
          "NTLM authentication without prior password entry, especially Type 3 logons",
          "Kerberos ticket requests",
          "Password changes"
        ],
        correctAnswer: 1,
        explanation: "Pass-the-Hash attacks show NTLM authentications using stolen hashes, often appearing as Type 3 network logons without interactive login."
      },
      {
        id: "la-q4-11",
        question: "What does PowerShell downloading and executing code in logs suggest?",
        options: [
          "Normal scripting",
          "Potential 'living off the land' attack technique",
          "System updates",
          "Scheduled maintenance"
        ],
        correctAnswer: 1,
        explanation: "PowerShell downloading and executing code (DownloadString, IEX) is a common 'living off the land' technique used by attackers."
      },
      {
        id: "la-q4-12",
        question: "Which indicator in proxy logs might reveal C2 communication?",
        options: [
          "Regular HTTP GET requests",
          "Beaconing patterns - regular, timed connections to the same domain",
          "Large file downloads",
          "Social media access"
        ],
        correctAnswer: 1,
        explanation: "C2 beaconing shows regular, timed connections (e.g., every 60 seconds) to specific domains, often with similar payload sizes."
      }
    ]
  },
  {
    quizId: "la-q5",
    courseId: "log-analysis",
    title: "Log Analysis Tools & Best Practices",
    description: "Master essential tools, techniques, and best practices for effective log analysis.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "la-q5-1",
        question: "Which Linux command is best for searching text patterns in log files?",
        options: [
          "ls",
          "grep",
          "cd",
          "mkdir"
        ],
        correctAnswer: 1,
        explanation: "The 'grep' command is essential for searching text patterns in files. It supports regex for complex pattern matching."
      },
      {
        id: "la-q5-2",
        question: "What does the command 'grep -i \"failed\" /var/log/auth.log' do?",
        options: [
          "Deletes lines containing 'failed'",
          "Searches case-insensitively for 'failed' in auth.log",
          "Creates a file called 'failed'",
          "Counts the lines in auth.log"
        ],
        correctAnswer: 1,
        explanation: "grep -i performs a case-insensitive search for the pattern 'failed' in the auth.log file."
      },
      {
        id: "la-q5-3",
        question: "Which command would count the number of failed SSH attempts?",
        options: [
          "cat /var/log/auth.log",
          "grep -c 'Failed password' /var/log/auth.log",
          "tail /var/log/auth.log",
          "head /var/log/auth.log"
        ],
        correctAnswer: 1,
        explanation: "grep -c counts the number of lines matching the pattern. This counts how many failed password entries exist."
      },
      {
        id: "la-q5-4",
        question: "What is the purpose of log normalization?",
        options: [
          "To delete old logs",
          "To convert different log formats into a consistent, standard format",
          "To encrypt log files",
          "To compress log storage"
        ],
        correctAnswer: 1,
        explanation: "Log normalization converts diverse log formats into a consistent structure, enabling correlation and unified analysis."
      },
      {
        id: "la-q5-5",
        question: "Why is establishing a baseline important in log analysis?",
        options: [
          "To increase storage space",
          "To understand normal behavior so anomalies can be detected",
          "To delete old logs automatically",
          "To encrypt sensitive data"
        ],
        correctAnswer: 1,
        explanation: "Baselines define normal behavior patterns. Deviations from baselines help identify anomalies and potential security incidents."
      },
      {
        id: "la-q5-6",
        question: "What command combines 'sort' and 'uniq -c' for log analysis?",
        options: [
          "Counts unique occurrences of sorted lines",
          "Deletes duplicate lines",
          "Encrypts the output",
          "Compresses the file"
        ],
        correctAnswer: 0,
        explanation: "Piping through 'sort | uniq -c' sorts lines and counts unique occurrences - useful for finding top talkers or common events."
      },
      {
        id: "la-q5-7",
        question: "What is log correlation?",
        options: [
          "Deleting related logs",
          "Connecting events from multiple sources to identify patterns",
          "Copying logs to backup",
          "Compressing log files"
        ],
        correctAnswer: 1,
        explanation: "Log correlation connects events from multiple sources to identify relationships, patterns, and reconstruct attack timelines."
      },
      {
        id: "la-q5-8",
        question: "Which regex pattern would match an IPv4 address?",
        options: [
          "[a-z]+",
          "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}",
          "[A-Z]*",
          "\\s+"
        ],
        correctAnswer: 1,
        explanation: "The pattern [0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3} matches IPv4 addresses (groups of 1-3 digits separated by dots)."
      },
      {
        id: "la-q5-9",
        question: "What should be included in a log analysis report?",
        options: [
          "Only the analyst's name",
          "Executive summary, timeline, findings, evidence, and recommendations",
          "Raw logs only",
          "System specifications"
        ],
        correctAnswer: 1,
        explanation: "A complete log analysis report includes executive summary, timeline of events, detailed findings, evidence, and actionable recommendations."
      },
      {
        id: "la-q5-10",
        question: "What is the 'awk' command commonly used for in log analysis?",
        options: [
          "Compressing files",
          "Text processing and extracting specific fields from structured data",
          "Network scanning",
          "File encryption"
        ],
        correctAnswer: 1,
        explanation: "awk is powerful for text processing, particularly extracting and manipulating specific fields from structured log data."
      },
      {
        id: "la-q5-11",
        question: "Why should log analysis findings be documented with timestamps?",
        options: [
          "For aesthetic purposes",
          "To establish timeline accuracy and enable recreation of events",
          "To increase file size",
          "For alphabetical ordering"
        ],
        correctAnswer: 1,
        explanation: "Timestamps establish timeline accuracy, enable event recreation, and provide audit trails for incident response and legal proceedings."
      },
      {
        id: "la-q5-12",
        question: "What is the benefit of using a SIEM for log analysis?",
        options: [
          "It replaces all other security tools",
          "It provides centralized collection, correlation, alerting, and visualization",
          "It eliminates the need for analysts",
          "It automatically fixes security issues"
        ],
        correctAnswer: 1,
        explanation: "SIEMs provide centralized log collection, real-time correlation, alerting, dashboards, and long-term storage for efficient analysis."
      }
    ]
  },

  // ==========================================
  // SIEM FUNDAMENTALS QUIZZES
  // ==========================================
  {
    quizId: "siem-q1",
    courseId: "siem-fundamentals",
    title: "SIEM Fundamentals Quiz",
    description: "Test your understanding of SIEM architecture, components, and basic concepts.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "siem-q1-1",
        question: "What does SIEM stand for?",
        options: [
          "Security Intelligence and Event Monitoring",
          "Security Information and Event Management",
          "System Integration and Endpoint Management",
          "Secure Infrastructure and Event Mapping"
        ],
        correctAnswer: 1,
        explanation: "SIEM stands for Security Information and Event Management — a platform that combines log aggregation, real-time monitoring, correlation, and alerting."
      },
      {
        id: "siem-q1-2",
        question: "Which component of a SIEM is responsible for collecting and forwarding log data?",
        options: [
          "Search Head",
          "Indexer",
          "Forwarder / Data Collector",
          "Dashboard Engine"
        ],
        correctAnswer: 2,
        explanation: "Forwarders (or data collectors/agents) are deployed on endpoints and network devices to collect and send log data to the SIEM for processing."
      },
      {
        id: "siem-q1-3",
        question: "What is the primary purpose of a SIEM in a SOC?",
        options: [
          "Replace all other security tools",
          "Centralize log collection, correlation, and alerting for threat detection",
          "Manage employee access permissions",
          "Automate patch management"
        ],
        correctAnswer: 1,
        explanation: "A SIEM centralizes log data from across the environment, correlates events, and generates alerts to help SOC analysts detect and respond to threats."
      },
      {
        id: "siem-q1-4",
        question: "Which SIEM platform uses SPL (Search Processing Language)?",
        options: [
          "Microsoft Sentinel",
          "IBM QRadar",
          "Splunk",
          "Elastic SIEM"
        ],
        correctAnswer: 2,
        explanation: "Splunk uses SPL (Search Processing Language) as its query language for searching, filtering, and analyzing data."
      },
      {
        id: "siem-q1-5",
        question: "What query language does Microsoft Sentinel use?",
        options: [
          "SPL",
          "SQL",
          "KQL (Kusto Query Language)",
          "AQL"
        ],
        correctAnswer: 2,
        explanation: "Microsoft Sentinel uses KQL (Kusto Query Language) for querying data stored in Azure Log Analytics workspaces."
      },
      {
        id: "siem-q1-6",
        question: "What is the role of an indexer in a SIEM?",
        options: [
          "Sending alerts to analysts",
          "Collecting logs from endpoints",
          "Processing, indexing, and storing incoming data for fast searching",
          "Displaying dashboards"
        ],
        correctAnswer: 2,
        explanation: "The indexer receives data from forwarders, parses it, creates indexes for efficient searching, and stores it according to retention policies."
      },
      {
        id: "siem-q1-7",
        question: "Which of the following is NOT a common SIEM use case?",
        options: [
          "Threat detection and alerting",
          "Compliance reporting",
          "Application development",
          "Incident investigation and forensics"
        ],
        correctAnswer: 2,
        explanation: "Application development is not a SIEM use case. SIEMs are used for threat detection, compliance, incident response, and forensic investigations."
      },
      {
        id: "siem-q1-8",
        question: "What does 'correlation' mean in SIEM context?",
        options: [
          "Deleting duplicate logs",
          "Linking related events from different sources to identify patterns or attacks",
          "Compressing log files",
          "Sending logs to a backup server"
        ],
        correctAnswer: 1,
        explanation: "Correlation links related events from multiple data sources to identify attack patterns, suspicious behaviors, or security incidents."
      },
      {
        id: "siem-q1-9",
        question: "Which SIEM platform is cloud-native and built on Azure?",
        options: [
          "Splunk Enterprise",
          "IBM QRadar",
          "Microsoft Sentinel",
          "ArcSight"
        ],
        correctAnswer: 2,
        explanation: "Microsoft Sentinel is a cloud-native SIEM built on Azure, offering scalable log analytics, threat intelligence, and SOAR capabilities."
      },
      {
        id: "siem-q1-10",
        question: "What is EPS in SIEM licensing?",
        options: [
          "Encrypted Protocol Standard",
          "Events Per Second — a measure of data ingestion rate",
          "Endpoint Protection Suite",
          "External Processing Server"
        ],
        correctAnswer: 1,
        explanation: "EPS (Events Per Second) measures the rate of data ingestion and is commonly used in SIEM licensing models to determine capacity and cost."
      },
      {
        id: "siem-q1-11",
        question: "What is the search head responsible for in Splunk's architecture?",
        options: [
          "Collecting logs from endpoints",
          "Storing raw data",
          "Processing search queries and presenting results to users",
          "Forwarding data between indexers"
        ],
        correctAnswer: 2,
        explanation: "The search head handles search requests from users, distributes them to indexers, merges results, and presents them through the UI."
      },
      {
        id: "siem-q1-12",
        question: "Which query language does IBM QRadar use?",
        options: [
          "SPL",
          "KQL",
          "AQL (Ariel Query Language)",
          "Lucene"
        ],
        correctAnswer: 2,
        explanation: "IBM QRadar uses AQL (Ariel Query Language), a SQL-like language for querying its Ariel database of security events and flows."
      },
      {
        id: "siem-q1-13",
        question: "What advantage does a cloud-native SIEM offer over on-premises?",
        options: [
          "Lower data quality",
          "No internet required",
          "Elastic scalability and reduced infrastructure management",
          "Faster local network speeds"
        ],
        correctAnswer: 2,
        explanation: "Cloud-native SIEMs offer elastic scalability, reduced infrastructure overhead, automatic updates, and pay-as-you-go pricing models."
      },
      {
        id: "siem-q1-14",
        question: "What is 'log normalization'?",
        options: [
          "Deleting old logs",
          "Converting logs from different sources into a common format",
          "Encrypting log data",
          "Backing up logs to tape"
        ],
        correctAnswer: 1,
        explanation: "Log normalization converts logs from various formats and sources into a standardized schema so they can be consistently searched and correlated."
      },
      {
        id: "siem-q1-15",
        question: "Which open-source search engine powers Elastic SIEM?",
        options: [
          "Apache Solr",
          "Elasticsearch",
          "MongoDB",
          "Redis"
        ],
        correctAnswer: 1,
        explanation: "Elastic SIEM is built on Elasticsearch, an open-source distributed search and analytics engine optimized for log and event data."
      }
    ]
  },
  {
    quizId: "siem-q2",
    courseId: "siem-fundamentals",
    title: "Data Ingestion Assessment",
    description: "Evaluate your knowledge of log collection, normalization, and data management.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "siem-q2-1",
        question: "What is the difference between agent-based and agentless log collection?",
        options: [
          "There is no difference",
          "Agent-based installs software on the source; agentless pulls data remotely via protocols like Syslog or WMI",
          "Agentless is always more reliable",
          "Agent-based only works on Windows"
        ],
        correctAnswer: 1,
        explanation: "Agent-based collection installs a lightweight forwarder on the source system, while agentless collection uses protocols like Syslog, WMI, or APIs to pull data remotely."
      },
      {
        id: "siem-q2-2",
        question: "What port does Syslog traditionally use?",
        options: [
          "TCP 80",
          "UDP 514",
          "TCP 443",
          "UDP 161"
        ],
        correctAnswer: 1,
        explanation: "Syslog traditionally uses UDP port 514 for sending log messages. Modern implementations often use TCP 514 or TCP 6514 (with TLS) for reliability."
      },
      {
        id: "siem-q2-3",
        question: "What is field extraction in SIEM data processing?",
        options: [
          "Deleting unnecessary fields from logs",
          "Parsing raw log data to identify and label specific data elements like IP, username, and action",
          "Exporting fields to a spreadsheet",
          "Encrypting sensitive fields"
        ],
        correctAnswer: 1,
        explanation: "Field extraction parses raw log data to identify and label key data elements like IP addresses, usernames, timestamps, and actions for structured searching."
      },
      {
        id: "siem-q2-4",
        question: "What is a 'source type' in Splunk?",
        options: [
          "The physical server generating logs",
          "A category that defines the format and parsing rules for incoming data",
          "The user who created the search",
          "A type of dashboard"
        ],
        correctAnswer: 1,
        explanation: "A source type in Splunk categorizes data by format, telling Splunk how to parse and extract fields from that specific log type."
      },
      {
        id: "siem-q2-5",
        question: "What is 'hot/warm/cold' storage in SIEM data management?",
        options: [
          "Temperature monitoring of servers",
          "Tiered storage where recent data is fast-access and older data moves to slower, cheaper storage",
          "Types of encryption",
          "Network speed tiers"
        ],
        correctAnswer: 1,
        explanation: "Hot/warm/cold storage tiers balance performance and cost: hot for recent, frequently accessed data; warm for less frequent; cold for archival and compliance."
      },
      {
        id: "siem-q2-6",
        question: "Why is timestamp normalization important in SIEM?",
        options: [
          "It makes logs look prettier",
          "It ensures events from different time zones can be accurately correlated chronologically",
          "It reduces storage costs",
          "It speeds up network traffic"
        ],
        correctAnswer: 1,
        explanation: "Timestamp normalization ensures events from systems in different time zones are aligned to a common reference (usually UTC) for accurate correlation."
      },
      {
        id: "siem-q2-7",
        question: "What is a Universal Forwarder in Splunk?",
        options: [
          "A full Splunk instance on every endpoint",
          "A lightweight agent that collects and forwards data to indexers with minimal resource usage",
          "A cloud-based storage service",
          "A type of dashboard"
        ],
        correctAnswer: 1,
        explanation: "A Universal Forwarder is a lightweight Splunk agent designed to collect and forward data to indexers while consuming minimal CPU and memory."
      },
      {
        id: "siem-q2-8",
        question: "What does CEF stand for in log formatting?",
        options: [
          "Common Encryption Framework",
          "Central Event Filter",
          "Common Event Format",
          "Centralized Extraction Function"
        ],
        correctAnswer: 2,
        explanation: "CEF (Common Event Format) is a standardized log format developed by ArcSight that provides a common structure for security event data across vendors."
      },
      {
        id: "siem-q2-9",
        question: "Which data collection method is best for cloud services like AWS or Azure?",
        options: [
          "Syslog over UDP",
          "Physical serial connection",
          "API-based integration",
          "Manual log upload"
        ],
        correctAnswer: 2,
        explanation: "API-based integration is ideal for cloud services, using REST APIs to pull logs from platforms like AWS CloudTrail, Azure Activity Logs, or Office 365."
      },
      {
        id: "siem-q2-10",
        question: "What is data enrichment in SIEM?",
        options: [
          "Compressing data for storage",
          "Adding context to events such as geolocation, threat intelligence, or asset information",
          "Deleting duplicate events",
          "Converting data to JSON format"
        ],
        correctAnswer: 1,
        explanation: "Data enrichment adds contextual information to raw events — like geolocation for IPs, threat intel scores, or asset criticality — improving analysis."
      },
      {
        id: "siem-q2-11",
        question: "What is the purpose of data retention policies in SIEM?",
        options: [
          "To keep all data forever",
          "To define how long different types of data are stored based on compliance and operational needs",
          "To delete data immediately after collection",
          "To encrypt stored data"
        ],
        correctAnswer: 1,
        explanation: "Retention policies define storage durations for different data types, balancing compliance requirements, operational needs, and storage costs."
      },
      {
        id: "siem-q2-12",
        question: "What protocol provides reliable, encrypted syslog delivery?",
        options: [
          "UDP Syslog",
          "SNMP",
          "Syslog over TLS (TCP 6514)",
          "FTP"
        ],
        correctAnswer: 2,
        explanation: "Syslog over TLS (typically on TCP port 6514) provides both reliable delivery (TCP) and encryption (TLS) for secure log transmission."
      },
      {
        id: "siem-q2-13",
        question: "What is an index in SIEM data storage?",
        options: [
          "A table of contents for documentation",
          "A structured repository where processed and searchable event data is stored",
          "A list of all SIEM users",
          "A backup location"
        ],
        correctAnswer: 1,
        explanation: "An index is a structured data store within the SIEM where processed events are organized and optimized for fast searching and retrieval."
      },
      {
        id: "siem-q2-14",
        question: "What happens if logs arrive at the SIEM with incorrect timestamps?",
        options: [
          "Nothing — the SIEM ignores timestamps",
          "Events may be placed out of order, making correlation and investigation inaccurate",
          "The SIEM automatically corrects all timestamps",
          "Logs are automatically deleted"
        ],
        correctAnswer: 1,
        explanation: "Incorrect timestamps cause events to appear in the wrong order, breaking correlation rules and making incident timelines unreliable."
      },
      {
        id: "siem-q2-15",
        question: "What is 'parsing' in the context of SIEM data ingestion?",
        options: [
          "Sending data to a backup server",
          "Breaking raw log data into structured fields that can be searched and analyzed",
          "Compressing log files",
          "Deleting malformed logs"
        ],
        correctAnswer: 1,
        explanation: "Parsing breaks raw, unstructured log data into structured, labeled fields (timestamp, source IP, action, etc.) for efficient querying."
      }
    ]
  },
  {
    quizId: "siem-q3",
    courseId: "siem-fundamentals",
    title: "Search & Query Mastery",
    description: "Practical quiz on writing SIEM queries and search techniques.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "siem-q3-1",
        question: "In SPL, what does the 'stats count by src_ip' command do?",
        options: [
          "Deletes events grouped by source IP",
          "Counts the number of events for each unique source IP address",
          "Sorts events alphabetically by source IP",
          "Filters out all source IP fields"
        ],
        correctAnswer: 1,
        explanation: "The 'stats count by src_ip' command aggregates events, counting how many occurrences exist for each unique source IP address."
      },
      {
        id: "siem-q3-2",
        question: "What does the wildcard character '*' do in a SIEM search?",
        options: [
          "Deletes all matching results",
          "Matches zero or more characters in a search term",
          "Marks results as favorites",
          "Exports results to CSV"
        ],
        correctAnswer: 1,
        explanation: "The wildcard '*' matches zero or more characters, enabling partial matching. For example, 'fail*' matches 'failed', 'failure', 'failing', etc."
      },
      {
        id: "siem-q3-3",
        question: "In KQL, what does '| where TimeGenerated > ago(1h)' do?",
        options: [
          "Shows events from more than 1 hour ago only",
          "Filters results to events from the last 1 hour",
          "Deletes events older than 1 hour",
          "Groups events by hour"
        ],
        correctAnswer: 1,
        explanation: "The 'where TimeGenerated > ago(1h)' filter returns only events generated within the last hour."
      },
      {
        id: "siem-q3-4",
        question: "What is the purpose of the 'table' command in SPL?",
        options: [
          "Creates a database table",
          "Displays only the specified fields in a tabular format",
          "Sorts data into tables by time",
          "Joins two data sources"
        ],
        correctAnswer: 1,
        explanation: "The 'table' command in SPL displays results showing only the specified fields in a clean tabular format."
      },
      {
        id: "siem-q3-5",
        question: "How do you search for an exact phrase in most SIEM platforms?",
        options: [
          "Using parentheses: (exact phrase)",
          "Using double quotes: \"exact phrase\"",
          "Using brackets: [exact phrase]",
          "Using asterisks: *exact phrase*"
        ],
        correctAnswer: 1,
        explanation: "Double quotes are used across most SIEM platforms to search for exact phrases, ensuring the words appear together in that order."
      },
      {
        id: "siem-q3-6",
        question: "What does the SPL command 'dedup src_ip' do?",
        options: [
          "Duplicates all source IP events",
          "Removes duplicate events, keeping only the first occurrence per unique source IP",
          "Counts duplicate IPs",
          "Sorts IPs in descending order"
        ],
        correctAnswer: 1,
        explanation: "The 'dedup' command removes duplicate events based on the specified field, keeping only the first occurrence of each unique value."
      },
      {
        id: "siem-q3-7",
        question: "In KQL, what does the 'summarize' operator do?",
        options: [
          "Displays a text summary of the query",
          "Aggregates data using functions like count(), avg(), sum() grouped by specified fields",
          "Summarizes the SIEM configuration",
          "Compresses query results"
        ],
        correctAnswer: 1,
        explanation: "The 'summarize' operator in KQL performs aggregation, similar to SQL's GROUP BY."
      },
      {
        id: "siem-q3-8",
        question: "What is the Boolean operator to exclude results in SIEM searches?",
        options: [
          "AND",
          "OR",
          "NOT",
          "XOR"
        ],
        correctAnswer: 2,
        explanation: "The NOT operator excludes matching results from the search."
      },
      {
        id: "siem-q3-9",
        question: "What does 'earliest=-24h latest=now' specify in a Splunk search?",
        options: [
          "Delete data from the last 24 hours",
          "The time range for the search: from 24 hours ago to the current time",
          "Schedule a search to run every 24 hours",
          "Limit results to 24 entries"
        ],
        correctAnswer: 1,
        explanation: "These time modifiers set the search window from 24 hours ago to the present moment."
      },
      {
        id: "siem-q3-10",
        question: "What is the pipe character '|' used for in SIEM queries?",
        options: [
          "Indicating a comment in the query",
          "Chaining commands, sending the output of one command as input to the next",
          "Separating field names from values",
          "Marking the end of a query"
        ],
        correctAnswer: 1,
        explanation: "The pipe '|' chains commands together in a pipeline, where each command processes the output of the previous one."
      },
      {
        id: "siem-q3-11",
        question: "How would you search for failed login attempts from a specific subnet in SPL?",
        options: [
          "failed login src_ip=192.168.1.*",
          "search failed AND login AND src_ip LIKE 192.168.1",
          "index=security action=failure src_ip=192.168.1.0/24",
          "Both A and C are valid approaches"
        ],
        correctAnswer: 3,
        explanation: "Both wildcard matching (192.168.1.*) and CIDR notation (192.168.1.0/24) are valid approaches in SPL to search within a subnet."
      },
      {
        id: "siem-q3-12",
        question: "What does 'head 10' do in a SIEM query?",
        options: [
          "Shows the first 10 results from the search",
          "Deletes the top 10 events",
          "Creates 10 copies of each event",
          "Runs the search 10 times"
        ],
        correctAnswer: 0,
        explanation: "The 'head' command limits output to the first N results, useful for quickly viewing the most relevant events."
      },
      {
        id: "siem-q3-13",
        question: "In KQL, what does 'project' do?",
        options: [
          "Creates a new project in Sentinel",
          "Selects specific columns to display in the output",
          "Projects future trends",
          "Archives the query"
        ],
        correctAnswer: 1,
        explanation: "The 'project' operator in KQL selects which columns to include in the output, similar to SELECT in SQL."
      },
      {
        id: "siem-q3-14",
        question: "What is a subsearch (or subquery) in SIEM?",
        options: [
          "A search that runs below the main search bar",
          "A nested search whose results feed into the outer/main search",
          "A search performed by a subordinate analyst",
          "A backup copy of a search"
        ],
        correctAnswer: 1,
        explanation: "A subsearch is a nested query that executes first, and its results are used as input for the outer search."
      },
      {
        id: "siem-q3-15",
        question: "What does the 'sort' command do in SPL?",
        options: [
          "Groups similar events together",
          "Orders results by specified fields in ascending or descending order",
          "Removes sorted data",
          "Counts sorted fields"
        ],
        correctAnswer: 1,
        explanation: "The 'sort' command orders results by one or more fields. Use '-' prefix for descending order."
      },
      {
        id: "siem-q3-16",
        question: "How do you use a lookup table in Splunk?",
        options: [
          "By importing a CSV file into the dashboard",
          "Using the 'lookup' command to enrich events with data from an external table",
          "By manually typing reference data",
          "Lookups are not supported in Splunk"
        ],
        correctAnswer: 1,
        explanation: "The 'lookup' command enriches search results by matching field values against an external lookup table."
      },
      {
        id: "siem-q3-17",
        question: "What is the 'transaction' command used for in SPL?",
        options: [
          "Processing financial transactions",
          "Grouping related events into single transactions based on shared fields and time proximity",
          "Creating database transactions",
          "Logging purchase orders"
        ],
        correctAnswer: 1,
        explanation: "The 'transaction' command groups related events into single transactions based on shared fields and time windows."
      },
      {
        id: "siem-q3-18",
        question: "What is the advantage of using 'tstats' over regular 'stats' in Splunk?",
        options: [
          "There is no advantage",
          "tstats is significantly faster because it searches indexed metadata rather than raw events",
          "tstats provides more accurate results",
          "tstats works only in cloud deployments"
        ],
        correctAnswer: 1,
        explanation: "tstats queries indexed metadata (tsidx files) rather than raw events, making it significantly faster for large datasets."
      },
      {
        id: "siem-q3-19",
        question: "In KQL, what does 'extend' do?",
        options: [
          "Extends the query timeout",
          "Creates a new calculated column based on an expression",
          "Extends the data retention period",
          "Increases the result limit"
        ],
        correctAnswer: 1,
        explanation: "The 'extend' operator in KQL creates new calculated columns based on expressions."
      },
      {
        id: "siem-q3-20",
        question: "What is the best practice for optimizing SIEM search performance?",
        options: [
          "Always search all indexes without time filters",
          "Use the narrowest time range, specific indexes, and filter early in the search pipeline",
          "Use only wildcard searches for flexibility",
          "Avoid using the pipe character"
        ],
        correctAnswer: 1,
        explanation: "Optimize by specifying the narrowest time range, targeting specific indexes, and filtering early to reduce data processed by subsequent commands."
      }
    ]
  },
  {
    quizId: "siem-q4",
    courseId: "siem-fundamentals",
    title: "Dashboards & Alerts Quiz",
    description: "Test your skills on visualization, dashboards, and alert configuration.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "siem-q4-1",
        question: "What is the primary purpose of a SOC dashboard?",
        options: [
          "To replace all other monitoring tools",
          "To provide real-time visibility into security events, trends, and operational status",
          "To store log data",
          "To manage user accounts"
        ],
        correctAnswer: 1,
        explanation: "SOC dashboards provide at-a-glance visibility into security posture, showing real-time event trends, alert status, and key metrics."
      },
      {
        id: "siem-q4-2",
        question: "Which visualization type is best for showing trends over time?",
        options: [
          "Pie chart",
          "Single value panel",
          "Line chart or area chart",
          "Table"
        ],
        correctAnswer: 2,
        explanation: "Line charts and area charts are ideal for showing how values change over time."
      },
      {
        id: "siem-q4-3",
        question: "What is a 'drilldown' in a SIEM dashboard?",
        options: [
          "A type of attack technique",
          "Clicking a dashboard element to navigate to more detailed data or a new search",
          "Drilling into physical hardware",
          "Removing data from the dashboard"
        ],
        correctAnswer: 1,
        explanation: "Drilldowns allow users to click on dashboard elements to navigate to detailed views or run more specific searches."
      },
      {
        id: "siem-q4-4",
        question: "What is alert fatigue?",
        options: [
          "When the SIEM runs out of storage",
          "When analysts become desensitized due to excessive false positive alerts",
          "When alerts stop being generated",
          "When dashboard refreshes are too slow"
        ],
        correctAnswer: 1,
        explanation: "Alert fatigue occurs when analysts are overwhelmed by too many alerts (especially false positives), causing them to miss genuine threats."
      },
      {
        id: "siem-q4-5",
        question: "What is a correlation rule in SIEM alerting?",
        options: [
          "A rule that correlates employee schedules",
          "A detection rule that triggers when specific conditions across multiple events are met",
          "A rule for organizing dashboard panels",
          "A data backup policy"
        ],
        correctAnswer: 1,
        explanation: "Correlation rules define conditions across multiple events that, when met together, trigger an alert."
      },
      {
        id: "siem-q4-6",
        question: "Which visualization is best for showing the proportion of alert types?",
        options: [
          "Line chart",
          "Pie chart or donut chart",
          "Scatter plot",
          "Gauge"
        ],
        correctAnswer: 1,
        explanation: "Pie and donut charts effectively show proportional distribution of alert categories or severity levels."
      },
      {
        id: "siem-q4-7",
        question: "What is a 'token' in Splunk dashboard context?",
        options: [
          "An authentication credential",
          "A dynamic variable that allows user input to filter dashboard panels interactively",
          "A physical security device",
          "A type of alert"
        ],
        correctAnswer: 1,
        explanation: "Dashboard tokens are dynamic variables populated by user inputs that filter data across multiple panels."
      },
      {
        id: "siem-q4-8",
        question: "What is the recommended approach to reduce false positives in SIEM alerts?",
        options: [
          "Disable all alerts",
          "Regularly review and tune detection rules by adding exceptions and adjusting thresholds",
          "Increase alert severity for all rules",
          "Only use pre-built alerts without modification"
        ],
        correctAnswer: 1,
        explanation: "Reducing false positives requires ongoing tuning: adding whitelists, adjusting thresholds, enriching with context, and reviewing performance metrics."
      },
      {
        id: "siem-q4-9",
        question: "What is a 'heatmap' useful for in security dashboards?",
        options: [
          "Monitoring server room temperature",
          "Visualizing data density or activity patterns across two dimensions",
          "Heating up cold storage data",
          "Showing network cable layouts"
        ],
        correctAnswer: 1,
        explanation: "Heatmaps visualize data density across two dimensions using color intensity, ideal for spotting anomalous activity patterns."
      },
      {
        id: "siem-q4-10",
        question: "What should a well-designed alert include?",
        options: [
          "Just the alert name",
          "Severity, description, affected assets, recommended response actions, and relevant context",
          "Only the raw log data",
          "The analyst's personal notes"
        ],
        correctAnswer: 1,
        explanation: "Effective alerts include severity level, clear description, affected assets, recommended investigation steps, and contextual information."
      },
      {
        id: "siem-q4-11",
        question: "What is a 'scheduled search' in SIEM alerting?",
        options: [
          "A search saved for personal reference",
          "A search that runs automatically at defined intervals and triggers alerts when conditions are met",
          "A search scheduled for deletion",
          "A manual search run by an analyst"
        ],
        correctAnswer: 1,
        explanation: "Scheduled searches run automatically at configured intervals, evaluating results against conditions to generate alerts."
      },
      {
        id: "siem-q4-12",
        question: "What is alert throttling?",
        options: [
          "Speeding up alert delivery",
          "Limiting how frequently the same alert can fire within a time window to prevent flooding",
          "Increasing alert severity",
          "Disabling alerts permanently"
        ],
        correctAnswer: 1,
        explanation: "Alert throttling prevents alert flooding by suppressing duplicate alerts within a defined time window."
      },
      {
        id: "siem-q4-13",
        question: "When should you use a geographic map visualization?",
        options: [
          "For all types of data",
          "When displaying data with geographic context like source IPs or login locations",
          "Only for internal network traffic",
          "When showing CPU usage"
        ],
        correctAnswer: 1,
        explanation: "Geographic maps are ideal for displaying location-based data such as attack origins or VPN login locations."
      },
      {
        id: "siem-q4-14",
        question: "What is a 'notable event' in Splunk Enterprise Security?",
        options: [
          "Any regular log event",
          "A high-priority security event generated by correlation searches that requires investigation",
          "A deleted event",
          "A scheduled report"
        ],
        correctAnswer: 1,
        explanation: "Notable events are security-significant events generated by correlation searches in Splunk ES, appearing in the incident review queue."
      },
      {
        id: "siem-q4-15",
        question: "What is the best practice for dashboard refresh intervals?",
        options: [
          "Refresh every second for real-time data",
          "Balance between timely data and system performance — typically 1-5 minutes for operational dashboards",
          "Never refresh — use static snapshots only",
          "Refresh only when manually triggered"
        ],
        correctAnswer: 1,
        explanation: "Dashboard refresh intervals should balance timeliness with performance. Operational SOC dashboards typically refresh every 1-5 minutes."
      }
    ]
  },
  {
    quizId: "siem-q5",
    courseId: "siem-fundamentals",
    title: "Final Certification Exam",
    description: "Comprehensive exam covering all SIEM fundamentals modules. Required for certification.",
    passingScore: 80,
    timeLimit: 45,
    questions: [
      {
        id: "siem-q5-1",
        question: "A SOC analyst notices 500 failed login attempts from a single IP within 10 minutes. What SIEM feature detected this?",
        options: [
          "Dashboard visualization",
          "Correlation rule with threshold-based detection",
          "Data normalization",
          "Log retention policy"
        ],
        correctAnswer: 1,
        explanation: "Threshold-based correlation rules detect when event counts exceed defined limits within a time window."
      },
      {
        id: "siem-q5-2",
        question: "Which SPL query would find the top 10 source IPs generating failed authentication events?",
        options: [
          "search failed auth | head 10",
          "index=security action=failure | stats count by src_ip | sort -count | head 10",
          "index=security | delete failed | top 10",
          "search * | filter src_ip"
        ],
        correctAnswer: 1,
        explanation: "This query searches security events for failures, counts per source IP, sorts descending, and limits to the top 10."
      },
      {
        id: "siem-q5-3",
        question: "What is the MITRE ATT&CK tactic that SIEM is most directly aligned to detect?",
        options: [
          "Resource Development",
          "Reconnaissance",
          "Multiple tactics across the kill chain via log correlation",
          "Physical access attacks"
        ],
        correctAnswer: 2,
        explanation: "SIEM can detect activities across multiple ATT&CK tactics by correlating logs from various sources."
      },
      {
        id: "siem-q5-4",
        question: "An analyst sees an 'Impossible Travel' alert — login from New York, then London 30 minutes later. What should they do first?",
        options: [
          "Immediately disable the user account",
          "Ignore it — it's probably a VPN",
          "Investigate by checking VPN/proxy usage, verifying with the user, and reviewing session details",
          "Delete the alert"
        ],
        correctAnswer: 2,
        explanation: "The analyst should investigate before acting: check for VPN/proxy usage, contact the user, and review session details."
      },
      {
        id: "siem-q5-5",
        question: "What is the difference between real-time and historical SIEM searches?",
        options: [
          "There is no difference",
          "Real-time searches continuously monitor incoming events; historical searches query stored data",
          "Historical searches are always faster",
          "Real-time searches only work on dashboards"
        ],
        correctAnswer: 1,
        explanation: "Real-time searches monitor events as they arrive; historical searches query already-indexed data for investigation."
      },
      {
        id: "siem-q5-6",
        question: "Which KQL query finds sign-in events from outside the United States in the last 24 hours?",
        options: [
          "SigninLogs | where Location != 'US'",
          "SigninLogs | where TimeGenerated > ago(24h) | where LocationDetails.countryOrRegion != 'US'",
          "search SigninLogs NOT US",
          "SigninLogs | summarize by Location"
        ],
        correctAnswer: 1,
        explanation: "This KQL query filters SigninLogs to the last 24 hours and excludes US-based sign-ins."
      },
      {
        id: "siem-q5-7",
        question: "What is 'lateral movement' and how can SIEM detect it?",
        options: [
          "Physical movement of servers; detected by cameras",
          "Attackers moving between systems; detected by correlating authentication logs across hosts",
          "Network cable rearrangement; detected by port monitoring",
          "Staff relocations; detected by HR systems"
        ],
        correctAnswer: 1,
        explanation: "Lateral movement is when attackers move between internal systems. SIEM detects it by correlating authentication events across hosts."
      },
      {
        id: "siem-q5-8",
        question: "You need a dashboard showing daily login trends, top failed IPs, and geographic distribution. Which visualizations?",
        options: [
          "Three pie charts",
          "Line chart for trends, bar chart for top IPs, geographic map for distribution",
          "Three tables",
          "Three single-value panels"
        ],
        correctAnswer: 1,
        explanation: "Use each visualization for its strength: line charts for trends, bar charts for rankings, and maps for geographic data."
      },
      {
        id: "siem-q5-9",
        question: "What is the purpose of a SIEM use case library?",
        options: [
          "A collection of books about SIEM",
          "A documented catalog of detection rules mapped to threats, with queries and response procedures",
          "A list of SIEM vendors",
          "A software code repository"
        ],
        correctAnswer: 1,
        explanation: "A use case library catalogs all detection rules with their purpose, associated threats, queries, and response procedures."
      },
      {
        id: "siem-q5-10",
        question: "What does 'data onboarding' involve in a SIEM project?",
        options: [
          "Training new employees",
          "Identifying, collecting, normalizing, and validating new data sources for ingestion",
          "Purchasing new hardware",
          "Uninstalling old software"
        ],
        correctAnswer: 1,
        explanation: "Data onboarding integrates new log sources: identifying data, configuring collection, defining parsing, and validating quality."
      },
      {
        id: "siem-q5-11",
        question: "An alert fires for 'PowerShell Download Cradle Detected'. What SPL query likely generated this?",
        options: [
          "index=security powershell",
          "index=endpoint process_name=powershell.exe (commandline=*downloadstring* OR commandline=*invoke-webrequest*)",
          "search powershell download",
          "index=network http download"
        ],
        correctAnswer: 1,
        explanation: "This query searches endpoint logs for PowerShell processes with download-related command-line arguments."
      },
      {
        id: "siem-q5-12",
        question: "What is the 'kill chain' approach to SIEM detection?",
        options: [
          "A method to delete old alerts",
          "Creating detection rules aligned to each stage of an attack lifecycle",
          "A chain of SIEM servers",
          "Removing unused detection rules"
        ],
        correctAnswer: 1,
        explanation: "The kill chain approach creates layered detection rules at each attack stage, increasing the chance of catching attackers."
      },
      {
        id: "siem-q5-13",
        question: "How should you handle a detection rule with a 90% false positive rate?",
        options: [
          "Keep it — 10% true positive is acceptable",
          "Delete the rule entirely",
          "Analyze false positives for patterns, refine the rule logic, add exceptions, and retest",
          "Lower the severity and ignore it"
        ],
        correctAnswer: 2,
        explanation: "Identify common FP patterns, refine query logic, add contextual conditions or exceptions, then retest to improve fidelity."
      },
      {
        id: "siem-q5-14",
        question: "What is 'pivoting' in SIEM investigation?",
        options: [
          "Rotating dashboard panels",
          "Using a discovered indicator to search for related events and expand the investigation",
          "Switching between SIEM platforms",
          "Changing the search time range"
        ],
        correctAnswer: 1,
        explanation: "Pivoting uses discovered artifacts as new search terms to find related events and uncover the full attack scope."
      },
      {
        id: "siem-q5-15",
        question: "What is the recommended approach for building a new detection rule?",
        options: [
          "Write it and immediately put it in production",
          "Copy rules from the internet without modification",
          "Develop, test against historical data, tune to reduce false positives, then deploy with monitoring",
          "Only use vendor-provided rules"
        ],
        correctAnswer: 2,
        explanation: "Best practice: develop, test against historical data, tune thresholds/exceptions, then deploy with ongoing monitoring."
      },
      {
        id: "siem-q5-16",
        question: "What is the difference between a 'saved search' and an 'alert' in SIEM?",
        options: [
          "They are the same thing",
          "A saved search is a reusable query; an alert is a saved search that triggers notifications",
          "Saved searches are faster",
          "Alerts cannot be saved"
        ],
        correctAnswer: 1,
        explanation: "A saved search is a stored query. An alert builds on a saved search by adding trigger conditions and notification actions."
      },
      {
        id: "siem-q5-17",
        question: "During an incident, what is the best SIEM approach to build a timeline?",
        options: [
          "Screenshot each alert individually",
          "Use transaction grouping and time-sorted searches across relevant data sources",
          "Only check the last hour of logs",
          "Ask colleagues to remember what happened"
        ],
        correctAnswer: 1,
        explanation: "Building timelines requires time-sorted, correlated searches across multiple data sources to reconstruct the complete event sequence."
      },
      {
        id: "siem-q5-18",
        question: "What metric measures the percentage of alerts that are actual security incidents?",
        options: [
          "EPS (Events Per Second)",
          "True Positive Rate / Alert Fidelity",
          "MTTR (Mean Time To Respond)",
          "Data Ingestion Volume"
        ],
        correctAnswer: 1,
        explanation: "True Positive Rate measures the percentage of alerts that represent real security incidents."
      },
      {
        id: "siem-q5-19",
        question: "What is the role of threat intelligence feeds in SIEM?",
        options: [
          "They replace the need for correlation rules",
          "They provide external indicators for automatic matching against incoming events",
          "They generate dashboards automatically",
          "They manage user authentication"
        ],
        correctAnswer: 1,
        explanation: "Threat intelligence feeds supply external IOCs that the SIEM matches against incoming events to detect known threats."
      },
      {
        id: "siem-q5-20",
        question: "You're investigating potential data exfiltration. Which SIEM data sources are most relevant?",
        options: [
          "Only email logs",
          "Firewall/proxy logs, DLP alerts, endpoint logs, and DNS queries",
          "Only authentication logs",
          "Only SIEM configuration logs"
        ],
        correctAnswer: 1,
        explanation: "Data exfiltration investigation requires correlating outbound traffic, DLP alerts, endpoint activity, and DNS queries."
      },
      {
        id: "siem-q5-21",
        question: "What is a 'detection gap' in SIEM operations?",
        options: [
          "A physical gap in the server rack",
          "A threat scenario that the SIEM currently has no detection rule for",
          "Time between dashboard refreshes",
          "Network latency"
        ],
        correctAnswer: 1,
        explanation: "A detection gap is a threat without detection coverage. Gap analysis against MITRE ATT&CK helps identify and prioritize new rules."
      },
      {
        id: "siem-q5-22",
        question: "What is the benefit of SIEM integration with SOAR?",
        options: [
          "SOAR replaces the SIEM entirely",
          "SOAR automates response actions triggered by SIEM alerts, reducing response time",
          "SOAR provides better data storage",
          "SOAR improves SIEM search speed"
        ],
        correctAnswer: 1,
        explanation: "SOAR automates repetitive response actions triggered by SIEM alerts, reducing MTTR and freeing analysts for complex investigations."
      },
      {
        id: "siem-q5-23",
        question: "What is 'log source health monitoring' in SIEM?",
        options: [
          "Monitoring the physical health of servers",
          "Tracking whether expected log sources are actively sending data and alerting if ingestion stops",
          "Running antivirus on log files",
          "Checking log file formatting"
        ],
        correctAnswer: 1,
        explanation: "Log source health monitoring tracks active ingestion and alerts when data stops flowing — missing logs create detection blind spots."
      },
      {
        id: "siem-q5-24",
        question: "Which represents the most mature SIEM deployment?",
        options: [
          "Collecting logs from one data source with no alerts",
          "Collecting from multiple sources with vendor-default rules only",
          "Comprehensive data sources, customized detection mapped to ATT&CK, automated response, continuous tuning",
          "Using SIEM only for compliance reporting"
        ],
        correctAnswer: 2,
        explanation: "A mature SIEM features comprehensive data coverage, customized detections, SOAR integration, and continuous improvement."
      },
      {
        id: "siem-q5-25",
        question: "What is the most critical factor for SIEM success in a SOC?",
        options: [
          "Having the most expensive SIEM platform",
          "Skilled analysts who understand the data, tune rules, and continuously improve detection coverage",
          "Ingesting the maximum amount of data possible",
          "Using only automated responses without human review"
        ],
        correctAnswer: 1,
        explanation: "The most critical factor is skilled analysts who understand the environment, tune detection rules, and drive continuous improvement — technology alone is insufficient."
      }
    ]
  },
  // ===== Network Security Monitoring Course Quizzes =====
  {
    quizId: "nsm-q1",
    courseId: "network-security-monitoring",
    title: "NSM Foundations",
    description: "Test your understanding of Network Security Monitoring principles, protocols, and sensor architecture.",
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: "nsm-q1-1",
        question: "What distinguishes Network Security Monitoring from traditional intrusion detection?",
        options: [
          "NSM only uses signature-based detection",
          "NSM focuses on collection, detection, AND analysis of network data for situational awareness",
          "NSM replaces the need for endpoint security entirely",
          "NSM only monitors wireless networks"
        ],
        correctAnswer: 1,
        explanation: "NSM goes beyond simple alerting by combining data collection, detection, and human-driven analysis to build comprehensive situational awareness of network activity."
      },
      {
        id: "nsm-q1-2",
        question: "During a TCP three-way handshake, what is the correct sequence of flags?",
        options: [
          "ACK → SYN → SYN-ACK",
          "SYN → SYN-ACK → ACK",
          "SYN → ACK → SYN-ACK",
          "FIN → SYN → ACK"
        ],
        correctAnswer: 1,
        explanation: "The TCP three-way handshake proceeds: client sends SYN, server responds with SYN-ACK, client completes with ACK — establishing a reliable connection."
      },
      {
        id: "nsm-q1-3",
        question: "Why is UDP significant from a security monitoring perspective?",
        options: [
          "UDP is always encrypted",
          "UDP's connectionless nature makes it harder to track sessions and easier for attackers to spoof",
          "UDP cannot be used for data exfiltration",
          "UDP traffic is automatically blocked by firewalls"
        ],
        correctAnswer: 1,
        explanation: "UDP is connectionless with no handshake, making it difficult to track sessions and easy for attackers to spoof source addresses — commonly abused in DNS amplification attacks and covert channels."
      },
      {
        id: "nsm-q1-4",
        question: "At which OSI layer does a network TAP operate to capture traffic?",
        options: [
          "Layer 7 – Application",
          "Layer 4 – Transport",
          "Layer 1 – Physical",
          "Layer 3 – Network"
        ],
        correctAnswer: 2,
        explanation: "Network TAPs operate at the Physical layer (Layer 1), creating an exact electrical or optical copy of all traffic passing through a link without introducing latency."
      },
      {
        id: "nsm-q1-5",
        question: "What is the primary disadvantage of using a SPAN/mirror port compared to a network TAP?",
        options: [
          "SPAN ports are more expensive than TAPs",
          "SPAN ports can drop packets under heavy load and may miss full-duplex traffic",
          "SPAN ports only capture Layer 2 traffic",
          "SPAN ports require custom hardware"
        ],
        correctAnswer: 1,
        explanation: "SPAN ports mirror traffic via the switch CPU, which can drop packets under load. They may also not capture Layer 1 errors, malformed frames, or full-duplex conversations accurately."
      },
      {
        id: "nsm-q1-6",
        question: "Which DNS record type maps a domain name to an IPv4 address?",
        options: [
          "MX record",
          "CNAME record",
          "A record",
          "TXT record"
        ],
        correctAnswer: 2,
        explanation: "The A (Address) record maps a domain name to an IPv4 address. AAAA records serve the same purpose for IPv6 addresses."
      },
      {
        id: "nsm-q1-7",
        question: "What is the purpose of the TTL field in an IP packet header from a defender's perspective?",
        options: [
          "It encrypts the packet payload",
          "It limits the packet's lifetime and can reveal OS fingerprinting and routing anomalies",
          "It specifies the packet's priority level",
          "It determines the maximum segment size"
        ],
        correctAnswer: 1,
        explanation: "TTL (Time to Live) limits how many hops a packet can traverse. Different operating systems set different initial TTL values, enabling passive OS fingerprinting. Unusual TTL values can also indicate tunneling or spoofing."
      },
      {
        id: "nsm-q1-8",
        question: "Which sensor placement strategy provides the broadest visibility of external threats?",
        options: [
          "Behind the internal firewall only",
          "On individual endpoint machines",
          "At the network perimeter between the external firewall and the internet",
          "Only on the DMZ segment"
        ],
        correctAnswer: 2,
        explanation: "Placing sensors at the network perimeter captures all inbound and outbound traffic before internal filtering, providing maximum visibility of external threat actor activity."
      },
      {
        id: "nsm-q1-9",
        question: "What does the term 'full content data' mean in NSM?",
        options: [
          "Only metadata about connections",
          "Complete packet captures including headers and payloads",
          "Firewall logs only",
          "Summary statistics of network flows"
        ],
        correctAnswer: 1,
        explanation: "Full content data refers to complete packet captures (PCAPs) that include all headers and payloads — the most detailed form of network evidence, essential for forensic analysis."
      },
      {
        id: "nsm-q1-10",
        question: "Which protocol typically uses port 443 and obscures payload content from network monitors?",
        options: [
          "HTTP",
          "DNS",
          "HTTPS/TLS",
          "FTP"
        ],
        correctAnswer: 2,
        explanation: "HTTPS uses TLS encryption on port 443, making payload inspection impossible without TLS interception. Attackers frequently use HTTPS for C2 to blend with legitimate traffic."
      }
    ]
  },
  {
    quizId: "nsm-q2",
    courseId: "network-security-monitoring",
    title: "Packet Capture & Wireshark",
    description: "Assess your skills in packet capture, Wireshark filters, and traffic analysis techniques.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q2-1",
        question: "What is the difference between a Wireshark capture filter and a display filter?",
        options: [
          "They are identical in syntax and function",
          "Capture filters use BPF syntax and limit what is recorded; display filters use Wireshark syntax and filter what is shown from already captured data",
          "Display filters are applied before capture begins",
          "Capture filters only work on wireless interfaces"
        ],
        correctAnswer: 1,
        explanation: "Capture filters (BPF syntax, e.g., 'host 10.0.0.1') determine what packets are saved to disk. Display filters (Wireshark syntax, e.g., 'ip.addr == 10.0.0.1') filter the view of already-captured data."
      },
      {
        id: "nsm-q2-2",
        question: "Which Wireshark display filter shows only HTTP GET requests?",
        options: [
          "tcp.port == 80",
          "http.request.method == \"GET\"",
          "http contains GET",
          "filter http get"
        ],
        correctAnswer: 1,
        explanation: "The display filter 'http.request.method == \"GET\"' precisely targets HTTP GET requests by filtering on the parsed HTTP request method field."
      },
      {
        id: "nsm-q2-3",
        question: "When reconstructing a TCP stream in Wireshark, what feature do you use?",
        options: [
          "Edit → Preferences → TCP",
          "Right-click a packet → Follow → TCP Stream",
          "Statistics → Flow Graph",
          "Analyze → Expert Info"
        ],
        correctAnswer: 1,
        explanation: "Right-clicking a TCP packet and selecting Follow → TCP Stream reassembles the entire conversation between client and server, showing the data exchanged in order."
      },
      {
        id: "nsm-q2-4",
        question: "What does a high number of TCP RST packets from a single source IP likely indicate?",
        options: [
          "Normal web browsing activity",
          "Port scanning or connection probing",
          "Successful file transfers",
          "DNS resolution activity"
        ],
        correctAnswer: 1,
        explanation: "Large volumes of RST packets from one source typically indicate port scanning — the source is probing closed ports or services that reject the connection attempt."
      },
      {
        id: "nsm-q2-5",
        question: "Which indicator in DNS traffic suggests possible DNS tunneling?",
        options: [
          "Standard A record queries to well-known domains",
          "Unusually long subdomain labels, high query volume to a single domain, and TXT record queries",
          "PTR record lookups for internal IPs",
          "SOA queries during zone transfers"
        ],
        correctAnswer: 1,
        explanation: "DNS tunneling encodes data in subdomain labels (creating abnormally long queries), generates high query volumes, and often uses TXT records to carry larger response payloads."
      },
      {
        id: "nsm-q2-6",
        question: "What is the Wireshark display filter to show all packets from or to subnet 192.168.1.0/24?",
        options: [
          "ip.src == 192.168.1.0/24",
          "ip.addr == 192.168.1.0/24",
          "net 192.168.1.0/24",
          "host 192.168.1.*"
        ],
        correctAnswer: 1,
        explanation: "The display filter 'ip.addr == 192.168.1.0/24' matches any packet where either the source or destination IP falls within the specified CIDR range."
      },
      {
        id: "nsm-q2-7",
        question: "How can you extract files transferred over HTTP from a PCAP in Wireshark?",
        options: [
          "Edit → Find Packet → String",
          "File → Export Objects → HTTP",
          "Statistics → Endpoints",
          "Analyze → Follow HTTP Stream"
        ],
        correctAnswer: 1,
        explanation: "File → Export Objects → HTTP lists all files transferred over HTTP in the capture, allowing you to save them individually — critical for extracting malware samples or exfiltrated documents."
      },
      {
        id: "nsm-q2-8",
        question: "What does TCP retransmission indicate in a packet capture?",
        options: [
          "The connection is encrypted",
          "Packet loss occurred and the sender is resending unacknowledged segments",
          "The firewall is blocking traffic",
          "The application is sending duplicate data intentionally"
        ],
        correctAnswer: 1,
        explanation: "TCP retransmissions occur when the sender doesn't receive an ACK within the timeout period, indicating packet loss due to network congestion, faulty hardware, or potential interference."
      },
      {
        id: "nsm-q2-9",
        question: "Which BPF capture filter captures only traffic on port 53?",
        options: [
          "dns.port == 53",
          "port 53",
          "tcp.port == 53",
          "filter port=53"
        ],
        correctAnswer: 1,
        explanation: "The BPF capture filter 'port 53' captures both TCP and UDP traffic on port 53 (DNS). BPF syntax differs from Wireshark display filter syntax."
      },
      {
        id: "nsm-q2-10",
        question: "What suspicious pattern would you look for in HTTP traffic to detect a webshell?",
        options: [
          "Large image downloads",
          "POST requests to unusual file paths with command-like parameters and small response sizes",
          "Standard GET requests to the homepage",
          "JavaScript file downloads"
        ],
        correctAnswer: 1,
        explanation: "Webshells often manifest as POST requests to odd file paths (e.g., /uploads/shell.php) with command parameters (cmd=whoami), returning small text responses — distinct from normal web traffic patterns."
      }
    ]
  },
  {
    quizId: "nsm-q3",
    courseId: "network-security-monitoring",
    title: "Suricata IDS/IPS",
    description: "Evaluate your knowledge of Suricata rule writing, alert tuning, and intrusion detection concepts.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q3-1",
        question: "What is the basic structure of a Suricata rule?",
        options: [
          "IF-THEN-ELSE conditional blocks",
          "Action, Header (protocol/IPs/ports/direction), and Rule Options (in parentheses)",
          "XML-formatted detection signatures",
          "JSON objects with match criteria"
        ],
        correctAnswer: 1,
        explanation: "Suricata rules follow: ACTION PROTOCOL SRC_IP SRC_PORT -> DST_IP DST_PORT (options;). For example: alert http $HOME_NET any -> $EXTERNAL_NET any (msg:\"Suspicious UA\"; content:\"evil\"; sid:100001;)."
      },
      {
        id: "nsm-q3-2",
        question: "What does the 'content' keyword do in a Suricata rule?",
        options: [
          "Specifies the file type to inspect",
          "Matches a specific byte pattern or string within the packet payload or header",
          "Sets the logging output format",
          "Defines the rule category"
        ],
        correctAnswer: 1,
        explanation: "The 'content' keyword performs pattern matching against packet data. It can match ASCII strings or hex byte sequences (e.g., content:|de ad be ef|;) and supports modifiers like nocase, depth, and offset."
      },
      {
        id: "nsm-q3-3",
        question: "What is the purpose of the 'flow' keyword in Suricata rules?",
        options: [
          "To measure network bandwidth",
          "To specify the direction and state of the connection (established, to_server, to_client)",
          "To count the number of packets in a session",
          "To define flow chart diagrams"
        ],
        correctAnswer: 1,
        explanation: "The 'flow' keyword matches on TCP session state and direction. 'flow:established,to_server;' targets data sent from client to server on established connections, reducing false positives on handshake traffic."
      },
      {
        id: "nsm-q3-4",
        question: "How does the 'threshold' keyword help reduce alert fatigue?",
        options: [
          "It deletes alerts automatically after a set time",
          "It limits alerting frequency, e.g., alerting once per source IP within a time window instead of per-packet",
          "It increases the priority of all alerts",
          "It disables alerts permanently"
        ],
        correctAnswer: 1,
        explanation: "Thresholds control alert rate — 'threshold:type limit,track by_src,count 1,seconds 300;' fires only once per source IP every 5 minutes, preventing alert floods from repetitive activity."
      },
      {
        id: "nsm-q3-5",
        question: "What is the difference between Suricata running in IDS mode versus IPS mode?",
        options: [
          "There is no difference",
          "IDS passively monitors and alerts; IPS is inline and can actively block or drop malicious traffic",
          "IDS blocks traffic; IPS only monitors",
          "IPS requires more rules than IDS"
        ],
        correctAnswer: 1,
        explanation: "In IDS mode, Suricata passively copies and analyzes traffic. In IPS (inline) mode, traffic flows through Suricata, enabling 'drop' and 'reject' actions to block malicious packets in real time."
      },
      {
        id: "nsm-q3-6",
        question: "Which Suricata rule action would you use to silently discard a malicious packet in IPS mode?",
        options: [
          "alert",
          "pass",
          "drop",
          "log"
        ],
        correctAnswer: 2,
        explanation: "The 'drop' action silently discards the matching packet and generates an alert. 'reject' also sends a reset/ICMP unreachable to the sender. 'pass' whitelists the traffic."
      },
      {
        id: "nsm-q3-7",
        question: "What does the 'pcre' keyword allow you to do in Suricata rules?",
        options: [
          "Parse PCAP files directly",
          "Use Perl Compatible Regular Expressions for complex pattern matching",
          "Compress packet data",
          "Convert packets to PDF format"
        ],
        correctAnswer: 1,
        explanation: "The 'pcre' keyword enables regex-based matching for complex patterns that simple content matches can't express, like variable-length strings or pattern alternatives."
      },
      {
        id: "nsm-q3-8",
        question: "What is a 'suppress' rule in Suricata used for?",
        options: [
          "To increase the severity of an alert",
          "To prevent specific alerts from being generated for certain IPs or subnets without disabling the rule entirely",
          "To encrypt alert output",
          "To forward alerts to another system"
        ],
        correctAnswer: 1,
        explanation: "Suppress rules silence alerts for specific track conditions (e.g., suppress gen_id 1, sig_id 2001, track by_src, ip 10.0.0.5) — useful for whitelisting known-good sources without disabling the detection globally."
      },
      {
        id: "nsm-q3-9",
        question: "What does the 'sid' keyword represent in a Suricata rule?",
        options: [
          "Session Identifier",
          "Signature ID — a unique identifier for each rule",
          "Source ID — identifying the traffic source",
          "Security Impact Descriptor"
        ],
        correctAnswer: 1,
        explanation: "SID (Signature ID) is a unique numeric identifier for each Suricata rule. Custom rules typically use SID values starting at 1000000 to avoid conflicts with community rulesets."
      },
      {
        id: "nsm-q3-10",
        question: "Which Suricata feature enables extraction and logging of TLS certificate metadata without decryption?",
        options: [
          "file-store module",
          "TLS/SSL parser logging fields like tls.subject, tls.issuer, tls.ja3.hash",
          "HTTP log module",
          "DNS parser"
        ],
        correctAnswer: 1,
        explanation: "Suricata's TLS parser extracts certificate metadata (subject, issuer, serial, JA3/JA3S fingerprints) from the handshake without requiring decryption — powerful for detecting suspicious certificates and known-bad TLS fingerprints."
      }
    ]
  },
  {
    quizId: "nsm-q4",
    courseId: "network-security-monitoring",
    title: "Zeek Network Metadata",
    description: "Test your proficiency with Zeek logs, UID correlation, and network metadata analysis.",
    passingScore: 70,
    timeLimit: 20,
    questions: [
      {
        id: "nsm-q4-1",
        question: "What makes Zeek fundamentally different from Suricata in its approach to network analysis?",
        options: [
          "Zeek is only a firewall",
          "Zeek focuses on generating rich metadata logs about every connection rather than signature-based alerting",
          "Zeek can only analyze offline PCAPs",
          "Zeek replaces the need for packet capture"
        ],
        correctAnswer: 1,
        explanation: "Zeek generates structured metadata logs (conn.log, dns.log, http.log, etc.) about all network activity. While it supports scripting-based detection, its primary strength is comprehensive network visibility through logs."
      },
      {
        id: "nsm-q4-2",
        question: "What is the 'uid' field in Zeek's conn.log used for?",
        options: [
          "User identification for authentication",
          "A unique connection identifier that correlates entries across all Zeek log files for the same session",
          "The Unix user running the Zeek process",
          "A checksum of the packet payload"
        ],
        correctAnswer: 1,
        explanation: "The UID is a unique string assigned to each connection. The same UID appears in conn.log, dns.log, http.log, files.log, etc., allowing analysts to trace all activity belonging to a single session."
      },
      {
        id: "nsm-q4-3",
        question: "In Zeek's conn.log, what does a connection with 'conn_state: S0' indicate?",
        options: [
          "A fully established and closed connection",
          "A SYN was sent but no SYN-ACK was received — the connection attempt was unanswered",
          "An established connection that was reset",
          "A UDP connection with data exchange"
        ],
        correctAnswer: 1,
        explanation: "S0 means a SYN was sent with no reply, indicating the target port is filtered, the host is unreachable, or a stealthy scan is in progress. Large volumes of S0 connections from one source strongly suggest port scanning."
      },
      {
        id: "nsm-q4-4",
        question: "Which Zeek log would you analyze to detect DNS tunneling?",
        options: [
          "conn.log",
          "dns.log — looking for unusually long queries, high volume to single domains, and TXT responses",
          "ssl.log",
          "smtp.log"
        ],
        correctAnswer: 1,
        explanation: "dns.log records all DNS queries and responses. DNS tunneling indicators in this log include abnormally long query strings, high query frequency to a single parent domain, and TXT record abuse."
      },
      {
        id: "nsm-q4-5",
        question: "What information does Zeek's ssl.log provide that is valuable for threat detection?",
        options: [
          "The decrypted content of HTTPS sessions",
          "Certificate details, JA3/JA3S fingerprints, server name (SNI), and validation status",
          "Only the source and destination IPs",
          "Firewall rule match results"
        ],
        correctAnswer: 1,
        explanation: "ssl.log records TLS handshake metadata: certificate subject/issuer, JA3/JA3S hashes, SNI values, and validation status — enabling detection of self-signed certs, expired certs, and known malicious TLS fingerprints."
      },
      {
        id: "nsm-q4-6",
        question: "How would you use Zeek logs to identify potential C2 beaconing?",
        options: [
          "Look for connections with large file downloads",
          "Analyze conn.log for connections with regular time intervals, consistent byte sizes, and long durations to the same destination",
          "Check smtp.log for outbound emails",
          "Review notice.log for system errors"
        ],
        correctAnswer: 1,
        explanation: "C2 beacons produce regular connection patterns visible in conn.log: consistent intervals between connections, similar request/response sizes, long session durations, and persistence to the same external IP."
      },
      {
        id: "nsm-q4-7",
        question: "What is the purpose of Zeek's files.log?",
        options: [
          "Logging filesystem changes on the Zeek server",
          "Recording metadata about every file transferred over the network, including hashes and MIME types",
          "Listing Zeek configuration files",
          "Tracking log file rotation"
        ],
        correctAnswer: 1,
        explanation: "files.log records metadata for every file transferred over monitored protocols: SHA256/MD5 hashes, MIME types, file sizes, source/destination, and extraction status — enabling malware detection via hash matching."
      },
      {
        id: "nsm-q4-8",
        question: "What does a Zeek 'notice' represent?",
        options: [
          "A system error in the Zeek process",
          "A higher-level detection event generated by Zeek's analysis framework when policy-relevant activity is observed",
          "A debug message for developers",
          "A notification about Zeek software updates"
        ],
        correctAnswer: 1,
        explanation: "Notices are Zeek's built-in detection mechanism — generated when the analysis framework identifies policy-relevant activity like SSL certificate issues, scan detection, or protocol violations."
      },
      {
        id: "nsm-q4-9",
        question: "Which Zeek command-line option reads a PCAP file for offline analysis?",
        options: [
          "zeek --live",
          "zeek -r capture.pcap",
          "zeek --import capture.pcap",
          "zeek --offline capture.pcap"
        ],
        correctAnswer: 1,
        explanation: "The '-r' flag reads a PCAP file for offline analysis: 'zeek -r capture.pcap' processes the file and generates all applicable log files — the same analysis as live monitoring."
      },
      {
        id: "nsm-q4-10",
        question: "What is a practical use case for Zeek scripting?",
        options: [
          "Replacing Suricata entirely",
          "Creating custom log fields, triggering notices on specific conditions, or enriching data with external intelligence feeds",
          "Compiling packet captures into video",
          "Generating firewall rules automatically"
        ],
        correctAnswer: 1,
        explanation: "Zeek scripts extend analysis capabilities: adding custom fields to logs, creating detection logic (e.g., alerting on connections to threat intel IPs), computing statistics, or extracting files matching specific criteria."
      }
    ]
  },
  {
    quizId: "nsm-q5",
    courseId: "network-security-monitoring",
    title: "Network Attack Detection",
    description: "Challenge your ability to detect reconnaissance, C2, lateral movement, and data exfiltration on the network.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q5-1",
        question: "Which network behavior most strongly indicates a TCP SYN scan (half-open scan)?",
        options: [
          "Completed TCP handshakes followed by data transfer",
          "SYN packets to many ports with RST responses and no completed handshakes",
          "Large volumes of UDP traffic",
          "ICMP echo requests to multiple hosts"
        ],
        correctAnswer: 1,
        explanation: "A SYN scan sends SYN packets to target ports. Open ports reply SYN-ACK (scanner sends RST), closed ports reply RST. No handshakes complete — visible as many S0/REJ states in Zeek conn.log."
      },
      {
        id: "nsm-q5-2",
        question: "What is JA3 fingerprinting and why is it useful for detecting C2?",
        options: [
          "A technique to decrypt TLS traffic",
          "An MD5 hash of specific TLS Client Hello parameters that uniquely identifies client applications regardless of IP or domain",
          "A method to block all HTTPS traffic",
          "A DNS-based threat intelligence feed"
        ],
        correctAnswer: 1,
        explanation: "JA3 hashes the TLS version, cipher suites, extensions, and elliptic curves from the Client Hello. Malware families produce consistent JA3 fingerprints, enabling detection even when attackers rotate domains and IPs."
      },
      {
        id: "nsm-q5-3",
        question: "How does C2 beaconing typically appear in network traffic?",
        options: [
          "Random connections to many different destinations",
          "Periodic connections at regular or near-regular intervals to the same destination with consistent packet sizes",
          "One-time large file downloads",
          "Inbound connections from multiple countries simultaneously"
        ],
        correctAnswer: 1,
        explanation: "Beaconing produces a rhythmic pattern: connections at fixed intervals (with possible jitter), similar request/response sizes, to the same destination — distinguishable from human-driven traffic's irregular patterns."
      },
      {
        id: "nsm-q5-4",
        question: "Which network protocol is commonly abused for lateral movement using PsExec?",
        options: [
          "HTTP on port 80",
          "SMB on port 445",
          "DNS on port 53",
          "SMTP on port 25"
        ],
        correctAnswer: 1,
        explanation: "PsExec uses SMB (port 445) to copy an executable to the target's ADMIN$ share and create a remote service. Detecting SMB writes to ADMIN$ followed by service creation is a key lateral movement indicator."
      },
      {
        id: "nsm-q5-5",
        question: "What network-level indicator suggests RDP-based lateral movement?",
        options: [
          "HTTP POST requests between internal hosts",
          "Internal-to-internal connections on port 3389, especially from hosts that don't normally initiate RDP",
          "DNS queries for external domains",
          "ICMP traffic between servers"
        ],
        correctAnswer: 1,
        explanation: "RDP lateral movement appears as port 3389 connections between internal hosts. Baselines of normal RDP usage help identify anomalous sessions — especially from workstations to servers or unusual source hosts."
      },
      {
        id: "nsm-q5-6",
        question: "Which technique uses DNS queries to secretly extract data from a network?",
        options: [
          "DNS amplification attack",
          "DNS exfiltration — encoding stolen data in subdomain labels of queries to attacker-controlled domains",
          "DNS cache poisoning",
          "DNS zone transfer"
        ],
        correctAnswer: 1,
        explanation: "DNS exfiltration encodes data in subdomain queries (e.g., base64data.evil.com). Since DNS is rarely blocked, attackers can slowly extract data — detectable by monitoring query length, volume, and entropy."
      },
      {
        id: "nsm-q5-7",
        question: "What is a 'low and slow' exfiltration technique designed to evade?",
        options: [
          "Endpoint antivirus scans",
          "Volume-based and rate-based network detection thresholds",
          "Physical security controls",
          "User authentication systems"
        ],
        correctAnswer: 1,
        explanation: "Low-and-slow exfiltration sends small amounts of data over long periods to stay under volume thresholds and rate-based alerts. Detection requires baselining normal traffic patterns and looking for cumulative anomalies."
      },
      {
        id: "nsm-q5-8",
        question: "How can you detect pass-the-hash attacks on the network?",
        options: [
          "By monitoring HTTP headers",
          "By detecting NTLM authentication over SMB/RPC where the same NTLM hash authenticates to multiple systems in a short timeframe",
          "By checking DNS query patterns",
          "By analyzing email attachments"
        ],
        correctAnswer: 1,
        explanation: "Pass-the-hash uses stolen NTLM hashes for authentication. Network indicators include NTLM (not Kerberos) authentication, the same account authenticating to many systems rapidly, and type-3 NTLM messages without prior type-1/type-2."
      },
      {
        id: "nsm-q5-9",
        question: "Which of the following would indicate potential data staging before exfiltration?",
        options: [
          "Normal email traffic patterns",
          "Unusual SMB file copy activity to a single internal host followed by large outbound transfers from that host",
          "Standard software update downloads",
          "Routine backup traffic to designated servers"
        ],
        correctAnswer: 1,
        explanation: "Attackers often stage data by copying files from multiple internal sources to a single collection point, then exfiltrating from there — visible as unusual inbound SMB activity followed by anomalous outbound connections."
      },
      {
        id: "nsm-q5-10",
        question: "What makes ICMP tunneling difficult to detect without proper monitoring?",
        options: [
          "ICMP is always encrypted",
          "ICMP echo requests/replies are common and often allowed through firewalls, but the data payload field can carry hidden communication",
          "ICMP only works on internal networks",
          "ICMP traffic is never logged by any tool"
        ],
        correctAnswer: 1,
        explanation: "ICMP echo (ping) is universally allowed. Attackers embed data in the payload field. Detection requires inspecting ICMP payload sizes (abnormally large), content (non-standard patterns), and session frequency."
      }
    ]
  },
  {
    quizId: "nsm-q6",
    courseId: "network-security-monitoring",
    title: "Practical NSM Operations",
    description: "Final assessment on building NSM workflows, network forensics, and operational best practices.",
    passingScore: 75,
    timeLimit: 25,
    questions: [
      {
        id: "nsm-q6-1",
        question: "What is the recommended architecture for integrating Zeek and Suricata into a SIEM?",
        options: [
          "Run both tools on the SIEM server itself",
          "Deploy both on sensors with a log shipper (e.g., Filebeat) forwarding to a centralized SIEM for correlation and alerting",
          "Only use one tool at a time, never both",
          "Store all data locally on each sensor without centralization"
        ],
        correctAnswer: 1,
        explanation: "Best practice is sensor-based deployment with centralized analysis: Zeek and Suricata run on network sensors, Filebeat ships logs to a SIEM (e.g., Elastic/Splunk), enabling cross-source correlation and unified alerting."
      },
      {
        id: "nsm-q6-2",
        question: "When preserving network evidence for forensic investigation, which principle is most critical?",
        options: [
          "Immediately analyze all PCAPs on the production sensor",
          "Maintain chain of custody with hashing, timestamps, and write-protected copies of original evidence",
          "Delete old captures to save disk space",
          "Share raw PCAPs via email to the legal team"
        ],
        correctAnswer: 1,
        explanation: "Forensic integrity requires chain of custody: hash original PCAPs immediately (SHA256), record collection timestamps, work on copies only, document every access, and store originals on write-protected media."
      },
      {
        id: "nsm-q6-3",
        question: "How do you construct a network forensics timeline from Zeek logs?",
        options: [
          "Sort alerts by severity only",
          "Correlate events across Zeek logs using timestamps and UIDs to build a chronological sequence of attacker actions",
          "Only use conn.log and ignore other log types",
          "Rely solely on firewall logs"
        ],
        correctAnswer: 1,
        explanation: "Timeline construction uses Zeek's UID to link conn.log → dns.log → http.log → files.log entries for the same session, then orders all correlated events chronologically to reconstruct the attacker's progression."
      },
      {
        id: "nsm-q6-4",
        question: "What is the primary risk of running Suricata with outdated rule sets?",
        options: [
          "The system will crash",
          "New attack techniques and malware variants will go undetected while only known-old threats are caught",
          "Network performance will degrade",
          "Log files will become corrupted"
        ],
        correctAnswer: 1,
        explanation: "Outdated rules miss new CVE exploits, recent malware C2 patterns, and evolving TTPs. Best practice is automated daily rule updates (e.g., suricata-update) combined with custom rules for environment-specific threats."
      },
      {
        id: "nsm-q6-5",
        question: "Which metric best indicates the health and coverage of an NSM deployment?",
        options: [
          "Total number of alerts generated per day",
          "Percentage of network segments with sensor coverage combined with mean time to detect simulated attacks",
          "Number of Suricata rules loaded",
          "Total PCAP storage consumed"
        ],
        correctAnswer: 1,
        explanation: "Effective NSM metrics combine coverage (what percentage of network traffic is monitored) with detection effectiveness (how quickly simulated or red team attacks are identified) — not just raw alert volume."
      },
      {
        id: "nsm-q6-6",
        question: "What is the purpose of traffic baselining in NSM operations?",
        options: [
          "To throttle network bandwidth",
          "To establish normal traffic patterns so that deviations indicating potential threats can be identified",
          "To encrypt all network traffic",
          "To reduce the number of network users"
        ],
        correctAnswer: 1,
        explanation: "Baselining documents normal traffic patterns (volume, protocols, endpoints, time-of-day patterns). Deviations from baseline — such as new protocols, unusual hours, or unexpected destinations — signal potential threats."
      },
      {
        id: "nsm-q6-7",
        question: "During a multi-stage intrusion investigation, what should be your first step after receiving an alert?",
        options: [
          "Immediately block the source IP on the firewall",
          "Pivot from the alert to collect full context: check Zeek logs for the connection UID, review related sessions, and determine scope before taking action",
          "Delete the alert and wait for more",
          "Restart the IDS sensor"
        ],
        correctAnswer: 1,
        explanation: "Effective triage starts with context gathering: trace the alert's connection through Zeek logs, identify related sessions, check for lateral movement, and determine blast radius before containment actions."
      },
      {
        id: "nsm-q6-8",
        question: "What challenge does TLS encryption present for NSM, and how is it addressed?",
        options: [
          "TLS has no impact on monitoring capabilities",
          "TLS prevents payload inspection; analysts compensate using metadata analysis (JA3, SNI, certificate info, connection patterns) and optional TLS inspection proxies",
          "TLS makes all traffic invisible to sensors",
          "TLS is only used on external traffic"
        ],
        correctAnswer: 1,
        explanation: "TLS encrypts payloads but metadata remains visible: JA3 fingerprints, SNI values, certificate details, connection timing/sizes. Combined with optional TLS interception proxies at the perimeter, effective monitoring is maintained."
      },
      {
        id: "nsm-q6-9",
        question: "What is the recommended PCAP retention strategy for a production NSM environment?",
        options: [
          "Keep all PCAPs forever",
          "Tiered retention: full PCAP for days/weeks on fast storage, Zeek metadata for months, alert-related PCAPs archived for years based on compliance requirements",
          "Delete PCAPs immediately after analysis",
          "Only keep PCAPs from weekdays"
        ],
        correctAnswer: 1,
        explanation: "Tiered retention balances storage costs with investigative needs: short-term full PCAP on fast storage, medium-term Zeek metadata, and long-term archival of incident-related captures — aligned with regulatory requirements."
      },
      {
        id: "nsm-q6-10",
        question: "In a final capstone investigation, which approach demonstrates mature NSM analysis?",
        options: [
          "Responding to each alert individually without connecting them",
          "Correlating alerts, Zeek metadata, and PCAP evidence across time to reconstruct the full attack chain from initial access through exfiltration",
          "Focusing only on the most recent alert",
          "Forwarding all alerts to management without analysis"
        ],
        correctAnswer: 1,
        explanation: "Mature NSM analysis correlates all data sources: Suricata alerts identify suspicious events, Zeek logs provide session context and connection history, and PCAP provides packet-level proof — together revealing the complete attack narrative."
      }
    ]
  }
];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
