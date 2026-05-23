import React, { useState } from "react";

import ProductCard from "../product/ProductCard";

import luggageProducts from "../../data/luggageProducts";

const categories = [
  "HARD LUGGAGE",
  "SOFT LUGGAGE",
  "TRAVEL SETS",
];

const LuggageSection = () => {
  const [activeTab, setActiveTab] =
    useState("HARD LUGGAGE");

  return (
    <section className="mx-auto my-6 max-w-7xl rounded-3xl bg-[#f5f5f5] px-4 py-20 md:px-8 lg:px-16">

      {/* Header */}
      <div className="mb-3 flex flex-col items-center justify-center text-center">

        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          The Travel Edit
        </span>

        <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
          MOVE WITH STYLE
        </h2>

      </div>

      {/* Tabs */}
      <div className="relative mx-auto mt-10 flex max-w-full items-center justify-center gap-6 border-b border-zinc-200 px-2 sm:gap-8 sm:px-0">

        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              setActiveTab(item)
            }
            className={`relative cursor-pointer pb-3 text-xs font-bold uppercase tracking-wider transition-colors duration-200 md:text-sm ${
              activeTab === item
                ? "text-black"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}

            {activeTab === item && (
              <span className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="mt-14 min-h-[460px]">

        <div
          key={activeTab}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-[fadeLift_0.3s_ease-out_both]"
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeLift {
                  from {
                    opacity: 0;
                    transform: translateY(15px);
                  }

                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `,
            }}
          />

          {luggageProducts[
            activeTab
          ]?.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LuggageSection;