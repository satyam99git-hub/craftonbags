import React from "react";

import {
  LayoutDashboard,
  ShoppingBag,
  PlusSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },

    {
      name: "Products",
      path: "/admin/products",
      icon: ShoppingBag,
    },

    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: PlusSquare,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden w-[270px] border-r border-zinc-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-zinc-200 px-7 py-6">
        <h1 className="text-2xl font-black tracking-tight text-zinc-950">
          Crafton Admin
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your store
        </p>
      </div>
      {/* Navigation */}
      <div className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
       {/* Bottom */}
      <div className="border-t border-zinc-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;