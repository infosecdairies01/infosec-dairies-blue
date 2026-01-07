import Navbar from "@/components/Navbar";

const Courses = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative min-h-screen overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Our Courses
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Master cybersecurity with our comprehensive blue team training programs
              </p>
            </div>
            
            {/* Self Paced Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Self Paced</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Learn at your own pace with our comprehensive pre-recorded courses. Access anytime, anywhere.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-8 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Security Operations Centre</h3>
                      <p className="text-muted-foreground">
                        Learn to detect, analyze, and respond to cybersecurity incidents in real-time. Master SOC workflows and security monitoring.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-8 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Splunk Engineer</h3>
                      <p className="text-muted-foreground">
                        Become proficient in Splunk for security monitoring, log analysis, and creating powerful detection rules and dashboards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Training Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Training</h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Interactive instructor-led sessions with real-time Q&A, hands-on labs, and personalized feedback.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-8 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-secondary/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Digital Forensics</h3>
                      <p className="text-muted-foreground">
                        Investigate cybercrime and security incidents. Learn evidence collection, analysis techniques, and forensic methodologies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-8 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-secondary/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">GRC</h3>
                      <p className="text-muted-foreground">
                        Master Governance, Risk, and Compliance frameworks. Learn to manage security policies, risk assessment, and regulatory compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
