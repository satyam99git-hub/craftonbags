# Backend Step-By-Step Guide

Follow these steps to run and work on the Express backend.

## Step 1: Go To Project Root

Open terminal in the root project folder:

```bash
cd craftonbags
```

## Step 2: Install Dependencies

Install all workspace packages:

```bash
npm install
```

Backend-only install, if needed:

```bash
npm install --workspace backend
```

## Step 3: Create Backend Env File

Create or update:

```text
backend/.env
```

Add:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/craftonbags
JWT_SECRET=change-this-secret
JWT_EXPIRE=7d
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-google-app-password
MAIL_FROM_NAME=Crafton Bags
MAIL_FROM_EMAIL=your-email@gmail.com
MAIL_REPLY_TO=support@craftonbags.com
```

Add these when integrations are implemented:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

For Google authentication, generate a Firebase Admin SDK service account key from Firebase Project settings. You may also store the whole JSON as `FIREBASE_SERVICE_ACCOUNT_KEY`.

For Gmail SMTP, enable 2-Step Verification on the Gmail account and create an App Password. Use that App Password as `SMTP_PASS`, not your normal Gmail password.

For Resend SMTP, verify your sending domain in Resend and use:

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
MAIL_FROM_EMAIL=hello@your-verified-domain.com
```

## Step 4: Start MongoDB

If using local MongoDB, make sure MongoDB is running.

Default local URI:

```text
mongodb://127.0.0.1:27017/craftonbags
```

If using MongoDB Atlas, set `MONGO_URI` to the Atlas connection string.

## Step 5: Start The Backend

Run:

```bash
npm run dev --workspace backend
```

Backend URL:

```text
http://localhost:5000
```

## Step 6: Verify The Backend

Open:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "service": "craftonbags-backend"
}
```

## Step 7: Start With Frontend Together

To run backend and frontend together, use this from the root:

```bash
npm run dev
```

## Step 8: Know The Backend Folders

Use this guide when adding files:

```text
src/config/       Database and third-party configuration
src/controllers/  Request and response logic
src/middlewares/  Auth, admin, upload, and error middleware
src/models/       Mongoose schemas
src/routes/       Express route definitions
src/services/     Reusable business logic
src/templates/    Transactional email templates
src/validators/   Request validation rules
src/utils/        Shared backend helpers
src/uploads/      Local upload folders for development
```

## Step 9: Backend Rules For Team

1. Define routes in `src/routes/`.
2. Put request handling in `src/controllers/`.
3. Put reusable business logic in `src/services/`.
4. Put database schemas in `src/models/`.
5. Validate request bodies before creating or updating data.
6. Do not commit real `.env` secrets.
7. Update `docs/api-docs.md` when routes change.
8. Update `docs/db-schema.md` when models change.

## Welcome Email Flow

Google sign-in sends a welcome email only when the MongoDB user is created for the first time. Repeat Google logins do not send duplicate welcome emails. Delivery is non-blocking, so users are not prevented from signing in if SMTP is temporarily unavailable.

## Troubleshooting

If the backend does not start, run `npm install` again from the root.

If port `5000` is busy, change `PORT` in `backend/.env`.

If database operations fail, check that MongoDB is running and `MONGO_URI` is correct.
