import Review from "../models/Review.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { reviews },
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    product: req.params.productId,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  res.status(201).json({
    success: true,
    message: "Review created",
    data: { review },
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) throw new ApiError(404, "Review not found");

  const ownsReview = review.user.equals(req.user._id);
  if (!ownsReview && req.user.role !== "admin") {
    throw new ApiError(403, "Not allowed to delete this review");
  }

  await review.deleteOne();

  res.json({
    success: true,
    message: "Review deleted",
  });
});
