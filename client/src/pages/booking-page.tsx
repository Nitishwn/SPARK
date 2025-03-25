import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { ParkingFacility, ParkingSpot, Vehicle } from '@shared/schema';
import { BookingForm } from '@/components/forms/booking-form';
import { ParkingMap } from '@/components/dashboard/parking-map';
import { AdasConnectModal } from '@/components/dashboard/adas-connect-modal';
import { AdasNavigation } from '@/components/dashboard/adas-navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Plus, Car, Navigation } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertVehicleSchema } from '@shared/schema';

// Price card information
const pricingInfo = [
  { type: 'Standard Parking', price: '$2.50/hour' },
  { type: 'Premium Parking (Reserved)', price: '$4.00/hour' },
  { type: 'Full Day Rate', price: '$18.00' },
  { type: 'Monthly Pass', price: '$150.00' },
  { type: 'EV Charging', price: '$0.30/kWh' },
];

export default function BookingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [addVehicleDialogOpen, setAddVehicleDialogOpen] = useState(false);
  const [adasModalOpen, setAdasModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Fetch facilities
  const { data: facilities = [] } = useQuery<ParkingFacility[]>({
    queryKey: ['/api/facilities'],
  });
  
  // Select first facility by default
  React.useEffect(() => {
    if (facilities.length > 0 && !selectedFacilityId) {
      setSelectedFacilityId(facilities[0].id);
    }
  }, [facilities, selectedFacilityId]);
  
  // Get the selected facility object
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || { id: 0, name: 'Loading...' };
  
  // Fetch spots for selected facility
  const { data: spots = [] } = useQuery<ParkingSpot[]>({
    queryKey: ['/api/facilities', selectedFacilityId, 'spots'],
    enabled: !!selectedFacilityId,
  });
  
  // Fetch user's vehicles
  const { data: vehicles = [] } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });
  
  // Form schema for adding a vehicle
  const addVehicleSchema = insertVehicleSchema.omit({ userId: true });
  
  // Setup form for adding a vehicle
  const form = useForm<z.infer<typeof addVehicleSchema>>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      licensePlate: '',
      make: '',
      model: '',
      year: undefined,
    },
  });
  
  // Mutation for adding a vehicle
  const addVehicleMutation = useMutation({
    mutationFn: async (values: z.infer<typeof addVehicleSchema>) => {
      const res = await apiRequest('POST', '/api/vehicles', values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Vehicle added',
        description: 'Your vehicle has been added successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/vehicles'] });
      setAddVehicleDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to add vehicle',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Handle adding a vehicle
  function onAddVehicle(values: z.infer<typeof addVehicleSchema>) {
    addVehicleMutation.mutate(values);
  }
  
  // Handle spot selection
  const handleSpotSelect = (spot: ParkingSpot) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
      
      // Simulate entering parking facility after 3 seconds
      // In a real app, this would be triggered by geolocation or beacon
      setTimeout(() => {
        setAdasModalOpen(true);
      }, 3000);
    }
  };
  
  // Handle ADAS confirmation
  const handleAdasConfirm = () => {
    setAdasModalOpen(false);
    setIsNavigating(true);
  };
  
  // Handle navigation completed
  const handleNavigationComplete = () => {
    setIsNavigating(false);
    toast({
      title: "Parking Completed",
      description: "Your vehicle has been successfully parked.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isAdmin={user?.isAdmin} />
      
      {/* Main Content */}
      <div className="ml-16 md:ml-64 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book Parking</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Reserve your spot in advance
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Reserve Parking</CardTitle>
                <CardDescription>
                  Complete the form below to reserve your parking spot.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm selectedSpot={selectedSpot || undefined} />
                
                {/* Add Vehicle Button */}
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setAddVehicleDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Center/Right Column - Map and Pricing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Parking Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Parking Spot</CardTitle>
                <CardDescription>
                  Choose a facility and find an available parking spot.
                </CardDescription>
                
                {/* Facility Selector */}
                <div className="w-full max-w-xs mt-4">
                  <Select 
                    value={selectedFacilityId?.toString() || ''} 
                    onValueChange={(value) => setSelectedFacilityId(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a facility" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilities.map((facility) => (
                        <SelectItem key={facility.id} value={facility.id.toString()}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="map">
                  <div className="px-6 mb-3">
                    <TabsList className="w-full">
                      <TabsTrigger value="map" className="flex-1">Map View</TabsTrigger>
                      <TabsTrigger value="list" className="flex-1">List View</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="map" className="m-0">
                    <div className="h-[300px]">
                      <ParkingMap 
                        spots={spots}
                        selectedFacility={selectedFacility}
                        onSpotSelect={handleSpotSelect}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list" className="m-0 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
                      {spots
                        .filter(spot => spot.status === 'available')
                        .map(spot => (
                          <div 
                            key={spot.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-md p-3 cursor-pointer hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            onClick={() => handleSpotSelect(spot)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{spot.spotNumber}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Section {spot.section}, Floor {spot.floor}
                                </div>
                                <div className="text-sm">
                                  <span className="capitalize">{spot.spotType}</span>
                                </div>
                              </div>
                              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                                Available
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      {spots.filter(spot => spot.status === 'available').length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                          No available spots in this facility at the moment.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingInfo.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.type}</span>
                      <span className="text-gray-900 dark:text-white">{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">SPARK Pro Membership</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    Get 20% off all parking rates, priority booking, and exclusive benefits for $25/month.
                  </p>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Add Vehicle Dialog */}
      <Dialog open={addVehicleDialogOpen} onOpenChange={setAddVehicleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter your vehicle details to add it to your account.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddVehicle)} className="space-y-4">
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ABC-1234" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Toyota" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Camry" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === '' ? undefined : parseInt(value, 10));
                        }}
                        // Convert null to undefined to avoid type errors
                        value={field.value === null ? undefined : field.value}
                        placeholder="2023"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={addVehicleMutation.isPending}
                >
                  {addVehicleMutation.isPending ? (
                    <>Adding Vehicle...</>
                  ) : (
                    <>
                      <Car className="h-4 w-4 mr-2" />
                      Add Vehicle
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ADAS Connection Modal */}
      <AdasConnectModal 
        isOpen={adasModalOpen} 
        onClose={() => setAdasModalOpen(false)}
        onConfirm={handleAdasConfirm}
        selectedSpot={selectedSpot || undefined}
      />

      {/* ADAS Navigation Interface */}
      {isNavigating && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <AdasNavigation 
              spot={selectedSpot || undefined} 
              onComplete={handleNavigationComplete} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
