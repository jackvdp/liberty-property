/**
 * Buildings Server Actions
 * Server-side functions for building data management
 */

'use server';

import { BuildingsRepository, type BuildingData } from '@/lib/db/repositories/buildings.repository';

export interface GetBuildingsResult {
  success: boolean;
  buildings?: BuildingData[];
  error?: string;
}

/**
 * Get all buildings with aggregated registration data
 */
export async function getAllBuildings(): Promise<GetBuildingsResult> {
  try {
    const buildings = await BuildingsRepository.getAllBuildings();

    return {
      success: true,
      buildings,
    };
  } catch (error) {
    console.error('Error fetching buildings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch buildings',
    };
  }
}

/**
 * Get building by identifier
 */
export async function getBuildingByIdentifier(
  identifier: string
): Promise<{ success: boolean; building?: BuildingData; error?: string }> {
  try {
    const building = await BuildingsRepository.getBuildingByIdentifier(identifier);

    if (!building) {
      return {
        success: false,
        error: 'Building not found',
      };
    }

    return {
      success: true,
      building,
    };
  } catch (error) {
    console.error('Error fetching building:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch building',
    };
  }
}

/**
 * Get buildings with multiple registrations
 */
export async function getBuildingsWithMultipleRegistrations(): Promise<GetBuildingsResult> {
  try {
    const buildings = await BuildingsRepository.getBuildingsWithMultipleRegistrations();

    return {
      success: true,
      buildings,
    };
  } catch (error) {
    console.error('Error fetching buildings with multiple registrations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch buildings',
    };
  }
}

/**
 * Get total buildings count
 */
export async function getTotalBuildingsCount(): Promise<{
  success: boolean;
  count?: number;
  error?: string;
}> {
  try {
    const count = await BuildingsRepository.getTotalBuildingsCount();

    return {
      success: true,
      count,
    };
  } catch (error) {
    console.error('Error fetching buildings count:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch count',
    };
  }
}
