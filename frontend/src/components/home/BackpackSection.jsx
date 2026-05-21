import React, { useState } from "react";
import ProductCard from "../product/ProductCard";

const categories = ["PROFESSIONAL", "COLLEGE"];

const products = {
  PROFESSIONAL: [
    {
      name: "NEXTRA DARK IVY",
      oldPrice: "3,300",
      newPrice: "2,779",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      volume: "32L",
    },
    {
      name: "VALOR NXT BLACK",
      oldPrice: "4,000",
      newPrice: "3,779",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200&auto=format&fit=crop",
      volume: "30L",
    },
    {
      name: "CHESTER GREY",
      oldPrice: "2,500",
      newPrice: "1,319",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
      volume: "28L",
    },
    {
      name: "CHASER BLUE",
      oldPrice: "4,600",
      newPrice: "1,839",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
      volume: "35L",
    },
  ],
  COLLEGE: [
    {
      name: "URBAN FLEX",
      oldPrice: "2,999",
      newPrice: "2,199",
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1200&auto=format&fit=crop",
      volume: "25L",
    },
    {
      name: "CAMPUS ROVER",
      oldPrice: "3,200",
      newPrice: "2,499",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      volume: "28L",
    },
    {
      name: "VINTAGE CANVAS",
      oldPrice: "2,800",
      newPrice: "1,999",
      image: "https://images.unsplash.com/photo-1575844611586-37ce334f669f?q=80&w=1200&auto=format&fit=crop",
      volume: "30L",
    },
    {
      name: "NOMAD DAILY",
      oldPrice: "3,800",
      newPrice: "2,999",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop",
      volume: "32L",
    }
  ],
};

const BackpackSection = () => {
  const [activeTab, setActiveTab] = useState("PROFESSIONAL");

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
      
      {/* Dynamic Subheading Tag */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="h-1 w-1 rounded-full bg-blue-600" />
        <p className="text-center text-xs font-black tracking-[0.2em] text-blue-600 uppercase">
          Trending Collections
        </p>
        <span className="h-1 w-1 rounded-full bg-blue-600" />
      </div>

      {/* Bold Retail Headline Style */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 max-w-3xl mx-auto uppercase">
        Backpacks — Your Everyday Essential
      </h2>

      {/* Skybags-Inspired Tab Selector Track */}
      <div className="mt-10 flex items-center justify-center gap-6 md:gap-10 border-b border-zinc-100 max-w-lg mx-auto">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`pb-3 text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-200 relative cursor-pointer ${
              activeTab === item
                ? "text-blue-600"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}
            {/* Smooth Brand Underline Indicator */}
            <span 
              className={`absolute bottom-0 left-0 h-[3px] bg-blue-600 transition-all duration-200 ease-out ${
                activeTab === item ? "w-full opacity-100" : "w-0 opacity-0"
              }`} 
            />
          </button>
        ))}
      </div>

      {/* Product Display Matrix Grid */}
      <div 
        key={activeTab} // Enforces native CSS remount transitions per view change
        className="mt-12 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-[fadeSlide_0.4s_ease-out_both]"
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />

        {products[activeTab].map((product) => (
          <ProductCard
            key={product.name}
            image={product.image}
            name={product.name}
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
            volume={product.volume}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
  
  <button className="cursor-pointer border border-black px-8 py-3 text-sm font-semibold tracking-wide bg-black text-white text-black transition-all duration-300 hover:bg-white hover:text-black">
    View all
  </button>

</div>

    </section>
  );
};

export default BackpackSection;