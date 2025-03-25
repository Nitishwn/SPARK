import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { ParkingMap } from '@/components/dashboard/parking-map';
import { OccupancyChart } from '@/components/dashboard/occupancy-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { BookingTable } from '@/components/dashboard/booking-table';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { ParkingFacility, ParkingSpot, Booking, Vehicle } from '@shared/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, AlertTriangle, Info, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BookingForm } from '@/components/forms/booking-form';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [viewPeriod, setViewPeriod] = useState('today');
  
  // Fetch facilities
  const { data: facilities = [] } = useQuery<ParkingFacility[]>({
    queryKey: ['/api/facilities'],
  });
  
  // Select first facility by default if not selected yet
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
  
  // Fetch user's active bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ['/api/bookings/active'],
  });
  
  // Fetch user's vehicles
  const { data: vehicles = [] } = useQuery<Vehicle[]>({
    queryKey: ['/api/vehicles'],
  });
  
  // Mock data for activity feed
  const recentActivities = [
    { id: 1, type: 'available', message: 'Spot A12 now available', time: '2m ago' },
    { id: 2, type: 'reserved', message: 'Spot B5 reserved', time: '5m ago' },
    { id: 3, type: 'occupied', message: 'Your reservation for spot C7 is active', time: '12m ago' },
    { id: 4, type: 'alert', message: 'Traffic congestion near Downtown Facility', time: '20m ago' },
  ];
  
  // Mock alerts
  const systemAlerts = [
    { 
      id: 1, 
      type: 'info', 
      title: 'Maintenance Scheduled', 
      message: 'Routine maintenance will occur at West Side Garage on Sunday from 2-4am.',
      time: '1 hour ago' 
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'Heavy Traffic Expected', 
      message: 'Downtown area expecting heavy traffic due to local event this afternoon.',
      time: '3 hours ago' 
    },
  ];
  
  // Calculate stats
  const totalSpots = spots.length;
  const availableSpots = spots.filter(s => s.status === 'available').length;
  const occupiedSpots = spots.filter(s => s.status === 'occupied').length;
  const reservedSpots = spots.filter(s => s.status === 'reserved').length;
  
  // Format bookings for display
  const formattedBookings = bookings.map(booking => {
    const spot = spots.find(s => s.id === booking.spotId) || { spotNumber: 'Unknown', section: '' };
    const facility = facilities.find(f => f.id === (spot as ParkingSpot).facilityId) || { name: 'Unknown' };
    const vehicle = vehicles.find(v => v.id === booking.vehicleId) || { make: 'Unknown', model: 'Unknown', licensePlate: 'Unknown' };
    
    return {
      ...booking,
      spotNumber: `${spot.spotNumber}`,
      facilityName: facility.name,
      vehicleInfo: `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`,
    };
  });
  
  // Handle spot selection
  const handleSpotSelect = (spot: ParkingSpot) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
      setBookingModalOpen(true);
    }
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome back, {user?.fullName || user?.username}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button variant="outline" size="sm" asChild>
              <a href="/booking">Book Parking</a>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  {systemAlerts.length > 0 && (
                    <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                {systemAlerts.map(alert => (
                  <DropdownMenuItem key={alert.id} className="py-2 px-4 cursor-default">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-0.5">
                        {alert.type === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Info className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                {systemAlerts.length === 0 && (
                  <DropdownMenuItem className="py-2 px-4 cursor-default">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Facility Selector */}
        <div className="w-full max-w-xs mb-6">
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
        
        {/* Stats Overview */}
        <StatsOverview 
          totalSpots={totalSpots}
          availableSpots={availableSpots}
          occupiedSpots={occupiedSpots}
          reservedSpots={reservedSpots}
        />
        
        {/* Parking Map */}
        <ParkingMap 
          spots={spots}
          selectedFacility={selectedFacility}
          onSpotSelect={handleSpotSelect}
        />
        
        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Occupancy Analytics</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {viewPeriod === 'today' ? 'Today' : 
                     viewPeriod === 'week' ? 'This Week' : 'This Month'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setViewPeriod('today')}>Today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewPeriod('week')}>This Week</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewPeriod('month')}>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <OccupancyChart 
              type={viewPeriod === 'today' ? 'daily' : 
                    viewPeriod === 'week' ? 'weekly' : 'monthly'} 
              title=""
            />
          </div>
          
          <div>
            <ActivityFeed 
              activities={recentActivities}
              title="Recent Activity"
            />
          </div>
        </div>
        
        {/* Active Bookings Table */}
        <div className="mb-6">
          <BookingTable 
            bookings={formattedBookings}
            title="Your Active Bookings"
          />
        </div>
      </div>
      
      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Parking Spot</DialogTitle>
            <DialogDescription>
              Complete the form below to reserve your parking spot.
            </DialogDescription>
          </DialogHeader>
          <BookingForm 
            selectedSpot={selectedSpot || undefined}
            onSuccess={() => setBookingModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
