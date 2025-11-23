'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { BuildingData } from '@/lib/db/repositories/buildings.repository';
import { ArrowUpDown, Building2, MapPin, Users } from 'lucide-react';
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
      
      return (
        <div className="flex flex-col">
          <span className="font-medium">{address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'buildingIdentifier',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Building ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const identifier = row.getValue('buildingIdentifier') as string;
      
      return (
        <span className="text-xs font-mono text-muted-foreground">
          {identifier}
        </span>
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
    header: 'Local Authority',
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
];
