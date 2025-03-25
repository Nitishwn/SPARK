import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Car, CheckCircle, Ban, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
}

function StatCard({ title, value, icon: Icon, iconColor, iconBgColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBgColor} p-3 rounded-full`}>
            <Icon className={`${iconColor} text-xl`} />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsOverviewProps {
  totalSpots: number;
  availableSpots: number;
  occupiedSpots: number;
  reservedSpots: number;
}

export function StatsOverview({ totalSpots, availableSpots, occupiedSpots, reservedSpots }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Spots"
        value={totalSpots}
        icon={Car}
        iconColor="text-primary"
        iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      />
      
      <StatCard
        title="Available"
        value={availableSpots}
        icon={CheckCircle}
        iconColor="text-green-500"
        iconBgColor="bg-green-100 dark:bg-green-900/30"
      />
      
      <StatCard
        title="Occupied"
        value={occupiedSpots}
        icon={Ban}
        iconColor="text-red-500"
        iconBgColor="bg-red-100 dark:bg-red-900/30"
      />
      
      <StatCard
        title="Reserved"
        value={reservedSpots}
        icon={Clock}
        iconColor="text-yellow-500"
        iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
      />
    </div>
  );
}
