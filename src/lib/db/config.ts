/**
 * Database configuration
 * Centralizes all database connection settings
 * Automatically uses correct environment (dev/staging/prod)
 */

// Determine current environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const environment = process.env.VERCEL_ENV || (isDevelopment ? 'development' : 'production');

// Log environment (only in development)
if (isDevelopment) {
  console.log('🔧 Database Environment:', environment);
  console.log('📦 Node Environment:', process.env.NODE_ENV);
  console.log('🌐 Vercel Environment:', process.env.VERCEL_ENV || 'local');
}

// Select the correct database based on environment
const getDbConfig = () => {
  // For local development, use DEV_ prefixed variables
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' && process.env.VERCEL_ENV != 'production') {
    return {
      supabase: {
        url: process.env.NEXT_PUBLIC_DEV_POSTGRES_URL_SUPABASE_URL || process.env.DEV_POSTGRES_URL_SUPABASE_URL!,
        anonKey: process.env.NEXT_PUBLIC_DEV_POSTGRES_URL_SUPABASE_ANON_KEY || process.env.DEV_POSTGRES_URL_SUPABASE_ANON_KEY!,
        serviceRoleKey: process.env.DEV_POSTGRES_URL_SUPABASE_SERVICE_ROLE_KEY!,
      },
      database: {
        // Use the transaction pooler for Drizzle
        url: process.env.DEV_POSTGRES_URL_POSTGRES_URL || process.env.DEV_POSTGRES_URL_POSTGRES_PRISMA_URL!,
      },
    };
  }
  // For production/preview, use the main POSTGRES_ variables
  return {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
    database: {
      // Use the transaction pooler for Drizzle
      url: process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL!,
    },
  };
};

export const dbConfig = {
  environment,
  ...getDbConfig(),
  // Helper to check environment
  isDevelopment,
  isProduction,
  isPreview: process.env.VERCEL_ENV === 'preview',
} as const;

// Validate required environment variables
function validateEnvVars() {
  const config = getDbConfig();
  const missing: string[] = [];
  
  if (!config.supabase.url) {
    missing.push('Supabase URL');
  }
  if (!config.supabase.anonKey) {
    missing.push('Supabase Anon Key');
  }
  
  if (missing.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missing.join(', ')}\n` +
      `Environment: ${environment}\n` +
      `Available DEV vars: ${Object.keys(process.env).filter(k => k.startsWith('DEV_')).join(', ')}\n` +
      `Available POSTGRES vars: ${Object.keys(process.env).filter(k => k.startsWith('POSTGRES_')).join(', ')}`
    );
  }
  
  // Log which database we're using
  if (isDevelopment) {
    const dbUrl = config.database.url;
    const projectId = dbUrl?.match(/postgres\.([^:]+):/)?.[1];
    console.log(`🗄️  Using database: ${projectId ? projectId.substring(0, 10) + '...' : 'unknown'}`);
    console.log(`🔗 Supabase project: ${config.supabase.url}`);
  }
  
  // Warn about missing optional vars in development
  if (isDevelopment) {
    if (!config.database.url) {
      console.warn('⚠️  DATABASE_URL not set - Drizzle operations will fail');
    }
    if (!config.supabase.serviceRoleKey) {
      console.warn('⚠️  Service Role Key not set - Admin operations will fail');
    }
  }
}

// Only validate in non-build environments
if (typeof window === 'undefined' && !process.env.NEXT_PHASE) {
  validateEnvVars();
}
