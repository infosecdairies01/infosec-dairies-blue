import { useState } from "react";
import Navbar from "@/components/Navbar";

const Courses = () => {
  const [activeTab, setActiveTab] = useState<"self-paced" | "live">("self-paced");

  const selfPacedCourses = [
    {
      icon: "1️⃣",
      title: "Blue Team & SOC Fundamentals",
      description: "Build your foundation in Security Operations. Learn essential concepts, tools, and workflows for SOC Level 1 analysts."
    },
    {
      icon: "2️⃣",
      title: "SOC Analyst Practical Training",
      description: "Advance your skills with hands-on SOC Level 2 training. Master alert triage, threat hunting, and advanced detection techniques."
    },
    {
      icon: "3️⃣",
      title: "SIEM Fundamentals for Blue Team",
      description: "Master Security Information and Event Management. Learn to configure, monitor, and create detection rules in modern SIEM platforms."
    },
    {
      icon: "4️⃣",
      title: "Log Analysis for SOC Analysts",
      description: "Develop expertise in parsing, correlating, and analyzing security logs to identify threats and investigate incidents effectively."
    },
    {
      icon: "5️⃣",
      title: "Incident Response Fundamentals",
      description: "Learn the complete incident response lifecycle. Master containment, eradication, recovery, and post-incident analysis procedures."
    }
  ];

  const liveCourses = [
    {
      icon: "🛡️",
      title: "SOC Analyst",
      description: "Live instructor-led SOC training with real-time scenarios, hands-on labs, and direct mentorship from industry practitioners."
    },
    {
      icon: "📊",
      title: "Splunk Engineer",
      description: "Master Splunk with live sessions covering deployment, configuration, SPL queries, dashboards, and enterprise security monitoring."
    },
    {
      icon: "🔍",
      title: "Digital Forensics",
      description: "Investigate cybercrime with live guidance. Learn evidence collection, disk forensics, memory analysis, and chain of custody procedures."
    },
    {
      icon: "📋",
      title: "GRC",
      description: "Master Governance, Risk, and Compliance with live training on frameworks, policy development, audits, and regulatory requirements."
    }
  ];

  const currentCourses = activeTab === "self-paced" ? selfPacedCourses : liveCourses;

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {currentCourses.map((course, index) => (
                <div 
                  key={index}
                  className="group relative bg-card rounded-2xl p-10 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Subtle top accent line */}
                  <div className={`absolute top-0 left-8 right-8 h-1 rounded-b-full ${
                    activeTab === "self-paced" ? "bg-primary/60" : "bg-secondary/60"
                  }`} />
                  
                  {/* Large centered icon */}
                  <div className="flex justify-center mb-8">
                    <div className={`h-24 w-24 rounded-2xl flex items-center justify-center ${
                      activeTab === "self-paced" ? "bg-primary/10" : "bg-secondary/10"
                    }`}>
                      <span className="text-5xl">{course.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content centered */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">{course.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-8 flex justify-center">
                    <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === "self-paced"
                        ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                        : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    }`}>
                      Learn More
                    </button>
                  </div>
                </div>
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
    </main>
  );
};

export default Courses;
