import { Monitor, Wifi, WifiOff, Shield, AlertTriangle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint } from "@/data/endpointsData";

interface EndpointTableProps {
  endpoints: Endpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/15 text-destructive border-destructive/30",
  High: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-secondary/15 text-secondary border-secondary/30",
};

const statusConfig: Record<string, { icon: typeof Wifi; color: string }> = {
  Online: { icon: Wifi, color: "text-secondary" },
  Offline: { icon: WifiOff, color: "text-muted-foreground" },
  Isolated: { icon: Shield, color: "text-orange-400" },
};

const edrColors: Record<string, string> = {
  Active: "text-secondary",
  Outdated: "text-yellow-400",
  Disabled: "text-destructive",
};

const osIcons: Record<string, string> = {
  Windows: "🪟",
  Linux: "🐧",
  macOS: "🍎",
};

const EndpointTable = ({ endpoints, selectedId, onSelect }: EndpointTableProps) => {
  return (
    <div className="rounded-xl bg-card/20 backdrop-blur-lg border border-border/50 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_0.6fr_32px] gap-3 px-5 py-3 border-b border-border/30 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        <span>Endpoint</span>
        <span>User / Dept</span>
        <span>OS</span>
        <span>Status</span>
        <span>Risk</span>
        <span>EDR</span>
        <span>Alerts</span>
        <span></span>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-border/20">
        {endpoints.map((ep) => {
          const statusCfg = statusConfig[ep.status] || statusConfig.Offline;
          const StatusIcon = statusCfg.icon;
          const isSelected = selectedId === ep.id;

          return (
            <button
              key={ep.id}
              onClick={() => onSelect(ep.id)}
              className={cn(
                "w-full grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_0.8fr_0.6fr_32px] gap-3 px-5 py-3.5 text-left transition-all duration-200 hover:bg-primary/[0.04] group",
                isSelected && "bg-primary/[0.08] border-l-2 border-l-primary"
              )}
            >
              {/* Endpoint */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn("shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-muted/30", statusCfg.color)}>
                  <Monitor className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{ep.hostname}</p>
                  <p className="text-[11px] font-mono text-muted-foreground">{ep.ip}</p>
                </div>
              </div>

              {/* User */}
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-sm text-foreground truncate">{ep.user}</p>
                <p className="text-[11px] text-muted-foreground">{ep.department}</p>
              </div>

              {/* OS */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{osIcons[ep.os]}</span>
                <span className="text-xs text-muted-foreground truncate">{ep.os} {ep.osVersion.split(" ")[0]}</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <StatusIcon className={cn("w-3.5 h-3.5", statusCfg.color)} />
                <span className={cn("text-xs font-medium", statusCfg.color)}>{ep.status}</span>
              </div>

              {/* Risk */}
              <div className="flex items-center">
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-semibold", riskStyles[ep.risk])}>
                  {ep.risk}
                </span>
              </div>

              {/* EDR */}
              <div className="flex items-center">
                <span className={cn("text-xs font-medium", edrColors[ep.edrStatus])}>{ep.edrStatus}</span>
              </div>

              {/* Alerts */}
              <div className="flex items-center">
                {ep.openAlerts > 0 ? (
                  <span className="flex items-center gap-1 text-xs text-destructive font-semibold">
                    <AlertTriangle className="w-3 h-3" />
                    {ep.openAlerts}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground/50">—</span>
                )}
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ChevronRight className={cn("w-4 h-4 transition-colors", isSelected ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/60")} />
              </div>
            </button>
          );
        })}
      </div>

      {endpoints.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">
          No endpoints match your filters.
        </div>
      )}
    </div>
  );
};

export default EndpointTable;
