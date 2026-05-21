import React from "react";
import CollectionCard from "./CollectionCard";

const collections = [
  {
    title: "Luxury Travel Bags",
    tagline: "First-class utility.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Executive Backpacks",
    tagline: "Commute with status.",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Weekend Duffles",
    tagline: "Pack up and escape.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Minimal Laptop Slings",
    tagline: "Sleek tech protection.",
    image: "https://images.unsplash.com/photo-1598532187856-327243147043?q=80&w=800&auto=format&fit=crop",
  },
];

const CollectionGrid = () => {
  return (
    <section className="px-6 py-16 lg:px-16 max-w-7xl mx-auto bg-white">
      
      {/* Catchy E-commerce Header */}
      <div className="mb-12 border-b border-zinc-100 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            Seasonal Releases
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            Featured Collections
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-xl">
            Engineered for global transits, daily city commutes, and quick weekend getaways. Handcrafted detailing meets rugged utility.
          </p>
        </div>
        
        {/* Subtle marketing anchor to keep users exploring */}
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:block select-none">
          [ Edition 2026 ]
        </div>
      </div>

      {/* Balanced Grid Track Container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((item) => (
          <CollectionCard
            key={item.title}
            title={item.title}
            tagline={item.tagline} // Pass down the premium sub-headline text
            image={item.image}
          />
        ))}
      </div>
      
    </section>
  );
};

export default CollectionGrid;