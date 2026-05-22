import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import InfluencerCard from "./InfluencerCard";
import { influencerProducts } from "./influencer.data";

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 150, damping: 20 } 
  },
};

const InfluencerSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340; 
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5f5f5] py-24 w-full block relative isolation-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16 relative z-10">

        {/* Header Block Container */}
        <div className="mb-14 flex flex-col gap-6 border-b border-zinc-200 pb-8 sm:flex-row sm:items-end sm:justify-between relative z-20">
          
          {/* Typography */}
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 block">
              The Sartorial Feed // Live Drops
            </span>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl italic leading-none break-words">
              CAMPUS INFLUENCE
            </h2>
          </div>

          {/* 🛠️ Visual Fix: Forced Stacking Context & Flex-wrap Protection */}
          <div className="flex flex-row items-center gap-3 shrink-0 relative z-30 sm:justify-end">
            
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95 shrink-0 shadow-sm"
              style={{ zIndex: 40 }}
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95 shrink-0 shadow-sm"
              style={{ zIndex: 40 }}
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            {/* View All Button */}
            <button 
              type="button"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer shrink-0 shadow-sm"
              style={{ zIndex: 40 }}
            >
              Explore All
            </button>

          </div>
        </div>

        {/* Slider Track Wrapper */}
        <div className="relative w-full overflow-hidden z-10">
          <div
            ref={scrollRef}
            className="hide-scrollbar flex w-full gap-5 overflow-x-auto pb-4 scroll-smooth select-none"
          >
            {influencerProducts.map((product) => (
              <motion.div 
                key={product.id} 
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="shrink-0"
              >
                <InfluencerCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfluencerSection;