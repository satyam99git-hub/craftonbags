import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import product from "../../data/product";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState({});
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);

  // Featured products only
  const featuredProducts = product.productsFeatured.filter(
    (product) => product.featured
  );

  // Infinite loop products
  const loopProducts = [
    ...featuredProducts,
    ...featuredProducts,
    ...featuredProducts,
  ];

  // Wishlist Toggle
  const toggleWishlist = (id, e) => {
    e.stopPropagation();

    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Auto Infinite Scroll
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isPaused && trackRef.current) {
        setOffset((prev) => {
          const maxScroll =
            trackRef.current.scrollWidth / 3;

          const next = prev + 0.7;

          return next >= maxScroll ? 0 : next;
        });
      }

      animationFrameId =
        requestAnimationFrame(animate);
    };

    animationFrameId =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Product Open
  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="relative overflow-hidden bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          
          <div>
            <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.3em] text-amber-700">
              Curated Collection
            </span>

            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Featured Products
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
              Explore our premium handcrafted bags
              designed for professionals, travelers,
              and modern lifestyles.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            className="group flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            View All
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          {/* Gradient Mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-stone-50 to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-stone-50 to-transparent" />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex w-max gap-6"
            style={{
              transform: `translateX(-${offset}px)`,
            }}
          >
            {loopProducts.map(
              (product, index) => (
                <article
                  key={`${product.id}-${index}`}
                  onClick={() =>
                    handleOpenProduct(product.id)
                  }
                  className="group relative flex w-[250px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:w-[280px] md:w-[320px]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    
                    {/* Tag */}
                    {product.tag && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={(e) =>
                        toggleWishlist(
                          product.id,
                          e
                        )
                      }
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md backdrop-blur-md transition-all duration-300 hover:text-rose-500"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist[
                            product.id
                          ]
                            ? "fill-rose-500 text-rose-500"
                            : ""
                        }
                      />
                    </button>

                    {/* Product Image */}
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3 text-xs font-bold uppercase tracking-wider text-white"
                      >
                        <ShoppingBag size={14} />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    
                    {/* Category */}
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-zinc-950 transition-colors duration-300 group-hover:text-amber-700">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                      {product.description}
                    </p>

                    {/* Bottom */}
                    <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                      
                      {/* Price */}
                      <div>
                        <div className="flex items-center gap-2">
                          
                          <span className="text-lg font-black text-zinc-950">
                            ₹
                            {product.price.toLocaleString()}
                          </span>

                          {product.originalPrice && (
                            <span className="text-sm text-zinc-400 line-through">
                              ₹
                              {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                        <Star
                          size={13}
                          className="fill-amber-400 text-amber-400"
                        />

                        <span className="text-xs font-bold text-zinc-800">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;