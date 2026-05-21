import React from "react";

import {
  Heart,
  ShoppingCart,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

import useAuth from "../../hooks/useAuth";

const NavActions = ({
  onOpenAuth,
}) => {
<<<<<<< HEAD
  const { isLoggedIn, logout } = useAuth();
=======
  const {
    isAuthenticated,
    logout,
  } = useAuth();

  const handleAccountClick = () => {
    if (isAuthenticated) {
      logout();
      return;
    }

    onOpenAuth();
  };
>>>>>>> origin/main

  return (
    <div className="flex justify-center gap-6">

      <button className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-rose-600 transition-all duration-300">
        <Heart className="w-5 h-5 group-hover:scale-110 transition-all" />
        <span>Wishlist</span>
      </button>

      <button className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-all duration-300">
        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-all" />
        <span>Cart</span>
      </button>

<<<<<<< HEAD
      {isLoggedIn ? (
        <button
          onClick={logout}
          className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-red-600 transition-all duration-300"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-all" />
          <span>Logout</span>
        </button>
      ) : (
        <button
          onClick={onOpenAuth}
          className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-600 transition-all duration-300"
        >
          <CircleUserRound className="w-5 h-5 group-hover:scale-110 transition-all" />
          <span>Sign In</span>
        </button>
      )}
=======
      <button
        onClick={handleAccountClick}
        className="group font-medium text-xs flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-600 transition-all duration-300"
      >
        {isAuthenticated ? (
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-all" />
        ) : (
          <CircleUserRound className="w-5 h-5 group-hover:scale-110 transition-all" />
        )}
        <span>
          {isAuthenticated
            ? "Logout"
            : "Sign In"}
        </span>
      </button>
>>>>>>> origin/main
    </div>
  );
};

export default NavActions;
