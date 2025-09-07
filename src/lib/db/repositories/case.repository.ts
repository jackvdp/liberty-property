/**
 * Case Repository
 * Simple data access layer for cases
 */

import { db } from '@/lib/db/drizzle';
import { 
  cases, 
  buildings,
  users,
  type Case,
  type NewCase,
  type Building,
  type NewBuilding,
  type User,
  type NewUser
} from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export class CaseRepository {
  /**
   * Create a new case
   */
  static async createCase(data: NewCase): Promise<Case> {
    const [newCase] = await db.insert(cases).values(data).returning();
    return newCase;
  }

  /**
   * Get a case by ID
   */
  static async getCaseById(id: string): Promise<Case | null> {
    const result = await db.query.cases.findFirst({
      where: eq(cases.id, id)
    });
    return result || null;
  }

  /**
   * Get a case by eligibility ID from metadata
   */
  static async getCaseByEligibilityId(eligibilityId: string): Promise<Case | null> {
    // Since metadata is JSONB, we need to query it properly
    const allCases = await db.query.cases.findMany();
    
    const foundCase = allCases.find(c => {
      const metadata = c.metadata as any;
      return metadata?.eligibilityId === eligibilityId;
    });
    
    return foundCase || null;
  }

  /**
   * Generate a unique case number
   */
  static async generateCaseNumber(caseType: 'rtm' | 'enfranchisement' | 'rmc_takeover'): Promise<string> {
    const prefix = caseType.toUpperCase().replace('_', '-');
    const year = new Date().getFullYear();
    
    // Get the latest case for this type
    const latestCase = await db.query.cases.findFirst({
      where: eq(cases.caseType, caseType),
      orderBy: [desc(cases.createdAt)]
    });

    let sequence = 1;
    if (latestCase && latestCase.caseNumber.includes(`${prefix}-${year}`)) {
      const parts = latestCase.caseNumber.split('-');
      const lastPart = parts[parts.length - 1];
      sequence = (parseInt(lastPart) || 0) + 1;
    }

    return `${prefix}-${year}-${sequence.toString().padStart(3, '0')}`;
  }

  /**
   * Create or get a building
   */
  static async createOrGetBuilding(data: NewBuilding): Promise<Building> {
    // For now, just create a new building
    // In the future, we might want to check for duplicates
    const [newBuilding] = await db.insert(buildings).values(data).returning();
    return newBuilding;
  }

  /**
   * Update a building's details (for providing real building info)
   */
  static async updateBuilding(id: string, data: Partial<NewBuilding>): Promise<Building | null> {
    const [updatedBuilding] = await db
      .update(buildings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(buildings.id, id))
      .returning();
    
    return updatedBuilding || null;
  }
}
