'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { syncRegistrationsToSharePoint } from '@/lib/actions/sharepoint-sync.actions';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SyncStats {
  totalRegistrations: number;
  alreadyInSharePoint: number;
  newlyUploaded: number;
  failed: number;
}

export function SharePointSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncStats, setLastSyncStats] = useState<SyncStats | null>(null);

  async function handleSync() {
    setIsSyncing(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Syncing registrations to SharePoint...', {
      description: 'This may take a moment'
    });

    try {
      const result = await syncRegistrationsToSharePoint();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Update stats
      setLastSyncStats(result.stats);

      if (result.success) {
        toast.success('Sync Completed Successfully', {
          description: result.message,
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 5000
        });
      } else {
        toast.error('Sync Completed with Errors', {
          description: result.message,
          icon: <AlertCircle className="h-4 w-4" />,
          duration: 7000
        });

        // Show individual errors if any
        if (result.errors && result.errors.length > 0) {
          console.error('Sync errors:', result.errors);
        }
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Sync Failed', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        icon: <AlertCircle className="h-4 w-4" />
      });
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Sync Stats Display */}
      {lastSyncStats && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">{lastSyncStats.totalRegistrations}</span>
            <span>Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-green-600">{lastSyncStats.newlyUploaded}</span>
            <span>Uploaded</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-blue-600">{lastSyncStats.alreadyInSharePoint}</span>
            <span>Existing</span>
          </div>
          {lastSyncStats.failed > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-red-600">{lastSyncStats.failed}</span>
              <span>Failed</span>
            </div>
          )}
        </div>
      )}

      {/* Sync Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSync}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Sync to SharePoint
          </>
        )}
      </Button>
    </div>
  );
}
