import React, { useState, useEffect, useRef } from 'react'
import { Heart, ShoppingBag, Star } from 'lucide-react'

const products = [
  {
    id: 1,
    name: "The Premium Commuter Backpack",
    category: "Backpacks",
    price: 129.00,
    rating: 4.9,
    reviews: 124,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Weekender Aviator Duffel Bag",
    category: "Travel Bags",
    price: 185.00,
    rating: 4.8,
    reviews: 92,
    tag: "New",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Classic Over-the-Shoulder Tote",
    category: "Totes",
    price: 145.00,
    rating: 5.0,
    reviews: 67,
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    name: "Minimalist City Crossbody Pack",
    category: "Travel Bags",
    price: 78.00,
    rating: 4.7,
    reviews: 43,
    tag: null,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80"
  }
]

// Duplicate products to allow a continuous loop appearance
const loopProducts = [...products, ...products, ...products];

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState({})
  const [offset, setOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef(null)

  const toggleWishlist = (id, e) => {
    e.stopPropagation()
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Pure JavaScript loop logic running on animation frames
  useEffect(() => {
    let animationFrameId;

    const updateLoop = () => {
      if (!isPaused && trackRef.current) {
        setOffset((prevOffset) => {
          const maxScroll = trackRef.current.scrollWidth / 3; // Calculate base size boundary
          const nextOffset = prevOffset + 1; // Animation speed multiplier
          return nextOffset >= maxScroll ? 0 : nextOffset;
        });
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="w-full bg-stone-50 py-16 overflow-hidden select-none">
      
      {/* Title Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
          Curated Collection
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-950">
          Featured Products
        </h2>
      </div>

      {/* Primary Mask Outer Box */}
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge-gradient masks to visually fade card entries */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-stone-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-stone-50 to-transparent z-20 pointer-events-none" />

        {/* X-Axis Motion Ribbon Track */}
        <div 
          ref={trackRef}
          className="flex gap-6 flex-nowrap w-max"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {loopProducts.map((product, index) => (
            <article 
              key={`${product.id}-${index}`} 
              className="relative flex flex-col flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
            >
              
              {/* IMAGE FRAME (Enforced 16:9 Ratio Aspect Card Block) */}
              <div className="relative aspect-[16/9] w-full bg-zinc-200 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 group">
                
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Button */}
                <button 
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white text-zinc-600 hover:text-rose-600 shadow-sm active:scale-90 transition-all duration-200 cursor-pointer"
                  type="button"
                >
                  <Heart 
                    size={15} 
                    strokeWidth={2.5} 
                    className={wishlist[product.id] ? "fill-rose-500 text-rose-500" : ""}
                  />
                </button>

                {/* Image */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Hover Add Button */}
                <div className="absolute inset-x-3 bottom-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex gap-2 z-10">
                  <button className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer">
                    <ShoppingBag size={13} />
                    Quick Add
                  </button>
                </div>

              </div>

              {/* Data Meta Details */}
              <div className="mt-4 flex flex-col flex-1 px-1">
                <span className="text-xs text-zinc-400 font-medium tracking-wide">
                  {product.category}
                </span>
                
                <h3 className="mt-1 font-semibold text-sm md:text-base text-zinc-900 truncate pr-4 cursor-pointer">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-2 border-t border-zinc-100 pt-2.5">
                  <span className="font-bold text-sm text-zinc-950">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-zinc-800">{product.rating}</span>
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  )
}

export default FeaturedProducts