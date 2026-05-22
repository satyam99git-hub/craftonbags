import React from "react";
import {
  Heart,
  ShoppingCart,
  CircleUserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavActions = ({
  onOpenAuth,
}) => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
  } = useAuth();

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
    navigate("/cart");
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
{/* Wishlist */}
{isAuthenticated && (
  <button
    onClick={handleWishlistClick}
    className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 transition-all duration-300"
  >
    <Heart className="w-5 h-5 group-hover:scale-110 transition-all" />
    <span>Wishlist</span>
  </button>
)}

{/* Cart */}
{isAuthenticated && (
  <button className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-all duration-300">
    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-all" />
    <span>Cart</span>
  </button>
)}

      {/* Profile / Login */}
      <button
        onClick={handleAccountClick}
        className="group flex flex-col items-center gap-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:text-emerald-600"
      >
        <CircleUserRound className="h-5 w-5 transition-all group-hover:scale-110" />

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