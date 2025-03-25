import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ParkingSpot } from '@shared/schema';

interface ParkingMapProps {
  spots: ParkingSpot[];
  selectedFacility: { id: number; name: string };
  onSpotSelect?: (spot: ParkingSpot) => void;
}

export function ParkingMap({ spots, selectedFacility, onSpotSelect }: ParkingMapProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const availableCount = spots.filter(spot => spot.status === 'available').length;
  const occupiedCount = spots.filter(spot => spot.status === 'occupied').length;
  const reservedCount = spots.filter(spot => spot.status === 'reserved').length;
  
  // Group spots by section
  const spotsBySection = spots.reduce((acc, spot) => {
    if (!acc[spot.section || '']) {
      acc[spot.section || ''] = [];
    }
    acc[spot.section || ''].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);
  
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 h-96 bg-gray-100 dark:bg-gray-800 relative">
            {/* Map visualization */}
            <div className="w-full h-full p-4 overflow-auto">
              {Object.entries(spotsBySection).map(([section, sectionSpots]) => (
                <div key={section} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Section {section}</h3>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {sectionSpots.map(spot => (
                      <div 
                        key={spot.id}
                        className={`
                          w-12 h-12 rounded border flex items-center justify-center cursor-pointer
                          ${spot.status === 'available' ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300' :
                            spot.status === 'occupied' ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300' :
                            spot.status === 'reserved' ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 text-yellow-700 dark:text-yellow-300' :
                            'bg-gray-200 dark:bg-gray-700 border-gray-500 text-gray-700 dark:text-gray-300'}
                        `}
                        onClick={() => onSpotSelect && spot.status === 'available' && onSpotSelect(spot)}
                      >
                        {spot.spotNumber}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map Overlay Elements */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-2 rounded shadow-md z-10">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{selectedFacility.name}</div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Available ({availableCount})
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Occupied ({occupiedCount})
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span> Reserved ({reservedCount})
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="absolute top-4 right-4 w-64">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search spot"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <ParkingOccupancySummary spots={spots} />
        </div>
      </CardContent>
    </Card>
  );
}

interface ParkingOccupancySummaryProps {
  spots: ParkingSpot[];
}

function ParkingOccupancySummary({ spots }: ParkingOccupancySummaryProps) {
  // Group spots by floor and calculate occupancy
  const floorStats = spots.reduce((acc, spot) => {
    const floor = `Floor ${spot.floor || 1}`;
    if (!acc[floor]) {
      acc[floor] = { total: 0, occupied: 0 };
    }
    acc[floor].total++;
    if (spot.status === 'occupied' || spot.status === 'reserved') {
      acc[floor].occupied++;
    }
    return acc;
  }, {} as Record<string, { total: number; occupied: number }>);
  
  return (
    <div className="lg:w-1/4 p-4 bg-gray-50 dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Occupancy Summary</h3>
      
      <div className="space-y-4">
        {Object.entries(floorStats).map(([floor, stats]) => {
          const occupancyPercentage = Math.round((stats.occupied / stats.total) * 100);
          
          return (
            <div key={floor}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">{floor}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{occupancyPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    occupancyPercentage > 90 ? 'bg-red-500' : 'bg-primary'
                  }`} 
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <ActivityFeed />
    </div>
  );
}

function ActivityFeed() {
  // This would be real data from an API in production
  const activities = [
    { id: 1, type: 'available', message: 'Spot A12 now available', time: '2m ago' },
    { id: 2, type: 'reserved', message: 'Spot B5 reserved', time: '5m ago' },
    { id: 3, type: 'full', message: 'Lot C at full capacity', time: '12m ago' },
  ];
  
  return (
    <>
      <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white dark:bg-gray-900 p-2 rounded shadow-sm">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                activity.type === 'available' ? 'bg-green-500' :
                activity.type === 'reserved' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
              <div className="text-xs text-gray-900 dark:text-white">{activity.message}</div>
              <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
