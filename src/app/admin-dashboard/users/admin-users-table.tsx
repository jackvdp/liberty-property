"use client"

import { EnhancedDataTable } from "@/components/enhanced-data-table"
import { columns, type AdminUserData } from "@/app/admin-dashboard/users/columns"

interface AdminUsersTableProps {
  users: AdminUserData[]
}

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  return (
    <EnhancedDataTable
      columns={columns}
      data={users}
      searchKey="email"
      searchPlaceholder="Search by email or name..."
      filterConfigs={[
        {
          columnId: "isAdmin",
          title: "Role",
          options: [
            { label: "Admin", value: "true" },
            { label: "User", value: "false" },
          ],
        },
      ]}
      defaultPageSize={20}
      enableExport={true}
      exportConfig={{
        filename: "users",
        excludeColumns: ["id"], // Don't export user IDs
        // Custom transformer to flatten registration data
        transformRow: (row) => {
          const registration = row.registration
          
          return {
            created_at: row.createdAt ? new Date(row.createdAt).toISOString() : "",
            email: row.email || "",
            full_name: row.fullName || "",
            phone: row.phone || "",
            is_admin: row.isAdmin ? "Yes" : "No",
            email_confirmed: row.emailConfirmedAt ? "Yes" : "No",
            last_sign_in_at: row.lastSignInAt ? new Date(row.lastSignInAt).toISOString() : "",
            
            // Flattened registration fields (excluding allAnswers)
            registration_id: registration?.id || "",
            registration_status: registration?.status || "",
            registration_created_at: registration?.createdAt ? new Date(registration.createdAt).toISOString() : "",
            eligibility_check_id: registration?.eligibilityCheckId || "",
            
            // Contact details
            mobile_number: registration?.mobileNumber || "",
            consent_contact: registration?.consentContact ? "Yes" : "No",
            
            // Building details
            building_address: registration?.buildingAddress || "",
            main_building_address: registration?.mainBuildingAddress || "",
            building_identifier: registration?.buildingIdentifier || "",
            postcode: registration?.postcode || "",
            local_authority: registration?.localAuthority || "",
            number_of_flats: registration?.numberOfFlats || "",
            
            // Process choice
            preferred_process: registration?.preferredProcess || "",
            
            // Legal consents
            terms_conditions: registration?.termsConditions ? "Yes" : "No",
            privacy_policy: registration?.privacyPolicy ? "Yes" : "No",
            data_processing: registration?.dataProcessing ? "Yes" : "No",
            marketing_consent: registration?.marketingConsent ? "Yes" : "No",
          }
        },
      }}
    />
  )
}
