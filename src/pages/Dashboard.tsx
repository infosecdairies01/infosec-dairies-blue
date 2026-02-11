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
    case "Easy": return "bg-primary/15 text-primary border border-primary/25";
    case "Medium": return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25";
    case "Hard": return "bg-destructive/15 text-destructive border border-destructive/25";
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
          {[
            { icon: BookOpen, value: enrolledCourses.length, label: "Enrolled Courses", iconColor: "text-primary", iconBg: "bg-primary/10" },
            { icon: CheckCircle, value: 21, label: "Lessons Completed", iconColor: "text-secondary", iconBg: "bg-secondary/10" },
            { icon: Trophy, value: mockUser.totalPoints, label: "Total Points", iconColor: "text-yellow-400", iconBg: "bg-yellow-500/10" },
            { icon: Target, value: 2, label: "Achievements", iconColor: "text-purple-400", iconBg: "bg-purple-500/10" },
          ].map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-4 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.01] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
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
                  className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-5 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${250 + index * 50}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.01] pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="relative pl-2">
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
                        <Button size="sm" variant="outline" className="border-white/[0.08] hover:border-primary/50 hover:text-primary bg-transparent">
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
                    className={`relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 ${
                      achievement.earned 
                        ? "bg-card/25 backdrop-blur-lg border border-purple-500/20 shadow-lg shadow-black/20" 
                        : "bg-card/10 backdrop-blur-sm border border-white/[0.05] opacity-50"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-purple-500/15 border border-purple-500/25" : "bg-muted/30"
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Rank Card */}
            <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-5 shadow-lg shadow-black/20 animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.05] via-transparent to-secondary/[0.03] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
              
              <div className="relative pl-2">
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
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-5 shadow-lg shadow-black/20 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.01] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
              
              <div className="relative pl-2">
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
            </div>

            {/* Quick Actions */}
            <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-5 shadow-lg shadow-black/20 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.01] pointer-events-none" />
              
              <div className="relative">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link to="/courses" className="block">
                    <Button variant="outline" className="w-full justify-start border-white/[0.08] hover:border-primary/50 hover:text-primary bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Button>
                  </Link>
                  <Link to="/labs" className="block">
                    <Button variant="outline" className="w-full justify-start border-white/[0.08] hover:border-primary/50 hover:text-primary bg-transparent">
                      <Target className="w-4 h-4 mr-2" />
                      Practice Labs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
