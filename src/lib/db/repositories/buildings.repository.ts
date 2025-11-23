/**
 * Buildings Repository
 * Data access layer for building aggregations from registrations
 */

import { db } from '@/lib/db/drizzle';
import { registrations } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export interface BuildingData {
  buildingIdentifier: string;
  mainBuildingAddress: string;
  postcode: string;
  localAuthority: string | null;
  numberOfFlats: number;
  registrationCount: number;
  participationRate: number;
  firstRegisteredAt: Date;
  latestRegisteredAt: Date;
}

export class BuildingsRepository {
  /**
   * Get all unique buildings with aggregated registration data
   */
  static async getAllBuildings(): Promise<BuildingData[]> {
    const results = await db
      .select({
        buildingIdentifier: registrations.buildingIdentifier,
        mainBuildingAddress: registrations.mainBuildingAddress,
        postcode: registrations.postcode,
        localAuthority: registrations.localAuthority,
        numberOfFlats: registrations.numberOfFlats,
        registrationCount: sql<number>`COUNT(*)::int`,
        firstRegisteredAt: sql<Date>`MIN(${registrations.createdAt})`,
        latestRegisteredAt: sql<Date>`MAX(${registrations.createdAt})`,
      })
      .from(registrations)
      .groupBy(
        registrations.buildingIdentifier,
        registrations.mainBuildingAddress,
        registrations.postcode,
        registrations.localAuthority,
        registrations.numberOfFlats
      )
      .orderBy(sql`COUNT(*) DESC`);

    // Calculate participation rate
    return results.map(r => ({
      ...r,
      participationRate: Math.round((r.registrationCount / r.numberOfFlats) * 100 * 10) / 10, // Round to 1 decimal
    }));
  }

  /**
   * Get building by identifier
   */
  static async getBuildingByIdentifier(identifier: string): Promise<BuildingData | null> {
    const results = await db
      .select({
        buildingIdentifier: registrations.buildingIdentifier,
        mainBuildingAddress: registrations.mainBuildingAddress,
        postcode: registrations.postcode,
        localAuthority: registrations.localAuthority,
        numberOfFlats: registrations.numberOfFlats,
        registrationCount: sql<number>`COUNT(*)::int`,
        firstRegisteredAt: sql<Date>`MIN(${registrations.createdAt})`,
        latestRegisteredAt: sql<Date>`MAX(${registrations.createdAt})`,
      })
      .from(registrations)
      .where(eq(registrations.buildingIdentifier, identifier))
      .groupBy(
        registrations.buildingIdentifier,
        registrations.mainBuildingAddress,
        registrations.postcode,
        registrations.localAuthority,
        registrations.numberOfFlats
      )
      .limit(1);

    if (results.length === 0) return null;

    const result = results[0];
    return {
      ...result,
      participationRate: Math.round((result.registrationCount / result.numberOfFlats) * 100 * 10) / 10,
    };
  }

  /**
   * Get buildings with multiple registrations
   */
  static async getBuildingsWithMultipleRegistrations(): Promise<BuildingData[]> {
    const results = await db
      .select({
        buildingIdentifier: registrations.buildingIdentifier,
        mainBuildingAddress: registrations.mainBuildingAddress,
        postcode: registrations.postcode,
        localAuthority: registrations.localAuthority,
        numberOfFlats: registrations.numberOfFlats,
        registrationCount: sql<number>`COUNT(*)::int`,
        firstRegisteredAt: sql<Date>`MIN(${registrations.createdAt})`,
        latestRegisteredAt: sql<Date>`MAX(${registrations.createdAt})`,
      })
      .from(registrations)
      .groupBy(
        registrations.buildingIdentifier,
        registrations.mainBuildingAddress,
        registrations.postcode,
        registrations.localAuthority,
        registrations.numberOfFlats
      )
      .having(sql`COUNT(*) > 1`)
      .orderBy(sql`COUNT(*) DESC`);

    return results.map(r => ({
      ...r,
      participationRate: Math.round((r.registrationCount / r.numberOfFlats) * 100 * 10) / 10,
    }));
  }

  /**
   * Get total number of unique buildings
   */
  static async getTotalBuildingsCount(): Promise<number> {
    const result = await db
      .select({
        count: sql<number>`COUNT(DISTINCT ${registrations.buildingIdentifier})::int`,
      })
      .from(registrations);

    return result[0]?.count || 0;
  }
}
