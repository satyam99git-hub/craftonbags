import React, { useState } from "react";

const categories = [
  "HARD LUGGAGE",
  "SOFT LUGGAGE",
  "TRAVEL SETS",
];

const products = {
  "HARD LUGGAGE": [
    {
      name: "AERO SPINNER",
      oldPrice: "8,999",
      newPrice: "6,499",
      image:
        "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "SKY ELITE",
      oldPrice: "9,500",
      newPrice: "7,299",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "TITAN MOVE",
      oldPrice: "10,999",
      newPrice: "8,199",
      image:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "VOYAGER PRO",
      oldPrice: "12,000",
      newPrice: "9,499",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  "SOFT LUGGAGE": [
    {
      name: "URBAN FLEX",
      oldPrice: "6,999",
      newPrice: "5,299",
      image:
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  "TRAVEL SETS": [
    {
      name: "TRAVEL MASTER",
      oldPrice: "15,999",
      newPrice: "12,499",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

const LuggageSection = () => {
  const [activeTab, setActiveTab] = useState("HARD LUGGAGE");

  return (
    <section className="mx-auto my-6 max-w-7xl rounded-3xl bg-[#f5f5f5] px-4 py-20 md:px-8 lg:px-16">
      <div className="mb-3 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          The Travel Edit
        </span>
        <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
          MOVE WITH STYLE
        </h2>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-md items-center justify-center gap-8 border-b border-zinc-200">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setActiveTab(item)}
            className={`relative cursor-pointer pb-3 text-xs font-bold uppercase tracking-wider transition-colors duration-200 md:text-sm ${
              activeTab === item
                ? "text-black"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {item}

            {activeTab === item && (
              <span className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-black" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-14 min-h-[460px]">
        <div
          key={activeTab}
          className="grid grid-cols-1 gap-6 animate-[fadeLift_0.3s_ease-out_both] sm:grid-cols-2 lg:grid-cols-4"
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeLift {
                  from { opacity: 0; transform: translateY(15px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `,
            }}
          />

          {products[activeTab].map((product) => {
            const numOld = parseInt(product.oldPrice.replace(/,/g, ""), 10);
            const numNew = parseInt(product.newPrice.replace(/,/g, ""), 10);
            const discountPercent = Math.round(
              ((numOld - numNew) / numOld) * 100
            );

            return (
              <div
                key={product.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />

                  {discountPercent > 0 && (
                    <span className="absolute right-3 top-3 rounded bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <div className="flex flex-grow flex-col justify-between bg-white p-5">
                  <div>
                    <h3 className="line-clamp-1 text-base font-bold uppercase tracking-tight text-zinc-900">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-black text-zinc-950">
                        &#8377;{product.newPrice}
                      </span>
                      <span className="text-xs font-medium text-zinc-400 line-through">
                        &#8377;{product.oldPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full cursor-pointer rounded-xl bg-zinc-950 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
                  >
                    View Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LuggageSection;
