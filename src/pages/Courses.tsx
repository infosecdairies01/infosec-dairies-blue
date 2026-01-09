import { useState } from "react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import CourseDetailModal, { CourseData } from "@/components/CourseDetailModal";

const Courses = () => {
  const [activeTab, setActiveTab] = useState<"self-paced" | "live">("self-paced");
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selfPacedCourses: CourseData[] = [
    {
      title: "Blue Team & SOC Fundamentals",
      description: "Build your foundation in Security Operations. Learn essential concepts, tools, and workflows for SOC Level 1 analysts.",
      duration: "20+ hours",
      level: "Beginner",
      price: 99,
      originalPrice: 149,
      type: "self-paced",
      features: [
        "Lifetime access",
        "Certificate of completion",
        "Hands-on labs",
        "Community access",
        "Downloadable resources",
        "Mobile-friendly"
      ],
      modules: [
        {
          title: "Introduction to Security Operations",
          lessons: ["What is a SOC?", "SOC Team Roles & Responsibilities", "Security Operations Lifecycle"]
        },
        {
          title: "Understanding Threats & Attacks",
          lessons: ["Common Attack Vectors", "Malware Types & Behavior", "Threat Actor Profiles"]
        },
        {
          title: "Essential SOC Tools",
          lessons: ["SIEM Overview", "EDR & XDR Basics", "Ticketing & Documentation"]
        },
        {
          title: "Alert Triage Fundamentals",
          lessons: ["Reading Security Alerts", "True vs False Positives", "Escalation Procedures"]
        }
      ]
    },
    {
      title: "SOC Analyst Practical Training",
      description: "Advance your skills with hands-on SOC Level 2 training. Master alert triage, threat hunting, and advanced detection techniques.",
      duration: "35+ hours",
      level: "Intermediate",
      price: 199,
      originalPrice: 299,
      type: "self-paced",
      features: [
        "Lifetime access",
        "Certificate of completion",
        "Real-world scenarios",
        "Advanced labs",
        "1-on-1 mentorship session",
        "Job-ready skills"
      ],
      modules: [
        {
          title: "Advanced Threat Detection",
          lessons: ["Behavioral Analysis", "Pattern Recognition", "Anomaly Detection"]
        },
        {
          title: "Threat Hunting Techniques",
          lessons: ["Proactive Hunting Methods", "Hypothesis Development", "Hunt Playbooks"]
        },
        {
          title: "Deep Dive: SIEM Queries",
          lessons: ["Advanced Search Queries", "Correlation Rules", "Custom Dashboards"]
        },
        {
          title: "Incident Investigation",
          lessons: ["Evidence Collection", "Timeline Analysis", "Root Cause Analysis"]
        }
      ]
    },
    {
      title: "SIEM Fundamentals for Blue Team",
      description: "Master Security Information and Event Management. Learn to configure, monitor, and create detection rules in modern SIEM platforms.",
      duration: "25+ hours",
      level: "Intermediate",
      price: 149,
      originalPrice: 199,
      type: "self-paced",
      features: [
        "Lifetime access",
        "Certificate of completion",
        "Multi-platform labs",
        "Rule templates",
        "Community access",
        "Vendor-neutral approach"
      ],
      modules: [
        {
          title: "SIEM Architecture",
          lessons: ["Log Collection Methods", "Data Normalization", "Storage & Retention"]
        },
        {
          title: "Log Sources & Parsing",
          lessons: ["Windows Event Logs", "Linux Syslog", "Network Device Logs"]
        },
        {
          title: "Detection Engineering",
          lessons: ["Writing Detection Rules", "Sigma Rules Basics", "Testing & Tuning"]
        },
        {
          title: "Dashboards & Reporting",
          lessons: ["Creating Visualizations", "Executive Reports", "Metrics & KPIs"]
        }
      ]
    },
    {
      title: "Log Analysis for SOC Analysts",
      description: "Develop expertise in parsing, correlating, and analyzing security logs to identify threats and investigate incidents effectively.",
      duration: "18+ hours",
      level: "Intermediate",
      price: 129,
      originalPrice: 179,
      type: "self-paced",
      features: [
        "Lifetime access",
        "Certificate of completion",
        "Real log samples",
        "Analysis templates",
        "Cheat sheets",
        "Practical exercises"
      ],
      modules: [
        {
          title: "Log Fundamentals",
          lessons: ["Log Formats & Standards", "Timestamps & Timezones", "Log Enrichment"]
        },
        {
          title: "Windows Log Analysis",
          lessons: ["Security Event IDs", "PowerShell Logs", "Sysmon Deep Dive"]
        },
        {
          title: "Network Log Analysis",
          lessons: ["Firewall Logs", "Proxy & DNS Logs", "NetFlow Analysis"]
        },
        {
          title: "Correlation & Investigation",
          lessons: ["Building Timelines", "Lateral Movement Detection", "Data Exfiltration Signs"]
        }
      ]
    },
    {
      title: "Incident Response Fundamentals",
      description: "Learn the complete incident response lifecycle. Master containment, eradication, recovery, and post-incident analysis procedures.",
      duration: "22+ hours",
      level: "Intermediate",
      price: 169,
      originalPrice: 249,
      type: "self-paced",
      features: [
        "Lifetime access",
        "Certificate of completion",
        "IR playbooks",
        "Tabletop exercises",
        "Documentation templates",
        "Case studies"
      ],
      modules: [
        {
          title: "IR Framework & Preparation",
          lessons: ["NIST IR Framework", "Building an IR Team", "Playbook Development"]
        },
        {
          title: "Detection & Analysis",
          lessons: ["Identifying Incidents", "Severity Classification", "Initial Scoping"]
        },
        {
          title: "Containment & Eradication",
          lessons: ["Containment Strategies", "Malware Removal", "System Hardening"]
        },
        {
          title: "Recovery & Lessons Learned",
          lessons: ["Recovery Procedures", "Post-Incident Review", "Improving Defenses"]
        }
      ]
    }
  ];

  const liveCourses: CourseData[] = [
    {
      title: "SOC Analyst",
      description: "Live instructor-led SOC training with real-time scenarios, hands-on labs, and direct mentorship from industry practitioners.",
      duration: "8 weeks",
      level: "Beginner",
      price: 599,
      originalPrice: 799,
      type: "live",
      features: [
        "Live sessions (2x/week)",
        "Recording access",
        "Direct Q&A with instructor",
        "Group labs",
        "Certificate of completion",
        "Job placement support"
      ],
      modules: [
        {
          title: "Week 1-2: SOC Foundations",
          lessons: ["SOC Operations Overview", "Tooling Ecosystem", "Alert Workflow"]
        },
        {
          title: "Week 3-4: Threat Detection",
          lessons: ["Threat Intelligence Basics", "Detection Methods", "SIEM Operations"]
        },
        {
          title: "Week 5-6: Investigation Skills",
          lessons: ["Log Analysis", "Forensic Basics", "Case Management"]
        },
        {
          title: "Week 7-8: Capstone Project",
          lessons: ["Simulated SOC Environment", "End-to-End Investigation", "Presentation & Review"]
        }
      ]
    },
    {
      title: "Splunk Engineer",
      description: "Master Splunk with live sessions covering deployment, configuration, SPL queries, dashboards, and enterprise security monitoring.",
      duration: "6 weeks",
      level: "Intermediate",
      price: 699,
      originalPrice: 899,
      type: "live",
      features: [
        "Live sessions (2x/week)",
        "Splunk lab environment",
        "SPL query library",
        "Dashboard templates",
        "Certificate of completion",
        "Career guidance"
      ],
      modules: [
        {
          title: "Week 1-2: Splunk Architecture",
          lessons: ["Installation & Configuration", "Data Inputs", "Index Management"]
        },
        {
          title: "Week 3-4: SPL Mastery",
          lessons: ["Search Fundamentals", "Advanced Queries", "Macros & Lookups"]
        },
        {
          title: "Week 5: Dashboards & Visualizations",
          lessons: ["Dashboard Creation", "Drilldowns & Tokens", "Custom Views"]
        },
        {
          title: "Week 6: Enterprise Security",
          lessons: ["ES Framework", "Notable Events", "Risk-Based Alerting"]
        }
      ]
    },
    {
      title: "Digital Forensics",
      description: "Investigate cybercrime with live guidance. Learn evidence collection, disk forensics, memory analysis, and chain of custody procedures.",
      duration: "10 weeks",
      level: "Advanced",
      price: 899,
      originalPrice: 1199,
      type: "live",
      features: [
        "Live sessions (2x/week)",
        "Forensic tools license",
        "Evidence samples",
        "Legal documentation templates",
        "Expert certification prep",
        "Peer collaboration"
      ],
      modules: [
        {
          title: "Week 1-2: Forensic Fundamentals",
          lessons: ["Legal Framework", "Evidence Handling", "Chain of Custody"]
        },
        {
          title: "Week 3-4: Disk Forensics",
          lessons: ["Imaging Techniques", "File System Analysis", "Data Recovery"]
        },
        {
          title: "Week 5-7: Memory Forensics",
          lessons: ["Memory Acquisition", "Process Analysis", "Malware Detection"]
        },
        {
          title: "Week 8-10: Network & Mobile Forensics",
          lessons: ["Network Traffic Analysis", "Mobile Device Forensics", "Final Investigation Project"]
        }
      ]
    },
    {
      title: "GRC",
      description: "Master Governance, Risk, and Compliance with live training on frameworks, policy development, audits, and regulatory requirements.",
      duration: "6 weeks",
      level: "Intermediate",
      price: 549,
      originalPrice: 749,
      type: "live",
      features: [
        "Live sessions (2x/week)",
        "Policy templates",
        "Risk assessment tools",
        "Audit checklists",
        "Certificate of completion",
        "Networking opportunities"
      ],
      modules: [
        {
          title: "Week 1-2: Governance Foundations",
          lessons: ["IT Governance Frameworks", "Policy Development", "Security Controls"]
        },
        {
          title: "Week 3-4: Risk Management",
          lessons: ["Risk Assessment Methods", "Risk Treatment", "Business Impact Analysis"]
        },
        {
          title: "Week 5: Compliance Frameworks",
          lessons: ["ISO 27001", "SOC 2", "GDPR & HIPAA Basics"]
        },
        {
          title: "Week 6: Audit & Assurance",
          lessons: ["Audit Preparation", "Evidence Collection", "Remediation Planning"]
        }
      ]
    }
  ];

  const currentCourses = activeTab === "self-paced" ? selfPacedCourses : liveCourses;

  const handleCourseClick = (course: CourseData) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative min-h-screen overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Master cybersecurity with our comprehensive blue team training programs
              </p>
            </div>

            {/* Tab Selection */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("self-paced")}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === "self-paced"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card/50 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  Self Paced
                </span>
              </button>
              <button
                onClick={() => setActiveTab("live")}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  activeTab === "live"
                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25"
                    : "bg-card/50 border border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  Live Training
                </span>
              </button>
            </div>

            {/* Course Description */}
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              {activeTab === "self-paced" 
                ? "Learn at your own pace with our comprehensive pre-recorded courses. Access anytime, anywhere."
                : "Interactive instructor-led sessions with real-time Q&A, hands-on labs, and personalized feedback."
              }
            </p>
            
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InfosecDairies. All rights reserved.</p>
          <p className="mt-2">Blue Team Cybersecurity Education &amp; Insights</p>
        </div>
      </footer>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </main>
  );
};

export default Courses;
