import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"

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

export default async function AdminDashboardPage() {
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
        navMainItems={navMainItems}
        navSecondaryItems={navSecondaryItems}
        sidebarLabel="Admin"
      />
      <SidebarInset>
        <SiteHeader title="Admin Dashboard" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            {/* Admin Dashboard Content - To be implemented */}
            <div className="mx-auto max-w-3xl">
              <div className="bg-liberty-secondary/10 border border-liberty-secondary/30 rounded-xl p-12 text-center">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="w-16 h-16 bg-liberty-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-liberty-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-reckless text-3xl font-bold text-liberty-background">
                    Admin Dashboard
                  </h2>
                  <p className="text-liberty-background/70 text-lg">
                    Admin features coming soon. This is where you'll be able to:
                  </p>
                  <ul className="text-left space-y-3 mt-6 max-w-md mx-auto">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">View all eligibility checks and registrations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Manage user accounts and permissions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Review platform analytics and insights</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Configure system settings and preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
