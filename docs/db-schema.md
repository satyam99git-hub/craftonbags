# Database Schema

Database: MongoDB

ODM: Mongoose

Development database:

```text
craftonbags
```

## Collections

### users

Stores customer and admin accounts.

Planned fields:

- `name`: string
- `email`: string, unique
- `password`: string, hashed
- `photoURL`: string
- `provider`: `credentials` or `google`
- `firebaseUid`: string, unique sparse
- `welcomeEmailSentAt`: date
- `role`: `user` or `admin`
- `phone`: string
- `addresses`: array
- `createdAt`: date
- `updatedAt`: date

Notes:

- `password` is required only for `credentials` users.
- Google users are created or updated after Firebase ID token verification.
- `welcomeEmailSentAt` records successful welcome email delivery for first-time Google signups.

### products

Stores catalog items.

Planned fields:

- `name`: string
- `slug`: string, unique
- `description`: string
- `price`: number
- `discountPrice`: number
- `category`: ObjectId reference to categories
- `images`: array
- `stock`: number
- `isFeatured`: boolean
- `isActive`: boolean
- `createdAt`: date
- `updatedAt`: date

### categories

Stores product categories.

Planned fields:

- `name`: string
- `slug`: string, unique
- `description`: string
- `image`: string
- `isActive`: boolean

### carts

Stores active user cart data.

Planned fields:

- `user`: ObjectId reference to users
- `items`: array of product, quantity, and price snapshots
- `coupon`: ObjectId reference to coupons
- `updatedAt`: date

### orders

Stores placed orders.

Planned fields:

- `user`: ObjectId reference to users
- `items`: array of purchased product snapshots
- `shippingAddress`: object
- `paymentMethod`: string
- `paymentStatus`: string
- `orderStatus`: string
- `subtotal`: number
- `discount`: number
- `shippingFee`: number
- `total`: number
- `createdAt`: date
- `updatedAt`: date

### reviews

Stores product reviews.

Planned fields:

- `user`: ObjectId reference to users
- `product`: ObjectId reference to products
- `rating`: number
- `comment`: string
- `createdAt`: date
- `updatedAt`: date

### coupons

Stores discount coupons.

Planned fields:

- `code`: string, unique
- `type`: `percentage` or `fixed`
- `value`: number
- `minOrderValue`: number
- `maxDiscount`: number
- `startsAt`: date
- `expiresAt`: date
- `usageLimit`: number
- `usedCount`: number
- `isActive`: boolean

## Index Suggestions

- `users.email`
- `users.firebaseUid`
- `products.slug`
- `products.category`
- `products.name`
- `categories.slug`
- `orders.user`
- `reviews.product`
- `reviews.user`
- `coupons.code`

## Documentation Rule

When a model is added or changed, update this file with:

- Collection name
- Field names and types
- Required fields
- References
- Indexes
- Any important validation rules
