import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "gold" | "navy";
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  variant = "default",
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border transition-all hover-gold",
        variant === "gold"
          ? "gradient-gold text-primary"
          : variant === "navy"
          ? "gradient-navy text-primary-foreground"
          : "bg-card text-card-foreground border-border"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={cn(
              "text-sm font-medium mb-1",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {label}
          </p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p
              className={cn(
                "text-xs mt-2 flex items-center gap-1",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            variant === "default"
              ? "bg-accent/10 text-accent"
              : "bg-background/20"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
