import { useState } from "react";
import Navbar from "@/components/Navbar";

const Courses = () => {
  const [activeTab, setActiveTab] = useState<"self-paced" | "live">("self-paced");

  const selfPacedCourses = [
    {
      icon: "🛡️",
      title: "Security Operations Centre",
      description: "Learn to detect, analyze, and respond to cybersecurity incidents in real-time. Master SOC workflows and security monitoring."
    },
    {
      icon: "📊",
      title: "Splunk Engineer",
      description: "Become proficient in Splunk for security monitoring, log analysis, and creating powerful detection rules and dashboards."
    }
  ];

  const liveCourses = [
    {
      icon: "🔍",
      title: "Digital Forensics",
      description: "Investigate cybercrime and security incidents. Learn evidence collection, analysis techniques, and forensic methodologies."
    },
    {
      icon: "📋",
      title: "GRC",
      description: "Master Governance, Risk, and Compliance frameworks. Learn to manage security policies, risk assessment, and regulatory compliance."
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
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Our Courses
              </h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentCourses.map((course, index) => (
                <div 
                  key={index}
                  className={`group p-8 rounded-lg border border-border bg-card/50 backdrop-blur transition-all duration-300 ${
                    activeTab === "self-paced" 
                      ? "hover:border-primary/50" 
                      : "hover:border-secondary/50"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeTab === "self-paced" ? "bg-primary/20" : "bg-secondary/20"
                    }`}>
                      <span className="text-3xl">{course.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground">{course.description}</p>
                    </div>
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
