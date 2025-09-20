# Liberty Bell Ethical Enfranchisement - Complete Project Documentation

## Project Overview

Liberty Bell Ethical Enfranchisement is a NextJS-based platform designed to help leaseholders across England & Wales gain control of their buildings through legal processes like Right to Manage (RTM) and Collective Enfranchisement. The platform aims to simplify and digitize the journey from leaseholder to commonholder through technology, transparency, and legal empowerment.

## Vision & Mission

**Vision**: To end the outdated leasehold system and create a fair, open, and efficient commonhold marketplace.

**Mission**: To turn every unhappy leaseholder into a happy and empowered commonholder through technology, transparency, and legal empowerment.

## Technology Stack

- **Framework**: NextJS v15 with App Router
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM for type-safe database queries
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Development Philosophy & Working Approach

### 🐌 **Slow and Careful Development**
We prioritize careful, deliberate development over speed. This means:

1. **Analysis First**: Claude reviews existing code thoroughly before suggesting any changes
2. **Clear Recommendations**: After understanding the codebase, Claude provides a specific recommended action plan
3. **Wait for Approval**: No code changes happen until the human reviews and approves the plan
4. **One Thing at a Time**: We focus on a single feature/change at a time to maintain quality
5. **Incremental Progress**: Small, tested changes that build upon each other

### 📋 **Development Workflow**
```
1. Claude analyzes existing code
2. Claude suggests recommended approach
3. Human reviews and provides feedback
4. Human gives explicit go-ahead
5. Claude implements the approved changes
6. Test and verify before moving to next task
```

## Architecture Overview

### 🏗️ **Current Simplified Architecture**
```
Client Components → Server Actions → Repository Layer → Drizzle ORM → Supabase PostgreSQL
```

### 🗄️ **Database Layer Architecture**

#### **Environment Separation**
- **Development Database**: Used locally during development
- **Production Database**: Used when deployed to production
- **Automatic Detection**: Environment is automatically detected and appropriate database is used

#### **Database Stack**
```
Application Layer (NextJS)
    ↓
Server Actions ('use server' functions)
    ↓  
Repository Pattern (Static methods)
    ↓
Drizzle ORM (Type-safe queries)
    ↓
Supabase PostgreSQL
```

### 🧩 **How Our Architecture Works**

#### **1. Server Actions**
Server Actions are our primary way to handle mutations from client components:

```typescript
'use server';

export async function createEligibilityCase(eligibilityData: EligibilityData) {
  // Server-side validation
  // Call repository methods  
  // Return results to client
}
```

**Key Points:**
- Use `'use server'` directive
- Can be called directly from client components
- Handle all database operations
- Return serializable data only

#### **2. Repository Pattern**
Repositories encapsulate all database access logic:

```typescript
export class EligibilityRepository {
  static async createEligibilityCheck(data: NewEligibilityCheck): Promise<EligibilityCheck> {
    const [newCheck] = await db.insert(eligibilityChecks).values(data).returning();
    return newCheck;
  }
  
  static async getEligibilityCheckById(id: string): Promise<EligibilityCheck | null> {
    // Implementation
  }
}
```

**Key Points:**
- Static methods (no instantiation needed)
- One repository per main entity
- Handle all CRUD operations for that entity
- Use Drizzle ORM for actual database queries

#### **3. Drizzle ORM Integration**
Drizzle provides type-safe database access:

```typescript
import { db } from '@/lib/db/drizzle';
import { eligibilityChecks } from '@/lib/db/schema';

// Type-safe insert
const [newCheck] = await db.insert(eligibilityChecks).values(data).returning();

// Type-safe query
const check = await db.query.eligibilityChecks.findFirst({
  where: eq(eligibilityChecks.id, id)
});
```

#### **4. Database Configuration**
Environment detection happens automatically:

```typescript
// config.ts automatically determines:
// - Local development → DEV database
// - Production deployment → PROD database
```

## Current Implementation: Eligibility Wizard

### 🎯 **Eligibility Check Flow**
```
User completes eligibility wizard
    ↓
EligibilityWrapper calls createEligibilityCase() server action
    ↓
Server action calls EligibilityRepository.createEligibilityCheck()
    ↓
Repository uses Drizzle to insert into eligibility_checks table
    ↓
Returns eligibility ID to client
    ↓
Client navigates to registration with eligibility ID
```

### 📊 **Current Database Schema**
We've simplified to just one table for now:

```sql
CREATE TABLE eligibility_checks (
  id UUID PRIMARY KEY,
  property_type TEXT,
  flat_count INTEGER,
  has_rmc_rtm BOOLEAN,
  eligibility_status eligibility_status_enum,
  recommended_case_type case_type_enum,
  all_answers JSONB,
  outcome JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 🔧 **Key Files in Current Implementation**

#### **Database Layer**
- `src/lib/db/schema/index.ts` - Database schema definitions
- `src/lib/db/repositories/eligibility.repository.ts` - Data access for eligibility checks
- `src/lib/db/drizzle.ts` - Drizzle ORM configuration

#### **Server Actions**
- `src/lib/actions/eligibility.actions.ts` - Server functions for eligibility operations

#### **Client Components**
- `src/components/eligibility-wrapper.tsx` - Main eligibility wizard component
- `src/app/eligibility-check/page.tsx` - Eligibility check page

## Database Commands & Migrations

### 🛠️ **Development Commands**
```bash
# Generate migration from schema changes
drizzle-kit generate

# Apply migrations to database
drizzle-kit migrate

# Push schema directly (development only)
drizzle-kit push

# Open database browser
drizzle-kit studio
```

### 🔄 **Migration Process**
1. Update schema in `src/lib/db/schema/index.ts`
2. Run `drizzle-kit generate` to create migration
3. Review generated SQL in `src/lib/db/migrations/`
4. Run `drizzle-kit migrate` to apply to database

## Replication Pattern for Future Features

### 📋 **Step-by-Step Process for New Features**

When building new features that need database storage, follow this exact pattern:

#### **1. Analysis Phase**
- Claude reviews existing code structure
- Identifies what needs to be changed/added
- Provides clear recommendation before any code changes

#### **2. Schema Design**
```typescript
// Add new table to src/lib/db/schema/index.ts
export const newFeatureTable = pgTable('new_feature', {
  id: uuid('id').primaryKey().defaultRandom(),
  // ... other fields
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

#### **3. Repository Creation**
```typescript
// Create src/lib/db/repositories/newfeature.repository.ts
export class NewFeatureRepository {
  static async create(data: NewNewFeature): Promise<NewFeature> {
    const [record] = await db.insert(newFeatureTable).values(data).returning();
    return record;
  }
  
  static async findById(id: string): Promise<NewFeature | null> {
    const result = await db.query.newFeatureTable.findFirst({
      where: eq(newFeatureTable.id, id)
    });
    return result || null;
  }
}
```

#### **4. Server Actions**
```typescript
// Create src/lib/actions/newfeature.actions.ts
'use server';

export async function createNewFeature(data: FormData) {
  try {
    const result = await NewFeatureRepository.create({
      // extract data from FormData
    });
    
    return { success: true, id: result.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### **5. Client Integration**
```typescript
// In client component
const handleSubmit = async (formData) => {
  const result = await createNewFeature(formData);
  if (result.success) {
    // Handle success
  }
};
```

#### **6. Database Migration**
```bash
# Generate and apply migration
drizzle-kit generate
drizzle-kit migrate
```

## Design System

### 🎨 **Color Palette**
```css
@theme {
  --color-liberty-primary: #456e9b;      /* Primary blue */
  --color-liberty-secondary: #dde4ed;    /* Light blue-grey */
  --color-liberty-accent: #5ad2c7;       /* Teal accent */
  --color-liberty-standard: #11151c;     /* Dark text */
  --color-liberty-background: #11151c;   /* Dark background */
  --color-liberty-base: #ffffff;         /* White base */
}
```

### 📝 **Typography**
- **Primary Font**: Inter (sans-serif)
- **Display Font**: Reckless (serif) - used for headings and hero text

## Customer Journey & Business Model

### 🎯 **Target Market**
- **Size**: 3.6 million unhappy and unenfranchised leaseholders
- **Location**: England & Wales
- **Pain Points**: Unfair charges, poor service, lack of control
- **Discovery**: Facebook groups, online communities

### 💰 **Revenue Streams**
- **RTM Process**: £2,000 + VAT per building
- **Enfranchisement**: £500-£2,000 per flat
- **Aftercare Services**: Monthly management fees
- **Long-term**: Share of £5bn enfranchisement market + £8bn property management market

## Competitive Landscape

### 🏆 **Primary Competitor: The Freehold Collective**
- Similar service offering
- Established market presence
- Focus: Beat them with better technology and user experience

### 🏛️ **Government/Charity Competitors**
- **LEASE (Leasehold Advisory Service)**: Too passive, perpetuates uncertainty
- **Lease Advice**: Good resources but lacks directional guidance

## Key Technical Principles

### ✅ **Do's**
- Always use Server Actions for mutations from client components
- Use repositories for all database access
- Keep database operations server-side
- Generate migrations for schema changes
- Use TypeScript types from schema
- Implement one feature at a time
- Test each change before moving forward

### ❌ **Don'ts**
- Don't use localStorage for persistent data (use database instead)
- Don't make direct database calls from client components
- Don't skip the repository layer
- Don't make schema changes without migrations
- Don't implement multiple features simultaneously
- Don't make code changes without approval

## Error Handling & Debugging

### 🐛 **Common Issues**
1. **Database connection**: Check environment variables
2. **Migration failures**: Clean database and reapply
3. **Type errors**: Regenerate schema types
4. **Server action failures**: Check server logs

### 🔍 **Debugging Process**
1. Check server logs for error messages
2. Verify database connection
3. Confirm schema matches database
4. Test server actions independently

## Development Environment Setup

### 🔧 **Database Setup**
```bash
# Install dependencies
npm install

# Pull environment variables from Vercel
npx vercel env pull .env.local

# Generate database schema
drizzle-kit generate

# Apply migrations
drizzle-kit migrate
```

### 🗂️ **Project Structure**
```
src/
├── app/                    # NextJS app directory
├── components/            # Reusable UI components
├── lib/
│   ├── actions/          # Server actions
│   ├── db/
│   │   ├── schema/       # Database schema
│   │   ├── repositories/ # Data access layer
│   │   └── migrations/   # Database migrations
│   └── utils/            # Utility functions
└── data/                 # Static data files
```

## Important Notes for AI Assistants

### 🤖 **When Working on This Project**

1. **Always analyze existing code first** before suggesting changes
2. **Provide clear recommendations** and wait for human approval
3. **Follow the established patterns** (Server Actions → Repository → Drizzle)
4. **One change at a time** - don't implement multiple features simultaneously
5. **Use the simplified database schema** - we're intentionally keeping it minimal
6. **Remember the development philosophy** - slow, careful, and deliberate
7. **Database changes require migrations** - never skip the migration process
8. **Test after each change** before moving to the next task

### 📝 **Code Review Checklist**
- [ ] Does it follow Server Action → Repository → Drizzle pattern?
- [ ] Is there a migration for schema changes?
- [ ] Are TypeScript types properly used?
- [ ] Is error handling implemented?
- [ ] Does it integrate with existing code structure?
- [ ] Is it a single, focused change?

---

This documentation should serve as the definitive guide for anyone working on the Liberty Bell project, ensuring consistency and maintainability as the platform grows.
