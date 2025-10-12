"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconHome,
  IconBuilding,
  IconFileText,
  IconUsers,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { CurrentUser } from "@/lib/actions/auth.actions"
import Link from "next/link";

const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconHome,
  },
  {
    title: "My Registration",
    url: "/dashboard/registration",
    icon: IconFileText,
  },
  {
    title: "My Building",
    url: "/dashboard/building",
    icon: IconBuilding,
  },
  {
    title: "Leaseholders",
    url: "/dashboard/leaseholders",
    icon: IconUsers,
  },
]

const navSecondaryItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "/contact",
    icon: IconHelp,
  },
]

export function AppSidebar({ 
  user,
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  user: CurrentUser
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="Liberty Bell"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Liberty Bell</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
