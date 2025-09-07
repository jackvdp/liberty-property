# Database Setup Guide

## Overview

Liberty Bell uses separate databases for development and production to ensure data safety and enable worry-free local development.

## Current Database Setup

We have two Supabase projects configured through Vercel:

| Environment | Project ID | Database | Supabase URL |
|-------------|------------|----------|--------------|
| **Development** | `ocvhtshxyqdyspvyxjaj` | DEV_POSTGRES_URL_* | https://ocvhtshxyqdyspvyxjaj.supabase.co |
| **Production** | `aaphdrpbylfhfoiqcfrl` | POSTGRES_* | https://aaphdrpbylfhfoiqcfrl.supabase.co |

## Database Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Development   │     │   Production    │
│    Database     │     │    Database     │
│   (Supabase)    │     │   (Supabase)    │
└────────┬────────┘     └────────┬────────┘
         │                       │
    Local Dev               Vercel Deployment
    (.env.local)           (Vercel Env Vars)
         │                       │
    Uses DEV_*              Uses POSTGRES_*
    variables               variables
```

## Local Development Setup

### Step 1: Pull Environment Variables

```bash
# This fetches all environment variables from Vercel
npx vercel env pull .env.local
```

This command pulls both:
- Development database credentials (`DEV_POSTGRES_URL_*`)
- Production database credentials (`POSTGRES_*`)

### Step 2: Verify Database Connection

```bash
# Check which database will be used
npm run dev
```

Look for console output:
```
🔧 Database Environment: development
🗄️ Using database: ocvhtshxyq...
🔗 Supabase project: https://ocvhtshxyqdyspvyxjaj.supabase.co
```

### Step 3: Database Operations

```bash
# Generate migrations from schema
npm run db:generate

# Push schema to dev database
npm run db:push

# View database in browser
npm run db:studio

# Seed test data (dev only)
npm run db:seed
```

## Schema Management

### Current Schema (8 Tables)

- **users** - User accounts with roles
- **buildings** - Building information  
- **properties** - Individual flats
- **cases** - RTM/Enfranchisement cases
- **case_participants** - Users in cases
- **documents** - Uploaded files
- **workflow_steps** - Process tracking
- **communications** - Email/SMS logs

### Making Schema Changes

1. Edit schema in `src/lib/db/schema/index.ts`
2. Generate migration: `npm run db:generate`
3. Push to dev: `npm run db:push`
4. Test thoroughly
5. Push to production when ready

## Row Level Security (RLS)

### Setting Up RLS (Both Databases)

Go to each Supabase SQL editor and run:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
USING (auth.uid() = id);

-- Users can view cases they participate in
CREATE POLICY "Users can view participating cases" 
ON cases FOR SELECT 
USING (
  id IN (
    SELECT case_id FROM case_participants 
    WHERE user_id = auth.uid()
  )
);
```

## Development Seed Data

Test accounts available after running `npm run db:seed`:

| Email | Password | Role |
|-------|----------|------|
| john.smith@example.com | TestPassword123! | Leaseholder |
| jane.doe@example.com | TestPassword123! | Leaseholder |
| admin@libertybell.com | AdminPassword123! | Admin |

## File Structure

All database code is in `src/lib/db/`:

```
src/lib/db/
├── config.ts              # Environment detection
├── drizzle.ts            # Drizzle ORM instance
├── schema/               # Table definitions
│   └── index.ts         
├── supabase/            # Supabase clients
│   ├── client.ts        # Browser client
│   └── server.ts        # Server client
├── repositories/        # Data access layer
│   ├── base.repository.ts
│   ├── user.repository.ts
│   └── case.repository.ts
├── migrations/          # Generated SQL files
└── seed.ts             # Dev seed data
```

## Daily Workflow

### Local Development

```bash
# Start dev server - uses dev database automatically
npm run dev

# View dev database
npm run db:studio

# Reset dev database
npm run db:push --force
npm run db:seed
```

### Deployment

```bash
# Deploy to Vercel - uses prod database automatically
git push origin main
```

## Environment Detection

The app automatically detects which database to use:

| Location | Environment | Database Used |
|----------|------------|---------------|
| Local `npm run dev` | development | Dev database (DEV_* vars) |
| Vercel Preview | preview | Prod database (POSTGRES_* vars) |
| Vercel Production | production | Prod database (POSTGRES_* vars) |

Check console output on startup:
```
🔧 Database Environment: development
🗄️ Using database: ocvhtshxyq...
```

## Troubleshooting

### "Missing environment variables" error

**Solution**: Run `npx vercel env pull .env.local`

### Database connection errors

1. Check if project is paused (Supabase pauses after 1 week of inactivity)
2. Verify you're using the correct pooler mode (Transaction for Drizzle)
3. Check console to see which database is being used

### Schema out of sync

```bash
# Regenerate and push schema
npm run db:generate
npm run db:push
```

### Wrong database being used

Check `src/lib/db/config.ts` is detecting environment correctly.
Console will show which database is active.

## Security Best Practices

1. **Never commit `.env.local`** - It's gitignored
2. **Use different passwords** for dev and prod databases
3. **Enable RLS** on all tables
4. **Service role keys** - Only use server-side
5. **Regular backups** - Supabase Pro includes PITR

## Cost Optimization

- **Development**: Free tier (pauses after 1 week inactive)
- **Production**: Start with free, upgrade to Pro when needed ($25/month)
- **Storage**: 1GB free, then $0.021/GB per month

## Next Steps

1. ✅ Environment variables pulled from Vercel
2. ✅ Schema pushed to dev database  
3. ✅ Test data seeded
4. ⬜ Set up RLS policies
5. ⬜ Configure auth flow
6. ⬜ Build first features
