import React from "react";
import { ArrowRight, Compass, ChevronDown } from "lucide-react";

const CollectionHero = () => {
  return (
    <section className="relative h-[500px] sm:h-[560px] md:h-[640px] w-full overflow-hidden bg-zinc-950 group">
      
      {/* Dynamic Injecting Keyframes for Custom Spin Rotation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slowSpin 12s linear infinite;
        }
      `}} />

      {/* 🎒 Premium Leather Bag Asset Background */}
      <img
        src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1800&auto=format&fit=crop"
        alt="Premium Leather Duffle Collection Banner"
        className="h-full w-full object-cover object-center 
        transition-transform duration-[8s] ease-out scale-100 group-hover:scale-103"
        loading="eager"
      />

      {/* Multi-layered Contrast Vignette Filters */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-900/30 to-zinc-950/85 z-10" />
      <div className="absolute inset-0 bg-black/20 z-10 backdrop-brightness-[0.85] backdrop-contrast-[1.05]" />

      {/* Main Alignment Plane */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-20">
        
        {/* Tagline Badge */}
        <div className="flex items-center gap-2 mb-5">
          <Compass size={15} className="text-amber-500 animate-slow-spin" />
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-amber-400 drop-shadow-sm">
            Bespoke Leatherware
          </p>
        </div>

        {/* High-Impact E-com Typography Header */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl text-balance drop-shadow-md select-none">
          Engineered For <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-white via-stone-200 to-zinc-400 bg-clip-text text-transparent">
            The Global Nomad
          </span>
        </h1>

        {/* Catchy Product Copy */}
        <p className="mt-4 sm:mt-6 max-w-xl md:max-w-2xl text-xs sm:text-sm md:text-base font-medium text-zinc-300/90 leading-relaxed tracking-wide text-balance">
          Discover timeless silhouettes handcrafted with full-grain Italian leathers, weather-resistant structural armor, and integrated dynamic utility compartments.
        </p>

        {/* Action Button Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          
          <button 
            type="button" 
            className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-xl hover:shadow-white/5 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer group/btn"
          >
            Shop The Release
            <ArrowRight size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          <button 
            type="button" 
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-full border border-white/20 hover:border-white transition-all duration-300 ease-out cursor-pointer"
          >
            Explore Lookbook
          </button>

        </div>
      </div>

      {/* Decorative Floating Scroll-Down Micro-Interaction */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-60 animate-bounce select-none">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Scroll</span>
        <ChevronDown size={14} className="text-zinc-400" />
      </div>

      {/* Structural Hairline Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200/15 to-transparent z-20" />
      
    </section>
  );
};

export default CollectionHero;