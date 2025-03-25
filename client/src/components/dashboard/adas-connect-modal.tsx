import React, { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Car, Route, Sparkles } from 'lucide-react';
import { ParkingSpot } from '@shared/schema';

interface AdasConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedSpot?: ParkingSpot;
}

export function AdasConnectModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  selectedSpot
}: AdasConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      // After showing connected status, proceed with navigation
      setTimeout(() => {
        onConfirm();
      }, 1500);
    }, 2000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            ADAS Connection Request
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isConnected ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4 mb-4">
                  <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-center font-medium text-green-600 dark:text-green-400 mb-2">
                  ADAS Connected Successfully!
                </p>
                <p className="text-center">
                  Starting navigation to spot {selectedSpot?.spotNumber}...
                </p>
              </div>
            ) : isConnecting ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-pulse bg-blue-100 dark:bg-blue-900/20 rounded-full p-4 mb-4">
                  <Car className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-bounce" />
                </div>
                <p className="text-center">
                  Connecting to vehicle ADAS system...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  We've detected that you've entered the parking facility. Would you like to connect your vehicle's ADAS system to navigate to your reserved spot?
                </p>
                {selectedSpot && (
                  <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-4 my-4">
                    <div className="flex items-start space-x-3">
                      <Route className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Your reserved spot:</h4>
                        <p className="text-sm">Spot #{selectedSpot.spotNumber}</p>
                        <p className="text-sm">Floor {selectedSpot.floor}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Approximately 120m from current location
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row sm:justify-end gap-2">
          {!isConnecting && !isConnected && (
            <>
              <AlertDialogCancel asChild>
                <Button variant="outline" onClick={onClose}>Decline</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleConnect}>
                  <Car className="mr-2 h-4 w-4" />
                  Connect ADAS
                </Button>
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}