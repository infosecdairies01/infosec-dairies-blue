import { useEffect, useRef } from "react";

import btl1Logo from "@/assets/certs/btl1.png";
import comptiaSecurityLogo from "@/assets/certs/comptia-security.png";
import comptiaCysaLogo from "@/assets/certs/comptia-cysa.png";
import microsoftLogo from "@/assets/certs/microsoft-sc200.png";
import splunkLogo from "@/assets/certs/splunk.png";
import securityBlueTeamLogo from "@/assets/certs/securityblueteam.png";
import letsDefendLogo from "@/assets/certs/letsdefend.svg";
import eccouncilLogo from "@/assets/certs/eccouncil.png";
import tryhackmeLogo from "@/assets/certs/tryhackme.png";
import cyberdefendersLogo from "@/assets/certs/cyberdefenders.png";

const certifications = [
  { name: "BTL1", logo: btl1Logo },
  { name: "Security Blue Team", logo: securityBlueTeamLogo },
  { name: "CompTIA Security+", logo: comptiaSecurityLogo },
  { name: "CompTIA CySA+", logo: comptiaCysaLogo },
  { name: "Microsoft SC-200", logo: microsoftLogo },
  { name: "Splunk Power User", logo: splunkLogo },
  { name: "EC-Council", logo: eccouncilLogo },
  { name: "LetsDefend", logo: letsDefendLogo },
  { name: "TryHackMe", logo: tryhackmeLogo },
  { name: "CyberDefenders", logo: cyberdefendersLogo },
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
          className="flex gap-16 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...certifications, ...certifications].map((cert, index) => (
            <div
              key={`${cert.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={cert.logo}
                alt={cert.name}
                className="h-16 w-auto max-w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
