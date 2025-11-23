"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconHome,
  IconBuilding,
  IconBuilding as IconBuilding2,
  IconFileText,
  IconUsers,
  IconSettings,
  IconHelp,
  IconDashboard,
  IconClipboardCheck,
  type Icon,
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
import Link from "next/link"

// Icon mapping for serialization
const iconMap: Record<string, Icon> = {
  home: IconHome,
  building: IconBuilding,
  building2: IconBuilding2,
  fileText: IconFileText,
  users: IconUsers,
  settings: IconSettings,
  help: IconHelp,
  dashboard: IconDashboard,
  clipboardCheck: IconClipboardCheck,
}

export interface NavItemInput {
  title: string
  url: string
  icon?: string // Icon name instead of component
}

interface NavItemWithIcon {
  title: string
  url: string
  icon?: Icon
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: CurrentUser
  navMainItems: NavItemInput[]
  navSecondaryItems: NavItemInput[]
  sidebarLabel?: string
}

export function AppSidebar({ 
  user,
  navMainItems,
  navSecondaryItems,
  sidebarLabel = "Dashboard",
  ...props 
}: AppSidebarProps) {
  // Convert icon names to icon components
  const resolvedMainItems: NavItemWithIcon[] = navMainItems.map(item => ({
    ...item,
    icon: item.icon ? iconMap[item.icon] : undefined,
  }))

  const resolvedSecondaryItems: NavItemWithIcon[] = navSecondaryItems.map(item => ({
    ...item,
    icon: item.icon ? iconMap[item.icon] : undefined,
  }))

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
                  <span className="truncate text-xs">{sidebarLabel}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={resolvedMainItems} />
        <NavSecondary items={resolvedSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
