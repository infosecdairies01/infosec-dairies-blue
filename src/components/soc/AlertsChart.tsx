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
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
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
                borderRadius: "6px",
                color: "hsl(180, 100%, 95%)",
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
  );
};

export default AlertsChart;
