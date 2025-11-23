import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"
import { userDashboardNavMain, sharedNavSecondary } from "@/config/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { IconUser, IconBuilding, IconUsers, IconFolder, IconArrowRight } from "@tabler/icons-react"

export default async function Page() {
  // Get current user
  const user = await getCurrentUser()
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login')
  }

  const dashboardCards = [
    {
      title: "Manage Profile",
      description: "Update your personal information and account settings",
      icon: IconUser,
      href: "/dashboard/profile",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Manage Building",
      description: "View and manage your building information and documents",
      icon: IconBuilding,
      href: "/dashboard/building",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Leaseholders Network",
      description: "Connect with other leaseholders in your building",
      icon: IconUsers,
      href: "/dashboard/leaseholders",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Documents",
      description: "Upload and access your personal and building documents",
      icon: IconFolder,
      href: "/dashboard/documents",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

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
            <div className="mx-auto max-w-6xl space-y-6">
              {/* Welcome Header */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome back{user.fullName ? `, ${user.fullName}` : ''}!
                </h2>
                <p className="text-muted-foreground">
                  Manage your profile, building information, and connect with other leaseholders
                </p>
              </div>

              {/* Dashboard Cards Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {dashboardCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <Link key={card.href} href={card.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-lg ${card.bgColor}`}>
                              <Icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <IconArrowRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <CardTitle className="mt-4">{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              {/* Quick Stats or Info Section */}
              <Card className="bg-liberty-secondary/10 border-liberty-secondary/30">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-liberty-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-liberty-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-liberty-background">
                        Getting Started
                      </p>
                      <p className="text-sm text-liberty-background/70">
                        Complete your profile and upload your building documents to get the most out of Liberty Bell. 
                        Connect with other leaseholders in your building to start building a community.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
