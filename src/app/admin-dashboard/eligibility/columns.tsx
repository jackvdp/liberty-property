"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { IconCheck, IconX } from "@tabler/icons-react"
import type { EligibilityCheck } from "@/lib/db/schema"

// Helper component for boolean display
const BooleanCell = ({ value }: { value: boolean | null }) => {
  if (value === null) return <span className="text-muted-foreground">N/A</span>
  return value ? (
    <IconCheck className="w-4 h-4 text-green-600" />
  ) : (
    <IconX className="w-4 h-4 text-red-600" />
  )
}

export const columns: ColumnDef<EligibilityCheck, unknown>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
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
    accessorKey: "userName",
    header: "Contact",
    cell: ({ row }) => {
      const name = row.getValue("userName") as string
      const email = row.original.userEmail
      const phone = row.original.userPhone
      
      return (
        <div className="space-y-1">
          {name && <div className="font-medium">{name}</div>}
          {email && (
            <div className="text-xs text-muted-foreground">
              {email}
            </div>
          )}
          {phone && (
            <div className="text-xs text-muted-foreground">
              {phone}
            </div>
          )}
          {!name && !email && !phone && (
            <span className="text-muted-foreground">No contact</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "propertyType",
    header: "Property",
    cell: ({ row }) => {
      const type = row.getValue("propertyType") as string
      const isLeasehold = row.original.isLeasehold
      
      return (
        <div>
          <div className="font-medium capitalize">{type || "N/A"}</div>
          {isLeasehold !== null && (
            <div className="text-xs text-muted-foreground">
              {isLeasehold ? "Leasehold" : "Not Leasehold"}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "flatCount",
    header: "Flats",
    cell: ({ row }) => {
      const count = row.getValue("flatCount") as number
      return (
        <div className="text-center font-mono">
          {count || <span className="text-muted-foreground">N/A</span>}
        </div>
      )
    },
  },
  {
    id: "hasRmc",
    header: "Has RMC",
    accessorFn: (row) => {
      const allAnswers = row.allAnswers as Array<{ questionId: string; value: unknown }> | null
      if (!allAnswers) return null
      
      // Check new split question first
      const rmcAnswer = allAnswers.find(a => a.questionId === 'existing_rmc')?.value
      if (rmcAnswer === 'yes') return true
      if (rmcAnswer === 'no') return false
      
      // Fall back to old combined question for legacy records
      const legacyAnswer = allAnswers.find(a => a.questionId === 'existing_rmc_rtm')?.value
      if (legacyAnswer === 'yes') return true
      if (legacyAnswer === 'no') return false
      
      return null
    },
    cell: ({ row }) => {
      const allAnswers = row.original.allAnswers as Array<{ questionId: string; value: unknown }> | null
      if (!allAnswers) return <span className="text-muted-foreground">N/A</span>
      
      // Check new split question first
      const rmcAnswer = allAnswers.find(a => a.questionId === 'existing_rmc')?.value
      if (rmcAnswer === 'yes') return <IconCheck className="w-4 h-4 text-green-600" />
      if (rmcAnswer === 'no') return <IconX className="w-4 h-4 text-red-600" />
      
      // Fall back to old combined question for legacy records
      const legacyAnswer = allAnswers.find(a => a.questionId === 'existing_rmc_rtm')?.value
      if (legacyAnswer === 'yes') return <IconCheck className="w-4 h-4 text-green-600" />
      if (legacyAnswer === 'no') return <IconX className="w-4 h-4 text-red-600" />
      
      return <span className="text-muted-foreground">N/A</span>
    },
  },
  {
    id: "hasRtm",
    header: "Has RTM",
    accessorFn: (row) => {
      const allAnswers = row.allAnswers as Array<{ questionId: string; value: unknown }> | null
      if (!allAnswers) return null
      
      // Check new split question first
      const rtmAnswer = allAnswers.find(a => a.questionId === 'existing_rtm')?.value
      if (rtmAnswer === 'yes') return true
      if (rtmAnswer === 'no') return false
      
      // For legacy records with combined question, default to false
      const legacyAnswer = allAnswers.find(a => a.questionId === 'existing_rmc_rtm')?.value
      if (legacyAnswer !== undefined) return false
      
      return null
    },
    cell: ({ row }) => {
      const allAnswers = row.original.allAnswers as Array<{ questionId: string; value: unknown }> | null
      if (!allAnswers) return <span className="text-muted-foreground">N/A</span>
      
      // Check new split question first
      const rtmAnswer = allAnswers.find(a => a.questionId === 'existing_rtm')?.value
      if (rtmAnswer === 'yes') return <IconCheck className="w-4 h-4 text-green-600" />
      if (rtmAnswer === 'no') return <IconX className="w-4 h-4 text-red-600" />
      
      // For legacy records with combined question, we can't distinguish RMC from RTM
      // Default to X for RTM column on legacy records
      const legacyAnswer = allAnswers.find(a => a.questionId === 'existing_rmc_rtm')?.value
      if (legacyAnswer !== undefined) return <IconX className="w-4 h-4 text-red-600" />
      
      return <span className="text-muted-foreground">N/A</span>
    },
  },
  {
    accessorKey: "nonResidentialProportion",
    header: "Non-Residential",
    cell: ({ row }) => {
      const proportion = row.getValue("nonResidentialProportion") as string
      
      const proportionMap: Record<string, string> = {
        "25_or_less": "≤25%",
        "more_than_25": "25-50%",
        "more_than_50": ">50%",
      }
      
      return (
        <span className="text-sm">
          {proportion ? proportionMap[proportion] || proportion : "N/A"}
        </span>
      )
    },
  },
  {
    accessorKey: "wasConverted",
    header: "Converted",
    cell: ({ row }) => {
      return <BooleanCell value={row.getValue("wasConverted")} />
    },
  },
  {
    accessorKey: "freeholderLivesInBuilding",
    header: "Freeholder Lives In",
    cell: ({ row }) => {
      return <BooleanCell value={row.getValue("freeholderLivesInBuilding")} />
    },
  },
  {
    accessorKey: "twoThirdsLongLeases",
    header: "2/3 Long Leases",
    cell: ({ row }) => {
      return <BooleanCell value={row.getValue("twoThirdsLongLeases")} />
    },
  },
  {
    accessorKey: "singleOwnerMultipleFlats",
    header: "Single Owner",
    cell: ({ row }) => {
      return <BooleanCell value={row.getValue("singleOwnerMultipleFlats")} />
    },
  },
  {
    accessorKey: "leaseholderSupport",
    header: "Support",
    cell: ({ row }) => {
      const support = row.getValue("leaseholderSupport") as string
      
      const supportMap: Record<string, { label: string; className: string }> = {
        yes: { label: "Yes", className: "bg-green-100 text-green-800 hover:bg-green-100" },
        no: { label: "No", className: "bg-red-100 text-red-800 hover:bg-red-100" },
        don_t_know: { label: "Don't Know", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
      }
      
      const info = supportMap[support] || { label: "N/A", className: "" }
      
      return (
        <Badge variant="outline" className={info.className}>
          {info.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "recommendedCaseType",
    header: "Recommended",
    cell: ({ row }) => {
      const caseType = row.getValue("recommendedCaseType") as string
      
      const typeMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
        rtm: { label: "RTM", variant: "default" },
        enfranchisement: { label: "Enfranchisement", variant: "secondary" },
        rmc_takeover: { label: "RMC Takeover", variant: "outline" },
        rtm_takeover: { label: "RTM Takeover", variant: "outline" },
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
    accessorKey: "outcomeAction",
    header: "Action",
    cell: ({ row }) => {
      const action = row.getValue("outcomeAction") as string
      
      const actionMap: Record<string, string> = {
        registration: "Registration",
        leaseholder_engagement_module: "Engagement",
        rmc_process: "RMC Process",
        rtm_takeover: "RTM Takeover",
      }
      
      return (
        <span className="text-sm">
          {action ? actionMap[action] || action : "N/A"}
        </span>
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
          {id.slice(0, 8)}
        </code>
      )
    },
  },
]
