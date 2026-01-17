import { Send, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/infosecdairiess"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors group"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/infosecdairies"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted/50 hover:bg-[#0077B5]/20 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-[#0077B5] transition-colors" />
            </a>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} InfosecDairies. All rights reserved.</p>
            <p className="mt-1">Blue Team Cybersecurity Education &amp; Insights</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
