import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  googleAuth,
  logout,
  refreshSession,
  getCurrentUser,
  protectedExample,
} from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
  validateGoogleAuth,
} from "../validators/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);
router.post("/google", authLimiter, validateGoogleAuth, googleAuth);
router.post("/logout", logout);
router.post("/refresh", authMiddleware, refreshSession);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/protected-example", authMiddleware, protectedExample);

export default router;
