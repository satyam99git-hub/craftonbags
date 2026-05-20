import React from "react";

import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";

const Navbar = ({
  onOpenRegister,
}) => {
  return (
    <header className="bg-amber-50 h-16 w-full flex items-center justify-between gap-8 px-5">
      
      <div className="flex justify-center">
        <button className="text-3xl font-bold text-black">
          CRAFTON
        </button>
      </div>

      <NavLinks />

      <SearchBar />

      <NavActions
        onOpenAuth={onOpenRegister}
      />
    </header>
  );
};

export default Navbar;