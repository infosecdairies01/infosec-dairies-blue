import { cn } from "@/lib/utils";

const alerts = [
  { time: "14:32:18", name: "Suspicious PowerShell Execution", severity: "Critical", source: "WKS-PC-0127", status: "Open" },
  { time: "14:28:45", name: "Failed Login Attempt (5x)", severity: "High", source: "192.168.1.105", status: "Investigating" },
  { time: "14:25:12", name: "Unusual Outbound Traffic", severity: "High", source: "10.0.0.42", status: "Open" },
  { time: "14:22:33", name: "New Service Installed", severity: "Medium", source: "SRV-DB-01", status: "Resolved" },
  { time: "14:18:56", name: "Port Scan Detected", severity: "Medium", source: "172.16.0.88", status: "Open" },
  { time: "14:15:21", name: "USB Device Connected", severity: "Low", source: "WKS-PC-0042", status: "Resolved" },
  { time: "14:12:09", name: "DNS Query to Suspicious Domain", severity: "High", source: "admin_user", status: "Investigating" },
  { time: "14:08:44", name: "Scheduled Task Created", severity: "Medium", source: "192.168.1.78", status: "Open" },
];

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "bg-destructive/20 text-destructive border-destructive/30";
    case "High":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Low":
      return "bg-primary/20 text-primary border-primary/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Open":
      return "text-destructive";
    case "Investigating":
      return "text-yellow-400";
    case "Resolved":
      return "text-secondary";
    default:
      return "text-muted-foreground";
  }
};

const RecentAlertsTable = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Recent Alerts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">Time</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">Alert Name</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">Severity</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">Source</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr 
                key={index}
                className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{alert.time}</td>
                <td className="px-4 py-3 text-sm text-foreground">{alert.name}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded border",
                    getSeverityStyles(alert.severity)
                  )}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{alert.source}</td>
                <td className={cn("px-4 py-3 text-sm font-medium", getStatusStyles(alert.status))}>
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAlertsTable;
