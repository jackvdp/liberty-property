#!/usr/bin/env tsx
/**
 * Verify SharePoint environment variables are properly configured
 * 
 * Usage: npx tsx scripts/verify-sharepoint-config.ts
 */

console.log('🔍 Checking SharePoint Configuration...\n');

const requiredVars = {
  AZURE_TENANT_ID: process.env.AZURE_TENANT_ID,
  AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
  AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
  SHAREPOINT_SITE_ID: process.env.SHAREPOINT_SITE_ID,
  SHAREPOINT_SITE_URL: process.env.SHAREPOINT_SITE_URL,
  SHAREPOINT_LIBRARY_NAME: process.env.SHAREPOINT_LIBRARY_NAME
};

let allPresent = true;
let hasIssues = false;

console.log('Environment Variables:');
console.log('='.repeat(60));

for (const [key, value] of Object.entries(requiredVars)) {
  const isPresent = value && value.length > 0;
  const status = isPresent ? '✅' : '❌';
  
  if (!isPresent) {
    allPresent = false;
  }
  
  // Show first/last few characters for security
  let displayValue = 'NOT SET';
  if (value && value.length > 10) {
    displayValue = `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
  } else if (value) {
    displayValue = '***';
  }
  
  console.log(`${status} ${key}`);
  console.log(`   ${displayValue}\n`);
}

console.log('='.repeat(60));

// Validation checks
console.log('\n📋 Validation Checks:\n');

// Check GUID format for IDs
const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

if (requiredVars.AZURE_TENANT_ID && !guidRegex.test(requiredVars.AZURE_TENANT_ID)) {
  console.log('⚠️  AZURE_TENANT_ID should be a GUID format');
  hasIssues = true;
}

if (requiredVars.AZURE_CLIENT_ID && !guidRegex.test(requiredVars.AZURE_CLIENT_ID)) {
  console.log('⚠️  AZURE_CLIENT_ID should be a GUID format');
  hasIssues = true;
}

if (requiredVars.SHAREPOINT_SITE_ID && !guidRegex.test(requiredVars.SHAREPOINT_SITE_ID)) {
  console.log('⚠️  SHAREPOINT_SITE_ID should be a GUID format');
  hasIssues = true;
}

// Check URL format
if (requiredVars.SHAREPOINT_SITE_URL && !requiredVars.SHAREPOINT_SITE_URL.startsWith('https://')) {
  console.log('⚠️  SHAREPOINT_SITE_URL should start with https://');
  hasIssues = true;
}

if (!hasIssues && allPresent) {
  console.log('✅ All validation checks passed!\n');
}

// Summary
console.log('\n' + '='.repeat(60));
if (allPresent && !hasIssues) {
  console.log('✅ Configuration Complete!');
  console.log('\nYou can now:');
  console.log('1. Test connection in Admin Dashboard → Users');
  console.log('2. Run sync to upload registrations to SharePoint');
  console.log('\n📖 See docs/SHAREPOINT_SYNC_SETUP.md for more info');
} else {
  console.log('❌ Configuration Incomplete');
  console.log('\nPlease check:');
  console.log('1. All environment variables are set in .env.local');
  console.log('2. Values are in correct format (GUIDs for IDs)');
  console.log('3. Azure app is properly configured');
  console.log('\n📖 See docs/SHAREPOINT_SYNC_SETUP.md for setup guide');
}
console.log('='.repeat(60) + '\n');

process.exit(allPresent && !hasIssues ? 0 : 1);
