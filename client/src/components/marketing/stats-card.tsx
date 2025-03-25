import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="text-primary text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-700 dark:text-gray-300">{label}</div>
    </div>
  );
}
