import React from "react";

const ProductCard = ({ image, name, oldPrice, newPrice, volume = "28L" }) => {
  const numOld = parseInt(oldPrice.replace(/,/g, ""), 10);
  const numNew = parseInt(newPrice.replace(/,/g, ""), 10);
  const discountPercent = Math.round(((numOld - numNew) / numOld) * 100);

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-zinc-100 transition-all duration-300 hover:shadow-lg">
      
      {/* 🎒 Top Image Workspace Frame */}
      <div className="relative w-full aspect-square bg-zinc-50 overflow-hidden select-none">
        
        {/* Focused & Immersive Product Image Asset */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Lit Volume Badge Floating Layer */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-zinc-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-xs border border-zinc-200/40 z-10">
          {volume}
        </div>

        {/* ⚡ Desktop Hover Action: Quick Shop Slide Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3 hidden md:block bg-gradient-to-t from-black/20 via-black/5 to-transparent z-10">
          <button
            type="button"
            className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs tracking-wider uppercase py-2.5 rounded shadow-md transition-colors duration-200 cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 📝 Metadata & Pricing Grid Area */}
      <div className="p-4 flex flex-col flex-grow text-left bg-white z-20">
        
        {/* Title Track */}
        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors duration-150">
          {name}
        </h3>

        {/* Sub-label description */}
        <p className="text-xs text-zinc-400 font-medium mt-0.5 line-clamp-1">
          Explore Our Collection of Luggage & Backpacks
        </p>

        {/* Price Area Block */}
        <div className="mt-3.5 flex items-baseline gap-2 flex-wrap">
          
          <span className="text-base font-black text-zinc-950">
            ₹{newPrice}
          </span>
          
          {discountPercent > 0 && (
            <>
              <span className="text-xs text-zinc-400 line-through font-medium">
                ₹{oldPrice}
              </span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                {discountPercent}% off
              </span>
            </>
          )}

        </div>

        {/* 📱 Mobile Fallback Trigger button */}
        <div className="mt-4 block md:hidden">
          <button
            type="button"
            className="w-full bg-zinc-900 text-white text-xs font-bold py-2.5 rounded uppercase active:scale-[0.98] transition-transform"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;