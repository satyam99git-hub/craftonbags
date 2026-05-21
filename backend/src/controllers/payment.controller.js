import crypto from "crypto";
import Razorpay from "razorpay";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new ApiError(500, "Razorpay is not configured");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  if (!amount || Number(amount) <= 0) {
    throw new ApiError(400, "Valid amount is required");
  }

  const razorpay = getRazorpay();
  const paymentOrder = await razorpay.orders.create({
    amount: Math.round(Number(amount) * 100),
    currency,
    receipt,
  });

  res.status(201).json({
    success: true,
    data: { paymentOrder },
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid payment signature");
  }

  res.json({
    success: true,
    message: "Payment verified",
  });
});
