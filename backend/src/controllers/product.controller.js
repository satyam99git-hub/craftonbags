import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    featured,
    isFeatured,
    search,
    page = 1,
    limit = 10000,
    inStock,
    sort,
    maxPrice,
  } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  const featuredValue =
    featured !== undefined
      ? featured
      : isFeatured;

  if (featuredValue !== undefined) {
    filter.isFeatured =
      featuredValue === "true";
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  if (maxPrice) {
    filter.price = {
      $lte: Number(maxPrice),
    };
  }

  let sortQuery = {
    createdAt: -1,
  };

  if (sort === "price_asc")
    sortQuery = { price: 1 };

  if (sort === "price_desc")
    sortQuery = { price: -1 };

  if (sort === "rating")
    sortQuery = {
      ratingsAverage: -1,
    };

  if (sort === "newest")
    sortQuery = {
      createdAt: -1,
    };

  const numericLimit = Math.min(
    Number(limit),
    50
  );

  const skip =
    (Number(page) - 1) *
    numericLimit;

  const [products, total] =
    await Promise.all([
      Product.find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(numericLimit),

      Product.countDocuments(filter),
    ]);

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: Number(page),
        limit: numericLimit,
        total,
        pages: Math.ceil(
          total / numericLimit
        ),
      },
    },
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const lookup = [{ slug: req.params.id }];

  if (mongoose.isValidObjectId(req.params.id)) {
    lookup.push({ _id: req.params.id });
  }

  const product = await Product.findOne({
    $or: lookup,
    isActive: true,
  });

  if (!product) throw new ApiError(404, "Product not found");

  res.json({ success: true, data: { product } });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    slug: req.body.slug || createSlug(req.body.title),
  });

  res.status(201).json({
    success: true,
    message: "Product created",
    data: { product },
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const update = { ...req.body };

  if (update.title && !update.slug) {
    update.slug = createSlug(update.title);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!product) throw new ApiError(404, "Product not found");

  res.json({
    success: true,
    message: "Product updated",
    data: { product },
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) throw new ApiError(404, "Product not found");

  res.json({
    success: true,
    message: "Product deleted",
  });
});