import React, { useState, useEffect } from 'react';
import { ParkingSpot } from '@shared/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  Car,
  Check,
  Clock,
  CornerDownRight,
  CornerUpRight,
  Locate,
  MapPin,
  MoveRight,
  Navigation,
  Route,
  SignalHigh
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface AdasNavigationProps {
  spot?: ParkingSpot;
  onComplete: () => void;
}

type NavigationStep = {
  instruction: string;
  distance: string;
  icon: React.ReactNode;
  completed: boolean;
};

export function AdasNavigation({ spot, onComplete }: AdasNavigationProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("2 min");

  // Generate navigation steps based on the spot
  const [navigationSteps, setNavigationSteps] = useState<NavigationStep[]>([
    {
      instruction: "Proceed to Floor " + (spot?.floor || 1),
      distance: "80m",
      icon: <MoveRight className="h-5 w-5" />,
      completed: false
    },
    {
      instruction: "Turn right at junction B",
      distance: "30m",
      icon: <CornerUpRight className="h-5 w-5" />,
      completed: false
    },
    {
      instruction: "Continue straight to Row C",
      distance: "40m",
      icon: <ArrowRight className="h-5 w-5" />,
      completed: false
    },
    {
      instruction: `Park at Spot #${spot?.spotNumber || "A1"}`,
      distance: "10m",
      icon: <MapPin className="h-5 w-5" />,
      completed: false
    }
  ]);

  // Simulate navigation progress
  useEffect(() => {
    const totalSteps = navigationSteps.length;
    
    const simulateNavigation = () => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = 100 / (totalSteps * 3); // Smoother progress
          const newProgress = Math.min(prevProgress + increment, 100);

          // Update time remaining
          const remainingPercentage = 100 - newProgress;
          const initialSeconds = 120; // 2 minutes
          const remainingSeconds = Math.max(5, Math.round(initialSeconds * (remainingPercentage / 100)));
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;
          setEstimatedTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);

          // Update current step
          const stepProgress = (newProgress / 100) * totalSteps;
          const newStepIndex = Math.min(Math.floor(stepProgress), totalSteps - 1);
          
          if (newStepIndex > currentStepIndex) {
            setCurrentStepIndex(newStepIndex);
            setNavigationSteps(prev => 
              prev.map((step, idx) => 
                idx === currentStepIndex ? { ...step, completed: true } : step
              )
            );
          }
          
          // Check if navigation is complete
          if (newProgress >= 100) {
            clearInterval(timer);
            setIsComplete(true);
            setNavigationSteps(prev => 
              prev.map(step => ({ ...step, completed: true }))
            );
            // Allow time to see the completed state before closing
            setTimeout(() => {
              onComplete();
            }, 3000);
          }
          
          return newProgress;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    };
    
    const timer = setTimeout(simulateNavigation, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto border-primary/20">
      <CardHeader className="bg-primary-50 dark:bg-primary-950/20">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Navigation className="h-5 w-5 text-primary" />
            ADAS Navigation
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SignalHigh className="h-4 w-4 text-green-500" />
            <span>Connected</span>
          </div>
        </div>
        <CardDescription>
          Navigating to Spot #{spot?.spotNumber || "A1"} on Floor {spot?.floor || 1}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">ETA: {estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Locate className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{Math.round(160 * (1 - progress/100))}m remaining</span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-3">
          {navigationSteps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start p-3 rounded-lg border transition-colors",
                index === currentStepIndex && !isComplete 
                  ? "bg-primary/5 border-primary/20" 
                  : step.completed 
                    ? "bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-900/20" 
                    : "border-gray-200 dark:border-gray-800"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full mr-3 shrink-0",
                step.completed 
                  ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
                  : index === currentStepIndex && !isComplete
                    ? "bg-primary/10 text-primary" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
              )}>
                {step.completed ? <Check className="h-5 w-5" /> : step.icon}
              </div>
              
              <div className="flex-1">
                <p className={cn(
                  "font-medium",
                  step.completed 
                    ? "text-green-600 dark:text-green-400" 
                    : index === currentStepIndex && !isComplete
                      ? "text-primary" 
                      : "text-gray-700 dark:text-gray-300"
                )}>
                  {step.instruction}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step.completed ? "Completed" : `${step.distance} ${index === currentStepIndex && !isComplete ? "- Current" : ""}`}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {isComplete && (
          <div className="mt-6 bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-900/20 rounded-lg p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-3">
              <Car className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-1">
              You have arrived!
            </h3>
            <p className="text-sm text-green-600/70 dark:text-green-400/70">
              Successfully parked at Spot #{spot?.spotNumber || "A1"}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline" size="sm" className="gap-1" disabled={isComplete}>
          <AlertTriangle className="h-4 w-4" />
          Report Issue
        </Button>
        <Button size="sm" onClick={onComplete}>
          {isComplete ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Done
            </>
          ) : (
            <>
              Cancel
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}