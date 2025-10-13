import { Button } from "@/components/ui/button";
import { Instagram, Send, Shield } from "lucide-react";
import logo from "@/assets/infosecdairies-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 circuit-pattern" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="InfosecDairies Logo - Cybersecurity Blue Team" 
              className="w-64 h-64 object-contain glow-cyan animate-fade-in"
            />
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">InfosecDairies</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Defending the digital frontier. Expert insights on blue team cybersecurity, 
            threat detection, and defensive strategies.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-cyber hover:opacity-90 transition-opacity glow-cyan group"
              asChild
            >
              <a 
                href="https://instagram.com/infosecdairies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Follow on Instagram
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary hover:bg-primary/10 group"
              asChild
            >
              <a 
                href="https://t.me/infosecdairies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Join Telegram
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="space-y-2">
              <Shield className="w-8 h-8 mx-auto text-primary" />
              <p className="text-2xl font-bold gradient-text">100%</p>
              <p className="text-sm text-muted-foreground">Blue Team Focus</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 mx-auto text-primary flex items-center justify-center text-2xl">🛡️</div>
              <p className="text-2xl font-bold gradient-text">24/7</p>
              <p className="text-sm text-muted-foreground">Security Insights</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 mx-auto text-primary flex items-center justify-center text-2xl">🔐</div>
              <p className="text-2xl font-bold gradient-text">Expert</p>
              <p className="text-sm text-muted-foreground">Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
