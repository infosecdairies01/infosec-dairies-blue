import { Lock } from "lucide-react";

interface AccessRestrictionOverlayProps {
  isRestricted: boolean;
}

const AccessRestrictionOverlay = ({ isRestricted }: AccessRestrictionOverlayProps) => {
  if (!isRestricted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Content box */}
      <div className="relative z-10 text-center px-6 py-10 max-w-md mx-4">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center">
          <Lock className="w-8 h-8 text-[#00ffc8]" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          You don't have access to this page
        </h2>
        
        <p className="text-[#8b949e] text-sm md:text-base">
          Please upgrade your plan or contact the administrator.
        </p>
        
        <button className="mt-6 px-6 py-2.5 bg-[#00ffc8] text-[#010409] font-semibold rounded-md hover:bg-[#7bff81] transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default AccessRestrictionOverlay;
