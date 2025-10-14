import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
            <span className="font-bold text-lg gradient-text">InfosecDairies</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/labs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/labs") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Labs
            </Link>
            <Link to="/auth">
              <Button variant="default" size="sm">
                Login / Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
