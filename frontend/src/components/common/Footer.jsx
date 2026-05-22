import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#999999] font-sans pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-[#222222]">
        
        {/* Column 1: Brand Profile */}
        <div className="space-y-6">
          <h2 className="text-white text-2xl font-bold tracking-wider">
            CRAFTON
          </h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Premium bags crafted for style, function, and durability. Designed to handle your everyday journey with absolute ease.
          </p>
          
          {/* Social Icons using Inline SVGs */}
          <div className="flex space-x-4 pt-2">
            {/* Instagram */}
            <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TikTok */}
            <a href="#" className="hover:text-white transition-colors duration-200" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14 1.13 1.18 2.7 1.88 4.31 2.05v3.86c-1.74-.03-3.45-.63-4.81-1.74-.11-.09-.2-.19-.34-.33v5.52c.05 4.14-2.82 8.01-6.9 8.87-4.47.98-8.91-1.74-9.83-6.17-.99-4.8 2.37-9.52 7.15-10.15.77-.1 1.55-.1 2.32.02v3.9c-.64-.17-1.32-.17-1.96-.03-2.22.42-3.71 2.53-3.37 4.77.3 2.03 2.1 3.51 4.14 3.42 2.33.04 4.17-1.95 4.07-4.27V0l.7-.02z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="hover:text-white transition-colors duration-200" aria-label="YouTube">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Facebook">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
            Shop
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-200">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Luxury Backpacks</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Leather Totes</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Travel Duffles</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Wallets & Accessories</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Care Links */}
        <div>
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-6">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Our Story</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Submission */}
        <div className="space-y-6">
          <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">
            Stay Connected
          </h3>
          <p className="text-sm leading-relaxed">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex border border-[#333333] focus-within:border-white transition-colors duration-200">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none placeholder-[#555555]"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-black px-4 flex items-center justify-center hover:bg-[#dddddd] transition-colors duration-200"
              aria-label="Submit newsletter"
          >
              {/* Arrow Right Icon */}
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal & Info Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div>
          &copy; {new Date().getFullYear()} Crafton. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;