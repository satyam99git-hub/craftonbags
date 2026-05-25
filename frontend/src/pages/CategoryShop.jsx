import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categoryProducts } from "../data/mockProducts";

const CategoryShop = () => {
  const { categorySlug } = useParams();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Format header string (e.g. luxury-backpacks -> Luxury Backpacks)
  const formattedTitle = categorySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const rawProducts = categoryProducts[categorySlug] || [];

  // Filtering & Sorting Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...rawProducts];

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result = result.filter((p) => {
      const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, ""));
      return numericPrice <= maxPrice;
    });

    if (sortBy === "low-to-high") {
      result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, "")));
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, "")));
    } else if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return result;
  }, [rawProducts, searchQuery, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 antialiased animate-fade-in-up">
      
      {/* 1. Enhanced Luxury Split-Hero Header Section */}
      <section className="bg-zinc-100 border-b border-zinc-200/60 relative overflow-hidden">
        <div className="max-w-[95%] xl:max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 sm:px-6 lg:px-8">
          
          {/* Left Editorial Text Column */}
          <div className="md:col-span-6 space-y-4 py-12 md:py-20 z-10">
            <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-zinc-900">{formattedTitle || "Shop"}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 uppercase leading-none">
              {formattedTitle || "Shop Collection"}
            </h1>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg">
              Engineered for the modern traveler. Explore premium transit infrastructure, modular packing architectures, and everyday carrying systems built with uncompromised utility.
            </p>
          </div>

          {/* Right Polished Banner Image Column */}
          <div className="hidden md:block md:col-span-6 h-full relative self-stretch">
            <div className="absolute inset-y-0 right-0 w-[calc(100%+2rem)] left-4 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-transparent to-transparent z-10" />
              <img 
                src="https://cdn.shopify.com/s/files/1/0872/4604/5498/files/TOP_LUXURY_HANDBAG_BRANDS_Page_2.jpg?v=1732888664" 
                alt="Collection Background" 
                className=" h-full p-5 object-cover object-center  transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main High-Width Catalog Workspace */}
      <div className="max-w-[95%] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Filter Customization Column (3 out of 12 grid blocks) */}
        <aside className="lg:col-span-3 space-y-8 bg-white border border-zinc-200/60 p-6 rounded-3xl shadow-sm/30 self-start sticky top-4">
          
          {/* Search Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Search Products</label>
            <input 
              type="text" 
              placeholder="Type to filter..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
            />
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
              <span className="text-zinc-400">Max Price</span>
              <span className="text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md font-mono text-xs">${maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
            />
            <div className="flex justify-between text-[10px] font-bold text-zinc-400 font-mono">
              <span>$0</span>
              <span>Max: $5000</span>
            </div>
          </div>

          {/* In Stock Filter Toggle Switch */}
          <div className="flex items-center justify-between border-y border-zinc-100 py-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">In Stock Only</span>
              <span className="text-[10px] text-zinc-400">Hide archival models</span>
            </div>
            <button 
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${inStockOnly ? "bg-zinc-900" : "bg-zinc-200"}`}
            >
              <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-300 ${inStockOnly ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Sidebar Fast Categories Mapping */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Categories</label>
            <div className="flex flex-col gap-1 text-xs font-bold text-zinc-500">
              <Link to="/shop/luxury-backpacks" className={`px-3 py-2 rounded-xl transition-all ${categorySlug === 'luxury-backpacks' ? 'bg-zinc-900 text-white shadow-sm' : 'hover:bg-zinc-50 hover:text-zinc-900'}`}>Backpacks</Link>
              <Link to="/shop/leather-totes" className={`px-3 py-2 rounded-xl transition-all ${categorySlug === 'leather-totes' ? 'bg-zinc-900 text-white shadow-sm' : 'hover:bg-zinc-50 hover:text-zinc-900'}`}>Totes</Link>
              <Link to="/shop/travel-duffles" className={`px-3 py-2 rounded-xl transition-all ${categorySlug === 'travel-duffles' ? 'bg-zinc-900 text-white shadow-sm' : 'hover:bg-zinc-50 hover:text-zinc-900'}`}>Travel Bags</Link>
            </div>
          </div>

        </aside>

        {/* Right Side Catalog Display Panel (9 out of 12 grid blocks) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Sort Controls Bar */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl px-6 py-3.5 flex items-center justify-between text-xs font-bold text-zinc-600 shadow-sm/30">
            <div className="text-zinc-400 font-normal">
              Showing <span className="font-bold text-zinc-900">{filteredAndSortedProducts.length}</span> of {rawProducts.length} items
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-[11px] uppercase tracking-wider text-zinc-400">Sort By:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-zinc-900 font-bold text-zinc-700 cursor-pointer transition-colors hover:bg-zinc-100"
              >
                <option value="featured">Featured / Best Rating</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Product Items Responsive Layout Core */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-24 text-zinc-400 font-medium text-xs bg-white rounded-3xl border border-zinc-200 border-dashed">
              No product matches found within current filter definitions.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col bg-white border border-zinc-100 rounded-3xl overflow-hidden p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  {/* Photo Container Frame */}
                  <div className="relative aspect-[4/5] w-full bg-zinc-50 overflow-hidden rounded-2xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Metadata Info Blocks */}
                  <div className="flex flex-col flex-grow px-2 pt-4 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">Crafton Studio</span>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="font-extrabold text-zinc-900 text-sm tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md shrink-0">
                        ★ {item.rating}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2 mt-0.5 mb-4 flex-grow">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto">
                      <span className="font-black text-zinc-900 text-base">{item.price}</span>
                      <button className="text-[11px] font-bold bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors shadow-sm">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default CategoryShop;