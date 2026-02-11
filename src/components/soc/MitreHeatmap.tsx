import { cn } from "@/lib/utils";

const tactics = [
  { name: "Initial Access", id: "TA0001", count: 8 },
  { name: "Execution", id: "TA0002", count: 15 },
  { name: "Persistence", id: "TA0003", count: 12 },
  { name: "Priv. Escalation", id: "TA0004", count: 6 },
  { name: "Defense Evasion", id: "TA0005", count: 9 },
  { name: "Credential Access", id: "TA0006", count: 18 },
  { name: "Discovery", id: "TA0007", count: 22 },
  { name: "Lateral Movement", id: "TA0008", count: 4 },
  { name: "Collection", id: "TA0009", count: 7 },
  { name: "C&C", id: "TA0011", count: 11 },
  { name: "Exfiltration", id: "TA0010", count: 5 },
  { name: "Impact", id: "TA0040", count: 3 },
];

const getHeatColor = (count: number) => {
  if (count >= 18) return "bg-destructive/60 border-destructive/40 text-destructive";
  if (count >= 12) return "bg-orange-500/40 border-orange-500/30 text-orange-400";
  if (count >= 8) return "bg-yellow-500/30 border-yellow-500/25 text-yellow-400";
  if (count >= 4) return "bg-primary/25 border-primary/20 text-primary";
  return "bg-muted/20 border-white/[0.06] text-muted-foreground";
};

const MitreHeatmap = () => {
  const maxCount = Math.max(...tactics.map(t => t.count));

  return (
    <div className="group relative overflow-hidden rounded-xl bg-card/25 backdrop-blur-lg border border-white/[0.08] p-5 shadow-lg shadow-black/20 hover:bg-card/35 hover:border-white/[0.12] transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.02] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-secondary opacity-50" />
      
      <div className="relative pl-2">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-foreground">MITRE ATT&CK Coverage</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Tactic-level detection heatmap</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-muted-foreground">Low</span>
            <div className="flex gap-0.5">
              <div className="w-3 h-2 rounded-sm bg-muted/20" />
              <div className="w-3 h-2 rounded-sm bg-primary/25" />
              <div className="w-3 h-2 rounded-sm bg-yellow-500/30" />
              <div className="w-3 h-2 rounded-sm bg-orange-500/40" />
              <div className="w-3 h-2 rounded-sm bg-destructive/60" />
            </div>
            <span className="text-[9px] text-muted-foreground">High</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {tactics.map((tactic) => (
            <div 
              key={tactic.id}
              className={cn(
                "relative p-3 rounded-lg border cursor-pointer hover:scale-105 transition-all duration-200",
                getHeatColor(tactic.count)
              )}
            >
              <div className="text-center">
                <span className="block text-lg font-bold">{tactic.count}</span>
                <span className="block text-[9px] leading-tight mt-1 opacity-80">{tactic.name}</span>
                <span className="block text-[8px] opacity-50 mt-0.5">{tactic.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MitreHeatmap;
