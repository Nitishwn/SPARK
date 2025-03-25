import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  isReversed?: boolean;
}

export function HowItWorksStep({
  number,
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-blue-100 dark:bg-blue-900/20",
  isReversed = false
}: HowItWorksStepProps) {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
      <div className={`md:w-1/2 ${isReversed ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
      </div>
      
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 my-4 md:my-0">
        <span className="font-bold">{number}</span>
      </div>
      
      <div className={`md:w-1/2 ${isReversed ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className={`rounded-lg overflow-hidden shadow-md ${iconBgColor} p-12 flex justify-center items-center`}>
          <Icon className={`w-20 h-20 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
