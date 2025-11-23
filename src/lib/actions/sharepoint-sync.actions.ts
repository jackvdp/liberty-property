'use server';

import { getAllUsers } from '@/lib/actions/users.actions';
import { syncBuildingsToSharePoint } from '@/lib/actions/sharepoint-buildings-sync.actions';
import type { BuildingSyncResult } from '@/lib/actions/sharepoint-buildings-sync.actions';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

// Types
interface SharePointListItem {
  fields: {
    Title: string;
    Email: string;
    Phone?: string;
    ContactType?: string;
    Source?: string;
    ConsenttoContact?: boolean;
    Supabase_User_ID: string;
    Building_Identifier: string;
    BuildingAddress?: string;
    Postcode?: string;
    NumberofFlats?: number;
    CreatedOn?: string;
  };
}

interface ExistingContact {
  id: string;
  fields: {
    Supabase_User_ID: string;
  };
}

interface SyncResult {
  success: boolean;
  message: string;
  stats: {
    totalRegistrations: number;
    alreadyInSharePoint: number;
    newlyUploaded: number;
    failed: number;
  };
  errors?: string[];
}

interface CombinedSyncResult {
  success: boolean;
  message: string;
  contactsSync: SyncResult;
  buildingsSync: BuildingSyncResult;
}

// Constants
const SHAREPOINT_CONTACTS_LIST_NAME = 'Contacts_Sync_List';

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
 * Get all existing Supabase User IDs from SharePoint Contacts
 */
async function getExistingUserIds(): Promise<Set<string>> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    const response = await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_CONTACTS_LIST_NAME}/items`)
      .expand('fields($select=Supabase_User_ID)')
      .get();

    const userIds = new Set<string>();
    
    if (response.value && Array.isArray(response.value)) {
      response.value.forEach((item: ExistingContact) => {
        if (item.fields?.Supabase_User_ID) {
          userIds.add(item.fields.Supabase_User_ID);
        }
      });
    }

    return userIds;
  } catch (error) {
    console.error('Error fetching existing user IDs from SharePoint:', error);
    throw new Error(`Failed to fetch existing contacts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add a single contact to SharePoint Contacts list
 */
async function addContact(item: SharePointListItem): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_CONTACTS_LIST_NAME}/items`)
      .post(item);

    return { success: true };
  } catch (error) {
    console.error('Error adding contact to SharePoint:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add contact'
    };
  }
}

/**
 * Batch add multiple contacts to SharePoint Contacts list
 */
async function addContactsBatch(items: SharePointListItem[]): Promise<{
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
      const result = await addContact(item);
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
 * Test connection to SharePoint Contacts list
 */
async function testConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;

    await client
      .api(`/sites/${siteId}/lists/${SHAREPOINT_CONTACTS_LIST_NAME}`)
      .get();

    return { success: true };
  } catch (error) {
    console.error('SharePoint connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed'
    };
  }
}

/**
 * Sync registrations to SharePoint Contacts_Sync_List
 * Only uploads users not already in SharePoint (checks by Supabase_User_ID)
 */
export async function syncRegistrationsToSharePoint(): Promise<SyncResult> {
  try {
    console.log('🔄 Starting registration sync to SharePoint...');

    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      return {
        success: false,
        message: `SharePoint connection failed: ${connectionTest.error}`,
        stats: {
          totalRegistrations: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    const usersResult = await getAllUsers();
    
    if (!usersResult.success || !usersResult.users) {
      return {
        success: false,
        message: `Failed to fetch users: ${usersResult.error}`,
        stats: {
          totalRegistrations: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    const usersWithRegistrations = usersResult.users.filter(user => user.registration !== null);

    console.log(`📊 Found ${usersWithRegistrations.length} users with registrations`);

    if (usersWithRegistrations.length === 0) {
      return {
        success: true,
        message: 'No registrations to sync',
        stats: {
          totalRegistrations: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    console.log('🔍 Checking existing contacts in SharePoint...');
    const existingUserIds = await getExistingUserIds();
    console.log(`📋 Found ${existingUserIds.size} existing contacts in SharePoint`);

    const newUsers = usersWithRegistrations.filter(
      user => !existingUserIds.has(user.id)
    );

    console.log(`✨ Found ${newUsers.length} new users to upload`);

    if (newUsers.length === 0) {
      return {
        success: true,
        message: 'All users are already in SharePoint',
        stats: {
          totalRegistrations: usersWithRegistrations.length,
          alreadyInSharePoint: existingUserIds.size,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    const sharePointItems = newUsers.map(user => {
      const reg = user.registration!;
      
      return {
        fields: {
          Title: reg.fullName,
          Email: reg.emailAddress,
          Phone: reg.mobileNumber || '',
          ContactType: 'Individual',
          Source: 'Website (Supabase)',
          ConsenttoContact: reg.consentContact,
          Supabase_User_ID: user.id,
          Building_Identifier: reg.buildingIdentifier,
          BuildingAddress: reg.buildingAddress,
          Postcode: reg.postcode,
          NumberofFlats: reg.numberOfFlats,
          CreatedOn: reg.createdAt.toISOString()
        }
      };
    });

    console.log('📤 Uploading contacts to SharePoint...');
    const uploadResult = await addContactsBatch(sharePointItems);

    const stats = {
      totalRegistrations: usersWithRegistrations.length,
      alreadyInSharePoint: existingUserIds.size,
      newlyUploaded: uploadResult.successCount,
      failed: uploadResult.failureCount
    };

    if (uploadResult.success) {
      return {
        success: true,
        message: `Successfully synced ${uploadResult.successCount} new contacts to SharePoint`,
        stats
      };
    } else {
      return {
        success: false,
        message: `Sync completed with errors. ${uploadResult.successCount} succeeded, ${uploadResult.failureCount} failed`,
        stats,
        errors: uploadResult.errors
      };
    }

  } catch (error) {
    console.error('❌ Sync failed:', error);
    return {
      success: false,
      message: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      stats: {
        totalRegistrations: 0,
        alreadyInSharePoint: 0,
        newlyUploaded: 0,
        failed: 0
      }
    };
  }
}

/**
 * Test SharePoint connection
 */
export async function testSharePointConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const result = await testConnection();
    
    if (result.success) {
      return {
        success: true,
        message: 'Successfully connected to SharePoint Contacts_Sync_List'
      };
    } else {
      return {
        success: false,
        message: `Connection failed: ${result.error}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Sync both contacts and buildings to SharePoint in one operation
 * This is the main sync function that should be called from the UI
 */
export async function syncToSharePoint(): Promise<CombinedSyncResult> {
  try {
    console.log('🚀 Starting combined sync to SharePoint...');

    // Run both syncs in parallel
    const [contactsResult, buildingsResult] = await Promise.all([
      syncRegistrationsToSharePoint(),
      syncBuildingsToSharePoint()
    ]);

    const overallSuccess = contactsResult.success && buildingsResult.success;
    
    let message = '';
    if (overallSuccess) {
      message = `✅ Sync complete! ${contactsResult.stats.newlyUploaded} contacts and ${buildingsResult.stats.newlyUploaded} buildings synced.`;
    } else if (contactsResult.success) {
      message = `⚠️ Contacts synced successfully, but buildings sync had errors.`;
    } else if (buildingsResult.success) {
      message = `⚠️ Buildings synced successfully, but contacts sync had errors.`;
    } else {
      message = `❌ Both contacts and buildings sync failed.`;
    }

    return {
      success: overallSuccess,
      message,
      contactsSync: contactsResult,
      buildingsSync: buildingsResult
    };

  } catch (error) {
    console.error('❌ Combined sync failed:', error);
    
    return {
      success: false,
      message: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      contactsSync: {
        success: false,
        message: 'Not attempted',
        stats: {
          totalRegistrations: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      },
      buildingsSync: {
        success: false,
        message: 'Not attempted',
        stats: {
          totalBuildings: 0,
          alreadyInSharePoint: 0,
          newlyUploaded: 0,
          failed: 0
        }
      }
    };
  }
}
