import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Car, Info, LayersIcon } from 'lucide-react';
import { ParkingSpot } from '@shared/schema';
import { Button } from '@/components/ui/button';

interface ParkingMapProps {
  spots: ParkingSpot[];
  selectedFacility: { id: number; name: string };
  onSpotSelect?: (spot: ParkingSpot) => void;
}

export function ParkingMap({ spots, selectedFacility, onSpotSelect }: ParkingMapProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFloor, setActiveFloor] = React.useState(1);
  
  // Filter spots by search query and active floor
  const filteredSpots = spots.filter(spot => {
    const matchesSearch = !searchQuery || 
      spot.spotNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (spot.section && spot.section.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFloor = spot.floor === activeFloor;
    return matchesSearch && matchesFloor;
  });
  
  const availableCount = filteredSpots.filter(spot => spot.status === 'available').length;
  const occupiedCount = filteredSpots.filter(spot => spot.status === 'occupied').length;
  const reservedCount = filteredSpots.filter(spot => spot.status === 'reserved').length;
  
  // Get all unique floors from spots
  const floorMap: Record<number, boolean> = {};
  spots.forEach(spot => {
    if (spot.floor) floorMap[spot.floor] = true;
    else floorMap[1] = true; // Default to floor 1 if no floor specified
  });
  const floors = Object.keys(floorMap).map(Number).sort((a, b) => a - b);
  
  // Group spots by section
  const spotsBySection = filteredSpots.reduce((acc, spot) => {
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
          <div className="lg:w-3/4 h-[500px] bg-gray-100 dark:bg-gray-800 relative">
            {/* Header with controls */}
            <div className="bg-white dark:bg-gray-900 p-3 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3 md:mb-0">
                <Info className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">{selectedFacility.name} - Floor {activeFloor}</h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                {/* Floor selector */}
                <div className="flex rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {floors.map(floor => (
                    <Button
                      key={floor}
                      variant={activeFloor === floor ? "default" : "ghost"}
                      className={`px-3 py-1 h-9 rounded-none ${activeFloor === floor ? 
                        'bg-primary text-primary-foreground' : 
                        'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      onClick={() => setActiveFloor(floor)}
                    >
                      F{floor}
                    </Button>
                  ))}
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="pl-8 h-9"
                    placeholder="Search spot..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Spot stats */}
            <div className="grid grid-cols-4 gap-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Available: {availableCount}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Occupied: {occupiedCount}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Reserved: {reservedCount}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Total: {filteredSpots.length}</span>
              </div>
            </div>
            
            {/* Map visualization */}
            <div className="w-full h-[390px] p-6 overflow-auto">
              {Object.keys(spotsBySection).length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 my-16">
                  <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg max-w-md mx-auto">
                    <div className="text-lg">No parking spots available on this floor.</div>
                    <div className="text-sm mt-2">Try selecting a different floor or facility.</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(spotsBySection).map(([section, sectionSpots]) => (
                    <div key={section} className="w-full">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-md">
                          <h3 className="text-base font-semibold">Section {section || "Main"}</h3>
                        </div>
                        <div className="h-[2px] flex-grow ml-4 bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                        {sectionSpots.map(spot => (
                          <div 
                            key={spot.id}
                            className={`
                              w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all relative group
                              ${spot.status === 'available' 
                                ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 hover:scale-105 hover:shadow-md' 
                                : spot.status === 'occupied' 
                                  ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300' 
                                  : spot.status === 'reserved' 
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 text-yellow-700 dark:text-yellow-300' 
                                    : 'bg-gray-200 dark:bg-gray-700 border-gray-500 text-gray-700 dark:text-gray-300'}
                            `}
                            title={`Spot ${spot.spotNumber} - ${spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}`}
                          >
                            <div 
                              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                              onClick={() => onSpotSelect && spot.status === 'available' && onSpotSelect(spot)}
                            >
                              <span className="font-bold text-base">{spot.spotNumber}</span>
                              <span className="text-xs capitalize mt-1">
                                {spot.spotType || 'Standard'}
                              </span>
                              <span className="text-xs mt-0.5">
                                {spot.status === 'available' ? 'Free' : 
                                 spot.status === 'occupied' ? 'Taken' : 
                                 spot.status === 'reserved' ? 'Reserved' : 
                                 spot.status}
                              </span>
                            </div>
                            
                            {/* Quick book action overlay - only shows on hover for available spots */}
                            {spot.status === 'available' && (
                              <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center invisible group-hover:visible">
                                <button 
                                  className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm hover:bg-primary/90"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // This would trigger a quick booking in a real implementation
                                    onSpotSelect && onSpotSelect(spot);
                                  }}
                                >
                                  Quick Book
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
