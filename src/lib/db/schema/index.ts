/**
 * Simplified Liberty Bell Database Schema
 * Eligibility checks and registrations
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
} from 'drizzle-orm/pg-core';

// ============ ENUMS ============

export const eligibilityStatusEnum = pgEnum('eligibility_status', ['success', 'failure', 'info']);
export const caseTypeEnum = pgEnum('case_type', ['rtm', 'enfranchisement', 'rmc_takeover']);
export const registrationStatusEnum = pgEnum('registration_status', [
  'pending',
  'contacted',
  'active',
  'completed'
]);

// ============ REFERENCE TABLES ============

// Reference to Supabase auth.users table (for foreign keys only)
// We don't create this table, it's managed by Supabase
const authUsers = pgTable('auth.users', {
  id: uuid('id').primaryKey(),
});

// ============ ELIGIBILITY CHECKS ============

export const eligibilityChecks = pgTable('eligibility_checks', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Basic property information from eligibility wizard
  propertyType: text('property_type'), // 'flat' or 'house'
  isLeasehold: boolean('is_leasehold'),
  flatCount: integer('flat_count'),
  hasRmcRtm: boolean('has_rmc_rtm'),
  
  // Building characteristics
  nonResidentialProportion: text('non_residential_proportion'), // '25_or_less', 'more_than_25', etc.
  wasConverted: boolean('was_converted'),
  freeholderLivesInBuilding: boolean('freeholder_lives_in_building'),
  
  // Support and eligibility
  leaseholderSupport: text('leaseholder_support'), // 'yes', 'no', 'don_t_know'
  twoThirdsLongLeases: boolean('two_thirds_long_leases'),
  singleOwnerMultipleFlats: boolean('single_owner_multiple_flats'),
  
  // Outcome information
  eligibilityStatus: eligibilityStatusEnum('eligibility_status').notNull(),
  recommendedCaseType: caseTypeEnum('recommended_case_type'),
  outcomeAction: text('outcome_action'), // 'registration', 'leaseholder_engagement_module', 'rmc_process'
  
  // User contact information
  userName: text('user_name'),
  userEmail: text('user_email'),
  userPhone: text('user_phone'),
  
  // Raw data storage
  allAnswers: jsonb('all_answers').notNull(), // Complete questionnaire answers
  outcome: jsonb('outcome').notNull(), // Complete outcome object
  
  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============ REGISTRATIONS ============

export const registrations = pgTable('registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  eligibilityCheckId: uuid('eligibility_check_id').references(() => eligibilityChecks.id),
  userId: uuid('user_id').notNull().references(() => authUsers.id),
  
  // Contact Details (Step 1)
  fullName: text('full_name').notNull(),
  emailAddress: text('email_address').notNull(),
  mobileNumber: text('mobile_number'),
  consentContact: boolean('consent_contact').notNull(),
  
  // Building Details (Step 2)
  buildingAddress: text('building_address').notNull(),
  postcode: text('postcode').notNull(),
  localAuthority: text('local_authority'),
  numberOfFlats: integer('number_of_flats').notNull(),
  
  // Process Choice (Step 6a - optional)
  preferredProcess: text('preferred_process'), // 'rtm', 'ce', 'rmc', 'dk'
  
  // Legal Consents (Step 7)
  termsConditions: boolean('terms_conditions').notNull(),
  privacyPolicy: boolean('privacy_policy').notNull(),
  dataProcessing: boolean('data_processing').notNull(),
  marketingConsent: boolean('marketing_consent'),
  
  // Metadata
  allAnswers: jsonb('all_answers'), // Store complete form data for reference
  status: registrationStatusEnum('status').default('pending'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Export types
export type EligibilityCheck = typeof eligibilityChecks.$inferSelect;
export type NewEligibilityCheck = typeof eligibilityChecks.$inferInsert;

export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;
