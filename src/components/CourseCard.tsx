import { Shield } from "lucide-react";
import { CourseData } from "./CourseDetailModal";

interface CourseCardProps {
  course: CourseData;
  onClick: () => void;
}

const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      {/* Card container with glassmorphism */}
      <div className="relative overflow-hidden rounded-xl bg-card/40 backdrop-blur-md border border-border/50 p-8 transition-all duration-300 hover:border-primary/30 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-primary/5 h-full">
        
        {/* Left accent gradient line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content - Left aligned */}
        <div className="pl-4 space-y-5">
          {/* Top row with icon and level */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              course.level === "Beginner" ? "bg-secondary/20 text-secondary" :
              course.level === "Intermediate" ? "bg-primary/20 text-primary" :
              "bg-destructive/20 text-destructive"
            }`}>
              {course.level}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            {course.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {course.description}
          </p>

          {/* Price preview */}
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-lg font-bold text-foreground">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>
          
          {/* CTA */}
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200">
            Explore Course
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
