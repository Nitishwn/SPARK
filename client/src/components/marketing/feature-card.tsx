import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = 'text-primary',
  iconBgColor = 'bg-blue-100 dark:bg-blue-900/20'
}: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-lg ${iconBgColor} flex items-center justify-center mb-4`}>
        <Icon className={`${iconColor} text-xl`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
