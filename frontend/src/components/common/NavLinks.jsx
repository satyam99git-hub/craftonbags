import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";

const NavLinks = () => {
  return (
    <div className="flex flex-wrap items-center gap-6 justify-center text-sm overflow-x-auto whitespace-nowrap sm:overflow-visible sm:whitespace-normal">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.id}
          to={link.path}
          className={({ isActive }) =>
            `relative py-1 text-sm font-medium transition-colors duration-200 group ${
              isActive
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {link.label}

              <span
                className={`absolute bottom-0 left-1/2 h-[2px] bg-black transition-all duration-300 ease-out -translate-x-1/2 ${
                  isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
