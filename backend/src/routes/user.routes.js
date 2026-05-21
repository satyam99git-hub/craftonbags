import express from "express";
import {
  deleteUser,
  getProfile,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.get("/", authMiddleware, adminMiddleware, getUsers);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
