import React from "react";
import { Heart, Share2 } from "lucide-react";

const ProductInfo = ({ product }) => {
  const brand = product?.brand || "CRAFTON";
  const title = product?.title || product?.name || "Product";
  const subtitle = product?.subtitle || product?.description?.slice(0, 80) || "Premium product";
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div>

      <p className="text-sm font-semibold uppercase text-zinc-500">{brand}</p>

      <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-zinc-950">{title}</h1>

      <p className="mt-3 text-lg text-zinc-500">{subtitle}</p>

      <div className="mt-8 flex items-center gap-4">
        <span className="text-4xl font-bold text-black">₹{price}</span>

        {originalPrice && (
          <span className="text-xl text-zinc-400 line-through">₹{originalPrice}</span>
        )}

        {discount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">SAVE {discount}%</span>
        )}
      </div>

      <p className="mt-2 text-sm text-zinc-500">Inclusive of all taxes</p>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-zinc-800">Add to Cart</button>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white"><Heart /></button>

        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 bg-white"><Share2 /></button>
      </div>

    </div>
  );
};

export default ProductInfo;