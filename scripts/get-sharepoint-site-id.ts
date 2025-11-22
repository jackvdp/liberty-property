#!/usr/bin/env tsx
/**
 * Get SharePoint Site ID using the Graph API
 * Useful for initial setup
 *
 * Usage: npx tsx scripts/get-sharepoint-site-id.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

async function getSharePointSiteId() {
  console.log('🔍 Fetching SharePoint Site ID...\n');

  // Check required env vars
  const requiredVars = ['AZURE_TENANT_ID', 'AZURE_CLIENT_ID', 'AZURE_CLIENT_SECRET', 'SHAREPOINT_SITE_URL'];
  const missing = requiredVars.filter(v => !process.env[v]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\nPlease set these in your .env.local file\n');
    process.exit(1);
  }

  try {
    // Initialize Graph client
    const credential = new ClientSecretCredential(
        process.env.AZURE_TENANT_ID!,
        process.env.AZURE_CLIENT_ID!,
        process.env.AZURE_CLIENT_SECRET!
    );

    const client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          done(null, token.token);
        } catch (error) {
          done(error as Error, null);
        }
      }
    });

    // Parse site URL
    const siteUrl = process.env.SHAREPOINT_SITE_URL!;
    const url = new URL(siteUrl);
    const hostname = url.hostname;
    const sitePath = url.pathname;

    console.log(`📍 Site URL: ${siteUrl}`);
    console.log(`   Hostname: ${hostname}`);
    console.log(`   Path: ${sitePath}\n`);

    // Get site ID
    console.log('🔄 Querying Microsoft Graph API...\n');
    const site = await client
        .api(`/sites/${hostname}:${sitePath}`)
        .get();

    console.log('✅ Site ID found!\n');
    console.log('='.repeat(60));
    console.log('Site Information:');
    console.log('='.repeat(60));
    console.log(`Site ID:       ${site.id}`);
    console.log(`Site Name:     ${site.displayName || site.name}`);
    console.log(`Web URL:       ${site.webUrl}`);
    console.log('='.repeat(60));
    console.log('\n📋 Add this to your .env.local:\n');
    console.log(`SHAREPOINT_SITE_ID=${site.id}`);
    console.log('\n');

  } catch (error) {
    console.error('❌ Error fetching site ID:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);

      if (error.message.includes('401') || error.message.includes('403')) {
        console.error('\n💡 Tips:');
        console.error('   - Check your Azure credentials are correct');
        console.error('   - Verify admin consent was granted');
        console.error('   - Ensure Sites.Read.All permission is enabled');
      } else if (error.message.includes('404')) {
        console.error('\n💡 Tips:');
        console.error('   - Verify SHAREPOINT_SITE_URL is correct');
        console.error('   - Check the site exists and you have access');
        console.error('   - Try the full URL including /sites/YourSiteName');
      }
    } else {
      console.error('   Unknown error occurred');
    }
    console.error('\n');
    process.exit(1);
  }
}

getSharePointSiteId();