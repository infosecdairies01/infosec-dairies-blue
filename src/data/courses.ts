export interface Lesson {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "unlocked" | "locked";
}

export interface Module {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  lessons: Lesson[];
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
}

export const courses: Course[] = [
  {
    id: "soc-fundamentals",
    title: "Blue Team & SOC Fundamentals",
    shortTitle: "SOC Level 1",
    description: "Build your foundation as a Level 1 SOC analyst and step into the world of cybersecurity defense. This course covers the essential skills, tools, and workflows you need to detect and respond to threats effectively.",
    difficulty: "easy",
    duration: "8 hours",
    bgImage: "soc-course-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Introduction to Security Operations",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "Welcome to the SOC", description: "Introductory overview of SOC roles and responsibilities.", status: "completed" },
          { id: "1.2", title: "Cyber Threat Landscape", status: "locked" },
          { id: "1.3", title: "Key SOC Concepts", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Log Analysis Essentials",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "Basics of Log Analysis", status: "locked" },
          { id: "2.2", title: "Identifying Suspicious Activity", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "SIEM Fundamentals",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "What is a SIEM?", status: "locked" },
          { id: "3.2", title: "SIEM Navigation Basics", status: "locked" },
          { id: "3.3", title: "Creating Simple Queries", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Alert Handling & Triage",
        lessons: [
          { id: "4.1", title: "Understanding Alerts", status: "locked" },
          { id: "4.2", title: "Alert Triage Process", status: "locked" },
        ],
      },
      {
        id: "5",
        title: "Incident Response Basics",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "5.1", title: "IR Fundamentals", status: "locked" },
          { id: "5.2", title: "Basic Incident Response Steps", status: "locked" },
          { id: "5.3", title: "Module Quiz: IR Basics", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "log-analysis",
    title: "Log Analysis for Beginners",
    shortTitle: "Log Analysis",
    description: "Start your journey into log analysis. Learn to read, parse, and understand security logs from various sources including Windows, Linux, and network devices.",
    difficulty: "easy",
    duration: "6 hours",
    bgImage: "courses/log-analysis-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Introduction to Logs",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "What are Security Logs?", description: "Understanding the importance of logs in security.", status: "unlocked" },
          { id: "1.2", title: "Common Log Formats", status: "locked" },
          { id: "1.3", title: "Log Sources Overview", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Windows Event Logs",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "Windows Event Log Basics", status: "locked" },
          { id: "2.2", title: "Security Event IDs", status: "locked" },
          { id: "2.3", title: "Analyzing Login Events", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Linux Logs",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Syslog Fundamentals", status: "locked" },
          { id: "3.2", title: "Auth Logs Analysis", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Network Device Logs",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "4.1", title: "Firewall Logs", status: "locked" },
          { id: "4.2", title: "Proxy Logs", status: "locked" },
          { id: "4.3", title: "Module Quiz", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "siem-fundamentals",
    title: "SIEM Fundamentals",
    shortTitle: "SIEM Basics",
    description: "Master Security Information and Event Management basics. Learn to navigate and understand modern SIEM platforms, create queries, and build dashboards.",
    difficulty: "easy",
    duration: "7 hours",
    bgImage: "courses/siem-fundamentals-bg.jpg",
    modules: [
      {
        id: "1",
        title: "SIEM Overview",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "What is SIEM?", description: "Introduction to SIEM technology and use cases.", status: "unlocked" },
          { id: "1.2", title: "SIEM Architecture", status: "locked" },
          { id: "1.3", title: "Popular SIEM Platforms", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Data Ingestion",
        lessons: [
          { id: "2.1", title: "Log Collection Methods", status: "locked" },
          { id: "2.2", title: "Data Normalization", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Query Basics",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Search Fundamentals", status: "locked" },
          { id: "3.2", title: "Filtering and Aggregation", status: "locked" },
          { id: "3.3", title: "Building Dashboards", status: "locked" },
        ],
      },
    ],
  },
  {
    id: "soc-analyst-practical",
    title: "SOC Analyst Practical Training",
    shortTitle: "SOC Level 2",
    description: "Advance your skills with hands-on SOC Level 2 training. Master alert triage, threat hunting, and advanced detection techniques used by professional analysts.",
    difficulty: "medium",
    duration: "12 hours",
    bgImage: "courses/soc-analyst-practical-bg.jpg",
    modules: [
      {
        id: "1",
        title: "Advanced Alert Triage",
        badge: "Commet",
        badgeColor: "bg-primary/20 text-primary border-primary/30",
        lessons: [
          { id: "1.1", title: "Triage Methodology", description: "Systematic approach to alert prioritization.", status: "unlocked" },
          { id: "1.2", title: "False Positive Analysis", status: "locked" },
          { id: "1.3", title: "Escalation Procedures", status: "locked" },
        ],
      },
      {
        id: "2",
        title: "Threat Investigation",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "2.1", title: "Investigation Workflow", status: "locked" },
          { id: "2.2", title: "IOC Analysis", status: "locked" },
          { id: "2.3", title: "Timeline Reconstruction", status: "locked" },
        ],
      },
      {
        id: "3",
        title: "Detection Tuning",
        badge: "Lab",
        badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
        lessons: [
          { id: "3.1", title: "Rule Optimization", status: "locked" },
          { id: "3.2", title: "Threshold Adjustments", status: "locked" },
        ],
      },
      {
        id: "4",
        title: "Practical Scenarios",
        badge: "Quiz",
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        lessons: [
          { id: "4.1", title: "Phishing Investigation", status: "locked" },
          { id: "4.2", title: "Malware Alert Analysis", status: "locked" },
          { id: "4.3", title: "Final Assessment", status: "locked" },
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
