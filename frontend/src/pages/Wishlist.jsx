import React, { useState } from 'react';
import WishlistSidebar from '../pages/WishlistSidebar';

// Sample data mirroring your provided design
const INITIAL_WISHLIST = [
  {
    id: 1,
    name: 'Urban Voyager Backpack',
    price: 129.00,
    category: 'Backpacks',
    inStock: true,
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/300x250?text=Urban+Voyager+Backpack',
    colors: ['#8B5A2B', '#4A5D4E', '#1C1C1C']
  },
  {
    id: 2,
    name: 'Weekender Duffle Bag',
    price: 149.00,
    category: 'Travel Bags',
    inStock: true,
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/300x250?text=Weekender+Duffle+Bag',
    colors: ['#1C1C1C', '#4A5D4E', '#8B5A2B']
  },
  {
    id: 3,
    name: 'Classic Leather Tote',
    price: 99.00,
    category: 'Tote Bags',
    inStock: true,
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/300x250?text=Classic+Leather+Tote',
    colors: ['#D2B48C', '#8B5A2B', '#1C1C1C']
  },
  {
    id: 4,
    name: 'Executive Laptop Bag',
    price: 119.00,
    category: 'Backpacks',
    inStock: false,
    stockStatus: 'Low Stock',
    image: 'https://via.placeholder.com/300x250?text=Executive+Laptop+Bag',
    colors: ['#8B5A2B', '#1C1C1C']
  },
  {
    id: 5,
    name: 'Urban Sling Bag',
    price: 79.00,
    category: 'Travel Bags',
    inStock: true,
    stockStatus: 'In Stock',
    image: 'https://via.placeholder.com/300x250?text=Urban+Sling+Bag',
    colors: ['#D2B48C', '#4A5D4E', '#1C1C1C']
  }
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [sortBy, setSortBy] = useState('Recently Added');

  // Handle Remove Item
  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  // Handle Clear All
  const handleClearAll = () => {
    setWishlistItems([]);
  };

  // Category counts calculation
  const getCategoryCount = (category) => {
    if (category === 'All Items') return wishlistItems.length;
    return wishlistItems.filter(item => item.category === category).length;
  };

  // Filter items based on selected sidebar category
  const filteredItems = wishlistItems.filter(item => {
    if (activeCategory === 'All Items') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-[#FCFCFC] min-h-screen text-[#1A1A1A] font-sans antialiased">
      {/* Promo Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center border-b border-gray-800">
        <div>Free Shipping on orders above $50</div>
        <div>Get 10% Off on your first order | Use Code: <span className="font-bold text-yellow-500">CRAFT10</span></div>
        <div>30-Day Easy Returns</div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Title Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-serif font-medium tracking-tight">My Wishlist</h1>
            <p className="text-gray-500 text-sm mt-2">All your favorite bags, in one place.</p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition">
              <span>svg-share-icon</span> <span>Share Wishlist</span>
            </button>
            <button onClick={handleClearAll} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition">
              <span>svg-trash-icon</span> <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <WishlistSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              getCategoryCount={getCategoryCount}
            />
          </div>

          {/* Right Product Grid Container */}
          <div className="lg:col-span-3">
            {/* Sort Dropdown Row */}
            <div className="flex justify-end items-center mb-6">
              <label className="text-xs text-gray-500 mr-2">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-sm rounded px-3 py-1.5 outline-none focus:border-black"
              >
                <option>Recently Added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white border border-dashed rounded-xl">
                <p className="text-gray-400">Your wishlist folder is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm relative flex flex-col justify-between">
                    
                    {/* Image Box */}
                    <div className="relative bg-[#F9F9F9] p-4 flex items-center justify-center min-h-[240px]">
                      <img src={item.image} alt={item.name} className="object-contain h-48 w-full mix-blend-multiply transition duration-300 group-hover:scale-105" />
                      <button className="absolute top-3 right-3 text-black bg-white p-1.5 rounded-full shadow-sm hover:text-red-500 transition">
                        ♥
                      </button>
                    </div>

                    {/* Meta details body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium tracking-tight text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm font-semibold mb-2">${item.price.toFixed(2)}</p>
                        
                        {/* Interactive Color Palettes */}
                        <div className="flex space-x-1.5 mb-3">
                          {item.colors.map((color, i) => (
                            <span key={i} style={{ backgroundColor: color }} className={`w-3.5 h-3.5 rounded-full border border-gray-300 inline-block cursor-pointer ${i===0 ? 'ring-1 ring-offset-1 ring-black' : ''}`}></span>
                          ))}
                        </div>

                        {/* Stock Check Badge */}
                        <p className={`text-xs font-medium mb-4 ${item.inStock ? 'text-green-600' : 'text-amber-600'}`}>
                          ● {item.stockStatus}
                        </p>
                      </div>

                      {/* Primary CTA Buttons */}
                      <div>
                        <button className="w-full bg-black text-white hover:bg-gray-900 text-xs tracking-wider uppercase font-medium py-3 rounded transition mb-2">
                          Add To Cart
                        </button>
                        <button onClick={() => handleRemoveItem(item.id)} className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition py-1">
                          ✕ Remove
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Bottom Continue Shopping Prompt Banner */}
            <div className="mt-10 bg-[#F5F4F0] rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center border border-gray-100">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="bg-white p-3 rounded-lg shadow-sm">👜</div>
                <div>
                  <h4 className="text-sm font-semibold">Looks like you have great taste!</h4>
                  <p className="text-xs text-gray-500">Keep exploring and find more styles you'll love.</p>
                </div>
              </div>
              <button className="bg-black text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded hover:bg-gray-900 transition">
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Trust Badges Bar */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs tracking-tight text-gray-600">
          <div>🚀 <strong className="text-black block mt-1">FREE SHIPPING</strong> On orders above $50</div>
          <div>🔄 <strong className="text-black block mt-1">30-DAY RETURNS</strong> Hassle-free returns</div>
          <div>🏅 <strong className="text-black block mt-1">PREMIUM QUALITY</strong> Crafted to last</div>
          <div>🔒 <strong className="text-black block mt-1">SECURE PAYMENT</strong> 100% safe & secure</div>
          <div>📞 <strong className="text-black block mt-1">24/7 SUPPORT</strong> We're here to help</div>
        </div>

        {/* Footer Newsletter Segment */}
        <div className="bg-black text-white py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-serif tracking-wide mb-2">Stay Inspired</h3>
            <p className="text-gray-400 text-xs mb-6">Be the first to know about new arrivals, exclusive offers, and style stories.</p>
            <div className="flex max-w-md mx-auto border border-gray-700 rounded overflow-hidden">
              <input type="email" placeholder="Enter your email" className="bg-[#121212] px-4 py-3 text-sm flex-1 outline-none text-white placeholder-gray-500" />
              <button className="bg-[#D2B48C] text-black px-6 text-xs uppercase font-bold tracking-wider hover:bg-opacity-90 transition">Subscribe</button>
            </div>
            <p className="text-[10px] text-gray-500 mt-3">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}