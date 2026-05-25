import React from "react";

import { Link } from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  useWishlist,
} from "../../context/WishlistContext";

const WishlistCard = ({ item }) => {
  const { toggleWishlist } =
    useWishlist();

  // Safe Fallbacks
  const productImage =
    item.image || item.images?.[0];

  const productTitle =
    item.title || item.name;

  const discountPercent =
    item.originalPrice
      ? Math.round(
          ((item.originalPrice -
            item.price) /
            item.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-100">

        <Link
          to={`/product/${item.slug}`}
        >
          <img
            src={productImage}
            alt={productTitle}
            className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Discount */}
        {discountPercent > 0 && (
          <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
            {discountPercent}% OFF
          </div>
        )}

        {/* Remove Button */}
        <button
          onClick={() =>
            toggleWishlist(item)
          }
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Trash2
            size={18}
            className="text-red-500"
          />
        </button>

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Top */}
        <div className="mb-2 flex items-center justify-between">

          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {item.category}
          </span>

          <span className="text-xs font-semibold text-green-600">
            ● In Stock
          </span>

        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-black uppercase tracking-tight text-zinc-900">
          {productTitle}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {item.description ||
            "Premium lifestyle backpack designed for travel, work, and modern everyday essentials."}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">

          <span className="text-2xl font-black text-black">
            ₹
            {item.price?.toLocaleString(
              "en-IN"
            )}
          </span>

          {item.originalPrice && (
            <span className="text-sm text-zinc-400 line-through">
              ₹
              {item.originalPrice?.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

        </div>

        {/* Colors */}
        {item.colors?.length > 0 && (
          <div className="mt-4 flex gap-2">

            {item.colors.map(
              (color, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor:
                      color,
                  }}
                  className="h-4 w-4 rounded-full border border-zinc-300"
                />
              )
            )}

          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <Link
            to={`/product/${item.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <ShoppingBag size={16} />
            View Product
          </Link>

          <button
            onClick={() =>
              toggleWishlist(item)
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-300 transition-all hover:border-red-500 hover:text-red-500"
          >
            <Heart
              size={18}
              className="fill-red-500 text-red-500"
            />
          </button>

        </div>
      </div>
    </div>
  );
};

export default WishlistCard;