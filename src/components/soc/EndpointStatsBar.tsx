import { Monitor, Wifi, WifiOff, Shield, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint } from "@/data/endpointsData";

interface EndpointStatsBarProps {
  endpoints: Endpoint[];
}

const EndpointStatsBar = ({ endpoints }: EndpointStatsBarProps) => {
  const online = endpoints.filter(e => e.status === "Online").length;
  const offline = endpoints.filter(e => e.status === "Offline").length;
  const isolated = endpoints.filter(e => e.status === "Isolated").length;
  const criticalRisk = endpoints.filter(e => e.risk === "Critical" || e.risk === "High").length;
  const edrHealthy = endpoints.filter(e => e.edrStatus === "Active").length;
  const totalAlerts = endpoints.reduce((sum, e) => sum + e.openAlerts, 0);

  const stats = [
    { label: "Total Endpoints", value: endpoints.length, icon: Monitor, color: "text-foreground", accent: "from-primary/20 to-primary/5" },
    { label: "Online", value: online, icon: Wifi, color: "text-secondary", accent: "from-secondary/20 to-secondary/5" },
    { label: "Offline", value: offline, icon: WifiOff, color: "text-muted-foreground", accent: "from-muted/20 to-muted/5" },
    { label: "Isolated", value: isolated, icon: Shield, color: "text-orange-400", accent: "from-orange-500/20 to-orange-500/5" },
    { label: "High/Critical Risk", value: criticalRisk, icon: AlertTriangle, color: "text-destructive", accent: "from-destructive/20 to-destructive/5" },
    { label: "EDR Healthy", value: `${edrHealthy}/${endpoints.length}`, icon: ShieldCheck, color: "text-primary", accent: "from-primary/20 to-primary/5" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="relative overflow-hidden rounded-xl bg-card/30 backdrop-blur-lg border border-border/50 p-4">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", s.accent)} />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
              <span className={cn("text-2xl font-bold tracking-tight", s.color)}>{s.value}</span>
            </div>
            <div className={cn("p-2 rounded-lg bg-background/30", s.color)}>
              <s.icon className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EndpointStatsBar;
