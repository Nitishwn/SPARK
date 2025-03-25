import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from 'recharts';

// Mock data - in a real app, this would come from an API
const dailyOccupancyData = [
  { time: '00:00', occupancy: 15 },
  { time: '02:00', occupancy: 10 },
  { time: '04:00', occupancy: 8 },
  { time: '06:00', occupancy: 20 },
  { time: '08:00', occupancy: 70 },
  { time: '10:00', occupancy: 85 },
  { time: '12:00', occupancy: 75 },
  { time: '14:00', occupancy: 80 },
  { time: '16:00', occupancy: 90 },
  { time: '18:00', occupancy: 95 },
  { time: '20:00', occupancy: 65 },
  { time: '22:00', occupancy: 40 },
];

const weeklyOccupancyData = [
  { day: 'Mon', morning: 65, afternoon: 85, evening: 75 },
  { day: 'Tue', morning: 70, afternoon: 80, evening: 60 },
  { day: 'Wed', morning: 75, afternoon: 90, evening: 70 },
  { day: 'Thu', morning: 65, afternoon: 85, evening: 75 },
  { day: 'Fri', morning: 80, afternoon: 95, evening: 90 },
  { day: 'Sat', morning: 50, afternoon: 70, evening: 85 },
  { day: 'Sun', morning: 40, afternoon: 60, evening: 70 },
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 5100 },
  { month: 'Apr', revenue: 4800 },
  { month: 'May', revenue: 5600 },
  { month: 'Jun', revenue: 6700 },
  { month: 'Jul', revenue: 7200 },
  { month: 'Aug', revenue: 6800 },
  { month: 'Sep', revenue: 6100 },
  { month: 'Oct', revenue: 5400 },
  { month: 'Nov', revenue: 4900 },
  { month: 'Dec', revenue: 6200 },
];

interface ChartProps {
  type?: 'daily' | 'weekly' | 'monthly';
  title?: string;
}

export function OccupancyChart({ type = 'daily', title = 'Occupancy Analytics' }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          {type === 'daily' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyOccupancyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis 
                  domain={[0, 100]} 
                  tickFormatter={(tick) => `${tick}%`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.375rem',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Occupancy']}
                />
                <Area 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorOccupancy)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {type === 'weekly' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyOccupancyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" />
                <YAxis 
                  domain={[0, 100]} 
                  tickFormatter={(tick) => `${tick}%`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.375rem',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
                <Legend />
                <Bar dataKey="morning" name="Morning (6-12)" fill="#3B82F6" />
                <Bar dataKey="afternoon" name="Afternoon (12-18)" fill="#10B981" />
                <Bar dataKey="evening" name="Evening (18-24)" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {type === 'monthly' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(tick) => `$${tick}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.375rem',
                  }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
