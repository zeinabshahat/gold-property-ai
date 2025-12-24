import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Image,
  Wallet,
  Star,
  Settings,
  Home,
  Calendar,
  Heart,
  MessageSquare,
  CreditCard,
  Users,
  TrendingUp,
  Menu,
  X,
  Sparkles,
  Calculator,
} from "lucide-react";

type UserRole = "designer" | "customer" | "owner";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: Record<UserRole, SidebarItem[]> = {
  designer: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/designer" },
    { icon: Briefcase, label: "Projects", href: "/dashboard/designer/projects" },
    { icon: Image, label: "Portfolio", href: "/dashboard/designer/portfolio" },
    { icon: Wallet, label: "Wallet & Earnings", href: "/dashboard/designer/wallet" },
    { icon: Star, label: "Reviews", href: "/dashboard/designer/reviews" },
    { icon: Sparkles, label: "AI Insights", href: "/dashboard/designer/insights" },
    { icon: Settings, label: "Settings", href: "/dashboard/designer/settings" },
  ],
  customer: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/customer" },
    { icon: Home, label: "My Properties", href: "/dashboard/customer/properties" },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/customer/bookings" },
    { icon: Heart, label: "Saved Properties", href: "/dashboard/customer/saved" },
    { icon: MessageSquare, label: "My Requests", href: "/dashboard/customer/requests" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/customer/payments" },
    { icon: Calculator, label: "Renovation Simulator", href: "/dashboard/customer/renovation" },
    { icon: TrendingUp, label: "Investment Insights", href: "/dashboard/customer/insights" },
    { icon: Settings, label: "Settings", href: "/dashboard/customer/settings" },
  ],
  owner: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/owner" },
    { icon: Home, label: "My Listings", href: "/dashboard/owner/listings" },
    { icon: Calendar, label: "Bookings", href: "/dashboard/owner/bookings" },
    { icon: Users, label: "Tenants / Buyers", href: "/dashboard/owner/tenants" },
    { icon: Wallet, label: "Earnings", href: "/dashboard/owner/earnings" },
    { icon: Star, label: "Reviews", href: "/dashboard/owner/reviews" },
    { icon: Calculator, label: "Renovation Simulator", href: "/dashboard/owner/renovation" },
    { icon: TrendingUp, label: "Investment Insights", href: "/dashboard/owner/insights" },
    { icon: Settings, label: "Settings", href: "/dashboard/owner/settings" },
  ],
};

interface DashboardSidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export const DashboardSidebar = ({
  role,
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
}: DashboardSidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const items = sidebarItems[role];

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card border-r border-border flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* User Profile Section */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4 ring-4 ring-accent/20">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {userName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground text-lg">{userName}</h3>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
            <span className="mt-2 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full capitalize">
              {role === "owner" ? "Property Owner" : role === "designer" ? "Interior Designer" : "Customer"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-luxury"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "text-accent")} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
