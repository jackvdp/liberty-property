/**
 * One-time admin setup endpoint
 * 
 * SECURITY: This endpoint should be:
 * 1. Called only once to set up the first admin
 * 2. Protected by a secret key in environment variables
 * 3. Disabled after first admin is created
 * 
 * Usage:
 * POST /api/admin/setup
 * Body: { "email": "your@email.com", "secret": "your-secret-key" }
 */

import { NextRequest, NextResponse } from 'next/server';
import { setUserAdminStatus } from '@/lib/actions/auth.actions';
import { createSupabaseAdmin } from '@/lib/db/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, secret } = body;

    // Check if secret matches environment variable
    const ADMIN_SETUP_SECRET = process.env.ADMIN_SETUP_SECRET;
    
    if (!ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: 'Admin setup is not configured. Add ADMIN_SETUP_SECRET to .env.local' },
        { status: 500 }
      );
    }

    if (secret !== ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret key' },
        { status: 403 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const supabaseAdmin = createSupabaseAdmin();
    const { data, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      throw listError;
    }

    const user = data.users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: `User with email ${email} not found` },
        { status: 404 }
      );
    }

    // Set user as admin
    const result = await setUserAdminStatus(user.id, true);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to set admin status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully set ${email} as admin`,
      userId: user.id,
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to set admin status' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const isConfigured = !!process.env.ADMIN_SETUP_SECRET;
  
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured 
      ? 'Admin setup endpoint is ready. Use POST with email and secret.'
      : 'Admin setup is not configured. Add ADMIN_SETUP_SECRET to .env.local'
  });
}
