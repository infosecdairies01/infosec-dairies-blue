import { AlertTriangle, AlertCircle, AlertOctagon, Info } from "lucide-react";

const alertData = [
  { label: "Total Alerts", count: 1247, icon: AlertTriangle, color: "text-[#8b949e]", bg: "bg-[#21262d]" },
  { label: "Critical", count: 12, icon: AlertOctagon, color: "text-red-400", bg: "bg-red-500/10" },
  { label: "High", count: 47, icon: AlertCircle, color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "Medium", count: 156, icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { label: "Low", count: 1032, icon: Info, color: "text-blue-400", bg: "bg-blue-500/10" },
];

const AlertSummaryCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {alertData.map((alert) => (
        <div
          key={alert.label}
          className={`${alert.bg} border border-[#21262d] rounded-lg p-4 hover:border-[#30363d] transition-all duration-200 cursor-pointer group`}
        >
          <div className="flex items-center justify-between mb-2">
            <alert.icon className={`w-5 h-5 ${alert.color}`} />
            <span className={`text-2xl font-bold ${alert.color} group-hover:scale-110 transition-transform`}>
              {alert.count.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-[#8b949e] uppercase tracking-wide">{alert.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertSummaryCards;
