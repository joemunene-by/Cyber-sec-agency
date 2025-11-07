# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form to send emails.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Create an Email Service

1. Log in to your EmailJS dashboard
2. Go to **Email Services** in the left sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your provider
6. **Save the Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use the following template variables:
   - `{{organization}}` - Organization name
   - `{{service_type}}` - Type of service requested
   - `{{name}}` - Contact person's name
   - `{{email}}` - Contact email
   - `{{phone}}` - Phone number
   - `{{message}}` - Message content

**Example Template:**
```
Subject: New Contact Form Submission - {{organization}}

Hello,

You have received a new contact form submission:

Organization: {{organization}}
Service Type: {{service_type}}
Contact Name: {{name}}
Email: {{email}}
Phone: {{phone}}

Message:
{{message}}

---
Sent from Aegis Cyber Defense Website
```

4. **Save the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the left sidebar
2. Find **API Keys** section
3. Copy your **Public Key**

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Add the following content:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace `your_service_id_here`, `your_template_id_here`, and `your_public_key_here` with the actual values from EmailJS

**Example:**
```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOpQrStUvWxYz
```

## Step 6: Restart Your Development Server

After creating/updating the `.env` file:
1. Stop your development server (Ctrl+C)
2. Restart it with `npm run dev`

## Step 7: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox for the message

## Troubleshooting

### Form shows "EmailJS not configured" message
- Make sure the `.env` file exists in the root directory
- Check that all three environment variables are set
- Restart your development server after creating/updating `.env`

### Form shows "Failed to send message" error
- Verify your EmailJS credentials are correct
- Check your EmailJS dashboard for any error logs
- Make sure your email service is properly connected
- Verify your email template variables match the form data fields

### For Production (Vercel/Netlify)
When deploying to Vercel or Netlify, you need to add the environment variables in your hosting platform's settings:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables

Add the same three variables:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Security Note

⚠️ **Important**: The `.env` file is already added to `.gitignore` to prevent committing your credentials to GitHub. Never commit your EmailJS keys to version control!

