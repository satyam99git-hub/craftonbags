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
```

For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string.

## Step 5: Create Frontend Environment File

Create or update:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Frontend environment variables must start with `VITE_`.

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
