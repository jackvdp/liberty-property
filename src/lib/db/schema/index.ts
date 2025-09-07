/**
 * Drizzle ORM Schema Definitions
 * Central schema for Liberty Bell database
 */

import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
  pgEnum,
  decimal,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============ ENUMS ============

export const userRoleEnum = pgEnum('user_role', ['leaseholder', 'admin', 'agent']);
export const caseStatusEnum = pgEnum('case_status', ['draft', 'active', 'completed', 'cancelled']);
export const caseTypeEnum = pgEnum('case_type', ['rtm', 'enfranchisement', 'rmc_takeover']);
export const documentTypeEnum = pgEnum('document_type', ['lease', 'notice', 'form', 'correspondence', 'other']);

// ============ USER & AUTH ============

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  mobileNumber: text('mobile_number'),
  role: userRoleEnum('role').notNull().default('leaseholder'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============ BUILDINGS & PROPERTIES ============

export const buildings = pgTable('buildings', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  addressLine1: text('address_line_1').notNull(),
  addressLine2: text('address_line_2'),
  city: text('city').notNull(),
  postcode: text('postcode').notNull(),
  localAuthority: text('local_authority'),
  numberOfFlats: integer('number_of_flats').notNull(),
  hasRmcRtm: boolean('has_rmc_rtm').default(false),
  commercialPercentage: decimal('commercial_percentage', { precision: 5, scale: 2 }),
  isConverted: boolean('is_converted').default(false),
  freeholderLivesInBuilding: boolean('freeholder_lives_in_building').default(false),
  metadata: jsonb('metadata'), // Additional flexible data
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const properties = pgTable('properties', {
  id: uuid('id').primaryKey().defaultRandom(),
  buildingId: uuid('building_id').notNull().references(() => buildings.id),
  userId: uuid('user_id').references(() => users.id),
  flatNumber: text('flat_number'),
  leaseYearsRemaining: integer('lease_years_remaining'),
  annualGroundRent: decimal('annual_ground_rent', { precision: 10, scale: 2 }),
  serviceChargeAnnual: decimal('service_charge_annual', { precision: 10, scale: 2 }),
  propertyValue: decimal('property_value', { precision: 12, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============ CASES & WORKFLOW ============

export const cases = pgTable('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseNumber: text('case_number').notNull().unique(), // e.g., "RTM-2024-001"
  buildingId: uuid('building_id').notNull().references(() => buildings.id),
  leadUserId: uuid('lead_user_id').references(() => users.id),
  caseType: caseTypeEnum('case_type').notNull(),
  status: caseStatusEnum('status').notNull().default('draft'),
  
  // Authority & Support
  hasAuthority: boolean('has_authority').default(false),
  supportPercentage: decimal('support_percentage', { precision: 5, scale: 2 }),
  
  // Key dates
  startedAt: timestamp('started_at'),
  targetCompletionDate: date('target_completion_date'),
  completedAt: timestamp('completed_at'),
  
  // Process specific data
  metadata: jsonb('metadata'), // Flexible data for different case types
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const caseParticipants = pgTable('case_participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  propertyId: uuid('property_id').references(() => properties.id),
  isLead: boolean('is_lead').default(false),
  hasConsented: boolean('has_consented').default(false),
  consentedAt: timestamp('consented_at'),
  role: text('role'), // 'lead', 'co-lead', 'participant'
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============ DOCUMENTS ============

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').references(() => cases.id),
  uploadedBy: uuid('uploaded_by').notNull().references(() => users.id),
  documentType: documentTypeEnum('document_type').notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(), // Vercel Blob URL
  fileSize: integer('file_size'), // in bytes
  mimeType: text('mime_type'),
  metadata: jsonb('metadata'), // OCR results, parsed data, etc.
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============ WORKFLOW TRACKING ============

export const workflowSteps = pgTable('workflow_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  stepName: text('step_name').notNull(),
  stepOrder: integer('step_order').notNull(),
  status: text('status').notNull().default('pending'), // pending, in_progress, completed, skipped
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  completedBy: uuid('completed_by').references(() => users.id),
  data: jsonb('data'), // Step-specific data
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============ COMMUNICATIONS ============

export const communications = pgTable('communications', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  type: text('type').notNull(), // 'email', 'sms', 'letter', 'notice'
  recipient: text('recipient').notNull(),
  subject: text('subject'),
  content: text('content').notNull(),
  sentAt: timestamp('sent_at'),
  status: text('status').notNull().default('pending'), // pending, sent, failed
  metadata: jsonb('metadata'), // tracking info, responses, etc.
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============ RELATIONS ============

export const usersRelations = relations(users, ({ many }) => ({
  properties: many(properties),
  leadCases: many(cases),
  caseParticipations: many(caseParticipants),
  documents: many(documents),
}));

export const buildingsRelations = relations(buildings, ({ many }) => ({
  properties: many(properties),
  cases: many(cases),
}));

export const propertiesRelations = relations(properties, ({ one }) => ({
  building: one(buildings, {
    fields: [properties.buildingId],
    references: [buildings.id],
  }),
  owner: one(users, {
    fields: [properties.userId],
    references: [users.id],
  }),
}));

export const casesRelations = relations(cases, ({ one, many }) => ({
  building: one(buildings, {
    fields: [cases.buildingId],
    references: [buildings.id],
  }),
  leadUser: one(users, {
    fields: [cases.leadUserId],
    references: [users.id],
  }),
  participants: many(caseParticipants),
  documents: many(documents),
  workflowSteps: many(workflowSteps),
  communications: many(communications),
}));

export const caseParticipantsRelations = relations(caseParticipants, ({ one }) => ({
  case: one(cases, {
    fields: [caseParticipants.caseId],
    references: [cases.id],
  }),
  user: one(users, {
    fields: [caseParticipants.userId],
    references: [users.id],
  }),
  property: one(properties, {
    fields: [caseParticipants.propertyId],
    references: [properties.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Building = typeof buildings.$inferSelect;
export type NewBuilding = typeof buildings.$inferInsert;
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
