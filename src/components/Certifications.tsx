import { useEffect, useRef } from "react";

const certifications = [
  { name: "BTL1", org: "Security Blue Team" },
  { name: "BTL2", org: "Security Blue Team" },
  { name: "CyberDefenders", org: "CyberDefenders" },
  { name: "Security+", org: "CompTIA" },
  { name: "CySA+", org: "CompTIA" },
  { name: "SC-200", org: "Microsoft" },
  { name: "Splunk", org: "Power User" },
  { name: "CSA", org: "EC-Council" },
  { name: "CND", org: "EC-Council" },
  { name: "SOC Analyst", org: "LetsDefend" },
  { name: "Blue Team", org: "TryHackMe" },
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
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
          Certifications Earned by Our Learners & Trainers
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...certifications, ...certifications].map((cert, index) => (
            <div
              key={`${cert.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-16 h-16 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center mb-2">
                <span className="text-xs font-bold text-primary tracking-tight text-center leading-tight px-1">
                  {cert.name}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center whitespace-nowrap">
                {cert.org}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
