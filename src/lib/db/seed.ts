/**
 * Database Seed Script
 * Populates development database with test data
 * 
 * Usage: npm run db:seed
 */

import { config } from 'dotenv';
import { db } from './drizzle';
import { 
  users, 
  buildings, 
  properties, 
  cases, 
  caseParticipants,
  workflowSteps,
  documents,
} from './schema';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config({ path: '.env.local' });

// Ensure we're not running in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
  console.error('❌ Cannot run seed script in production!');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function seed() {
  console.log('🌱 Starting seed...');
  console.log('📍 Environment:', process.env.NODE_ENV || 'development');
  console.log('🔗 Database URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');
  
  try {
    // Clear existing data (be careful!)
    console.log('🧹 Clearing existing data...');
    await db.delete(documents);
    await db.delete(workflowSteps);
    await db.delete(caseParticipants);
    await db.delete(cases);
    await db.delete(properties);
    await db.delete(buildings);
    await db.delete(users);
    
    // Create test users with Supabase Auth
    console.log('👤 Creating test users...');
    
    const testUsers = [
      {
        email: 'john.smith@example.com',
        password: 'TestPassword123!',
        fullName: 'John Smith',
        mobileNumber: '07700900001',
        role: 'leaseholder' as const,
      },
      {
        email: 'jane.doe@example.com',
        password: 'TestPassword123!',
        fullName: 'Jane Doe',
        mobileNumber: '07700900002',
        role: 'leaseholder' as const,
      },
      {
        email: 'admin@libertybell.com',
        password: 'AdminPassword123!',
        fullName: 'Admin User',
        mobileNumber: '07700900003',
        role: 'admin' as const,
      },
    ];
    
    const createdUsers = [];
    
    for (const userData of testUsers) {
      // Create auth user
      const { data: authData, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          full_name: userData.fullName,
        },
      });
      
      if (error) {
        console.error(`Error creating auth user ${userData.email}:`, error);
        continue;
      }
      
      // Create database user
      const [dbUser] = await db.insert(users).values({
        id: authData.user!.id,
        email: userData.email,
        fullName: userData.fullName,
        mobileNumber: userData.mobileNumber,
        role: userData.role,
      }).returning();
      
      createdUsers.push(dbUser);
      console.log(`✅ Created user: ${userData.email}`);
    }
    
    // Create test buildings
    console.log('🏢 Creating test buildings...');
    
    const testBuildings = [
      {
        name: 'Riverside Court',
        addressLine1: '123 Thames Path',
        addressLine2: 'Southbank',
        city: 'London',
        postcode: 'SE1 8XY',
        localAuthority: 'Southwark',
        numberOfFlats: 24,
        hasRmcRtm: false,
        commercialPercentage: '15.5',
        isConverted: false,
        freeholderLivesInBuilding: false,
      },
      {
        name: 'Victoria Mansions',
        addressLine1: '45 Queens Road',
        city: 'Manchester',
        postcode: 'M15 4YG',
        localAuthority: 'Manchester',
        numberOfFlats: 8,
        hasRmcRtm: false,
        commercialPercentage: '0',
        isConverted: true,
        freeholderLivesInBuilding: true,
      },
    ];
    
    const createdBuildings = await db.insert(buildings).values(testBuildings).returning();
    console.log(`✅ Created ${createdBuildings.length} buildings`);
    
    // Create test properties
    console.log('🏠 Creating test properties...');
    
    const testProperties = [
      {
        buildingId: createdBuildings[0].id,
        userId: createdUsers[0].id,
        flatNumber: 'Flat 12',
        leaseYearsRemaining: 82,
        annualGroundRent: '250.00',
        serviceChargeAnnual: '2400.00',
        propertyValue: '450000.00',
      },
      {
        buildingId: createdBuildings[0].id,
        userId: createdUsers[1].id,
        flatNumber: 'Flat 15',
        leaseYearsRemaining: 82,
        annualGroundRent: '250.00',
        serviceChargeAnnual: '2400.00',
        propertyValue: '475000.00',
      },
      {
        buildingId: createdBuildings[1].id,
        userId: createdUsers[0].id,
        flatNumber: 'Flat 3A',
        leaseYearsRemaining: 125,
        annualGroundRent: '150.00',
        serviceChargeAnnual: '1800.00',
        propertyValue: '325000.00',
      },
    ];
    
    const createdProperties = await db.insert(properties).values(testProperties).returning();
    console.log(`✅ Created ${createdProperties.length} properties`);
    
    // Create test cases
    console.log('📋 Creating test cases...');
    
    const testCases = [
      {
        caseNumber: 'RTM-2024-001',
        buildingId: createdBuildings[0].id,
        leadUserId: createdUsers[0].id,
        caseType: 'rtm' as const,
        status: 'active' as const,
        hasAuthority: true,
        supportPercentage: '65.5',
        startedAt: new Date('2024-01-15'),
        targetCompletionDate: new Date('2024-06-30'),
      },
      {
        caseNumber: 'CE-2024-001',
        buildingId: createdBuildings[1].id,
        leadUserId: createdUsers[0].id,
        caseType: 'enfranchisement' as const,
        status: 'draft' as const,
        hasAuthority: false,
        supportPercentage: '45.0',
        startedAt: new Date('2024-02-01'),
        targetCompletionDate: new Date('2024-12-31'),
      },
    ];
    
    const createdCases = await db.insert(cases).values(testCases).returning();
    console.log(`✅ Created ${createdCases.length} cases`);
    
    // Create case participants
    console.log('👥 Creating case participants...');
    
    const participants = [
      {
        caseId: createdCases[0].id,
        userId: createdUsers[0].id,
        propertyId: createdProperties[0].id,
        isLead: true,
        hasConsented: true,
        consentedAt: new Date('2024-01-15'),
        role: 'lead',
      },
      {
        caseId: createdCases[0].id,
        userId: createdUsers[1].id,
        propertyId: createdProperties[1].id,
        isLead: false,
        hasConsented: true,
        consentedAt: new Date('2024-01-20'),
        role: 'participant',
      },
    ];
    
    await db.insert(caseParticipants).values(participants);
    console.log(`✅ Created ${participants.length} case participants`);
    
    // Create workflow steps
    console.log('📊 Creating workflow steps...');
    
    const rtmSteps = [
      'Eligibility Check',
      'Building Registration',
      'Gather Support',
      'Form RTM Company',
      'Serve Notice of Invitation',
      'Serve Notice of Claim',
      'Counter-notice Period',
      'Acquire Management',
    ];
    
    const workflowStepsData = rtmSteps.map((step, index) => ({
      caseId: createdCases[0].id,
      stepName: step,
      stepOrder: index + 1,
      status: index < 3 ? 'completed' : index === 3 ? 'in_progress' : 'pending',
      ...(index < 3 ? { 
        completedAt: new Date(`2024-0${index + 1}-20`),
        completedBy: createdUsers[0].id,
      } : {}),
    }));
    
    await db.insert(workflowSteps).values(workflowStepsData);
    console.log(`✅ Created ${workflowStepsData.length} workflow steps`);
    
    // Create sample documents
    console.log('📄 Creating sample documents...');
    
    const sampleDocs = [
      {
        caseId: createdCases[0].id,
        uploadedBy: createdUsers[0].id,
        documentType: 'lease' as const,
        fileName: 'flat_12_lease.pdf',
        fileUrl: 'https://example.com/flat_12_lease.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf',
      },
      {
        caseId: createdCases[0].id,
        uploadedBy: createdUsers[0].id,
        documentType: 'notice' as const,
        fileName: 'rtm_notice_of_claim.pdf',
        fileUrl: 'https://example.com/rtm_notice_of_claim.pdf',
        fileSize: 512000,
        mimeType: 'application/pdf',
      },
    ];
    
    await db.insert(documents).values(sampleDocs);
    console.log(`✅ Created ${sampleDocs.length} documents`);
    
    console.log('\n✨ Seed completed successfully!');
    console.log('\n📝 Test Accounts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    testUsers.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Role: ${user.role}`);
      console.log('────────────────────────────────────');
    });
    
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Run seed
seed()
  .then(() => {
    console.log('\n👋 Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
