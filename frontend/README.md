# Frontend Step-By-Step Guide

Follow these steps to run and work on the React frontend.

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

Frontend-only install, if needed:

```bash
npm install --workspace frontend
```

## Step 3: Create Frontend Env File

Create or update:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Important: frontend environment variables must start with `VITE_`.

## Step 4: Start The Frontend

Run:

```bash
npm run dev --workspace frontend
```

Open:

```text
http://localhost:5173
```

## Step 5: Start With Backend Together

To run frontend and backend together, use this from the root:

```bash
npm run dev
```

## Step 6: Build The Frontend

Before handing off UI work, run:

```bash
npm run build --workspace frontend
```

The production build is created in:

```text
frontend/dist/
```

## Step 7: Know The Frontend Folders

Use this guide when adding files:

```text
src/api/          Axios setup and endpoint constants
src/app/          Redux store setup
src/assets/       Images, icons, and animations
src/components/   Reusable UI components
src/features/     Redux slices and feature API files
src/hooks/        Reusable React hooks
src/layouts/      Shared page layouts
src/pages/        Route-level pages
src/routes/       App route definitions
src/styles/       Global CSS and animation CSS
src/utils/        Shared helper functions
```

## Step 8: Use Tailwind CSS

Tailwind files:

```text
frontend/tailwind.config.js
frontend/postcss.config.js
frontend/src/styles/globals.css
```

Use Tailwind utility classes in JSX for styling.

Example:

```jsx
<button className="rounded-lg bg-zinc-950 px-4 py-2 text-white">
  Add to cart
</button>
```

## Step 9: Frontend Rules For Team

1. Put page screens in `src/pages/`.
2. Put reusable UI in `src/components/`.
3. Put API request functions in `src/features/*/*API.js` or `src/api/`.
4. Put shared state in Redux slices under `src/features/`.
5. Do not hardcode API base URLs inside components.
6. Run a build before sending your work for review.

## Troubleshooting

If the frontend does not start, run `npm install` again from the root.

If styles do not apply, restart the frontend dev server.

If API calls fail, check that the backend is running on `http://localhost:5000`.
