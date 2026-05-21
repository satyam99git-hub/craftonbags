import React, { useState } from "react";

const categories = [
  "HARD LUGGAGE",
  "SOFT LUGGAGE",
  "TRAVEL SETS",
];

const products = {
  "HARD LUGGAGE": [
    { name: "AERO SPINNER", oldPrice: "8,999", newPrice: "6,499", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop" },
    { name: "SKY ELITE", oldPrice: "9,500", newPrice: "7,299", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" },
    { name: "TITAN MOVE", oldPrice: "10,999", newPrice: "8,199", image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop" },
    { name: "VOYAGER PRO", oldPrice: "12,000", newPrice: "9,499", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
  ],
  "SOFT LUGGAGE": [
    { name: "URBAN FLEX", oldPrice: "6,999", newPrice: "5,299", image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200&auto=format&fit=crop" },
  ],
  "TRAVEL SETS": [
    { name: "TRAVEL MASTER", oldPrice: "15,999", newPrice: "12,499", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop" },
  ],
};

const LuggageSection = () => {
  const [activeTab, setActiveTab] = useState("HARD LUGGAGE");

  return (
    <section className="bg-[#f5f5f5] px-4 py-20 md:px-8 lg:px-16 max-w-7xl mx-auto rounded-3xl my-6">
      
      {/* Mini Title Descriptor */}
      <div className="flex flex-col items-center justify-center text-center mb-3">
        <span className="text-[11px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
          The Travel Edit
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase mt-2">
          MOVE WITH STYLE
        </h2>
      </div>

      {/* Clean Tab Bar Switcher */}
      <div className="mt-10 flex items-center justify-center gap-8 border-b border-zinc-200 max-w-md mx-auto relative">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`pb-3 text-xs md:text-sm font-bold tracking-wider uppercase transition-colors duration-200 relative cursor-pointer ${
              activeTab === item ? "text-black" : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}
            
            {/* 🏎️ Smart Layout Underline Animation */}
            {activeTab === item && (
              <span 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black z-10"
              />
            )}
          </button>
        ))}
      </div>

      {/* Product Display Grid (Wrapped with AnimatePresence for smooth entry/exit) */}
      <div className="mt-14 min-h-[460px]">
        <div
            key={activeTab}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-[fadeLift_0.3s_ease-out_both]"
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes fadeLift {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}} />

            {products[activeTab].map((product) => {
              const numOld = parseInt(product.oldPrice.replace(/,/g, ""), 10);
              const numNew = parseInt(product.newPrice.replace(/,/g, ""), 10);
              const discountPercent = Math.round(((numOld - numNew) / numOld) * 100);

              return (
                <div 
                  key={product.name} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-100 transition-shadow duration-300 hover:shadow-lg"
                >
                  
                  {/* Product Card Image Frame */}
                  <div className="w-full aspect-[4/5] bg-zinc-50 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                    
                    {/* Simple percentage badge */}
                    {discountPercent > 0 && (
                      <span className="absolute top-3 right-3 bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Information / Pricing Details Content Block */}
                  <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-black text-zinc-950">
                          ₹{product.newPrice}
                        </span>
                        <span className="text-xs text-zinc-400 line-through font-medium">
                          ₹{product.oldPrice}
                        </span>
                      </div>
                    </div>

                    {/* Straightforward Button */}
                    <button
                      type="button"
                      className="mt-5 w-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      View Product
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
      </div>

    </section>
  );
};

export default LuggageSection;
