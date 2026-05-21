# Plan: Login / Register — Backend & DB Integration

## Context

The Crafton Bags MERN app has a fully built authentication UI (LoginForm, RegisterForm, AuthModal) and a scaffolded backend folder structure. Every backend file beyond `db.js` and `app.js` is a 1-line comment stub. The frontend hooks (`useLogin`, `useRegister`) already call the API via `authAPI.js` but only `console.log` the response — token storage and navigation are missing.

This plan implements the complete authentication backend (register, login, logout, /me) and wires the existing frontend hooks to handle success responses.

---

## Scope — Files to Modify / Fill

### Backend (all under `backend/src/`)

| File | Action |
|------|--------|
| `models/User.model.js` | Implement User schema |
| `utils/ApiError.js` | Implement custom error class |
| `utils/asyncHandler.js` | Implement async wrapper |
| `utils/generateToken.js` | Implement JWT generator |
| `middlewares/auth.middleware.js` | Implement JWT verify + req.user |
| `middlewares/error.middleware.js` | Implement global error handler |
| `validators/auth.validator.js` | Implement express-validator rules |
| `services/auth.service.js` | Implement register/login business logic |
| `controllers/auth.controller.js` | Implement register/login/logout/me handlers |
| `routes/auth.routes.js` | Define 4 auth routes |
| `app.js` | Mount `/api/auth` routes + error middleware |
| `backend/.env` | Add `JWT_EXPIRE=7d` |

### Frontend (under `frontend/src/`)

| File | Action |
|------|--------|
| `hooks/useLogin.js` | Store token, navigate home, close modal |
| `hooks/useRegister.js` | Store token, navigate home, auto-login |

### Do NOT touch
- Redux store / authSlice / authAPI (already correct)
- Any product, cart, order, payment, admin, or review files
- Existing homepage components or routing outside `/login` and `/register`

---

## Implementation Steps

### Step 1 — `.env`: Add missing variable
Add `JWT_EXPIRE=7d` to `backend/.env` (it currently has `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` but is missing `JWT_EXPIRE`).

### Step 2 — `utils/ApiError.js`
```js
export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}
```

### Step 3 — `utils/asyncHandler.js`
```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
export default asyncHandler;
```

### Step 4 — `utils/generateToken.js`
```js
import jwt from "jsonwebtoken";
const generateToken = (userId, role) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
export default generateToken;
```

### Step 5 — `models/User.model.js`
Exact schema from spec §9:
- `name` String required trim
- `email` String required unique lowercase trim
- `password` String required
- `role` enum ["user","admin"] default "user"
- `phone` String default ""
- `addresses` [Object] default []
- `timestamps: true`

### Step 6 — `middlewares/error.middleware.js`
Express 4-arg error handler: reads `err.statusCode` (or falls back to 500), returns `{ success: false, message }`.

### Step 7 — `middlewares/auth.middleware.js`
- Reads `Authorization: Bearer <token>` header
- Verifies with `jwt.verify` using `JWT_SECRET`
- Finds user by `decoded.userId`, selects `-password`
- Attaches to `req.user`
- On any failure returns `401 { success: false, message: "Unauthorized" }`

### Step 8 — `validators/auth.validator.js`
Two exported arrays using `express-validator`:
- `validateRegister`: name required, email valid, password min 6 chars
- `validateLogin`: email valid, password required

Each validator array ends with a middleware that reads `validationResult` and returns 400 on errors.

### Step 9 — `services/auth.service.js`
Two async functions (plain business logic, no req/res):
- `registerService({ name, email, password })` — check duplicate → hash → create → return `{ user, token }`
- `loginService({ email, password })` — find user → compare → return `{ user, token }`

Both throw `ApiError` on failures (409 duplicate, 401 bad creds, 404 not found).

### Step 10 — `controllers/auth.controller.js`
Four handlers wrapped in `asyncHandler`:
- `register` — calls `registerService`, responds `201 { success, message, data: { token, user } }`
- `login` — calls `loginService`, responds `200 { success, message, data: { token, user } }`
- `logout` — responds `200 { success: true, message: "Logout successful" }`
- `getCurrentUser` — reads `req.user`, responds `200 { success, data: { user } }` (password never returned)

User object in responses contains only `_id, name, email, role`.

### Step 11 — `routes/auth.routes.js`
```js
POST   /register   → validateRegister, register
POST   /login      → validateLogin, login
POST   /logout     → authMiddleware, logout
GET    /me         → authMiddleware, getCurrentUser
```

### Step 12 — `app.js`
Add two lines after existing middleware setup:
```js
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
// ...existing middleware...
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);          // must be last
```

### Step 13 — `hooks/useLogin.js` (frontend)
After successful `loginUser(formData)` call, replace `console.log`:
```js
localStorage.setItem("token", response.data.token);
navigate("/");
```
The `onClose` prop is not passed into `useLogin` — navigation to `/` triggers `App.jsx`'s effect which calls `closeModal()` automatically (already handled by existing route effect in App.jsx).

### Step 14 — `hooks/useRegister.js` (frontend)
After successful `registerUser(formData)` call, replace `console.log`:
```js
localStorage.setItem("token", response.data.token);
navigate("/");
```
Same modal-close behaviour as login (route change triggers App.jsx effect).

---

## Key Constraints (from spec)
- JWT in **localStorage only** — no cookies, no refresh tokens
- No Redux store changes — authSlice stays empty
- All controllers use `async/await` + `try/catch` via `asyncHandler`
- Passwords never returned in any response
- `bcryptjs` salt rounds = 10
- Dependencies already installed — no new `npm install` needed

---

## Verification
1. Start backend: `npm run dev:backend` — should print `MongoDB Connected`
2. **Postman / curl tests:**
   - `POST /api/auth/register` with valid body → 201 + token
   - `POST /api/auth/register` same email → 409
   - `POST /api/auth/login` valid creds → 200 + token
   - `POST /api/auth/login` wrong password → 401
   - `GET /api/auth/me` with `Authorization: Bearer <token>` → 200 + user
   - `GET /api/auth/me` with no token → 401
3. Start frontend: `npm run dev:frontend`
   - Open `http://localhost:5173/register` — fill form → success → redirected to `/`
   - Check `localStorage.token` in browser devtools — should be set
   - Open `http://localhost:5173/login` — fill form → success → redirected to `/`
   - Open `http://localhost:5173/login` — wrong password → error message shown in form
