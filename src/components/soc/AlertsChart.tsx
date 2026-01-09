import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", alerts: 24 },
  { time: "04:00", alerts: 18 },
  { time: "08:00", alerts: 45 },
  { time: "12:00", alerts: 78 },
  { time: "16:00", alerts: 92 },
  { time: "20:00", alerts: 56 },
  { time: "Now", alerts: 67 },
];

const AlertsChart = () => {
  return (
    <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4">
      <h3 className="text-sm font-medium text-[#c9d1d9] mb-4">Alerts Over Time (24h)</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffc8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00ffc8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
            <XAxis 
              dataKey="time" 
              stroke="#8b949e" 
              fontSize={11}
              tickLine={false}
            />
            <YAxis 
              stroke="#8b949e" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "6px",
                color: "#c9d1d9",
              }}
            />
            <Area
              type="monotone"
              dataKey="alerts"
              stroke="#00ffc8"
              strokeWidth={2}
              fill="url(#alertGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AlertsChart;
