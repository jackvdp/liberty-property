'use server';

import { db } from '@/lib/db/drizzle';
import { sharePointListService } from '@/lib/services/sharepoint-list.service';

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

/**
 * Sync registrations to SharePoint Contacts_Sync_List
 * Only uploads users not already in SharePoint (checks by Supabase_User_ID)
 * Never deletes existing rows
 */
export async function syncRegistrationsToSharePoint(): Promise<SyncResult> {
  try {
    console.log('🔄 Starting registration sync to SharePoint...');

    // Step 1: Test SharePoint connection
    const connectionTest = await sharePointListService.testConnection();
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

    // Step 2: Get all registrations from database
    const registrations = await db.query.registrations.findMany({
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)]
    });

    console.log(`📊 Found ${registrations.length} total registrations`);

    if (registrations.length === 0) {
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

    // Step 3: Get existing user IDs from SharePoint
    console.log('🔍 Checking existing contacts in SharePoint...');
    const existingUserIds = await sharePointListService.getExistingUserIds();
    console.log(`📋 Found ${existingUserIds.size} existing contacts in SharePoint`);

    // Step 4: Filter to only new registrations
    const newRegistrations = registrations.filter(
      reg => !existingUserIds.has(reg.userId)
    );

    console.log(`✨ Found ${newRegistrations.length} new registrations to upload`);

    if (newRegistrations.length === 0) {
      return {
        success: true,
        message: 'All registrations are already in SharePoint',
        stats: {
          totalRegistrations: registrations.length,
          alreadyInSharePoint: existingUserIds.size,
          newlyUploaded: 0,
          failed: 0
        }
      };
    }

    // Step 5: Map registrations to SharePoint format
    const sharePointItems = newRegistrations.map(reg => ({
      fields: {
        Title: reg.fullName, // Title is the default display field
        Email: reg.emailAddress,
        Phone: reg.mobileNumber || '',
        ContactType: 'Individual',
        Source: 'Website (Supabase)',
        ConsenttoContact: reg.consentContact,
        Supabase_User_ID: reg.userId, // UUID for tracking
        BuildingAddress: reg.buildingAddress,
        Postcode: reg.postcode,
        NumberofFlats: reg.numberOfFlats,
        CreatedOn: reg.createdAt.toISOString()
      }
    }));

    // Step 6: Upload to SharePoint
    console.log('📤 Uploading contacts to SharePoint...');
    const uploadResult = await sharePointListService.addContactsBatch(sharePointItems);

    // Step 7: Return results
    const stats = {
      totalRegistrations: registrations.length,
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
 * Simple test action to verify configuration
 */
export async function testSharePointConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const result = await sharePointListService.testConnection();
    
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
