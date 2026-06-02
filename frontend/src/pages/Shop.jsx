import React, { useEffect, useMemo, useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  RefreshCw, 
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../api/productApi";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("FEATURED");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const absoluteMaxPrice = useMemo(() => {
    if (!products.length) return 100000;
    return Math.max(...products.map((p) => p.price || 0));
  }, [products]);

  useEffect(() => {
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMaxPrice]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category).filter(Boolean));
    return ["ALL", ...Array.from(unique)];
  }, [products]);

  // Reset pagination to page 1 whenever search filters alter the criteria
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, maxPrice, sortBy, inStockOnly, itemsPerPage]);

  const processedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === "ALL" || product.category === activeCategory;
      const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    switch (sortBy) {
      case "PRICE_LOW":
        result.sort((a, b) => a.price - b.price);
        break;
      case "PRICE_HIGH":
        result.sort((a, b) => b.price - a.price);
        break;
      case "NAME_AZ":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "FEATURED":
      default:
        result.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
    }
    return result;
  }, [products, activeCategory, searchQuery, maxPrice, sortBy, inStockOnly]);

  // Derived Pagination slices
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage, itemsPerPage]);

  const trendingProductsFallback = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0))
      .slice(0, 4);
  }, [products]);

  const handleResetFilters = () => {
    setActiveCategory("ALL");
    setSearchQuery("");
    setMaxPrice(absoluteMaxPrice);
    setSortBy("FEATURED");
    setInStockOnly(false);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-20 bg-zinc-100 rounded-2xl w-2/3" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="h-96 bg-zinc-100 rounded-2xl" />
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-zinc-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-50/50 text-zinc-900 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zinc-200 pb-8 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              Crafton Store
            </span>
            <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
              Shop Collection
            </h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-500">
              Explore curated, premium pieces directly sourced and dynamic.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Products Match
              </p>
              <h3 className="text-2xl font-black text-zinc-900 mt-0.5">
                {processedProducts.length}
                <span className="text-xs font-normal text-zinc-400 ml-1.5">
                  of {products.length}
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR FILTERS --- */}
          <aside className="lg:sticky lg:top-8 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <span className="flex items-center gap-2 font-bold uppercase text-xs tracking-wider text-zinc-700">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs flex items-center gap-1.5 text-zinc-400 hover:text-black transition-colors font-medium"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Search</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Category</label>
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:bg-white transition-all capitalize"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.toLowerCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-500">Max Price</label>
                <span className="font-mono bg-zinc-100 px-2 py-0.5 rounded text-zinc-700 font-bold">
                  ${maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={absoluteMaxPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black bg-zinc-100 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Stock Toggle */}
            <label className="flex items-center gap-3 cursor-pointer pt-2 group select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </div>
              <span className="text-xs font-medium text-zinc-600 group-hover:text-black transition-colors">
                In Stock Only
              </span>
            </label>
          </aside>

          {/* --- PRODUCTS WRAPPER --- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Toolbar Controls */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-zinc-200/80 shadow-sm">
              <div className="relative w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-transparent pl-3 pr-8 py-1.5 text-xs font-semibold tracking-wide text-zinc-700 focus:outline-none cursor-pointer"
                >
                  <option value="FEATURED">Sort: Featured</option>
                  <option value="PRICE_LOW">Price: Low to High</option>
                  <option value="PRICE_HIGH">Price: High to Low</option>
                  <option value="NAME_AZ">Name: A to Z</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
              </div>

              {/* Items Per Page Option */}
              <div className="relative flex items-center gap-2 border-l border-zinc-200 pl-4 text-xs text-zinc-500 font-semibold">
                <span>View</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="appearance-none bg-zinc-100 pl-3 pr-7 py-1 rounded-lg text-zinc-800 font-bold focus:outline-none cursor-pointer text-xs"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Rendering */}
            {paginatedProducts.length > 0 ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
                  {paginatedProducts.map((product) => (
                    <div key={product._id} className="transform hover:-translate-y-1 transition-transform duration-300">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* --- PAGINATION CONTROLS --- */}
                <div className="flex items-center justify-between border-t border-zinc-200/80 pt-6">
                  <p className="text-xs font-medium text-zinc-500">
                    Showing <span className="text-zinc-800 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="text-zinc-800 font-bold">
                      {Math.min(currentPage * itemsPerPage, processedProducts.length)}
                    </span>{" "}
                    of <span className="text-zinc-800 font-bold">{processedProducts.length}</span> results
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-zinc-200 rounded-xl bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${
                              currentPage === pageNum
                                ? "bg-black text-white"
                                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-zinc-200 rounded-xl bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              
              /* --- EMPTY STATE SECTION --- */
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 text-center space-y-12">
                <div className="max-w-sm mx-auto flex flex-col items-center justify-center pt-8">
                  <div className="p-4 bg-zinc-50 text-zinc-400 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">No matching products</h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    We couldn't find anything matching your exact filter combination. Try clearing your constraints.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-5 text-xs bg-black text-white font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>

                {/* Fallback Recommendations block */}
                <div className="border-t border-zinc-100 pt-8 text-left">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                      Alternative Picks
                    </span>
                    <h4 className="text-lg font-black uppercase text-zinc-900 mt-1">
                      Trending Products
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {trendingProductsFallback.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;