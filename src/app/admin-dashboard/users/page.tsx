import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { getAllUsers } from "@/lib/actions/users.actions"
import { redirect } from "next/navigation"
import { columns } from "./columns"
import { EnhancedDataTable } from "@/components/enhanced-data-table"
import { adminDashboardNavMain, sharedNavSecondary } from "@/config/navigation"
import { SharePointSyncButton } from "@/components/sharepoint-sync-button"

export default async function AdminUsersPage() {
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

  // Fetch all users
  const { success, users, error } = await getAllUsers()

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
        <SiteHeader title="Users" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header with SharePoint Sync */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
                  <p className="text-muted-foreground">
                    Manage system users and view their registration details
                  </p>
                </div>
                <SharePointSyncButton />
              </div>

              {/* Error State */}
              {!success && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    {error || "Failed to load users"}
                  </p>
                </div>
              )}

              {/* Enhanced Data Table */}
              {success && users && (
                <EnhancedDataTable
                  columns={columns}
                  data={users}
                  searchKey="email"
                  searchPlaceholder="Search by email or name..."
                  filterConfigs={[
                    {
                      columnId: "isAdmin",
                      title: "Role",
                      options: [
                        { label: "Admin", value: "true" },
                        { label: "User", value: "false" },
                      ],
                    },
                  ]}
                  defaultPageSize={20}
                  enableExport={true}
                  exportConfig={{
                    filename: "users",
                    excludeColumns: ["id"], // Don't export user IDs
                  }}
                />
              )}

              {/* Empty State */}
              {success && users && users.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                  <svg
                    className="w-12 h-12 text-muted-foreground mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold mb-1">No users yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Users will appear here once they register
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
