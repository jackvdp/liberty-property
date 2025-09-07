# Liberty Bell Database Layer

## Overview

This database layer provides a clean separation of concerns for Liberty Bell's data access, using:
- **Supabase** for authentication and real-time features  
- **Drizzle ORM** for type-safe database queries
- **Repository Pattern** for business logic encapsulation
- **Service Layer** for complex operations
- **Automatic Dev/Prod Separation** based on environment

## Database Configuration

We use two separate Supabase projects:

| Environment | Project ID | Variables Used | Supabase URL |
|-------------|------------|----------------|--------------|
| **Development** | `ocvhtshxyqdyspvyxjaj` | `DEV_POSTGRES_URL_*` | https://ocvhtshxyqdyspvyxjaj.supabase.co |
| **Production** | `aaphdrpbylfhfoiqcfrl` | `POSTGRES_*` | https://aaphdrpbylfhfoiqcfrl.supabase.co |

The correct database is automatically selected based on your environment.

## Setup

### 1. Environment Variables

Your `.env.local` is automatically populated from Vercel:

```bash
# Pull latest environment variables from Vercel
npx vercel env pull .env.local
```

This will fetch both dev (`DEV_POSTGRES_URL_*`) and prod (`POSTGRES_*`) variables.

### 2. Database Commands

```bash
# Generate migration files from schema
npm run db:generate

# Push schema to database (uses dev DB locally)
npm run db:push

# Open Drizzle Studio to browse database
npm run db:studio

# Seed development data
npm run db:seed
```

## Architecture

```
src/lib/db/
├── config.ts              # Database configuration with env detection
├── drizzle.ts            # Drizzle ORM instance
├── schema/               # Database schema definitions
│   └── index.ts         # All table definitions
├── supabase/            # Supabase client configurations
│   ├── client.ts        # Browser client
│   └── server.ts        # Server client for SSR
├── repositories/        # Data access layer
│   ├── base.repository.ts
│   ├── user.repository.ts
│   └── case.repository.ts
├── migrations/          # Generated SQL migrations
└── seed.ts             # Development seed data
```

## Usage Examples

### Server Components (App Router)

```typescript
// src/app/dashboard/page.tsx
import { caseRepository } from '@/lib/db/repositories';
import { authService } from '@/lib/services/auth.service';

export default async function Dashboard() {
  // Get current user
  const user = await authService.getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  // Get user's cases
  const cases = await caseRepository.findByUser(user.id);
  
  return (
    <div>
      <h1>Welcome {user.fullName}</h1>
      <CaseList cases={cases} />
    </div>
  );
}
```

### Server Actions

```typescript
// src/app/actions/case.actions.ts
'use server';

import { caseRepository } from '@/lib/db/repositories';
import { authService } from '@/lib/services/auth.service';
import { revalidatePath } from 'next/cache';

export async function createCase(formData: FormData) {
  const user = await authService.getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  const buildingData = {
    name: formData.get('buildingName') as string,
    addressLine1: formData.get('address') as string,
    postcode: formData.get('postcode') as string,
    numberOfFlats: parseInt(formData.get('numberOfFlats') as string),
    city: formData.get('city') as string,
    // ... other fields
  };
  
  const caseData = {
    leadUserId: user.id,
    caseType: formData.get('caseType') as 'rtm' | 'enfranchisement',
    // ... other fields
  };
  
  const { case: newCase } = await caseRepository.createWithBuilding(
    buildingData,
    caseData
  );
  
  revalidatePath('/dashboard');
  return newCase;
}
```

### Client Components

```typescript
// src/components/auth/login-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/db/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createSupabaseBrowser();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      alert(error.message);
      return;
    }
    
    router.push('/dashboard');
    router.refresh();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### API Routes

```typescript
// src/app/api/documents/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { put } from '@vercel/blob';
import { db } from '@/lib/db/drizzle';
import { documents } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  const user = await authService.getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Upload to Vercel Blob
  const blob = await put(file.name, file, {
    access: 'public',
  });
  
  // Save to database
  const [doc] = await db.insert(documents).values({
    uploadedBy: user.id,
    fileName: file.name,
    fileUrl: blob.url,
    fileSize: file.size,
    mimeType: file.type,
    documentType: 'lease',
  }).returning();
  
  return NextResponse.json(doc);
}
```

## Repository Methods

### UserRepository

```typescript
const user = await userRepository.create({ email, fullName });
const user = await userRepository.findById(id);
const user = await userRepository.findByEmail(email);
const user = await userRepository.update(id, { fullName });
await userRepository.delete(id);
```

### CaseRepository

```typescript
const { case, building } = await caseRepository.createWithBuilding(buildingData, caseData);
const case = await caseRepository.findById(id);
const cases = await caseRepository.findByUser(userId);
const case = await caseRepository.updateStatus(id, 'active');
await caseRepository.addParticipant(caseId, userId, propertyId);
await caseRepository.updateWorkflowStep(caseId, stepName, 'completed');
```

## Direct Drizzle Queries

For complex queries, you can use Drizzle directly:

```typescript
import { db } from '@/lib/db/drizzle';
import { cases, buildings } from '@/lib/db/schema';
import { eq, and, gte } from 'drizzle-orm';

// Complex query example
const activeCasesInLondon = await db
  .select({
    caseId: cases.id,
    caseNumber: cases.caseNumber,
    buildingName: buildings.name,
    postcode: buildings.postcode,
  })
  .from(cases)
  .innerJoin(buildings, eq(cases.buildingId, buildings.id))
  .where(
    and(
      eq(cases.status, 'active'),
      gte(buildings.numberOfFlats, 10)
    )
  );
```

## Database Schema

The schema includes:

- **users** - User accounts
- **buildings** - Building information
- **properties** - Individual flats/properties
- **cases** - RTM/Enfranchisement cases
- **case_participants** - Users involved in cases
- **documents** - Uploaded documents
- **workflow_steps** - Process tracking
- **communications** - Email/SMS logs

## Environment Detection

The system automatically detects which database to use:

```typescript
// src/lib/db/config.ts automatically handles:
Local Development → DEV_POSTGRES_URL_* variables → Dev Database
Vercel Preview    → POSTGRES_* variables → Prod Database
Vercel Production → POSTGRES_* variables → Prod Database
```

## Test Data (Development Only)

After running `npm run db:seed`, you'll have test accounts:

| Email | Password | Role |
|-------|----------|------|
| john.smith@example.com | TestPassword123! | Leaseholder |
| jane.doe@example.com | TestPassword123! | Leaseholder |
| admin@libertybell.com | AdminPassword123! | Admin |

## Best Practices

1. **Always use repositories for common operations** - Keeps business logic centralized
2. **Use transactions for multi-table operations** - Ensures data consistency
3. **Handle errors gracefully** - All repositories have error handling
4. **Use proper TypeScript types** - Schema exports types for all tables
5. **Keep sensitive operations server-side** - Use Server Actions or API routes
6. **Import paths** - Always use `@/lib/db/*` for consistency

## Row Level Security (RLS)

Remember to set up RLS policies in Supabase dashboard:

```sql
-- Example: Users can only see their own data
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT 
USING (auth.uid() = id);

-- Example: Users can see cases they participate in
CREATE POLICY "Users can view participating cases" 
ON cases FOR SELECT 
USING (
  id IN (
    SELECT case_id FROM case_participants 
    WHERE user_id = auth.uid()
  )
);
```

## Troubleshooting

1. **Database connection issues**: Check your DATABASE_URL in .env.local
2. **Type errors**: Run `npm run db:generate` after schema changes
3. **Migration issues**: Use `npm run db:push` for development
4. **Auth issues**: Ensure service role key is set for admin operations
5. **Wrong database**: Check console output on startup for which DB is being used

## Important Files

- `src/lib/db/config.ts` - Environment detection and configuration
- `src/lib/db/schema/index.ts` - All table definitions
- `drizzle.config.ts` - Drizzle CLI configuration
- `.env.local` - Local environment variables (from Vercel)
