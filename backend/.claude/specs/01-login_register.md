# Spec Document — Authentication System (Login & Register)
# 1. Overview
Implement the authentication system for the Crafton Bags MERN application.
The frontend UI for the following is already completed:
    • Login
    • Register / Signup
    • Authentication Modal
This task must implement ONLY:
    • Authentication backend APIs
    • User authentication logic
    • JWT token generation
    • Password hashing
    • Authentication middleware
    • Frontend API integration with existing forms
Do NOT modify or affect:
    • Product system
    • Orders system
    • Payments system
    • Reviews system
    • Cart system
    • Admin system
    • Existing homepage UI
    • Existing routing outside authentication routes
This implementation must remain isolated to authentication-related files only.

# 2. Tech Stack
Frontend
    • React.js
    • Axios
Backend
    • Node.js
    • Express.js
Database
    • MongoDB
    • Mongoose
Authentication
    • JWT (jsonwebtoken)
    • bcryptjs

# 3. Existing Setup
Already completed:
    • Express backend setup
    • MongoDB connection setup
    • Frontend authentication UI
    • Existing project folder structure
    • Existing API base setup

# 4. Environment Variables
Create or update .env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_key
JWT_EXPIRE=7d
Rules:
    • Never hardcode secrets
    • Use process.env
    • Keep .env out of version control

# 5. Routes
Implement ONLY these routes:
Method
Route
Access
POST
/api/auth/register
Public
POST
/api/auth/login
Public
POST
/api/auth/logout
Private
GET
/api/auth/me
Private
Do NOT modify any other routes.

6. Files Allowed To Modify
Backend
backend/
│
├── controllers/
│   └── authController.js
│
├── routes/
│   └── authRoutes.js
│
├── models/
│   └── User.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── utils/
│   └── generateToken.js
│
├── validators/
│   └── authValidator.js
│
├── services/
│   └── authService.js
│
├── app.js
│
└── .env
Frontend
frontend/src/components/auth/LoginForm.jsx

frontend/src/components/auth/RegisterForm.jsx
Do NOT modify:
    • Product files
    • Cart files
    • Redux store
    • Order files
    • Payment files
    • Admin files
    • Existing homepage components
    • Existing unrelated APIs

# 7. Files To Create
Create files ONLY if missing:
backend/controllers/authController.js
backend/routes/authRoutes.js
backend/models/User.js
backend/middlewares/authMiddleware.js
backend/utils/generateToken.js
backend/validators/authValidator.js
backend/services/authService.js
No additional files should be created.

# 8. Dependencies
Install ONLY if not already installed:
npm install bcryptjs jsonwebtoken
Do NOT install:
    • Passport.js
    • Firebase Authentication
    • OAuth libraries
    • Session-based authentication libraries
    • Refresh token libraries
    • NextAuth
Use JWT authentication only.

# 9. Database Schema
Collection
users

User Schema
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  phone: {
    type: String,
    default: ""
  },

  addresses: {
    type: [Object],
    default: []
  }
}
Enable timestamps:
{
  timestamps: true
}

# 10. API Response Structure
All APIs must return consistent JSON responses.
Success Response
{
  "success": true,
  "message": "Success message",
  "data": {}
}
Error Response
{
  "success": false,
  "message": "Error message"
}

# 11. Register API
Route
POST /api/auth/register

Headers
Content-Type: application/json

Request Body
{
  "name": "Satyam Gupta",
  "email": "satyam@example.com",
  "password": "password123"
}

Validation Rules
Field
Rules
name
Required
email
Required + valid email
password
Required + minimum 6 characters
Additional rules:
    • Trim spaces
    • Store password hashed only

Backend Logic
Step 1 — Validate Request
Reject invalid or missing fields.

Step 2 — Check Existing User
await User.findOne({ email })

Step 3 — Hash Password
const hashedPassword = await bcrypt.hash(password, 10)

Step 4 — Create User
await User.create({
  name,
  email,
  password: hashedPassword
})

Step 5 — Generate JWT Token
Generate token using utility function.

Success Response
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "name": "Satyam Gupta",
      "email": "satyam@example.com",
      "role": "user"
    }
  }
}

Error Responses
Error
Status
Missing fields
400
Invalid email
400
Duplicate email
409
Server error
500

# 12. Login API
Route
POST /api/auth/login

Headers
Content-Type: application/json

Request Body
{
  "email": "satyam@example.com",
  "password": "password123"
}

Backend Logic
Step 1 — Validate Request
Validate request body.

Step 2 — Find User
const user = await User.findOne({ email })

Step 3 — Compare Password
const isMatch = await bcrypt.compare(
  password,
  user.password
)

Step 4 — Generate JWT Token
Generate JWT token after successful authentication.

Success Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "name": "Satyam Gupta",
      "email": "satyam@example.com",
      "role": "user"
    }
  }
}

Error Responses
Error
Status
Invalid credentials
401
Missing fields
400
Server error
500

# 13. JWT Rules
Token Payload
{
  userId,
  role
}

Generate Token
jwt.sign(
  {
    userId: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE
  }
)

# 14. Authentication Middleware
File
middlewares/authMiddleware.js

Responsibilities
    • Read Authorization header
    • Verify JWT token
    • Decode token
    • Find user from database
    • Attach authenticated user to req.user
    • Reject invalid tokens

Header Format
Authorization: Bearer <token>

Unauthorized Response
{
  "success": false,
  "message": "Unauthorized"
}
Status Code:
401

# 15. Current User API
Route
GET /api/auth/me
Protected route.

Route Example
router.get("/me", authMiddleware, getCurrentUser)

Logic
    • Verify JWT token
    • Fetch current authenticated user
    • Return authenticated user details
    • Never return password field

Success Response
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "name": "Satyam Gupta",
      "email": "satyam@example.com",
      "role": "user"
    }
  }
}

# 16. Logout API
Route
POST /api/auth/logout
Protected route.

Logic
    • Frontend removes token from localStorage
    • Backend returns success response only
    • No token blacklist system required
    • No refresh token system required

Success Response
{
  "success": true,
  "message": "Logout successful"
}

# 17. Token Storage Rules
Use localStorage only.
Store Token
localStorage.setItem("token", token)

Retrieve Token
localStorage.getItem("token")

Important
This project intentionally uses localStorage for simplicity.
Production-grade cookie authentication is out of scope.
Do NOT implement:
    • Cookies
    • Refresh tokens
    • Session storage

# 18. Frontend Integration Rules
The authentication UI is already completed.
ONLY connect backend APIs.

LoginForm.jsx
Implement ONLY:
    • API request
    • Loading state
    • Error handling
    • Token storage
    • Redirect after login
    • Modal close functionality
Do NOT:
    • Redesign UI
    • Change layout
    • Modify styling

RegisterForm.jsx
Implement ONLY:
    • Registration API request
    • Validation handling
    • Auto-login after successful registration
Do NOT:
    • Redesign UI
    • Modify layout
    • Change styling

# 19. API Base URL
Use existing API configuration.
If missing, use:
axios.defaults.baseURL = "http://localhost:5000"
OR environment variable:
VITE_API_URL=http://localhost:5000

# 20. App Configuration
Register authentication routes inside app.js.
Example:
app.use("/api/auth", authRoutes)
Do not modify unrelated middleware or routes.

# 21. Security Rules
    • Never store plain passwords
    • Never return password hash
    • Always hash passwords using bcrypt
    • Store JWT secret in .env
    • Never hardcode secrets
    • Use JWT authentication only

# 22. Coding Rules
    • Use async/await only
    • Use try/catch in all controllers
    • Return consistent JSON responses
    • Keep logic isolated to authentication files
    • Do not refactor unrelated files
    • Do not rename folders
    • Do not change project architecture
    • Keep implementation beginner-friendly
    • Do not introduce complex abstractions
    • Do not add unnecessary layers or patterns

# 23. Expected Behavior
    • User can register successfully
    • Duplicate emails are blocked
    • Passwords are stored hashed
    • User can login successfully
    • JWT token generated correctly
    • Protected routes are secured
    • Invalid token requests are rejected
    • Existing frontend auth UI works correctly
    • Logout removes authentication state
    • No unrelated functionality is affected
    • 

# 24. API Testing
Test all APIs using Postman before frontend integration.
Verify:
    • Registration
    • Login
    • Protected routes
    • Invalid credentials
    • Invalid tokens
    • Logout flow

# 25. Definition of Done
    • User model implemented
    • Authentication routes implemented
    • Register API works
    • Login API works
    • Password hashing works
    • JWT generation works
    • Authentication middleware works
    • /api/auth/me works
    • Existing frontend authentication UI connected
    • Duplicate emails blocked
    • Invalid login rejected
    • Logout works
    • No unrelated files affected
    • Application runs without errors
