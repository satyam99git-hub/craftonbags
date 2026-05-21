import Order from "../models/Order.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod = "cod" } = req.body;

  if (!items?.length) {
    throw new ApiError(400, "Order items are required");
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
  });

  res.status(201).json({
    success: true,
    message: "Order created",
    data: { order },
  });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name slug images")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { orders },
  });
});

export const getAllOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "name slug images")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { orders },
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "name slug images");

  if (!order) throw new ApiError(404, "Order not found");

  const ownsOrder = order.user._id.equals(req.user._id);
  if (!ownsOrder && req.user.role !== "admin") {
    throw new ApiError(403, "Not allowed to view this order");
  }

  res.json({
    success: true,
    data: { order },
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: req.body.orderStatus,
      paymentStatus: req.body.paymentStatus,
    },
    { new: true, runValidators: true }
  );

  if (!order) throw new ApiError(404, "Order not found");

  res.json({
    success: true,
    message: "Order updated",
    data: { order },
  });
});
