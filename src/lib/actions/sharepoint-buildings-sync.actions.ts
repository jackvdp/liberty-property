/**
 * SharePoint Buildings Sync Actions
 * Handles syncing buildings to SharePoint Buildings_Sync_List
 */

'use server';

import { getAllUsers } from '@/lib/actions/users.actions';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

// Types
interface SharePointBuildingItem {
  fields: {
    Title: string;  // Building Name & Local Authority
    Building_ID: string;  // Normalized identifier (building_identifier)
    Address_Line_1: string;
    Local_Authority?: string;
    Postcode: string;
    Number_of_Units: number;
    Created_By_Source: string;
    Notes?: string;
  };
}

interface ExistingBuilding {
  id: string;
  fields: {
    Building_ID: string;
  };
}

export interface BuildingSyncResult {
  success: boolean;
  message: string;
  stats: {
    totalBuildings: number;
    alreadyInSharePoint: number;
    newlyUploaded: number;
    failed: number;
  };
  errors?: string[];
}

// Constants
const SHAREPOINT_BUILDINGS_LIST_NAME = 'Building_Sync_List';

/**
 * Create Microsoft Graph API client
 */
async function createGraphClient(): Promise<Client> {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID!,
    process.env.AZURE_CLIENT_ID!,
    process.env.AZURE_CLIENT_SECRET!
  );

  return Client.init({
    authProvider: async (done) => {
      try {
        const token = await credential.getToken('https://graph.microsoft.com/.default');
        done(null, token.token);
      } catch (error) {
        done(error as Error, null);
      }
    }
  });
}

/**
 * Get all existing Building IDs from SharePoint
 */
async function getExistingBuildingIds(): Promise<Set<string>> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    const response = await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_BUILDINGS_LIST_NAME}/items`)
      .expand('fields($select=Building_ID)')
      .get();

    const buildingIds = new Set<string>();
    
    if (response.value && Array.isArray(response.value)) {
      response.value.forEach((item: ExistingBuilding) => {
        if (item.fields?.Building_ID) {
          buildingIds.add(item.fields.Building_ID);
        }
      });
    }

    return buildingIds;
  } catch (error) {
    console.error('Error fetching existing building IDs from SharePoint:', error);
    throw new Error(`Failed to fetch existing buildings: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add a single building to SharePoint
 */
async function addBuilding(item: SharePointBuildingItem): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_BUILDINGS_LIST_NAME}/items`)
      .post(item);

    return { success: true };
  } catch (error) {
    console.error('Error adding building to SharePoint:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add building'
    };
  }
}

/**
 * Batch add multiple buildings
 */
async function addBuildingsBatch(items: SharePointBuildingItem[]): Promise<{
  success: boolean;
  successCount: number;
  failureCount: number;
  errors: string[];
}> {
  const results = {
    success: true,
    successCount: 0,
    failureCount: 0,
    errors: [] as string[]
  };

  const batchSize = 20;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    for (const item of batch) {
      const result = await addBuilding(item);
      if (result.success) {
        results.successCount++;
      } else {
        results.failureCount++;
        results.errors.push(result.error || 'Unknown error');
        results.success = false;
      }
    }

    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * Test connection to SharePoint Buildings list
 */
async function testBuildingsConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_BUILDINGS_LIST_NAME}`)
      .get();

    return { success: true };
  } catch (error) {
    console.error('SharePoint Buildings connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed'
    };
  }
}

/**
 * Sync buildings to SharePoint Buildings_Sync_List
 * Groups registrations by building_identifier and creates one building per unique building
 */
export async function syncBuildingsToSharePoint(): Promise<BuildingSyncResult> {
  try {
    console.log('🏢 Starting building sync to SharePoint...');

    // Step 1: Test SharePoint connection
    const connectionTest = await testBuildingsConnection();
    if (!connectionTest.success) {
      return {
        success: false,
        message: `SharePoint Buildings connection failed: ${connectionTest.error}`,
        stats: {
          totalBuildings: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    // Step 2: Get all users with registration data
    const usersResult = await getAllUsers();
    
    if (!usersResult.success || !usersResult.users) {
      return {
        success: false,
        message: `Failed to fetch users: ${usersResult.error}`,
        stats: {
          totalBuildings: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    const usersWithRegistrations = usersResult.users.filter(user => user.registration !== null);

    console.log(`📊 Found ${usersWithRegistrations.length} registrations`);

    if (usersWithRegistrations.length === 0) {
      return {
        success: true,
        message: 'No registrations to sync',
        stats: {
          totalBuildings: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    // Step 3: Group registrations by building_identifier
    const buildingsMap = new Map<string, {
      buildingIdentifier: string;
      mainBuildingAddress: string;
      postcode: string;
      localAuthority?: string;
      numberOfFlats: number;
      registrationCount: number;
    }>();

    usersWithRegistrations.forEach(user => {
      const reg = user.registration!;
      const identifier = reg.buildingIdentifier;

      if (buildingsMap.has(identifier)) {
        const existing = buildingsMap.get(identifier)!;
        existing.registrationCount++;
      } else {
        buildingsMap.set(identifier, {
          buildingIdentifier: reg.buildingIdentifier,
          mainBuildingAddress: reg.mainBuildingAddress,
          postcode: reg.postcode,
          localAuthority: reg.localAuthority || undefined,
          numberOfFlats: reg.numberOfFlats,
          registrationCount: 1
        });
      }
    });

    console.log(`🏗️  Found ${buildingsMap.size} unique buildings`);

    // Step 4: Get existing building IDs from SharePoint
    console.log('🔍 Checking existing buildings in SharePoint...');
    const existingBuildingIds = await getExistingBuildingIds();
    console.log(`📋 Found ${existingBuildingIds.size} existing buildings in SharePoint`);

    // Step 5: Filter to only new buildings
    const newBuildings = Array.from(buildingsMap.values()).filter(
      building => !existingBuildingIds.has(building.buildingIdentifier)
    );

    console.log(`✨ Found ${newBuildings.length} new buildings to upload`);

    if (newBuildings.length === 0) {
      return {
        success: true,
        message: 'All buildings are already in SharePoint',
        stats: {
          totalBuildings: buildingsMap.size,
          alreadyInSharePoint: existingBuildingIds.size,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    // Step 6: Map buildings to SharePoint format
    const sharePointItems: SharePointBuildingItem[] = newBuildings.map(building => {
      // Create a display title: "Address, Local Authority" or just "Address"
      const title = building.localAuthority 
        ? `${building.mainBuildingAddress}, ${building.localAuthority}`
        : building.mainBuildingAddress;

      return {
        fields: {
          Title: title,
          Building_ID: building.buildingIdentifier,
          Address_Line_1: building.mainBuildingAddress,
          Local_Authority: building.localAuthority || '',
          Postcode: building.postcode,
          Number_of_Units: building.numberOfFlats,
          Created_By_Source: 'Website (Supabase)',
          Notes: `${building.registrationCount} leaseholder(s) registered from this building`
        }
      };
    });

    // Step 7: Upload to SharePoint
    console.log('📤 Uploading buildings to SharePoint...');
    const uploadResult = await addBuildingsBatch(sharePointItems);

    // Step 8: Return results
    const stats = {
      totalBuildings: buildingsMap.size,
      alreadyInSharePoint: existingBuildingIds.size,
      newlyUploaded: uploadResult.successCount,
      failed: uploadResult.failureCount
    };

    if (uploadResult.success) {
      return {
        success: true,
        message: `Successfully synced ${uploadResult.successCount} new buildings to SharePoint`,
        stats
      };
    } else {
      return {
        success: false,
        message: `Building sync completed with errors. ${uploadResult.successCount} succeeded, ${uploadResult.failureCount} failed`,
        stats,
        errors: uploadResult.errors
      };
    }

  } catch (error) {
    console.error('❌ Building sync failed:', error);
    return {
      success: false,
      message: `Building sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      stats: {
        totalBuildings: 0,
        alreadyInSharePoint: 0,
        newlyUploaded: 0,
        failed: 0
      }
    };
  }
}
