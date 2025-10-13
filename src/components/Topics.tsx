import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, AlertTriangle, FileSearch, Lock, Activity } from "lucide-react";

const topics = [
  {
    icon: Shield,
    title: "Threat Detection",
    description: "Advanced techniques for identifying and analyzing security threats in real-time"
  },
  {
    icon: Eye,
    title: "Security Monitoring",
    description: "Continuous surveillance and analysis of network traffic and system activities"
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description: "Structured approaches to handling and recovering from security incidents"
  },
  {
    icon: FileSearch,
    title: "Log Analysis",
    description: "Deep dive into security logs to uncover anomalies and potential threats"
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Implementing robust authentication and authorization mechanisms"
  },
  {
    icon: Activity,
    title: "SIEM Solutions",
    description: "Security Information and Event Management best practices and tools"
  }
];

const Topics = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blue Team Topics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coverage of defensive cybersecurity concepts and practices
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:glow-cyan group"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl gradient-text">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {topic.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Topics;
