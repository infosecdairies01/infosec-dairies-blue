import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import AlertSummaryCards from "@/components/soc/AlertSummaryCards";
import AlertsChart from "@/components/soc/AlertsChart";
import TopSourcesChart from "@/components/soc/TopSourcesChart";
import RecentAlertsTable from "@/components/soc/RecentAlertsTable";
import { Bell, Search, User } from "lucide-react";

const Labs = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SOCSidebar activeItem="Dashboard" />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Header */}
          <header className="bg-card/25 backdrop-blur-lg border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Security Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time threat monitoring and analysis</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search alerts..." 
                  className="bg-background/50 border border-white/[0.08] rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 w-64 transition-colors backdrop-blur-sm" 
                />
              </div>
              
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              
              <button className="w-8 h-8 bg-primary/10 border border-primary/25 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              <AlertSummaryCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertsChart />
                <TopSourcesChart />
              </div>
              
              <RecentAlertsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Labs;
