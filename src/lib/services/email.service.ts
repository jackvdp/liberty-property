/**
 * Email Service
 * Handles sending notification emails via Resend
 * Only sends emails in production environment
 */

import { Resend } from 'resend';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Only send emails in production
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

const NOTIFICATION_EMAIL = 'jack@vanderpump.tech';
const FROM_EMAIL = 'Liberty Bell <notifications@vanderpump.tech>';

export interface EligibilityNotificationData {
  eligibilityId: string;
  userEmail?: string;
  userName?: string;
  flatCount?: number;
  recommendedCaseType?: string;
  propertyType?: string;
  createdAt: Date;
}

export interface RegistrationNotificationData {
  registrationId: string;
  fullName: string;
  emailAddress: string;
  mobileNumber?: string;
  buildingAddress: string;
  postcode: string;
  numberOfFlats: number;
  preferredProcess?: string;
  eligibilityCheckId?: string;
  createdAt: Date;
}

/**
 * Send notification email for new eligibility check
 */
export async function sendEligibilityNotification(data: EligibilityNotificationData): Promise<void> {
  // Skip if not in production
  if (!isProduction) {
    console.log('Skipping eligibility notification email - not in production environment');
    return;
  }

  // Skip if Resend is not configured
  if (!resend) {
    console.log('Skipping eligibility notification email - Resend API key not configured');
    return;
  }

  try {
    const { eligibilityId, userEmail, userName, flatCount, recommendedCaseType, createdAt } = data;

    const caseTypeDisplay = recommendedCaseType === 'rtm' 
      ? 'Right to Manage' 
      : recommendedCaseType === 'enfranchisement' 
        ? 'Collective Enfranchisement' 
        : recommendedCaseType === 'rmc_takeover'
          ? 'RMC Takeover'
          : 'Not determined';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #456e9b;">New Eligibility Check Completed</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Eligibility ID:</strong> ${eligibilityId}</p>
          ${userName ? `<p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${userName}</p>` : ''}
          ${userEmail ? `<p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${userEmail}</p>` : ''}
          ${flatCount ? `<p style="margin: 0 0 10px 0;"><strong>Number of Flats:</strong> ${flatCount}</p>` : ''}
          <p style="margin: 0 0 10px 0;"><strong>Recommended Path:</strong> ${caseTypeDisplay}</p>
          <p style="margin: 0;"><strong>Submitted:</strong> ${createdAt.toLocaleString('en-GB')}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          This is an automated notification from Liberty Bell.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `New Eligibility Check${userName ? ` - ${userName}` : ''}`,
      html: htmlContent,
    });

    console.log('Eligibility notification email sent successfully');
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break the main flow
    console.error('Failed to send eligibility notification email:', error);
  }
}

/**
 * Send notification email for new registration
 */
export async function sendRegistrationNotification(data: RegistrationNotificationData): Promise<void> {
  // Skip if not in production
  if (!isProduction) {
    console.log('Skipping registration notification email - not in production environment');
    return;
  }

  // Skip if Resend is not configured
  if (!resend) {
    console.log('Skipping registration notification email - Resend API key not configured');
    return;
  }

  try {
    const { 
      registrationId, 
      fullName, 
      emailAddress, 
      mobileNumber, 
      buildingAddress, 
      postcode, 
      numberOfFlats, 
      preferredProcess,
      eligibilityCheckId,
      createdAt 
    } = data;

    const processDisplay = preferredProcess === 'rtm' 
      ? 'Right to Manage' 
      : preferredProcess === 'ce' 
        ? 'Collective Enfranchisement'
        : preferredProcess === 'rmc'
          ? 'RMC Process'
          : preferredProcess === 'dk'
            ? 'Not sure yet'
            : 'Not specified';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #456e9b;">🎉 New Registration Completed</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Contact Details</h3>
          <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${fullName}</p>
          <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${emailAddress}</p>
          ${mobileNumber ? `<p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${mobileNumber}</p>` : ''}
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Building Details</h3>
          <p style="margin: 0 0 10px 0;"><strong>Address:</strong> ${buildingAddress}</p>
          <p style="margin: 0 0 10px 0;"><strong>Postcode:</strong> ${postcode}</p>
          <p style="margin: 0 0 10px 0;"><strong>Number of Flats:</strong> ${numberOfFlats}</p>
          <p style="margin: 0;"><strong>Preferred Process:</strong> ${processDisplay}</p>
        </div>
        
        <div style="background-color: #e8f4e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Reference Details</h3>
          <p style="margin: 0 0 10px 0;"><strong>Registration ID:</strong> ${registrationId}</p>
          ${eligibilityCheckId ? `<p style="margin: 0 0 10px 0;"><strong>Eligibility ID:</strong> ${eligibilityCheckId}</p>` : ''}
          <p style="margin: 0;"><strong>Submitted:</strong> ${createdAt.toLocaleString('en-GB')}</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          This is an automated notification from Liberty Bell.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject: `🎉 New Registration - ${fullName} (${postcode})`,
      html: htmlContent,
    });

    console.log('Registration notification email sent successfully');
  } catch (error) {
    // Log error but don't throw - email failure shouldn't break the main flow
    console.error('Failed to send registration notification email:', error);
  }
}
