import React, { memo, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InfluencerCard = ({ product }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = async () => {
    setIsPlaying(true);
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.log("Video playback interrupted:", error);
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.article
      // 🛠️ Changed flex-shrink-0 to shrink-0 for Tailwind v4 compatibility
      className="group relative w-[220px] md:w-[260px] shrink-0 overflow-hidden rounded-3xl bg-zinc-950 cursor-pointer border border-zinc-900/40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Aspect Container */}
      <div className="relative aspect-[9/16] overflow-hidden">
        
        {/* Core Video Component */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        >
          <source src={product.video} type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays (Using explicit v4 colors) */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        {/* 🪄 Play/Pause Overlay Indicator */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-md">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Play size={14} className="fill-white text-white translate-x-[0.5px]" />
              </motion.div>
            ) : (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Pause size={14} className="fill-white text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interface Content Block Container */}
        <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col items-start z-10 text-left">
          
          <span className="mb-2.5 inline-block rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-200 backdrop-blur-md border border-white/5">
            Trending
          </span>

          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white tracking-tight md:text-base">
            {product.title}
          </h3>

          {/* 🏎️ View Product Reveal Interaction */}
          <div className="w-full overflow-hidden mt-4">
            <motion.button
              type="button"
              className="w-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-3 rounded-xl tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              initial={{ opacity: 0, y: 12 }}
              animate={isPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <span>View Product</span>
              <span className="text-[10px]">→</span>
            </motion.button>
          </div>

        </div>
      </div>
    </motion.article>
  );
};

export default memo(InfluencerCard);