import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../product/ProductCard";
import products from "../../data/product";

const categories = [
  "PROFESSIONAL",
  "COLLEGE",
];

const BackpackSection = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("PROFESSIONAL");

  const filteredProducts =
    products.filter((product) =>
      activeTab === "PROFESSIONAL"
        ? product.category === "Backpacks"
        : product.category !== "Backpacks"
    );

  return (
    <section className="mx-auto max-w-7xl bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-16">

      {/* Heading */}
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
          Trending Collections
        </p>

        <h2 className="mt-4 text-3xl font-black text-zinc-900 md:text-5xl">
          Backpacks Collection
        </h2>
      </div>

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

      {/* Products */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}

      </div>

      {/* View All */}
      <div className="mt-12 flex justify-center">

        <button
          onClick={() =>
            navigate("/shop")
          }
          className="cursor-pointer rounded-xl border border-black bg-black px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          View All
        </button>

      </div>
    </section>
  );
};

export default BackpackSection;