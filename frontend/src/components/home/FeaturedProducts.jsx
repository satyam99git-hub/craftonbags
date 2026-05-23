import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import productsData from "../../data/product";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] =
    useState({});

  const [offset, setOffset] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const trackRef = useRef(null);

  const featuredProducts =
    productsData.filter(
      (product) => product.featured
    );

  const loopProducts = [
    ...featuredProducts,
    ...featuredProducts,
    ...featuredProducts,
  ];

  const toggleWishlist = (
    id,
    e
  ) => {
    e.stopPropagation();

    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isPaused && trackRef.current) {
        setOffset((prev) => {
          const maxScroll =
            trackRef.current.scrollWidth /
            3;

          const next = prev + 0.7;

          return next >= maxScroll
            ? 0
            : next;
        });
      }

      animationFrameId =
        requestAnimationFrame(animate);
    };

    animationFrameId =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(
        animationFrameId
      );
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-stone-50 py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Header */}
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-700">
              Curated Collection
            </p>

            <h2 className="mt-4 text-4xl font-black text-zinc-950">
              Featured Products
            </h2>
          </div>

          <button
            onClick={() =>
              navigate("/shop")
            }
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
                    navigate(
                      `/product/${product.slug}`
                    )
                  }
                  className="group relative flex w-[320px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <button
                      onClick={(e) =>
                        toggleWishlist(
                          product.id,
                          e
                        )
                      }
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist[
                            product.id
                          ]
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                    </button>

                  </div>

                  <div className="p-5">

                    <span className="text-xs uppercase text-zinc-400">
                      {product.category}
                    </span>

                    <h3 className="mt-2 text-lg font-black">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <span className="text-xl font-black">
                          ₹{product.price}
                        </span>

                        <span className="ml-2 text-sm line-through text-zinc-400">
                          ₹
                          {
                            product.originalPrice
                          }
                        </span>

                      </div>

                      <div className="flex items-center gap-1">

                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />

                        <span className="text-sm font-bold">
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