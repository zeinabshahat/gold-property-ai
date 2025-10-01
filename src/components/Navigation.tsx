import { Link, useLocation } from "react-router-dom";
import { Building2, Calculator, BarChart3, TrendingUp, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { to: "/", label: "Home", icon: Building2 },
    { to: "/calculator", label: "Calculator", icon: Calculator },
    { to: "/comparison", label: "Compare", icon: BarChart3 },
    { to: "/analytics", label: "Analytics", icon: TrendingUp },
    { to: "/investment", label: "Portfolio", icon: TrendingUp },
    { to: "/offers", label: "Offers", icon: FileText },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Building2 className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">Smart Real Estate</span>
              <span className="text-xs text-gradient-gold">عقارات بذكاء</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive(link.to)
                      ? "bg-accent text-accent-foreground shadow-gold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button className="gradient-gold text-primary font-semibold hover:shadow-gold transition-smooth">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive(link.to)
                      ? "bg-accent text-accent-foreground shadow-gold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <Button className="w-full mt-4 gradient-gold text-primary font-semibold">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
