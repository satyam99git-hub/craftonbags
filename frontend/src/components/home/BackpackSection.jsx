import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { getProducts } from "../../api/productApi";

const categories = ["PROFESSIONAL", "COLLEGE"];

const professionalCategories = [
  "luxury-backpacks",
  "leather-totes",
  "travel-duffles",
];

const collegeCategories = [
  "girl-power",
  "anime",
  "games",
];

const BackpackSection = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState("PROFESSIONAL");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredProducts = products
    .filter((product) =>
      activeTab === "PROFESSIONAL"
        ? professionalCategories.includes(product.category)
        : collegeCategories.includes(product.category)
    )
    .slice(0, 8);

  // --- SCROLL BUTTON HANDLERS ---
  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll by the visible width of the container
    const scrollAmount = container.clientWidth * 0.75; 
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-zinc-500 animate-pulse text-sm font-medium">
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
      
      {/* Heading */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
          Trending Collections
        </p>
        <h2 className="mt-3 text-3xl font-black text-zinc-900 md:text-5xl uppercase tracking-tight">
          Backpacks Collection
        </h2>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-8 border-b border-zinc-100">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`relative cursor-pointer pb-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
              activeTab === item
                ? "text-blue-600"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                activeTab === item ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* --- HORIZONTAL SCROLL CAROUSEL WITH CONTROLS --- */}
      <div className="mt-12 relative group">
        
        {/* Left Arrow Button */}
        {filteredProducts.length > 0 && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-zinc-50 hover:text-black cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="flex-shrink-0 w-[280px] sm:w-[310px] snap-start transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-zinc-400 text-sm font-medium">
              No products found in this category.
            </div>
          )}
        </div>

        {/* Right Arrow Button */}
        {filteredProducts.length > 0 && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-zinc-50 hover:text-black cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

      </div>

      {/* View All */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/shop")}
          className="cursor-pointer rounded-xl border border-black bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black shadow-sm"
        >
          View All
        </button>
      </div>

    </section>
  );
};

export default BackpackSection;