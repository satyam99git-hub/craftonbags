import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    brand: {
      type: String,
      default: "CRAFTON",
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    discountPercentage: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    specifications: {
      material: String,
      capacity: String,
      dimensions: String,
      weight: String,
      laptopSize: String,
    },

    features: [String],

    colors: [String],

    ratingsAverage: {
      type: Number,
      default: 0,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search performance on title and description
productSchema.index({ title: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;