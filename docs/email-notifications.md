# Email Notifications

## Overview

Liberty Bell uses [Resend](https://resend.com) to send automated email notifications when users complete the eligibility wizard or registration process.

## Account Details

- **Provider**: Resend
- **Account Owner**: Jack Vanderpump
- **Authentication**: GitHub SSO
- **Dashboard**: [resend.com/emails](https://resend.com/emails)

## Configuration

### Environment Variables

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Add this to:
- `.env.local` for local development
- Vercel Environment Variables for production

### Production Only

Emails are only sent when `NEXT_PUBLIC_ENVIRONMENT="production"`. This prevents test submissions from triggering notifications.

## Notifications Sent

### Eligibility Check Completion
- **Trigger**: User completes eligibility wizard with a successful outcome
- **Recipient**: jack@vanderpump.tech
- **Contains**: Eligibility ID, user contact info, flat count, recommended path

### Registration Completion
- **Trigger**: User completes registration form
- **Recipient**: jack@vanderpump.tech
- **Contains**: Full contact details, building address, postcode, flat count, preferred process

## Technical Implementation

- **Service file**: `src/lib/services/email.service.ts`
- **Async execution**: Uses Next.js `after()` to send emails without blocking user response
- **Error handling**: Email failures are logged but don't break the main flow

## Domain Setup

Sending domain configured in Resend dashboard with appropriate DNS records (SPF, DKIM) for deliverability.
