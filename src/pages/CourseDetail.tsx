import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Shield, ChevronLeft, ChevronDown, Lock, CheckCircle, BookOpen, FileQuestion, FolderOpen, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Lesson {
  id: string;
  title: string;
  description?: string;
  status: "completed" | "unlocked" | "locked";
}

interface Module {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  lessons: Lesson[];
}

const courseModules: Module[] = [
  {
    id: "1",
    title: "Introduction to SOC & Blue Team",
    badge: "Commet",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    lessons: [
      { id: "1.1", title: "Welcome to the SOC", description: "Introductory overview of SOC roles and responsibilities.", status: "completed" },
      { id: "1.2", title: "Blue Team Fundamentals", status: "unlocked" },
      { id: "1.3", title: "Key SOC Concepts", status: "locked" },
    ],
  },
  {
    id: "2",
    title: "Cyber Threats & Attack Basics",
    badge: "Lab",
    badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
    lessons: [
      { id: "2.1", title: "Understanding the Threat Landscape", status: "locked" },
      { id: "2.2", title: "Common Attack Vectors", status: "locked" },
      { id: "2.3", title: "Attack Lifecycle Overview", status: "locked" },
    ],
  },
  {
    id: "3",
    title: "Logs & Monitoring Fundamentals",
    badge: "Lab",
    badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
    lessons: [
      { id: "3.1", title: "Introduction to Log Sources", status: "locked" },
      { id: "3.2", title: "Reading and Parsing Logs", status: "locked" },
      { id: "3.3", title: "Log Correlation Basics", status: "locked" },
    ],
  },
  {
    id: "4",
    title: "SIEM Fundamentals",
    lessons: [
      { id: "4.1", title: "What is a SIEM?", status: "locked" },
      { id: "4.2", title: "SIEM Navigation Basics", status: "locked" },
      { id: "4.3", title: "Creating Simple Queries", status: "locked" },
    ],
  },
  {
    id: "5",
    title: "Alert Handling & Incident Response Basics",
    badge: "Quiz",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    lessons: [
      { id: "5.1", title: "Understanding Alerts", status: "locked" },
      { id: "5.2", title: "Alert Triage Process", status: "locked" },
      { id: "5.3", title: "Basic Incident Response Steps", status: "locked" },
      { id: "5.4", title: "Module Quiz: IR Basics", status: "locked" },
    ],
  },
];

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState<"modules" | "quizzes" | "resources">("modules");
  const [openModules, setOpenModules] = useState<string[]>(["1"]);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = courseModules.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.status === "completed").length,
    0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-transparent to-transparent" />
      </div>

      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Breadcrumb */}
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Courses</span>
              <span className="text-muted-foreground/50">&gt;</span>
              <span className="text-foreground">SOC Level 1</span>
            </Link>

            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Left - Course Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title Row */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      Blue Team & SOC Fundamentals
                    </h1>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                      Beginner
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  Build your foundation as a Level 1 SOC analyst and step into the world of 
                  cybersecurity defense. This course covers the essential skills, tools, 
                  and workflows you need to detect and respond to threats effectively.
                </p>

                {/* Outcomes */}
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Understand the basics of SOC operations and cybersecurity concepts.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Analyze logs to identify suspicious activity and potential threats.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Learn to use SIEM tools to monitor and respond to security incidents.
                  </li>
                </ul>
              </div>

              {/* Right - Course Info Card */}
              <div className="lg:col-span-1">
                <div className="relative rounded-xl bg-card/40 backdrop-blur-lg border border-white/[0.08] p-6 overflow-hidden">
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="relative space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Course Info</h3>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card border border-border text-foreground">
                        Beginner
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-primary font-medium">8 hours</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>Lessons, Quizzes, Labs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs & Progress Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("modules")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "modules"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  Modules
                </button>
                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "quizzes"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  Quizzes
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "resources"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  Resources
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Progress: <span className="text-foreground font-medium">{completedLessons} / {totalLessons}</span> Lessons Completed
                </span>
                <div className="w-32">
                  <Progress value={progressPercent} className="h-2 bg-card" />
                </div>
              </div>
            </div>

            {/* Modules + CTA Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Modules List */}
              <div className="lg:col-span-2 space-y-4">
                {activeTab === "modules" && courseModules.map((module) => (
                  <Collapsible
                    key={module.id}
                    open={openModules.includes(module.id)}
                    onOpenChange={() => toggleModule(module.id)}
                  >
                    <div className="rounded-xl bg-card/30 backdrop-blur-lg border border-white/[0.08] overflow-hidden">
                      {/* Module Header */}
                      <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-foreground">
                            {module.id}. {module.title}
                          </span>
                          {module.badge && (
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${module.badgeColor}`}>
                              {module.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                            openModules.includes(module.id) ? "rotate-180" : ""
                          }`} 
                        />
                      </CollapsibleTrigger>

                      {/* Lessons */}
                      <CollapsibleContent>
                        <div className="border-t border-white/[0.05]">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="px-6 py-4 flex items-center justify-between border-b border-white/[0.03] last:border-b-0 hover:bg-card/20 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-muted-foreground text-sm mt-0.5">
                                  {lesson.status === "completed" ? (
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                  ) : lesson.status === "locked" ? (
                                    <Lock className="w-4 h-4 text-muted-foreground/50" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-primary" />
                                  )}
                                </span>
                                <div>
                                  <span className="text-sm text-muted-foreground mr-2">{lesson.id}</span>
                                  <span className={`text-sm ${lesson.status === "locked" ? "text-muted-foreground/70" : "text-foreground"}`}>
                                    {lesson.title}
                                  </span>
                                  {lesson.description && (
                                    <p className="text-xs text-muted-foreground/70 mt-1">{lesson.description}</p>
                                  )}
                                </div>
                              </div>

                              {/* Status Badge */}
                              {lesson.status === "completed" && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                                  Completed
                                </span>
                              )}
                              {lesson.status === "locked" && (
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                                  <Lock className="w-3 h-3" />
                                  Locked
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}

                {activeTab === "quizzes" && (
                  <div className="rounded-xl bg-card/30 backdrop-blur-lg border border-white/[0.08] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <FileQuestion className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Module Quizzes</h3>
                    </div>
                    <div className="space-y-4">
                      {courseModules.filter(m => m.badge === "Quiz" || m.lessons.some(l => l.title.includes("Quiz"))).length > 0 ? (
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg bg-card/40 border border-white/[0.05] flex items-center justify-between">
                            <div>
                              <span className="text-foreground">Module 5 Quiz: IR Basics</span>
                              <p className="text-xs text-muted-foreground mt-1">10 questions • 15 minutes</p>
                            </div>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Complete modules to unlock quizzes.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="rounded-xl bg-card/30 backdrop-blur-lg border border-white/[0.08] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <FolderOpen className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Course Resources</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-card/40 border border-white/[0.05]">
                        <span className="text-foreground">SOC Analyst Cheat Sheet (PDF)</span>
                        <p className="text-xs text-muted-foreground mt-1">Quick reference guide for common SOC tasks</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card/40 border border-white/[0.05]">
                        <span className="text-foreground">Log Analysis Templates</span>
                        <p className="text-xs text-muted-foreground mt-1">Ready-to-use templates for log parsing</p>
                      </div>
                      <div className="p-4 rounded-lg bg-card/40 border border-white/[0.05]">
                        <span className="text-foreground">SIEM Query Examples</span>
                        <p className="text-xs text-muted-foreground mt-1">Common queries for threat detection</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Continue Course CTA */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <button className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary p-[1px]">
                    <div className="relative rounded-xl bg-gradient-to-r from-primary to-primary/90 px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 group-hover:from-primary/90 group-hover:to-secondary/90">
                      <span className="text-lg font-semibold text-primary-foreground">
                        Continue Course
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Quick Stats */}
                  <div className="mt-6 rounded-xl bg-card/30 backdrop-blur-lg border border-white/[0.08] p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Your Progress</span>
                      <span className="text-primary font-semibold">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 bg-card" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{completedLessons} completed</span>
                      <span className="text-muted-foreground">{totalLessons - completedLessons} remaining</span>
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
          <p className="mt-2">Blue Team Cybersecurity Education & Insights</p>
        </div>
      </footer>
    </main>
  );
};

export default CourseDetail;
