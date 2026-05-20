import React from "react";
import { NAV_LINKS } from "../../constants/navigation";

const NavLinks = () => {
  return (
    <div className="flex items-center gap-8">
      {NAV_LINKS.map((link) => (
        <button
          key={link.id}
          className="relative font-medium text-gray-600 hover:text-black cursor-pointer py-1 transition-colors duration-200 group text-sm"
        >
          {link.label}

          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-black transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full" />
        </button>
      ))}
    </div>
  );
};

export default NavLinks;