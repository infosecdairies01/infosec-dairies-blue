import { X, Monitor, Wifi, WifiOff, Shield, AlertTriangle, Clock, Cpu, HardDrive, MemoryStick, Activity, ShieldCheck, Calendar, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint } from "@/data/endpointsData";

interface EndpointDetailPanelProps {
  endpoint: Endpoint;
  onClose: () => void;
}

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
  High: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-secondary/15 text-secondary border-secondary/30",
};

const statusConfig: Record<string, { icon: typeof Wifi; color: string; bg: string }> = {
  Online: { icon: Wifi, color: "text-secondary", bg: "bg-secondary/10" },
  Offline: { icon: WifiOff, color: "text-muted-foreground", bg: "bg-muted/20" },
  Isolated: { icon: Shield, color: "text-orange-400", bg: "bg-orange-500/10" },
};

const getBarColor = (value: number) => {
  if (value > 85) return "bg-destructive";
  if (value > 65) return "bg-yellow-500";
  return "bg-primary";
};

const EndpointDetailPanel = ({ endpoint: ep, onClose }: EndpointDetailPanelProps) => {
  const statusCfg = statusConfig[ep.status] || statusConfig.Offline;
  const StatusIcon = statusCfg.icon;

  return (
    <div className="w-[380px] shrink-0 bg-card/30 backdrop-blur-xl border-l border-border/50 flex flex-col animate-in slide-in-from-right-5 duration-300">
      {/* Header */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl", statusCfg.bg)}>
              <Monitor className={cn("w-5 h-5", statusCfg.color)} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{ep.hostname}</h3>
              <p className="text-xs font-mono text-muted-foreground">{ep.ip}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-[10px] px-2.5 py-1 rounded-full border font-semibold", riskStyles[ep.risk])}>{ep.risk} Risk</span>
          <span className={cn("flex items-center gap-1 text-xs font-medium", statusCfg.color)}>
            <StatusIcon className="w-3 h-3" /> {ep.status}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground ml-auto">
            <Clock className="w-3 h-3" /> {ep.lastSeen}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5 space-y-5">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Isolate", color: "hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30" },
            { label: "Scan", color: "hover:bg-primary/10 hover:text-primary hover:border-primary/30" },
            { label: "Restart", color: "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" },
          ].map(a => (
            <button key={a.label} className={cn("text-xs font-medium py-2 rounded-lg border border-border/30 text-muted-foreground bg-background/20 transition-all", a.color)}>
              {a.label}
            </button>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-1">
          <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">System Info</h4>
          {[
            { icon: Server, label: "OS", value: `${ep.os} ${ep.osVersion}` },
            { icon: ShieldCheck, label: "EDR Agent", value: ep.agent },
            { icon: Activity, label: "EDR Status", value: ep.edrStatus, valueClass: ep.edrStatus === "Active" ? "text-secondary" : ep.edrStatus === "Outdated" ? "text-yellow-400" : "text-destructive" },
            { icon: Calendar, label: "Last Patched", value: ep.lastPatch },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/15">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </span>
              <span className={cn("text-xs font-medium text-foreground", item.valueClass)}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* User */}
        <div className="space-y-1">
          <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Assigned User</h4>
          <div className="rounded-lg bg-background/20 border border-border/20 p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {ep.user.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{ep.user}</p>
              <p className="text-[11px] text-muted-foreground">{ep.department}</p>
            </div>
          </div>
        </div>

        {/* Resource Usage */}
        {ep.status === "Online" && (
          <div className="space-y-1">
            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Resource Usage</h4>
            <div className="space-y-3">
              {[
                { icon: Cpu, label: "CPU", value: ep.cpu },
                { icon: MemoryStick, label: "Memory", value: ep.memory },
                { icon: HardDrive, label: "Disk", value: ep.disk },
              ].map(r => (
                <div key={r.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <r.icon className="w-3.5 h-3.5" /> {r.label}
                    </span>
                    <span className={cn("text-xs font-bold", r.value > 85 ? "text-destructive" : r.value > 65 ? "text-yellow-400" : "text-foreground")}>{r.value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-500", getBarColor(r.value))} style={{ width: `${r.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Open Alerts */}
        {ep.openAlerts > 0 && (
          <div className="rounded-lg bg-destructive/5 border border-destructive/15 p-3">
            <div className="flex items-center gap-2 text-destructive mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-semibold">{ep.openAlerts} Open Alerts</span>
            </div>
            <p className="text-[11px] text-muted-foreground">This endpoint has unresolved security alerts requiring investigation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointDetailPanel;
