# Enhanced Data Table Usage Guide

The `EnhancedDataTable` component is a reusable data table with built-in search, filtering, sorting, pagination, and column visibility controls.

## Features

- ✅ **Global Search** - Search across all data
- ✅ **Column Filters** - Dropdown filters for specific columns
- ✅ **Sorting** - Click column headers to sort
- ✅ **Pagination** - Navigate through large datasets
- ✅ **Column Visibility** - Show/hide columns
- ✅ **Clear Filters** - Reset all filters at once
- ✅ **CSV Export** - Export filtered data to CSV file
- ✅ **Results Count** - Shows filtered vs total results

## Basic Usage

```tsx
import { EnhancedDataTable } from "@/components/enhanced-data-table"
import { columns } from "./columns"

export default function MyPage() {
  const data = [
    // your data array
  ]

  return (
    <EnhancedDataTable
      columns={columns}
      data={data}
    />
  )
}
```

## With Search

```tsx
<EnhancedDataTable
  columns={columns}
  data={data}
  searchKey="name"  // The column to search
  searchPlaceholder="Search by name..."
/>
```

## With Filters

```tsx
<EnhancedDataTable
  columns={columns}
  data={data}
  filterConfigs={[
    {
      columnId: "status",
      title: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      columnId: "role",
      title: "Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ]}
/>
```

## Full Example

```tsx
<EnhancedDataTable
  columns={columns}
  data={users}
  searchKey="email"
  searchPlaceholder="Search users by email..."
  filterConfigs={[
    {
      columnId: "status",
      title: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ]}
  defaultPageSize={50}  // Default: 20
  enableExport={true}   // Default: true
  exportConfig={{
    filename: "users-export",  // Default: "export"
    excludeColumns: ["id", "password"],  // Optional
  }}
/>
```

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | Yes | - | Column definitions (from TanStack Table) |
| `data` | `TData[]` | Yes | - | Array of data to display |
| `searchKey` | `string` | No | - | Column ID to enable global search |
| `searchPlaceholder` | `string` | No | `"Search..."` | Placeholder text for search input |
| `filterConfigs` | `FilterConfig[]` | No | `[]` | Array of filter configurations |
| `defaultPageSize` | `number` | No | `20` | Number of rows per page |
| `enableExport` | `boolean` | No | `true` | Enable CSV export button |
| `exportConfig` | `ExportConfig` | No | `{}` | CSV export configuration |

## Export Config Structure

```tsx
interface ExportConfig {
  filename?: string        // Base filename (date appended automatically)
  excludeColumns?: string[] // Column IDs to exclude from export
}
```

## Export Behavior

- **Exports filtered data** - Only rows matching current filters
- **Respects column visibility** - Only exports visible columns
- **Auto-formats data**:
  - Dates → ISO format
  - Booleans → "Yes"/"No"
  - Null/undefined → Empty string
  - Objects → JSON string
- **Filename includes date** - e.g., `eligibility-checks_2025-01-15.csv`

## Filter Config Structure

```tsx
interface FilterConfig {
  columnId: string        // Column ID to filter
  title: string          // Label for the filter dropdown
  options: {
    label: string        // Display text
    value: string        // Filter value
  }[]
}
```

## Creating Columns

Columns are defined using TanStack Table's `ColumnDef`:

```tsx
import { ColumnDef } from "@tanstack/react-table"

export type User = {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge>{status}</Badge>
    },
  },
]
```

## Example: Users Table

### Step 1: Define your data type and columns

```tsx
// app/admin/users/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  createdAt: Date
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge className={status === "active" ? "bg-green-100 text-green-800" : ""}>
          {status}
        </Badge>
      )
    },
  },
]
```

### Step 2: Use in your page

```tsx
// app/admin/users/page.tsx
import { EnhancedDataTable } from "@/components/enhanced-data-table"
import { columns } from "./columns"
import { getUsers } from "@/lib/actions/user.actions"

export default async function UsersPage() {
  const { users } = await getUsers()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-muted-foreground">Manage system users</p>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="Search users by email..."
        filterConfigs={[
          {
            columnId: "role",
            title: "Role",
            options: [
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ],
          },
          {
            columnId: "status",
            title: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
        defaultPageSize={50}
        enableExport={true}
        exportConfig={{
          filename: "users",
          excludeColumns: ["id"], // Don't export internal ID
        }}
      />
    </div>
  )
}
```

## Tips

1. **Keep columns file separate** - Makes it easier to maintain and test
2. **Use client component directive** in columns file - Required for interactive cells
3. **Type your data** - TypeScript will help with column definitions
4. **Use accessorKey** - Simplest way to define columns
5. **Custom cells** - Use `cell` property for custom rendering
6. **Filter by actual values** - Make sure filter values match data values exactly

## Best Practices

- **Pagination**: Set appropriate `defaultPageSize` based on expected data volume
- **Search**: Enable search on the most commonly queried field
- **Filters**: Provide filters for categorical data (status, type, category)
- **Column Visibility**: Let users hide columns they don't need
- **Performance**: For very large datasets (>10,000 rows), consider server-side pagination
