import { Shield } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  index: number;
  difficulty?: "easy" | "medium" | "hard";
}

const difficultyStyles = {
  easy: "bg-green-500/15 text-green-400 border-green-500/25",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  hard: "bg-red-500/15 text-red-400 border-red-500/25",
};

const CourseCard = ({ title, description, index, difficulty }: CourseCardProps) => {
  return (
    <div className="group relative">
      {/* Soft outer glow on hover */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      
      {/* Card container with enhanced glassmorphism */}
      <div className="relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-8 transition-all duration-500 ease-out group-hover:bg-card/35 group-hover:backdrop-blur-xl group-hover:translate-y-[-6px] group-hover:border-white/[0.12] shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 h-full min-h-[280px] flex flex-col">
        
        {/* Difficulty badge - top right */}
        {difficulty && (
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
        <div className="pl-4 flex flex-col flex-1">
          {/* Shield icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 mb-5">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground tracking-tight mb-3">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {description}
          </p>
          
          {/* CTA */}
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 mt-5">
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
