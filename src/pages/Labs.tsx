import { Lock, Code, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Labs = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-5 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 circuit-pattern opacity-5" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Icon trio */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <Lock className="h-16 w-16 text-primary animate-float opacity-40" style={{ animationDelay: '0s' }} />
            <Shield className="h-24 w-24 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
            <Code className="h-16 w-16 text-primary animate-float opacity-40" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-bold">
              <span className="gradient-text inline-block bg-[length:200%_auto] animate-gradient-shift">
                Coming Soon
              </span>
            </h1>
            
            <div className="h-1 w-32 bg-gradient-cyber mx-auto rounded-full" />
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Blue Team Security Labs
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hands-on cybersecurity training environments are currently under development. 
              Get ready to sharpen your defensive security skills with realistic scenarios.
            </p>
          </div>
          
          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Security Analysis</h3>
              <p className="text-sm text-muted-foreground">Real-world threat scenarios</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Defense Techniques</h3>
              <p className="text-sm text-muted-foreground">Hands-on protection methods</p>
            </div>
            
            <div className="p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
              <Code className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Interactive Labs</h3>
              <p className="text-sm text-muted-foreground">Practice in safe environments</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Labs;
