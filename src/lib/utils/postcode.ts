/**
 * Format a UK postcode to standard format
 * Examples:
 *   "nw66he" -> "NW6 6HE"
 *   "SW1A1AA" -> "SW1A 1AA"
 *   "M1 1AE" -> "M1 1AE"
 *   "m11ae" -> "M1 1AE"
 */
export function formatPostcode(postcode: string | null | undefined): string {
  if (!postcode) return '';
  
  // Remove all whitespace and convert to uppercase
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  
  // UK postcodes are typically 5-7 characters without space
  // Format: outward code (2-4 chars) + space + inward code (3 chars)
  // Examples: SW1A 1AA, M1 1AE, B33 8TH
  
  if (cleaned.length < 5 || cleaned.length > 7) {
    // Invalid length, return as-is but uppercase
    return cleaned;
  }
  
  // The inward code is always 3 characters (e.g., "1AA", "6HE")
  const inwardCode = cleaned.slice(-3);
  const outwardCode = cleaned.slice(0, -3);
  
  return `${outwardCode} ${inwardCode}`;
}
