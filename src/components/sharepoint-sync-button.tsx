'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { syncToSharePoint } from '@/lib/actions/sharepoint-sync.actions';
import { Upload, CheckCircle2, AlertCircle, Loader2, Users, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface SyncStats {
  totalRegistrations: number;
  alreadyInSharePoint: number;
  newlyUploaded: number;
  failed: number;
}

interface BuildingSyncStats {
  totalBuildings: number;
  alreadyInSharePoint: number;
  newlyUploaded: number;
  failed: number;
}

interface CombinedStats {
  contacts: SyncStats | null;
  buildings: BuildingSyncStats | null;
}

export function SharePointSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncStats, setLastSyncStats] = useState<CombinedStats>({
    contacts: null,
    buildings: null
  });

  async function handleSync() {
    setIsSyncing(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Syncing to SharePoint...', {
      description: 'Syncing contacts and buildings'
    });

    try {
      const result = await syncToSharePoint();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Update stats
      setLastSyncStats({
        contacts: result.contactsSync.stats,
        buildings: result.buildingsSync.stats
      });

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

        // Log errors
        if (result.contactsSync.errors) {
          console.error('Contact sync errors:', result.contactsSync.errors);
        }
        if (result.buildingsSync.errors) {
          console.error('Building sync errors:', result.buildingsSync.errors);
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
    <div className="flex flex-col gap-4">
      {/* Sync Stats Display */}
      {(lastSyncStats.contacts || lastSyncStats.buildings) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contacts Stats */}
          {lastSyncStats.contacts && (
            <div className="flex flex-col gap-2 p-3 border rounded-lg bg-background">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                <span>Contacts</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">{lastSyncStats.contacts.totalRegistrations}</span>
                  <span>Total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-green-600">{lastSyncStats.contacts.newlyUploaded}</span>
                  <span>New</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-blue-600">{lastSyncStats.contacts.alreadyInSharePoint}</span>
                  <span>Existing</span>
                </div>
                {lastSyncStats.contacts.failed > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-red-600">{lastSyncStats.contacts.failed}</span>
                    <span>Failed</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Buildings Stats */}
          {lastSyncStats.buildings && (
            <div className="flex flex-col gap-2 p-3 border rounded-lg bg-background">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Building2 className="h-4 w-4" />
                <span>Buildings</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">{lastSyncStats.buildings.totalBuildings}</span>
                  <span>Total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-green-600">{lastSyncStats.buildings.newlyUploaded}</span>
                  <span>New</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-blue-600">{lastSyncStats.buildings.alreadyInSharePoint}</span>
                  <span>Existing</span>
                </div>
                {lastSyncStats.buildings.failed > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-red-600">{lastSyncStats.buildings.failed}</span>
                    <span>Failed</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sync Button */}
      <Button
        variant="outline"
        onClick={handleSync}
        disabled={isSyncing}
        className="w-full md:w-auto"
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
