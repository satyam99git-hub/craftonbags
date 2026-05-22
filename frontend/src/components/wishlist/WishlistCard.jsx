import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

const WishlistCard = ({ item, onRemove }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative overflow-hidden bg-zinc-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-black hover:text-white">
          <Heart size={18} fill="currentColor" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {item.category}
          </span>

          <span
            className={`text-xs font-semibold ${
              item.inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            ● {item.stockStatus}
          </span>
        </div>

        <h3 className="text-lg font-bold text-zinc-900">
          {item.name}
        </h3>

        <p className="mt-2 text-xl font-black text-black">
          ${item.price}
        </p>

        {/* Colors */}
        <div className="mt-4 flex gap-2">
          {item.colors.map((color, index) => (
            <span
              key={index}
              style={{ backgroundColor: color }}
              className="h-4 w-4 rounded-full border border-zinc-300"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-2">
          
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
            <ShoppingBag size={16} />
            Add to Cart
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="w-full rounded-2xl border border-zinc-300 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;