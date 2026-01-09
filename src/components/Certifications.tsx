import { useEffect, useRef } from "react";

const certifications = [
  { name: "Blue Team Level 1", abbr: "BTL1" },
  { name: "Blue Team Level 2", abbr: "BTL2" },
  { name: "CyberDefenders CCD", abbr: "CCD" },
  { name: "EC-Council CEH", abbr: "CEH" },
  { name: "CompTIA CySA+", abbr: "CySA+" },
  { name: "CompTIA Security+", abbr: "Sec+" },
  { name: "Microsoft SC-200", abbr: "SC-200" },
  { name: "CISSP (ISC²)", abbr: "CISSP" },
  { name: "GCIH – GIAC", abbr: "GCIH" },
  { name: "Splunk Enterprise Certified Admin", abbr: "Splunk" },
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
          Certifications Earned by Our Learners & Trainers
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...certifications, ...certifications].map((cert, index) => (
            <div
              key={`${cert.name}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="px-6 py-3 rounded border border-border/60 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300">
                <span className="text-sm font-mono font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                  {cert.abbr}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
