import React from "react";

import { Search, Bell } from "lucide-react";

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-6">
      {/* Search */}
      <div className="relative hidden md:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="h-12 w-[320px] rounded-2xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none transition focus:border-black"
        />
      </div>
            {/* Right */}
      <div className="ml-auto flex items-center gap-4">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white transition hover:bg-zinc-100">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-bold text-zinc-900">
              Admin
            </p>

            <p className="text-xs text-zinc-500">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;