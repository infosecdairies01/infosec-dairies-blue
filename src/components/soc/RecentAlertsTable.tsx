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
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "High":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "Medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Low":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Open":
      return "text-red-400";
    case "Investigating":
      return "text-yellow-400";
    case "Resolved":
      return "text-green-400";
    default:
      return "text-[#8b949e]";
  }
};

const RecentAlertsTable = () => {
  return (
    <div className="bg-[#0d1117] border border-[#21262d] rounded-lg overflow-hidden">
      <div className="p-4 border-b border-[#21262d]">
        <h3 className="text-sm font-medium text-[#c9d1d9]">Recent Alerts</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#21262d]">
              <th className="text-left text-xs font-medium text-[#8b949e] uppercase tracking-wide px-4 py-3">Time</th>
              <th className="text-left text-xs font-medium text-[#8b949e] uppercase tracking-wide px-4 py-3">Alert Name</th>
              <th className="text-left text-xs font-medium text-[#8b949e] uppercase tracking-wide px-4 py-3">Severity</th>
              <th className="text-left text-xs font-medium text-[#8b949e] uppercase tracking-wide px-4 py-3">Source</th>
              <th className="text-left text-xs font-medium text-[#8b949e] uppercase tracking-wide px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr 
                key={index}
                className="border-b border-[#21262d] hover:bg-[#161b22] transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-[#8b949e] font-mono">{alert.time}</td>
                <td className="px-4 py-3 text-sm text-[#c9d1d9]">{alert.name}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded border",
                    getSeverityStyles(alert.severity)
                  )}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#8b949e] font-mono">{alert.source}</td>
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
