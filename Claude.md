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

### 🏗️ **Simplified Architecture**
```
Client Components → Server Actions → Repository → Drizzle ORM → Supabase PostgreSQL
```

### 🗄️ **Database Layer Architecture**

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
Server Actions are our primary way to handle data operations from client components:

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
The EligibilityRepository encapsulates all database access logic for eligibility checks:

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
- Handles all CRUD operations for eligibility
- Uses Drizzle ORM for actual database queries

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

## Current Implementation

### 🎯 **Eligibility Wizard Flow**
The eligibility wizard helps users determine if their building qualifies for RTM or Collective Enfranchisement:

```
User completes eligibility questionnaire
    ↓
Creates eligibility case (all success paths)
    ↓
Server action calls EligibilityRepository
    ↓
Repository uses Drizzle to insert into database
    ↓
Returns case ID to client
    ↓
User redirected to registration with case ID
```

### 🎯 **Registration & User Account Flow**
Registration process that creates both user account and registration record:

#### **Registration Steps**
1. **Step 1**: Contact Details (name, email, phone, consent)
2. **Step 2**: Building Basics (address, postcode, flat count)
3. **Step 3** (optional): Choose Process (RTM vs CE if both available)
4. **Step 4**: Legal & Submit (terms, privacy, data consent)

#### **Registration Flow Architecture**
```
User submits registration form
    ↓
Server action: createRegistrationCase()
    ↓
1. Create Supabase Auth user account
    ↓
2. Get user ID from creation
    ↓
3. Create registration record with user_id
    ↓
Return success or appropriate error
```

#### **Key Registration Features**
- **User-First Creation**: User account created before registration record
- **1:1 Relationship**: One user = one registration (enforced by unique constraint)
- **Duplicate Prevention**: Checks if email already registered
- **Error Handling**: 
  - Already registered → "Please login" message
  - User creation failed → Generic error with retry
  - Edge cases handled quietly

#### **Database Relationships**
```typescript
// Registration table has foreign key to auth.users
registrations.user_id → auth.users.id (unique constraint)
```

### 📊 **Current Database Schema**

```sql
-- Eligibility checks table
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

-- Registrations table (1:1 with users)
CREATE TABLE registrations (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  eligibility_check_id UUID REFERENCES eligibility_checks(id),
  full_name TEXT NOT NULL,
  email_address TEXT NOT NULL,
  mobile_number TEXT,
  consent_contact BOOLEAN NOT NULL,
  building_address TEXT NOT NULL,
  postcode TEXT NOT NULL,
  local_authority TEXT,
  number_of_flats INTEGER NOT NULL,
  preferred_process TEXT,
  terms_conditions BOOLEAN NOT NULL,
  privacy_policy BOOLEAN NOT NULL,
  data_processing BOOLEAN NOT NULL,
  marketing_consent BOOLEAN,
  all_answers JSONB,
  status registration_status_enum DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 🔧 **Key Files in Current Implementation**

#### **Use Cases**
- `src/use_cases/eligibility/createEligibilityDerivedData.ts` - Business logic for deriving eligibility data

#### **Database Layer**
- `src/lib/db/schema/index.ts` - Database schema definitions
- `src/lib/db/repositories/eligibility.repository.ts` - Data access for eligibility checks
- `src/lib/db/repositories/registration.repository.ts` - Data access for registrations
- `src/lib/db/drizzle.ts` - Drizzle ORM configuration
- `src/lib/db/config.ts` - Database configuration
- `src/lib/db/supabase/client.ts` - Supabase client setup

#### **Server Actions**
- `src/lib/actions/eligibility.actions.ts` - Server functions for eligibility operations
- `src/lib/actions/registration.actions.ts` - Server functions for registration and user creation
- `src/lib/actions/auth.actions.ts` - Server functions for authentication

#### **Client Components**
- `src/components/eligibility-wrapper.tsx` - Main eligibility wizard component
- `src/components/questionnaire/registration-questionnaire.tsx` - Registration wizard component
- `src/app/eligibility-check/page.tsx` - Eligibility check page
- `src/app/register/page.tsx` - Registration page

#### **Data Files**
- `src/data/eligibility-wizard-flow.json` - Eligibility wizard configuration
- `src/data/registration-wizard-flow.json` - Registration wizard configuration

## Database Commands & Migrations

### 🛠️ **Development Commands**
```bash
# Generate migration from schema changes
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Push schema directly (development only)
npm run db:push

# Open database browser
npm run db:studio
```

### 🔄 **Migration Process**
1. Update schema in `src/lib/db/schema/index.ts`
2. Run `npm run db:generate` to create migration
3. Review generated SQL in `src/lib/db/migrations/`
4. Run `npm run db:migrate` to apply to database

## Business Logic & Use Cases

### 📐 **Eligibility Derived Data**
The `createEligibilityDerivedData` function transforms raw questionnaire answers into meaningful business data:

- **Flat count, property type, leasehold status**
- **RMC/RTM status** (exists, doesn't exist, unknown)
- **Provisional path** (display-ready text):
  - "Right to Manage or buy your freehold"
  - "Right to Manage (freehold not available)"
  - "Build neighbor support first"
  - "Improve existing management"
- **Whether both RTM and CE are available**

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

## Project Structure

```
src/
├── app/                    # NextJS app directory (pages)
├── components/            # Reusable UI components
│   └── questionnaire/     # Questionnaire components
├── data/                  # Static configuration files
├── lib/
│   ├── actions/          # Server actions
│   │   └── eligibility.actions.ts
│   ├── db/
│   │   ├── schema/       # Database schema
│   │   ├── repositories/ # Data access layer
│   │   │   └── eligibility.repository.ts
│   │   └── migrations/   # Database migrations
│   └── utils/            # Utility functions
└── use_cases/            # Business logic
    └── eligibility/
        └── createEligibilityDerivedData.ts
```

## Key Technical Principles

### ✅ **Do's**
- Always use Server Actions for data mutations
- Use the repository pattern for database access
- Keep database operations server-side
- Generate migrations for schema changes
- Use TypeScript types from schema
- Implement one feature at a time
- Keep business logic in use cases
- Test each change before moving forward

### ❌ **Don'ts**
- Don't make direct database calls from client components
- Don't skip the repository layer
- Don't make schema changes without migrations
- Don't implement multiple features simultaneously
- Don't mix business logic with infrastructure code

## Current Focus Areas

### 📍 **What's Working**
- ✅ Eligibility wizard with case creation
- ✅ All success paths lead to registration
- ✅ Simplified registration flow (4 steps max)
- ✅ Database persistence of eligibility checks
- ✅ User account creation during registration
- ✅ Registration data persistence with user association
- ✅ 1:1 relationship between users and registrations
- ✅ Duplicate registration prevention
- ✅ Clean separation of concerns (use cases, actions, repositories)

### 🚧 **Next Steps to Implement**
- Dashboard showing user's registration
- Document management
- Payment processing
- Email notifications

## Important Notes for AI Assistants

### 🤖 **When Working on This Project**

1. **Always analyze existing code first** before suggesting changes
2. **Provide clear recommendations** and wait for human approval
3. **Follow the established patterns** (Server Actions → Repository → Drizzle)
4. **One change at a time** - don't implement multiple features simultaneously
5. **Use the simplified approach** - we're intentionally keeping it minimal
6. **Database changes require migrations** - never skip the migration process
7. **Test after each change** before moving to the next task

### 📝 **Code Review Checklist**
- [ ] Does it follow Server Action → Repository → Drizzle pattern?
- [ ] Is there a migration for schema changes?
- [ ] Are TypeScript types properly used?
- [ ] Is error handling implemented?
- [ ] Does it integrate with existing code structure?
- [ ] Is it a single, focused change?
- [ ] Is business logic separated from infrastructure?

---

This documentation reflects the current state of the Liberty Bell project after simplification and cleanup. The focus is on a clean, maintainable architecture with clear separation of concerns.
