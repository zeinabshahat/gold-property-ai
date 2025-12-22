import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import jiwarLogo from "@/assets/jiwar-logo.jpg";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");

  const buyDropdownItems = [
    { to: "/properties", label: "Apartments for Sale" },
    { to: "/properties?type=rent", label: "Apartments for Rent" },
    { to: "/properties?type=new", label: "New Developments" },
    { to: "/properties?type=virtual", label: "Virtual Tour Properties (360°)" },
    { to: "/comparison", label: "Compare Properties" },
    { to: "/properties?featured=true", label: "Featured Properties" },
  ];

  const investDropdownItems = [
    { to: "/investment", label: "Investment Opportunities" },
    { to: "/calculator", label: "ROI Calculator" },
    { to: "/investment#plans", label: "Investment Plans" },
    { to: "/analytics", label: "Market Insights" },
  ];

  const renovationDropdownItems = [
    { to: "/dashboard/owner", label: "Start Simulation" },
    { to: "/dashboard/ai-assistant", label: "Upload Apartment Media" },
    { to: "/dashboard/owner", label: "View Recommendations" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "AR" : "EN");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50 shadow-luxury">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={jiwarLogo} 
              alt="Jiwar" 
              className="h-12 w-auto object-contain transition-smooth group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Buy Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("buy")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide transition-smooth ${
                  activeDropdown === "buy"
                    ? "text-accent bg-muted"
                    : "text-foreground hover:text-accent hover:bg-muted/50"
                }`}
              >
                <span>Buy</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "buy" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "buy" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-luxury border border-border/50 py-2 animate-fade-in">
                  {buyDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-5 py-3 text-sm text-foreground hover:text-accent hover:bg-muted/50 transition-smooth"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Invest Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("invest")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide transition-smooth ${
                  activeDropdown === "invest"
                    ? "text-accent bg-muted"
                    : "text-foreground hover:text-accent hover:bg-muted/50"
                }`}
              >
                <span>Invest</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "invest" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "invest" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-luxury border border-border/50 py-2 animate-fade-in">
                  {investDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-5 py-3 text-sm text-foreground hover:text-accent hover:bg-muted/50 transition-smooth"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Renovation Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("renovation")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-lg font-medium text-sm tracking-wide transition-smooth ${
                  activeDropdown === "renovation"
                    ? "text-accent bg-muted"
                    : "text-foreground hover:text-accent hover:bg-muted/50"
                }`}
              >
                <span>Renovation</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "renovation" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "renovation" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-luxury border border-border/50 py-2 animate-fade-in">
                  {renovationDropdownItems.map((item, index) => (
                    <Link
                      key={`${item.label}-${index}`}
                      to={item.to}
                      className="block px-5 py-3 text-sm text-foreground hover:text-accent hover:bg-muted/50 transition-smooth"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Center CTA */}
            <Link to="/properties">
              <Button className="ml-4 gradient-gold text-primary font-semibold px-6 hover:shadow-gold transition-smooth">
                Explore Properties
              </Button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-accent hover:bg-muted/50 transition-smooth"
            >
              <Globe className="h-4 w-4" />
              <span className="font-semibold">{language === "EN" ? "EN" : "AR"}</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{language === "EN" ? "AR" : "EN"}</span>
            </button>

            {/* Login */}
            <Link to="/auth">
              <Button variant="ghost" className="font-medium text-foreground hover:text-accent hover:bg-muted/50">
                Login
              </Button>
            </Link>

            {/* Sign Up */}
            <Link to="/auth">
              <Button variant="outline" className="font-medium border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-4 border-t border-border/50 animate-fade-in">
            {/* Buy Section */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4">Buy</p>
              {buyDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-accent hover:bg-muted/50 rounded-lg transition-smooth"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Invest Section */}
            <div className="space-y-2 pt-4 border-t border-border/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4">Invest</p>
              {investDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-accent hover:bg-muted/50 rounded-lg transition-smooth"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Renovation Section */}
            <div className="space-y-2 pt-4 border-t border-border/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4">Renovation</p>
              {renovationDropdownItems.map((item, index) => (
                <Link
                  key={`mobile-${item.label}-${index}`}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-accent hover:bg-muted/50 rounded-lg transition-smooth"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-border/30 space-y-3 px-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 py-2 text-sm font-medium text-foreground"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "EN" ? "English" : "العربية"}</span>
              </button>

              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                <Button variant="outline" className="w-full font-medium">
                  Login
                </Button>
              </Link>

              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                <Button className="w-full gradient-gold text-primary font-semibold">
                  Sign Up
                </Button>
              </Link>

              <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="block">
                <Button className="w-full gradient-gold text-primary font-semibold mt-2">
                  Explore Properties
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
