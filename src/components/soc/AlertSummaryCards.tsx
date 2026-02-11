import { AlertTriangle, AlertCircle, AlertOctagon, Info } from "lucide-react";

const alertData = [
  { label: "Total Alerts", count: 1247, icon: AlertTriangle, color: "text-muted-foreground", bg: "bg-muted/30" },
  { label: "Critical", count: 12, icon: AlertOctagon, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "High", count: 47, icon: AlertCircle, color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "Medium", count: 156, icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { label: "Low", count: 1032, icon: Info, color: "text-primary", bg: "bg-primary/10" },
];

const AlertSummaryCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {alertData.map((alert) => (
        <div
          key={alert.label}
          className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-4 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
        >
          {/* Inner light reflection */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.01] pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <alert.icon className={`w-5 h-5 ${alert.color}`} />
              <span className={`text-2xl font-bold ${alert.color} group-hover:scale-110 transition-transform`}>
                {alert.count.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{alert.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSummaryCards;
