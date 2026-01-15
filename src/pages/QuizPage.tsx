import { useState, useEffect, useMemo } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { 
  Shield, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, 
  AlertTriangle, Trophy, RotateCcw, Home
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getCourseById } from "@/data/courses";
import { getQuizById, QuizData, QuizQuestion } from "@/data/quizData";
import { Button } from "@/components/ui/button";

type QuizState = "intro" | "active" | "review" | "results";

const QuizPage = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();
  
  const course = getCourseById(courseId || "");
  const quiz = getQuizById(courseId || "", quizId || "");
  
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    if (quizState === "active" && quiz?.timeLimit && timeRemaining === null) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
    
    if (quizState === "active" && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev <= 1) {
            setQuizState("results");
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState, timeRemaining, quiz?.timeLimit]);

  // Calculate score
  const score = useMemo(() => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  }, [quiz, selectedAnswers]);

  const passed = score.percentage >= (quiz?.passingScore || 70);

  // Redirect if not found
  if (!course || !quiz) {
    return <Navigate to={`/courses/${courseId || ""}`} replace />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnswered = selectedAnswers[currentQuestion?.id] !== undefined;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (quizState !== "active" || showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (isLastQuestion) {
      setQuizState("results");
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleStartQuiz = () => {
    setQuizState("active");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60);
    }
  };

  const handleRetry = () => {
    setQuizState("intro");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setTimeRemaining(null);
  };

  const handleReviewAnswers = () => {
    setQuizState("review");
    setCurrentQuestionIndex(0);
    setShowExplanation(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to={`/courses/${courseId}`} 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Course
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{quiz.title}</h1>
                <p className="text-muted-foreground text-sm">{course.title}</p>
              </div>
            </div>
          </div>

          {/* Quiz Intro */}
          {quizState === "intro" && (
            <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 shadow-lg">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
              
              <div className="pl-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Quiz Overview</h2>
                <p className="text-muted-foreground mb-6">{quiz.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                    <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                    <div className="text-2xl font-bold text-primary">{quiz.passingScore}%</div>
                    <div className="text-xs text-muted-foreground">Passing Score</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                    <div className="text-2xl font-bold text-primary">{quiz.timeLimit || "∞"}</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06] text-center">
                    <div className="text-2xl font-bold text-secondary">1</div>
                    <div className="text-xs text-muted-foreground">Attempts</div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-orange-400 mb-1">Before You Begin</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Read each question carefully before answering</li>
                        <li>• You can review explanations after each answer</li>
                        <li>• Timer will start when you click "Start Quiz"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleStartQuiz}
                  className="w-full bg-primary hover:bg-primary/90 text-background font-semibold py-6"
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          )}

          {/* Active Quiz / Review Mode */}
          {(quizState === "active" || quizState === "review") && currentQuestion && (
            <div className="space-y-6">
              {/* Progress & Timer */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} 
                    className="h-2"
                  />
                </div>
                
                {timeRemaining !== null && quizState === "active" && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    timeRemaining < 60 ? 'bg-red-500/20 text-red-400' : 'bg-card/30 text-foreground'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
                  </div>
                )}

                {quizState === "review" && (
                  <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400">
                    Review Mode
                  </div>
                )}
              </div>

              {/* Question Card */}
              <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 shadow-lg">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
                
                <div className="pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    {currentQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === idx;
                      const isCorrect = idx === currentQuestion.correctAnswer;
                      const showResult = showExplanation || quizState === "review";
                      
                      let optionStyles = "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]";
                      if (isSelected && !showResult) {
                        optionStyles = "border-primary bg-primary/10";
                      }
                      if (showResult) {
                        if (isCorrect) {
                          optionStyles = "border-green-500 bg-green-500/10";
                        } else if (isSelected && !isCorrect) {
                          optionStyles = "border-red-500 bg-red-500/10";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(idx)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-lg border text-left transition-all ${optionStyles} ${
                            showResult ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected && !showResult 
                                ? 'border-primary bg-primary text-background' 
                                : showResult && isCorrect
                                ? 'border-green-500 bg-green-500 text-background'
                                : showResult && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-500 text-background'
                                : 'border-muted-foreground/30'
                            }`}>
                              {showResult && isCorrect ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : showResult && isSelected && !isCorrect ? (
                                <XCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                              )}
                            </div>
                            <span className={`${
                              showResult && isCorrect ? 'text-green-400' : 
                              showResult && isSelected && !isCorrect ? 'text-red-400' :
                              'text-foreground'
                            }`}>
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-orange-500/10 border border-orange-500/20'
                    }`}>
                      <div className="flex items-start gap-3">
                        {selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${
                            selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                              ? 'text-green-400'
                              : 'text-orange-400'
                          }`}>
                            {selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                              ? 'Correct!'
                              : 'Not quite right'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={handlePrevQuestion}
                      disabled={isFirstQuestion}
                      className="text-muted-foreground"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-3">
                      {quizState === "active" && !showExplanation && hasAnswered && (
                        <Button
                          variant="outline"
                          onClick={handleCheckAnswer}
                        >
                          Check Answer
                        </Button>
                      )}
                      
                      {(showExplanation || quizState === "review") && (
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-primary hover:bg-primary/90"
                        >
                          {isLastQuestion ? (quizState === "review" ? "Back to Results" : "Finish Quiz") : "Next Question"}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Navigator */}
              <div className="flex flex-wrap gap-2 justify-center">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;
                  const isCorrectInReview = quizState === "review" && selectedAnswers[q.id] === q.correctAnswer;
                  const isWrongInReview = quizState === "review" && selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctAnswer;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setShowExplanation(quizState === "review");
                      }}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        isCurrent
                          ? 'bg-primary text-background'
                          : isCorrectInReview
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : isWrongInReview
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : isAnswered
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-card/30 text-muted-foreground border border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results */}
          {quizState === "results" && (
            <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 shadow-lg text-center">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Trophy or X icon based on pass/fail */}
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {passed ? (
                  <Trophy className="w-10 h-10" />
                ) : (
                  <XCircle className="w-10 h-10" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                {passed ? "Congratulations!" : "Keep Learning!"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {passed 
                  ? "You've successfully passed this quiz." 
                  : `You need ${quiz.passingScore}% to pass. Don't give up!`}
              </p>

              {/* Score Display */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06]">
                  <div className={`text-3xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                    {score.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Your Score</div>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06]">
                  <div className="text-3xl font-bold text-primary">
                    {score.correct}/{score.total}
                  </div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-white/[0.06]">
                  <div className="text-3xl font-bold text-foreground">
                    {quiz.passingScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Required</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Score Progress</span>
                  <span className={passed ? 'text-green-400' : 'text-red-400'}>
                    {score.percentage}%
                  </span>
                </div>
                <div className="relative h-3 bg-card/50 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
                      passed ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score.percentage}%` }}
                  />
                  {/* Passing threshold marker */}
                  <div 
                    className="absolute top-0 w-0.5 h-full bg-foreground/50"
                    style={{ left: `${quiz.passingScore}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  Passing: {quiz.passingScore}%
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleReviewAnswers}
                  className="gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Review Answers
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate(`/courses/${courseId}`)}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Course
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
