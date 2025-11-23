'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { BuildingData } from '@/lib/db/repositories/buildings.repository';
import { ArrowUpDown, Building2, MapPin, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<BuildingData>[] = [
  {
    accessorKey: 'mainBuildingAddress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Building Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.getValue('mainBuildingAddress') as string;
      const identifier = row.original.buildingIdentifier;
      
      return (
        <div className="flex flex-col">
          <span className="font-medium">{address}</span>
          <span className="text-xs text-muted-foreground font-mono">{identifier}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'postcode',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Postcode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-mono">{row.getValue('postcode')}</span>;
    },
  },
  {
    accessorKey: 'localAuthority',
    header: 'Town/City',
    cell: ({ row }) => {
      const authority = row.getValue('localAuthority') as string | null;
      return authority ? <span>{authority}</span> : <span className="text-muted-foreground">—</span>;
    },
  },
  {
    accessorKey: 'numberOfFlats',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Units
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('numberOfFlats')}
        </div>
      );
    },
  },
  {
    accessorKey: 'registrationCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Users className="mr-2 h-4 w-4" />
          Registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const count = row.getValue('registrationCount') as number;
      
      return (
        <div className="flex items-center justify-center">
          <Badge variant={count > 1 ? 'default' : 'secondary'}>
            {count}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'participationRate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Participation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rate = row.getValue('participationRate') as number;
      
      // Color code based on participation rate
      let badgeVariant: 'default' | 'secondary' | 'outline' = 'outline';
      if (rate >= 50) badgeVariant = 'default';
      else if (rate >= 25) badgeVariant = 'secondary';
      
      return (
        <div className="flex items-center justify-center">
          <Badge variant={badgeVariant}>
            {rate}%
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'firstRegisteredAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('firstRegisteredAt') as Date;
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      );
    },
  },
  {
    accessorKey: 'latestRegisteredAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Latest Registered
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('latestRegisteredAt') as Date;
      return (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      );
    },
  },
];
