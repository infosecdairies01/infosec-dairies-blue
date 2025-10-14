import { Shield, Terminal, Lock, Network } from "lucide-react";
import Navbar from "@/components/Navbar";

const Labs = () => {
  const labs = [
    {
      title: "Network Security Lab",
      description: "Learn network monitoring and intrusion detection",
      icon: Network,
      difficulty: "Intermediate",
    },
    {
      title: "SIEM Configuration",
      description: "Set up and configure Security Information and Event Management",
      icon: Shield,
      difficulty: "Advanced",
    },
    {
      title: "Incident Response",
      description: "Practice incident detection and response procedures",
      icon: Terminal,
      difficulty: "Intermediate",
    },
    {
      title: "Access Control",
      description: "Implement and test access control mechanisms",
      icon: Lock,
      difficulty: "Beginner",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Blue Team Labs
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hands-on cybersecurity labs focused on defensive security techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {labs.map((lab, index) => {
              const Icon = lab.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
                      <p className="text-muted-foreground mb-3">{lab.description}</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {lab.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Labs;
