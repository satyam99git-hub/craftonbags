# Crafton Bags Setup Guide

Follow these steps to initialize and run the Crafton Bags project locally.

## Step 1: Install Required Tools

Install these on your machine:

1. Node.js 20 or newer
2. npm 10 or newer
3. MongoDB locally, or a MongoDB Atlas database URL

Check versions:

```bash
node -v
npm -v
```

## Step 2: Open The Project

Open a terminal in the project root:

```bash
cd craftonbags
```

The root folder should contain:

```text
backend/
frontend/
docs/
package.json
README.md
```

## Step 3: Install Dependencies

Install all backend, frontend, and root workspace packages:

```bash
npm install
```

Run this again whenever `package.json` or `package-lock.json` changes.

Google authentication uses these packages:

```bash
npm install firebase --workspace frontend
npm install firebase-admin --workspace backend
npm install react-hot-toast --workspace frontend
```

## Step 4: Create Backend Environment File

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

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
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

For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string.

You can also set `FIREBASE_SERVICE_ACCOUNT_KEY` to the full Firebase Admin SDK service account JSON string instead of the three split Firebase Admin values.

## Step 5: Create Frontend Environment File

Create or update:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-web-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-web-app-id
```

Frontend environment variables must start with `VITE_`.

## Firebase Google Auth Setup

1. Create a Firebase project.
2. Open Authentication, enable the Google sign-in provider, and add your support email.
3. In Project settings, create a Web app and copy its Firebase config into `frontend/.env`.
4. Add authorized domains for local and deployed frontends, for example `localhost` and your production domain.
5. In Project settings > Service accounts, generate a Firebase Admin SDK private key and add it to `backend/.env`.
6. Restart both backend and frontend after changing environment variables.

## Welcome Email Setup

Google sign-in sends a premium welcome email only when a Google user is created for the first time.

For Gmail SMTP:

1. Enable 2-Step Verification on the Gmail account.
2. Create an App Password from Google Account security settings.
3. Put that App Password in `SMTP_PASS`.

For Resend SMTP:

1. Verify your sending domain in Resend.
2. Use `SMTP_HOST=smtp.resend.com`.
3. Use `SMTP_USER=resend`.
4. Use your Resend API key as `SMTP_PASS`.

## Step 6: Start MongoDB

If using local MongoDB, make sure the MongoDB service is running.

Default local database:

```text
craftonbags
```

If using MongoDB Atlas, skip this step after setting `MONGO_URI`.

## Step 7: Run The Full App

From the project root:

```bash
npm run dev
```

This starts both apps:

1. Backend API
2. Frontend React app

## Step 8: Verify The App

Open the frontend:

```text
http://localhost:5173
```

Check the backend health route:

```text
http://localhost:5000/api/health
```

Expected backend response:

```json
{
  "status": "healthy",
  "service": "craftonbags-backend"
}
```

## Step 9: Run Apps Separately

Run only backend:

```bash
npm run dev:backend
```

Run only frontend:

```bash
npm run dev:frontend
```

## Step 10: Build For Production

Build the frontend:

```bash
npm run build
```

Start the backend in production mode:

```bash
npm run start
```

## Step 11: Team Workflow

Before starting work:

1. Pull the latest code.
2. Run `npm install` if dependencies changed.
3. Check your `.env` files.
4. Create a new feature branch.
5. Run `npm run dev`.
6. Verify frontend and backend URLs.

Before handing off work:

1. Run the app locally.
2. Run `npm run build`.
3. Update docs if routes or schemas changed.
4. Do not commit `.env` secrets.

## Step 12: Where To Work

Use these folders:

```text
backend/src/controllers/   API request logic
backend/src/routes/        API route definitions
backend/src/models/        MongoDB models
frontend/src/components/   Reusable UI components
frontend/src/pages/        Route-level screens
frontend/src/features/     Redux slices and API helpers
docs/                      API and database documentation
```

## Troubleshooting

If `npm install` fails, delete `node_modules` and run `npm install` again.

If port `5173` is busy, change the frontend port in `frontend/vite.config.js`.

If port `5000` is busy, change `PORT` in `backend/.env`.

If backend database features fail, check that MongoDB is running and `MONGO_URI` is correct.

If Tailwind styles do not update, restart the frontend dev server.
