import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/actions/auth.actions"
import { redirect } from "next/navigation"
import { adminDashboardNavMain, sharedNavSecondary } from "@/config/navigation"
import Link from "next/link"
import { IconClipboardCheck, IconUsers, IconBuilding } from "@tabler/icons-react"
import { ArrowRight } from "lucide-react"

export default async function AdminDashboardPage() {
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
        <SiteHeader title="Admin Dashboard" />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-8 md:min-h-min">
            <div className="mx-auto max-w-5xl space-y-8">
              {/* Welcome Header */}
              <div className="text-center space-y-2">
                <h2 className="font-reckless text-3xl font-bold text-liberty-background">
                  Welcome back, {user.name || 'Admin'}
                </h2>
                <p className="text-liberty-background/70 text-lg">
                  Manage your platform from the sections below
                </p>
              </div>

              {/* Navigation Cards */}
              <div className="grid gap-6 md:grid-cols-3">
                <DashboardCard
                  title="Eligibility Checks"
                  description="View and filter all eligibility wizard submissions"
                  icon={<IconClipboardCheck className="h-8 w-8" />}
                  href="/admin-dashboard/eligibility"
                  color="blue"
                />
                
                <DashboardCard
                  title="Users"
                  description="Manage all registered users and their details"
                  icon={<IconUsers className="h-8 w-8" />}
                  href="/admin-dashboard/users"
                  color="green"
                />
                
                <DashboardCard
                  title="Buildings"
                  description="View all buildings with registered leaseholders"
                  icon={<IconBuilding className="h-8 w-8" />}
                  href="/admin-dashboard/buildings"
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: 'blue' | 'green' | 'purple'
}

function DashboardCard({ title, description, icon, href, color }: DashboardCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100 text-blue-600',
    green: 'bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100 text-green-600',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100 text-purple-600',
  }

  return (
    <Link href={href}>
      <div className={`
        group relative rounded-xl border-2 p-6 transition-all duration-200
        ${colorClasses[color]}
      `}>
        {/* Icon */}
        <div className="mb-4">
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-liberty-background">
            {title}
          </h3>
          <p className="text-sm text-liberty-background/70">
            {description}
          </p>
        </div>

        {/* Arrow Icon */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight className="h-5 w-5 text-liberty-background/50" />
        </div>
      </div>
    </Link>
  )
}
