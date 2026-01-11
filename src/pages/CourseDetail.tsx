import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Shield, ChevronLeft, ChevronDown, Lock, CheckCircle, BookOpen, FileQuestion, FolderOpen, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import socCourseBg from "@/assets/soc-course-bg.jpg";

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
];

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState<"modules" | "quizzes" | "resources">("modules");
  const [openModules, setOpenModules] = useState<string[]>(["1", "2"]);

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
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* SOC Background Image with blur and overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${socCourseBg})` }}
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
      </div>

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-secondary/8 rounded-full blur-[100px] opacity-30" />
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
                  {/* Enhanced Shield Icon with glow */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 w-16 h-16 bg-primary/30 rounded-xl blur-xl" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,200,0.2)]">
                      <Shield className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(0,255,200,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      Blue Team & SOC Fundamentals
                    </h1>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,255,200,0.15)]">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(0,255,200,0.6)]" />
                    Understand the basics of SOC operations and cybersecurity concepts.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(0,255,200,0.6)]" />
                    Analyze logs to identify suspicious activity and potential threats.
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(0,255,200,0.6)]" />
                    Learn to use SIEM tools to monitor and respond to security incidents.
                  </li>
                </ul>
              </div>

              {/* Right - Course Info Card with enhanced glassmorphism */}
              <div className="lg:col-span-1">
                <div className="relative rounded-xl overflow-hidden group">
                  {/* Outer glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 rounded-xl blur-lg opacity-60" />
                  
                  {/* Glass card */}
                  <div className="relative rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.12] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                    {/* Top edge reflection */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    {/* Left edge reflection */}
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent pointer-events-none rounded-xl" />
                    
                    <div className="relative space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Course Info</h3>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/60 border border-white/10 text-foreground backdrop-blur-sm">
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
            </div>

            {/* Tabs & Progress Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("modules")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "modules"
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,200,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  Modules
                </button>
                <button
                  onClick={() => setActiveTab("quizzes")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "quizzes"
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,200,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  Quizzes
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "resources"
                      ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,200,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
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
                <div className="w-32 relative">
                  <Progress value={progressPercent} className="h-2 bg-white/[0.05]" />
                  <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(0,255,200,0.2)]" style={{ width: `${progressPercent}%` }} />
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
                    {/* Enhanced glass module card */}
                    <div className="relative rounded-xl overflow-hidden">
                      {/* Subtle outer glow for open modules */}
                      {openModules.includes(module.id) && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-transparent to-transparent rounded-xl blur-md opacity-50" />
                      )}
                      
                      <div className="relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.1] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_-20px_rgba(0,0,0,0.4)]">
                        {/* Top edge reflection */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        
                        {/* Module Header */}
                        <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-foreground">
                              {module.id}. {module.title}
                            </span>
                            {module.badge && (
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${module.badgeColor}`}>
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
                          <div className="border-t border-white/[0.06]">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="px-6 py-4 flex items-center justify-between border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-muted-foreground text-sm mt-0.5">
                                    {lesson.status === "completed" ? (
                                      <CheckCircle className="w-4 h-4 text-primary drop-shadow-[0_0_4px_rgba(0,255,200,0.4)]" />
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
                    </div>
                  </Collapsible>
                ))}

                {activeTab === "quizzes" && (
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.1] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_-20px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex items-center gap-3 mb-6">
                        <FileQuestion className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Module Quizzes</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between backdrop-blur-sm">
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
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.1] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_-20px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="flex items-center gap-3 mb-6">
                        <FolderOpen className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Course Resources</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                          <span className="text-foreground">SOC Analyst Cheat Sheet (PDF)</span>
                          <p className="text-xs text-muted-foreground mt-1">Quick reference guide for common SOC tasks</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                          <span className="text-foreground">Log Analysis Templates</span>
                          <p className="text-xs text-muted-foreground mt-1">Ready-to-use templates for log parsing</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                          <span className="text-foreground">SIEM Query Examples</span>
                          <p className="text-xs text-muted-foreground mt-1">Common SIEM queries for threat detection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Card with enhanced glow */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Strong outer glow */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 rounded-xl blur-xl opacity-70" />
                    
                    {/* Glass card */}
                    <div className="relative rounded-xl bg-white/[0.03] backdrop-blur-xl border border-primary/20 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_-20px_rgba(0,255,200,0.2)]">
                      {/* Top edge reflection */}
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent pointer-events-none rounded-xl" />
                      
                      <button className="relative w-full group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary/80 to-secondary rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-primary/90 to-primary text-background font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(0,255,200,0.3)]">
                          <span>Continue Course</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
