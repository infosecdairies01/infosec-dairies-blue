import { useState, useMemo } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Shield, ChevronLeft, ChevronDown, Lock, CheckCircle, BookOpen, FileQuestion, FolderOpen, ArrowRight, Clock, FileText, Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getCourseById } from "@/data/courses";

// Import all course background images
import socFundamentalsBg from "@/assets/soc-course-bg.jpg";
import logAnalysisBg from "@/assets/courses/log-analysis-bg.jpg";
import siemFundamentalsBg from "@/assets/courses/siem-fundamentals-bg.jpg";
import socAnalystPracticalBg from "@/assets/courses/soc-analyst-practical-bg.jpg";
import incidentResponseBg from "@/assets/courses/incident-response-bg.jpg";
import threatHuntingBg from "@/assets/courses/threat-hunting-bg.jpg";
import detectionEngineeringBg from "@/assets/courses/detection-engineering-bg.jpg";
import malwareAnalysisBg from "@/assets/courses/malware-analysis-bg.jpg";
const courseBackgrounds: Record<string, string> = {
  "soc-fundamentals": socFundamentalsBg,
  "log-analysis": logAnalysisBg,
  "siem-fundamentals": siemFundamentalsBg,
  "soc-analyst-practical": socAnalystPracticalBg,
  "incident-response": incidentResponseBg,
  "threat-hunting": threatHuntingBg,
  "detection-engineering": detectionEngineeringBg,
  "malware-analysis": malwareAnalysisBg
};
const difficultyLabels = {
  easy: "Beginner",
  medium: "Intermediate",
  hard: "Advanced"
};
const CourseDetail = () => {
  const {
    courseId
  } = useParams<{
    courseId: string;
  }>();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const [activeTab, setActiveTab] = useState<"modules" | "quizzes" | "resources">("modules");
  const [openModules, setOpenModules] = useState<string[]>(["1", "2"]);

  // Get course-specific background image
  const courseBgImage = useMemo(() => {
    if (courseId && courseBackgrounds[courseId]) {
      return courseBackgrounds[courseId];
    }
    return socFundamentalsBg;
  }, [courseId]);

  // Redirect to courses page if course not found
  if (!course) {
    return <Navigate to="/courses" replace />;
  }
  const toggleModule = (moduleId: string) => {
    setOpenModules(prev => prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]);
  };
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.status === "completed").length, 0);
  const progressPercent = Math.round(completedLessons / totalLessons * 100);
  return <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Course Background - confined to header area */}
      <div className="relative pt-20">
        {/* Course-specific Background - only for hero, subtle atmospheric */}
        <div className="absolute inset-0 h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50" style={{
          backgroundImage: `url(${courseBgImage})`
        }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-background/60" />
          {/* Extra dark overlay behind text area */}
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Breadcrumb */}
            <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ChevronLeft className="w-4 h-4" />
              <span>Courses</span>
              <span className="text-muted-foreground/50">&gt;</span>
              <span className="text-foreground">{course.shortTitle}</span>
            </Link>

            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Left - Course Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title Row */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      {course.title}
                    </h1>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25">
                      {difficultyLabels[course.difficulty]}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {course.description}
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
                <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-6 shadow-lg shadow-black/20">
                  {/* Inner light reflection - top edge */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  {/* Inner light reflection - left edge */}
                  <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
                  {/* Subtle inner teal glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
                  {/* Left accent gradient line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
                  
                  <div className="relative pl-3 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Course Info</h3>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/50 border border-white/[0.08] text-foreground">
                        {difficultyLabels[course.difficulty]}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-primary font-medium">{course.duration}</span>
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
        </div>
      </div>

      {/* Content Section - Clean dark background */}
      <section className="relative bg-background pb-20">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">

            {/* Tabs & Progress Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              {/* Tabs */}
              <div className="flex gap-2">
                <button onClick={() => setActiveTab("modules")} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "modules" ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                  Modules
                </button>
                <button onClick={() => setActiveTab("quizzes")} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "quizzes" ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                  Quizzes
                </button>
                <button onClick={() => setActiveTab("resources")} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "resources" ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                  Resources
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Progress: <span className="text-foreground font-medium">{completedLessons} / {totalLessons}</span> Lessons Completed
                </span>
                <div className="w-32">
                  <Progress value={progressPercent} className="h-2 bg-muted/30" />
                </div>
              </div>
            </div>

            {/* Modules + CTA Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Modules List */}
              <div className="lg:col-span-2 space-y-3">
                {activeTab === "modules" && course.modules.map(module => <Collapsible key={module.id} open={openModules.includes(module.id)} onOpenChange={() => toggleModule(module.id)}>
                    <div className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:bg-card/35 hover:translate-y-[-2px] hover:border-white/[0.12] hover:shadow-xl hover:shadow-primary/10">
                      {/* Soft outer glow on hover */}
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />
                      {/* Inner light reflection - top edge */}
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      {/* Subtle inner teal glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
                      {/* Left accent gradient line */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                      {/* Module Header */}
                      <CollapsibleTrigger className="relative w-full px-6 py-4 pl-7 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-semibold text-foreground">
                            {module.id}. {module.title}
                          </span>
                          {module.badge}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openModules.includes(module.id) ? "rotate-180" : ""}`} />
                      </CollapsibleTrigger>

                      {/* Lessons */}
                      <CollapsibleContent>
                        <div className="border-t border-white/[0.06]">
                          {module.lessons.map(lesson => <div key={lesson.id} onClick={() => lesson.status !== "locked" && navigate(`/courses/${courseId}/lesson/${lesson.id}`)} className={`px-6 py-4 pl-7 flex items-center justify-between border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors ${lesson.status !== "locked" ? "cursor-pointer" : ""}`}>
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5">
                                  {lesson.status === "completed" ? <CheckCircle className="w-4 h-4 text-primary" /> : lesson.status === "locked" ? <Lock className="w-4 h-4 text-muted-foreground/40" /> : <ChevronDown className="w-4 h-4 text-primary" />}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground mr-2">{lesson.id}</span>
                                    <span className={`text-sm ${lesson.status === "locked" ? "text-muted-foreground/60" : "text-foreground"}`}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  {lesson.description && <p className="text-xs text-muted-foreground/60 mt-1 max-w-lg">{lesson.description}</p>}
                                </div>
                              </div>

                              {/* Status Badge */}
                              {lesson.status === "completed" && <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25">
                                  Completed
                                </span>}
                              {lesson.status === "locked" && <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                                  <Lock className="w-3 h-3" />
                                  Locked
                                </span>}
                            </div>)}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>)}

                {activeTab === "quizzes" && <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 shadow-lg shadow-black/20">
                    {/* Inner light reflection - top edge */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {/* Subtle inner teal glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
                    {/* Left accent gradient line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
                    
                    <div className="relative pl-3">
                      <div className="flex items-center gap-3 mb-6">
                        <FileQuestion className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Course Quizzes</h3>
                        <span className="text-sm text-muted-foreground">({course.quizzes?.length || 0} assessments)</span>
                      </div>
                      <div className="space-y-3">
                        {course.quizzes && course.quizzes.length > 0 ? course.quizzes.map(quiz => <div key={quiz.id} className="p-4 rounded-lg bg-card/30 border border-white/[0.06] flex items-center justify-between hover:bg-card/40 transition-colors">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-foreground font-medium">{quiz.title}</span>
                                  {quiz.id === "q6" && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                      Final Exam
                                    </span>}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground/70">
                                  <span className="flex items-center gap-1">
                                    <FileQuestion className="w-3 h-3" />
                                    {quiz.questionCount} questions
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {quiz.duration}
                                  </span>
                                  <span>Pass: {quiz.passingScore}%</span>
                                </div>
                              </div>
                              {quiz.status === "unlocked" ? <button onClick={() => navigate(`/courses/${courseId}/quiz/${quiz.id}`)} className="px-4 py-2 rounded-lg bg-primary/15 text-primary text-sm font-medium border border-primary/25 hover:bg-primary/25 transition-colors">
                                  Start Quiz
                                </button> : quiz.status === "completed" ? <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25">
                                  Completed
                                </span> : <span className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                                  <Lock className="w-3 h-3" />
                                  Locked
                                </span>}
                            </div>) : <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                            <p className="text-muted-foreground">No quizzes available for this course yet.</p>
                          </div>}
                      </div>
                    </div>
                  </div>}

                {activeTab === "resources" && <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 shadow-lg shadow-black/20">
                    {/* Inner light reflection - top edge */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {/* Subtle inner teal glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
                    {/* Left accent gradient line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
                    
                    <div className="relative pl-3">
                      <div className="flex items-center gap-3 mb-6">
                        <FolderOpen className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Course Resources</h3>
                        <span className="text-sm text-muted-foreground">({course.resources?.length || 0} resources)</span>
                      </div>
                      
                      {course.resources && course.resources.length > 0 ? <div className="grid gap-3">
                          {/* Downloadable Resources */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Downloadable Materials
                            </h4>
                            {course.resources.filter(r => r.type !== "link").map(resource => <div key={resource.id} className="p-4 rounded-lg bg-card/30 border border-white/[0.06] flex items-center justify-between hover:bg-card/40 transition-colors group cursor-pointer">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    {resource.type === "pdf" && <FileText className="w-5 h-5 text-primary" />}
                                    {resource.type === "cheatsheet" && <FileText className="w-5 h-5 text-secondary" />}
                                    {resource.type === "template" && <FileText className="w-5 h-5 text-orange-400" />}
                                    {resource.type === "tool" && <FileText className="w-5 h-5 text-blue-400" />}
                                  </div>
                                  <div>
                                    <span className="text-foreground font-medium">{resource.title}</span>
                                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-muted/30 text-muted-foreground capitalize">
                                      {resource.type}
                                    </span>
                                  </div>
                                </div>
                                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>)}
                          </div>
                          
                          {/* External Links */}
                          {course.resources.filter(r => r.type === "link").length > 0 && <div className="space-y-3 mt-4">
                              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                Useful Links & Tools
                              </h4>
                              {course.resources.filter(r => r.type === "link").map(resource => <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-card/30 border border-white/[0.06] flex items-center justify-between hover:bg-card/40 hover:border-primary/30 transition-colors group block">
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                      <LinkIcon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">{resource.title}</span>
                                      <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                                    </div>
                                  </div>
                                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>)}
                            </div>}
                        </div> : <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                          <p className="text-muted-foreground">No resources available for this course yet.</p>
                        </div>}
                    </div>
                  </div>}
              </div>

              {/* CTA Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-6 shadow-lg shadow-black/20">
                    {/* Inner light reflection - top edge */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {/* Subtle inner teal glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
                    {/* Left accent gradient line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
                    
                    <button className="relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary/90 text-background font-semibold hover:bg-primary transition-colors group">
                      <span>Continue Course</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>;
};
export default CourseDetail;