import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Bell, InfoIcon } from 'lucide-react';

interface Alert {
  id: number;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No active alerts
            </div>
          ) : (
            alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ alert }: { alert: Alert }) {
  const getBgColor = () => {
    switch (alert.type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getIconColor = () => {
    switch (alert.type) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
    }
  };

  const getTitleColor = () => {
    switch (alert.type) {
      case 'error':
        return 'text-red-800 dark:text-red-300';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-300';
      case 'info':
        return 'text-blue-800 dark:text-blue-300';
    }
  };

  const getMessageColor = () => {
    switch (alert.type) {
      case 'error':
        return 'text-red-700 dark:text-red-400';
      case 'warning':
        return 'text-yellow-700 dark:text-yellow-400';
      case 'info':
        return 'text-blue-700 dark:text-blue-400';
    }
  };

  const getTimeColor = () => {
    switch (alert.type) {
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const Icon = alert.type === 'error' 
    ? AlertTriangle 
    : alert.type === 'warning' 
      ? Bell 
      : InfoIcon;

  return (
    <div className={`flex ${getBgColor()} p-4 rounded-lg`}>
      <div className="flex-shrink-0">
        <Icon className={`${getIconColor()} text-lg`} />
      </div>
      <div className="ml-3">
        <h3 className={`text-sm font-medium ${getTitleColor()}`}>{alert.title}</h3>
        <div className={`mt-1 text-sm ${getMessageColor()}`}>
          <p>{alert.message}</p>
        </div>
        <div className={`mt-2 text-xs ${getTimeColor()}`}>
          {alert.time}
        </div>
      </div>
    </div>
  );
}
