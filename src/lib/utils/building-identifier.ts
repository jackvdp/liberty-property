/**
 * Building Identifier Utilities
 * 
 * Normalize building addresses and postcodes into unique identifiers
 * for matching buildings across registrations.
 */

/**
 * Normalize building address and postcode into a unique identifier
 * 
 * Rules:
 * - Combines address and postcode
 * - Converts to lowercase
 * - Removes all punctuation (periods, commas, hyphens, apostrophes)
 * - Removes all spaces
 * - Keeps only alphanumeric characters
 * 
 * @param address - The main building address (without flat number)
 * @param postcode - The building postcode
 * @returns Normalized identifier string
 * 
 * @example
 * normalizeForMatching("Wymering Mansions", "NW6 6HE")
 * // Returns: "wymeringmansionsnw66he"
 * 
 * @example
 * normalizeForMatching("123 High Street", "SW1A 1AA")
 * // Returns: "123highstreetsw1a1aa"
 * 
 * @example
 * normalizeForMatching("St. Mary's Court", "E1 4AA")
 * // Returns: "stmaryscourte14aa"
 */
export function normalizeForMatching(address: string, postcode: string): string {
  // Combine address and postcode
  const combined = `${address}${postcode}`;
  
  // Convert to lowercase
  let normalized = combined.toLowerCase();
  
  // Remove all punctuation (periods, commas, hyphens, apostrophes, etc)
  normalized = normalized.replace(/[.,\-']/g, '');
  
  // Remove all spaces
  normalized = normalized.replace(/\s+/g, '');
  
  // Remove any remaining special characters (keep only alphanumeric)
  normalized = normalized.replace(/[^a-z0-9]/g, '');
  
  return normalized;
}

/**
 * Validate if a building identifier is properly formatted
 * (lowercase alphanumeric only)
 */
export function isValidBuildingIdentifier(identifier: string): boolean {
  return /^[a-z0-9]+$/.test(identifier);
}
