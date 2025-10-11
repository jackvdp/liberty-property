/**
 * Registration Repository
 * Handles all database operations for registrations
 */

import { db } from '../drizzle';
import { registrations, type Registration, type NewRegistration } from '../schema';
import { eq } from 'drizzle-orm';

export class RegistrationRepository {
  /**
   * Create a new registration
   */
  static async createRegistration(data: NewRegistration): Promise<Registration> {
    const [newRegistration] = await db.insert(registrations).values(data).returning();
    return newRegistration;
  }

  /**
   * Get registration by ID
   */
  static async getRegistrationById(id: string): Promise<Registration | null> {
    const result = await db.query.registrations.findFirst({
      where: eq(registrations.id, id),
    });
    return result || null;
  }

  /**
   * Get registration by eligibility check ID
   */
  static async getRegistrationByEligibilityId(eligibilityCheckId: string): Promise<Registration | null> {
    const result = await db.query.registrations.findFirst({
      where: eq(registrations.eligibilityCheckId, eligibilityCheckId),
    });
    return result || null;
  }

  /**
   * Update registration status
   */
  static async updateRegistrationStatus(
    id: string,
    status: 'pending' | 'contacted' | 'active' | 'completed'
  ): Promise<Registration | null> {
    const [updated] = await db
      .update(registrations)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(registrations.id, id))
      .returning();
    
    return updated || null;
  }

  /**
   * Get all registrations (for admin use)
   */
  static async getAllRegistrations(limit = 100, offset = 0): Promise<Registration[]> {
    const results = await db.query.registrations.findMany({
      limit,
      offset,
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });
    return results;
  }

  /**
   * Get registrations by email
   */
  static async getRegistrationsByEmail(email: string): Promise<Registration[]> {
    const results = await db.query.registrations.findMany({
      where: eq(registrations.emailAddress, email),
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });
    return results;
  }

  /**
   * Get single registration by user ID (since it's 1:1)
   */
  static async getRegistrationByUserId(userId: string): Promise<Registration | null> {
    const result = await db.query.registrations.findFirst({
      where: eq(registrations.userId, userId),
    });
    return result || null;
  }
}
