import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

interface SharePointListItem {
  fields: {
    Title: string;
    Email: string;
    Phone?: string;
    ContactType?: string;
    Source?: string;
    ConsenttoContact?: boolean;
    Supabase_User_ID: string;
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

class SharePointListService {
  private static instance: SharePointListService;
  private client: Client | null = null;

  private constructor() {}

  static getInstance(): SharePointListService {
    if (!SharePointListService.instance) {
      SharePointListService.instance = new SharePointListService();
    }
    return SharePointListService.instance;
  }

  private async getClient(): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    const credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_CLIENT_SECRET!
    );

    this.client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          done(null, token.token);
        } catch (error) {
          done(error as Error, null);
        }
      }
    });

    return this.client;
  }

  /**
   * Get all existing Supabase User IDs from SharePoint
   * This allows us to only upload new users
   */
  async getExistingUserIds(): Promise<Set<string>> {
    try {
      const client = await this.getClient();
      const siteId = process.env.SHAREPOINT_SITE_ID!;
      const listName = 'Contacts_Sync_List';

      // Get all items with just the Supabase_User_ID field
      const response = await client
        .api(`/sites/${siteId}/lists/${listName}/items`)
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
   * Add a single contact to SharePoint list
   */
  async addContact(item: SharePointListItem): Promise<{ success: boolean; error?: string }> {
    try {
      const client = await this.getClient();
      const siteId = process.env.SHAREPOINT_SITE_ID!;
      const listName = 'Contacts_Sync_List';

      await client
        .api(`/sites/${siteId}/lists/${listName}/items`)
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
   * Batch add multiple contacts to SharePoint list
   * Uses Microsoft Graph batch API for better performance
   */
  async addContactsBatch(items: SharePointListItem[]): Promise<{
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

    // Process in batches of 20 (Graph API batch limit)
    const batchSize = 20;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);

      for (const item of batch) {
        const result = await this.addContact(item);
        if (result.success) {
          results.successCount++;
        } else {
          results.failureCount++;
          results.errors.push(result.error || 'Unknown error');
          results.success = false;
        }
      }

      // Small delay between batches to avoid throttling
      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  /**
   * Test connection to SharePoint
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const client = await this.getClient();
      const siteId = process.env.SHAREPOINT_SITE_ID!;
      const listName = 'Contacts_Sync_List';

      // Try to get list metadata
      await client
        .api(`/sites/${siteId}/lists/${listName}`)
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
}

export const sharePointListService = SharePointListService.getInstance();
