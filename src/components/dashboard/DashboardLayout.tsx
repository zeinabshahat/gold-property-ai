import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

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
  return (
    <div className="min-h-screen bg-muted flex w-full">
      <DashboardSidebar
        role={role}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
