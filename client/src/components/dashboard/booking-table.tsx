import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Booking } from '@shared/schema';

type BookingWithDetails = Booking & {
  spotNumber: string;
  facilityName: string;
  vehicleInfo: string;
};

interface BookingTableProps {
  bookings: BookingWithDetails[];
  title?: string;
}

export function BookingTable({ bookings, title = "Recent Bookings" }: BookingTableProps) {
  const columns: ColumnDef<BookingWithDetails>[] = [
    {
      id: 'user',
      header: 'User',
      cell: ({ row }) => <div className="font-medium">{row.original.userId}</div>,
    },
    {
      id: 'spot',
      header: 'Spot',
      cell: ({ row }) => <div>{row.original.spotNumber}</div>,
    },
    {
      id: 'facility',
      header: 'Facility',
      cell: ({ row }) => <div>{row.original.facilityName}</div>,
    },
    {
      id: 'vehicle',
      header: 'Vehicle',
      cell: ({ row }) => <div>{row.original.vehicleInfo}</div>,
    },
    {
      id: 'time',
      header: 'Time',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(row.original.startTime), { addSuffix: true })}
        </div>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        let variant = 'default';
        
        if (status === 'active') variant = 'success';
        else if (status === 'completed') variant = 'secondary';
        else if (status === 'cancelled') variant = 'destructive';
        
        return (
          <Badge variant={variant as any}>{
            status.charAt(0).toUpperCase() + status.slice(1)
          }</Badge>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={bookings} />
      </CardContent>
    </Card>
  );
}
