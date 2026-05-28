# API Docs

Base URL in development:

```text
http://localhost:5000/api
```

## Current Routes

### Health

```http
GET /api/health
```

Response:

```json
{
  "status": "healthy",
  "service": "craftonbags-backend"
}
```

## Planned Route Groups

### Auth

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
GET  /api/auth/protected-example
```

Used for account creation, login, logout, and current user lookup.

#### POST /api/auth/google

Auth requirement: public route with Firebase ID token verification.

Request body:

```json
{
  "idToken": "firebase-id-token"
}
```

Response:

```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "user": {
      "_id": "mongo-user-id",
      "name": "Crafton User",
      "email": "user@example.com",
      "photoURL": "https://...",
      "provider": "google",
      "role": "user"
    }
  }
}
```

Side effect: sets a secure httpOnly `token` cookie containing the application JWT.

Email behavior: when the Google account creates a new MongoDB user for the first time, the backend sends a premium welcome email. Existing users can log in repeatedly without duplicate welcome emails.

Error cases:

- `400` when `idToken` is missing.
- `401` when Firebase token verification fails or the Google email is not verified.
- `500` when Firebase Admin credentials are not configured.

#### POST /api/auth/refresh

Auth requirement: authenticated cookie or bearer token.

Refreshes the application JWT cookie and returns the current user.

#### GET /api/auth/protected-example

Auth requirement: authenticated cookie or bearer token.

Use this route to verify protected API access during development.

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Used for storefront product browsing and admin product management.

### Orders

```text
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/:id
GET  /api/orders
PUT  /api/orders/:id/status
```

Used for checkout, user order history, and admin order tracking.

### Payments

```text
POST /api/payments/create-order
POST /api/payments/verify
```

Used for Razorpay order creation and payment verification.

### Users

```text
GET /api/users/profile
PUT /api/users/profile
GET /api/users
PUT /api/users/:id/role
```

Used for profile management and admin user management.

### Reviews

```text
GET    /api/reviews/product/:productId
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

Used for product ratings and customer reviews.

## Auth Rules

Public routes:

- Product listing/detail routes
- Login and registration
- Health check

Protected user routes:

- Profile
- Cart
- Checkout
- My orders
- Reviews

Admin routes:

- Product create/update/delete
- All orders
- Order status update
- User list and role updates

## Documentation Rule

When a route is added or changed, update this file with:

- HTTP method
- Path
- Auth requirement
- Request body
- Response example
- Error cases
