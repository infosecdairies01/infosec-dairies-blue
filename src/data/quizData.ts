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
  }
];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
