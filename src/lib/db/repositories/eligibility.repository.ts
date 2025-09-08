/**
 * Eligibility Repository
 * Simple data access layer for eligibility checks
 */

import { db } from '@/lib/db/drizzle';
import { 
  eligibilityChecks,
  type EligibilityCheck,
  type NewEligibilityCheck
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export class EligibilityRepository {
  /**
   * Create a new eligibility check
   */
  static async createEligibilityCheck(data: NewEligibilityCheck): Promise<EligibilityCheck> {
    const [newCheck] = await db.insert(eligibilityChecks).values(data).returning();
    return newCheck;
  }

  /**
   * Get an eligibility check by ID
   */
  static async getEligibilityCheckById(id: string): Promise<EligibilityCheck | null> {
    const result = await db.query.eligibilityChecks.findFirst({
      where: eq(eligibilityChecks.id, id)
    });
    return result || null;
  }

  /**
   * Update an eligibility check
   */
  static async updateEligibilityCheck(id: string, data: Partial<NewEligibilityCheck>): Promise<EligibilityCheck | null> {
    const [updatedCheck] = await db
      .update(eligibilityChecks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(eligibilityChecks.id, id))
      .returning();
    
    return updatedCheck || null;
  }

  /**
   * Delete an eligibility check
   */
  static async deleteEligibilityCheck(id: string): Promise<boolean> {
    const result = await db
      .delete(eligibilityChecks)
      .where(eq(eligibilityChecks.id, id));
    
    return result.rowCount > 0;
  }
}
