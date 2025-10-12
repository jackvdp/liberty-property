# Admin Setup Instructions

## Quick Setup Guide

### Step 1: Add Secret to Environment Variables

Add this line to your `.env.local` file:

```bash
ADMIN_SETUP_SECRET=your-super-secret-key-here-change-this
```

**Important:** Change `your-super-secret-key-here-change-this` to a random, secure string.

### Step 2: Restart Your Development Server

```bash
npm run dev
```

### Step 3: Call the Admin Setup Endpoint

Use one of these methods:

#### Option A: Using curl (Terminal)

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "secret": "your-super-secret-key-here-change-this"
  }'
```

#### Option B: Using Browser Console (Chrome/Firefox)

1. Open your browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Paste this code (replace email and secret):

```javascript
fetch('/api/admin/setup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your@email.com',
    secret: 'your-super-secret-key-here-change-this'
  })
})
.then(r => r.json())
.then(console.log)
```

#### Option C: Using Postman or Insomnia

1. Create a POST request to `http://localhost:3000/api/admin/setup`
2. Set header: `Content-Type: application/json`
3. Set body:
```json
{
  "email": "your@email.com",
  "secret": "your-super-secret-key-here-change-this"
}
```

### Step 4: Verify Success

You should see a response like:

```json
{
  "success": true,
  "message": "Successfully set your@email.com as admin",
  "userId": "uuid-here"
}
```

### Step 5: Test Admin Access

1. Log in with your account
2. Navigate to `/admin-dashboard`
3. You should now have access!

### Step 6: Security (Optional but Recommended)

After setting up your admin account, you can:

1. **Remove the secret from `.env.local`** - This will disable the endpoint
2. **Delete the API route** - Remove `src/app/api/admin/setup/route.ts`

This ensures no one else can use this endpoint in production.

## Troubleshooting

### "User with email X not found"
- Make sure you've registered and logged in at least once
- Check that the email matches exactly (case-sensitive)

### "Invalid secret key"
- Make sure the secret in `.env.local` matches what you're sending
- Restart your dev server after changing `.env.local`

### "Admin setup is not configured"
- Make sure you added `ADMIN_SETUP_SECRET` to `.env.local`
- Restart your dev server

## Making Additional Admins

Once you're an admin, you can:
1. Build an admin UI to promote other users
2. Use the same API endpoint (keep the secret secure!)
3. Directly call `setUserAdminStatus(userId, true)` in code
