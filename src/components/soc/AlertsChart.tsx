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
    <div className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-4 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300">
      {/* Inner light reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
      
      <div className="relative pl-2">
        <h3 className="text-sm font-medium text-foreground mb-4">Alerts Over Time (24h)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(186, 100%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(180, 20%, 65%)" 
                fontSize={11}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(180, 20%, 65%)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 35%, 8%)",
                  border: "1px solid hsl(220, 30%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(180, 100%, 95%)",
                  backdropFilter: "blur(12px)",
                }}
              />
              <Area
                type="monotone"
                dataKey="alerts"
                stroke="hsl(186, 100%, 42%)"
                strokeWidth={2}
                fill="url(#alertGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AlertsChart;
