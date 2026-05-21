import express from "express";
import {
  createReview,
  deleteReview,
  getProductReviews,
} from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);
router.post("/product/:productId", authMiddleware, createReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
