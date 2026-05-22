import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-[#FAF8F5] text-[#222222] font-sans antialiased">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-12 pb-16">
        <nav className="text-xs text-gray-500 mb-6 flex space-x-2">
          <a href="/" className="hover:underline">Home</a>
          <span>&gt;</span>
          <span className="text-gray-800">About Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-normal text-[#111111]">
              About Us
            </h1>
            <h2 className="text-xl md:text-2xl font-serif text-[#444444] italic">
              Crafted for Style. Built for Life.
            </h2>
            <p className="text-sm leading-relaxed text-[#555555]">
              At CRAFTON, we believe a bag is more than just something you carry—it's a reflection of your personality, your journey, and your purpose. We create premium bags that blend timeless design, exceptional functionality, and unmatched durability.
            </p>
          </div>

          {/* Hero Right Image Showcase */}
          <div className="lg:col-span-7 bg-[#EAE5DF] p-8 rounded-sm flex justify-center items-center">
            {/* Substitute with your high-res product workshop asset */}
            <div className="w-full aspect-[16/10] bg-stone-300 flex items-center justify-center text-stone-600 text-sm italic rounded-sm shadow-sm">
              [ Collection Showcase Display: Backpack, Tote, Duffle ]
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section (Mission, Vision, Values, Promise) */}
      <section className="bg-white border-t border-b border-[#EAE5DF] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#EAE5DF]">
          
          {/* Our Mission */}
          <div className="pt-6 sm:pt-0 lg:px-4 first:pl-0 space-y-3">
            <div className="flex items-center space-x-3 text-[#111111]">
              <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 8 14 12 18 12 15 15 16 19 12 17 8 19 9 15 6 12 10 12" />
              </svg>
              <h3 className="text-xs font-bold tracking-widest uppercase">Our Mission</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666]">
              To craft premium bags that inspire confidence and elevate everyday journeys.
            </p>
          </div>

          {/* Our Vision */}
          <div className="pt-6 sm:pt-0 lg:px-4 space-y-3">
            <div className="flex items-center space-x-3 text-[#111111]">
              <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h3 className="text-xs font-bold tracking-widest uppercase">Our Vision</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666]">
              To be a global leader in modern bag craftsmanship, trusted for quality and style.
            </p>
          </div>

          {/* Our Values */}
          <div className="pt-6 sm:pt-0 lg:px-4 space-y-3">
            <div className="flex items-center space-x-3 text-[#111111]">
              <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24">
                <polygon points="12 2 22 8.5 12 22 2 8.5 12 2" />
                <polyline points="2 8.5 12 13 22 8.5" />
              </svg>
              <h3 className="text-xs font-bold tracking-widest uppercase">Our Values</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666]">
              Quality, Integrity, Innovation, and Customer First—everything we do, every day.
            </p>
          </div>

          {/* Our Promise */}
          <div className="pt-6 sm:pt-0 lg:px-4 space-y-3">
            <div className="flex items-center space-x-3 text-[#111111]">
              <svg className="w-6 h-6 stroke-current stroke-1 fill-none" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-xs font-bold tracking-widest uppercase">Our Promise</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#666666]">
              We stand behind every bag we make with quality you can feel and service you can trust.
            </p>
          </div>

        </div>
      </section>

      {/* The Crafton Story & Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Copy Block */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">The Crafton Story</span>
            <h2 className="text-2xl md:text-3xl font-serif font-normal text-[#111111] leading-tight">
              Passion. Purpose.<br />Perfection.
            </h2>
            <p className="text-xs leading-relaxed text-[#555555]">
              CRAFTON was founded with a simple idea—to design bags that look great, work perfectly, and last for years. Every detail, every stitch, and every material is chosen with care. Because you deserve more than ordinary.
            </p>
          </div>

          {/* Center Image Banner */}
          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/3] bg-stone-300 rounded-sm overflow-hidden flex items-center justify-center text-stone-600 text-xs italic shadow-sm">
              [ Workshop / Crafting Action Shot Image ]
            </div>
          </div>

          {/* Metrics Grid Block */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-x-6 gap-y-10 pl-0 lg:pl-6">
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-serif text-[#111111] block">50K+</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 block">Happy Customers</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-serif text-[#111111] block">150+</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 block">Premium Designs</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-serif text-[#111111] block">10+</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 block">Years Craftsmanship</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-serif text-[#111111] block">25+</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 block">Countries Served</span>
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Newsletter Block */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16">
        <div className="bg-[#111111] text-white p-8 md:p-10 rounded-sm flex flex-col lg:flex-row justify-between items-center gap-6 shadow-md">
          <div className="flex items-center space-x-4 text-center lg:text-left">
            <div className="hidden sm:block border border-neutral-700 p-3 rounded-sm text-neutral-400">
              <svg className="w-8 h-8 fill-none stroke-current stroke-1" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-serif">Join the CRAFTON Family</h3>
              <p className="text-xs text-neutral-400 mt-1">Be the first to know about new arrivals, exclusive offers, and more.</p>
            </div>
          </div>
          
          <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full lg:w-64 bg-[#1E1E1E] text-xs px-4 py-3 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-all rounded-sm"
              required 
            />
            <button 
              type="submit" 
              className="bg-[#D3BA9E] hover:bg-[#C2AA8F] text-[#111111] text-xs font-semibold px-6 py-3 tracking-widest uppercase transition-all whitespace-nowrap rounded-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;