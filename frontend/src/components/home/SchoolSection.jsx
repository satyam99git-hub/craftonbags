import React, { useState, useRef } from "react";

const categories = ["GIRL POWER", "ANIME", "GAMES"];

const products = {
  "GIRL POWER": [
    { name: "CELESTE BLUE", oldPrice: "3,625", newPrice: "2,205", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop", count: "DROP [01/04]" },
    { name: "BLISS ORANGE", oldPrice: "2,400", newPrice: "1,259", image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200&auto=format&fit=crop", count: "DROP [02/04]" },
    { name: "BLISS DARK GREEN", oldPrice: "2,400", newPrice: "1,259", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", count: "DROP [03/04]" },
    { name: "BLISS ORANGE GREEN", oldPrice: "2,400", newPrice: "1,259", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop", count: "DROP [04/04]" },
  ],
  ANIME: [
    { name: "NARUTO PACK", oldPrice: "3,000", newPrice: "2,299", image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop", count: "LIMITED [01/01]" },
  ],
  GAMES: [
    { name: "GAMER PRO", oldPrice: "4,000", newPrice: "2,999", image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=1200&auto=format&fit=crop", count: "EDITION [01/01]" },
  ],
};

const SchoolSection = () => {
  const [activeTab, setActiveTab] = useState("GIRL POWER");
  const scrollContainerRef = useRef(null);

  // Quick navigation controls for the runway track
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#f5f5f5] py-20 sm:py-24 pl-4 pr-4 md:pl-12 md:pr-0 max-w-7xl mx-auto overflow-hidden relative select-none">
      
      {/* ⚡ Structural Column Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pr-4 md:pr-12 border-b border-zinc-300 pb-8 gap-6">
  <div>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-zinc-950 uppercase leading-none">
      CAMPUS EDIT
    </h2>
    <p className="text-xs font-bold text-zinc-400 mt-2 tracking-[0.2em] uppercase">
      The curated portfolio // Scroll to inspect the gear
    </p>
  </div>

        {/* Minimal Stepper Buttons & Category Core */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex bg-zinc-200 p-1 rounded-xl">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-4 py-2 text-[11px] font-black tracking-wider uppercase transition-all duration-200 rounded-lg cursor-pointer ${
                  activeTab === item ? "bg-zinc-950 text-white shadow-md" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Precision Navigation Arrows (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button 
              onClick={() => handleScroll("left")}
              className="p-3 bg-white border border-zinc-300 hover:bg-zinc-950 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
            >
              ←
            </button>
            <button 
              onClick={() => handleScroll("right")}
              className="p-3 bg-white border border-zinc-300 hover:bg-zinc-950 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 🎒 Horizontal Runway Container */}
      <div 
        ref={scrollContainerRef}
        key={activeTab}
        className="mt-12 flex gap-4 sm:gap-6 overflow-x-auto pb-8 pr-4 md:pr-12 scrollbar-none snap-x snap-mandatory animate-[slideIn_0.4s_ease-out_both]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}} />

        {products[activeTab].map((product) => {
          const numOld = parseInt(product.oldPrice.replace(/,/g, ""), 10);
          const numNew = parseInt(product.newPrice.replace(/,/g, ""), 10);
          const discountPercent = Math.round(((numOld - numNew) / numOld) * 100);

          return (
            <div 
              key={product.name} 
              className="w-[240px] sm:w-[280px] md:w-[320px] flex-shrink-0 snap-start group relative bg-white border border-zinc-200 p-4 rounded-2xl transition-all duration-300 hover:border-zinc-950 hover:shadow-xl"
            >
              
              {/* Product Media Asset Framer */}
              <div className="relative w-full aspect-[3/4] bg-zinc-100 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Index Stamp Label */}
                <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-xs text-white text-[9px] font-mono font-bold tracking-widest px-2 py-1 rounded">
                  {product.count}
                </div>

                {/* Floating Percentage Tag */}
                {discountPercent > 0 && (
                  <div className="absolute top-3 right-3 bg-zinc-950 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded">
                    -{discountPercent}%
                  </div>
                )}
              </div>

              {/* Text / Data Interface Area */}
              <div className="mt-4 flex flex-col text-left">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-base font-black text-zinc-950 uppercase tracking-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-base font-black text-zinc-950">
                    ₹{product.newPrice}
                  </span>
                </div>

                {/* Footnotes Area */}
                <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 flex justify-between items-center text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <span>Equip Series</span>
                  {discountPercent > 0 && (
                    <span className="line-through font-medium">₹{product.oldPrice}</span>
                  )}
                </div>

                {/* Full-width Direct Action Trigger */}
                <button
                  type="button"
                  className="mt-4 w-full bg-zinc-950 hover:bg-zinc-900 text-white text-xs font-black py-3 rounded-xl uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Grab Item +
                </button>
              </div>

            </div>
          );
        })}

        {/* End of Lineup Dynamic Promo Card */}
        <div className="w-[240px] sm:w-[260px] flex-shrink-0 snap-start bg-zinc-950 text-white rounded-2xl p-6 flex flex-col justify-between text-left border border-zinc-950">
          <div>
            <div className="text-[28px] font-black tracking-tighter uppercase italic leading-none mt-4">
              END OF <br />THIS LINE.
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-medium">
              Discover the full scope of our creative gear drops.
            </p>
          </div>

          <button className="w-full bg-white text-zinc-950 font-black text-xs tracking-widest uppercase py-3.5 rounded-xl transition-transform active:scale-95 cursor-pointer">
            View Archive →
          </button>
        </div>
      </div>

    </section>
  );
};

export default SchoolSection;
