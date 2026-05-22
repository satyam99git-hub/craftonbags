import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import InfluencerCard from "./InfluencerCard";
import { influencerProducts } from "./influencer.data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  },
};

const InfluencerSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; 
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#f5f5f5] py-24 w-full block">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">

        {/* Header Block Container */}
        <div className="mb-14 flex flex-col gap-6 border-b border-zinc-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          
          {/* Typography */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400">
              The Sartorial Feed // Live Drops
            </span>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-6xl italic leading-none">
              CAMPUS INFLUENCE
            </h2>
          </div>

          {/* 🛠️ Fixed Tailwind v4 Button Container Area */}
         <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            
            {/* Left Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95 shrink-0"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95 shrink-0"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            {/* View All Button */}
            <button 
              type="button"
              className="ml-2 rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-950 hover:text-white cursor-pointer shrink-0"
            >
              Explore All
            </button>

          </div>
        </div>

        {/* Slider Track Wrapper */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            // 🛠️ Using your native global .hide-scrollbar class here
            className="hide-scrollbar flex w-full gap-5 overflow-x-auto pb-4 scroll-smooth select-none"
          >
            {influencerProducts.map((product) => (
              <motion.div key={product.id} variants={cardVariants} className="shrink-0">
                <InfluencerCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default InfluencerSection;