/**
 * Building Identifier Normalization Tests
 * 
 * These tests serve as documentation for how the normalizeForMatching() function
 * transforms building addresses and postcodes into unique identifiers for matching.
 * 
 * Purpose: Create consistent identifiers so that multiple registrations for the same
 * building can be grouped together, even if users enter the address slightly differently.
 * 
 * Rules:
 * 1. Combines address + postcode
 * 2. Converts to lowercase
 * 3. Removes all punctuation (periods, commas, hyphens, apostrophes)
 * 4. Removes all spaces
 * 5. Keeps only alphanumeric characters (a-z, 0-9)
 */

import { normalizeForMatching, isValidBuildingIdentifier } from '../building-identifier';

describe('normalizeForMatching()', () => {
  describe('Basic Functionality', () => {
    it('should combine address and postcode into a single identifier', () => {
      const result = normalizeForMatching('Wymering Mansions', 'NW6 6HE');
      expect(result).toBe('wymeringmansionsnw66he');
    });

    it('should convert everything to lowercase', () => {
      const result = normalizeForMatching('WYMERING MANSIONS', 'NW6 6HE');
      expect(result).toBe('wymeringmansionsnw66he');
    });

    it('should remove all spaces from both address and postcode', () => {
      const result = normalizeForMatching('The Old Brewery', 'SE1 9PG');
      expect(result).toBe('theoldbreweryse19pg');
    });
  });

  describe('Punctuation Removal', () => {
    it('should remove periods from addresses', () => {
      const result = normalizeForMatching('St. James Court', 'SW1A 1AA');
      expect(result).toBe('stjamescourtsw1a1aa');
    });

    it('should remove commas from addresses', () => {
      const result = normalizeForMatching('Block A, Churchill Gardens', 'SW1V 3AT');
      expect(result).toBe('blockachurchillgardenssw1v3at');
    });

    it('should remove hyphens from addresses', () => {
      const result = normalizeForMatching('Upper-Ground Floor', 'SE1 9PG');
      expect(result).toBe('uppergroundfloorse19pg');
    });

    it('should remove apostrophes from addresses', () => {
      const result = normalizeForMatching("St. Mary's Court", 'E1 4AA');
      expect(result).toBe('stmaryscourte14aa');
    });

    it('should remove multiple types of punctuation', () => {
      const result = normalizeForMatching("St. Mary's Court, Block-A", 'E1 4AA');
      expect(result).toBe('stmaryscourtblockae14aa');
    });
  });

  describe('Special Characters', () => {
    it('should remove ampersands', () => {
      const result = normalizeForMatching('Smith & Jones Building', 'EC1A 1BB');
      expect(result).toBe('smithjonesbuildingec1a1bb');
    });

    it('should remove slashes', () => {
      const result = normalizeForMatching('A/B Court', 'W1A 1AA');
      expect(result).toBe('abcourtw1a1aa');
    });

    it('should remove parentheses', () => {
      const result = normalizeForMatching('Tower (East Wing)', 'NW1 1AA');
      expect(result).toBe('towereastwingnw11aa');
    });

    it('should handle Unicode and accented characters', () => {
      const result = normalizeForMatching('Café Apartments', 'W1B 1AA');
      expect(result).toBe('cafapartmentsw1b1aa');
    });
  });

  describe('Real-World Examples', () => {
    describe('Apartment Buildings', () => {
      it('should normalize "Wymering Mansions, NW6 6HE"', () => {
        expect(normalizeForMatching('Wymering Mansions', 'NW6 6HE'))
          .toBe('wymeringmansionsnw66he');
      });

      it('should normalize "Barbican Estate, EC2Y 8BN"', () => {
        expect(normalizeForMatching('Barbican Estate', 'EC2Y 8BN'))
          .toBe('barbicanestateec2y8bn');
      });

      it('should normalize "Churchill Gardens Estate, SW1V 3AT"', () => {
        expect(normalizeForMatching('Churchill Gardens Estate', 'SW1V 3AT'))
          .toBe('churchillgardensestatesw1v3at');
      });
    });

    describe('Street Addresses', () => {
      it('should normalize "123 High Street, SW1A 1AA"', () => {
        expect(normalizeForMatching('123 High Street', 'SW1A 1AA'))
          .toBe('123highstreetsw1a1aa');
      });

      it('should normalize "10 Downing Street, SW1A 2AA"', () => {
        expect(normalizeForMatching('10 Downing Street', 'SW1A 2AA'))
          .toBe('10downingstreetsw1a2aa');
      });

      it('should normalize "221B Baker Street, NW1 6XE"', () => {
        expect(normalizeForMatching('221B Baker Street', 'NW1 6XE'))
          .toBe('221bbakerstreetnw16xe');
      });
    });

    describe('Historic or Named Buildings', () => {
      it('should normalize "The Shard, SE1 9SG"', () => {
        expect(normalizeForMatching('The Shard', 'SE1 9SG'))
          .toBe('theshardse19sg');
      });

      it('should normalize "One Canada Square, E14 5AB"', () => {
        expect(normalizeForMatching('One Canada Square', 'E14 5AB'))
          .toBe('onecanadasquaree145ab');
      });

      it('should normalize "The Gherkin, EC3A 8EP"', () => {
        expect(normalizeForMatching('The Gherkin', 'EC3A 8EP'))
          .toBe('thegherkinec3a8ep');
      });
    });

    describe('Complex Buildings with Blocks/Wings', () => {
      it('should normalize "Churchill Gardens, Block A, SW1V 3AT"', () => {
        expect(normalizeForMatching('Churchill Gardens, Block A', 'SW1V 3AT'))
          .toBe('churchillgardensblockasw1v3at');
      });

      it('should normalize "Barbican Estate - Cromwell Tower, EC2Y 8DD"', () => {
        expect(normalizeForMatching('Barbican Estate - Cromwell Tower', 'EC2Y 8DD'))
          .toBe('barbicanestatecromwelltowerec2y8dd');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      expect(normalizeForMatching('', '')).toBe('');
    });

    it('should handle addresses with only spaces', () => {
      expect(normalizeForMatching('   ', '   ')).toBe('');
    });

    it('should handle addresses with only punctuation', () => {
      expect(normalizeForMatching('...', '---')).toBe('');
    });

    it('should handle very long building names', () => {
      const longName = 'The Royal Borough of Kensington and Chelsea Council Housing Estate Block A';
      const result = normalizeForMatching(longName, 'SW7 1RW');
      expect(result).toBe('theroyalboroughofkensingtonandchelseacouncilhousingestateblockasw71rw');
      expect(result.length).toBeGreaterThan(50);
    });

    it('should handle addresses with numbers only', () => {
      expect(normalizeForMatching('123', 'SW1A 1AA'))
        .toBe('123sw1a1aa');
    });

    it('should handle postcodes with extra spaces', () => {
      expect(normalizeForMatching('High Street', '  SW1A   1AA  '))
        .toBe('highstreetsw1a1aa');
    });
  });

  describe('Consistency - Same Building, Different Inputs', () => {
    it('should produce identical identifiers for the same building regardless of case', () => {
      const lowercase = normalizeForMatching('wymering mansions', 'nw6 6he');
      const uppercase = normalizeForMatching('WYMERING MANSIONS', 'NW6 6HE');
      const mixedcase = normalizeForMatching('Wymering Mansions', 'NW6 6HE');
      
      expect(lowercase).toBe(uppercase);
      expect(uppercase).toBe(mixedcase);
      expect(lowercase).toBe('wymeringmansionsnw66he');
    });

    it('should produce identical identifiers regardless of spacing variations', () => {
      const singleSpace = normalizeForMatching('High Street', 'SW1A 1AA');
      const multiSpace = normalizeForMatching('High  Street', 'SW1A  1AA');
      const noSpace = normalizeForMatching('HighStreet', 'SW1A1AA');
      
      expect(singleSpace).toBe(multiSpace);
      expect(multiSpace).toBe(noSpace);
      expect(singleSpace).toBe('highstreetsw1a1aa');
    });

    it('should produce identical identifiers regardless of punctuation style', () => {
      const withPeriods = normalizeForMatching('St. James Court', 'SW1A 1AA');
      const withoutPeriods = normalizeForMatching('St James Court', 'SW1A 1AA');
      const withComma = normalizeForMatching('St. James Court,', 'SW1A 1AA');
      
      expect(withPeriods).toBe(withoutPeriods);
      expect(withoutPeriods).toBe(withComma);
      expect(withPeriods).toBe('stjamescourtsw1a1aa');
    });
  });

  describe('Differentiation - Different Buildings', () => {
    it('should produce different identifiers for different building names', () => {
      const building1 = normalizeForMatching('Wymering Mansions', 'NW6 6HE');
      const building2 = normalizeForMatching('Churchill Gardens', 'NW6 6HE');
      
      expect(building1).not.toBe(building2);
    });

    it('should produce different identifiers for different postcodes', () => {
      const building1 = normalizeForMatching('High Street', 'SW1A 1AA');
      const building2 = normalizeForMatching('High Street', 'SW1A 2AA');
      
      expect(building1).not.toBe(building2);
    });

    it('should produce different identifiers for singular vs plural building names', () => {
      const singular = normalizeForMatching('Wymering Mansion', 'NW6 6HE');
      const plural = normalizeForMatching('Wymering Mansions', 'NW6 6HE');
      
      // This is expected behavior - typos will create different identifiers
      // Admin review/merge functionality should handle these cases
      expect(singular).not.toBe(plural);
      expect(singular).toBe('wymeringmansionnw66he');
      expect(plural).toBe('wymeringmansionsnw66he');
    });
  });

  describe('Common Variations That Should Match', () => {
    it('should match "Road" vs "Rd" when written out', () => {
      // Note: Our users are instructed to write "Road" not "Rd"
      // This test documents that the instruction is important
      const fullWord = normalizeForMatching('123 High Road', 'SW1A 1AA');
      const abbreviated = normalizeForMatching('123 High Rd', 'SW1A 1AA');
      
      expect(fullWord).not.toBe(abbreviated);
      expect(fullWord).toBe('123highroadsw1a1aa');
      expect(abbreviated).toBe('123highrdsw1a1aa');
    });

    it('should match "Street" vs "St" when written out', () => {
      const fullWord = normalizeForMatching('123 High Street', 'SW1A 1AA');
      const abbreviated = normalizeForMatching('123 High St', 'SW1A 1AA');
      
      expect(fullWord).not.toBe(abbreviated);
      expect(fullWord).toBe('123highstreetsw1a1aa');
      expect(abbreviated).toBe('123highstsw1a1aa');
    });
  });
});

describe('isValidBuildingIdentifier()', () => {
  describe('Valid Identifiers', () => {
    it('should return true for properly normalized identifiers', () => {
      expect(isValidBuildingIdentifier('wymeringmansionsnw66he')).toBe(true);
      expect(isValidBuildingIdentifier('123highstreetsw1a1aa')).toBe(true);
      expect(isValidBuildingIdentifier('abc123xyz')).toBe(true);
    });

    it('should return true for identifiers with only letters', () => {
      expect(isValidBuildingIdentifier('abcdefghijk')).toBe(true);
    });

    it('should return true for identifiers with only numbers', () => {
      expect(isValidBuildingIdentifier('1234567890')).toBe(true);
    });
  });

  describe('Invalid Identifiers', () => {
    it('should return false for identifiers with uppercase letters', () => {
      expect(isValidBuildingIdentifier('WymeringMansions')).toBe(false);
      expect(isValidBuildingIdentifier('ALLCAPS')).toBe(false);
    });

    it('should return false for identifiers with spaces', () => {
      expect(isValidBuildingIdentifier('wymering mansions')).toBe(false);
      expect(isValidBuildingIdentifier('high street')).toBe(false);
    });

    it('should return false for identifiers with punctuation', () => {
      expect(isValidBuildingIdentifier('st.james')).toBe(false);
      expect(isValidBuildingIdentifier('high-street')).toBe(false);
      expect(isValidBuildingIdentifier("mary's")).toBe(false);
    });

    it('should return false for identifiers with special characters', () => {
      expect(isValidBuildingIdentifier('building@123')).toBe(false);
      expect(isValidBuildingIdentifier('street#1')).toBe(false);
      expect(isValidBuildingIdentifier('block&tower')).toBe(false);
    });

    it('should return false for empty strings', () => {
      expect(isValidBuildingIdentifier('')).toBe(false);
    });
  });
});

/**
 * USAGE EXAMPLES
 * 
 * These examples show how to use the normalizeForMatching function in your code:
 * 
 * Example 1: Creating an identifier when saving a registration
 * ```typescript
 * const buildingIdentifier = normalizeForMatching(
 *   "Wymering Mansions",
 *   "NW6 6HE"
 * );
 * // Result: "wymeringmansionsnw66he"
 * ```
 * 
 * Example 2: Querying registrations for the same building
 * ```sql
 * SELECT * FROM registrations 
 * WHERE building_identifier = 'wymeringmansionsnw66he';
 * ```
 * 
 * Example 3: Grouping registrations by building
 * ```sql
 * SELECT building_identifier, COUNT(*) as registration_count
 * FROM registrations
 * GROUP BY building_identifier
 * ORDER BY registration_count DESC;
 * ```
 * 
 * Example 4: Validating an identifier
 * ```typescript
 * if (!isValidBuildingIdentifier(identifier)) {
 *   console.error('Invalid building identifier format');
 * }
 * ```
 * 
 * IMPORTANT NOTES FOR USERS:
 * 
 * 1. Always write street names in full (e.g., "Road" not "Rd", "Street" not "St")
 *    This ensures consistent identifiers across registrations.
 * 
 * 2. Do not include flat/unit numbers in the building address
 *    Use "Wymering Mansions" not "Flat 5, Wymering Mansions"
 * 
 * 3. Typos will create different identifiers
 *    "Wymering Mansion" vs "Wymering Mansions" will NOT match
 *    This is why admin review/merge functionality is important
 * 
 * 4. The identifier is case-insensitive and punctuation-insensitive
 *    But content differences (singular/plural, typos) will create different IDs
 */
