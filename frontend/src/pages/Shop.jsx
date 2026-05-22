// Renders the product listing and shopping page.
import React, { useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import productsData from "../data/product";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Merge all categories into one array
  const allProducts = useMemo(() => {
    return Object.values(productsData).flat();
  }, []);

  // Dynamic categories
  const categories = [
    "ALL",
    ...new Set(allProducts.map((item) => item.category)),
  ];

  // Filter products
  const filteredProducts =
    activeCategory === "ALL"
      ? allProducts
      : allProducts.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-16">
      
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Crafton Store
          </span>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-950 md:text-6xl">
            Shop Collection
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
            Explore premium backpacks, travel bags, totes,
            and lifestyle accessories crafted for modern travel.
          </p>
        </div>

        {/* Product Count */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Total Products
          </p>

          <h3 className="mt-1 text-3xl font-black text-zinc-950">
            {filteredProducts.length}
          </h3>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-12 flex flex-wrap items-center gap-3 border-b border-zinc-100 pb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-200 ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,

              title: product.title || product.name,

              image:
                product.image ||
                product.images?.[0],

              newPrice: product.price,

              oldPrice:
                product.originalPrice,

              volume:
                product.volume || "28L",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Shop;