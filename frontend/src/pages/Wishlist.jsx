import React from "react";

import { Link } from "react-router-dom";

import WishlistCard from "../components/wishlist/WishlistCard";

import {
  useWishlist,
} from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } =
    useWishlist();

  return (
    <div className="min-h-screen bg-[#fafafa]">

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
              Your Collection
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
              Wishlist
            </h1>

            <p className="mt-3 text-zinc-500">
              Save your favorite products and purchase later.
            </p>
          </div>

          <button className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white">
            Share Wishlist
          </button>

        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white">

            <h2 className="text-2xl font-bold text-zinc-900">
              Wishlist is Empty
            </h2>

            <p className="mt-2 text-zinc-500">
              Start exploring and save products you love.
            </p>

            <Link
              to="/shop"
              className="mt-6 rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-6 py-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Saved Products
                </p>

                <h3 className="mt-1 text-2xl font-black text-zinc-950">
                  {wishlist.length}
                </h3>
              </div>

            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {wishlist.map((item) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                />
              ))}

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;