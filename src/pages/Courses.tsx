import { useState } from "react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
const Courses = () => {
  const [activeTab, setActiveTab] = useState<"self-paced" | "live">("self-paced");
  const selfPacedCourses = [
    {
      title: "Blue Team & SOC Fundamentals",
      description: "Build your foundation in Security Operations. Learn essential concepts, tools, and workflows for SOC Level 1 analysts.",
      difficulty: "easy" as const
    },
    {
      title: "Log Analysis for Beginners",
      description: "Start your journey into log analysis. Learn to read, parse, and understand security logs from various sources.",
      difficulty: "easy" as const
    },
    {
      title: "SIEM Fundamentals",
      description: "Master Security Information and Event Management basics. Learn to navigate and understand modern SIEM platforms.",
      difficulty: "easy" as const
    },
    {
      title: "SOC Analyst Practical Training",
      description: "Advance your skills with hands-on SOC Level 2 training. Master alert triage, threat hunting, and advanced detection techniques.",
      difficulty: "medium" as const
    },
    {
      title: "Incident Response Fundamentals",
      description: "Learn the complete incident response lifecycle. Master containment, eradication, recovery, and post-incident analysis procedures.",
      difficulty: "medium" as const
    },
    {
      title: "Threat Hunting Fundamentals",
      description: "Proactively search for threats in your environment. Learn hypothesis-driven hunting, IOC analysis, and threat intelligence integration.",
      difficulty: "hard" as const
    },
    {
      title: "Detection Engineering Basics",
      description: "Build custom detection rules and analytics. Master SIGMA rules, YARA signatures, and detection-as-code methodologies.",
      difficulty: "hard" as const
    },
    {
      title: "Malware Analysis Fundamentals",
      description: "Analyze malicious software safely. Learn static and dynamic analysis, sandboxing, and reverse engineering basics.",
      difficulty: "hard" as const
    }
  ];

  const liveCourses = [
    {
      title: "SOC Analyst",
      description: "Live instructor-led SOC training with real-time scenarios, hands-on labs, and direct mentorship from industry practitioners."
    },
    {
      title: "Splunk Engineer",
      description: "Master Splunk with live sessions covering deployment, configuration, SPL queries, dashboards, and enterprise security monitoring."
    },
    {
      title: "Digital Forensics",
      description: "Investigate cybercrime with live guidance. Learn evidence collection, disk forensics, memory analysis, and chain of custody procedures."
    },
    {
      title: "GRC",
      description: "Master Governance, Risk, and Compliance with live training on frameworks, policy development, audits, and regulatory requirements."
    },
    {
      title: "Bug Bounty",
      description: "Learn to discover and report security vulnerabilities in live sessions. Master reconnaissance, web app testing, and responsible disclosure."
    }
  ];

  return <main className="min-h-screen bg-background">
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
            <div className="flex justify-center gap-3 mb-12">
              <button onClick={() => setActiveTab("self-paced")} className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === "self-paced" ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "bg-card/50 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
                Self Paced
              </button>
              <button onClick={() => setActiveTab("live")} className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === "live" ? "bg-secondary text-secondary-foreground shadow-md shadow-secondary/25" : "bg-card/50 border border-border text-muted-foreground hover:border-secondary/50 hover:text-foreground"}`}>
                Live Training
              </button>
            </div>

            {/* Course Description */}
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              {activeTab === "self-paced" ? "Learn at your own pace with our comprehensive pre-recorded courses. Access anytime, anywhere." : "Interactive instructor-led sessions with real-time Q&A, hands-on labs, and personalized feedback."}
            </p>
            
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === "self-paced" 
                ? selfPacedCourses.map((course, index) => (
                    <CourseCard key={index} title={course.title} description={course.description} index={index} difficulty={course.difficulty} />
                  ))
                : liveCourses.map((course, index) => (
                    <CourseCard key={index} title={course.title} description={course.description} index={index} />
                  ))
              }
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
    </main>;
};
export default Courses;