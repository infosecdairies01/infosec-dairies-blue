import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  PlayCircle,
  CheckCircle,
  ChevronRight,
  Award,
  Target,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Mock user data - will be replaced with database data later
const mockUser = {
  name: "Alex Defender",
  email: "alex@example.com",
  joinedDate: "2024-01-15",
  totalPoints: 2450,
  rank: "Security Analyst I"
};

const enrolledCourses = [
  {
    id: "blue-team-soc-fundamentals",
    title: "Blue Team & SOC Fundamentals",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    lastAccessed: "2 hours ago",
    difficulty: "Easy"
  },
  {
    id: "siem-fundamentals",
    title: "SIEM Fundamentals",
    progress: 30,
    completedLessons: 6,
    totalLessons: 20,
    lastAccessed: "1 day ago",
    difficulty: "Easy"
  },
  {
    id: "incident-response-fundamentals",
    title: "Incident Response Fundamentals",
    progress: 10,
    completedLessons: 2,
    totalLessons: 20,
    lastAccessed: "3 days ago",
    difficulty: "Medium"
  }
];

const recentActivity = [
  { type: "lesson", title: "Completed: Introduction to SIEM", time: "2 hours ago", icon: CheckCircle, color: "text-secondary" },
  { type: "quiz", title: "Passed: SOC Fundamentals Quiz (85%)", time: "1 day ago", icon: Trophy, color: "text-yellow-400" },
  { type: "lesson", title: "Started: Log Analysis Basics", time: "2 days ago", icon: PlayCircle, color: "text-primary" },
  { type: "achievement", title: "Earned: First Steps Badge", time: "3 days ago", icon: Award, color: "text-purple-400" },
  { type: "lesson", title: "Completed: Threat Detection Overview", time: "4 days ago", icon: CheckCircle, color: "text-secondary" }
];

const achievements = [
  { name: "First Steps", description: "Complete your first lesson", earned: true },
  { name: "Quick Learner", description: "Complete 5 lessons in one day", earned: true },
  { name: "Quiz Master", description: "Score 90%+ on 3 quizzes", earned: false },
  { name: "Dedicated", description: "Study for 7 days in a row", earned: false }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-blue-500/20 text-blue-400";
    case "Medium": return "bg-yellow-500/20 text-yellow-400";
    case "Hard": return "bg-red-500/20 text-red-400";
    default: return "bg-muted text-muted-foreground";
  }
};

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{mockUser.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Continue your blue team training journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-bold">{enrolledCourses.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Enrolled Courses</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 hover:border-secondary/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/10">
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-2xl font-bold">21</span>
            </div>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-2xl font-bold">{mockUser.totalPoints}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-2xl font-bold">2</span>
            </div>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between animate-fade-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                My Courses
              </h2>
              <Link to="/courses" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Browse all courses
              </Link>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div 
                  key={course.id}
                  className="bg-card/50 border border-border rounded-lg p-5 hover:border-primary/30 transition-all duration-300 group animate-fade-up"
                  style={{ animationDelay: `${250 + index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last accessed {course.lastAccessed}
                      </p>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button size="sm" variant="outline" className="group-hover:border-primary group-hover:text-primary">
                        Continue
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {course.completedLessons} / {course.totalLessons} lessons
                      </span>
                      <span className="font-medium text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements Section */}
            <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-purple-400" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.name}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      achievement.earned 
                        ? "bg-purple-500/10 border-purple-500/30" 
                        : "bg-muted/30 border-border opacity-50"
                    }`}
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-purple-500/20" : "bg-muted"
                    }`}>
                      <Award className={`w-5 h-5 ${achievement.earned ? "text-purple-400" : "text-muted-foreground"}`} />
                    </div>
                    <p className={`text-sm font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {achievement.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Recent Activity & Stats */}
          <div className="space-y-6">
            {/* User Rank Card */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground">
                  {mockUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{mockUser.name}</p>
                  <p className="text-sm text-primary flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {mockUser.rank}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-5 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to="/courses" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/labs" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Practice Labs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
