import { NextResponse } from 'next/server';
import { RegistrationRepository } from '@/lib/db/repositories';

export async function GET() {
  try {
    // Test the repository by fetching all registrations
    const registrations = await RegistrationRepository.getAllRegistrations();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count: registrations.length,
      registrations: registrations.map(r => ({
        id: r.id,
        fullName: r.fullName,
        email: r.emailAddress,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
