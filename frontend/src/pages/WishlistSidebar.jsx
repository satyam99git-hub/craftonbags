import React from 'react';

export default function WishlistSidebar({ activeCategory, setActiveCategory, getCategoryCount }) {
  const categories = ['All Items', 'Backpacks', 'Travel Bags', 'Tote Bags'];

  return (
    <div className="space-y-6">
      {/* Category Navigation Selector Box */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center">
          <span className="mr-2">♡</span> Wishlist ({getCategoryCount('All Items')})
        </div>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-md transition ${
                  isActive 
                    ? 'bg-gray-50 text-black font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <span>{cat}</span>
                <span className="text-xs text-gray-400 font-normal">{getCategoryCount(cat)}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Love Something Advertisement Widget Box */}
      <div className="bg-[#FDFDFD] rounded-xl border border-gray-100 p-6 text-center shadow-sm flex flex-col items-center">
        <div className="text-gray-400 text-xl mb-2">❤️</div>
        <h4 className="text-sm font-semibold mb-1">Love something?</h4>
        <p className="text-xs text-gray-400 max-w-[160px] mx-auto mb-4 leading-relaxed">
          Items in your wishlist don't get reserved.
        </p>
        <button className="w-full bg-black text-white hover:bg-gray-900 text-xs font-semibold py-2.5 rounded transition uppercase tracking-wider">
          Add To Cart
        </button>
      </div>
    </div>
  );
}