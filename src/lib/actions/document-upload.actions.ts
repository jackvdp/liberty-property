'use server';

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import type { DocumentCategory } from '@/config/document-types';

// Types
interface UploadResult {
  success: boolean;
  message: string;
  filePath?: string;
  error?: string;
}

// Constants
const DOCUMENTS_ROOT = 'documents_sync';

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
 * Ensure a folder exists in SharePoint document library, creating it if necessary
 */
async function ensureFolderExists(folderPath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const libraryName = process.env.SHAREPOINT_LIBRARY_NAME!;

    // Split path into segments
    const segments = folderPath.split('/').filter(Boolean);
    let currentPath = '';

    // Create each folder level if it doesn't exist
    for (const segment of segments) {
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      try {
        // Try to get the folder - this will throw if it doesn't exist
        await client
          .api(`/sites/${siteId}/drive/root:/${libraryName}/${currentPath}`)
          .get();
        
        console.log(`✅ Folder exists: ${currentPath}`);
      } catch (error: any) {
        // If folder doesn't exist (404), create it
        if (error.statusCode === 404) {
          const createPath = parentPath 
            ? `/sites/${siteId}/drive/root:/${libraryName}/${parentPath}:/children`
            : `/sites/${siteId}/drive/root:/${libraryName}:/children`;

          await client
            .api(createPath)
            .post({
              name: segment,
              folder: {},
              '@microsoft.graph.conflictBehavior': 'fail'
            });

          console.log(`✅ Created folder: ${currentPath}`);
        } else {
          throw error;
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error ensuring folder exists:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create folder'
    };
  }
}

/**
 * Generate unique filename with timestamp and random ID
 */
function generateUniqueFilename(originalName: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const uniqueId = Math.random().toString(36).substring(2, 8);
  
  const lastDotIndex = originalName.lastIndexOf('.');
  const nameWithoutExt = lastDotIndex > 0 ? originalName.substring(0, lastDotIndex) : originalName;
  const ext = lastDotIndex > 0 ? originalName.substring(lastDotIndex) : '';
  
  return `${nameWithoutExt}_${timestamp}_${uniqueId}${ext}`;
}

/**
 * Upload a document to SharePoint
 */
export async function uploadDocument(formData: FormData): Promise<UploadResult> {
  try {
    // Extract data from FormData
    const file = formData.get('file') as File
    const category = formData.get('category') as DocumentCategory
    const documentType = formData.get('documentType') as string

    if (!file || !category || !documentType) {
      return {
        success: false,
        message: 'Missing required fields',
        error: 'File, category, and document type are required'
      };
    }

    console.log('🔄 Starting document upload...', {
      category,
      documentType,
      fileName: file.name,
      fileSize: file.size,
    });

    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: 'User not authenticated',
        error: 'Authentication required'
      };
    }

    // Determine the base folder (user_id or building_id)
    let baseFolderId: string;
    if (category === 'personal') {
      baseFolderId = user.id;
    } else if (category === 'building') {
      // For building documents, we need to fetch the user's registration to get building_identifier
      const { db } = await import('@/lib/db/drizzle');
      const { registrations } = await import('@/lib/db/schema');
      const { eq } = await import('drizzle-orm');
      
      const registration = await db.query.registrations.findFirst({
        where: eq(registrations.userId, user.id)
      });

      if (!registration?.buildingIdentifier) {
        return {
          success: false,
          message: 'No building associated with your account. Please complete your registration first.',
          error: 'Building identifier not found'
        };
      }
      baseFolderId = registration.buildingIdentifier;
    } else {
      return {
        success: false,
        message: 'Invalid document category',
        error: 'Unknown category'
      };
    }

    // Construct the full folder path within the document library
    const folderPath = `${DOCUMENTS_ROOT}/${baseFolderId}/${documentType}`;
    console.log(`📁 Target folder: ${folderPath}`);

    // Ensure the folder structure exists
    const folderResult = await ensureFolderExists(folderPath);
    if (!folderResult.success) {
      return {
        success: false,
        message: 'Failed to create folder structure',
        error: folderResult.error
      };
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    console.log(`📄 Uploading as: ${uniqueFilename}`);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to SharePoint
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const libraryName = process.env.SHAREPOINT_LIBRARY_NAME!;

    const uploadPath = `${libraryName}/${folderPath}/${uniqueFilename}`;

    // Upload using put (for files up to 4MB) 
    // For larger files, we'd need to use createUploadSession
    await client
      .api(`/sites/${siteId}/drive/root:/${uploadPath}:/content`)
      .put(buffer);

    console.log(`✅ File uploaded successfully: ${uploadPath}`);

    return {
      success: true,
      message: `Successfully uploaded ${file.name}`,
      filePath: uploadPath
    };

  } catch (error) {
    console.error('❌ Upload failed:', error);
    return {
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test SharePoint connection for document uploads
 */
export async function testDocumentUploadConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const client = await createGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const libraryName = process.env.SHAREPOINT_LIBRARY_NAME!;

    // Try to access the document library
    await client
      .api(`/sites/${siteId}/drive/root:/${libraryName}`)
      .get();

    return {
      success: true,
      message: `Successfully connected to SharePoint library: ${libraryName}`
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
