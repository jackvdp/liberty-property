/**
 * Shared Navigation Configuration
 * Central place for all dashboard navigation items
 */

export interface NavItem {
  title: string;
  url: string;
  icon: string;
}

/**
 * User Dashboard Navigation Items
 */
export const userDashboardNavMain: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "home",
  },
  {
    title: "My Registration",
    url: "/dashboard/registration",
    icon: "fileText",
  },
  {
    title: "My Building",
    url: "/dashboard/building",
    icon: "building",
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: "folder",
  },
  {
    title: "Leaseholders",
    url: "/dashboard/leaseholders",
    icon: "users",
  },
];

/**
 * Admin Dashboard Navigation Items
 */
export const adminDashboardNavMain: NavItem[] = [
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
  {
    title: "Buildings",
    url: "/admin-dashboard/buildings",
    icon: "building2",
  },
];

/**
 * Shared Secondary Navigation Items
 * Used by both user and admin dashboards
 */
export const sharedNavSecondary: NavItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: "settings",
  },
  {
    title: "Get Help",
    url: "/contact",
    icon: "help",
  },
];
