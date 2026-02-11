import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileWarning, 
  ScrollText, 
  Monitor, 
  Shield, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/labs" },
  { icon: AlertTriangle, label: "Alerts", href: "/labs/alerts" },
  { icon: FileWarning, label: "Incidents", href: "/labs/incidents" },
  { icon: ScrollText, label: "Logs", href: "/labs/logs" },
  { icon: Monitor, label: "Endpoints", href: "/labs/endpoints" },
  { icon: Shield, label: "Threat Intel", href: "/labs/threat-intel" },
  { icon: Settings, label: "Settings", href: "/labs/settings" },
];

interface SOCSidebarProps {
  activeItem?: string;
}

const SOCSidebar = ({ activeItem = "Dashboard" }: SOCSidebarProps) => {
  return (
    <aside className="w-16 lg:w-56 bg-card/25 backdrop-blur-lg border-r border-white/[0.08] flex flex-col shrink-0">
      <div className="p-4 border-b border-white/[0.06]">
        <h2 className="hidden lg:block text-lg font-bold gradient-text">SOC Labs</h2>
        <Shield className="lg:hidden w-8 h-8 text-primary mx-auto" />
      </div>
      
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = item.label === activeItem;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200",
                "hover:bg-white/[0.04] hover:text-primary",
                isActive 
                  ? "bg-primary/10 text-primary border-l-2 border-primary" 
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0 mx-auto lg:mx-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/[0.06]">
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
};

export default SOCSidebar;
