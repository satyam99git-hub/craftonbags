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

## Troubleshooting

If the backend does not start, run `npm install` again from the root.

If port `5000` is busy, change `PORT` in `backend/.env`.

If database operations fail, check that MongoDB is running and `MONGO_URI` is correct.
