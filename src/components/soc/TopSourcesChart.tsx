import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { source: "192.168.1.105", count: 156 },
  { source: "10.0.0.42", count: 124 },
  { source: "admin_user", count: 98 },
  { source: "WKS-PC-0127", count: 87 },
  { source: "172.16.0.88", count: 65 },
];

const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

const TopSourcesChart = () => {
  return (
    <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-4">
      <h3 className="text-sm font-medium text-[#c9d1d9] mb-4">Top Alert Sources</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis 
              type="number" 
              stroke="#8b949e" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="source"
              stroke="#8b949e"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "6px",
                color: "#c9d1d9",
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
