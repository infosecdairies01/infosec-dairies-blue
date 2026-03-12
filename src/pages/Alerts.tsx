import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import { Bell, Search, User, Filter, Clock, Monitor, Globe, AlertTriangle, Shield, Eye, CheckCircle, XCircle, MoreHorizontal, ChevronRight, Zap, Activity, ArrowUpRight, ArrowDownRight, Minus, SlidersHorizontal, LayoutList, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Alert {
  id: string;
  time: string;
  date: string;
  name: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: string;
  sourceType: "endpoint" | "network" | "user" | "server";
  status: "Open" | "Investigating" | "Resolved" | "Closed";
  assignee?: string;
  mitreTactic?: string;
  mitreId?: string;
}

const alertsData: Alert[] = [
  { id: "ALT-2026-0847", time: "14:32:18", date: "Jan 21, 2026", name: "Suspicious PowerShell Execution", description: "PowerShell process spawned with encoded command and bypass execution policy. Potential malicious script execution detected.", severity: "Critical", source: "WKS-PC-0127", sourceType: "endpoint", status: "Open", assignee: "Unassigned", mitreTactic: "Execution", mitreId: "T1059.001" },
  { id: "ALT-2026-0846", time: "14:28:45", date: "Jan 21, 2026", name: "Failed Login Attempt (5x)", description: "Multiple failed authentication attempts detected from single source IP within 2 minutes. Possible brute force attack.", severity: "High", source: "192.168.1.105", sourceType: "network", status: "Investigating", assignee: "John D.", mitreTactic: "Credential Access", mitreId: "T1110" },
  { id: "ALT-2026-0845", time: "14:25:12", date: "Jan 21, 2026", name: "Unusual Outbound Traffic", description: "Large volume of outbound traffic detected to unknown external IP. Data exfiltration indicators present.", severity: "High", source: "10.0.0.42", sourceType: "network", status: "Open", assignee: "Unassigned", mitreTactic: "Exfiltration", mitreId: "T1041" },
  { id: "ALT-2026-0844", time: "14:22:33", date: "Jan 21, 2026", name: "New Service Installed", description: "New Windows service installed on domain controller. Service name does not match approved software list.", severity: "Medium", source: "SRV-DB-01", sourceType: "server", status: "Resolved", assignee: "Sarah M.", mitreTactic: "Persistence", mitreId: "T1543.003" },
  { id: "ALT-2026-0843", time: "14:18:56", date: "Jan 21, 2026", name: "Port Scan Detected", description: "Sequential port scanning activity detected from internal host. Multiple ports probed within short timeframe.", severity: "Medium", source: "172.16.0.88", sourceType: "network", status: "Open", assignee: "Unassigned", mitreTactic: "Discovery", mitreId: "T1046" },
  { id: "ALT-2026-0842", time: "14:15:21", date: "Jan 21, 2026", name: "USB Device Connected", description: "Removable storage device connected to endpoint. Device not in approved hardware whitelist.", severity: "Low", source: "WKS-PC-0042", sourceType: "endpoint", status: "Resolved", assignee: "Mike R.", mitreTactic: "Initial Access", mitreId: "T1091" },
  { id: "ALT-2026-0841", time: "14:12:09", date: "Jan 21, 2026", name: "DNS Query to Suspicious Domain", description: "DNS resolution request to known malicious domain. Domain associated with C2 infrastructure.", severity: "High", source: "admin_user", sourceType: "user", status: "Investigating", assignee: "John D.", mitreTactic: "Command and Control", mitreId: "T1071.004" },
  { id: "ALT-2026-0840", time: "14:08:44", date: "Jan 21, 2026", name: "Scheduled Task Created", description: "New scheduled task created with suspicious parameters. Task configured to run with SYSTEM privileges.", severity: "Medium", source: "192.168.1.78", sourceType: "network", status: "Open", assignee: "Unassigned", mitreTactic: "Persistence", mitreId: "T1053.005" },
  { id: "ALT-2026-0839", time: "13:55:32", date: "Jan 21, 2026", name: "Credential Dumping Detected", description: "LSASS memory access detected from non-standard process. Possible credential harvesting attempt.", severity: "Critical", source: "WKS-PC-0089", sourceType: "endpoint", status: "Investigating", assignee: "Sarah M.", mitreTactic: "Credential Access", mitreId: "T1003.001" },
  { id: "ALT-2026-0838", time: "13:42:17", date: "Jan 21, 2026", name: "Unusual Process Parent", description: "cmd.exe spawned from Microsoft Word process. Potential macro-based malware execution.", severity: "High", source: "WKS-PC-0156", sourceType: "endpoint", status: "Open", assignee: "Unassigned", mitreTactic: "Execution", mitreId: "T1204.002" },
];

const severityConfig = {
  Critical: { dot: "bg-destructive", text: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", glow: "shadow-destructive/20" },
  High: { dot: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", glow: "shadow-orange-500/20" },
  Medium: { dot: "bg-yellow-500", text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", glow: "shadow-yellow-500/20" },
  Low: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: "shadow-primary/20" },
};

const statusConfig = {
  Open: { icon: Zap, text: "text-destructive", bg: "bg-destructive/8", border: "border-destructive/15" },
  Investigating: { icon: Activity, text: "text-yellow-400", bg: "bg-yellow-500/8", border: "border-yellow-500/15" },
  Resolved: { icon: CheckCircle, text: "text-secondary", bg: "bg-secondary/8", border: "border-secondary/15" },
  Closed: { icon: XCircle, text: "text-muted-foreground", bg: "bg-muted/30", border: "border-border" },
};

const sourceIcons: Record<string, typeof Monitor> = { endpoint: Monitor, network: Globe, user: User, server: Shield };

const Alerts = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "table">("list");

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus;
    const matchesSearch = !searchQuery || [alert.name, alert.description, alert.source, alert.id].some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const counts = {
    total: alertsData.length,
    critical: alertsData.filter(a => a.severity === "Critical").length,
    high: alertsData.filter(a => a.severity === "High").length,
    medium: alertsData.filter(a => a.severity === "Medium").length,
    low: alertsData.filter(a => a.severity === "Low").length,
    open: alertsData.filter(a => a.status === "Open").length,
  };

  const severityFilters = [
    { key: "all", label: "All", count: counts.total, color: "text-foreground" },
    { key: "Critical", label: "Critical", count: counts.critical, color: "text-destructive" },
    { key: "High", label: "High", count: counts.high, color: "text-orange-400" },
    { key: "Medium", label: "Medium", count: counts.medium, color: "text-yellow-400" },
    { key: "Low", label: "Low", count: counts.low, color: "text-primary" },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Alerts" />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-card/25 backdrop-blur-lg border-b border-white/[0.08] px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold text-foreground">Security Alerts</h1>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                    {counts.open} Open
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Real-time threat detection and triage</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search alerts, IPs, IOCs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background/50 border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 w-72 transition-colors backdrop-blur-sm"
                  />
                </div>
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </button>
                <button className="w-8 h-8 bg-primary/10 border border-primary/25 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <User className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Severity Filter Tabs + Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-background/30 rounded-lg p-1 border border-white/[0.06]">
                {severityFilters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setSelectedSeverity(f.key)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      selectedSeverity === f.key
                        ? "bg-white/[0.08] text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    )}
                  >
                    {f.key !== "all" && (
                      <span className={cn("w-2 h-2 rounded-full", severityConfig[f.key as keyof typeof severityConfig]?.dot)} />
                    )}
                    {f.label}
                    <span className={cn("text-[10px] font-mono", selectedSeverity === f.key ? f.color : "text-muted-foreground/60")}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Status filter */}
                <div className="flex items-center gap-1 bg-background/30 rounded-lg p-1 border border-white/[0.06]">
                  {["all", "Open", "Investigating", "Resolved"].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStatus(s)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                        selectedStatus === s
                          ? "bg-white/[0.08] text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                      )}
                    >
                      {s === "all" ? "All Status" : s}
                    </button>
                  ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-background/30 rounded-lg p-1 border border-white/[0.06]">
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn("p-1.5 rounded-md transition-all", viewMode === "list" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground")}
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={cn("p-1.5 rounded-md transition-all", viewMode === "table" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground")}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {/* Results count */}
            <div className="px-6 py-3 flex items-center justify-between border-b border-white/[0.04] bg-background/20">
              <span className="text-xs text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredAlerts.length}</span> of {alertsData.length} alerts
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Updated just now
              </span>
            </div>

            {viewMode === "table" ? (
              /* Table View */
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="text-left px-6 py-3 font-medium">Severity</th>
                      <th className="text-left px-4 py-3 font-medium">Alert</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">Source</th>
                      <th className="text-left px-4 py-3 font-medium">MITRE</th>
                      <th className="text-left px-4 py-3 font-medium">Assignee</th>
                      <th className="text-left px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.map((alert) => {
                      const sev = severityConfig[alert.severity];
                      const stat = statusConfig[alert.status];
                      const StatusIcon = stat.icon;
                      const SourceIcon = sourceIcons[alert.sourceType] || Monitor;
                      return (
                        <tr
                          key={alert.id}
                          className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer group"
                          onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                        >
                          <td className="px-6 py-3.5">
                            <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border", sev.bg, sev.text, sev.border)}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", sev.dot)} />
                              {alert.severity}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div>
                              <span className="text-foreground font-medium group-hover:text-primary transition-colors">{alert.name}</span>
                              <span className="block text-xs text-muted-foreground/60 font-mono">{alert.id}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", stat.text)}>
                              <StatusIcon className="w-3 h-3" />
                              {alert.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                              <SourceIcon className="w-3 h-3" />
                              {alert.source}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            {alert.mitreId && (
                              <span className="text-xs px-2 py-0.5 rounded bg-primary/8 border border-primary/15 text-primary font-mono">
                                {alert.mitreId}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-muted-foreground">{alert.assignee}</td>
                          <td className="px-4 py-3.5 text-xs text-muted-foreground font-mono">{alert.time}</td>
                          <td className="px-4 py-3.5">
                            <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", expandedAlert === alert.id && "rotate-90")} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* List View */
              <div className="divide-y divide-white/[0.04]">
                {filteredAlerts.map((alert) => {
                  const sev = severityConfig[alert.severity];
                  const stat = statusConfig[alert.status];
                  const StatusIcon = stat.icon;
                  const SourceIcon = sourceIcons[alert.sourceType] || Monitor;
                  const isExpanded = expandedAlert === alert.id;

                  return (
                    <div
                      key={alert.id}
                      className={cn(
                        "group transition-all duration-200 cursor-pointer",
                        isExpanded ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
                      )}
                      onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                    >
                      {/* Main row */}
                      <div className="px-6 py-4 flex items-center gap-4">
                        {/* Severity pip */}
                        <div className={cn("w-2.5 h-2.5 rounded-full shrink-0 ring-4", sev.dot, sev.glow, `ring-${alert.severity === "Critical" ? "destructive" : alert.severity === "High" ? "orange-500" : alert.severity === "Medium" ? "yellow-500" : "primary"}/5`)} />

                        {/* Core info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                              {alert.name}
                            </h3>
                            <span className={cn("shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border", sev.bg, sev.text, sev.border)}>
                              {alert.severity}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[11px] font-mono text-muted-foreground/50">{alert.id}</span>
                            <span className="text-muted-foreground/20">·</span>
                            <span className={cn("inline-flex items-center gap-1 text-[11px] font-medium", stat.text)}>
                              <StatusIcon className="w-3 h-3" />
                              {alert.status}
                            </span>
                            <span className="text-muted-foreground/20">·</span>
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <SourceIcon className="w-3 h-3" />
                              <span className="font-mono">{alert.source}</span>
                            </span>
                          </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4 shrink-0">
                          {alert.mitreId && (
                            <span className="hidden lg:inline-flex text-[10px] px-2 py-0.5 rounded bg-primary/8 border border-primary/15 text-primary font-mono font-medium">
                              {alert.mitreId}
                            </span>
                          )}
                          <span className="text-[11px] text-muted-foreground/60 font-mono hidden md:block">{alert.time}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 text-muted-foreground hover:text-secondary hover:bg-secondary/10 rounded-md transition-colors" title="Resolve">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Dismiss">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <ChevronRight className={cn("w-4 h-4 text-muted-foreground/40 transition-transform duration-200", isExpanded && "rotate-90")} />
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="px-6 pb-5 pt-0 ml-6 border-l-2 border-white/[0.06]">
                          <div className="pl-4 space-y-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">{alert.description}</p>
                            <div className="flex flex-wrap gap-3">
                              <DetailChip icon={Clock} label="Time" value={`${alert.date} at ${alert.time}`} />
                              <DetailChip icon={SourceIcon} label="Source" value={alert.source} mono />
                              {alert.mitreId && <DetailChip icon={Shield} label="MITRE ATT&CK" value={`${alert.mitreTactic} (${alert.mitreId})`} />}
                              <DetailChip icon={User} label="Assignee" value={alert.assignee || "Unassigned"} />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                                Investigate
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors">
                                Mark Resolved
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/[0.04] text-muted-foreground border border-white/[0.08] hover:bg-white/[0.08] transition-colors">
                                Create Incident
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-muted/20 border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <h3 className="text-foreground font-medium mb-1">No alerts match your filters</h3>
                <p className="text-sm text-muted-foreground">Try adjusting severity or status filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const DetailChip = ({ icon: Icon, label, value, mono }: { icon: typeof Clock; label: string; value: string; mono?: boolean }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
    <Icon className="w-3.5 h-3.5 text-muted-foreground/60" />
    <div>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wide block">{label}</span>
      <span className={cn("text-xs text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  </div>
);

export default Alerts;
