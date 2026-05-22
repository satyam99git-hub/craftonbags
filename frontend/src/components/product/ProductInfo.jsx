import React from "react";
import { Heart, Share2 } from "lucide-react";

const ProductInfo = () => {
  return (
    <div>

      <p className="text-sm font-semibold uppercase text-zinc-500">
        CRAFTON
      </p>

      <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-zinc-950">
        VALOR NXT BLACK
      </h1>

      <p className="mt-3 text-lg text-zinc-500">
        Professional Laptop Backpack
      </p>

      <div className="mt-8 flex items-center gap-4">
        <span className="text-4xl font-bold text-black">
          ₹3,779
        </span>

        <span className="text-xl text-zinc-400 line-through">
          ₹4,000
        </span>

        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
          SAVE 6%
        </span>
      </div>

      <p className="mt-2 text-sm text-zinc-500">
        Inclusive of all taxes
      </p>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-zinc-800">
          Add to Cart
        </button>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white">
          <Heart />
        </button>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white">
          <Share2 />
        </button>
      </div>

    </div>
  );
};

export default ProductInfo;