import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { getProducts } from "../../api/productApi";

const categories = [
  "GIRL POWER",
  "ANIME",
  "GAMES",
];

const categoryMap = {
  "GIRL POWER": "girl-power",
  ANIME: "anime",
  GAMES: "games",
};

const SchoolSection = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("GIRL POWER");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const scrollContainerRef =
    useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await getProducts();

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    products.filter(
      (product) =>
        product.category ===
        categoryMap[activeTab]
    );
    

  const handleScroll = (
    direction
  ) => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        direction === "left"
          ? -400
          : 400;

      scrollContainerRef.current.scrollBy(
        {
          left: scrollAmount,
          behavior: "smooth",
        }
      );
    }
  };

  const handleOpenProduct = (
    slug
  ) => {
    navigate(`/product/${slug}`);
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-zinc-500">
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden bg-[#f5f5f5] px-4 py-20 select-none sm:py-24 md:px-12">

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-zinc-300 pb-8 md:flex-row md:items-end">

        <div>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            CAMPUS EDIT
          </h2>

          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            The curated portfolio // Scroll to inspect the gear
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">

          {/* Tabs */}
          <div className="flex rounded-xl bg-zinc-200 p-1">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setActiveTab(item)
                }
                className={`cursor-pointer rounded-lg px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  activeTab === item
                    ? "bg-zinc-950 text-white shadow-md"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* Arrows */}
          <div className="hidden items-center gap-1.5 sm:flex">

            <button
              onClick={() =>
                handleScroll("left")
              }
              className="cursor-pointer rounded-xl border border-zinc-300 bg-white p-3 transition-all hover:bg-zinc-950 hover:text-white active:scale-95"
            >
              ←
            </button>

            <button
              onClick={() =>
                handleScroll("right")
              }
              className="cursor-pointer rounded-xl border border-zinc-300 bg-white p-3 transition-all hover:bg-zinc-950 hover:text-white active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div
        ref={scrollContainerRef}
        key={activeTab}
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pr-4 sm:gap-6 md:pr-12 animate-[slideIn_0.4s_ease-out_both]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateX(30px);
                }

                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `,
          }}
        />

        {filteredProducts.length >
        0 ? (
          filteredProducts.map(
            (product) => {
              const discountPercent =
                product.originalPrice
                  ? Math.round(
                      ((product.originalPrice -
                        product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={product._id}
                  onClick={() =>
                    handleOpenProduct(
                      product.slug
                    )
                  }
                  className="group relative w-[240px] flex-shrink-0 cursor-pointer snap-start rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-950 hover:shadow-xl sm:w-[280px] md:w-[320px]"
                >

                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-100">

                    <img
                      src={
  product.image ||
  product.images?.[0]?.url ||
  product.images?.[0]
}
                      alt={
                        product.title
                      }
                      className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {discountPercent >
                      0 && (
                      <div className="absolute right-3 top-3 rounded bg-zinc-950 px-2 py-0.5 font-mono text-[10px] font-black text-white">
                        -
                        {
                          discountPercent
                        }
                        %
                      </div>
                    )}

                  </div>

                  {/* Content */}
                  <div className="mt-4 flex flex-col text-left">

                    <div className="flex items-baseline justify-between gap-2">

                      <h3 className="line-clamp-1 text-base font-black uppercase tracking-tight text-zinc-950">
                        {
                          product.title
                        }
                      </h3>

                      <span className="text-base font-black text-zinc-950">
                        ₹
                        {product.price?.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                      {
                        product.description
                      }
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-dashed border-zinc-200 pt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">

                      <span>
                        Equip Series
                      </span>

                      {product.originalPrice && (
                        <span className="font-medium line-through">
                          ₹
                          {product.originalPrice?.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                    </div>

                    <button
                      type="button"
                      className="mt-4 w-full cursor-pointer rounded-xl bg-zinc-950 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-zinc-900"
                    >
                      View Product
                    </button>

                  </div>

                </div>
              );
            }
          )
        ) : (
          <div className="flex h-60 w-full items-center justify-center text-zinc-500">
            No products found in this category.
          </div>
        )}

        {/* End Card */}
        <div className="flex w-[240px] flex-shrink-0 snap-start flex-col justify-between rounded-2xl border border-zinc-950 bg-zinc-950 p-6 text-left text-white sm:w-[260px]">

          <div>

            <div className="mt-4 text-[28px] font-black uppercase italic leading-none tracking-tighter">
              END OF <br />
              THIS LINE.
            </div>

            <p className="mt-2 text-xs font-medium text-zinc-400">
              Discover the full scope of our creative gear drops.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/shop")
            }
            className="w-full cursor-pointer rounded-xl bg-white py-3.5 text-xs font-black uppercase tracking-widest text-zinc-950 transition-transform active:scale-95"
          >
            View Archive →
          </button>

        </div>

      </div>
    </section>
  );
};

export default SchoolSection;