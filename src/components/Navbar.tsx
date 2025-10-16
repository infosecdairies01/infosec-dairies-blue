import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="h-6 w-6 text-[#00ffc8] drop-shadow-[0_0_10px_rgba(0,255,200,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,200,0.8)] transition-all" />
            <span className="font-bold text-lg text-[#00ffc8] drop-shadow-[0_0_10px_rgba(0,255,200,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,200,0.8)] transition-all">InfosecDairies</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-all ${
                isActive("/") 
                  ? "text-[#7bff81] drop-shadow-[0_0_15px_rgba(123,255,129,0.8)]" 
                  : "text-[#00ffc8] drop-shadow-[0_0_10px_rgba(0,255,200,0.6)] hover:text-[#7bff81] hover:drop-shadow-[0_0_15px_rgba(123,255,129,0.8)]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/labs"
              className={`text-sm font-medium transition-all ${
                isActive("/labs") 
                  ? "text-[#7bff81] drop-shadow-[0_0_15px_rgba(123,255,129,0.8)]" 
                  : "text-[#00ffc8] drop-shadow-[0_0_10px_rgba(0,255,200,0.6)] hover:text-[#7bff81] hover:drop-shadow-[0_0_15px_rgba(123,255,129,0.8)]"
              }`}
            >
              Labs
            </Link>
            <Link
              to="/auth"
              className="text-sm font-medium text-[#00ffc8] drop-shadow-[0_0_10px_rgba(0,255,200,0.6)] hover:text-[#7bff81] hover:drop-shadow-[0_0_15px_rgba(123,255,129,0.8)] transition-all"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
