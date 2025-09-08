/**
 * Simplified Liberty Bell Database Schema
 * Just eligibility checks for now
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
  
  // Raw data storage
  allAnswers: jsonb('all_answers').notNull(), // Complete questionnaire answers
  outcome: jsonb('outcome').notNull(), // Complete outcome object
  
  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Export types
export type EligibilityCheck = typeof eligibilityChecks.$inferSelect;
export type NewEligibilityCheck = typeof eligibilityChecks.$inferInsert;
