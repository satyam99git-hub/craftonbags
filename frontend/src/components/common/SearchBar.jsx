import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="group w-full max-w-[280px] sm:w-72 flex items-center border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm hover:border-gray-400 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
      
      <input
        type="text"
        placeholder="Search bags..."
        className="outline-none w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent pr-2"
      />

      <Search className="w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
    </div>
  );
};

export default SearchBar;