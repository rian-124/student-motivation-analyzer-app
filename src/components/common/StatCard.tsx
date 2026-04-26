import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isUp: boolean | null;
  };
  variant?: "blue" | "emerald" | "rose" | "amber" | "brand";
  className?: string;
}

const variants = {
  blue: {
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-500",
  },
  emerald: {
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-500",
  },
  rose: {
    iconBg: "bg-rose-50 dark:bg-rose-900/20",
    iconColor: "text-rose-500",
  },
  amber: {
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-500",
  },
  brand: {
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
  }
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant = "brand",
  className,
}: StatCardProps) {
  const styles = variants[variant];

  return (
    <Card className={cn("border-none shadow-sm bg-white dark:bg-slate-900", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
              {value}
            </h3>
          </div>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", styles.iconBg)}>
            <Icon className={cn("w-5 h-5", styles.iconColor)} />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center gap-2">
            {trend.isUp !== null && (
              <div className={cn(
                "flex items-center gap-0.5 text-[11px] font-bold",
                trend.isUp ? "text-emerald-600" : "text-rose-600"
              )}>
                {trend.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trend.value}
              </div>
            )}
            <span className="text-[11px] text-slate-400 font-medium">
              {trend.isUp === null ? "Tidak ada perubahan" : "vs bulan lalu"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
