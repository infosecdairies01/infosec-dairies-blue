import Navbar from "@/components/Navbar";
import SOCSidebar from "@/components/soc/SOCSidebar";
import AlertSummaryCards from "@/components/soc/AlertSummaryCards";
import AlertsChart from "@/components/soc/AlertsChart";
import TopSourcesChart from "@/components/soc/TopSourcesChart";
import RecentAlertsTable from "@/components/soc/RecentAlertsTable";
import { Bell, User, Lock } from "lucide-react";

const Labs = () => {
  // Set to false to show access restriction overlay
  const hasAccess = false;

  return (
    <main className="min-h-screen bg-[#010409] flex flex-col relative">
      {/* Navbar is outside the blur container */}
      <Navbar />
      
      <div className={`flex flex-1 ${!hasAccess ? 'blur-[8px] pointer-events-none select-none' : ''}`}>
        <SOCSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Sub-Header */}
          <header className="bg-[#0d1117] border-b border-[#21262d] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#c9d1d9]">Security Dashboard</h1>
              <p className="text-sm text-[#8b949e]">Real-time threat monitoring and analysis</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <button className="w-8 h-8 bg-[#21262d] rounded-full flex items-center justify-center text-[#8b949e] hover:text-[#c9d1d9] transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              {/* Alert Summary Cards */}
              <AlertSummaryCards />
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertsChart />
                <TopSourcesChart />
              </div>
              
              {/* Recent Alerts Table */}
              <RecentAlertsTable />
            </div>
          </div>
        </div>
      </div>

      {/* Access Restriction Overlay */}
      {!hasAccess && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#21262d] flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#8b949e]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              You don't have access to this page
            </h2>
            <p className="text-[#8b949e] text-sm md:text-base max-w-md mx-auto">
              Please upgrade your plan or contact the administrator.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Labs;
