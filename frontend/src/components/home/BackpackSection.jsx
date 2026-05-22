import React, { useState } from "react";
import ProductCard from "../product/ProductCard";
import products from "../../data/product";

const categories = [
  "PROFESSIONAL",
  "COLLEGE",
];

const BackpackSection = () => {
  const [activeTab, setActiveTab] =
    useState("PROFESSIONAL");

  return (
    <section className="mx-auto max-w-7xl bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-16">
      
      {/* Top Tag */}
      <div className="mb-2 flex items-center justify-center gap-3">
        <span className="h-1 w-1 rounded-full bg-blue-600" />

        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-blue-600">
          Trending Collections
        </p>

        <span className="h-1 w-1 rounded-full bg-blue-600" />
      </div>

      {/* Heading */}
      <h2 className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
        Backpacks — Your Everyday Essential
      </h2>

      {/* Tabs */}
      <div className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-6 border-b border-zinc-100 md:gap-10">
        
        {categories.map((item) => (
          <button
            key={item}
            onClick={() =>
              setActiveTab(item)
            }
            className={`relative cursor-pointer pb-3 text-xs font-black uppercase tracking-widest transition-all duration-200 md:text-sm ${
              activeTab === item
                ? "text-blue-600"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}

            <span
              className={`absolute bottom-0 left-0 h-[3px] bg-blue-600 transition-all duration-300 ${
                activeTab === item
                  ? "w-full opacity-100"
                  : "w-0 opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div
        key={activeTab}
        className="mt-12 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-[fadeSlide_0.4s_ease-out_both]"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes fadeSlide {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `,
          }}
        />

        {products[activeTab]?.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}
      </div>

      {/* View All Button */}
      <div className="mt-12 flex justify-center">
        <button className="cursor-pointer rounded-xl border border-black bg-black px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-black">
          View All
        </button>
      </div>
    </section>
  );
};

export default BackpackSection;