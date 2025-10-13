import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"
import { userDashboardNavMain, sharedNavSecondary } from "@/config/navigation"

export default async function Page() {
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
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            {/* Coming Soon Content */}
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="font-reckless text-3xl font-bold text-liberty-background">
                    Coming Soon
                  </h2>
                  <p className="text-liberty-background/70 text-lg">
                    We're building your personalized dashboard where you'll be able to:
                  </p>
                  <ul className="text-left space-y-3 mt-6 max-w-md mx-auto">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Track your RTM or CE progress</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Manage your building documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">Connect with fellow leaseholders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-liberty-background">View service charge comparisons</span>
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
