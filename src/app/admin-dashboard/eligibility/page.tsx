import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { getAllEligibilityChecks } from "@/lib/actions/eligibility.actions"
import { redirect } from "next/navigation"
import { columns } from "./columns"
import { EnhancedDataTable } from "@/components/enhanced-data-table"

const navMainItems = [
  {
    title: "Admin Dashboard",
    url: "/admin-dashboard",
    icon: "dashboard",
  },
  {
    title: "Eligibility Checks",
    url: "/admin-dashboard/eligibility",
    icon: "clipboardCheck",
  },
  {
    title: "Users",
    url: "/admin-dashboard/users",
    icon: "users",
  },
]

const navSecondaryItems = [
  {
    title: "Settings",
    url: "/admin-dashboard/settings",
    icon: "settings",
  },
  {
    title: "Get Help",
    url: "/contact",
    icon: "help",
  },
]

export default async function AdminEligibilityPage() {
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

  // Fetch all eligibility checks
  const { success, checks, error } = await getAllEligibilityChecks()

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
        navMainItems={navMainItems}
        navSecondaryItems={navSecondaryItems}
        sidebarLabel="Admin"
      />
      <SidebarInset>
        <SiteHeader title="Eligibility Checks" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight">All Eligibility Checks</h2>
                <p className="text-muted-foreground">
                  View and filter all eligibility wizard submissions
                </p>
              </div>

              {/* Error State */}
              {!success && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    {error || "Failed to load eligibility checks"}
                  </p>
                </div>
              )}

              {/* Enhanced Data Table */}
              {success && checks && (
                <EnhancedDataTable
                  columns={columns}
                  data={checks}
                  searchKey="userName"
                  searchPlaceholder="Search by name, email, or phone..."
                  filterConfigs={[
                    {
                      columnId: "eligibilityStatus",
                      title: "Status",
                      options: [
                        { label: "Success", value: "success" },
                        { label: "Failure", value: "failure" },
                        { label: "Info", value: "info" },
                      ],
                    },
                    {
                      columnId: "recommendedCaseType",
                      title: "Case Type",
                      options: [
                        { label: "RTM", value: "rtm" },
                        { label: "Enfranchisement", value: "enfranchisement" },
                        { label: "RMC Takeover", value: "rmc_takeover" },
                      ],
                    },
                    {
                      columnId: "propertyType",
                      title: "Property Type",
                      options: [
                        { label: "Flat", value: "flat" },
                        { label: "House", value: "house" },
                      ],
                    },
                  ]}
                  defaultPageSize={20}
                  enableExport={true}
                  exportConfig={{
                    filename: "eligibility-checks",
                    excludeColumns: ["id"], // Don't export ID column
                  }}
                />
              )}

              {/* Empty State */}
              {success && checks && checks.length === 0 && (
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold mb-1">No eligibility checks yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Eligibility checks will appear here once users complete the wizard
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
