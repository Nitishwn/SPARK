import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParkingSpot } from "@shared/schema";

interface ParkingMapProps {
  locationId: number;
}

export function ParkingMap({ locationId }: ParkingMapProps) {
  const [grid, setGrid] = useState<ParkingSpot[][]>([]);
  
  const { data: spots, isLoading } = useQuery<ParkingSpot[]>({
    queryKey: [`/api/locations/${locationId}/spots`],
  });
  
  useEffect(() => {
    if (spots) {
      // Organize spots into rows based on spot number (e.g., "A12" -> row A, position 12)
      const rowMap = new Map<string, ParkingSpot[]>();
      
      spots.forEach(spot => {
        const rowLetter = spot.spotNumber.charAt(0);
        if (!rowMap.has(rowLetter)) {
          rowMap.set(rowLetter, []);
        }
        rowMap.get(rowLetter)?.push(spot);
      });
      
      // Sort each row by spot number
      rowMap.forEach(row => {
        row.sort((a, b) => {
          const aNum = parseInt(a.spotNumber.substring(1));
          const bNum = parseInt(b.spotNumber.substring(1));
          return aNum - bNum;
        });
      });
      
      // Convert map to array of rows, sorted by row letter
      const rowLetters = Array.from(rowMap.keys()).sort();
      const gridArray = rowLetters.map(letter => rowMap.get(letter) || []);
      
      setGrid(gridArray);
    }
  }, [spots]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Parking Map</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Live Parking Map</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full mr-1" />
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-red-500 rounded-full mr-1" />
            <span className="text-xs">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-amber-500 rounded-full mr-1" />
            <span className="text-xs">Reserved</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {grid.map((row, rowIndex) => (
            <div 
              key={`row-${rowIndex}`}
              className="absolute left-[10%] right-[10%] h-[15%] bg-gray-200 dark:bg-gray-700 rounded flex items-center"
              style={{
                top: `${10 + (rowIndex * 30)}%`,
              }}
            >
              {row.map((spot, spotIndex) => (
                <div 
                  key={spot.id}
                  className={`
                    absolute w-5 h-5 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2
                    ${spot.status === 'available' ? 'bg-green-500' : ''}
                    ${spot.status === 'occupied' ? 'bg-red-500' : ''}
                    ${spot.status === 'reserved' ? 'bg-amber-500' : ''}
                  `}
                  style={{
                    top: '50%',
                    left: `${10 + (spotIndex * 10)}%`,
                  }}
                  title={`Spot ${spot.spotNumber}: ${spot.status}`}
                />
              ))}
              
              {/* Row label */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 font-bold text-sm">
                {row[0]?.spotNumber.charAt(0)}
              </div>
            </div>
          ))}
          
          {/* Driving lanes between rows */}
          {grid.length > 1 && Array.from({ length: grid.length - 1 }).map((_, index) => (
            <div 
              key={`lane-${index}`}
              className="absolute left-[10%] right-[10%] h-[5%] flex items-center justify-center"
              style={{
                top: `${25 + (index * 30)}%`,
              }}
            >
              <div className="h-[1px] w-full bg-gray-400 dark:bg-gray-500 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2">
                  Driving Lane
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
