# Contact Form Setup Guide

## ✅ Corrections Made

### 1. Fixed Form ID
- **Changed**: `id="contactForm"` → `id="contact-form"`
- **Reason**: JavaScript in `main.js` looks for `#contact-form`

### 2. Integrated Formspree
- **Changed**: `action="#"` → `action="https://formspree.io/f/YOUR_FORM_ID"`
- **Service**: Using Formspree (free tier available)

### 3. Added Setup Instructions
- Clear step-by-step guide in the sidebar
- Users know exactly how to enable the form

## 🚀 How to Enable the Contact Form

Follow these simple steps:

### Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create New Form
1. Log in to your Formspree dashboard
2. Click "New Form" button
3. Give your form a name (e.g., "Portfolio Contact Form")
4. Your form will be created and you'll receive a unique Form ID

### Step 3: Get Your Form ID
Your form ID will look like this: `xpznvwyz` (8 random characters)

The full form action URL will be:
```
https://formspree.io/f/xpznvwyz
```

### Step 4: Update contact.html
1. Open `contact.html` in your editor
2. Find line 70 (approximately) with:
   ```html
   <form id="contact-form" class="card form" method="post" action="https://formspree.io/f/YOUR_FORM_ID" novalidate>
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   <form id="contact-form" class="card form" method="post" action="https://formspree.io/f/xpznvwyz" novalidate>
   ```

### Step 5: Test the Form
1. Deploy your website or test locally
2. Fill out the contact form
3. Submit it
4. Check your email - you should receive the submission
5. Confirm the submission in your Formspree dashboard

## ⚙️ How It Works

1. **User fills out form** → Clicks "Send message"
2. **JavaScript intercepts** → Shows "Sending..." status
3. **Formspree receives** → Processes the submission
4. **Email sent** → You receive the message in your inbox
5. **Success shown** → User sees confirmation message

## 🔧 Customization Options

### Email Notifications
- Formspree sends submissions to your verified email
- You can customize the notification email template
- Add auto-reply messages for users

### Spam Protection
- Built-in honeypot field (`company`) catches bots
- Formspree includes reCAPTCHA option (in paid tiers)
- Rate limiting prevents abuse

### Advanced Features (Paid Tiers)
- Custom thank-you page redirects
- File upload support
- Webhook integrations
- Submission archives

## 📝 Form Fields

Current fields in the form:
- ✅ Name (required)
- ✅ Email (required)
- ✅ Subject (optional)
- ✅ Message (required)
- 🤖 Company (honeypot - hidden from users)

## ⚠️ Important Notes

1. **Free Tier Limits**: 50 submissions per month
2. **Email Verification**: Must verify your email to receive submissions
3. **AJAX Support**: Form works with JavaScript enabled (better UX)
4. **Fallback**: Without JavaScript, form still works via standard POST

## 🐛 Troubleshooting

### Form not submitting?
- Check that you replaced `YOUR_FORM_ID` with your actual form ID
- Verify your email is confirmed in Formspree
- Check browser console for errors

### Not receiving emails?
- Check your spam folder
- Verify email in Formspree dashboard
- Check Formspree submission logs

### Error messages?
- Ensure form ID is correct
- Check Formspree account status
- Verify monthly submission limit not exceeded

## 🔐 Security Features

1. **Honeypot**: Hidden field catches spam bots
2. **Client validation**: HTML5 required fields
3. **Rate limiting**: Formspree prevents abuse
4. **HTTPS**: All form data encrypted in transit

## 📊 Monitoring

You can monitor form submissions:
- Formspree dashboard shows all submissions
- Email notifications for each submission
- Export data as CSV (paid tiers)
- Integration with analytics tools

---

## Quick Reference

**Form ID location**: contact.html, line ~70
**JavaScript handler**: assets/js/main.js, lines 131-167
**Status display**: `#formStatus` div (line 103)

**Formspree Dashboard**: https://formspree.io/forms
**Documentation**: https://help.formspree.io/
