import React, {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";

const Navbar = ({
  onOpenRegister,
}) => {
  const [showNavbar, setShowNavbar] =
    useState(true);

  const [isScrolled, setIsScrolled] =
    useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY =
        window.scrollY;

      // Background shadow
      setIsScrolled(currentScrollY > 20);

      // Always visible near top
      if (currentScrollY < 80) {
        setShowNavbar(true);
      }

      // Hide on scroll down
      else if (
        currentScrollY > lastScrollY
      ) {
        setShowNavbar(false);
      }

      // Show on scroll up
      else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 px-4 py-2 sm:px-5 transition-all duration-300 ${
        showNavbar
          ? "translate-y-0"
          : "-translate-y-full"
      } ${
        isScrolled
          ? "border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-amber-50"
      }`}
    >
      
      {/* Logo */}
      <div className="flex justify-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-black"
        >
          CRAFTON
        </Link>
      </div>

      {/* Links */}
      <NavLinks />

      {/* Search */}
      <SearchBar />

      {/* Actions */}
      <NavActions
        onOpenAuth={onOpenRegister}
      />
    </header>
  );
};

export default Navbar;
