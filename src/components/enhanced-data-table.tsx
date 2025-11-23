"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { IconSearch, IconX, IconDownload } from "@tabler/icons-react"
import Papa from "papaparse"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterConfig {
  columnId: string
  title: string
  options: { label: string; value: string }[]
}

export interface ExportConfig {
  filename?: string
  excludeColumns?: string[]
  // Optional: Custom function to transform row data for CSV export
  transformRow?: (row: any) => Record<string, string | number | boolean>
}

interface EnhancedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  filterConfigs?: FilterConfig[]
  defaultPageSize?: number
  enableExport?: boolean
  exportConfig?: ExportConfig
}

export function EnhancedDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  filterConfigs = [],
  defaultPageSize = 20,
  enableExport = true,
  exportConfig = {},
}: EnhancedDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  })

  // Clear all filters
  const clearFilters = () => {
    setColumnFilters([])
    setGlobalFilter("")
  }

  const hasActiveFilters = columnFilters.length > 0 || globalFilter !== ""

  // Export to CSV
  const exportToCSV = () => {
    const { filename = "export", excludeColumns = [], transformRow } = exportConfig

    // Get visible columns
    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible() && !excludeColumns.includes(column.id))

    // Get filtered rows
    const rows = table.getFilteredRowModel().rows

    // Prepare data for CSV - type-safe approach
    const csvData = rows.map((row) => {
      // If custom transformer provided, use it
      if (transformRow) {
        return transformRow(row.original)
      }

      // Otherwise, use default transformation
      const rowData: Record<string, string | number | boolean> = {}
      
      visibleColumns.forEach((column) => {
        const cell = row.getAllCells().find((c) => c.column.id === column.id)
        if (cell) {
          // Get the raw value
          const value = cell.getValue()
          
          // Handle different value types
          if (value === null || value === undefined) {
            rowData[column.id] = ""
          } else if (value instanceof Date) {
            rowData[column.id] = value.toISOString()
          } else if (typeof value === "boolean") {
            rowData[column.id] = value ? "Yes" : "No"
          } else if (typeof value === "object") {
            // For objects, skip them (they're likely complex nested data)
            rowData[column.id] = ""
          } else if (typeof value === "string" || typeof value === "number") {
            rowData[column.id] = value
          } else {
            // Fallback for any other type
            rowData[column.id] = String(value)
          }
        }
      })
      
      return rowData
    })

    // Convert to CSV
    const csv = Papa.unparse(csvData, {
      header: true,
    })

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          {/* Global Search */}
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-9"
              />
            </div>
          )}

          {/* Column Filters */}
          {filterConfigs.map((filterConfig) => {
            const column = table.getColumn(filterConfig.columnId)
            if (!column) return null

            const currentValue = (column.getFilterValue() as string) ?? ""

            return (
              <Select
                key={filterConfig.columnId}
                value={currentValue}
                onValueChange={(value) => {
                  column.setFilterValue(value === "all" ? undefined : value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={filterConfig.title} />
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                  <SelectItem value="all">All {filterConfig.title}</SelectItem>
                  {filterConfig.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          })}

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-9 px-2 lg:px-3"
            >
              Clear
              <IconX className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Export Button */}
          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="h-9"
            >
              <IconDownload className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          )}

          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-liberty-base">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results Count */}
      {hasActiveFilters && (
        <div className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} results
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
