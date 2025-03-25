import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: number;
  type: 'available' | 'reserved' | 'occupied' | 'maintenance' | 'alert';
  message: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
}

export function ActivityFeed({ activities, title = "Recent Activity" }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                activity.type === 'available' ? 'bg-green-500' :
                activity.type === 'reserved' ? 'bg-yellow-500' :
                activity.type === 'occupied' ? 'bg-red-500' :
                activity.type === 'maintenance' ? 'bg-orange-500' :
                'bg-purple-500'
              }`}></div>
              <div className="text-xs text-gray-900 dark:text-white">{activity.message}</div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No recent activity
          </div>
        )}
      </CardContent>
    </Card>
  );
}
