import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { 
  Shield, ChevronLeft, ChevronRight, CheckCircle, Clock, BookOpen, 
  Lightbulb, FlaskConical, ExternalLink, Menu, X, Lock, Eye, EyeOff, HelpCircle, Send
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getCourseById, Course, Lesson, Module } from "@/data/courses";
import { getLessonContent, LessonContent, LabQuestion } from "@/data/lessonContent";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import course backgrounds
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
  "malware-analysis": malwareAnalysisBg,
};

const LabQuestionsSection = ({ scenario, questions }: { scenario?: string; questions?: LabQuestion[] }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});

  const handleSubmit = (qId: string, q: LabQuestion) => {
    const newAttempts = (attempts[qId] || 0) + 1;
    setAttempts(prev => ({ ...prev, [qId]: newAttempts }));
    setSubmitted(prev => ({ ...prev, [qId]: true }));
    
    const user = (userAnswers[qId] || "").trim().toLowerCase();
    const correct = q.answer.toLowerCase();
    const keywords = correct.split(/[\s,—-]+/).filter(w => w.length > 3);
    const matchCount = keywords.filter(kw => user.includes(kw)).length;
    const isRight = matchCount >= Math.min(2, keywords.length) || user.includes(correct.substring(0, 20).toLowerCase());
    
    if (isRight || newAttempts >= 4) {
      setLocked(prev => ({ ...prev, [qId]: true }));
    }
  };

  const handleRetry = (qId: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: "" }));
    setSubmitted(prev => ({ ...prev, [qId]: false }));
  };

  const isCorrect = (q: LabQuestion) => {
    const user = (userAnswers[q.id] || "").trim().toLowerCase();
    const correct = q.answer.toLowerCase();
    const keywords = correct.split(/[\s,—-]+/).filter(w => w.length > 3);
    const matchCount = keywords.filter(kw => user.includes(kw)).length;
    return matchCount >= Math.min(2, keywords.length) || user.includes(correct.substring(0, 20).toLowerCase());
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="mt-6 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Scenario Lab</h4>
        </div>
        {scenario ? (
          <>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Scenario</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{scenario}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Interactive lab questions for this exercise are coming soon. Review the steps above to complete the practical exercise.</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Scenario Lab</h4>
      </div>

      {scenario && (
        <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 space-y-2">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Scenario</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{scenario}</p>
        </div>
      )}

      {questions.map((q, idx) => (
        <div key={q.id} className="p-4 rounded-lg bg-background/40 border border-white/[0.06] space-y-3">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold mt-0.5">
              {idx + 1}
            </span>
            <p className="text-sm font-medium text-foreground">{q.question}</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your answer..."
              value={userAnswers[q.id] || ""}
              onChange={e => setUserAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              disabled={locked[q.id]}
              className="flex-1 px-3 py-2 text-sm rounded-md bg-background/60 border border-white/[0.1] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/50 disabled:opacity-60"
            />
            {!locked[q.id] && !submitted[q.id] && (
              <button
                onClick={() => handleSubmit(q.id, q)}
                disabled={!userAnswers[q.id]?.trim()}
                className="px-3 py-2 rounded-md bg-cyan-600/80 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit
              </button>
            )}
          </div>

          {q.hint && !locked[q.id] && !submitted[q.id] && (
            <button
              onClick={() => setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
              className="text-xs text-yellow-500/80 hover:text-yellow-400 flex items-center gap-1 transition-colors"
            >
              <Lightbulb className="w-3 h-3" />
              {showHint[q.id] ? "Hide hint" : "Show hint"}
            </button>
          )}
          {showHint[q.id] && !locked[q.id] && !submitted[q.id] && (
            <p className="text-xs text-yellow-500/70 pl-4 border-l-2 border-yellow-500/30">{q.hint}</p>
          )}

          {submitted[q.id] && (
            <div className="space-y-2">
              {isCorrect(q) ? (
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Great answer!
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
                    <Eye className="w-4 h-4" /> Incorrect {(attempts[q.id] || 0) >= 4 ? "— All attempts used." : ""}
                  </div>
                  {(attempts[q.id] || 0) < 4 && (
                    <button
                      onClick={() => handleRetry(q.id)}
                      className="text-xs text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}

              {locked[q.id] && (attempts[q.id] || 0) >= 4 && !isCorrect(q) && (
                <>
                  <button
                    onClick={() => setShowAnswer(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-xs text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    {showAnswer[q.id] ? <><EyeOff className="w-3 h-3" /> Hide answer</> : <><Eye className="w-3 h-3" /> Show answer</>}
                  </button>
                  {showAnswer[q.id] && (
                    <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm text-emerald-300"><span className="font-semibold">Answer:</span> {q.answer}</p>
                    </div>
                  )}
                </>
              )}

              {isCorrect(q) && (
                <>
                  <button
                    onClick={() => setShowAnswer(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-xs text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    {showAnswer[q.id] ? <><EyeOff className="w-3 h-3" /> Hide answer</> : <><Eye className="w-3 h-3" /> View reference answer</>}
                  </button>
                  {showAnswer[q.id] && (
                    <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm text-emerald-300"><span className="font-semibold">Answer:</span> {q.answer}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const LessonViewer = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const course = getCourseById(courseId || "");
  const lessonContent = getLessonContent(courseId || "", lessonId || "");

  // Get all lessons flattened for navigation
  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((module) => 
      module.lessons.map((lesson) => ({
        ...lesson,
        moduleId: module.id,
        moduleTitle: module.title
      }))
    );
  }, [course]);

  // Find current lesson index
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  // Calculate progress
  const completedCount = allLessons.filter((l) => l.status === "completed").length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  // Get course background
  const courseBgImage = useMemo(() => {
    if (courseId && courseBackgrounds[courseId]) {
      return courseBackgrounds[courseId];
    }
    return socFundamentalsBg;
  }, [courseId]);

  // Redirect if course or lesson not found
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  if (!lessonId || !currentLesson) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  const navigateToLesson = (newLessonId: string) => {
    navigate(`/courses/${courseId}/lesson/${newLessonId}`);
  };

  // Parse markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';
    let inTable = false;
    let tableRows: string[][] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-2 my-4 ml-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: parseInlineFormatting(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const flushTable = () => {
      if (tableRows.length > 1) {
        const headers = tableRows[0];
        const body = tableRows.slice(2); // Skip header separator
        elements.push(
          <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {headers.map((h, i) => (
                    <th key={i} className="text-left py-2 px-3 text-foreground font-medium">{h.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-2 px-3 text-muted-foreground">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableRows = [];
      inTable = false;
    };

    const parseInlineFormatting = (text: string): string => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted/50 text-primary text-sm font-mono">$1</code>');
    };

    lines.forEach((line, lineIdx) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${elements.length}`} className="my-4 p-4 rounded-lg bg-card/50 border border-white/[0.08] overflow-x-auto">
              <code className="text-sm text-muted-foreground font-mono whitespace-pre">
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          flushList();
          flushTable();
          codeBlockLang = line.slice(3);
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Tables
      if (line.includes('|') && line.trim().startsWith('|')) {
        flushList();
        if (!inTable) inTable = true;
        const cells = line.split('|').filter(c => c.trim() !== '');
        if (!cells.every(c => c.trim().match(/^[-:]+$/))) {
          tableRows.push(cells);
        } else {
          tableRows.push(cells); // separator row
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // Empty line
      if (line.trim() === '') {
        flushList();
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={`h1-${lineIdx}`} className="text-2xl md:text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0">
            {line.slice(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${lineIdx}`} className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3 border-b border-white/10 pb-2">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${lineIdx}`} className="text-lg font-semibold text-foreground mt-6 mb-2">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={`quote-${lineIdx}`} className="my-4 pl-4 border-l-2 border-primary/50 text-muted-foreground italic">
            {line.slice(2)}
          </blockquote>
        );
        return;
      }

      // List items
      if (line.match(/^[-*] /)) {
        inList = true;
        listItems.push(line.slice(2));
        return;
      }

      // Numbered list
      if (line.match(/^\d+\. /)) {
        flushList();
        const match = line.match(/^(\d+)\. (.+)$/);
        if (match) {
          elements.push(
            <div key={`num-${lineIdx}`} className="flex items-start gap-3 my-2 text-muted-foreground">
              <span className="text-primary font-medium">{match[1]}.</span>
              <span dangerouslySetInnerHTML={{ __html: parseInlineFormatting(match[2]) }} />
            </div>
          );
        }
        return;
      }

      // Regular paragraph
      flushList();
      if (line.trim()) {
        elements.push(
          <p 
            key={`p-${lineIdx}`} 
            className="text-muted-foreground leading-relaxed my-3"
            dangerouslySetInnerHTML={{ __html: parseInlineFormatting(line) }}
          />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-20 h-[calc(100vh-5rem)] bg-card/30 backdrop-blur-lg border-r border-white/[0.08] transition-all duration-300 z-40 ${
            sidebarOpen ? 'w-80' : 'w-0'
          }`}
        >
          {sidebarOpen && (
            <ScrollArea className="h-full">
              <div className="p-4">
                {/* Course Header */}
                <Link to={`/courses/${courseId}`} className="flex items-center gap-3 mb-6 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.shortTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Progress value={progressPercent} className="w-16 h-1.5" />
                      <span>{progressPercent}%</span>
                    </div>
                  </div>
                </Link>

                {/* Modules */}
                <div className="space-y-2">
                  {course.modules.map((module) => (
                    <div key={module.id}>
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {module.id}. {module.title}
                      </div>
                      <div className="space-y-0.5">
                        {module.lessons.map((lesson) => {
                          const isActive = lesson.id === lessonId;
                          const isLocked = lesson.status === "locked";
                          const isCompleted = lesson.status === "completed";
                          
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => !isLocked && navigateToLesson(lesson.id)}
                              disabled={isLocked}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                                isActive 
                                  ? 'bg-primary/15 text-primary border border-primary/25' 
                                  : isLocked
                                  ? 'text-muted-foreground/40 cursor-not-allowed'
                                  : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              ) : isLocked ? (
                                <Lock className="w-4 h-4 flex-shrink-0" />
                              ) : (
                                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                                  isActive ? 'border-primary bg-primary/20' : 'border-muted-foreground/30'
                                }`} />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          )}
        </aside>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed top-24 z-50 p-2 rounded-r-lg bg-card/50 border border-l-0 border-white/[0.08] text-muted-foreground hover:text-foreground transition-all ${
            sidebarOpen ? 'left-80' : 'left-0'
          }`}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          {/* Lesson Header */}
          <div className="relative">
            <div className="absolute inset-0 h-48 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${courseBgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
            </div>

            <div className="relative container mx-auto px-6 py-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/courses/${courseId}`} className="hover:text-primary transition-colors">{course.shortTitle}</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{currentLesson.title}</span>
              </div>

              {/* Lesson Title */}
              <div className="flex items-center gap-4 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25">
                  Lesson {lessonId}
                </span>
                {currentLesson.duration && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {currentLesson.duration}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {currentLesson.title}
              </h1>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl">
              {lessonContent ? (
                <>
                  {/* Main Content */}
                  <div className="prose prose-invert max-w-none">
                    {renderContent(lessonContent.content)}
                  </div>

                  {/* Key Takeaways */}
                  {lessonContent.keyTakeaways && lessonContent.keyTakeaways.length > 0 && (
                    <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Key Takeaways</h3>
                      </div>
                      <ul className="space-y-2">
                        {lessonContent.keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Practical Exercise */}
                  {lessonContent.practicalExercise && (
                    <div className="mt-8 p-6 rounded-xl bg-secondary/5 border border-secondary/20">
                      <div className="flex items-center gap-2 mb-4">
                        <FlaskConical className="w-5 h-5 text-secondary" />
                        <h3 className="text-lg font-semibold text-foreground">
                          Practical Exercise: {lessonContent.practicalExercise.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{lessonContent.practicalExercise.description}</p>
                      <ol className="space-y-2 mb-6">
                        {lessonContent.practicalExercise.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Interactive Lab Questions */}
                      {lessonContent.practicalExercise.labQuestions && lessonContent.practicalExercise.labQuestions.length > 0 && (
                        <LabQuestionsSection scenario={lessonContent.practicalExercise.labScenario} questions={lessonContent.practicalExercise.labQuestions} />
                      )}
                    </div>
                  )}

                  {/* Additional Resources */}
                  {lessonContent.additionalResources && lessonContent.additionalResources.length > 0 && (
                    <div className="mt-8 p-6 rounded-xl bg-card/25 border border-white/[0.08]">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Additional Resources</h3>
                      </div>
                      <div className="space-y-2">
                        {lessonContent.additionalResources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url || "#"}
                            target={resource.url ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/[0.06] hover:bg-card/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                {resource.type === "video" && <BookOpen className="w-4 h-4 text-primary" />}
                                {resource.type === "article" && <BookOpen className="w-4 h-4 text-primary" />}
                                {resource.type === "tool" && <BookOpen className="w-4 h-4 text-secondary" />}
                                {resource.type === "documentation" && <BookOpen className="w-4 h-4 text-blue-400" />}
                              </div>
                              <div>
                                <span className="text-foreground group-hover:text-primary transition-colors">{resource.title}</span>
                                <span className="ml-2 text-xs text-muted-foreground capitalize">({resource.type})</span>
                              </div>
                            </div>
                            {resource.url && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Content Coming Soon</h3>
                  <p className="text-muted-foreground">
                    The content for this lesson is currently being developed.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center justify-between">
                {prevLesson ? (
                  <button
                    onClick={() => navigateToLesson(prevLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="text-sm">{prevLesson.title}</div>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                <button className="px-6 py-2.5 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 transition-colors">
                  Mark as Complete
                </button>

                {nextLesson ? (
                  <button
                    onClick={() => navigateToLesson(nextLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="text-sm">{nextLesson.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={`/courses/${courseId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                  >
                    <span>Back to Course</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LessonViewer;
