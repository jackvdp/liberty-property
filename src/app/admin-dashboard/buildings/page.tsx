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
import { Badge } from '@/components/ui/badge';

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
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight">All Buildings</h2>
                <p className="text-muted-foreground">
                  View all buildings with registered leaseholders
                </p>
              </div>

              {/* Error State */}
              {!success && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    {error || "Failed to load buildings"}
                  </p>
                </div>
              )}

              {/* Stats Cards */}
              {success && buildings && (
                <div className="grid gap-4 md:grid-cols-4">
                  <StatCard
                    title="Total Buildings"
                    value={buildings.length}
                    variant="default"
                  />
                  <StatCard
                    title="With Multiple Registrations"
                    value={buildings.filter(b => b.registrationCount > 1).length}
                    variant="success"
                  />
                  <StatCard
                    title="Total Registrations"
                    value={buildings.reduce((sum, b) => sum + b.registrationCount, 0)}
                    variant="info"
                  />
                  <StatCard
                    title="Avg. Participation"
                    value={`${Math.round(buildings.reduce((sum, b) => sum + b.participationRate, 0) / buildings.length)}%`}
                    variant="warning"
                  />
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

function StatCard({ 
  title, 
  value, 
  variant = 'default' 
}: { 
  title: string; 
  value: number | string; 
  variant?: 'default' | 'success' | 'info' | 'warning';
}) {
  const variantStyles = {
    default: 'border-gray-200',
    success: 'border-green-200 bg-green-50',
    info: 'border-blue-200 bg-blue-50',
    warning: 'border-purple-200 bg-purple-50',
  };

  return (
    <div className={`rounded-lg border bg-card p-4 ${variantStyles[variant]}`}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
