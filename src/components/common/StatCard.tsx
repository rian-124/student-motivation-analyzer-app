import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  value: string | number;
  valueColor?: string;
  label: string;
  trend?: string;
  trendColor?: string;
}

export default function StatCard({
  icon: Icon,
  iconColor,
  value,
  valueColor,
  label,
  trend,
  trendColor,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5 space-y-2">
        {Icon && <Icon className={`w-5 h-5 ${iconColor ?? ""}`} />}
        <p className={`text-2xl font-bold ${valueColor ?? ""}`}>{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        {trend && (
          <p className={`text-xs ${trendColor ?? "text-muted-foreground"}`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
