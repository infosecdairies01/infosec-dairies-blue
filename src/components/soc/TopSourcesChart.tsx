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
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
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
                borderRadius: "6px",
                color: "hsl(180, 100%, 95%)",
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
  );
};

export default TopSourcesChart;
