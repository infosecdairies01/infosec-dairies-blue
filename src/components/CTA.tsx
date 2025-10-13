import { Button } from "@/components/ui/button";
import { Instagram, Send } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-cyber opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Join the Community</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest in blue team cybersecurity. 
            Follow us on Instagram and join our Telegram channel for daily insights, 
            tips, and discussions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-cyber hover:opacity-90 transition-opacity glow-cyan"
              asChild
            >
              <a 
                href="https://instagram.com/infosecdairies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-secondary to-primary hover:opacity-90 transition-opacity glow-lime"
              asChild
            >
              <a 
                href="https://t.me/infosecdairies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Telegram
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground pt-8">
            🔒 Defending today, securing tomorrow
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
