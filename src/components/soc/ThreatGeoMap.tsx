import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { WORLD_HEX_POINTS } from "@/data/worldHexGrid";

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
    case "Critical": return { dot: "bg-destructive", text: "text-destructive" };
    case "High": return { dot: "bg-orange-500", text: "text-orange-400" };
    case "Medium": return { dot: "bg-yellow-500", text: "text-yellow-400" };
    default: return { dot: "bg-primary", text: "text-primary" };
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

  const hexPoints = useMemo(
    () => WORLD_HEX_POINTS.split(";").map((p) => p.split(",").map(Number) as [number, number]),
    []
  );

  // Target datacenter (Washington DC)
  const target = toPoint(38.9, -77.0);
  const active = threatSources.find((s) => s.id === activeSource);
  const maxAttacks = Math.max(...threatSources.map((s) => s.attacks));

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
        <div className="hidden sm:flex items-center gap-6 bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.05]">
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

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Hex-tile map */}
        <div className="lg:col-span-3 relative aspect-[2/1] bg-background/40 overflow-hidden lg:border-r border-white/[0.05]">
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* Hex-grid landmasses */}
            {hexPoints.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2.4"
                fill="hsl(215 25% 40%)"
                fillOpacity="0.3"
              />
            ))}

            {/* Attack arcs */}
            {threatSources.map((s) => {
              const p = toPoint(s.lat, s.lng);
              const isActive = activeSource === s.id;
              return (
                <path
                  key={`arc-${s.id}`}
                  d={arcPath(p.x, p.y, target.x, target.y)}
                  fill="none"
                  stroke={severityStroke[s.severity]}
                  strokeOpacity={activeSource === null ? 0.4 : isActive ? 0.9 : 0.08}
                  strokeWidth={isActive ? 2.5 : s.severity === "Critical" ? 1.5 : 1}
                  strokeDasharray="6 4"
                  className="arc-flow transition-all duration-300"
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
                    r={isActive ? 16 : 10}
                    fill={severityStroke[s.severity]}
                    fillOpacity={isActive ? 0.25 : 0.15}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 6.5 : 4.5}
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
          <div className="absolute top-4 left-4 p-3 border-l-2 border-primary/50 bg-white/[0.02] backdrop-blur-sm pointer-events-none">
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

        {/* Ranked country leaderboard */}
        <div className="lg:col-span-2 flex flex-col bg-white/[0.02]">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] font-mono">
              Top Origin Countries
            </span>
            <span className="text-[10px] text-muted-foreground/60 font-mono">
              {threatSources.reduce((a, s) => a + s.attacks, 0).toLocaleString()} events
            </span>
          </div>

          <div className="flex-1 divide-y divide-white/[0.04]">
            {threatSources.map((s, i) => {
              const c = getSeverityColor(s.severity);
              const isActive = activeSource === s.id;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "group px-5 py-3 cursor-pointer transition-colors",
                    isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                  )}
                  onMouseEnter={() => setActiveSource(s.id)}
                  onMouseLeave={() => setActiveSource(null)}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[10px] font-mono w-5 text-right", isActive ? c.text : "text-muted-foreground/50")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", c.dot)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-bold text-foreground/90 uppercase font-mono truncate">
                          {s.country}
                        </span>
                        <span className={cn("text-xs font-bold font-mono flex-shrink-0", c.text)}>
                          {s.attacks}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[9px] text-muted-foreground truncate">{s.type}</span>
                        <span className="text-[9px] text-muted-foreground/60 uppercase flex-shrink-0">{s.severity}</span>
                      </div>
                    </div>
                  </div>
                  {/* Proportional bar */}
                  <div className="mt-2 ml-8 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(s.attacks / maxAttacks) * 100}%`,
                        backgroundColor: severityStroke[s.severity],
                        opacity: isActive ? 1 : 0.5,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatGeoMap;
