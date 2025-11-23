'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { updateRegistrationStatus } from '@/lib/actions/users.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface RegistrationStatusSelectProps {
  registrationId: string;
  currentStatus: 'pending' | 'contacted' | 'active' | 'completed';
}

export function RegistrationStatusSelect({
  registrationId,
  currentStatus,
}: RegistrationStatusSelectProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const statusConfig = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', bg: "bg-yellow-100" },
    contacted: { label: 'Contacted', className: 'bg-blue-100 text-blue-800', bg: "bg-blue-100" },
    active: { label: 'Active', className: 'bg-green-100 text-green-800', bg: "bg-green-100" },
    completed: { label: 'Completed', className: 'bg-purple-100 text-purple-800', bg: "bg-purple-100" },
  };

  async function handleStatusChange(newStatus: string) {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);

    try {
      const result = await updateRegistrationStatus(
        registrationId,
        newStatus as 'pending' | 'contacted' | 'active' | 'completed'
      );

      if (result.success) {
        toast.success('Status updated successfully');
        router.refresh(); // Refresh the page to show updated data
      } else {
        toast.error('Failed to update status', {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error('Failed to update status', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isUpdating}
    >
      <SelectTrigger className={`w-[140px] h-7 shadow-0 border-0 p-0 focus:ring-0 ${statusConfig[currentStatus].className}`}>
        <SelectValue>
          <Badge className={statusConfig[currentStatus].className}>
            {statusConfig[currentStatus].label}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={"bg-liberty-base"}>
        <SelectItem value="pending">
          <Badge className={statusConfig.pending.className}>
            {statusConfig.pending.label}
          </Badge>
        </SelectItem>
        <SelectItem value="contacted">
          <Badge className={statusConfig.contacted.className}>
            {statusConfig.contacted.label}
          </Badge>
        </SelectItem>
        <SelectItem value="active">
          <Badge className={statusConfig.active.className}>
            {statusConfig.active.label}
          </Badge>
        </SelectItem>
        <SelectItem value="completed">
          <Badge className={statusConfig.completed.className}>
            {statusConfig.completed.label}
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
