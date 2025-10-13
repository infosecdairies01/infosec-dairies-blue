import { Button } from "@/components/ui/button";
import { Instagram, Send, Shield, ChevronDown } from "lucide-react";
import logo from "@/assets/infosecdairies-logo.png";
import FloatingParticles from "./FloatingParticles";
import AnimatedCounter from "./AnimatedCounter";
const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 circuit-pattern" />
      <FloatingParticles />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{
      animationDelay: '1s'
    }} />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo with float animation */}
          
          
          {/* Heading with shimmer effect */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
            <span className="gradient-text inline-block bg-[length:200%_auto] animate-gradient-shift">
              InfosecDairies
            </span>
          </h1>
          
          {/* Tagline with staggered animation */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{
          animationDelay: '0.2s'
        }}>
            Defending the digital frontier. Expert insights on blue team cybersecurity, 
            threat detection, and defensive strategies.
          </p>
          
          {/* CTA Buttons with hover animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-up" style={{
          animationDelay: '0.4s'
        }}>
            <Button size="lg" className="bg-gradient-cyber hover:opacity-90 transition-all duration-300 glow-cyan group hover:scale-105 hover:glow-lime" asChild>
              <a href="https://instagram.com/infosecdairies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Follow on Instagram
              </a>
            </Button>
            
            <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10 group hover:scale-105 transition-all duration-300 hover:border-secondary" asChild>
              <a href="https://t.me/infosecdairies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Join Telegram
              </a>
            </Button>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="space-y-2 group hover:scale-110 transition-transform duration-300 animate-slide-right" style={{
            animationDelay: '0.6s'
          }}>
              <Shield className="w-8 h-8 mx-auto text-primary group-hover:animate-pulse" />
              <p className="text-2xl font-bold gradient-text">
                <AnimatedCounter end={100} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">Blue Team Focus</p>
            </div>
            <div className="space-y-2 group hover:scale-110 transition-transform duration-300 animate-fade-up" style={{
            animationDelay: '0.7s'
          }}>
              <div className="w-8 h-8 mx-auto text-primary flex items-center justify-center text-2xl group-hover:animate-pulse">🛡️</div>
              <p className="text-2xl font-bold gradient-text">24/7</p>
              <p className="text-sm text-muted-foreground">Security Insights</p>
            </div>
            <div className="space-y-2 group hover:scale-110 transition-transform duration-300 animate-slide-left" style={{
            animationDelay: '0.8s'
          }}>
              <div className="w-8 h-8 mx-auto text-primary flex items-center justify-center text-2xl group-hover:animate-pulse">🔐</div>
              <p className="text-2xl font-bold gradient-text">Expert</p>
              <p className="text-sm text-muted-foreground">Analysis</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button onClick={scrollToContent} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none text-primary hover:text-secondary transition-colors" aria-label="Scroll to content">
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>;
};
export default Hero;