/**
 * Test Data Generators
 * 
 * Utilities for generating unique test data that won't conflict
 * with existing database records.
 */

/**
 * Generates a unique email address for testing
 * Uses timestamp to ensure uniqueness across test runs
 */
export function generateTestEmail(prefix: string = 'test'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}@test-liberty-bell.com`;
}

/**
 * Generates a unique phone number for testing
 * Uses UK mobile format
 */
export function generateTestPhone(): string {
  const random = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `07700${random}`;
}

/**
 * Generates a unique building address for testing
 */
export function generateTestAddress(): {
  buildingAddress: string;
  postcode: string;
  fullAddress: string;
} {
  const timestamp = Date.now();
  const buildingNumber = Math.floor(Math.random() * 200) + 1;
  const buildingNames = [
    'Test Mansions',
    'Liberty Court',
    'Bell House',
    'Playwright Tower',
    'E2E Gardens',
  ];
  const buildingName = buildingNames[Math.floor(Math.random() * buildingNames.length)];
  
  // Use test postcodes (SW1A is a real London postcode area)
  const postcodeNumber = Math.floor(Math.random() * 9) + 1;
  const postcodeLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const postcode = `SW1A ${postcodeNumber}${postcodeLetter}${postcodeLetter}`;
  
  return {
    buildingAddress: `${buildingNumber} ${buildingName}`,
    postcode,
    fullAddress: `Flat ${Math.floor(Math.random() * 50) + 1}, ${buildingNumber} ${buildingName}, London, ${postcode}`,
  };
}

/**
 * Test user data with all required fields
 */
export interface TestUserData {
  fullName: string;
  email: string;
  phone: string;
}

/**
 * Generates complete test user data
 */
export function generateTestUser(namePrefix: string = 'Test User'): TestUserData {
  const timestamp = Date.now();
  return {
    fullName: `${namePrefix} ${timestamp}`,
    email: generateTestEmail(),
    phone: generateTestPhone(),
  };
}

/**
 * Standard test data for eligibility wizard
 * Represents a qualifying flat scenario
 */
export const QUALIFYING_FLAT_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'yes',
  existingRmcRtm: 'no',
  flatCount: 10,
  longLeaseholders: 'yes',
  singleOwnerMultipleFlats: 'no',
  nonResidentialSpace: 'no',
  convertedHouse: 'no',
  leaseholderSupport: 'yes',
} as const;

/**
 * Test data for a flat that needs leaseholder engagement
 */
export const NEEDS_ENGAGEMENT_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'yes',
  existingRmcRtm: 'no',
  flatCount: 10,
  longLeaseholders: 'yes',
  singleOwnerMultipleFlats: 'no',
  nonResidentialSpace: 'no',
  convertedHouse: 'no',
  leaseholderSupport: 'dont_know', // This triggers leaseholder engagement path
} as const;

/**
 * Test data for a flat with existing RMC
 */
export const EXISTING_RMC_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'yes',
  existingRmcRtm: 'yes', // This triggers RMC process path
} as const;

/**
 * Test data for ineligible scenarios
 */
export const INELIGIBLE_HOUSE_ANSWERS = {
  propertyType: 'house',
  houseRmc: 'no',
} as const;

export const INELIGIBLE_NOT_LEASEHOLD_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'no',
} as const;

export const INELIGIBLE_SINGLE_FLAT_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'yes',
  existingRmcRtm: 'no',
  flatCount: 1, // Single flat is ineligible
} as const;

export const INELIGIBLE_TOO_COMMERCIAL_ANSWERS = {
  propertyType: 'flat',
  flatLeasehold: 'yes',
  existingRmcRtm: 'no',
  flatCount: 10,
  longLeaseholders: 'yes',
  singleOwnerMultipleFlats: 'no',
  nonResidentialSpace: 'yes',
  nonResidentialProportion: 'more_than_50', // Too much commercial space
} as const;
