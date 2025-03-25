import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Location, Vehicle } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

// Extend booking schema with validation
const bookingFormSchema = z.object({
  locationId: z.string().min(1, "Please select a location"),
  vehicleId: z.string().min(1, "Please select a vehicle"),
  date: z.string().min(1, "Please select a date"),
  startTime: z.string().min(1, "Please select a time"),
  duration: z.string().min(1, "Please select a duration"),
  spotId: z.string().min(1, "Please select a parking spot"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Form definition
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      locationId: "",
      vehicleId: "",
      date: new Date().toISOString().split('T')[0], // Today's date
      startTime: "",
      duration: "",
      spotId: "",
    },
  });
  
  // Fetch locations
  const { data: locations, isLoading: isLoadingLocations } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });
  
  // Fetch user's vehicles
  const { data: vehicles, isLoading: isLoadingVehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
    enabled: !!user,
  });
  
  // Fetch available spots for the selected location
  const selectedLocationId = parseInt(form.watch("locationId") || "0");
  const { data: spots, isLoading: isLoadingSpots } = useQuery({
    queryKey: [`/api/locations/${selectedLocationId}/spots`],
    enabled: selectedLocationId > 0,
  });
  
  // Filter available spots
  const availableSpots = spots?.filter(spot => spot.status === "available") || [];
  
  // Calculate estimated cost when form values change
  const watchDuration = form.watch("duration");
  const watchLocationId = form.watch("locationId");
  
  // Update estimated cost when duration or location changes
  React.useEffect(() => {
    if (watchDuration && watchLocationId) {
      const location = locations?.find(loc => loc.id === parseInt(watchLocationId));
      if (location) {
        let hours = 0;
        switch (watchDuration) {
          case "30m": hours = 0.5; break;
          case "1h": hours = 1; break;
          case "2h": hours = 2; break;
          case "4h": hours = 4; break;
          case "8h": hours = 8; break;
        }
        
        // Calculate cost (location rate is stored in cents)
        const cost = (location.hourlyRate * hours) / 100;
        setEstimatedCost(cost);
      }
    }
  }, [watchDuration, watchLocationId, locations]);
  
  // Create booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      // Combine date and time
      const startDateTime = new Date(`${values.date}T${values.startTime}`);
      
      // Calculate end time based on duration
      let endDateTime = new Date(startDateTime);
      switch (values.duration) {
        case "30m": endDateTime.setMinutes(endDateTime.getMinutes() + 30); break;
        case "1h": endDateTime.setHours(endDateTime.getHours() + 1); break;
        case "2h": endDateTime.setHours(endDateTime.getHours() + 2); break;
        case "4h": endDateTime.setHours(endDateTime.getHours() + 4); break;
        case "8h": endDateTime.setHours(endDateTime.getHours() + 8); break;
      }
      
      // Create the booking
      const res = await apiRequest("POST", "/api/bookings", {
        spotId: parseInt(values.spotId),
        vehicleId: parseInt(values.vehicleId),
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        amount: estimatedCost ? Math.round(estimatedCost * 100) : 0, // Convert to cents
        status: "active"
      });
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking successful",
        description: "Your parking spot has been reserved",
        variant: "default",
      });
      
      // Reset form
      form.reset();
      setEstimatedCost(null);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: [`/api/locations/${selectedLocationId}/spots`] });
    },
    onError: (error) => {
      toast({
        title: "Booking failed",
        description: error.message || "An error occurred while booking the parking spot",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  function onSubmit(values: BookingFormValues) {
    bookingMutation.mutate(values);
  }
  
  const isLoading = isLoadingLocations || isLoadingVehicles || bookingMutation.isPending;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a Parking Spot</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select 
                    disabled={isLoading} 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map((location) => (
                        <SelectItem key={location.id} value={location.id.toString()}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input 
                        type="time" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="2h">2 hours</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="8h">All day</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle</FormLabel>
                    <Select 
                      disabled={isLoading} 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicles?.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                          </SelectItem>
                        ))}
                        <SelectItem value="new">+ Add new vehicle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {selectedLocationId > 0 && (
              <FormField
                control={form.control}
                name="spotId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking Spot</FormLabel>
                    <Select 
                      disabled={isLoading || isLoadingSpots} 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a spot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableSpots.map((spot) => (
                          <SelectItem key={spot.id} value={spot.id.toString()}>
                            Spot {spot.spotNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost</span>
                <span className="font-semibold">{estimatedCost ? `$${estimatedCost.toFixed(2)}` : '$0.00'}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                You will only be charged for the actual time used
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {bookingMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Book Now"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
