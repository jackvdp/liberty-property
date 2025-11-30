/**
 * Database Cleanup Helpers
 * 
 * Utilities for cleaning up test data after tests.
 * These use API endpoints that should only work in development.
 */

import { Page } from '@playwright/test';

/**
 * Records created during a test run for cleanup
 */
export interface TestRecords {
  eligibilityIds: string[];
  registrationIds: string[];
  userEmails: string[];
}

/**
 * Creates a new test records tracker
 */
export function createTestRecords(): TestRecords {
  return {
    eligibilityIds: [],
    registrationIds: [],
    userEmails: [],
  };
}

/**
 * Cleanup function to be called after tests
 * Note: This requires the cleanup API endpoint to be implemented
 */
export async function cleanupTestRecords(
  page: Page,
  records: TestRecords
): Promise<void> {
  if (records.eligibilityIds.length === 0 && 
      records.registrationIds.length === 0 && 
      records.userEmails.length === 0) {
    return;
  }

  console.log('Test records created (manual cleanup may be needed):', {
    eligibilityIds: records.eligibilityIds,
    registrationIds: records.registrationIds,
    userEmails: records.userEmails,
  });

  // TODO: Implement cleanup API endpoint
  // For now, we'll log what was created for manual cleanup if needed
  // 
  // When implemented, this would call:
  // await page.request.delete('/api/test-cleanup', {
  //   data: records,
  // });
}

/**
 * Helper to track an eligibility ID for cleanup
 */
export function trackEligibilityId(records: TestRecords, id: string): void {
  if (id && !records.eligibilityIds.includes(id)) {
    records.eligibilityIds.push(id);
  }
}

/**
 * Helper to track a registration ID for cleanup
 */
export function trackRegistrationId(records: TestRecords, id: string): void {
  if (id && !records.registrationIds.includes(id)) {
    records.registrationIds.push(id);
  }
}

/**
 * Helper to track a user email for cleanup
 */
export function trackUserEmail(records: TestRecords, email: string): void {
  if (email && !records.userEmails.includes(email)) {
    records.userEmails.push(email);
  }
}
