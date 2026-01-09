import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isLabsPage = location.pathname === "/labs";
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className={`${isLabsPage ? 'relative' : 'fixed top-0 left-0 right-0'} z-50 bg-[#0d1117]/95 backdrop-blur-sm border-b border-[#21262d]`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="font-bold text-lg text-[#00ffc8] group-hover:text-[#7bff81] transition-colors whitespace-nowrap">
              InfosecDairies
            </span>
          </Link>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "text-[#7bff81]" 
                  : "text-[#c9d1d9] hover:text-[#00ffc8]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/courses") 
                  ? "text-[#7bff81]" 
                  : "text-[#c9d1d9] hover:text-[#00ffc8]"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/labs"
              className={`text-sm font-medium transition-colors ${
                isActive("/labs") 
                  ? "text-[#7bff81]" 
                  : "text-[#c9d1d9] hover:text-[#00ffc8]"
              }`}
            >
              Labs
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about") 
                  ? "text-[#7bff81]" 
                  : "text-[#c9d1d9] hover:text-[#00ffc8]"
              }`}
            >
              About
            </Link>
          </div>
          
          {/* Right Section - Search & Auth */}
          <div className="flex items-center gap-6">
            {isLabsPage && (
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="bg-[#010409] border border-[#21262d] rounded-md pl-10 pr-4 py-2 text-sm text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:border-[#00ffc8] w-56"
                />
              </div>
            )}
            <Link
              to="/auth"
              className="text-sm font-medium px-4 py-2 rounded-md border border-[#00ffc8] text-[#00ffc8] hover:bg-[#00ffc8]/10 transition-colors whitespace-nowrap"
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
