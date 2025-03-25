import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ParkingSpot, ParkingFacility, Vehicle } from '@shared/schema';
import { addHours, format } from 'date-fns';

interface BookingFormProps {
  selectedSpot?: ParkingSpot;
  onSuccess?: () => void;
}

const bookingFormSchema = z.object({
  facilityId: z.string().min(1, 'Please select a facility'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  duration: z.string().min(1, 'Please select a duration'),
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  spotId: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm({ selectedSpot, onSuccess }: BookingFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Fetch facilities
  const { data: facilities } = useQuery<ParkingFacility[]>({
    queryKey: ['/api/facilities'],
  });
  
  // Fetch user vehicles
  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      facilityId: selectedSpot ? selectedSpot.facilityId.toString() : '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
      duration: '2',
      vehicleId: '',
      spotId: selectedSpot ? selectedSpot.id.toString() : undefined,
    },
  });
  
  const bookingMutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      const startTime = new Date(`${values.date}T${values.time}`);
      const endTime = addHours(startTime, parseInt(values.duration));
      
      const bookingData = {
        vehicleId: parseInt(values.vehicleId),
        spotId: values.spotId 
          ? parseInt(values.spotId) 
          : 0, // This would need to find an available spot in a real app
        startTime,
        endTime,
        totalAmount: 1000, // $10.00, would be calculated based on duration and facility rates
        paymentStatus: 'pending',
      };
      
      const res = await apiRequest('POST', '/api/bookings', bookingData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Booking successful',
        description: 'Your parking spot has been reserved.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: 'Booking failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  function onSubmit(values: BookingFormValues) {
    bookingMutation.mutate(values);
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="facilityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!!selectedSpot}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parking facility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {facilities?.map(facility => (
                        <SelectItem key={facility.id} value={facility.id.toString()}>
                          {facility.name}
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
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">Full day</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicles?.length ? (
                        vehicles.map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="new" disabled>
                          No vehicles found. Please add a vehicle first.
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedSpot && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Selected Spot</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  You have selected spot {selectedSpot.spotNumber} in section {selectedSpot.section}.
                </p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? 'Processing...' : 'Reserve Spot'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
