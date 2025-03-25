import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  iconColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
  isLoading = false
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-4 w-12" />
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
        <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-end">
        <span className="text-2xl font-bold">{value}</span>
        {change && (
          <span 
            className={`text-xs ml-2 ${
              change.trend === 'up' 
                ? 'text-green-600 dark:text-green-400' 
                : change.trend === 'down' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {change.trend === 'up' && '+'}
            {change.value}
          </span>
        )}
      </div>
    </Card>
  );
}
