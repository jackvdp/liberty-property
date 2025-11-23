/**
 * Document Types Configuration
 * Central place to define all document types that users can upload
 */

export interface DocumentTypeConfig {
  id: string
  label: string
  description: string
  required: boolean
  allowMultiple?: boolean
}

export interface DocumentCategoryConfig {
  label: string
  description: string
  types: DocumentTypeConfig[]
}

/**
 * Personal Documents - specific to individual user/flat
 */
export const PERSONAL_DOCUMENTS: DocumentTypeConfig[] = [
  {
    id: "lease",
    label: "Lease",
    description: "Your leasehold agreement",
    required: true,
    allowMultiple: false,
  },
  {
    id: "service_charge",
    label: "Annual Service Charge Accounts Summary",
    description: "Breakdown by year ending",
    required: false,
    allowMultiple: true,
  },
  {
    id: "other_personal",
    label: "Other Personal Documents",
    description: "Any other relevant personal documents",
    required: false,
    allowMultiple: true,
  },
]

/**
 * Building Documents - shared across all leaseholders
 */
export const BUILDING_DOCUMENTS: DocumentTypeConfig[] = [
  {
    id: "articles_of_association",
    label: "Articles of Association",
    description: "Company governing documents",
    required: false,
    allowMultiple: false,
  },
]

/**
 * Complete document categories configuration
 */
export const DOCUMENT_CATEGORIES = {
  personal: {
    label: "Personal Documents",
    description: "Documents specific to your flat or lease",
    types: PERSONAL_DOCUMENTS,
  },
  building: {
    label: "Building Documents",
    description: "Documents related to the entire building",
    types: BUILDING_DOCUMENTS,
  },
} as const

export type DocumentCategory = keyof typeof DOCUMENT_CATEGORIES
export type DocumentTypeId = typeof DOCUMENT_CATEGORIES[DocumentCategory]["types"][number]["id"]
