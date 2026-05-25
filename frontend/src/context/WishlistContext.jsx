import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children,
}) => {
  // Load wishlist from localStorage
  const [wishlist, setWishlist] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "wishlist"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch (error) {
        console.error(
          "Wishlist Parse Error:",
          error
        );

        return [];
      }
    });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Toggle Wishlist
  const toggleWishlist = (
    product
  ) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) =>
          item.slug ===
          product.slug
      );

      // Remove
      if (exists) {
        return prev.filter(
          (item) =>
            item.slug !==
            product.slug
        );
      }

      // Add
      return [...prev, product];
    });
  };

  // Remove directly
  const removeFromWishlist = (
    slug
  ) => {
    setWishlist((prev) =>
      prev.filter(
        (item) =>
          item.slug !== slug
      )
    );
  };

  // Clear All
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Check if wishlisted
  const isWishlisted = (
    slug
  ) => {
    return wishlist.some(
      (item) =>
        item.slug === slug
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);