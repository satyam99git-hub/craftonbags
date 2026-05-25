import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Share2,
} from "lucide-react";

import { fetchProductByIdOrSlug } from "../features/products/productAPI";

import {
  useWishlist,
} from "../context/WishlistContext";

import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const { isAuthenticated } =
    useAuth();

  const [product, setProduct] =
    useState(null);

  const [activeImage, setActiveImage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  // Load Product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const data =
          await fetchProductByIdOrSlug(
            slug
          );

        if (data) {
          setProduct(data);

          setActiveImage(
            data.image ||
              data.images?.[0]
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />

          <p className="mt-5 text-sm font-medium text-zinc-500">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
        <h2 className="text-3xl font-black text-zinc-900">
          Product Not Found
        </h2>

        <button
          onClick={() => navigate("/")}
          className="rounded-2xl bg-black px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Images
  const allImages = [
    product.image,
    ...(product.images || []),
  ].filter(Boolean);

  // Discount
  const discount =
    product.originalPrice
      ? Math.round(
          ((product.originalPrice -
            product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  // Add To Cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert(
        "Please login first to add products to cart."
      );

      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingProduct =
      cart.find(
        (item) =>
          item.slug === product.slug
      );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.slug === product.slug
          ? {
              ...item,
              quantity:
                item.quantity +
                quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Added To Cart");
  };

  // Wishlist
  const handleWishlist = () => {
    if (!isAuthenticated) {
      alert(
        "Please login first to use wishlist."
      );

      return;
    }

    toggleWishlist(product);
  };

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-semibold text-zinc-500 transition hover:text-black"
        >
          ← Back
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            {/* Main Image */}
            <div className="overflow-hidden rounded-3xl bg-zinc-100">
              <img
                src={activeImage}
                alt={product.title}
                className="h-[500px] w-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-5 flex gap-4 overflow-x-auto pb-2">

                {allImages.map(
                  (img, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setActiveImage(img)
                      }
                      className={`overflow-hidden rounded-2xl border-2 transition-all ${
                        activeImage === img
                          ? "border-black"
                          : "border-zinc-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumb"
                        className="h-24 w-24 object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col">

            {/* Category */}
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">

              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">

                <Star
                  size={15}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="text-sm font-bold">
                  {product.rating || 4.8}
                </span>
              </div>

              <span className="text-sm text-zinc-500">
                120+ Reviews
              </span>

            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-4">

              <span className="text-4xl font-black text-zinc-950">
                ₹
                {product.price?.toLocaleString(
                  "en-IN"
                )}
              </span>

              {product.originalPrice && (
                <span className="text-2xl text-zinc-400 line-through">
                  ₹
                  {product.originalPrice?.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

              {discount > 0 && (
                <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-7 text-base leading-relaxed text-zinc-600">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-700">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-zinc-300">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1
                        ? prev - 1
                        : 1
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-zinc-100"
                >
                  <Minus size={18} />
                </button>

                <span className="flex h-12 w-14 items-center justify-center text-lg font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      (prev) => prev + 1
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-zinc-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              {/* Cart */}
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
              >
                <ShoppingBag size={18} />

                Add To Cart
              </button>

              {/* Wishlist */}
              {isAuthenticated && (
                <button
                  onClick={handleWishlist}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-8 py-4 text-sm font-bold uppercase tracking-wider transition ${
                    isWishlisted(
                      product.slug
                    )
                      ? "border-rose-500 bg-rose-50 text-rose-600"
                      : "border-zinc-300 hover:bg-zinc-100"
                  }`}
                >
                  <Heart
                    size={18}
                    className={
                      isWishlisted(
                        product.slug
                      )
                        ? "fill-rose-500 text-rose-500"
                        : ""
                    }
                  />

                  {isWishlisted(
                    product.slug
                  )
                    ? "Wishlisted"
                    : "Wishlist"}
                </button>
              )}

              {/* Share */}
              <button className="flex items-center justify-center rounded-2xl border border-zinc-300 px-5 py-4 transition hover:bg-zinc-100">
                <Share2 size={18} />
              </button>

            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4">
                <Truck size={20} />

                <div>
                  <p className="text-sm font-bold">
                    Free Delivery
                  </p>

                  <p className="text-xs text-zinc-500">
                    On all orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4">
                <RotateCcw size={20} />

                <div>
                  <p className="text-sm font-bold">
                    Easy Returns
                  </p>

                  <p className="text-xs text-zinc-500">
                    7 days return policy
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4">
                <ShieldCheck size={20} />

                <div>
                  <p className="text-sm font-bold">
                    Secure Payment
                  </p>

                  <p className="text-xs text-zinc-500">
                    100% protected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-4">
                <Star size={20} />

                <div>
                  <p className="text-sm font-bold">
                    Premium Quality
                  </p>

                  <p className="text-xs text-zinc-500">
                    Crafted carefully
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;