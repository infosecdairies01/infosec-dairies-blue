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
  }
];

export const getQuizById = (courseId: string, quizId: string): QuizData | undefined => {
  return quizzes.find(q => q.courseId === courseId && q.quizId === quizId);
};

export const getCourseQuizzes = (courseId: string): QuizData[] => {
  return quizzes.filter(q => q.courseId === courseId);
};
