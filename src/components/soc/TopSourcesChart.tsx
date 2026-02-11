import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { source: "192.168.1.105", count: 156 },
  { source: "10.0.0.42", count: 124 },
  { source: "admin_user", count: 98 },
  { source: "WKS-PC-0127", count: 87 },
  { source: "172.16.0.88", count: 65 },
];

const colors = [
  "hsl(0, 84%, 60%)",      // destructive red
  "hsl(25, 95%, 53%)",     // orange
  "hsl(48, 96%, 53%)",     // yellow
  "hsl(84, 81%, 44%)",     // secondary green
  "hsl(186, 100%, 42%)",   // primary cyan
];

const TopSourcesChart = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-4 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300">
      {/* Inner light reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
      
      <div className="relative pl-2">
        <h3 className="text-sm font-medium text-foreground mb-4">Top Alert Sources</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis 
                type="number" 
                stroke="hsl(180, 20%, 65%)" 
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="source"
                stroke="hsl(180, 20%, 65%)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={100}
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
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TopSourcesChart;
