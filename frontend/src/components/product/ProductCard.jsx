import React from "react";

import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

import {
  useWishlist,
} from "../../context/WishlistContext";

import useAuth from "../../hooks/useAuth";

const ProductCard = ({ product }) => {
  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const { isAuthenticated } =
    useAuth();

  const {
    image,
    images,
    title,
    name,
    price,
    originalPrice,
    volume = "28L",
    slug,
    description,
    category,
  } = product;

  // Safe Dynamic Fallbacks
  const productImage =
    image || images?.[0];

  const productTitle =
    title || name || "Product";

  // Discount Logic
  const discountPercent =
    originalPrice
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  return (
    <Link
      to={`/product/${slug}`}
      className="block h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100">

          {/* Wishlist */}
          {isAuthenticated && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                toggleWishlist(product);
              }}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Heart
                size={18}
                className={`transition-all duration-300 ${
                  isWishlisted(
                    product.slug
                  )
                    ? "fill-red-500 text-red-500"
                    : "text-zinc-700"
                }`}
              />
            </button>
          )}

          {/* Main Image */}
          <img
            src={productImage}
            alt={productTitle}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />

          {/* Volume Badge */}
          <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-zinc-800 backdrop-blur-md">
            {volume}
          </div>

          {/* Hover Button */}
          <div className="absolute inset-x-4 bottom-4 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

            <div className="w-full rounded-2xl bg-white py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-black shadow-xl transition-all duration-300 hover:bg-zinc-100">
              View Product
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">

          {/* Category */}
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
            {category ||
              "CRAFTON COLLECTION"}
          </span>

          {/* Title */}
          <h3 className="mt-2 line-clamp-1 text-sm font-black uppercase tracking-tight text-zinc-950 transition-colors duration-300 group-hover:text-amber-700 md:text-base">
            {productTitle}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 md:text-sm">
            {description ||
              "Premium lifestyle backpack designed for travel and work."}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price Area */}
          <div className="mt-5 flex flex-wrap items-center gap-2">

            {/* Final Price */}
            <span className="text-xl font-black tracking-tight text-zinc-950">
              ₹
              {price?.toLocaleString(
                "en-IN"
              )}
            </span>

            {/* Original Price */}
            {originalPrice && (
              <span className="text-sm font-medium text-zinc-400 line-through">
                ₹
                {originalPrice?.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}

            {/* Discount Badge */}
            {discountPercent >
              0 && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                {discountPercent}% OFF
              </span>
            )}

          </div>

          {/* Mobile CTA */}
          <div className="mt-5 hidden rounded-2xl bg-zinc-950 py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-black max-md:block">
            View Product
          </div>

        </div>
      </article>
    </Link>
  );
};

export default ProductCard;