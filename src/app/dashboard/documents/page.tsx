import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"
import { userDashboardNavMain, sharedNavSecondary } from "@/config/navigation"
import { DocumentsUpload } from "@/components/documents-upload"

export default async function DocumentsPage() {
  // Get current user
  const user = await getCurrentUser()
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

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
        navMainItems={userDashboardNavMain}
        navSecondaryItems={sharedNavSecondary}
        sidebarLabel="Dashboard"
      />
      <SidebarInset>
        <SiteHeader title="Documents" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            <div className="mx-auto max-w-5xl space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Document Management</h2>
                <p className="text-muted-foreground">
                  Upload and manage your personal and building documents securely
                </p>
              </div>

              {/* Documents Upload Component */}
              <DocumentsUpload userId={user.id} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
