import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { ParkingMap } from '@/components/dashboard/parking-map';
import { OccupancyChart } from '@/components/dashboard/occupancy-chart';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { BookingTable } from '@/components/dashboard/booking-table';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ParkingFacility, ParkingSpot } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
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
import { ChevronDown, Users, Receipt, BarChart, Settings, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Type for formatted bookings with additional details
type BookingWithDetails = {
  id: number;
  userId: number;
  username: string;
  spotId: number;
  spotNumber: string;
  facilityName: string;
  startTime: Date;
  endTime: Date;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  vehicleInfo: string;
};

// Type for user details
type UserDetail = {
  id: number;
  username: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  bookingsCount: number;
  isAdmin: boolean;
};

export default function AdminPage() {
  const { user } = useAuth();
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [selectedSpotStatus, setSelectedSpotStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const [viewPeriod, setViewPeriod] = useState('today');
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  
  // Ensure user is admin, redirect handled by ProtectedRoute
  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Checking permissions...</p>
      </div>
    );
  }
  
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
  
  // Fetch recent bookings
  const { data: recentBookings = [] } = useQuery<BookingWithDetails[]>({
    queryKey: ['/api/admin/bookings/recent'],
    queryFn: async () => {
      const response = await fetch('/api/admin/bookings/recent?limit=10', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch recent bookings');
      return response.json();
    },
  });
  
  // Calculate stats
  const totalSpots = spots.length;
  const availableSpots = spots.filter(s => s.status === 'available').length;
  const occupiedSpots = spots.filter(s => s.status === 'occupied').length;
  const reservedSpots = spots.filter(s => s.status === 'reserved').length;
  
  // Mutation for updating spot status
  const updateSpotStatusMutation = useMutation({
    mutationFn: async (params: { id: number; status: string }) => {
      await apiRequest('PUT', `/api/admin/spots/${params.id}/status`, { status: params.status });
    },
    onSuccess: () => {
      // Invalidate and refetch spots
      queryClient.invalidateQueries({ queryKey: ['/api/facilities', selectedFacilityId, 'spots'] });
      setStatusChangeDialogOpen(false);
    },
  });
  
  // Handle spot selection
  const handleSpotSelect = (spot: ParkingSpot) => {
    setSelectedSpotId(spot.id);
    setSelectedSpotStatus(spot.status);
    setStatusChangeDialogOpen(true);
  };
  
  // Handle status change
  const handleStatusChange = () => {
    if (selectedSpotId && selectedSpotStatus) {
      updateSpotStatusMutation.mutate({
        id: selectedSpotId,
        status: selectedSpotStatus,
      });
    }
  };
  
  // Mock data for alerts
  const systemAlerts = [
    { 
      id: 1, 
      type: 'error', 
      title: 'Sensor Malfunction', 
      message: 'Sensor at spot B7 reporting inconsistent data. Maintenance required.',
      time: '15 minutes ago' 
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'High Occupancy Warning', 
      message: 'Lot C approaching 95% capacity. Consider directing users to alternate locations.',
      time: '32 minutes ago' 
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'System Update', 
      message: 'New firmware available for parking sensors. Schedule update during off-peak hours.',
      time: '2 hours ago' 
    },
  ];
  
  // Mock user data
  const users: UserDetail[] = [
    { 
      id: 1, 
      username: 'johndoe', 
      email: 'john.doe@example.com', 
      fullName: 'John Doe', 
      createdAt: new Date('2023-01-15'), 
      bookingsCount: 12,
      isAdmin: false,
    },
    { 
      id: 2, 
      username: 'janedoe', 
      email: 'jane.doe@example.com', 
      fullName: 'Jane Doe', 
      createdAt: new Date('2023-02-10'), 
      bookingsCount: 8,
      isAdmin: false,
    },
    { 
      id: 3, 
      username: 'bobsmith', 
      email: 'bob.smith@example.com', 
      fullName: 'Bob Smith', 
      createdAt: new Date('2023-03-05'), 
      bookingsCount: 5,
      isAdmin: false,
    },
  ];
  
  // User table columns
  const userColumns: ColumnDef<UserDetail>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'fullName',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'bookingsCount',
      header: 'Bookings',
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => (
        <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.isAdmin ? 'default' : 'secondary'}>
          {row.original.isAdmin ? 'Admin' : 'User'}
        </Badge>
      ),
    },
  ];
  
  // Bookings table columns
  const bookingColumns: ColumnDef<BookingWithDetails>[] = [
    {
      accessorKey: 'username',
      header: 'User',
    },
    {
      accessorKey: 'spotNumber',
      header: 'Spot',
    },
    {
      accessorKey: 'facilityName',
      header: 'Facility',
    },
    {
      accessorKey: 'vehicleInfo',
      header: 'Vehicle',
    },
    {
      accessorKey: 'startTime',
      header: 'Start Time',
      cell: ({ row }) => (
        <div>{new Date(row.original.startTime).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        let variant = 'default';
        
        if (status === 'active') variant = 'success';
        else if (status === 'completed') variant = 'secondary';
        else if (status === 'cancelled') variant = 'destructive';
        
        return (
          <Badge variant={variant as any}>{
            status.charAt(0).toUpperCase() + status.slice(1)
          }</Badge>
        );
      },
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment',
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        let variant = 'default';
        
        if (status === 'paid') variant = 'success';
        else if (status === 'pending') variant = 'warning';
        else if (status === 'refunded') variant = 'destructive';
        
        return (
          <Badge variant={variant as any}>{
            status.charAt(0).toUpperCase() + status.slice(1)
          }</Badge>
        );
      },
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isAdmin={true} />
      
      {/* Main Content */}
      <div className="ml-16 md:ml-64 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your parking facilities and users
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Admin Tabs */}
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
            
            {/* Recent Bookings and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BookingTable
                bookings={recentBookings}
                title="Recent Bookings"
              />
              
              <AlertsPanel alerts={systemAlerts} />
            </div>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h2>
                <Button size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              <DataTable 
                columns={userColumns} 
                data={users} 
                pageSize={10}
              />
            </div>
          </TabsContent>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Bookings</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    <Receipt className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <DataTable 
                columns={bookingColumns} 
                data={recentBookings} 
                pageSize={10}
              />
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h2>
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OccupancyChart 
                  type={viewPeriod === 'today' ? 'daily' : 
                      viewPeriod === 'week' ? 'weekly' : 'monthly'} 
                  title="Occupancy Trends"
                />
                
                <OccupancyChart 
                  type="monthly" 
                  title="Revenue Analytics"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Status Change Dialog */}
      <AlertDialog open={statusChangeDialogOpen} onOpenChange={setStatusChangeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Spot Status</AlertDialogTitle>
            <AlertDialogDescription>
              Update the status for spot #{spots.find(s => s.id === selectedSpotId)?.spotNumber}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <Select 
              value={selectedSpotStatus} 
              onValueChange={setSelectedSpotStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={updateSpotStatusMutation.isPending}
            >
              {updateSpotStatusMutation.isPending ? 'Updating...' : 'Update Status'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
