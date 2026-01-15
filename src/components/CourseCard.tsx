import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

// Import all course thumbnails
import socCourseBg from "@/assets/soc-course-bg.jpg";
import logAnalysisBg from "@/assets/courses/log-analysis-bg.jpg";
import siemFundamentalsBg from "@/assets/courses/siem-fundamentals-bg.jpg";
import socAnalystPracticalBg from "@/assets/courses/soc-analyst-practical-bg.jpg";
import incidentResponseBg from "@/assets/courses/incident-response-bg.jpg";
import threatHuntingBg from "@/assets/courses/threat-hunting-bg.jpg";
import detectionEngineeringBg from "@/assets/courses/detection-engineering-bg.jpg";
import malwareAnalysisBg from "@/assets/courses/malware-analysis-bg.jpg";

interface CourseCardProps {
  title: string;
  description: string;
  index: number;
  difficulty?: "easy" | "medium" | "hard";
  courseId?: string;
  thumbnail?: string;
  isLiveCourse?: boolean;
}

const difficultyStyles = {
  easy: "bg-green-500/15 text-green-400 border-green-500/25",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  hard: "bg-red-500/15 text-red-400 border-red-500/25",
};

// Map thumbnail paths to imported images
const thumbnailMap: Record<string, string> = {
  "soc-course-bg.jpg": socCourseBg,
  "courses/log-analysis-bg.jpg": logAnalysisBg,
  "courses/siem-fundamentals-bg.jpg": siemFundamentalsBg,
  "courses/soc-analyst-practical-bg.jpg": socAnalystPracticalBg,
  "courses/incident-response-bg.jpg": incidentResponseBg,
  "courses/threat-hunting-bg.jpg": threatHuntingBg,
  "courses/detection-engineering-bg.jpg": detectionEngineeringBg,
  "courses/malware-analysis-bg.jpg": malwareAnalysisBg,
};

const CourseCard = ({ title, description, index, difficulty, courseId, thumbnail, isLiveCourse }: CourseCardProps) => {
  const linkTo = courseId 
    ? (isLiveCourse ? `/live-courses/${courseId}` : `/courses/${courseId}`) 
    : "/courses";
  const thumbnailSrc = thumbnail ? thumbnailMap[thumbnail] : null;
  
  return (
    <Link to={linkTo} className="group relative block">
      {/* Soft outer glow on hover */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      
      {/* Card container with enhanced glassmorphism */}
      <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] transition-all duration-500 ease-out group-hover:bg-card/35 group-hover:backdrop-blur-xl group-hover:translate-y-[-6px] group-hover:border-white/[0.12] shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 h-full min-h-[320px] flex flex-col">
        
        {/* Thumbnail Image */}
        {thumbnailSrc && (
          <div className="relative h-36 w-full overflow-hidden">
            <img 
              src={thumbnailSrc} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay for smooth transition to content */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
            
            {/* Difficulty badge - overlaid on thumbnail */}
            {difficulty && (
              <span className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border backdrop-blur-sm ${difficultyStyles[difficulty]}`}>
                {difficulty}
              </span>
            )}
          </div>
        )}
        
        {/* Difficulty badge - when no thumbnail */}
        {!thumbnailSrc && difficulty && (
          <span className={`absolute top-4 right-4 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        )}
        
        {/* Inner light reflection - top edge */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Inner light reflection - left edge */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
        
        {/* Subtle inner teal glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
        
        {/* Left accent gradient line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Content - Left aligned */}
        <div className="p-6 pl-5 flex flex-col flex-1">
          {/* Shield icon */}
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 mb-4">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2">
            {description}
          </p>
          
          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 mt-4">
            Explore Course
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;