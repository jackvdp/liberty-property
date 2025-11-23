import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"
import { adminDashboardNavMain, sharedNavSecondary } from "@/config/navigation"
import { getAllBuildings } from '@/lib/actions/buildings.actions';
import { EnhancedDataTable } from '@/components/enhanced-data-table';
import { columns } from './columns';
import { SharePointSyncButton } from '@/components/sharepoint-sync-button';

export const metadata = {
  title: 'Buildings | Admin Dashboard',
  description: 'View and manage all registered buildings',
};

export default async function BuildingsPage() {
  // Get current user
  const user = await getCurrentUser()
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

  // Redirect to regular dashboard if not admin
  if (!user.isAdmin) {
    redirect('/dashboard')
  }

  // Fetch buildings data
  const result = await getAllBuildings();
  const { success, buildings, error } = result;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "4rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar 
        variant="inset" 
        user={user}
        navMainItems={adminDashboardNavMain}
        navSecondaryItems={sharedNavSecondary}
        sidebarLabel="Admin"
      />
      <SidebarInset>
        <SiteHeader title="Buildings" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header with Sync Button */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">All Buildings</h2>
                  <p className="text-muted-foreground">
                    View all buildings with registered leaseholders
                  </p>
                </div>
                <SharePointSyncButton />
              </div>

              {/* Error State */}
              {!success && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    {error || "Failed to load buildings"}
                  </p>
                </div>
              )}

              {/* Enhanced Data Table */}
              {success && buildings && (
                <EnhancedDataTable
                  columns={columns}
                  data={buildings}
                  searchKey="mainBuildingAddress"
                  searchPlaceholder="Search buildings..."
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
