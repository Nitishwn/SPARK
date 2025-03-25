import { useQuery } from "@tanstack/react-query";
import { Booking, Vehicle, Location } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow, format } from "date-fns";

export function BookingHistory() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });
  
  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });
  
  const { data: locations, isLoading: isLoadingLocations } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });
  
  const isLoading = isLoadingBookings || isLoadingVehicles || isLoadingLocations;
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between mb-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Helper function to get vehicle info
  const getVehicleInfo = (vehicleId: number) => {
    const vehicle = vehicles?.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : "Unknown vehicle";
  };
  
  // Helper function to get location info
  const getLocationName = (spotId: number) => {
    if (!locations) return "Unknown location";
    // This is a simplification - in a real app we would have a direct way to get location from spot
    return locations[0]?.name || "Unknown location";
  };
  
  // Helper function to format date and time
  const formatDateTime = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy • h:mm a");
  };
  
  // Get formatted duration
  const getDuration = (startDate: Date, endDate: Date | null) => {
    if (!endDate) return "In progress";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };
  
  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-600 dark:text-blue-400";
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "cancelled":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{getLocationName(booking.spotId)}</span>
                  <span className={`text-sm ${getStatusClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {formatDateTime(booking.startTime)}
                  {booking.endTime && ` - ${format(new Date(booking.endTime), "h:mm a")}`}
                  {" • "}
                  {getVehicleInfo(booking.vehicleId)}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Spot #{booking.spotId}</span>
                  <span className="font-medium">
                    {booking.amount ? `$${(booking.amount / 100).toFixed(2)}` : "Free"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No booking history found. Book a parking spot to see it here.
            </p>
          )}
          
          {bookings && bookings.length > 0 && (
            <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 inline-block">
              View all booking history →
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
