import { useState } from "react";
import { cn } from "@/lib/utils";
import { WORLD_MAP_PATH } from "@/data/worldMapPath";

interface ThreatSource {
  id: string;
  country: string;
  code: string;
  lat: number;
  lng: number;
  attacks: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  type: string;
}

const threatSources: ThreatSource[] = [
  { id: "1", country: "Russia", code: "RU", lat: 55.7, lng: 37.6, attacks: 342, severity: "Critical", type: "APT Activity" },
  { id: "2", country: "China", code: "CN", lat: 39.9, lng: 116.4, attacks: 287, severity: "Critical", type: "Espionage" },
  { id: "3", country: "North Korea", code: "KP", lat: 39.0, lng: 125.7, attacks: 156, severity: "High", type: "Ransomware" },
  { id: "4", country: "Iran", code: "IR", lat: 35.7, lng: 51.4, attacks: 128, severity: "High", type: "Wipers" },
  { id: "5", country: "Brazil", code: "BR", lat: -15.8, lng: -47.9, attacks: 95, severity: "Medium", type: "Credential Theft" },
  { id: "6", country: "Nigeria", code: "NG", lat: 9.1, lng: 7.5, attacks: 78, severity: "Medium", type: "BEC/Phishing" },
  { id: "7", country: "India", code: "IN", lat: 28.6, lng: 77.2, attacks: 64, severity: "Low", type: "Port Scanning" },
  { id: "8", country: "Romania", code: "RO", lat: 44.4, lng: 26.1, attacks: 53, severity: "Medium", type: "Botnet C2" },
];

// HSL values matching the design-token severity scale
const severityStroke: Record<string, string> = {
  Critical: "hsl(0 84% 60%)",
  High: "hsl(25 95% 53%)",
  Medium: "hsl(48 96% 53%)",
  Low: "hsl(186 100% 42%)",
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return { dot: "bg-destructive", text: "text-destructive", chipHover: "hover:border-destructive/30" };
    case "High": return { dot: "bg-orange-500", text: "text-orange-400", chipHover: "hover:border-orange-500/30" };
    case "Medium": return { dot: "bg-yellow-500", text: "text-yellow-400", chipHover: "hover:border-yellow-500/30" };
    default: return { dot: "bg-primary", text: "text-primary", chipHover: "hover:border-primary/30" };
  }
};

// Equirectangular projection into the 1000x500 map viewBox
const toPoint = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

// Curved arc from source to target, control point lifted above the midpoint
const arcPath = (sx: number, sy: number, tx: number, ty: number) => {
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  const lift = Math.min(Math.hypot(tx - sx, ty - sy) * 0.22, 90);
  return `M ${sx} ${sy} Q ${mx} ${my - lift} ${tx} ${ty}`;
};

const ThreatGeoMap = () => {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  // Target datacenter (Washington DC)
  const target = toPoint(38.9, -77.0);
  const active = threatSources.find((s) => s.id === activeSource);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card/25 backdrop-blur-xl border border-white/[0.08] shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/[0.05]">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-[0.2em] font-mono">
            Threat Origins
          </h3>
          <span className="text-[10px] text-primary/60 font-medium uppercase mt-1 tracking-widest">
            Real-time global ingestion
          </span>
        </div>

        {/* Legend pill */}
        <div className="flex items-center gap-6 bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.05]">
          {["Critical", "High", "Medium", "Low"].map((s) => {
            const c = getSeverityColor(s);
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", c.dot)} />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                  {s === "Medium" ? "Med" : s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full aspect-[2/1] bg-background/40 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.1) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />

        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Real world landmasses */}
          <path
            d={WORLD_MAP_PATH}
            fill="hsl(215 25% 27%)"
            fillOpacity="0.35"
            stroke="hsl(215 25% 40%)"
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />

          {/* Attack arcs */}
          {threatSources.map((s) => {
            const p = toPoint(s.lat, s.lng);
            return (
              <path
                key={`arc-${s.id}`}
                d={arcPath(p.x, p.y, target.x, target.y)}
                fill="none"
                stroke={severityStroke[s.severity]}
                strokeOpacity={activeSource === null || activeSource === s.id ? 0.45 : 0.12}
                strokeWidth={s.severity === "Critical" ? 1.5 : 1}
                strokeDasharray="6 4"
                className="arc-flow transition-opacity duration-300"
              />
            );
          })}

          {/* Source nodes */}
          {threatSources.map((s) => {
            const p = toPoint(s.lat, s.lng);
            const isActive = activeSource === s.id;
            return (
              <g key={`node-${s.id}`}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 14 : 9}
                  fill={severityStroke[s.severity]}
                  fillOpacity="0.15"
                  className="transition-all duration-300"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 6 : 4}
                  fill={severityStroke[s.severity]}
                  stroke="hsl(0 0% 100% / 0.25)"
                  strokeWidth="0.75"
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveSource(s.id)}
                  onMouseLeave={() => setActiveSource(null)}
                />
              </g>
            );
          })}

          {/* Target node */}
          <g transform={`translate(${target.x}, ${target.y})`}>
            <circle r="14" fill="none" stroke="hsl(84 81% 44%)" strokeWidth="1" className="animate-ping opacity-40" />
            <circle r="5" fill="hsl(84 81% 44%)" />
            <circle r="2" fill="hsl(220 40% 6%)" />
            <text
              y="-14"
              textAnchor="middle"
              className="fill-secondary font-mono uppercase font-bold"
              fontSize="11"
            >
              HQ-DC-01
            </text>
          </g>
        </svg>

        {/* HUD overlay */}
        <div className="absolute top-4 left-4 p-3 border-l-2 border-primary/50 bg-white/[0.02] backdrop-blur-sm">
          <div className="text-[9px] text-primary font-mono">LAT: 38.9072° N</div>
          <div className="text-[9px] text-primary font-mono">LON: 77.0369° W</div>
          <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter">
            Active Node: US-EAST-01
          </div>
        </div>

        {/* Hover tooltip */}
        {active && (
          <div
            className="absolute z-30 px-3 py-2 bg-card/95 backdrop-blur-lg border border-white/[0.12] rounded-lg shadow-xl whitespace-nowrap animate-fade-in pointer-events-none"
            style={{
              left: `${(toPoint(active.lat, active.lng).x / 1000) * 100}%`,
              top: `${(toPoint(active.lat, active.lng).y / 500) * 100}%`,
              transform: "translate(-50%, calc(-100% - 14px))",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-xs font-semibold", getSeverityColor(active.severity).text)}>
                {active.country}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">{active.code}</span>
            </div>
            <div className="text-[10px] text-muted-foreground">{active.type}</div>
            <div className="text-xs text-foreground font-bold mt-1">{active.attacks} attacks</div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/[0.02] border-t border-white/[0.05]">
        {threatSources.slice(0, 4).map((s) => {
          const c = getSeverityColor(s.severity);
          return (
            <div
              key={s.id}
              className={cn(
                "flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl transition-all cursor-pointer",
                c.chipHover,
                activeSource === s.id && "bg-white/[0.06]"
              )}
              onMouseEnter={() => setActiveSource(s.id)}
              onMouseLeave={() => setActiveSource(null)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", c.dot)} />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-foreground/90 uppercase font-mono truncate">
                    {s.country}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate">{s.type}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={cn("text-xs font-bold font-mono", c.text)}>{s.attacks}</div>
                <div className="text-[9px] text-muted-foreground/60 font-medium uppercase">events</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreatGeoMap;
