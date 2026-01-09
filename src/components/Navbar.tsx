import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/infosecdairies-logo.png";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="group">
            <img src={logo} alt="InfosecDairies" className="h-24 w-auto ml-4" />
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "text-[#7bff81]" 
                  : "text-[#00ffc8] hover:text-[#7bff81]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/courses") 
                  ? "text-[#7bff81]" 
                  : "text-[#00ffc8] hover:text-[#7bff81]"
              }`}
            >
              Certifications
            </Link>
            <Link
              to="/labs"
              className={`text-sm font-medium transition-colors ${
                isActive("/labs") 
                  ? "text-[#7bff81]" 
                  : "text-[#00ffc8] hover:text-[#7bff81]"
              }`}
            >
              Labs
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about") 
                  ? "text-[#7bff81]" 
                  : "text-[#00ffc8] hover:text-[#7bff81]"
              }`}
            >
              About
            </Link>
            <Link
              to="/auth"
              className="text-sm font-medium text-[#00ffc8] hover:text-[#7bff81] transition-colors"
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
