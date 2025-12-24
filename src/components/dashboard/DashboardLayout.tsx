import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";

type UserRole = "designer" | "customer" | "owner";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export const DashboardLayout = ({
  children,
  role,
  userName,
  userEmail,
  userAvatar,
}: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-muted flex w-full">
      <DashboardSidebar
        role={role}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 lg:px-8 py-3">
          <div className="flex items-center justify-end gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
