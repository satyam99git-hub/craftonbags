// Renders the product listing and shopping page with advanced filtering, sorting, and trending fallback.
import React, { useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import productsData from "../data/product";

const Shop = () => {
  // 1. Core State Management
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("FEATURED"); 
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState("GRID"); 

  // 2. Normalize raw products data with fallbacks
  const allProducts = useMemo(() => {
    const rawProducts = Object.values(productsData).flat();
    return rawProducts.map((product) => ({
      ...product,
      title: product.title || product.name || "Untitled Product",
      image: product.image || product.images?.[0] || "/placeholder.jpg",
      newPrice: Number(product.price || 0),
      oldPrice: product.originalPrice ? Number(product.originalPrice) : null,
      volume: product.volume || "28L",
      inStock: product.inStock !== undefined ? product.inStock : true, 
      rating: product.rating || 4.5, // Mock fallback rating if not present
    }));
  }, []);

  // 3. Extract unique categories dynamically
  const categories = useMemo(() => {
    const dynamicCats = new Set(allProducts.map((item) => item.category));
    return ["ALL", ...dynamicCats];
  }, [allProducts]);

  // 4. Track highest overall price to boundary limit the slider
  const absoluteMaxPrice = useMemo(() => {
    if (allProducts.length === 0) return 300;
    return Math.max(...allProducts.map((p) => p.newPrice), 300);
  }, [allProducts]);

  // Auto-set initial max price window safely
  useMemo(() => {
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMaxPrice]);

  // 5. Combined Filter, Match, and Sort Pipeline
  const processedProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const matchesCategory = activeCategory === "ALL" || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.newPrice <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "PRICE_LOW":
          return a.newPrice - b.newPrice;
        case "PRICE_HIGH":
          return b.newPrice - a.newPrice;
        case "NAME_AZ":
          return a.title.localeCompare(b.title);
        case "FEATURED":
        default:
          return b.rating - a.rating; 
      }
    });
  }, [allProducts, activeCategory, searchQuery, maxPrice, sortBy, inStockOnly]);

  // 6. Curated Fallback Recommendation Strategy (Top 4 Highest Rated/Featured Items)
  const trendingProductsFallback = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [allProducts]);

  // Clear all states convenience macro
  const handleResetFilters = () => {
    setActiveCategory("ALL");
    setSearchQuery("");
    setMaxPrice(absoluteMaxPrice);
    setInStockOnly(false);
    setSortBy("FEATURED");
  };

  return (
    <section className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-16">
      
      {/* Header Area */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zinc-100 pb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Crafton Store
          </span>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-zinc-950 md:text-6xl">
            Shop Collection
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
            Explore premium backpacks, travel bags, totes, and lifestyle accessories crafted for modern travel.
          </p>
        </div>

        {/* Product Statistics Badge */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 min-w-[140px] text-center md:text-left">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Showing</p>
          <h3 className="mt-1 text-3xl font-black text-zinc-950">
            {processedProducts.length}{" "}
            <span className="text-sm font-normal text-zinc-400">of {allProducts.length}</span>
          </h3>
        </div>
      </div>

      {/* Toolbar Layer (Sorting & Layout Controls) */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4">
        
        {/* Active Breadcrumb Summary */}
        <div className="flex flex-wrap items-center gap-2">
          {activeCategory !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800">
              Category: {activeCategory}
              <button onClick={() => setActiveCategory("ALL")} className="hover:text-red-500 font-black ml-1">×</button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="hover:text-red-500 font-black ml-1">×</button>
            </span>
          )}
          {maxPrice < absoluteMaxPrice && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800">
              Under: ${maxPrice}
              <button onClick={() => setMaxPrice(absoluteMaxPrice)} className="hover:text-red-500 font-black ml-1">×</button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-800">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} className="hover:text-red-500 font-black ml-1">×</button>
            </span>
          )}
        </div>

        {/* View Layout Controls + Sort Dropdown */}
        <div className="flex items-center gap-4 ml-auto w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Grid/List Toggle Switcher */}
          <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setViewMode("GRID")}
              className={`p-2.5 text-xs font-bold tracking-wider transition-colors ${viewMode === "GRID" ? "bg-black text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
              title="Grid View"
            >
              田 Grid
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`p-2.5 text-xs font-bold tracking-wider transition-colors ${viewMode === "LIST" ? "bg-black text-white" : "text-zinc-600 hover:bg-zinc-100"}`}
              title="List View"
            >
              ☰ List
            </button>
          </div>

          {/* Sort Controller Select input */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-800 outline-none transition-all focus:border-zinc-950"
            >
              <option value="FEATURED">Featured / Best Rating</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="NAME_AZ">Product Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid Viewport split window */}
      <div className="flex flex-col gap-10 lg:flex-row">
        
        {/* Left Control Column */}
        <aside className="w-full shrink-0 lg:w-64 space-y-8 lg:sticky lg:top-6 h-fit">
          
          {/* Text Search element */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Price Sliding Ranger component */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Max Price
              </label>
              <span className="text-sm font-black text-zinc-950">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={absoluteMaxPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black cursor-pointer bg-zinc-200 h-1 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              <span>$0</span>
              <span>Max: ${absoluteMaxPrice}</span>
            </div>
          </div>

          {/* Stock Availability Toggle Switch */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 p-3.5">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-700">In Stock Only</span>
              <span className="text-[10px] text-zinc-400">Hide out of stock items</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={inStockOnly} 
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          {/* Vertical Navigation Categories stack */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left w-auto lg:w-full ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 lg:bg-transparent lg:hover:bg-zinc-50 lg:text-zinc-500 lg:hover:text-zinc-950"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters Trigger button */}
          {(activeCategory !== "ALL" || searchQuery !== "" || maxPrice !== absoluteMaxPrice || inStockOnly || sortBy !== "FEATURED") && (
            <button
              onClick={handleResetFilters}
              className="w-full text-center text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors border border-dashed border-red-200 hover:border-red-300 rounded-xl py-3"
            >
              Reset All Filters
            </button>
          )}
        </aside>

        {/* Right Output Window panel viewport */}
        <main className="flex-1">
          {processedProducts.length > 0 ? (
            <div className={
              viewMode === "GRID" 
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" 
                : "flex flex-col gap-4"
            }>
              {processedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={viewMode === "LIST" ? "w-full max-w-none border-b border-zinc-100 pb-4" : ""}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            /* Upgraded Smart Empty State Container */
            <div className="space-y-12">
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 px-4">
                <span className="text-4xl animate-pulse">🔍</span>
                <h3 className="mt-4 text-lg font-black text-zinc-950 uppercase tracking-wide">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-zinc-500 max-w-xs leading-relaxed">
                  We couldn't find matches for your active filters. Try clearing parameters or browse our trending catalog below.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-xl bg-black px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Dynamic Fallback: "Trending Alternatives Panel" */}
              <div className="space-y-6 pt-4 border-t border-zinc-100">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    Don't leave empty-handed
                  </span>
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                    Our Best Sellers & Trending Picks
                  </h2> 
                  
                </div>
                
                {/* Fallback Display items stream (Always forced to Grid for styling stability) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {trendingProductsFallback.map((product) => (
                    <ProductCard key={`fallback-${product.id}`} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

      </div>
    </section>
  );
};

export default Shop;