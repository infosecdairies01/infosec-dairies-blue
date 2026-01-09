import { Shield, Clock, BookOpen, CheckCircle2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface CourseData {
  title: string;
  description: string;
  duration: string;
  modules: CourseModule[];
  price: number;
  originalPrice?: number;
  features: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "self-paced" | "live";
}

interface CourseDetailModalProps {
  course: CourseData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CourseDetailModal = ({ course, open, onOpenChange }: CourseDetailModalProps) => {
  if (!course) return null;

  const discountPercentage = course.originalPrice 
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 bg-card/95 backdrop-blur-xl border-border/50 overflow-hidden">
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" />
          <DialogHeader className="p-6 pb-4 pl-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    course.level === "Beginner" ? "bg-secondary/20 text-secondary" :
                    course.level === "Intermediate" ? "bg-primary/20 text-primary" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {course.title}
                </DialogTitle>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[50vh]">
          <div className="px-8 pb-6 space-y-6">
            {/* Curriculum Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Curriculum
              </h3>
              <div className="space-y-3">
                {course.modules.map((module, moduleIndex) => (
                  <div 
                    key={moduleIndex}
                    className="bg-muted/30 rounded-lg p-4 border border-border/30"
                  >
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-semibold">
                        {moduleIndex + 1}
                      </span>
                      {module.title}
                    </h4>
                    <ul className="space-y-2 pl-8">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li 
                          key={lessonIndex}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                What's Included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Footer with Pricing */}
        <div className="border-t border-border/50 bg-muted/20 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${course.originalPrice}
                    </span>
                    <span className="text-sm font-medium text-secondary bg-secondary/20 px-2 py-0.5 rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {course.type === "live" ? "Per cohort • Limited seats" : "Lifetime access • Self-paced"}
              </p>
            </div>
            <button className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-opacity">
              Enroll Now
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
