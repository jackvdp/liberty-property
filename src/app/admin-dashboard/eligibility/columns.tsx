"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export type EligibilityCheck = {
  id: string
  propertyType: string | null
  flatCount: number | null
  recommendedCaseType: "rtm" | "enfranchisement" | "rmc_takeover" | null
  eligibilityStatus: "success" | "failure" | "info"
  createdAt: Date
}

export const columns: ColumnDef<EligibilityCheck>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return format(new Date(date), "MMM d, yyyy HH:mm")
    },
  },
  {
    accessorKey: "propertyType",
    header: "Property Type",
    cell: ({ row }) => {
      const type = row.getValue("propertyType") as string
      return <span className="capitalize">{type || "N/A"}</span>
    },
  },
  {
    accessorKey: "flatCount",
    header: "Flats",
    cell: ({ row }) => {
      const count = row.getValue("flatCount") as number
      return count || "N/A"
    },
  },
  {
    accessorKey: "recommendedCaseType",
    header: "Recommended Path",
    cell: ({ row }) => {
      const caseType = row.getValue("recommendedCaseType") as string
      
      const typeMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
        rtm: { label: "RTM", variant: "default" },
        enfranchisement: { label: "Enfranchisement", variant: "default" },
        rmc_takeover: { label: "RMC Takeover", variant: "default" },
      }
      
      const type = typeMap[caseType] || { label: "Unknown", variant: "outline" }
      
      return (
        <Badge variant={type.variant}>
          {type.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "eligibilityStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("eligibilityStatus") as string
      
      const statusMap: Record<string, { label: string; className: string }> = {
        success: { label: "Success", className: "bg-green-100 text-green-800 hover:bg-green-100" },
        failure: { label: "Failure", className: "bg-red-100 text-red-800 hover:bg-red-100" },
        info: { label: "Info", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
      }
      
      const statusInfo = statusMap[status] || { label: "Unknown", className: "" }
      
      return (
        <Badge className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return (
        <code className="text-xs bg-muted px-2 py-1 rounded">
          {id.slice(0, 8)}...
        </code>
      )
    },
  },
]
