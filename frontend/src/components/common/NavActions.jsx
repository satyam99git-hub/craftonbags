import React from "react";

import {
  Heart,
  ShoppingCart,
  CircleUserRound,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import {
  useWishlist,
} from "../../context/WishlistContext";

const NavActions = ({
  onOpenAuth,
}) => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
  } = useAuth();

  const { wishlist } =
    useWishlist();

  // Profile / Login
  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
      return;
    }

    onOpenAuth();
  };

  // Wishlist
  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }

    navigate("/wishlist");
  };

  // Cart
  const handleCartClick = () => {
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }

    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">

      {/* Wishlist */}
      {isAuthenticated && (
        <button
          onClick={handleWishlistClick}
          className="group relative flex flex-col items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:text-rose-600"
        >

          {/* Icon */}
          <div className="relative">

            <Heart className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />

            {/* Count Badge */}
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-0.5 text-[10px] font-black text-white shadow-md mt-0.5">
                {wishlist.length}
              </span>
            )}

          </div>

          <span>Wishlist</span>

        </button>
      )}

      {/* Cart */}
      {isAuthenticated && (
        <button
          onClick={handleCartClick}
          className="group relative flex flex-col items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:text-blue-600"
        >

          <div className="relative">

            <ShoppingCart className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />

            {/* Future Cart Count */}
            <span className="absolute -right-2 -top-2 hidden h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-black text-white shadow-md">
              0
            </span>

          </div>

          <span>Cart</span>

        </button>
      )}

      {/* Profile / Login */}
      <button
        onClick={handleAccountClick}
        className="group flex flex-col items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:text-emerald-600"
      >

        <CircleUserRound className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />

        <span>
          {isAuthenticated
            ? "Profile"
            : "Sign In"}
        </span>

      </button>

    </div>
  );
};

export default NavActions;