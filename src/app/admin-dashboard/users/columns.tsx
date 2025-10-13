"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { IconCheck, IconX, IconShieldCheck } from "@tabler/icons-react"
import type { Registration } from "@/lib/db/schema"

export type AdminUserData = {
  id: string
  email: string
  fullName: string | null
  phone: string | null
  isAdmin: boolean
  emailConfirmedAt: Date | null
  createdAt: Date
  lastSignInAt: Date | null
  registration: Registration | null
}

export const columns: ColumnDef<AdminUserData>[] = [
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return (
        <div className="whitespace-nowrap">
          {format(new Date(date), "MMM d, yyyy")}
          <div className="text-xs text-muted-foreground">
            {format(new Date(date), "HH:mm")}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string
      const isConfirmed = row.original.emailConfirmedAt
      
      return (
        <div className="space-y-1">
          <div className="font-medium">{email}</div>
          {isConfirmed ? (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <IconCheck className="w-3 h-3" />
              Verified
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <IconX className="w-3 h-3" />
              Unverified
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("fullName") as string
      const phone = row.original.phone
      
      return (
        <div className="space-y-1">
          {name ? (
            <div className="font-medium">{name}</div>
          ) : (
            <span className="text-muted-foreground">No name</span>
          )}
          {phone && (
            <div className="text-xs text-muted-foreground">{phone}</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin") as boolean
      
      return isAdmin ? (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <IconShieldCheck className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      ) : (
        <Badge variant="outline">User</Badge>
      )
    },
  },
  {
    accessorKey: "lastSignInAt",
    header: "Last Sign In",
    cell: ({ row }) => {
      const date = row.getValue("lastSignInAt") as Date | null
      
      if (!date) {
        return <span className="text-muted-foreground text-sm">Never</span>
      }
      
      return (
        <div className="text-sm">
          {format(new Date(date), "MMM d, yyyy HH:mm")}
        </div>
      )
    },
  },
  {
    accessorKey: "registration",
    header: "Registration",
    cell: ({ row }) => {
      const registration = row.getValue("registration") as Registration | null
      
      if (!registration) {
        return (
          <Badge variant="outline" className="bg-gray-50">
            No Registration
          </Badge>
        )
      }
      
      const statusMap: Record<string, { label: string; className: string }> = {
        pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
        contacted: { label: "Contacted", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
        active: { label: "Active", className: "bg-green-100 text-green-800 hover:bg-green-100" },
        completed: { label: "Completed", className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
      }
      
      const statusInfo = statusMap[registration.status || "pending"]
      
      return (
        <Badge className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      )
    },
  },
  {
    id: "buildingAddress",
    header: "Building",
    cell: ({ row }) => {
      const registration = row.original.registration
      
      if (!registration) {
        return <span className="text-muted-foreground">—</span>
      }
      
      return (
        <div className="space-y-1">
          <div className="font-medium max-w-[200px] truncate">{registration.buildingAddress}</div>
          <div className="text-xs text-muted-foreground">
            {registration.postcode}
            {registration.numberOfFlats && ` • ${registration.numberOfFlats} flats`}
          </div>
        </div>
      )
    },
  },
  {
    id: "preferredProcess",
    header: "Process",
    cell: ({ row }) => {
      const registration = row.original.registration
      
      if (!registration?.preferredProcess) {
        return <span className="text-muted-foreground">—</span>
      }
      
      const processMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
        rtm: { label: "RTM", variant: "default" },
        ce: { label: "Enfranchisement", variant: "secondary" },
        rmc: { label: "RMC", variant: "outline" },
        dk: { label: "Don't Know", variant: "outline" },
      }
      
      const info = processMap[registration.preferredProcess] || { label: registration.preferredProcess, variant: "outline" }
      
      return (
        <Badge variant={info.variant} className="text-xs">
          {info.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return (
        <code className="text-xs bg-muted px-2 py-1 rounded">
          {id.slice(0, 8)}
        </code>
      )
    },
  },
]
