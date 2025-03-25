import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data - in a real app, this would come from the API
const hourlyData = [
  { hour: "9AM", availability: 45 },
  { hour: "10AM", availability: 30 },
  { hour: "11AM", availability: 20 },
  { hour: "12PM", availability: 35 },
  { hour: "1PM", availability: 60 },
  { hour: "2PM", availability: 75 },
  { hour: "3PM", availability: 65 },
  { hour: "4PM", availability: 40 },
  { hour: "5PM", availability: 25 },
];

interface AvailabilityChartProps {
  isLoading?: boolean;
}

export function AvailabilityChart({ isLoading = false }: AvailabilityChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hourly Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hourlyData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour" 
                axisLine={false} 
                tickLine={false}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, "Availability"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Bar 
                dataKey="availability" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
