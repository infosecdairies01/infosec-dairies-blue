import { useEffect, useRef } from "react";

const courses = [
  { name: "Security Operations Centre", icon: "🛡️", category: "Self Paced" },
  { name: "Splunk Engineer", icon: "📊", category: "Self Paced" },
  { name: "Digital Forensics", icon: "🔍", category: "Live Training" },
  { name: "GRC", icon: "📋", category: "Live Training" },
];

const Certifications = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">
          Our Course Offerings
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...courses, ...courses].map((course, index) => (
            <div
              key={`${course.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 min-w-[200px]"
            >
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <span className="text-3xl">{course.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center mb-1">{course.name}</h3>
              <span className="text-xs text-muted-foreground">{course.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
