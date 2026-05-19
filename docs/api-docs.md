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
POST /api/auth/logout
GET  /api/auth/me
```

Used for account creation, login, logout, and current user lookup.

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
