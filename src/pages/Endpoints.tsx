import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import EndpointStatsBar from "@/components/soc/EndpointStatsBar";
import EndpointTable from "@/components/soc/EndpointTable";
import EndpointDetailPanel from "@/components/soc/EndpointDetailPanel";
import { Bell, User, Search, RefreshCw, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { endpointsData } from "@/data/endpointsData";

const Endpoints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = endpointsData.filter(ep => {
    const matchesSearch = ep.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ep.ip.includes(searchQuery) ||
                          ep.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || ep.status === filterStatus;
    const matchesRisk = filterRisk === "all" || ep.risk === filterRisk;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const selectedEndpoint = endpointsData.find(e => e.id === selectedId) || null;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Endpoints" />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-card/25 backdrop-blur-lg border-b border-border/50 px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Endpoint Inventory</h1>
              <p className="text-sm text-muted-foreground">Real-time endpoint monitoring & EDR management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search hostname, IP, user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 w-72 transition-colors backdrop-blur-sm"
                />
              </div>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/[0.04]" title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/20">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <button className="w-8 h-8 bg-primary/10 border border-primary/25 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-6 overflow-auto space-y-5">
              <EndpointStatsBar endpoints={endpointsData} />

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1" />
                <div className="flex items-center gap-1 mr-3">
                  {["all", "Online", "Offline", "Isolated"].map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", filterStatus === s ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/20 border border-transparent")}>
                      {s === "all" ? "All Status" : s}
                    </button>
                  ))}
                </div>
                <div className="w-px h-5 bg-border/30" />
                <div className="flex items-center gap-1 ml-2">
                  {["all", "Critical", "High", "Medium", "Low"].map(r => (
                    <button key={r} onClick={() => setFilterRisk(r)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", filterRisk === r ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/20 border border-transparent")}>
                      {r === "all" ? "All Risk" : r}
                    </button>
                  ))}
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{filtered.length} endpoint{filtered.length !== 1 ? "s" : ""}</span>
              </div>

              <EndpointTable endpoints={filtered} selectedId={selectedId} onSelect={(id) => setSelectedId(prev => prev === id ? null : id)} />
            </div>

            {/* Detail panel */}
            {selectedEndpoint && (
              <EndpointDetailPanel endpoint={selectedEndpoint} onClose={() => setSelectedId(null)} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Endpoints;
