import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import { getProducts } from "../features/products/productApi";

const CategoryShop = () => {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] =
    useState(false);
  const [sortBy, setSortBy] =
    useState("featured");

  const formattedTitle = categorySlug
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts({
          category: categorySlug,
        });

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug]);

  const filteredAndSortedProducts =
    useMemo(() => {
      let result = [...products];

      if (searchQuery.trim()) {
        result = result.filter((product) =>
          product.title
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            )
        );
      }

      result = result.filter(
        (product) =>
          product.price <= maxPrice
      );

      if (inStockOnly) {
        result = result.filter(
          (product) => product.stock > 0
        );
      }

      if (sortBy === "low-to-high") {
        result.sort(
          (a, b) => a.price - b.price
        );
      } else if (
        sortBy === "high-to-low"
      ) {
        result.sort(
          (a, b) => b.price - a.price
        );
      } else if (sortBy === "rating") {
        result.sort(
          (a, b) =>
            b.ratingsAverage -
            a.ratingsAverage
        );
      }

      return result;
    }, [
      products,
      searchQuery,
      maxPrice,
      inStockOnly,
      sortBy,
    ]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900">

      {/* HERO */}
      <section className="bg-zinc-100 border-b border-zinc-200 relative overflow-hidden">
        <div className="max-w-[95%] xl:max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 sm:px-6 lg:px-8">

          <div className="md:col-span-6 space-y-4 py-12 md:py-20">
            <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
              <Link to="/">
                Home
              </Link>

              <span>/</span>

              <span className="text-zinc-900">
                {formattedTitle}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
              {formattedTitle}
            </h1>

            <p className="text-zinc-500">
              Discover premium products
              crafted for modern
              travelers.
            </p>
          </div>

          <div className="hidden md:block md:col-span-6">
            <img
              src="https://cdn.shopify.com/s/files/1/0872/4604/5498/files/TOP_LUXURY_HANDBAG_BRANDS_Page_2.jpg?v=1732888664"
              alt="Collection"
              className="w-full h-full object-cover rounded-3xl p-4"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-[95%] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FILTERS */}
        <aside className="lg:col-span-3 space-y-8 bg-white border border-zinc-200 p-6 rounded-3xl">

          <div>
            <label className="text-xs font-bold">
              Search
            </label>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder="Search products..."
              className="w-full mt-2 border rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>
                Max Price
              </span>

              <span>
                ₹{maxPrice}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">
              In Stock Only
            </span>

            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() =>
                setInStockOnly(
                  !inStockOnly
                )
              }
            />
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-9">

          <div className="flex justify-between items-center mb-6 bg-white border rounded-2xl px-6 py-4">

            <span>
              Showing{" "}
              {
                filteredAndSortedProducts.length
              }{" "}
              products
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="border rounded-xl px-3 py-2"
            >
              <option value="featured">
                Featured
              </option>

              <option value="low-to-high">
                Price Low → High
              </option>

              <option value="high-to-low">
                Price High → Low
              </option>

              <option value="rating">
                Top Rated
              </option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              Loading Products...
            </div>
          ) : filteredAndSortedProducts.length ===
            0 ? (
            <div className="text-center py-20">
              No Products Found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredAndSortedProducts.map(
                (item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
                  >
                    <div className="aspect-[4/5] overflow-hidden">

                      <img
                        src={
                          item.images?.[0]
                            ?.url ||
                          "/placeholder.jpg"
                        }
                        alt={
                          item.title
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">

                      <h3 className="font-bold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                        {
                          item.description
                        }
                      </p>

                      <div className="flex items-center justify-between mt-4">

                        <span className="font-black text-xl">
                          ₹
                          {item.price}
                        </span>

                        <span className="text-amber-500 font-bold">
                          ★{" "}
                          {
                            item.ratingsAverage
                          }
                        </span>
                      </div>

                      <Link
                        to={`/product/${item.slug}`}
                        className="block text-center mt-4 bg-zinc-900 text-white py-2 rounded-xl"
                      >
                        View Product
                      </Link>

                    </div>
                  </div>
                )
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryShop;