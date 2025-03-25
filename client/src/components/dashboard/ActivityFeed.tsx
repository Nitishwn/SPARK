import { useQuery } from "@tanstack/react-query";
import { Activity } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Car, Bookmark, DollarSign, Clock, 
  UserPlus, LogIn, CreditCard
} from "lucide-react";

interface ActivityFeedProps {
  limit?: number;
}

export function ActivityFeed({ limit = 3 }: ActivityFeedProps) {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: [`/api/activities?limit=${limit}`],
  });

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "spot_occupied":
      case "spot_updated":
      case "spot_available":
        return <Car className="h-4 w-4" />;
      case "booking_created":
        return <Bookmark className="h-4 w-4" />;
      case "payment_processed":
        return <DollarSign className="h-4 w-4" />;
      case "user_registered":
        return <UserPlus className="h-4 w-4" />;
      case "user_login":
        return <LogIn className="h-4 w-4" />;
      case "booking_updated":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Function to format time ago
  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Function to get badge based on activity type
  const getActivityBadge = (type: string) => {
    switch (type) {
      case "spot_occupied":
        return <Badge variant="destructive">Occupied</Badge>;
      case "spot_available":
        return <Badge variant="success" className="bg-green-500">Available</Badge>;
      case "booking_created":
        return <Badge variant="secondary">New Booking</Badge>;
      case "payment_processed":
        return <Badge variant="outline" className="border-primary text-primary">Payment</Badge>;
      case "user_registered":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">New User</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {Array(limit).fill(0).map((_, i) => (
            <div key={i} className="flex items-start space-x-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-200 dark:divide-gray-800">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="py-4 flex items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <p className="font-medium">{activity.description}</p>
                  <span className="ml-2">{getActivityBadge(activity.type)}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.metadata ? JSON.parse(activity.metadata).spotId : ""}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {getTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-center text-gray-500 dark:text-gray-400">No recent activity</p>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900">
        <Button variant="ghost" size="sm" className="w-full">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
}
